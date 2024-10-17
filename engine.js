//it is far not optimal compared to fisher-yates shuffle, but it is my own
function shuffler(){
    let reference = [1,2,3,4,5,6,7,8,9,10];
    let randomizedArray = [];

    while(randomizedArray.length < reference.length){
        let randomIndex = Math.floor(Math.random() * reference.length);// by multiplying without adding 1, we generate from 0 to 9
        let check = reference[randomIndex]
        if(randomizedArray.includes(check)){
            continue;
        }
        let steal = reference[randomIndex];
        randomizedArray.push(steal);
    }

    console.log("shuffled: ", randomizedArray);
    return randomizedArray;
}

function gridmaker(randomsArray){
    //get the grid container
    let container = document.getElementById('grid-container');
    
    // Clear the container's contents (this removes added elements from previous games)
    container.innerHTML = '';

    randomsArray.forEach(element => { //go through the randomsArray and apply settings to them
        //create a div element for each number
        let grids = document.createElement('div');
        grids.classList.add('grid-item');//apply class to these new divs
        grids.textContent = element; //set the number inside the randoms array as the card content
        grids.setAttribute('data-number', element); // set data attribute to store the array's element
        //card.style.visibility = 'hidden'; //hide the number initially

        // Append the card to the grid container
        container.appendChild(grids);
    });
    
}

function reset(){

    console.log("random1: ");
    let random1 = shuffler();
    console.log("random2: ");
    let random2 = shuffler();
    let randoms = random1.concat(random2);
    console.log("randoms: ", randoms);
    console.log("shuffling ends");

    gridmaker(randoms);
}
//selecting the HTML element with the ID start-btn. This assigns the button element to the variable startbtn.
let startbtn = document.getElementById('start-btn');
// Add a click event listener to the button
startbtn.addEventListener('click', function() {
    reset();  // Call a function when the button is clicked
  });