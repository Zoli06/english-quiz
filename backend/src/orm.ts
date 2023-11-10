import { Sequelize } from 'sequelize';
import 'dotenv/config'

export const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    dialect: 'mysql',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
  }
);

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

  try {
    // await sequelize.query('CREATE DATABASE IF NOT EXISTS ' + process.env.DB_NAME);
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
    await sequelize.sync({ force: true });
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
    console.log('All models were synchronized successfully.');
    // Check if any users in the table and create one if none
    const User = sequelize.models.User;
    const users = await User.findAll();
    if (users.length === 0) {
      const username = process.env.ADMIN_USERNAME || 'admin';
      const password = process.env.ADMIN_PASSWORD || 'admin';
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
    console.error('Unable to synchronize the database:', error);
  }
}
)();
