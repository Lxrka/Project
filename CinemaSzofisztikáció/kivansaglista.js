const token = JSON.parse(localStorage.getItem('userToken'));

async function getkedvencek() {
    const response = await fetch('http://localhost:8000/user/me', {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    let data = await response.json();
    const kedvencdata = await fetch('http://localhost:8000/kedvenc/getkedvenc', {
        headers: {
            'X-Custom-Header': data.id
        }
    });
    data = await kedvencdata.json();
    let kedvencek = [];
    for (let i = 0; i < data.length; i++) {
        kedvencek[i] = await fetch('http://localhost:8000/musor/getMusor', {
            headers: {
                'X-Custom-Header': data[i].musorId
            }
        });
        kedvencek[i] = await kedvencek[i].json();
    }
    return kedvencek
}

function generateCards(kedvencek) {
    if (kedvencek.length == 0 ){
        return
    }
    let main = document.querySelector('#musorokContainer');
    for (let i = 0; i < kedvencek.length; i++) {
        let wrapper = document.createElement('div');
        wrapper.setAttribute('class', 'wrapper');
        let card = document.createElement('div');
        card.setAttribute('class', 'card');
        let poster = document.createElement('div');
        poster.setAttribute('class', 'poster');
        let img = new Image()
        img.src = "helo/uploads/" + kedvencek[i].kep
        img.alt = "Location Unknown";
        let details = document.createElement('div');
        details.setAttribute('class', 'details');
        let desc = document.createElement('p');
        desc.textContent = kedvencek[i].leiras;
        let title = document.createElement('h1');
        title.textContent = kedvencek[i].musorNev;
        poster.appendChild(img)
        details.appendChild(title);
        details.appendChild(desc);
        card.appendChild(poster);
        card.appendChild(details);
        wrapper.appendChild(card);
        main.appendChild(wrapper);
    }
}

window.onload = async () => {
    const kedvencek = await getkedvencek();
    generateCards(kedvencek)
}