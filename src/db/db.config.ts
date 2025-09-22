const options = {
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    dialect: "postgres",
    logging: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
};

if (process.env.TYPE !== 'TEST')
    console.log(`${options.host}:${options.port}/${process.env.DB_NAME}`);

const config = {
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    ...options,
};

export default config;
