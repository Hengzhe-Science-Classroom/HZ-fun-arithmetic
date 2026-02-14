// === Chapter 3: Multiplication Magic - Extra Visualizations ===
// Fun, colorful, interactive visualizations for elementary multiplication concepts.
window.EXTRA_VIZ = window.EXTRA_VIZ || {};
window.EXTRA_VIZ['ch03'] = window.EXTRA_VIZ['ch03'] || {};

// ============================================================
// Visualization 1 — sec01: "What Is Multiplication?"
// "Groups of" visualizer with animated groups appearing one by one.
// ============================================================
window.EXTRA_VIZ['ch03']['ch03-sec01'] = window.EXTRA_VIZ['ch03']['ch03-sec01'] || [];
window.EXTRA_VIZ['ch03']['ch03-sec01'].push({
    id: 'ch03-extra-viz-1',
    title: 'Groups Of — See Multiplication in Action!',
    description: 'Use the sliders to choose how many groups and how many items in each group. Watch the groups appear one by one!',
    setup: function(container, controls) {
        var viz = new VizEngine(container, { width: 560, height: 400, scale: 40, originX: 280, originY: 360 });
        var ctx = viz.ctx;

        var numGroups = 3;
        var itemsPerGroup = 4;
        var animProgress = 0;
        var animating = false;
        var animId = null;

        var groupColors = [
            viz.colors.blue, viz.colors.orange, viz.colors.green,
            viz.colors.purple, viz.colors.pink, viz.colors.teal,
            viz.colors.yellow, viz.colors.red, '#58a6ff', '#f0883e'
        ];

        var groupSlider = VizEngine.createSlider(controls, 'Groups:', 1, 10, numGroups, 1, function(val) {
            numGroups = Math.round(val);
            startAnimation();
        });
        groupSlider.step = 1;

        var itemSlider = VizEngine.createSlider(controls, 'Items per group:', 1, 10, itemsPerGroup, 1, function(val) {
            itemsPerGroup = Math.round(val);
            startAnimation();
        });
        itemSlider.step = 1;

        var animateBtn = document.createElement('button');
        animateBtn.textContent = 'Replay Animation';
        animateBtn.style.cssText = 'padding:6px 16px;border:2px solid #58a6ff;border-radius:8px;background:#1a1a40;color:#58a6ff;font-size:0.85rem;cursor:pointer;font-weight:bold;margin-left:8px;';
        animateBtn.addEventListener('click', function() { startAnimation(); });
        controls.appendChild(animateBtn);

        function startAnimation() {
            animProgress = 0;
            animating = true;
            if (animId) cancelAnimationFrame(animId);
            runAnimation();
        }

        function runAnimation() {
            animProgress += 0.025;
            if (animProgress >= 1) {
                animProgress = 1;
                animating = false;
            }
            draw();
            if (animating) {
                animId = requestAnimationFrame(runAnimation);
            }
        }

        function draw() {
            viz.clear();
            ctx.fillStyle = '#0c0c20';
            ctx.fillRect(0, 0, viz.width, viz.height);

            var totalItems = numGroups * itemsPerGroup;
            var groupsToShow = Math.min(numGroups, Math.floor(animProgress * numGroups) + 1);
            var currentGroupFraction = (animProgress * numGroups) - Math.floor(animProgress * numGroups);
            if (animProgress >= 1) {
                groupsToShow = numGroups;
                currentGroupFraction = 1;
            }

            // Layout: figure out spacing
            var circleR = Math.min(16, Math.max(8, 200 / (numGroups * itemsPerGroup)));
            var itemSpacing = circleR * 2.6;
            var groupWidth = itemsPerGroup * itemSpacing;
            var groupSpacing = Math.min(20, (viz.width - numGroups * groupWidth) / (numGroups + 1));
            if (groupSpacing < 6) groupSpacing = 6;
            var totalWidth = numGroups * groupWidth + (numGroups - 1) * groupSpacing;
            var startX = (viz.width - totalWidth) / 2;

            // Title at top
            ctx.fillStyle = viz.colors.white;
            ctx.font = 'bold 20px -apple-system, sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'top';
            ctx.fillText('Groups Of', viz.width / 2, 10);

            // Draw groups
            var visibleCount = 0;
            for (var g = 0; g < numGroups; g++) {
                var gx = startX + g * (groupWidth + groupSpacing);
                var color = groupColors[g % groupColors.length];

                var thisGroupItems = itemsPerGroup;
                var alpha = 1;
                if (g < groupsToShow - 1) {
                    alpha = 1;
                } else if (g === groupsToShow - 1) {
                    alpha = animProgress >= 1 ? 1 : currentGroupFraction;
                } else {
                    continue;
                }

                // Draw group background
                ctx.fillStyle = color + Math.round(alpha * 0.15 * 255).toString(16).padStart(2, '0');
                ctx.strokeStyle = color + Math.round(alpha * 0.6 * 255).toString(16).padStart(2, '0');
                ctx.lineWidth = 2;
                var bgPad = 6;
                var cols = Math.min(itemsPerGroup, 5);
                var rows = Math.ceil(itemsPerGroup / cols);
                var bgW = cols * itemSpacing + bgPad * 2;
                var bgH = rows * itemSpacing + bgPad * 2;
                var bgX = gx + (groupWidth - bgW) / 2;
                var bgY = 70;

                // Rounded rect
                var rr = 10;
                ctx.beginPath();
                ctx.moveTo(bgX + rr, bgY);
                ctx.lineTo(bgX + bgW - rr, bgY);
                ctx.quadraticCurveTo(bgX + bgW, bgY, bgX + bgW, bgY + rr);
                ctx.lineTo(bgX + bgW, bgY + bgH - rr);
                ctx.quadraticCurveTo(bgX + bgW, bgY + bgH, bgX + bgW - rr, bgY + bgH);
                ctx.lineTo(bgX + rr, bgY + bgH);
                ctx.quadraticCurveTo(bgX, bgY + bgH, bgX, bgY + bgH - rr);
                ctx.lineTo(bgX, bgY + rr);
                ctx.quadraticCurveTo(bgX, bgY, bgX + rr, bgY);
                ctx.closePath();
                ctx.fill();
                ctx.stroke();

                // Draw items in this group
                for (var i = 0; i < itemsPerGroup; i++) {
                    var col = i % cols;
                    var row = Math.floor(i / cols);
                    var cx = bgX + bgPad + col * itemSpacing + itemSpacing / 2;
                    var cy = bgY + bgPad + row * itemSpacing + itemSpacing / 2;

                    // Bouncy entrance
                    var itemAlpha = alpha;
                    var scale = 1;
                    if (g === groupsToShow - 1 && animProgress < 1) {
                        var itemFrac = currentGroupFraction * itemsPerGroup - i;
                        itemFrac = Math.max(0, Math.min(1, itemFrac));
                        itemAlpha = itemFrac;
                        scale = itemFrac < 1 ? 0.5 + 0.5 * itemFrac : 1;
                    }

                    if (itemAlpha > 0.01) {
                        var r = circleR * scale;
                        // Outer glow
                        ctx.fillStyle = color + Math.round(itemAlpha * 0.3 * 255).toString(16).padStart(2, '0');
                        ctx.beginPath();
                        ctx.arc(cx, cy, r + 3, 0, Math.PI * 2);
                        ctx.fill();
                        // Main circle
                        ctx.fillStyle = color + Math.round(itemAlpha * 255).toString(16).padStart(2, '0');
                        ctx.beginPath();
                        ctx.arc(cx, cy, r, 0, Math.PI * 2);
                        ctx.fill();
                        // Shine
                        ctx.fillStyle = '#ffffff' + Math.round(itemAlpha * 0.4 * 255).toString(16).padStart(2, '0');
                        ctx.beginPath();
                        ctx.arc(cx - r * 0.25, cy - r * 0.25, r * 0.35, 0, Math.PI * 2);
                        ctx.fill();

                        visibleCount++;
                    }
                }

                // Group label
                ctx.fillStyle = color + Math.round(alpha * 255).toString(16).padStart(2, '0');
                ctx.font = 'bold 13px -apple-system, sans-serif';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'top';
                ctx.fillText('Group ' + (g + 1), bgX + bgW / 2, bgY + bgH + 6);
            }

            // Equation area
            var eqY = 300;
            ctx.textBaseline = 'middle';

            // Repeated addition
            ctx.fillStyle = viz.colors.teal;
            ctx.font = 'bold 15px -apple-system, sans-serif';
            ctx.textAlign = 'center';
            var addStr = '';
            for (var a = 0; a < numGroups; a++) {
                if (a > 0) addStr += ' + ';
                addStr += itemsPerGroup;
            }
            addStr += ' = ' + totalItems;
            if (numGroups <= 6) {
                ctx.fillText(addStr, viz.width / 2, eqY);
            } else {
                ctx.fillText(itemsPerGroup + ' + ' + itemsPerGroup + ' + ... + ' + itemsPerGroup + ' (' + numGroups + ' times) = ' + totalItems, viz.width / 2, eqY);
            }

            // Multiplication equation
            ctx.fillStyle = viz.colors.yellow;
            ctx.font = 'bold 22px -apple-system, sans-serif';
            ctx.fillText(numGroups + ' \u00D7 ' + itemsPerGroup + ' = ' + totalItems, viz.width / 2, eqY + 38);

            // Fun label
            ctx.fillStyle = viz.colors.pink;
            ctx.font = 'bold 14px -apple-system, sans-serif';
            ctx.fillText(numGroups + ' groups of ' + itemsPerGroup + ' = ' + totalItems + ' total!', viz.width / 2, eqY + 70);
        }

        startAnimation();
        return viz;
    }
});

