import { Request, Response } from "express"
import User from '../models/user'
import bcrypt from 'bcrypt'
import { createJWT } from "../auth/createJWT"

//register new user
export const userRegister = async (req: Request, res: Response) => {
    const { fullName, email, password } = req.body;

    //check if all fields are provided
    if (!fullName || !email || !password) {
        res.status(400).json({ message: "Please fill in all fields" });
        return;
    }


    //check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        res.status(400).json({ message: "User already exists" });
        return;
    }

    //hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    //create new user
    const newUser = await User.create(
        {
            fullName,
            email,
            password: hashedPassword
        }
    );

    //save new user to database
    await newUser.save();

    //send response
    res.status(201).json({ message: "User registered successfully" });
}


//login user
export const userLogin = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    //check if all fields are provided
    if (!email || !password) {
        res.status(400).json({ message: "Please fill in all fields" });
        return;
    }

    const user = await User.findOne({ email });

    //check if user exsit
    if (!user) {
        res.status(400).json({ message: "User does not exist" });
        return;
    }

    //check if password is correct
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
        res.status(400).json({ message: "Invalid email or password" });
        return;
    }

    //generate JWT
    const token = createJWT({ id: user._id, email: user.email });

    //send response
    res.status(200).json({ message: "User logged in successfully" ,token});
}