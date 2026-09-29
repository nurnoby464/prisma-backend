// src/modules/project/project.validation.ts
import { z } from "zod";

const platformSchema = z
  .string()
  .trim()
  .transform((v) => v.toUpperCase())
  .pipe(z.enum(["WEB", "MOBILE", "DESKTOP"]));

const httpUrl = z.url({ protocol: /^https?$/ });

export const createProjectSchema = z.object({
  title: z.string().trim().min(2).max(150),
  slug: z
    .string()
    .trim()
    .toLowerCase()
    .max(160)
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Use lowercase letters, numbers and hyphens",
    )
    .optional(),
  description: z.string().trim().min(10).max(2000),
  image: httpUrl,
  liveUrl: httpUrl.optional(),
  platforms: z
    .array(platformSchema)
    .min(1, "Select at least one platform")
    .refine(
      (arr) => new Set(arr).size === arr.length,
      "Platforms must be unique",
    ),
  technologies: z.array(z.string().trim().min(1).max(50)).max(20).default([]),
  isHighlighted: z.boolean().default(false),
  isActive: z.boolean().default(true),
  sortOrder: z.number().int().min(0).default(0),
  category: z.string().trim().min(3),
  categorySlug: z
    .string()
    .trim()
    .toLowerCase()
    .max(160)
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Use lowercase letters, numbers and hyphens",
    ),
  projectCategoryId: z.uuid().optional(),
});

export type CreateProjectInput = z.infer<typeof createProjectSchema>;
