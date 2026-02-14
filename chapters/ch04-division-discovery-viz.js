// Extra Interactive Visualizations for Chapter 4: Division Discovery
// Fun Arithmetic & Number Sense (Elementary)

window.EXTRA_VIZ = window.EXTRA_VIZ || {};
window.EXTRA_VIZ['ch04'] = window.EXTRA_VIZ['ch04'] || {};

// ============================================================
// Section 1: What Is Division? — "Fair Share" Visualization
// ============================================================
window.EXTRA_VIZ['ch04']['ch04-sec01'] = [
    {
        id: 'ch04-extra-viz-1',
        title: 'Fair Share: Dividing Items into Groups',
        description: 'Use the sliders to pick how many items you have and how many groups to share them into. Watch the items get dealt out one by one!',
        setup: function(container, controls) {
            var viz = new VizEngine(container, { width: 560, height: 400, scale: 1, originX: 0, originY: 0 });
            var ctx = viz.ctx;
            var W = viz.width, H = viz.height;

            var totalItems = 12;
            var numGroups = 3;
            var animProgress = 0;
            var animating = false;
            var animStartTime = 0;

            // Bright candy colors for dots
            var dotColors = [
                '#ff6b6b', '#ffa94d', '#ffd43b', '#69db7c',
                '#38d9a9', '#4dabf7', '#748ffc', '#da77f2',
                '#f783ac', '#e599f7'
            ];

            VizEngine.createSlider(controls, 'Items', 1, 30, totalItems, 1, function(v) {
                totalItems = Math.round(v);
                animProgress = 0;
                animating = false;
                draw();
            });

            VizEngine.createSlider(controls, 'Groups', 1, 10, numGroups, 1, function(v) {
                numGroups = Math.round(v);
                animProgress = 0;
                animating = false;
                draw();
            });

            var animBtn = VizEngine.createButton(controls, 'Deal Out!', function() {
                animProgress = 0;
                animating = true;
                animStartTime = performance.now();
            });
            animBtn.style.background = '#3fb950';
            animBtn.style.color = '#fff';
            animBtn.style.fontWeight = 'bold';
            animBtn.style.border = 'none';
            animBtn.style.padding = '6px 16px';
            animBtn.style.borderRadius = '6px';

            function draw() {
                ctx.fillStyle = '#0c0c20';
                ctx.fillRect(0, 0, W, H);

                var quotient = Math.floor(totalItems / numGroups);
                var remainder = totalItems % numGroups;
                var itemsToShow = animating ? Math.min(Math.floor(animProgress), totalItems) : totalItems;

                // Title area
                ctx.fillStyle = '#f0f6fc';
                ctx.font = 'bold 16px -apple-system, sans-serif';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'top';
                ctx.fillText(totalItems + ' items \u00F7 ' + numGroups + ' groups', W / 2, 8);

                // Draw group containers
                var groupAreaTop = 50;
                var groupAreaBottom = H - 60;
                var groupAreaHeight = groupAreaBottom - groupAreaTop;
                var groupWidth = Math.min(80, (W - 40) / numGroups - 10);
                var totalGroupsWidth = numGroups * groupWidth + (numGroups - 1) * 10;
                var startX = (W - totalGroupsWidth) / 2;

                // Draw each group box
                for (var g = 0; g < numGroups; g++) {
                    var gx = startX + g * (groupWidth + 10);
                    // Group box
                    ctx.fillStyle = '#1a1a40';
                    ctx.strokeStyle = '#4a4a7a';
                    ctx.lineWidth = 2;
                    ctx.beginPath();
                    ctx.roundRect(gx, groupAreaTop, groupWidth, groupAreaHeight, 8);
                    ctx.fill();
                    ctx.stroke();

                    // Group label
                    ctx.fillStyle = '#8b949e';
                    ctx.font = '11px -apple-system, sans-serif';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'top';
                    ctx.fillText('Group ' + (g + 1), gx + groupWidth / 2, groupAreaTop + 4);
                }

                // Distribute items into groups (round-robin)
                var groupCounts = [];
                for (var g = 0; g < numGroups; g++) groupCounts.push(0);

                for (var i = 0; i < itemsToShow; i++) {
                    var targetGroup = i % numGroups;
                    var posInGroup = groupCounts[targetGroup];
                    groupCounts[targetGroup]++;

                    var gx = startX + targetGroup * (groupWidth + 10);
                    var dotRadius = Math.min(10, (groupWidth - 16) / 4);
                    var dotsPerRow = Math.max(1, Math.floor((groupWidth - 12) / (dotRadius * 2 + 4)));
                    var row = Math.floor(posInGroup / dotsPerRow);
                    var col = posInGroup % dotsPerRow;

                    var dotX = gx + 10 + col * (dotRadius * 2 + 4) + dotRadius;
                    var dotY = groupAreaTop + 24 + row * (dotRadius * 2 + 4) + dotRadius;

                    var color = dotColors[i % dotColors.length];

                    // Draw dot with glow
                    ctx.fillStyle = color + '44';
                    ctx.beginPath();
                    ctx.arc(dotX, dotY, dotRadius + 3, 0, Math.PI * 2);
                    ctx.fill();

                    ctx.fillStyle = color;
                    ctx.beginPath();
                    ctx.arc(dotX, dotY, dotRadius, 0, Math.PI * 2);
                    ctx.fill();

                    // Highlight shine
                    ctx.fillStyle = '#ffffff55';
                    ctx.beginPath();
                    ctx.arc(dotX - dotRadius * 0.25, dotY - dotRadius * 0.25, dotRadius * 0.3, 0, Math.PI * 2);
                    ctx.fill();
                }

                // Draw remaining items (not yet dealt) floating above
                if (animating && itemsToShow < totalItems) {
                    var waitX = W / 2;
                    var waitY = groupAreaTop - 5;
                    var remaining = totalItems - itemsToShow;
                    var spacing = Math.min(18, (W - 80) / remaining);
                    var rowStartX = waitX - (remaining - 1) * spacing / 2;
                    for (var i = 0; i < remaining; i++) {
                        var idx = itemsToShow + i;
                        var color = dotColors[idx % dotColors.length];
                        var px = rowStartX + i * spacing;
                        ctx.fillStyle = color + '88';
                        ctx.beginPath();
                        ctx.arc(px, waitY, 5, 0, Math.PI * 2);
                        ctx.fill();
                    }
                }

                // Remainder area
                if (remainder > 0 && itemsToShow >= totalItems) {
                    var remStartX = W / 2 - remainder * 14;
                    ctx.fillStyle = '#f85149' + '22';
                    ctx.strokeStyle = '#f85149';
                    ctx.lineWidth = 2;
                    ctx.setLineDash([4, 4]);
                    ctx.beginPath();
                    ctx.roundRect(remStartX - 10, groupAreaBottom + 4, remainder * 28 + 20, 34, 8);
                    ctx.fill();
                    ctx.stroke();
                    ctx.setLineDash([]);

                    ctx.fillStyle = '#f85149';
                    ctx.font = '10px -apple-system, sans-serif';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'top';
                    ctx.fillText('Remainder', remStartX - 10 + (remainder * 28 + 20) / 2, groupAreaBottom + 40);
                }

                // Result text
                ctx.font = 'bold 15px -apple-system, sans-serif';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'bottom';
                if (remainder === 0) {
                    ctx.fillStyle = '#3fb950';
                    ctx.fillText(totalItems + ' \u00F7 ' + numGroups + ' = ' + quotient + '  (no leftovers!)', W / 2, H - 6);
                } else {
                    ctx.fillStyle = '#ffa94d';
                    ctx.fillText(totalItems + ' \u00F7 ' + numGroups + ' = ' + quotient + ' remainder ' + remainder, W / 2, H - 6);
                }

                // Group count labels
                ctx.font = 'bold 12px -apple-system, sans-serif';
                ctx.textBaseline = 'bottom';
                for (var g = 0; g < numGroups; g++) {
                    var gx = startX + g * (groupWidth + 10);
                    ctx.fillStyle = '#58a6ff';
                    ctx.textAlign = 'center';
                    ctx.fillText(groupCounts[g] + ' items', gx + groupWidth / 2, groupAreaBottom - 4);
                }
            }

            viz.animate(function(t) {
                if (animating) {
                    var elapsed = (t - animStartTime) / 1000;
                    animProgress = elapsed * 5; // 5 items per second
                    if (animProgress >= totalItems) {
                        animProgress = totalItems;
                        animating = false;
                    }
                }
                draw();
            });

            return viz;
        }
    }
];

