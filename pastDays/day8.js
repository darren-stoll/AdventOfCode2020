const fs = require('fs').promises;

const assertEqual = (expected, actual) => {
  console.log(expected === actual);
}

var fileName = './day8.txt'

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

var testInput = [
  'nop +0',
  'acc +1',
  'jmp +4',
  'acc +3',
  'jmp -3',
  'acc -99',
  'acc +1',
  'jmp -4',
  'acc +6'
];

const listTestValue = () => {
  // return testInput;
  return generateInputList(fileName);
}

const day8 = async () => {
  list = await listTestValue();
  console.log(list);
  // Put each line into its own object
  let commandList = [];
  let command;
  for (let i = 0; i < list.length; i++) {
    command = new Object();
    command.name = list[i].substring(0,3);
    command.incOrDec = list[i].substring(4,5);
    command.amount = parseInt(list[i].substring(5));
    command.visited = false;
    commandList.push(command);
  }
  console.log(commandList);
  // Iterate through until a revisited command is found
  let accTotal = 0;
  let currCommandIte = 0;
  var currCommand;
  while (currCommandIte < commandList.length) {
    currCommand = commandList[currCommandIte];
    if (currCommand.visited) break;
    if (currCommand.name === 'acc') {
      if (currCommand.incOrDec === '+') {
        accTotal += currCommand.amount;
      } else {
        accTotal -= currCommand.amount;
      }
    } else if (currCommand.name === 'jmp') {
      if (currCommand.incOrDec === '+') {
        currCommandIte += currCommand.amount
      } else {
        currCommandIte -= currCommand.amount;
      }
      currCommand.visited = true;
      continue;
    }
    currCommand.visited = true;
    currCommandIte++;
  }
  console.log(accTotal);
}

const day8Part2 = async () => {
  list = await listTestValue();
  console.log(list);
  // Put each line into its own object
  let commandList = [];
  let command;
  for (let i = 0; i < list.length; i++) {
    command = new Object();
    command.name = list[i].substring(0,3);
    command.incOrDec = list[i].substring(4,5);
    command.amount = parseInt(list[i].substring(5));
    command.visited = false;
    commandList.push(command);
  }
  console.log(commandList);
  // Iterate through until a revisited command is found
  let accTotal = 0;
  let currCommandIte = 0;
  var currCommand;
  var lastCommandSet;
  var reverseIte = commandList.length - 1;
  console.log(commandList[reverseIte]);
  while (currCommandIte < commandList.length) {
    currCommand = commandList[currCommandIte];
    if (currCommand.visited) { // If visited, change a command from jmp to nop or vice versa and retry
      accTotal = 0;
      if (lastCommandSet) {
        if (commandList[reverseIte].name === 'jmp') commandList[reverseIte].name = 'nop';
        else if (commandList[reverseIte].name === 'nop') commandList[reverseIte].name = 'jmp'
        reverseIte--;
      }
      currCommandIte = 0;
      commandList.map(x => {{
        x.visited = false;
        return x;
      }});
      while (reverseIte > 0) {
        if (commandList[reverseIte].name === 'nop') {
          lastCommandSet = true;
          commandList[reverseIte].name = 'jmp';
          break;
        } else if (commandList[reverseIte].name === 'jmp') {
          lastCommandSet = true;
          commandList[reverseIte].name = 'nop';
          break;
        }
        reverseIte--;
      }
      if (reverseIte === 0) throw "Error";
      currCommand = commandList[0];
    };
    if (currCommand.name === 'acc') {
      if (currCommand.incOrDec === '+') {
        accTotal += currCommand.amount;
      } else {
        accTotal -= currCommand.amount;
      }
    } else if (currCommand.name === 'jmp') {
      lastCommandIte = currCommandIte;
      if (currCommand.incOrDec === '+') {
        currCommandIte += currCommand.amount
      } else {
        currCommandIte -= currCommand.amount;
      }
      currCommand.visited = true;
      continue;
    }
    currCommand.visited = true;
    currCommandIte++;
  }
  console.log(accTotal);
}

day8Part2();