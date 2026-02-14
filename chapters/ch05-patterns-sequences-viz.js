// === Chapter 5: Patterns & Sequences — Extra Visualizations ===
// Fun, colorful, interactive visualizations for elementary school kids (ages 7-12)

window.EXTRA_VIZ = window.EXTRA_VIZ || {};
window.EXTRA_VIZ['ch05'] = window.EXTRA_VIZ['ch05'] || {};

// ============================================================
// Section 1: Patterns Everywhere — Color Pattern Maker
// ============================================================
window.EXTRA_VIZ['ch05']['ch05-sec01'] = [
    {
        id: 'ch05-extra-viz-1',
        title: 'Color Pattern Maker',
        description: 'Pick a pattern type and watch it fill in! Click a circle to change the pattern.',
        setup: function(container, controls) {
            var viz = new VizEngine(container, {
                width: 600, height: 300, scale: 1,
                originX: 0, originY: 0
            });

            var patternTypes = {
                'AB':   { colors: ['#f85149', '#58a6ff'], label: 'AB  (Red-Blue)' },
                'ABC':  { colors: ['#f85149', '#58a6ff', '#3fb950'], label: 'ABC (Red-Blue-Green)' },
                'ABB':  { colors: ['#f85149', '#58a6ff', '#58a6ff'], label: 'ABB (Red-Blue-Blue)' },
                'AABB': { colors: ['#f85149', '#f85149', '#58a6ff', '#58a6ff'], label: 'AABB (Red-Red-Blue-Blue)' }
            };
            var patternKeys = ['AB', 'ABC', 'ABB', 'AABB'];
            var currentPattern = 'AB';
            var circleCount = 12;
            var animProgress = 0;
            var lastTime = null;
            var animSpeed = 3; // circles per second

            // Pattern type buttons
            var btnGroup = document.createElement('div');
            btnGroup.style.cssText = 'display:flex;gap:6px;flex-wrap:wrap;';
            var buttons = {};

            patternKeys.forEach(function(key) {
                var btn = document.createElement('button');
                btn.textContent = patternTypes[key].label;
                btn.style.cssText = 'padding:6px 12px;border:2px solid #58a6ff;border-radius:6px;background:' + (key === currentPattern ? '#58a6ff' : '#1a1a40') + ';color:#f0f6fc;font-size:0.8rem;font-weight:bold;cursor:pointer;transition:all 0.2s;';
                btn.addEventListener('click', function() {
                    currentPattern = key;
                    animProgress = 0;
                    lastTime = null;
                    patternKeys.forEach(function(k) {
                        buttons[k].style.background = k === key ? '#58a6ff' : '#1a1a40';
                    });
                });
                buttons[key] = btn;
                btnGroup.appendChild(btn);
            });
            controls.appendChild(btnGroup);

            // Replay button
            var replayBtn = document.createElement('button');
            replayBtn.textContent = 'Replay';
            replayBtn.style.cssText = 'padding:6px 14px;border:1px solid #30363d;border-radius:6px;background:#1a1a40;color:#c9d1d9;font-size:0.85rem;cursor:pointer;margin-left:8px;';
            replayBtn.addEventListener('click', function() {
                animProgress = 0;
                lastTime = null;
            });
            controls.appendChild(replayBtn);

            // Click detection for changing individual circles
            var circlePositions = []; // store pixel positions for click detection
            var circleOverrides = []; // user overrides per circle

            viz.canvas.addEventListener('click', function(e) {
                var rect = viz.canvas.getBoundingClientRect();
                var mx = e.clientX - rect.left;
                var my = e.clientY - rect.top;

                var allColors = ['#f85149', '#58a6ff', '#3fb950', '#d29922'];
                for (var i = 0; i < circlePositions.length; i++) {
                    var cp = circlePositions[i];
                    var dx = mx - cp.x;
                    var dy = my - cp.y;
                    if (dx * dx + dy * dy < cp.r * cp.r) {
                        // Cycle through colors
                        var currentCol = circleOverrides[i] || cp.defaultColor;
                        var idx = allColors.indexOf(currentCol);
                        idx = (idx + 1) % allColors.length;
                        circleOverrides[i] = allColors[idx];
                        break;
                    }
                }
            });

            function getPatternColor(index) {
                if (circleOverrides[index]) return circleOverrides[index];
                var pat = patternTypes[currentPattern].colors;
                return pat[index % pat.length];
            }

            function draw(t) {
                if (lastTime === null) lastTime = t;
                var dt = (t - lastTime) / 1000;
                lastTime = t;

                animProgress += dt * animSpeed;
                var revealedCount = Math.min(Math.floor(animProgress), circleCount);

                var ctx = viz.ctx;
                ctx.fillStyle = '#0c0c20';
                ctx.fillRect(0, 0, viz.width, viz.height);

                // Title
                ctx.fillStyle = '#f0f6fc';
                ctx.font = 'bold 20px -apple-system, sans-serif';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'top';
                ctx.fillText('Color Pattern Maker', viz.width / 2, 12);

                // Pattern name
                ctx.fillStyle = '#8b949e';
                ctx.font = '14px -apple-system, sans-serif';
                ctx.fillText('Pattern: ' + currentPattern, viz.width / 2, 38);

                // Draw circles in a row
                var circleRadius = 22;
                var spacing = 44;
                var totalWidth = circleCount * spacing;
                var startX = (viz.width - totalWidth) / 2 + spacing / 2;
                var rowY = 130;

                circlePositions = [];

                for (var i = 0; i < circleCount; i++) {
                    var cx = startX + i * spacing;
                    var cy = rowY;
                    var color = getPatternColor(i);

                    circlePositions.push({ x: cx, y: cy, r: circleRadius, defaultColor: patternTypes[currentPattern].colors[i % patternTypes[currentPattern].colors.length] });

                    if (i < revealedCount) {
                        // Animate pop-in effect for the newest circle
                        var scale = 1.0;
                        if (i === revealedCount - 1 && animProgress - revealedCount < 0.3) {
                            var popT = (animProgress - revealedCount + 1) / 1;
                            scale = 0.5 + 0.5 * Math.min(1, popT * 3);
                            // Bounce
                            if (popT < 0.5) {
                                scale = 0.3 + 1.4 * popT;
                            } else {
                                scale = 1.0 + 0.1 * Math.sin((popT - 0.5) * Math.PI * 4) * Math.max(0, 1 - (popT - 0.5) * 4);
                            }
                        }

                        var r = circleRadius * scale;

                        // Glow
                        ctx.shadowColor = color;
                        ctx.shadowBlur = 15;

                        // Filled circle
                        ctx.fillStyle = color;
                        ctx.beginPath();
                        ctx.arc(cx, cy, r, 0, Math.PI * 2);
                        ctx.fill();
                        ctx.shadowBlur = 0;

                        // Highlight
                        ctx.fillStyle = 'rgba(255,255,255,0.25)';
                        ctx.beginPath();
                        ctx.arc(cx - r * 0.25, cy - r * 0.3, r * 0.3, 0, Math.PI * 2);
                        ctx.fill();

                        // Number inside
                        ctx.fillStyle = '#ffffff';
                        ctx.font = 'bold 14px -apple-system, sans-serif';
                        ctx.textAlign = 'center';
                        ctx.textBaseline = 'middle';
                        ctx.fillText(String(i + 1), cx, cy);
                    } else {
                        // Empty circle placeholder
                        ctx.strokeStyle = '#3a3a5a';
                        ctx.lineWidth = 2;
                        ctx.setLineDash([4, 4]);
                        ctx.beginPath();
                        ctx.arc(cx, cy, circleRadius, 0, Math.PI * 2);
                        ctx.stroke();
                        ctx.setLineDash([]);

                        ctx.fillStyle = '#3a3a5a';
                        ctx.font = '12px -apple-system, sans-serif';
                        ctx.textAlign = 'center';
                        ctx.textBaseline = 'middle';
                        ctx.fillText('?', cx, cy);
                    }
                }

                // Draw the pattern legend below
                var legendY = 200;
                ctx.fillStyle = '#f0f6fc';
                ctx.font = 'bold 14px -apple-system, sans-serif';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'top';
                ctx.fillText('Pattern Unit:', viz.width / 2, legendY);

                var pat = patternTypes[currentPattern].colors;
                var unitWidth = pat.length * 40;
                var unitStartX = (viz.width - unitWidth) / 2 + 20;

                for (var p = 0; p < pat.length; p++) {
                    var px = unitStartX + p * 40;
                    var py = legendY + 28;

                    ctx.fillStyle = pat[p];
                    ctx.beginPath();
                    ctx.arc(px, py, 14, 0, Math.PI * 2);
                    ctx.fill();

                    // Letter label
                    ctx.fillStyle = '#ffffff';
                    ctx.font = 'bold 13px -apple-system, sans-serif';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    var letter = String.fromCharCode(65 + (p < pat.length ? 'ABCDEFGH'.indexOf(currentPattern.charAt(p) || 'A') : 0));
                    // Derive letter from pattern name
                    var patName = currentPattern;
                    ctx.fillText(patName.charAt(p), px, py);
                }

                // Tip text
                ctx.fillStyle = '#6a6a8a';
                ctx.font = '12px -apple-system, sans-serif';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'top';
                ctx.fillText('Click any circle to change its color!', viz.width / 2, 268);
            }

            viz.animate(draw);
            return viz;
        }
    }
];