// ============================================================
// Section 2: Number Line Division — Backward Jumps
// ============================================================
window.EXTRA_VIZ['ch04']['ch04-sec02'] = [
    {
        id: 'ch04-extra-viz-2',
        title: 'Number Line Division: Jumping Backward',
        description: 'Division is like counting backward jumps! See how many equal jumps it takes to get from the dividend back to 0.',
        setup: function(container, controls) {
            var viz = new VizEngine(container, { width: 560, height: 400, scale: 1, originX: 0, originY: 0 });
            var ctx = viz.ctx;
            var W = viz.width, H = viz.height;

            var dividend = 15;
            var divisor = 3;
            var animProgress = 0;
            var animating = false;
            var animStartTime = 0;

            VizEngine.createSlider(controls, 'Total', 1, 30, dividend, 1, function(v) {
                dividend = Math.round(v);
                animProgress = 0;
                animating = false;
                draw();
            });

            VizEngine.createSlider(controls, 'Jump Size', 1, 10, divisor, 1, function(v) {
                divisor = Math.round(v);
                animProgress = 0;
                animating = false;
                draw();
            });

            var animBtn = VizEngine.createButton(controls, 'Jump!', function() {
                animProgress = 0;
                animating = true;
                animStartTime = performance.now();
            });
            animBtn.style.background = '#58a6ff';
            animBtn.style.color = '#fff';
            animBtn.style.fontWeight = 'bold';
            animBtn.style.border = 'none';
            animBtn.style.padding = '6px 16px';
            animBtn.style.borderRadius = '6px';

            var jumpColors = [
                '#ff6b6b', '#ffa94d', '#ffd43b', '#69db7c',
                '#38d9a9', '#4dabf7', '#748ffc', '#da77f2',
                '#f783ac', '#e599f7', '#ff8787', '#ffc078'
            ];

            function draw() {
                ctx.fillStyle = '#0c0c20';
                ctx.fillRect(0, 0, W, H);

                var quotient = Math.floor(dividend / divisor);
                var remainder = dividend % divisor;
                var totalJumps = quotient;

                // Number line layout
                var lineY = H * 0.55;
                var margin = 50;
                var lineLeft = margin;
                var lineRight = W - margin;
                var lineWidth = lineRight - lineLeft;
                var maxVal = Math.max(dividend + 1, 10);
                var unitWidth = lineWidth / maxVal;

                // Title
                ctx.fillStyle = '#f0f6fc';
                ctx.font = 'bold 16px -apple-system, sans-serif';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'top';
                ctx.fillText(dividend + ' \u00F7 ' + divisor + ' = How many jumps of ' + divisor + '?', W / 2, 10);

                // Draw number line
                ctx.strokeStyle = '#4a4a7a';
                ctx.lineWidth = 3;
                ctx.beginPath();
                ctx.moveTo(lineLeft, lineY);
                ctx.lineTo(lineRight, lineY);
                ctx.stroke();

                // Tick marks and labels
                for (var i = 0; i <= maxVal; i++) {
                    var tx = lineLeft + i * unitWidth;
                    var tickH = (i % 5 === 0) ? 12 : 6;
                    ctx.strokeStyle = '#4a4a7a';
                    ctx.lineWidth = 1.5;
                    ctx.beginPath();
                    ctx.moveTo(tx, lineY - tickH);
                    ctx.lineTo(tx, lineY + tickH);
                    ctx.stroke();

                    ctx.fillStyle = '#8b949e';
                    ctx.font = '11px -apple-system, sans-serif';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'top';
                    ctx.fillText(i, tx, lineY + 16);
                }

                // Mark the dividend with a star
                var dvdX = lineLeft + dividend * unitWidth;
                ctx.fillStyle = '#ffd43b';
                ctx.font = '20px -apple-system, sans-serif';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'bottom';
                ctx.fillText('\u2605', dvdX, lineY - 14);

                // Mark zero
                var zeroX = lineLeft;
                ctx.fillStyle = '#3fb950';
                ctx.font = '16px -apple-system, sans-serif';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'bottom';
                ctx.fillText('\u25CF', zeroX, lineY - 14);

                // Animated jumps
                var jumpsToShow = animating ? Math.min(Math.floor(animProgress), totalJumps) : totalJumps;
                var partialJump = animating ? (animProgress - Math.floor(animProgress)) : 0;
                var showPartial = animating && jumpsToShow < totalJumps;

                for (var j = 0; j < jumpsToShow; j++) {
                    drawJumpArc(j, 1.0);
                }
                if (showPartial && jumpsToShow < totalJumps) {
                    drawJumpArc(jumpsToShow, partialJump);
                }

                function drawJumpArc(jumpIndex, progress) {
                    var startVal = dividend - jumpIndex * divisor;
                    var endVal = startVal - divisor;
                    var sx = lineLeft + startVal * unitWidth;
                    var ex = lineLeft + endVal * unitWidth;

                    // Interpolate for partial
                    var curEndX = sx + (ex - sx) * progress;
                    var arcHeight = Math.min(40 + divisor * 5, 80);
                    var midX = (sx + curEndX) / 2;
                    var midY = lineY - arcHeight;

                    var color = jumpColors[jumpIndex % jumpColors.length];

                    ctx.strokeStyle = color;
                    ctx.lineWidth = 3;
                    ctx.beginPath();

                    // Draw arc as quadratic curve
                    var steps = 30;
                    var drawSteps = Math.round(steps * progress);
                    for (var s = 0; s <= drawSteps; s++) {
                        var t = s / steps;
                        // Quadratic bezier: start -> mid(top) -> end
                        var px = (1 - t) * (1 - t) * sx + 2 * (1 - t) * t * midX + t * t * ex;
                        var py = (1 - t) * (1 - t) * lineY + 2 * (1 - t) * t * (lineY - arcHeight) + t * t * lineY;
                        if (s === 0) ctx.moveTo(px, py);
                        else ctx.lineTo(px, py);
                    }
                    ctx.stroke();

                    // Arrowhead at end of arc (only if mostly complete)
                    if (progress > 0.8) {
                        var arrowT = progress;
                        var arrowX = (1 - arrowT) * (1 - arrowT) * sx + 2 * (1 - arrowT) * arrowT * midX + arrowT * arrowT * ex;
                        var arrowY = (1 - arrowT) * (1 - arrowT) * lineY + 2 * (1 - arrowT) * arrowT * (lineY - arcHeight) + arrowT * arrowT * lineY;
                        ctx.fillStyle = color;
                        ctx.beginPath();
                        ctx.moveTo(arrowX, arrowY);
                        ctx.lineTo(arrowX - 6, arrowY - 10);
                        ctx.lineTo(arrowX + 6, arrowY - 10);
                        ctx.closePath();
                        ctx.fill();
                    }

                    // Jump number label
                    if (progress > 0.5) {
                        ctx.fillStyle = color;
                        ctx.font = 'bold 13px -apple-system, sans-serif';
                        ctx.textAlign = 'center';
                        ctx.textBaseline = 'bottom';
                        var labelMidX = (sx + ex) / 2;
                        ctx.fillText('#' + (jumpIndex + 1), labelMidX, lineY - arcHeight - 4);
                    }
                }

                // Remainder highlight
                if (remainder > 0 && (!animating || jumpsToShow >= totalJumps)) {
                    var remStart = lineLeft + remainder * unitWidth;
                    ctx.fillStyle = '#f85149' + '33';
                    ctx.fillRect(lineLeft, lineY - 4, remStart - lineLeft, 8);

                    ctx.fillStyle = '#f85149';
                    ctx.font = 'bold 11px -apple-system, sans-serif';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'top';
                    ctx.fillText('remainder: ' + remainder, (lineLeft + remStart) / 2, lineY + 34);
                }

                // Result text
                ctx.font = 'bold 15px -apple-system, sans-serif';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'bottom';
                if (!animating || jumpsToShow >= totalJumps) {
                    if (remainder === 0) {
                        ctx.fillStyle = '#3fb950';
                        ctx.fillText(dividend + ' \u00F7 ' + divisor + ' = ' + quotient + ' jumps  (exact!)', W / 2, H - 10);
                    } else {
                        ctx.fillStyle = '#ffa94d';
                        ctx.fillText(dividend + ' \u00F7 ' + divisor + ' = ' + quotient + ' jumps, remainder ' + remainder, W / 2, H - 10);
                    }
                } else {
                    ctx.fillStyle = '#58a6ff';
                    ctx.fillText('Jumping... ' + jumpsToShow + ' so far', W / 2, H - 10);
                }
            }

            viz.animate(function(t) {
                if (animating) {
                    var elapsed = (t - animStartTime) / 1000;
                    animProgress = elapsed * 2; // 2 jumps per second
                    var totalJumps = Math.floor(dividend / divisor);
                    if (animProgress >= totalJumps) {
                        animProgress = totalJumps;
                        animating = false;
                    }
                }
                draw();
            });

            return viz;
        }
    }
];

