let board = ["","","","","","","","",""];
let currentPlayer = 'X';
let gameActive = true;
let winner = false;
let winPatterns = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,4,8],
  [2,4,6],
  [0,3,6],
  [1,4,7],
  [2,5,8]
];

const cells = document.querySelectorAll('.cell');
const status = document.getElementById("status");
const reset = document.querySelector("#reset");
reset.addEventListener('click',resetGame);

cells.forEach(cell =>{
  cell.addEventListener('click',handleClick);
});

function handleClick(event){

  if (!gameActive) {
    return;
  }

  const cell = event.target;
  const index = cell.dataset.index;

  if(board[index] !== ""){
    return;
  }else{
    board[index] = currentPlayer;
    cell.textContent = currentPlayer;

    for(let i = 0;i<winPatterns.length;i++){
    const condition = winPatterns[i];
    const conditionA = board[condition[0]];
    const conditionB = board[condition[1]];
    const conditionC = board[condition[2]];

    if(conditionA === conditionB && conditionB === conditionC && conditionA !== ""){
      winner = true;
      gameActive = false;
      status.textContent = currentPlayer + " wins!";
      return;
    }
  }
    switchPlayer();
  }
}

function switchPlayer() {
  currentPlayer = (currentPlayer === "X") ? "O" : "X";
}


function resetGame(){

  board = ["","","","","","","","",""];
  currentPlayer = 'X';
  gameActive = true;
  winner = false;

  cells.forEach(cell =>{
    cell.textContent = "";
  });
  status.textContent = "";
}
