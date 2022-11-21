const selectLis = [...document.querySelectorAll("#selectShow ul li")];
const cardsShows = [...document.querySelectorAll(".cardsShow")];
const cardExpansion = document.getElementById("cardExpansion");

selectLis.forEach(li => li.addEventListener("click", (e) => {
    selectLis.forEach(allLi => allLi.classList.remove("is_active"));
    e.target.classList.add("is_active");

    cardsShows.forEach(cardsShow => cardsShow.classList.remove("is_show"));
    document.getElementById(e.target.id + "Cards").classList.add("is_show");
}))

const cardImages = [...document.querySelectorAll(".cardsShow img")];
cardImages.forEach(elem => elem.addEventListener("click", (e) => {
    cardExpansion.classList.add("is_visible");
    console.log(e.target);
    cardExpansion.insertAdjacentElement("beforeend", e.target.cloneNode());
}))

cardExpansion.addEventListener("click", (e) => {
    e.target.classList.remove("is_visible");
    cardExpansion.innerHTML = "";
})




