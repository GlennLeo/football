import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import { config } from "./config";

const prisma = new PrismaClient();

interface AuthUser {
  id: number;
  email: string;
}

export interface Context {
  prisma: PrismaClient;
  authUser: AuthUser | null;
}

const getUser = (token: string): AuthUser | null => {
  try {
    if (token) {
      const authUser = jwt.verify(token, config.TOKEN_SECRET) as AuthUser;
      return authUser;
    }
    return null;
  } catch (err) {
    return null;
  }
};

export function createContext({ req }: any): Context {
  const tokenWithBearer = req.headers.authorization || "";
  const token = tokenWithBearer.split(" ")[1];
  const authUser = getUser(token);
  return { prisma, authUser };
}
