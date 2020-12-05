const fs = require('fs').promises;

const assertEqual = (expected, actual) => {
  console.log(expected === actual);
}

var fileName = './day3.txt'

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
  // return [
  //   '...#..#.#',
  //   '.#..#.#..',
  //   '###......',
  //   '###......',
  //   '###......',
  //   '###......'
  // ]
  // return [
  //   '.........',
  //   '...#.....',
  //   '......#..',
  //   '#........',
  //   '...#.....',
  //   '......#..'
  // ]
  return generateInputList(fileName);
}

const day3 = async () => {
  let list = await listTestValue();
  console.log(list);
  let treesHit = 0;
  let verticalStep = 1;
  let horizontalStep = 3;
  let horizontalLength = list[0].length;
  while (verticalStep < list.length) {
    if (list[verticalStep][horizontalStep] === "#") treesHit++;
    verticalStep++;
    horizontalStep += 3;
    if (horizontalStep >= horizontalLength) { // Go back to beginning of line
      horizontalStep -= horizontalLength;
    }
  }
  console.log(treesHit);
}

const day3Part2 = async () => {
  let list = await listTestValue();
  console.log(list);
  let treesHit;
  let horizontalStep = 0;
  let verticalStep = 0;
  let rightDownSet = [
    [1, 1],
    [3, 1],
    [5, 1],
    [7, 1],
    [1, 2],
  ]
  let treesHitSet = [];
  let horizontalLength = list[0].length;
  for (let i = 0; i < rightDownSet.length; i++) {
    treesHit = 0;
    verticalStep = rightDownSet[i][1];
    horizontalStep = rightDownSet[i][0];
    while (verticalStep < list.length) {
      if (list[verticalStep][horizontalStep] === "#") treesHit++;
      verticalStep += rightDownSet[i][1];
      horizontalStep += rightDownSet[i][0];
      if (horizontalStep >= horizontalLength) { // Go back to beginning of line
        horizontalStep -= horizontalLength;
      }
    }
    treesHitSet.push(treesHit);
  }
  // Multiply the values in the set
  let product = 1;
  for (let i = 0; i < treesHitSet.length; i++) {
    product *= treesHitSet[i];
  }
  console.log(product);
}

day3Part2();