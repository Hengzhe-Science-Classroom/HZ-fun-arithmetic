// === Chapter 7: Estimation & Rounding — Extra Visualizations ===
// Fun, colorful, interactive visualizations for elementary school kids (ages 7-12)

window.EXTRA_VIZ = window.EXTRA_VIZ || {};
window.EXTRA_VIZ['ch07'] = window.EXTRA_VIZ['ch07'] || {};

// ============================================================
// Section 1: What Is Estimation? — "How Many Dots?" Game
// ============================================================
window.EXTRA_VIZ['ch07']['ch07-sec01'] = [
    {
        id: 'ch07-extra-viz-1',
        title: 'How Many Dots?',
        description: 'A bunch of colorful dots will flash on screen for 2 seconds. Estimate how many you see! Use the slider to lock in your guess, then see how close you got.',
        setup: function(container, controls) {
            var viz = new VizEngine(container, {
                width: 560, height: 400, scale: 1,
                originX: 0, originY: 0
            });

            var dotColors = [
                viz.colors.blue, viz.colors.teal, viz.colors.orange,
                viz.colors.green, viz.colors.purple, viz.colors.red,
                viz.colors.yellow, viz.colors.pink
            ];

            var dots = [];
            var actualCount = 0;
            var guess = 25;
            var phase = 'ready'; // 'ready', 'showing', 'guessing', 'revealed'
            var showStart = 0;
            var showDuration = 2000; // 2 seconds
            var flashAlpha = 1;
            var bestStreak = 0;
            var currentStreak = 0;
            var roundNum = 0;

            function generateDots() {
                dots = [];
                actualCount = 10 + Math.floor(Math.random() * 41); // 10-50
                var margin = 50;
                var areaW = viz.width - margin * 2;
                var areaH = viz.height - margin * 2 - 40;
                for (var i = 0; i < actualCount; i++) {
                    dots.push({
                        x: margin + Math.random() * areaW,
                        y: margin + 40 + Math.random() * areaH,
                        r: 6 + Math.random() * 8,
                        color: dotColors[Math.floor(Math.random() * dotColors.length)]
                    });
                }
            }

            generateDots();

            // Guess slider
            var guessGroup = document.createElement('div');
            guessGroup.className = 'viz-slider-group';
            var guessLabel = document.createElement('span');
            guessLabel.className = 'viz-slider-label';
            guessLabel.textContent = 'Your Guess: ';
            var guessSlider = document.createElement('input');
            guessSlider.type = 'range';
            guessSlider.className = 'viz-slider';
            guessSlider.min = '5';
            guessSlider.max = '60';
            guessSlider.step = '1';
            guessSlider.value = '25';
            guessSlider.disabled = true;
            var guessVal = document.createElement('span');
            guessVal.className = 'viz-slider-value';
            guessVal.textContent = '25';
            guessSlider.addEventListener('input', function() {
                guess = parseInt(guessSlider.value);
                guessVal.textContent = String(guess);
            });
            guessGroup.appendChild(guessLabel);
            guessGroup.appendChild(guessSlider);
            guessGroup.appendChild(guessVal);
            controls.appendChild(guessGroup);

            // Buttons row
            var btnRow = document.createElement('div');
            btnRow.style.cssText = 'display:flex;gap:8px;flex-wrap:wrap;align-items:center;';

            // Show Dots / Start button
            var showBtn = document.createElement('button');
            showBtn.textContent = 'Show Dots!';
            showBtn.style.cssText = 'padding:6px 16px;border:2px solid #3FB950;border-radius:6px;background:#3FB950;color:#ffffff;font-size:0.9rem;font-weight:bold;cursor:pointer;';
            showBtn.addEventListener('click', function() {
                if (phase === 'ready') {
                    phase = 'showing';
                    showStart = performance.now();
                    flashAlpha = 1;
                    showBtn.disabled = true;
                    guessSlider.disabled = true;
                    submitBtn.disabled = true;
                }
            });
            btnRow.appendChild(showBtn);

            // Submit guess button
            var submitBtn = document.createElement('button');
            submitBtn.textContent = 'Submit Guess';
            submitBtn.style.cssText = 'padding:6px 16px;border:2px solid #58A6FF;border-radius:6px;background:#1a1a40;color:#58A6FF;font-size:0.9rem;font-weight:bold;cursor:pointer;';
            submitBtn.disabled = true;
            submitBtn.addEventListener('click', function() {
                if (phase === 'guessing') {
                    phase = 'revealed';
                    submitBtn.disabled = true;
                    guessSlider.disabled = true;
                    newRoundBtn.disabled = false;
                    var diff = Math.abs(guess - actualCount);
                    if (diff <= Math.max(2, Math.round(actualCount * 0.15))) {
                        currentStreak++;
                        if (currentStreak > bestStreak) bestStreak = currentStreak;
                    } else {
                        currentStreak = 0;
                    }
                }
            });
            btnRow.appendChild(submitBtn);

            // New Round button
            var newRoundBtn = document.createElement('button');
            newRoundBtn.textContent = 'New Round';
            newRoundBtn.style.cssText = 'padding:6px 16px;border:2px solid #F0883E;border-radius:6px;background:#1a1a40;color:#F0883E;font-size:0.9rem;font-weight:bold;cursor:pointer;';
            newRoundBtn.disabled = true;
            newRoundBtn.addEventListener('click', function() {
                generateDots();
                phase = 'ready';
                guess = 25;
                guessSlider.value = '25';
                guessVal.textContent = '25';
                showBtn.disabled = false;
                submitBtn.disabled = true;
                newRoundBtn.disabled = true;
                guessSlider.disabled = true;
                roundNum++;
            });
            btnRow.appendChild(newRoundBtn);

            controls.appendChild(btnRow);

            function draw(t) {
                var ctx = viz.ctx;
                ctx.fillStyle = viz.colors.bg;
                ctx.fillRect(0, 0, viz.width, viz.height);

                // Title bar
                ctx.fillStyle = '#f0f6fc';
                ctx.font = 'bold 18px -apple-system, sans-serif';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'top';
                ctx.fillText('How Many Dots?', viz.width / 2, 8);

                // Streak display
                ctx.fillStyle = viz.colors.yellow;
                ctx.font = 'bold 13px -apple-system, sans-serif';
                ctx.textAlign = 'right';
                ctx.fillText('Streak: ' + currentStreak + '  Best: ' + bestStreak, viz.width - 15, 10);

                // Round info
                ctx.fillStyle = '#6a6a8a';
                ctx.font = '12px -apple-system, sans-serif';
                ctx.textAlign = 'left';
                ctx.fillText('Round ' + (roundNum + 1), 15, 10);

                if (phase === 'ready') {
                    // Draw a big prompt
                    ctx.fillStyle = '#3FB950';
                    ctx.font = 'bold 28px -apple-system, sans-serif';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.fillText('Press "Show Dots!" to begin', viz.width / 2, viz.height / 2);
                    ctx.fillStyle = '#6a6a8a';
                    ctx.font = '16px -apple-system, sans-serif';
                    ctx.fillText('You will see dots for 2 seconds', viz.width / 2, viz.height / 2 + 40);
                } else if (phase === 'showing') {
                    // Show dots with countdown
                    var elapsed = t - showStart;
                    var remaining = Math.max(0, showDuration - elapsed);

                    if (remaining <= 0) {
                        // Time is up - switch to guessing
                        phase = 'guessing';
                        guessSlider.disabled = false;
                        submitBtn.disabled = false;
                        showBtn.disabled = true;
                    } else {
                        // Draw the dots
                        for (var i = 0; i < dots.length; i++) {
                            var dot = dots[i];
                            ctx.shadowColor = dot.color;
                            ctx.shadowBlur = 8;
                            ctx.fillStyle = dot.color;
                            ctx.beginPath();
                            ctx.arc(dot.x, dot.y, dot.r, 0, Math.PI * 2);
                            ctx.fill();
                        }
                        ctx.shadowBlur = 0;

                        // Countdown timer bar
                        var barW = viz.width - 60;
                        var barH = 10;
                        var barX = 30;
                        var barY = 35;
                        var frac = remaining / showDuration;
                        ctx.fillStyle = '#1a1a40';
                        ctx.fillRect(barX, barY, barW, barH);
                        // Color transitions from green to red
                        var timerColor = frac > 0.5 ? viz.colors.green : (frac > 0.2 ? viz.colors.yellow : viz.colors.red);
                        ctx.fillStyle = timerColor;
                        ctx.fillRect(barX, barY, barW * frac, barH);
                        ctx.strokeStyle = '#4a4a7a';
                        ctx.lineWidth = 1;
                        ctx.strokeRect(barX, barY, barW, barH);

                        // Time text
                        ctx.fillStyle = '#f0f6fc';
                        ctx.font = 'bold 14px -apple-system, sans-serif';
                        ctx.textAlign = 'center';
                        ctx.textBaseline = 'bottom';
                        ctx.fillText((remaining / 1000).toFixed(1) + 's', viz.width / 2, barY - 2);
                    }
                } else if (phase === 'guessing') {
                    // Dots are hidden, user is guessing
                    ctx.fillStyle = viz.colors.blue;
                    ctx.font = 'bold 24px -apple-system, sans-serif';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.fillText('How many dots did you see?', viz.width / 2, viz.height / 2 - 40);

                    // Show the current guess big
                    ctx.fillStyle = viz.colors.teal;
                    ctx.font = 'bold 60px -apple-system, sans-serif';
                    ctx.fillText(String(guess), viz.width / 2, viz.height / 2 + 30);

                    ctx.fillStyle = '#8b949e';
                    ctx.font = '15px -apple-system, sans-serif';
                    ctx.fillText('Use the slider, then press "Submit Guess"', viz.width / 2, viz.height / 2 + 80);
                } else if (phase === 'revealed') {
                    // Show dots again with the answer
                    for (var j = 0; j < dots.length; j++) {
                        var d = dots[j];
                        ctx.shadowColor = d.color;
                        ctx.shadowBlur = 6;
                        ctx.fillStyle = d.color;
                        ctx.beginPath();
                        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
                        ctx.fill();
                    }
                    ctx.shadowBlur = 0;

                    // Overlay panel
                    var panelW = 320;
                    var panelH = 160;
                    var panelX = (viz.width - panelW) / 2;
                    var panelY = (viz.height - panelH) / 2 - 10;
                    ctx.fillStyle = 'rgba(12, 12, 32, 0.92)';
                    ctx.beginPath();
                    ctx.roundRect(panelX, panelY, panelW, panelH, 12);
                    ctx.fill();
                    ctx.strokeStyle = viz.colors.teal;
                    ctx.lineWidth = 2;
                    ctx.beginPath();
                    ctx.roundRect(panelX, panelY, panelW, panelH, 12);
                    ctx.stroke();

                    var diff = Math.abs(guess - actualCount);
                    var closeEnough = diff <= Math.max(2, Math.round(actualCount * 0.15));

                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    var cy = panelY + 30;

                    ctx.fillStyle = '#f0f6fc';
                    ctx.font = 'bold 16px -apple-system, sans-serif';
                    ctx.fillText('Actual Count: ' + actualCount, viz.width / 2, cy);

                    cy += 28;
                    ctx.fillStyle = viz.colors.blue;
                    ctx.font = '16px -apple-system, sans-serif';
                    ctx.fillText('Your Guess: ' + guess, viz.width / 2, cy);

                    cy += 28;
                    ctx.fillStyle = diff === 0 ? viz.colors.green : (closeEnough ? viz.colors.yellow : viz.colors.orange);
                    ctx.font = 'bold 16px -apple-system, sans-serif';
                    if (diff === 0) {
                        ctx.fillText('PERFECT! Exactly right!', viz.width / 2, cy);
                    } else {
                        ctx.fillText('Off by ' + diff + (closeEnough ? ' — Great estimate!' : ' — Keep practicing!'), viz.width / 2, cy);
                    }

                    cy += 30;
                    // Accuracy bar
                    var barMaxDiff = actualCount;
                    var accuracy = Math.max(0, 1 - diff / barMaxDiff);
                    var accBarW = 200;
                    var accBarH = 16;
                    var accBarX = (viz.width - accBarW) / 2;
                    ctx.fillStyle = '#1a1a40';
                    ctx.fillRect(accBarX, cy - accBarH / 2, accBarW, accBarH);
                    var accColor = accuracy > 0.85 ? viz.colors.green : (accuracy > 0.6 ? viz.colors.yellow : viz.colors.orange);
                    ctx.fillStyle = accColor;
                    ctx.fillRect(accBarX, cy - accBarH / 2, accBarW * accuracy, accBarH);
                    ctx.strokeStyle = '#4a4a7a';
                    ctx.lineWidth = 1;
                    ctx.strokeRect(accBarX, cy - accBarH / 2, accBarW, accBarH);
                    ctx.fillStyle = '#f0f6fc';
                    ctx.font = 'bold 11px -apple-system, sans-serif';
                    ctx.fillText(Math.round(accuracy * 100) + '% accuracy', viz.width / 2, cy);
                }
            }

            viz.animate(draw);
            return viz;
        }
    }
];

