const fs = require('fs').promises;

const assertEqual = (expected, actual) => {
  console.log(expected === actual);
}

var fileName = './day5.txt'

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
  'FBFBBFFRLR',
  'BFFFBBFRRR',
  'FFFBBBFRRR',
  'BBFFBBFRLL'
];

const listTestValue = () => {
  // return testInput;
  return generateInputList(fileName);
}

const day5 = async () => {
  list = await listTestValue();
  var FB, LR, FBiter, LRiter, currFB, currLR;
  var currRow = 0, currCol = 0;
  var currRowDividend, currColDividend;
  var seatIDList = [];
  for (let i = 0; i < list.length; i++) {
    FB = list[i].substring(0,7);
    LR = list[i].substring(7,10);
    currRow = 0;
    currRowDividend = 64;
    currCol = 0;
    currColDividend = 4;
    for (FBiter = 0; FBiter < 7; FBiter++) {
      currFB = FB[FBiter];
      if (currFB === 'B') {
        currRow += currRowDividend;
      }
      currRowDividend /= 2;
    }
    for (LRiter = 0; LRiter < 3; LRiter++) {
      currLR = LR[LRiter];
      if (currLR === 'R') {
        currCol += currColDividend;
      }
      currColDividend /= 2;
    }
    seatIDList.push((currRow * 8) + currCol);
  }
  console.log(Math.max(...seatIDList));
}

const day5Part2 = async () => {
  list = await listTestValue();
  var FB, LR, FBiter, LRiter, currFB, currLR;
  var currRow = 0, currCol = 0;
  var currRowDividend, currColDividend;
  var seatIDList = [];
  for (let i = 0; i < list.length; i++) {
    FB = list[i].substring(0,7);
    LR = list[i].substring(7,10);
    currRow = 0;
    currRowDividend = 64;
    currCol = 0;
    currColDividend = 4;
    for (FBiter = 0; FBiter < 7; FBiter++) {
      currFB = FB[FBiter];
      if (currFB === 'B') {
        currRow += currRowDividend;
      }
      currRowDividend /= 2;
    }
    for (LRiter = 0; LRiter < 3; LRiter++) {
      currLR = LR[LRiter];
      if (currLR === 'R') {
        currCol += currColDividend;
      }
      currColDividend /= 2;
    }
    seatIDList.push((currRow * 8) + currCol);
  }

  // Find the missing boarding pass
  var minSeatID = Math.min(...seatIDList);
  var maxSeatID = Math.max(...seatIDList);
  var currSeatID = minSeatID;
  var sortedSeatIDList = seatIDList.sort((a, b) => {
    return a - b;
  });
  console.log(sortedSeatIDList);
  for (let i = 1; i < sortedSeatIDList.length - 1; i++) {
    
    if (
      sortedSeatIDList[i + 1] === sortedSeatIDList[i] + 1 &&
      sortedSeatIDList[i - 1] === sortedSeatIDList[i] - 1
      ) continue;
    else console.log(sortedSeatIDList[i]); // This gives me the two numbers that are one apart from the missing boarding pass ID
    
  }
}

day5Part2();