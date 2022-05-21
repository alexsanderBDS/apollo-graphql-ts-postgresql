import { db } from "../db/pgdb";

const getAllUsers = async (_: undefined, args: undefined) => {
  const users = await db.query("SELECT * FROM users ORDER BY createdAt DESC");

  if (!users) {
    throw new Error("No users");
  }

  return users.rows;
};

interface NewUser {
  input: {
    email: String;
    password: String;
  };
}

const createUser = async (_: undefined, { input }: NewUser) => {
  const response = await db.query(
    "INSERT INTO users(email, password, createdat) VALUES($1, $2, $3)",
    [input.email, input.password, new Date()]
  );

  return response.rowCount > 0 ? "User created" : "No user created";
};

const resolvers = {
  Query: {
    getAllUsers,
  },
  Mutation: {
    createUser,
  },
};

export default resolvers;
