const fs = require('fs').promises;

const assertEqual = (expected, actual) => {
  console.log(expected === actual);
}

const generateInputList = async (txtFile) => {
  try {
    var list = [];
    const data = await fs.readFile(txtFile, 'utf8')
    list = data.split('\r\n')
    return list;
  } catch (err) {
    console.log(err);
    return;
  }
}

const listInput = () => {
  // return [200, 40, 80, 2000, 60, 10, 10];
  return generateInputList('./day1.txt');
}

const day1TwoNums = async () => {
  list = await listInput();
  console.log(list);
  var num1, num2;
  for (let i = 0; i < list.length; i++) {
    for (let j = i + 1; j < list.length; j++) {
      num1 = parseInt(list[i]);
      num2 = parseInt(list[j]);
      if (num1 + num2 === 2020) {
        console.log(num1 * num2)

        assertEqual(1007331, num1 * num2);
        
        return num1 * num2;
      }
    }
  }
}

const day1ThreeNums = async () => {
  list = await listInput();
  console.log(list);
  var num1, num2, num3;
  for (let i = 0; i < list.length; i++) {
    for (let j = i + 1; j < list.length; j++) {
      for (let k = i + 2; k < list.length; k++) {
        num1 = parseInt(list[i]);
        num2 = parseInt(list[j]);
        num3 = parseInt(list[k]);
        if (num1 + num2 + num3 === 2020) {
          console.log(num1 * num2 * num3)
  
          // assertEqual(200000, num1 * num2 * num3);
          
          return num1 * num2 * num3;
        }
      }
      
    }
  }
}


day1ThreeNums();