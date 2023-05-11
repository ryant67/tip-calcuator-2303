// TODO: Handle user input of initial bill value
// TODO: Handle user selection of the gratuity, both default and custom values
// TODO: Handle user input of number of people to split the bill between
// TODO: Handle calculation of tip per person and total bill per person
// TODO: Handle resetting the calculator
// TODO: Handle appropriate styling for gratuities
// -> If a pre-set gratuity is selected, it should appear active.
// -> If no a pre-set gratuity is selected, or the user is providing a custom tip,
//    the buttons should NOT have appear active
// TODO: Handle appropriate styling for reset btn
// -> If there has been no value calculated, the reset btn should not work
// -> If the tips have been calculated, the reset btn should work

// !! Figma File Link :: https://www.figma.com/file/QcBtJ2rFIPtAcCb0bxmHea/tip-calculator-app?type=design&node-id=0-1&t=vneSsg9Qw4qG6emq-0

// Note: The elements needed have been queried for you here
// ** Query elements
const bill = document.getElementById('bill');
const gratuityBtns = document.querySelectorAll('.gratuity');
const customGratuity = document.getElementById('custom-gratuity');
const people = document.getElementById('people');
const splitTip = document.getElementById('split-tip');
const splitTotal = document.getElementById('split-total');
const resetBtn = document.getElementById('reset');

// ** Your work goes below here

let standardTip;
let customTip;

// ** Event Listeners -- Start
let btnArr = [...gratuityBtns];
btnArr.forEach((btn) => {
  btn.addEventListener('click', () => {
    btn.classList.add('active');
    customGratuity.value = '';
    standardTip = Number(btn.value);
    btnArr
      .filter((item) => {
        return item != btn;
      })
      .forEach((item) => {
        item.classList.remove('active');
      });
  });
});

customGratuity.addEventListener('click', () => {
  gratuityBtns.forEach((btn) => btn.classList.remove('active'));
});

resetBtn.addEventListener('click', () => {
  resetForm();
});

people.addEventListener('change', () => {
  handleCalculations();
});

// ** Event Listeners -- End

// ** Utility Functions -- Start

function resetGratuities() {
  gratuityBtns.forEach((btn) => btn.classList.remove('active'));
  customGratuity.value = '';
}

function resetForm() {
  resetGratuities();
  bill.value = '';
  people.value = '';
  splitTip.innerText = '$ 0.00';
  splitTotal.innerText = '$ 0.00';
}

function getInputs() {
  const billTotal = Number(bill.value);
  const totalPeople = Number(people.value);
  customTip = Number(customGratuity.value);

  if (customTip === 0) {
    return {
      billTotal: billTotal,
      tip: standardTip,
      totalPeople: totalPeople,
    };
  } else if (customTip !== 0) {
    return {
      billTotal: billTotal,
      tip: customTip,
      totalPeople: totalPeople,
    };
  }
}

function handleCalculations() {
  const { billTotal, tip, totalPeople } = getInputs();

  const tipAmount = billTotal * (tip * 0.01);
  const billWithTip = tipAmount + billTotal;

  const tipPerPerson = tipAmount / totalPeople;
  const billPerPerson = billWithTip / totalPeople;

  document.getElementById('split-tip').innerText = `$ ${tipPerPerson}`;
  document.getElementById('split-total').innerText = `$ ${billPerPerson}`;
}

// ** Utility Functions -- End
