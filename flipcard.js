//class is for superset
//id is for subset

function shuffler(array) {
  //fisher-yates shuffle
  for (let i = array.length - 1; i >= 0; i--) {
    //iterate from back to front
    let randomIndex = Math.floor(Math.random() * (i + 1));
    [array[i], array[randomIndex]] = [array[randomIndex], array[i]]; //destructuring assignment: Swap the element at i with the element at randomIndex
  }
  console.log("shuffled: ", array);
  return array;
}

function gridmaker(randomsArray) {
  console.log("making grids");
  //get the grid container
  let container = document.getElementById("grid-container");

  randomsArray.forEach((element, index) => {
    //go through the randomsArray and apply settings to them
    console.log("loop through array to make grids");

    //create a div element for each number
    let grids = document.createElement("div"); //declare grids (#note1)

    //apply class to these new divs
    grids.classList.add("grid-item");

    //Adds an ID to the element
    //grids.setAttribute('id', 'grid-item');

    //set the number inside the randoms array as the card content
    grids.textContent = element;

    // set data attribute to store the array's element
    grids.setAttribute("data-number", element);

    // Set a unique ID based on the element or index
    grids.id = "grid-" + index; //making subset

    // Append the card to the grid container
    container.appendChild(grids);
  });
}

function matchCheck(card) {
  let matchedCounter = 0;
  let card1 = card[0];
  let card2 = card[1];
  console.log(`card 1 ${card1}, card 2 ${card2}`);

  //we can get the attribute because the grid div itself is inside the array
  if (card1.getAttribute("data-number") == card2.getAttribute("data-number")) {
    //match found, add a class to get style that makes the card stays open

    //add class signifies they are opened
    card1.classList.add("open-card");
    card2.classList.add("open-card");

    //remove previous class
    card1.classList.remove("selected");
    card2.classList.remove("selected");
    card1.classList.remove("grid-item");
    card2.classList.remove("grid-item");

    //hide them
    /*card1.style.visibility = 'hidden';
        card2.style.visibility = 'hidden';*/
    card1.classList.add("hidden");
    card2.classList.add("hidden");

    matchedCounter += 2; //because there's a pair of card gone
    return matchedCounter;
  } else {
    // If not a match, hide
    card1.classList.remove("selected");
    card2.classList.remove("selected");
    return matchedCounter;
  }
}

function winCheck(matchcount, win) {
  console.log("[checking win...]");
  if (matchcount == win) {
    clearInterval(timerInterval);
    setTimeout(() => {
      window.alert("You Win! All pairs matched.");
      console.log("win");
    }, 300); // Delay by 300ms
  } else {
    console.log("[no win]");
  }
}

//most of the game session values stay here
//because we stay on this function most of the time
function gameloop(win) {
  let selectedCards = [];
  let matchcount = 0;

  //re-select ALL the grids again because it was in gridmaker function (#note1)
  //This selects all elements with the class grid-item and returns a NodeList (an array-like object). Now you have all the grid items.
  let grids = document.querySelectorAll(".grid-item"); //calling superset

  //now we add event listener for the grids
  grids.forEach((grid) => {
    grid.addEventListener("click", function () {
      // Prevent clicking on already matched / selected cards
      if (
        grid.classList.contains("open-card") ||
        grid.classList.contains("selected") ||
        selectedCards.length === 2
      )
        return;

      //print what gets clicked in console
      console.log("clicked ", grid.textContent);

      // Special handling for the zero card
      if (grid.getAttribute("data-number") == "0") {
        grid.classList.add("hidden"); // Hide zero immediately
        matchcount++; // Increment matchcount for the zero card
        console.log("Bonus zero clicked, disappears!");
        winCheck(matchcount, win); // Check for win after zero is clicked
        return; // No need to proceed with matching logic for zero
      }

      //push the entire grid div object as an element in the array
      selectedCards.push(grid);

      //add class so it gets style associated with that class
      grid.classList.add("selected");

      if (selectedCards.length == 2) {
        matchcount += matchCheck(selectedCards);
        selectedCards = []; //clear selected cards
        console.log("matched count ", matchcount);
        winCheck(matchcount, win); // Check win after each match
      }
    });
  });
}

function setBackgroundImage(imageNum) {
  // Set the background image based on the level or game state
  //get the element using its class by typing dot `.`, if id, we use #
  let playground = document.querySelector("#image-container");
  playground.style.backgroundImage = `url('img/num${imageNum}.jpg')`;
  playground.style.backgroundSize = "cover";
  playground.style.backgroundPosition = "center";
}

let timerInterval;
let startTime;

function startClock() {
  startTime = Date.now(); // Record the start time
  timerInterval = setInterval(updateClock, 1000); // Update the clock every second
}

function updateClock() {
  const now = Date.now();
  const elapsedTime = Math.floor((now - startTime) / 1000); // Calculate elapsed time in seconds
  document.getElementById("clock").textContent = formatTime(elapsedTime);
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`; // Format as mm:ss
}

function resetClock() {
  clearInterval(timerInterval); // Stop the clock
  document.getElementById("clock").textContent = "0:00"; // Reset the clock display
}

function reset() {
  console.log("[RESET]");
  resetClock();
  //get the grid container
  let container = document.getElementById("grid-container");

  // Clear the container's contents (this removes added elements from previous games)
  container.innerHTML = "";

  // Only remove the grid items, not all
  //container.querySelectorAll('.grid-item').forEach(item => item.remove());

  //removing background image
  let playground = document.querySelector("#image-container");
  playground.style.backgroundImage = `none`;
}

function start() {
  let array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  reset();
  startClock();
  console.log("[random1 shuffling]");
  let random1 = shuffler(array);
  console.log("[random2 shuffling] ");
  let random2 = shuffler(array);
  let randoms = random1.concat(random2);
  console.log("[concatenated] ", randoms);
  console.log("shuffling ends");

  //the grids must build perfect square when arranged.
  /*
    so I remove one zero from the randoms array. 
    because perfect square can only be formed when the grids
    is on odd number. while pairs are even number.
    */
  // Remove one zero from the shuffled array
  let zeroIndex = randoms.indexOf(0); // Find the index of the first zero
  randoms.splice(zeroIndex, 1); // Remove one zero
  /*
    but this only removes the first 0, meaning the 2nd zero will be always
    on the 2nd parts of the grid. so we shuffle it again
    */
  console.log("[one zero removed:] ");
  let finalRandom = shuffler(randoms);

  let length = finalRandom.length;
  console.log("[length] ", length);

  gridmaker(finalRandom);

  imageArray = [1, 2, 3];
  imageArrayShuffle = shuffler(imageArray);
  imageNumber = imageArrayShuffle[0]; //the first element will be the image number
  setBackgroundImage(imageNumber); //set after the DOM made and loaded by gridmaker

  gameloop(finalRandom.length);
}

//selecting the HTML element with the ID start-btn. This assigns the button element to the variable startbtn.
let startbtn = document.getElementById("start-btn");
// Add a click event listener to the button
startbtn.addEventListener("click", function () {
  start(); // Call a function when the button is clicked
});

let resetbtn = document.getElementById("reset-btn");
resetbtn.addEventListener("click", function () {
  reset();
});
