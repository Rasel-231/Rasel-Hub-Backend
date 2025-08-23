import { Request, Response, NextFunction } from "express";
import { ZodTypeAny } from "zod";

interface ValidationSchemas {
  body?: ZodTypeAny;
  query?: ZodTypeAny;
  params?: ZodTypeAny;
  cookies?: ZodTypeAny;
}

const validateRequest =
  (schemas: ValidationSchemas) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (schemas.body) {
        req.body = await schemas.body.parseAsync(req.body ?? {});
      }
      if (schemas.query) {
        req.query = (await schemas.query.parseAsync(req.query ?? {})) as any;
      }
      if (schemas.params) {
        req.params = (await schemas.params.parseAsync(req.params ?? {})) as any;
      }
      if (schemas.cookies) {
        req.cookies = await schemas.cookies.parseAsync(req.cookies ?? {});
      }

      next();
    } catch (error) {
      next(error);
    }
  };

export default validateRequest;
