module.exports = {
    HOST: process.env.PG-HOST,
    USER: process.env.PG-USER,
    PASSWORD: process.env.PG-PWORD,
    DB: process.env.PG-DB,
    dialect: "postgres",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};
