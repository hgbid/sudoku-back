const generateSudoku = () => {
  const side = 4;
  const board = Array(side)
    .fill()
    .map(() => Array(side).fill(null));
  const pattern = (r, c) => (2 * (r % 2) + Math.floor(r / 2) + c) % side;

  const nums = shuffle(Array.from({ length: side }, (_, i) => i + 1));
  for (let r = 0; r < side; r++) {
    for (let c = 0; c < side; c++) {
      board[r][c] = nums[pattern(r, c)];
    }
  }

  const missingNumbers = randomInt(4, 6);
  for (let i = 0; i < missingNumbers; i++) {
    board[randomInt(0, side - 1)][randomInt(0, side - 1)] = null;
  }
  return board;
};

const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};



const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

module.exports = { generateSudoku };
