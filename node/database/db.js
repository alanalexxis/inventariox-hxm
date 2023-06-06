//configuracion de la base de datos en heroku

// import { Sequelize } from "sequelize";
// import dotenv from "dotenv";
// dotenv.config();

// const db = new Sequelize(process.env.DATABASE_URI, {
//   dialect: "mysql",
//   define: {
//     timestamps: false,
//   },
// });

// export default db;

import { Sequelize } from "sequelize";

const db = new Sequelize("bdPermisos", "root", "", {
  host: "localhost",
  dialect: "mysql",
  define: {
    timestamps: false,
  },
});

export default db;
