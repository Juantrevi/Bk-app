'use strict';

//Arrays methods
//Arrays are also objects, and methods are attached

let arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g' ];

//Slice method
console.log(arr.slice(2));
// [ 'c', 'd', 'e', 'f', 'g' ]

console.log(arr.slice(2, 4));
// [ 'c', 'd' ]

console.log(arr.slice(-2))
// [ 'f', 'g' ]

console.log(arr.slice(-1))
// [ 'g' ]

console.log(arr.slice(1, -2))
// [ 'b', 'c', 'd', 'e' ]

//Create a copy
console.log(arr.slice());
//Or
console.log([...arr]);

//Splice (Works as the slice but this MUTATES/CHANGES the array)
// console.log(arr.splice(2));
console.log(arr);
// [ 'a', 'b' ]

//Taking the last element of a array
arr.splice(-1);
console.log(arr);
// [ 'a', 'b', 'c', 'd', 'e', 'f' ]


//REVERSE (It does mutate the originar array)
const arr2 = [ 'j', 'i', 'h', 'g', 'f', 'e' ];
arr2.reverse();
console.log(arr2);
// [ 'e', 'f', 'g', 'h', 'i', 'j' ]

// CONCAT METHOD
const letters = arr.concat(arr2);
console.log(letters);
// [
//     'a', 'b', 'c', 'd',
//     'e', 'f', 'e', 'f',
//     'g', 'h', 'i', 'j'
// ]
//OR
console.log(...arr, ...arr2);
// a b c d e f e f g h i j

//JOIN METHOD (It joins with the letter we specified)
console.log(letters.join('-'))
// a-b-c-d-e-f-e-f-g-h-i-j


const arr3 = [23, 11, 64];
console.log(arr3.at(0));
// 23
//It's like saying arr3[0].
//the .at it's useful to get for example the last item
console.log(arr3.at(-1));


//Foreach method to loop an array

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

for (const [i, movement] of movements.entries()) {
    if(movement > 0 ){
        console.log(`Movement: ${i + 1} You deposited ${movement}`);
    }else {
        console.log(`Movement: ${i + 1} You withdrew ${Math.abs(movement)}`);
    }
}
// You deposited 200
// You deposited 450
// You withdrew 400
// You deposited 3000
// You withdrew 650
// You withdrew 130
// You deposited 70
// You deposited 1300


console.log('----------ForEach----------'); //--> Cannot CONTINUE or BREAK in this loop

//Foreach is a higher level function which requires a callback function in order to tell it what to do
//First parameter is the currentelement, then index and then the entire array that we're looping
movements.forEach(function (mov, i, arr){
    if(mov > 0 ){
        console.log(`Movement: ${i + 1} You deposited ${mov}`);
    }else {
        console.log(`Movement: ${i + 1} You withdrew ${Math.abs(mov)}`);
    }
})
// You deposited 200
// You deposited 450
// You withdrew 400
// You deposited 3000
// You withdrew 650
// You withdrew 130
// You deposited 70
// You deposited 1300


//FOREACH On Maps

const currencies = new Map([
    ['USD', 'United States dollar'],
    ['EUR', 'Euro'],
    ['GBP', 'Pound sterling'],
]);


currencies.forEach(function (value, key, map){
    console.log(`${key}: ${value}`);
})
// USD: United States dollar
// EUR: Euro
// GBP: Pound sterling

//FOREACH On Sets
const currenciesUnique = new Set(['USD', 'GBP', 'EUR', 'ARG', 'YUN', 'PND', 'USD', 'EUR']);
console.log(currenciesUnique);

//Sets dont have keys or order, but when foreach was designed they kept the key parameter for structure purposes
//So normally we use _ that in JS means a throable variable (Completely unnecessary)
currenciesUnique.forEach(function (value, _, map){
    console.log(`${key}: ${value}`);
})


//--------------------MAP, FILTER and REDUCE---------------------
// Map: A method to loop arrays, but it creates a new array from an original array
//For example, each elements multiply by 2, it will create a new array wmultiplying each number

//Filter: Filter elements from an original array that satisfy a condition
//For example, if element is > than 2

//Reduce: Boils all elements down to a single value (Example adding all elements together)















































