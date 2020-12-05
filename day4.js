const fs = require('fs').promises;

const assertEqual = (expected, actual) => {
  console.log(expected === actual);
}

var fileName = './day4.txt'

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

const listTestValue = () => {
  let testValue = [
    'pid:316587303 iyr:2016 eyr:2023 ecl:blu byr:1959 hgt:186cm hcl:#733820',
  ];
  // return testValue;
  return generateInputList(fileName);
}

const day4 = async () => {
  var list = await listTestValue();
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

  var requiredFields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];
  // var requiredField;
  var requiredFieldCount;
  var validPassportCount = 0;

  for (let i = 0; i < consolidatedList.length; i++) {
    requiredFieldCount = 0;
    for (let j = 0; j < requiredFields.length; j++) {
      if (consolidatedList[i].includes(requiredFields[j])) {
        requiredFieldCount++;
      }
    }
    if (requiredFieldCount === requiredFields.length) validPassportCount++;
  }
  console.log(consolidatedList);
  console.log(validPassportCount);
}

const day4Part2 = async () => {
  var list = await listTestValue();
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

  var requiredFields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];
  var requiredField, requiredFieldCount, value;
  var validPassportCount = 0;
  var splitListOfItem;
  var acceptableEclList = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'];

  for (let i = 0; i < consolidatedList.length; i++) {
    requiredFieldCount = 0;
    splitListOfItem = consolidatedList[i].split(' ');
    // console.log(splitListOfItem);
    for (let j = 0; j < requiredFields.length; j++) {
      var fieldIndex = splitListOfItem.findIndex(item => item.includes(requiredFields[j]))
      // console.log(fieldIndex);
      if (fieldIndex > -1) {
        // Validate each field
        value = splitListOfItem[fieldIndex].substr(4,);
        requiredField = requiredFields[j];
        switch (requiredField) {
          case 'byr':
            if (parseInt(value) >= 1920 && parseInt(value) <= 2002 && value.length === 4) requiredFieldCount++;
            break;
          case 'iyr':
            if (parseInt(value) >= 2010 && parseInt(value) <= 2020 && value.length === 4) requiredFieldCount++;
            break;
          case 'eyr':
            if (parseInt(value) >= 2020 && parseInt(value) <= 2030 && value.length === 4) requiredFieldCount++;
            break;
          case 'hgt':
            console.log(value);
            let regex = /^(\d+)(in|cm)$/
            let tag = value.match(regex)
            if (!regex.test(value)) break;
            if (tag[2] == 'in') {
              if (parseInt(tag[1]) >= 59 && parseInt(tag[1]) <= 76) requiredFieldCount++;
            }
            else if (tag[2] = 'cm') {
              if (parseInt(tag[1]) >= 150 && parseInt(tag[1]) <= 193) requiredFieldCount++;
            }
            break;
          case 'hcl':
            console.log(value);
            if (/^#[0-9a-f]{6}$/.test(value)) {
              console.log("accepted");
              requiredFieldCount++;
            }
            break;
          case 'ecl':
            if (acceptableEclList.includes(value)) {
              requiredFieldCount++;
            }
            
            break;
          case 'pid':
            if (value.length === 9 && /[0-9]{9}/.test(value)) {
              requiredFieldCount++;
            }
            break;
        }
        
      }
      else break;
    }
    if (requiredFieldCount === requiredFields.length) validPassportCount++;
  }
  console.log(consolidatedList);
  console.log(validPassportCount);
}

day4Part2();