// ============================================================
// Visualization 2 — sec02: "Arrays & Area"
// Interactive array builder with commutative "Flip" button.
// ============================================================
window.EXTRA_VIZ['ch03']['ch03-sec02'] = window.EXTRA_VIZ['ch03']['ch03-sec02'] || [];
window.EXTRA_VIZ['ch03']['ch03-sec02'].push({
    id: 'ch03-extra-viz-2',
    title: 'Array Builder — Rows and Columns',
    description: 'Build arrays with dots! Hit "Flip" to see that rows \u00D7 columns = columns \u00D7 rows.',
    setup: function(container, controls) {
        var viz = new VizEngine(container, { width: 560, height: 400, scale: 40, originX: 280, originY: 200 });
        var ctx = viz.ctx;

        var rows = 3;
        var cols = 4;
        var flipping = false;
        var flipProgress = 0;
        var flipAnimId = null;

        var dotColors = [
            viz.colors.blue, viz.colors.orange, viz.colors.green,
            viz.colors.purple, viz.colors.pink, viz.colors.teal,
            viz.colors.yellow, viz.colors.red, '#58a6ff', '#f0883e'
        ];

        var rowSlider = VizEngine.createSlider(controls, 'Rows:', 1, 10, rows, 1, function(val) {
            rows = Math.round(val);
            draw();
        });
        rowSlider.step = 1;

        var colSlider = VizEngine.createSlider(controls, 'Columns:', 1, 10, cols, 1, function(val) {
            cols = Math.round(val);
            draw();
        });
        colSlider.step = 1;

        var flipBtn = document.createElement('button');
        flipBtn.textContent = 'Flip! (Swap Rows & Cols)';
        flipBtn.style.cssText = 'padding:6px 16px;border:2px solid #f0883e;border-radius:8px;background:#1a1a40;color:#f0883e;font-size:0.85rem;cursor:pointer;font-weight:bold;margin-left:8px;';
        flipBtn.addEventListener('click', function() {
            if (flipping) return;
            flipping = true;
            flipProgress = 0;
            if (flipAnimId) cancelAnimationFrame(flipAnimId);
            runFlip();
        });
        controls.appendChild(flipBtn);

        function runFlip() {
            flipProgress += 0.02;
            if (flipProgress >= 1) {
                flipProgress = 0;
                flipping = false;
                // Swap values
                var tmp = rows;
                rows = cols;
                cols = tmp;
                rowSlider.value = rows;
                colSlider.value = cols;
                // Update displayed values
                var rowValEl = rowSlider.parentNode.querySelector('.viz-slider-value');
                var colValEl = colSlider.parentNode.querySelector('.viz-slider-value');
                if (rowValEl) rowValEl.textContent = rows.toFixed(1);
                if (colValEl) colValEl.textContent = cols.toFixed(1);
                draw();
                return;
            }
            draw();
            flipAnimId = requestAnimationFrame(runFlip);
        }

        function draw() {
            viz.clear();
            ctx.fillStyle = '#0c0c20';
            ctx.fillRect(0, 0, viz.width, viz.height);

            var product = rows * cols;

            // Title
            ctx.fillStyle = viz.colors.white;
            ctx.font = 'bold 20px -apple-system, sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'top';
            ctx.fillText('Array Builder', viz.width / 2, 8);

            // Compute dot layout
            var dotR = Math.min(14, Math.max(6, 160 / Math.max(rows, cols)));
            var spacing = dotR * 2.8;
            var drawRows = rows;
            var drawCols = cols;

            if (flipping) {
                // Animate transition: each dot (r,c) moves to (c,r)
                var t = flipProgress;
                // Ease in/out
                t = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

                var maxDim = Math.max(rows, cols);
                var spacingF = Math.min(14, Math.max(6, 160 / maxDim)) * 2.8;
                var arrayW = maxDim * spacingF;
                var arrayH = maxDim * spacingF;
                var startXF = (viz.width - arrayW) / 2 + spacingF / 2;
                var startYF = 55 + spacingF / 2;

                for (var r = 0; r < rows; r++) {
                    for (var c = 0; c < cols; c++) {
                        // Start position (r,c) -> End position (c,r)
                        var sx = startXF + c * spacingF;
                        var sy = startYF + r * spacingF;
                        var ex = startXF + r * spacingF;
                        var ey = startYF + c * spacingF;

                        var px = sx + (ex - sx) * t;
                        var py = sy + (ey - sy) * t;

                        var color = dotColors[r % dotColors.length];

                        // Glow
                        ctx.fillStyle = color + '44';
                        ctx.beginPath();
                        ctx.arc(px, py, dotR + 2, 0, Math.PI * 2);
                        ctx.fill();
                        // Dot
                        ctx.fillStyle = color;
                        ctx.beginPath();
                        ctx.arc(px, py, dotR, 0, Math.PI * 2);
                        ctx.fill();
                        // Shine
                        ctx.fillStyle = '#ffffff55';
                        ctx.beginPath();
                        ctx.arc(px - dotR * 0.2, py - dotR * 0.2, dotR * 0.3, 0, Math.PI * 2);
                        ctx.fill();
                    }
                }
            } else {
                var arrayW2 = drawCols * spacing;
                var arrayH2 = drawRows * spacing;
                var startX2 = (viz.width - arrayW2) / 2 + spacing / 2;
                var startY2 = 55 + spacing / 2;

                // Draw bracket labels
                // Row count on left
                ctx.fillStyle = viz.colors.teal;
                ctx.font = 'bold 14px -apple-system, sans-serif';
                ctx.textAlign = 'right';
                ctx.textBaseline = 'middle';
                ctx.fillText(drawRows + ' rows', startX2 - 14, startY2 + arrayH2 / 2 - spacing / 2);

                // Column count on top
                ctx.textAlign = 'center';
                ctx.textBaseline = 'bottom';
                ctx.fillText(drawCols + ' columns', startX2 + arrayW2 / 2 - spacing / 2, startY2 - 14);

                for (var r2 = 0; r2 < drawRows; r2++) {
                    for (var c2 = 0; c2 < drawCols; c2++) {
                        var cx2 = startX2 + c2 * spacing;
                        var cy2 = startY2 + r2 * spacing;
                        var color2 = dotColors[r2 % dotColors.length];

                        // Glow
                        ctx.fillStyle = color2 + '44';
                        ctx.beginPath();
                        ctx.arc(cx2, cy2, dotR + 2, 0, Math.PI * 2);
                        ctx.fill();
                        // Dot
                        ctx.fillStyle = color2;
                        ctx.beginPath();
                        ctx.arc(cx2, cy2, dotR, 0, Math.PI * 2);
                        ctx.fill();
                        // Shine
                        ctx.fillStyle = '#ffffff55';
                        ctx.beginPath();
                        ctx.arc(cx2 - dotR * 0.2, cy2 - dotR * 0.2, dotR * 0.3, 0, Math.PI * 2);
                        ctx.fill();
                    }
                }
            }

            // Equations at bottom
            var eqY = 310;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';

            ctx.fillStyle = viz.colors.yellow;
            ctx.font = 'bold 22px -apple-system, sans-serif';
            ctx.fillText(rows + ' \u00D7 ' + cols + ' = ' + product, viz.width / 2, eqY);

            // Commutative property
            ctx.fillStyle = viz.colors.green;
            ctx.font = 'bold 16px -apple-system, sans-serif';
            ctx.fillText(rows + ' \u00D7 ' + cols + ' = ' + cols + ' \u00D7 ' + rows + '  (same answer!)', viz.width / 2, eqY + 35);

            ctx.fillStyle = viz.colors.purple;
            ctx.font = 'bold 13px -apple-system, sans-serif';
            ctx.fillText('Try the Flip button to see the magic!', viz.width / 2, eqY + 65);
        }

        draw();
        return viz;
    }
});

