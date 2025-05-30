import jwt from "jsonwebtoken"

const generateAccessToken = (id:number | string) => {
    const generatedToken = jwt.sign(
        {
            id
        },
        process.env.JWT_SIGN_STRING!
    )
    return generatedToken
}

export {
    generateAccessToken
}