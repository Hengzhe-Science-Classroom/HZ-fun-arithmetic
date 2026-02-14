window.EXTRA_VIZ = window.EXTRA_VIZ || {};
window.EXTRA_VIZ['ch01'] = window.EXTRA_VIZ['ch01'] || {};

// =============================================================================
// Section 1: What Is Addition? — Apple Basket Visualizer
// =============================================================================
window.EXTRA_VIZ['ch01']['ch01-sec01'] = [
    {
        id: 'ch01-extra-viz-1',
        title: 'Apple Basket: See Addition Happen!',
        description: 'Use the sliders to pick how many apples are in each group. Watch them merge together!',
        setup: function(container, controls) {
            var viz = new VizEngine(container, {width: 560, height: 400, scale: 40});
            // Place origin bottom-center so y=0 is at the bottom
            viz.originX = 280;
            viz.originY = 370;

            var groupA = 3;
            var groupB = 4;
            var mergeProgress = 0;   // 0 = separated, 1 = fully merged
            var animating = false;
            var animDir = 1; // 1 = merge, -1 = separate

            // Slider for Group A
            var sliderA = document.createElement('input');
            sliderA.type = 'range'; sliderA.min = '0'; sliderA.max = '10'; sliderA.value = '3';
            sliderA.className = 'viz-slider'; sliderA.step = '1';
            var labelA = document.createElement('span');
            labelA.className = 'viz-slider-label';
            labelA.textContent = 'Group A: 3';
            labelA.style.color = '#f85149';
            controls.appendChild(labelA);
            controls.appendChild(sliderA);

            // Slider for Group B
            var sliderB = document.createElement('input');
            sliderB.type = 'range'; sliderB.min = '0'; sliderB.max = '10'; sliderB.value = '4';
            sliderB.className = 'viz-slider'; sliderB.step = '1';
            var labelB = document.createElement('span');
            labelB.className = 'viz-slider-label';
            labelB.textContent = 'Group B: 4';
            labelB.style.color = '#58a6ff';
            controls.appendChild(labelB);
            controls.appendChild(sliderB);

            // Merge / Separate button
            var mergeBtn = document.createElement('button');
            mergeBtn.textContent = 'Merge Together!';
            mergeBtn.style.cssText = 'padding:6px 16px;background:#3fb950;border:1px solid #30363d;color:#fff;border-radius:6px;cursor:pointer;font-size:14px;font-weight:bold;margin-left:8px;';
            controls.appendChild(mergeBtn);

            sliderA.addEventListener('input', function() {
                groupA = parseInt(sliderA.value);
                labelA.textContent = 'Group A: ' + groupA;
                mergeProgress = 0;
                mergeBtn.textContent = 'Merge Together!';
                draw();
            });
            sliderB.addEventListener('input', function() {
                groupB = parseInt(sliderB.value);
                labelB.textContent = 'Group B: ' + groupB;
                mergeProgress = 0;
                mergeBtn.textContent = 'Merge Together!';
                draw();
            });

            mergeBtn.addEventListener('click', function() {
                if (animating) return;
                if (mergeProgress < 0.5) {
                    animDir = 1;
                    mergeBtn.textContent = 'Separate!';
                } else {
                    animDir = -1;
                    mergeBtn.textContent = 'Merge Together!';
                }
                animating = true;
            });

            // Apple positions for a group arranged in a nice cluster
            function getApplePositions(count, centerX, centerY, radius) {
                var positions = [];
                if (count === 0) return positions;
                if (count === 1) { positions.push([centerX, centerY]); return positions; }
                // Arrange in rows
                var cols = Math.ceil(Math.sqrt(count));
                var rows = Math.ceil(count / cols);
                var spacing = radius * 2.6;
                for (var i = 0; i < count; i++) {
                    var row = Math.floor(i / cols);
                    var col = i % cols;
                    var rowCount = (row < rows - 1) ? cols : (count - cols * (rows - 1));
                    var x = centerX + (col - (rowCount - 1) / 2) * spacing;
                    var y = centerY + (row - (rows - 1) / 2) * spacing;
                    positions.push([x, y]);
                }
                return positions;
            }

            function drawApple(sx, sy, r, color, shine) {
                var ctx = viz.ctx;
                // Shadow
                ctx.fillStyle = 'rgba(0,0,0,0.25)';
                ctx.beginPath(); ctx.ellipse(sx + 2, sy + r * 0.7, r * 0.8, r * 0.3, 0, 0, Math.PI * 2); ctx.fill();
                // Body
                ctx.fillStyle = color;
                ctx.beginPath(); ctx.arc(sx, sy, r, 0, Math.PI * 2); ctx.fill();
                // Shine
                ctx.fillStyle = shine || 'rgba(255,255,255,0.35)';
                ctx.beginPath(); ctx.arc(sx - r * 0.25, sy - r * 0.3, r * 0.35, 0, Math.PI * 2); ctx.fill();
                // Stem
                ctx.strokeStyle = '#5d4e37';
                ctx.lineWidth = 2;
                ctx.beginPath(); ctx.moveTo(sx, sy - r); ctx.lineTo(sx + 2, sy - r - 6); ctx.stroke();
                // Leaf
                ctx.fillStyle = '#3fb950';
                ctx.beginPath();
                ctx.ellipse(sx + 5, sy - r - 4, 5, 3, 0.6, 0, Math.PI * 2);
                ctx.fill();
            }

            function draw() {
                viz.clear();
                var ctx = viz.ctx;

                var total = groupA + groupB;
                var appleR = 16;

                // Title
                ctx.fillStyle = viz.colors.white;
                ctx.font = 'bold 22px -apple-system, sans-serif';
                ctx.textAlign = 'center'; ctx.textBaseline = 'top';
                ctx.fillText('What Is Addition?', 280, 12);

                if (mergeProgress < 0.5) {
                    // Draw two separate groups
                    // Group A on the left
                    var posA = getApplePositions(groupA, 130, 190, appleR);
                    // Group B on the right
                    var posB = getApplePositions(groupB, 430, 190, appleR);

                    // Lerp toward merged positions
                    var mergedPos = getApplePositions(total, 280, 200, appleR);

                    for (var i = 0; i < groupA; i++) {
                        var sx = posA[i][0] + (mergedPos[i] ? (mergedPos[i][0] - posA[i][0]) : 0) * mergeProgress * 2;
                        var sy = posA[i][1] + (mergedPos[i] ? (mergedPos[i][1] - posA[i][1]) : 0) * mergeProgress * 2;
                        drawApple(sx, sy, appleR, '#f85149');
                    }
                    for (var j = 0; j < groupB; j++) {
                        var mi = groupA + j;
                        var sx2 = posB[j][0] + (mergedPos[mi] ? (mergedPos[mi][0] - posB[j][0]) : 0) * mergeProgress * 2;
                        var sy2 = posB[j][1] + (mergedPos[mi] ? (mergedPos[mi][1] - posB[j][1]) : 0) * mergeProgress * 2;
                        drawApple(sx2, sy2, appleR, '#58a6ff');
                    }

                    // Labels
                    ctx.font = 'bold 18px -apple-system, sans-serif';
                    ctx.textAlign = 'center'; ctx.textBaseline = 'top';
                    ctx.fillStyle = '#f85149';
                    ctx.fillText('Group A: ' + groupA, 130, 295);
                    ctx.fillStyle = '#58a6ff';
                    ctx.fillText('Group B: ' + groupB, 430, 295);

                    // Plus sign
                    ctx.fillStyle = '#d29922';
                    ctx.font = 'bold 36px -apple-system, sans-serif';
                    ctx.fillText('+', 280, 175);

                } else {
                    // Draw merged group
                    var mergedAll = getApplePositions(total, 280, 190, appleR);
                    var posASep = getApplePositions(groupA, 130, 190, appleR);
                    var posBSep = getApplePositions(groupB, 430, 190, appleR);

                    var t = (mergeProgress - 0.5) * 2; // 0 to 1 for second half

                    for (var i2 = 0; i2 < groupA; i2++) {
                        var fromX = posASep[i2] ? posASep[i2][0] : mergedAll[i2][0];
                        var fromY = posASep[i2] ? posASep[i2][1] : mergedAll[i2][1];
                        var toX = mergedAll[i2][0];
                        var toY = mergedAll[i2][1];
                        var cx = fromX + (toX - fromX) * t;
                        var cy = fromY + (toY - fromY) * t;
                        drawApple(cx, cy, appleR, '#f85149');
                    }
                    for (var j2 = 0; j2 < groupB; j2++) {
                        var mi2 = groupA + j2;
                        var fromX2 = posBSep[j2] ? posBSep[j2][0] : mergedAll[mi2][0];
                        var fromY2 = posBSep[j2] ? posBSep[j2][1] : mergedAll[mi2][1];
                        var toX2 = mergedAll[mi2][0];
                        var toY2 = mergedAll[mi2][1];
                        var cx2 = fromX2 + (toX2 - fromX2) * t;
                        var cy2 = fromY2 + (toY2 - fromY2) * t;
                        drawApple(cx2, cy2, appleR, '#58a6ff');
                    }
                }

                // Equation at the bottom
                ctx.font = 'bold 28px -apple-system, sans-serif';
                ctx.textAlign = 'center'; ctx.textBaseline = 'top';
                ctx.fillStyle = '#f85149';
                ctx.fillText(groupA, 195, 335);
                ctx.fillStyle = '#d29922';
                ctx.fillText(' + ', 230, 335);
                ctx.fillStyle = '#58a6ff';
                ctx.fillText(groupB, 265, 335);
                ctx.fillStyle = '#c9d1d9';
                ctx.fillText(' = ', 300, 335);
                ctx.fillStyle = '#3fb950';
                ctx.fillText(total, 340, 335);

                // Sparkle effect when fully merged
                if (mergeProgress > 0.95) {
                    var time = Date.now() * 0.003;
                    var sparkleColors = ['#f0883e', '#d29922', '#3fb950', '#58a6ff', '#f85149', '#bc8cff'];
                    for (var s = 0; s < 8; s++) {
                        var angle = (s / 8) * Math.PI * 2 + time;
                        var dist = 25 + Math.sin(time * 2 + s) * 10;
                        var spx = 340 + Math.cos(angle) * dist;
                        var spy = 350 + Math.sin(angle) * dist;
                        var sr = 2 + Math.sin(time * 3 + s) * 1.5;
                        ctx.fillStyle = sparkleColors[s % sparkleColors.length];
                        ctx.beginPath(); ctx.arc(spx, spy, sr, 0, Math.PI * 2); ctx.fill();
                    }
                }
            }

            viz.animate(function() {
                if (animating) {
                    mergeProgress += animDir * 0.02;
                    if (mergeProgress >= 1) { mergeProgress = 1; animating = false; }
                    if (mergeProgress <= 0) { mergeProgress = 0; animating = false; }
                }
                draw();
            });

            return viz;
        }
    }
];

