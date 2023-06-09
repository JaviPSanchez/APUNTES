/*
CODING CHALLENGE #4

Let's improve Steven's tip calculator even more, this time using loops!
Your tasks:
*/

// 1. Create an array 'bills' containing all 10 test bill values
// Test data: 22, 295, 176, 440, 37, 105, 10, 1100, 86 and 52

const bills = [22, 295, 176, 440, 37, 105, 10, 1100, 86, 52];

// 2. Create empty arrays for the tips and the totals ('tips' and 'totals')

const tips = [];
const totals = [];

// 3. Use the 'calcTip' function we wrote before (no need to repeat) to calculate tips and total values (bill + tip) for every bill value in the bills array. Use a for loop to perform the 10 calculations!

function calcTip(bill) {
  if (bill >= 50 && bill <= 300) {
    const tip15 = (bill * 15) / 100;
    // console.log(`15% de tip, o sea ${tip15}.`);
    return tip15;
  } else {
    const tip20 = (bill * 20) / 100;
    // console.log(`20% de tip, o sea ${tip20}.`);
    return tip20;
  }
}
for (let i = 0; i < bills.length; i++) {
  const tip = calcTip(bills[i]);
  tips.push(tip);
  // totals.push(tips + bills[i]); //Opcion mas limpia.
}
for (let i = 0; i < bills.length; i++) {
  const totalLoop = tips[i] + bills[i];
  totals.push(totalLoop);
}
console.log(bills, tips, totals);

// Bonus:
// 4. Bonus: Write a function 'calcAverage' which takes an array called 'arr' as
// an argument. This function calculates the average of all numbers in the given
// array. This is a difficult challenge (we haven't done this before)! Here is how to
// solve it:
// 4.1. First, you will need to add up all values in the array. To do the addition, start by creating a variable 'sum' that starts at 0. Then loop over the array using a for loop. In each iteration, add the current value to the 'sum' variable. This way, by the end of the loop, you have all values added together.
// 4.2. To calculate the average, divide the sum you calculated before by the length of the array (because that's the number of elements).
// 4.3. Call the function with the 'totals' array.

const calcAverage = function (arr) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i]; // sum = sum + arr[i];
  }
  return sum / arr.length;
};
console.log(calcAverage(totals));
console.log(calcAverage(tips));

const multiply = [1, 2, 3, 4, 5];
function grow(num) {
  for (let i = 0; i < multiply.length; i++) {
    multiplicar = multiplicar * num[i];
  }
  return multiplicar;
}