// ============================================================
// Section 2: Rounding to Tens — Interactive Number Line
// ============================================================
window.EXTRA_VIZ['ch07']['ch07-sec02'] = [
    {
        id: 'ch07-extra-viz-2',
        title: 'Rounding to the Nearest Ten',
        description: 'Drag the point along the number line to see how any number rounds to the nearest ten. The arrow shows which ten is closest!',
        setup: function(container, controls) {
            var viz = new VizEngine(container, {
                width: 560, height: 400, scale: 5,
                originX: 30, originY: 280
            });

            var currentVal = 37;

            // Draggable point on number line
            var dragPt = viz.addDraggable('numPt', currentVal, 0, viz.colors.blue, 12, function(wx) {
                currentVal = Math.max(0, Math.min(100, Math.round(wx)));
                dragPt.x = currentVal;
                dragPt.y = 0;
            });

            // Value slider as alternative input
            var valGroup = document.createElement('div');
            valGroup.className = 'viz-slider-group';
            var valLabel = document.createElement('span');
            valLabel.className = 'viz-slider-label';
            valLabel.textContent = 'Number: ';
            var valSlider = document.createElement('input');
            valSlider.type = 'range';
            valSlider.className = 'viz-slider';
            valSlider.min = '0';
            valSlider.max = '100';
            valSlider.step = '1';
            valSlider.value = String(currentVal);
            var valDisplay = document.createElement('span');
            valDisplay.className = 'viz-slider-value';
            valDisplay.textContent = String(currentVal);
            valSlider.addEventListener('input', function() {
                currentVal = parseInt(valSlider.value);
                valDisplay.textContent = String(currentVal);
                dragPt.x = currentVal;
                dragPt.y = 0;
            });
            valGroup.appendChild(valLabel);
            valGroup.appendChild(valSlider);
            valGroup.appendChild(valDisplay);
            controls.appendChild(valGroup);

            function draw(t) {
                viz.clear();
                var ctx = viz.ctx;

                // Sync slider with drag
                valSlider.value = String(currentVal);
                valDisplay.textContent = String(currentVal);

                // Rounding logic
                var roundedTo = Math.round(currentVal / 10) * 10;
                var lowerTen = Math.floor(currentVal / 10) * 10;
                var upperTen = Math.ceil(currentVal / 10) * 10;
                if (lowerTen === upperTen) upperTen = lowerTen + 10; // e.g. if exactly on a ten
                var onesDigit = currentVal % 10;

                // Title
                ctx.fillStyle = '#f0f6fc';
                ctx.font = 'bold 20px -apple-system, sans-serif';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'top';
                ctx.fillText('Rounding to the Nearest Ten', viz.width / 2, 8);

                // Big rounding result display
                ctx.font = 'bold 32px -apple-system, sans-serif';
                ctx.fillStyle = viz.colors.teal;
                ctx.fillText(currentVal + ' rounds to ' + roundedTo, viz.width / 2, 42);

                // Explanation
                ctx.font = '14px -apple-system, sans-serif';
                ctx.fillStyle = '#8b949e';
                if (onesDigit === 0) {
                    ctx.fillText(currentVal + ' is already a ten!', viz.width / 2, 82);
                } else if (onesDigit === 5) {
                    ctx.fillText('The ones digit is 5, so we round UP!', viz.width / 2, 82);
                } else if (onesDigit < 5) {
                    ctx.fillText('The ones digit is ' + onesDigit + ' (less than 5), so we round DOWN', viz.width / 2, 82);
                } else {
                    ctx.fillText('The ones digit is ' + onesDigit + ' (5 or more), so we round UP', viz.width / 2, 82);
                }

                // Number line
                var nlY = 0; // math coords
                var lineStartPx = viz.toScreen(0, nlY);
                var lineEndPx = viz.toScreen(100, nlY);
                ctx.strokeStyle = '#4a4a7a';
                ctx.lineWidth = 3;
                ctx.beginPath();
                ctx.moveTo(lineStartPx[0], lineStartPx[1]);
                ctx.lineTo(lineEndPx[0], lineEndPx[1]);
                ctx.stroke();

                // Draw tens as major tick marks
                for (var tens = 0; tens <= 100; tens += 10) {
                    var tPx = viz.toScreen(tens, nlY);
                    var isRounded = (tens === roundedTo);

                    // Tick mark
                    ctx.strokeStyle = isRounded ? viz.colors.green : '#6a6aaa';
                    ctx.lineWidth = isRounded ? 4 : 2;
                    ctx.beginPath();
                    ctx.moveTo(tPx[0], tPx[1] - 14);
                    ctx.lineTo(tPx[0], tPx[1] + 14);
                    ctx.stroke();

                    // Tens label
                    if (isRounded) {
                        // Highlighted with glow
                        ctx.shadowColor = viz.colors.green;
                        ctx.shadowBlur = 15;
                        ctx.fillStyle = viz.colors.green;
                        ctx.font = 'bold 18px -apple-system, sans-serif';
                    } else {
                        ctx.fillStyle = '#8b949e';
                        ctx.font = '14px -apple-system, sans-serif';
                    }
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'top';
                    ctx.fillText(String(tens), tPx[0], tPx[1] + 18);
                    ctx.shadowBlur = 0;
                }

                // Draw unit tick marks between lowerTen and upperTen for context
                var showLow = Math.max(0, lowerTen);
                var showHigh = Math.min(100, lowerTen + 10);
                for (var u = showLow; u <= showHigh; u++) {
                    if (u % 10 === 0) continue; // skip tens
                    var uPx = viz.toScreen(u, nlY);
                    ctx.strokeStyle = '#3a3a6a';
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(uPx[0], uPx[1] - 5);
                    ctx.lineTo(uPx[0], uPx[1] + 5);
                    ctx.stroke();

                    // Small number labels
                    ctx.fillStyle = '#5a5a8a';
                    ctx.font = '9px -apple-system, sans-serif';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'top';
                    ctx.fillText(String(u), uPx[0], uPx[1] + 7);
                }

                // Arrow from current value to rounded value
                if (currentVal !== roundedTo) {
                    var fromPx = viz.toScreen(currentVal, nlY);
                    var toPx = viz.toScreen(roundedTo, nlY);
                    var arrowY = fromPx[1] - 50;

                    // Curved arrow
                    ctx.strokeStyle = viz.colors.green;
                    ctx.lineWidth = 3;
                    ctx.beginPath();
                    ctx.moveTo(fromPx[0], fromPx[1] - 18);
                    var cpY = arrowY - 20;
                    ctx.quadraticCurveTo((fromPx[0] + toPx[0]) / 2, cpY, toPx[0], toPx[1] - 18);
                    ctx.stroke();

                    // Arrowhead
                    var angle = Math.atan2(toPx[1] - 18 - cpY, toPx[0] - (fromPx[0] + toPx[0]) / 2);
                    ctx.fillStyle = viz.colors.green;
                    ctx.beginPath();
                    ctx.moveTo(toPx[0], toPx[1] - 18);
                    ctx.lineTo(toPx[0] - 10 * Math.cos(angle - Math.PI / 5), toPx[1] - 18 - 10 * Math.sin(angle - Math.PI / 5));
                    ctx.lineTo(toPx[0] - 10 * Math.cos(angle + Math.PI / 5), toPx[1] - 18 - 10 * Math.sin(angle + Math.PI / 5));
                    ctx.closePath();
                    ctx.fill();
                }

                // Draw the current value point (larger, colorful)
                var ptPx = viz.toScreen(currentVal, nlY);
                ctx.shadowColor = viz.colors.blue;
                ctx.shadowBlur = 20;
                ctx.fillStyle = viz.colors.blue;
                ctx.beginPath();
                ctx.arc(ptPx[0], ptPx[1], 12, 0, Math.PI * 2);
                ctx.fill();
                ctx.shadowBlur = 0;
                ctx.fillStyle = '#ffffff';
                ctx.font = 'bold 10px -apple-system, sans-serif';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(String(currentVal), ptPx[0], ptPx[1]);

                // Distance comparison below the number line
                var distY = viz.originY + 60;
                if (onesDigit !== 0 && currentVal > 0 && currentVal < 100) {
                    var distToLower = currentVal - lowerTen;
                    var distToUpper = upperTen - currentVal;

                    ctx.fillStyle = '#8b949e';
                    ctx.font = '13px -apple-system, sans-serif';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'top';
                    ctx.fillText('Distance to ' + lowerTen + ': ' + distToLower + ' steps', viz.width / 2 - 120, distY);
                    ctx.fillText('Distance to ' + upperTen + ': ' + distToUpper + ' steps', viz.width / 2 + 120, distY);

                    // Mini bar comparison
                    var barY = distY + 25;
                    var barMaxW = 80;
                    var barH = 14;

                    // Left bar (distance to lower)
                    var lBarW = (distToLower / 10) * barMaxW;
                    ctx.fillStyle = distToLower <= distToUpper ? viz.colors.green + '88' : viz.colors.red + '88';
                    ctx.fillRect(viz.width / 2 - 120 - lBarW / 2, barY, lBarW, barH);
                    ctx.strokeStyle = distToLower <= distToUpper ? viz.colors.green : viz.colors.red;
                    ctx.lineWidth = 1;
                    ctx.strokeRect(viz.width / 2 - 120 - lBarW / 2, barY, lBarW, barH);

                    // Right bar (distance to upper)
                    var uBarW = (distToUpper / 10) * barMaxW;
                    ctx.fillStyle = distToUpper < distToLower ? viz.colors.green + '88' : viz.colors.red + '88';
                    ctx.fillRect(viz.width / 2 + 120 - uBarW / 2, barY, uBarW, barH);
                    ctx.strokeStyle = distToUpper < distToLower ? viz.colors.green : viz.colors.red;
                    ctx.lineWidth = 1;
                    ctx.strokeRect(viz.width / 2 + 120 - uBarW / 2, barY, uBarW, barH);

                    ctx.fillStyle = viz.colors.green;
                    ctx.font = 'bold 12px -apple-system, sans-serif';
                    ctx.fillText('Closer to ' + roundedTo + '!', viz.width / 2, barY + barH + 12);
                }

                viz.drawDraggables();
            }

            viz.animate(draw);
            return viz;
        }
    }
];

