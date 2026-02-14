// === Chapter 0: Counting & Place Value — Extra Visualizations ===
// Fun, colorful, interactive visualizations for elementary school kids (ages 7-12)

window.EXTRA_VIZ = window.EXTRA_VIZ || {};
window.EXTRA_VIZ['ch00'] = window.EXTRA_VIZ['ch00'] || {};

// ============================================================
// Section 1: Counting to 100 — Bouncing Ball Number Line
// ============================================================
window.EXTRA_VIZ['ch00']['ch00-sec01'] = [
    {
        id: 'ch00-extra-viz-1',
        title: 'Bouncing Ball Number Line',
        description: 'Watch the ball hop along the numbers! Use the slider to change how fast it bounces.',
        setup: function(container, controls) {
            var viz = new VizEngine(container, {
                width: 600, height: 300, scale: 25,
                originX: 30, originY: 200
            });

            // Rainbow colors for each number
            var rainbow = [
                '#FF0000', '#FF4400', '#FF8800', '#FFBB00',
                '#FFFF00', '#88FF00', '#00FF00', '#00FF88',
                '#00FFFF', '#0088FF', '#0000FF', '#4400FF',
                '#8800FF', '#BB00FF', '#FF00FF', '#FF0088',
                '#FF0044', '#FF2200', '#FF6600', '#FFAA00'
            ];

            var speed = 1.0;
            var ballPos = 0; // fractional position along the number line
            var bouncePhase = 0;
            var paused = false;

            // Speed slider
            var speedGroup = document.createElement('div');
            speedGroup.className = 'viz-slider-group';
            var speedLabel = document.createElement('span');
            speedLabel.className = 'viz-slider-label';
            speedLabel.textContent = 'Speed: ';
            var speedSlider = document.createElement('input');
            speedSlider.type = 'range';
            speedSlider.className = 'viz-slider';
            speedSlider.min = '0.2';
            speedSlider.max = '3';
            speedSlider.step = '0.1';
            speedSlider.value = '1';
            var speedVal = document.createElement('span');
            speedVal.className = 'viz-slider-value';
            speedVal.textContent = '1.0x';
            speedSlider.addEventListener('input', function() {
                speed = parseFloat(speedSlider.value);
                speedVal.textContent = speed.toFixed(1) + 'x';
            });
            speedGroup.appendChild(speedLabel);
            speedGroup.appendChild(speedSlider);
            speedGroup.appendChild(speedVal);
            controls.appendChild(speedGroup);

            // Pause/Play button
            var pauseBtn = document.createElement('button');
            pauseBtn.textContent = 'Pause';
            pauseBtn.style.cssText = 'padding:4px 14px;border:1px solid #30363d;border-radius:4px;background:#1a1a40;color:#c9d1d9;font-size:0.85rem;cursor:pointer;margin-left:8px;';
            pauseBtn.addEventListener('click', function() {
                paused = !paused;
                pauseBtn.textContent = paused ? 'Play' : 'Pause';
            });
            controls.appendChild(pauseBtn);

            // Restart button
            var restartBtn = document.createElement('button');
            restartBtn.textContent = 'Restart';
            restartBtn.style.cssText = 'padding:4px 14px;border:1px solid #30363d;border-radius:4px;background:#1a1a40;color:#c9d1d9;font-size:0.85rem;cursor:pointer;margin-left:4px;';
            restartBtn.addEventListener('click', function() {
                ballPos = 0;
                bouncePhase = 0;
            });
            controls.appendChild(restartBtn);

            var lastTime = null;

            function draw(t) {
                if (lastTime === null) lastTime = t;
                var dt = (t - lastTime) / 1000;
                lastTime = t;

                if (!paused) {
                    ballPos += dt * speed * 0.8;
                    if (ballPos > 20.5) ballPos = 0;
                    bouncePhase += dt * speed * 8;
                }

                viz.clear();
                var ctx = viz.ctx;

                // Draw a nice gradient background strip for the number line
                var lineY = viz.originY;
                ctx.fillStyle = '#1a1a40';
                ctx.fillRect(0, lineY - 5, viz.width, 10);

                // Draw number line
                var nlY = 0; // math y-coordinate for the number line
                ctx.strokeStyle = '#4a4a7a';
                ctx.lineWidth = 3;
                var startScreen = viz.toScreen(0, nlY);
                var endScreen = viz.toScreen(21, nlY);
                ctx.beginPath();
                ctx.moveTo(startScreen[0], startScreen[1]);
                ctx.lineTo(endScreen[0], endScreen[1]);
                ctx.stroke();

                // Draw tick marks and numbers with rainbow colors
                for (var i = 1; i <= 20; i++) {
                    var sx = viz.toScreen(i, nlY);
                    var color = rainbow[i - 1];

                    // Tick mark
                    ctx.strokeStyle = color;
                    ctx.lineWidth = 2;
                    ctx.beginPath();
                    ctx.moveTo(sx[0], sx[1] - 10);
                    ctx.lineTo(sx[0], sx[1] + 10);
                    ctx.stroke();

                    // Number label
                    ctx.fillStyle = color;
                    ctx.font = 'bold 16px -apple-system, sans-serif';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'top';
                    ctx.fillText(String(i), sx[0], sx[1] + 14);

                    // Subtle glow for the current number
                    var currentNum = Math.round(ballPos);
                    if (currentNum === i && Math.abs(ballPos - currentNum) < 0.3) {
                        ctx.shadowColor = color;
                        ctx.shadowBlur = 20;
                        ctx.fillStyle = color;
                        ctx.font = 'bold 20px -apple-system, sans-serif';
                        ctx.fillText(String(i), sx[0], sx[1] + 12);
                        ctx.shadowBlur = 0;
                    }
                }

                // Draw trail of visited numbers (fading dots)
                var currentFloor = Math.floor(ballPos);
                for (var j = 1; j <= Math.min(currentFloor, 20); j++) {
                    var trailSx = viz.toScreen(j, nlY);
                    var alpha = Math.max(0.15, 1 - (currentFloor - j) * 0.1);
                    ctx.globalAlpha = alpha;
                    ctx.fillStyle = rainbow[j - 1];
                    ctx.beginPath();
                    ctx.arc(trailSx[0], trailSx[1], 5, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.globalAlpha = 1.0;
                }

                // Draw the bouncing ball
                if (ballPos >= 0.5 && ballPos <= 20.5) {
                    var nearestNum = Math.round(ballPos);
                    var distFromNearest = Math.abs(ballPos - nearestNum);
                    // Bounce height: highest in between numbers, lowest at numbers
                    var bounceHeight = Math.sin(distFromNearest * Math.PI) * 2.5 + 0.8;
                    var ballScreenX = viz.toScreen(ballPos, nlY)[0];
                    var ballScreenY = viz.toScreen(0, bounceHeight)[1];

                    var ballColor = rainbow[(Math.max(1, Math.min(20, nearestNum)) - 1) % 20];

                    // Ball shadow
                    ctx.fillStyle = 'rgba(0,0,0,0.3)';
                    ctx.beginPath();
                    ctx.ellipse(ballScreenX, viz.toScreen(0, nlY)[1] - 2, 12, 4, 0, 0, Math.PI * 2);
                    ctx.fill();

                    // Ball glow
                    ctx.shadowColor = ballColor;
                    ctx.shadowBlur = 25;

                    // Ball body
                    ctx.fillStyle = ballColor;
                    ctx.beginPath();
                    ctx.arc(ballScreenX, ballScreenY, 14, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.shadowBlur = 0;

                    // Ball highlight (shiny spot)
                    ctx.fillStyle = 'rgba(255,255,255,0.4)';
                    ctx.beginPath();
                    ctx.arc(ballScreenX - 4, ballScreenY - 5, 5, 0, Math.PI * 2);
                    ctx.fill();

                    // Display current count above the ball
                    ctx.fillStyle = '#ffffff';
                    ctx.font = 'bold 22px -apple-system, sans-serif';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'bottom';
                    ctx.fillText(String(nearestNum), ballScreenX, ballScreenY - 20);
                }

                // Title text
                ctx.fillStyle = '#f0f6fc';
                ctx.font = 'bold 18px -apple-system, sans-serif';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'top';
                ctx.fillText('Count with the Bouncing Ball!', viz.width / 2, 15);
            }

            viz.animate(draw);
            return viz;
        }
    }
];

// ============================================================
// Section 2: Place Value — Interactive Place Value Decomposer
// ============================================================
window.EXTRA_VIZ['ch00']['ch00-sec02'] = [
    {
        id: 'ch00-extra-viz-2',
        title: 'Place Value Blocks',
        description: 'Slide the number to see it broken into hundreds, tens, and ones blocks!',
        setup: function(container, controls) {
            var viz = new VizEngine(container, {
                width: 600, height: 420, scale: 1,
                originX: 0, originY: 0
            });

            var currentNumber = 365;

            // Number slider
            var numGroup = document.createElement('div');
            numGroup.className = 'viz-slider-group';
            var numLabel = document.createElement('span');
            numLabel.className = 'viz-slider-label';
            numLabel.textContent = 'Number: ';
            var numSlider = document.createElement('input');
            numSlider.type = 'range';
            numSlider.className = 'viz-slider';
            numSlider.min = '0';
            numSlider.max = '999';
            numSlider.step = '1';
            numSlider.value = String(currentNumber);
            var numVal = document.createElement('span');
            numVal.className = 'viz-slider-value';
            numVal.textContent = String(currentNumber);
            numSlider.addEventListener('input', function() {
                currentNumber = parseInt(numSlider.value);
                numVal.textContent = String(currentNumber);
                draw();
            });
            numGroup.appendChild(numLabel);
            numGroup.appendChild(numSlider);
            numGroup.appendChild(numVal);
            controls.appendChild(numGroup);

            // Colors
            var hundredColor = '#FF6B6B';   // red/coral for hundreds
            var tenColor = '#4ECDC4';        // teal for tens
            var oneColor = '#FFE66D';        // yellow for ones
            var hundredBorder = '#E04040';
            var tenBorder = '#2BA89E';
            var oneBorder = '#E0C030';

            function draw() {
                var ctx = viz.ctx;
                // Background
                ctx.fillStyle = '#0c0c20';
                ctx.fillRect(0, 0, viz.width, viz.height);

                var hundreds = Math.floor(currentNumber / 100);
                var tens = Math.floor((currentNumber % 100) / 10);
                var ones = currentNumber % 10;

                // Title
                ctx.fillStyle = '#f0f6fc';
                ctx.font = 'bold 24px -apple-system, sans-serif';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'top';
                ctx.fillText(String(currentNumber), viz.width / 2, 10);

                // Decomposition text
                ctx.font = '16px -apple-system, sans-serif';
                var decomp = '';
                if (hundreds > 0) decomp += hundreds + ' x 100';
                if (tens > 0) decomp += (decomp ? '  +  ' : '') + tens + ' x 10';
                if (ones > 0) decomp += (decomp ? '  +  ' : '') + ones + ' x 1';
                if (decomp === '') decomp = '0';
                ctx.fillText(decomp, viz.width / 2, 40);

                // Draw place value labels
                ctx.font = 'bold 14px -apple-system, sans-serif';
                ctx.textAlign = 'center';

                // Layout: 3 zones
                var zoneY = 75;
                var blockArea = viz.height - zoneY - 10;

                // --- HUNDREDS (big 40x40 squares) ---
                var hx = 20;
                ctx.fillStyle = hundredColor;
                ctx.fillText('HUNDREDS', 110, zoneY);
                ctx.fillStyle = hundredColor + '88';
                ctx.font = 'bold 28px -apple-system, sans-serif';
                ctx.fillText(String(hundreds), 110, zoneY + 18);
                ctx.font = 'bold 14px -apple-system, sans-serif';

                for (var h = 0; h < hundreds; h++) {
                    var bx = hx + (h % 3) * 65;
                    var by = zoneY + 55 + Math.floor(h / 3) * 65;
                    // Flat block with grid lines (10x10 grid inside)
                    ctx.fillStyle = hundredColor;
                    ctx.fillRect(bx, by, 55, 55);
                    ctx.strokeStyle = hundredBorder;
                    ctx.lineWidth = 2;
                    ctx.strokeRect(bx, by, 55, 55);
                    // Inner grid to show 100 little squares
                    ctx.strokeStyle = hundredBorder + '66';
                    ctx.lineWidth = 0.5;
                    for (var gi = 1; gi < 10; gi++) {
                        ctx.beginPath();
                        ctx.moveTo(bx + gi * 5.5, by);
                        ctx.lineTo(bx + gi * 5.5, by + 55);
                        ctx.stroke();
                        ctx.beginPath();
                        ctx.moveTo(bx, by + gi * 5.5);
                        ctx.lineTo(bx + 55, by + gi * 5.5);
                        ctx.stroke();
                    }
                    // Label
                    ctx.fillStyle = '#ffffff';
                    ctx.font = 'bold 12px -apple-system, sans-serif';
                    ctx.textAlign = 'center';
                    ctx.fillText('100', bx + 27.5, by + 30);
                }

                // --- TENS (tall rectangles 12x50) ---
                var tx = 220;
                ctx.fillStyle = tenColor;
                ctx.font = 'bold 14px -apple-system, sans-serif';
                ctx.textAlign = 'center';
                ctx.fillText('TENS', tx + 65, zoneY);
                ctx.fillStyle = tenColor + '88';
                ctx.font = 'bold 28px -apple-system, sans-serif';
                ctx.fillText(String(tens), tx + 65, zoneY + 18);
                ctx.font = 'bold 14px -apple-system, sans-serif';

                for (var tn = 0; tn < tens; tn++) {
                    var tbx = tx + tn * 17;
                    var tby = zoneY + 55;
                    // Tall rod
                    ctx.fillStyle = tenColor;
                    ctx.fillRect(tbx, tby, 13, 55);
                    ctx.strokeStyle = tenBorder;
                    ctx.lineWidth = 1.5;
                    ctx.strokeRect(tbx, tby, 13, 55);
                    // Inner marks (10 segments)
                    ctx.strokeStyle = tenBorder + '66';
                    ctx.lineWidth = 0.5;
                    for (var si = 1; si < 10; si++) {
                        ctx.beginPath();
                        ctx.moveTo(tbx, tby + si * 5.5);
                        ctx.lineTo(tbx + 13, tby + si * 5.5);
                        ctx.stroke();
                    }
                    // Label
                    ctx.fillStyle = '#ffffff';
                    ctx.font = 'bold 9px -apple-system, sans-serif';
                    ctx.textAlign = 'center';
                    ctx.fillText('10', tbx + 6.5, tby + 30);
                }

                // --- ONES (small squares 12x12) ---
                var ox = 420;
                ctx.fillStyle = oneColor;
                ctx.font = 'bold 14px -apple-system, sans-serif';
                ctx.textAlign = 'center';
                ctx.fillText('ONES', ox + 50, zoneY);
                ctx.fillStyle = oneColor + '88';
                ctx.font = 'bold 28px -apple-system, sans-serif';
                ctx.fillText(String(ones), ox + 50, zoneY + 18);

                for (var o = 0; o < ones; o++) {
                    var obx = ox + (o % 5) * 20;
                    var oby = zoneY + 55 + Math.floor(o / 5) * 20;
                    ctx.fillStyle = oneColor;
                    ctx.fillRect(obx, oby, 15, 15);
                    ctx.strokeStyle = oneBorder;
                    ctx.lineWidth = 1.5;
                    ctx.strokeRect(obx, oby, 15, 15);
                    // Label
                    ctx.fillStyle = '#333333';
                    ctx.font = 'bold 9px -apple-system, sans-serif';
                    ctx.textAlign = 'center';
                    ctx.fillText('1', obx + 7.5, oby + 10);
                }

                // Draw digit boxes at the bottom
                var boxY = viz.height - 100;
                var boxW = 60;
                var boxH = 60;
                var boxSpacing = 20;
                var totalW = 3 * boxW + 2 * boxSpacing;
                var boxStartX = (viz.width - totalW) / 2;

                var digits = [
                    { val: hundreds, label: 'Hundreds', color: hundredColor },
                    { val: tens, label: 'Tens', color: tenColor },
                    { val: ones, label: 'Ones', color: oneColor }
                ];

                for (var d = 0; d < 3; d++) {
                    var dx = boxStartX + d * (boxW + boxSpacing);
                    // Box background
                    ctx.fillStyle = digits[d].color + '33';
                    ctx.fillRect(dx, boxY, boxW, boxH);
                    ctx.strokeStyle = digits[d].color;
                    ctx.lineWidth = 3;
                    ctx.strokeRect(dx, boxY, boxW, boxH);
                    // Digit
                    ctx.fillStyle = digits[d].color;
                    ctx.font = 'bold 32px -apple-system, sans-serif';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.fillText(String(digits[d].val), dx + boxW / 2, boxY + boxH / 2);
                    // Label
                    ctx.fillStyle = digits[d].color;
                    ctx.font = '12px -apple-system, sans-serif';
                    ctx.textBaseline = 'top';
                    ctx.fillText(digits[d].label, dx + boxW / 2, boxY + boxH + 5);
                }

                ctx.textBaseline = 'middle'; // reset
            }

            draw();
            return viz;
        }
    }
];

// ============================================================
// Section 3: Comparing Numbers — Draggable Number Comparison
// ============================================================
window.EXTRA_VIZ['ch00']['ch00-sec03'] = [
    {
        id: 'ch00-extra-viz-3',
        title: 'Number Comparison Explorer',
        description: 'Drag the two points on the number line to compare numbers. Which is bigger?',
        setup: function(container, controls) {
            var viz = new VizEngine(container, {
                width: 600, height: 320, scale: 5,
                originX: 30, originY: 200
            });

            // Two draggable points on the number line
            var pointA = viz.addDraggable('ptA', 25, 0, viz.colors.blue, 10, function() { draw(); });
            var pointB = viz.addDraggable('ptB', 75, 0, viz.colors.orange, 10, function() { draw(); });

            function draw() {
                viz.clear();
                var ctx = viz.ctx;

                // Clamp to 0-100 range and snap to integers
                pointA.x = Math.max(0, Math.min(100, Math.round(pointA.x)));
                pointA.y = 0;
                pointB.x = Math.max(0, Math.min(100, Math.round(pointB.x)));
                pointB.y = 0;

                var valA = Math.round(pointA.x);
                var valB = Math.round(pointB.x);

                // Title
                ctx.fillStyle = '#f0f6fc';
                ctx.font = 'bold 18px -apple-system, sans-serif';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'top';
                ctx.fillText('Drag the circles to compare numbers!', viz.width / 2, 10);

                // Draw number line
                var nlY = 0; // math y=0
                var startPx = viz.toScreen(0, nlY);
                var endPx = viz.toScreen(100, nlY);
                ctx.strokeStyle = '#4a4a7a';
                ctx.lineWidth = 3;
                ctx.beginPath();
                ctx.moveTo(startPx[0], startPx[1]);
                ctx.lineTo(endPx[0], endPx[1]);
                ctx.stroke();

                // Draw tick marks every 10
                for (var i = 0; i <= 100; i += 10) {
                    var tickPx = viz.toScreen(i, nlY);
                    ctx.strokeStyle = '#6a6aaa';
                    ctx.lineWidth = 2;
                    ctx.beginPath();
                    ctx.moveTo(tickPx[0], tickPx[1] - 8);
                    ctx.lineTo(tickPx[0], tickPx[1] + 8);
                    ctx.stroke();
                    // Label
                    ctx.fillStyle = '#8b949e';
                    ctx.font = '12px -apple-system, sans-serif';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'top';
                    ctx.fillText(String(i), tickPx[0], tickPx[1] + 12);
                }

                // Small tick marks every 5
                for (var j = 5; j <= 95; j += 10) {
                    var stickPx = viz.toScreen(j, nlY);
                    ctx.strokeStyle = '#4a4a6a';
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(stickPx[0], stickPx[1] - 5);
                    ctx.lineTo(stickPx[0], stickPx[1] + 5);
                    ctx.stroke();
                }

                // Determine which is bigger
                var biggerColor = viz.colors.green;
                var smallerColor = viz.colors.red;

                var colorA, colorB;
                var symbol;
                if (valA > valB) {
                    colorA = biggerColor;
                    colorB = smallerColor;
                    symbol = '>';
                } else if (valA < valB) {
                    colorA = smallerColor;
                    colorB = biggerColor;
                    symbol = '<';
                } else {
                    colorA = viz.colors.yellow;
                    colorB = viz.colors.yellow;
                    symbol = '=';
                }

                // Highlight region between A and B
                var leftVal = Math.min(valA, valB);
                var rightVal = Math.max(valA, valB);
                if (leftVal !== rightVal) {
                    var leftPx = viz.toScreen(leftVal, nlY);
                    var rightPx = viz.toScreen(rightVal, nlY);
                    ctx.fillStyle = 'rgba(88, 166, 255, 0.15)';
                    ctx.fillRect(leftPx[0], leftPx[1] - 20, rightPx[0] - leftPx[0], 40);
                }

                // Draw points A and B with their colors
                var pxA = viz.toScreen(valA, nlY);
                var pxB = viz.toScreen(valB, nlY);

                // Point A
                ctx.shadowColor = colorA;
                ctx.shadowBlur = 15;
                ctx.fillStyle = colorA;
                ctx.beginPath();
                ctx.arc(pxA[0], pxA[1], 14, 0, Math.PI * 2);
                ctx.fill();
                ctx.shadowBlur = 0;
                // Label A
                ctx.fillStyle = '#ffffff';
                ctx.font = 'bold 12px -apple-system, sans-serif';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(String(valA), pxA[0], pxA[1]);

                // Point B
                ctx.shadowColor = colorB;
                ctx.shadowBlur = 15;
                ctx.fillStyle = colorB;
                ctx.beginPath();
                ctx.arc(pxB[0], pxB[1], 14, 0, Math.PI * 2);
                ctx.fill();
                ctx.shadowBlur = 0;
                // Label B
                ctx.fillStyle = '#ffffff';
                ctx.font = 'bold 12px -apple-system, sans-serif';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(String(valB), pxB[0], pxB[1]);

                // Big comparison display at the top
                var compY = 60;
                ctx.font = 'bold 36px -apple-system, sans-serif';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';

                // Number A
                ctx.fillStyle = colorA;
                ctx.fillText(String(valA), viz.width / 2 - 80, compY);

                // Symbol
                ctx.fillStyle = '#f0f6fc';
                ctx.font = 'bold 40px -apple-system, sans-serif';
                ctx.fillText(symbol, viz.width / 2, compY);

                // Number B
                ctx.fillStyle = colorB;
                ctx.font = 'bold 36px -apple-system, sans-serif';
                ctx.fillText(String(valB), viz.width / 2 + 80, compY);

                // Explanation text
                ctx.fillStyle = '#8b949e';
                ctx.font = '14px -apple-system, sans-serif';
                ctx.textBaseline = 'top';
                if (valA !== valB) {
                    var bigger = Math.max(valA, valB);
                    var smaller = Math.min(valA, valB);
                    ctx.fillText(bigger + ' is bigger than ' + smaller + ' by ' + (bigger - smaller), viz.width / 2, compY + 28);
                    ctx.fillText('The green circle is the BIGGER number!', viz.width / 2, compY + 48);
                } else {
                    ctx.fillText('Both numbers are equal!', viz.width / 2, compY + 28);
                }

                // Draw labels "A" and "B" above the points on the number line
                ctx.font = 'bold 16px -apple-system, sans-serif';
                ctx.textBaseline = 'bottom';
                ctx.fillStyle = colorA;
                ctx.fillText('A', pxA[0], pxA[1] - 20);
                ctx.fillStyle = colorB;
                ctx.fillText('B', pxB[0], pxB[1] - 20);

                viz.drawDraggables();
            }

            draw();
            return viz;
        }
    }
];

// ============================================================
// Section 4: Skip Counting — 10x10 Grid with Highlighted Multiples
// ============================================================
window.EXTRA_VIZ['ch00']['ch00-sec04'] = [
    {
        id: 'ch00-extra-viz-4',
        title: 'Skip Counting Patterns',
        description: 'Choose a number to skip count by! Watch the pattern light up on the grid.',
        setup: function(container, controls) {
            var viz = new VizEngine(container, {
                width: 600, height: 480, scale: 1,
                originX: 0, originY: 0
            });

            var skipBy = 2;
            var animProgress = 0;
            var animating = true;
            var lastTime = null;

            // Colors for each skip-counting mode
            var skipColors = {
                2: { bg: '#3FB950', glow: '#3FB95066', text: '#ffffff', label: 'Count by 2s' },
                3: { bg: '#58A6FF', glow: '#58A6FF66', text: '#ffffff', label: 'Count by 3s' },
                5: { bg: '#F0883E', glow: '#F0883E66', text: '#ffffff', label: 'Count by 5s' },
                10: { bg: '#BC8CFF', glow: '#BC8CFF66', text: '#ffffff', label: 'Count by 10s' }
            };

            // Create buttons for each skip count
            var btnGroup = document.createElement('div');
            btnGroup.style.cssText = 'display:flex;gap:6px;flex-wrap:wrap;';

            var skipValues = [2, 3, 5, 10];
            var buttons = {};

            skipValues.forEach(function(sv) {
                var btn = document.createElement('button');
                btn.textContent = skipColors[sv].label;
                btn.style.cssText = 'padding:6px 14px;border:2px solid ' + skipColors[sv].bg + ';border-radius:6px;background:' + (sv === skipBy ? skipColors[sv].bg : '#1a1a40') + ';color:#f0f6fc;font-size:0.85rem;font-weight:bold;cursor:pointer;transition:all 0.2s;';
                btn.addEventListener('click', function() {
                    skipBy = sv;
                    animProgress = 0;
                    lastTime = null;
                    // Update button styles
                    skipValues.forEach(function(v) {
                        buttons[v].style.background = v === sv ? skipColors[v].bg : '#1a1a40';
                    });
                });
                buttons[sv] = btn;
                btnGroup.appendChild(btn);
            });
            controls.appendChild(btnGroup);

            // Reset animation button
            var resetBtn = document.createElement('button');
            resetBtn.textContent = 'Replay';
            resetBtn.style.cssText = 'padding:6px 14px;border:1px solid #30363d;border-radius:6px;background:#1a1a40;color:#c9d1d9;font-size:0.85rem;cursor:pointer;margin-left:8px;';
            resetBtn.addEventListener('click', function() {
                animProgress = 0;
                lastTime = null;
            });
            controls.appendChild(resetBtn);

            function draw(t) {
                if (lastTime === null) lastTime = t;
                var dt = (t - lastTime) / 1000;
                lastTime = t;

                // Animate: reveal multiples one by one
                var totalMultiples = Math.floor(100 / skipBy);
                animProgress += dt * 3; // reveal ~3 per second
                var revealedCount = Math.min(Math.floor(animProgress), totalMultiples);

                var ctx = viz.ctx;
                ctx.fillStyle = '#0c0c20';
                ctx.fillRect(0, 0, viz.width, viz.height);

                // Title
                ctx.fillStyle = '#f0f6fc';
                ctx.font = 'bold 18px -apple-system, sans-serif';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'top';
                ctx.fillText('Skip Counting by ' + skipBy + 's', viz.width / 2, 10);

                // Grid layout
                var gridLeft = 55;
                var gridTop = 50;
                var cellSize = 48;
                var gap = 3;

                var currentColor = skipColors[skipBy];

                // Count how many multiples have been revealed to build the sequence
                var revealedNums = [];
                for (var m = 1; m <= revealedCount; m++) {
                    revealedNums.push(m * skipBy);
                }

                // Draw 10x10 grid
                for (var row = 0; row < 10; row++) {
                    for (var col = 0; col < 10; col++) {
                        var num = row * 10 + col + 1;
                        var cx = gridLeft + col * (cellSize + gap);
                        var cy = gridTop + row * (cellSize + gap);

                        var isMultiple = (num % skipBy === 0);
                        var isRevealed = revealedNums.indexOf(num) !== -1;
                        var isNewest = (revealedNums.length > 0 && num === revealedNums[revealedNums.length - 1]);

                        // Cell background
                        if (isRevealed) {
                            // Glowing highlighted cell
                            if (isNewest) {
                                // Pulsing glow for newest
                                var pulse = Math.sin(t / 150) * 0.3 + 0.7;
                                ctx.shadowColor = currentColor.bg;
                                ctx.shadowBlur = 20 * pulse;
                            }
                            ctx.fillStyle = currentColor.bg;
                            ctx.beginPath();
                            ctx.roundRect(cx, cy, cellSize, cellSize, 6);
                            ctx.fill();
                            ctx.shadowBlur = 0;
                        } else if (isMultiple && animProgress >= totalMultiples) {
                            // All revealed — show all multiples
                            ctx.fillStyle = currentColor.bg;
                            ctx.beginPath();
                            ctx.roundRect(cx, cy, cellSize, cellSize, 6);
                            ctx.fill();
                        } else {
                            // Normal cell
                            ctx.fillStyle = '#1a1a40';
                            ctx.beginPath();
                            ctx.roundRect(cx, cy, cellSize, cellSize, 6);
                            ctx.fill();
                        }

                        // Cell border
                        ctx.strokeStyle = isRevealed ? currentColor.bg : '#2a2a50';
                        ctx.lineWidth = isRevealed ? 2 : 1;
                        ctx.beginPath();
                        ctx.roundRect(cx, cy, cellSize, cellSize, 6);
                        ctx.stroke();

                        // Number text
                        if (isRevealed || (isMultiple && animProgress >= totalMultiples)) {
                            ctx.fillStyle = currentColor.text;
                            ctx.font = 'bold 16px -apple-system, sans-serif';
                        } else {
                            ctx.fillStyle = '#6a6a8a';
                            ctx.font = '14px -apple-system, sans-serif';
                        }
                        ctx.textAlign = 'center';
                        ctx.textBaseline = 'middle';
                        ctx.fillText(String(num), cx + cellSize / 2, cy + cellSize / 2);
                    }
                }

                // Show the skip counting sequence at the bottom
                var seqY = gridTop + 10 * (cellSize + gap) + 10;
                ctx.fillStyle = currentColor.bg;
                ctx.font = 'bold 14px -apple-system, sans-serif';
                ctx.textAlign = 'left';
                ctx.textBaseline = 'top';
                var seqText = revealedNums.join(', ');
                if (seqText.length > 80) {
                    seqText = seqText.substring(0, 77) + '...';
                }
                ctx.fillText('Sequence: ' + seqText, 20, seqY);
            }

            viz.animate(draw);
            return viz;
        }
    }
];

// ============================================================
// Section 5: Big Numbers — Nested Scale Squares
// ============================================================
window.EXTRA_VIZ['ch00']['ch00-sec05'] = [
    {
        id: 'ch00-extra-viz-5',
        title: 'How Big Are Big Numbers?',
        description: 'See how 1, 10, 100, and 1,000 compare in size! Use the slider to zoom in and out.',
        setup: function(container, controls) {
            var viz = new VizEngine(container, {
                width: 600, height: 420, scale: 1,
                originX: 0, originY: 0
            });

            var zoomLevel = 0; // 0=show all, 1=zoom to 100, 2=zoom to 10, 3=zoom to 1
            var targetZoom = 0;
            var currentZoom = 0; // animated zoom
            var autoAnimate = true;
            var autoTime = 0;
            var lastTime = null;

            // Zoom slider
            var zoomGroup = document.createElement('div');
            zoomGroup.className = 'viz-slider-group';
            var zoomLabel = document.createElement('span');
            zoomLabel.className = 'viz-slider-label';
            zoomLabel.textContent = 'Zoom: ';
            var zoomSlider = document.createElement('input');
            zoomSlider.type = 'range';
            zoomSlider.className = 'viz-slider';
            zoomSlider.min = '0';
            zoomSlider.max = '3';
            zoomSlider.step = '0.01';
            zoomSlider.value = '0';
            var zoomVal = document.createElement('span');
            zoomVal.className = 'viz-slider-value';
            zoomVal.textContent = 'All';
            zoomSlider.addEventListener('input', function() {
                targetZoom = parseFloat(zoomSlider.value);
                autoAnimate = false;
                var labels = ['All', '100s', '10s', '1s'];
                zoomVal.textContent = labels[Math.round(targetZoom)];
            });
            zoomGroup.appendChild(zoomLabel);
            zoomGroup.appendChild(zoomSlider);
            zoomGroup.appendChild(zoomVal);
            controls.appendChild(zoomGroup);

            // Auto-animate button
            var autoBtn = document.createElement('button');
            autoBtn.textContent = 'Auto Zoom';
            autoBtn.style.cssText = 'padding:6px 14px;border:1px solid #30363d;border-radius:6px;background:#3FB950;color:#ffffff;font-size:0.85rem;font-weight:bold;cursor:pointer;margin-left:8px;';
            autoBtn.addEventListener('click', function() {
                autoAnimate = !autoAnimate;
                autoTime = 0;
                lastTime = null;
                autoBtn.style.background = autoAnimate ? '#3FB950' : '#1a1a40';
                autoBtn.textContent = autoAnimate ? 'Stop Auto' : 'Auto Zoom';
            });
            controls.appendChild(autoBtn);

            var scaleColors = {
                1000: '#BC8CFF',
                100:  '#F0883E',
                10:   '#4ECDC4',
                1:    '#FFE66D'
            };

            function draw(t) {
                if (lastTime === null) lastTime = t;
                var dt = (t - lastTime) / 1000;
                lastTime = t;

                // Auto-animation: cycle through zoom levels
                if (autoAnimate) {
                    autoTime += dt;
                    // Cycle: 0 -> 1 -> 2 -> 3 -> 0, each level holds for 2 seconds
                    var cyclePos = (autoTime % 12); // 12 second cycle
                    if (cyclePos < 3) targetZoom = 0;
                    else if (cyclePos < 6) targetZoom = 1;
                    else if (cyclePos < 9) targetZoom = 2;
                    else targetZoom = 3;
                    zoomSlider.value = String(targetZoom);
                    var labels = ['All', '100s', '10s', '1s'];
                    zoomVal.textContent = labels[Math.round(targetZoom)];
                }

                // Smooth zoom animation
                currentZoom += (targetZoom - currentZoom) * Math.min(1, dt * 3);

                var ctx = viz.ctx;
                ctx.fillStyle = '#0c0c20';
                ctx.fillRect(0, 0, viz.width, viz.height);

                // Title
                ctx.fillStyle = '#f0f6fc';
                ctx.font = 'bold 18px -apple-system, sans-serif';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'top';
                ctx.fillText('How Big Are Big Numbers?', viz.width / 2, 8);

                // The "1" square at zoom=3 should be large and visible
                // At zoom=0, the "1000" square fills most of the canvas
                // We compute a scale factor based on zoom

                // Base: at zoom=0, 1000-square is 340px wide
                // 1000 -> 340px, 100 -> 34px, 10 -> 3.4px, 1 -> 0.34px
                // At zoom=3, 1-square is ~100px
                // So we need scale = 100 / 0.34 = ~294x magnification at zoom=3

                var baseSize = 340; // pixels for 1000 at zoom=0
                var zoomFactor = Math.pow(10, currentZoom); // 1, 10, 100, 1000
                var effectiveScale = baseSize * zoomFactor / 1000; // px per unit

                var centerX = viz.width / 2;
                var centerY = viz.height / 2 + 20;

                // Draw squares from largest to smallest
                var levels = [
                    { size: 1000, label: '1,000', color: scaleColors[1000] },
                    { size: 100,  label: '100',   color: scaleColors[100] },
                    { size: 10,   label: '10',    color: scaleColors[10] },
                    { size: 1,    label: '1',     color: scaleColors[1] }
                ];

                for (var i = 0; i < levels.length; i++) {
                    var level = levels[i];
                    var pixelSize = level.size * effectiveScale;

                    // Only draw if reasonably visible (> 1px) and fits in canvas
                    if (pixelSize < 0.5) continue;

                    var halfPx = pixelSize / 2;
                    var rx = centerX - halfPx;
                    var ry = centerY - halfPx;

                    // Don't draw if the square is way too big to see edges
                    if (pixelSize > viz.width * 4) continue;

                    // Draw filled square
                    ctx.fillStyle = level.color + '22';
                    ctx.strokeStyle = level.color;
                    ctx.lineWidth = Math.min(4, Math.max(1, pixelSize / 50));

                    // Clip to visible area
                    ctx.save();
                    ctx.beginPath();
                    ctx.rect(0, 35, viz.width, viz.height - 35);
                    ctx.clip();

                    ctx.fillRect(rx, ry, pixelSize, pixelSize);
                    ctx.strokeRect(rx, ry, pixelSize, pixelSize);

                    // Label the square if big enough
                    if (pixelSize > 25) {
                        var fontSize = Math.min(28, Math.max(10, pixelSize / 5));
                        ctx.fillStyle = level.color;
                        ctx.font = 'bold ' + Math.round(fontSize) + 'px -apple-system, sans-serif';
                        ctx.textAlign = 'center';
                        ctx.textBaseline = 'middle';

                        // Position label: inside the square near the edge
                        var labelX = centerX;
                        var labelY;
                        if (pixelSize > 200) {
                            // Put label near top of square
                            labelY = ry + fontSize + 10;
                        } else {
                            // Center it
                            labelY = centerY;
                        }
                        ctx.fillText(level.label, labelX, labelY);
                    }

                    ctx.restore();
                }

                // Draw legend at bottom
                var legendY = viz.height - 40;
                var legendStartX = 60;
                var legendSpacing = 140;

                for (var li = 0; li < levels.length; li++) {
                    var lx = legendStartX + li * legendSpacing;
                    var lev = levels[li];

                    // Color swatch
                    ctx.fillStyle = lev.color;
                    ctx.fillRect(lx, legendY, 16, 16);
                    ctx.strokeStyle = lev.color;
                    ctx.lineWidth = 1;
                    ctx.strokeRect(lx, legendY, 16, 16);

                    // Label
                    ctx.fillStyle = '#c9d1d9';
                    ctx.font = 'bold 13px -apple-system, sans-serif';
                    ctx.textAlign = 'left';
                    ctx.textBaseline = 'middle';
                    ctx.fillText(lev.label, lx + 22, legendY + 8);
                }

                // Show scale info
                ctx.fillStyle = '#6a6a8a';
                ctx.font = '12px -apple-system, sans-serif';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'bottom';
                var zoomNames = ['everything', 'hundreds', 'tens', 'ones'];
                var nearestZoom = Math.round(currentZoom);
                ctx.fillText('Zoomed in to see ' + zoomNames[nearestZoom], viz.width / 2, viz.height - 4);
            }

            viz.animate(draw);
            return viz;
        }
    }
];
