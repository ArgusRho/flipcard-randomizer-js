function fisherYatesShuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        // Pick a random index from 0 to i
        let randomIndex = Math.floor(Math.random() * (i + 1));
        //destructuring assignment: Swap the element at i with the element at randomIndex
        [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
    }
    return array;
}

let normalArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log("Original Array: ", normalArray);

// Shuffle the array
let shuffledArray = fisherYatesShuffle(normalArray);
console.log("Shuffled Array: ", shuffledArray);
