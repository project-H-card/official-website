const selectLis = [...document.querySelectorAll("#selectShow ul li")];
const cardsShows = [...document.querySelectorAll(".cardsShow")];

selectLis.forEach(li => li.addEventListener("click", (e) => {
    selectLis.forEach(allLi => allLi.classList.remove("is_active"));
    e.target.classList.add("is_active");

    cardsShows.forEach(cardsShow => cardsShow.classList.remove("is_show"));
    document.getElementById(e.target.id + "Cards").classList.add("is_show");
}))






