const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

/*const feltoltes = async (req, res) => {
    console.log(req.body)

    if (!req.file || !req.body) {
        res.json({ message: "Hiányos adatok!" });
        return;
    }

    const data = {
        filename: req.file.filename,
        bodyData: req.body
    }
    const { nev, keletkezes, leiras, kategoria } = data.bodyData;

    if (!nev || !keletkezes || !leiras || !kategoria || !data.filename) {
        res.json({ message: "Hiányos adatok!" });
        return;
    }

    const newMusor = await prisma.musor.create({
        data: {
            nev: nev,
            kiadas: keletkezes,
            leiras: leiras,
            kategoria: kategoria,
            kep: data.filename
        }
    });

    res.json(newMusor);
}*/

const getMusor = async (req, res) => {
    const musor = await prisma.musor.findUnique({
        where: {
            id: parseInt(req.headers['x-custom-header'])
        }
    });
    res.json(musor);
}

    const getMesek = async (req, res) => {
        const mesek = await prisma.musor.findMany({
            where: {
                kategoria: "mese"
            }

        })
        res.json(mesek);
    }
const getFilmek = async (req, res) => {
    const filmek = await prisma.musor.findMany({
        where: {
            kategoria: "film"
        }

    })
    res.json(filmek);
}


const getSorozat = async (req, res) => {
    const sorozatok = await prisma.musor.findMany({
        where: {
            kategoria: "sorozat"
        }

    })  
    res.json(sorozatok);
}

const kivansaglista = async (req, res) => {
    const kivansag = await prisma.user.findMany({
        where: {
            kategoria: "kedvencek"
        }
    })
    res.json(kivansag);
}


module.exports = {
    getMusor,
    getFilmek,
    getMesek,
    getSorozat,
    kivansaglista
}