// =============================================================================
// Section 2: Adding on the Number Line
// =============================================================================
window.EXTRA_VIZ['ch01']['ch01-sec02'] = [
    {
        id: 'ch01-extra-viz-2',
        title: 'Number Line Hopper',
        description: 'Pick two numbers and watch the frog hop along the number line to find the sum!',
        setup: function(container, controls) {
            var viz = new VizEngine(container, {width: 560, height: 400, scale: 40});
            viz.originX = 30;
            viz.originY = 250;

            var numA = 5;
            var numB = 3;
            var hopProgress = 0; // 0..numB (which hop we are on, fractional = in-flight)
            var animating = false;
            var hopPhase = 0; // for the bouncy arc

            // Slider for first number
            var sliderA = document.createElement('input');
            sliderA.type = 'range'; sliderA.min = '0'; sliderA.max = '20'; sliderA.value = '5';
            sliderA.className = 'viz-slider'; sliderA.step = '1';
            var labelA = document.createElement('span');
            labelA.className = 'viz-slider-label';
            labelA.textContent = 'Start: 5';
            labelA.style.color = '#3fb950';
            controls.appendChild(labelA);
            controls.appendChild(sliderA);

            // Slider for second number
            var sliderB = document.createElement('input');
            sliderB.type = 'range'; sliderB.min = '0'; sliderB.max = '20'; sliderB.value = '3';
            sliderB.className = 'viz-slider'; sliderB.step = '1';
            var labelB = document.createElement('span');
            labelB.className = 'viz-slider-label';
            labelB.textContent = 'Jump: 3';
            labelB.style.color = '#f0883e';
            controls.appendChild(labelB);
            controls.appendChild(sliderB);

            // Hop button
            var hopBtn = document.createElement('button');
            hopBtn.textContent = 'Hop!';
            hopBtn.style.cssText = 'padding:6px 18px;background:#3fb9a0;border:1px solid #30363d;color:#fff;border-radius:6px;cursor:pointer;font-size:14px;font-weight:bold;margin-left:8px;';
            controls.appendChild(hopBtn);

            sliderA.addEventListener('input', function() {
                numA = parseInt(sliderA.value);
                labelA.textContent = 'Start: ' + numA;
                hopProgress = 0;
                animating = false;
            });
            sliderB.addEventListener('input', function() {
                numB = parseInt(sliderB.value);
                labelB.textContent = 'Jump: ' + numB;
                hopProgress = 0;
                animating = false;
            });

            hopBtn.addEventListener('click', function() {
                hopProgress = 0;
                animating = true;
                hopPhase = 0;
            });

            // Scale factor: we need 0..40 to fit in 560px
            // Available width: 560 - 30 (left margin) = 530
            // So each unit = 530 / 42 ~= 12.6px
            var unitPx = 24;
            var nlY = 250; // number line y position (screen)
            var nlLeft = 30; // screen x for 0

            function numToSx(n) { return nlLeft + n * unitPx; }

            function drawFrog(sx, sy, size) {
                var ctx = viz.ctx;
                // Body
                ctx.fillStyle = '#3fb950';
                ctx.beginPath(); ctx.ellipse(sx, sy - size * 0.5, size * 0.7, size * 0.5, 0, 0, Math.PI * 2); ctx.fill();
                // Eyes
                ctx.fillStyle = '#ffffff';
                ctx.beginPath(); ctx.arc(sx - size * 0.3, sy - size * 0.9, size * 0.22, 0, Math.PI * 2); ctx.fill();
                ctx.beginPath(); ctx.arc(sx + size * 0.3, sy - size * 0.9, size * 0.22, 0, Math.PI * 2); ctx.fill();
                // Pupils
                ctx.fillStyle = '#0c0c20';
                ctx.beginPath(); ctx.arc(sx - size * 0.28, sy - size * 0.88, size * 0.1, 0, Math.PI * 2); ctx.fill();
                ctx.beginPath(); ctx.arc(sx + size * 0.32, sy - size * 0.88, size * 0.1, 0, Math.PI * 2); ctx.fill();
                // Smile
                ctx.strokeStyle = '#0c0c20'; ctx.lineWidth = 1.5;
                ctx.beginPath(); ctx.arc(sx, sy - size * 0.45, size * 0.25, 0.1 * Math.PI, 0.9 * Math.PI); ctx.stroke();
            }

            function draw() {
                viz.clear();
                var ctx = viz.ctx;

                // Determine how many numbers fit on screen
                var maxNum = Math.min(Math.max(numA + numB + 3, 22), 42);
                unitPx = Math.min(24, (viz.width - 60) / maxNum);

                // Title
                ctx.fillStyle = viz.colors.white;
                ctx.font = 'bold 20px -apple-system, sans-serif';
                ctx.textAlign = 'center'; ctx.textBaseline = 'top';
                ctx.fillText('Number Line Addition', 280, 10);

                // Draw number line
                var lineY = nlY;
                ctx.strokeStyle = '#4a4a7a';
                ctx.lineWidth = 3;
                ctx.beginPath();
                ctx.moveTo(nlLeft - 5, lineY);
                ctx.lineTo(numToSx(maxNum) + 10, lineY);
                ctx.stroke();

                // Arrow at end
                ctx.fillStyle = '#4a4a7a';
                ctx.beginPath();
                ctx.moveTo(numToSx(maxNum) + 15, lineY);
                ctx.lineTo(numToSx(maxNum) + 5, lineY - 6);
                ctx.lineTo(numToSx(maxNum) + 5, lineY + 6);
                ctx.closePath(); ctx.fill();

                // Tick marks and numbers
                for (var i = 0; i <= maxNum; i++) {
                    var tx = numToSx(i);
                    ctx.strokeStyle = '#4a4a7a'; ctx.lineWidth = 1.5;
                    ctx.beginPath(); ctx.moveTo(tx, lineY - 8); ctx.lineTo(tx, lineY + 8); ctx.stroke();
                    ctx.fillStyle = '#8b949e';
                    ctx.font = '11px -apple-system, sans-serif';
                    ctx.textAlign = 'center'; ctx.textBaseline = 'top';
                    // Show every number if enough space, otherwise skip
                    if (unitPx >= 16 || i % 2 === 0 || i === numA || i === numA + numB) {
                        ctx.fillText(i, tx, lineY + 12);
                    }
                }

                // Highlight start point
                ctx.fillStyle = '#3fb950';
                ctx.beginPath(); ctx.arc(numToSx(numA), lineY, 6, 0, Math.PI * 2); ctx.fill();
                ctx.font = 'bold 14px -apple-system, sans-serif';
                ctx.textBaseline = 'bottom';
                ctx.fillText('Start: ' + numA, numToSx(numA), lineY - 60);

                // How many complete hops done?
                var completedHops = Math.floor(hopProgress);
                var fractionalHop = hopProgress - completedHops;

                // Draw completed hop arcs
                for (var h = 0; h < completedHops && h < numB; h++) {
                    var startX = numToSx(numA + h);
                    var endX = numToSx(numA + h + 1);
                    drawArc(ctx, startX, endX, lineY, '#f0883e', 1.0, h);
                }

                // Draw current hop arc (in progress)
                if (completedHops < numB && animating) {
                    var cStartX = numToSx(numA + completedHops);
                    var cEndX = numToSx(numA + completedHops + 1);
                    drawArc(ctx, cStartX, cEndX, lineY, '#f0883e', fractionalHop, completedHops);
                }

                // Draw frog at current position
                var frogN;
                if (!animating && hopProgress === 0) {
                    frogN = numA;
                } else if (completedHops >= numB) {
                    frogN = numA + numB;
                } else {
                    // Frog is mid-hop
                    frogN = numA + completedHops + fractionalHop;
                }

                var frogX = numToSx(frogN);
                // Bounce height during hop
                var bounceH = 0;
                if (animating && completedHops < numB) {
                    bounceH = Math.sin(fractionalHop * Math.PI) * 45;
                }
                drawFrog(frogX, lineY - bounceH - 5, 14);

                // Draw landing point when done
                if (completedHops >= numB && numB > 0) {
                    ctx.fillStyle = '#f0883e';
                    ctx.beginPath(); ctx.arc(numToSx(numA + numB), lineY, 6, 0, Math.PI * 2); ctx.fill();

                    // Landing label
                    ctx.font = 'bold 14px -apple-system, sans-serif';
                    ctx.textBaseline = 'bottom';
                    ctx.fillStyle = '#f0883e';
                    ctx.fillText('Land: ' + (numA + numB), numToSx(numA + numB), lineY - 60);

                    // Jump size label (centered over arcs)
                    ctx.fillStyle = '#d29922';
                    ctx.font = 'bold 16px -apple-system, sans-serif';
                    ctx.textBaseline = 'bottom';
                    var midArc = (numToSx(numA) + numToSx(numA + numB)) / 2;
                    ctx.fillText('+' + numB, midArc, lineY - 80);
                }

                // Equation at bottom
                var eqY = 330;
                ctx.font = 'bold 26px -apple-system, sans-serif';
                ctx.textAlign = 'center'; ctx.textBaseline = 'top';
                ctx.fillStyle = '#3fb950';
                ctx.fillText(numA, 200, eqY);
                ctx.fillStyle = '#d29922';
                ctx.fillText(' + ', 240, eqY);
                ctx.fillStyle = '#f0883e';
                ctx.fillText(numB, 280, eqY);
                ctx.fillStyle = '#c9d1d9';
                ctx.fillText(' = ', 320, eqY);
                ctx.fillStyle = '#58a6ff';
                ctx.fillText(numA + numB, 365, eqY);

                // Sparkle when complete
                if (completedHops >= numB && numB > 0) {
                    var time = Date.now() * 0.004;
                    var sparkColors = ['#f0883e', '#d29922', '#3fb950', '#58a6ff', '#bc8cff'];
                    for (var sp = 0; sp < 5; sp++) {
                        var sa = (sp / 5) * Math.PI * 2 + time;
                        var sd = 18 + Math.sin(time * 2 + sp) * 6;
                        var spx2 = 365 + Math.cos(sa) * sd;
                        var spy2 = eqY + 16 + Math.sin(sa) * sd;
                        ctx.fillStyle = sparkColors[sp];
                        ctx.beginPath(); ctx.arc(spx2, spy2, 2.5, 0, Math.PI * 2); ctx.fill();
                    }
                }
            }

            function drawArc(ctx, startX, endX, y, color, progress, hopIndex) {
                var midX = (startX + endX) / 2;
                var arcHeight = 35 + (hopIndex % 2) * 5; // slight variation
                ctx.strokeStyle = color;
                ctx.lineWidth = 2.5;
                ctx.beginPath();
                var steps = Math.floor(progress * 30);
                for (var s = 0; s <= steps; s++) {
                    var t = s / 30;
                    var x = startX + (endX - startX) * t;
                    var yOff = -Math.sin(t * Math.PI) * arcHeight;
                    if (s === 0) ctx.moveTo(x, y + yOff);
                    else ctx.lineTo(x, y + yOff);
                }
                ctx.stroke();

                // Arrow at tip if complete
                if (progress > 0.9) {
                    ctx.fillStyle = color;
                    ctx.beginPath();
                    ctx.moveTo(endX, y);
                    ctx.lineTo(endX - 4, y - 6);
                    ctx.lineTo(endX + 4, y - 6);
                    ctx.closePath(); ctx.fill();
                }

                // Hop number label
                if (progress > 0.3) {
                    ctx.fillStyle = '#d29922';
                    ctx.font = 'bold 12px -apple-system, sans-serif';
                    ctx.textAlign = 'center'; ctx.textBaseline = 'bottom';
                    ctx.fillText('+1', midX, y - arcHeight - 2);
                }
            }

            viz.animate(function() {
                if (animating) {
                    hopProgress += 0.035;
                    if (hopProgress >= numB) {
                        hopProgress = numB;
                        animating = false;
                    }
                }
                draw();
            });

            return viz;
        }
    }
];