// ============================================================
// Section 3: Division & Multiplication — Fact Family Triangle
// ============================================================
window.EXTRA_VIZ['ch04']['ch04-sec03'] = [
    {
        id: 'ch04-extra-viz-3',
        title: 'Fact Family Triangle',
        description: 'Pick two factors and see all 4 related facts: 2 multiplication and 2 division! The product sits on top of the triangle.',
        setup: function(container, controls) {
            var viz = new VizEngine(container, { width: 560, height: 400, scale: 1, originX: 0, originY: 0 });
            var ctx = viz.ctx;
            var W = viz.width, H = viz.height;

            var factorA = 6;
            var factorB = 4;
            var animTime = 0;

            VizEngine.createSlider(controls, 'Factor A', 1, 12, factorA, 1, function(v) {
                factorA = Math.round(v);
                draw();
            });

            VizEngine.createSlider(controls, 'Factor B', 1, 12, factorB, 1, function(v) {
                factorB = Math.round(v);
                draw();
            });

            function draw() {
                ctx.fillStyle = '#0c0c20';
                ctx.fillRect(0, 0, W, H);

                var product = factorA * factorB;

                // Triangle coordinates (pixel)
                var triTopX = W / 2;
                var triTopY = 55;
                var triLeftX = W / 2 - 140;
                var triLeftY = 210;
                var triRightX = W / 2 + 140;
                var triRightY = 210;

                // Animated glow
                var glowPhase = (Math.sin(animTime * 2) + 1) / 2;
                var glowAlpha = Math.round(20 + glowPhase * 30).toString(16);
                if (glowAlpha.length < 2) glowAlpha = '0' + glowAlpha;

                // Triangle fill with gradient effect
                ctx.fillStyle = '#bc8cff' + glowAlpha;
                ctx.strokeStyle = '#bc8cff';
                ctx.lineWidth = 3;
                ctx.beginPath();
                ctx.moveTo(triTopX, triTopY);
                ctx.lineTo(triLeftX, triLeftY);
                ctx.lineTo(triRightX, triRightY);
                ctx.closePath();
                ctx.fill();
                ctx.stroke();

                // Draw triangle sides with colors
                // Left side (blue)
                ctx.strokeStyle = '#58a6ff';
                ctx.lineWidth = 4;
                ctx.beginPath();
                ctx.moveTo(triTopX, triTopY);
                ctx.lineTo(triLeftX, triLeftY);
                ctx.stroke();

                // Right side (orange)
                ctx.strokeStyle = '#ffa94d';
                ctx.lineWidth = 4;
                ctx.beginPath();
                ctx.moveTo(triTopX, triTopY);
                ctx.lineTo(triRightX, triRightY);
                ctx.stroke();

                // Bottom side (teal)
                ctx.strokeStyle = '#3fb9a0';
                ctx.lineWidth = 4;
                ctx.beginPath();
                ctx.moveTo(triLeftX, triLeftY);
                ctx.lineTo(triRightX, triRightY);
                ctx.stroke();

                // Multiply symbol on bottom
                ctx.fillStyle = '#3fb9a0';
                ctx.font = 'bold 22px -apple-system, sans-serif';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText('\u00D7', W / 2, triLeftY + 4);

                // Divide symbols on sides
                ctx.fillStyle = '#58a6ff';
                ctx.fillText('\u00F7', triTopX - 85, (triTopY + triLeftY) / 2 - 5);
                ctx.fillStyle = '#ffa94d';
                ctx.fillText('\u00F7', triTopX + 85, (triTopY + triRightY) / 2 - 5);

                // Product at top (in a circle)
                var circR = 32;
                ctx.fillStyle = '#ffd43b' + '33';
                ctx.beginPath();
                ctx.arc(triTopX, triTopY - 5, circR + 4, 0, Math.PI * 2);
                ctx.fill();
                ctx.fillStyle = '#1a1a40';
                ctx.strokeStyle = '#ffd43b';
                ctx.lineWidth = 3;
                ctx.beginPath();
                ctx.arc(triTopX, triTopY - 5, circR, 0, Math.PI * 2);
                ctx.fill();
                ctx.stroke();
                ctx.fillStyle = '#ffd43b';
                ctx.font = 'bold 24px -apple-system, sans-serif';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(product, triTopX, triTopY - 5);

                // Label "Product"
                ctx.fillStyle = '#ffd43b';
                ctx.font = '11px -apple-system, sans-serif';
                ctx.fillText('Product', triTopX, triTopY - circR - 10);

                // Factor A at bottom-left (in a circle)
                ctx.fillStyle = '#58a6ff' + '33';
                ctx.beginPath();
                ctx.arc(triLeftX, triLeftY + 5, circR + 4, 0, Math.PI * 2);
                ctx.fill();
                ctx.fillStyle = '#1a1a40';
                ctx.strokeStyle = '#58a6ff';
                ctx.lineWidth = 3;
                ctx.beginPath();
                ctx.arc(triLeftX, triLeftY + 5, circR, 0, Math.PI * 2);
                ctx.fill();
                ctx.stroke();
                ctx.fillStyle = '#58a6ff';
                ctx.font = 'bold 24px -apple-system, sans-serif';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(factorA, triLeftX, triLeftY + 5);

                ctx.fillStyle = '#58a6ff';
                ctx.font = '11px -apple-system, sans-serif';
                ctx.fillText('Factor', triLeftX, triLeftY + circR + 16);

                // Factor B at bottom-right (in a circle)
                ctx.fillStyle = '#ffa94d' + '33';
                ctx.beginPath();
                ctx.arc(triRightX, triRightY + 5, circR + 4, 0, Math.PI * 2);
                ctx.fill();
                ctx.fillStyle = '#1a1a40';
                ctx.strokeStyle = '#ffa94d';
                ctx.lineWidth = 3;
                ctx.beginPath();
                ctx.arc(triRightX, triRightY + 5, circR, 0, Math.PI * 2);
                ctx.fill();
                ctx.stroke();
                ctx.fillStyle = '#ffa94d';
                ctx.font = 'bold 24px -apple-system, sans-serif';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(factorB, triRightX, triRightY + 5);

                ctx.fillStyle = '#ffa94d';
                ctx.font = '11px -apple-system, sans-serif';
                ctx.fillText('Factor', triRightX, triRightY + circR + 16);

                // Four facts area
                var factsY = 280;
                var factBoxW = 240;
                var factBoxH = 44;
                var gap = 14;

                // Multiplication facts
                drawFactBox(W / 2 - factBoxW - gap / 2, factsY, factBoxW, factBoxH,
                    factorA + ' \u00D7 ' + factorB + ' = ' + product,
                    '#3fb950', '#3fb950' + '18');

                drawFactBox(W / 2 + gap / 2, factsY, factBoxW, factBoxH,
                    factorB + ' \u00D7 ' + factorA + ' = ' + product,
                    '#3fb9a0', '#3fb9a0' + '18');

                // Division facts
                drawFactBox(W / 2 - factBoxW - gap / 2, factsY + factBoxH + 10, factBoxW, factBoxH,
                    product + ' \u00F7 ' + factorA + ' = ' + factorB,
                    '#58a6ff', '#58a6ff' + '18');

                drawFactBox(W / 2 + gap / 2, factsY + factBoxH + 10, factBoxW, factBoxH,
                    product + ' \u00F7 ' + factorB + ' = ' + factorA,
                    '#ffa94d', '#ffa94d' + '18');

                // Title
                ctx.fillStyle = '#f0f6fc';
                ctx.font = 'bold 13px -apple-system, sans-serif';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'top';
                ctx.fillText('Fact Family for ' + factorA + ', ' + factorB + ', and ' + product, W / 2, factsY - 22);
            }

            function drawFactBox(x, y, w, h, text, color, bgColor) {
                ctx.fillStyle = bgColor;
                ctx.strokeStyle = color;
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.roundRect(x, y, w, h, 8);
                ctx.fill();
                ctx.stroke();

                ctx.fillStyle = color;
                ctx.font = 'bold 18px -apple-system, sans-serif';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(text, x + w / 2, y + h / 2);
            }

            viz.animate(function(t) {
                animTime = t / 1000;
                draw();
            });

            return viz;
        }
    }
];

