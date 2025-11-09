import { Sequelize } from "sequelize";
import { config } from "./config.ts";

export const sequelize = new Sequelize(
  config.db.name,
  config.db.user,
  config.db.password,
  {
    dialect: "mysql",
    host: config.db.host,
    port: config.db.port,
    logging: config.env === "development" ? console.log : false,
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
    // await sequelize.query(
    //   "CREATE DATABASE IF NOT EXISTS " + config.db.name + " CHARACTER SET utf8mb4 COLLATE utf8mb4_hungarian_ci",
    // );
    await sequelize.query("SET FOREIGN_KEY_CHECKS = 0");
    await sequelize.sync(/* { force: true } */);
    await sequelize.query("SET FOREIGN_KEY_CHECKS = 1");
    console.log("All models were synchronized successfully.");

    // Avoiding circular dependency
    const { User } = await import("./feature/user/user.orm.ts");

    // Check if any users in the table and create one if none
    const users = await User.findAll();
    if (users.length === 0) {
      await User.create({
        username: config.initialAdmin.username,
        password: config.initialAdmin.password,
        needsPasswordChange: true,
      });
      console.log(`Created user ${config.initialAdmin.username} with password ${config.initialAdmin.password}`);
    }
  } catch (error) {
    console.error("Unable to synchronize the database:", error);
  }
})();
