const { groupCollapsed } = require('console');

const fs = require('fs').promises;

const assertEqual = (expected, actual) => {
  console.log(expected === actual);
}

var fileName = './day6.txt'

var generateInputList = async (txtFile) => {
  try {
    var list = [];
    const data = await fs.readFile(txtFile, 'utf8')
    list = data.split('\r\n')
    console.log(list);
    return list;
  } catch (err) {
    console.log(err);
    return;
  }
}

var testInput = ['niujdxegbrtlq dxiljmqektnur usxdvtphcernzi ityruneqdxw',
'',
'lztnekjhv hlvenzktw ptknvebzgh',
'',
'qd d d d'];

const listTestValue = () => {
  // return testInput;
  return generateInputList(fileName);
}

var letters = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z'
]

const day6 = async () => {
  list = await listTestValue();
  // consolidate each subsection of items into their own items
  var consolidatedList = [];
  var listIte = 0;
  var consoListItem = "";
  while (listIte < list.length) {
    consoListItem += list[listIte];
    if (list[listIte + 1] === '' || !list[listIte+1]) {
      consolidatedList.push(consoListItem.trim());
      consoListItem = "";
    }
    else consoListItem += " ";
    listIte++;
  }
  console.log(consolidatedList);

  var letterCount;
  var group;
  var yesSum = 0;
  for (let i = 0; i < consolidatedList.length; i++) {
    group = consolidatedList[i];
    letterCount = 0;
    for (let j = 0; j < letters.length; j++) {
      if (group.includes(letters[j])) letterCount++;
    }
    yesSum += letterCount;
  }
  console.log(yesSum);
}

const day6Part2 = async () => {
  list = await listTestValue();
  // consolidate each subsection of items into their own items
  var consolidatedList = [];
  var listIte = 0;
  var consoListItem = "";
  while (listIte < list.length) {
    consoListItem += list[listIte];
    if (list[listIte + 1] === '' || !list[listIte+1]) {
      consolidatedList.push(consoListItem.trim());
      consoListItem = "";
    }
    else consoListItem += " ";
    listIte++;
  }
  console.log(consolidatedList);

  var letterCount;
  var group;
  var allPartsOfGroup;
  var yesSum = 0;
  for (let i = 0; i < consolidatedList.length; i++) {
    group = consolidatedList[i].split(' ');
    letterCount = 0;
    console.log(group);
    for (let j = 0; j < letters.length; j++) {
      for (let k = 0; k < group.length; k++) {
        allPartsOfGroup = true;
        if (!group[k].includes(letters[j])) {
          allPartsOfGroup = false;
          break;
        }
      }
      if (allPartsOfGroup) letterCount++;
      
    }
    // console.log(letterCount);
    yesSum += letterCount;
  }
  console.log(yesSum);
}

day6Part2();