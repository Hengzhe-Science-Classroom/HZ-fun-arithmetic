// === Chapter 9: Number Games & Challenges - Extra Visualizations ===
// Colorful, interactive math games and puzzles for ages 7-12.
window.EXTRA_VIZ = window.EXTRA_VIZ || {};
window.EXTRA_VIZ['ch09'] = window.EXTRA_VIZ['ch09'] || {};

// ============================================================
// Visualization 1 -- sec01: "Magic Squares"
// Interactive 3x3 magic square builder.
// ============================================================
window.EXTRA_VIZ['ch09']['ch09-sec01'] = window.EXTRA_VIZ['ch09']['ch09-sec01'] || [];
window.EXTRA_VIZ['ch09']['ch09-sec01'].push({
    id: 'ch09-extra-viz-1',
    title: 'Magic Square Builder',
    description: 'Place the numbers 1-9 in the grid so every row, column, and diagonal adds up to 15! Click a number button, then click a cell to place it.',
    setup: function(container, controls) {
        var viz = new VizEngine(container, { width: 560, height: 440, scale: 40, originX: 280, originY: 220 });
        var ctx = viz.ctx;

        // The grid: 0 means empty
        var grid = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        var selectedNum = 0; // which number button is selected (1-9, 0 = none)
        var solved = false;
        var celebration = 0; // animation timer for celebration

        // Classic magic square solution
        var solution = [2, 7, 6, 9, 5, 1, 4, 3, 8];

        // Grid layout constants (pixel coords)
        var gridLeft = 155;
        var gridTop = 55;
        var cellSize = 72;
        var gridSize = cellSize * 3;

        // Number button bar
        var btnBarY = 310;
        var btnBarLeft = 60;
        var btnSize = 40;
        var btnGap = 10;

        // Color palette for number buttons
        var numColors = [
            '', // 0 placeholder
            '#f85149', '#f0883e', '#d29922', '#3fb950', '#3fb9a0',
            '#58a6ff', '#bc8cff', '#f778ba', '#c9d1d9'
        ];

        // Build control buttons
        var showSolBtn = VizEngine.createButton(controls, 'Show Solution', function() {
            grid = solution.slice();
            selectedNum = 0;
            solved = false;
            celebration = 0;
            checkSolved();
        });

        var checkBtn = VizEngine.createButton(controls, 'Check', function() {
            checkSolved();
        });

        var clearBtn = VizEngine.createButton(controls, 'Clear All', function() {
            grid = [0, 0, 0, 0, 0, 0, 0, 0, 0];
            selectedNum = 0;
            solved = false;
            celebration = 0;
        });

        // Click handler on canvas
        viz.canvas.addEventListener('click', function(e) {
            var rect = viz.canvas.getBoundingClientRect();
            var mx = e.clientX - rect.left;
            var my = e.clientY - rect.top;

            // Check number button clicks
            for (var n = 1; n <= 9; n++) {
                var bx = btnBarLeft + (n - 1) * (btnSize + btnGap);
                var by = btnBarY;
                if (mx >= bx && mx <= bx + btnSize && my >= by && my <= by + btnSize) {
                    // If number already placed, ignore
                    if (grid.indexOf(n) === -1) {
                        selectedNum = (selectedNum === n) ? 0 : n;
                    }
                    return;
                }
            }

            // Check grid cell clicks
            for (var r = 0; r < 3; r++) {
                for (var c = 0; c < 3; c++) {
                    var cx = gridLeft + c * cellSize;
                    var cy = gridTop + r * cellSize;
                    if (mx >= cx && mx <= cx + cellSize && my >= cy && my <= cy + cellSize) {
                        var idx = r * 3 + c;
                        if (selectedNum > 0 && grid[idx] === 0) {
                            // Place the number
                            grid[idx] = selectedNum;
                            selectedNum = 0;
                            solved = false;
                            celebration = 0;
                        } else if (grid[idx] > 0 && selectedNum === 0) {
                            // Remove number from cell (click to remove)
                            grid[idx] = 0;
                            solved = false;
                            celebration = 0;
                        }
                        return;
                    }
                }
            }
        });

        // Touch support
        viz.canvas.addEventListener('touchstart', function(e) {
            e.preventDefault();
            var rect = viz.canvas.getBoundingClientRect();
            var mx = e.touches[0].clientX - rect.left;
            var my = e.touches[0].clientY - rect.top;

            for (var n = 1; n <= 9; n++) {
                var bx = btnBarLeft + (n - 1) * (btnSize + btnGap);
                var by = btnBarY;
                if (mx >= bx && mx <= bx + btnSize && my >= by && my <= by + btnSize) {
                    if (grid.indexOf(n) === -1) {
                        selectedNum = (selectedNum === n) ? 0 : n;
                    }
                    return;
                }
            }

            for (var r = 0; r < 3; r++) {
                for (var c = 0; c < 3; c++) {
                    var cx = gridLeft + c * cellSize;
                    var cy = gridTop + r * cellSize;
                    if (mx >= cx && mx <= cx + cellSize && my >= cy && my <= cy + cellSize) {
                        var idx = r * 3 + c;
                        if (selectedNum > 0 && grid[idx] === 0) {
                            grid[idx] = selectedNum;
                            selectedNum = 0;
                            solved = false;
                            celebration = 0;
                        } else if (grid[idx] > 0 && selectedNum === 0) {
                            grid[idx] = 0;
                            solved = false;
                            celebration = 0;
                        }
                        return;
                    }
                }
            }
        }, { passive: false });

        function getSum(indices) {
            var s = 0;
            var allFilled = true;
            for (var i = 0; i < indices.length; i++) {
                if (grid[indices[i]] === 0) allFilled = false;
                s += grid[indices[i]];
            }
            return { sum: s, complete: allFilled };
        }

        // All lines: rows, columns, diagonals
        var lines = [
            { indices: [0, 1, 2], label: 'Row 1' },
            { indices: [3, 4, 5], label: 'Row 2' },
            { indices: [6, 7, 8], label: 'Row 3' },
            { indices: [0, 3, 6], label: 'Col 1' },
            { indices: [1, 4, 7], label: 'Col 2' },
            { indices: [2, 5, 8], label: 'Col 3' },
            { indices: [0, 4, 8], label: 'Diag \\' },
            { indices: [2, 4, 6], label: 'Diag /' }
        ];

        function checkSolved() {
            // Check if all cells filled and all sums = 15
            for (var i = 0; i < 9; i++) {
                if (grid[i] === 0) { solved = false; return; }
            }
            for (var l = 0; l < lines.length; l++) {
                var info = getSum(lines[l].indices);
                if (info.sum !== 15) { solved = false; return; }
            }
            solved = true;
            celebration = Date.now();
        }

        function draw() {
            viz.clear();

            // Title
            ctx.fillStyle = viz.colors.white;
            ctx.font = 'bold 22px -apple-system, sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'top';
            ctx.fillText('Magic Square', viz.width / 2, 10);

            ctx.fillStyle = viz.colors.teal;
            ctx.font = '13px -apple-system, sans-serif';
            ctx.fillText('Every row, column & diagonal must equal 15', viz.width / 2, 36);

            // Draw the 3x3 grid
            for (var r = 0; r < 3; r++) {
                for (var c = 0; c < 3; c++) {
                    var x = gridLeft + c * cellSize;
                    var y = gridTop + r * cellSize;
                    var idx = r * 3 + c;
                    var val = grid[idx];

                    // Cell background
                    ctx.fillStyle = val > 0 ? '#1a2a3a' : '#111128';
                    ctx.fillRect(x, y, cellSize, cellSize);

                    // Cell border
                    ctx.strokeStyle = '#4a4a7a';
                    ctx.lineWidth = 2;
                    ctx.strokeRect(x, y, cellSize, cellSize);

                    // Number in cell
                    if (val > 0) {
                        ctx.fillStyle = numColors[val];
                        ctx.font = 'bold 32px -apple-system, sans-serif';
                        ctx.textAlign = 'center';
                        ctx.textBaseline = 'middle';
                        ctx.fillText(val, x + cellSize / 2, y + cellSize / 2);
                    }
                }
            }

            // Draw line sums along the edges
            // Row sums on the right
            for (var rr = 0; rr < 3; rr++) {
                var rowInfo = getSum([rr * 3, rr * 3 + 1, rr * 3 + 2]);
                var sumX = gridLeft + gridSize + 12;
                var sumY = gridTop + rr * cellSize + cellSize / 2;
                if (rowInfo.complete) {
                    ctx.fillStyle = rowInfo.sum === 15 ? viz.colors.green : viz.colors.red;
                    ctx.font = 'bold 18px -apple-system, sans-serif';
                } else {
                    ctx.fillStyle = '#4a4a7a';
                    ctx.font = '16px -apple-system, sans-serif';
                }
                ctx.textAlign = 'left';
                ctx.textBaseline = 'middle';
                ctx.fillText('= ' + rowInfo.sum, sumX, sumY);
            }

            // Column sums at the bottom
            for (var cc = 0; cc < 3; cc++) {
                var colInfo = getSum([cc, cc + 3, cc + 6]);
                var cSumX = gridLeft + cc * cellSize + cellSize / 2;
                var cSumY = gridTop + gridSize + 16;
                if (colInfo.complete) {
                    ctx.fillStyle = colInfo.sum === 15 ? viz.colors.green : viz.colors.red;
                    ctx.font = 'bold 16px -apple-system, sans-serif';
                } else {
                    ctx.fillStyle = '#4a4a7a';
                    ctx.font = '14px -apple-system, sans-serif';
                }
                ctx.textAlign = 'center';
                ctx.textBaseline = 'top';
                ctx.fillText('=' + colInfo.sum, cSumX, cSumY);
            }

            // Diagonal sums
            // Top-left to bottom-right
            var diagInfo1 = getSum([0, 4, 8]);
            ctx.textAlign = 'right';
            ctx.textBaseline = 'bottom';
            if (diagInfo1.complete) {
                ctx.fillStyle = diagInfo1.sum === 15 ? viz.colors.green : viz.colors.red;
                ctx.font = 'bold 14px -apple-system, sans-serif';
            } else {
                ctx.fillStyle = '#4a4a7a';
                ctx.font = '13px -apple-system, sans-serif';
            }
            ctx.fillText('\\=' + diagInfo1.sum, gridLeft - 6, gridTop - 2);

            // Top-right to bottom-left
            var diagInfo2 = getSum([2, 4, 6]);
            ctx.textAlign = 'left';
            ctx.textBaseline = 'bottom';
            if (diagInfo2.complete) {
                ctx.fillStyle = diagInfo2.sum === 15 ? viz.colors.green : viz.colors.red;
                ctx.font = 'bold 14px -apple-system, sans-serif';
            } else {
                ctx.fillStyle = '#4a4a7a';
                ctx.font = '13px -apple-system, sans-serif';
            }
            ctx.fillText('/=' + diagInfo2.sum, gridLeft + gridSize + 6, gridTop - 2);

            // Highlight lines that sum to 15 with a green glow or red for wrong
            for (var li = 0; li < lines.length; li++) {
                var lineInfo = getSum(lines[li].indices);
                if (lineInfo.complete) {
                    var ids = lines[li].indices;
                    var r0 = Math.floor(ids[0] / 3), c0 = ids[0] % 3;
                    var r2 = Math.floor(ids[2] / 3), c2 = ids[2] % 3;
                    var x0 = gridLeft + c0 * cellSize + cellSize / 2;
                    var y0 = gridTop + r0 * cellSize + cellSize / 2;
                    var x2 = gridLeft + c2 * cellSize + cellSize / 2;
                    var y2 = gridTop + r2 * cellSize + cellSize / 2;

                    ctx.strokeStyle = lineInfo.sum === 15 ? (viz.colors.green + '66') : (viz.colors.red + '44');
                    ctx.lineWidth = 4;
                    ctx.beginPath();
                    ctx.moveTo(x0, y0);
                    ctx.lineTo(x2, y2);
                    ctx.stroke();
                }
            }

            // Number buttons bar
            ctx.fillStyle = viz.colors.white;
            ctx.font = 'bold 14px -apple-system, sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'bottom';
            ctx.fillText('Pick a number, then click a cell:', viz.width / 2, btnBarY - 8);

            for (var n = 1; n <= 9; n++) {
                var bx = btnBarLeft + (n - 1) * (btnSize + btnGap);
                var by = btnBarY;
                var isPlaced = grid.indexOf(n) !== -1;
                var isSelected = selectedNum === n;

                // Button background
                if (isSelected) {
                    ctx.fillStyle = numColors[n] + '44';
                    ctx.fillRect(bx - 2, by - 2, btnSize + 4, btnSize + 4);
                    ctx.strokeStyle = numColors[n];
                    ctx.lineWidth = 3;
                    ctx.strokeRect(bx - 2, by - 2, btnSize + 4, btnSize + 4);
                }

                ctx.fillStyle = isPlaced ? '#1a1a2a' : '#1a2a3a';
                ctx.fillRect(bx, by, btnSize, btnSize);
                ctx.strokeStyle = isPlaced ? '#2a2a3a' : numColors[n];
                ctx.lineWidth = isPlaced ? 1 : 2;
                ctx.strokeRect(bx, by, btnSize, btnSize);

                // Number text
                ctx.fillStyle = isPlaced ? '#3a3a4a' : numColors[n];
                ctx.font = isPlaced ? '18px -apple-system, sans-serif' : 'bold 22px -apple-system, sans-serif';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(n, bx + btnSize / 2, by + btnSize / 2);

                if (isPlaced) {
                    // Strike-through
                    ctx.strokeStyle = '#3a3a4a';
                    ctx.lineWidth = 2;
                    ctx.beginPath();
                    ctx.moveTo(bx + 4, by + btnSize - 4);
                    ctx.lineTo(bx + btnSize - 4, by + 4);
                    ctx.stroke();
                }
            }

            // Hint text
            ctx.fillStyle = '#4a4a7a';
            ctx.font = '12px -apple-system, sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'top';
            ctx.fillText('Tip: Click a placed number in the grid to remove it', viz.width / 2, btnBarY + btnSize + 10);

            // Celebration when solved
            if (solved && celebration > 0) {
                var t = Date.now() * 0.004;
                ctx.fillStyle = viz.colors.green;
                ctx.font = 'bold 24px -apple-system, sans-serif';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'top';
                var wobble = Math.sin(t * 3) * 3;
                ctx.fillText('MAGIC! All lines equal 15!', viz.width / 2, 395 + wobble);

                var sparkColors = [viz.colors.yellow, viz.colors.pink, viz.colors.teal, viz.colors.orange, viz.colors.blue, viz.colors.purple];
                for (var sp = 0; sp < 10; sp++) {
                    var angle = (sp / 10) * Math.PI * 2 + t;
                    var dist = 80 + Math.sin(t * 2 + sp) * 20;
                    var spx = viz.width / 2 + Math.cos(angle) * dist;
                    var spy = 220 + Math.sin(angle) * dist * 0.5;
                    ctx.fillStyle = sparkColors[sp % sparkColors.length];
                    ctx.beginPath();
                    ctx.arc(spx, spy, 4, 0, Math.PI * 2);
                    ctx.fill();
                }
            }
        }

        viz.animate(function() {
            draw();
        });

        return viz;
    }
});

