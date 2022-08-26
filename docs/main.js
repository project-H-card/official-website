console.log("loaded!");
const hamburgerBtn = document.getElementById("hamburgerBtn");
hamburgerBtn.addEventListener("click", (e) => {
    document.querySelector("header nav ul").classList.toggle("active");
})