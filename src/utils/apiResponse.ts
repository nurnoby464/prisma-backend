import type { Response } from "express";
type ICreated<T, R> = {
  res: Response;
  message?: string;
  data?: T;
  meta?: R;
};
type ISuccess<T, R> = {
  res: Response;
  statusCode?: number;
  message?: string;
  data?: T;
  meta?: R;
};
type IPaginated<T, R> = {
  res: Response;
  statusCode?: number;
  message?: string;
  total: number;
  page: number;
  limit: number;
  data?: T;
  meta?: R;
};
type IError<T, R> = {
  res: Response;
  statusCode?: number;
  message?: string;
  data?: T;
  meta?: R;
};
export const ApiResponse = {
  created: <T, R>(payload: ICreated<T, R>) => {
    const {
      res,
      message = "Created Successfully",

      data = null,
      meta = null,
    } = payload;
    return res.status(201).json({ success: true, message, data, meta });
  },
  success: <T, R>(payload: ISuccess<T, R>) => {
    const {
      res,
      statusCode = 200,
      message = "Created Successfully",
      data = null,
      meta = null,
    } = payload;
    return res.status(statusCode).json({ success: true, message, data, meta });
  },
  paginated: <T, R>(payload: IPaginated<T, R>) => {
    const {
      res,
      statusCode = 200,
      message = "Created Successfully",
      data = null,
      meta = null,
      total,
      page,
      limit,
    } = payload;
    const totalPages = Math.ceil(total / limit);
    const hasPrev = page > 1;
    const hasNext = page < totalPages;
    return res.status(statusCode).json({
      success: true,
      message,
      data,
      meta,
      pagination: {
        total,
        totalPages,
        currentPage: page,
        hasNext,
        hasPrev,
      },
    });
  },
  error: <T, R>(payload: IError<T, R>) => {
    const {
      res,
      statusCode = 500,
      message = "Created Successfully",
      data = null,
      meta = null,
    } = payload;

    return res.status(statusCode).json({
      success: false,
      message,
      data,
      meta,
    });
  },
};
