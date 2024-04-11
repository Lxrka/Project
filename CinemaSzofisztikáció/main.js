let user;
window.onload = async () => {
   const token = JSON.parse(localStorage.getItem("userToken"));

   if(!token || token === undefined) {
    window.location.href = "login.html";
    }
   
   const response = await fetch('http://localhost:8000/user/me', {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    }
   });
   const data = await response.json();
   //console.log(data)
   if (!data.email) {
    window.location.href = "login.html";
   }
}
