import { db } from "../db/pgdb";

const getAllUsers = async (_: undefined, args: undefined) => {
  const users = await db.query("SELECT * FROM users ORDER BY createdAt DESC");

  if (!users.rows) {
    throw new Error("No users");
  }

  return users.rows;
};

const getUser = async (_: undefined, args: { id: string }) => {
  const users = await db.query("SELECT * FROM users WHERE id = $1", [args.id]);

  if (!users.rows) {
    throw new Error("User not found!");
  }

  return users.rows.shift();
};

const createUser = async (
  _: undefined,
  { input }: { input: { email: String; password: String } }
) => {
  const response = await db.query(
    "INSERT INTO users(email, password, createdat) VALUES($1, $2, $3)",
    [input.email, input.password, new Date()]
  );

  return response.rowCount > 0 ? "User created" : "No user created";
};

const updateUserPassword = async (
  _: undefined,
  { id, password }: { id: string; password: string }
) => {
  const response = await db.query(
    "UPDATE users SET password = $1, updatedat = $2 WHERE id = $3",
    [password, new Date(), id]
  );

  return response.rowCount > 0 ? "User password Updated!" : "Not updated!";
};

const deleteUser = async (_: undefined, { id }: { id: string }) => {
  const response = await db.query("DELETE FROM users WHERE id = $1", [id]);

  return response.rowCount > 0 ? "User deleted!" : "User not deleted!";
};

const resolvers = {
  Query: {
    getAllUsers,
    getUser,
  },
  Mutation: {
    createUser,
    updateUserPassword,
    deleteUser,
  },
};

export default resolvers;
