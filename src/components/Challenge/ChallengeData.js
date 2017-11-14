export function getCleanChallengeData() {
  return [
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
    },

    {
      name: 'stringReverse',
      description: 'You encounter a stone wall with an inscription written on what appears to be a door. If you can decode the message, perhaps you will be able to open the door and see what lies beyond.',
      pass: false,
      editor: {
        input: '.tnemnethgilne ot htap eht laever llahs ecirht derettu yltfiwS .ahnidaB uhkA',
        expectedOutput: 'Akhu Badinha. Swiftly uttered thrice shall reveal the path to enlightenment.',
        code: `/*
    Given a string, write a function to reverse the string
    in order to reveal the message.

    Example:
      input: "yawaedih"
      expectedOutput: "hideaway"
  */

  function stringReverse(str) {
    // your code here
  }`,
        attempt: '.tnemnethgilne ot htap eht laever llahs ecirht derettu yltfiwS .ahnidaB uhkA'
      },
      obstruction: {
        x: -250,
        y: -200,
        height: 50,
        width: 200,
        imageURL: 'https://i.imgur.com/qM6Vpj8.png'
      }
    },

    {
      name: 'pitOfSnakes',
      description: 'You encounter a pit of snakes blocking the passageway. If you can carefully jump inbetween the snakes, you will be able to continue through the cavern.',
      pass: false,
      editor: {
        input: [1, 4, 10, 6, 2],
        expectedOutput: 7,
        code: `/*

    You are given an array of integers representing
    coordinates of snakes situated on a straight line.

    Assume that you are jumping from the point with
    coordinate 0 to the right. You can only make jumps
    of the same length represented by an integer.

    Find the MINIMAL length of the jump that will allow
    you to land inbetween snakes after each jump and
    successfully navigate the pit of snakes.

    Example:
      input: [5, 3, 6, 7, 9]
      expectedOutput: 4

      S's represent snakes. Starting at 0, jumps of length four
      land you safely at 4 and 8 and the last jump gets you
      out of the snake pit.

               jump          jump         jump
      start --------- X ------------- X --------
                  S       S   S   S       S
      0___1___2___3___4___5___6___7___8___9___10
  */

  function jumpThroughSnakes(arr) {
    // your code here
  }
  `,
        attempt: ''
      },
      obstruction: {
        x: -800,
        y: -200,
        height: 50,
        width: 200,
        imageURL: 'https://i.imgur.com/h1jkkwc.png'
      }
    }
  ]
}

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
  },

  {
    name: 'stringReverse',
    description: 'You encounter a stone wall with an inscription written on what appears to be a door. If you can decode the message, perhaps you will be able to open the door and see what lies beyond.',
    pass: false,
    editor: {
      input: '.tnemnethgilne ot htap eht laever llahs ecirht derettu yltfiwS .ahnidaB uhkA',
      expectedOutput: 'Akhu Badinha. Swiftly uttered thrice shall reveal the path to enlightenment.',
      code: `/*
  Given a string, write a function to reverse the string
  in order to reveal the message.

  Example:
    input: "yawaedih"
    expectedOutput: "hideaway"
*/

function stringReverse(str) {
  // your code here
}`,
      attempt: '.tnemnethgilne ot htap eht laever llahs ecirht derettu yltfiwS .ahnidaB uhkA'
    },
    obstruction: {
      x: -250,
      y: -200,
      height: 50,
      width: 200,
      imageURL: 'https://i.imgur.com/qM6Vpj8.png'
    }
  },

  {
    name: 'pitOfSnakes',
    description: 'You encounter a pit of snakes blocking the passageway. If you can carefully jump inbetween the snakes, you will be able to continue through the cavern.',
    pass: false,
    editor: {
      input: [1, 4, 10, 6, 2],
      expectedOutput: 7,
      code: `/*

  You are given an array of integers representing
  coordinates of snakes situated on a straight line.

  Assume that you are jumping from the point with
  coordinate 0 to the right. You can only make jumps
  of the same length represented by an integer.

  Find the MINIMAL length of the jump that will allow
  you to land inbetween snakes after each jump and
  successfully navigate the pit of snakes.

  Example:
    input: [5, 3, 6, 7, 9]
    expectedOutput: 4

    S's represent snakes. Starting at 0, jumps of length four
    land you safely at 4 and 8 and the last jump gets you
    out of the snake pit.

             jump          jump         jump
    start --------- X ------------- X --------
                S       S   S   S       S
    0___1___2___3___4___5___6___7___8___9___10
*/

function jumpThroughSnakes(arr) {
  // your code here
}
`,
      attempt: ''
    },
    obstruction: {
      x: -800,
      y: -200,
      height: 50,
      width: 200,
      imageURL: 'https://i.imgur.com/h1jkkwc.png'
    }
  }
]

export default ChallengeData;
