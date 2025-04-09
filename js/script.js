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

const fruitDiv = document.createElement('div');
fruitDiv.classList.add('fruit-options');
const addOnDiv = document.createElement('div');
addOnDiv.classList.add('addOn-options');

document.querySelector('.select-fruits').after(fruitDiv);
document.querySelector('.select-addons').after(addOnDiv);

fruitOptions();
addOnsOptions();

let output = document.createElement('div');
output.setAttribute('id', 'smoothie-output');
smoothieForm.after(output);

function describeSmoothie(smoothie) {
  return `${smoothie.name}'s smoothie includes: ${smoothie.fruits.join(
    ', '
  )}; with add-ons: ${smoothie.addOns.join(', ') || 'none'}.`;
}

smoothieForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('customer-name').value || 'Customer';

  let selectedFruits = [];
  document.querySelectorAll('.fruit-option:checked').forEach((f) => {
    selectedFruits.push(f.value);
  });

  let selectedAddOns = [];
  document.querySelectorAll('.addOn-option:checked').forEach((a) => {
    selectedAddOns.push(a.value);
  });

  const smoothie = new Smoothie(name, selectedFruits, selectedAddOns);
  document.getElementById('smoothie-output').textContent =
    describeSmoothie(smoothie);

  smoothieForm.reset();
});