// ============================================================
// Section 3: Rounding to Hundreds — Number Line 0-1000
// ============================================================
window.EXTRA_VIZ['ch07']['ch07-sec03'] = [
    {
        id: 'ch07-extra-viz-3',
        title: 'Rounding to the Nearest Hundred',
        description: 'Use the slider to pick any number from 0 to 1000. See where it sits on the number line and which hundred it rounds to!',
        setup: function(container, controls) {
            var viz = new VizEngine(container, {
                width: 560, height: 400, scale: 1,
                originX: 0, originY: 0
            });

            var currentVal = 370;

            // Value slider
            var valGroup = document.createElement('div');
            valGroup.className = 'viz-slider-group';
            var valLabel = document.createElement('span');
            valLabel.className = 'viz-slider-label';
            valLabel.textContent = 'Number: ';
            var valSlider = document.createElement('input');
            valSlider.type = 'range';
            valSlider.className = 'viz-slider';
            valSlider.min = '0';
            valSlider.max = '1000';
            valSlider.step = '1';
            valSlider.value = String(currentVal);
            var valDisplay = document.createElement('span');
            valDisplay.className = 'viz-slider-value';
            valDisplay.textContent = String(currentVal);
            valSlider.addEventListener('input', function() {
                currentVal = parseInt(valSlider.value);
                valDisplay.textContent = String(currentVal);
            });
            valGroup.appendChild(valLabel);
            valGroup.appendChild(valSlider);
            valGroup.appendChild(valDisplay);
            controls.appendChild(valGroup);

            // Quick jump buttons
            var quickRow = document.createElement('div');
            quickRow.style.cssText = 'display:flex;gap:5px;flex-wrap:wrap;';
            var quickVals = [37, 150, 249, 350, 455, 501, 650, 750, 849, 950];
            quickVals.forEach(function(qv) {
                var btn = document.createElement('button');
                btn.textContent = String(qv);
                btn.style.cssText = 'padding:3px 10px;border:1px solid #30363d;border-radius:4px;background:#1a1a40;color:#c9d1d9;font-size:0.78rem;cursor:pointer;';
                btn.addEventListener('click', function() {
                    currentVal = qv;
                    valSlider.value = String(qv);
                    valDisplay.textContent = String(qv);
                });
                quickRow.appendChild(btn);
            });
            controls.appendChild(quickRow);

            function draw(t) {
                var ctx = viz.ctx;
                ctx.fillStyle = viz.colors.bg;
                ctx.fillRect(0, 0, viz.width, viz.height);

                // Rounding logic
                var roundedTo = Math.round(currentVal / 100) * 100;
                var lowerHun = Math.floor(currentVal / 100) * 100;
                var upperHun = Math.ceil(currentVal / 100) * 100;
                if (lowerHun === upperHun) upperHun = lowerHun + 100;
                var tensOnes = currentVal % 100;

                // Title
                ctx.fillStyle = '#f0f6fc';
                ctx.font = 'bold 20px -apple-system, sans-serif';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'top';
                ctx.fillText('Rounding to the Nearest Hundred', viz.width / 2, 8);

                // Big result
                ctx.font = 'bold 36px -apple-system, sans-serif';
                ctx.fillStyle = viz.colors.purple;
                ctx.fillText(currentVal + ' rounds to ' + roundedTo, viz.width / 2, 40);

                // Explanation
                ctx.font = '14px -apple-system, sans-serif';
                ctx.fillStyle = '#8b949e';
                if (tensOnes === 0) {
                    ctx.fillText(currentVal + ' is already a hundred!', viz.width / 2, 84);
                } else if (tensOnes === 50) {
                    ctx.fillText('The tens digit is 5, so we round UP!', viz.width / 2, 84);
                } else if (tensOnes < 50) {
                    ctx.fillText('Look at the tens digit: ' + Math.floor(tensOnes / 10) + ' is less than 5, so round DOWN', viz.width / 2, 84);
                } else {
                    ctx.fillText('Look at the tens digit: ' + Math.floor(tensOnes / 10) + ' is 5 or more, so round UP', viz.width / 2, 84);
                }

                // === Full Number Line (0-1000) ===
                var fullNlY = 140;
                var fullLeft = 40;
                var fullRight = viz.width - 40;
                var fullW = fullRight - fullLeft;

                ctx.strokeStyle = '#3a3a5a';
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(fullLeft, fullNlY);
                ctx.lineTo(fullRight, fullNlY);
                ctx.stroke();

                // Hundreds marks on full line
                for (var h = 0; h <= 1000; h += 100) {
                    var hx = fullLeft + (h / 1000) * fullW;
                    var isRounded = (h === roundedTo);
                    ctx.strokeStyle = isRounded ? viz.colors.green : '#5a5a8a';
                    ctx.lineWidth = isRounded ? 3 : 1.5;
                    ctx.beginPath();
                    ctx.moveTo(hx, fullNlY - (isRounded ? 10 : 6));
                    ctx.lineTo(hx, fullNlY + (isRounded ? 10 : 6));
                    ctx.stroke();

                    // Label
                    ctx.fillStyle = isRounded ? viz.colors.green : '#6a6a8a';
                    ctx.font = isRounded ? 'bold 12px -apple-system, sans-serif' : '10px -apple-system, sans-serif';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'top';
                    ctx.fillText(String(h), hx, fullNlY + 12);
                }

                // Current value marker on full line
                var cvX = fullLeft + (currentVal / 1000) * fullW;
                ctx.fillStyle = viz.colors.blue;
                ctx.beginPath();
                // Triangle pointing down
                ctx.moveTo(cvX, fullNlY - 12);
                ctx.lineTo(cvX - 7, fullNlY - 22);
                ctx.lineTo(cvX + 7, fullNlY - 22);
                ctx.closePath();
                ctx.fill();
                ctx.fillStyle = viz.colors.blue;
                ctx.font = 'bold 11px -apple-system, sans-serif';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'bottom';
                ctx.fillText(String(currentVal), cvX, fullNlY - 23);

                // === Zoomed Number Line (lowerHun to upperHun) ===
                var zoomNlY = 230;
                var zoomLeft = 60;
                var zoomRight = viz.width - 60;
                var zoomW = zoomRight - zoomLeft;

                // Bracket connectors from full to zoomed
                var zFullL = fullLeft + (lowerHun / 1000) * fullW;
                var zFullR = fullLeft + (Math.min(upperHun, 1000) / 1000) * fullW;
                ctx.strokeStyle = '#3a3a5a';
                ctx.lineWidth = 1;
                ctx.setLineDash([3, 3]);
                ctx.beginPath();
                ctx.moveTo(zFullL, fullNlY + 6);
                ctx.lineTo(zoomLeft, zoomNlY - 6);
                ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(zFullR, fullNlY + 6);
                ctx.lineTo(zoomRight, zoomNlY - 6);
                ctx.stroke();
                ctx.setLineDash([]);

                // Zoomed line background highlight
                ctx.fillStyle = 'rgba(88, 166, 255, 0.06)';
                ctx.fillRect(zoomLeft - 5, zoomNlY - 30, zoomW + 10, 60);

                // Zoomed line
                ctx.strokeStyle = '#5a5a8a';
                ctx.lineWidth = 3;
                ctx.beginPath();
                ctx.moveTo(zoomLeft, zoomNlY);
                ctx.lineTo(zoomRight, zoomNlY);
                ctx.stroke();

                // Tens marks on zoomed line
                var range = upperHun - lowerHun; // should be 100
                for (var z = lowerHun; z <= upperHun; z += 10) {
                    var zx = zoomLeft + ((z - lowerHun) / range) * zoomW;
                    var isHundred = (z % 100 === 0);
                    var isRoundedH = (z === roundedTo);

                    if (isRoundedH) {
                        ctx.shadowColor = viz.colors.green;
                        ctx.shadowBlur = 12;
                    }
                    ctx.strokeStyle = isRoundedH ? viz.colors.green : (isHundred ? '#8a8aaa' : '#4a4a7a');
                    ctx.lineWidth = isHundred ? 3 : 1.5;
                    ctx.beginPath();
                    ctx.moveTo(zx, zoomNlY - (isHundred ? 14 : 8));
                    ctx.lineTo(zx, zoomNlY + (isHundred ? 14 : 8));
                    ctx.stroke();
                    ctx.shadowBlur = 0;

                    ctx.fillStyle = isRoundedH ? viz.colors.green : (isHundred ? '#c9d1d9' : '#6a6a8a');
                    ctx.font = isRoundedH ? 'bold 14px -apple-system, sans-serif' : (isHundred ? 'bold 12px -apple-system, sans-serif' : '10px -apple-system, sans-serif');
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'top';
                    ctx.fillText(String(z), zx, zoomNlY + 16);
                }

                // Midpoint marker (50)
                var midVal = lowerHun + 50;
                var midX = zoomLeft + 0.5 * zoomW;
                ctx.strokeStyle = viz.colors.yellow;
                ctx.lineWidth = 1;
                ctx.setLineDash([4, 4]);
                ctx.beginPath();
                ctx.moveTo(midX, zoomNlY - 35);
                ctx.lineTo(midX, zoomNlY + 35);
                ctx.stroke();
                ctx.setLineDash([]);
                ctx.fillStyle = viz.colors.yellow;
                ctx.font = '10px -apple-system, sans-serif';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'bottom';
                ctx.fillText('midpoint', midX, zoomNlY - 36);

                // Current value on zoomed line
                var cvZoomX = zoomLeft + ((currentVal - lowerHun) / range) * zoomW;
                cvZoomX = Math.max(zoomLeft, Math.min(zoomRight, cvZoomX));

                // Arrow from value to rounded
                if (tensOnes !== 0) {
                    var roundedZoomX = zoomLeft + ((roundedTo - lowerHun) / range) * zoomW;
                    roundedZoomX = Math.max(zoomLeft, Math.min(zoomRight, roundedZoomX));

                    ctx.strokeStyle = viz.colors.green;
                    ctx.lineWidth = 2.5;
                    ctx.beginPath();
                    ctx.moveTo(cvZoomX, zoomNlY - 20);
                    var arcCpY = zoomNlY - 55;
                    ctx.quadraticCurveTo((cvZoomX + roundedZoomX) / 2, arcCpY, roundedZoomX, zoomNlY - 18);
                    ctx.stroke();

                    // Arrowhead
                    var aAngle = Math.atan2(zoomNlY - 18 - arcCpY, roundedZoomX - (cvZoomX + roundedZoomX) / 2);
                    ctx.fillStyle = viz.colors.green;
                    ctx.beginPath();
                    ctx.moveTo(roundedZoomX, zoomNlY - 18);
                    ctx.lineTo(roundedZoomX - 9 * Math.cos(aAngle - Math.PI / 5), zoomNlY - 18 - 9 * Math.sin(aAngle - Math.PI / 5));
                    ctx.lineTo(roundedZoomX - 9 * Math.cos(aAngle + Math.PI / 5), zoomNlY - 18 - 9 * Math.sin(aAngle + Math.PI / 5));
                    ctx.closePath();
                    ctx.fill();
                }

                // Value dot
                ctx.shadowColor = viz.colors.blue;
                ctx.shadowBlur = 18;
                ctx.fillStyle = viz.colors.blue;
                ctx.beginPath();
                ctx.arc(cvZoomX, zoomNlY, 10, 0, Math.PI * 2);
                ctx.fill();
                ctx.shadowBlur = 0;
                ctx.fillStyle = '#fff';
                ctx.font = 'bold 8px -apple-system, sans-serif';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(String(currentVal), cvZoomX, zoomNlY);

                // === Distance comparison bars ===
                var distBarY = 300;
                var distToLower = currentVal - lowerHun;
                var distToUpper = upperHun - currentVal;

                ctx.fillStyle = '#f0f6fc';
                ctx.font = 'bold 14px -apple-system, sans-serif';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'top';
                ctx.fillText('Distance Comparison', viz.width / 2, distBarY - 5);

                var barAreaY = distBarY + 18;
                var barMaxW = 180;
                var barH = 22;
                var barGap = 8;

                // Bar to lower
                var lFrac = distToLower / 100;
                var lw = lFrac * barMaxW;
                var closerToLower = distToLower < distToUpper;
                var barCenterX = viz.width / 2;

                ctx.fillStyle = closerToLower ? viz.colors.green + 'aa' : viz.colors.red + '66';
                ctx.beginPath();
                ctx.roundRect(barCenterX - 10 - lw, barAreaY, lw, barH, 4);
                ctx.fill();
                ctx.fillStyle = '#f0f6fc';
                ctx.font = '12px -apple-system, sans-serif';
                ctx.textAlign = 'right';
                ctx.textBaseline = 'middle';
                ctx.fillText(lowerHun + ' (' + distToLower + ' away)', barCenterX - 10 - lw - 5, barAreaY + barH / 2);

                // Bar to upper
                var uFrac = distToUpper / 100;
                var uw = uFrac * barMaxW;
                var closerToUpper = distToUpper < distToLower;

                ctx.fillStyle = closerToUpper ? viz.colors.green + 'aa' : viz.colors.red + '66';
                ctx.beginPath();
                ctx.roundRect(barCenterX + 10, barAreaY, uw, barH, 4);
                ctx.fill();
                ctx.fillStyle = '#f0f6fc';
                ctx.font = '12px -apple-system, sans-serif';
                ctx.textAlign = 'left';
                ctx.textBaseline = 'middle';
                ctx.fillText(upperHun + ' (' + distToUpper + ' away)', barCenterX + 10 + uw + 5, barAreaY + barH / 2);

                // Center label
                ctx.fillStyle = viz.colors.blue;
                ctx.font = 'bold 12px -apple-system, sans-serif';
                ctx.textAlign = 'center';
                ctx.fillText(String(currentVal), barCenterX, barAreaY + barH / 2);

                // Winner indicator
                ctx.fillStyle = viz.colors.green;
                ctx.font = 'bold 14px -apple-system, sans-serif';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'top';
                if (tensOnes === 0) {
                    ctx.fillText('Already on a hundred!', viz.width / 2, barAreaY + barH + 10);
                } else {
                    ctx.fillText('Closer to ' + roundedTo + ', so round to ' + roundedTo + '!', viz.width / 2, barAreaY + barH + 10);
                }
            }

            viz.animate(draw);
            return viz;
        }
    }
];