// ============================================================
// Section 4: Remainders — "Leftover Candies"
// ============================================================
window.EXTRA_VIZ['ch04']['ch04-sec04'] = [
    {
        id: 'ch04-extra-viz-4',
        title: 'Leftover Candies: Understanding Remainders',
        description: 'Deal out candies to friends like dealing cards. Watch what happens when they cannot be shared equally!',
        setup: function(container, controls) {
            var viz = new VizEngine(container, { width: 560, height: 400, scale: 1, originX: 0, originY: 0 });
            var ctx = viz.ctx;
            var W = viz.width, H = viz.height;

            var totalCandies = 17;
            var numFriends = 5;
            var animProgress = 0;
            var animating = false;
            var animStartTime = 0;

            var candyEmojis = [
                '#ff6b6b', '#ff922b', '#fcc419', '#51cf66',
                '#22b8cf', '#5c7cfa', '#be4bdb', '#f06595',
                '#e64980', '#20c997'
            ];

            VizEngine.createSlider(controls, 'Candies', 1, 30, totalCandies, 1, function(v) {
                totalCandies = Math.round(v);
                animProgress = 0;
                animating = false;
                draw();
            });

            VizEngine.createSlider(controls, 'Friends', 2, 8, numFriends, 1, function(v) {
                numFriends = Math.round(v);
                animProgress = 0;
                animating = false;
                draw();
            });

            var animBtn = VizEngine.createButton(controls, 'Deal Candies!', function() {
                animProgress = 0;
                animating = true;
                animStartTime = performance.now();
            });
            animBtn.style.background = '#f06595';
            animBtn.style.color = '#fff';
            animBtn.style.fontWeight = 'bold';
            animBtn.style.border = 'none';
            animBtn.style.padding = '6px 16px';
            animBtn.style.borderRadius = '6px';

            function drawCandy(cx, cy, colorIdx, size) {
                var color = candyEmojis[colorIdx % candyEmojis.length];
                // Wrapped candy shape
                var r = size;

                // Candy body (rounded rectangle-ish)
                ctx.fillStyle = color;
                ctx.beginPath();
                ctx.ellipse(cx, cy, r, r * 0.7, 0, 0, Math.PI * 2);
                ctx.fill();

                // Wrapper twist left
                ctx.strokeStyle = color;
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(cx - r, cy);
                ctx.lineTo(cx - r - 4, cy - 3);
                ctx.lineTo(cx - r - 4, cy + 3);
                ctx.stroke();

                // Wrapper twist right
                ctx.beginPath();
                ctx.moveTo(cx + r, cy);
                ctx.lineTo(cx + r + 4, cy - 3);
                ctx.lineTo(cx + r + 4, cy + 3);
                ctx.stroke();

                // Shine
                ctx.fillStyle = '#ffffff55';
                ctx.beginPath();
                ctx.ellipse(cx - r * 0.2, cy - r * 0.15, r * 0.25, r * 0.15, -0.3, 0, Math.PI * 2);
                ctx.fill();
            }

            function draw() {
                ctx.fillStyle = '#0c0c20';
                ctx.fillRect(0, 0, W, H);

                var quotient = Math.floor(totalCandies / numFriends);
                var remainder = totalCandies % numFriends;
                var candiesToDeal = quotient * numFriends; // candies that can be shared
                var itemsToShow = animating ? Math.min(Math.floor(animProgress), totalCandies) : totalCandies;

                // Title
                ctx.fillStyle = '#f0f6fc';
                ctx.font = 'bold 16px -apple-system, sans-serif';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'top';
                ctx.fillText(totalCandies + ' candies for ' + numFriends + ' friends', W / 2, 8);

                // Friend plates
                var plateAreaTop = 48;
                var plateAreaBottom = H - 75;
                var plateHeight = plateAreaBottom - plateAreaTop;
                var plateWidth = Math.min(65, (W - 40) / numFriends - 8);
                var totalPlatesWidth = numFriends * plateWidth + (numFriends - 1) * 8;
                var startX = (W - totalPlatesWidth) / 2;

                // Draw friend plates
                for (var f = 0; f < numFriends; f++) {
                    var fx = startX + f * (plateWidth + 8);

                    // Plate (oval)
                    ctx.fillStyle = '#1e1e4a';
                    ctx.strokeStyle = '#4a4a7a';
                    ctx.lineWidth = 2;
                    ctx.beginPath();
                    ctx.roundRect(fx, plateAreaTop, plateWidth, plateHeight, 10);
                    ctx.fill();
                    ctx.stroke();

                    // Friend face emoji
                    ctx.font = '18px -apple-system, sans-serif';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'top';
                    var faces = ['\u{1F466}', '\u{1F467}', '\u{1F9D1}', '\u{1F468}', '\u{1F469}', '\u{1F476}', '\u{1F474}', '\u{1F475}'];
                    ctx.fillText(faces[f % faces.length], fx + plateWidth / 2, plateAreaTop + 4);

                    // Friend label
                    ctx.fillStyle = '#8b949e';
                    ctx.font = '10px -apple-system, sans-serif';
                    ctx.fillText('Friend ' + (f + 1), fx + plateWidth / 2, plateAreaTop + 26);
                }

                // Distribute candies round-robin
                var friendCounts = [];
                for (var f = 0; f < numFriends; f++) friendCounts.push(0);

                var dealtCount = Math.min(itemsToShow, candiesToDeal);
                for (var i = 0; i < dealtCount; i++) {
                    var targetFriend = i % numFriends;
                    var posInFriend = friendCounts[targetFriend];
                    friendCounts[targetFriend]++;

                    var fx = startX + targetFriend * (plateWidth + 8);
                    var candySize = Math.min(8, (plateWidth - 16) / 3);
                    var candiesPerRow = Math.max(1, Math.floor((plateWidth - 10) / (candySize * 2 + 6)));
                    var row = Math.floor(posInFriend / candiesPerRow);
                    var col = posInFriend % candiesPerRow;

                    var cx = fx + 10 + col * (candySize * 2 + 6) + candySize;
                    var cy = plateAreaTop + 44 + row * (candySize * 2 + 4) + candySize;

                    drawCandy(cx, cy, i, candySize);
                }

                // Count labels under plates
                ctx.font = 'bold 12px -apple-system, sans-serif';
                ctx.textBaseline = 'bottom';
                for (var f = 0; f < numFriends; f++) {
                    var fx = startX + f * (plateWidth + 8);
                    ctx.fillStyle = '#3fb9a0';
                    ctx.textAlign = 'center';
                    ctx.fillText(friendCounts[f], fx + plateWidth / 2, plateAreaBottom - 2);
                }

                // Remainder area
                var remAreaY = plateAreaBottom + 8;
                var leftoverCount = 0;
                if (itemsToShow > candiesToDeal) {
                    leftoverCount = itemsToShow - candiesToDeal;
                }

                if (remainder > 0) {
                    // Remainder box
                    var remBoxW = Math.max(remainder * 30 + 30, 100);
                    var remBoxX = W / 2 - remBoxW / 2;
                    var remBoxH = 36;

                    ctx.fillStyle = '#f85149' + '1a';
                    ctx.strokeStyle = '#f85149';
                    ctx.lineWidth = 2;
                    ctx.setLineDash([5, 5]);
                    ctx.beginPath();
                    ctx.roundRect(remBoxX, remAreaY, remBoxW, remBoxH, 8);
                    ctx.fill();
                    ctx.stroke();
                    ctx.setLineDash([]);

                    // Draw leftover candies in remainder box
                    for (var r = 0; r < leftoverCount; r++) {
                        var idx = candiesToDeal + r;
                        var rcx = remBoxX + 20 + r * 28;
                        var rcy = remAreaY + remBoxH / 2;
                        drawCandy(rcx, rcy, idx, 7);
                    }

                    // Remainder label
                    ctx.fillStyle = '#f85149';
                    ctx.font = 'bold 11px -apple-system, sans-serif';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'top';
                    ctx.fillText('Leftovers: ' + ((!animating || itemsToShow >= totalCandies) ? remainder : leftoverCount), W / 2, remAreaY + remBoxH + 3);
                }

                // Waiting candies (not yet dealt)
                if (animating && itemsToShow < totalCandies) {
                    var waiting = totalCandies - itemsToShow;
                    ctx.fillStyle = '#8b949e';
                    ctx.font = '11px -apple-system, sans-serif';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'bottom';
                    ctx.fillText(waiting + ' candies waiting...', W / 2, plateAreaTop - 2);
                }

                // Result
                ctx.font = 'bold 14px -apple-system, sans-serif';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'bottom';
                if (!animating || itemsToShow >= totalCandies) {
                    if (remainder === 0) {
                        ctx.fillStyle = '#3fb950';
                        ctx.fillText('Each friend gets ' + quotient + ' candies! None left over!', W / 2, H - 6);
                    } else {
                        ctx.fillStyle = '#ffa94d';
                        ctx.fillText('Each friend gets ' + quotient + ' candies. ' + remainder + ' left over!', W / 2, H - 6);
                    }
                } else {
                    ctx.fillStyle = '#58a6ff';
                    ctx.fillText('Dealing... ' + itemsToShow + ' / ' + totalCandies, W / 2, H - 6);
                }
            }

            viz.animate(function(t) {
                if (animating) {
                    var elapsed = (t - animStartTime) / 1000;
                    animProgress = elapsed * 6; // 6 candies per second
                    if (animProgress >= totalCandies) {
                        animProgress = totalCandies;
                        animating = false;
                    }
                }
                draw();
            });

            return viz;
        }
    }
];

