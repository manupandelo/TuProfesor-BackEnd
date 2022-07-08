import jwt from "jsonwebtoken";
import "dotenv/config";

export class TokenService {
    getToken = async (user) => {
        const userId = `${user.id}`;
        const userMail = `${user.email}`;
        const token = jwt.sign(
            {
            payload: "login",
            userEmail: userMail,
            },
            process.env.AUTH_HS256_KEY,
            {
            issuer: "http://tuprofesor.ort/",
            subject: userId,
            audience: ["http://localhost/"],
            expiresIn: 60 * 24 * 24,
            });
            return token;
    }   
}