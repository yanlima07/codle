function changeRanking1() {
  document.getElementById("crownWhite").style.display = "none";
  document.getElementById("crownYellow").style.display = "flex";
  document.getElementById("streakText").style.display = "flex";
  document.getElementById("geralText").style.display = "none";
}

function changeRanking2() {
  document.getElementById("crownWhite").style.display = "flex";
  document.getElementById("crownYellow").style.display = "none";
  document.getElementById("streakText").style.display = "none";
  document.getElementById("geralText").style.display = "flex";
}

function toggleDarkMode() {
  document.body.classList.toggle("dark");
}
