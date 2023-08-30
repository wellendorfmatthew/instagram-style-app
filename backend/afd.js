const fruits = ["Banana", "Orange", "Apple", "Mango"];
console.log(fruits.length);

console.log(fruits.toString()); // Takes an array and basically every element and comma is converted to a string
console.log(fruits.join(" ")); // Takes an array and converts to string however you can pick what value determines the separator
console.log(fruits.pop()); // Removes last element of array and returns the element
console.log(fruits.push("grapefruit")); // Adds an element to the array and returns the length of array
console.log(fruits.shift()); // Removes first element and shifts all other elements to lower indices
console.log(fruits.unshift("Lemon")); // Adds a new element to front of list and shifts all others back to old places
fruits[fruits.length] = 'Kiwi'; // This allows you to append a new element to the end of an array
fruits.splice(2, 0, "Dragonfruit", "Grape"); // Splice allows you to assign where to put elements, how many to remove, and then the elements to put in
console.log(fruits);
fruits.splice(0, 1); // Allows you to delete elements in the array
console.log(fruits);
const citrus = fruits.slice(1); // Allows you to create a new array by stating which element to start at on the current one
console.log(citrus);