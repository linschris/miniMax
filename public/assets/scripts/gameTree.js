let gameTreeContainer = document.getElementById("gameTree-container")
let gameTreeButton = document.getElementById("gt-btn")

var boardLength = 150
var scale = d3.scale.ordinal()
                    .domain([0, 1, 2])
                    .rangeRoundBands([0, boardLength], 1, 0.5);

var margin = { top: 50, right: 30, bottom: 60, left: 30 },
    width = 1650 - margin.left - margin.right,
    height = 2000 - margin.top - margin.bottom,
    nodeSize = 85,
    edgeWidth = 4,
    treeBgColor = "#ffffff",
    edgeColor = "#666666";

var diagonal = d3.svg.diagonal().projection(function(d) { return [d.x, d.y]; });

var svg = d3.select(gameTreeContainer)
            .append("svg")
            // .attr("width", width + margin.left + margin.right)
            // .attr("height", height + margin.top + margin.bottom)
            .attr("preserveAspectRatio", "xMinYMin meet")
            .attr("viewBox", `0 0 ${width + 75} ${height}`)
            // .attr("style", "background: " + treeBgColor)
            .attr("style", "background: linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(164,249,229,1) 97%)")
            .append("g")
            .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

var tree = d3.layout.tree().size([width, height]);
tree.separation(function() {
    return 30;
});

var nodeMargin = nodeSize / 3.4;

var dictionary = {};
var depth, root, newNode;
var i = 0, duration = 1500;

function drawGameTree(board, currentTurn, depthAmount) {
    newNode = new TicTacToeGame(mark_of("human"), mark_of("computer"), clone_board(board));
    console.log(currentTurn)
    newNode.playerTurn = currentTurn == "computer" ? newNode.player2 : newNode.player1
    depth = parseInt(depthAmount)
    root = depthFirstTreeGenerator(newNode, depth) 
    dictionary = {}
    bestMove(board, root.playerTurn, depth, dictionary, true)
    console.log(root)
    update(root);
    console.log(dictionary)
}

function showGameTree() {
    gameTreeContainer.style.display = gameTreeContainer.style.display == "block" ? "none" : "block";
    let newText = gameTreeButton.innerHTML == "View Game Tree" ? "Collapse Game Tree" : "View Game Tree"
    gameTreeButton.innerHTML = `<i class="fab fa-pagelines buttonIcon"></i>${newText}`
}

function clearGameTree() {
    d3.selectAll(".node-group > *").remove();
    d3.selectAll("path").remove();
}

function update(source) {
    // Clear nodes
    d3.selectAll(".node-group > *").remove();

    // Compute new tree layout.
    var nodes = tree.nodes(root).reverse();
    
    nodes.forEach(function(d) {d.y = d.depth * 360; });

    var link = svg.selectAll("path")
        .data(tree.links(nodes))
    
    link.enter()
        .append("path")
        .attr("fill", "none")
        .attr("stroke", edgeColor)
        .attr("stroke-width", edgeWidth)
        .attr("d", function(d) {
            var o = {x: source.x0, y: source.y0};
		    return diagonal({source: o, target: o});
        })

    link.exit()
        .transition()
        .duration(duration)
        .attr("d", function(d) {
            var o = {x: source.x, y: source.y};
            return diagonal({source: o, target: o});
          })
        .remove();

    link.transition()
        .duration(duration)
        .attr("d", diagonal)

    var node = svg.selectAll("g.node-group")
        .data(nodes)
    
    var nodeEnter = node.enter()
                        .append("g")
                        .attr("class", "node-group")
                        .on("click", click)
    
    var nodeExit = node.exit()
                        .transition()
                        .duration(duration)
                        .attr("transform", function(d) { return "translate(" + source.x + "," + source.y + ")"; })
                        // .attr("transform", function(d) { return "translate(" + (d.x - nodeMargin - 15) + ", " + (d.y - nodeMargin) + ")"; })
                        .remove()
    
    var nodeUpdate = node.transition()
                        .duration(duration)
                        .attr("transform", function(d) { return "translate(" + (d.x - nodeMargin - 15) + ", " + (d.y - nodeMargin) + ")"; })

    
    var svgView = new TicTacToeSVG({
        model: newNode,
        sideLength: nodeSize
    });
      
    // Draw nodes
    svg.selectAll(".node-group")
        .each(function(node) {
            svgView.model = node.board
            svgView.score = dictionary[JSON.stringify(node.board)] != undefined ? dictionary[JSON.stringify(node.board)] : "N/A"
            svgView.svg = d3.select(this);
            svgView.hasChildren = node.children == null ? false : true
            svgView.render()
        })
    
    nodes.forEach(function(d) {
    	d.x0 = d.x;
    	d.y0 = d.y;
    }); 
}

function click(d) {
    if (d.children) {
      d._children = d.children;
      d.children = null;
    } else {
      d.children = d._children;
      d._children = null;
    }
    update(d);
}
