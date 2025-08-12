import joi from 'joi'

export const userRegisterSchema = joi.object({
    fullName: joi.string().min(5).max(30).required(),
    email: joi.string().email().required(),
    password:joi.string().min(8).max(30).required(),
})


export const userLoginSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(8).max(30).required(),
})