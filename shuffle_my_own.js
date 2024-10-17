let reference = [1,2,3,4,5,6,7,8,9,10];
let randomizedArray = [];

console.log("before: ", reference);

while(randomizedArray.length < reference.length){
    let randomIndex = Math.floor(Math.random() * reference.length);// by multiplying without adding 1, we generate from 0 to 9
    let check = reference[randomIndex]
    if(randomizedArray.includes(check)){
        continue;
    }
    let steal = reference[randomIndex];
    randomizedArray.push(steal);
}

console.log("after: ", randomizedArray);

//using splice (gpt idea):
/*
let reference = [1,2,3,4,5,6,7,8,9,10];
let randomizedArray = [];

console.log("before: ", reference);

while(randomizedArray.length < 10){
    let randomIndex = Math.floor(Math.random() * reference.length);// by multiplying without adding 1, we generate from 0 to 9
    let steal = reference.splice(randomIndex, 1)[0]; // Use splice to remove an element from normalArray at random index
    randomizedArray.push(steal);
}

console.log("after: ", randomizedArray);
*/