// Declare variables
let coordinates = [[8,10],[9,10],[10,10],[11,10],[12,10]];
const directionSteps = ["left", "down", "right", "up"];
const directionCoords = {"left": [-1, 0], "down": [0, 1], "right": [1, 0], "up": [0, -1]};
const container = document.querySelector("#container");
let direction = directionCoords["left"];
let cubes = document.querySelectorAll(".snake-cube");
const button = document.querySelector("#button");
const gameOverText = document.querySelector("#game-over");
let moveModulo = 35; // Events will trigger on every nth frame
let frameIndex = 0;
let gameState = "menu";
let nCube = 1; // nth cube that has been added
let cubeJustAdded = false;
const gridVmins = 4
const loot = document.querySelector("#loot");
let lootPos = []
let reClickable = true;

// Add listener/s
window.addEventListener("keydown", handleKeyPress)
button.addEventListener("click", restartGame)

// One time code

moveLoot();
updatePositions();

// Init functions

function moveLoot() {
  let randX = Math.floor((Math.random()) * 19);
  let randY = Math.floor((Math.random()) * 19);
  lootPos = [randX, randY];
  loot.style.transform = ("translateX(" + ((randX * gridVmins) + 0.7) + "vmin)" + " " + 
                         "translateY(" + ((randY * gridVmins) + 0.7) + "vmin)");
  //loot.style.transform = ()
}

function handleKeyPress(event) {
  if (event.key === "s") {
    direction = directionCoords["down"];
  } else if (event.key === "d") {
    direction = directionCoords["right"];
  } else if (event.key === "w") {
    direction = directionCoords["up"];
  } else if (event.key === "a") {
    direction = directionCoords["left"];
  } else if (event.key === " ") {
    addCube();
  }
}


function updateCoordinates() {
  coordinates.unshift([coordinates[0][0]+direction[0],coordinates[0][1]+direction[1]]); // Append new coord
  if (!cubeJustAdded) {
    coordinates.pop(); // Remove last coord  
  }
}

function updatePositions() {
  for (i = 0; i < cubes.length; i++) {
    console.log("Trying to access cube " + [i]);
    cubes[i].style.transform = ("translateX(" + (coordinates[i][0] * gridVmins) + "vmin) translateY(" + (coordinates[i][1] * gridVmins) + "vmin)");
    cubes[i].textContent = (`${coordinates[i][0]}` + "," + `${coordinates[i][1]}`)
    cubes[i].style.opacity = ("100%")
  } 
}

function addCube() {
  if(gameState !== "gameOver" && !cubeJustAdded) {
    console.log("Adding cube");
    const newCube = document.createElement("div")
    newCube.classList.add("snake-cube");
    newCube.style.opacity = ("0%")
    container.appendChild(newCube);
    cubes = document.querySelectorAll(".snake-cube");
    cubeJustAdded = true;
  }
}

function checkCollision() {
  if(coordinates[0][0] < 0 || coordinates[0][0] > 19) {
    endGame()
  } else if (coordinates[0][1] < 0 || coordinates [0][1] > 19) {
    endGame()
  }
}

function endGame() {
  gameState = "gameOver";
  container.style.background = ("black");
  gameOverText.style.zIndex = ("50");
  cubes[0].style.boxShadow = ("inset 0px 0px 0px 2px red");
  cubes[0].style.zIndex = ("100");
  loot.style.opacity = ("0");
  for (let i = 1; i < cubes.length; i++) {
    cubes[i].style.boxShadow = ("inset 0px 0px 0px 2px white");
    cubes[i].style.outline = ("0px solid green");
  }

  button.style.zIndex = (100);
  button.textContent = ("Restart");
}

function checkGobble() {
  if (lootPos[0] === coordinates[0][0] && lootPos[1] === coordinates[0][1]) {
    addCube();
    moveLoot();
    moveModulo--;
  }
}

function checkSelfCollision() {
  for (let i = 1; i < coordinates.length; i++) {
    if(coordinates[0][0] === coordinates[i][0] && coordinates[0][1] === coordinates[i][1]) {
      endGame();
    }
  }
}

function resetBlockColors() {
    for (cube of cubes) {
        cube.style.background = ("black"); 
        cube.style.boxShadow = ("inset 0px 0px 0px 0.1vmin rgb(23, 135, 26)");
    }
}

function deleteExtraBlocks() {
    let counter = 0;
    for (cube of cubes) {
        if (counter > 4) {
            cube.remove();
        }
        counter++;
    }
    cubes = document.querySelectorAll(".snake-cube");
}

// Game loop

function gameLoop() {
    console.log(gameState);
    if(gameState === "gameOver") {
        return;
    }
    //console.log("new frame");
    frameIndex++;
    if (frameIndex % moveModulo === 0 && gameState !== "gameOver") {
        checkGobble();
        updateCoordinates();
        updatePositions();
        checkCollision();
        checkSelfCollision();
        cubeJustAdded = false; // Reset this var before next loop
  }
  
  // Remember to setup the next animation frame before you finish
  requestAnimationFrame(gameLoop);
}

// Nothing will happen until this button is clicked

function restartGame() {
    if(reClickable === true) {
        console.log("hello?");
        button.style.zIndex = ("-1");
        reClickable = true;
        gameOverText.style.zIndex = ("-1");
        coordinates = [[8,10],[9,10],[10,10],[11,10],[12,10]];
        direction = directionCoords["left"];
        gameState = "playing";
        container.firstChild.textContent = ("");
        container.style.background = ("rgb(23, 135, 26)");
        loot.style.opacity = ("100");

        deleteExtraBlocks();
        moveLoot();
        updatePositions();
        resetBlockColors();
        
        requestAnimationFrame(gameLoop);
    }
}