// ============================================================
// Section 4: Estimating Sums — Exact vs Estimated Bar Chart
// ============================================================
window.EXTRA_VIZ['ch07']['ch07-sec04'] = [
    {
        id: 'ch07-extra-viz-4',
        title: 'Estimating Sums',
        description: 'See how rounding each number to the nearest ten gives a quick estimate of the sum. Compare the exact answer with the estimate!',
        setup: function(container, controls) {
            var viz = new VizEngine(container, {
                width: 560, height: 400, scale: 1,
                originX: 0, originY: 0
            });

            var numA = 0, numB = 0;
            var roundedA = 0, roundedB = 0;
            var exactSum = 0, estSum = 0;
            var animProgress = 0;
            var lastTime = null;
            var problemCount = 0;
            var totalError = 0;

            function newProblem() {
                numA = 10 + Math.floor(Math.random() * 90); // 10-99
                numB = 10 + Math.floor(Math.random() * 90);
                roundedA = Math.round(numA / 10) * 10;
                roundedB = Math.round(numB / 10) * 10;
                exactSum = numA + numB;
                estSum = roundedA + roundedB;
                animProgress = 0;
                lastTime = null;
                problemCount++;
                totalError += Math.abs(exactSum - estSum);
            }
            newProblem();

            // New Problem button
            var newBtn = document.createElement('button');
            newBtn.textContent = 'New Problem';
            newBtn.style.cssText = 'padding:6px 18px;border:2px solid #F0883E;border-radius:6px;background:#F0883E;color:#ffffff;font-size:0.9rem;font-weight:bold;cursor:pointer;';
            newBtn.addEventListener('click', function() {
                newProblem();
            });
            controls.appendChild(newBtn);

            // Stats display
            var statsSpan = document.createElement('span');
            statsSpan.style.cssText = 'margin-left:12px;color:#8b949e;font-size:0.85rem;';
            controls.appendChild(statsSpan);

            function draw(t) {
                if (lastTime === null) lastTime = t;
                var dt = (t - lastTime) / 1000;
                lastTime = t;

                animProgress = Math.min(1, animProgress + dt * 1.5);
                var ease = 1 - Math.pow(1 - animProgress, 3); // ease out

                var ctx = viz.ctx;
                ctx.fillStyle = viz.colors.bg;
                ctx.fillRect(0, 0, viz.width, viz.height);

                // Title
                ctx.fillStyle = '#f0f6fc';
                ctx.font = 'bold 20px -apple-system, sans-serif';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'top';
                ctx.fillText('Estimating Sums', viz.width / 2, 8);

                // Problem display area
                var probY = 45;

                // Number A with rounding
                var colAx = viz.width / 2 - 140;
                var colBx = viz.width / 2 + 140;
                var midX = viz.width / 2;

                // A
                ctx.fillStyle = viz.colors.blue;
                ctx.font = 'bold 36px -apple-system, sans-serif';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(String(numA), colAx, probY + 20);

                ctx.fillStyle = viz.colors.orange;
                ctx.font = '14px -apple-system, sans-serif';
                ctx.fillText('rounds to', colAx, probY + 48);

                ctx.fillStyle = viz.colors.teal;
                ctx.font = 'bold 24px -apple-system, sans-serif';
                ctx.fillText(String(roundedA), colAx, probY + 72);

                // Plus sign
                ctx.fillStyle = '#f0f6fc';
                ctx.font = 'bold 30px -apple-system, sans-serif';
                ctx.fillText('+', midX, probY + 20);

                // B
                ctx.fillStyle = viz.colors.blue;
                ctx.font = 'bold 36px -apple-system, sans-serif';
                ctx.fillText(String(numB), colBx, probY + 20);

                ctx.fillStyle = viz.colors.orange;
                ctx.font = '14px -apple-system, sans-serif';
                ctx.fillText('rounds to', colBx, probY + 48);

                ctx.fillStyle = viz.colors.teal;
                ctx.font = 'bold 24px -apple-system, sans-serif';
                ctx.fillText(String(roundedB), colBx, probY + 72);

                // Divider line
                ctx.strokeStyle = '#3a3a5a';
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(viz.width / 2 - 200, probY + 95);
                ctx.lineTo(viz.width / 2 + 200, probY + 95);
                ctx.stroke();

                // Results
                var resY = probY + 115;
                ctx.fillStyle = viz.colors.green;
                ctx.font = 'bold 18px -apple-system, sans-serif';
                ctx.textAlign = 'center';
                ctx.fillText('Exact: ' + numA + ' + ' + numB + ' = ' + exactSum, viz.width / 2, resY);

                ctx.fillStyle = viz.colors.teal;
                ctx.font = 'bold 18px -apple-system, sans-serif';
                ctx.fillText('Estimate: ' + roundedA + ' + ' + roundedB + ' = ' + estSum, viz.width / 2, resY + 26);

                // === Bar Chart ===
                var chartY = resY + 60;
                var chartH = 130;
                var chartBottom = chartY + chartH;
                var barWidth = 80;
                var barGap = 60;
                var maxVal = Math.max(exactSum, estSum, 20); // ensure reasonable scale

                // Exact bar
                var exactBarH = (exactSum / maxVal) * chartH * ease;
                var exactBarX = viz.width / 2 - barWidth - barGap / 2;
                ctx.fillStyle = viz.colors.green + 'cc';
                ctx.beginPath();
                ctx.roundRect(exactBarX, chartBottom - exactBarH, barWidth, exactBarH, [6, 6, 0, 0]);
                ctx.fill();
                ctx.strokeStyle = viz.colors.green;
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.roundRect(exactBarX, chartBottom - exactBarH, barWidth, exactBarH, [6, 6, 0, 0]);
                ctx.stroke();

                // Value on top of exact bar
                ctx.fillStyle = viz.colors.green;
                ctx.font = 'bold 20px -apple-system, sans-serif';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'bottom';
                ctx.fillText(String(exactSum), exactBarX + barWidth / 2, chartBottom - exactBarH - 5);

                // Label below exact bar
                ctx.fillStyle = '#c9d1d9';
                ctx.font = 'bold 13px -apple-system, sans-serif';
                ctx.textBaseline = 'top';
                ctx.fillText('Exact', exactBarX + barWidth / 2, chartBottom + 6);

                // Estimate bar
                var estBarH = (estSum / maxVal) * chartH * ease;
                var estBarX = viz.width / 2 + barGap / 2;
                ctx.fillStyle = viz.colors.teal + 'cc';
                ctx.beginPath();
                ctx.roundRect(estBarX, chartBottom - estBarH, barWidth, estBarH, [6, 6, 0, 0]);
                ctx.fill();
                ctx.strokeStyle = viz.colors.teal;
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.roundRect(estBarX, chartBottom - estBarH, barWidth, estBarH, [6, 6, 0, 0]);
                ctx.stroke();

                // Value on top of estimate bar
                ctx.fillStyle = viz.colors.teal;
                ctx.font = 'bold 20px -apple-system, sans-serif';
                ctx.textBaseline = 'bottom';
                ctx.fillText(String(estSum), estBarX + barWidth / 2, chartBottom - estBarH - 5);

                // Label below estimate bar
                ctx.fillStyle = '#c9d1d9';
                ctx.font = 'bold 13px -apple-system, sans-serif';
                ctx.textBaseline = 'top';
                ctx.fillText('Estimate', estBarX + barWidth / 2, chartBottom + 6);

                // Baseline
                ctx.strokeStyle = '#4a4a7a';
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(exactBarX - 20, chartBottom);
                ctx.lineTo(estBarX + barWidth + 20, chartBottom);
                ctx.stroke();

                // Difference indicator
                var diff = Math.abs(exactSum - estSum);
                if (animProgress > 0.8) {
                    var diffAlpha = (animProgress - 0.8) / 0.2;
                    ctx.globalAlpha = diffAlpha;

                    // Connect bar tops with bracket
                    var exactTop = chartBottom - exactBarH;
                    var estTop = chartBottom - estBarH;
                    if (diff > 0) {
                        var higherTop = Math.min(exactTop, estTop);
                        var lowerTop = Math.max(exactTop, estTop);
                        var bracketX = estBarX + barWidth + 20;
                        ctx.strokeStyle = viz.colors.yellow;
                        ctx.lineWidth = 2;
                        ctx.beginPath();
                        ctx.moveTo(bracketX, higherTop);
                        ctx.lineTo(bracketX + 10, higherTop);
                        ctx.lineTo(bracketX + 10, lowerTop);
                        ctx.lineTo(bracketX, lowerTop);
                        ctx.stroke();

                        ctx.fillStyle = viz.colors.yellow;
                        ctx.font = 'bold 13px -apple-system, sans-serif';
                        ctx.textAlign = 'left';
                        ctx.textBaseline = 'middle';
                        ctx.fillText('Off by ' + diff, bracketX + 16, (higherTop + lowerTop) / 2);
                    }

                    // Summary message
                    var summaryY = chartBottom + 30;
                    ctx.fillStyle = diff === 0 ? viz.colors.green : (diff <= 5 ? viz.colors.teal : viz.colors.orange);
                    ctx.font = 'bold 15px -apple-system, sans-serif';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'top';
                    if (diff === 0) {
                        ctx.fillText('The estimate is PERFECT!', viz.width / 2, summaryY);
                    } else if (diff <= 5) {
                        ctx.fillText('Super close! Only ' + diff + ' off!', viz.width / 2, summaryY);
                    } else if (diff <= 10) {
                        ctx.fillText('Pretty good estimate! Off by ' + diff, viz.width / 2, summaryY);
                    } else {
                        ctx.fillText('Off by ' + diff + ' — estimation is still useful!', viz.width / 2, summaryY);
                    }

                    ctx.globalAlpha = 1;
                }

                // Update stats
                var avgError = problemCount > 0 ? (totalError / problemCount).toFixed(1) : '0';
                statsSpan.textContent = 'Problems: ' + problemCount + '  |  Avg error: ' + avgError;
            }

            viz.animate(draw);
            return viz;
        }
    }
];