// ============================================================
// Section 2: Number Sequences — "What Comes Next?" Game
// ============================================================
window.EXTRA_VIZ['ch05']['ch05-sec02'] = [
    {
        id: 'ch05-extra-viz-2',
        title: 'What Comes Next?',
        description: 'Find the missing number in the sequence! Use the buttons to guess, then check your answer.',
        setup: function(container, controls) {
            var viz = new VizEngine(container, {
                width: 600, height: 380, scale: 1,
                originX: 0, originY: 0
            });

            // Sequence generation
            var sequence = [];
            var missingIndex = 2;
            var answer = 0;
            var userGuess = null;
            var showResult = false;
            var correct = false;
            var confetti = [];
            var confettiTime = 0;
            var lastTime = null;
            var streak = 0;

            function generateSequence() {
                // Arithmetic sequences: pick start, step
                var start = Math.floor(Math.random() * 10) + 1;
                var step = Math.floor(Math.random() * 5) + 1;
                // Randomly pick addition or subtraction (but keep positive)
                if (Math.random() < 0.3 && start > 20) {
                    step = -step;
                }

                sequence = [];
                for (var i = 0; i < 5; i++) {
                    sequence.push(start + i * step);
                }

                // Make sure all numbers are positive
                if (sequence[sequence.length - 1] < 0 || sequence[0] < 0) {
                    // Retry with positive
                    start = Math.floor(Math.random() * 5) + 2;
                    step = Math.floor(Math.random() * 5) + 2;
                    sequence = [];
                    for (var j = 0; j < 5; j++) {
                        sequence.push(start + j * step);
                    }
                }

                // Pick which index to hide (index 2, 3, or 4)
                missingIndex = 2 + Math.floor(Math.random() * 3);
                answer = sequence[missingIndex];
                userGuess = null;
                showResult = false;
                correct = false;
                confetti = [];
            }

            generateSequence();

            // Guess buttons: show answer +/- some offsets
            var guessButtons = [];
            var guessGroup = document.createElement('div');
            guessGroup.style.cssText = 'display:flex;gap:6px;flex-wrap:wrap;align-items:center;';

            var guessLabel = document.createElement('span');
            guessLabel.style.cssText = 'color:#c9d1d9;font-size:0.85rem;font-weight:bold;margin-right:4px;';
            guessLabel.textContent = 'Your guess:';
            guessGroup.appendChild(guessLabel);

            for (var gi = 0; gi < 4; gi++) {
                var gBtn = document.createElement('button');
                gBtn.style.cssText = 'padding:8px 16px;border:2px solid #58a6ff;border-radius:8px;background:#1a1a40;color:#f0f6fc;font-size:1rem;font-weight:bold;cursor:pointer;min-width:50px;transition:all 0.2s;';
                gBtn.addEventListener('click', (function(idx) {
                    return function() {
                        var val = parseInt(guessButtons[idx].textContent);
                        userGuess = val;
                        showResult = true;
                        correct = (val === answer);
                        if (correct) {
                            streak++;
                            confettiTime = 0;
                            // Generate confetti
                            confetti = [];
                            for (var c = 0; c < 40; c++) {
                                confetti.push({
                                    x: viz.width / 2 + (Math.random() - 0.5) * 200,
                                    y: viz.height / 2 - 30,
                                    vx: (Math.random() - 0.5) * 300,
                                    vy: -Math.random() * 250 - 100,
                                    color: ['#f85149', '#58a6ff', '#3fb950', '#d29922', '#bc8cff', '#f778ba', '#f0883e'][Math.floor(Math.random() * 7)],
                                    size: 4 + Math.random() * 6,
                                    rotation: Math.random() * Math.PI * 2
                                });
                            }
                        } else {
                            streak = 0;
                        }
                        // Highlight correct/incorrect buttons
                        for (var b = 0; b < guessButtons.length; b++) {
                            var bVal = parseInt(guessButtons[b].textContent);
                            if (bVal === answer) {
                                guessButtons[b].style.background = '#3fb950';
                                guessButtons[b].style.borderColor = '#3fb950';
                            } else if (bVal === val && !correct) {
                                guessButtons[b].style.background = '#f85149';
                                guessButtons[b].style.borderColor = '#f85149';
                            }
                        }
                    };
                })(gi));
                guessButtons.push(gBtn);
                guessGroup.appendChild(gBtn);
            }
            controls.appendChild(guessGroup);

            // New Sequence button
            var newBtn = document.createElement('button');
            newBtn.textContent = 'New Sequence';
            newBtn.style.cssText = 'padding:8px 16px;border:2px solid #3fb950;border-radius:8px;background:#3fb950;color:#ffffff;font-size:0.85rem;font-weight:bold;cursor:pointer;margin-left:10px;';
            newBtn.addEventListener('click', function() {
                generateSequence();
                updateGuessButtons();
                // Reset button styles
                for (var b = 0; b < guessButtons.length; b++) {
                    guessButtons[b].style.background = '#1a1a40';
                    guessButtons[b].style.borderColor = '#58a6ff';
                }
            });
            controls.appendChild(newBtn);

            function updateGuessButtons() {
                // Create 4 choices: the correct answer + 3 distractors
                var choices = [answer];
                var step = sequence[1] - sequence[0];
                var distractors = [answer + step, answer - step, answer + 1, answer - 1, answer + 2, answer * 2];
                // Remove duplicates and the answer
                var unique = [];
                for (var d = 0; d < distractors.length; d++) {
                    if (distractors[d] !== answer && distractors[d] > 0 && unique.indexOf(distractors[d]) === -1) {
                        unique.push(distractors[d]);
                    }
                }
                // Pick 3
                while (choices.length < 4 && unique.length > 0) {
                    var pick = Math.floor(Math.random() * unique.length);
                    choices.push(unique.splice(pick, 1)[0]);
                }
                // Fill with random if needed
                while (choices.length < 4) {
                    choices.push(answer + Math.floor(Math.random() * 10) + 1);
                }
                // Shuffle
                for (var s = choices.length - 1; s > 0; s--) {
                    var j = Math.floor(Math.random() * (s + 1));
                    var tmp = choices[s]; choices[s] = choices[j]; choices[j] = tmp;
                }
                for (var b = 0; b < guessButtons.length; b++) {
                    guessButtons[b].textContent = String(choices[b]);
                }
            }

            updateGuessButtons();

            function draw(t) {
                if (lastTime === null) lastTime = t;
                var dt = (t - lastTime) / 1000;
                lastTime = t;

                var ctx = viz.ctx;
                ctx.fillStyle = '#0c0c20';
                ctx.fillRect(0, 0, viz.width, viz.height);

                // Title
                ctx.fillStyle = '#f0f6fc';
                ctx.font = 'bold 22px -apple-system, sans-serif';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'top';
                ctx.fillText('What Comes Next?', viz.width / 2, 12);

                // Streak display
                if (streak > 0) {
                    ctx.fillStyle = '#d29922';
                    ctx.font = 'bold 14px -apple-system, sans-serif';
                    ctx.textAlign = 'right';
                    ctx.fillText('Streak: ' + streak, viz.width - 20, 16);
                }

                // Draw sequence boxes
                var boxSize = 70;
                var boxGap = 18;
                var totalW = 5 * boxSize + 4 * boxGap;
                var startX = (viz.width - totalW) / 2;
                var boxY = 80;

                for (var i = 0; i < 5; i++) {
                    var bx = startX + i * (boxSize + boxGap);
                    var by = boxY;
                    var isMissing = (i === missingIndex);

                    // Box background
                    if (isMissing && showResult && correct) {
                        ctx.fillStyle = '#3fb95044';
                        ctx.strokeStyle = '#3fb950';
                    } else if (isMissing && showResult && !correct) {
                        ctx.fillStyle = '#f8514944';
                        ctx.strokeStyle = '#f85149';
                    } else if (isMissing) {
                        ctx.fillStyle = '#58a6ff22';
                        ctx.strokeStyle = '#58a6ff';
                    } else {
                        ctx.fillStyle = '#1a1a40';
                        ctx.strokeStyle = '#3a3a6a';
                    }
                    ctx.lineWidth = 3;
                    ctx.beginPath();
                    ctx.roundRect(bx, by, boxSize, boxSize, 10);
                    ctx.fill();
                    ctx.stroke();

                    // Number or question mark
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';

                    if (isMissing && !showResult) {
                        // Animated question mark
                        var bounce = Math.sin(t / 300) * 3;
                        ctx.fillStyle = '#58a6ff';
                        ctx.font = 'bold 32px -apple-system, sans-serif';
                        ctx.fillText('?', bx + boxSize / 2, by + boxSize / 2 + bounce);
                    } else if (isMissing && showResult) {
                        ctx.fillStyle = correct ? '#3fb950' : '#f85149';
                        ctx.font = 'bold 28px -apple-system, sans-serif';
                        ctx.fillText(String(answer), bx + boxSize / 2, by + boxSize / 2);
                    } else {
                        ctx.fillStyle = '#f0f6fc';
                        ctx.font = 'bold 28px -apple-system, sans-serif';
                        ctx.fillText(String(sequence[i]), bx + boxSize / 2, by + boxSize / 2);
                    }

                    // Arrow between boxes
                    if (i < 4) {
                        var arrowX = bx + boxSize + boxGap / 2;
                        var arrowY = by + boxSize / 2;
                        ctx.fillStyle = '#4a4a7a';
                        ctx.font = '18px -apple-system, sans-serif';
                        ctx.textAlign = 'center';
                        ctx.textBaseline = 'middle';
                        ctx.fillText('\u2192', arrowX, arrowY);
                    }
                }

                // Show the rule
                var step = sequence[1] - sequence[0];
                var ruleY = boxY + boxSize + 25;
                ctx.fillStyle = '#8b949e';
                ctx.font = '15px -apple-system, sans-serif';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'top';
                if (step > 0) {
                    ctx.fillText('Rule: Add ' + step + ' each time', viz.width / 2, ruleY);
                } else {
                    ctx.fillText('Rule: Subtract ' + Math.abs(step) + ' each time', viz.width / 2, ruleY);
                }

                // Step indicators between boxes
                var stepY = boxY + boxSize + 6;
                ctx.font = 'bold 12px -apple-system, sans-serif';
                ctx.fillStyle = '#f0883e';
                for (var s = 0; s < 4; s++) {
                    var sx = startX + s * (boxSize + boxGap) + boxSize + boxGap / 2;
                    ctx.fillText((step > 0 ? '+' : '') + step, sx, stepY);
                }

                // Result message
                if (showResult) {
                    var msgY = ruleY + 35;
                    ctx.font = 'bold 22px -apple-system, sans-serif';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'top';
                    if (correct) {
                        ctx.fillStyle = '#3fb950';
                        ctx.fillText('Correct! Great job!', viz.width / 2, msgY);
                    } else {
                        ctx.fillStyle = '#f85149';
                        ctx.fillText('Not quite! The answer is ' + answer, viz.width / 2, msgY);
                    }
                }

                // Confetti animation
                if (confetti.length > 0) {
                    confettiTime += dt;
                    for (var c = 0; c < confetti.length; c++) {
                        var p = confetti[c];
                        p.x += p.vx * dt;
                        p.y += p.vy * dt;
                        p.vy += 400 * dt; // gravity
                        p.rotation += dt * 5;

                        if (p.y < viz.height + 20) {
                            ctx.save();
                            ctx.translate(p.x, p.y);
                            ctx.rotate(p.rotation);
                            ctx.fillStyle = p.color;
                            ctx.globalAlpha = Math.max(0, 1 - confettiTime * 0.5);
                            ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
                            ctx.globalAlpha = 1.0;
                            ctx.restore();
                        }
                    }
                    // Clear confetti after 3 seconds
                    if (confettiTime > 3) confetti = [];
                }
            }

            viz.animate(draw);
            return viz;
        }
    }
];