// =============================================================================
// Section 3: Addition Strategies — Make Ten Visualizer
// =============================================================================
window.EXTRA_VIZ['ch01']['ch01-sec03'] = [
    {
        id: 'ch01-extra-viz-3',
        title: 'Make Ten Strategy',
        description: 'Pick two numbers to add. Watch the dots fill a ten-frame, then see the leftover!',
        setup: function(container, controls) {
            var viz = new VizEngine(container, {width: 560, height: 420, scale: 40});

            var numA = 8;
            var numB = 5;
            var animProgress = 0; // 0 = start, 1 = dots moved into frame, 2 = done
            var animating = false;
            var animT = 0;

            // Slider for first number
            var sliderA = document.createElement('input');
            sliderA.type = 'range'; sliderA.min = '1'; sliderA.max = '10'; sliderA.value = '8';
            sliderA.className = 'viz-slider'; sliderA.step = '1';
            var labelA = document.createElement('span');
            labelA.className = 'viz-slider-label';
            labelA.textContent = 'First number: 8';
            labelA.style.color = '#f0883e';
            controls.appendChild(labelA);
            controls.appendChild(sliderA);

            // Slider for second number
            var sliderB = document.createElement('input');
            sliderB.type = 'range'; sliderB.min = '1'; sliderB.max = '10'; sliderB.value = '5';
            sliderB.className = 'viz-slider'; sliderB.step = '1';
            var labelB = document.createElement('span');
            labelB.className = 'viz-slider-label';
            labelB.textContent = 'Second number: 5';
            labelB.style.color = '#58a6ff';
            controls.appendChild(labelB);
            controls.appendChild(sliderB);

            // Make Ten button
            var goBtn = document.createElement('button');
            goBtn.textContent = 'Make Ten!';
            goBtn.style.cssText = 'padding:6px 18px;background:#d29922;border:1px solid #30363d;color:#fff;border-radius:6px;cursor:pointer;font-size:14px;font-weight:bold;margin-left:8px;';
            controls.appendChild(goBtn);

            sliderA.addEventListener('input', function() {
                numA = parseInt(sliderA.value);
                labelA.textContent = 'First number: ' + numA;
                animProgress = 0; animT = 0; animating = false;
            });
            sliderB.addEventListener('input', function() {
                numB = parseInt(sliderB.value);
                labelB.textContent = 'Second number: ' + numB;
                animProgress = 0; animT = 0; animating = false;
            });

            goBtn.addEventListener('click', function() {
                animProgress = 0; animT = 0; animating = true;
            });

            // Ten-frame: 2 rows x 5 columns
            var frameLeft = 100;
            var frameTop = 80;
            var cellSize = 44;
            var dotR = 16;

            function getCellCenter(index) {
                // index 0..9 for ten-frame
                var col = index % 5;
                var row = Math.floor(index / 5);
                return [frameLeft + col * cellSize + cellSize / 2, frameTop + row * cellSize + cellSize / 2];
            }

            // Overflow area (dots that don't fit in the ten-frame)
            var overflowLeft = frameLeft + 5 * cellSize + 50;
            var overflowTop = frameTop + 10;

            function getOverflowPos(index) {
                var col = index % 3;
                var row = Math.floor(index / 3);
                return [overflowLeft + col * cellSize + cellSize / 2, overflowTop + row * cellSize + cellSize / 2];
            }

            // Waiting area for numB dots (before animation)
            var waitLeft = 100;
            var waitTop = frameTop + 2 * cellSize + 50;

            function getWaitPos(index) {
                var col = index % 5;
                var row = Math.floor(index / 5);
                return [waitLeft + col * cellSize + cellSize / 2, waitTop + row * cellSize + cellSize / 2];
            }

            function draw() {
                viz.clear();
                var ctx = viz.ctx;

                // Title
                ctx.fillStyle = viz.colors.white;
                ctx.font = 'bold 20px -apple-system, sans-serif';
                ctx.textAlign = 'center'; ctx.textBaseline = 'top';
                ctx.fillText('Make Ten Strategy', 280, 10);

                // How many of numA fit in frame
                var aInFrame = Math.min(numA, 10);
                var slotsLeft = 10 - aInFrame;   // how many slots are empty in the ten-frame
                var bToMove = Math.min(numB, slotsLeft); // how many B dots move into frame
                var bLeftover = numB - bToMove;           // dots that stay outside

                // Draw ten-frame grid
                ctx.strokeStyle = '#4a4a7a';
                ctx.lineWidth = 2;
                for (var r = 0; r < 2; r++) {
                    for (var c = 0; c < 5; c++) {
                        var cx0 = frameLeft + c * cellSize;
                        var cy0 = frameTop + r * cellSize;
                        ctx.strokeRect(cx0, cy0, cellSize, cellSize);
                    }
                }

                // Label the ten-frame
                ctx.fillStyle = '#8b949e';
                ctx.font = '12px -apple-system, sans-serif';
                ctx.textAlign = 'center';
                ctx.fillText('Ten-Frame', frameLeft + 2.5 * cellSize, frameTop - 14);

                // Draw numA dots in the frame (always in place)
                for (var a = 0; a < aInFrame; a++) {
                    var pos = getCellCenter(a);
                    ctx.fillStyle = '#f0883e';
                    ctx.beginPath(); ctx.arc(pos[0], pos[1], dotR, 0, Math.PI * 2); ctx.fill();
                    // Shine
                    ctx.fillStyle = 'rgba(255,255,255,0.3)';
                    ctx.beginPath(); ctx.arc(pos[0] - 4, pos[1] - 4, dotR * 0.3, 0, Math.PI * 2); ctx.fill();
                }

                // Draw numB dots
                for (var b = 0; b < numB; b++) {
                    var isMoving = b < bToMove;
                    var startPos, endPos, dotPos;

                    if (isMoving) {
                        startPos = getWaitPos(b);
                        endPos = getCellCenter(aInFrame + b);
                        var t = Math.max(0, Math.min(1, animT));
                        // Ease in-out
                        var ease = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
                        dotPos = [
                            startPos[0] + (endPos[0] - startPos[0]) * ease,
                            startPos[1] + (endPos[1] - startPos[1]) * ease
                        ];
                    } else {
                        // Leftover: move to overflow area
                        startPos = getWaitPos(b);
                        endPos = getOverflowPos(b - bToMove);
                        var t2 = Math.max(0, Math.min(1, animT));
                        var ease2 = t2 < 0.5 ? 2 * t2 * t2 : 1 - Math.pow(-2 * t2 + 2, 2) / 2;
                        dotPos = [
                            startPos[0] + (endPos[0] - startPos[0]) * ease2,
                            startPos[1] + (endPos[1] - startPos[1]) * ease2
                        ];
                    }

                    ctx.fillStyle = '#58a6ff';
                    ctx.beginPath(); ctx.arc(dotPos[0], dotPos[1], dotR, 0, Math.PI * 2); ctx.fill();
                    ctx.fillStyle = 'rgba(255,255,255,0.3)';
                    ctx.beginPath(); ctx.arc(dotPos[0] - 4, dotPos[1] - 4, dotR * 0.3, 0, Math.PI * 2); ctx.fill();
                }

                // Draw overflow area label if there are leftovers and animation is progressing
                if (bLeftover > 0 && animT > 0.3) {
                    ctx.fillStyle = '#8b949e';
                    ctx.font = '12px -apple-system, sans-serif';
                    ctx.textAlign = 'center';
                    ctx.fillText('Leftover', overflowLeft + 0.5 * cellSize, overflowTop - 18);
                }

                // Draw the equation steps at the bottom
                var eqY = 310;
                ctx.font = 'bold 22px -apple-system, sans-serif';
                ctx.textAlign = 'center';

                var total = numA + numB;
                var filledTo10 = Math.min(numA + bToMove, 10);

                // Step 1: a + b
                ctx.fillStyle = '#f0883e';
                ctx.fillText(numA, 90, eqY);
                ctx.fillStyle = '#d29922';
                ctx.fillText('+', 120, eqY);
                ctx.fillStyle = '#58a6ff';
                ctx.fillText(numB, 150, eqY);

                if (animT > 0.2 && slotsLeft > 0 && numB > 0) {
                    // Step 2: a + split = a + (move) + (leftover)
                    ctx.fillStyle = '#c9d1d9';
                    ctx.fillText('=', 185, eqY);
                    ctx.fillStyle = '#f0883e';
                    ctx.fillText(numA, 220, eqY);
                    ctx.fillStyle = '#d29922';
                    ctx.fillText('+', 250, eqY);
                    ctx.fillStyle = '#58a6ff';
                    ctx.fillText(bToMove, 275, eqY);
                    if (bLeftover > 0) {
                        ctx.fillStyle = '#d29922';
                        ctx.fillText('+', 305, eqY);
                        ctx.fillStyle = '#58a6ff';
                        ctx.fillText(bLeftover, 335, eqY);
                    }
                }

                if (animT > 0.6 && slotsLeft > 0 && numB > 0) {
                    // Step 3: = 10 + leftover = total
                    var eqY2 = eqY + 40;
                    ctx.fillStyle = '#c9d1d9';
                    ctx.fillText('=', 185, eqY2);
                    ctx.fillStyle = '#3fb950';
                    ctx.font = 'bold 24px -apple-system, sans-serif';
                    ctx.fillText(filledTo10, 225, eqY2);
                    if (bLeftover > 0) {
                        ctx.fillStyle = '#d29922';
                        ctx.font = 'bold 22px -apple-system, sans-serif';
                        ctx.fillText('+', 260, eqY2);
                        ctx.fillStyle = '#58a6ff';
                        ctx.fillText(bLeftover, 290, eqY2);
                    }
                    ctx.fillStyle = '#c9d1d9';
                    ctx.font = 'bold 22px -apple-system, sans-serif';
                    ctx.fillText('=', 325, eqY2);
                    ctx.fillStyle = '#bc8cff';
                    ctx.font = 'bold 28px -apple-system, sans-serif';
                    ctx.fillText(total, 370, eqY2 - 2);
                }

                // When total <= 10 and no split needed
                if (slotsLeft >= numB && animT > 0.4) {
                    // Fits entirely: just show sum
                    var eqY3 = eqY + 40;
                    ctx.fillStyle = '#c9d1d9';
                    ctx.font = 'bold 22px -apple-system, sans-serif';
                    ctx.fillText('=', 185, eqY3);
                    ctx.fillStyle = '#bc8cff';
                    ctx.font = 'bold 28px -apple-system, sans-serif';
                    ctx.fillText(total, 230, eqY3 - 2);
                    if (total <= 10) {
                        ctx.fillStyle = '#3fb950';
                        ctx.font = '16px -apple-system, sans-serif';
                        ctx.fillText('Fits in the ten-frame!', 350, eqY3);
                    }
                }

                // Sparkles when done
                if (animT >= 1) {
                    var time = Date.now() * 0.004;
                    var sparkColors2 = ['#f0883e', '#d29922', '#3fb950', '#58a6ff', '#bc8cff', '#f85149'];
                    for (var sp2 = 0; sp2 < 6; sp2++) {
                        var ang2 = (sp2 / 6) * Math.PI * 2 + time;
                        var dist2 = 20 + Math.sin(time * 2 + sp2) * 8;
                        var sx2 = (slotsLeft >= numB ? 230 : 370) + Math.cos(ang2) * dist2;
                        var sy2 = (eqY + 38) + Math.sin(ang2) * dist2;
                        ctx.fillStyle = sparkColors2[sp2];
                        ctx.beginPath(); ctx.arc(sx2, sy2, 2.5, 0, Math.PI * 2); ctx.fill();
                    }
                }
            }

            viz.animate(function() {
                if (animating) {
                    animT += 0.012;
                    if (animT >= 1) {
                        animT = 1;
                        animating = false;
                    }
                }
                draw();
            });

            return viz;
        }
    }
];

