// Import stylesheets
import './style.css';

// Write Javascript code!
const appDiv = document.getElementById('app');
appDiv.innerHTML = `<h1>JS Starter</h1>`;

var FromCharCode = function (char) {
  //console.log(char);
  return String.fromCharCode(parseInt(char));
};

const solve = (x) => {
  let IsAlpha = !1;
  x = x.map((x) => {
    let char = x;
    IsAlpha = !0;
    return isNaN(x) ? char.charCodeAt(0) : x;
  });
  console.log(x);
  const sorted = x.sort((a, b) => a - b);
  const grouped = sorted.map(
    (x, i, a) =>
      (i == a.findIndex((x2, i2) => i2 - x2 == i - x) &&
        a.filter((x2, i2) => i2 - x2 == i - x)) ||
      []
  );
  const ranged = grouped.map((x) =>
    x.length > 2 ? x[0] + '-' + x.slice(-1)[0] : x
  );
  let final = ranged.flat().join(',');
  //console.log(final);
  if (IsAlpha) {
    let aplha = final.split(',').map((x) => {
      if (x.indexOf('-') > -1) {
        let split = x.split('-');
        return FromCharCode(split[0]).concat('-', FromCharCode(split[1]));
      } else return isNaN(x) ? x : FromCharCode(x);
    });
    return aplha.join(',');
  } else return final;
};
const x = [
  -6, -3, -2, -1, 0, 1, 3, 4, 5, 7, 8, 9, 10, 11, 14, 15, 17, 18, 19, 20,
];
//console.log(solve(x));

const y = ['A', 'B', 'C', 'E', 'G'];
console.log(solve(y));
