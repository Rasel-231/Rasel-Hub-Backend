"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validateRequest = (schemas) => async (req, res, next) => {
    try {
        if (schemas.body) {
            req.body = (await schemas.body.parseAsync(req.body ?? {}));
        }
        if (schemas.query) {
            const parsedQuery = await schemas.query.parseAsync(req.query ?? {});
            req.query = parsedQuery;
        }
        if (schemas.params) {
            const parsedParams = await schemas.params.parseAsync(req.params ?? {});
            req.params = parsedParams;
        }
        if (schemas.cookies) {
            const parsedCookies = await schemas.cookies.parseAsync(req.cookies ?? {});
            req.cookies = parsedCookies;
        }
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.default = validateRequest;
