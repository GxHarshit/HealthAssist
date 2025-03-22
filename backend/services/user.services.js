import userModel from '../models/user.model.js';


export const createUser = async ({email,password,age,gender}) => {
    if (!email || !password) {
        throw new Error('Email and Password are required');
    }

    const hashPassword = await userModel.hashPassword(password);
    const user = await userModel.create({email, password: hashPassword,age,gender});

    return user;
};