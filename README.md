# MiniMax Algorithm

## A great way to visualize the MiniMax algorithm in TicTacToe! 

### You can both play against the AI (at different levels) and visualize how the computer sees the game trees (through the MiniMax algorithm) and why it chooses a specific move.

### [Website URL](https://tictacai.glitch.me/)

### Technologies/Languages Used:
- HTML, CSS, JS
    - To create the structure, layout, design, and algorithms that run the website and MiniMax AI.
        - Really helpful videos which guided me in making a fast, working MiniMax Algorithm are found at:
            - [The Coding Train's Video On MiniMax](https://www.youtube.com/watch?v=trKjYdBASyQ)
            - [Sebestian League's Video On MiniMax + Alpha-Beta pruning](https://www.youtube.com/watch?v=l-hh51ncgDI)
- [Express.js](https://expressjs.com/)
    - to make a simple server for routing (and making sure users don't go to landing page on reload).
- [D3.js](https://d3js.org/) 
    - A powerful data visualization library, allowing me to generate the game trees using SVGs.
        - A really helpful tool alongside this was [David Robles's guide](https://www.davidrobles.net/blog/2015/01/25/visualizing-game-trees-with-d3/). I adapted his ideas/code (specifically [TicTacToeSVG.js](https://github.com/davidrobles/mauler/blob/master/src/views/tic-tac-toe-svg.js) from his Mauler framework) to help with generating the SVGs necessary for the gameTrees.
- [p5.js](https://p5js.org/)
    - A powerful library for "creative coding", the framework for making a fun, playable TicTacToe board
        - Since everything runs on the canvas, it's quite efficient!