// ============================================================
// Section 3: Hundred Chart — Interactive Multiples Highlighter
// ============================================================
window.EXTRA_VIZ['ch05']['ch05-sec03'] = [
    {
        id: 'ch05-extra-viz-3',
        title: 'Hundred Chart Patterns',
        description: 'Pick a multiplier to see which numbers light up on the hundred chart! Notice the patterns!',
        setup: function(container, controls) {
            var viz = new VizEngine(container, {
                width: 600, height: 480, scale: 1,
                originX: 0, originY: 0
            });

            var multiplier = 2;
            var animProgress = 0;
            var lastTime = null;

            // Multiplier colors
            var multColors = {
                2:  '#3fb950',
                3:  '#58a6ff',
                4:  '#bc8cff',
                5:  '#f0883e',
                6:  '#f778ba',
                7:  '#d29922',
                8:  '#3fb9a0',
                9:  '#f85149',
                10: '#58a6ff'
            };

            // Multiplier slider
            var multGroup = document.createElement('div');
            multGroup.className = 'viz-slider-group';
            var multLabel = document.createElement('span');
            multLabel.className = 'viz-slider-label';
            multLabel.textContent = 'Multiples of: ';
            var multSlider = document.createElement('input');
            multSlider.type = 'range';
            multSlider.className = 'viz-slider';
            multSlider.min = '2';
            multSlider.max = '10';
            multSlider.step = '1';
            multSlider.value = String(multiplier);
            var multVal = document.createElement('span');
            multVal.className = 'viz-slider-value';
            multVal.textContent = String(multiplier);
            multSlider.addEventListener('input', function() {
                multiplier = parseInt(multSlider.value);
                multVal.textContent = String(multiplier);
                animProgress = 0;
                lastTime = null;
            });
            multGroup.appendChild(multLabel);
            multGroup.appendChild(multSlider);
            multGroup.appendChild(multVal);
            controls.appendChild(multGroup);

            // Replay button
            var replayBtn = document.createElement('button');
            replayBtn.textContent = 'Replay';
            replayBtn.style.cssText = 'padding:6px 14px;border:1px solid #30363d;border-radius:6px;background:#1a1a40;color:#c9d1d9;font-size:0.85rem;cursor:pointer;margin-left:8px;';
            replayBtn.addEventListener('click', function() {
                animProgress = 0;
                lastTime = null;
            });
            controls.appendChild(replayBtn);

            function draw(t) {
                if (lastTime === null) lastTime = t;
                var dt = (t - lastTime) / 1000;
                lastTime = t;

                animProgress += dt * 4; // reveal ~4 cells per second
                var totalMultiples = Math.floor(100 / multiplier);
                var revealedCount = Math.min(Math.floor(animProgress), totalMultiples);

                var ctx = viz.ctx;
                ctx.fillStyle = '#0c0c20';
                ctx.fillRect(0, 0, viz.width, viz.height);

                // Title
                ctx.fillStyle = '#f0f6fc';
                ctx.font = 'bold 18px -apple-system, sans-serif';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'top';
                ctx.fillText('Multiples of ' + multiplier + ' on the Hundred Chart', viz.width / 2, 8);

                // Grid layout
                var cellSize = 46;
                var gap = 2;
                var gridWidth = 10 * cellSize + 9 * gap;
                var gridLeft = (viz.width - gridWidth) / 2;
                var gridTop = 38;

                var highlightColor = multColors[multiplier] || '#58a6ff';

                // Build list of revealed multiples
                var revealedNums = [];
                for (var m = 1; m <= revealedCount; m++) {
                    revealedNums.push(m * multiplier);
                }

                // Draw 10x10 grid
                for (var row = 0; row < 10; row++) {
                    for (var col = 0; col < 10; col++) {
                        var num = row * 10 + col + 1;
                        var cx = gridLeft + col * (cellSize + gap);
                        var cy = gridTop + row * (cellSize + gap);

                        var isMultiple = (num % multiplier === 0);
                        var isRevealed = revealedNums.indexOf(num) !== -1;
                        var isNewest = (revealedNums.length > 0 && num === revealedNums[revealedNums.length - 1]);

                        // Cell background
                        if (isRevealed) {
                            if (isNewest) {
                                var pulse = Math.sin(t / 120) * 0.3 + 0.7;
                                ctx.shadowColor = highlightColor;
                                ctx.shadowBlur = 18 * pulse;
                            }
                            ctx.fillStyle = highlightColor;
                        } else if (isMultiple && revealedCount >= totalMultiples) {
                            ctx.fillStyle = highlightColor;
                        } else {
                            ctx.fillStyle = '#161630';
                        }

                        ctx.beginPath();
                        ctx.roundRect(cx, cy, cellSize, cellSize, 4);
                        ctx.fill();
                        ctx.shadowBlur = 0;

                        // Border
                        ctx.strokeStyle = isRevealed ? highlightColor : '#2a2a50';
                        ctx.lineWidth = isRevealed ? 2 : 0.5;
                        ctx.beginPath();
                        ctx.roundRect(cx, cy, cellSize, cellSize, 4);
                        ctx.stroke();

                        // Number text
                        ctx.textAlign = 'center';
                        ctx.textBaseline = 'middle';
                        if (isRevealed || (isMultiple && revealedCount >= totalMultiples)) {
                            ctx.fillStyle = '#ffffff';
                            ctx.font = 'bold 15px -apple-system, sans-serif';
                        } else {
                            ctx.fillStyle = '#5a5a7a';
                            ctx.font = '13px -apple-system, sans-serif';
                        }
                        ctx.fillText(String(num), cx + cellSize / 2, cy + cellSize / 2);
                    }
                }

                // Count and info at the bottom
                var infoY = gridTop + 10 * (cellSize + gap) + 6;
                var displayCount = Math.min(revealedCount, totalMultiples);
                ctx.fillStyle = highlightColor;
                ctx.font = 'bold 14px -apple-system, sans-serif';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'top';
                ctx.fillText('There are ' + totalMultiples + ' multiples of ' + multiplier + ' from 1 to 100', viz.width / 2, infoY);

                // Show a portion of the sequence
                if (revealedNums.length > 0) {
                    var seqStr = revealedNums.join(', ');
                    if (seqStr.length > 70) seqStr = seqStr.substring(0, 67) + '...';
                    ctx.fillStyle = '#8b949e';
                    ctx.font = '12px -apple-system, sans-serif';
                    ctx.fillText(seqStr, viz.width / 2, infoY + 20);
                }
            }

            viz.animate(draw);
            return viz;
        }
    }
];

