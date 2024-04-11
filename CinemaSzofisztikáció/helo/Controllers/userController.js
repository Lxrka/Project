const {PrismaClient} = require("@prisma/client")
const jwt = require('jsonwebtoken');
const argon2 = require('argon2');

const prisma = new PrismaClient();

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: '1d'});
}

const register = async (req, res) => {
    const {email, jelszo, szulev, telszam, felhasznalonev} = req.body;

    if(!email || !jelszo || !szulev || !telszam || !felhasznalonev){
        res.json({message: "Hiányos adatok!"});
        return;
    }


    const user = await prisma.user.findUnique({
        where: {
            email: email
        }
    });

    if(user){
        res.json({message: 'Az e-mail cím már foglalt!!'});
        return;
    }

    const titkosJelszo = await argon2.hash(jelszo);

    const newUser = await prisma.user.create({
        data: {
            email: email,
            felhasznalonev: felhasznalonev,
            szulev: szulev,
            telszam: telszam,
            jelszo: titkosJelszo
        }
    });

    const token = generateToken(newUser.id);
    res.json({token: token});
}

const login = async(req, res) => {

    const {email, jelszo} = req.body;

    if(!email || !jelszo){
        res.json({message: 'Hiányzó adatok!'});
        return;
    }

    const user = await prisma.user.findUnique({
        where: {
            email: email
        }
    });

    if(!user) {
        res.json({message: 'Felhasználó nem található!'});
        return;
    }

    if(!(await argon2.verify(user.jelszo, jelszo))){
        res.json({message: 'Nem igazan ez a  jelszó!'});
        return;
    }

    const token = generateToken(user.id);
    res.json({
        message: 'Sikeres bejelentkezés!',
        token: token
    });

}

const getMe = (req, res) => {
    res.json(req.user);
}

module.exports = {
    register,
    login,
    getMe
}