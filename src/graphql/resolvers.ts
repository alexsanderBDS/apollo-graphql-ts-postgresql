import { db } from "../db/pgdb";

const getAllUsers = async (_: undefined, args: undefined) => {
  const users = await db.query("SELECT * FROM users ORDER BY createdAt DESC");

  if (!users.rows) {
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

const getUser = async (_: undefined, args: { id: string }) => {
  const users = await db.query("SELECT * FROM users WHERE id = $1", [args.id]);

  if (!users.rows) {
    throw new Error("User not found!");
  }

  return users.rows.shift();
};

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
    getUser,
  },
  Mutation: {
    createUser,
  },
};

export default resolvers;
