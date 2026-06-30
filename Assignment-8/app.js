const isLoggedIn = localStorage.getItem("isLoggedIn");
const userName = document.querySelectorAll('.userName'); 
const currentUser = localStorage.getItem('currentUser');


if (isLoggedIn !== "true") {
    window.location.href = "login.html";
}



if (currentUser) {
  userName.forEach(span => {
    span.textContent = currentUser;
  });
}


