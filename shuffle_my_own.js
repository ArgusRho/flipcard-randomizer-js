let normalArray = [1,2,3,4,5,6,7,8,9,10];
let randomizedArray = [];

console.log("before");
for(let i=0; i<10;i++){
    console.log(normalArray[i]);
}

while(randomizedArray.length < 10){
    let randomIndex = Math.floor(Math.random() * normalArray.length);// by multiplying without adding 1, we generate from 0 to 9
    let steal = normalArray.splice(randomIndex, 1)[0]; // Use splice to remove an element from normalArray at random index
    randomizedArray.push(steal);
}

console.log("after");
for(let i=0; i<10;i++){
    console.log(randomizedArray[i]);
}