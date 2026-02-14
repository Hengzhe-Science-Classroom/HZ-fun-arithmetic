// === Chapter 6: Even, Odd & Number Properties — Extra Visualizations ===
// Fun, colorful, interactive visualizations for elementary school kids (ages 7-12)

window.EXTRA_VIZ = window.EXTRA_VIZ || {};
window.EXTRA_VIZ['ch06'] = window.EXTRA_VIZ['ch06'] || {};

// ============================================================
// Section 1: Even & Odd — Pairing Visualizer
// ============================================================
window.EXTRA_VIZ['ch06']['ch06-sec01'] = [
    {
        id: 'ch06-extra-viz-1',
        title: 'Even or Odd? Pair Them Up!',
        description: 'Pick a number and watch the dots try to pair up. If every dot finds a partner, the number is EVEN. If one dot is left alone, it is ODD!',
        setup: function(container, controls) {
            var viz = new VizEngine(container, {
                width: 560, height: 400, scale: 1,
                originX: 0, originY: 0
            });

            var currentNum = 6;
            var animPhase = 0; // 0=spread, 1=pairing, 2=done
            var animT = 0;
            var lastTime = null;

            // Dot positions: each dot has {x, y, targetX, targetY, paired, pairIdx}
            var dots = [];

            // Slider for number
            var numGroup = document.createElement('div');
            numGroup.className = 'viz-slider-group';
            var numLabel = document.createElement('span');
            numLabel.className = 'viz-slider-label';
            numLabel.textContent = 'Number: ';
            var numSlider = document.createElement('input');
            numSlider.type = 'range';
            numSlider.className = 'viz-slider';
            numSlider.min = '1';
            numSlider.max = '20';
            numSlider.step = '1';
            numSlider.value = String(currentNum);
            var numVal = document.createElement('span');
            numVal.className = 'viz-slider-value';
            numVal.textContent = String(currentNum);
            numSlider.addEventListener('input', function() {
                currentNum = parseInt(numSlider.value);
                numVal.textContent = String(currentNum);
                resetAnimation();
            });
            numGroup.appendChild(numLabel);
            numGroup.appendChild(numSlider);
            numGroup.appendChild(numVal);
            controls.appendChild(numGroup);

            // Pair button
            var pairBtn = document.createElement('button');
            pairBtn.textContent = 'Pair Them Up!';
            pairBtn.style.cssText = 'padding:6px 16px;border:2px solid #58a6ff;border-radius:8px;background:#1a1a40;color:#58a6ff;font-size:0.9rem;font-weight:bold;cursor:pointer;margin-left:8px;';
            pairBtn.addEventListener('click', function() {
                if (animPhase === 0) {
                    animPhase = 1;
                    animT = 0;
                    lastTime = null;
                    setupPairing();
                }
            });
            controls.appendChild(pairBtn);

            // Reset button
            var resetBtn = document.createElement('button');
            resetBtn.textContent = 'Reset';
            resetBtn.style.cssText = 'padding:6px 14px;border:1px solid #30363d;border-radius:6px;background:#1a1a40;color:#c9d1d9;font-size:0.85rem;cursor:pointer;margin-left:4px;';
            resetBtn.addEventListener('click', function() {
                resetAnimation();
            });
            controls.appendChild(resetBtn);

            function resetAnimation() {
                animPhase = 0;
                animT = 0;
                lastTime = null;
                setupDots();
            }

            function setupDots() {
                dots = [];
                var n = currentNum;
                // Arrange dots in a scattered circular pattern
                var cx = viz.width / 2;
                var cy = viz.height / 2 - 10;
                var radius = Math.min(120, 30 + n * 5);
                for (var i = 0; i < n; i++) {
                    var angle = (i / n) * Math.PI * 2 - Math.PI / 2;
                    var r = radius + Math.sin(i * 2.7) * 15;
                    dots.push({
                        x: cx + Math.cos(angle) * r,
                        y: cy + Math.sin(angle) * r,
                        targetX: 0,
                        targetY: 0,
                        paired: false,
                        pairIdx: -1,
                        startX: cx + Math.cos(angle) * r,
                        startY: cy + Math.sin(angle) * r
                    });
                }
            }

            function setupPairing() {
                var n = currentNum;
                var pairs = Math.floor(n / 2);
                var hasLonely = n % 2 === 1;
                var cx = viz.width / 2;
                var pairStartY = 100;
                var pairSpacing = Math.min(50, (viz.height - 180) / Math.max(pairs + (hasLonely ? 1 : 0), 1));

                for (var p = 0; p < pairs; p++) {
                    var leftIdx = p * 2;
                    var rightIdx = p * 2 + 1;
                    var py = pairStartY + p * pairSpacing;
                    dots[leftIdx].targetX = cx - 40;
                    dots[leftIdx].targetY = py;
                    dots[leftIdx].paired = true;
                    dots[leftIdx].pairIdx = rightIdx;
                    dots[rightIdx].targetX = cx + 40;
                    dots[rightIdx].targetY = py;
                    dots[rightIdx].paired = true;
                    dots[rightIdx].pairIdx = leftIdx;
                }
                if (hasLonely) {
                    var lonelyIdx = n - 1;
                    var ly = pairStartY + pairs * pairSpacing;
                    dots[lonelyIdx].targetX = cx;
                    dots[lonelyIdx].targetY = ly;
                    dots[lonelyIdx].paired = false;
                    dots[lonelyIdx].pairIdx = -1;
                }
            }

            setupDots();

            // Rainbow-ish palette for dots
            var dotPalette = [
                '#58a6ff', '#3fb9a0', '#f0883e', '#bc8cff', '#f778ba',
                '#3fb950', '#d29922', '#58a6ff', '#3fb9a0', '#f0883e',
                '#bc8cff', '#f778ba', '#3fb950', '#d29922', '#58a6ff',
                '#3fb9a0', '#f0883e', '#bc8cff', '#f778ba', '#3fb950'
            ];

            function draw(t) {
                if (lastTime === null) lastTime = t;
                var dt = (t - lastTime) / 1000;
                lastTime = t;
                animT += dt;

                var ctx = viz.ctx;
                ctx.fillStyle = '#0c0c20';
                ctx.fillRect(0, 0, viz.width, viz.height);

                // Title
                ctx.fillStyle = '#f0f6fc';
                ctx.font = 'bold 20px -apple-system, sans-serif';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'top';
                ctx.fillText('Even or Odd? Pair Them Up!', viz.width / 2, 10);

                // Show current number
                ctx.fillStyle = '#d29922';
                ctx.font = 'bold 28px -apple-system, sans-serif';
                ctx.fillText(String(currentNum), viz.width / 2, 38);

                if (animPhase === 0) {
                    // Phase 0: dots arranged in a circle, gently bobbing
                    for (var i = 0; i < dots.length; i++) {
                        var d = dots[i];
                        var bob = Math.sin(t / 400 + i * 0.7) * 3;
                        var color = dotPalette[i % dotPalette.length];

                        // Glow
                        ctx.shadowColor = color;
                        ctx.shadowBlur = 12;
                        ctx.fillStyle = color;
                        ctx.beginPath();
                        ctx.arc(d.x, d.y + bob, 14, 0, Math.PI * 2);
                        ctx.fill();
                        ctx.shadowBlur = 0;

                        // Highlight
                        ctx.fillStyle = 'rgba(255,255,255,0.3)';
                        ctx.beginPath();
                        ctx.arc(d.x - 3, d.y + bob - 4, 4, 0, Math.PI * 2);
                        ctx.fill();

                        // Number inside
                        ctx.fillStyle = '#ffffff';
                        ctx.font = 'bold 11px -apple-system, sans-serif';
                        ctx.textAlign = 'center';
                        ctx.textBaseline = 'middle';
                        ctx.fillText(String(i + 1), d.x, d.y + bob);
                    }

                    // Instruction
                    ctx.fillStyle = '#8b949e';
                    ctx.font = '14px -apple-system, sans-serif';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'bottom';
                    ctx.fillText('Press "Pair Them Up!" to see if this number is even or odd', viz.width / 2, viz.height - 12);

                } else if (animPhase === 1 || animPhase === 2) {
                    // Phase 1: animate dots to paired positions
                    var progress = Math.min(1, animT / 1.5); // 1.5 seconds to animate
                    var eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic

                    if (progress >= 1 && animPhase === 1) {
                        animPhase = 2;
                    }

                    for (var j = 0; j < dots.length; j++) {
                        var dd = dots[j];
                        var curX = dd.startX + (dd.targetX - dd.startX) * eased;
                        var curY = dd.startY + (dd.targetY - dd.startY) * eased;
                        var isLonely = !dd.paired;
                        var color2 = isLonely ? '#f85149' : dotPalette[j % dotPalette.length];

                        // If lonely and animation done, add pulsing effect
                        var extraRadius = 0;
                        if (isLonely && animPhase === 2) {
                            extraRadius = Math.sin(t / 200) * 4;
                            // Sad glow
                            ctx.shadowColor = '#f85149';
                            ctx.shadowBlur = 20 + Math.sin(t / 200) * 8;
                        } else if (dd.paired) {
                            ctx.shadowColor = color2;
                            ctx.shadowBlur = 8;
                        }

                        ctx.fillStyle = color2;
                        ctx.beginPath();
                        ctx.arc(curX, curY, 14 + extraRadius, 0, Math.PI * 2);
                        ctx.fill();
                        ctx.shadowBlur = 0;

                        // Highlight
                        ctx.fillStyle = 'rgba(255,255,255,0.3)';
                        ctx.beginPath();
                        ctx.arc(curX - 3, curY - 4, 4, 0, Math.PI * 2);
                        ctx.fill();

                        // Number inside
                        ctx.fillStyle = '#ffffff';
                        ctx.font = 'bold 11px -apple-system, sans-serif';
                        ctx.textAlign = 'center';
                        ctx.textBaseline = 'middle';
                        ctx.fillText(String(j + 1), curX, curY);
                    }

                    // Draw pairing lines between paired dots
                    if (eased > 0.3) {
                        var lineAlpha = Math.min(1, (eased - 0.3) / 0.7);
                        var pairs2 = Math.floor(currentNum / 2);
                        for (var p2 = 0; p2 < pairs2; p2++) {
                            var li = p2 * 2;
                            var ri = p2 * 2 + 1;
                            var lx = dots[li].startX + (dots[li].targetX - dots[li].startX) * eased;
                            var ly = dots[li].startY + (dots[li].targetY - dots[li].startY) * eased;
                            var rx = dots[ri].startX + (dots[ri].targetX - dots[ri].startX) * eased;
                            var ry = dots[ri].startY + (dots[ri].targetY - dots[ri].startY) * eased;

                            ctx.globalAlpha = lineAlpha;
                            ctx.strokeStyle = '#3fb950';
                            ctx.lineWidth = 3;
                            ctx.beginPath();
                            ctx.moveTo(lx + 14, ly);
                            ctx.lineTo(rx - 14, ry);
                            ctx.stroke();

                            // Heart/check between the pair
                            if (animPhase === 2) {
                                var mx = (lx + rx) / 2;
                                var my = (ly + ry) / 2;
                                ctx.fillStyle = '#3fb950';
                                ctx.font = '16px -apple-system, sans-serif';
                                ctx.textAlign = 'center';
                                ctx.textBaseline = 'middle';
                                ctx.fillText('\u2764', mx, my);
                            }
                            ctx.globalAlpha = 1;
                        }
                    }

                    // If lonely dot exists, show a sad indicator
                    if (currentNum % 2 === 1 && animPhase === 2) {
                        var lonelyDot = dots[dots.length - 1];
                        ctx.fillStyle = '#f85149';
                        ctx.font = '18px -apple-system, sans-serif';
                        ctx.textAlign = 'center';
                        ctx.textBaseline = 'bottom';
                        ctx.fillText('No partner!', lonelyDot.targetX, lonelyDot.targetY - 22);

                        // Question mark floating above
                        ctx.fillStyle = '#f85149';
                        ctx.font = 'bold 22px -apple-system, sans-serif';
                        var floatY = lonelyDot.targetY - 42 + Math.sin(t / 300) * 5;
                        ctx.fillText('?', lonelyDot.targetX, floatY);
                    }

                    // Big EVEN or ODD label
                    if (animPhase === 2) {
                        var isEven = currentNum % 2 === 0;
                        var labelText = isEven ? 'EVEN!' : 'ODD!';
                        var labelColor = isEven ? '#3fb950' : '#f0883e';

                        // Pulsing size
                        var pulse = 1 + Math.sin(t / 250) * 0.08;
                        var fontSize = Math.round(48 * pulse);

                        ctx.shadowColor = labelColor;
                        ctx.shadowBlur = 25;
                        ctx.fillStyle = labelColor;
                        ctx.font = 'bold ' + fontSize + 'px -apple-system, sans-serif';
                        ctx.textAlign = 'center';
                        ctx.textBaseline = 'bottom';
                        ctx.fillText(labelText, viz.width / 2, viz.height - 15);
                        ctx.shadowBlur = 0;

                        // Explanation text
                        ctx.fillStyle = '#c9d1d9';
                        ctx.font = '13px -apple-system, sans-serif';
                        ctx.textBaseline = 'bottom';
                        if (isEven) {
                            ctx.fillText('All ' + currentNum + ' dots found a partner! ' + currentNum + ' = ' + (currentNum / 2) + ' pairs', viz.width / 2, viz.height - 65);
                        } else {
                            ctx.fillText(currentNum + ' dots: ' + Math.floor(currentNum / 2) + ' pairs + 1 lonely dot', viz.width / 2, viz.height - 65);
                        }
                    }
                }
            }

            viz.animate(draw);
            return viz;
        }
    }
];