// ============================================================
// Section 5: Estimation Games — "Guess the Jar"
// ============================================================
window.EXTRA_VIZ['ch07']['ch07-sec05'] = [
    {
        id: 'ch07-extra-viz-5',
        title: 'Guess the Jar!',
        description: 'Estimate how many candies are in the jar! Use the slider to guess, then reveal the answer. Score points for guesses within 10% of the actual count!',
        setup: function(container, controls) {
            var viz = new VizEngine(container, {
                width: 560, height: 400, scale: 1,
                originX: 0, originY: 0
            });

            var candyColors = [
                '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4',
                '#FFEAA7', '#DDA0DD', '#FF8C69', '#98D8C8',
                '#F7DC6F', '#BB8FCE', '#85C1E9', '#F1948A',
                '#82E0AA', '#F0B27A', '#D7BDE2', '#A3E4D7'
            ];

            var candies = [];
            var actualCount = 0;
            var guess = 50;
            var phase = 'guessing'; // 'guessing', 'revealed'
            var score = 0;
            var rounds = 0;
            var totalRounds = 0;

            // Jar geometry
            var jarX = 120;
            var jarY = 65;
            var jarW = 200;
            var jarH = 280;
            var jarInnerMargin = 12;

            function generateJar() {
                candies = [];
                actualCount = 20 + Math.floor(Math.random() * 141); // 20-160
                // Fill the jar with randomly placed circles
                var innerX = jarX + jarInnerMargin;
                var innerY = jarY + jarInnerMargin + 25; // below jar lip
                var innerW = jarW - jarInnerMargin * 2;
                var innerH = jarH - jarInnerMargin * 2 - 30; // above jar bottom

                // Place candies with some attempt at non-overlapping
                var maxAttempts = actualCount * 10;
                var placed = [];
                var attempts = 0;
                var candyR = Math.max(4, Math.min(8, 1200 / actualCount));

                while (placed.length < actualCount && attempts < maxAttempts) {
                    attempts++;
                    var cx = innerX + candyR + Math.random() * (innerW - candyR * 2);
                    var cy = innerY + candyR + Math.random() * (innerH - candyR * 2);
                    var color = candyColors[Math.floor(Math.random() * candyColors.length)];

                    // Check overlap (relaxed - allow some overlap for dense packing)
                    var ok = true;
                    for (var p = 0; p < placed.length; p++) {
                        var dx = cx - placed[p].x;
                        var dy = cy - placed[p].y;
                        if (Math.sqrt(dx * dx + dy * dy) < candyR * 1.4) {
                            ok = false;
                            break;
                        }
                    }
                    if (ok) {
                        placed.push({ x: cx, y: cy, r: candyR, color: color });
                    }
                }
                // If we could not place enough non-overlapping, just random-fill the rest
                while (placed.length < actualCount) {
                    var rx = innerX + candyR + Math.random() * (innerW - candyR * 2);
                    var ry = innerY + candyR + Math.random() * (innerH - candyR * 2);
                    placed.push({
                        x: rx, y: ry,
                        r: candyR,
                        color: candyColors[Math.floor(Math.random() * candyColors.length)]
                    });
                }
                candies = placed;
                phase = 'guessing';
                totalRounds++;
            }

            generateJar();

            // Guess slider
            var guessGroup = document.createElement('div');
            guessGroup.className = 'viz-slider-group';
            var guessLabel = document.createElement('span');
            guessLabel.className = 'viz-slider-label';
            guessLabel.textContent = 'Your Guess: ';
            var guessSlider = document.createElement('input');
            guessSlider.type = 'range';
            guessSlider.className = 'viz-slider';
            guessSlider.min = '10';
            guessSlider.max = '200';
            guessSlider.step = '1';
            guessSlider.value = '50';
            var guessVal = document.createElement('span');
            guessVal.className = 'viz-slider-value';
            guessVal.textContent = '50';
            guessSlider.addEventListener('input', function() {
                guess = parseInt(guessSlider.value);
                guessVal.textContent = String(guess);
            });
            guessGroup.appendChild(guessLabel);
            guessGroup.appendChild(guessSlider);
            guessGroup.appendChild(guessVal);
            controls.appendChild(guessGroup);

            // Buttons
            var btnRow = document.createElement('div');
            btnRow.style.cssText = 'display:flex;gap:8px;flex-wrap:wrap;align-items:center;';

            var revealBtn = document.createElement('button');
            revealBtn.textContent = 'Reveal Answer!';
            revealBtn.style.cssText = 'padding:6px 16px;border:2px solid #BC8CFF;border-radius:6px;background:#BC8CFF;color:#ffffff;font-size:0.9rem;font-weight:bold;cursor:pointer;';
            revealBtn.addEventListener('click', function() {
                if (phase === 'guessing') {
                    phase = 'revealed';
                    rounds++;
                    var diff = Math.abs(guess - actualCount);
                    var threshold = Math.max(2, Math.round(actualCount * 0.1));
                    if (diff <= threshold) {
                        score++;
                    }
                    revealBtn.disabled = true;
                    guessSlider.disabled = true;
                    nextBtn.disabled = false;
                }
            });
            btnRow.appendChild(revealBtn);

            var nextBtn = document.createElement('button');
            nextBtn.textContent = 'Next Jar';
            nextBtn.style.cssText = 'padding:6px 16px;border:2px solid #3FB950;border-radius:6px;background:#1a1a40;color:#3FB950;font-size:0.9rem;font-weight:bold;cursor:pointer;';
            nextBtn.disabled = true;
            nextBtn.addEventListener('click', function() {
                generateJar();
                guess = 50;
                guessSlider.value = '50';
                guessVal.textContent = '50';
                guessSlider.disabled = false;
                revealBtn.disabled = false;
                nextBtn.disabled = true;
            });
            btnRow.appendChild(nextBtn);

            controls.appendChild(btnRow);

            function drawJar(ctx) {
                // Jar body (rounded rectangle)
                var neckInset = 30;
                var neckH = 25;
                var bodyRadius = 16;

                // Jar body fill
                ctx.fillStyle = 'rgba(200, 220, 255, 0.08)';
                ctx.beginPath();
                ctx.roundRect(jarX, jarY + neckH, jarW, jarH - neckH, [0, 0, bodyRadius, bodyRadius]);
                ctx.fill();

                // Jar neck
                ctx.fillStyle = 'rgba(200, 220, 255, 0.06)';
                ctx.fillRect(jarX + neckInset, jarY, jarW - neckInset * 2, neckH);

                // Jar outline - body
                ctx.strokeStyle = 'rgba(180, 200, 240, 0.5)';
                ctx.lineWidth = 2.5;
                ctx.beginPath();
                // Left side from neck down
                ctx.moveTo(jarX + neckInset, jarY);
                ctx.lineTo(jarX + neckInset, jarY + neckH);
                ctx.lineTo(jarX, jarY + neckH);
                ctx.lineTo(jarX, jarY + jarH - bodyRadius);
                ctx.quadraticCurveTo(jarX, jarY + jarH, jarX + bodyRadius, jarY + jarH);
                // Bottom
                ctx.lineTo(jarX + jarW - bodyRadius, jarY + jarH);
                ctx.quadraticCurveTo(jarX + jarW, jarY + jarH, jarX + jarW, jarY + jarH - bodyRadius);
                // Right side up
                ctx.lineTo(jarX + jarW, jarY + neckH);
                ctx.lineTo(jarX + jarW - neckInset, jarY + neckH);
                ctx.lineTo(jarX + jarW - neckInset, jarY);
                ctx.stroke();

                // Jar lip (top rim)
                ctx.strokeStyle = 'rgba(200, 220, 255, 0.6)';
                ctx.lineWidth = 3;
                ctx.beginPath();
                ctx.moveTo(jarX + neckInset - 5, jarY);
                ctx.lineTo(jarX + jarW - neckInset + 5, jarY);
                ctx.stroke();

                // Glass reflection highlights
                ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
                ctx.lineWidth = 3;
                ctx.beginPath();
                ctx.moveTo(jarX + 8, jarY + neckH + 15);
                ctx.lineTo(jarX + 8, jarY + jarH - 30);
                ctx.stroke();

                ctx.strokeStyle = 'rgba(255, 255, 255, 0.06)';
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(jarX + 16, jarY + neckH + 20);
                ctx.lineTo(jarX + 16, jarY + jarH - 40);
                ctx.stroke();
            }

            function draw(t) {
                var ctx = viz.ctx;
                ctx.fillStyle = viz.colors.bg;
                ctx.fillRect(0, 0, viz.width, viz.height);

                // Title
                ctx.fillStyle = '#f0f6fc';
                ctx.font = 'bold 20px -apple-system, sans-serif';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'top';
                ctx.fillText('Guess the Jar!', viz.width / 2, 8);

                // Score display
                ctx.fillStyle = viz.colors.yellow;
                ctx.font = 'bold 14px -apple-system, sans-serif';
                ctx.textAlign = 'right';
                ctx.fillText('Score: ' + score + ' / ' + rounds, viz.width - 15, 10);
                ctx.fillStyle = '#6a6a8a';
                ctx.font = '12px -apple-system, sans-serif';
                ctx.fillText('(within 10% = point!)', viz.width - 15, 28);

                // Round number
                ctx.fillStyle = '#6a6a8a';
                ctx.font = '12px -apple-system, sans-serif';
                ctx.textAlign = 'left';
                ctx.fillText('Jar #' + totalRounds, 15, 10);

                // Draw candies in the jar
                for (var i = 0; i < candies.length; i++) {
                    var c = candies[i];
                    ctx.fillStyle = c.color;
                    ctx.beginPath();
                    ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
                    ctx.fill();
                    // Highlight
                    ctx.fillStyle = 'rgba(255,255,255,0.3)';
                    ctx.beginPath();
                    ctx.arc(c.x - c.r * 0.25, c.y - c.r * 0.25, c.r * 0.35, 0, Math.PI * 2);
                    ctx.fill();
                }

                // Draw the jar (on top of candies for glass effect)
                drawJar(ctx);

                // === Right side panel ===
                var panelX = jarX + jarW + 40;
                var panelW = viz.width - panelX - 15;

                if (phase === 'guessing') {
                    // Guess display
                    ctx.fillStyle = viz.colors.purple;
                    ctx.font = 'bold 16px -apple-system, sans-serif';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'top';
                    ctx.fillText('Your Guess:', panelX + panelW / 2, 60);

                    ctx.fillStyle = viz.colors.teal;
                    ctx.font = 'bold 56px -apple-system, sans-serif';
                    ctx.fillText(String(guess), panelX + panelW / 2, 82);

                    // Estimation tips
                    ctx.fillStyle = '#8b949e';
                    ctx.font = '13px -apple-system, sans-serif';
                    var tipY = 160;
                    var tips = [
                        'Tips for estimating:',
                        '',
                        'Count a small section,',
                        'then multiply!',
                        '',
                        'How many fit in one row?',
                        'How many rows?',
                        '',
                        'Use the slider and',
                        'press Reveal!'
                    ];
                    for (var ti = 0; ti < tips.length; ti++) {
                        ctx.fillStyle = ti === 0 ? viz.colors.orange : '#7a7a9a';
                        ctx.font = ti === 0 ? 'bold 13px -apple-system, sans-serif' : '12px -apple-system, sans-serif';
                        ctx.fillText(tips[ti], panelX + panelW / 2, tipY + ti * 17);
                    }
                } else if (phase === 'revealed') {
                    // Show results
                    var diff = Math.abs(guess - actualCount);
                    var threshold = Math.max(2, Math.round(actualCount * 0.1));
                    var withinTarget = diff <= threshold;

                    ctx.fillStyle = '#f0f6fc';
                    ctx.font = 'bold 14px -apple-system, sans-serif';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'top';
                    ctx.fillText('Actual Count:', panelX + panelW / 2, 55);

                    ctx.fillStyle = viz.colors.green;
                    ctx.font = 'bold 48px -apple-system, sans-serif';
                    ctx.fillText(String(actualCount), panelX + panelW / 2, 73);

                    ctx.fillStyle = viz.colors.blue;
                    ctx.font = '15px -apple-system, sans-serif';
                    ctx.fillText('Your guess: ' + guess, panelX + panelW / 2, 130);

                    ctx.fillStyle = diff === 0 ? viz.colors.green : viz.colors.orange;
                    ctx.font = 'bold 15px -apple-system, sans-serif';
                    if (diff === 0) {
                        ctx.fillText('PERFECT!', panelX + panelW / 2, 155);
                    } else {
                        ctx.fillText('Off by: ' + diff, panelX + panelW / 2, 155);
                    }

                    // Accuracy gauge
                    var gaugeY = 190;
                    var gaugeW = panelW - 20;
                    var gaugeH = 18;
                    var gaugeX = panelX + 10;
                    var accuracy = Math.max(0, 1 - diff / actualCount);

                    ctx.fillStyle = '#1a1a40';
                    ctx.beginPath();
                    ctx.roundRect(gaugeX, gaugeY, gaugeW, gaugeH, 9);
                    ctx.fill();

                    var gaugeColor = accuracy > 0.9 ? viz.colors.green : (accuracy > 0.7 ? viz.colors.teal : (accuracy > 0.5 ? viz.colors.yellow : viz.colors.orange));
                    ctx.fillStyle = gaugeColor;
                    ctx.beginPath();
                    ctx.roundRect(gaugeX, gaugeY, gaugeW * accuracy, gaugeH, 9);
                    ctx.fill();

                    ctx.strokeStyle = '#4a4a7a';
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.roundRect(gaugeX, gaugeY, gaugeW, gaugeH, 9);
                    ctx.stroke();

                    ctx.fillStyle = '#f0f6fc';
                    ctx.font = 'bold 11px -apple-system, sans-serif';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.fillText(Math.round(accuracy * 100) + '%', gaugeX + gaugeW / 2, gaugeY + gaugeH / 2);

                    // Result badge
                    var badgeY = 225;
                    if (withinTarget) {
                        ctx.shadowColor = viz.colors.green;
                        ctx.shadowBlur = 15;
                        ctx.fillStyle = viz.colors.green;
                        ctx.font = 'bold 20px -apple-system, sans-serif';
                        ctx.fillText('+1 Point!', panelX + panelW / 2, badgeY);
                        ctx.shadowBlur = 0;
                        ctx.fillStyle = '#8b949e';
                        ctx.font = '12px -apple-system, sans-serif';
                        ctx.fillText('Within 10% — great job!', panelX + panelW / 2, badgeY + 22);
                    } else {
                        ctx.fillStyle = viz.colors.orange;
                        ctx.font = 'bold 16px -apple-system, sans-serif';
                        ctx.fillText('Not quite!', panelX + panelW / 2, badgeY);
                        ctx.fillStyle = '#8b949e';
                        ctx.font = '12px -apple-system, sans-serif';
                        ctx.fillText('Needed within ' + threshold, panelX + panelW / 2, badgeY + 20);
                        ctx.fillText('(' + (actualCount - threshold) + ' to ' + (actualCount + threshold) + ')', panelX + panelW / 2, badgeY + 36);
                    }

                    // Score summary bar
                    var scoreBarY = 295;
                    ctx.fillStyle = '#f0f6fc';
                    ctx.font = 'bold 14px -apple-system, sans-serif';
                    ctx.textAlign = 'center';
                    ctx.fillText('Score Card', panelX + panelW / 2, scoreBarY);

                    // Star display for score
                    var starY = scoreBarY + 22;
                    var starSize = 16;
                    var starGap = 22;
                    var maxStars = Math.max(rounds, 5);
                    var startX = panelX + panelW / 2 - ((Math.min(maxStars, 10) - 1) * starGap) / 2;

                    for (var s = 0; s < Math.min(rounds, 10); s++) {
                        var sx = startX + s * starGap;
                        if (s < score) {
                            // Filled star
                            ctx.fillStyle = viz.colors.yellow;
                            drawStar(ctx, sx, starY, starSize / 2, 5);
                        } else {
                            // Empty star
                            ctx.strokeStyle = '#4a4a6a';
                            ctx.lineWidth = 1;
                            drawStarOutline(ctx, sx, starY, starSize / 2, 5);
                        }
                    }

                    if (rounds > 0) {
                        ctx.fillStyle = '#8b949e';
                        ctx.font = '12px -apple-system, sans-serif';
                        ctx.textAlign = 'center';
                        ctx.fillText(Math.round(score / rounds * 100) + '% accuracy rate', panelX + panelW / 2, starY + starSize + 8);
                    }
                }

                // Label under jar
                ctx.fillStyle = '#8b949e';
                ctx.font = '13px -apple-system, sans-serif';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'top';
                ctx.fillText('How many candies?', jarX + jarW / 2, jarY + jarH + 10);
            }

            function drawStar(ctx, cx, cy, r, points) {
                ctx.beginPath();
                for (var i = 0; i < points * 2; i++) {
                    var angle = (i * Math.PI / points) - Math.PI / 2;
                    var radius = i % 2 === 0 ? r : r * 0.45;
                    var x = cx + Math.cos(angle) * radius;
                    var y = cy + Math.sin(angle) * radius;
                    if (i === 0) ctx.moveTo(x, y);
                    else ctx.lineTo(x, y);
                }
                ctx.closePath();
                ctx.fill();
            }

            function drawStarOutline(ctx, cx, cy, r, points) {
                ctx.beginPath();
                for (var i = 0; i < points * 2; i++) {
                    var angle = (i * Math.PI / points) - Math.PI / 2;
                    var radius = i % 2 === 0 ? r : r * 0.45;
                    var x = cx + Math.cos(angle) * radius;
                    var y = cy + Math.sin(angle) * radius;
                    if (i === 0) ctx.moveTo(x, y);
                    else ctx.lineTo(x, y);
                }
                ctx.closePath();
                ctx.stroke();
            }

            viz.animate(draw);
            return viz;
        }
    }
];
