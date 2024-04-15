import { Request, Response } from "express";
import UserModel from "./modelo";
import { User, CustomError } from "./interfaces";

const getUsers = (request: Request, response: Response) => {
  UserModel.getAllUsers((error: CustomError | null, users: User[] | null) => {
    if (error) {
      response.status(500).json({ error: "Database connection error" });
    } else {
      response.status(200).json(users);
    }
  });
};

const getUserById = (request: Request, response: Response) => {
  const id: number = parseInt(request.params.id);

  UserModel.getUserById(id, (error: CustomError | null, user: User | null) => {
    if (error) {
      response.status(500).json({ error: "Database connection error" });
    } else if (!user) {
      response.status(404).json({ error: "User not found" });
    } else {
      response.status(200).json(user);
    }
  });
};

const createUser = (request: Request, response: Response) => {
  const { name, email }: { name: string; email: string } = request.body;

  UserModel.createUser(
    name,
    email,
    (error: CustomError | null, user: User | null) => {
      if (error) {
        response.status(500).json({ error: "Database connection error" });
      } else {
        response.status(201).send(`User added with ID: ${user?.id}`);
      }
    }
  );
};

const updateUser = (request: Request, response: Response) => {
  const id: number = parseInt(request.params.id);
  const { name, email }: { name: string; email: string } = request.body;

  UserModel.updateUser(id, name, email, (error: CustomError | null) => {
    if (error) {
      response.status(500).json({ error: "Database connection error" });
    } else {
      response.status(200).send(`User modified with ID: ${id}`);
    }
  });
};

const deleteUser = (request: Request, response: Response) => {
  const id: number = parseInt(request.params.id);

  UserModel.deleteUser(id, (error: CustomError | null) => {
    if (error) {
      response.status(500).json({ error: "Database connection error" });
    } else {
      response.status(200).send(`User deleted with ID: ${id}`);
    }
  });
};

export { getUsers, getUserById, createUser, updateUser, deleteUser };