// ============================================================
// Section 4: Figurate Numbers — Triangular & Square Numbers
// ============================================================
window.EXTRA_VIZ['ch05']['ch05-sec04'] = [
    {
        id: 'ch05-extra-viz-4',
        title: 'Triangular & Square Numbers',
        description: 'See how dots arrange into triangles and squares! Watch them build row by row.',
        setup: function(container, controls) {
            var viz = new VizEngine(container, {
                width: 600, height: 420, scale: 1,
                originX: 0, originY: 0
            });

            var n = 4;
            var animProgress = 0;
            var lastTime = null;
            var animating = true;

            // Slider for n
            var nGroup = document.createElement('div');
            nGroup.className = 'viz-slider-group';
            var nLabel = document.createElement('span');
            nLabel.className = 'viz-slider-label';
            nLabel.textContent = 'n = ';
            var nSlider = document.createElement('input');
            nSlider.type = 'range';
            nSlider.className = 'viz-slider';
            nSlider.min = '1';
            nSlider.max = '8';
            nSlider.step = '1';
            nSlider.value = String(n);
            var nVal = document.createElement('span');
            nVal.className = 'viz-slider-value';
            nVal.textContent = String(n);
            nSlider.addEventListener('input', function() {
                n = parseInt(nSlider.value);
                nVal.textContent = String(n);
                animProgress = 0;
                lastTime = null;
            });
            nGroup.appendChild(nLabel);
            nGroup.appendChild(nSlider);
            nGroup.appendChild(nVal);
            controls.appendChild(nGroup);

            // Replay button
            var replayBtn = document.createElement('button');
            replayBtn.textContent = 'Replay';
            replayBtn.style.cssText = 'padding:6px 14px;border:1px solid #30363d;border-radius:6px;background:#1a1a40;color:#c9d1d9;font-size:0.85rem;cursor:pointer;margin-left:8px;';
            replayBtn.addEventListener('click', function() {
                animProgress = 0;
                lastTime = null;
            });
            controls.appendChild(replayBtn);

            // Row colors for visual distinction
            var rowColors = ['#f85149', '#f0883e', '#d29922', '#3fb950', '#3fb9a0', '#58a6ff', '#bc8cff', '#f778ba'];

            function draw(t) {
                if (lastTime === null) lastTime = t;
                var dt = (t - lastTime) / 1000;
                lastTime = t;

                animProgress += dt * 1.2; // reveal ~1.2 rows per second
                var revealedRows = Math.min(Math.floor(animProgress), n);

                var ctx = viz.ctx;
                ctx.fillStyle = '#0c0c20';
                ctx.fillRect(0, 0, viz.width, viz.height);

                // Title
                ctx.fillStyle = '#f0f6fc';
                ctx.font = 'bold 18px -apple-system, sans-serif';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'top';
                ctx.fillText('Figurate Numbers (n = ' + n + ')', viz.width / 2, 8);

                // Calculate triangular and square numbers
                var triangularN = 0;
                for (var i = 1; i <= n; i++) triangularN += i;
                var squareN = n * n;

                // --- LEFT SIDE: Triangular Number ---
                var leftCenterX = viz.width / 4;
                var topY = 50;

                ctx.fillStyle = '#58a6ff';
                ctx.font = 'bold 16px -apple-system, sans-serif';
                ctx.textAlign = 'center';
                ctx.fillText('Triangular Number', leftCenterX, topY);

                // Calculate dot size based on n
                var maxDotRadius = Math.max(5, Math.min(16, 80 / n));
                var dotSpacing = maxDotRadius * 2.5;

                // Draw triangle of dots
                var triStartY = topY + 30;
                var triDotsDrawn = 0;

                for (var row = 1; row <= n; row++) {
                    var rowWidth = row * dotSpacing;
                    var rowStartX = leftCenterX - rowWidth / 2 + dotSpacing / 2;
                    var rowY = triStartY + (row - 1) * dotSpacing;
                    var rowRevealed = (row <= revealedRows);

                    for (var col = 0; col < row; col++) {
                        var dx = rowStartX + col * dotSpacing;
                        var dy = rowY;

                        if (rowRevealed) {
                            // Animate pop-in for newest row
                            var scale = 1.0;
                            if (row === revealedRows) {
                                var rowT = animProgress - revealedRows + 1;
                                scale = Math.min(1, rowT * 2);
                            }

                            var r = maxDotRadius * scale;
                            // Glow
                            ctx.shadowColor = rowColors[(row - 1) % rowColors.length];
                            ctx.shadowBlur = 8;
                            ctx.fillStyle = rowColors[(row - 1) % rowColors.length];
                            ctx.beginPath();
                            ctx.arc(dx, dy, r, 0, Math.PI * 2);
                            ctx.fill();
                            ctx.shadowBlur = 0;

                            // Highlight
                            ctx.fillStyle = 'rgba(255,255,255,0.25)';
                            ctx.beginPath();
                            ctx.arc(dx - r * 0.2, dy - r * 0.25, r * 0.35, 0, Math.PI * 2);
                            ctx.fill();

                            triDotsDrawn++;
                        } else {
                            // Ghost dot
                            ctx.strokeStyle = '#3a3a5a';
                            ctx.lineWidth = 1;
                            ctx.setLineDash([2, 2]);
                            ctx.beginPath();
                            ctx.arc(dx, dy, maxDotRadius * 0.6, 0, Math.PI * 2);
                            ctx.stroke();
                            ctx.setLineDash([]);
                        }
                    }

                    // Row count label on the right
                    if (rowRevealed) {
                        var labelX = leftCenterX + (row * dotSpacing) / 2 + dotSpacing * 0.6;
                        ctx.fillStyle = rowColors[(row - 1) % rowColors.length];
                        ctx.font = 'bold 12px -apple-system, sans-serif';
                        ctx.textAlign = 'left';
                        ctx.textBaseline = 'middle';
                        ctx.fillText('+' + row, labelX, triStartY + (row - 1) * dotSpacing);
                    }
                }

                // Triangular number formula and value
                var formulaY = triStartY + n * dotSpacing + 15;
                ctx.fillStyle = '#58a6ff';
                ctx.font = 'bold 14px -apple-system, sans-serif';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'top';

                // Build the formula string
                var sumParts = [];
                for (var fi = 1; fi <= n; fi++) sumParts.push(fi);
                var formulaStr = 'T(' + n + ') = ' + sumParts.join(' + ');
                ctx.fillText(formulaStr, leftCenterX, formulaY);

                ctx.fillStyle = '#3fb950';
                ctx.font = 'bold 20px -apple-system, sans-serif';
                ctx.fillText('= ' + triangularN, leftCenterX, formulaY + 22);

                // --- RIGHT SIDE: Square Number ---
                var rightCenterX = viz.width * 3 / 4;

                ctx.fillStyle = '#f0883e';
                ctx.font = 'bold 16px -apple-system, sans-serif';
                ctx.textAlign = 'center';
                ctx.fillText('Square Number', rightCenterX, topY);

                // Draw square of dots
                var sqStartY = triStartY;
                var sqWidth = n * dotSpacing;
                var sqStartX = rightCenterX - sqWidth / 2 + dotSpacing / 2;

                for (var srow = 0; srow < n; srow++) {
                    var sqRowRevealed = (srow < revealedRows);

                    for (var scol = 0; scol < n; scol++) {
                        var sdx = sqStartX + scol * dotSpacing;
                        var sdy = sqStartY + srow * dotSpacing;

                        if (sqRowRevealed) {
                            var sScale = 1.0;
                            if (srow === revealedRows - 1) {
                                var sRowT = animProgress - revealedRows + 1;
                                sScale = Math.min(1, sRowT * 2);
                            }

                            var sr = maxDotRadius * sScale;
                            ctx.shadowColor = rowColors[srow % rowColors.length];
                            ctx.shadowBlur = 8;
                            ctx.fillStyle = rowColors[srow % rowColors.length];
                            ctx.beginPath();
                            ctx.arc(sdx, sdy, sr, 0, Math.PI * 2);
                            ctx.fill();
                            ctx.shadowBlur = 0;

                            // Highlight
                            ctx.fillStyle = 'rgba(255,255,255,0.25)';
                            ctx.beginPath();
                            ctx.arc(sdx - sr * 0.2, sdy - sr * 0.25, sr * 0.35, 0, Math.PI * 2);
                            ctx.fill();
                        } else {
                            ctx.strokeStyle = '#3a3a5a';
                            ctx.lineWidth = 1;
                            ctx.setLineDash([2, 2]);
                            ctx.beginPath();
                            ctx.arc(sdx, sdy, maxDotRadius * 0.6, 0, Math.PI * 2);
                            ctx.stroke();
                            ctx.setLineDash([]);
                        }
                    }

                    // Row count label
                    if (sqRowRevealed) {
                        var sqLabelX = sqStartX + n * dotSpacing + dotSpacing * 0.2;
                        ctx.fillStyle = rowColors[srow % rowColors.length];
                        ctx.font = 'bold 12px -apple-system, sans-serif';
                        ctx.textAlign = 'left';
                        ctx.textBaseline = 'middle';
                        ctx.fillText('+' + n, sqLabelX, sqStartY + srow * dotSpacing);
                    }
                }

                // Square number formula and value
                ctx.fillStyle = '#f0883e';
                ctx.font = 'bold 14px -apple-system, sans-serif';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'top';
                ctx.fillText(n + ' \u00D7 ' + n + ' = ' + n + '\u00B2', rightCenterX, formulaY);

                ctx.fillStyle = '#3fb950';
                ctx.font = 'bold 20px -apple-system, sans-serif';
                ctx.fillText('= ' + squareN, rightCenterX, formulaY + 22);

                // Divider line
                ctx.strokeStyle = '#2a2a50';
                ctx.lineWidth = 1;
                ctx.setLineDash([4, 4]);
                ctx.beginPath();
                ctx.moveTo(viz.width / 2, topY + 20);
                ctx.lineTo(viz.width / 2, formulaY + 50);
                ctx.stroke();
                ctx.setLineDash([]);

                // Fun fact at bottom
                var factY = viz.height - 40;
                ctx.fillStyle = '#6a6a8a';
                ctx.font = '13px -apple-system, sans-serif';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'top';
                ctx.fillText('Fun fact: T(' + n + ') = ' + n + '(' + n + '+1)/2 = ' + triangularN + '    |    ' + n + '\u00B2 = ' + squareN, viz.width / 2, factY);
            }

            viz.animate(draw);
            return viz;
        }
    }
];

