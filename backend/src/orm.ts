import { Sequelize } from "sequelize";
import "dotenv/config";

if (
  !process.env["DB_NAME"] ||
  !process.env["DB_USER"] ||
  !process.env["DB_PASS"] ||
  !process.env["DB_HOST"] ||
  !process.env["DB_PORT"]
) {
  throw new Error("Database environment variables are not set properly.");
}

export const sequelize = new Sequelize(
  process.env["DB_NAME"],
  process.env["DB_USER"],
  process.env["DB_PASS"],
  {
    dialect: "mysql",
    host: process.env["DB_HOST"],
    port: Number(process.env["DB_PORT"]),
    define: {
      charset: "utf8mb4",
      collate: "utf8mb4_hungarian_ci",
    },
  },
);

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }

  try {
    await sequelize.query(
      "CREATE DATABASE IF NOT EXISTS " + process.env["DB_NAME"],
    );
    await sequelize.query("SET FOREIGN_KEY_CHECKS = 0");
    await sequelize.sync(/* { force: true } */);
    await sequelize.query("SET FOREIGN_KEY_CHECKS = 1");
    console.log("All models were synchronized successfully.");

    // Avoiding circular dependency
    const { User } = await import("./feature/user/user.orm.ts");

    // Check if any users in the table and create one if none
    const users = await User.findAll();
    if (users.length === 0) {
      const username = process.env["INITIAL_ADMIN_USERNAME"] || "admin";
      const password = process.env["INITIAL_ADMIN_PASSWORD"] || "admin";
      await User.create({
        username: username,
        password: password,
        needsPasswordChange: true,
      });
      console.log(`Created user ${username} with password ${password}`);
      // const { fillWithTestData } = require('./test');
      // await fillWithTestData();
    }
  } catch (error) {
    console.error("Unable to synchronize the database:", error);
  }
})();