// ============================================================
// Visualization 3 — sec03: "Times Tables"
// Interactive 10x10 multiplication table with highlights.
// ============================================================
window.EXTRA_VIZ['ch03']['ch03-sec03'] = window.EXTRA_VIZ['ch03']['ch03-sec03'] || [];
window.EXTRA_VIZ['ch03']['ch03-sec03'].push({
    id: 'ch03-extra-viz-3',
    title: 'Times Tables Explorer',
    description: 'Explore the 10\u00D710 multiplication table! Use the slider to highlight a row or column. Click any cell to highlight it. Square numbers glow on the diagonal!',
    setup: function(container, controls) {
        var viz = new VizEngine(container, { width: 560, height: 520, scale: 40, originX: 280, originY: 260 });
        var ctx = viz.ctx;

        var highlightNum = 5;
        var clickedRow = -1;
        var clickedCol = -1;

        var highlightSlider = VizEngine.createSlider(controls, 'Highlight:', 1, 10, highlightNum, 1, function(val) {
            highlightNum = Math.round(val);
            draw();
        });
        highlightSlider.step = 1;

        // Click handler on canvas
        viz.canvas.addEventListener('click', function(e) {
            var rect = viz.canvas.getBoundingClientRect();
            var mx = e.clientX - rect.left;
            var my = e.clientY - rect.top;

            var cellSize = 42;
            var tableLeft = 56;
            var tableTop = 56;

            var col = Math.floor((mx - tableLeft) / cellSize);
            var row = Math.floor((my - tableTop) / cellSize);

            if (col >= 0 && col < 10 && row >= 0 && row < 10) {
                clickedRow = row;
                clickedCol = col;
                draw();
            }
        });

        function draw() {
            viz.clear();
            ctx.fillStyle = '#0c0c20';
            ctx.fillRect(0, 0, viz.width, viz.height);

            var cellSize = 42;
            var tableLeft = 56;
            var tableTop = 56;

            // Title
            ctx.fillStyle = viz.colors.white;
            ctx.font = 'bold 18px -apple-system, sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'top';
            ctx.fillText('Multiplication Table', viz.width / 2, 6);

            // Header labels: the multiplier row and column
            ctx.font = 'bold 14px -apple-system, sans-serif';
            ctx.textBaseline = 'middle';
            ctx.textAlign = 'center';

            // The '\u00D7' header
            ctx.fillStyle = viz.colors.white;
            ctx.fillText('\u00D7', tableLeft - 20, tableTop - 20);

            for (var i = 0; i < 10; i++) {
                var num = i + 1;
                // Column headers
                var isHighlightCol = (num === highlightNum);
                ctx.fillStyle = isHighlightCol ? viz.colors.yellow : viz.colors.teal;
                ctx.font = isHighlightCol ? 'bold 15px -apple-system, sans-serif' : 'bold 13px -apple-system, sans-serif';
                ctx.fillText(num, tableLeft + i * cellSize + cellSize / 2, tableTop - 20);

                // Row headers
                var isHighlightRow = (num === highlightNum);
                ctx.fillStyle = isHighlightRow ? viz.colors.yellow : viz.colors.teal;
                ctx.font = isHighlightRow ? 'bold 15px -apple-system, sans-serif' : 'bold 13px -apple-system, sans-serif';
                ctx.textAlign = 'center';
                ctx.fillText(num, tableLeft - 20, tableTop + i * cellSize + cellSize / 2);
            }

            // Draw cells
            for (var r = 0; r < 10; r++) {
                for (var c = 0; c < 10; c++) {
                    var rn = r + 1;
                    var cn = c + 1;
                    var product = rn * cn;
                    var x = tableLeft + c * cellSize;
                    var y = tableTop + r * cellSize;

                    var isSquare = (rn === cn);
                    var isHighlighted = (rn === highlightNum || cn === highlightNum);
                    var isClicked = (r === clickedRow && c === clickedCol);
                    var isClickRow = (r === clickedRow);
                    var isClickCol = (c === clickedCol);
                    var isEven = (product % 2 === 0);

                    // Cell background
                    if (isClicked) {
                        ctx.fillStyle = viz.colors.yellow + 'cc';
                    } else if (isClickRow && clickedRow >= 0) {
                        ctx.fillStyle = viz.colors.orange + '33';
                    } else if (isClickCol && clickedCol >= 0) {
                        ctx.fillStyle = viz.colors.blue + '33';
                    } else if (isSquare) {
                        ctx.fillStyle = viz.colors.pink + '44';
                    } else if (isHighlighted) {
                        ctx.fillStyle = viz.colors.yellow + '22';
                    } else if (isEven) {
                        ctx.fillStyle = '#1a2a3a';
                    } else {
                        ctx.fillStyle = '#151525';
                    }
                    ctx.fillRect(x, y, cellSize, cellSize);

                    // Cell border
                    ctx.strokeStyle = '#2a2a4a';
                    ctx.lineWidth = 0.5;
                    ctx.strokeRect(x, y, cellSize, cellSize);

                    // Special square border
                    if (isSquare) {
                        ctx.strokeStyle = viz.colors.pink + '88';
                        ctx.lineWidth = 2;
                        ctx.strokeRect(x + 1, y + 1, cellSize - 2, cellSize - 2);
                    }

                    // Highlight border
                    if (isHighlighted) {
                        ctx.strokeStyle = viz.colors.yellow + '66';
                        ctx.lineWidth = 1.5;
                        ctx.strokeRect(x + 1, y + 1, cellSize - 2, cellSize - 2);
                    }

                    // Product text
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    if (isClicked) {
                        ctx.fillStyle = '#0c0c20';
                        ctx.font = 'bold 15px -apple-system, sans-serif';
                    } else if (isHighlighted) {
                        ctx.fillStyle = viz.colors.yellow;
                        ctx.font = 'bold 14px -apple-system, sans-serif';
                    } else if (isSquare) {
                        ctx.fillStyle = viz.colors.pink;
                        ctx.font = 'bold 13px -apple-system, sans-serif';
                    } else if (isEven) {
                        ctx.fillStyle = viz.colors.blue + 'cc';
                        ctx.font = '12px -apple-system, sans-serif';
                    } else {
                        ctx.fillStyle = viz.colors.green + 'cc';
                        ctx.font = '12px -apple-system, sans-serif';
                    }
                    ctx.fillText(product, x + cellSize / 2, y + cellSize / 2);
                }
            }

            // Legend at bottom
            var legendY = tableTop + 10 * cellSize + 14;
            ctx.font = 'bold 12px -apple-system, sans-serif';
            ctx.textAlign = 'left';
            ctx.textBaseline = 'top';

            // Square number legend
            ctx.fillStyle = viz.colors.pink;
            ctx.fillRect(tableLeft, legendY, 12, 12);
            ctx.fillStyle = viz.colors.pink;
            ctx.fillText('Square numbers (diagonal)', tableLeft + 18, legendY);

            // Even legend
            ctx.fillStyle = viz.colors.blue + 'cc';
            ctx.fillRect(tableLeft + 220, legendY, 12, 12);
            ctx.fillStyle = viz.colors.blue;
            ctx.fillText('Even products', tableLeft + 238, legendY);

            // Odd legend
            ctx.fillStyle = viz.colors.green + 'cc';
            ctx.fillRect(tableLeft + 360, legendY, 12, 12);
            ctx.fillStyle = viz.colors.green;
            ctx.fillText('Odd products', tableLeft + 378, legendY);

            // Show info about clicked cell
            if (clickedRow >= 0 && clickedCol >= 0) {
                var cr = clickedRow + 1;
                var cc2 = clickedCol + 1;
                ctx.fillStyle = viz.colors.yellow;
                ctx.font = 'bold 16px -apple-system, sans-serif';
                ctx.textAlign = 'center';
                ctx.fillText(cr + ' \u00D7 ' + cc2 + ' = ' + (cr * cc2), viz.width / 2, legendY + 28);
            }
        }

        draw();
        return viz;
    }
});

