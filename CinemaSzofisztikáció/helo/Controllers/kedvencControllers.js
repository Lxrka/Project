const {PrismaClient} = require("@prisma/client")
const jwt = require('jsonwebtoken');
const argon2 = require('argon2');

const prisma = new PrismaClient();

const getkedvencek = async (req, res) => {
    console.log(req.headers['x-custom-header']);
    if (!req.headers['x-custom-header']) {
        res.json({message: "Nincs adat!"});
        return;
    }
    let id = req.headers['x-custom-header']
    id = parseInt(id)
    const kedvencek = await prisma.kedvencek.findMany({
        where: {
            felhasznalo: await prisma.user.findUnique({
                where: {
                    id: id
                }
            })
        }
    })
    res.json(kedvencek)
}

const postkedvencek = async (req, res) => {
    if (!req.body.felhasznaloId || !req.body.musorId || !req.body.tartalma) {
        res.json({message: "Nincs adat!"});
        return;
    }
    
    let newKedvencek = await prisma.kedvencek.create({
        data: {
            felhasznalo: { connect: {id: req.body.felhasznaloId}},
            musor: { connect: {id: parseInt(req.body.musorId)}},
        }
    })
    if (!newKedvencek) {
        res.json({message: "Mar hozza lett adva!"});
        return;
    }
    res.json({message: "Hozzaadva"})
}

module.exports = {
    getkedvencek,
    postkedvencek
}
