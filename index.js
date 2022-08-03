// Import stylesheets
import './style.css';

// Write Javascript code!
const appDiv = document.getElementById('app');
appDiv.innerHTML = `<h1>JS Starter</h1>`;



const solve = x => {
  const sorted = x.sort((a, b) => a - b);
  const grouped = sorted.map((x, i, a) => i == a.findIndex((x2, i2) => i2 - x2 == i - x) && a.filter((x2, i2) => i2 - x2 == i - x) || []);
  const ranged = grouped.map(x => x.length > 2 ? x[0] + '-' + x.slice(-1)[0] : x);
  return ranged.flat().join(',');
}
const x = [-6, -3, -2, -1, 0, 1, 3, 4, 5, 7, 8, 9, 10, 11, 14, 15, 17, 18, 19, 20];
console.log(solve(x));

const y = ['A','B'];
console.log(solve(y));