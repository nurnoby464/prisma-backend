import { prisma } from "../../../lib/prisma.js";
import type {
  CreateProjectInput,
  GetProjectListQuery,
} from "./project.validation.js";
import type { Prisma } from "../../../generated/prisma/client.js";
import { useSkip } from "../../../utils/helper.js";
import { ApiError } from "../../../utils/ApiError.js";

export const createProject = async (payload: CreateProjectInput) => {
  const { category, categorySlug, liveUrl, ...projectData } = payload;

  return await prisma.$transaction(async (tx) => {
    const resultProjectCategory = await tx.projectCategory.upsert({
      where: { slug: categorySlug },
      update: {},
      create: { name: category, slug: categorySlug },
    });
    return await tx.project.create({
      data: {
        ...projectData,
        ...(liveUrl !== undefined && { liveUrl }),
        projectCategoryId: resultProjectCategory.projectCategoryId,
      },
      include: { category: true },
    });
  });
};

export const getProjectList = async (query: GetProjectListQuery) => {
  const { search, limit, page, sortBy, sortWith, projectCategoryId } = query;
  const where: Prisma.ProjectWhereInput = {
    isActive: true,
    ...(search
      ? {
          OR: [
            { title: { contains: search, mode: "insensitive" } },
            { description: { contains: search, mode: "insensitive" } },
          ],
        }
      : {}),
    ...(projectCategoryId ? { projectCategoryId } : {}),
  };

  const [projects, total] = await Promise.all([
    prisma.project.findMany({
      where,
      orderBy: { [sortBy]: sortWith },
      skip: useSkip({ page, limit }),
      take: limit,
      include: { category: true },
    }),
    prisma.project.count({ where }),
  ]);
  return { projects, total, page, limit };
};

export const getProjectCategoryList = async () => {
  const projectCategory = await prisma.projectCategory.findMany({
    orderBy: { createdAt: "asc" },
    select: {
      name: true,
      slug: true,
      projectCategoryId: true,
      sortOrder: true,
    },
  });
  if (!projectCategory || projectCategory.length < 1)
    throw new ApiError(404, "Category not found");
  return projectCategory;
};
