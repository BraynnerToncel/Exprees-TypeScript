import { Pool } from "pg";
import {
  ExtendedQueryResultUser,
  User,
  CustomError,
  DBConfig,
} from "./interfaces";

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "apirest",
  password: "123456789",
  port: 5432,
} as DBConfig);

const query = async (
  text: string,
  params: any[],
  callback: (
    error: CustomError | null,
    result: ExtendedQueryResultUser | null
  ) => void

) => {
  const client = await pool.connect();
  try {
    const result = await client.query(text, params);
    callback(null, result as ExtendedQueryResultUser);
  } catch (error) {
    callback(error, null);
  } finally {
    client.release();
  }
};

const UserModel = {
  getAllUsers: (
    callback: (
      error: CustomError | null,
      users: ExtendedQueryResultUser["rows"] | null
    ) => void
  ) => {
    query("SELECT * FROM users ORDER BY id", [], (error, result) => {
      if (error) {
        callback(error, null);
      } else {
        callback(null, result?.rows ?? null);
      }
    });
  },
  getUserById: (
    id: number,
    callback: (error: CustomError | null, user: User | null) => void
  ) => {
    query("SELECT * FROM users WHERE id = $1", [id], (error, result) => {
      if (error) {
        callback(error, null);
      } else {
        const user: User | undefined = result?.rows[0];
        callback(null, user || null);
      }
    });
  },
  createUser: (
    name: string,
    email: string,
    callback: (error: CustomError | null, user: User | null) => void
  ) => {
    query(
      "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *",
      [name, email],
      (error, result) => {
        if (error) {
          callback(error, null);
        } else {
          const user: User | undefined = result?.rows[0];
          callback(null, user || null);
        }
      }
    );
  },
  updateUser: (
    id: number,
    name: string,
    email: string,
    callback: (error: CustomError | null, user: User | null) => void
  ) => {
    query(
      "UPDATE users SET name = $1, email = $2 WHERE id = $3",
      [name, email, id],
      (error, result) => {
        if (error) {
          callback(error, null);
        } else {
          const user: User | undefined = result?.rows[0];
          callback(null, user || null);
        }
      }
    );
  },
  deleteUser: (
    id: number,
    callback: (error: CustomError | null, deleted: boolean) => void
  ) => {
    query("DELETE FROM users WHERE id = $1", [id], (error, result) => {
      if (error) {
        callback(error, false);
      } else {
        const rowCount = result?.rowCount;
        const deleted = rowCount !== undefined && rowCount > 0;
        callback(null, deleted);
      }
    });
  },
};

export default UserModel;
