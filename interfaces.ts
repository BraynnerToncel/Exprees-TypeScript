import { QueryResult } from "pg";
import { Request, Response } from "express";

interface User {
  id: number;
  name: string;
  email: string;
}

interface ExtendedQueryResultUser extends QueryResult {
  rowCount?: number;
  rows: User[];
}

interface CustomError extends Error {
  code: number;
}

interface DBConfig {
  user: string;
  host: string;
  database: string;
  password: string;
  port: number;
}

interface UserQueryParams {
  id?: number;
  name?: string;
  email?: string;
}

export {
  User,
  ExtendedQueryResultUser,
  CustomError,
  DBConfig,
  UserQueryParams,
  Request,
  Response,
};
