const fs = require('fs').promises;

const assertEqual = (expected, actual) => {
  console.log(expected === actual);
}

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

const listTestValue = () => {
  // return ['1-3 a: abc', '1-2 b: fgh', '5-9 c: ccccdddee', '1-3 b: bbb'];
  return generateInputList('./day2.txt');
}

const day2Range = async () => {
  list = await listTestValue();
  let options, num1, num2, keyChar, pass, keyCharCount;
  let validPassCount = 0;
  for (let i = 0; i < list.length; i++) {
    options = list[i].split(' ');
    num1 = parseInt(options[0].split('-')[0]);
    num2 = parseInt(options[0].split('-')[1]);
    keyChar = options[1][0];
    pass = options[2];
    keyCharCount = 0;
    if (pass[num1 - 1] === keyChar) keyCharCount++;
    if (pass[num2 - 1] === keyChar) keyCharCount++;
    if (keyCharCount === 1) validPassCount++;
    console.log(num1, num2, keyChar, pass, keyCharCount);
  }
  console.log(validPassCount);
}

const day2 = async () => {
  list = await listTestValue();
  let options, min, max, keyChar, pass, keyCharCount;
  let validPassCount = 0;
  for (let i = 0; i < list.length; i++) {
    options = list[i].split(' ');
    min = parseInt(options[0].split('-')[0]);
    max = parseInt(options[0].split('-')[1]);
    keyChar = options[1][0];
    pass = options[2];
    keyCharCount = 0;
    for (let j = min - 1; j < max - 1; j++) {
      if (pass[j] === keyChar) keyCharCount++;
    }
    if (keyCharCount === 1) validPassCount++;
    console.log(min, max, keyChar, pass);
  }
  // assertEqual(1, validPassCount);
  console.log(validPassCount);
}

day2Range();