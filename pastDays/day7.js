const fs = require('fs').promises;

const assertEqual = (expected, actual) => {
  console.log(expected === actual);
}

var fileName = './day7.txt'

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
  'light red bags contain 1 bright white bag, 2 muted yellow bags.',
  'dark orange bags contain 3 bright white bags, 4 muted yellow bags.',
  'bright white bags contain 1 shiny gold bag.',
  'muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.',
  'shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.',
  'dark olive bags contain 3 faded blue bags, 4 dotted black bags.',
  'vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.',
  'faded blue bags contain no other bags.',
  'dotted black bags contain no other bags.'
];

var testInput2 = [
  'shiny gold bags contain 2 dark red bags.',
  'dark red bags contain 2 dark orange bags.',
  'dark orange bags contain 2 dark yellow bags.',
  'dark yellow bags contain 2 dark green bags.',
  'dark green bags contain 2 dark blue bags.',
  'dark blue bags contain 2 dark violet bags.',
  'dark violet bags contain no other bags.'
]

const listTestValue = () => {
  // return testInput2;
  return generateInputList(fileName);
}

// const findShinyGoldBag = (bags, bag) => {
//   if (bag === 'shiny gold bag') return true;
//   var nextBag = bags.find(b => b.head === bag);
//   for (let k = 0; k < nextBag.children.length; k++) {
//     var statement = findShinyGoldBag(bags, nextBag.children[k]);
//     if (statement) return true;
//   }
//   return false;
// }

// const day7 = async () => {
//   list = await listTestValue();

//   let bags = []; 
//   let bag, currBags;
//   let bagContents;
//   let firstItem = list[0];
//   let bestBag = 'shiny gold bag';
//   let bagRegex = /\w+ \w+ bag/g;
//   // Put bags into objects with node association of some kind
//   for (let i = 0; i < list.length; i++) {
//     currBags = list[i].match(bagRegex);
//     bagContents = [];
//     bag = new Object();
//     bag.head = currBags[0];
//     if (currBags[1] === 'no other bag') { // If the bag contains no other bags
//       bag.children = [];
//     } else {
//       for (let j = 1; j < currBags.length; j++) {
//         bagContents.push(currBags[j]);
//       }
//       bag.children = bagContents;
//     }
//     bags.push(bag);
//   }
//   console.log(bags);
//   // Traverse through the bags
//   var currChild;
//   var goldBagCount = 0;
//   for (let i = 0; i < bags.length; i++) {
//     for (let j = 0; j < bags[i].children.length; j++) {
//       currChild = bags[i].children[j];
//       if (findShinyGoldBag(bags, currChild)) {
//         goldBagCount++;
//         break;
//       }
//     }
//   }
//   console.log(goldBagCount);
// }

var bagCount = 0;

const findBags = (bags, bag) => {
  var nextBag = bags.find(b => b.head === bag);
  for (let i = 0; i < nextBag.children.length; i++) {
    var currentChild = nextBag.children[i];
    for (let j = 0; j < currentChild.count; j++) {
      findBags(bags, currentChild.childName);
      bagCount++;
    }
  }
  
}

const day7Part2 = async () => {
  list = await listTestValue();

  let bags = []; 
  let bag, currBags, bagChildGroup, bagChild, bagContents;
  let firstItem = list[7];
  let bestBag = 'shiny gold bag';
  let bagRegex = /(\d *\w+ \w+ bag)|(\w+ \w+ bag)/g;
  let bagChildRegex = /(\d) (\w+ \w+ bag)/;
  // console.log(firstItem.match(bagRegex));
  // Put bags into objects with node association of some kind
  for (let i = 0; i < list.length; i++) {
    currBags = list[i].match(bagRegex);
    bagContents = [];
    bag = new Object();
    bag.head = currBags[0];
    
    if (currBags[1] === 'no other bag') { // If the bag contains no other bags
      bag.children = [];
    } else {
      for (let j = 1; j < currBags.length; j++) {
        bagChildGroup = currBags[j].match(bagChildRegex);
        bagChild = new Object();
        bagChild.childName = bagChildGroup[2];
        bagChild.count = parseInt(bagChildGroup[1]);
        bagContents.push(bagChild);
      }
      bag.children = bagContents;
    }
    bags.push(bag);
  }
  console.log(bags[0]);
  // Traverse through the bags
  var currChild;
  
  var startBag = bags.find(b => b.head === 'shiny gold bag');
  for (let i = 0; i < startBag.children.length; i++) {
    currChild = startBag.children[i];
    for (let j = 0; j < currChild.count; j++) {
      findBags(bags, currChild.childName);
      bagCount++;
    }
  }
  
  console.log(bagCount);
}

day7Part2();