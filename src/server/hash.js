import crypto from 'crypto'

const salt = process.env.SALT

export const hashPassword = (password) => {
    return crypto.pbkdf2Sync(password, salt,
        1000, 64, `sha512`).toString(`hex`);
}

export const validatePassword = (password, hashedPassword) => {
    const possiblePassword = crypto.pbkdf2Sync(password, salt, 1000, 64, `sha512`).toString(`hex`);
    return possiblePassword === hashedPassword
}