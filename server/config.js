import dotenv from 'dotenv';

dotenv.config({ silent: true });

const { JWT_TOKEN } = process.env;

const defaults = {
    JWT_TOKEN: 'a3X7hI9o0odi9dkru34kjsIjDJkdsoeER93i4ed'
};

Object.keys(defaults).forEach((key) => {
    if (!process.env[key] || process.env[key] === defaults[key]) {
        throw new Error(`Please enter a custom ${key} in .env on the root directory`);
    }
});

export default JWT_SECRET;