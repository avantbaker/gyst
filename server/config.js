import dotenv from 'dotenv';

dotenv.config({ silent: true });

const { JWT_TOKEN } = process.env;

const defaults = {
    JWT_TOKEN: 'secret_code'
};

Object.keys(defaults).forEach((key) => {
    if (!process.env[key] || process.env[key] === defaults[key]) {
        throw new Error(`Please enter a custom ${key} in .env on the root directory`);
    }
});

export default JWT_TOKEN;