// =============================================================================
// Section 4: Carrying — Multi-Digit Addition with Animated Carrying
// =============================================================================
window.EXTRA_VIZ['ch01']['ch01-sec04'] = [
    {
        id: 'ch01-extra-viz-4',
        title: 'Column Addition with Carrying',
        description: 'Watch the step-by-step column addition with carrying! Click Next Step to see each part.',
        setup: function(container, controls) {
            var viz = new VizEngine(container, {width: 560, height: 420, scale: 40});

            // Preset numbers (user can cycle through examples)
            var presets = [
                [347, 285],
                [456, 378],
                [189, 643],
                [275, 468],
                [594, 237],
                [128, 999],
                [761, 159]
            ];
            var presetIdx = 0;
            var num1 = presets[0][0];
            var num2 = presets[0][1];

            var step = 0; // 0..6: nothing, ones, ones-carry, tens, tens-carry, hundreds, hundreds-carry/done
            var animT = 0;
            var animating = false;

            // Next Step button
            var nextBtn = document.createElement('button');
            nextBtn.textContent = 'Next Step';
            nextBtn.style.cssText = 'padding:6px 18px;background:#58a6ff;border:1px solid #30363d;color:#fff;border-radius:6px;cursor:pointer;font-size:14px;font-weight:bold;margin-right:8px;';
            controls.appendChild(nextBtn);

            // Reset button
            var resetBtn = document.createElement('button');
            resetBtn.textContent = 'Reset';
            resetBtn.style.cssText = 'padding:6px 14px;background:#1a1a40;border:1px solid #30363d;color:#c9d1d9;border-radius:6px;cursor:pointer;font-size:13px;margin-right:8px;';
            controls.appendChild(resetBtn);

            // New Problem button
            var newBtn = document.createElement('button');
            newBtn.textContent = 'New Problem';
            newBtn.style.cssText = 'padding:6px 14px;background:#3fb950;border:1px solid #30363d;color:#fff;border-radius:6px;cursor:pointer;font-size:13px;';
            controls.appendChild(newBtn);

            nextBtn.addEventListener('click', function() {
                if (animating) return;
                if (step < 7) { step++; animT = 0; animating = true; }
            });

            resetBtn.addEventListener('click', function() {
                step = 0; animT = 0; animating = false;
            });

            newBtn.addEventListener('click', function() {
                presetIdx = (presetIdx + 1) % presets.length;
                num1 = presets[presetIdx][0];
                num2 = presets[presetIdx][1];
                step = 0; animT = 0; animating = false;
            });

            // Extract digits
            function getDigits(n) {
                return [Math.floor(n / 100) % 10, Math.floor(n / 10) % 10, n % 10];
            }

            function draw() {
                viz.clear();
                var ctx = viz.ctx;

                var d1 = getDigits(num1);
                var d2 = getDigits(num2);
                var sum = num1 + num2;

                // Compute carrying info
                var onesSum = d1[2] + d2[2];
                var onesCarry = onesSum >= 10 ? 1 : 0;
                var onesResult = onesSum % 10;

                var tensSum = d1[1] + d2[1] + onesCarry;
                var tensCarry = tensSum >= 10 ? 1 : 0;
                var tensResult = tensSum % 10;

                var hundredsSum = d1[0] + d2[0] + tensCarry;
                var hundredsCarry = hundredsSum >= 10 ? 1 : 0;
                var hundredsResult = hundredsSum % 10;

                var thousandsResult = hundredsCarry;

                // Layout
                var baseX = 310;
                var baseY = 210;
                var colW = 48;
                var rowH = 52;
                var digitSize = 32;

                // Title
                ctx.fillStyle = viz.colors.white;
                ctx.font = 'bold 20px -apple-system, sans-serif';
                ctx.textAlign = 'center'; ctx.textBaseline = 'top';
                ctx.fillText('Column Addition with Carrying', 280, 10);

                // Draw the two numbers
                ctx.font = 'bold ' + digitSize + 'px -apple-system, sans-serif';
                ctx.textAlign = 'center'; ctx.textBaseline = 'middle';

                // Highlight the current column
                var highlightCol = -1;
                if (step === 1 || step === 2) highlightCol = 2;      // ones
                else if (step === 3 || step === 4) highlightCol = 1;  // tens
                else if (step === 5 || step === 6) highlightCol = 0;  // hundreds

                // Column backgrounds
                for (var c = 0; c < 3; c++) {
                    if (c === highlightCol) {
                        ctx.fillStyle = 'rgba(88, 166, 255, 0.12)';
                        ctx.fillRect(baseX + (c - 2) * colW - colW / 2, baseY - rowH * 1.7, colW, rowH * 3.4);
                    }
                }

                // Column labels
                ctx.font = '13px -apple-system, sans-serif';
                ctx.fillStyle = '#8b949e';
                ctx.textBaseline = 'bottom';
                ctx.fillText('H', baseX - 2 * colW, baseY - rowH * 1.7 + 2);
                ctx.fillText('T', baseX - 1 * colW, baseY - rowH * 1.7 + 2);
                ctx.fillText('O', baseX, baseY - rowH * 1.7 + 2);

                // First number
                ctx.font = 'bold ' + digitSize + 'px -apple-system, sans-serif';
                ctx.textBaseline = 'middle';
                for (var i = 0; i < 3; i++) {
                    ctx.fillStyle = (i === highlightCol) ? '#f0883e' : '#c9d1d9';
                    ctx.fillText(d1[i], baseX + (i - 2) * colW, baseY - rowH);
                }

                // Plus sign
                ctx.fillStyle = '#d29922';
                ctx.font = 'bold 28px -apple-system, sans-serif';
                ctx.textAlign = 'right';
                ctx.fillText('+', baseX - 2.7 * colW, baseY);
                ctx.textAlign = 'center';

                // Second number
                ctx.font = 'bold ' + digitSize + 'px -apple-system, sans-serif';
                for (var j = 0; j < 3; j++) {
                    ctx.fillStyle = (j === highlightCol) ? '#58a6ff' : '#c9d1d9';
                    ctx.fillText(d2[j], baseX + (j - 2) * colW, baseY);
                }

                // Line under
                ctx.strokeStyle = '#c9d1d9';
                ctx.lineWidth = 3;
                ctx.beginPath();
                ctx.moveTo(baseX - 2.8 * colW, baseY + rowH * 0.4);
                ctx.lineTo(baseX + 0.6 * colW, baseY + rowH * 0.4);
                ctx.stroke();

                var ease = animT < 0.5 ? 2 * animT * animT : 1 - Math.pow(-2 * animT + 2, 2) / 2;
                var resultY = baseY + rowH;

                // Step 1: Ones column result
                if (step >= 1) {
                    var alpha = (step === 1) ? ease : 1;
                    ctx.globalAlpha = alpha;
                    ctx.fillStyle = '#3fb950';
                    ctx.font = 'bold ' + digitSize + 'px -apple-system, sans-serif';
                    ctx.fillText(onesResult, baseX, resultY);
                    ctx.globalAlpha = 1;
                }

                // Step 2: Ones carry
                if (step >= 2 && onesCarry > 0) {
                    var carryAlpha = (step === 2) ? ease : 1;
                    ctx.globalAlpha = carryAlpha;
                    // Animated carry digit rising to tens column header
                    var carryX = baseX - colW;
                    var carryStartY = resultY;
                    var carryEndY = baseY - rowH * 1.6;
                    var carryY = (step === 2) ? (carryStartY + (carryEndY - carryStartY) * ease) : carryEndY;
                    ctx.fillStyle = '#f85149';
                    ctx.font = 'bold 22px -apple-system, sans-serif';
                    ctx.fillText(onesCarry, carryX, carryY);
                    // Small circle background
                    ctx.strokeStyle = '#f85149';
                    ctx.lineWidth = 1.5;
                    ctx.beginPath(); ctx.arc(carryX, carryY, 14, 0, Math.PI * 2); ctx.stroke();
                    ctx.globalAlpha = 1;
                }

                // Step 3: Tens column result
                if (step >= 3) {
                    var alpha2 = (step === 3) ? ease : 1;
                    ctx.globalAlpha = alpha2;
                    ctx.fillStyle = '#3fb950';
                    ctx.font = 'bold ' + digitSize + 'px -apple-system, sans-serif';
                    ctx.fillText(tensResult, baseX - colW, resultY);
                    ctx.globalAlpha = 1;
                }

                // Step 4: Tens carry
                if (step >= 4 && tensCarry > 0) {
                    var carryAlpha2 = (step === 4) ? ease : 1;
                    ctx.globalAlpha = carryAlpha2;
                    var carryX2 = baseX - 2 * colW;
                    var carryStartY2 = resultY;
                    var carryEndY2 = baseY - rowH * 1.6;
                    var carryY2 = (step === 4) ? (carryStartY2 + (carryEndY2 - carryStartY2) * ease) : carryEndY2;
                    ctx.fillStyle = '#f85149';
                    ctx.font = 'bold 22px -apple-system, sans-serif';
                    ctx.fillText(tensCarry, carryX2, carryY2);
                    ctx.strokeStyle = '#f85149';
                    ctx.lineWidth = 1.5;
                    ctx.beginPath(); ctx.arc(carryX2, carryY2, 14, 0, Math.PI * 2); ctx.stroke();
                    ctx.globalAlpha = 1;
                }

                // Step 5: Hundreds column result
                if (step >= 5) {
                    var alpha3 = (step === 5) ? ease : 1;
                    ctx.globalAlpha = alpha3;
                    ctx.fillStyle = '#3fb950';
                    ctx.font = 'bold ' + digitSize + 'px -apple-system, sans-serif';
                    ctx.fillText(hundredsResult, baseX - 2 * colW, resultY);
                    ctx.globalAlpha = 1;
                }

                // Step 6: Thousands carry (if any) and final answer
                if (step >= 6) {
                    var alpha4 = (step === 6) ? ease : 1;
                    ctx.globalAlpha = alpha4;
                    if (thousandsResult > 0) {
                        ctx.fillStyle = '#3fb950';
                        ctx.font = 'bold ' + digitSize + 'px -apple-system, sans-serif';
                        ctx.fillText(thousandsResult, baseX - 3 * colW, resultY);
                    }
                    ctx.globalAlpha = 1;
                }

                // Step description box
                var descY = 340;
                ctx.fillStyle = '#1a1a40';
                ctx.fillRect(20, descY - 5, 520, 70);
                ctx.strokeStyle = '#30363d';
                ctx.lineWidth = 1;
                ctx.strokeRect(20, descY - 5, 520, 70);

                ctx.font = '15px -apple-system, sans-serif';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'top';

                var descriptions = [
                    'Click "Next Step" to begin!',
                    'Ones column: ' + d1[2] + ' + ' + d2[2] + ' = ' + onesSum + (onesCarry ? '  (write ' + onesResult + ', carry ' + onesCarry + ')' : '  (write ' + onesResult + ')'),
                    onesCarry > 0 ? 'Carry the ' + onesCarry + ' to the tens column!' : 'No carry needed! Moving on...',
                    'Tens column: ' + d1[1] + ' + ' + d2[1] + (onesCarry ? ' + ' + onesCarry + ' (carry)' : '') + ' = ' + tensSum + (tensCarry ? '  (write ' + tensResult + ', carry ' + tensCarry + ')' : '  (write ' + tensResult + ')'),
                    tensCarry > 0 ? 'Carry the ' + tensCarry + ' to the hundreds column!' : 'No carry needed! Moving on...',
                    'Hundreds column: ' + d1[0] + ' + ' + d2[0] + (tensCarry ? ' + ' + tensCarry + ' (carry)' : '') + ' = ' + hundredsSum + (hundredsCarry ? '  (write ' + hundredsResult + ', carry ' + hundredsCarry + ')' : '  (write ' + hundredsResult + ')'),
                    'Done! ' + num1 + ' + ' + num2 + ' = ' + sum
                ];

                ctx.fillStyle = step >= 7 ? '#3fb950' : '#f0f6fc';
                var desc = step < descriptions.length ? descriptions[step] : descriptions[descriptions.length - 1];
                ctx.fillText(desc, 280, descY + 5);

                // Step indicator
                ctx.fillStyle = '#8b949e';
                ctx.font = '12px -apple-system, sans-serif';
                ctx.fillText('Step ' + step + ' / 6', 280, descY + 35);

                // Place value blocks illustration (right side)
                if (step >= 1) {
                    drawPlaceValueBlocks(ctx, step, d1, d2, onesSum, tensSum, hundredsSum, onesCarry, tensCarry);
                }

                // Sparkles when done
                if (step >= 6) {
                    var time = Date.now() * 0.004;
                    var sparkColors3 = ['#f0883e', '#d29922', '#3fb950', '#58a6ff', '#bc8cff', '#f85149', '#f778ba'];
                    for (var sp3 = 0; sp3 < 7; sp3++) {
                        var ang3 = (sp3 / 7) * Math.PI * 2 + time;
                        var dist3 = 30 + Math.sin(time * 2 + sp3) * 10;
                        var sx3 = 280 + Math.cos(ang3) * dist3 * 3;
                        var sy3 = resultY + Math.sin(ang3) * dist3;
                        ctx.fillStyle = sparkColors3[sp3];
                        ctx.beginPath(); ctx.arc(sx3, sy3, 3, 0, Math.PI * 2); ctx.fill();
                    }
                }
            }

            function drawPlaceValueBlocks(ctx, step, d1, d2, onesSum, tensSum, hundredsSum, onesCarry, tensCarry) {
                // Small illustration area on the left
                var bx = 40;
                var by = 50;
                ctx.font = '11px -apple-system, sans-serif';
                ctx.textAlign = 'left';
                ctx.textBaseline = 'top';

                // Show current column computation as small blocks
                if (step === 1 || step === 2) {
                    ctx.fillStyle = '#f0883e';
                    ctx.fillText('Ones:', bx, by);
                    // Draw small blocks for each digit
                    for (var i = 0; i < d1[2]; i++) {
                        ctx.fillStyle = '#f0883e';
                        ctx.fillRect(bx + i * 10, by + 16, 8, 8);
                    }
                    for (var j = 0; j < d2[2]; j++) {
                        ctx.fillStyle = '#58a6ff';
                        ctx.fillRect(bx + j * 10, by + 28, 8, 8);
                    }
                    ctx.fillStyle = '#c9d1d9';
                    ctx.fillText('= ' + onesSum, bx, by + 42);
                } else if (step === 3 || step === 4) {
                    ctx.fillStyle = '#f0883e';
                    ctx.fillText('Tens:', bx, by);
                    for (var i2 = 0; i2 < d1[1]; i2++) {
                        ctx.fillStyle = '#f0883e';
                        ctx.fillRect(bx + i2 * 10, by + 16, 8, 8);
                    }
                    for (var j2 = 0; j2 < d2[1]; j2++) {
                        ctx.fillStyle = '#58a6ff';
                        ctx.fillRect(bx + j2 * 10, by + 28, 8, 8);
                    }
                    if (onesCarry) {
                        ctx.fillStyle = '#f85149';
                        ctx.fillRect(bx + d2[1] * 10 + 4, by + 28, 8, 8);
                        ctx.fillStyle = '#f85149';
                        ctx.fillText('+carry', bx + d2[1] * 10 + 16, by + 27);
                    }
                    ctx.fillStyle = '#c9d1d9';
                    ctx.fillText('= ' + tensSum, bx, by + 42);
                } else if (step >= 5) {
                    ctx.fillStyle = '#f0883e';
                    ctx.fillText('Hundreds:', bx, by);
                    for (var i3 = 0; i3 < d1[0]; i3++) {
                        ctx.fillStyle = '#f0883e';
                        ctx.fillRect(bx + i3 * 10, by + 16, 8, 8);
                    }
                    for (var j3 = 0; j3 < d2[0]; j3++) {
                        ctx.fillStyle = '#58a6ff';
                        ctx.fillRect(bx + j3 * 10, by + 28, 8, 8);
                    }
                    if (tensCarry) {
                        ctx.fillStyle = '#f85149';
                        ctx.fillRect(bx + d2[0] * 10 + 4, by + 28, 8, 8);
                        ctx.fillStyle = '#f85149';
                        ctx.fillText('+carry', bx + d2[0] * 10 + 16, by + 27);
                    }
                    ctx.fillStyle = '#c9d1d9';
                    ctx.fillText('= ' + hundredsSum, bx, by + 42);
                }
            }

            viz.animate(function() {
                if (animating) {
                    animT += 0.025;
                    if (animT >= 1) {
                        animT = 1;
                        animating = false;
                    }
                }
                draw();
            });

            return viz;
        }
    }
];

