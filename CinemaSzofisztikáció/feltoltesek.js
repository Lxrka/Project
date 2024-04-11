const feltoltesButton = document.querySelector('#feltoltesButton');
const uploadForm = document.querySelector('#upload')
const token = JSON.parse(localStorage.getItem("userToken"));

uploadForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    const file = document.querySelector('#kep').files[0];
    //let file = e.target.kep.files[0];   
    const nev = document.querySelector('#nev').value;
    const keletkezes = document.querySelector('#keletkezes').value;
    const leiras = document.querySelector('#leiras').value;
    const kategoria= document.querySelector('#kategoria').value;
    const ertekeles = document.querySelector('#ertekeles').value;
    const kritika = document.querySelector('#kritika').value;
    const me = await fetch('http://localhost:8000/user/me', {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    }
   });

    let email = await me.json();
    console.log(email)

    let formData = new FormData();
    formData.append('nev', nev);
    formData.append('keletkezes', keletkezes.toString());
    formData.append('leiras', leiras);
    formData.append('kategoria', kategoria);
    formData.append('kritika', kritika);
    formData.append('ertekeles', ertekeles);
    formData.append('email', email.email);
    formData.append('image', file);

    const response = await fetch("http://localhost:8000/upload", {
        method: "POST",
        body: formData
    });

    const data = await response.json();
    if (!data.token) {
        alert(data.message);
        return;
    }
    localStorage.setItem("userToken", JSON.stringify(data.token));
    window.location.href = "feltoltesek.html";

});