// ============================================================
// Visualization 2 -- sec02: "Number Puzzles"
// Guess My Number game with number line feedback.
// ============================================================
window.EXTRA_VIZ['ch09']['ch09-sec02'] = window.EXTRA_VIZ['ch09']['ch09-sec02'] || [];
window.EXTRA_VIZ['ch09']['ch09-sec02'].push({
    id: 'ch09-extra-viz-2',
    title: 'Guess My Number!',
    description: 'I am thinking of a number between 1 and 100. Use the slider to guess, then click "Guess!" to see if you are right. Watch the number line narrow down!',
    setup: function(container, controls) {
        var viz = new VizEngine(container, { width: 560, height: 440, scale: 40, originX: 280, originY: 220 });
        var ctx = viz.ctx;

        var secretNumber = Math.floor(Math.random() * 100) + 1;
        var currentGuess = 50;
        var guesses = []; // { value, result: 'low'|'high'|'correct' }
        var rangeLow = 1;
        var rangeHigh = 100;
        var won = false;
        var winTime = 0;
        var feedbackText = 'Make your first guess!';
        var feedbackColor = viz.colors.white;
        var arrowAnim = 0;

        var guessSlider = VizEngine.createSlider(controls, 'Your guess:', 1, 100, 50, 1, function(val) {
            currentGuess = Math.round(val);
        });
        guessSlider.step = 1;

        var guessBtn = VizEngine.createButton(controls, 'Guess!', function() {
            if (won) return;

            var result;
            if (currentGuess === secretNumber) {
                result = 'correct';
                won = true;
                winTime = Date.now();
                feedbackText = 'YOU GOT IT! The number was ' + secretNumber + '!';
                feedbackColor = viz.colors.green;
            } else if (currentGuess < secretNumber) {
                result = 'low';
                if (currentGuess >= rangeLow) rangeLow = currentGuess + 1;
                feedbackText = currentGuess + ' is TOO LOW! Go higher!';
                feedbackColor = viz.colors.blue;
            } else {
                result = 'high';
                if (currentGuess <= rangeHigh) rangeHigh = currentGuess - 1;
                feedbackText = currentGuess + ' is TOO HIGH! Go lower!';
                feedbackColor = viz.colors.red;
            }

            guesses.push({ value: currentGuess, result: result });
            arrowAnim = Date.now();
        });

        var newGameBtn = VizEngine.createButton(controls, 'New Game', function() {
            secretNumber = Math.floor(Math.random() * 100) + 1;
            currentGuess = 50;
            guesses = [];
            rangeLow = 1;
            rangeHigh = 100;
            won = false;
            winTime = 0;
            feedbackText = 'Make your first guess!';
            feedbackColor = viz.colors.white;
            arrowAnim = 0;
            guessSlider.value = 50;
            var valEl = guessSlider.parentNode.querySelector('.viz-slider-value');
            if (valEl) valEl.textContent = '50.0';
        });

        // Number line layout
        var nlLeft = 40;
        var nlRight = 520;
        var nlY = 200;
        var nlWidth = nlRight - nlLeft;

        function numToX(n) {
            return nlLeft + ((n - 1) / 99) * nlWidth;
        }

        function draw() {
            viz.clear();

            // Title
            ctx.fillStyle = viz.colors.white;
            ctx.font = 'bold 22px -apple-system, sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'top';
            ctx.fillText('Guess My Number!', viz.width / 2, 10);

            // Guess counter
            ctx.fillStyle = viz.colors.yellow;
            ctx.font = 'bold 16px -apple-system, sans-serif';
            ctx.textAlign = 'right';
            ctx.fillText('Guesses: ' + guesses.length, viz.width - 30, 16);

            // Feedback text
            ctx.fillStyle = feedbackColor;
            ctx.font = 'bold 20px -apple-system, sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'top';
            ctx.fillText(feedbackText, viz.width / 2, 45);

            // The number line
            // Background range (full)
            ctx.fillStyle = '#1a1a3a';
            ctx.fillRect(nlLeft, nlY - 8, nlWidth, 16);

            // Active range highlight
            var activeLeft = numToX(rangeLow);
            var activeRight = numToX(rangeHigh);
            ctx.fillStyle = viz.colors.teal + '44';
            ctx.fillRect(activeLeft, nlY - 10, activeRight - activeLeft, 20);
            ctx.strokeStyle = viz.colors.teal;
            ctx.lineWidth = 2;
            ctx.strokeRect(activeLeft, nlY - 10, activeRight - activeLeft, 20);

            // Number line border
            ctx.strokeStyle = '#4a4a7a';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(nlLeft, nlY);
            ctx.lineTo(nlRight, nlY);
            ctx.stroke();

            // Tick marks every 10
            ctx.fillStyle = viz.colors.text;
            ctx.font = '11px -apple-system, sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'top';
            for (var t = 0; t <= 100; t += 10) {
                var tx = numToX(t === 0 ? 1 : t);
                ctx.strokeStyle = '#4a4a7a';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(tx, nlY - 12);
                ctx.lineTo(tx, nlY + 12);
                ctx.stroke();
                ctx.fillText(t === 0 ? 1 : t, tx, nlY + 16);
            }

            // Range labels
            ctx.fillStyle = viz.colors.teal;
            ctx.font = 'bold 14px -apple-system, sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'bottom';
            ctx.fillText(rangeLow, activeLeft, nlY - 16);
            ctx.fillText(rangeHigh, activeRight, nlY - 16);

            // Range text
            ctx.fillStyle = viz.colors.teal;
            ctx.font = '13px -apple-system, sans-serif';
            ctx.fillText('Possible range: ' + rangeLow + ' - ' + rangeHigh, (activeLeft + activeRight) / 2, nlY - 30);

            // Draw previous guesses as markers on the number line
            var now = Date.now();
            for (var i = 0; i < guesses.length; i++) {
                var g = guesses[i];
                var gx = numToX(g.value);
                var isLatest = (i === guesses.length - 1);
                var animAge = now - arrowAnim;
                var bounce = 0;
                if (isLatest && animAge < 800) {
                    bounce = Math.sin((animAge / 800) * Math.PI) * 15;
                }

                if (g.result === 'low') {
                    // Blue arrow pointing up
                    var arrowY = nlY + 40 - bounce;
                    ctx.fillStyle = viz.colors.blue;
                    ctx.beginPath();
                    ctx.moveTo(gx, arrowY - 18);
                    ctx.lineTo(gx - 8, arrowY - 4);
                    ctx.lineTo(gx + 8, arrowY - 4);
                    ctx.closePath();
                    ctx.fill();
                    ctx.fillRect(gx - 3, arrowY - 4, 6, 14);

                    // Label
                    ctx.fillStyle = viz.colors.blue;
                    ctx.font = isLatest ? 'bold 13px -apple-system, sans-serif' : '11px -apple-system, sans-serif';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'top';
                    ctx.fillText(g.value, gx, arrowY + 12);
                } else if (g.result === 'high') {
                    // Red arrow pointing down
                    var arrowYd = nlY - 40 + bounce;
                    ctx.fillStyle = viz.colors.red;
                    ctx.beginPath();
                    ctx.moveTo(gx, arrowYd + 18);
                    ctx.lineTo(gx - 8, arrowYd + 4);
                    ctx.lineTo(gx + 8, arrowYd + 4);
                    ctx.closePath();
                    ctx.fill();
                    ctx.fillRect(gx - 3, arrowYd - 10, 6, 14);

                    // Label
                    ctx.fillStyle = viz.colors.red;
                    ctx.font = isLatest ? 'bold 13px -apple-system, sans-serif' : '11px -apple-system, sans-serif';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'bottom';
                    ctx.fillText(g.value, gx, arrowYd - 12);
                } else if (g.result === 'correct') {
                    // Green star / big marker
                    ctx.fillStyle = viz.colors.green;
                    ctx.beginPath();
                    ctx.arc(gx, nlY, 10, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.fillStyle = viz.colors.white;
                    ctx.font = 'bold 12px -apple-system, sans-serif';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.fillText(g.value, gx, nlY);
                }
            }

            // Current guess indicator (if not won)
            if (!won) {
                var cgx = numToX(currentGuess);
                ctx.strokeStyle = viz.colors.yellow;
                ctx.lineWidth = 2;
                ctx.setLineDash([4, 4]);
                ctx.beginPath();
                ctx.moveTo(cgx, nlY - 35);
                ctx.lineTo(cgx, nlY + 35);
                ctx.stroke();
                ctx.setLineDash([]);

                ctx.fillStyle = viz.colors.yellow;
                ctx.font = 'bold 14px -apple-system, sans-serif';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'bottom';
                ctx.fillText(currentGuess, cgx, nlY - 38);
            }

            // Guess history list
            var histY = 270;
            ctx.fillStyle = viz.colors.white;
            ctx.font = 'bold 14px -apple-system, sans-serif';
            ctx.textAlign = 'left';
            ctx.textBaseline = 'top';
            ctx.fillText('Guess History:', 30, histY);

            var histX = 30;
            var histItemW = 50;
            var showCount = Math.min(guesses.length, 9);
            var startIdx = Math.max(0, guesses.length - showCount);
            for (var h = startIdx; h < guesses.length; h++) {
                var hg = guesses[h];
                var hx = histX + (h - startIdx) * histItemW;
                ctx.fillStyle = hg.result === 'low' ? viz.colors.blue :
                               hg.result === 'high' ? viz.colors.red : viz.colors.green;
                ctx.font = '13px -apple-system, sans-serif';
                ctx.textAlign = 'center';
                ctx.fillText(hg.value, hx + histItemW / 2, histY + 20);
                ctx.font = '10px -apple-system, sans-serif';
                ctx.fillText(hg.result === 'low' ? 'Low' : hg.result === 'high' ? 'High' : 'YES!', hx + histItemW / 2, histY + 36);
            }

            if (guesses.length > 9) {
                ctx.fillStyle = viz.colors.text;
                ctx.font = '11px -apple-system, sans-serif';
                ctx.textAlign = 'left';
                ctx.fillText('(' + (guesses.length - 9) + ' more...)', histX + showCount * histItemW, histY + 26);
            }

            // Tip text
            if (!won) {
                ctx.fillStyle = '#4a4a7a';
                ctx.font = '12px -apple-system, sans-serif';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'top';
                ctx.fillText('Strategy: Try to guess the middle of the range each time!', viz.width / 2, 85);
            }

            // Celebration when won
            if (won) {
                var wt = Date.now() * 0.003;
                var sparkColors = [viz.colors.yellow, viz.colors.pink, viz.colors.teal, viz.colors.orange, viz.colors.blue, viz.colors.green, viz.colors.purple, viz.colors.red];
                for (var sp = 0; sp < 14; sp++) {
                    var sAngle = (sp / 14) * Math.PI * 2 + wt;
                    var sDist = 50 + Math.sin(wt * 2 + sp) * 20;
                    var spx = viz.width / 2 + Math.cos(sAngle) * sDist * 2;
                    var spy = 55 + Math.sin(sAngle) * sDist * 0.5;
                    ctx.fillStyle = sparkColors[sp % sparkColors.length];
                    ctx.beginPath();
                    ctx.arc(spx, spy, 4, 0, Math.PI * 2);
                    ctx.fill();
                }

                // Show rating
                var rating = '';
                if (guesses.length <= 3) rating = 'AMAZING! Genius!';
                else if (guesses.length <= 5) rating = 'GREAT job!';
                else if (guesses.length <= 7) rating = 'Well done!';
                else if (guesses.length <= 10) rating = 'Nice work!';
                else rating = 'Keep practicing!';

                ctx.fillStyle = viz.colors.yellow;
                ctx.font = 'bold 16px -apple-system, sans-serif';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'top';
                ctx.fillText('Found it in ' + guesses.length + ' guesses! ' + rating, viz.width / 2, 85);
            }
        }

        viz.animate(function() {
            draw();
        });

        return viz;
    }
});

// ============================================================
// Visualization 3 -- sec03: "Mental Math Tricks"
// Multiply by 9 with Fingers visualizer.
// ============================================================
window.EXTRA_VIZ['ch09']['ch09-sec03'] = window.EXTRA_VIZ['ch09']['ch09-sec03'] || [];
window.EXTRA_VIZ['ch09']['ch09-sec03'].push({
    id: 'ch09-extra-viz-3',
    title: 'Multiply by 9 with Your Fingers!',
    description: 'Hold up 10 fingers. To multiply 9 by any number (1-10), fold down that finger. Count fingers on the left (tens) and right (ones) to get the answer!',
    setup: function(container, controls) {
        var viz = new VizEngine(container, { width: 560, height: 440, scale: 40, originX: 280, originY: 220 });
        var ctx = viz.ctx;

        var multiplyBy = 3;
        var foldProgress = 1; // 0 = finger up, 1 = finger folded
        var animId = null;

        var slider = VizEngine.createSlider(controls, '9 \u00D7', 1, 10, multiplyBy, 1, function(val) {
            multiplyBy = Math.round(val);
            foldProgress = 0;
            startFoldAnimation();
        });
        slider.step = 1;

        function startFoldAnimation() {
            foldProgress = 0;
            if (animId) cancelAnimationFrame(animId);
            function runAnim() {
                foldProgress += 0.03;
                if (foldProgress >= 1) {
                    foldProgress = 1;
                    return;
                }
                animId = requestAnimationFrame(runAnim);
            }
            animId = requestAnimationFrame(runAnim);
        }

        // Finger positions for two hands (left hand fingers 1-5, right hand fingers 6-10)
        // Finger 1 = left pinky, ..., 5 = left thumb, 6 = right thumb, ..., 10 = right pinky
        function getFingerPositions() {
            var handY = 200; // base of hands
            var leftHandX = 130;
            var rightHandX = 430;
            var fingerSpacing = 38;

            // Left hand: pinky(1), ring(2), middle(3), index(4), thumb(5)
            // Heights vary for natural look
            var heights = [95, 110, 120, 110, 80]; // finger lengths
            var leftFingers = [];
            for (var i = 0; i < 5; i++) {
                leftFingers.push({
                    x: leftHandX - 80 + i * fingerSpacing,
                    baseY: handY - 10,
                    tipY: handY - heights[i],
                    width: i === 4 ? 18 : 16, // thumb is wider
                    height: heights[i],
                    number: i + 1
                });
            }

            // Right hand: thumb(6), index(7), middle(8), ring(9), pinky(10)
            var rHeights = [80, 110, 120, 110, 95];
            var rightFingers = [];
            for (var j = 0; j < 5; j++) {
                rightFingers.push({
                    x: rightHandX - 80 + j * fingerSpacing,
                    baseY: handY - 10,
                    tipY: handY - rHeights[j],
                    width: j === 0 ? 18 : 16,
                    height: rHeights[j],
                    number: j + 6
                });
            }

            return leftFingers.concat(rightFingers);
        }

        function drawFinger(finger, isFolded, foldAmt) {
            var x = finger.x;
            var baseY = finger.baseY;
            var tipY = finger.tipY;
            var w = finger.width;
            var h = finger.height;

            // Ease fold amount
            var ease = foldAmt < 0.5 ? 2 * foldAmt * foldAmt : 1 - Math.pow(-2 * foldAmt + 2, 2) / 2;

            if (isFolded) {
                // Folded finger: shorter, curled down
                var foldedTipY = baseY - h * 0.25 * (1 - ease) + baseY * ease * 0.02;
                var actualTipY = tipY + (foldedTipY - tipY) * ease;

                // Finger shadow/background
                ctx.fillStyle = '#b07040';
                var rr = w / 2;

                // Draw rounded finger shape
                ctx.beginPath();
                ctx.moveTo(x - w / 2, baseY);
                ctx.lineTo(x - w / 2, actualTipY + rr);
                ctx.quadraticCurveTo(x - w / 2, actualTipY, x, actualTipY);
                ctx.quadraticCurveTo(x + w / 2, actualTipY, x + w / 2, actualTipY + rr);
                ctx.lineTo(x + w / 2, baseY);
                ctx.closePath();
                ctx.fillStyle = '#886644';
                ctx.fill();

                // Darker color for folded
                ctx.fillStyle = '#665533' + Math.round(ease * 180 + 75).toString(16).padStart(2, '0');
                ctx.fill();

                // Nail (small)
                if (ease < 0.5) {
                    ctx.fillStyle = '#ffccaa44';
                    ctx.beginPath();
                    ctx.ellipse(x, actualTipY + 6, w * 0.3, 4, 0, 0, Math.PI * 2);
                    ctx.fill();
                }
            } else {
                // Upright finger
                var rr2 = w / 2;

                ctx.beginPath();
                ctx.moveTo(x - w / 2, baseY);
                ctx.lineTo(x - w / 2, tipY + rr2);
                ctx.quadraticCurveTo(x - w / 2, tipY, x, tipY);
                ctx.quadraticCurveTo(x + w / 2, tipY, x + w / 2, tipY + rr2);
                ctx.lineTo(x + w / 2, baseY);
                ctx.closePath();

                // Skin color
                ctx.fillStyle = '#e8b88a';
                ctx.fill();

                // Highlight
                ctx.fillStyle = '#f5d5b8';
                ctx.beginPath();
                ctx.ellipse(x - 2, tipY + h * 0.3, w * 0.15, h * 0.25, 0, 0, Math.PI * 2);
                ctx.fill();

                // Nail
                ctx.fillStyle = '#ffddcc';
                ctx.beginPath();
                ctx.ellipse(x, tipY + 6, w * 0.3, 5, 0, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        function draw() {
            viz.clear();

            // Title
            ctx.fillStyle = viz.colors.white;
            ctx.font = 'bold 22px -apple-system, sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'top';
            ctx.fillText('The 9s Finger Trick', viz.width / 2, 10);

            // Instruction
            ctx.fillStyle = viz.colors.teal;
            ctx.font = '14px -apple-system, sans-serif';
            ctx.fillText('Fold down finger #' + multiplyBy + ' to find 9 \u00D7 ' + multiplyBy, viz.width / 2, 38);

            var fingers = getFingerPositions();
            var foldIndex = multiplyBy - 1; // 0-indexed

            // Draw palms (behind fingers)
            // Left palm
            ctx.fillStyle = '#dda876';
            ctx.beginPath();
            ctx.ellipse(130, 230, 80, 55, 0, 0, Math.PI);
            ctx.fill();
            ctx.fillRect(50, 190, 160, 40);

            // Right palm
            ctx.beginPath();
            ctx.ellipse(430, 230, 80, 55, 0, 0, Math.PI);
            ctx.fill();
            ctx.fillRect(350, 190, 160, 40);

            // Draw fingers (back to front, folded one last for overlap)
            for (var i = 0; i < fingers.length; i++) {
                if (i === foldIndex) continue;
                drawFinger(fingers[i], false, 0);
            }
            // Draw folded finger
            drawFinger(fingers[foldIndex], true, foldProgress);

            // Draw finger numbers
            ctx.font = 'bold 13px -apple-system, sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'bottom';
            for (var j = 0; j < fingers.length; j++) {
                var f = fingers[j];
                var isFolded = (j === foldIndex);
                ctx.fillStyle = isFolded ? viz.colors.red : viz.colors.white;
                var labelY = isFolded ? f.baseY + 14 : f.tipY - 8;
                ctx.fillText(f.number, f.x, labelY);
            }

            // Count fingers on left and right of the folded one
            var leftCount = foldIndex; // fingers before the folded one
            var rightCount = 9 - foldIndex; // fingers after the folded one
            var answer = leftCount * 10 + rightCount;

            // Animate fade-in for answer
            var showAlpha = Math.min(1, foldProgress);

            // Left count label
            if (showAlpha > 0.3) {
                ctx.globalAlpha = showAlpha;

                // Draw bracket for left group
                var leftGroupStart = fingers[0].x;
                var leftGroupEnd = foldIndex > 0 ? fingers[foldIndex - 1].x : fingers[0].x;
                if (leftCount > 0) {
                    ctx.strokeStyle = viz.colors.blue;
                    ctx.lineWidth = 3;
                    ctx.beginPath();
                    ctx.moveTo(leftGroupStart - 10, 260);
                    ctx.lineTo(leftGroupStart - 10, 268);
                    ctx.lineTo(leftGroupEnd + 10, 268);
                    ctx.lineTo(leftGroupEnd + 10, 260);
                    ctx.stroke();

                    ctx.fillStyle = viz.colors.blue;
                    ctx.font = 'bold 22px -apple-system, sans-serif';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'top';
                    ctx.fillText(leftCount, (leftGroupStart + leftGroupEnd) / 2, 274);

                    ctx.font = '12px -apple-system, sans-serif';
                    ctx.fillText('tens', (leftGroupStart + leftGroupEnd) / 2, 298);
                }

                // Draw bracket for right group
                var rightGroupStart = foldIndex < 9 ? fingers[foldIndex + 1].x : fingers[9].x;
                var rightGroupEnd = fingers[9].x;
                if (rightCount > 0) {
                    ctx.strokeStyle = viz.colors.orange;
                    ctx.lineWidth = 3;
                    ctx.beginPath();
                    ctx.moveTo(rightGroupStart - 10, 260);
                    ctx.lineTo(rightGroupStart - 10, 268);
                    ctx.lineTo(rightGroupEnd + 10, 268);
                    ctx.lineTo(rightGroupEnd + 10, 260);
                    ctx.stroke();

                    ctx.fillStyle = viz.colors.orange;
                    ctx.font = 'bold 22px -apple-system, sans-serif';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'top';
                    ctx.fillText(rightCount, (rightGroupStart + rightGroupEnd) / 2, 274);

                    ctx.font = '12px -apple-system, sans-serif';
                    ctx.fillText('ones', (rightGroupStart + rightGroupEnd) / 2, 298);
                }

                ctx.globalAlpha = 1;
            }

            // Answer equation at bottom
            if (showAlpha > 0.5) {
                ctx.globalAlpha = Math.min(1, (foldProgress - 0.5) * 2);

                // Equation
                ctx.fillStyle = viz.colors.yellow;
                ctx.font = 'bold 28px -apple-system, sans-serif';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'top';
                ctx.fillText('9 \u00D7 ' + multiplyBy + ' = ', 200, 370);

                // Answer with color coded digits
                ctx.fillStyle = viz.colors.blue;
                ctx.fillText(leftCount, 300, 370);
                ctx.fillStyle = viz.colors.orange;
                ctx.fillText(rightCount, 328, 370);

                // Full answer
                ctx.fillStyle = viz.colors.green;
                ctx.font = 'bold 18px -apple-system, sans-serif';
                ctx.fillText('= ' + answer, 380, 376);

                ctx.globalAlpha = 1;

                // Fun sparkle around the answer
                if (foldProgress >= 1) {
                    var t = Date.now() * 0.004;
                    var sparkColors = [viz.colors.yellow, viz.colors.pink, viz.colors.teal, viz.colors.blue, viz.colors.orange];
                    for (var sp = 0; sp < 6; sp++) {
                        var angle = (sp / 6) * Math.PI * 2 + t;
                        var dist = 25 + Math.sin(t * 2 + sp) * 8;
                        var spx = 380 + Math.cos(angle) * dist;
                        var spy = 386 + Math.sin(angle) * dist * 0.5;
                        ctx.fillStyle = sparkColors[sp % sparkColors.length];
                        ctx.beginPath();
                        ctx.arc(spx, spy, 3, 0, Math.PI * 2);
                        ctx.fill();
                    }
                }
            }

            // Folded finger indicator (red X or arrow)
            if (foldProgress >= 0.8) {
                var fFinger = fingers[foldIndex];
                ctx.fillStyle = viz.colors.red;
                ctx.font = 'bold 16px -apple-system, sans-serif';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText('FOLD', fFinger.x, fFinger.baseY + 30);
            }
        }

        viz.animate(function() {
            draw();
        });

        return viz;
    }
});

// ============================================================
// Visualization 4 -- sec04: "Math in Games"
// Two-Dice Sum Simulator with histogram.
// ============================================================
window.EXTRA_VIZ['ch09']['ch09-sec04'] = window.EXTRA_VIZ['ch09']['ch09-sec04'] || [];
window.EXTRA_VIZ['ch09']['ch09-sec04'].push({
    id: 'ch09-extra-viz-4',
    title: 'Two-Dice Sum Simulator',
    description: 'Roll two dice and see what sums come up! After many rolls, which sums appear most often? Watch the bell curve form!',
    setup: function(container, controls) {
        var viz = new VizEngine(container, { width: 560, height: 460, scale: 40, originX: 280, originY: 230 });
        var ctx = viz.ctx;

        var die1 = 0;
        var die2 = 0;
        var histogram = {}; // sum -> count
        for (var s = 2; s <= 12; s++) histogram[s] = 0;
        var totalRolls = 0;
        var rolling = false;
        var rollFrames = 0;
        var rollAnim = 0;

        var rollBtn = VizEngine.createButton(controls, 'Roll Dice!', function() {
            if (rolling) return;
            rolling = true;
            rollFrames = 0;
            rollAnim = 0;
        });

        var roll10Btn = VizEngine.createButton(controls, 'Roll 10x', function() {
            for (var i = 0; i < 10; i++) {
                die1 = Math.floor(Math.random() * 6) + 1;
                die2 = Math.floor(Math.random() * 6) + 1;
                histogram[die1 + die2]++;
                totalRolls++;
            }
        });

        var roll100Btn = VizEngine.createButton(controls, 'Roll 100x', function() {
            for (var i = 0; i < 100; i++) {
                die1 = Math.floor(Math.random() * 6) + 1;
                die2 = Math.floor(Math.random() * 6) + 1;
                histogram[die1 + die2]++;
                totalRolls++;
            }
        });

        var resetBtn = VizEngine.createButton(controls, 'Reset', function() {
            die1 = 0;
            die2 = 0;
            for (var s = 2; s <= 12; s++) histogram[s] = 0;
            totalRolls = 0;
            rolling = false;
        });

        // Draw a die face at pixel coordinates
        function drawDie(px, py, size, value, color) {
            var r = 8; // corner radius

            // Die shadow
            ctx.fillStyle = '#00000044';
            ctx.beginPath();
            ctx.moveTo(px + 3 + r, py + 3);
            ctx.lineTo(px + 3 + size - r, py + 3);
            ctx.quadraticCurveTo(px + 3 + size, py + 3, px + 3 + size, py + 3 + r);
            ctx.lineTo(px + 3 + size, py + 3 + size - r);
            ctx.quadraticCurveTo(px + 3 + size, py + 3 + size, px + 3 + size - r, py + 3 + size);
            ctx.lineTo(px + 3 + r, py + 3 + size);
            ctx.quadraticCurveTo(px + 3, py + 3 + size, px + 3, py + 3 + size - r);
            ctx.lineTo(px + 3, py + 3 + r);
            ctx.quadraticCurveTo(px + 3, py + 3, px + 3 + r, py + 3);
            ctx.closePath();
            ctx.fill();

            // Die body
            ctx.fillStyle = color || '#f0f0f0';
            ctx.beginPath();
            ctx.moveTo(px + r, py);
            ctx.lineTo(px + size - r, py);
            ctx.quadraticCurveTo(px + size, py, px + size, py + r);
            ctx.lineTo(px + size, py + size - r);
            ctx.quadraticCurveTo(px + size, py + size, px + size - r, py + size);
            ctx.lineTo(px + r, py + size);
            ctx.quadraticCurveTo(px, py + size, px, py + size - r);
            ctx.lineTo(px, py + r);
            ctx.quadraticCurveTo(px, py, px + r, py);
            ctx.closePath();
            ctx.fill();

            // Die border
            ctx.strokeStyle = '#888888';
            ctx.lineWidth = 1.5;
            ctx.stroke();

            // Dots
            var dotR = size * 0.07;
            ctx.fillStyle = '#222222';
            var cx = px + size / 2;
            var cy = py + size / 2;
            var off = size * 0.26;

            // Dot positions based on value
            var dots = [];
            if (value === 1) {
                dots = [[cx, cy]];
            } else if (value === 2) {
                dots = [[cx - off, cy - off], [cx + off, cy + off]];
            } else if (value === 3) {
                dots = [[cx - off, cy - off], [cx, cy], [cx + off, cy + off]];
            } else if (value === 4) {
                dots = [[cx - off, cy - off], [cx + off, cy - off], [cx - off, cy + off], [cx + off, cy + off]];
            } else if (value === 5) {
                dots = [[cx - off, cy - off], [cx + off, cy - off], [cx, cy], [cx - off, cy + off], [cx + off, cy + off]];
            } else if (value === 6) {
                dots = [[cx - off, cy - off], [cx + off, cy - off], [cx - off, cy], [cx + off, cy], [cx - off, cy + off], [cx + off, cy + off]];
            }

            for (var d = 0; d < dots.length; d++) {
                ctx.beginPath();
                ctx.arc(dots[d][0], dots[d][1], dotR, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        // Bar colors for histogram (rainbow)
        var barColors = [
            '', '', // 0, 1 unused
            '#f85149', '#f0883e', '#d29922', '#e6c619',
            '#3fb950', '#3fb9a0', '#58a6ff', '#79c0ff',
            '#bc8cff', '#d2a8ff', '#f778ba'
        ];

        function draw() {
            viz.clear();

            // Title
            ctx.fillStyle = viz.colors.white;
            ctx.font = 'bold 22px -apple-system, sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'top';
            ctx.fillText('Two-Dice Sum Simulator', viz.width / 2, 8);

            // Roll count
            ctx.fillStyle = viz.colors.teal;
            ctx.font = 'bold 14px -apple-system, sans-serif';
            ctx.textAlign = 'right';
            ctx.fillText('Total rolls: ' + totalRolls, viz.width - 20, 12);

            // Draw the two dice
            var dieSize = 70;
            var dieY = 40;

            if (die1 > 0 && die2 > 0) {
                // Die 1
                var displayDie1 = rolling ? Math.floor(Math.random() * 6) + 1 : die1;
                var displayDie2 = rolling ? Math.floor(Math.random() * 6) + 1 : die2;

                var wobble1 = rolling ? Math.sin(rollAnim * 15) * 5 : 0;
                var wobble2 = rolling ? Math.cos(rollAnim * 13) * 5 : 0;

                drawDie(170 + wobble1, dieY + Math.abs(wobble1), dieSize, displayDie1, '#ffffff');
                drawDie(310 + wobble2, dieY + Math.abs(wobble2), dieSize, displayDie2, '#fff8e0');

                if (!rolling) {
                    // Sum display between dice
                    ctx.fillStyle = viz.colors.yellow;
                    ctx.font = 'bold 28px -apple-system, sans-serif';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.fillText('+', 275, dieY + dieSize / 2);
                    ctx.fillText('= ' + (die1 + die2), 425, dieY + dieSize / 2);
                }
            } else {
                // No roll yet
                ctx.fillStyle = '#4a4a7a';
                ctx.font = '16px -apple-system, sans-serif';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText('Click "Roll Dice!" to start', viz.width / 2, dieY + dieSize / 2);
            }

            // Histogram
            var histLeft = 30;
            var histTop = 145;
            var histHeight = 200;
            var histWidth = 500;
            var barCount = 11; // sums 2-12
            var barWidth = histWidth / barCount - 4;
            var barGap = 4;

            // Find max count
            var maxCount = 1;
            for (var s = 2; s <= 12; s++) {
                if (histogram[s] > maxCount) maxCount = histogram[s];
            }

            // Draw bars
            for (var s2 = 2; s2 <= 12; s2++) {
                var idx = s2 - 2;
                var bx = histLeft + idx * (barWidth + barGap);
                var count = histogram[s2];
                var barH = (count / maxCount) * (histHeight - 30);

                // Bar background track
                ctx.fillStyle = '#1a1a3a';
                ctx.fillRect(bx, histTop, barWidth, histHeight);

                // Bar fill
                if (count > 0) {
                    ctx.fillStyle = barColors[s2];
                    ctx.fillRect(bx, histTop + histHeight - barH, barWidth, barH);

                    // Bar highlight
                    ctx.fillStyle = barColors[s2] + '44';
                    ctx.fillRect(bx, histTop + histHeight - barH, barWidth * 0.4, barH);

                    // Glow on top
                    ctx.fillStyle = '#ffffff22';
                    ctx.fillRect(bx, histTop + histHeight - barH, barWidth, 3);
                }

                // Highlight latest sum
                if (!rolling && die1 > 0 && die2 > 0 && s2 === die1 + die2) {
                    ctx.strokeStyle = viz.colors.yellow;
                    ctx.lineWidth = 3;
                    ctx.strokeRect(bx - 1, histTop - 1, barWidth + 2, histHeight + 2);
                }

                // Sum label below
                ctx.fillStyle = (!rolling && die1 > 0 && s2 === die1 + die2) ? viz.colors.yellow : viz.colors.white;
                ctx.font = (!rolling && die1 > 0 && s2 === die1 + die2) ? 'bold 14px -apple-system, sans-serif' : '12px -apple-system, sans-serif';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'top';
                ctx.fillText(s2, bx + barWidth / 2, histTop + histHeight + 6);

                // Count label on top of bar
                if (count > 0) {
                    ctx.fillStyle = viz.colors.white;
                    ctx.font = '11px -apple-system, sans-serif';
                    ctx.textBaseline = 'bottom';
                    ctx.fillText(count, bx + barWidth / 2, histTop + histHeight - barH - 3);
                }
            }

            // Axis labels
            ctx.fillStyle = viz.colors.text;
            ctx.font = '12px -apple-system, sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'top';
            ctx.fillText('Sum', histLeft + histWidth / 2, histTop + histHeight + 24);

            // Most frequent sum
            if (totalRolls > 0) {
                var mostFreq = 2;
                for (var ms = 3; ms <= 12; ms++) {
                    if (histogram[ms] > histogram[mostFreq]) mostFreq = ms;
                }
                ctx.fillStyle = viz.colors.green;
                ctx.font = 'bold 13px -apple-system, sans-serif';
                ctx.textAlign = 'left';
                ctx.textBaseline = 'top';
                ctx.fillText('Most common: ' + mostFreq + ' (' + histogram[mostFreq] + ' times)', histLeft, histTop + histHeight + 40);

                // Bell curve note
                if (totalRolls >= 50) {
                    ctx.fillStyle = viz.colors.purple;
                    ctx.font = '12px -apple-system, sans-serif';
                    ctx.textAlign = 'right';
                    ctx.fillText('Notice the bell curve shape forming!', histLeft + histWidth, histTop + histHeight + 40);
                }
            }
        }

        viz.animate(function() {
            if (rolling) {
                rollFrames++;
                rollAnim += 0.04;
                if (rollFrames > 25) {
                    rolling = false;
                    die1 = Math.floor(Math.random() * 6) + 1;
                    die2 = Math.floor(Math.random() * 6) + 1;
                    histogram[die1 + die2]++;
                    totalRolls++;
                }
            }
            draw();
        });

        return viz;
    }
});

// ============================================================
// Visualization 5 -- sec05: "Number Detective"
// Fibonacci Spiral visualizer with animated squares and arcs.
// ============================================================
window.EXTRA_VIZ['ch09']['ch09-sec05'] = window.EXTRA_VIZ['ch09']['ch09-sec05'] || [];
window.EXTRA_VIZ['ch09']['ch09-sec05'].push({
    id: 'ch09-extra-viz-5',
    title: 'Fibonacci Spiral',
    description: 'Watch the famous Fibonacci numbers (1, 1, 2, 3, 5, 8, 13) build a beautiful spiral! Each square is the sum of the two before it.',
    setup: function(container, controls) {
        var viz = new VizEngine(container, { width: 560, height: 460, scale: 40, originX: 280, originY: 230 });
        var ctx = viz.ctx;

        var fibs = [1, 1, 2, 3, 5, 8, 13];
        var animProgress = 0; // 0..fibs.length+1 (extra 1 for the spiral)
        var animating = false;
        var animId = null;
        var showLabels = true;

        var playBtn = VizEngine.createButton(controls, 'Play Animation', function() {
            animProgress = 0;
            animating = true;
            if (animId) cancelAnimationFrame(animId);
            runAnim();
        });

        var showAllBtn = VizEngine.createButton(controls, 'Show All', function() {
            animProgress = fibs.length + 1;
            animating = false;
            if (animId) cancelAnimationFrame(animId);
        });

        var resetBtn = VizEngine.createButton(controls, 'Reset', function() {
            animProgress = 0;
            animating = false;
            if (animId) cancelAnimationFrame(animId);
        });

        function runAnim() {
            animProgress += 0.02;
            if (animProgress >= fibs.length + 1) {
                animProgress = fibs.length + 1;
                animating = false;
                return;
            }
            animId = requestAnimationFrame(runAnim);
        }

        // Rainbow colors for each Fibonacci square
        var squareColors = [
            '#f85149', '#f0883e', '#d29922', '#3fb950',
            '#3fb9a0', '#58a6ff', '#bc8cff'
        ];

        // Precompute square positions relative to a center
        // Direction sequence: right, up, left, down, right, up, left, ...
        // Each square is placed adjacent to the previous arrangement
        function computeSquares() {
            var squares = [];
            // We will track the bounding rectangle and place each new square adjacent
            // Direction: 0=right, 1=up, 2=left, 3=down
            var directions = [0, 1, 2, 3]; // cycle

            // Start with the first 1x1 square at origin
            // Each square: { x, y, size, direction_index }
            // x,y is the top-left corner in a coordinate system where y increases downward

            // Place first square
            squares.push({ x: 0, y: 0, size: fibs[0] });

            if (fibs.length < 2) return squares;

            // Place second square to the right
            squares.push({ x: fibs[0], y: 0, size: fibs[1] });

            // Track bounding box of all squares placed so far
            var minX = 0, minY = 0;
            var maxX = fibs[0] + fibs[1], maxY = Math.max(fibs[0], fibs[1]);

            // For each subsequent Fibonacci number, place the square adjacent
            for (var i = 2; i < fibs.length; i++) {
                var s = fibs[i];
                var dir = i % 4; // 0=right, 1=up, 2=left, 3=down

                var sq = { x: 0, y: 0, size: s };

                if (dir === 0) {
                    // Place to the right
                    sq.x = maxX;
                    sq.y = maxY - s;
                    maxX += s;
                } else if (dir === 1) {
                    // Place above (up)
                    sq.x = minX;
                    sq.y = minY - s;
                    minY -= s;
                } else if (dir === 2) {
                    // Place to the left
                    sq.x = minX - s;
                    sq.y = minY;
                    minX -= s;
                } else if (dir === 3) {
                    // Place below (down)
                    sq.x = maxX - s;
                    sq.y = maxY;
                    maxY += s;
                }

                squares.push(sq);
            }

            return squares;
        }

        var squares = computeSquares();

        // Scale and center the squares on the canvas
        function getTransform() {
            var minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
            for (var i = 0; i < squares.length; i++) {
                var sq = squares[i];
                if (sq.x < minX) minX = sq.x;
                if (sq.y < minY) minY = sq.y;
                if (sq.x + sq.size > maxX) maxX = sq.x + sq.size;
                if (sq.y + sq.size > maxY) maxY = sq.y + sq.size;
            }

            var totalW = maxX - minX;
            var totalH = maxY - minY;
            var margin = 60;
            var availW = viz.width - margin * 2;
            var availH = 320; // leave room for text
            var scale = Math.min(availW / totalW, availH / totalH);
            var offsetX = margin + (availW - totalW * scale) / 2 - minX * scale;
            var offsetY = 70 + (availH - totalH * scale) / 2 - minY * scale;

            return { scale: scale, offsetX: offsetX, offsetY: offsetY };
        }

        function draw() {
            viz.clear();

            // Title
            ctx.fillStyle = viz.colors.white;
            ctx.font = 'bold 22px -apple-system, sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'top';
            ctx.fillText('Fibonacci Spiral', viz.width / 2, 8);

            // Fibonacci sequence display
            ctx.font = '14px -apple-system, sans-serif';
            ctx.fillStyle = viz.colors.teal;
            var seqText = 'Sequence: ';
            for (var fi = 0; fi < fibs.length; fi++) {
                if (fi > 0) seqText += ', ';
                seqText += fibs[fi];
            }
            seqText += ', ...';
            ctx.fillText(seqText, viz.width / 2, 34);

            // Rule
            ctx.fillStyle = viz.colors.text;
            ctx.font = '12px -apple-system, sans-serif';
            ctx.fillText('Rule: each number = sum of the previous two', viz.width / 2, 52);

            var trans = getTransform();
            var scl = trans.scale;
            var ox = trans.offsetX;
            var oy = trans.offsetY;

            // How many squares to show
            var squaresToShow = Math.min(Math.floor(animProgress), fibs.length);
            var partialSquare = animProgress - squaresToShow;

            // Draw squares
            for (var i = 0; i < squaresToShow && i < squares.length; i++) {
                var sq = squares[i];
                var px = ox + sq.x * scl;
                var py = oy + sq.y * scl;
                var ps = sq.size * scl;
                var color = squareColors[i % squareColors.length];

                // Fill
                ctx.fillStyle = color + '33';
                ctx.fillRect(px, py, ps, ps);

                // Border
                ctx.strokeStyle = color;
                ctx.lineWidth = 2.5;
                ctx.strokeRect(px, py, ps, ps);

                // Label
                if (showLabels && ps > 18) {
                    ctx.fillStyle = color;
                    ctx.font = 'bold ' + Math.max(10, Math.min(24, ps * 0.3)) + 'px -apple-system, sans-serif';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.fillText(fibs[i], px + ps / 2, py + ps / 2);
                }
            }

            // Draw partially appearing square
            if (squaresToShow < squares.length && partialSquare > 0) {
                var psq = squares[squaresToShow];
                var ppx = ox + psq.x * scl;
                var ppy = oy + psq.y * scl;
                var pps = psq.size * scl * partialSquare;
                var pcolor = squareColors[squaresToShow % squareColors.length];

                ctx.globalAlpha = partialSquare;
                ctx.fillStyle = pcolor + '33';
                ctx.fillRect(ppx, ppy, pps, pps);
                ctx.strokeStyle = pcolor;
                ctx.lineWidth = 2.5;
                ctx.strokeRect(ppx, ppy, pps, pps);
                ctx.globalAlpha = 1;
            }

            // Draw the spiral arcs (quarter circles inside each square)
            // Only draw for completed squares
            var spiralSquares = Math.min(squaresToShow, fibs.length);
            if (animProgress > fibs.length) {
                // Show spiral arc drawing animated
                var spiralProgress = animProgress - fibs.length; // 0..1
                spiralSquares = Math.floor(spiralProgress * fibs.length);
                var spiralPartial = (spiralProgress * fibs.length) - spiralSquares;
                if (spiralProgress >= 1) {
                    spiralSquares = fibs.length;
                    spiralPartial = 1;
                }

                ctx.lineWidth = 3;
                ctx.lineCap = 'round';

                for (var si = 0; si < spiralSquares && si < squares.length; si++) {
                    drawArc(si, 1.0);
                }
                if (spiralSquares < fibs.length) {
                    drawArc(spiralSquares, spiralPartial);
                }
            } else if (squaresToShow >= fibs.length) {
                // Show all spiral arcs
                ctx.lineWidth = 3;
                ctx.lineCap = 'round';
                for (var si2 = 0; si2 < fibs.length; si2++) {
                    drawArc(si2, 1.0);
                }
            }

            function drawArc(index, progress) {
                if (index >= squares.length) return;
                var sq = squares[index];
                var px2 = ox + sq.x * scl;
                var py2 = oy + sq.y * scl;
                var ps2 = sq.size * scl;
                var dir = index % 4;

                // Quarter circle arc inside the square
                // The arc connects corners based on the spiral direction
                var arcCX, arcCY, startAngle, endAngle;

                if (dir === 0) {
                    // Right: arc from bottom-left to top-right, center at bottom-right
                    arcCX = px2 + ps2;
                    arcCY = py2 + ps2;
                    startAngle = Math.PI * 1.5;
                    endAngle = Math.PI;
                } else if (dir === 1) {
                    // Up: arc from bottom-right to top-left, center at bottom-left
                    arcCX = px2;
                    arcCY = py2 + ps2;
                    startAngle = Math.PI * 2;
                    endAngle = Math.PI * 1.5;
                } else if (dir === 2) {
                    // Left: arc from top-right to bottom-left, center at top-left
                    arcCX = px2;
                    arcCY = py2;
                    startAngle = Math.PI * 0.5;
                    endAngle = 0;
                } else {
                    // Down: arc from top-left to bottom-right, center at top-right
                    arcCX = px2 + ps2;
                    arcCY = py2;
                    startAngle = Math.PI;
                    endAngle = Math.PI * 0.5;
                }

                var color = squareColors[index % squareColors.length];
                ctx.strokeStyle = color;
                ctx.lineWidth = 3;
                ctx.beginPath();

                // Draw the arc with progress
                var totalAngle = endAngle - startAngle;
                // Handle wrapping (we always go counterclockwise for this spiral)
                var drawEnd = startAngle + totalAngle * progress;
                ctx.arc(arcCX, arcCY, ps2, startAngle, drawEnd, true);
                ctx.stroke();
            }

            // Equation at bottom showing the pattern
            var eqY = 410;
            ctx.fillStyle = viz.colors.white;
            ctx.font = 'bold 14px -apple-system, sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'top';

            // Show addition pattern
            if (squaresToShow >= 3) {
                var patternParts = [];
                for (var pi = 2; pi < Math.min(squaresToShow, fibs.length); pi++) {
                    patternParts.push(fibs[pi - 2] + '+' + fibs[pi - 1] + '=' + fibs[pi]);
                }
                var patternText = patternParts.join('    ');
                ctx.fillStyle = viz.colors.yellow;
                ctx.font = 'bold 13px -apple-system, sans-serif';
                ctx.fillText(patternText, viz.width / 2, eqY);
            }

            // Fun message
            if (animProgress >= fibs.length + 1) {
                ctx.fillStyle = viz.colors.green;
                ctx.font = 'bold 15px -apple-system, sans-serif';
                ctx.fillText('The Golden Spiral - found everywhere in nature!', viz.width / 2, eqY + 22);

                // Sparkle celebration
                var t = Date.now() * 0.003;
                var sparkColors = [viz.colors.yellow, viz.colors.pink, viz.colors.teal, viz.colors.orange, viz.colors.blue, viz.colors.green, viz.colors.purple];
                for (var sp = 0; sp < 10; sp++) {
                    var angle = (sp / 10) * Math.PI * 2 + t;
                    var dist = 60 + Math.sin(t * 2 + sp) * 15;
                    var spx = viz.width / 2 + Math.cos(angle) * dist * 2.5;
                    var spy = 250 + Math.sin(angle) * dist;
                    ctx.fillStyle = sparkColors[sp % sparkColors.length];
                    ctx.beginPath();
                    ctx.arc(spx, spy, 3.5, 0, Math.PI * 2);
                    ctx.fill();
                }
            }
        }

        viz.animate(function() {
            draw();
        });

        return viz;
    }
});
