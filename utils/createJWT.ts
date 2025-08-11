import JWT from 'jsonwebtoken'


export const createJWT = (data:any) => {
    let token = JWT.sign(data , process.env.SECRET_KEY as string)
    return token;
}