// =============================================================================
// Section 5: Real World — Interactive Coin Counter
// =============================================================================
window.EXTRA_VIZ['ch01']['ch01-sec05'] = [
    {
        id: 'ch01-extra-viz-5',
        title: 'Coin Counter',
        description: 'Click the coins below to add them to your pile. Watch the total grow!',
        setup: function(container, controls) {
            var viz = new VizEngine(container, {width: 560, height: 420, scale: 40});

            var coins = []; // array of {type, x, y, animY, born}
            var total = 0;
            var lastAddTime = 0;

            // Coin types: value, color, label, size
            var coinTypes = [
                {value: 1,  color: '#cd7f32', label: '1\u00a2',  size: 14, name: 'Penny'},
                {value: 5,  color: '#8b949e', label: '5\u00a2',  size: 16, name: 'Nickel'},
                {value: 10, color: '#c9d1d9', label: '10\u00a2', size: 17, name: 'Dime'},
                {value: 25, color: '#d29922', label: '25\u00a2', size: 20, name: 'Quarter'}
            ];

            // Reset button
            var resetBtn = document.createElement('button');
            resetBtn.textContent = 'Clear All';
            resetBtn.style.cssText = 'padding:5px 14px;background:#f85149;border:1px solid #30363d;color:#fff;border-radius:6px;cursor:pointer;font-size:13px;font-weight:bold;';
            controls.appendChild(resetBtn);

            // Dollar conversion toggle
            var showDollars = false;
            var dollarBtn = document.createElement('button');
            dollarBtn.textContent = 'Show as Dollars';
            dollarBtn.style.cssText = 'padding:5px 14px;background:#1a1a40;border:1px solid #30363d;color:#c9d1d9;border-radius:6px;cursor:pointer;font-size:13px;margin-left:8px;';
            controls.appendChild(dollarBtn);

            resetBtn.addEventListener('click', function() {
                coins = [];
                total = 0;
            });

            dollarBtn.addEventListener('click', function() {
                showDollars = !showDollars;
                dollarBtn.textContent = showDollars ? 'Show as Cents' : 'Show as Dollars';
            });

            // Click areas for coin buttons (rendered on canvas)
            var btnY = 350;
            var btnSpacing = 120;
            var btnStartX = 70;

            // Clicking on the canvas
            viz.canvas.addEventListener('click', function(e) {
                var rect = viz.canvas.getBoundingClientRect();
                var mx = e.clientX - rect.left;
                var my = e.clientY - rect.top;

                // Check if click is on a coin button
                for (var i = 0; i < coinTypes.length; i++) {
                    var bx = btnStartX + i * btnSpacing;
                    var by = btnY;
                    var br = coinTypes[i].size + 8;
                    if (Math.sqrt((mx - bx) * (mx - bx) + (my - by) * (my - by)) < br) {
                        addCoin(i);
                        break;
                    }
                }
            });

            // Touch support
            viz.canvas.addEventListener('touchstart', function(e) {
                e.preventDefault();
                var rect = viz.canvas.getBoundingClientRect();
                var mx = e.touches[0].clientX - rect.left;
                var my = e.touches[0].clientY - rect.top;

                for (var i = 0; i < coinTypes.length; i++) {
                    var bx = btnStartX + i * btnSpacing;
                    var by = btnY;
                    var br = coinTypes[i].size + 8;
                    if (Math.sqrt((mx - bx) * (mx - bx) + (my - by) * (my - by)) < br) {
                        addCoin(i);
                        break;
                    }
                }
            }, {passive: false});

            function addCoin(typeIdx) {
                var ct = coinTypes[typeIdx];
                total += ct.value;
                lastAddTime = Date.now();

                // Place coin in the pile area with some randomness
                var pileAreaX = 60;
                var pileAreaY = 80;
                var pileW = 440;
                var pileH = 200;

                // Stack coins nicely in rows
                var idx = coins.length;
                var coinsPerRow = Math.floor(pileW / (ct.size * 2.5 + 4));
                if (coinsPerRow < 1) coinsPerRow = 1;
                var row = Math.floor(idx / coinsPerRow);
                var col = idx % coinsPerRow;
                var cx = pileAreaX + col * (ct.size * 2.5 + 4) + ct.size + (Math.random() - 0.5) * 8;
                var cy = pileAreaY + row * (ct.size * 2 + 8) + ct.size + (Math.random() - 0.5) * 4;

                // If too many rows, start wrapping / random placement
                if (cy > pileAreaY + pileH) {
                    cx = pileAreaX + Math.random() * pileW;
                    cy = pileAreaY + Math.random() * pileH;
                }

                coins.push({
                    type: typeIdx,
                    x: cx,
                    y: cy,
                    born: Date.now(),
                    scale: 0 // animate scale from 0 to 1
                });
            }

            function drawCoin(ctx, cx, cy, coinType, scale) {
                if (scale < 0.01) return;
                var r = coinType.size * scale;
                // Shadow
                ctx.fillStyle = 'rgba(0,0,0,0.3)';
                ctx.beginPath(); ctx.ellipse(cx + 2, cy + 2, r, r * 0.85, 0, 0, Math.PI * 2); ctx.fill();
                // Body
                ctx.fillStyle = coinType.color;
                ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.fill();
                // Inner ring
                ctx.strokeStyle = 'rgba(255,255,255,0.25)';
                ctx.lineWidth = 1.5;
                ctx.beginPath(); ctx.arc(cx, cy, r * 0.8, 0, Math.PI * 2); ctx.stroke();
                // Shine
                ctx.fillStyle = 'rgba(255,255,255,0.35)';
                ctx.beginPath(); ctx.arc(cx - r * 0.2, cy - r * 0.25, r * 0.35, 0, Math.PI * 2); ctx.fill();
                // Label
                ctx.fillStyle = '#0c0c20';
                ctx.font = 'bold ' + Math.round(r * 0.8) + 'px -apple-system, sans-serif';
                ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
                ctx.fillText(coinType.label, cx, cy + 1);
            }

            function draw() {
                viz.clear();
                var ctx = viz.ctx;

                // Title
                ctx.fillStyle = viz.colors.white;
                ctx.font = 'bold 20px -apple-system, sans-serif';
                ctx.textAlign = 'center'; ctx.textBaseline = 'top';
                ctx.fillText('Coin Counter', 280, 8);

                // Pile area border
                ctx.strokeStyle = '#30363d';
                ctx.lineWidth = 1;
                ctx.setLineDash([4, 4]);
                ctx.strokeRect(50, 65, 460, 230);
                ctx.setLineDash([]);

                // Label pile area
                if (coins.length === 0) {
                    ctx.fillStyle = '#4a4a7a';
                    ctx.font = '16px -apple-system, sans-serif';
                    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
                    ctx.fillText('Click a coin below to start adding!', 280, 180);
                }

                // Draw all coins in the pile
                var now = Date.now();
                for (var i = 0; i < coins.length; i++) {
                    var coin = coins[i];
                    var age = now - coin.born;
                    coin.scale = Math.min(1, age / 200); // pop in over 200ms
                    // Bounce effect
                    var bounce = 1;
                    if (age < 300) {
                        var bt = age / 300;
                        bounce = 1 + Math.sin(bt * Math.PI) * 0.2;
                    }
                    drawCoin(ctx, coin.x, coin.y, coinTypes[coin.type], coin.scale * bounce);
                }

                // Total display
                var totalY = 305;
                ctx.fillStyle = '#1a1a40';
                ctx.fillRect(140, totalY - 5, 280, 40);
                ctx.strokeStyle = '#3fb9a0';
                ctx.lineWidth = 2;
                ctx.strokeRect(140, totalY - 5, 280, 40);

                ctx.font = 'bold 24px -apple-system, sans-serif';
                ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
                ctx.fillStyle = '#3fb9a0';
                if (showDollars) {
                    ctx.fillText('Total: $' + (total / 100).toFixed(2), 280, totalY + 14);
                } else {
                    ctx.fillText('Total: ' + total + '\u00a2', 280, totalY + 14);
                }

                // Animate total flash when recently changed
                if (now - lastAddTime < 500) {
                    var flash = 1 - (now - lastAddTime) / 500;
                    ctx.strokeStyle = 'rgba(63, 185, 160, ' + (flash * 0.6) + ')';
                    ctx.lineWidth = 3;
                    ctx.strokeRect(138, totalY - 7, 284, 44);
                }

                // Draw coin buttons at the bottom
                for (var b = 0; b < coinTypes.length; b++) {
                    var bx2 = btnStartX + b * btnSpacing;
                    var by2 = btnY;
                    var ct = coinTypes[b];

                    // Button background
                    ctx.fillStyle = 'rgba(26, 26, 64, 0.8)';
                    ctx.beginPath(); ctx.arc(bx2, by2, ct.size + 8, 0, Math.PI * 2); ctx.fill();
                    ctx.strokeStyle = '#4a4a7a';
                    ctx.lineWidth = 1.5;
                    ctx.beginPath(); ctx.arc(bx2, by2, ct.size + 8, 0, Math.PI * 2); ctx.stroke();

                    drawCoin(ctx, bx2, by2, ct, 1);

                    // Name label
                    ctx.fillStyle = '#8b949e';
                    ctx.font = '11px -apple-system, sans-serif';
                    ctx.textAlign = 'center'; ctx.textBaseline = 'top';
                    ctx.fillText(ct.name, bx2, by2 + ct.size + 12);
                }

                // Instruction
                ctx.fillStyle = '#4a4a7a';
                ctx.font = '11px -apple-system, sans-serif';
                ctx.textAlign = 'center'; ctx.textBaseline = 'top';
                ctx.fillText('Tap a coin to add it to your collection', 280, 398);

                // Count breakdown
                if (coins.length > 0) {
                    var counts = [0, 0, 0, 0];
                    for (var ci = 0; ci < coins.length; ci++) {
                        counts[coins[ci].type]++;
                    }
                    ctx.font = '11px -apple-system, sans-serif';
                    ctx.textAlign = 'left'; ctx.textBaseline = 'top';
                    var cx0 = 50;
                    var cy0 = 42;
                    for (var ci2 = 0; ci2 < coinTypes.length; ci2++) {
                        if (counts[ci2] > 0) {
                            ctx.fillStyle = coinTypes[ci2].color;
                            ctx.fillText(coinTypes[ci2].name + ': ' + counts[ci2], cx0, cy0);
                            cx0 += 100;
                        }
                    }
                }

                // Celebration when reaching $1.00 or more
                if (total >= 100) {
                    var time = Date.now() * 0.003;
                    ctx.fillStyle = '#3fb950';
                    ctx.font = 'bold 14px -apple-system, sans-serif';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'bottom';
                    var wobble = Math.sin(time * 3) * 3;
                    ctx.fillText('You reached a dollar!', 280, totalY - 10 + wobble);

                    var sparkColors4 = ['#f0883e', '#d29922', '#3fb950', '#58a6ff', '#bc8cff', '#f85149', '#f778ba', '#c9d1d9'];
                    for (var sp4 = 0; sp4 < 8; sp4++) {
                        var ang4 = (sp4 / 8) * Math.PI * 2 + time;
                        var dist4 = 25 + Math.sin(time * 2 + sp4) * 8;
                        var sx4 = 280 + Math.cos(ang4) * dist4 * 4;
                        var sy4 = totalY + 14 + Math.sin(ang4) * dist4;
                        ctx.fillStyle = sparkColors4[sp4];
                        ctx.beginPath(); ctx.arc(sx4, sy4, 3, 0, Math.PI * 2); ctx.fill();
                    }
                }
            }

            viz.animate(function() {
                draw();
            });

            return viz;
        }
    }
];
