const smoothieForm = document.getElementById('smoothie-form');

// create arrays containing initial options for fruits and addons
const addOnsArr = [
  'Whey Protein',
  'Creatine',
  'Oat Milk',
  'Chia Seeds',
  'Flax seeds',
  'Secret Powder',
];
const fruitsArr = [
  'Banana',
  'Strawberries',
  'Raspberries',
  'Blueberries',
  'Dragonfruit',
  'Acai berries',
  'Mango',
  'Pineapple',
  'Kiwi',
  'Peach',
  'Cherries',
  'Pomegranate',
];

// simple smooothie class to hold information regarding the smoothie order
class Smoothie {
  constructor(name, fruits, addOns) {
    this.name = name;
    this.fruits = fruits;
    this.addOns = addOns;
  }
}

// function to make elements for the respective fruit items from the fruitsArr
function fruitOptions() {
  // selects and stores the selection of the element with the fruit-options class
  const fruitSection = document.querySelector('.fruit-options');

  // forEach loop creating radio selection elements for unique option selection, changed from checkboxes due to wanting indiviual item selections
  fruitsArr.forEach((fruit) => {
    let fruitOptionLabel = document.createElement('label');
    let fruitOption = document.createElement('input');

    // setting the appropriate attributes to the newly created elements
    fruitOption.setAttribute('type', 'radio');
    fruitOption.setAttribute('class', 'fruit-option');
    fruitOption.setAttribute('name', 'fruit-group');
    fruitOption.setAttribute('value', fruit);

    // add the newly created elements to the existing (and previously selected) elements in the document
    fruitOptionLabel.append(fruitOption);
    fruitOptionLabel.append(fruit);
    fruitSection.append(fruitOptionLabel);
  });
}

// function to make elements for the respective fruit items from the addOnsArr
function addOnsOptions() {
  // selects and stores the selection of the element with the addOn-options class
  const addOnSection = document.querySelector('.addOn-options');

  // forEach loop creating radio selection elements for unique option selection, changed from checkboxes due to wanting indiviual item selections
  addOnsArr.forEach((addOn) => {
    let addOnOptionLabel = document.createElement('label');
    let addOnOption = document.createElement('input');

    // setting the appropriate attributes to the newly created elements
    addOnOption.setAttribute('type', 'radio');
    addOnOption.setAttribute('class', 'addOn-option');
    addOnOption.setAttribute('name', 'addOn-group');
    addOnOption.setAttribute('value', addOn);

    // add the newly created elements to the existing (and previously selected) elements in the document
    addOnOptionLabel.append(addOnOption);
    addOnOptionLabel.append(addOn);
    addOnSection.append(addOnOptionLabel);
  });
}

// creates elements to attach the respective options to
const fruitDiv = document.createElement('div');
fruitDiv.classList.add('fruit-options');
const addOnDiv = document.createElement('div');
addOnDiv.classList.add('addOn-options');

document.querySelector('.select-fruits').after(fruitDiv);
document.querySelector('.select-addons').after(addOnDiv);

// calls the resepctive functions to create the elements
fruitOptions();
addOnsOptions();

// creates and sets the location+attributes of the element which will display the user's order when submitted
let output = document.createElement('div');
output.setAttribute('id', 'smoothie-output');
smoothieForm.after(output);

// simple string builder for the selected options, originally meant to handle several fruits and addons
function describeSmoothie(smoothie) {
  return `${smoothie.name}'s smoothie includes: ${smoothie.fruits.join(
    ', '
  )}; with add-ons: ${smoothie.addOns.join(', ') || 'none'}.`;
}

// event listener for the submit event, grabs the currently checked item information via forEach loops, creates the smoothie object with these values
smoothieForm.addEventListener('submit', (e) => {
  // if there is an error, cancels execution of this arrow function via preventDefault()
  e.preventDefault();

  // grabs the customer-name element's value, and utilizes short-circuiting to provide a default value in the very very unlikely event that the form is submitted with the value empty
  const name = document.getElementById('customer-name').value || 'Customer';

  // finds all elements where the option had the :checked class appended to them and adds their value to the newly created empty selectedFruits
  let selectedFruits = [];
  document.querySelectorAll('.fruit-option:checked').forEach((f) => {
    selectedFruits.push(f.value);
  });

  // finds all elements where the option had the :checked class appended to them and adds their value to the newly created empty selectedAddOns
  let selectedAddOns = [];
  document.querySelectorAll('.addOn-option:checked').forEach((a) => {
    selectedAddOns.push(a.value);
  });

  // creates the smoothie object using gathered values
  const smoothie = new Smoothie(name, selectedFruits, selectedAddOns);

  // updates the text value of the smoothie-output element to the string-builder's output
  document.getElementById('smoothie-output').textContent =
    describeSmoothie(smoothie);

  // utilizes the reset() method to reset all of the form values after the form is submitted
  smoothieForm.reset();
});
