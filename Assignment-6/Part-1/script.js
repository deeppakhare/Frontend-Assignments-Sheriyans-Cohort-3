let body = document.querySelector('body');
let themeBtn = document.querySelector('#themeBtn')

addEventListener('click',() => {
    document.body.style.backgroundColor = "black";
    themeBtn.innerHTML = `
    <i class="ri-moon-line"></i>
    `
    addEventListener('click',() => {
    document.body.style.backgroundColor = "white";
    themeBtn.innerHTML = `
    <i class="ri-sun-line">
    `
    
}
);
}
);