import { Request, Response, NextFunction } from "express";
import { ZodTypeAny } from "zod";
import { ParsedQs } from "qs";
import { ParamsDictionary } from "express-serve-static-core";

interface ValidationSchemas<
  TBody extends ZodTypeAny = ZodTypeAny,
  TQuery extends ZodTypeAny = ZodTypeAny,
  TParams extends ZodTypeAny = ZodTypeAny,
  TCookies extends ZodTypeAny = ZodTypeAny
> {
  body?: TBody;
  query?: TQuery;
  params?: TParams;
  cookies?: TCookies;
}

const validateRequest =
  <
    TBody extends ZodTypeAny = ZodTypeAny,
    TQuery extends ZodTypeAny = ZodTypeAny,
    TParams extends ZodTypeAny = ZodTypeAny,
    TCookies extends ZodTypeAny = ZodTypeAny
  >(
    schemas: ValidationSchemas<TBody, TQuery, TParams, TCookies>
  ) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (schemas.body) {
        req.body = (await schemas.body.parseAsync(
          req.body ?? {}
        )) as TBody["_output"];
      }
      if (schemas.query) {
        const parsedQuery = await schemas.query.parseAsync(req.query ?? {});
        req.query = parsedQuery as unknown as ParsedQs;
      }
      if (schemas.params) {
        const parsedParams = await schemas.params.parseAsync(req.params ?? {});
        req.params = parsedParams as unknown as ParamsDictionary;
      }
      if (schemas.cookies) {
        const parsedCookies = await schemas.cookies.parseAsync(
          req.cookies ?? {}
        );
        req.cookies = parsedCookies as unknown as Record<string, any>;
      }

      next();
    } catch (error) {
      next(error);
    }
  };

export default validateRequest;