// ============================================================
// Section 5: Long Division — Step-by-Step Animator
// ============================================================
window.EXTRA_VIZ['ch04']['ch04-sec05'] = [
    {
        id: 'ch04-extra-viz-5',
        title: 'Long Division: Step by Step',
        description: 'Walk through long division one step at a time. Press "Next Step" to see divide, multiply, subtract, and bring down.',
        setup: function(container, controls) {
            var viz = new VizEngine(container, { width: 560, height: 400, scale: 1, originX: 0, originY: 0 });
            var ctx = viz.ctx;
            var W = viz.width, H = viz.height;

            var dividend = 84;
            var divisor = 3;
            var currentStep = 0;
            var steps = [];

            VizEngine.createSlider(controls, 'Dividend', 10, 99, dividend, 1, function(v) {
                dividend = Math.round(v);
                currentStep = 0;
                computeSteps();
                draw();
            });

            VizEngine.createSlider(controls, 'Divisor', 2, 9, divisor, 1, function(v) {
                divisor = Math.round(v);
                currentStep = 0;
                computeSteps();
                draw();
            });

            var nextBtn = VizEngine.createButton(controls, 'Next Step \u25B6', function() {
                if (currentStep < steps.length) {
                    currentStep++;
                    draw();
                }
            });
            nextBtn.style.background = '#bc8cff';
            nextBtn.style.color = '#fff';
            nextBtn.style.fontWeight = 'bold';
            nextBtn.style.border = 'none';
            nextBtn.style.padding = '6px 16px';
            nextBtn.style.borderRadius = '6px';

            var resetBtn = VizEngine.createButton(controls, 'Reset', function() {
                currentStep = 0;
                draw();
            });
            resetBtn.style.background = '#1a1a40';
            resetBtn.style.color = '#c9d1d9';
            resetBtn.style.border = '1px solid #30363d';
            resetBtn.style.padding = '6px 14px';
            resetBtn.style.borderRadius = '6px';

            // Compute the long division steps
            function computeSteps() {
                steps = [];
                var digits = dividend.toString().split('').map(Number);
                var carry = 0;

                for (var i = 0; i < digits.length; i++) {
                    var current = carry * 10 + digits[i];

                    // Step: Bring down (except for first digit, which is implicit)
                    if (i > 0) {
                        steps.push({
                            type: 'bring_down',
                            digitIndex: i,
                            digit: digits[i],
                            currentValue: current,
                            description: 'Bring down the ' + digits[i] + '. Now we have ' + current + '.'
                        });
                    } else {
                        steps.push({
                            type: 'start',
                            digitIndex: 0,
                            digit: digits[0],
                            currentValue: current,
                            description: 'Start with the first digit: ' + current + '.'
                        });
                    }

                    // Step: Divide
                    var quotientDigit = Math.floor(current / divisor);
                    steps.push({
                        type: 'divide',
                        digitIndex: i,
                        currentValue: current,
                        quotientDigit: quotientDigit,
                        description: divisor + ' goes into ' + current + ' exactly ' + quotientDigit + ' time' + (quotientDigit !== 1 ? 's' : '') + '.'
                    });

                    // Step: Multiply
                    var product = quotientDigit * divisor;
                    steps.push({
                        type: 'multiply',
                        digitIndex: i,
                        quotientDigit: quotientDigit,
                        product: product,
                        description: quotientDigit + ' \u00D7 ' + divisor + ' = ' + product
                    });

                    // Step: Subtract
                    var diff = current - product;
                    steps.push({
                        type: 'subtract',
                        digitIndex: i,
                        currentValue: current,
                        product: product,
                        diff: diff,
                        description: current + ' \u2212 ' + product + ' = ' + diff
                    });

                    carry = diff;
                }
            }

            computeSteps();

            function draw() {
                ctx.fillStyle = '#0c0c20';
                ctx.fillRect(0, 0, W, H);

                var digits = dividend.toString().split('').map(Number);
                var numDigits = digits.length;
                var quotient = Math.floor(dividend / divisor);
                var remainder = dividend % divisor;
                var qDigits = quotient.toString().split('').map(Number);

                // Layout
                var fontSize = 32;
                var charW = 28;
                var baseX = W / 2 - (numDigits * charW) / 2 + 30;
                var baseY = 90;

                ctx.font = 'bold ' + fontSize + 'px "Courier New", monospace';
                ctx.textBaseline = 'top';

                // Draw the long division bracket
                // Divisor
                ctx.fillStyle = '#58a6ff';
                ctx.textAlign = 'right';
                ctx.fillText(divisor, baseX - 12, baseY);

                // Division bracket (the "house")
                ctx.strokeStyle = '#f0f6fc';
                ctx.lineWidth = 3;
                ctx.beginPath();
                // Vertical line
                ctx.moveTo(baseX - 6, baseY - 4);
                ctx.lineTo(baseX - 6, baseY + fontSize + 4);
                // Horizontal line over dividend
                ctx.moveTo(baseX - 6, baseY - 4);
                ctx.lineTo(baseX + numDigits * charW + 6, baseY - 4);
                ctx.stroke();

                // Dividend digits
                ctx.textAlign = 'center';
                for (var d = 0; d < numDigits; d++) {
                    ctx.fillStyle = '#f0f6fc';
                    ctx.fillText(digits[d], baseX + d * charW + charW / 2, baseY);
                }

                // Now draw the steps that have been revealed
                // Track state as we go through steps
                var carry = 0;
                var quotientSoFar = [];
                var workLines = []; // {y, leftText, rightText, color, type}
                var currentWorkY = baseY + fontSize + 16;
                var highlightStep = currentStep - 1; // index of the step being highlighted
                var lastStepType = '';

                for (var s = 0; s < currentStep && s < steps.length; s++) {
                    var step = steps[s];
                    var isActive = (s === highlightStep);

                    if (step.type === 'start' || step.type === 'bring_down') {
                        // We'll show bring-down arrows later
                        carry = step.currentValue;
                    }

                    if (step.type === 'divide') {
                        quotientSoFar.push({ digit: step.quotientDigit, pos: step.digitIndex });
                    }

                    if (step.type === 'multiply') {
                        // Draw the product below current value
                        var prodStr = step.product.toString();
                        var prodX = baseX + step.digitIndex * charW + charW / 2;

                        ctx.fillStyle = isActive ? '#ffa94d' : '#ffa94d' + 'aa';
                        ctx.font = 'bold ' + fontSize + 'px "Courier New", monospace';
                        ctx.textAlign = 'center';

                        // Right-align the product under the current working digit
                        for (var p = prodStr.length - 1; p >= 0; p--) {
                            var pOffset = step.digitIndex - (prodStr.length - 1 - p);
                            ctx.fillText(prodStr[p], baseX + pOffset * charW + charW / 2, currentWorkY);
                        }

                        // Draw minus sign
                        ctx.fillStyle = isActive ? '#f85149' : '#f85149' + 'aa';
                        ctx.textAlign = 'right';
                        ctx.fillText('\u2212', baseX + (step.digitIndex - prodStr.length + 1) * charW - 4, currentWorkY);

                        lastStepType = 'multiply';
                    }

                    if (step.type === 'subtract') {
                        // Draw subtraction line
                        var lineStartX = baseX + (step.digitIndex - 1) * charW;
                        var lineEndX = baseX + (step.digitIndex + 1) * charW;
                        var lineY = currentWorkY + fontSize + 4;

                        ctx.strokeStyle = isActive ? '#f0f6fc' : '#4a4a7a';
                        ctx.lineWidth = 2;
                        ctx.beginPath();
                        ctx.moveTo(lineStartX, lineY);
                        ctx.lineTo(lineEndX, lineY);
                        ctx.stroke();

                        // Draw the difference
                        var diffStr = step.diff.toString();
                        currentWorkY = lineY + 6;
                        ctx.fillStyle = isActive ? '#3fb950' : '#3fb950' + 'aa';
                        ctx.font = 'bold ' + fontSize + 'px "Courier New", monospace';
                        ctx.textAlign = 'center';
                        for (var p = diffStr.length - 1; p >= 0; p--) {
                            var pOffset = step.digitIndex - (diffStr.length - 1 - p);
                            ctx.fillText(diffStr[p], baseX + pOffset * charW + charW / 2, currentWorkY);
                        }

                        carry = step.diff;
                        lastStepType = 'subtract';
                    }
                }

                // Draw quotient digits on top
                ctx.font = 'bold ' + fontSize + 'px "Courier New", monospace';
                ctx.textAlign = 'center';
                for (var q = 0; q < quotientSoFar.length; q++) {
                    var qEntry = quotientSoFar[q];
                    var isLatest = (q === quotientSoFar.length - 1) && (steps[highlightStep] && steps[highlightStep].type === 'divide');
                    ctx.fillStyle = isLatest ? '#ffd43b' : '#3fb9a0';
                    ctx.fillText(qEntry.digit, baseX + qEntry.pos * charW + charW / 2, baseY - fontSize - 8);
                }

                // Draw bring-down arrows
                for (var s = 0; s < currentStep && s < steps.length; s++) {
                    var step = steps[s];
                    if (step.type === 'bring_down') {
                        var arrowX = baseX + step.digitIndex * charW + charW / 2;
                        var isActive = (s === highlightStep);
                        ctx.strokeStyle = isActive ? '#ffd43b' : '#ffd43b66';
                        ctx.lineWidth = 2;
                        ctx.setLineDash([4, 3]);
                        ctx.beginPath();
                        ctx.moveTo(arrowX, baseY + fontSize + 2);
                        ctx.lineTo(arrowX, currentWorkY > baseY + fontSize + 30 ? currentWorkY - fontSize : baseY + fontSize + 30);
                        ctx.stroke();
                        ctx.setLineDash([]);

                        // Arrow head
                        var arrowEndY = currentWorkY > baseY + fontSize + 30 ? currentWorkY - fontSize : baseY + fontSize + 30;
                        ctx.fillStyle = isActive ? '#ffd43b' : '#ffd43b66';
                        ctx.beginPath();
                        ctx.moveTo(arrowX, arrowEndY + 4);
                        ctx.lineTo(arrowX - 4, arrowEndY - 4);
                        ctx.lineTo(arrowX + 4, arrowEndY - 4);
                        ctx.closePath();
                        ctx.fill();
                    }
                }

                // Step description box
                var descY = H - 70;
                ctx.fillStyle = '#14142e';
                ctx.strokeStyle = '#30363d';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.roundRect(20, descY, W - 40, 60, 8);
                ctx.fill();
                ctx.stroke();

                if (currentStep > 0 && currentStep <= steps.length) {
                    var activeStep = steps[currentStep - 1];
                    var stepColor = '#f0f6fc';
                    var stepLabel = '';
                    if (activeStep.type === 'start') { stepColor = '#58a6ff'; stepLabel = 'START'; }
                    else if (activeStep.type === 'bring_down') { stepColor = '#ffd43b'; stepLabel = 'BRING DOWN'; }
                    else if (activeStep.type === 'divide') { stepColor = '#3fb9a0'; stepLabel = 'DIVIDE'; }
                    else if (activeStep.type === 'multiply') { stepColor = '#ffa94d'; stepLabel = 'MULTIPLY'; }
                    else if (activeStep.type === 'subtract') { stepColor = '#3fb950'; stepLabel = 'SUBTRACT'; }

                    // Step label badge
                    ctx.fillStyle = stepColor + '33';
                    ctx.beginPath();
                    ctx.roundRect(30, descY + 8, stepLabel.length * 10 + 16, 20, 4);
                    ctx.fill();
                    ctx.fillStyle = stepColor;
                    ctx.font = 'bold 11px -apple-system, sans-serif';
                    ctx.textAlign = 'left';
                    ctx.textBaseline = 'middle';
                    ctx.fillText(stepLabel, 38, descY + 18);

                    // Description text
                    ctx.fillStyle = '#f0f6fc';
                    ctx.font = '14px -apple-system, sans-serif';
                    ctx.textAlign = 'left';
                    ctx.textBaseline = 'middle';
                    ctx.fillText(activeStep.description, 30, descY + 44);
                } else if (currentStep === 0) {
                    ctx.fillStyle = '#8b949e';
                    ctx.font = '14px -apple-system, sans-serif';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.fillText('Press "Next Step" to begin!', W / 2, descY + 30);
                } else {
                    // Done!
                    ctx.fillStyle = '#3fb950';
                    ctx.font = 'bold 14px -apple-system, sans-serif';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    if (remainder === 0) {
                        ctx.fillText('Done! ' + dividend + ' \u00F7 ' + divisor + ' = ' + quotient + ' (exact!)', W / 2, descY + 22);
                    } else {
                        ctx.fillText('Done! ' + dividend + ' \u00F7 ' + divisor + ' = ' + quotient + ' R ' + remainder, W / 2, descY + 22);
                    }
                    ctx.fillStyle = '#8b949e';
                    ctx.font = '12px -apple-system, sans-serif';
                    ctx.fillText('That means ' + dividend + ' = ' + divisor + ' \u00D7 ' + quotient + (remainder > 0 ? ' + ' + remainder : ''), W / 2, descY + 44);
                }

                // Progress indicator
                ctx.fillStyle = '#4a4a7a';
                ctx.font = '11px -apple-system, sans-serif';
                ctx.textAlign = 'right';
                ctx.textBaseline = 'bottom';
                ctx.fillText('Step ' + currentStep + ' / ' + steps.length, W - 20, descY - 6);

                // Progress bar
                var progBarW = 120;
                var progBarX = W - 20 - progBarW;
                var progBarY = descY - 16;
                ctx.fillStyle = '#1a1a40';
                ctx.beginPath();
                ctx.roundRect(progBarX, progBarY, progBarW, 6, 3);
                ctx.fill();
                var progFill = steps.length > 0 ? (currentStep / steps.length) : 0;
                if (progFill > 0) {
                    ctx.fillStyle = '#bc8cff';
                    ctx.beginPath();
                    ctx.roundRect(progBarX, progBarY, progBarW * progFill, 6, 3);
                    ctx.fill();
                }

                // Update button state
                if (currentStep >= steps.length) {
                    nextBtn.disabled = true;
                    nextBtn.style.opacity = '0.4';
                } else {
                    nextBtn.disabled = false;
                    nextBtn.style.opacity = '1';
                }
            }

            draw();
            return viz;
        }
    }
];
