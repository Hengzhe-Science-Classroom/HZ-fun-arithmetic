window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch09',
    number: 9,
    title: 'Number Games & Challenges',
    subtitle: 'Play with magic squares, solve number puzzles, learn cool mental math tricks, and become a number detective!',
    sections: [
        // ============================================================
        // SECTION 1: Magic Squares
        // ============================================================
        {
            id: 'ch09-sec01',
            title: 'Magic Squares',
            content: `
                <h2>Magic Squares</h2>

                <p>Get ready for something truly magical! A <strong>magic square</strong> is a grid of numbers where every row, every column, and every diagonal all add up to the <strong>same number</strong>. That special sum is called the <strong>magic constant</strong>.</p>

                <p>Here is the most famous magic square of all — the <strong>3×3 magic square</strong> using the numbers 1 through 9:</p>

                <p style="text-align:center; font-size:1.2em; color:var(--accent-teal);">
                    \\(\\begin{array}{|c|c|c|} \\hline 2 & 7 & 6 \\\\ \\hline 9 & 5 & 1 \\\\ \\hline 4 & 3 & 8 \\\\ \\hline \\end{array}\\)
                </p>

                <p>Check it out — every row, column, and diagonal adds to <strong>15</strong>!</p>

                <div class="viz-placeholder" data-viz="magic-square-checker"></div>

                <div class="env-block intuition">
                    <div class="env-title">Discovery</div>
                    <div class="env-body">
                        <p>Why is the magic constant 15? Here is the secret: the numbers 1 through 9 add up to \\(1+2+3+4+5+6+7+8+9 = 45\\). Since a 3×3 magic square has 3 rows, each row must sum to \\(45 \\div 3 = 15\\). That is the magic constant!</p>
                    </div>
                </div>

                <h3>How to Build a 3×3 Magic Square</h3>

                <p>Here is a simple recipe:</p>
                <ol>
                    <li>Put the <strong>middle number (5)</strong> in the center.</li>
                    <li>Place opposite pairs around the center. Numbers that add to 10 go in opposite positions: (1,9), (2,8), (3,7), (4,6).</li>
                    <li>The even numbers (2, 4, 6, 8) go in the <strong>corners</strong>, and the odd numbers (1, 3, 7, 9) go on the <strong>edges</strong>.</li>
                </ol>

                <div class="viz-placeholder" data-viz="magic-square-builder"></div>

                <div class="env-block example">
                    <div class="env-title">Try This!</div>
                    <div class="env-body">
                        <p>Can you make a magic square using the numbers 2, 3, 4, 5, 6, 7, 8, 9, 10? The total is \\(2+3+\\cdots+10 = 54\\), so the magic constant would be \\(54 \\div 3 = 18\\). Try arranging them in the builder above!</p>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Think About It</div>
                    <div class="env-body">
                        <p>There are actually <strong>8 different</strong> ways to arrange a 3×3 magic square with the numbers 1-9. You can rotate it (4 ways) and flip it (another 4 ways). But they are all really the same pattern seen from different angles — just like how a square looks the same when you turn it!</p>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'magic-square-checker',
                    title: 'Magic Square Checker',
                    description: 'See how every row, column, and diagonal adds to the same magic constant!',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { width: 700, height: 380, scale: 1, originX: 0, originY: 0 });
                        var ctx = viz.ctx;

                        var grid = [
                            [2, 7, 6],
                            [9, 5, 1],
                            [4, 3, 8]
                        ];
                        var highlight = 'none'; // 'row0','row1','row2','col0','col1','col2','diag0','diag1','all'

                        VizEngine.createButton(controls, 'Row 1', function() { highlight = 'row0'; draw(); });
                        VizEngine.createButton(controls, 'Row 2', function() { highlight = 'row1'; draw(); });
                        VizEngine.createButton(controls, 'Row 3', function() { highlight = 'row2'; draw(); });
                        VizEngine.createButton(controls, 'Col 1', function() { highlight = 'col0'; draw(); });
                        VizEngine.createButton(controls, 'Col 2', function() { highlight = 'col1'; draw(); });
                        VizEngine.createButton(controls, 'Col 3', function() { highlight = 'col2'; draw(); });
                        VizEngine.createButton(controls, 'Diag \\', function() { highlight = 'diag0'; draw(); });
                        VizEngine.createButton(controls, 'Diag /', function() { highlight = 'diag1'; draw(); });
                        VizEngine.createButton(controls, 'Show All', function() { highlight = 'all'; draw(); });

                        function isHighlighted(r, c) {
                            if (highlight === 'all') return true;
                            if (highlight === 'row' + r) return true;
                            if (highlight === 'col' + c) return true;
                            if (highlight === 'diag0' && r === c) return true;
                            if (highlight === 'diag1' && r + c === 2) return true;
                            return false;
                        }

                        function getHighlightColor() {
                            if (highlight.indexOf('row') === 0) return viz.colors.blue;
                            if (highlight.indexOf('col') === 0) return viz.colors.orange;
                            if (highlight === 'diag0') return viz.colors.green;
                            if (highlight === 'diag1') return viz.colors.purple;
                            if (highlight === 'all') return viz.colors.teal;
                            return viz.colors.white;
                        }

                        function draw() {
                            viz.clear();
                            var cellSize = 80;
                            var startX = 350 - (3 * cellSize) / 2;
                            var startY = 60;
                            var color = getHighlightColor();

                            // Title
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 20px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'middle';
                            ctx.fillText('The 3x3 Magic Square', 350, 28);

                            // Draw cells
                            for (var r = 0; r < 3; r++) {
                                for (var c = 0; c < 3; c++) {
                                    var cx = startX + c * cellSize;
                                    var cy = startY + r * cellSize;
                                    var lit = isHighlighted(r, c);

                                    // Cell background
                                    ctx.fillStyle = lit ? color + '44' : '#1a1a40';
                                    ctx.fillRect(cx, cy, cellSize, cellSize);
                                    ctx.strokeStyle = lit ? color : '#30363d';
                                    ctx.lineWidth = lit ? 3 : 1.5;
                                    ctx.strokeRect(cx, cy, cellSize, cellSize);

                                    // Number
                                    ctx.fillStyle = lit ? viz.colors.white : viz.colors.text;
                                    ctx.font = lit ? 'bold 32px -apple-system,sans-serif' : '28px -apple-system,sans-serif';
                                    ctx.textAlign = 'center';
                                    ctx.textBaseline = 'middle';
                                    ctx.fillText(grid[r][c], cx + cellSize / 2, cy + cellSize / 2);
                                }
                            }

                            // Show sums on the right and bottom
                            var sumY = startY + 3 * cellSize + 15;
                            ctx.font = '16px -apple-system,sans-serif';
                            ctx.textBaseline = 'middle';

                            // Row sums on the right
                            for (var rr = 0; rr < 3; rr++) {
                                var rowSum = grid[rr][0] + grid[rr][1] + grid[rr][2];
                                var isRow = (highlight === 'row' + rr || highlight === 'all');
                                ctx.fillStyle = isRow ? viz.colors.blue : viz.colors.text;
                                ctx.font = isRow ? 'bold 18px -apple-system,sans-serif' : '16px -apple-system,sans-serif';
                                ctx.textAlign = 'left';
                                ctx.fillText('= ' + rowSum, startX + 3 * cellSize + 12, startY + rr * cellSize + cellSize / 2);
                            }

                            // Column sums at the bottom
                            for (var cc = 0; cc < 3; cc++) {
                                var colSum = grid[0][cc] + grid[1][cc] + grid[2][cc];
                                var isCol = (highlight === 'col' + cc || highlight === 'all');
                                ctx.fillStyle = isCol ? viz.colors.orange : viz.colors.text;
                                ctx.font = isCol ? 'bold 18px -apple-system,sans-serif' : '16px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.fillText('= ' + colSum, startX + cc * cellSize + cellSize / 2, sumY);
                            }

                            // Diagonal sums
                            var diag0Sum = grid[0][0] + grid[1][1] + grid[2][2];
                            var diag1Sum = grid[0][2] + grid[1][1] + grid[2][0];
                            var isDiag0 = (highlight === 'diag0' || highlight === 'all');
                            var isDiag1 = (highlight === 'diag1' || highlight === 'all');

                            ctx.fillStyle = isDiag0 ? viz.colors.green : viz.colors.text;
                            ctx.font = isDiag0 ? 'bold 16px -apple-system,sans-serif' : '14px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.fillText('Diag \\ = ' + diag0Sum, startX + 3 * cellSize + 12, sumY);

                            ctx.fillStyle = isDiag1 ? viz.colors.purple : viz.colors.text;
                            ctx.font = isDiag1 ? 'bold 16px -apple-system,sans-serif' : '14px -apple-system,sans-serif';
                            ctx.fillText('Diag / = ' + diag1Sum, startX + 3 * cellSize + 12, sumY + 24);

                            // Magic constant banner
                            ctx.fillStyle = viz.colors.teal;
                            ctx.font = 'bold 22px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('Magic Constant = 15', 350, startY + 3 * cellSize + 70);
                        }

                        draw();
                    }
                },
                {
                    id: 'magic-square-builder',
                    title: 'Magic Square Builder',
                    description: 'Drag numbers into the grid to build your own magic square! The sums update live.',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { width: 700, height: 420, scale: 1, originX: 0, originY: 0 });
                        var ctx = viz.ctx;

                        // Grid state: 0 means empty
                        var grid = [[0,0,0],[0,0,0],[0,0,0]];
                        var available = [1,2,3,4,5,6,7,8,9];
                        var cellSize = 75;
                        var startX = 200;
                        var startY = 60;
                        var selectedNum = 0;

                        // Create number buttons
                        for (var n = 1; n <= 9; n++) {
                            (function(num) {
                                VizEngine.createButton(controls, '' + num, function() {
                                    selectedNum = num;
                                    draw();
                                });
                            })(n);
                        }
                        VizEngine.createButton(controls, 'Clear All', function() {
                            grid = [[0,0,0],[0,0,0],[0,0,0]];
                            available = [1,2,3,4,5,6,7,8,9];
                            selectedNum = 0;
                            draw();
                        });
                        VizEngine.createButton(controls, 'Solve It!', function() {
                            grid = [[2,7,6],[9,5,1],[4,3,8]];
                            available = [];
                            selectedNum = 0;
                            draw();
                        });

                        // Click handler to place numbers
                        viz.canvas.addEventListener('click', function(e) {
                            var rect = viz.canvas.getBoundingClientRect();
                            var mx = e.clientX - rect.left;
                            var my = e.clientY - rect.top;

                            for (var r = 0; r < 3; r++) {
                                for (var c = 0; c < 3; c++) {
                                    var cx = startX + c * cellSize;
                                    var cy = startY + r * cellSize;
                                    if (mx >= cx && mx < cx + cellSize && my >= cy && my < cy + cellSize) {
                                        if (selectedNum > 0 && available.indexOf(selectedNum) >= 0 && grid[r][c] === 0) {
                                            grid[r][c] = selectedNum;
                                            available.splice(available.indexOf(selectedNum), 1);
                                            selectedNum = 0;
                                        } else if (selectedNum === 0 && grid[r][c] !== 0) {
                                            // Remove the number
                                            available.push(grid[r][c]);
                                            available.sort(function(a,b){return a-b;});
                                            grid[r][c] = 0;
                                        }
                                        draw();
                                        return;
                                    }
                                }
                            }
                        });

                        function draw() {
                            viz.clear();

                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 18px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'middle';
                            ctx.fillText('Build Your Own Magic Square!', 350, 28);

                            if (selectedNum > 0) {
                                ctx.fillStyle = viz.colors.yellow;
                                ctx.font = '14px -apple-system,sans-serif';
                                ctx.fillText('Selected: ' + selectedNum + '  (click a cell to place it)', 350, 48);
                            } else {
                                ctx.fillStyle = viz.colors.text;
                                ctx.font = '14px -apple-system,sans-serif';
                                ctx.fillText('Pick a number above, then click a cell. Click a filled cell to remove it.', 350, 48);
                            }

                            // Draw cells
                            for (var r = 0; r < 3; r++) {
                                for (var c = 0; c < 3; c++) {
                                    var cx = startX + c * cellSize;
                                    var cy = startY + r * cellSize;
                                    var val = grid[r][c];

                                    ctx.fillStyle = val > 0 ? viz.colors.blue + '33' : '#1a1a40';
                                    ctx.fillRect(cx, cy, cellSize, cellSize);
                                    ctx.strokeStyle = val > 0 ? viz.colors.blue : '#30363d';
                                    ctx.lineWidth = val > 0 ? 2.5 : 1;
                                    ctx.strokeRect(cx, cy, cellSize, cellSize);

                                    if (val > 0) {
                                        ctx.fillStyle = viz.colors.white;
                                        ctx.font = 'bold 30px -apple-system,sans-serif';
                                        ctx.textAlign = 'center';
                                        ctx.textBaseline = 'middle';
                                        ctx.fillText(val, cx + cellSize / 2, cy + cellSize / 2);
                                    }
                                }
                            }

                            // Row sums
                            var allCorrect = true;
                            for (var rr = 0; rr < 3; rr++) {
                                var rowSum = grid[rr][0] + grid[rr][1] + grid[rr][2];
                                var full = grid[rr][0] > 0 && grid[rr][1] > 0 && grid[rr][2] > 0;
                                var good = full && rowSum === 15;
                                if (full && !good) allCorrect = false;
                                ctx.fillStyle = full ? (good ? viz.colors.green : viz.colors.red) : viz.colors.text;
                                ctx.font = full ? 'bold 18px -apple-system,sans-serif' : '16px -apple-system,sans-serif';
                                ctx.textAlign = 'left';
                                ctx.textBaseline = 'middle';
                                ctx.fillText('= ' + (rowSum || '?'), startX + 3 * cellSize + 12, startY + rr * cellSize + cellSize / 2);
                            }

                            // Column sums
                            var sumY = startY + 3 * cellSize + 16;
                            for (var cc = 0; cc < 3; cc++) {
                                var colSum = grid[0][cc] + grid[1][cc] + grid[2][cc];
                                var fullC = grid[0][cc] > 0 && grid[1][cc] > 0 && grid[2][cc] > 0;
                                var goodC = fullC && colSum === 15;
                                if (fullC && !goodC) allCorrect = false;
                                ctx.fillStyle = fullC ? (goodC ? viz.colors.green : viz.colors.red) : viz.colors.text;
                                ctx.font = fullC ? 'bold 18px -apple-system,sans-serif' : '16px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.fillText('= ' + (colSum || '?'), startX + cc * cellSize + cellSize / 2, sumY);
                            }

                            // Diagonal sums
                            var d0 = grid[0][0] + grid[1][1] + grid[2][2];
                            var d0full = grid[0][0] > 0 && grid[1][1] > 0 && grid[2][2] > 0;
                            var d0good = d0full && d0 === 15;
                            var d1 = grid[0][2] + grid[1][1] + grid[2][0];
                            var d1full = grid[0][2] > 0 && grid[1][1] > 0 && grid[2][0] > 0;
                            var d1good = d1full && d1 === 15;

                            ctx.fillStyle = d0full ? (d0good ? viz.colors.green : viz.colors.red) : viz.colors.text;
                            ctx.font = '14px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.fillText('Diag \\ = ' + (d0 || '?'), startX + 3 * cellSize + 12, sumY);

                            ctx.fillStyle = d1full ? (d1good ? viz.colors.green : viz.colors.red) : viz.colors.text;
                            ctx.fillText('Diag / = ' + (d1 || '?'), startX + 3 * cellSize + 12, sumY + 22);

                            // Available numbers display
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '14px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('Available: ' + (available.length > 0 ? available.join(', ') : 'none'), 350, startY + 3 * cellSize + 80);

                            // Victory message
                            if (available.length === 0 && allCorrect && d0good && d1good) {
                                ctx.fillStyle = viz.colors.green;
                                ctx.font = 'bold 24px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.fillText('You made a magic square! Awesome!', 350, startY + 3 * cellSize + 110);
                            }
                        }

                        draw();
                    }
                }
            ],
            exercises: [
                {
                    question: 'In a 3x3 magic square using the numbers 1 through 9, what is the magic constant? Explain why.',
                    hint: 'Add up all the numbers 1 through 9. How many rows share that total?',
                    solution: 'The magic constant is \\(15\\). The numbers 1 through 9 add up to \\(45\\). Since there are 3 rows and each row has the same sum, each row must sum to \\(45 \\div 3 = 15\\).'
                },
                {
                    question: 'If you made a magic square using the numbers 3, 4, 5, 6, 7, 8, 9, 10, 11, what would the magic constant be?',
                    hint: 'First add all nine numbers: \\(3 + 4 + 5 + \\cdots + 11\\). Then divide by 3.',
                    solution: 'The sum is \\(3+4+5+6+7+8+9+10+11 = 63\\). The magic constant is \\(63 \\div 3 = 21\\).'
                },
                {
                    question: 'In the classic 3x3 magic square, the center number is 5. Why must the center number always be the middle value of the nine numbers?',
                    hint: 'The center appears in one row, one column, and both diagonals. How many lines pass through it?',
                    solution: 'The center cell appears in 4 lines (1 row + 1 column + 2 diagonals). Each line sums to 15. The sum of all four lines is \\(4 \\times 15 = 60\\). Every other cell appears in exactly 2 lines, but the center appears in 4. For the math to balance, the center must be the average of all 9 numbers: \\(45 \\div 9 = 5\\).'
                }
            ]
        },

        // ============================================================
        // SECTION 2: Number Puzzles & Riddles
        // ============================================================
        {
            id: 'ch09-sec02',
            title: 'Number Puzzles & Riddles',
            content: `
                <h2>Number Puzzles & Riddles</h2>

                <p>Numbers love to play hide-and-seek! In this section, you will become a puzzle solver. We will work on <strong>"I'm thinking of a number"</strong> puzzles, <strong>missing digit</strong> puzzles, and <strong>cross-number</strong> challenges.</p>

                <h3>"I'm Thinking of a Number" Puzzles</h3>

                <p>These are like little detective stories. Someone gives you clues, and you figure out the mystery number!</p>

                <div class="env-block example">
                    <div class="env-title">Example</div>
                    <div class="env-body">
                        <p><em>"I'm thinking of a number. If I double it and add 3, I get 11. What is my number?"</em></p>
                        <p>Work backward: Start with 11. Undo "add 3" by subtracting 3: \\(11 - 3 = 8\\). Undo "double" by cutting in half: \\(8 \\div 2 = 4\\).</p>
                        <p>The mystery number is <strong>4</strong>! Check: \\(4 \\times 2 + 3 = 8 + 3 = 11\\). Yes!</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="mystery-number-machine"></div>

                <div class="env-block intuition">
                    <div class="env-title">Discovery</div>
                    <div class="env-body">
                        <p>The secret to "thinking of a number" puzzles is <strong>working backward</strong>. Whatever operation was done last, you undo first. Addition undoes subtraction. Multiplication undoes division. It is like rewinding a movie!</p>
                    </div>
                </div>

                <h3>Missing Digit Puzzles</h3>

                <p>In these puzzles, some digits are hidden and you need to figure out what they are. For example:</p>

                <p style="text-align:center; font-size:1.2em;">
                    \\(3\\,\\square + \\square\\,7 = 64\\)
                </p>

                <p>What digits go in the squares? You need \\(30\\text{-something} + \\text{something-}7 = 64\\). Let us call the missing digits \\(A\\) and \\(B\\). Then \\((30 + A) + (10B + 7) = 64\\), which gives \\(A + 10B = 27\\). Since \\(A\\) and \\(B\\) are single digits, \\(B = 2\\) and \\(A = 7\\). So it is \\(37 + 27 = 64\\)!</p>

                <div class="viz-placeholder" data-viz="missing-digit-puzzle"></div>

                <div class="env-block warning">
                    <div class="env-title">Watch Out!</div>
                    <div class="env-body">
                        <p>When solving missing digit puzzles, remember that each digit must be a <strong>single number from 0 to 9</strong>. If your math says a digit should be 12, something went wrong — go back and check your work!</p>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Think About It</div>
                    <div class="env-body">
                        <p>Missing digit puzzles are actually your first taste of <strong>algebra</strong> — the part of math where you use letters or symbols to stand for unknown numbers. You are already doing algebra without even knowing it!</p>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'mystery-number-machine',
                    title: 'Mystery Number Machine',
                    description: 'Watch the machine process a mystery number step by step. Can you figure out the input?',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { width: 700, height: 340, scale: 1, originX: 0, originY: 0 });
                        var ctx = viz.ctx;

                        var puzzles = [
                            { desc: 'Double it, then add 3', ops: [{t:'x2'},{t:'+3'}], answer: 4, result: 11 },
                            { desc: 'Add 5, then multiply by 2', ops: [{t:'+5'},{t:'x2'}], answer: 3, result: 16 },
                            { desc: 'Multiply by 3, subtract 4', ops: [{t:'x3'},{t:'-4'}], answer: 6, result: 14 },
                            { desc: 'Add 7, then divide by 3', ops: [{t:'+7'},{t:'/3'}], answer: 5, result: 4 }
                        ];
                        var currentPuzzle = 0;
                        var showAnswer = false;

                        VizEngine.createButton(controls, 'Puzzle 1', function() { currentPuzzle = 0; showAnswer = false; draw(); });
                        VizEngine.createButton(controls, 'Puzzle 2', function() { currentPuzzle = 1; showAnswer = false; draw(); });
                        VizEngine.createButton(controls, 'Puzzle 3', function() { currentPuzzle = 2; showAnswer = false; draw(); });
                        VizEngine.createButton(controls, 'Puzzle 4', function() { currentPuzzle = 3; showAnswer = false; draw(); });
                        VizEngine.createButton(controls, 'Reveal Answer', function() { showAnswer = true; draw(); });

                        function applyOp(val, op) {
                            if (op.t === 'x2') return val * 2;
                            if (op.t === 'x3') return val * 3;
                            if (op.t === '+3') return val + 3;
                            if (op.t === '+5') return val + 5;
                            if (op.t === '+7') return val + 7;
                            if (op.t === '-4') return val - 4;
                            if (op.t === '/3') return val / 3;
                            return val;
                        }

                        function opLabel(op) {
                            if (op.t === 'x2') return 'Double it (x2)';
                            if (op.t === 'x3') return 'Triple it (x3)';
                            if (op.t === '+3') return 'Add 3';
                            if (op.t === '+5') return 'Add 5';
                            if (op.t === '+7') return 'Add 7';
                            if (op.t === '-4') return 'Subtract 4';
                            if (op.t === '/3') return 'Divide by 3';
                            return op.t;
                        }

                        function draw() {
                            viz.clear();
                            var p = puzzles[currentPuzzle];

                            // Title
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 20px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'middle';
                            ctx.fillText('Mystery Number Machine', 350, 28);

                            ctx.fillStyle = viz.colors.teal;
                            ctx.font = '16px -apple-system,sans-serif';
                            ctx.fillText('"' + p.desc + ' and I get ' + p.result + '. What did I start with?"', 350, 58);

                            // Draw the machine pipeline
                            var pipeY = 160;
                            var boxW = 120;
                            var boxH = 60;
                            var gap = 50;
                            var totalW = boxW + p.ops.length * (boxW + gap) + boxW;
                            var sx = (700 - totalW) / 2;

                            // Input box
                            ctx.fillStyle = showAnswer ? viz.colors.green + '33' : viz.colors.purple + '33';
                            ctx.fillRect(sx, pipeY - boxH / 2, boxW, boxH);
                            ctx.strokeStyle = showAnswer ? viz.colors.green : viz.colors.purple;
                            ctx.lineWidth = 3;
                            ctx.strokeRect(sx, pipeY - boxH / 2, boxW, boxH);
                            ctx.fillStyle = showAnswer ? viz.colors.green : viz.colors.purple;
                            ctx.font = 'bold 28px -apple-system,sans-serif';
                            ctx.fillText(showAnswer ? '' + p.answer : '?', sx + boxW / 2, pipeY);
                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.fillText('INPUT', sx + boxW / 2, pipeY + boxH / 2 + 16);

                            var val = p.answer;
                            for (var i = 0; i < p.ops.length; i++) {
                                var opX = sx + boxW + gap + i * (boxW + gap);

                                // Arrow
                                ctx.strokeStyle = viz.colors.teal;
                                ctx.lineWidth = 2;
                                ctx.beginPath();
                                ctx.moveTo(opX - gap + 5, pipeY);
                                ctx.lineTo(opX - 5, pipeY);
                                ctx.stroke();
                                ctx.fillStyle = viz.colors.teal;
                                ctx.beginPath();
                                ctx.moveTo(opX - 5, pipeY);
                                ctx.lineTo(opX - 15, pipeY - 6);
                                ctx.lineTo(opX - 15, pipeY + 6);
                                ctx.closePath();
                                ctx.fill();

                                // Show intermediate value
                                if (showAnswer) {
                                    ctx.fillStyle = viz.colors.yellow;
                                    ctx.font = 'bold 14px -apple-system,sans-serif';
                                    ctx.fillText('' + val, (opX - gap + 5 + opX - 5) / 2, pipeY - 18);
                                }

                                val = applyOp(val, p.ops[i]);

                                // Operation box
                                ctx.fillStyle = viz.colors.orange + '33';
                                ctx.fillRect(opX, pipeY - boxH / 2, boxW, boxH);
                                ctx.strokeStyle = viz.colors.orange;
                                ctx.lineWidth = 2;
                                ctx.strokeRect(opX, pipeY - boxH / 2, boxW, boxH);
                                ctx.fillStyle = viz.colors.orange;
                                ctx.font = 'bold 16px -apple-system,sans-serif';
                                ctx.fillText(opLabel(p.ops[i]), opX + boxW / 2, pipeY);
                            }

                            // Final arrow
                            var outX = sx + boxW + gap + p.ops.length * (boxW + gap);
                            ctx.strokeStyle = viz.colors.teal;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            ctx.moveTo(outX - gap + 5, pipeY);
                            ctx.lineTo(outX - 5, pipeY);
                            ctx.stroke();
                            ctx.fillStyle = viz.colors.teal;
                            ctx.beginPath();
                            ctx.moveTo(outX - 5, pipeY);
                            ctx.lineTo(outX - 15, pipeY - 6);
                            ctx.lineTo(outX - 15, pipeY + 6);
                            ctx.closePath();
                            ctx.fill();

                            if (showAnswer) {
                                ctx.fillStyle = viz.colors.yellow;
                                ctx.font = 'bold 14px -apple-system,sans-serif';
                                ctx.fillText('' + val, (outX - gap + 5 + outX - 5) / 2, pipeY - 18);
                            }

                            // Output box
                            ctx.fillStyle = viz.colors.blue + '33';
                            ctx.fillRect(outX, pipeY - boxH / 2, boxW, boxH);
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 3;
                            ctx.strokeRect(outX, pipeY - boxH / 2, boxW, boxH);
                            ctx.fillStyle = viz.colors.blue;
                            ctx.font = 'bold 28px -apple-system,sans-serif';
                            ctx.fillText('' + p.result, outX + boxW / 2, pipeY);
                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.fillText('OUTPUT', outX + boxW / 2, pipeY + boxH / 2 + 16);

                            // Hint at bottom
                            if (!showAnswer) {
                                ctx.fillStyle = viz.colors.text;
                                ctx.font = '14px -apple-system,sans-serif';
                                ctx.fillText('Tip: work backward from the output to find the input!', 350, 280);
                            } else {
                                ctx.fillStyle = viz.colors.green;
                                ctx.font = 'bold 18px -apple-system,sans-serif';
                                ctx.fillText('The mystery number is ' + p.answer + '!', 350, 280);
                            }
                        }

                        draw();
                    }
                },
                {
                    id: 'missing-digit-puzzle',
                    title: 'Missing Digit Challenge',
                    description: 'Can you figure out the missing digits to make the equation correct?',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { width: 700, height: 350, scale: 1, originX: 0, originY: 0 });
                        var ctx = viz.ctx;

                        var puzzles = [
                            { eq: '2_ + _3 = 56', a: 23, b: 33, display: ['2?', '+', '?3', '=', '56'], ans: [23, 33] },
                            { eq: '_5 + 3_ = 73', a: 35, b: 38, display: ['?5', '+', '3?', '=', '73'], ans: [35, 38] },
                            { eq: '4_ - 1_ = 29', a: 45, b: 16, display: ['4?', '-', '1?', '=', '29'], ans: [45, 16] },
                            { eq: '_6 x _ = 48', a: 16, b: 3, display: ['?6', 'x', '?', '=', '48'], ans: [16, 3] }
                        ];
                        var current = 0;
                        var revealed = false;

                        VizEngine.createButton(controls, 'Puzzle 1', function() { current = 0; revealed = false; draw(); });
                        VizEngine.createButton(controls, 'Puzzle 2', function() { current = 1; revealed = false; draw(); });
                        VizEngine.createButton(controls, 'Puzzle 3', function() { current = 2; revealed = false; draw(); });
                        VizEngine.createButton(controls, 'Puzzle 4', function() { current = 3; revealed = false; draw(); });
                        VizEngine.createButton(controls, 'Show Answer', function() { revealed = true; draw(); });

                        function draw() {
                            viz.clear();
                            var p = puzzles[current];

                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 20px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'middle';
                            ctx.fillText('Missing Digit Puzzle', 350, 30);

                            // Draw the equation with big, colorful digits
                            var eqY = 130;
                            var parts = p.display;
                            var totalEqW = parts.length * 70;
                            var eqStartX = (700 - totalEqW) / 2;

                            for (var i = 0; i < parts.length; i++) {
                                var px = eqStartX + i * 70 + 35;
                                var part = parts[i];

                                if (part === '+' || part === '-' || part === 'x' || part === '=') {
                                    ctx.fillStyle = viz.colors.teal;
                                    ctx.font = 'bold 36px -apple-system,sans-serif';
                                    ctx.fillText(part, px, eqY);
                                } else {
                                    // Draw each character
                                    for (var j = 0; j < part.length; j++) {
                                        var ch = part[j];
                                        var charX = px - (part.length - 1) * 12 + j * 24;
                                        if (ch === '?') {
                                            if (revealed) {
                                                // Show the answer digit
                                                var ansNum = p.ans[i < 2 ? 0 : 1];
                                                var ansStr = '' + ansNum;
                                                var digitIdx = j;
                                                var ansCh = ansStr[digitIdx] || '?';
                                                ctx.fillStyle = viz.colors.green;
                                                ctx.font = 'bold 40px -apple-system,sans-serif';
                                                ctx.fillText(ansCh, charX, eqY);
                                            } else {
                                                // Draw a box for the missing digit
                                                ctx.fillStyle = viz.colors.yellow + '33';
                                                ctx.fillRect(charX - 16, eqY - 24, 32, 48);
                                                ctx.strokeStyle = viz.colors.yellow;
                                                ctx.lineWidth = 2.5;
                                                ctx.strokeRect(charX - 16, eqY - 24, 32, 48);
                                                ctx.fillStyle = viz.colors.yellow;
                                                ctx.font = 'bold 32px -apple-system,sans-serif';
                                                ctx.fillText('?', charX, eqY);
                                            }
                                        } else {
                                            ctx.fillStyle = viz.colors.white;
                                            ctx.font = 'bold 40px -apple-system,sans-serif';
                                            ctx.fillText(ch, charX, eqY);
                                        }
                                    }
                                }
                            }

                            // Reveal full equation
                            if (revealed) {
                                ctx.fillStyle = viz.colors.green;
                                ctx.font = 'bold 24px -apple-system,sans-serif';
                                ctx.fillText(p.a + ' ' + p.display[1] + ' ' + p.b + ' = ' + p.display[4], 350, 220);

                                ctx.fillStyle = viz.colors.text;
                                ctx.font = '16px -apple-system,sans-serif';
                                ctx.fillText('Great detective work!', 350, 260);
                            } else {
                                ctx.fillStyle = viz.colors.text;
                                ctx.font = '15px -apple-system,sans-serif';
                                ctx.fillText('What digits go in the yellow boxes?', 350, 220);
                                ctx.fillText('Think about what each place value needs to be!', 350, 248);
                            }
                        }

                        draw();
                    }
                }
            ],
            exercises: [
                {
                    question: '"I\'m thinking of a number. I multiply it by 4 and subtract 6. I get 18." What is the number?',
                    hint: 'Work backward: start with 18. Undo "subtract 6" by adding 6. Then undo "multiply by 4" by dividing by 4.',
                    solution: 'Start with 18. Add 6: \\(18 + 6 = 24\\). Divide by 4: \\(24 \\div 4 = 6\\). The number is \\(6\\). Check: \\(6 \\times 4 - 6 = 24 - 6 = 18\\). Correct!'
                },
                {
                    question: 'Find the missing digits: \\(\\square 4 + 2\\square = 71\\)',
                    hint: 'The ones digits: \\(4 + \\square\\) must end in 1. What single digit added to 4 gives a ones digit of 1?',
                    solution: 'Ones column: \\(4 + 7 = 11\\), write 1 carry 1. Tens column: \\(\\square + 2 + 1 = 7\\), so \\(\\square = 4\\). The answer is \\(44 + 27 = 71\\).'
                },
                {
                    question: '"I\'m thinking of a two-digit number. Its digits add up to 9, and if you reverse the digits you get a number that is 27 more." What is the number?',
                    hint: 'If the number is \\(\\overline{AB}\\), then \\(A + B = 9\\) and \\(\\overline{BA} - \\overline{AB} = 27\\). In other words, \\((10B + A) - (10A + B) = 27\\).',
                    solution: 'Let the number be \\(10A + B\\). We know \\(A + B = 9\\) and \\(10B + A - 10A - B = 27\\), which simplifies to \\(9B - 9A = 27\\), so \\(B - A = 3\\). From \\(A + B = 9\\) and \\(B - A = 3\\), we get \\(B = 6\\) and \\(A = 3\\). The number is <strong>36</strong>. Check: \\(3+6=9\\) and \\(63 - 36 = 27\\). Correct!'
                }
            ]
        },

        // ============================================================
        // SECTION 3: Mental Math Tricks
        // ============================================================
        {
            id: 'ch09-sec03',
            title: 'Mental Math Tricks',
            content: `
                <h2>Mental Math Tricks</h2>

                <p>Want to do math like a <strong>superhero</strong>? These mental math tricks will help you calculate faster — sometimes even faster than a calculator! The best part is they all make sense once you see <em>why</em> they work.</p>

                <h3>The Multiply-by-9 Finger Trick</h3>

                <p>Hold up all 10 fingers. To multiply 9 by any number from 1 to 10, fold down the finger at that position (counting from the left). The fingers to the left of the fold are the tens digit, and the fingers to the right are the ones digit!</p>

                <p>For example, \\(9 \\times 4\\): fold down finger #4. You see <strong>3 fingers</strong> on the left and <strong>6 fingers</strong> on the right. The answer is <strong>36</strong>!</p>

                <div class="viz-placeholder" data-viz="finger-multiply-nine"></div>

                <div class="env-block intuition">
                    <div class="env-title">Cool Fact</div>
                    <div class="env-body">
                        <p>Why does the finger trick work? Because \\(9 \\times n = 10n - n\\). When you fold down finger \\(n\\), you have \\(n-1\\) fingers on the left (the tens digit) and \\(10-n\\) fingers on the right (the ones digit). That gives \\(10(n-1) + (10-n) = 10n - 10 + 10 - n = 9n\\). Clever, right?</p>
                    </div>
                </div>

                <h3>The Multiply-by-11 Shortcut</h3>

                <p>To multiply a <strong>two-digit number</strong> by 11, just add the two digits together and put the sum in the middle!</p>

                <p style="text-align:center; font-size:1.1em;">
                    \\(36 \\times 11\\): split the 3 and 6, put \\(3 + 6 = 9\\) in the middle: <strong style="color:var(--accent-green);">396</strong>!
                </p>

                <div class="env-block warning">
                    <div class="env-title">Watch Out!</div>
                    <div class="env-body">
                        <p>What if the two digits add up to 10 or more? Then you need to carry! For \\(75 \\times 11\\): \\(7 + 5 = 12\\). Put the 2 in the middle and carry the 1 to the left digit: \\(7+1 = 8\\). Answer: <strong>825</strong>.</p>
                    </div>
                </div>

                <h3>Adding 9 the Easy Way</h3>

                <p>Adding 9 to any number is easy: just <strong>add 10 and subtract 1</strong>!</p>
                <p style="text-align:center;">
                    \\(47 + 9 = 47 + 10 - 1 = 57 - 1 = 56\\)
                </p>
                <p>This works because \\(9 = 10 - 1\\). Adding 10 is super easy (just increase the tens digit by 1), and subtracting 1 is simple too.</p>

                <h3>Doubling and Halving</h3>

                <p>When multiplying, you can <strong>double one number and halve the other</strong> without changing the answer! This is great when one of the numbers is awkward:</p>
                <p style="text-align:center;">
                    \\(25 \\times 12 = 50 \\times 6 = 300\\)
                </p>
                <p>We doubled 25 to get 50 (easy!) and halved 12 to get 6. Then \\(50 \\times 6 = 300\\). Much simpler!</p>

                <div class="viz-placeholder" data-viz="mental-math-practice"></div>

                <div class="env-block remark">
                    <div class="env-title">Think About It</div>
                    <div class="env-body">
                        <p>Why does doubling and halving work? Because multiplying one factor by 2 and dividing the other by 2 keeps the product the same: \\((a \\times 2) \\times (b \\div 2) = a \\times b\\). The 2s cancel out!</p>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'finger-multiply-nine',
                    title: 'The 9-Times Finger Trick',
                    description: 'Pick a number from 1 to 10 and watch the finger trick reveal the answer!',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { width: 700, height: 340, scale: 1, originX: 0, originY: 0 });
                        var ctx = viz.ctx;
                        var multiplier = 4;

                        VizEngine.createSlider(controls, 'Multiply 9 by', 1, 10, 4, 1, function(v) {
                            multiplier = Math.round(v);
                            draw();
                        });

                        function draw() {
                            viz.clear();
                            var n = multiplier;
                            var answer = 9 * n;
                            var tens = n - 1;
                            var ones = 10 - n;

                            // Title
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 22px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'middle';
                            ctx.fillText('9 x ' + n + ' = ?', 350, 30);

                            // Draw 10 fingers
                            var fingerY = 180;
                            var fingerW = 30;
                            var fingerH = 90;
                            var fingerGap = 12;
                            var totalW = 10 * fingerW + 9 * fingerGap;
                            var startFX = (700 - totalW) / 2;

                            for (var i = 1; i <= 10; i++) {
                                var fx = startFX + (i - 1) * (fingerW + fingerGap);
                                var folded = (i === n);

                                if (folded) {
                                    // Folded finger - shorter, dimmed
                                    ctx.fillStyle = '#3a3a5a';
                                    var foldH = 35;
                                    ctx.beginPath();
                                    ctx.moveTo(fx + 4, fingerY + fingerH - foldH);
                                    ctx.lineTo(fx + 4, fingerY + fingerH);
                                    ctx.lineTo(fx + fingerW - 4, fingerY + fingerH);
                                    ctx.lineTo(fx + fingerW - 4, fingerY + fingerH - foldH);
                                    ctx.quadraticCurveTo(fx + fingerW / 2, fingerY + fingerH - foldH - 12, fx + 4, fingerY + fingerH - foldH);
                                    ctx.fill();
                                    ctx.strokeStyle = viz.colors.text;
                                    ctx.lineWidth = 1;
                                    ctx.stroke();

                                    // Label: folded
                                    ctx.fillStyle = viz.colors.yellow;
                                    ctx.font = 'bold 12px -apple-system,sans-serif';
                                    ctx.textAlign = 'center';
                                    ctx.fillText('#' + i, fx + fingerW / 2, fingerY + fingerH + 18);
                                } else {
                                    // Standing finger
                                    var isLeft = i < n;
                                    var color = isLeft ? viz.colors.orange : viz.colors.blue;

                                    ctx.fillStyle = color + '55';
                                    ctx.beginPath();
                                    ctx.moveTo(fx + 4, fingerY + fingerH);
                                    ctx.lineTo(fx + 4, fingerY + 15);
                                    ctx.quadraticCurveTo(fx + fingerW / 2, fingerY - 2, fx + fingerW - 4, fingerY + 15);
                                    ctx.lineTo(fx + fingerW - 4, fingerY + fingerH);
                                    ctx.closePath();
                                    ctx.fill();
                                    ctx.strokeStyle = color;
                                    ctx.lineWidth = 2;
                                    ctx.stroke();

                                    // Finger number
                                    ctx.fillStyle = viz.colors.white;
                                    ctx.font = '12px -apple-system,sans-serif';
                                    ctx.textAlign = 'center';
                                    ctx.fillText('#' + i, fx + fingerW / 2, fingerY + fingerH + 18);
                                }
                            }

                            // Labels for tens and ones groups
                            if (tens > 0) {
                                var leftEnd = startFX + (n - 2) * (fingerW + fingerGap) + fingerW;
                                var leftStart = startFX;
                                ctx.fillStyle = viz.colors.orange;
                                ctx.font = 'bold 18px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.fillText(tens + ' finger' + (tens > 1 ? 's' : ''), (leftStart + leftEnd) / 2, fingerY - 30);
                                ctx.font = '14px -apple-system,sans-serif';
                                ctx.fillText('= ' + tens + ' tens', (leftStart + leftEnd) / 2, fingerY - 12);
                            }

                            if (ones > 0) {
                                var rightStart = startFX + n * (fingerW + fingerGap);
                                var rightEnd = startFX + 9 * (fingerW + fingerGap) + fingerW;
                                ctx.fillStyle = viz.colors.blue;
                                ctx.font = 'bold 18px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.fillText(ones + ' finger' + (ones > 1 ? 's' : ''), (rightStart + rightEnd) / 2, fingerY - 30);
                                ctx.font = '14px -apple-system,sans-serif';
                                ctx.fillText('= ' + ones + ' ones', (rightStart + rightEnd) / 2, fingerY - 12);
                            }

                            // Answer
                            ctx.fillStyle = viz.colors.green;
                            ctx.font = 'bold 28px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('9 x ' + n + ' = ' + answer, 350, fingerY + fingerH + 50);

                            // Explanation
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '14px -apple-system,sans-serif';
                            ctx.fillText('Fold down finger #' + n + ': ' + tens + ' on the left (tens), ' + ones + ' on the right (ones)', 350, 70);
                        }

                        draw();
                    }
                },
                {
                    id: 'mental-math-practice',
                    title: 'Mental Math Practice',
                    description: 'Practice your mental math tricks! Pick a trick and try to solve before revealing the answer.',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { width: 700, height: 320, scale: 1, originX: 0, originY: 0 });
                        var ctx = viz.ctx;

                        var tricks = [
                            { name: 'Multiply by 11', problems: [
                                {q: '23 x 11', a: 253, steps: '2_(2+3)_3 = 2_5_3 = 253'},
                                {q: '45 x 11', a: 495, steps: '4_(4+5)_5 = 4_9_5 = 495'},
                                {q: '67 x 11', a: 737, steps: '6_(6+7)_7 = 6_(13)_7 = carry: 737'},
                                {q: '84 x 11', a: 924, steps: '8_(8+4)_4 = 8_(12)_4 = carry: 924'}
                            ]},
                            { name: 'Add 9 trick', problems: [
                                {q: '38 + 9', a: 47, steps: '38 + 10 - 1 = 48 - 1 = 47'},
                                {q: '56 + 9', a: 65, steps: '56 + 10 - 1 = 66 - 1 = 65'},
                                {q: '74 + 9', a: 83, steps: '74 + 10 - 1 = 84 - 1 = 83'},
                                {q: '99 + 9', a: 108, steps: '99 + 10 - 1 = 109 - 1 = 108'}
                            ]},
                            { name: 'Double & Halve', problems: [
                                {q: '15 x 8', a: 120, steps: '30 x 4 = 120'},
                                {q: '25 x 16', a: 400, steps: '50 x 8 = 100 x 4 = 400'},
                                {q: '35 x 6', a: 210, steps: '70 x 3 = 210'},
                                {q: '45 x 4', a: 180, steps: '90 x 2 = 180'}
                            ]}
                        ];
                        var trickIdx = 0;
                        var probIdx = 0;
                        var showSteps = false;

                        VizEngine.createButton(controls, 'x11 Trick', function() { trickIdx = 0; probIdx = 0; showSteps = false; draw(); });
                        VizEngine.createButton(controls, 'Add 9 Trick', function() { trickIdx = 1; probIdx = 0; showSteps = false; draw(); });
                        VizEngine.createButton(controls, 'Double & Halve', function() { trickIdx = 2; probIdx = 0; showSteps = false; draw(); });
                        VizEngine.createButton(controls, 'Next Problem', function() {
                            probIdx = (probIdx + 1) % tricks[trickIdx].problems.length;
                            showSteps = false;
                            draw();
                        });
                        VizEngine.createButton(controls, 'Show Steps', function() { showSteps = true; draw(); });

                        function draw() {
                            viz.clear();
                            var trick = tricks[trickIdx];
                            var prob = trick.problems[probIdx];

                            // Trick name
                            ctx.fillStyle = viz.colors.teal;
                            ctx.font = 'bold 22px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'middle';
                            ctx.fillText(trick.name, 350, 35);

                            // Problem
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 42px -apple-system,sans-serif';
                            ctx.fillText(prob.q + ' = ?', 350, 110);

                            if (showSteps) {
                                // Steps
                                ctx.fillStyle = viz.colors.yellow;
                                ctx.font = '20px -apple-system,sans-serif';
                                ctx.fillText(prob.steps, 350, 180);

                                // Answer
                                ctx.fillStyle = viz.colors.green;
                                ctx.font = 'bold 36px -apple-system,sans-serif';
                                ctx.fillText('= ' + prob.a, 350, 240);
                            } else {
                                ctx.fillStyle = viz.colors.text;
                                ctx.font = '16px -apple-system,sans-serif';
                                ctx.fillText('Try to solve it in your head first, then click "Show Steps"!', 350, 190);

                                // Draw a thought bubble
                                ctx.strokeStyle = viz.colors.purple + '55';
                                ctx.lineWidth = 2;
                                ctx.setLineDash([4, 4]);
                                ctx.beginPath();
                                ctx.ellipse(350, 240, 80, 40, 0, 0, Math.PI * 2);
                                ctx.stroke();
                                ctx.setLineDash([]);
                                ctx.fillStyle = viz.colors.purple;
                                ctx.font = 'bold 24px -apple-system,sans-serif';
                                ctx.fillText('Think!', 350, 240);
                            }

                            // Problem counter
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.fillText('Problem ' + (probIdx + 1) + ' of ' + trick.problems.length, 350, 300);
                        }

                        draw();
                    }
                }
            ],
            exercises: [
                {
                    question: 'Use the finger trick to find \\(9 \\times 7\\). How many fingers are on the left and right of the folded finger?',
                    hint: 'Fold down finger number 7. Count fingers on the left and on the right.',
                    solution: 'Fold down finger #7. Left side: \\(6\\) fingers (tens). Right side: \\(3\\) fingers (ones). So \\(9 \\times 7 = 63\\).'
                },
                {
                    question: 'Use the multiply-by-11 shortcut to calculate \\(57 \\times 11\\).',
                    hint: 'Add the digits: \\(5 + 7 = 12\\). Since it is 12 (greater than 9), you need to carry!',
                    solution: 'Digits sum: \\(5 + 7 = 12\\). Put the 2 in the middle and carry the 1: \\(5+1 = 6\\). Answer: \\(57 \\times 11 = 627\\). Check: \\(57 \\times 11 = 57 \\times 10 + 57 = 570 + 57 = 627\\).'
                },
                {
                    question: 'Use doubling and halving to compute \\(35 \\times 14\\) mentally.',
                    hint: 'Double 35 to get 70, halve 14 to get 7. What is \\(70 \\times 7\\)?',
                    solution: 'Double and halve: \\(35 \\times 14 = 70 \\times 7 = 490\\). Or you can go further: the first step was enough since \\(70 \\times 7 = 490\\).'
                }
            ]
        },

        // ============================================================
        // SECTION 4: Math in Games
        // ============================================================
        {
            id: 'ch09-sec04',
            title: 'Math in Games',
            content: `
                <h2>Math in Games</h2>

                <p>Did you know there is math hiding inside almost every game you play? From dice and cards to board games, math is the engine that makes games exciting! Let us explore the hidden mathematics in your favorite games.</p>

                <h3>Dice Math: Which Sums Are Most Likely?</h3>

                <p>When you roll <strong>two dice</strong>, each die shows a number from 1 to 6. The smallest possible sum is \\(1 + 1 = 2\\) and the biggest is \\(6 + 6 = 12\\). But here is the big question: <em>are all sums equally likely?</em></p>

                <p>No! There is only <strong>one way</strong> to roll a sum of 2 (both dice show 1), but there are <strong>six ways</strong> to roll a sum of 7 (like 1+6, 2+5, 3+4, 4+3, 5+2, 6+1). So 7 is the most common sum!</p>

                <div class="viz-placeholder" data-viz="dice-sum-chart"></div>

                <div class="env-block intuition">
                    <div class="env-title">Discovery</div>
                    <div class="env-body">
                        <p>There are \\(6 \\times 6 = 36\\) total ways two dice can land. The number of ways to make each sum forms a beautiful pattern:</p>
                        <p style="text-align:center;">Sum 2: 1 way, Sum 3: 2 ways, Sum 4: 3 ways, ..., Sum 7: <strong>6 ways</strong>, ..., Sum 12: 1 way</p>
                        <p>It goes up to 6 and then back down — like a mountain! The peak is at 7.</p>
                    </div>
                </div>

                <h3>Card Game Math</h3>

                <p>A standard deck has <strong>52 cards</strong>: 4 suits (hearts, diamonds, clubs, spades) with 13 cards each (Ace through King). That means:</p>
                <ul>
                    <li>The chance of drawing a heart is \\(13 \\div 52 = \\frac{1}{4}\\) — one out of every four cards.</li>
                    <li>The chance of drawing an Ace is \\(4 \\div 52 = \\frac{1}{13}\\).</li>
                    <li>The values of all cards in a suit add up to \\(1+2+3+\\cdots+13 = 91\\).</li>
                </ul>

                <div class="viz-placeholder" data-viz="dice-roller-sim"></div>

                <h3>Board Game Counting</h3>

                <p>In games like <em>Snakes and Ladders</em> or <em>Monopoly</em>, you move based on dice rolls. Since 7 is the most likely sum of two dice, in Monopoly you are most likely to land on spaces that are about 7 squares ahead! Game designers use this math when deciding where to place important spaces.</p>

                <div class="env-block example">
                    <div class="env-title">Try This!</div>
                    <div class="env-body">
                        <p>Roll two dice 36 times and tally up how often you get each sum (2 through 12). Compare your results to the expected counts:</p>
                        <p>Sum 7 should show up about 6 times, sums 6 and 8 about 5 times each, sums 2 and 12 only about once each. Do your results match?</p>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Think About It</div>
                    <div class="env-body">
                        <p>Games that use <strong>one die</strong> are purely random — every number 1-6 is equally likely. But games that use <strong>two dice</strong> are not equally random for each sum! This is why understanding probability (the math of chance) can actually help you make better decisions in games.</p>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'dice-sum-chart',
                    title: 'Two-Dice Sum Chart',
                    description: 'See all 36 possible outcomes and how many ways there are to roll each sum.',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { width: 700, height: 420, scale: 1, originX: 0, originY: 0 });
                        var ctx = viz.ctx;
                        var highlightSum = 7;

                        VizEngine.createSlider(controls, 'Highlight Sum', 2, 12, 7, 1, function(v) {
                            highlightSum = Math.round(v);
                            draw();
                        });

                        function draw() {
                            viz.clear();

                            // Title
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 18px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'middle';
                            ctx.fillText('All 36 Outcomes of Rolling Two Dice', 350, 22);

                            // Draw the 6x6 grid
                            var cellSize = 42;
                            var gridX = 100;
                            var gridY = 55;

                            // Headers
                            ctx.fillStyle = viz.colors.blue;
                            ctx.font = 'bold 14px -apple-system,sans-serif';
                            ctx.fillText('Die 1', gridX + 3 * cellSize, gridY - 14);
                            ctx.fillStyle = viz.colors.orange;
                            ctx.save();
                            ctx.translate(gridX - 16, gridY + 3 * cellSize);
                            ctx.rotate(-Math.PI / 2);
                            ctx.fillText('Die 2', 0, 0);
                            ctx.restore();

                            for (var d1 = 1; d1 <= 6; d1++) {
                                // Column header
                                ctx.fillStyle = viz.colors.blue;
                                ctx.font = 'bold 14px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.fillText(d1, gridX + (d1 - 1) * cellSize + cellSize / 2, gridY + cellSize / 2 - cellSize);
                            }

                            for (var d2 = 1; d2 <= 6; d2++) {
                                // Row header
                                ctx.fillStyle = viz.colors.orange;
                                ctx.font = 'bold 14px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.fillText(d2, gridX - cellSize / 2, gridY + (d2 - 1) * cellSize + cellSize / 2);

                                for (var d1b = 1; d1b <= 6; d1b++) {
                                    var sum = d1b + d2;
                                    var cx = gridX + (d1b - 1) * cellSize;
                                    var cy = gridY + (d2 - 1) * cellSize;
                                    var isHL = (sum === highlightSum);

                                    ctx.fillStyle = isHL ? viz.colors.green + '55' : '#1a1a40';
                                    ctx.fillRect(cx, cy, cellSize - 1, cellSize - 1);
                                    ctx.strokeStyle = isHL ? viz.colors.green : '#30363d';
                                    ctx.lineWidth = isHL ? 2.5 : 1;
                                    ctx.strokeRect(cx, cy, cellSize - 1, cellSize - 1);

                                    ctx.fillStyle = isHL ? viz.colors.white : viz.colors.text;
                                    ctx.font = isHL ? 'bold 16px -apple-system,sans-serif' : '14px -apple-system,sans-serif';
                                    ctx.textAlign = 'center';
                                    ctx.textBaseline = 'middle';
                                    ctx.fillText(sum, cx + cellSize / 2, cy + cellSize / 2);
                                }
                            }

                            // Bar chart on the right
                            var barX = gridX + 6 * cellSize + 30;
                            var barMaxH = 6 * cellSize;
                            var barW = 22;
                            var ways = [0, 0, 1, 2, 3, 4, 5, 6, 5, 4, 3, 2, 1]; // index = sum

                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 14px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('Ways to', barX + 5.5 * (barW + 4), gridY - 20);
                            ctx.fillText('make each sum', barX + 5.5 * (barW + 4), gridY - 4);

                            for (var s = 2; s <= 12; s++) {
                                var bx = barX + (s - 2) * (barW + 4);
                                var bh = (ways[s] / 6) * (barMaxH * 0.7);
                                var by = gridY + barMaxH - bh;
                                var isHLbar = (s === highlightSum);

                                ctx.fillStyle = isHLbar ? viz.colors.green + '88' : viz.colors.purple + '44';
                                ctx.fillRect(bx, by, barW, bh);
                                ctx.strokeStyle = isHLbar ? viz.colors.green : viz.colors.purple;
                                ctx.lineWidth = isHLbar ? 2.5 : 1;
                                ctx.strokeRect(bx, by, barW, bh);

                                // Sum label
                                ctx.fillStyle = isHLbar ? viz.colors.green : viz.colors.text;
                                ctx.font = isHLbar ? 'bold 12px -apple-system,sans-serif' : '11px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.fillText(s, bx + barW / 2, gridY + barMaxH + 14);

                                // Count label
                                ctx.fillText(ways[s], bx + barW / 2, by - 10);
                            }

                            // Info text
                            ctx.fillStyle = viz.colors.green;
                            ctx.font = 'bold 16px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('Sum of ' + highlightSum + ': ' + ways[highlightSum] + ' out of 36 ways (' + Math.round(ways[highlightSum] / 36 * 100) + '%)', 350, gridY + 6 * cellSize + 36);
                        }

                        draw();
                    }
                },
                {
                    id: 'dice-roller-sim',
                    title: 'Dice Roller Simulator',
                    description: 'Roll two dice many times and watch the results pile up. Does the pattern match the theory?',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { width: 700, height: 340, scale: 1, originX: 0, originY: 0 });
                        var ctx = viz.ctx;

                        var counts = {};
                        for (var i = 2; i <= 12; i++) counts[i] = 0;
                        var totalRolls = 0;
                        var lastDie1 = 0;
                        var lastDie2 = 0;

                        function rollOnce() {
                            lastDie1 = Math.floor(Math.random() * 6) + 1;
                            lastDie2 = Math.floor(Math.random() * 6) + 1;
                            counts[lastDie1 + lastDie2]++;
                            totalRolls++;
                        }

                        VizEngine.createButton(controls, 'Roll Once', function() { rollOnce(); draw(); });
                        VizEngine.createButton(controls, 'Roll 10x', function() { for (var i = 0; i < 10; i++) rollOnce(); draw(); });
                        VizEngine.createButton(controls, 'Roll 100x', function() { for (var i = 0; i < 100; i++) rollOnce(); draw(); });
                        VizEngine.createButton(controls, 'Reset', function() {
                            for (var j = 2; j <= 12; j++) counts[j] = 0;
                            totalRolls = 0; lastDie1 = 0; lastDie2 = 0; draw();
                        });

                        function drawDie(x, y, val, color) {
                            var s = 50;
                            ctx.fillStyle = color + '33';
                            ctx.fillRect(x, y, s, s);
                            ctx.strokeStyle = color;
                            ctx.lineWidth = 2;
                            ctx.strokeRect(x, y, s, s);
                            // Round the corners a bit with a second rect
                            ctx.fillStyle = color;
                            ctx.font = 'bold 28px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'middle';
                            ctx.fillText(val > 0 ? val : '-', x + s / 2, y + s / 2);
                        }

                        function draw() {
                            viz.clear();

                            // Title
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 18px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'middle';
                            ctx.fillText('Dice Roller (' + totalRolls + ' rolls)', 350, 22);

                            // Dice display
                            drawDie(270, 40, lastDie1, viz.colors.blue);
                            drawDie(370, 40, lastDie2, viz.colors.orange);
                            if (lastDie1 > 0) {
                                ctx.fillStyle = viz.colors.teal;
                                ctx.font = 'bold 22px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.fillText('+', 350, 65);
                                ctx.fillText('= ' + (lastDie1 + lastDie2), 350, 100);
                            }

                            // Bar chart
                            var barAreaX = 60;
                            var barAreaY = 130;
                            var barMaxH = 160;
                            var barW = 46;
                            var barGap = 6;
                            var maxCount = 1;
                            for (var k = 2; k <= 12; k++) {
                                if (counts[k] > maxCount) maxCount = counts[k];
                            }

                            var sumColors = [
                                '', '', viz.colors.red, viz.colors.orange, viz.colors.yellow,
                                viz.colors.green, viz.colors.teal, viz.colors.blue,
                                viz.colors.teal, viz.colors.green, viz.colors.yellow,
                                viz.colors.orange, viz.colors.red
                            ];

                            for (var ss = 2; ss <= 12; ss++) {
                                var bx = barAreaX + (ss - 2) * (barW + barGap);
                                var bh = maxCount > 0 ? (counts[ss] / maxCount) * barMaxH : 0;
                                var by = barAreaY + barMaxH - bh;

                                ctx.fillStyle = sumColors[ss] + '55';
                                ctx.fillRect(bx, by, barW, bh);
                                ctx.strokeStyle = sumColors[ss];
                                ctx.lineWidth = 1.5;
                                ctx.strokeRect(bx, by, barW, bh);

                                // Count
                                ctx.fillStyle = viz.colors.white;
                                ctx.font = 'bold 13px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                if (counts[ss] > 0) {
                                    ctx.fillText(counts[ss], bx + barW / 2, by - 10);
                                }

                                // Sum label
                                ctx.fillStyle = sumColors[ss];
                                ctx.font = '13px -apple-system,sans-serif';
                                ctx.fillText(ss, bx + barW / 2, barAreaY + barMaxH + 16);
                            }

                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('Roll more times to see the "mountain" pattern form at sum 7!', 350, barAreaY + barMaxH + 40);
                        }

                        draw();
                    }
                }
            ],
            exercises: [
                {
                    question: 'How many ways can you roll a sum of 9 with two dice? List them all.',
                    hint: 'What pairs of numbers from 1-6 add up to 9? Remember, (3,6) and (6,3) count as different rolls.',
                    solution: 'There are <strong>4 ways</strong>: (3,6), (4,5), (5,4), (6,3). Each pair where the two numbers add to 9 and both are between 1 and 6.'
                },
                {
                    question: 'If you roll two dice 360 times, about how many times would you expect to get a sum of 7?',
                    hint: 'There are 6 ways to roll 7 out of 36 total outcomes. What fraction is that? Multiply by 360.',
                    solution: 'The probability of rolling 7 is \\(\\frac{6}{36} = \\frac{1}{6}\\). Out of 360 rolls: \\(360 \\times \\frac{1}{6} = 60\\). You would expect about <strong>60 sevens</strong>.'
                },
                {
                    question: 'A standard deck has 52 cards. If you draw one card, what is the chance it is a face card (Jack, Queen, or King)?',
                    hint: 'How many face cards are there? Each suit has 3 face cards, and there are 4 suits.',
                    solution: 'There are \\(3 \\times 4 = 12\\) face cards. The probability is \\(\\frac{12}{52} = \\frac{3}{13} \\approx 23\\%\\).'
                }
            ]
        },

        // ============================================================
        // SECTION 5: Becoming a Number Detective
        // ============================================================
        {
            id: 'ch09-sec05',
            title: 'Becoming a Number Detective',
            content: `
                <h2>Becoming a Number Detective</h2>

                <p>You have learned a LOT of math on this journey. Now it is time to put it all together and become a true <strong>number detective</strong> — someone who uses math to explore the world, estimate big answers, and find patterns everywhere!</p>

                <h3>Fermi Problems: Estimating the Impossible</h3>

                <p>A <strong>Fermi problem</strong> (named after physicist Enrico Fermi) is a question where you do not know the exact answer, but you can make a <em>smart estimate</em> by breaking the problem into smaller parts.</p>

                <div class="env-block example">
                    <div class="env-title">Example</div>
                    <div class="env-body">
                        <p><em>"How many tennis balls would fit in your classroom?"</em></p>
                        <p>Break it down:</p>
                        <ul>
                            <li>A classroom is about 10m long, 8m wide, 3m tall = \\(10 \\times 8 \\times 3 = 240\\) cubic meters</li>
                            <li>A tennis ball is about 7 cm across, so its volume is roughly \\(7 \\times 7 \\times 7 = 343\\) cubic cm \\(\\approx 0.000343\\) cubic meters</li>
                            <li>But balls do not pack perfectly — about 64% of the space gets filled</li>
                            <li>Estimate: \\(240 \\times 0.64 \\div 0.000343 \\approx 450{,}000\\) tennis balls!</li>
                        </ul>
                        <p>The exact number does not matter — what matters is that you <strong>thought it through</strong>!</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="fermi-estimator"></div>

                <h3>Math in Nature</h3>

                <p>Math is not just in textbooks — it is hiding in nature all around you!</p>

                <p><strong>Fibonacci Numbers in Sunflowers:</strong> Count the spirals in a sunflower head. You will almost always find numbers from the <strong>Fibonacci sequence</strong>: \\(1, 1, 2, 3, 5, 8, 13, 21, 34, 55, \\ldots\\) where each number is the sum of the two before it. Sunflowers often have 34 spirals going one way and 55 going the other!</p>

                <p><strong>Symmetry in Butterflies:</strong> A butterfly's wings show <strong>bilateral symmetry</strong> — the left side is a mirror image of the right. Snowflakes have <strong>6-fold symmetry</strong>. Starfish have <strong>5-fold symmetry</strong>.</p>

                <div class="viz-placeholder" data-viz="fibonacci-spiral"></div>

                <div class="env-block intuition">
                    <div class="env-title">Cool Fact</div>
                    <div class="env-body">
                        <p>The Fibonacci sequence appears everywhere in nature: the number of petals on flowers (lilies have 3, buttercups have 5, daisies often have 34 or 55), the way leaves spiral around a stem, the shape of seashells, and even the breeding pattern of rabbits! Nature seems to "know" math.</p>
                    </div>
                </div>

                <h3>Your Math Journey Continues!</h3>

                <p>Congratulations — you have completed <strong>Fun Arithmetic & Number Sense</strong>! Here is what you have mastered:</p>

                <ul>
                    <li>Counting, place value, and how our number system works</li>
                    <li>Addition, subtraction, multiplication, and division</li>
                    <li>Patterns, sequences, and number properties</li>
                    <li>Estimation, rounding, and word problems</li>
                    <li>Number games, puzzles, and mental math tricks</li>
                </ul>

                <p>But this is just the beginning! Mathematics is an endless adventure. Next you might explore <strong>fractions and decimals</strong>, <strong>geometry and shapes</strong>, or <strong>pre-algebra</strong>. Whatever comes next, remember: you are already a mathematician. Every time you think logically, spot a pattern, or solve a problem, you are doing math!</p>

                <div class="env-block remark">
                    <div class="env-title">Think About It</div>
                    <div class="env-body">
                        <p>The most important thing in math is not getting the right answer quickly. It is <strong>thinking carefully</strong>, <strong>asking "why?"</strong>, and <strong>never giving up</strong> when a problem is hard. Every mathematician gets stuck sometimes — the fun is in figuring it out!</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="celebration-fireworks"></div>
            `,
            visualizations: [
                {
                    id: 'fermi-estimator',
                    title: 'Fermi Problem Explorer',
                    description: 'Break down big estimation problems into smaller, manageable pieces!',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { width: 700, height: 380, scale: 1, originX: 0, originY: 0 });
                        var ctx = viz.ctx;

                        var problems = [
                            {
                                q: 'How many breaths do you take in a day?',
                                steps: [
                                    'About 15 breaths per minute',
                                    '60 minutes per hour',
                                    '24 hours per day',
                                    '15 x 60 x 24'
                                ],
                                calc: [15, 60, 24],
                                answer: 21600,
                                unit: 'breaths'
                            },
                            {
                                q: 'How many steps to walk across your state?',
                                steps: [
                                    'State width: about 300 km',
                                    'That is 300,000 meters',
                                    'One step is about 0.7 meters',
                                    '300,000 / 0.7'
                                ],
                                calc: [300000, 0.7],
                                answer: 428571,
                                unit: 'steps'
                            },
                            {
                                q: 'How many words do you speak in a year?',
                                steps: [
                                    'About 16,000 words per day',
                                    '365 days per year',
                                    '16,000 x 365'
                                ],
                                calc: [16000, 365],
                                answer: 5840000,
                                unit: 'words'
                            }
                        ];
                        var current = 0;
                        var revealStep = 0; // 0 = question only, 1..n = steps revealed

                        VizEngine.createButton(controls, 'Problem 1', function() { current = 0; revealStep = 0; draw(); });
                        VizEngine.createButton(controls, 'Problem 2', function() { current = 1; revealStep = 0; draw(); });
                        VizEngine.createButton(controls, 'Problem 3', function() { current = 2; revealStep = 0; draw(); });
                        VizEngine.createButton(controls, 'Next Step', function() {
                            if (revealStep <= problems[current].steps.length) {
                                revealStep++;
                            }
                            draw();
                        });

                        function formatNum(n) {
                            return Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                        }

                        function draw() {
                            viz.clear();
                            var p = problems[current];

                            // Title
                            ctx.fillStyle = viz.colors.teal;
                            ctx.font = 'bold 18px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'middle';
                            ctx.fillText('Fermi Problem', 350, 25);

                            // Question
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 20px -apple-system,sans-serif';
                            ctx.fillText(p.q, 350, 65);

                            // Steps
                            var stepY = 110;
                            var stepColors = [viz.colors.blue, viz.colors.orange, viz.colors.green, viz.colors.purple];
                            for (var i = 0; i < p.steps.length; i++) {
                                if (i < revealStep) {
                                    ctx.fillStyle = stepColors[i % stepColors.length];
                                    ctx.font = '16px -apple-system,sans-serif';
                                    ctx.textAlign = 'left';

                                    // Step number circle
                                    ctx.beginPath();
                                    ctx.arc(120, stepY + i * 40, 14, 0, Math.PI * 2);
                                    ctx.fillStyle = stepColors[i % stepColors.length] + '44';
                                    ctx.fill();
                                    ctx.strokeStyle = stepColors[i % stepColors.length];
                                    ctx.lineWidth = 2;
                                    ctx.stroke();
                                    ctx.fillStyle = stepColors[i % stepColors.length];
                                    ctx.font = 'bold 14px -apple-system,sans-serif';
                                    ctx.textAlign = 'center';
                                    ctx.fillText(i + 1, 120, stepY + i * 40);

                                    // Step text
                                    ctx.textAlign = 'left';
                                    ctx.font = '16px -apple-system,sans-serif';
                                    ctx.fillText(p.steps[i], 145, stepY + i * 40);
                                } else {
                                    // Hidden step
                                    ctx.fillStyle = '#30363d';
                                    ctx.font = '16px -apple-system,sans-serif';
                                    ctx.textAlign = 'left';
                                    ctx.fillText('Step ' + (i + 1) + ': ???', 145, stepY + i * 40);

                                    ctx.beginPath();
                                    ctx.arc(120, stepY + i * 40, 14, 0, Math.PI * 2);
                                    ctx.fillStyle = '#30363d';
                                    ctx.fill();
                                    ctx.strokeStyle = '#4a4a7a';
                                    ctx.lineWidth = 1.5;
                                    ctx.stroke();
                                    ctx.fillStyle = '#4a4a7a';
                                    ctx.font = 'bold 14px -apple-system,sans-serif';
                                    ctx.textAlign = 'center';
                                    ctx.fillText(i + 1, 120, stepY + i * 40);
                                }
                            }

                            // Final answer
                            if (revealStep > p.steps.length) {
                                ctx.fillStyle = viz.colors.green;
                                ctx.font = 'bold 28px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.fillText('About ' + formatNum(p.answer) + ' ' + p.unit + '!', 350, stepY + p.steps.length * 40 + 30);
                            } else if (revealStep === p.steps.length) {
                                ctx.fillStyle = viz.colors.yellow;
                                ctx.font = '16px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.fillText('Click "Next Step" to see the answer!', 350, stepY + p.steps.length * 40 + 20);
                            } else {
                                ctx.fillStyle = viz.colors.text;
                                ctx.font = '14px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.fillText('Click "Next Step" to reveal each part of the estimate.', 350, stepY + p.steps.length * 40 + 20);
                            }
                        }

                        draw();
                    }
                },
                {
                    id: 'fibonacci-spiral',
                    title: 'Fibonacci Numbers & Nature',
                    description: 'See the Fibonacci sequence grow and watch it form a beautiful spiral!',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { width: 700, height: 400, scale: 1, originX: 0, originY: 0 });
                        var ctx = viz.ctx;
                        var numTerms = 8;

                        VizEngine.createSlider(controls, 'Fibonacci Terms', 3, 12, 8, 1, function(v) {
                            numTerms = Math.round(v);
                            draw();
                        });

                        function draw() {
                            viz.clear();

                            // Generate Fibonacci numbers
                            var fib = [1, 1];
                            for (var i = 2; i < numTerms; i++) {
                                fib.push(fib[i-1] + fib[i-2]);
                            }

                            // Title
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 18px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'middle';
                            ctx.fillText('The Fibonacci Sequence', 350, 22);

                            // Show sequence
                            ctx.fillStyle = viz.colors.teal;
                            ctx.font = '16px -apple-system,sans-serif';
                            var seqStr = fib.join(', ');
                            if (numTerms < 12) seqStr += ', ...';
                            ctx.fillText(seqStr, 350, 50);

                            // Rule explanation
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '13px -apple-system,sans-serif';
                            ctx.fillText('Each number = sum of the two before it', 350, 72);

                            // Draw Fibonacci squares spiral
                            var maxFib = fib[fib.length - 1];
                            var scale = Math.min(280, 280) / maxFib;
                            var cx = 350;
                            var cy = 230;
                            // directions: right, up, left, down
                            var dirs = [[1,0],[0,-1],[-1,0],[0,1]];
                            var startCornerX = cx - fib[fib.length - 1] * scale / 2;
                            var startCornerY = cy - fib[fib.length > 1 ? fib.length - 2 : 0] * scale / 2;

                            var sqColors = [viz.colors.blue, viz.colors.green, viz.colors.orange,
                                           viz.colors.purple, viz.colors.teal, viz.colors.pink,
                                           viz.colors.yellow, viz.colors.red, viz.colors.blue,
                                           viz.colors.green, viz.colors.orange, viz.colors.purple];

                            // Draw squares using a different approach - stack them
                            var curX = cx;
                            var curY = cy;

                            // We will place each square relative to the previous one
                            var squares = [];
                            var sx = 0, sy = 0;

                            for (var fi = 0; fi < fib.length; fi++) {
                                var size = fib[fi] * scale;
                                var dir = fi % 4;

                                if (fi === 0) {
                                    sx = cx - size / 2;
                                    sy = cy - size / 2;
                                } else if (dir === 0) { // right
                                    sx = squares[fi-1].x + squares[fi-1].s;
                                    sy = squares[fi-1].y + squares[fi-1].s - size;
                                } else if (dir === 1) { // up
                                    sx = squares[fi-1].x;
                                    sy = squares[fi-1].y - size;
                                } else if (dir === 2) { // left
                                    sx = squares[fi-1].x - size;
                                    sy = squares[fi-1].y;
                                } else { // down
                                    sx = squares[fi-1].x + squares[fi-1].s - size;
                                    sy = squares[fi-1].y + squares[fi-1].s;
                                }

                                squares.push({x: sx, y: sy, s: size});

                                ctx.fillStyle = sqColors[fi % sqColors.length] + '22';
                                ctx.fillRect(sx, sy, size, size);
                                ctx.strokeStyle = sqColors[fi % sqColors.length];
                                ctx.lineWidth = 2;
                                ctx.strokeRect(sx, sy, size, size);

                                // Label
                                if (size > 15) {
                                    ctx.fillStyle = sqColors[fi % sqColors.length];
                                    ctx.font = size > 30 ? 'bold 14px -apple-system,sans-serif' : '10px -apple-system,sans-serif';
                                    ctx.textAlign = 'center';
                                    ctx.textBaseline = 'middle';
                                    ctx.fillText(fib[fi], sx + size / 2, sy + size / 2);
                                }

                                // Draw quarter-circle arc (the spiral)
                                if (fi > 0) {
                                    ctx.strokeStyle = viz.colors.yellow;
                                    ctx.lineWidth = 2.5;
                                    ctx.beginPath();
                                    var arcCX, arcCY, startAngle, endAngle;

                                    if (dir === 0) {
                                        arcCX = sx; arcCY = sy + size;
                                        startAngle = -Math.PI / 2; endAngle = 0;
                                    } else if (dir === 1) {
                                        arcCX = sx; arcCY = sy;
                                        startAngle = 0; endAngle = Math.PI / 2;
                                    } else if (dir === 2) {
                                        arcCX = sx + size; arcCY = sy;
                                        startAngle = Math.PI / 2; endAngle = Math.PI;
                                    } else {
                                        arcCX = sx + size; arcCY = sy + size;
                                        startAngle = Math.PI; endAngle = 3 * Math.PI / 2;
                                    }

                                    ctx.arc(arcCX, arcCY, size, startAngle, endAngle);
                                    ctx.stroke();
                                }
                            }

                            // Nature examples at bottom
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '13px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('Fibonacci in nature: sunflower spirals (34/55), pinecone spirals (8/13), petal counts (3, 5, 8, 13...)', 350, 385);
                        }

                        draw();
                    }
                },
                {
                    id: 'celebration-fireworks',
                    title: 'Congratulations!',
                    description: 'You made it! Watch the celebration!',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { width: 700, height: 350, scale: 1, originX: 0, originY: 0 });
                        var ctx = viz.ctx;

                        var particles = [];
                        var time = 0;
                        var mathFacts = [
                            'You can count, add, subtract, multiply & divide!',
                            'You understand place value & big numbers!',
                            'You know patterns, estimation & mental math!',
                            'You solved puzzles & explored probability!',
                            'You are a Number Detective!'
                        ];
                        var factIdx = 0;
                        var factTimer = 0;

                        function spawnBurst(bx, by) {
                            var colors = [viz.colors.blue, viz.colors.orange, viz.colors.green,
                                         viz.colors.purple, viz.colors.teal, viz.colors.pink,
                                         viz.colors.yellow, viz.colors.red];
                            var bc = colors[Math.floor(Math.random() * colors.length)];
                            for (var i = 0; i < 20; i++) {
                                var angle = (i / 20) * Math.PI * 2 + Math.random() * 0.3;
                                var speed = 1.5 + Math.random() * 3;
                                particles.push({
                                    x: bx, y: by,
                                    vx: Math.cos(angle) * speed,
                                    vy: Math.sin(angle) * speed,
                                    life: 60 + Math.random() * 40,
                                    maxLife: 100,
                                    color: bc,
                                    size: 2 + Math.random() * 3
                                });
                            }
                        }

                        function draw(t) {
                            viz.clear();
                            time++;
                            factTimer++;

                            if (factTimer > 120) {
                                factTimer = 0;
                                factIdx = (factIdx + 1) % mathFacts.length;
                            }

                            // Spawn random fireworks
                            if (time % 30 === 0) {
                                spawnBurst(100 + Math.random() * 500, 60 + Math.random() * 150);
                            }

                            // Update & draw particles
                            for (var i = particles.length - 1; i >= 0; i--) {
                                var p = particles[i];
                                p.x += p.vx;
                                p.y += p.vy;
                                p.vy += 0.04; // gravity
                                p.life--;
                                if (p.life <= 0) {
                                    particles.splice(i, 1);
                                    continue;
                                }
                                var alpha = Math.max(0, p.life / p.maxLife);
                                ctx.globalAlpha = alpha;
                                ctx.fillStyle = p.color;
                                ctx.beginPath();
                                ctx.arc(p.x, p.y, p.size * alpha, 0, Math.PI * 2);
                                ctx.fill();
                            }
                            ctx.globalAlpha = 1;

                            // Big congratulations text
                            ctx.fillStyle = viz.colors.yellow;
                            ctx.font = 'bold 32px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'middle';
                            ctx.fillText('Congratulations, Mathematician!', 350, 200);

                            // Rotating math fact
                            var fadeIn = Math.min(1, factTimer / 30);
                            ctx.globalAlpha = fadeIn;
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = '18px -apple-system,sans-serif';
                            ctx.fillText(mathFacts[factIdx], 350, 250);
                            ctx.globalAlpha = 1;

                            // Stars decoration
                            ctx.fillStyle = viz.colors.teal;
                            ctx.font = '14px -apple-system,sans-serif';
                            ctx.fillText('Your math adventure is just beginning!', 350, 310);
                        }

                        viz.animate(draw);
                    }
                }
            ],
            exercises: [
                {
                    question: 'Fermi Problem: About how many hours of your life have you spent sleeping? (Assume you are 10 years old and sleep about 10 hours per night.)',
                    hint: 'Calculate: 10 hours/night times 365 nights/year times 10 years.',
                    solution: '\\(10 \\times 365 \\times 10 = 36{,}500\\) hours. That is about <strong>36,500 hours</strong> or roughly 1,520 days — over 4 years of sleeping! (Of course, you slept more per night when you were a baby, so the real number might be even higher.)'
                },
                {
                    question: 'What is the 10th Fibonacci number? The sequence starts \\(1, 1, 2, 3, 5, \\ldots\\)',
                    hint: 'Keep adding: 1, 1, 2, 3, 5, 8, ... Each number is the sum of the previous two.',
                    solution: 'The sequence: \\(1, 1, 2, 3, 5, 8, 13, 21, 34, 55\\). The 10th Fibonacci number is \\(55\\).'
                },
                {
                    question: 'Look around your room. Find an example of symmetry and an example of a pattern. Describe what you found and what kind of math is hiding in it!',
                    hint: 'Symmetry means one side mirrors the other. A pattern is anything that repeats in a regular way — stripes, tiles, spirals...',
                    solution: 'Answers will vary! Examples of symmetry: a book cover, a window frame, your own face. Examples of patterns: floor tiles (repeating shapes), a bookshelf (evenly spaced shelves), curtain fabric (repeating design). Math is hiding everywhere once you start looking!'
                }
            ]
        }
    ]
});
