import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { Request, Response, NextFunction } from "express";

export const validateDto = (dto: any) => {
  
  return async (req: Request, res: Response, next: NextFunction) => {
    const dtoObj = plainToInstance(dto, req.body, {
      enableImplicitConversion: true
    });

    const errors = await validate(dtoObj, {
      whitelist: true
    });

    if (errors.length > 0) {
      return res.status(400).json({
        message: "DTO validation failed",
        errors: errors.map(e => ({
          property: e.property,
          constraints: e.constraints
        }))
      });
    }

    req.body = dtoObj;
    next();
  };
};