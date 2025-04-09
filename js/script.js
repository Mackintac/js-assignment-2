const smoothieForm = document.getElementById('smoothie-form');

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

class Smoothie {
  constructor(name, fruits, addOns) {
    this.name = name;
    this.fruits = fruits;
    this.addOns = addOns;
  }
}

function fruitOptions() {
  const fruitSection = document.querySelector('.fruit-options');
  fruitsArr.forEach((fruit) => {
    let fruitOptionLabel = document.createElement('label');
    let fruitOption = document.createElement('input');

    fruitOption.setAttribute('type', 'radio');
    fruitOption.setAttribute('class', 'fruit-option');
    fruitOption.setAttribute('name', 'fruit-group');
    fruitOption.setAttribute('value', fruit);

    fruitOptionLabel.append(fruitOption);
    fruitOptionLabel.append(fruit);
    fruitSection.append(fruitOptionLabel);
  });
}

function addOnsOptions() {
  const addOnSection = document.querySelector('.addOn-options');
  addOnsArr.forEach((addOn) => {
    let addOnOptionLabel = document.createElement('label');
    let addOnOption = document.createElement('input');

    addOnOption.setAttribute('type', 'radio');
    addOnOption.setAttribute('class', 'addOn-option');
    addOnOption.setAttribute('name', 'addOn-group');
    addOnOption.setAttribute('value', addOn);

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
