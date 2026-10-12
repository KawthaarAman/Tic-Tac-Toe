/*-------------------------------- Constants --------------------------------*/

const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8]
]

/*---------------------------- Variables (state) ----------------------------*/

let board
let turn
let winner
let tie
let message

/*------------------------ Cached Element References ------------------------*/

const squareEls = document.querySelectorAll('.sqr')
const messageEl = document.querySelector('#message')
const resetBtnEl = document.querySelector('#reset')

//console.log(squareEls)
//console.log(messageEl)

/*-------------------------------- Functions --------------------------------*/

function init() {

   // console.log(" Function called successfully")

    board = ['', '', '', '', '', '', '', '', '']
    turn = 'X'
    winner = false
    tie = false

    render()
}

init()

function render() {

    updateBoard()
    updateMessage()

}

function updateBoard() {

    board.forEach((cellValue, index) => {
        const square = squareEls[index]
        square.textContent = cellValue
    })
}

function updateMessage() {

    if (winner === false && tie === false) {
        messageEl.textContent = `It's player ${turn}'s turn!`
    }

    else if (winner === false && tie === true) {
        messageEl.textContent = "It's a tie game!";
    }

    else {
        messageEl.textContent = `Congratulations! Player ${turn} wins!`
    }
}

function handleClick(event) {

    const squareIndex = parseInt(event.target.id)

    if (board[squareIndex] === 'X' || board[squareIndex] === '0' || winner === true) {
        return
    }

    placePiece(squareIndex)
    checkForWinner()
    checkForTie()
    switchPlayerTurn()

    render()

}

function placePiece(index) {

    board[index] = turn

    console.log(board)
}

function checkForWinner() {

    for (let i = 0; i < winningCombos.length; i++) {

        const combo = winningCombos[i]
        const pos1 = combo[0]
        const pos2 = combo[1]
        const pos3 = combo[2]

        if (
            board[pos1] !== "" &&
            board[pos1] == board[pos2] &&
            board[pos1] == board[pos3]
        ) {
            winner = true

        }
    }

}

const checkForTie = () => {

    if (winner) return

    if (board.includes('')) {
        tie = false
    } else {
        tie = true
    }

    console.log('Tie state:', tie)

}

const switchPlayerTurn = () => {

    if (winner) return

    turn = turn === 'X' ? 'O' : 'X'

    console.log("turn state:", turn)

}

/*----------------------------- Event Listeners -----------------------------*/

for (let oneSquare of squareEls) {
    oneSquare.addEventListener('click', handleClick)
}

resetBtnEl.addEventListener('click', init)
