
/**
 * @author Christopher Linscott - Inspired By Both The Coding Train's and Sebestian League's Videos On Minimax
 * @param {TicTacToeGame} node - Node of the decision tree, refers to a TicTacToe game state
 * @param {Boolean} isMaximizing - Is the player we want to win
 * @param {Boolean} depth - How far down the game tree we want to look
 * @param {Integer} alpha
 * @param {Integer} beta
 * 
 */

function MiniMax(board, isMaximizing, depth, dictionary=null, alpha=-9999, beta=9999) {
    let bestScore = null
    if(depth == 0 || get_winner(board) || !areOpenSpots(board)) {
        // console.group()
        // console.log(clone_board(board))
        // console.log("SCORE FOR %s is: %d since %s wins at depth %d.", mark_of(currentTurn), get_score(board, mark_of(currentTurn)), get_winner(board), depth)
        // console.groupEnd()
        // console.log(clone_board(board), get_winner(board), get_score(board, mark_of("computer")))
        // console.log(mark_of(startingTurn))
        if(dictionary != null) dictionary[JSON.stringify(board)] = get_score(board, mark_of("computer"))
        return get_score(board, mark_of("computer"))
    }
    if(isMaximizing) {
        // console.group("MAX")
        let originalTurn = currentTurn 
        for(let i = 0; i < 3; i++) {
            for(let j = 0; j < 3; j++) {
                if(board[i][j] == "-") {
                    // console.assert(currentTurn == "human")
                    make_move(board, mark_of(currentTurn), i, j)
                    let score = MiniMax(board, false, depth - 1, dictionary, alpha, beta)
                    bestScore = bestScore == null ? score : Math.max(score, bestScore)
                    alpha = Math.max(alpha, score)
                    board[i][j] = "-"
                    currentTurn = originalTurn
                    // if(beta >= alpha) {
                    //     console.log(board)
                    //     continue;
                    // }
                }
            }        
        }
        // console.groupEnd()
        // console.log("BEST(MAX) is: ", alpha)
        // console.log(node)
        // console.log("MAX", board, bestScore)
        if(dictionary != null) dictionary[JSON.stringify(clone_board(board))] = bestScore != undefined ? bestScore : alpha
        return bestScore
    }
    else {
        // console.log("HERE:", dictionary)
        let originalTurn = currentTurn //human
        // console.group("MIN")
        for(let i = 0; i < 3; i++) {
            for(let j = 0; j < 3; j++) {
                if(board[i][j] == "-") {
                    // console.assert(currentTurn == "computer")
                    make_move(board, mark_of(currentTurn), i, j)
                    let score = MiniMax(board, true, depth - 1, dictionary, alpha, beta)
                    bestScore = bestScore == null ? score : Math.min(score, bestScore)
                    beta = Math.min(score, beta)
                    board[i][j] = "-"
                    currentTurn = originalTurn
                    // if(beta <= alpha) {
                    //     continue;
                    // }
                }
            }
        }
        // console.groupEnd()
        // console.log("BEST(MIN) is: ", beta)
        // console.log(node)
        if(dictionary != null) dictionary[JSON.stringify(clone_board(board))] = bestScore != undefined ? bestScore : beta
        return bestScore
    }
}

function bestMove(board, mark, depth, dictionary=null, updatingBoard=true) {
    let bestMove = null
    let bestScore = -9999
    let originalTurn = currentTurn
    // console.group("Calculating best move...")
    for(let i = 0; i < 3; i++) {
        for(let j = 0; j < 3; j++) {
            if(board[i][j] == "-") {
                make_move(board, mark, i, j)
                // console.group("Calculating score for selecting tile %d %d as mark %s", i, j, mark)
                // console.assert(currentTurn == "human")
                let moveScore = MiniMax(board, false, depth - 1, dictionary)
                board[i][j] = "-"
                currentTurn = originalTurn
                // console.groupEnd()
                // console.log("%cThe score for making the move at %d, %d is %d.", "color:lightgreen; font-size: 11px", i, j, moveScore)
                if(moveScore > bestScore) {
                    bestScore = moveScore
                    bestMove = {i, j}
                }
            }
        }
    }
    // console.groupEnd()
    if(dictionary != null) dictionary[JSON.stringify(board)] = bestScore;
    if(updatingBoard) {
        make_move(board, mark, bestMove.i, bestMove.j)
        let bestMoveMessage = document.getElementById("best-move-message")
        let scoreColor = (bestScore == 1) ? "green" : (bestScore == 0) ? "orange" : "red"; 
        if(bestMove != null) {
            console.log("%cBest move found with depth %d on board tile %d %dwith a score of %d.","color:lightblue; font-weight:bold; font-size: 12px", depth, bestMove.i, bestMove.j, bestScore)
            bestMoveMessage.innerHTML = `<span class="header4">Best move found!</span>
                                        <br><span style="color: var(--purple-blue);">Depth</span>: ${depth}
                                        <br><span style="color: var(--dark-blue);">Board Tile</span>: ${3 * bestMove.i + bestMove.j + 1}
                                        <br><span style="color: var(--gray);">Score</span>: <span style="color: ${scoreColor}">${bestScore}<span>`
        }
        else {
            console.log("No move found.")
            bestMoveMessage.innerHTML = "No move found."
        }
    }
   
    return [bestMove, bestScore]
}
        
