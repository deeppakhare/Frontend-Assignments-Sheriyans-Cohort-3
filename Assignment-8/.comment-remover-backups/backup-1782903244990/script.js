const registerBtn = document.getElementById("registerBtn");
const loginBtn = document.getElementById("loginBtn")



if(registerBtn) {
registerBtn.addEventListener("click",() => {
    const username = document.getElementById('registerUsername').value.trim();
    const password = document.getElementById('registerPassword').value.trim();
    
    if(username === "" || password === ""){
        alert("Enter valid credential")
        return;
    }
    
    let user = {
        username,
        password
    }

    localStorage.setItem(
        "user",
        JSON.stringify(user)
    )

    alert("Regestration Successfully. Please Login.");

    window.location.href = "login.html";
});
}


if(loginBtn) {
    loginBtn.addEventListener("click", () => {
        const username = document.getElementById('loginUsername').value.trim();
        const password = document.getElementById('loginPassword').value.trim();

        const storedUser = JSON.parse(
            localStorage.getItem("user")
        )        
        
    if (!storedUser) {
        alert("Not account found. Please register")
        return;
    }  
        
    if (username === storedUser.username && password === storedUser.password) {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("currentUser", storedUser.username);

        alert("Login Successufully.");
        window.location.href = "index.html";
    } else {
        alert("Invalid username & password")
    }


    })
}