// ============================================================
// Section 2: Even+Odd Rules — Interactive Rule Tester
// ============================================================
window.EXTRA_VIZ['ch06']['ch06-sec02'] = [
    {
        id: 'ch06-extra-viz-2',
        title: 'Even + Odd Rules Tester',
        description: 'Pick two numbers and see what happens when you add them. Discover the secret rules of even and odd!',
        setup: function(container, controls) {
            var viz = new VizEngine(container, {
                width: 560, height: 400, scale: 1,
                originX: 0, originY: 0
            });

            var numA = 4;
            var numB = 3;
            var animT = 0;
            var animPhase = 0; // 0=show dots, 1=combining, 2=re-pairing, 3=result
            var lastTime = null;

            // Slider A
            var groupA = document.createElement('div');
            groupA.className = 'viz-slider-group';
            var labelA = document.createElement('span');
            labelA.className = 'viz-slider-label';
            labelA.textContent = 'Number A: ';
            labelA.style.color = '#58a6ff';
            var sliderA = document.createElement('input');
            sliderA.type = 'range';
            sliderA.className = 'viz-slider';
            sliderA.min = '1'; sliderA.max = '20'; sliderA.step = '1'; sliderA.value = String(numA);
            var valA = document.createElement('span');
            valA.className = 'viz-slider-value';
            valA.textContent = String(numA);
            sliderA.addEventListener('input', function() {
                numA = parseInt(sliderA.value);
                valA.textContent = String(numA);
                animPhase = 0; animT = 0; lastTime = null;
            });
            groupA.appendChild(labelA); groupA.appendChild(sliderA); groupA.appendChild(valA);
            controls.appendChild(groupA);

            // Slider B
            var groupB = document.createElement('div');
            groupB.className = 'viz-slider-group';
            var labelB = document.createElement('span');
            labelB.className = 'viz-slider-label';
            labelB.textContent = 'Number B: ';
            labelB.style.color = '#f0883e';
            var sliderB = document.createElement('input');
            sliderB.type = 'range';
            sliderB.className = 'viz-slider';
            sliderB.min = '1'; sliderB.max = '20'; sliderB.step = '1'; sliderB.value = String(numB);
            var valB = document.createElement('span');
            valB.className = 'viz-slider-value';
            valB.textContent = String(numB);
            sliderB.addEventListener('input', function() {
                numB = parseInt(sliderB.value);
                valB.textContent = String(numB);
                animPhase = 0; animT = 0; lastTime = null;
            });
            groupB.appendChild(labelB); groupB.appendChild(sliderB); groupB.appendChild(valB);
            controls.appendChild(groupB);

            // Add button
            var addBtn = document.createElement('button');
            addBtn.textContent = 'Add & Test!';
            addBtn.style.cssText = 'padding:6px 16px;border:2px solid #3fb950;border-radius:8px;background:#1a1a40;color:#3fb950;font-size:0.9rem;font-weight:bold;cursor:pointer;margin-left:4px;';
            addBtn.addEventListener('click', function() {
                animPhase = 1;
                animT = 0;
                lastTime = null;
            });
            controls.appendChild(addBtn);

            // Reset button
            var resetBtn2 = document.createElement('button');
            resetBtn2.textContent = 'Reset';
            resetBtn2.style.cssText = 'padding:6px 14px;border:1px solid #30363d;border-radius:6px;background:#1a1a40;color:#c9d1d9;font-size:0.85rem;cursor:pointer;margin-left:4px;';
            resetBtn2.addEventListener('click', function() {
                animPhase = 0; animT = 0; lastTime = null;
            });
            controls.appendChild(resetBtn2);

            function getEvenOddLabel(n) {
                return n % 2 === 0 ? 'Even' : 'Odd';
            }

            function getEvenOddColor(n) {
                return n % 2 === 0 ? '#3fb950' : '#f0883e';
            }

            function drawDotRow(ctx, startX, y, count, color, dotR, maxWidth) {
                // Draw dots in a row, wrapping if needed
                var spacing = Math.min(dotR * 2.8, maxWidth / Math.max(count, 1));
                var totalW = spacing * (count - 1);
                var sx = startX - totalW / 2;
                var positions = [];
                for (var i = 0; i < count; i++) {
                    var dx = sx + i * spacing;
                    ctx.shadowColor = color;
                    ctx.shadowBlur = 8;
                    ctx.fillStyle = color;
                    ctx.beginPath();
                    ctx.arc(dx, y, dotR, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.shadowBlur = 0;
                    positions.push({ x: dx, y: y });
                }
                return positions;
            }

            function draw(t) {
                if (lastTime === null) lastTime = t;
                var dt = (t - lastTime) / 1000;
                lastTime = t;
                animT += dt;

                var ctx = viz.ctx;
                ctx.fillStyle = '#0c0c20';
                ctx.fillRect(0, 0, viz.width, viz.height);

                // Title
                ctx.fillStyle = '#f0f6fc';
                ctx.font = 'bold 18px -apple-system, sans-serif';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'top';
                ctx.fillText('Even + Odd Rules', viz.width / 2, 8);

                var colA = '#58a6ff';
                var colB = '#f0883e';
                var sum = numA + numB;
                var dotR = Math.max(6, Math.min(12, 200 / Math.max(sum, 1)));
                var halfW = viz.width / 2;

                if (animPhase === 0) {
                    // Show A dots on left, B dots on right
                    // Label A
                    ctx.fillStyle = colA;
                    ctx.font = 'bold 22px -apple-system, sans-serif';
                    ctx.textAlign = 'center';
                    ctx.fillText('A = ' + numA, halfW / 2, 45);
                    ctx.font = 'bold 14px -apple-system, sans-serif';
                    ctx.fillStyle = getEvenOddColor(numA);
                    ctx.fillText('(' + getEvenOddLabel(numA) + ')', halfW / 2, 72);

                    // Label B
                    ctx.fillStyle = colB;
                    ctx.font = 'bold 22px -apple-system, sans-serif';
                    ctx.fillText('B = ' + numB, halfW + halfW / 2, 45);
                    ctx.font = 'bold 14px -apple-system, sans-serif';
                    ctx.fillStyle = getEvenOddColor(numB);
                    ctx.fillText('(' + getEvenOddLabel(numB) + ')', halfW + halfW / 2, 72);

                    // Divider
                    ctx.strokeStyle = '#2a2a50';
                    ctx.lineWidth = 2;
                    ctx.setLineDash([5, 5]);
                    ctx.beginPath();
                    ctx.moveTo(halfW, 40);
                    ctx.lineTo(halfW, 280);
                    ctx.stroke();
                    ctx.setLineDash([]);

                    // Draw A dots - in pairs
                    var aPairsCount = Math.floor(numA / 2);
                    var aOdd = numA % 2 === 1;
                    var pairYstart = 110;
                    var pairSpacing = Math.min(30, 160 / Math.max(aPairsCount + (aOdd ? 1 : 0), 1));

                    for (var ap = 0; ap < aPairsCount; ap++) {
                        var py = pairYstart + ap * pairSpacing;
                        // Left dot
                        ctx.shadowColor = colA; ctx.shadowBlur = 6;
                        ctx.fillStyle = colA;
                        ctx.beginPath(); ctx.arc(halfW / 2 - 18, py, dotR, 0, Math.PI * 2); ctx.fill();
                        // Right dot
                        ctx.beginPath(); ctx.arc(halfW / 2 + 18, py, dotR, 0, Math.PI * 2); ctx.fill();
                        ctx.shadowBlur = 0;
                        // Line between
                        ctx.strokeStyle = colA + '88';
                        ctx.lineWidth = 2;
                        ctx.beginPath();
                        ctx.moveTo(halfW / 2 - 18 + dotR, py);
                        ctx.lineTo(halfW / 2 + 18 - dotR, py);
                        ctx.stroke();
                    }
                    if (aOdd) {
                        var loneY = pairYstart + aPairsCount * pairSpacing;
                        ctx.shadowColor = '#f85149'; ctx.shadowBlur = 6;
                        ctx.fillStyle = colA;
                        ctx.beginPath(); ctx.arc(halfW / 2, loneY, dotR, 0, Math.PI * 2); ctx.fill();
                        ctx.shadowBlur = 0;
                    }

                    // Draw B dots - in pairs
                    var bPairsCount = Math.floor(numB / 2);
                    var bOdd = numB % 2 === 1;
                    for (var bp = 0; bp < bPairsCount; bp++) {
                        var bpy = pairYstart + bp * pairSpacing;
                        ctx.shadowColor = colB; ctx.shadowBlur = 6;
                        ctx.fillStyle = colB;
                        ctx.beginPath(); ctx.arc(halfW + halfW / 2 - 18, bpy, dotR, 0, Math.PI * 2); ctx.fill();
                        ctx.beginPath(); ctx.arc(halfW + halfW / 2 + 18, bpy, dotR, 0, Math.PI * 2); ctx.fill();
                        ctx.shadowBlur = 0;
                        ctx.strokeStyle = colB + '88';
                        ctx.lineWidth = 2;
                        ctx.beginPath();
                        ctx.moveTo(halfW + halfW / 2 - 18 + dotR, bpy);
                        ctx.lineTo(halfW + halfW / 2 + 18 - dotR, bpy);
                        ctx.stroke();
                    }
                    if (bOdd) {
                        var bloneY = pairYstart + bPairsCount * pairSpacing;
                        ctx.shadowColor = '#f85149'; ctx.shadowBlur = 6;
                        ctx.fillStyle = colB;
                        ctx.beginPath(); ctx.arc(halfW + halfW / 2, bloneY, dotR, 0, Math.PI * 2); ctx.fill();
                        ctx.shadowBlur = 0;
                    }

                    // Plus sign
                    ctx.fillStyle = '#f0f6fc';
                    ctx.font = 'bold 36px -apple-system, sans-serif';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.fillText('+', halfW, 200);

                    // Instruction
                    ctx.fillStyle = '#8b949e';
                    ctx.font = '14px -apple-system, sans-serif';
                    ctx.textBaseline = 'bottom';
                    ctx.fillText('Press "Add & Test!" to combine and re-pair them', viz.width / 2, viz.height - 12);

                } else {
                    // Phases 1-3: combining and re-pairing
                    var combineProgress = Math.min(1, animT / 1.0);
                    var repairProgress = Math.min(1, Math.max(0, (animT - 1.2) / 1.0));
                    var combineEased = 1 - Math.pow(1 - combineProgress, 3);
                    var repairEased = 1 - Math.pow(1 - repairProgress, 3);

                    if (animT > 2.5 && animPhase < 3) animPhase = 3;

                    // Show combined sum info
                    ctx.fillStyle = colA;
                    ctx.font = 'bold 20px -apple-system, sans-serif';
                    ctx.textAlign = 'center';
                    ctx.fillText(String(numA), viz.width / 2 - 80, 48);
                    ctx.fillStyle = '#f0f6fc';
                    ctx.font = 'bold 24px -apple-system, sans-serif';
                    ctx.fillText('+', viz.width / 2 - 45, 48);
                    ctx.fillStyle = colB;
                    ctx.font = 'bold 20px -apple-system, sans-serif';
                    ctx.fillText(String(numB), viz.width / 2 - 10, 48);
                    ctx.fillStyle = '#f0f6fc';
                    ctx.font = 'bold 24px -apple-system, sans-serif';
                    ctx.fillText('=', viz.width / 2 + 25, 48);
                    ctx.fillStyle = '#d29922';
                    ctx.font = 'bold 24px -apple-system, sans-serif';
                    ctx.fillText(String(sum), viz.width / 2 + 60, 48);

                    // Even/odd labels under the equation
                    ctx.font = '13px -apple-system, sans-serif';
                    ctx.fillStyle = getEvenOddColor(numA);
                    ctx.fillText(getEvenOddLabel(numA), viz.width / 2 - 80, 70);
                    ctx.fillStyle = getEvenOddColor(numB);
                    ctx.fillText(getEvenOddLabel(numB), viz.width / 2 - 10, 70);

                    if (animPhase === 3) {
                        ctx.fillStyle = getEvenOddColor(sum);
                        ctx.fillText(getEvenOddLabel(sum), viz.width / 2 + 60, 70);
                    }

                    // Draw combined dots in paired arrangement
                    var totalPairs = Math.floor(sum / 2);
                    var leftover = sum % 2;
                    var pairYstart2 = 100;
                    var maxPairRows = totalPairs + (leftover ? 1 : 0);
                    var pairSp = Math.min(32, (viz.height - 200) / Math.max(maxPairRows, 1));
                    var centerX = viz.width / 2;

                    // Build combined dot array: first A dots (blue), then B dots (orange)
                    var allDots = [];
                    for (var ai = 0; ai < numA; ai++) allDots.push({ color: colA, idx: ai });
                    for (var bi = 0; bi < numB; bi++) allDots.push({ color: colB, idx: numA + bi });

                    // Compute spread positions (phase 0 starting positions - two columns)
                    var spreadPositions = [];
                    for (var si = 0; si < numA; si++) {
                        var row = Math.floor(si / 2);
                        var col = si % 2;
                        spreadPositions.push({
                            x: viz.width / 4 - 18 + col * 36,
                            y: 110 + row * 28
                        });
                    }
                    for (var sj = 0; sj < numB; sj++) {
                        var row2 = Math.floor(sj / 2);
                        var col2 = sj % 2;
                        spreadPositions.push({
                            x: viz.width * 3 / 4 - 18 + col2 * 36,
                            y: 110 + row2 * 28
                        });
                    }

                    // Compute target paired positions
                    var pairedPositions = [];
                    var dotIndex = 0;
                    for (var tp = 0; tp < totalPairs; tp++) {
                        var tpy = pairYstart2 + tp * pairSp;
                        pairedPositions.push({ x: centerX - 22, y: tpy });
                        pairedPositions.push({ x: centerX + 22, y: tpy });
                        dotIndex += 2;
                    }
                    if (leftover) {
                        pairedPositions.push({ x: centerX, y: pairYstart2 + totalPairs * pairSp });
                    }

                    // Draw dots interpolating from spread to paired
                    for (var di = 0; di < allDots.length; di++) {
                        var dot = allDots[di];
                        var sp = spreadPositions[di] || { x: centerX, y: 200 };
                        var pp = pairedPositions[di] || { x: centerX, y: 200 };

                        // First combine (move to center area), then re-pair
                        var midX = centerX + (Math.random() - 0.5) * 0; // just center
                        var curX, curY;
                        if (combineProgress < 1) {
                            curX = sp.x + (centerX - sp.x) * combineEased;
                            curY = sp.y + (200 - sp.y) * combineEased * 0.3;
                        } else {
                            curX = centerX + (pp.x - centerX) * repairEased;
                            curY = 200 + (pp.y - 200) * repairEased;
                        }

                        var isLast = (di === allDots.length - 1 && leftover);

                        if (isLast && animPhase === 3) {
                            ctx.shadowColor = '#f85149';
                            ctx.shadowBlur = 14 + Math.sin(t / 200) * 6;
                        } else {
                            ctx.shadowColor = dot.color;
                            ctx.shadowBlur = 6;
                        }
                        ctx.fillStyle = dot.color;
                        ctx.beginPath();
                        ctx.arc(curX, curY, dotR, 0, Math.PI * 2);
                        ctx.fill();
                        ctx.shadowBlur = 0;
                    }

                    // Draw pair lines if re-pairing has started
                    if (repairProgress > 0.2) {
                        var lineAlpha2 = Math.min(1, (repairProgress - 0.2) / 0.5);
                        ctx.globalAlpha = lineAlpha2;
                        for (var pl = 0; pl < totalPairs; pl++) {
                            var plp1 = pairedPositions[pl * 2];
                            var plp2 = pairedPositions[pl * 2 + 1];
                            var lx1 = centerX + (plp1.x - centerX) * repairEased;
                            var ly1 = 200 + (plp1.y - 200) * repairEased;
                            var lx2 = centerX + (plp2.x - centerX) * repairEased;
                            var ly2 = 200 + (plp2.y - 200) * repairEased;
                            ctx.strokeStyle = '#3fb950';
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            ctx.moveTo(lx1 + dotR, ly1);
                            ctx.lineTo(lx2 - dotR, ly2);
                            ctx.stroke();
                        }
                        ctx.globalAlpha = 1;
                    }

                    // Show result label
                    if (animPhase === 3) {
                        var isEvenSum = sum % 2 === 0;
                        var resultColor = isEvenSum ? '#3fb950' : '#f0883e';
                        var resultLabel = isEvenSum ? 'EVEN!' : 'ODD!';

                        var pulse2 = 1 + Math.sin(t / 250) * 0.06;
                        var fs = Math.round(36 * pulse2);

                        ctx.shadowColor = resultColor;
                        ctx.shadowBlur = 20;
                        ctx.fillStyle = resultColor;
                        ctx.font = 'bold ' + fs + 'px -apple-system, sans-serif';
                        ctx.textAlign = 'center';
                        ctx.textBaseline = 'bottom';
                        ctx.fillText(sum + ' is ' + resultLabel, viz.width / 2, viz.height - 55);
                        ctx.shadowBlur = 0;

                        // Rule explanation
                        var aEO = getEvenOddLabel(numA);
                        var bEO = getEvenOddLabel(numB);
                        var sumEO = getEvenOddLabel(sum);
                        var ruleText = aEO + ' + ' + bEO + ' = ' + sumEO;

                        ctx.fillStyle = '#d29922';
                        ctx.font = 'bold 20px -apple-system, sans-serif';
                        ctx.fillText('Rule: ' + ruleText, viz.width / 2, viz.height - 25);

                        // Extra explanation
                        ctx.fillStyle = '#8b949e';
                        ctx.font = '13px -apple-system, sans-serif';
                        ctx.fillText(
                            leftover ? 'One dot has no partner, so the sum is odd!' : 'Every dot found a partner, so the sum is even!',
                            viz.width / 2, viz.height - 8
                        );
                    }
                }
            }

            viz.animate(draw);
            return viz;
        }
    }
];

// ============================================================
// Section 3: Factors & Multiples — Factor Rectangle Finder
// ============================================================
window.EXTRA_VIZ['ch06']['ch06-sec03'] = [
    {
        id: 'ch06-extra-viz-3',
        title: 'Factor Rectangle Finder',
        description: 'Pick a number and see all the ways to arrange that many squares into a rectangle. Each rectangle shows a factor pair!',
        setup: function(container, controls) {
            var viz = new VizEngine(container, {
                width: 560, height: 400, scale: 1,
                originX: 0, originY: 0
            });

            var currentNum = 12;

            // Slider for number
            var numGroup = document.createElement('div');
            numGroup.className = 'viz-slider-group';
            var numLabel = document.createElement('span');
            numLabel.className = 'viz-slider-label';
            numLabel.textContent = 'Number: ';
            var numSlider = document.createElement('input');
            numSlider.type = 'range';
            numSlider.className = 'viz-slider';
            numSlider.min = '2'; numSlider.max = '36'; numSlider.step = '1'; numSlider.value = String(currentNum);
            var numVal = document.createElement('span');
            numVal.className = 'viz-slider-value';
            numVal.textContent = String(currentNum);
            numSlider.addEventListener('input', function() {
                currentNum = parseInt(numSlider.value);
                numVal.textContent = String(currentNum);
                draw();
            });
            numGroup.appendChild(numLabel); numGroup.appendChild(numSlider); numGroup.appendChild(numVal);
            controls.appendChild(numGroup);

            var rectColors = [
                '#58a6ff', '#3fb9a0', '#f0883e', '#bc8cff', '#f778ba',
                '#3fb950', '#d29922', '#f85149', '#58a6ff', '#3fb9a0',
                '#f0883e', '#bc8cff', '#f778ba', '#3fb950', '#d29922',
                '#f85149', '#58a6ff', '#3fb9a0'
            ];

            function getFactorPairs(n) {
                var pairs = [];
                for (var i = 1; i <= Math.sqrt(n); i++) {
                    if (n % i === 0) {
                        pairs.push([i, n / i]);
                    }
                }
                return pairs;
            }

            function getAllFactors(n) {
                var factors = [];
                for (var i = 1; i <= n; i++) {
                    if (n % i === 0) factors.push(i);
                }
                return factors;
            }

            function draw() {
                var ctx = viz.ctx;
                ctx.fillStyle = '#0c0c20';
                ctx.fillRect(0, 0, viz.width, viz.height);

                var pairs = getFactorPairs(currentNum);
                var allFactors = getAllFactors(currentNum);

                // Title
                ctx.fillStyle = '#f0f6fc';
                ctx.font = 'bold 20px -apple-system, sans-serif';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'top';
                ctx.fillText('Factor Rectangles for ' + currentNum, viz.width / 2, 8);

                // Factor count
                ctx.fillStyle = '#d29922';
                ctx.font = '14px -apple-system, sans-serif';
                ctx.fillText(currentNum + ' has ' + allFactors.length + ' factors: ' + allFactors.join(', '), viz.width / 2, 34);

                // Layout rectangles in available space
                var numPairs = pairs.length;
                var drawAreaTop = 60;
                var drawAreaBottom = viz.height - 50;
                var drawAreaHeight = drawAreaBottom - drawAreaTop;
                var drawAreaWidth = viz.width - 40;

                // Calculate maximum cell size that fits all rectangles
                // We'll lay them out in a row
                var gapBetween = 20;
                var totalGaps = (numPairs - 1) * gapBetween;
                var availWidth = drawAreaWidth - totalGaps;

                // For each pair [r, c], the rectangle is r rows x c cols
                // We need to find a unit size so all rectangles fit
                var maxCols = 0;
                var maxRows = 0;
                var totalCols = 0;
                for (var pi = 0; pi < numPairs; pi++) {
                    totalCols += pairs[pi][1]; // width of each rectangle
                    if (pairs[pi][0] > maxRows) maxRows = pairs[pi][0];
                    if (pairs[pi][1] > maxCols) maxCols = pairs[pi][1];
                }

                // Unit size based on width constraint
                var unitW = availWidth / totalCols;
                // Unit size based on height constraint
                var unitH = (drawAreaHeight - 40) / maxRows; // leave room for labels
                var unit = Math.min(unitW, unitH, 22); // cap at 22px per cell

                // Calculate total width with this unit
                var totalRectWidth = 0;
                for (var pw = 0; pw < numPairs; pw++) {
                    totalRectWidth += pairs[pw][1] * unit;
                }
                totalRectWidth += totalGaps;

                var startX = (viz.width - totalRectWidth) / 2;
                var curX = startX;

                for (var ri = 0; ri < numPairs; ri++) {
                    var rows = pairs[ri][0];
                    var cols = pairs[ri][1];
                    var rectW = cols * unit;
                    var rectH = rows * unit;
                    var rectY = drawAreaTop + (drawAreaHeight - 40 - rectH) / 2;
                    var color = rectColors[ri % rectColors.length];

                    // Draw filled rectangle background
                    ctx.fillStyle = color + '33';
                    ctx.fillRect(curX, rectY, rectW, rectH);

                    // Draw grid cells
                    ctx.strokeStyle = color;
                    ctx.lineWidth = 1.5;
                    for (var gr = 0; gr < rows; gr++) {
                        for (var gc = 0; gc < cols; gc++) {
                            ctx.strokeRect(curX + gc * unit, rectY + gr * unit, unit, unit);
                        }
                    }

                    // Outer border with glow
                    ctx.shadowColor = color;
                    ctx.shadowBlur = 8;
                    ctx.strokeStyle = color;
                    ctx.lineWidth = 2.5;
                    ctx.strokeRect(curX, rectY, rectW, rectH);
                    ctx.shadowBlur = 0;

                    // Label: "rows x cols"
                    ctx.fillStyle = color;
                    ctx.font = 'bold 14px -apple-system, sans-serif';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'top';
                    ctx.fillText(rows + ' x ' + cols, curX + rectW / 2, rectY + rectH + 6);

                    // Dimension labels on the sides
                    ctx.fillStyle = color + 'bb';
                    ctx.font = '11px -apple-system, sans-serif';
                    // Height label (left side)
                    ctx.textAlign = 'right';
                    ctx.textBaseline = 'middle';
                    ctx.fillText(String(rows), curX - 4, rectY + rectH / 2);
                    // Width label (top)
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'bottom';
                    ctx.fillText(String(cols), curX + rectW / 2, rectY - 3);

                    curX += rectW + gapBetween;
                }

                // Bottom info: is it prime?
                var isPrime = allFactors.length === 2;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'bottom';
                if (isPrime) {
                    ctx.fillStyle = '#f778ba';
                    ctx.font = 'bold 16px -apple-system, sans-serif';
                    ctx.fillText(currentNum + ' is PRIME! It only makes a 1 x ' + currentNum + ' rectangle.', viz.width / 2, viz.height - 8);
                } else {
                    ctx.fillStyle = '#3fb9a0';
                    ctx.font = '14px -apple-system, sans-serif';
                    ctx.fillText(numPairs + ' different rectangle' + (numPairs > 1 ? 's' : '') + ' = ' + numPairs + ' factor pair' + (numPairs > 1 ? 's' : ''), viz.width / 2, viz.height - 8);
                }
            }

            draw();
            return viz;
        }
    }
];

// ============================================================
// Section 4: Prime Numbers — Animated Sieve of Eratosthenes
// ============================================================
window.EXTRA_VIZ['ch06']['ch06-sec04'] = [
    {
        id: 'ch06-extra-viz-4',
        title: 'Sieve of Eratosthenes',
        description: 'Watch the ancient sieve find all prime numbers up to 30! Press "Start Sieve" and see which numbers survive.',
        setup: function(container, controls) {
            var viz = new VizEngine(container, {
                width: 560, height: 400, scale: 1,
                originX: 0, originY: 0
            });

            // Numbers 2-30 in a 6x5 grid
            var GRID_COLS = 6;
            var GRID_ROWS = 5;
            var numbers = [];
            for (var i = 2; i <= 30; i++) {
                numbers.push({
                    val: i,
                    state: 'normal', // 'normal', 'prime', 'crossed', 'checking'
                    crossedBy: 0,
                    fadeT: 0
                });
            }

            var sieveSteps = []; // { prime, multiples[] }
            var currentStep = -1; // -1 = not started
            var subStep = 0; // within a step: 0=highlight prime, 1..n=cross out multiples
            var animT = 0;
            var autoPlay = false;
            var autoTimer = 0;
            var lastTime = null;
            var sieveComplete = false;

            // Pre-compute sieve steps
            function computeSieveSteps() {
                sieveSteps = [];
                var isPrime = [];
                for (var i = 0; i <= 30; i++) isPrime[i] = true;
                isPrime[0] = false; isPrime[1] = false;

                for (var p = 2; p * p <= 30; p++) {
                    if (isPrime[p]) {
                        var mults = [];
                        for (var m = p * 2; m <= 30; m += p) {
                            if (isPrime[m]) {
                                mults.push(m);
                                isPrime[m] = false;
                            }
                        }
                        sieveSteps.push({ prime: p, multiples: mults });
                    }
                }
            }
            computeSieveSteps();

            function getNumObj(val) {
                for (var i = 0; i < numbers.length; i++) {
                    if (numbers[i].val === val) return numbers[i];
                }
                return null;
            }

            function resetSieve() {
                for (var i = 0; i < numbers.length; i++) {
                    numbers[i].state = 'normal';
                    numbers[i].crossedBy = 0;
                    numbers[i].fadeT = 0;
                }
                currentStep = -1;
                subStep = 0;
                animT = 0;
                autoTimer = 0;
                sieveComplete = false;
                lastTime = null;
            }

            function advanceSieve() {
                if (sieveComplete) return;

                if (currentStep === -1) {
                    // Start: highlight first prime
                    currentStep = 0;
                    subStep = 0;
                    var primeObj = getNumObj(sieveSteps[0].prime);
                    if (primeObj) primeObj.state = 'prime';
                    return;
                }

                var step = sieveSteps[currentStep];
                if (subStep < step.multiples.length) {
                    // Cross out next multiple
                    var multObj = getNumObj(step.multiples[subStep]);
                    if (multObj && multObj.state !== 'crossed') {
                        multObj.state = 'crossed';
                        multObj.crossedBy = step.prime;
                        multObj.fadeT = 0;
                    }
                    subStep++;
                } else {
                    // Move to next prime
                    currentStep++;
                    subStep = 0;
                    if (currentStep < sieveSteps.length) {
                        var primeObj2 = getNumObj(sieveSteps[currentStep].prime);
                        if (primeObj2) primeObj2.state = 'prime';
                    } else {
                        // Sieve complete - mark remaining as prime
                        for (var ri = 0; ri < numbers.length; ri++) {
                            if (numbers[ri].state === 'normal') {
                                numbers[ri].state = 'prime';
                            }
                        }
                        sieveComplete = true;
                    }
                }
            }

            // Start button
            var startBtn = document.createElement('button');
            startBtn.textContent = 'Start Sieve';
            startBtn.style.cssText = 'padding:6px 16px;border:2px solid #d29922;border-radius:8px;background:#1a1a40;color:#d29922;font-size:0.9rem;font-weight:bold;cursor:pointer;';
            startBtn.addEventListener('click', function() {
                if (sieveComplete || currentStep === -1) {
                    resetSieve();
                }
                autoPlay = true;
                autoTimer = 0;
                lastTime = null;
                startBtn.textContent = 'Running...';
                startBtn.style.borderColor = '#3fb950';
                startBtn.style.color = '#3fb950';
            });
            controls.appendChild(startBtn);

            // Step button
            var stepBtn = document.createElement('button');
            stepBtn.textContent = 'Step';
            stepBtn.style.cssText = 'padding:6px 14px;border:1px solid #58a6ff;border-radius:6px;background:#1a1a40;color:#58a6ff;font-size:0.85rem;font-weight:bold;cursor:pointer;margin-left:6px;';
            stepBtn.addEventListener('click', function() {
                autoPlay = false;
                startBtn.textContent = 'Start Sieve';
                startBtn.style.borderColor = '#d29922';
                startBtn.style.color = '#d29922';
                if (sieveComplete) {
                    resetSieve();
                } else {
                    advanceSieve();
                }
            });
            controls.appendChild(stepBtn);

            // Reset button
            var resetBtn3 = document.createElement('button');
            resetBtn3.textContent = 'Reset';
            resetBtn3.style.cssText = 'padding:6px 14px;border:1px solid #30363d;border-radius:6px;background:#1a1a40;color:#c9d1d9;font-size:0.85rem;cursor:pointer;margin-left:6px;';
            resetBtn3.addEventListener('click', function() {
                autoPlay = false;
                startBtn.textContent = 'Start Sieve';
                startBtn.style.borderColor = '#d29922';
                startBtn.style.color = '#d29922';
                resetSieve();
            });
            controls.appendChild(resetBtn3);

            // Colors for crossed-out by different primes
            var crossColors = {
                2: '#f8514988',
                3: '#f0883e88',
                5: '#bc8cff88',
                7: '#f778ba88'
            };
            var primeBorderColors = {
                2: '#f85149',
                3: '#f0883e',
                5: '#bc8cff',
                7: '#f778ba'
            };

            function draw(t) {
                if (lastTime === null) lastTime = t;
                var dt = (t - lastTime) / 1000;
                lastTime = t;
                animT += dt;

                // Auto advance
                if (autoPlay && !sieveComplete) {
                    autoTimer += dt;
                    if (autoTimer > 0.45) {
                        autoTimer = 0;
                        advanceSieve();
                        if (sieveComplete) {
                            autoPlay = false;
                            startBtn.textContent = 'Start Sieve';
                            startBtn.style.borderColor = '#d29922';
                            startBtn.style.color = '#d29922';
                        }
                    }
                }

                // Update fade timers
                for (var fi = 0; fi < numbers.length; fi++) {
                    if (numbers[fi].state === 'crossed') {
                        numbers[fi].fadeT = Math.min(1, numbers[fi].fadeT + dt * 3);
                    }
                }

                var ctx = viz.ctx;
                ctx.fillStyle = '#0c0c20';
                ctx.fillRect(0, 0, viz.width, viz.height);

                // Title
                ctx.fillStyle = '#f0f6fc';
                ctx.font = 'bold 18px -apple-system, sans-serif';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'top';
                ctx.fillText('Sieve of Eratosthenes', viz.width / 2, 8);

                // Current action text
                ctx.font = '13px -apple-system, sans-serif';
                ctx.fillStyle = '#8b949e';
                if (currentStep === -1) {
                    ctx.fillText('Press "Start Sieve" or "Step" to begin!', viz.width / 2, 30);
                } else if (!sieveComplete && currentStep < sieveSteps.length) {
                    var curPrime = sieveSteps[currentStep].prime;
                    ctx.fillStyle = primeBorderColors[curPrime] || '#d29922';
                    ctx.fillText('Checking prime ' + curPrime + ': crossing out multiples of ' + curPrime, viz.width / 2, 30);
                } else if (sieveComplete) {
                    ctx.fillStyle = '#d29922';
                    ctx.font = 'bold 14px -apple-system, sans-serif';
                    ctx.fillText('Sieve complete! The glowing numbers are PRIMES!', viz.width / 2, 30);
                }

                // Draw grid
                var cellSize = 60;
                var cellGap = 6;
                var gridW = GRID_COLS * (cellSize + cellGap) - cellGap;
                var gridH = GRID_ROWS * (cellSize + cellGap) - cellGap;
                var gridLeft = (viz.width - gridW) / 2;
                var gridTop = 52;

                for (var ni = 0; ni < numbers.length; ni++) {
                    var num = numbers[ni];
                    var col = ni % GRID_COLS;
                    var row = Math.floor(ni / GRID_COLS);
                    var cx = gridLeft + col * (cellSize + cellGap);
                    var cy = gridTop + row * (cellSize + cellGap);
                    var centerCx = cx + cellSize / 2;
                    var centerCy = cy + cellSize / 2;

                    if (num.state === 'prime') {
                        // Gold glowing prime
                        var glowPulse = 0.7 + Math.sin(t / 300 + ni * 0.5) * 0.3;
                        ctx.shadowColor = '#d29922';
                        ctx.shadowBlur = 15 * glowPulse;
                        ctx.fillStyle = '#d29922' + '44';
                        ctx.beginPath();
                        ctx.roundRect(cx, cy, cellSize, cellSize, 10);
                        ctx.fill();
                        ctx.strokeStyle = '#d29922';
                        ctx.lineWidth = 3;
                        ctx.beginPath();
                        ctx.roundRect(cx, cy, cellSize, cellSize, 10);
                        ctx.stroke();
                        ctx.shadowBlur = 0;

                        // Star decoration in corner
                        ctx.fillStyle = '#d29922';
                        ctx.font = '10px -apple-system, sans-serif';
                        ctx.textAlign = 'right';
                        ctx.textBaseline = 'top';
                        ctx.fillText('\u2605', cx + cellSize - 4, cy + 3);

                        // Number
                        ctx.fillStyle = '#d29922';
                        ctx.font = 'bold 22px -apple-system, sans-serif';
                        ctx.textAlign = 'center';
                        ctx.textBaseline = 'middle';
                        ctx.fillText(String(num.val), centerCx, centerCy);

                    } else if (num.state === 'crossed') {
                        // Faded crossed-out number
                        var fadeAlpha = num.fadeT;
                        var crossColor = crossColors[num.crossedBy] || '#f8514966';
                        var borderCrossColor = primeBorderColors[num.crossedBy] || '#f85149';

                        // Faded background
                        ctx.globalAlpha = 0.3 + (1 - fadeAlpha) * 0.4;
                        ctx.fillStyle = '#1a1a30';
                        ctx.beginPath();
                        ctx.roundRect(cx, cy, cellSize, cellSize, 10);
                        ctx.fill();
                        ctx.strokeStyle = '#2a2a50';
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.roundRect(cx, cy, cellSize, cellSize, 10);
                        ctx.stroke();

                        // Number (faded)
                        ctx.fillStyle = '#4a4a6a';
                        ctx.font = '18px -apple-system, sans-serif';
                        ctx.textAlign = 'center';
                        ctx.textBaseline = 'middle';
                        ctx.fillText(String(num.val), centerCx, centerCy);

                        // X mark
                        ctx.globalAlpha = fadeAlpha;
                        ctx.strokeStyle = borderCrossColor;
                        ctx.lineWidth = 3;
                        ctx.beginPath();
                        ctx.moveTo(cx + 10, cy + 10);
                        ctx.lineTo(cx + cellSize - 10, cy + cellSize - 10);
                        ctx.stroke();
                        ctx.beginPath();
                        ctx.moveTo(cx + cellSize - 10, cy + 10);
                        ctx.lineTo(cx + 10, cy + cellSize - 10);
                        ctx.stroke();

                        // Small "xN" label showing what crossed it out
                        ctx.fillStyle = borderCrossColor;
                        ctx.font = 'bold 9px -apple-system, sans-serif';
                        ctx.textAlign = 'left';
                        ctx.textBaseline = 'bottom';
                        ctx.fillText('x' + num.crossedBy, cx + 3, cy + cellSize - 2);

                        ctx.globalAlpha = 1;

                    } else {
                        // Normal (unchecked) number
                        ctx.fillStyle = '#1a1a40';
                        ctx.beginPath();
                        ctx.roundRect(cx, cy, cellSize, cellSize, 10);
                        ctx.fill();
                        ctx.strokeStyle = '#3a3a60';
                        ctx.lineWidth = 1.5;
                        ctx.beginPath();
                        ctx.roundRect(cx, cy, cellSize, cellSize, 10);
                        ctx.stroke();

                        // Number
                        ctx.fillStyle = '#c9d1d9';
                        ctx.font = '20px -apple-system, sans-serif';
                        ctx.textAlign = 'center';
                        ctx.textBaseline = 'middle';
                        ctx.fillText(String(num.val), centerCx, centerCy);
                    }
                }

                // Legend at bottom
                var legendY = gridTop + gridH + 16;
                ctx.textAlign = 'left';
                ctx.textBaseline = 'middle';
                ctx.font = '12px -apple-system, sans-serif';

                // Prime legend
                ctx.fillStyle = '#d29922';
                ctx.fillRect(gridLeft, legendY, 14, 14);
                ctx.strokeStyle = '#d29922';
                ctx.lineWidth = 2;
                ctx.strokeRect(gridLeft, legendY, 14, 14);
                ctx.fillStyle = '#c9d1d9';
                ctx.fillText('Prime', gridLeft + 20, legendY + 7);

                // Crossed out legend items
                var lx = gridLeft + 80;
                var primeLabels = [
                    { p: 2, label: 'x2' },
                    { p: 3, label: 'x3' },
                    { p: 5, label: 'x5' }
                ];
                for (var pl = 0; pl < primeLabels.length; pl++) {
                    var pInfo = primeLabels[pl];
                    var pColor = primeBorderColors[pInfo.p];
                    ctx.fillStyle = pColor + '44';
                    ctx.fillRect(lx, legendY, 14, 14);
                    ctx.strokeStyle = pColor;
                    ctx.lineWidth = 1.5;
                    // Small X
                    ctx.beginPath();
                    ctx.moveTo(lx + 2, legendY + 2);
                    ctx.lineTo(lx + 12, legendY + 12);
                    ctx.stroke();
                    ctx.beginPath();
                    ctx.moveTo(lx + 12, legendY + 2);
                    ctx.lineTo(lx + 2, legendY + 12);
                    ctx.stroke();
                    ctx.fillStyle = '#c9d1d9';
                    ctx.fillText('Multiple of ' + pInfo.p, lx + 20, legendY + 7);
                    lx += 110;
                }

                // Count of primes found so far
                var primeCount = 0;
                var primeList = [];
                for (var ci = 0; ci < numbers.length; ci++) {
                    if (numbers[ci].state === 'prime') {
                        primeCount++;
                        primeList.push(numbers[ci].val);
                    }
                }
                if (primeCount > 0) {
                    ctx.fillStyle = '#d29922';
                    ctx.font = 'bold 13px -apple-system, sans-serif';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'top';
                    ctx.fillText('Primes found: ' + primeList.join(', ') + ' (' + primeCount + ' primes)', viz.width / 2, legendY + 22);
                }
            }

            viz.animate(draw);
            return viz;
        }
    }
];

// ============================================================
// Section 5: Divisibility Tricks — Quick Test Machine
// ============================================================
window.EXTRA_VIZ['ch06']['ch06-sec05'] = [
    {
        id: 'ch06-extra-viz-5',
        title: 'Divisibility Tricks Machine',
        description: 'Enter any number from 1 to 999 and see instant divisibility tests for 2, 3, 5, 9, and 10 with fun explanations!',
        setup: function(container, controls) {
            var viz = new VizEngine(container, {
                width: 560, height: 400, scale: 1,
                originX: 0, originY: 0
            });

            var currentNum = 126;

            // Number input area
            var inputGroup = document.createElement('div');
            inputGroup.style.cssText = 'display:flex;align-items:center;gap:8px;flex-wrap:wrap;';

            var inputLabel = document.createElement('span');
            inputLabel.style.cssText = 'color:#f0f6fc;font-size:0.9rem;font-weight:bold;';
            inputLabel.textContent = 'Number: ';
            inputGroup.appendChild(inputLabel);

            var numInput = document.createElement('input');
            numInput.type = 'number';
            numInput.min = '1';
            numInput.max = '999';
            numInput.value = String(currentNum);
            numInput.style.cssText = 'width:80px;padding:4px 8px;border:2px solid #58a6ff;border-radius:6px;background:#1a1a40;color:#58a6ff;font-size:1.1rem;font-weight:bold;text-align:center;';
            numInput.addEventListener('input', function() {
                var v = parseInt(numInput.value);
                if (!isNaN(v) && v >= 1 && v <= 999) {
                    currentNum = v;
                    numSlider2.value = String(v);
                    draw();
                }
            });
            inputGroup.appendChild(numInput);

            // Also a slider for quick scrubbing
            var numSlider2 = document.createElement('input');
            numSlider2.type = 'range';
            numSlider2.className = 'viz-slider';
            numSlider2.min = '1'; numSlider2.max = '999'; numSlider2.step = '1'; numSlider2.value = String(currentNum);
            numSlider2.style.cssText += 'flex:1;min-width:120px;';
            numSlider2.addEventListener('input', function() {
                currentNum = parseInt(numSlider2.value);
                numInput.value = String(currentNum);
                draw();
            });
            inputGroup.appendChild(numSlider2);

            controls.appendChild(inputGroup);

            // Random number button
            var randBtn = document.createElement('button');
            randBtn.textContent = 'Random!';
            randBtn.style.cssText = 'padding:5px 14px;border:2px solid #bc8cff;border-radius:8px;background:#1a1a40;color:#bc8cff;font-size:0.85rem;font-weight:bold;cursor:pointer;margin-left:4px;';
            randBtn.addEventListener('click', function() {
                currentNum = Math.floor(Math.random() * 999) + 1;
                numInput.value = String(currentNum);
                numSlider2.value = String(currentNum);
                draw();
            });
            controls.appendChild(randBtn);

            function digitSum(n) {
                var s = 0;
                var str = String(n);
                for (var i = 0; i < str.length; i++) {
                    s += parseInt(str[i]);
                }
                return s;
            }

            function lastDigit(n) {
                return n % 10;
            }

            function getDivisibilityTests(n) {
                var ld = lastDigit(n);
                var ds = digitSum(n);
                var tests = [];

                // Divisible by 2
                var divBy2 = n % 2 === 0;
                var reason2 = 'Last digit is ' + ld;
                if (divBy2) {
                    reason2 += ' (even)';
                } else {
                    reason2 += ' (odd)';
                }
                tests.push({ divisor: 2, result: divBy2, reason: reason2, color: '#58a6ff' });

                // Divisible by 3
                var divBy3 = n % 3 === 0;
                var digits3 = String(n).split('').join(' + ');
                var reason3 = 'Digit sum: ' + digits3 + ' = ' + ds;
                if (divBy3) {
                    reason3 += ' (divisible by 3)';
                } else {
                    reason3 += ' (not divisible by 3)';
                }
                tests.push({ divisor: 3, result: divBy3, reason: reason3, color: '#3fb9a0' });

                // Divisible by 5
                var divBy5 = n % 5 === 0;
                var reason5 = 'Last digit is ' + ld;
                if (ld === 0 || ld === 5) {
                    reason5 += ' (0 or 5)';
                } else {
                    reason5 += ' (not 0 or 5)';
                }
                tests.push({ divisor: 5, result: divBy5, reason: reason5, color: '#f0883e' });

                // Divisible by 9
                var divBy9 = n % 9 === 0;
                var digits9 = String(n).split('').join(' + ');
                var reason9 = 'Digit sum: ' + digits9 + ' = ' + ds;
                if (divBy9) {
                    reason9 += ' (divisible by 9)';
                } else {
                    reason9 += ' (not divisible by 9)';
                }
                tests.push({ divisor: 9, result: divBy9, reason: reason9, color: '#bc8cff' });

                // Divisible by 10
                var divBy10 = n % 10 === 0;
                var reason10 = 'Last digit is ' + ld;
                if (ld === 0) {
                    reason10 += ' (zero!)';
                } else {
                    reason10 += ' (not zero)';
                }
                tests.push({ divisor: 10, result: divBy10, reason: reason10, color: '#f778ba' });

                return tests;
            }

            function draw() {
                var ctx = viz.ctx;
                ctx.fillStyle = '#0c0c20';
                ctx.fillRect(0, 0, viz.width, viz.height);

                // Title
                ctx.fillStyle = '#f0f6fc';
                ctx.font = 'bold 20px -apple-system, sans-serif';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'top';
                ctx.fillText('Divisibility Tricks Machine', viz.width / 2, 8);

                // Big number display
                ctx.shadowColor = '#58a6ff';
                ctx.shadowBlur = 15;
                ctx.fillStyle = '#58a6ff';
                ctx.font = 'bold 42px -apple-system, sans-serif';
                ctx.fillText(String(currentNum), viz.width / 2, 38);
                ctx.shadowBlur = 0;

                // Digit breakdown
                var digits = String(currentNum).split('');
                var ds = digitSum(currentNum);
                ctx.fillStyle = '#8b949e';
                ctx.font = '13px -apple-system, sans-serif';
                ctx.fillText('Digits: ' + digits.join(', ') + '    Digit sum: ' + ds + '    Last digit: ' + lastDigit(currentNum), viz.width / 2, 86);

                var tests = getDivisibilityTests(currentNum);

                // Draw test results as cards
                var cardTop = 110;
                var cardHeight = 50;
                var cardGap = 8;
                var cardLeft = 30;
                var cardWidth = viz.width - 60;

                for (var ti = 0; ti < tests.length; ti++) {
                    var test = tests[ti];
                    var cy = cardTop + ti * (cardHeight + cardGap);

                    // Card background
                    ctx.fillStyle = test.result ? test.color + '18' : '#1a1a3008';
                    ctx.beginPath();
                    ctx.roundRect(cardLeft, cy, cardWidth, cardHeight, 10);
                    ctx.fill();

                    // Card border
                    ctx.strokeStyle = test.result ? test.color : '#2a2a50';
                    ctx.lineWidth = test.result ? 2.5 : 1;
                    ctx.beginPath();
                    ctx.roundRect(cardLeft, cy, cardWidth, cardHeight, 10);
                    ctx.stroke();

                    // Divisor label
                    ctx.fillStyle = test.color;
                    ctx.font = 'bold 20px -apple-system, sans-serif';
                    ctx.textAlign = 'left';
                    ctx.textBaseline = 'middle';
                    ctx.fillText('\u00F7 ' + test.divisor, cardLeft + 14, cy + cardHeight / 2);

                    // Check or X mark
                    var markX = cardLeft + 85;
                    if (test.result) {
                        // Green checkmark
                        ctx.fillStyle = '#3fb950';
                        ctx.font = 'bold 24px -apple-system, sans-serif';
                        ctx.textAlign = 'center';
                        ctx.fillText('\u2713', markX, cy + cardHeight / 2);

                        // YES label
                        ctx.fillStyle = '#3fb950';
                        ctx.font = 'bold 13px -apple-system, sans-serif';
                        ctx.fillText('YES', markX + 30, cy + cardHeight / 2);
                    } else {
                        // Red X
                        ctx.fillStyle = '#f85149';
                        ctx.font = 'bold 24px -apple-system, sans-serif';
                        ctx.textAlign = 'center';
                        ctx.fillText('\u2717', markX, cy + cardHeight / 2);

                        // NO label
                        ctx.fillStyle = '#f85149';
                        ctx.font = 'bold 13px -apple-system, sans-serif';
                        ctx.fillText('NO', markX + 28, cy + cardHeight / 2);
                    }

                    // Reason text
                    ctx.fillStyle = '#c9d1d9';
                    ctx.font = '12px -apple-system, sans-serif';
                    ctx.textAlign = 'left';
                    ctx.textBaseline = 'middle';
                    ctx.fillText(test.reason, cardLeft + 148, cy + cardHeight / 2);

                    // If divisible, show quotient on the right
                    if (test.result) {
                        var quotient = currentNum / test.divisor;
                        ctx.fillStyle = test.color;
                        ctx.font = 'bold 12px -apple-system, sans-serif';
                        ctx.textAlign = 'right';
                        ctx.fillText(currentNum + ' \u00F7 ' + test.divisor + ' = ' + quotient, cardLeft + cardWidth - 10, cy + cardHeight / 2);
                    }
                }

                // Summary at bottom
                var summaryY = cardTop + tests.length * (cardHeight + cardGap) + 8;
                var divisors = [];
                for (var si = 0; si < tests.length; si++) {
                    if (tests[si].result) divisors.push(tests[si].divisor);
                }

                ctx.textAlign = 'center';
                ctx.textBaseline = 'top';
                if (divisors.length > 0) {
                    ctx.fillStyle = '#3fb950';
                    ctx.font = 'bold 15px -apple-system, sans-serif';
                    ctx.fillText(currentNum + ' is divisible by: ' + divisors.join(', '), viz.width / 2, summaryY);
                } else {
                    ctx.fillStyle = '#f0883e';
                    ctx.font = 'bold 15px -apple-system, sans-serif';
                    ctx.fillText(currentNum + ' is not divisible by 2, 3, 5, 9, or 10', viz.width / 2, summaryY);
                }

                // Fun fact: check if prime (simple check for small numbers)
                var isPrime2 = currentNum > 1;
                if (currentNum <= 1) isPrime2 = false;
                for (var pf = 2; pf <= Math.sqrt(currentNum); pf++) {
                    if (currentNum % pf === 0) { isPrime2 = false; break; }
                }
                if (isPrime2 && currentNum > 1) {
                    ctx.fillStyle = '#d29922';
                    ctx.font = 'bold 13px -apple-system, sans-serif';
                    ctx.fillText(currentNum + ' is a PRIME number!', viz.width / 2, summaryY + 22);
                }
            }

            draw();
            return viz;
        }
    }
];
