class TicTacToeGame {
    constructor(player1, player2, board=null) {
        this.player1 = player1
        this.player2 = player2
        this.playerTurn = player1
        this.marks = ['X', 'O']
        this.board = board != null ? board : /* [['X', 'O', 'O'],['-', 'X', 'X'],['-', '-', 'O']] */ [['-', '-', '-'],['-', '-', '-'],['-', '-', '-']]   // FIXME
        this.children = []
        this._children = []
        this.path = [JSON.parse(JSON.stringify(this))]
    }

    // clone() {
    //     return new TicTacToeGame(this.player1, this.player2, this.board)
    // }


    mark_of(player) {
        if(player == this.player1) {
            return this.marks[0]
        }
        return this.marks[1]
    }


    /**
     * Function: grabs the next possible future states from the current states
     * @param {None} 
     * @returns {Array} List of future Tic-Tac-Toe states
     */
    get_children() {
        let future_states = []
        for(let i = 0; i < 3; i++) {
            for(let j = 0; j < 3; j++) {
                if(this.board[i][j] == "-") {
                    let new_state = this.place_marker(this.playerTurn, i, j)
                    if(new_state != undefined && new_state != null) {
                        future_states.push(new_state)
                    }
                }
            }
        }
        return future_states
    }

    /**
     * Function: creates a new possible state (if there is one possible) by placing a marker at the given row/col
     * @param {String} currMark: current player ('X' or 'O')
     * @param {Integer} row: Row of TicTacToe Board
     * @param {Integer} col: Column of TicTacToe Board   
     * @returns {Array} List of future Tic-Tac-Toe states
     */
    place_marker(currMark, row, col) {
        var new_state = clone(this);
        // for (var i = 0; i < this.board.length; i++) new_state[i] = this.board[i].slice(); //Deepcopy object
        // console.log(new_state, new_state == this)
        if(new_state.board[row][col] == "-") {
            new_state.board[row][col] = currMark
            // console.log(new_state.board[row][col], this.board[row][col])
            new_state.path = [clone(this)]
            new_state.playerTurn = new_state.playerTurn == new_state.player1 ? new_state.player2 : new_state.player1
            return new_state
        }
        return null
    }

    make_move(currMark, row, col) {
        if(this.board[row][col] == "-") {
            this.board[row][col] = currMark
            this.playerTurn = this.playerTurn == this.player1 ? this.player2 : this.player1
            this.path = [clone(this)]
        }
    }
    

    get_score(mark) {
        if(this.get_winner() == mark) {
            return 1
        }
        else if(this.get_winner()) {
            return -1
        }
        return 0
    }

    get_winner() {
        let winnerMark = null
        this.marks.forEach(mark => {
            let winner = this.checkRows(mark) || this.checkCols(mark) || this.checkDiags(mark)
            if(winner != null) {
                winnerMark = winner
            }
        })
        return winnerMark
    }

    checkRows(mark) {
        for(let i = 0; i < 3; i++) {
            let row = this.board[i]
            if (this.get_count(row, mark) == 3) {
                return mark
            }
        }
        return null
    }
    checkCols(mark) {
        let count = 0;
        for(let i = 0; i < 3; i++) {
            for(let j = 0; j < 3; j++) {
                if(this.board[j][i] == mark) count++
                if(count == 3) return mark
            }
            count = 0
        }
        
        return null
    }
    checkDiags(mark) {
        let count1 = 0
        for(let i = 0; i < 3; i++) {
            if(this.board[i][i] == mark) count1++
        }
        if(this.board[0][2] == mark && this.board[1][1] == mark && this.board[2][0] == mark) {
            return mark
        }
        if(count1 == 3) {
            return mark
        }
        return null
    }

    get_count(arr, item) {
        let count = 0
        for(let i = 0; i < arr.length; i++) {
            if(arr[i] == item) {
                count++
            }
        }
        return count
    }
}

function clone(instance) {
    return Object.assign(
      Object.create(
        // Set the prototype of the new object to the prototype of the instance.
        // Used to allow new object behave like class instance.
        Object.getPrototypeOf(instance),
      ),
      // Prevent shallow copies of nested structures like arrays, etc
      JSON.parse(JSON.stringify(instance)),
    );
  }

  // function get_score(board, mark) {
//     if(get_winner(board) == mark) {
//         return 1
//     }
//     else if(get_winner(board)) {
//         return -1
//     }
//     return 0
// }

// function get_winner(board) {
//     let winnerMark = null
//     let marks = ["X", "O"]
//     marks.forEach(mark => {
//         let winner = checkRows(board, mark) || checkCols(board, mark) || checkDiags(board, mark)
//         if(winner != null) {
//             winnerMark = winner
//         }
//     })
//     return winnerMark
// }

// function checkRows(board, mark) {
//     for(let i = 0; i < 3; i++) {
//         let row = board[i]
//         if (get_count(row, mark) == 3) {
//             return mark
//         }
//     }
//     return null
// }

// function checkCols(board, mark) {
//     console.log("CHECKING")
//     let count = 0;
//     for(let i = 0; i < 3; i++) {
//         console.log("NEW")
//         for(let j = 0; j < 3; j++) {
//             console.log(board[j][i], count)
//             if(board[j][i] == mark) count++
//             if(count == 3) return mark
//         }
//         count = 0
//     }
//     return null
// }
// function checkDiags(board, mark) {
//     let count1 = 0
//     for(let i = 0; i < 3; i++) {
//         if(board[i][i] == mark) count1++
//     }
//     if(board[0][2] == mark && board[1][1] == mark && board[2][0] == mark) {
//         return mark
//     }
//     if(count1 == 3) {
//         return mark
//     }
//     return null
// }

// function get_count(arr, item) {
//     let count = 0
//     for(let i = 0; i < arr.length; i++) {
//         if(arr[i] == item) {
//             count++
//         }
//     }
//     return count
// }
