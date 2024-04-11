const express = require('express');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');

const { PrismaClient } = require("@prisma/client");
const path = require('path');

const prisma = new PrismaClient();
const app = express();
const PORT = 8000;

app.use(express.json());
app.use(cors());
app.use('/user', require('./routes/userRoutes'));
app.use('/musor', require('./routes/musorRoutes'));
app.use('/kritika', require('./routes/kritikaRoutes'));
app.use('/kedvenc', require('./routes/kedvencRoutes'));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
//multer beallitasaa
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = './uploads';
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        // uid letrehozasa
        const uid = Math.random().toString(36).substring(7);
        const ext = file.mimetype.split('/')[1];
        cb(null, `${uid}.${ext}`);


    }
});
const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, true)
        }
        else {
            cb(null, false)
        }

    }
});

app.post('/upload', upload.single('image'), async (req, res) => {
    if (!req.file || !req.body) {
        res.json({message: "Nincs kép vagy adat!"});
        return;
    }

    const data = {
        filename: req.file.filename,
        bodyData: req.body
    }
    const {nev,keletkezes, leiras,kategoria, kritika, ertekeles, email} = data.bodyData;
    if(!nev || !keletkezes || !leiras ||!kategoria || !data.filename){
        res.json({message: "Hiányos adatok!"});
        return;
    }

    const ido = new Date(keletkezes.split(' ')[0]).toISOString()

    const newMusor = await prisma.musor.create({
        data: {
            nev:nev,
            kiadas: ido,
            leiras:leiras ,
            kategoria:kategoria,
            kep: data.filename
        }
    });

    let felhasznaloId = await prisma.user.findUnique({where:{email: email}})

    let ertek = ertekeles

    const newErtekeles = await prisma.kritika.create({
        data: {
            ertekeles: parseInt(ertek),
            tartalma: kritika,
            Felhasznalo: {connect: {id: felhasznaloId.id}},
            Musor: {connect: {id: newMusor.id}}
        }
    })

    console.log(newErtekeles)

     res.json({message:"sikeres film feltoltes!"});
});

//kepet ad vissza
app.get('/musorok/image/:name', async (req, res) => {
    const imageName = req.params.name
    if (!imageName || imageName === '') {
        res.status(404).send('Bad requiest')
        return;
    }
    //kepkereses
    const filePath = path.join(__dirname, 'uploads', imageName);
    const fileExists = fs.existsSync(filePath);
    if (!fileExists) {
        res.status(404).send("File not found")
        return;
    }
    const imageData = await fs.promises.readFile(filePath);
    res.contentType("image/jpeg");
    res.send(imageData);
});

app.get('/', (req, res) => {
    res.json({ message: "kepek" })
});



