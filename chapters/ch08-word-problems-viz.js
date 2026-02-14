// === Chapter 8: Word Problems & Thinking - Extra Visualizations ===
// Fun, colorful, interactive visualizations for word problem strategies.
window.EXTRA_VIZ = window.EXTRA_VIZ || {};
window.EXTRA_VIZ['ch08'] = window.EXTRA_VIZ['ch08'] || {};

// ============================================================
// Visualization 1 — sec01: "Reading Word Problems"
// CUBES step visualizer: Circle numbers, Underline question,
// Box key words, step-by-step reveal.
// ============================================================
window.EXTRA_VIZ['ch08']['ch08-sec01'] = window.EXTRA_VIZ['ch08']['ch08-sec01'] || [];
window.EXTRA_VIZ['ch08']['ch08-sec01'].push({
    id: 'ch08-extra-viz-1',
    title: 'CUBES Strategy — Read Like a Detective!',
    description: 'Use the CUBES steps to break apart a word problem. Click each step to highlight numbers, the question, and key words!',
    setup: function(container, controls) {
        var viz = new VizEngine(container, { width: 560, height: 400, scale: 40, originX: 280, originY: 200 });
        var ctx = viz.ctx;

        var problems = [
            {
                text: 'Maria had 24 stickers. She gave 9 stickers to her friend. How many stickers does Maria have now?',
                numbers: [{ word: '24', start: 10, end: 12 }, { word: '9', start: 22, end: 23 }],
                question: { start: 46, end: -1 },
                keywords: [{ word: 'gave', start: 18, end: 22 }]
            },
            {
                text: 'Jake has 15 marbles. His mom gives him 8 more marbles. How many marbles does Jake have in all?',
                numbers: [{ word: '15', start: 9, end: 11 }, { word: '8', start: 31, end: 32 }],
                question: { start: 47, end: -1 },
                keywords: [{ word: 'more', start: 33, end: 37 }, { word: 'in all', start: -7, end: -1 }]
            },
            {
                text: 'There are 6 bags with 5 apples in each bag. How many apples are there in total?',
                numbers: [{ word: '6', start: 10, end: 11 }, { word: '5', start: 22, end: 23 }],
                question: { start: 42, end: -1 },
                keywords: [{ word: 'each', start: 34, end: 38 }, { word: 'in total', start: -9, end: -1 }]
            },
            {
                text: 'Sam had 30 candies. He shared them equally among 5 friends. How many candies did each friend get?',
                numbers: [{ word: '30', start: 8, end: 10 }, { word: '5', start: 47, end: 48 }],
                question: { start: 56, end: -1 },
                keywords: [{ word: 'equally', start: 30, end: 37 }, { word: 'each', start: 78, end: 82 }]
            },
            {
                text: 'A train has 12 cars. Each car holds 4 passengers. How many passengers can the train hold?',
                numbers: [{ word: '12', start: 12, end: 14 }, { word: '4', start: 30, end: 31 }],
                question: { start: 44, end: -1 },
                keywords: [{ word: 'Each', start: 20, end: 24 }]
            }
        ];

        var currentProblem = 0;
        var showCircle = false;
        var showUnderline = false;
        var showBox = false;
        var stepsRevealed = 0; // 0=none, 1=C, 2=U, 3=B

        // Buttons
        var btnStyle = 'padding:6px 14px;border:2px solid #30363d;border-radius:8px;background:#1a1a40;font-size:0.82rem;cursor:pointer;font-weight:bold;margin:0 3px;';

        var circleBtn = document.createElement('button');
        circleBtn.textContent = 'C - Circle Numbers';
        circleBtn.style.cssText = btnStyle + 'color:#58a6ff;border-color:#58a6ff;';
        circleBtn.addEventListener('click', function() {
            showCircle = true;
            stepsRevealed = Math.max(stepsRevealed, 1);
        });
        controls.appendChild(circleBtn);

        var underlineBtn = document.createElement('button');
        underlineBtn.textContent = 'U - Underline Question';
        underlineBtn.style.cssText = btnStyle + 'color:#3fb950;border-color:#3fb950;';
        underlineBtn.addEventListener('click', function() {
            showUnderline = true;
            stepsRevealed = Math.max(stepsRevealed, 2);
        });
        controls.appendChild(underlineBtn);

        var boxBtn = document.createElement('button');
        boxBtn.textContent = 'B - Box Key Words';
        boxBtn.style.cssText = btnStyle + 'color:#f0883e;border-color:#f0883e;';
        boxBtn.addEventListener('click', function() {
            showBox = true;
            stepsRevealed = Math.max(stepsRevealed, 3);
        });
        controls.appendChild(boxBtn);

        var newBtn = document.createElement('button');
        newBtn.textContent = 'New Problem';
        newBtn.style.cssText = btnStyle + 'color:#bc8cff;border-color:#bc8cff;';
        newBtn.addEventListener('click', function() {
            currentProblem = (currentProblem + 1) % problems.length;
            showCircle = false;
            showUnderline = false;
            showBox = false;
            stepsRevealed = 0;
        });
        controls.appendChild(newBtn);

        function wrapText(text, maxWidth) {
            var words = text.split(' ');
            var lines = [];
            var line = '';
            ctx.font = '18px -apple-system, sans-serif';
            for (var i = 0; i < words.length; i++) {
                var testLine = line + (line ? ' ' : '') + words[i];
                var metrics = ctx.measureText(testLine);
                if (metrics.width > maxWidth && line) {
                    lines.push(line);
                    line = words[i];
                } else {
                    line = testLine;
                }
            }
            if (line) lines.push(line);
            return lines;
        }

        function draw() {
            viz.clear();

            // Title
            ctx.fillStyle = viz.colors.white;
            ctx.font = 'bold 22px -apple-system, sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'top';
            ctx.fillText('CUBES Strategy', viz.width / 2, 10);

            // Subtitle
            ctx.fillStyle = viz.colors.teal;
            ctx.font = '13px -apple-system, sans-serif';
            ctx.fillText('Circle numbers, Underline question, Box key words, Evaluate, Solve', viz.width / 2, 36);

            var prob = problems[currentProblem];
            var text = prob.text;

            // Word-wrap the problem text
            ctx.font = '18px -apple-system, sans-serif';
            var maxLineW = viz.width - 80;
            var lines = wrapText(text, maxLineW);
            var lineHeight = 32;
            var textStartY = 80;
            var textStartX = 40;

            // We need to map character indices to pixel positions
            // Build a flat array of chars with their screen x,y
            var charPositions = [];
            var charIdx = 0;
            for (var li = 0; li < lines.length; li++) {
                var lineText = lines[li];
                var lineY = textStartY + li * lineHeight;
                // Measure each character's x position
                for (var ci = 0; ci < lineText.length; ci++) {
                    var prefix = lineText.substring(0, ci);
                    var prefixW = ctx.measureText(prefix).width;
                    var charW = ctx.measureText(lineText[ci]).width;
                    charPositions.push({
                        char: lineText[ci],
                        x: textStartX + prefixW,
                        y: lineY,
                        w: charW,
                        lineIdx: li,
                        globalIdx: charIdx
                    });
                    charIdx++;
                }
                // Account for the space between lines
                if (li < lines.length - 1) {
                    charPositions.push({
                        char: ' ',
                        x: 0, y: 0, w: 0,
                        lineIdx: li,
                        globalIdx: charIdx
                    });
                    charIdx++;
                }
            }

            // Find character ranges by searching the text
            function findSubstring(sub) {
                var ranges = [];
                var idx = 0;
                while (true) {
                    var pos = text.indexOf(sub, idx);
                    if (pos === -1) break;
                    ranges.push({ start: pos, end: pos + sub.length });
                    idx = pos + 1;
                }
                return ranges;
            }

            // Draw highlight boxes for key words (behind text)
            if (showBox) {
                for (var ki = 0; ki < prob.keywords.length; ki++) {
                    var kw = prob.keywords[ki].word;
                    var kwRanges = findSubstring(kw);
                    for (var kr = 0; kr < kwRanges.length; kr++) {
                        var kStart = kwRanges[kr].start;
                        var kEnd = kwRanges[kr].end;
                        // Draw box around these characters
                        drawHighlightRange(kStart, kEnd, 'box', viz.colors.orange);
                    }
                }
            }

            // Draw underline for question (behind text)
            if (showUnderline) {
                // Find the question mark or last sentence
                var qIdx = text.indexOf('How');
                if (qIdx === -1) qIdx = text.indexOf('What');
                if (qIdx === -1) qIdx = text.indexOf('?');
                if (qIdx >= 0) {
                    var qEnd = text.length;
                    drawHighlightRange(qIdx, qEnd, 'underline', viz.colors.green);
                }
            }

            // Draw the text
            ctx.font = '18px -apple-system, sans-serif';
            ctx.textAlign = 'left';
            ctx.textBaseline = 'top';
            for (var li2 = 0; li2 < lines.length; li2++) {
                ctx.fillStyle = viz.colors.white;
                ctx.fillText(lines[li2], textStartX, textStartY + li2 * lineHeight);
            }

            // Draw circles around numbers (on top of text)
            if (showCircle) {
                for (var ni = 0; ni < prob.numbers.length; ni++) {
                    var numWord = prob.numbers[ni].word;
                    var numRanges = findSubstring(numWord);
                    for (var nr = 0; nr < numRanges.length; nr++) {
                        var nStart = numRanges[nr].start;
                        var nEnd = numRanges[nr].end;
                        drawHighlightRange(nStart, nEnd, 'circle', viz.colors.blue);
                    }
                }
            }

            function drawHighlightRange(startIdx, endIdx, type, color) {
                // Group consecutive chars by line
                var groups = {};
                for (var ci2 = 0; ci2 < charPositions.length; ci2++) {
                    var cp = charPositions[ci2];
                    if (cp.globalIdx >= startIdx && cp.globalIdx < endIdx && cp.char !== ' ') {
                        var key = cp.lineIdx;
                        if (!groups[key]) groups[key] = { minX: Infinity, maxX: -Infinity, y: cp.y };
                        groups[key].minX = Math.min(groups[key].minX, cp.x);
                        groups[key].maxX = Math.max(groups[key].maxX, cp.x + cp.w);
                        groups[key].y = cp.y;
                    }
                }
                // Also check chars that are at positions matching but might be spaces at line junctions
                // Re-check: scan charPositions that map to globalIdx in range
                for (var ci3 = 0; ci3 < charPositions.length; ci3++) {
                    var cp2 = charPositions[ci3];
                    if (cp2.globalIdx >= startIdx && cp2.globalIdx < endIdx && cp2.w > 0) {
                        var key2 = cp2.lineIdx;
                        if (!groups[key2]) groups[key2] = { minX: Infinity, maxX: -Infinity, y: cp2.y };
                        groups[key2].minX = Math.min(groups[key2].minX, cp2.x);
                        groups[key2].maxX = Math.max(groups[key2].maxX, cp2.x + cp2.w);
                        groups[key2].y = cp2.y;
                    }
                }

                var keys = Object.keys(groups);
                for (var gi = 0; gi < keys.length; gi++) {
                    var g = groups[keys[gi]];
                    if (g.minX === Infinity) continue;
                    var pad = 4;
                    var rx = g.minX - pad;
                    var ry = g.y - pad;
                    var rw = (g.maxX - g.minX) + pad * 2;
                    var rh = 22 + pad * 2;

                    if (type === 'circle') {
                        // Draw ellipse around text
                        var cx2 = rx + rw / 2;
                        var cy2 = ry + rh / 2;
                        ctx.strokeStyle = color;
                        ctx.lineWidth = 3;
                        ctx.beginPath();
                        ctx.ellipse(cx2, cy2, rw / 2 + 4, rh / 2 + 2, 0, 0, Math.PI * 2);
                        ctx.stroke();
                    } else if (type === 'underline') {
                        // Draw thick underline
                        ctx.strokeStyle = color;
                        ctx.lineWidth = 3;
                        ctx.beginPath();
                        ctx.moveTo(rx, ry + rh + 2);
                        ctx.lineTo(rx + rw, ry + rh + 2);
                        ctx.stroke();
                    } else if (type === 'box') {
                        // Draw rounded box
                        ctx.strokeStyle = color;
                        ctx.lineWidth = 2.5;
                        ctx.fillStyle = color + '18';
                        var br = 5;
                        ctx.beginPath();
                        ctx.moveTo(rx + br, ry);
                        ctx.lineTo(rx + rw - br, ry);
                        ctx.quadraticCurveTo(rx + rw, ry, rx + rw, ry + br);
                        ctx.lineTo(rx + rw, ry + rh - br);
                        ctx.quadraticCurveTo(rx + rw, ry + rh, rx + rw - br, ry + rh);
                        ctx.lineTo(rx + br, ry + rh);
                        ctx.quadraticCurveTo(rx, ry + rh, rx, ry + rh - br);
                        ctx.lineTo(rx, ry + br);
                        ctx.quadraticCurveTo(rx, ry, rx + br, ry);
                        ctx.closePath();
                        ctx.fill();
                        ctx.stroke();
                    }
                }
            }

            // CUBES legend at bottom
            var legendY = 260;
            var cubesLabels = [
                { letter: 'C', label: 'Circle numbers', color: viz.colors.blue, active: showCircle },
                { letter: 'U', label: 'Underline question', color: viz.colors.green, active: showUnderline },
                { letter: 'B', label: 'Box key words', color: viz.colors.orange, active: showBox },
                { letter: 'E', label: 'Evaluate', color: viz.colors.purple, active: stepsRevealed >= 3 },
                { letter: 'S', label: 'Solve!', color: viz.colors.pink, active: stepsRevealed >= 3 }
            ];

            for (var ci4 = 0; ci4 < cubesLabels.length; ci4++) {
                var cl = cubesLabels[ci4];
                var clx = 35 + ci4 * 105;
                var cly = legendY;

                // Letter circle
                var circR = 18;
                ctx.fillStyle = cl.active ? cl.color + '44' : '#1a1a40';
                ctx.strokeStyle = cl.active ? cl.color : '#30363d';
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.arc(clx + circR, cly + circR, circR, 0, Math.PI * 2);
                ctx.fill();
                ctx.stroke();

                ctx.fillStyle = cl.active ? cl.color : '#4a4a7a';
                ctx.font = 'bold 18px -apple-system, sans-serif';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(cl.letter, clx + circR, cly + circR);

                // Label
                ctx.font = '11px -apple-system, sans-serif';
                ctx.textBaseline = 'top';
                ctx.fillText(cl.label, clx + circR, cly + circR * 2 + 6);
            }

            // Problem counter
            ctx.fillStyle = viz.colors.text;
            ctx.font = '12px -apple-system, sans-serif';
            ctx.textAlign = 'right';
            ctx.textBaseline = 'bottom';
            ctx.fillText('Problem ' + (currentProblem + 1) + ' of ' + problems.length, viz.width - 20, viz.height - 8);

            // Fun encouragement when all 3 steps done
            if (stepsRevealed >= 3) {
                ctx.fillStyle = viz.colors.yellow;
                ctx.font = 'bold 16px -apple-system, sans-serif';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'top';
                ctx.fillText('Great detective work! Now Evaluate and Solve!', viz.width / 2, 345);

                var time = Date.now() * 0.003;
                var sparkColors = [viz.colors.blue, viz.colors.green, viz.colors.orange, viz.colors.purple, viz.colors.pink];
                for (var s = 0; s < 5; s++) {
                    var angle = (s / 5) * Math.PI * 2 + time;
                    var dist = 18 + Math.sin(time * 2 + s) * 6;
                    var sx = viz.width / 2 + Math.cos(angle) * (120 + dist);
                    var sy = 358 + Math.sin(angle) * 10;
                    ctx.fillStyle = sparkColors[s];
                    ctx.beginPath();
                    ctx.arc(sx, sy, 3, 0, Math.PI * 2);
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
// Visualization 2 — sec02: "Addition & Subtraction Word Problems"
// Interactive bar model / tape diagram builder.
// ============================================================
window.EXTRA_VIZ['ch08']['ch08-sec02'] = window.EXTRA_VIZ['ch08']['ch08-sec02'] || [];
window.EXTRA_VIZ['ch08']['ch08-sec02'].push({
    id: 'ch08-extra-viz-2',
    title: 'Bar Model Builder',
    description: 'Use the sliders to set Part A and Part B. Toggle between finding the whole and finding a missing part!',
    setup: function(container, controls) {
        var viz = new VizEngine(container, { width: 560, height: 400, scale: 40, originX: 280, originY: 200 });
        var ctx = viz.ctx;

        var partA = 18;
        var partB = 12;
        var mode = 'whole'; // 'whole' or 'part'
        var animT = 0;
        var animating = false;
        var animId = null;

        var sliderA = VizEngine.createSlider(controls, 'Part A:', 1, 50, partA, 1, function(val) {
            partA = Math.round(val);
            startAnim();
        });
        sliderA.step = 1;

        var sliderB = VizEngine.createSlider(controls, 'Part B:', 1, 50, partB, 1, function(val) {
            partB = Math.round(val);
            startAnim();
        });
        sliderB.step = 1;

        var btnStyle = 'padding:6px 14px;border:2px solid #30363d;border-radius:8px;background:#1a1a40;font-size:0.82rem;cursor:pointer;font-weight:bold;margin:0 4px;';

        var wholeBtn = document.createElement('button');
        wholeBtn.textContent = 'Find the Whole';
        wholeBtn.style.cssText = btnStyle + 'color:#3fb950;border-color:#3fb950;';
        wholeBtn.addEventListener('click', function() {
            mode = 'whole';
            startAnim();
        });
        controls.appendChild(wholeBtn);

        var partBtn = document.createElement('button');
        partBtn.textContent = 'Find a Part';
        partBtn.style.cssText = btnStyle + 'color:#f0883e;border-color:#f0883e;';
        partBtn.addEventListener('click', function() {
            mode = 'part';
            startAnim();
        });
        controls.appendChild(partBtn);

        function startAnim() {
            animT = 0;
            animating = true;
            if (animId) cancelAnimationFrame(animId);
            runAnim();
        }

        function runAnim() {
            animT += 0.025;
            if (animT >= 1) {
                animT = 1;
                animating = false;
            }
            draw();
            if (animating) {
                animId = requestAnimationFrame(runAnim);
            }
        }

        function draw() {
            viz.clear();

            var total = partA + partB;

            // Title
            ctx.fillStyle = viz.colors.white;
            ctx.font = 'bold 22px -apple-system, sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'top';
            ctx.fillText('Bar Model (Tape Diagram)', viz.width / 2, 10);

            // Mode indicator
            ctx.fillStyle = mode === 'whole' ? viz.colors.green : viz.colors.orange;
            ctx.font = 'bold 14px -apple-system, sans-serif';
            ctx.fillText(mode === 'whole' ? 'Finding the WHOLE' : 'Finding a MISSING PART', viz.width / 2, 38);

            // Bar dimensions
            var barLeft = 60;
            var barWidth = 440;
            var barHeight = 60;
            var barY = 100;
            var gap = 2;

            // Part widths proportional to values
            var aWidth = (partA / total) * barWidth;
            var bWidth = (partB / total) * barWidth;

            // Ease for animation
            var ease = animT < 0.5 ? 2 * animT * animT : 1 - Math.pow(-2 * animT + 2, 2) / 2;

            // Draw the WHOLE bar (top)
            var wholeBarY = barY;
            ctx.fillStyle = mode === 'whole' ? viz.colors.green + '22' : viz.colors.purple + '33';
            ctx.strokeStyle = mode === 'whole' ? viz.colors.green : viz.colors.purple;
            ctx.lineWidth = 3;

            // Rounded rect for whole bar
            var rr = 8;
            ctx.beginPath();
            ctx.moveTo(barLeft + rr, wholeBarY);
            ctx.lineTo(barLeft + barWidth - rr, wholeBarY);
            ctx.quadraticCurveTo(barLeft + barWidth, wholeBarY, barLeft + barWidth, wholeBarY + rr);
            ctx.lineTo(barLeft + barWidth, wholeBarY + barHeight - rr);
            ctx.quadraticCurveTo(barLeft + barWidth, wholeBarY + barHeight, barLeft + barWidth - rr, wholeBarY + barHeight);
            ctx.lineTo(barLeft + rr, wholeBarY + barHeight);
            ctx.quadraticCurveTo(barLeft, wholeBarY + barHeight, barLeft, wholeBarY + barHeight - rr);
            ctx.lineTo(barLeft, wholeBarY + rr);
            ctx.quadraticCurveTo(barLeft, wholeBarY, barLeft + rr, wholeBarY);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();

            // Whole bar label
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            if (mode === 'whole') {
                // Question mark with animation
                ctx.fillStyle = viz.colors.yellow;
                ctx.font = 'bold 28px -apple-system, sans-serif';
                var qScale = 1 + Math.sin(Date.now() * 0.005) * 0.1;
                ctx.save();
                ctx.translate(barLeft + barWidth / 2, wholeBarY + barHeight / 2);
                ctx.scale(qScale, qScale);
                ctx.fillText('? = ' + (ease >= 0.8 ? total : '?'), 0, 0);
                ctx.restore();
            } else {
                ctx.fillStyle = viz.colors.purple;
                ctx.font = 'bold 24px -apple-system, sans-serif';
                ctx.fillText('Whole = ' + total, barLeft + barWidth / 2, wholeBarY + barHeight / 2);
            }

            // Label above whole bar
            ctx.fillStyle = viz.colors.text;
            ctx.font = '12px -apple-system, sans-serif';
            ctx.textBaseline = 'bottom';
            ctx.fillText('WHOLE', barLeft + barWidth / 2, wholeBarY - 6);

            // Draw connection bracket
            var bracketY1 = wholeBarY + barHeight + 5;
            var bracketY2 = wholeBarY + barHeight + 25;
            ctx.strokeStyle = viz.colors.text + '88';
            ctx.lineWidth = 1.5;
            // Left vertical
            ctx.beginPath();
            ctx.moveTo(barLeft, bracketY1);
            ctx.lineTo(barLeft, bracketY2);
            ctx.stroke();
            // Right vertical
            ctx.beginPath();
            ctx.moveTo(barLeft + barWidth, bracketY1);
            ctx.lineTo(barLeft + barWidth, bracketY2);
            ctx.stroke();
            // Bottom horizontal
            ctx.beginPath();
            ctx.moveTo(barLeft, bracketY2);
            ctx.lineTo(barLeft + barWidth, bracketY2);
            ctx.stroke();

            // Draw PARTS bars (bottom)
            var partsBarY = bracketY2 + 10;

            // Part A bar
            var aAnimW = aWidth * ease;
            ctx.fillStyle = viz.colors.blue + '55';
            ctx.strokeStyle = viz.colors.blue;
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(barLeft + rr, partsBarY);
            ctx.lineTo(barLeft + aAnimW - (aAnimW > rr * 2 ? rr : 0), partsBarY);
            if (aAnimW > rr * 2) {
                ctx.quadraticCurveTo(barLeft + aAnimW, partsBarY, barLeft + aAnimW, partsBarY + rr);
            }
            ctx.lineTo(barLeft + aAnimW, partsBarY + barHeight - rr);
            if (aAnimW > rr * 2) {
                ctx.quadraticCurveTo(barLeft + aAnimW, partsBarY + barHeight, barLeft + aAnimW - rr, partsBarY + barHeight);
            }
            ctx.lineTo(barLeft + rr, partsBarY + barHeight);
            ctx.quadraticCurveTo(barLeft, partsBarY + barHeight, barLeft, partsBarY + barHeight - rr);
            ctx.lineTo(barLeft, partsBarY + rr);
            ctx.quadraticCurveTo(barLeft, partsBarY, barLeft + rr, partsBarY);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();

            // Part A label
            ctx.textBaseline = 'middle';
            ctx.fillStyle = viz.colors.blue;
            ctx.font = 'bold 20px -apple-system, sans-serif';
            ctx.textAlign = 'center';
            if (aWidth > 40) {
                ctx.fillText('A = ' + partA, barLeft + aWidth / 2, partsBarY + barHeight / 2);
            }

            // Part B bar
            var bAnimW = bWidth * ease;
            var bStart = barLeft + aWidth + gap;

            if (mode === 'part') {
                // Part B is the unknown
                ctx.fillStyle = viz.colors.yellow + '22';
                ctx.strokeStyle = viz.colors.yellow;
                ctx.lineWidth = 3;
                ctx.setLineDash([6, 4]);
            } else {
                ctx.fillStyle = viz.colors.orange + '55';
                ctx.strokeStyle = viz.colors.orange;
                ctx.lineWidth = 3;
                ctx.setLineDash([]);
            }

            ctx.beginPath();
            ctx.moveTo(bStart + (bAnimW > rr * 2 ? rr : 0), partsBarY);
            ctx.lineTo(bStart + bAnimW - rr, partsBarY);
            ctx.quadraticCurveTo(bStart + bAnimW, partsBarY, bStart + bAnimW, partsBarY + rr);
            ctx.lineTo(bStart + bAnimW, partsBarY + barHeight - rr);
            ctx.quadraticCurveTo(bStart + bAnimW, partsBarY + barHeight, bStart + bAnimW - rr, partsBarY + barHeight);
            ctx.lineTo(bStart + (bAnimW > rr * 2 ? rr : 0), partsBarY + barHeight);
            if (bAnimW > rr * 2) {
                ctx.quadraticCurveTo(bStart, partsBarY + barHeight, bStart, partsBarY + barHeight - rr);
                ctx.lineTo(bStart, partsBarY + rr);
                ctx.quadraticCurveTo(bStart, partsBarY, bStart + rr, partsBarY);
            }
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
            ctx.setLineDash([]);

            // Part B label
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            if (mode === 'part') {
                ctx.fillStyle = viz.colors.yellow;
                ctx.font = 'bold 20px -apple-system, sans-serif';
                var qScale2 = 1 + Math.sin(Date.now() * 0.005) * 0.1;
                ctx.save();
                ctx.translate(bStart + bWidth / 2, partsBarY + barHeight / 2);
                ctx.scale(qScale2, qScale2);
                ctx.fillText(ease >= 0.8 ? '? = ' + partB : '?', 0, 0);
                ctx.restore();
            } else {
                ctx.fillStyle = viz.colors.orange;
                ctx.font = 'bold 20px -apple-system, sans-serif';
                if (bWidth > 40) {
                    ctx.fillText('B = ' + partB, bStart + bWidth / 2, partsBarY + barHeight / 2);
                }
            }

            // Labels below parts
            ctx.textBaseline = 'top';
            ctx.font = '12px -apple-system, sans-serif';
            ctx.fillStyle = viz.colors.blue;
            ctx.fillText('Part A', barLeft + aWidth / 2, partsBarY + barHeight + 8);
            ctx.fillStyle = mode === 'part' ? viz.colors.yellow : viz.colors.orange;
            ctx.fillText('Part B', bStart + bWidth / 2, partsBarY + barHeight + 8);

            // Equation display
            var eqY = partsBarY + barHeight + 50;

            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.font = 'bold 24px -apple-system, sans-serif';

            if (mode === 'whole') {
                // Part A + Part B = ?
                ctx.fillStyle = viz.colors.blue;
                ctx.fillText(partA, 160, eqY);
                ctx.fillStyle = viz.colors.yellow;
                ctx.fillText('+', 200, eqY);
                ctx.fillStyle = viz.colors.orange;
                ctx.fillText(partB, 240, eqY);
                ctx.fillStyle = viz.colors.white;
                ctx.fillText('=', 280, eqY);
                ctx.fillStyle = ease >= 0.8 ? viz.colors.green : viz.colors.yellow;
                ctx.font = 'bold 28px -apple-system, sans-serif';
                ctx.fillText(ease >= 0.8 ? String(total) : '?', 330, eqY);
            } else {
                // Whole - Part A = ?
                ctx.fillStyle = viz.colors.purple;
                ctx.fillText(total, 150, eqY);
                ctx.fillStyle = viz.colors.yellow;
                ctx.fillText('-', 190, eqY);
                ctx.fillStyle = viz.colors.blue;
                ctx.fillText(partA, 230, eqY);
                ctx.fillStyle = viz.colors.white;
                ctx.fillText('=', 270, eqY);
                ctx.fillStyle = ease >= 0.8 ? viz.colors.orange : viz.colors.yellow;
                ctx.font = 'bold 28px -apple-system, sans-serif';
                ctx.fillText(ease >= 0.8 ? String(partB) : '?', 320, eqY);
            }

            // Fun fact
            ctx.fillStyle = viz.colors.teal;
            ctx.font = '13px -apple-system, sans-serif';
            ctx.textBaseline = 'top';
            if (mode === 'whole') {
                ctx.fillText('The two parts combine to make the whole!', viz.width / 2, eqY + 28);
            } else {
                ctx.fillText('Subtract the known part from the whole to find the missing part!', viz.width / 2, eqY + 28);
            }

            // Sparkles when answer revealed
            if (ease >= 0.8) {
                var time = Date.now() * 0.003;
                var sparkColors = [viz.colors.blue, viz.colors.green, viz.colors.orange, viz.colors.pink];
                for (var s = 0; s < 4; s++) {
                    var angle = (s / 4) * Math.PI * 2 + time;
                    var dist = 16 + Math.sin(time * 2 + s) * 6;
                    var sx = 330 + Math.cos(angle) * dist;
                    var sy = eqY + Math.sin(angle) * dist;
                    ctx.fillStyle = sparkColors[s];
                    ctx.beginPath();
                    ctx.arc(sx, sy, 3, 0, Math.PI * 2);
                    ctx.fill();
                }
                if (!animating) {
                    requestAnimationFrame(function() { draw(); });
                }
            }
        }

        startAnim();
        return viz;
    }
});

// ============================================================
// Visualization 3 — sec03: "Multiplication & Division Word Problems"
// "Which operation?" quiz with score tracking.
// ============================================================
window.EXTRA_VIZ['ch08']['ch08-sec03'] = window.EXTRA_VIZ['ch08']['ch08-sec03'] || [];
window.EXTRA_VIZ['ch08']['ch08-sec03'].push({
    id: 'ch08-extra-viz-3',
    title: 'Which Operation? Quiz',
    description: 'Read the word problem and pick the right operation. Can you get a perfect score?',
    setup: function(container, controls) {
        var viz = new VizEngine(container, { width: 560, height: 400, scale: 40, originX: 280, originY: 200 });
        var ctx = viz.ctx;

        var problems = [
            { text: 'Sara has 14 cookies. She bakes 9 more. How many cookies does she have now?', answer: '+', explain: '14 + 9 = 23 cookies' },
            { text: 'Tom had 25 toy cars. He gave away 8. How many toy cars does Tom have left?', answer: '-', explain: '25 - 8 = 17 toy cars' },
            { text: 'There are 6 boxes. Each box has 7 crayons. How many crayons are there in all?', answer: '\u00D7', explain: '6 \u00D7 7 = 42 crayons' },
            { text: '32 students sit at 4 equal tables. How many students at each table?', answer: '\u00F7', explain: '32 \u00F7 4 = 8 students' },
            { text: 'A farmer has 18 apples and picks 15 more. How many apples does the farmer have?', answer: '+', explain: '18 + 15 = 33 apples' },
            { text: 'Lily had 40 stickers. She used 17 for her project. How many stickers are left?', answer: '-', explain: '40 - 17 = 23 stickers' },
            { text: '5 friends each bring 8 balloons to a party. How many balloons are there in total?', answer: '\u00D7', explain: '5 \u00D7 8 = 40 balloons' },
            { text: '24 pencils are shared equally among 6 children. How many does each child get?', answer: '\u00F7', explain: '24 \u00F7 6 = 4 pencils' },
            { text: 'A store has 3 shelves with 9 books on each. How many books are there?', answer: '\u00D7', explain: '3 \u00D7 9 = 27 books' },
            { text: 'Mike ran 45 meters. Sam ran 29 meters. How much farther did Mike run?', answer: '-', explain: '45 - 29 = 16 meters farther' }
        ];

        var currentQ = 0;
        var score = 0;
        var totalAttempted = 0;
        var feedback = ''; // '', 'correct', 'wrong'
        var feedbackTime = 0;
        var shakeT = 0;
        var showExplain = false;

        var btnStyle = 'padding:8px 20px;border:2px solid #30363d;border-radius:10px;background:#1a1a40;font-size:1.2rem;cursor:pointer;font-weight:bold;margin:0 5px;min-width:50px;';

        var ops = ['+', '\u2212', '\u00D7', '\u00F7'];
        var opColors = [viz.colors.green, viz.colors.red, viz.colors.blue, viz.colors.orange];
        var opBtns = [];

        for (var i = 0; i < ops.length; i++) {
            (function(idx) {
                var btn = document.createElement('button');
                btn.textContent = ops[idx];
                btn.style.cssText = btnStyle + 'color:' + opColors[idx] + ';border-color:' + opColors[idx] + ';';
                btn.addEventListener('click', function() {
                    if (feedback === 'correct') return;
                    var answer = problems[currentQ].answer;
                    // Map display ops to answer ops
                    var picked = ops[idx];
                    if (picked === '\u2212') picked = '-';
                    if (picked === answer) {
                        feedback = 'correct';
                        score++;
                        totalAttempted++;
                        showExplain = true;
                        feedbackTime = Date.now();
                    } else {
                        feedback = 'wrong';
                        totalAttempted++;
                        shakeT = Date.now();
                        feedbackTime = Date.now();
                        showExplain = false;
                    }
                });
                controls.appendChild(btn);
                opBtns.push(btn);
            })(i);
        }

        var nextBtn = document.createElement('button');
        nextBtn.textContent = 'Next Problem';
        nextBtn.style.cssText = 'padding:6px 16px;border:2px solid #bc8cff;border-radius:8px;background:#1a1a40;color:#bc8cff;font-size:0.82rem;cursor:pointer;font-weight:bold;margin-left:10px;';
        nextBtn.addEventListener('click', function() {
            currentQ = (currentQ + 1) % problems.length;
            feedback = '';
            showExplain = false;
        });
        controls.appendChild(nextBtn);

        function wrapText2(text, maxW) {
            var words = text.split(' ');
            var lines = [];
            var line = '';
            ctx.font = '17px -apple-system, sans-serif';
            for (var i2 = 0; i2 < words.length; i2++) {
                var testLine = line + (line ? ' ' : '') + words[i2];
                if (ctx.measureText(testLine).width > maxW && line) {
                    lines.push(line);
                    line = words[i2];
                } else {
                    line = testLine;
                }
            }
            if (line) lines.push(line);
            return lines;
        }

        function draw() {
            viz.clear();

            var now = Date.now();

            // Shake effect
            var shakeX = 0;
            if (feedback === 'wrong' && now - shakeT < 400) {
                var shakePhase = (now - shakeT) / 400;
                shakeX = Math.sin(shakePhase * Math.PI * 6) * 8 * (1 - shakePhase);
            }

            ctx.save();
            ctx.translate(shakeX, 0);

            // Title
            ctx.fillStyle = viz.colors.white;
            ctx.font = 'bold 22px -apple-system, sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'top';
            ctx.fillText('Which Operation?', viz.width / 2, 10);

            // Score display
            ctx.fillStyle = viz.colors.teal;
            ctx.font = 'bold 16px -apple-system, sans-serif';
            ctx.textAlign = 'right';
            ctx.fillText('Score: ' + score + '/' + totalAttempted, viz.width - 30, 14);

            // Score stars
            var starX = viz.width - 30;
            var starY = 38;
            ctx.textAlign = 'right';
            ctx.font = '14px -apple-system, sans-serif';
            var starCount = Math.min(score, 10);
            var starStr = '';
            for (var si = 0; si < starCount; si++) {
                starStr += '\u2605 ';
            }
            ctx.fillStyle = viz.colors.yellow;
            ctx.fillText(starStr, starX, starY);

            // Problem card background
            var cardX = 30;
            var cardY = 60;
            var cardW = 500;
            var cardH = 120;

            // Background glow for feedback
            if (feedback === 'correct' && now - feedbackTime < 1500) {
                ctx.fillStyle = viz.colors.green + '15';
                ctx.fillRect(cardX - 4, cardY - 4, cardW + 8, cardH + 8);
            } else if (feedback === 'wrong' && now - feedbackTime < 800) {
                ctx.fillStyle = viz.colors.red + '15';
                ctx.fillRect(cardX - 4, cardY - 4, cardW + 8, cardH + 8);
            }

            ctx.fillStyle = '#151530';
            ctx.strokeStyle = '#30363d';
            ctx.lineWidth = 2;
            // Rounded card
            var cr = 12;
            ctx.beginPath();
            ctx.moveTo(cardX + cr, cardY);
            ctx.lineTo(cardX + cardW - cr, cardY);
            ctx.quadraticCurveTo(cardX + cardW, cardY, cardX + cardW, cardY + cr);
            ctx.lineTo(cardX + cardW, cardY + cardH - cr);
            ctx.quadraticCurveTo(cardX + cardW, cardY + cardH, cardX + cardW - cr, cardY + cardH);
            ctx.lineTo(cardX + cr, cardY + cardH);
            ctx.quadraticCurveTo(cardX, cardY + cardH, cardX, cardY + cardH - cr);
            ctx.lineTo(cardX, cardY + cr);
            ctx.quadraticCurveTo(cardX, cardY, cardX + cr, cardY);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();

            // Problem number badge
            ctx.fillStyle = viz.colors.purple;
            ctx.beginPath();
            ctx.arc(cardX + 25, cardY + 25, 16, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = viz.colors.white;
            ctx.font = 'bold 14px -apple-system, sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(String(currentQ + 1), cardX + 25, cardY + 25);

            // Problem text
            ctx.font = '17px -apple-system, sans-serif';
            var problemLines = wrapText2(problems[currentQ].text, cardW - 70);
            ctx.textAlign = 'left';
            ctx.textBaseline = 'top';
            ctx.fillStyle = viz.colors.white;
            for (var pl = 0; pl < problemLines.length; pl++) {
                ctx.fillText(problemLines[pl], cardX + 50, cardY + 20 + pl * 26);
            }

            // Operation labels
            var opLabelY = 200;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.font = 'bold 14px -apple-system, sans-serif';
            var opLabels = ['Add', 'Subtract', 'Multiply', 'Divide'];
            for (var oi = 0; oi < 4; oi++) {
                var olx = 85 + oi * 120;
                // Draw operation symbol in large circle
                ctx.fillStyle = opColors[oi] + '22';
                ctx.strokeStyle = opColors[oi] + '66';
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.arc(olx, opLabelY, 28, 0, Math.PI * 2);
                ctx.fill();
                ctx.stroke();

                ctx.fillStyle = opColors[oi];
                ctx.font = 'bold 28px -apple-system, sans-serif';
                ctx.fillText(ops[oi], olx, opLabelY);

                ctx.fillStyle = opColors[oi] + 'aa';
                ctx.font = '12px -apple-system, sans-serif';
                ctx.textBaseline = 'top';
                ctx.fillText(opLabels[oi], olx, opLabelY + 32);
                ctx.textBaseline = 'middle';
            }

            // Feedback area
            var fbY = 275;
            if (feedback === 'correct') {
                ctx.fillStyle = viz.colors.green;
                ctx.font = 'bold 26px -apple-system, sans-serif';
                ctx.textAlign = 'center';
                ctx.fillText('Correct!', viz.width / 2, fbY);

                // Show explanation
                if (showExplain) {
                    ctx.fillStyle = viz.colors.yellow;
                    ctx.font = 'bold 18px -apple-system, sans-serif';
                    ctx.fillText(problems[currentQ].explain, viz.width / 2, fbY + 35);
                }

                // Sparkle celebration
                var time = Date.now() * 0.004;
                var sparkColors = [viz.colors.green, viz.colors.yellow, viz.colors.teal, viz.colors.blue, viz.colors.pink, viz.colors.orange];
                for (var s = 0; s < 8; s++) {
                    var angle = (s / 8) * Math.PI * 2 + time;
                    var dist = 30 + Math.sin(time * 2 + s) * 12;
                    var sx = viz.width / 2 + Math.cos(angle) * dist * 2;
                    var sy = fbY + Math.sin(angle) * dist;
                    ctx.fillStyle = sparkColors[s % sparkColors.length];
                    ctx.beginPath();
                    ctx.arc(sx, sy, 3.5, 0, Math.PI * 2);
                    ctx.fill();
                }
            } else if (feedback === 'wrong') {
                ctx.fillStyle = viz.colors.red;
                ctx.font = 'bold 22px -apple-system, sans-serif';
                ctx.textAlign = 'center';
                ctx.fillText('Not quite... Try again!', viz.width / 2, fbY);
            } else {
                ctx.fillStyle = viz.colors.text;
                ctx.font = '15px -apple-system, sans-serif';
                ctx.textAlign = 'center';
                ctx.fillText('Pick the correct operation!', viz.width / 2, fbY);
            }

            // Progress dots
            var dotY = 370;
            ctx.textAlign = 'center';
            for (var di = 0; di < problems.length; di++) {
                var dx = viz.width / 2 + (di - problems.length / 2) * 18;
                ctx.fillStyle = di === currentQ ? viz.colors.yellow : '#30363d';
                ctx.beginPath();
                ctx.arc(dx, dotY, di === currentQ ? 5 : 3, 0, Math.PI * 2);
                ctx.fill();
            }

            ctx.restore();
        }

        viz.animate(function() {
            draw();
        });

        return viz;
    }
});

// ============================================================
// Visualization 4 — sec04: "Two-Step Problems"
// Step-by-step solver with animated solution flow.
// ============================================================
window.EXTRA_VIZ['ch08']['ch08-sec04'] = window.EXTRA_VIZ['ch08']['ch08-sec04'] || [];
window.EXTRA_VIZ['ch08']['ch08-sec04'].push({
    id: 'ch08-extra-viz-4',
    title: 'Two-Step Problem Solver',
    description: 'Choose the operation for each step. Watch the answer from Step 1 flow into Step 2!',
    setup: function(container, controls) {
        var viz = new VizEngine(container, { width: 560, height: 400, scale: 40, originX: 280, originY: 200 });
        var ctx = viz.ctx;

        var problems = [
            {
                text: 'Amy has 12 stickers. She buys 8 more, then gives away 5. How many does she have?',
                step1: { a: 12, b: 8, op: '+', result: 20 },
                step2: { b: 5, op: '-', result: 15 },
                step1Label: '12 + 8',
                step2Label: '20 - 5'
            },
            {
                text: 'Ben earns $7 each day for 4 days. He spends $10. How much money does he have left?',
                step1: { a: 7, b: 4, op: '\u00D7', result: 28 },
                step2: { b: 10, op: '-', result: 18 },
                step1Label: '7 \u00D7 4',
                step2Label: '28 - 10'
            },
            {
                text: 'There are 30 oranges divided equally into 5 baskets. Mom adds 3 more oranges to each basket. How many per basket now?',
                step1: { a: 30, b: 5, op: '\u00F7', result: 6 },
                step2: { b: 3, op: '+', result: 9 },
                step1Label: '30 \u00F7 5',
                step2Label: '6 + 3'
            },
            {
                text: 'Lily buys 3 packs of 6 pencils. She loses 4 pencils. How many pencils does she have?',
                step1: { a: 3, b: 6, op: '\u00D7', result: 18 },
                step2: { b: 4, op: '-', result: 14 },
                step1Label: '3 \u00D7 6',
                step2Label: '18 - 4'
            },
            {
                text: 'A store has 45 apples. 20 are sold in the morning and 10 more in the afternoon. How many are left?',
                step1: { a: 45, b: 20, op: '-', result: 25 },
                step2: { b: 10, op: '-', result: 15 },
                step1Label: '45 - 20',
                step2Label: '25 - 10'
            }
        ];

        var currentP = 0;
        var step1Done = false;
        var step2Done = false;
        var step1Op = '';
        var step2Op = '';
        var flowAnimT = 0;
        var flowAnimating = false;
        var flowAnimId = null;
        var step1Correct = false;
        var step2Correct = false;
        var step1FlashTime = 0;
        var step2FlashTime = 0;

        var btnStyle = 'padding:5px 12px;border:2px solid #30363d;border-radius:8px;background:#1a1a40;font-size:0.9rem;cursor:pointer;font-weight:bold;margin:0 2px;';

        // Step 1 buttons
        var s1Label = document.createElement('span');
        s1Label.textContent = 'Step 1: ';
        s1Label.style.cssText = 'color:#58a6ff;font-weight:bold;font-size:0.82rem;margin-right:4px;';
        controls.appendChild(s1Label);

        var s1Ops = ['+', '\u2212', '\u00D7', '\u00F7'];
        var s1Colors = [viz.colors.green, viz.colors.red, viz.colors.blue, viz.colors.orange];
        for (var i = 0; i < s1Ops.length; i++) {
            (function(idx) {
                var btn = document.createElement('button');
                btn.textContent = s1Ops[idx];
                btn.style.cssText = btnStyle + 'color:' + s1Colors[idx] + ';border-color:' + s1Colors[idx] + ';';
                btn.addEventListener('click', function() {
                    if (step1Done) return;
                    var picked = s1Ops[idx];
                    if (picked === '\u2212') picked = '-';
                    var prob = problems[currentP];
                    step1Op = picked;
                    step1FlashTime = Date.now();
                    if (picked === prob.step1.op) {
                        step1Done = true;
                        step1Correct = true;
                        // Start flow animation
                        flowAnimT = 0;
                        flowAnimating = true;
                        if (flowAnimId) cancelAnimationFrame(flowAnimId);
                        runFlowAnim();
                    } else {
                        step1Correct = false;
                    }
                });
                controls.appendChild(btn);
            })(i);
        }

        // Spacer
        var spacer = document.createElement('span');
        spacer.innerHTML = '&nbsp;&nbsp;';
        controls.appendChild(spacer);

        // Step 2 buttons
        var s2Label = document.createElement('span');
        s2Label.textContent = 'Step 2: ';
        s2Label.style.cssText = 'color:#f0883e;font-weight:bold;font-size:0.82rem;margin-right:4px;';
        controls.appendChild(s2Label);

        for (var j = 0; j < s1Ops.length; j++) {
            (function(idx) {
                var btn = document.createElement('button');
                btn.textContent = s1Ops[idx];
                btn.style.cssText = btnStyle + 'color:' + s1Colors[idx] + ';border-color:' + s1Colors[idx] + ';';
                btn.addEventListener('click', function() {
                    if (!step1Done || step2Done) return;
                    var picked = s1Ops[idx];
                    if (picked === '\u2212') picked = '-';
                    var prob = problems[currentP];
                    step2Op = picked;
                    step2FlashTime = Date.now();
                    if (picked === prob.step2.op) {
                        step2Done = true;
                        step2Correct = true;
                    } else {
                        step2Correct = false;
                    }
                });
                controls.appendChild(btn);
            })(j);
        }

        // Next problem
        var nextBtn = document.createElement('button');
        nextBtn.textContent = 'Next';
        nextBtn.style.cssText = 'padding:5px 12px;border:2px solid #bc8cff;border-radius:8px;background:#1a1a40;color:#bc8cff;font-size:0.82rem;cursor:pointer;font-weight:bold;margin-left:8px;';
        nextBtn.addEventListener('click', function() {
            currentP = (currentP + 1) % problems.length;
            step1Done = false;
            step2Done = false;
            step1Op = '';
            step2Op = '';
            step1Correct = false;
            step2Correct = false;
            flowAnimT = 0;
            flowAnimating = false;
        });
        controls.appendChild(nextBtn);

        function runFlowAnim() {
            flowAnimT += 0.02;
            if (flowAnimT >= 1) {
                flowAnimT = 1;
                flowAnimating = false;
            }
            if (flowAnimating) {
                flowAnimId = requestAnimationFrame(runFlowAnim);
            }
        }

        function wrapText3(text, maxW) {
            var words = text.split(' ');
            var lines = [];
            var line = '';
            ctx.font = '16px -apple-system, sans-serif';
            for (var i2 = 0; i2 < words.length; i2++) {
                var testLine = line + (line ? ' ' : '') + words[i2];
                if (ctx.measureText(testLine).width > maxW && line) {
                    lines.push(line);
                    line = words[i2];
                } else {
                    line = testLine;
                }
            }
            if (line) lines.push(line);
            return lines;
        }

        function draw() {
            viz.clear();
            var now = Date.now();
            var prob = problems[currentP];

            // Title
            ctx.fillStyle = viz.colors.white;
            ctx.font = 'bold 20px -apple-system, sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'top';
            ctx.fillText('Two-Step Problem Solver', viz.width / 2, 8);

            // Problem text
            ctx.font = '16px -apple-system, sans-serif';
            var pLines = wrapText3(prob.text, viz.width - 60);
            ctx.textAlign = 'left';
            ctx.fillStyle = viz.colors.white;
            for (var pl = 0; pl < pLines.length; pl++) {
                ctx.fillText(pLines[pl], 30, 40 + pl * 22);
            }

            // Step boxes
            var boxW = 200;
            var boxH = 100;
            var box1X = 40;
            var box2X = 320;
            var boxY = 110;

            // Step 1 box
            var s1Color = step1Done ? viz.colors.green : viz.colors.blue;
            if (!step1Correct && step1Op && now - step1FlashTime < 600) {
                s1Color = viz.colors.red;
            }
            ctx.fillStyle = s1Color + '15';
            ctx.strokeStyle = s1Color;
            ctx.lineWidth = 3;
            var br = 10;
            ctx.beginPath();
            ctx.moveTo(box1X + br, boxY);
            ctx.lineTo(box1X + boxW - br, boxY);
            ctx.quadraticCurveTo(box1X + boxW, boxY, box1X + boxW, boxY + br);
            ctx.lineTo(box1X + boxW, boxY + boxH - br);
            ctx.quadraticCurveTo(box1X + boxW, boxY + boxH, box1X + boxW - br, boxY + boxH);
            ctx.lineTo(box1X + br, boxY + boxH);
            ctx.quadraticCurveTo(box1X, boxY + boxH, box1X, boxY + boxH - br);
            ctx.lineTo(box1X, boxY + br);
            ctx.quadraticCurveTo(box1X, boxY, box1X + br, boxY);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();

            // Step 1 label
            ctx.fillStyle = s1Color;
            ctx.font = 'bold 14px -apple-system, sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'top';
            ctx.fillText('STEP 1', box1X + boxW / 2, boxY + 8);

            // Step 1 content
            ctx.font = '15px -apple-system, sans-serif';
            ctx.fillStyle = viz.colors.white;
            ctx.textBaseline = 'middle';
            ctx.fillText(prob.step1.a + '  ?  ' + prob.step1.b, box1X + boxW / 2, boxY + 42);

            if (step1Done) {
                ctx.fillStyle = viz.colors.yellow;
                ctx.font = 'bold 22px -apple-system, sans-serif';
                ctx.fillText(prob.step1Label + ' = ' + prob.step1.result, box1X + boxW / 2, boxY + 72);
            } else if (!step1Correct && step1Op && now - step1FlashTime < 600) {
                ctx.fillStyle = viz.colors.red;
                ctx.font = 'bold 15px -apple-system, sans-serif';
                ctx.fillText('Try again!', box1X + boxW / 2, boxY + 72);
            } else {
                ctx.fillStyle = viz.colors.text;
                ctx.font = '13px -apple-system, sans-serif';
                ctx.fillText('Pick the operation above', box1X + boxW / 2, boxY + 72);
            }

            // Arrow between boxes
            var arrowX1 = box1X + boxW + 10;
            var arrowX2 = box2X - 10;
            var arrowY = boxY + boxH / 2;

            if (step1Done) {
                // Animated flow arrow
                var flowEase = flowAnimT < 0.5 ? 2 * flowAnimT * flowAnimT : 1 - Math.pow(-2 * flowAnimT + 2, 2) / 2;
                var arrowProgress = flowEase;

                // Arrow line
                var currentArrowX = arrowX1 + (arrowX2 - arrowX1) * arrowProgress;
                ctx.strokeStyle = viz.colors.yellow;
                ctx.lineWidth = 3;
                ctx.beginPath();
                ctx.moveTo(arrowX1, arrowY);
                ctx.lineTo(currentArrowX, arrowY);
                ctx.stroke();

                // Arrow head
                if (arrowProgress > 0.8) {
                    ctx.fillStyle = viz.colors.yellow;
                    ctx.beginPath();
                    ctx.moveTo(arrowX2, arrowY);
                    ctx.lineTo(arrowX2 - 10, arrowY - 6);
                    ctx.lineTo(arrowX2 - 10, arrowY + 6);
                    ctx.closePath();
                    ctx.fill();
                }

                // Flowing number
                if (arrowProgress > 0.1 && arrowProgress < 0.95) {
                    var numX = arrowX1 + (arrowX2 - arrowX1) * arrowProgress;
                    ctx.fillStyle = viz.colors.yellow;
                    ctx.font = 'bold 16px -apple-system, sans-serif';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'bottom';
                    ctx.fillText(String(prob.step1.result), numX, arrowY - 8);
                }

                // Glow particles along the arrow
                var time = Date.now() * 0.004;
                if (arrowProgress > 0.3) {
                    var particleColors = [viz.colors.yellow, viz.colors.teal, viz.colors.green];
                    for (var pi = 0; pi < 3; pi++) {
                        var pt = (time + pi * 0.3) % 1;
                        var px = arrowX1 + (arrowX2 - arrowX1) * pt;
                        var py = arrowY + Math.sin(time * 4 + pi * 2) * 6;
                        ctx.fillStyle = particleColors[pi] + '88';
                        ctx.beginPath();
                        ctx.arc(px, py, 2.5, 0, Math.PI * 2);
                        ctx.fill();
                    }
                }
            } else {
                // Dim arrow placeholder
                ctx.strokeStyle = '#30363d';
                ctx.lineWidth = 2;
                ctx.setLineDash([4, 4]);
                ctx.beginPath();
                ctx.moveTo(arrowX1, arrowY);
                ctx.lineTo(arrowX2, arrowY);
                ctx.stroke();
                ctx.setLineDash([]);
            }

            // Step 2 box
            var s2Color = !step1Done ? '#30363d' : (step2Done ? viz.colors.green : viz.colors.orange);
            if (step1Done && !step2Correct && step2Op && now - step2FlashTime < 600) {
                s2Color = viz.colors.red;
            }
            ctx.fillStyle = (step1Done ? s2Color + '15' : '#0e0e1c');
            ctx.strokeStyle = s2Color;
            ctx.lineWidth = step1Done ? 3 : 1.5;
            ctx.beginPath();
            ctx.moveTo(box2X + br, boxY);
            ctx.lineTo(box2X + boxW - br, boxY);
            ctx.quadraticCurveTo(box2X + boxW, boxY, box2X + boxW, boxY + br);
            ctx.lineTo(box2X + boxW, boxY + boxH - br);
            ctx.quadraticCurveTo(box2X + boxW, boxY + boxH, box2X + boxW - br, boxY + boxH);
            ctx.lineTo(box2X + br, boxY + boxH);
            ctx.quadraticCurveTo(box2X, boxY + boxH, box2X, boxY + boxH - br);
            ctx.lineTo(box2X, boxY + br);
            ctx.quadraticCurveTo(box2X, boxY, box2X + br, boxY);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();

            // Step 2 label
            ctx.fillStyle = s2Color;
            ctx.font = 'bold 14px -apple-system, sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'top';
            ctx.fillText('STEP 2', box2X + boxW / 2, boxY + 8);

            // Step 2 content
            if (step1Done) {
                ctx.font = '15px -apple-system, sans-serif';
                ctx.fillStyle = viz.colors.white;
                ctx.textBaseline = 'middle';
                ctx.fillText(prob.step1.result + '  ?  ' + prob.step2.b, box2X + boxW / 2, boxY + 42);

                if (step2Done) {
                    ctx.fillStyle = viz.colors.yellow;
                    ctx.font = 'bold 22px -apple-system, sans-serif';
                    ctx.fillText(prob.step2Label + ' = ' + prob.step2.result, box2X + boxW / 2, boxY + 72);
                } else if (!step2Correct && step2Op && now - step2FlashTime < 600) {
                    ctx.fillStyle = viz.colors.red;
                    ctx.font = 'bold 15px -apple-system, sans-serif';
                    ctx.fillText('Try again!', box2X + boxW / 2, boxY + 72);
                } else {
                    ctx.fillStyle = viz.colors.text;
                    ctx.font = '13px -apple-system, sans-serif';
                    ctx.fillText('Pick the operation above', box2X + boxW / 2, boxY + 72);
                }
            } else {
                ctx.fillStyle = '#30363d';
                ctx.font = '14px -apple-system, sans-serif';
                ctx.textBaseline = 'middle';
                ctx.fillText('Complete Step 1 first', box2X + boxW / 2, boxY + boxH / 2);
            }

            // Final answer area
            var finalY = boxY + boxH + 30;
            if (step2Done) {
                // Animated final answer
                ctx.fillStyle = viz.colors.green + '22';
                ctx.strokeStyle = viz.colors.green;
                ctx.lineWidth = 3;
                var fW = 300;
                var fH = 70;
                var fX = (viz.width - fW) / 2;
                ctx.beginPath();
                ctx.moveTo(fX + br, finalY);
                ctx.lineTo(fX + fW - br, finalY);
                ctx.quadraticCurveTo(fX + fW, finalY, fX + fW, finalY + br);
                ctx.lineTo(fX + fW, finalY + fH - br);
                ctx.quadraticCurveTo(fX + fW, finalY + fH, fX + fW - br, finalY + fH);
                ctx.lineTo(fX + br, finalY + fH);
                ctx.quadraticCurveTo(fX, finalY + fH, fX, finalY + fH - br);
                ctx.lineTo(fX, finalY + br);
                ctx.quadraticCurveTo(fX, finalY, fX + br, finalY);
                ctx.closePath();
                ctx.fill();
                ctx.stroke();

                ctx.fillStyle = viz.colors.green;
                ctx.font = 'bold 14px -apple-system, sans-serif';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'top';
                ctx.fillText('FINAL ANSWER', viz.width / 2, finalY + 8);

                ctx.fillStyle = viz.colors.yellow;
                ctx.font = 'bold 28px -apple-system, sans-serif';
                ctx.textBaseline = 'middle';
                ctx.fillText(String(prob.step2.result), viz.width / 2, finalY + 46);

                // Celebration sparkles
                var time2 = Date.now() * 0.004;
                var sparkColors = [viz.colors.green, viz.colors.yellow, viz.colors.pink, viz.colors.blue, viz.colors.orange, viz.colors.teal];
                for (var s = 0; s < 8; s++) {
                    var angle = (s / 8) * Math.PI * 2 + time2;
                    var dist = 25 + Math.sin(time2 * 2 + s) * 10;
                    var sx = viz.width / 2 + Math.cos(angle) * dist * 3;
                    var sy = finalY + 35 + Math.sin(angle) * dist;
                    ctx.fillStyle = sparkColors[s % sparkColors.length];
                    ctx.beginPath();
                    ctx.arc(sx, sy, 3, 0, Math.PI * 2);
                    ctx.fill();
                }
            }

            // Problem counter dots
            ctx.textAlign = 'center';
            for (var di = 0; di < problems.length; di++) {
                var dx = viz.width / 2 + (di - problems.length / 2) * 16;
                ctx.fillStyle = di === currentP ? viz.colors.yellow : '#30363d';
                ctx.beginPath();
                ctx.arc(dx, viz.height - 10, di === currentP ? 5 : 3, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        viz.animate(function() {
            draw();
        });

        return viz;
    }
});

// ============================================================
// Visualization 5 — sec05: "Problem-Solving Toolbox"
// Strategy picker spinner wheel with sample problems.
// ============================================================
window.EXTRA_VIZ['ch08']['ch08-sec05'] = window.EXTRA_VIZ['ch08']['ch08-sec05'] || [];
window.EXTRA_VIZ['ch08']['ch08-sec05'].push({
    id: 'ch08-extra-viz-5',
    title: 'Strategy Spinner Wheel',
    description: 'Spin the wheel to land on a problem-solving strategy! Each strategy comes with a sample problem to try.',
    setup: function(container, controls) {
        var viz = new VizEngine(container, { width: 560, height: 400, scale: 40, originX: 280, originY: 200 });
        var ctx = viz.ctx;

        var strategies = [
            {
                name: 'Draw a Picture',
                color: '#58a6ff',
                problem: 'A garden has 3 rows of flowers with 5 flowers in each row. Draw the garden to find the total.',
                tip: 'Sketch it out! Drawing makes the problem easier to see.'
            },
            {
                name: 'Make a Table',
                color: '#3fb950',
                problem: 'Lena saves $4 each week. How much will she have after 1, 2, 3, 4, and 5 weeks?',
                tip: 'Organize info in a table to spot the pattern!'
            },
            {
                name: 'Guess & Check',
                color: '#f0883e',
                problem: 'Two numbers add up to 20 and one is 6 more than the other. What are the numbers?',
                tip: 'Make a guess, check if it works, and adjust!'
            },
            {
                name: 'Work Backward',
                color: '#bc8cff',
                problem: 'After giving away 7 marbles and then finding 3, Kai has 11 marbles. How many did he start with?',
                tip: 'Start from the answer and reverse each step!'
            },
            {
                name: 'Find a Pattern',
                color: '#f778ba',
                problem: 'The pattern is: 2, 6, 18, 54, ... What is the next number?',
                tip: 'Look for a rule that connects the numbers!'
            }
        ];

        var numSections = strategies.length;
        var currentAngle = 0;      // Current rotation angle in radians
        var targetAngle = 0;       // Target angle to spin to
        var spinning = false;
        var spinVelocity = 0;
        var selectedIdx = -1;
        var showResult = false;
        var resultFadeT = 0;

        var spinBtn = document.createElement('button');
        spinBtn.textContent = 'SPIN!';
        spinBtn.style.cssText = 'padding:8px 28px;border:3px solid #d29922;border-radius:12px;background:#1a1a40;color:#d29922;font-size:1.1rem;cursor:pointer;font-weight:bold;';
        spinBtn.addEventListener('click', function() {
            if (spinning) return;
            spinning = true;
            showResult = false;
            resultFadeT = 0;
            // Random spin: at least 3 full rotations plus random amount
            var extraSpins = 3 + Math.random() * 3;
            var randomStop = Math.random() * Math.PI * 2;
            targetAngle = currentAngle + extraSpins * Math.PI * 2 + randomStop;
            spinVelocity = 0.25; // initial spin speed
        });
        controls.appendChild(spinBtn);

        // Wheel properties
        var wheelCX = 170;
        var wheelCY = 200;
        var wheelR = 140;

        function draw() {
            viz.clear();
            var now = Date.now();

            // Title
            ctx.fillStyle = viz.colors.white;
            ctx.font = 'bold 20px -apple-system, sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'top';
            ctx.fillText('Problem-Solving Toolbox', viz.width / 2, 8);

            // Update spin
            if (spinning) {
                var remaining = targetAngle - currentAngle;
                if (remaining > 0.005) {
                    // Decelerate as we approach target
                    var speed = Math.min(spinVelocity, remaining * 0.08);
                    speed = Math.max(speed, 0.003);
                    currentAngle += speed;
                    spinVelocity *= 0.995;
                } else {
                    currentAngle = targetAngle;
                    spinning = false;
                    // Determine which section the pointer landed on
                    var normalizedAngle = currentAngle % (Math.PI * 2);
                    // Pointer is at top (angle 0 = top), sections go clockwise
                    // The pointer angle in the wheel's frame
                    var pointerAngle = (Math.PI * 2 - normalizedAngle) % (Math.PI * 2);
                    // Each section spans 2*PI/numSections
                    var sectionSize = (Math.PI * 2) / numSections;
                    // Offset so section 0 is centered at top
                    var adjusted = (pointerAngle + sectionSize / 2) % (Math.PI * 2);
                    selectedIdx = Math.floor(adjusted / sectionSize) % numSections;
                    showResult = true;
                    resultFadeT = 0;
                }
            }

            if (showResult && resultFadeT < 1) {
                resultFadeT += 0.02;
                if (resultFadeT > 1) resultFadeT = 1;
            }

            // Draw wheel
            var sectionAngle = (Math.PI * 2) / numSections;

            for (var i = 0; i < numSections; i++) {
                var startA = currentAngle + i * sectionAngle - Math.PI / 2;
                var endA = startA + sectionAngle;

                // Section fill
                ctx.fillStyle = strategies[i].color + (selectedIdx === i && showResult ? 'cc' : '55');
                ctx.beginPath();
                ctx.moveTo(wheelCX, wheelCY);
                ctx.arc(wheelCX, wheelCY, wheelR, startA, endA);
                ctx.closePath();
                ctx.fill();

                // Section border
                ctx.strokeStyle = strategies[i].color;
                ctx.lineWidth = 2;
                ctx.stroke();

                // Section label (rotated text)
                var midAngle = startA + sectionAngle / 2;
                var textR = wheelR * 0.62;
                var tx = wheelCX + Math.cos(midAngle) * textR;
                var ty = wheelCY + Math.sin(midAngle) * textR;

                ctx.save();
                ctx.translate(tx, ty);
                ctx.rotate(midAngle + Math.PI / 2);
                // If text would be upside down, flip it
                if (midAngle > Math.PI / 2 && midAngle < Math.PI * 1.5) {
                    ctx.rotate(Math.PI);
                }
                ctx.fillStyle = viz.colors.white;
                ctx.font = 'bold 11px -apple-system, sans-serif';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';

                // Split long names into two lines
                var words = strategies[i].name.split(' ');
                if (words.length <= 2) {
                    ctx.fillText(strategies[i].name, 0, 0);
                } else {
                    var line1 = words.slice(0, Math.ceil(words.length / 2)).join(' ');
                    var line2 = words.slice(Math.ceil(words.length / 2)).join(' ');
                    ctx.fillText(line1, 0, -7);
                    ctx.fillText(line2, 0, 7);
                }
                ctx.restore();

                // Small icon in each section (near edge)
                var iconR = wheelR * 0.88;
                var ix = wheelCX + Math.cos(midAngle) * iconR;
                var iy = wheelCY + Math.sin(midAngle) * iconR;
                ctx.fillStyle = strategies[i].color;
                ctx.beginPath();
                ctx.arc(ix, iy, 6, 0, Math.PI * 2);
                ctx.fill();
                ctx.fillStyle = '#0c0c20';
                ctx.font = 'bold 8px -apple-system, sans-serif';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(String(i + 1), ix, iy);
            }

            // Center circle
            ctx.fillStyle = '#0c0c20';
            ctx.beginPath();
            ctx.arc(wheelCX, wheelCY, 22, 0, Math.PI * 2);
            ctx.fill();
            ctx.strokeStyle = viz.colors.yellow;
            ctx.lineWidth = 3;
            ctx.stroke();

            // Center text
            ctx.fillStyle = viz.colors.yellow;
            ctx.font = 'bold 11px -apple-system, sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('SPIN', wheelCX, wheelCY);

            // Outer ring glow
            ctx.strokeStyle = spinning ? viz.colors.yellow + '88' : '#30363d';
            ctx.lineWidth = spinning ? 4 : 2;
            ctx.beginPath();
            ctx.arc(wheelCX, wheelCY, wheelR + 4, 0, Math.PI * 2);
            ctx.stroke();

            // Pointer (triangle at top)
            var pointerX = wheelCX;
            var pointerY = wheelCY - wheelR - 8;
            ctx.fillStyle = viz.colors.yellow;
            ctx.beginPath();
            ctx.moveTo(pointerX, pointerY + 18);
            ctx.lineTo(pointerX - 10, pointerY);
            ctx.lineTo(pointerX + 10, pointerY);
            ctx.closePath();
            ctx.fill();
            ctx.strokeStyle = '#0c0c20';
            ctx.lineWidth = 1.5;
            ctx.stroke();

            // Spinning particle effects
            if (spinning) {
                var time = now * 0.006;
                var particleColors = [viz.colors.yellow, viz.colors.pink, viz.colors.teal, viz.colors.orange];
                for (var pi = 0; pi < 6; pi++) {
                    var pa = time + pi * Math.PI / 3 + currentAngle;
                    var pr = wheelR + 10 + Math.sin(time * 3 + pi) * 5;
                    var px = wheelCX + Math.cos(pa) * pr;
                    var py = wheelCY + Math.sin(pa) * pr;
                    ctx.fillStyle = particleColors[pi % particleColors.length];
                    ctx.beginPath();
                    ctx.arc(px, py, 3, 0, Math.PI * 2);
                    ctx.fill();
                }
            }

            // Result display panel (right side)
            var panelX = 330;
            var panelY = 45;
            var panelW = 215;
            var panelH = 345;

            if (showResult && selectedIdx >= 0) {
                var strat = strategies[selectedIdx];
                var fadeAlpha = resultFadeT;

                // Panel background
                ctx.fillStyle = strat.color + Math.round(fadeAlpha * 0.12 * 255).toString(16).padStart(2, '0');
                ctx.strokeStyle = strat.color + Math.round(fadeAlpha * 0.6 * 255).toString(16).padStart(2, '0');
                ctx.lineWidth = 2;
                var pr2 = 10;
                ctx.beginPath();
                ctx.moveTo(panelX + pr2, panelY);
                ctx.lineTo(panelX + panelW - pr2, panelY);
                ctx.quadraticCurveTo(panelX + panelW, panelY, panelX + panelW, panelY + pr2);
                ctx.lineTo(panelX + panelW, panelY + panelH - pr2);
                ctx.quadraticCurveTo(panelX + panelW, panelY + panelH, panelX + panelW - pr2, panelY + panelH);
                ctx.lineTo(panelX + pr2, panelY + panelH);
                ctx.quadraticCurveTo(panelX, panelY + panelH, panelX, panelY + panelH - pr2);
                ctx.lineTo(panelX, panelY + pr2);
                ctx.quadraticCurveTo(panelX, panelY, panelX + pr2, panelY);
                ctx.closePath();
                ctx.fill();
                ctx.stroke();

                ctx.globalAlpha = fadeAlpha;

                // Strategy name
                ctx.fillStyle = strat.color;
                ctx.font = 'bold 18px -apple-system, sans-serif';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'top';
                ctx.fillText(strat.name, panelX + panelW / 2, panelY + 14);

                // Decorative line
                ctx.strokeStyle = strat.color + '66';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(panelX + 20, panelY + 40);
                ctx.lineTo(panelX + panelW - 20, panelY + 40);
                ctx.stroke();

                // "Try this problem:" label
                ctx.fillStyle = viz.colors.yellow;
                ctx.font = 'bold 13px -apple-system, sans-serif';
                ctx.fillText('Try this problem:', panelX + panelW / 2, panelY + 50);

                // Problem text (word-wrapped)
                ctx.font = '13px -apple-system, sans-serif';
                ctx.fillStyle = viz.colors.white;
                ctx.textAlign = 'left';
                var problemWords = strat.problem.split(' ');
                var pLine = '';
                var pLineY = panelY + 74;
                var pLineH = 18;
                for (var pw = 0; pw < problemWords.length; pw++) {
                    var testLine = pLine + (pLine ? ' ' : '') + problemWords[pw];
                    if (ctx.measureText(testLine).width > panelW - 24 && pLine) {
                        ctx.fillText(pLine, panelX + 12, pLineY);
                        pLineY += pLineH;
                        pLine = problemWords[pw];
                    } else {
                        pLine = testLine;
                    }
                }
                if (pLine) {
                    ctx.fillText(pLine, panelX + 12, pLineY);
                    pLineY += pLineH;
                }

                // Tip section
                pLineY += 14;
                ctx.fillStyle = strat.color;
                ctx.font = 'bold 13px -apple-system, sans-serif';
                ctx.textAlign = 'center';
                ctx.fillText('Tip:', panelX + panelW / 2, pLineY);
                pLineY += 20;

                ctx.font = '12px -apple-system, sans-serif';
                ctx.fillStyle = viz.colors.teal;
                ctx.textAlign = 'left';
                var tipWords = strat.tip.split(' ');
                var tLine = '';
                for (var tw = 0; tw < tipWords.length; tw++) {
                    var tTestLine = tLine + (tLine ? ' ' : '') + tipWords[tw];
                    if (ctx.measureText(tTestLine).width > panelW - 24 && tLine) {
                        ctx.fillText(tLine, panelX + 12, pLineY);
                        pLineY += pLineH;
                        tLine = tipWords[tw];
                    } else {
                        tLine = tTestLine;
                    }
                }
                if (tLine) {
                    ctx.fillText(tLine, panelX + 12, pLineY);
                    pLineY += pLineH;
                }

                // Strategy number badge
                pLineY += 10;
                ctx.fillStyle = strat.color + '44';
                ctx.strokeStyle = strat.color;
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.arc(panelX + panelW / 2, pLineY + 16, 20, 0, Math.PI * 2);
                ctx.fill();
                ctx.stroke();

                ctx.fillStyle = strat.color;
                ctx.font = 'bold 16px -apple-system, sans-serif';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(String(selectedIdx + 1) + '/' + numSections, panelX + panelW / 2, pLineY + 16);

                ctx.globalAlpha = 1;

                // Celebration sparkles around panel
                if (resultFadeT >= 0.8) {
                    var time2 = now * 0.003;
                    var sparkColors = [strat.color, viz.colors.yellow, viz.colors.teal, viz.colors.pink];
                    for (var si = 0; si < 6; si++) {
                        var sa = (si / 6) * Math.PI * 2 + time2;
                        var sd = 8 + Math.sin(time2 * 2 + si) * 4;
                        // Along the top of the panel
                        var sx = panelX + panelW / 2 + Math.cos(sa) * (panelW / 2 + sd);
                        var sy = panelY + 20 + Math.sin(sa) * 12;
                        ctx.fillStyle = sparkColors[si % sparkColors.length];
                        ctx.beginPath();
                        ctx.arc(sx, sy, 3, 0, Math.PI * 2);
                        ctx.fill();
                    }
                }
            } else if (!spinning) {
                // Placeholder message
                ctx.fillStyle = '#30363d';
                ctx.strokeStyle = '#30363d';
                ctx.lineWidth = 1;
                ctx.setLineDash([4, 4]);
                ctx.strokeRect(panelX, panelY, panelW, panelH);
                ctx.setLineDash([]);

                ctx.fillStyle = viz.colors.text;
                ctx.font = '14px -apple-system, sans-serif';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText('Spin the wheel to', panelX + panelW / 2, panelY + panelH / 2 - 12);
                ctx.fillText('discover a strategy!', panelX + panelW / 2, panelY + panelH / 2 + 12);
            }
        }

        viz.animate(function() {
            draw();
        });

        return viz;
    }
});
