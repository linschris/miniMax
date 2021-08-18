function mark_of(player) {
    return player == "human" ? playerMark : playerMark == "X" ? "O" : "X"
}
function player_of(mark) {
    return mark == playerMark ? "human" : "computer"
}
function make_move(board, mark, row, col, changeTurn=true) {
    if(board[row][col] == "-") {
        board[row][col] = mark
    }
    if(changeTurn) currentTurn = currentTurn == "human" ? "computer" : "human"
}
function get_score(board, mark) {
    if(this.get_winner(board, mark) == mark) {
        return 1
    }
    else if(this.get_winner(board, mark)) {
        return -1
    }
    return 0
}
function get_winner(board) {
    let winnerMark = null
    var marks = ["X", "O"]
    marks.forEach(mark => {
        let winner = this.checkRows(board, mark) || this.checkCols(board, mark) || this.checkDiags(board, mark)
        if(winner != null) {
            winnerMark = winner
        }
    })
    // console.log(areOpenSpots(board))
    return winnerMark
}
function areOpenSpots(board) {
    let numOpenSpots = 0;
    for(let i = 0; i < 3; i++) {
        for(let j = 0; j < 3; j++) {
            if(board[i][j] == "-") {
                numOpenSpots++;
            }
        }
    }
    return numOpenSpots > 0
}
function checkRows(board, mark) {
    for(let i = 0; i < 3; i++) {
        let row = board[i]
        if (get_count(row, mark) == 3) {
            return mark
        }
    }
    return null
}
function checkCols(board, mark) {
    let count = 0;
    for(let i = 0; i < 3; i++) {
        for(let j = 0; j < 3; j++) {
            if(board[j][i] == mark) count++
            if(count == 3) return mark
        }
        count = 0
    }
    
    return null
}
function checkDiags(board, mark) {
    let count1 = 0
    for(let i = 0; i < 3; i++) {
        if(board[i][i] == mark) count1++
    }
    if(board[0][2] == mark && board[1][1] == mark && board[2][0] == mark) {
        return mark
    }
    if(count1 == 3) {
        return mark
    }
    return null
}
function get_count(arr, item) {
    let count = 0
    for(let i = 0; i < arr.length; i++) {
        if(arr[i] == item) {
            count++
        }
    }
    return count
}
function clone_board(board) {
    var newBoard = [];
    for (var i = 0; i < board.length; i++) {
        newBoard[i] = board[i].slice();
    }
    return newBoard
}
function checkStatus(board) {
    let bestMoveMessage = document.getElementById("best-move-message")
    let turnMessage = document.getElementById("game-turn")
    if(get_winner(board)) {
        let winnerColor = get_winner(board) == "X" ? "red" : "blue"
        bestMoveMessage.innerHTML = `<span class="header5" style="color: ${winnerColor}">${get_winner(board)}</span> has won!`
        player_of(get_winner(board)) == "human" ? playerScore += 1 : computerScore += 1
        let player1ScoreElement = document.getElementById("player1-score")
        let player2ScoreElement = document.getElementById("player2-score")
        player1ScoreElement.innerHTML = `<span>${playerScore}</span>`
        player2ScoreElement.innerHTML = `<span>${computerScore}</span>`
    }
    else if(!areOpenSpots(board)) {
        bestMoveMessage.innerHTML = `A <span class="header5">tie!</span><br>Try again by pressing the reset button.`
    }
    turnMessage.innerHTML = `<span class="color${mark_of(currentTurn)}">${mark_of(currentTurn)}</span>'s Turn`
}
function resetBoard() {
    board = [['-', '-', '-'],['-', '-', '-'],['-', '-', '-']]
    document.getElementById('best-move-message').innerHTML = ''
    currentTurn = startingTurn
    currentMark = playerMark
    checkStatus(board);
    // clearGameTree()
}
function changeMark() {
    playerMark = playerMark == "O" ? "X" : "O"
    resetBoard()

    let player1card = document.getElementById("player1-card")
    let player2card = document.getElementById("player2-card")
    let player1cardMark = document.getElementById("player1-mark")
    let player2cardMark = document.getElementById("player2-mark")
    let changeMarkButton = document.getElementById("cm-btn")
    let changeLevelButton = document.getElementById("cl-btn")

    player1card.classList = playerMark == "O" ? ["playerCard teamO"] : ["playerCard teamX"]
    player2card.classList = playerMark == "O" ? ["playerCard teamX"] : ["playerCard teamO"]
    player1cardMark.innerHTML = playerMark
    player2cardMark.innerHTML = playerMark == "O" ? "X" : "O"
    changeMarkButton.classList = playerMark == "O" ? ["button teamO"] : ["button teamX"]
    changeLevelButton.classList = playerMark == "O" ? ["button teamX"] : ["button teamO"]
    
}
function switchToGamePage() {
    location.href = "/game";
}
function addChange() {
    let player2Name = document.getElementById("player2-name")
    function changeGameType(event) {
        event.target.innerHTML = event.target.innerHTML == "COMP" ? "HUMAN" : "COMP"
        againstAI = !againstAI
    }
    player2Name.addEventListener("click", changeGameType);
} 
function depthFirstTreeGenerator(node, depth=2) {
    if(depth > 0 && !node.get_winner()) {
        node.get_children().forEach(child => {
            node._children.push(child)
            depthFirstTreeGenerator(child, depth - 1)
        })
    }
    return node
}



