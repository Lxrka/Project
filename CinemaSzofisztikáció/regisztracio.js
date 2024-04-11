const regButton = document.querySelector('#register');

regButton.addEventListener('click', async (e) => {
    e.preventDefault()
    const email = document.querySelector('#email').value;
    const felhasznalonev = document.querySelector('#username').value;
    const szulev = document.querySelector('#date').value;
    const telszam = document.querySelector('#phonenumber').value;
    const jelszo = document.querySelector('#password').value;

    const regFormData = {
        email,
        felhasznalonev,
        szulev,
        telszam,
        jelszo
    }

    const response = await fetch ("http://localhost:8000/user/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(regFormData)
    });

    
    const data = await response.json();
    if (!data.token) {
        alert(data.message);
        return;
    }
    localStorage.setItem("userToken", JSON.stringify(data.token));
    window.location.href = "main.html";

});