// ============================================================
// Visualization 4 — sec04: "Bigger Numbers"
// Area model for 2-digit x 1-digit multiplication.
// ============================================================
window.EXTRA_VIZ['ch03']['ch03-sec04'] = window.EXTRA_VIZ['ch03']['ch03-sec04'] || [];
window.EXTRA_VIZ['ch03']['ch03-sec04'].push({
    id: 'ch03-extra-viz-4',
    title: 'Area Model — Break It Down!',
    description: 'See how to split a big multiplication into smaller, easier parts! The rectangle shows tens and ones separately.',
    setup: function(container, controls) {
        var viz = new VizEngine(container, { width: 560, height: 400, scale: 40, originX: 280, originY: 200 });
        var ctx = viz.ctx;

        var twoDigit = 23;
        var oneDigit = 4;
        var animProgress = 0;
        var animating = false;
        var animId = null;

        var bigSlider = VizEngine.createSlider(controls, '2-digit number:', 10, 99, twoDigit, 1, function(val) {
            twoDigit = Math.round(val);
            startAnimation();
        });
        bigSlider.step = 1;

        var smallSlider = VizEngine.createSlider(controls, '1-digit number:', 2, 9, oneDigit, 1, function(val) {
            oneDigit = Math.round(val);
            startAnimation();
        });
        smallSlider.step = 1;

        var animateBtn = document.createElement('button');
        animateBtn.textContent = 'Replay';
        animateBtn.style.cssText = 'padding:6px 16px;border:2px solid #3fb950;border-radius:8px;background:#1a1a40;color:#3fb950;font-size:0.85rem;cursor:pointer;font-weight:bold;margin-left:8px;';
        animateBtn.addEventListener('click', function() { startAnimation(); });
        controls.appendChild(animateBtn);

        function startAnimation() {
            animProgress = 0;
            animating = true;
            if (animId) cancelAnimationFrame(animId);
            runAnim();
        }

        function runAnim() {
            animProgress += 0.015;
            if (animProgress >= 1) {
                animProgress = 1;
                animating = false;
            }
            draw();
            if (animating) {
                animId = requestAnimationFrame(runAnim);
            }
        }

        function draw() {
            viz.clear();
            ctx.fillStyle = '#0c0c20';
            ctx.fillRect(0, 0, viz.width, viz.height);

            var tens = Math.floor(twoDigit / 10) * 10;
            var ones = twoDigit % 10;
            var partialTens = tens * oneDigit;
            var partialOnes = ones * oneDigit;
            var total = twoDigit * oneDigit;

            // Title
            ctx.fillStyle = viz.colors.white;
            ctx.font = 'bold 20px -apple-system, sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'top';
            ctx.fillText('Area Model: ' + twoDigit + ' \u00D7 ' + oneDigit, viz.width / 2, 8);

            // Area model rectangle
            var rectLeft = 60;
            var rectTop = 60;
            var maxRectW = 420;
            var maxRectH = 160;

            // Proportional widths for tens and ones parts
            var tensWidth = (tens / twoDigit) * maxRectW;
            var onesWidth = (ones / twoDigit) * maxRectW;
            var rectH = maxRectH;

            // Animation phases: 0-0.3 = draw tens, 0.3-0.6 = draw ones, 0.6-1 = show totals
            var tensAlpha = Math.min(1, animProgress / 0.3);
            var onesAlpha = Math.min(1, Math.max(0, (animProgress - 0.3) / 0.3));
            var totalAlpha = Math.min(1, Math.max(0, (animProgress - 0.6) / 0.4));

            // Tens rectangle (blue)
            if (tensAlpha > 0) {
                var tw = tensWidth * tensAlpha;
                ctx.fillStyle = viz.colors.blue + Math.round(tensAlpha * 0.35 * 255).toString(16).padStart(2, '0');
                ctx.fillRect(rectLeft, rectTop, tw, rectH);
                ctx.strokeStyle = viz.colors.blue;
                ctx.lineWidth = 3;
                ctx.strokeRect(rectLeft, rectTop, tw, rectH);

                // Tens label inside
                if (tensAlpha > 0.5) {
                    ctx.fillStyle = viz.colors.blue;
                    ctx.font = 'bold 18px -apple-system, sans-serif';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.fillText(tens + ' \u00D7 ' + oneDigit, rectLeft + tensWidth / 2, rectTop + rectH / 2 - 14);
                    ctx.font = 'bold 24px -apple-system, sans-serif';
                    ctx.fillText('= ' + partialTens, rectLeft + tensWidth / 2, rectTop + rectH / 2 + 18);
                }
            }

            // Ones rectangle (orange)
            if (onesAlpha > 0 && ones > 0) {
                var ow = onesWidth * onesAlpha;
                ctx.fillStyle = viz.colors.orange + Math.round(onesAlpha * 0.35 * 255).toString(16).padStart(2, '0');
                ctx.fillRect(rectLeft + tensWidth, rectTop, ow, rectH);
                ctx.strokeStyle = viz.colors.orange;
                ctx.lineWidth = 3;
                ctx.strokeRect(rectLeft + tensWidth, rectTop, ow, rectH);

                // Ones label inside
                if (onesAlpha > 0.5) {
                    ctx.fillStyle = viz.colors.orange;
                    ctx.font = 'bold 18px -apple-system, sans-serif';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.fillText(ones + ' \u00D7 ' + oneDigit, rectLeft + tensWidth + onesWidth / 2, rectTop + rectH / 2 - 14);
                    ctx.font = 'bold 24px -apple-system, sans-serif';
                    ctx.fillText('= ' + partialOnes, rectLeft + tensWidth + onesWidth / 2, rectTop + rectH / 2 + 18);
                }
            }

            // Dimension labels (top and left)
            ctx.textAlign = 'center';
            ctx.textBaseline = 'bottom';

            // Top: tens part
            if (tensAlpha > 0.3) {
                ctx.fillStyle = viz.colors.blue;
                ctx.font = 'bold 16px -apple-system, sans-serif';
                ctx.fillText(tens, rectLeft + tensWidth / 2, rectTop - 8);
            }

            // Top: ones part
            if (onesAlpha > 0.3 && ones > 0) {
                ctx.fillStyle = viz.colors.orange;
                ctx.font = 'bold 16px -apple-system, sans-serif';
                ctx.fillText(ones, rectLeft + tensWidth + onesWidth / 2, rectTop - 8);
            }

            // Left: one-digit number
            ctx.fillStyle = viz.colors.green;
            ctx.font = 'bold 16px -apple-system, sans-serif';
            ctx.textAlign = 'right';
            ctx.textBaseline = 'middle';
            ctx.fillText(oneDigit, rectLeft - 12, rectTop + rectH / 2);

            // Top: full number
            ctx.fillStyle = viz.colors.white;
            ctx.font = 'bold 14px -apple-system, sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'bottom';
            ctx.fillText(twoDigit, rectLeft + (tensWidth + onesWidth) / 2, rectTop - 26);

            // Brace under tens
            if (tensAlpha > 0.3 && ones > 0) {
                ctx.strokeStyle = viz.colors.text + '88';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(rectLeft, rectTop - 22);
                ctx.lineTo(rectLeft + tensWidth, rectTop - 22);
                ctx.stroke();
            }
            if (onesAlpha > 0.3 && ones > 0) {
                ctx.beginPath();
                ctx.moveTo(rectLeft + tensWidth, rectTop - 22);
                ctx.lineTo(rectLeft + tensWidth + onesWidth, rectTop - 22);
                ctx.stroke();
            }

            // Equation area at bottom with animation
            var eqY = 270;
            if (totalAlpha > 0) {
                // Step-by-step breakdown
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillStyle = viz.colors.white;
                ctx.font = 'bold 16px -apple-system, sans-serif';
                ctx.fillText(twoDigit + ' \u00D7 ' + oneDigit, viz.width / 2, eqY);

                ctx.fillStyle = viz.colors.teal;
                ctx.font = '15px -apple-system, sans-serif';
                if (ones > 0) {
                    ctx.fillText('= (' + tens + ' \u00D7 ' + oneDigit + ') + (' + ones + ' \u00D7 ' + oneDigit + ')', viz.width / 2, eqY + 28);

                    ctx.fillStyle = viz.colors.blue;
                    ctx.font = 'bold 15px -apple-system, sans-serif';
                    var partStr = '= ';
                    ctx.fillStyle = viz.colors.blue;
                    // Use compound text
                    var line3 = '= ' + partialTens + ' + ' + partialOnes;
                    ctx.fillStyle = viz.colors.purple;
                    ctx.fillText(line3, viz.width / 2, eqY + 56);
                } else {
                    ctx.fillText('= ' + tens + ' \u00D7 ' + oneDigit, viz.width / 2, eqY + 28);
                }

                // Final answer with fanfare
                ctx.fillStyle = viz.colors.yellow;
                ctx.font = 'bold 28px -apple-system, sans-serif';
                var finalY = ones > 0 ? eqY + 95 : eqY + 66;
                ctx.fillText('= ' + total, viz.width / 2, finalY);

                // Fun sparkle effect around the answer
                if (totalAlpha > 0.7) {
                    var sparkleT = Date.now() / 300;
                    var sparkleColors = [viz.colors.yellow, viz.colors.pink, viz.colors.teal, viz.colors.orange];
                    for (var s = 0; s < 6; s++) {
                        var angle = sparkleT + s * Math.PI / 3;
                        var dist = 40 + Math.sin(sparkleT * 2 + s) * 10;
                        var sx = viz.width / 2 + Math.cos(angle) * dist;
                        var sy = finalY + Math.sin(angle) * 18;
                        ctx.fillStyle = sparkleColors[s % sparkleColors.length];
                        ctx.beginPath();
                        ctx.arc(sx, sy, 3, 0, Math.PI * 2);
                        ctx.fill();
                    }
                    // Re-draw if sparkling
                    if (!animating) {
                        requestAnimationFrame(function() { draw(); });
                    }
                }
            }
        }

        startAnimation();
        return viz;
    }
});

