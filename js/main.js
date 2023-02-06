import Pacman from './unit/Pacman.js'

// Adding the `clone` method to the Object prototype
Object.prototype.clone = function () {
  // Creating a new object and assigning it to the `newObj` variable
  // If the object that the method is being called on is an instance of an Array,
  // `newObj` will be an empty array, otherwise it will be an empty object
  const newObj = (this instanceof Array) ? [] : {};

  // Looping through all the properties of the object that the method is being called on
  for (const i in this) {
    // Skipping the `clone` property to avoid infinite recursion
    if (i === 'clone') continue;

    // If the current property is an object, calling the `clone` method on it,
    // otherwise just copying the value to the new object
    newObj[i] = typeof this[i] === 'object' ? this[i].clone() : this[i];
  }

  // Returning the new object
  return newObj;
};

// Initialize a new Pacman instance
new Pacman(document.getElementById('pacman'))
