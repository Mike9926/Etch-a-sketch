
const grid = document.querySelector(".gridBox");
const userInput = document.getElementById("gridSize");
const resetBtn = document.querySelector(".reset");

createGrid = () => {
  for (let i = 0; i < 256; i++) {
    const div = document.createElement("div");
    div.classList.add("square");
    grid.appendChild(div);
  }
};

updateGrid = () => {
  grid.innerHTML = "";
  grid.style.setProperty(
    "grid-template-columns",
    `repeat(${userInput.value}, 2fr)`
  );
  grid.style.setProperty(
    "grid-template-rows",
    `repeat(${userInput.value}, 2fr)`
  );
  for (let i = 0; i < userInput.value * userInput.value; i++) {
   if (userInput.value < 10 || userInput.value > 100)
   {
     alert("Oops! Please enter value between 10 and 100");
     return;
     
   }
   
    const div = document.createElement("div");
    div.classList.add("square");
    grid.appendChild(div);
  }
  console.log(userInput.value);
};

const square = document.querySelector("div");
square.addEventListener("mouseover", function(event) {
  event.target.classList.replace("square", "color");
});

userInput.addEventListener("change", updateGrid);

resetBtn.addEventListener("click", function() {
  grid.innerHTML = "";
  userInput.value = "";
  grid.style.setProperty("grid-template-columns", `repeat(12, 2fr)`);
  grid.style.setProperty("grid-template-rows", `repeat(12, 2fr)`);
  createGrid();
});

createGrid();