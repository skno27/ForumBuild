import { Request, Response, NextFunction } from "express";
import xss from "xss";

const sanitize = (obj: any): any => {
  // encoded data WILL take up more space in the database. but that is a very fair tradeoff, i think
  const options = {
    whiteList: {},
    stripIgnoreTag: true,
    stripIgnoreTagBody: ["script"],
  };
  for (const key in obj) {
    if (typeof obj[key] === "string") {
      obj[key] = xss(obj[key], options);
    } else if (typeof obj[key] === "object") {
      obj[key] = sanitize(obj[key]);
    }
  }
  return obj;
};

const xssMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // console.log(req.body);
  if (req.body) {
    req.body = sanitize(req.body);
  }
  // console.log(req.body);
  next();
};

export default xssMiddleware;
