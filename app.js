// Get the grid container element and user input field
const grid = document.querySelector(".gridBox");
const userInput = document.getElementById("gridSize");

// Get the reset button element
const resetBtn = document.querySelector(".reset");

// Keep track of whether the mouse is currently being held down
let mouseDown = false;
let doubleClick = false;

// Function to create the initial 16x16 grid
createGrid = () => {
  for (let i = 0; i < 256; i++) {
    const div = document.createElement("div");
    div.classList.add("square");
    grid.appendChild(div);
  }
};

// Function to update the grid based on user input
updateGrid = () => {

  // Clear the grid container element
  grid.innerHTML = "";

  // Set the grid columns and rows based on the user input value
  grid.style.setProperty(
    "grid-template-columns",
    `repeat(${userInput.value}, 2fr)`
  );
  grid.style.setProperty(
    "grid-template-rows",
    `repeat(${userInput.value}, 2fr)`
  );

  // Check if the user input value is within the specified range (10-100)
  if (userInput.value < 10 || userInput.value > 100) {
    alert("Oops! Please enter value between 10 and 100");
    return; // Stop the function if the input value is invalid
  }

  // Create the grid squares based on the user input value
  for (let i = 0; i < userInput.value * userInput.value; i++) {
    const div = document.createElement("div");
    div.classList.add("square");
    grid.appendChild(div);

    // Add event listeners to the grid squares to change color on mouse/touchpad interactions
    div.addEventListener("mousedown", function(event) {
      if (doubleClick) {
        // Start drawing when the mouse is double-clicked and held down
        event.target.classList.replace("square", "color");
        mouseDown = true;
      } else {
        doubleClick = true;
        setTimeout(() => {
          doubleClick = false;
        }, 300);
      }
    });

    div.addEventListener("mouseup", function(event) {
      // Stop drawing when the mouse button is released
      mouseDown = false;
    });

    div.addEventListener("mousemove", function(event) {
      // Continue drawing as the mouse is moved while the button is held down
      if (mouseDown) {
        event.target.classList.replace("square", "color");
      }
    });

    div.addEventListener("touchstart", function(event) {
      if (doubleClick) {
        // Start drawing when the touchpad is double-tapped and held down
        event.target.classList.replace("square", "color");
        mouseDown = true;
      } else {
        doubleClick = true;
        setTimeout(() => {
          doubleClick = false;
        }, 300);
      }
    });

    div.addEventListener("touchend", function(event) {
      // Stop drawing when the touchpad is released
      mouseDown = false;
    });

    div.addEventListener("touchmove", function(event) {
      // Continue drawing as the touchpad is moved while touched
      if (mouseDown) {
        event.target.classList.replace("square", "color");
      }
    });
  }
};

// Add event listener to the user input field to update the grid on change
userInput.addEventListener("change", updateGrid);

// Add event listener to the reset button to clear the grid and reset to default size
resetBtn.addEventListener("click", function() {
  // Clear the user input field
  userInput.value = "";
  
  // Reset the grid to the initial 16x16 size
  grid.style.setProperty("grid-template-columns", "repeat(16, 2fr)");
  grid.style.setProperty("grid-template-rows", "repeat(16, 2fr)");
  
  // Remove all grid squares from the grid container element
  const squares = document.querySelectorAll(".square");
  squares.forEach((square) => {
  square.remove();
  });
  
  // Recreate the initial 16x16 grid
  createGrid();
  });
