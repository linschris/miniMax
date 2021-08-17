var board;
var gameOver = true;
var ticTiles = [];
var againstAI = true;
var startingTurn = "human";
var playerMark = "X"; 
var playerScore = 0;
var computerScore = 0;
var currentMark = playerMark;
var currentTurn = startingTurn;


var ticTacToeCanvas = function(sketch) {
    sketch.draw = function() {
        let i = 0, j = 0;
        board.forEach(row => {
            row.forEach(item => {
                let num = 3 * i + j
                ticTiles[num].status = item
                ticTiles[num].show(Math.floor(sketch.mouseY / 128), Math.floor(sketch.mouseX / 128))
                j++
            })
                i++
                j = 0
        })
    }
    
    sketch.setup = function() {
        let tttMiniDiv = document.getElementById("ttt-mini-canvas")
        let gameDiv = document.getElementById("game-board")
        let canvas = sketch.createCanvas(tttMiniDiv.offsetWidth, tttMiniDiv.offsetHeight)
        canvas.parent(tttMiniDiv)
        let bestMoveMessage = sketch.createElement('div')
        bestMoveMessage.parent(gameDiv)
        bestMoveMessage.id('best-move-message')
        canvas.strokeWeight(4)
        canvas.stroke('black')
        board = [['-', '-', '-'],['-', '-', '-'],['-', '-', '-']] /* [['X', 'O', '-'],['-', 'O', '-'],['-', '-', 'X']] */
        gameOver = false
        for(let i = 0; i < 3; i++) {
            for(let j = 0; j < 3; j++) {    
                ticTiles.push(new SquareNode(j * 128, i * 128, sketch, i, j))
            }
        }
        addChange() //Allows to interchange between Human vs AI or Human vs Human
    }

    sketch.mouseClicked = function() {
        let tileClicked = ticTiles.find(tile => tile.isInside(sketch.mouseX, sketch.mouseY))
        let level = document.getElementById("cl-btn").options[document.getElementById("cl-btn").selectedIndex].value;
        if(tileClicked && !get_winner(board)) {
            let row = Math.floor(tileClicked.y / 128)
            let col = Math.floor(tileClicked.x / 128)
            if(board[row][col] == "-") {
                make_move(board, mark_of(currentTurn), row, col)
                if(!get_winner(board) && areOpenSpots(board) && againstAI) {
                    // bestMove(board, mark_of(currentTurn), level)
                    drawGameTree(board, currentTurn, level)
                } 
                checkStatus(board)
            }   
        }
    }
}





