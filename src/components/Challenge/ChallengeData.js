const ChallengeData = [
  {
    name: "sortRocks",
    description: "You've encountered a large boulder blocking the path, but you notice a pile of rocks and realize if you can sort these from smallest to largest, you can climb over and continue.",
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
      width: 50,
      fill: "red"
    }
  }
]

export default ChallengeData;