// ============================================================
// Visualization 5 — sec05: "Real World"
// "Tile the Floor" — fill a room with colorful tiles, counting one by one.
// ============================================================
window.EXTRA_VIZ['ch03']['ch03-sec05'] = window.EXTRA_VIZ['ch03']['ch03-sec05'] || [];
window.EXTRA_VIZ['ch03']['ch03-sec05'].push({
    id: 'ch03-extra-viz-5',
    title: 'Tile the Floor!',
    description: 'Set the room size, then watch colorful tiles fill the floor one by one. How many tiles do you need?',
    setup: function(container, controls) {
        var viz = new VizEngine(container, { width: 560, height: 420, scale: 40, originX: 280, originY: 210 });
        var ctx = viz.ctx;

        var roomW = 5;
        var roomH = 4;
        var animProgress = 0;
        var animating = false;
        var animId = null;

        var tileColors = [
            '#58a6ff', '#f0883e', '#3fb950', '#bc8cff',
            '#f778ba', '#3fb9a0', '#d29922', '#f85149',
            '#79c0ff', '#ffa657', '#56d364', '#d2a8ff'
        ];

        var wSlider = VizEngine.createSlider(controls, 'Width:', 2, 12, roomW, 1, function(val) {
            roomW = Math.round(val);
            startAnimation();
        });
        wSlider.step = 1;

        var hSlider = VizEngine.createSlider(controls, 'Height:', 2, 12, roomH, 1, function(val) {
            roomH = Math.round(val);
            startAnimation();
        });
        hSlider.step = 1;

        var animateBtn = document.createElement('button');
        animateBtn.textContent = 'Replay Tiling';
        animateBtn.style.cssText = 'padding:6px 16px;border:2px solid #bc8cff;border-radius:8px;background:#1a1a40;color:#bc8cff;font-size:0.85rem;cursor:pointer;font-weight:bold;margin-left:8px;';
        animateBtn.addEventListener('click', function() { startAnimation(); });
        controls.appendChild(animateBtn);

        function startAnimation() {
            animProgress = 0;
            animating = true;
            if (animId) cancelAnimationFrame(animId);
            runAnim();
        }

        function runAnim() {
            var totalTiles = roomW * roomH;
            var speed = Math.max(0.008, 0.4 / totalTiles);
            animProgress += speed;
            if (animProgress >= 1) {
                animProgress = 1;
                animating = false;
            }
            draw();
            if (animating) {
                animId = requestAnimationFrame(runAnim);
            }
        }

        function draw() {
            viz.clear();
            ctx.fillStyle = '#0c0c20';
            ctx.fillRect(0, 0, viz.width, viz.height);

            var totalTiles = roomW * roomH;

            // Title
            ctx.fillStyle = viz.colors.white;
            ctx.font = 'bold 20px -apple-system, sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'top';
            ctx.fillText('Tile the Floor!', viz.width / 2, 6);

            // Tile sizing
            var maxTileW = (viz.width - 100) / roomW;
            var maxTileH = (240) / roomH;
            var tileSize = Math.min(maxTileW, maxTileH, 40);
            var gap = 2;
            var totalW = roomW * (tileSize + gap) - gap;
            var totalH = roomH * (tileSize + gap) - gap;
            var startX = (viz.width - totalW) / 2;
            var startY = 50;

            // Room outline
            ctx.strokeStyle = viz.colors.white;
            ctx.lineWidth = 3;
            ctx.strokeRect(startX - 6, startY - 6, totalW + 12, totalH + 12);

            // Room corners (decorative)
            var cornerSize = 8;
            ctx.fillStyle = viz.colors.white;
            // Top-left
            ctx.fillRect(startX - 9, startY - 9, cornerSize, 3);
            ctx.fillRect(startX - 9, startY - 9, 3, cornerSize);
            // Top-right
            ctx.fillRect(startX + totalW + 1, startY - 9, cornerSize, 3);
            ctx.fillRect(startX + totalW + 6, startY - 9, 3, cornerSize);
            // Bottom-left
            ctx.fillRect(startX - 9, startY + totalH + 6, cornerSize, 3);
            ctx.fillRect(startX - 9, startY + totalH + 1, 3, cornerSize);
            // Bottom-right
            ctx.fillRect(startX + totalW + 1, startY + totalH + 6, cornerSize, 3);
            ctx.fillRect(startX + totalW + 6, startY + totalH + 1, 3, cornerSize);

            // Dimension labels
            ctx.fillStyle = viz.colors.teal;
            ctx.font = 'bold 14px -apple-system, sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'bottom';
            ctx.fillText(roomW + ' tiles wide', startX + totalW / 2, startY - 14);

            ctx.save();
            ctx.translate(startX - 20, startY + totalH / 2);
            ctx.rotate(-Math.PI / 2);
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(roomH + ' tiles tall', 0, 0);
            ctx.restore();

            // Draw tiles with animation
            var tilesShown = Math.floor(animProgress * totalTiles);
            if (animProgress >= 1) tilesShown = totalTiles;
            var currentTileProgress = (animProgress * totalTiles) - Math.floor(animProgress * totalTiles);
            if (animProgress >= 1) currentTileProgress = 1;

            var count = 0;
            for (var r = 0; r < roomH; r++) {
                for (var c = 0; c < roomW; c++) {
                    var tileIdx = r * roomW + c;
                    var tx = startX + c * (tileSize + gap);
                    var ty = startY + r * (tileSize + gap);
                    var colorIdx = (r + c) % tileColors.length;

                    if (tileIdx < tilesShown) {
                        // Full tile
                        drawTile(tx, ty, tileSize, tileColors[colorIdx], 1, tileIdx + 1);
                        count++;
                    } else if (tileIdx === tilesShown && animProgress < 1) {
                        // Animating tile (popping in)
                        var scale = currentTileProgress;
                        scale = scale < 0.5 ? 4 * scale * scale * scale : 1 - Math.pow(-2 * scale + 2, 3) / 2;
                        drawTile(tx, ty, tileSize, tileColors[colorIdx], scale, tileIdx + 1);
                        if (scale > 0.1) count++;
                    } else {
                        // Empty slot
                        ctx.strokeStyle = '#2a2a4a';
                        ctx.lineWidth = 1;
                        ctx.setLineDash([3, 3]);
                        ctx.strokeRect(tx, ty, tileSize, tileSize);
                        ctx.setLineDash([]);
                    }
                }
            }

            // Counter and equation
            var eqY = startY + totalH + 30;

            // Counting display
            ctx.fillStyle = viz.colors.orange;
            ctx.font = 'bold 16px -apple-system, sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('Tiles placed: ' + count + ' / ' + totalTiles, viz.width / 2, eqY);

            // Multiplication equation
            ctx.fillStyle = viz.colors.yellow;
            ctx.font = 'bold 24px -apple-system, sans-serif';
            ctx.fillText(roomW + ' \u00D7 ' + roomH + ' = ' + totalTiles, viz.width / 2, eqY + 36);

            // Fun message when done
            if (animProgress >= 1) {
                ctx.fillStyle = viz.colors.green;
                ctx.font = 'bold 15px -apple-system, sans-serif';
                ctx.fillText('Floor complete! You need ' + totalTiles + ' tiles!', viz.width / 2, eqY + 68);
            }
        }

        function drawTile(tx, ty, size, color, scale, number) {
            var s = size * scale;
            var ox = tx + (size - s) / 2;
            var oy = ty + (size - s) / 2;

            // Shadow
            ctx.fillStyle = '#00000044';
            ctx.fillRect(ox + 2, oy + 2, s, s);

            // Main tile
            ctx.fillStyle = color;
            ctx.fillRect(ox, oy, s, s);

            // Top/left highlight
            ctx.fillStyle = '#ffffff22';
            ctx.fillRect(ox, oy, s, 2);
            ctx.fillRect(ox, oy, 2, s);

            // Bottom/right shadow edge
            ctx.fillStyle = '#00000033';
            ctx.fillRect(ox, oy + s - 2, s, 2);
            ctx.fillRect(ox + s - 2, oy, 2, s);

            // Number on tile (only if big enough)
            if (s > 18 && scale > 0.6) {
                ctx.fillStyle = '#ffffffcc';
                var fontSize = Math.min(12, s * 0.45);
                ctx.font = 'bold ' + Math.round(fontSize) + 'px -apple-system, sans-serif';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(number, ox + s / 2, oy + s / 2);
            }
        }

        startAnimation();
        return viz;
    }
});
