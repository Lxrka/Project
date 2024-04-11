const loginButton = document.querySelector('#login');

loginButton.addEventListener('click', async (e) => {

    e.preventDefault();

    const email = document.querySelector('#email').value;
    const jelszo = document.querySelector('#password').value;

    const regFormData = {
        email,
        jelszo
    }

    const response = await fetch("http://localhost:8000/user/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(regFormData)
    });

    const data = await response.json();

    if(!data.token) {
        alert(data.message);
        return;
    }

    localStorage.setItem("userToken", JSON.stringify(data.token));


    window.location.href = "main.html";
})



