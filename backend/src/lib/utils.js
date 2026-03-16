import jwt from 'jsonwebtoken'

export const generateToken = (userId, res) => {

    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '5d' })

    res.cookie('jwt', token, {
        maxAge: 5 * 24 * 60 * 60 * 1000, //5days in miliseconds
        httpOnly: true, //prevent XSS attack, token doesn't gets accessible using "script".
        sameSite: "lax",
        secure: process.env.HTTPS === 'true' //on production(custom domain + SSL), just set env HTTPS=true then cookie will be sent over HTTPS.
    })

    return token;
}