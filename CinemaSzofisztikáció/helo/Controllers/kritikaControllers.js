
const {PrismaClient} = require("@prisma/client")
const jwt = require('jsonwebtoken');
const argon2 = require('argon2');

const prisma = new PrismaClient();

const getKritika = async (req, res) => {
    console.log(req.headers['x-custom-header'], req.headers['x-custom-header2'])
    if (typeof req.headers['x-custom-header'] === undefined) {
        res.json({message: "Nincs adat!"});
        return;
    }
    let musor = await prisma.musor.findFirst({
        where: {
            nev: req.headers['x-custom-header'],
            kategoria: req.headers['x-custom-header2']
        }
    })
    console.log(musor)
    let kritikak = await prisma.kritika.findMany({
        where: {
            musorId: musor.id
        }
    });
    await Promise.all(kritikak.map(async (element, index) => {
        kritikak[index].musor = await prisma.musor.findUnique({
            where: {
                id: element.musorId
            }
        });
        kritikak[index].felhasznalo = await prisma.user.findUnique({
            where: {
                id: element.felhasznaloId
            }
        })
        kritikak[index].musorNev = kritikak[index].musor.nev;
        kritikak[index].felhasznaloNev = kritikak[index].felhasznalo.felhasznalonev;
        kritikak[index].kep = kritikak[index].musor.kep;
        kritikak[index].musor = undefined;
        kritikak[index].felhasznalo = undefined;
    }));
    res.json(kritikak);
}

const musorIdToName = async (id) => {
    const musor = await prisma.musor.findUnique({
        where: {
            id: id
        }
    });
    return musor.nev;
}

module.exports = {
    getKritika,
    musorIdToName
}