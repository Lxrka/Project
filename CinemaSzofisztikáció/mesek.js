const token = JSON.parse(localStorage.getItem('userToken'));

async function getMesek() {
    let kfn = new Set();
    let mesek = [];
    mesek = await fetch('http://localhost:8000/musor/mesek', {
        method: 'GET',
    })
    mesek = await mesek.json();
    for (let index = 0; index < mesek.length; index++) {
        const element = mesek[index];
        kfn.add(element.nev)
    }
    console.log(kfn)
    return kfn
}

function kivamsagGomb() {
    var kivamsagGomb = document.querySelectorAll('.kivamsaglistaGomb');
    for (let i = 0; i < kivamsagGomb.length; i++) {
        kivamsagGomb[i].addEventListener('click', async (e) => {
            let felhasznalo = await fetch('http://localhost:8000/user/me', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            felhasznalo = await felhasznalo.json();
            let felhasznaloId = felhasznalo.id;
            let button = e.target;
            let musorNev = button.getAttribute('musorNev');
            let tartalma = button.getAttribute('ertekeles');
            let kep = button.getAttribute('kep');
            let musorId = button.getAttribute('musorId');
            console.log(felhasznaloId, musorNev, tartalma, kep)
            let kivamsag = await fetch('http://localhost:8000/kedvenc/postkedvenc', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    felhasznaloId: felhasznaloId,
                    musorId: musorId,
                    tartalma: tartalma,
                })
            });
            kivamsag = await kivamsag.json();
            console.log(kivamsag)
        })
    }
}

async function getErtekelesek(kfn) {
    let ertekelesek = [];
    for (let v of kfn) {
        ertekelesek[v] = []
        let kritika = await fetch('http://localhost:8000/kritika/kritika', {
            method: 'GET',
            headers: {
                'X-Custom-Header': v,
                'X-Custom-Header2': 'mese'
            }
        }) 
        kritika = await kritika.json();
            for (let i = 0; i < kritika.length; i++) {
                ertekelesek[kritika[i].musorNev].push({
                    felhasznaloId: kritika[i].felhasznaloId,
                    felhasznaloNev: kritika[i].felhasznaloNev,
                    kritika: kritika[i].tartalma,
                    ertekeles: kritika[i].ertekeles,
                    musorNev: kritika[i].musorNev,
                    musorId: kritika[i].musorId,
                    kep: kritika[i].kep
                })
            }
    }

    return ertekelesek
}

function generateCards(ertekelesek, kfn) {
    for (var value of kfn) {
        if (ertekelesek[value].length == 0) {
            continue
        }
        // Creating elements
        const section = document.createElement('section');
        const comment = document.createElement('div');
        comment.classList.add('comment');
        const titleWrapper = document.createElement('div');
        const title = document.createElement('h1');
        title.classList.add('cim');
        title.textContent = value;
        titleWrapper.appendChild(title);
        const reviewsWrapper = document.createElement('div');
        reviewsWrapper.classList.add('ex3');

        // Looping through reviews
        ertekelesek[value].forEach(review => {
            const user = document.createElement('h2');
            user.textContent = review.felhasznaloNev;
            const opinion = document.createElement('h3');
            opinion.textContent = review.kritika;
            const rating = document.createElement('h3');
            rating.textContent = review.ertekeles.toString();
            reviewsWrapper.appendChild(user);
            reviewsWrapper.appendChild(opinion);
            reviewsWrapper.appendChild(rating);
        });

        // Creating card elements
        const wrapper = document.createElement("div");
        wrapper.classList.add("wrapper");
        const card = document.createElement("div");
        card.classList.add("card");
        const poster = document.createElement("div");
        poster.classList.add("poster");
        const details = document.createElement("div");
        details.classList.add("details");
        const img = new Image();
        img.src = "helo/uploads/" + ertekelesek[value][0].kep;
        img.alt = "Location Unknown";
        const desc = document.createElement("p");
        desc.classList.add("desc");
        const button = document.createElement("button");
        button.classList.add("kivamsaglistaGomb");
        button.setAttribute("musorNev", ertekelesek[value][0].musorNev);
        button.setAttribute("kep", ertekelesek[value][0].kep);
        button.setAttribute("ertekeles", ertekelesek[value][0].kritika);
        button.setAttribute("musorId", ertekelesek[value][0].musorId);
        button.textContent = "add";
        poster.appendChild(img);
        details.appendChild(desc);
        details.appendChild(button);
        card.appendChild(poster);
        card.appendChild(details);
        wrapper.appendChild(card);
        comment.appendChild(titleWrapper)
        comment.appendChild(reviewsWrapper)

        // Appending elements to section
        /*section.appendChild(titleWrapper);
        section.appendChild(reviewsWrapper);*/
        section.appendChild(wrapper);
        section.appendChild(comment);

        // Appending section to body
        document.body.appendChild(section);
    }
}

async function start() {
    let kfn = await getMesek();
    let ertekelesek = await getErtekelesek(kfn);
    generateCards(ertekelesek, kfn)
    kivamsagGomb()
}

window.onload = start