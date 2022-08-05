// Import stylesheets
import './style.css';

// Write Javascript code!
const appDiv = document.getElementById('app');
appDiv.innerHTML = `<h1>JS Starter</h1>`;
function rangeExpand(_this) {
  var ths = _this.split('–'),
    start = parseInt(ths[0]),
    end = parseInt(ths[1]);
  return Array(end - start + 1)
    .fill()
    .map((_, idx) => start + idx);
}
String.prototype.expandNumbers = function () {
  var commaSplit,
    arr = [],
    _this = this.toLocaleString();
  if (_this.indexOf('–') == -1 && _this.indexOf(',') == -1) {
    // ? no nDash | comma
    arr.push(_this);
  } else if (_this.indexOf('–') != -1 && _this.indexOf(',') == -1) {
    // ? Only nDash
    var NewSplit = rangeExpand(_this);
    $.each(NewSplit, function (indexInArray, valueOfElement) {
      arr.push(valueOfElement);
    });
  } else if (_this.indexOf(',') != -1) {
    // ? combined
    commaSplit = _this.split(',');
    $.each(commaSplit, function (index, Element) {
      if (Element.indexOf('–') == -1) {
        arr.push(Element);
      } else {
        var wSplit = rangeExpand(Element);
        $.each(wSplit, function (ind, node) {
          arr.push(node);
        });
      }
    });
  }
  return arr.sort(function (a, b) {
    return a - b;
  });
};
Array.prototype.join2 = function (all, last) {
  //https://stackoverflow.com/questions/15069587/is-there-a-way-to-join-the-elements-in-an-js-array-but-let-the-last-separator-b
  try {
    last = last ? last : all;
    var arr = this.slice(); // ? make a copy so we don't mess with the original
    var lastItem = arr.splice(-1); // ? strip out the last element
    arr = arr.length ? [arr.join(all)] : []; // ? make an array with the non-last elements joined with our 'all' string, or make an empty array
    arr.push(lastItem); // ? add last item back so we should have ["some string with first stuff split by 'all'", last item]; or we'll just have [lastItem] if there was only one item, or we'll have [] if there was nothing in the original array
    return arr.join(last); // ?now we join the array with 'last'
  } catch (err) {
    console.warn(err.message);
    ErrorLogTrace('Array.prototype.join2', err.message);
  }
};

var FromCharCode = function (char) {
  //console.log(char);
  return String.fromCharCode(parseInt(char));
};

const solve = (x) => {
  let IsAlpha = !1;
  x = [].concat(
    ...x.map((x) => {
      let char = x;
      IsAlpha = !0;
      let text = x.toString().replace('-', '–');
      //console.log('---> ' + text.indexOf('–') > 0);
      if (text.indexOf('–') > 0) {
        //console.log('---> ' + text);
        let split = text.split('–');
        let char_1 = split[0],
          char_2 = split[1];
        let retun_val = [
          isNaN(char_1) ? char_1.charCodeAt(0) : char_1,
          isNaN(char_1) ? char_2.charCodeAt(0) : char_2,
        ]
          .join('–')
          .expandNumbers();
        console.log('retun_val');
        console.log(retun_val);
        return retun_val;
      } else return isNaN(x) ? char.charCodeAt(0) : x;
    })
  );
  //console.log(x);
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
  let final = ranged.flat();
  //console.log(final);
  if (IsAlpha) {
    let aplha = final.map((x, i, r) => {
      //console.log(typeof x)
      if (x.toString().indexOf('-') > -1) {
        let split = x.split('-');
        return FromCharCode(split[0]).concat('-', FromCharCode(split[1]));
      } else return isNaN(x) ? x : FromCharCode(x);
    });
    return aplha.join2(', ', ' and ');
  } else return final.join2(', ', ' and ');
};
const x = [
  -6, -3, -2, -1, 0, 1, 3, 4, 5, 7, 8, 9, 10, 11, 14, 15, 17, 18, 19, 20,
];
//console.log(solve(x));

const y = ['A', 'B', 'C', 'E', 'G'];
//console.log(solve(y));
let fina_a = document.querySelector('a');
document.getElementById('tnput').addEventListener('input', function () {
  //console.log(this.id, this.value);
  //console.log(filter);
  setTimeout(
    function (_) {
      let filter = _.value
        .replace(/\B(?=(.{1})+(?!.))/g, ',')
        .split(/[\s , and]+/)
        .filter((c, index, arr) => {
          return arr.indexOf(c) === index;
        })
        .filter(Boolean);
      //console.log(filter)
      filter = [...new Set(filter)];
      let new_val = solve(filter);
      //console.log(new_val)

      fina_a.textContent = fina_a.textContent + new_val;
    },
    1000,
    this
  );
});

let val = 'A, B ,  and D'.split(/[\s , and]+/);

//console.log(val);

let expand = [65, 67].join('–').expandNumbers();
//console.log(expand);

console.log('1-23abc'.replace(/\B(?=(.{1})+(?!.))/g, ','));

let txt = fina_a.textContent;
let dom = document.getElementById('demo');
dom.append(fina_a.cloneNode(true));
let a = dom.querySelector('a');
let inner_html = a.innerHTML;
console.log(inner_html);
if (inner_html.indexOf(', ')) {
  inner_html = inner_html.split(', ').join('</a>, <a class="comma">');
}
if (inner_html.indexOf(' and ')) {
  inner_html = inner_html.split(' and ').join('</a> and <a class="and">');
}
console.log(inner_html);
inner_html = '<a>' + inner_html + '</a>';
console.log(inner_html);
dom.innerHTML = inner_html;
console.log(dom.innerHTML);
