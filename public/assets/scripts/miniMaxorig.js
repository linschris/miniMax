/**
 * @author Artificial Intellgience 2E - Foundations Of Computational Agents, paraphrased by Christopher Linscott
 * @param {TicTacToeGame} node - Node of the decision tree, refers to a TicTacToe game state
 * @param {Boolean} isMaxPlayer - Is the player we want to win
 * @param {Integer} alpha 
 * @param {Integer} beta
 * 
 */
function MiniMax(node, player, alpha, beta) {
    let best_path = null
    let children_nodes = node.get_children()
    // console.log(node, player, node.board, node.get_winner())
    // console.log(node.mark_of(node.playerTurn) == node.mark_of(player))
    if(children_nodes.length <= 0 || node.get_winner()) {
        // console.log(node, node.get_score(player))
        return [node.get_score(player), node]
    }
    else if(node.mark_of(node.playerTurn) == node.mark_of(player)) {
        // console.log(children_nodes)
        children_nodes.forEach(child => {
            let [score, path] = MiniMax(child, player, alpha, beta)
            // console.log("CURR PATH MAX", child, score, path)
            if(score >= beta) {
                return [score, null]
            }
            else if(score > alpha) {
                // console.log("NEW BEST PATH (MAX)", score, path)
                alpha = score
                best_path = child
            }
        });
        return [alpha, best_path]
    }
    else {
        // console.log(children_nodes)
        children_nodes.forEach(child => {
            let [score, path] = MiniMax(child, player, alpha, beta)
            // console.log("CURR PATH MIN", score, path)
            if(score <= alpha) {
                return [score, null]
            }
            else if(score < beta) {
                // console.log("NEW BEST PATH (MIN)", score, path)
                beta = score
                best_path = child
            }
        });
        return [beta, best_path]
    }
}


    


        


    