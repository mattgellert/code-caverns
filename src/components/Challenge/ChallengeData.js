const ChallengeData = [
  {
    name: "sortRocks",
    description: "You've encountered a ledge, but you notice a pile of rocks and realize if you can sort these from smallest to largest, you can climb over and continue.",
    pass: false,
    editor: {
      input: [9,6,3,4,5,1,0,2,8,7,10],
      expectedOutput: [0,1,2,3,4,5,6,7,8,9,10],
      code: `/* Example:
  input: [9,6,3,4,5,1,0,2,8,7,10]
  output: [0,1,2,3,4,5,6,7,8,9,10]
*/

  function sortRocks(arr) {
    // your code here
  }`,
      attempt: [9,6,3,4,5,1,0,2,8,7,10]
    },
    obstruction: {
      x: 100,
      y: 200,
      height: 200,
      width: 91,
      imageURL: "https://i.imgur.com/p0mQlyC.png"
    }
  },

  {
    name: 'igniteBomb',
    description: "You find a bomb on the cavern floor. Beyond the bomb there is a wall with large cracks in it. If you can ignite the bomb, you should be able to destroy the wall and see what lies on the other side.",
    pass: false,
    editor: {
      input: "eapoyvnsdal;jpowaeryhgas;ldkfjopewiurl;asdkfas;dluasodpifubhyawehrlahueioabdsyugterwfsvdfsgasdouydofiuahsdalpdoimfbdkjdkduippoiuije!;lasdjf;l",
      expectedOutput: [58, 72, 94, 112, 131],
      code: `/* Find the indices of the word "boom!" to light the bomb!

Given a large string of characters, find the indices of
characters 'b', 'o', 'o', 'm', '!' and return them as an
array. You must return the indices of the characters as
they appear IN ORDER. For example: find the first
occurance of 'b' and then find the first occurance of 'o'
AFTER the first occurance of b, etc.

  Example:
    input: "tmfobdfwomueodubmwob!"
    expectedOutput: [4, 8, 12, 16, 20]
*/

function igniteBomb(str) {
  // your code here
}`,
      attempt: []
    },
    obstruction: {
      x: 413,
      y: 600,
      height: 150,
      width: 87,
      imageURL: "https://i.imgur.com/fUzvyAf.png"
    }
  },

  {
    name: 'circleOfStones',
    description: 'You encounter a large circle of stones embedded with gems. You notice that while most of the stones contain diamonds, two of the stones positioned directly opposite each other in the circle contain emeralds. One of the stones containing an emerald is emitting a light. You wonder what will happen if you can direct the light at the other emerald, directly across the cirlce.',
    pass: false,
    editor: {
      input: {
        n: [0,1,2,3,4,5,6,7,8,9,10,11],
        firstNumber: 10
      },
      expectedOutput: 4,
      code: `/*
  Consider n stones numbered 0 to n-1 arranged in a circle 
  with equal distance between each of the stones. Given n 
  and a firstNumber, write a function that will return the 
  number of the stone in the radially opposite position of 
  the firstNumber stone. 
  
  Example: 
    input: n = 10, firstNumber = 2 
    expectedOutput = 7
*/

function findOppositeEmerald(n, firstNumber) {
  // your code here
}`,
      attempt: ""
    },
    obstruction: {
      x: -900,
      y: 100,
      height: 347,
      width: 354,
      imageURL: 'https://i.imgur.com/yodP8As.png'
    }
  }
]

export default ChallengeData;