// ============================================================
// Section 5: Create Pattern — Pattern Builder & Detector
// ============================================================
window.EXTRA_VIZ['ch05']['ch05-sec05'] = [
    {
        id: 'ch05-extra-viz-5',
        title: 'Pattern Builder',
        description: 'Click circles to paint them different colors, then extend the pattern!',
        setup: function(container, controls) {
            var viz = new VizEngine(container, {
                width: 600, height: 360, scale: 1,
                originX: 0, originY: 0
            });

            var colorPalette = ['#f85149', '#58a6ff', '#3fb950', '#d29922'];
            var colorNames = ['Red', 'Blue', 'Green', 'Yellow'];
            var baseCount = 10;
            var circles = [];
            var extendedCircles = [];
            var detectedPattern = null;
            var detectedLength = 0;

            // Initialize circles
            function resetCircles() {
                circles = [];
                for (var i = 0; i < baseCount; i++) {
                    circles.push({ color: null, colorIndex: -1 });
                }
                extendedCircles = [];
                detectedPattern = null;
                detectedLength = 0;
            }
            resetCircles();

            // Buttons
            var btnGroup = document.createElement('div');
            btnGroup.style.cssText = 'display:flex;gap:6px;flex-wrap:wrap;align-items:center;';

            // Extend button
            var extendBtn = document.createElement('button');
            extendBtn.textContent = 'Extend Pattern';
            extendBtn.style.cssText = 'padding:8px 16px;border:2px solid #3fb950;border-radius:8px;background:#3fb950;color:#ffffff;font-size:0.85rem;font-weight:bold;cursor:pointer;';
            extendBtn.addEventListener('click', function() {
                detectPattern();
                if (detectedPattern !== null && detectedLength > 0) {
                    extendedCircles = [];
                    for (var e = 0; e < 5; e++) {
                        var idx = (circles.length + e) % detectedLength;
                        extendedCircles.push({ color: detectedPattern[idx], colorIndex: colorPalette.indexOf(detectedPattern[idx]) });
                    }
                }
            });
            btnGroup.appendChild(extendBtn);

            // Clear button
            var clearBtn = document.createElement('button');
            clearBtn.textContent = 'Clear All';
            clearBtn.style.cssText = 'padding:8px 16px;border:2px solid #f85149;border-radius:8px;background:#1a1a40;color:#f85149;font-size:0.85rem;font-weight:bold;cursor:pointer;';
            clearBtn.addEventListener('click', function() {
                resetCircles();
            });
            btnGroup.appendChild(clearBtn);

            // Preset buttons
            var presetLabel = document.createElement('span');
            presetLabel.style.cssText = 'color:#8b949e;font-size:0.8rem;margin-left:10px;';
            presetLabel.textContent = 'Presets:';
            btnGroup.appendChild(presetLabel);

            var presets = [
                { name: 'AB', pattern: [0, 1] },
                { name: 'ABC', pattern: [0, 1, 2] },
                { name: 'ABAC', pattern: [0, 1, 0, 2] },
                { name: 'ABBA', pattern: [0, 1, 1, 0] }
            ];

            presets.forEach(function(preset) {
                var pBtn = document.createElement('button');
                pBtn.textContent = preset.name;
                pBtn.style.cssText = 'padding:4px 10px;border:1px solid #58a6ff;border-radius:6px;background:#1a1a40;color:#58a6ff;font-size:0.78rem;cursor:pointer;';
                pBtn.addEventListener('click', function() {
                    resetCircles();
                    for (var i = 0; i < baseCount; i++) {
                        var pi = i % preset.pattern.length;
                        circles[i].colorIndex = preset.pattern[pi];
                        circles[i].color = colorPalette[preset.pattern[pi]];
                    }
                });
                btnGroup.appendChild(pBtn);
            });

            controls.appendChild(btnGroup);

            // Click detection
            var circlePositions = [];

            viz.canvas.addEventListener('click', function(e) {
                var rect = viz.canvas.getBoundingClientRect();
                var mx = e.clientX - rect.left;
                var my = e.clientY - rect.top;

                for (var i = 0; i < circlePositions.length; i++) {
                    var cp = circlePositions[i];
                    if (cp.isExtended) continue; // Don't allow editing extended circles
                    var dx = mx - cp.x;
                    var dy = my - cp.y;
                    if (dx * dx + dy * dy < cp.r * cp.r) {
                        // Cycle through colors
                        var ci = circles[cp.index];
                        ci.colorIndex = (ci.colorIndex + 1) % colorPalette.length;
                        ci.color = colorPalette[ci.colorIndex];
                        // Clear extension when editing
                        extendedCircles = [];
                        detectedPattern = null;
                        break;
                    }
                }
            });

            // Pattern detection
            function detectPattern() {
                // Check if all circles have been colored
                var colored = 0;
                for (var i = 0; i < circles.length; i++) {
                    if (circles[i].color !== null) colored++;
                }
                if (colored < 3) {
                    detectedPattern = null;
                    detectedLength = 0;
                    return;
                }

                // Try pattern lengths from 1 to half the colored count
                var colorArr = [];
                for (var c = 0; c < circles.length; c++) {
                    if (circles[c].color !== null) {
                        colorArr.push(circles[c].color);
                    }
                }

                for (var len = 1; len <= Math.floor(colorArr.length / 2); len++) {
                    var isPattern = true;
                    for (var j = len; j < colorArr.length; j++) {
                        if (colorArr[j] !== colorArr[j % len]) {
                            isPattern = false;
                            break;
                        }
                    }
                    if (isPattern) {
                        detectedPattern = colorArr.slice(0, len);
                        detectedLength = len;
                        return;
                    }
                }

                // No clean pattern found
                detectedPattern = null;
                detectedLength = 0;
            }

            function draw(t) {
                var ctx = viz.ctx;
                ctx.fillStyle = '#0c0c20';
                ctx.fillRect(0, 0, viz.width, viz.height);

                // Title
                ctx.fillStyle = '#f0f6fc';
                ctx.font = 'bold 20px -apple-system, sans-serif';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'top';
                ctx.fillText('Pattern Builder', viz.width / 2, 10);

                ctx.fillStyle = '#8b949e';
                ctx.font = '13px -apple-system, sans-serif';
                ctx.fillText('Click each circle to change its color', viz.width / 2, 36);

                // Draw main circles
                var circleRadius = 22;
                var spacing = 46;
                var totalCount = circles.length + extendedCircles.length;
                var totalWidth = totalCount * spacing;
                var startX = (viz.width - totalWidth) / 2 + spacing / 2;
                var rowY = 100;

                circlePositions = [];

                // Main circles
                for (var i = 0; i < circles.length; i++) {
                    var cx = startX + i * spacing;
                    var cy = rowY;
                    var c = circles[i];

                    circlePositions.push({ x: cx, y: cy, r: circleRadius, index: i, isExtended: false });

                    if (c.color !== null) {
                        // Filled circle
                        ctx.shadowColor = c.color;
                        ctx.shadowBlur = 10;
                        ctx.fillStyle = c.color;
                        ctx.beginPath();
                        ctx.arc(cx, cy, circleRadius, 0, Math.PI * 2);
                        ctx.fill();
                        ctx.shadowBlur = 0;

                        // Highlight
                        ctx.fillStyle = 'rgba(255,255,255,0.2)';
                        ctx.beginPath();
                        ctx.arc(cx - circleRadius * 0.25, cy - circleRadius * 0.25, circleRadius * 0.3, 0, Math.PI * 2);
                        ctx.fill();

                        // Position number
                        ctx.fillStyle = '#ffffff';
                        ctx.font = 'bold 12px -apple-system, sans-serif';
                        ctx.textAlign = 'center';
                        ctx.textBaseline = 'middle';
                        ctx.fillText(String(i + 1), cx, cy);
                    } else {
                        // Empty circle
                        ctx.strokeStyle = '#4a4a7a';
                        ctx.lineWidth = 2;
                        ctx.setLineDash([4, 3]);
                        ctx.beginPath();
                        ctx.arc(cx, cy, circleRadius, 0, Math.PI * 2);
                        ctx.stroke();
                        ctx.setLineDash([]);

                        // Position number
                        ctx.fillStyle = '#4a4a7a';
                        ctx.font = '12px -apple-system, sans-serif';
                        ctx.textAlign = 'center';
                        ctx.textBaseline = 'middle';
                        ctx.fillText(String(i + 1), cx, cy);
                    }
                }

                // Divider if extended
                if (extendedCircles.length > 0) {
                    var divX = startX + circles.length * spacing - spacing / 2;
                    ctx.strokeStyle = '#58a6ff';
                    ctx.lineWidth = 2;
                    ctx.setLineDash([4, 4]);
                    ctx.beginPath();
                    ctx.moveTo(divX, rowY - circleRadius - 10);
                    ctx.lineTo(divX, rowY + circleRadius + 10);
                    ctx.stroke();
                    ctx.setLineDash([]);

                    ctx.fillStyle = '#58a6ff';
                    ctx.font = 'bold 11px -apple-system, sans-serif';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'bottom';
                    ctx.fillText('Extended', divX, rowY - circleRadius - 14);
                }

                // Extended circles
                for (var e = 0; e < extendedCircles.length; e++) {
                    var ecx = startX + (circles.length + e) * spacing;
                    var ecy = rowY;
                    var ec = extendedCircles[e];

                    circlePositions.push({ x: ecx, y: ecy, r: circleRadius, index: circles.length + e, isExtended: true });

                    // Animated pop-in
                    var popPhase = Math.min(1, (t / 1000 % 10) * 3 - e * 0.3);
                    if (popPhase < 0) popPhase = 0;
                    var eScale = Math.min(1, popPhase);

                    var er = circleRadius * eScale;
                    if (er > 0) {
                        ctx.shadowColor = ec.color;
                        ctx.shadowBlur = 12;
                        ctx.fillStyle = ec.color;
                        ctx.beginPath();
                        ctx.arc(ecx, ecy, er, 0, Math.PI * 2);
                        ctx.fill();
                        ctx.shadowBlur = 0;

                        // Sparkle effect
                        var sparkle = Math.sin(t / 200 + e) * 0.3 + 0.7;
                        ctx.fillStyle = 'rgba(255,255,255,' + (sparkle * 0.3) + ')';
                        ctx.beginPath();
                        ctx.arc(ecx - er * 0.25, ecy - er * 0.25, er * 0.3, 0, Math.PI * 2);
                        ctx.fill();

                        // Position number
                        ctx.fillStyle = '#ffffff';
                        ctx.font = 'bold 12px -apple-system, sans-serif';
                        ctx.textAlign = 'center';
                        ctx.textBaseline = 'middle';
                        ctx.fillText(String(circles.length + e + 1), ecx, ecy);
                    }
                }

                // Pattern detection display
                var detectY = 170;

                // Run detection for display
                detectPattern();

                ctx.textAlign = 'center';
                ctx.textBaseline = 'top';

                if (detectedPattern !== null && detectedLength > 0) {
                    ctx.fillStyle = '#3fb950';
                    ctx.font = 'bold 16px -apple-system, sans-serif';
                    ctx.fillText('Pattern detected! Repeating unit of length ' + detectedLength + ':', viz.width / 2, detectY);

                    // Draw the pattern unit
                    var unitSpacing = 36;
                    var unitStartX = (viz.width - detectedLength * unitSpacing) / 2 + unitSpacing / 2;
                    var unitY = detectY + 40;

                    for (var u = 0; u < detectedLength; u++) {
                        var ux = unitStartX + u * unitSpacing;
                        ctx.fillStyle = detectedPattern[u];
                        ctx.beginPath();
                        ctx.arc(ux, unitY, 14, 0, Math.PI * 2);
                        ctx.fill();

                        // Label (A, B, C, ...)
                        // Map colors to letters
                        var colorIdx = colorPalette.indexOf(detectedPattern[u]);
                        var letter = String.fromCharCode(65 + colorIdx);
                        ctx.fillStyle = '#ffffff';
                        ctx.font = 'bold 11px -apple-system, sans-serif';
                        ctx.textAlign = 'center';
                        ctx.textBaseline = 'middle';
                        ctx.fillText(letter, ux, unitY);
                    }

                    // Build pattern name
                    var patternName = '';
                    for (var pn = 0; pn < detectedLength; pn++) {
                        var pci = colorPalette.indexOf(detectedPattern[pn]);
                        patternName += String.fromCharCode(65 + pci);
                    }
                    ctx.fillStyle = '#8b949e';
                    ctx.font = '14px -apple-system, sans-serif';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'top';
                    ctx.fillText('Pattern: ' + patternName, viz.width / 2, unitY + 22);
                } else {
                    // Check if any circles are colored
                    var anyColored = false;
                    for (var ac = 0; ac < circles.length; ac++) {
                        if (circles[ac].color !== null) { anyColored = true; break; }
                    }
                    if (anyColored) {
                        ctx.fillStyle = '#d29922';
                        ctx.font = '15px -apple-system, sans-serif';
                        ctx.fillText('No repeating pattern detected yet. Keep building!', viz.width / 2, detectY);
                    } else {
                        ctx.fillStyle = '#6a6a8a';
                        ctx.font = '15px -apple-system, sans-serif';
                        ctx.fillText('Click the circles above to start building a pattern!', viz.width / 2, detectY);
                    }
                }

                // Color legend at the bottom
                var legendY = viz.height - 50;
                ctx.fillStyle = '#8b949e';
                ctx.font = '12px -apple-system, sans-serif';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'top';
                ctx.fillText('Colors:', viz.width / 2 - 120, legendY);

                for (var cl = 0; cl < colorPalette.length; cl++) {
                    var lx = viz.width / 2 - 60 + cl * 60;
                    ctx.fillStyle = colorPalette[cl];
                    ctx.beginPath();
                    ctx.arc(lx, legendY + 20, 10, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.fillStyle = '#c9d1d9';
                    ctx.font = '10px -apple-system, sans-serif';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'top';
                    ctx.fillText(colorNames[cl], lx, legendY + 34);
                }
            }

            viz.animate(draw);
            return viz;
        }
    }
];
