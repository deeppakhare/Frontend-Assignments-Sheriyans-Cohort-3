const isLoggedIn = localStorage.getItem("isLoggedIn");
const userName = document.querySelectorAll('.userName'); 
const currentUser = localStorage.getItem('currentUser');
const logoutBtn = document.getElementById('logoutBtn');

if (isLoggedIn !== "true") {
    window.location.href = "login.html";
}

logoutBtn.addEventListener("click", () => {
    localStorage.removeItem('isLoggedIn');
    window.location.href = "login.html";
})


if (currentUser) {
  userName.forEach(span => {
    span.textContent = currentUser;
  });
}


