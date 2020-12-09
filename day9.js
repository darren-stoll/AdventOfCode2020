const fs = require('fs').promises;

const assertEqual = (expected, actual) => {
  console.log(expected === actual);
}

var fileName = './day9.txt'

var generateInputList = async (txtFile) => {
  try {
    var list = [];
    const data = await fs.readFile(txtFile, 'utf8')
    list = data.split('\r\n')
    // console.log(list);
    return list;
  } catch (err) {
    console.log(err);
    return;
  }
}

var testInput = [
  35,
  20,
  15,
  25,
  47,
  40,
  62,
  55,
  65,
  95,
  102,
  117,
  150,
  182,
  127,
  219,
  299,
  277,
  309,
  576
];

const listTestValue = () => {
  // return testInput;
  return generateInputList(fileName);
}

const sumWithPreamble = (list, preamble) => {
  let inc = preamble;
  let breakOut = false;
  let foundAnEqual;
  while (inc < list.length) {
    foundAnEqual = false;
    breakOut = false;
    for (let i = inc - preamble; i < inc; i++) {
      for (let j = i + 1; j < inc; j++) {
        if (list[i] + list[j] === list[inc]) {
          foundAnEqual = true;
          breakOut = true;
          break;
        }
      }
      if (breakOut) break;
    }
    if (!foundAnEqual) {
      return {
        invalidNum: list[inc], // <-- Answer
        invalidNumPos: inc
      };
    }
    inc++;
  }
  return null;
}

// const day9 = async () => {
//   list = await listTestValue();
//   var listToInt = [];
//   for (let i = 0; i < list.length; i++) {
//     listToInt.push(parseInt(list[i]));
//   }
//   console.log(listToInt);
//   console.log(sumWithPreamble(listToInt, 25));
// }

const findContiguousRange = (list, invalidNum, invalidNumPos) => {
  let inc = 0;
  let sum;
  while (inc < invalidNumPos) {
    for (let i = inc; i < invalidNumPos; i++) {
      for (let j = i + 1; j < invalidNumPos; j++) {
        sum = 0;
        for (k = i; k < j + 1; k++) {
          sum += list[k];
        }
        if (sum === invalidNum) {
          let contiguousArr = list.slice(i, j + 1);

          console.log(Math.max(...contiguousArr) + Math.min(...contiguousArr)); // <-- Answer
          return;
        }
        
      }
    }
    inc++;
  }
  
  
}

const day9Part2 = async () => {
  list = await listTestValue();
  var listToInt = [];
  for (let i = 0; i < list.length; i++) {
    listToInt.push(parseInt(list[i]));
  }
  console.log(listToInt);
  let { invalidNum, invalidNumPos } = sumWithPreamble(listToInt, 25);
  console.log(invalidNum);
  findContiguousRange(listToInt, invalidNum, invalidNumPos);
}

day9Part2();