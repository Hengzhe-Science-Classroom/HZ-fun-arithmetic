// === Chapter 2: Subtraction Stories ===
window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch02',
    number: 2,
    title: 'Subtraction Stories',
    subtitle: 'Taking away, finding differences, and the magic of minus!',
    sections: [
        // ============================================================
        // SECTION 1: What Is Subtraction?
        // ============================================================
        {
            id: 'ch02-sec01',
            title: 'What Is Subtraction?',
            content: `
<h2>What Is Subtraction?</h2>

<p>You already know how to add things together. But what happens when you <strong>take things away</strong>? That is called <strong>subtraction</strong>, and it is one of the most useful skills in all of math!</p>

<p>The symbol for subtraction is the <strong>minus sign</strong>: <strong>&minus;</strong></p>

<p>When we write \\(9 - 4 = 5\\), we say "nine minus four equals five."</p>

<div class="env-block intuition">
    <div class="env-title">Discovery</div>
    <p>Subtraction has <strong>three different meanings</strong>, and they all use the same minus sign! Let us explore each one.</p>
</div>

<h3>Meaning 1: Take Away</h3>

<p>Imagine you have <strong>8 cookies</strong> on a plate. You eat <strong>3</strong> of them. How many cookies are left?</p>

<p>\\[ 8 - 3 = 5 \\]</p>

<p>You started with 8, took away 3, and 5 are left. This is the <strong>"take away"</strong> meaning of subtraction.</p>

<div class="env-block example">
    <div class="env-title">Example</div>
    <p>There are <strong>12 birds</strong> on a fence. Then <strong>4 birds</strong> fly away. How many birds are still on the fence?</p>
    <p>\\[ 12 - 4 = 8 \\]</p>
    <p>Eight birds are still sitting on the fence!</p>
</div>

<h3>Meaning 2: Comparison (Finding the Difference)</h3>

<p>Sometimes we subtract to find out <strong>how much more</strong> one group has than another.</p>

<p>Suppose Maya has <strong>10 stickers</strong> and Leo has <strong>6 stickers</strong>. How many more stickers does Maya have?</p>

<p>\\[ 10 - 6 = 4 \\]</p>

<p>Maya has <strong>4 more stickers</strong> than Leo. We call this the <strong>difference</strong>.</p>

<div class="viz-placeholder" data-viz="viz-ch02-three-meanings"></div>

<h3>Meaning 3: Missing Addend</h3>

<p>Here is a tricky one! Sometimes subtraction helps us find a <strong>missing piece</strong>.</p>

<p>You need <strong>10 apples</strong> for a pie. You already have <strong>6 apples</strong>. How many more do you need?</p>

<p>We can think: \\(6 + \\,? = 10\\), so \\(? = 10 - 6 = 4\\). You need <strong>4 more apples</strong>!</p>

<div class="env-block remark">
    <div class="env-title">Think About It</div>
    <p>All three meanings &mdash; taking away, comparing, and finding a missing piece &mdash; use the same minus sign. But now you know subtraction can mean more than just "take away"!</p>
</div>

<h3>Parts of a Subtraction Problem</h3>

<p>Every subtraction problem has special names for its parts:</p>

<p>\\[ \\underbrace{9}_{\\text{minuend}} \\;-\\; \\underbrace{4}_{\\text{subtrahend}} \\;=\\; \\underbrace{5}_{\\text{difference}} \\]</p>

<ul>
    <li><strong>Minuend</strong> &mdash; the number you start with (the big number)</li>
    <li><strong>Subtrahend</strong> &mdash; the number you take away</li>
    <li><strong>Difference</strong> &mdash; the answer (what is left)</li>
</ul>

<div class="viz-placeholder" data-viz="viz-ch02-cookie-takeaway"></div>

<div class="env-block intuition">
    <div class="env-title">Cool Fact</div>
    <p>The word "subtract" comes from Latin: <em>sub</em> means "from below" and <em>tract</em> means "to pull." So subtract literally means "to pull from below" &mdash; like pulling items out of a group!</p>
</div>
`,
            visualizations: [
                {
                    id: 'viz-ch02-three-meanings',
                    title: 'Three Meanings of Subtraction',
                    description: 'Click the buttons to see each meaning of subtraction in action!',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { width: 560, height: 340, scale: 40, originX: 280, originY: 280 });

                        var mode = 'takeaway';

                        VizEngine.createButton(controls, 'Take Away', function() { mode = 'takeaway'; draw(); });
                        VizEngine.createButton(controls, 'Compare', function() { mode = 'compare'; draw(); });
                        VizEngine.createButton(controls, 'Missing Addend', function() { mode = 'missing'; draw(); });

                        function drawStar(ctx, cx, cy, r, color) {
                            ctx.fillStyle = color;
                            ctx.beginPath();
                            for (var i = 0; i < 5; i++) {
                                var angle = -Math.PI / 2 + (i * 2 * Math.PI / 5);
                                var outerX = cx + r * Math.cos(angle);
                                var outerY = cy + r * Math.sin(angle);
                                if (i === 0) ctx.moveTo(outerX, outerY);
                                else ctx.lineTo(outerX, outerY);
                                var innerAngle = angle + Math.PI / 5;
                                var innerX = cx + r * 0.4 * Math.cos(innerAngle);
                                var innerY = cy + r * 0.4 * Math.sin(innerAngle);
                                ctx.lineTo(innerX, innerY);
                            }
                            ctx.closePath();
                            ctx.fill();
                        }

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            if (mode === 'takeaway') {
                                // Title
                                ctx.fillStyle = viz.colors.yellow;
                                ctx.font = 'bold 18px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.fillText('Take Away: 8 - 3 = 5', viz.width / 2, 30);

                                // Draw 8 stars, last 3 faded and crossed out
                                for (var i = 0; i < 8; i++) {
                                    var sx = 60 + i * 60;
                                    var sy = 100;
                                    if (i >= 5) {
                                        drawStar(ctx, sx, sy, 18, '#f8514944');
                                        ctx.strokeStyle = viz.colors.red;
                                        ctx.lineWidth = 2;
                                        ctx.beginPath(); ctx.moveTo(sx - 15, sy - 15); ctx.lineTo(sx + 15, sy + 15); ctx.stroke();
                                        ctx.beginPath(); ctx.moveTo(sx + 15, sy - 15); ctx.lineTo(sx - 15, sy + 15); ctx.stroke();
                                    } else {
                                        drawStar(ctx, sx, sy, 18, viz.colors.yellow);
                                    }
                                }

                                // Arrow showing removal
                                ctx.strokeStyle = viz.colors.red;
                                ctx.lineWidth = 2;
                                ctx.setLineDash([5, 3]);
                                ctx.beginPath();
                                ctx.moveTo(370, 130);
                                ctx.quadraticCurveTo(430, 180, 430, 200);
                                ctx.stroke();
                                ctx.setLineDash([]);

                                ctx.fillStyle = viz.colors.red;
                                ctx.font = '14px -apple-system,sans-serif';
                                ctx.fillText('3 taken away!', 430, 220);

                                // Result
                                ctx.fillStyle = viz.colors.green;
                                ctx.font = 'bold 16px -apple-system,sans-serif';
                                ctx.fillText('5 stars remain!', viz.width / 2, 280);

                            } else if (mode === 'compare') {
                                ctx.fillStyle = viz.colors.teal;
                                ctx.font = 'bold 18px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.fillText('Compare: 10 - 6 = 4 more', viz.width / 2, 30);

                                // Maya's row - 10 circles
                                ctx.fillStyle = viz.colors.white;
                                ctx.font = '13px -apple-system,sans-serif';
                                ctx.textAlign = 'left';
                                ctx.fillText('Maya:', 15, 85);
                                for (var i = 0; i < 10; i++) {
                                    ctx.fillStyle = i < 6 ? viz.colors.blue : viz.colors.orange;
                                    ctx.beginPath();
                                    ctx.arc(100 + i * 42, 80, 14, 0, Math.PI * 2);
                                    ctx.fill();
                                }

                                // Leo's row - 6 circles
                                ctx.fillStyle = viz.colors.white;
                                ctx.font = '13px -apple-system,sans-serif';
                                ctx.textAlign = 'left';
                                ctx.fillText('Leo:', 15, 155);
                                for (var i = 0; i < 6; i++) {
                                    ctx.fillStyle = viz.colors.blue;
                                    ctx.beginPath();
                                    ctx.arc(100 + i * 42, 150, 14, 0, Math.PI * 2);
                                    ctx.fill();
                                }

                                // Bracket showing difference
                                ctx.strokeStyle = viz.colors.orange;
                                ctx.lineWidth = 2;
                                ctx.setLineDash([4, 3]);
                                ctx.beginPath();
                                ctx.moveTo(352, 60);
                                ctx.lineTo(520, 60);
                                ctx.lineTo(520, 100);
                                ctx.lineTo(352, 100);
                                ctx.stroke();
                                ctx.setLineDash([]);

                                ctx.fillStyle = viz.colors.orange;
                                ctx.font = 'bold 14px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.fillText('Difference = 4', 436, 50);

                                ctx.fillStyle = viz.colors.green;
                                ctx.font = 'bold 16px -apple-system,sans-serif';
                                ctx.fillText('Maya has 4 more than Leo!', viz.width / 2, 280);

                            } else {
                                ctx.fillStyle = viz.colors.purple;
                                ctx.font = 'bold 18px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.fillText('Missing Addend: 6 + ? = 10', viz.width / 2, 30);

                                // Draw 10 apple slots, 6 filled, 4 empty
                                for (var i = 0; i < 10; i++) {
                                    var sx = 55 + i * 50;
                                    var sy = 110;
                                    if (i < 6) {
                                        ctx.fillStyle = viz.colors.green;
                                        ctx.beginPath();
                                        ctx.arc(sx, sy, 18, 0, Math.PI * 2);
                                        ctx.fill();
                                        ctx.fillStyle = viz.colors.white;
                                        ctx.font = 'bold 14px -apple-system,sans-serif';
                                        ctx.textAlign = 'center';
                                        ctx.fillText(String(i + 1), sx, sy + 5);
                                    } else {
                                        ctx.strokeStyle = viz.colors.purple;
                                        ctx.lineWidth = 2;
                                        ctx.setLineDash([4, 3]);
                                        ctx.beginPath();
                                        ctx.arc(sx, sy, 18, 0, Math.PI * 2);
                                        ctx.stroke();
                                        ctx.setLineDash([]);
                                        ctx.fillStyle = viz.colors.purple;
                                        ctx.font = 'bold 16px -apple-system,sans-serif';
                                        ctx.fillText('?', sx, sy + 5);
                                    }
                                }

                                ctx.fillStyle = viz.colors.white;
                                ctx.font = '14px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.fillText('You have 6 apples. You need 10.', viz.width / 2, 180);

                                ctx.fillStyle = viz.colors.purple;
                                ctx.font = 'bold 16px -apple-system,sans-serif';
                                ctx.fillText('10 - 6 = 4 more apples needed!', viz.width / 2, 220);

                                ctx.fillStyle = viz.colors.green;
                                ctx.font = 'bold 16px -apple-system,sans-serif';
                                ctx.fillText('? = 4', viz.width / 2, 280);
                            }
                        }

                        draw();
                        return viz;
                    }
                },
                {
                    id: 'viz-ch02-cookie-takeaway',
                    title: 'Cookie Take-Away Machine',
                    description: 'Use the slider to choose how many cookies to eat, and see how many remain!',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { width: 560, height: 280, scale: 40, originX: 280, originY: 240 });
                        var total = 10;
                        var eaten = 3;

                        VizEngine.createSlider(controls, 'Cookies to eat:', 0, 10, eaten, 1, function(val) {
                            eaten = Math.round(val);
                            draw();
                        });

                        function drawCookie(ctx, cx, cy, faded) {
                            ctx.fillStyle = faded ? '#8B6914' + '44' : '#D2A24C';
                            ctx.beginPath();
                            ctx.arc(cx, cy, 16, 0, Math.PI * 2);
                            ctx.fill();
                            // Chocolate chips
                            if (!faded) {
                                ctx.fillStyle = '#4A2800';
                                var chips = [[- 5, -4], [4, -6], [0, 5], [6, 3], [-6, 2]];
                                for (var c = 0; c < chips.length; c++) {
                                    ctx.beginPath();
                                    ctx.arc(cx + chips[c][0], cy + chips[c][1], 2.5, 0, Math.PI * 2);
                                    ctx.fill();
                                }
                            }
                        }

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            ctx.fillStyle = viz.colors.yellow;
                            ctx.font = 'bold 18px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText(total + ' - ' + eaten + ' = ' + (total - eaten), viz.width / 2, 30);

                            for (var i = 0; i < total; i++) {
                                var cx = 50 + (i % 5) * 100;
                                var cy = 80 + Math.floor(i / 5) * 60;
                                if (i >= total - eaten) {
                                    drawCookie(ctx, cx, cy, true);
                                    // X mark
                                    ctx.strokeStyle = viz.colors.red;
                                    ctx.lineWidth = 2;
                                    ctx.beginPath(); ctx.moveTo(cx - 10, cy - 10); ctx.lineTo(cx + 10, cy + 10); ctx.stroke();
                                    ctx.beginPath(); ctx.moveTo(cx + 10, cy - 10); ctx.lineTo(cx - 10, cy + 10); ctx.stroke();
                                } else {
                                    drawCookie(ctx, cx, cy, false);
                                }
                            }

                            ctx.fillStyle = viz.colors.green;
                            ctx.font = 'bold 16px -apple-system,sans-serif';
                            ctx.fillText((total - eaten) + ' cookies left!', viz.width / 2, 240);
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'There are 11 butterflies in a garden. 5 fly away. How many are left? Write the subtraction sentence.',
                    hint: 'Start with 11 and take away 5. What do you get?',
                    solution: '\\(11 - 5 = 6\\). There are <strong>6 butterflies</strong> left in the garden. This is an example of the "take away" meaning of subtraction.'
                },
                {
                    question: 'Sam has 9 toy cars and Mia has 4 toy cars. How many more cars does Sam have? Which meaning of subtraction is this?',
                    hint: 'You are comparing two groups. Find the difference between 9 and 4.',
                    solution: '\\(9 - 4 = 5\\). Sam has <strong>5 more</strong> toy cars than Mia. This is the <strong>comparison</strong> (finding the difference) meaning of subtraction.'
                },
                {
                    question: 'You need 15 balloons for a party. You already have 9. How many more do you need? Write this as a subtraction AND as a missing-addend addition.',
                    hint: 'Think: 9 + ? = 15, which is the same as 15 - 9 = ?',
                    solution: 'Subtraction: \\(15 - 9 = 6\\). Missing addend: \\(9 + 6 = 15\\). You need <strong>6 more balloons</strong>. Both ways give the same answer!'
                }
            ]
        },

        // ============================================================
        // SECTION 2: Subtracting on a Number Line
        // ============================================================
        {
            id: 'ch02-sec02',
            title: 'Subtracting on a Number Line',
            content: `
<h2>Subtracting on a Number Line</h2>

<p>A <strong>number line</strong> is a great tool for seeing how subtraction works. Remember: when we add, we jump <strong>to the right</strong>. When we subtract, we jump <strong>to the left</strong>!</p>

<div class="env-block intuition">
    <div class="env-title">Discovery</div>
    <p>Think of a number line like a path. You are walking forward (adding) or walking backward (subtracting). Each hop backward takes away one!</p>
</div>

<h3>How to Subtract on a Number Line</h3>

<p>Let us try \\(7 - 3\\):</p>

<ol>
    <li><strong>Start</strong> at 7 on the number line.</li>
    <li><strong>Jump back</strong> 3 spaces (to the left).</li>
    <li>You <strong>land on</strong> 4. So \\(7 - 3 = 4\\)!</li>
</ol>

<div class="viz-placeholder" data-viz="viz-ch02-numberline-hops"></div>

<div class="env-block example">
    <div class="env-title">Try This!</div>
    <p>Use the number line above! Try these problems by dragging the start point or using the sliders:</p>
    <ul>
        <li>\\(10 - 4 = \\,?\\) &mdash; Start at 10, hop back 4</li>
        <li>\\(8 - 6 = \\,?\\) &mdash; Start at 8, hop back 6</li>
        <li>\\(12 - 5 = \\,?\\) &mdash; Start at 12, hop back 5</li>
    </ul>
</div>

<h3>Counting the Hops</h3>

<p>Each hop backward represents subtracting 1. If we subtract 3, we make <strong>3 hops</strong> to the left. If we subtract 5, we make <strong>5 hops</strong>.</p>

<div class="viz-placeholder" data-viz="viz-ch02-hop-counter"></div>

<div class="env-block remark">
    <div class="env-title">Think About It</div>
    <p>Notice something cool: when you subtract a bigger number, you jump farther to the left. Subtracting 1 is a tiny hop. Subtracting 8 is a big leap!</p>
</div>

<h3>Bigger Jumps on the Number Line</h3>

<p>For larger subtractions, we can also make <strong>big jumps</strong> instead of many small hops. For \\(45 - 20\\), instead of hopping back 20 times, jump back 2 groups of ten:</p>

<p>\\[ 45 \\xrightarrow{-10} 35 \\xrightarrow{-10} 25 \\]</p>

<p>So \\(45 - 20 = 25\\). Much faster!</p>

<div class="viz-placeholder" data-viz="viz-ch02-big-jumps"></div>

<div class="env-block warning">
    <div class="env-title">Watch Out!</div>
    <p>When subtracting on a number line, always jump to the <strong>left</strong> (toward smaller numbers). If you jump right, you are <em>adding</em>, not subtracting!</p>
</div>
`,
            visualizations: [
                {
                    id: 'viz-ch02-numberline-hops',
                    title: 'Subtract on a Number Line',
                    description: 'Choose a starting number and how many to subtract. Watch the hops!',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { width: 560, height: 220, scale: 35, originX: 30, originY: 130 });
                        var startNum = 9;
                        var subNum = 4;

                        VizEngine.createSlider(controls, 'Start at:', 1, 14, startNum, 1, function(val) {
                            startNum = Math.round(val);
                            draw();
                        });
                        VizEngine.createSlider(controls, 'Subtract:', 0, 14, subNum, 1, function(val) {
                            subNum = Math.min(Math.round(val), startNum);
                            draw();
                        });

                        function draw() {
                            if (subNum > startNum) subNum = startNum;
                            viz.clear();
                            var ctx = viz.ctx;
                            var s = viz.scale;
                            var oX = viz.originX;
                            var oY = viz.originY;

                            // Draw number line
                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            ctx.moveTo(oX, oY);
                            ctx.lineTo(oX + 15 * s, oY);
                            ctx.stroke();

                            // Tick marks and labels
                            for (var i = 0; i <= 15; i++) {
                                var tx = oX + i * s;
                                ctx.strokeStyle = viz.colors.axis;
                                ctx.lineWidth = 1;
                                ctx.beginPath();
                                ctx.moveTo(tx, oY - 6);
                                ctx.lineTo(tx, oY + 6);
                                ctx.stroke();
                                ctx.fillStyle = viz.colors.text;
                                ctx.font = '12px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.textBaseline = 'top';
                                ctx.fillText(String(i), tx, oY + 10);
                            }

                            // Draw hops (arcs)
                            var result = startNum - subNum;
                            for (var h = 0; h < subNum; h++) {
                                var fromX = oX + (startNum - h) * s;
                                var toX = oX + (startNum - h - 1) * s;
                                var midX = (fromX + toX) / 2;
                                var arcH = 20 + h * 3;

                                ctx.strokeStyle = viz.colors.orange;
                                ctx.lineWidth = 2;
                                ctx.beginPath();
                                ctx.moveTo(fromX, oY - 8);
                                ctx.quadraticCurveTo(midX, oY - 8 - arcH, toX, oY - 8);
                                ctx.stroke();

                                // Arrowhead
                                ctx.fillStyle = viz.colors.orange;
                                ctx.beginPath();
                                ctx.moveTo(toX, oY - 8);
                                ctx.lineTo(toX + 5, oY - 14);
                                ctx.lineTo(toX + 5, oY - 2);
                                ctx.closePath();
                                ctx.fill();
                            }

                            // Start point
                            ctx.fillStyle = viz.colors.blue;
                            ctx.beginPath();
                            ctx.arc(oX + startNum * s, oY, 8, 0, Math.PI * 2);
                            ctx.fill();

                            // End point
                            ctx.fillStyle = viz.colors.green;
                            ctx.beginPath();
                            ctx.arc(oX + result * s, oY, 8, 0, Math.PI * 2);
                            ctx.fill();

                            // Labels
                            ctx.fillStyle = viz.colors.blue;
                            ctx.font = 'bold 14px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'bottom';
                            ctx.fillText('Start: ' + startNum, oX + startNum * s, oY - 60 - subNum * 3);

                            ctx.fillStyle = viz.colors.green;
                            ctx.fillText('Land: ' + result, oX + result * s, oY + 35);

                            // Equation
                            ctx.fillStyle = viz.colors.yellow;
                            ctx.font = 'bold 18px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText(startNum + ' - ' + subNum + ' = ' + result, viz.width / 2, 25);
                        }

                        draw();
                        return viz;
                    }
                },
                {
                    id: 'viz-ch02-hop-counter',
                    title: 'Hop Counter',
                    description: 'Watch each hop happen one at a time! Click "Next Hop" to count backward.',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { width: 560, height: 200, scale: 35, originX: 30, originY: 110 });
                        var startNum = 10;
                        var subNum = 6;
                        var currentHop = 0;

                        VizEngine.createButton(controls, 'Next Hop', function() {
                            if (currentHop < subNum) {
                                currentHop++;
                                draw();
                            }
                        });
                        VizEngine.createButton(controls, 'Reset', function() {
                            currentHop = 0;
                            draw();
                        });

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;
                            var s = viz.scale;
                            var oX = viz.originX;
                            var oY = viz.originY;

                            // Number line
                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            ctx.moveTo(oX, oY);
                            ctx.lineTo(oX + 14 * s, oY);
                            ctx.stroke();

                            for (var i = 0; i <= 14; i++) {
                                var tx = oX + i * s;
                                ctx.strokeStyle = viz.colors.axis;
                                ctx.lineWidth = 1;
                                ctx.beginPath();
                                ctx.moveTo(tx, oY - 5);
                                ctx.lineTo(tx, oY + 5);
                                ctx.stroke();
                                ctx.fillStyle = viz.colors.text;
                                ctx.font = '11px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.textBaseline = 'top';
                                ctx.fillText(String(i), tx, oY + 8);
                            }

                            // Draw completed hops
                            for (var h = 0; h < currentHop; h++) {
                                var fromX = oX + (startNum - h) * s;
                                var toX = oX + (startNum - h - 1) * s;
                                var midX = (fromX + toX) / 2;

                                ctx.strokeStyle = viz.colors.orange;
                                ctx.lineWidth = 2;
                                ctx.beginPath();
                                ctx.moveTo(fromX, oY - 8);
                                ctx.quadraticCurveTo(midX, oY - 38, toX, oY - 8);
                                ctx.stroke();

                                // Hop number
                                ctx.fillStyle = viz.colors.orange;
                                ctx.font = '10px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.fillText(String(h + 1), midX, oY - 42);
                            }

                            // Current position
                            var pos = startNum - currentHop;
                            ctx.fillStyle = currentHop === subNum ? viz.colors.green : viz.colors.blue;
                            ctx.beginPath();
                            ctx.arc(oX + pos * s, oY, 8, 0, Math.PI * 2);
                            ctx.fill();

                            // Status text
                            ctx.font = 'bold 16px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            if (currentHop === 0) {
                                ctx.fillStyle = viz.colors.blue;
                                ctx.fillText('Starting at ' + startNum + '. Subtract ' + subNum + '!', viz.width / 2, 25);
                            } else if (currentHop < subNum) {
                                ctx.fillStyle = viz.colors.orange;
                                ctx.fillText('Hop ' + currentHop + ': now at ' + pos + ' (' + (subNum - currentHop) + ' more hops)', viz.width / 2, 25);
                            } else {
                                ctx.fillStyle = viz.colors.green;
                                ctx.fillText('Done! ' + startNum + ' - ' + subNum + ' = ' + pos, viz.width / 2, 25);
                            }
                        }

                        draw();
                        return viz;
                    }
                },
                {
                    id: 'viz-ch02-big-jumps',
                    title: 'Big Jumps: Subtract by 10s and 1s',
                    description: 'See how we break big subtractions into jumps of ten and jumps of one!',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { width: 560, height: 220, scale: 10, originX: 20, originY: 130 });
                        var startNum = 45;
                        var subNum = 23;

                        VizEngine.createSlider(controls, 'Start:', 20, 50, startNum, 1, function(val) {
                            startNum = Math.round(val);
                            if (subNum > startNum) subNum = startNum;
                            draw();
                        });
                        VizEngine.createSlider(controls, 'Subtract:', 0, 50, subNum, 1, function(val) {
                            subNum = Math.min(Math.round(val), startNum);
                            draw();
                        });

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;
                            var s = viz.scale;
                            var oX = viz.originX;
                            var oY = viz.originY;
                            var result = startNum - subNum;
                            var tens = Math.floor(subNum / 10);
                            var ones = subNum % 10;

                            // Number line (show range)
                            var lo = Math.max(0, result - 2);
                            var hi = Math.min(55, startNum + 2);

                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            ctx.moveTo(oX + lo * s, oY);
                            ctx.lineTo(oX + hi * s, oY);
                            ctx.stroke();

                            // Ticks
                            for (var i = lo; i <= hi; i++) {
                                var tx = oX + i * s;
                                var isBig = i % 10 === 0;
                                ctx.strokeStyle = viz.colors.axis;
                                ctx.lineWidth = 1;
                                ctx.beginPath();
                                ctx.moveTo(tx, oY - (isBig ? 8 : 4));
                                ctx.lineTo(tx, oY + (isBig ? 8 : 4));
                                ctx.stroke();
                                if (isBig || i === startNum || i === result) {
                                    ctx.fillStyle = viz.colors.text;
                                    ctx.font = '11px -apple-system,sans-serif';
                                    ctx.textAlign = 'center';
                                    ctx.textBaseline = 'top';
                                    ctx.fillText(String(i), tx, oY + 10);
                                }
                            }

                            // Draw ten-jumps
                            var pos = startNum;
                            for (var t = 0; t < tens; t++) {
                                var fromX = oX + pos * s;
                                var toX = oX + (pos - 10) * s;
                                var midX = (fromX + toX) / 2;
                                ctx.strokeStyle = viz.colors.purple;
                                ctx.lineWidth = 3;
                                ctx.beginPath();
                                ctx.moveTo(fromX, oY - 10);
                                ctx.quadraticCurveTo(midX, oY - 60, toX, oY - 10);
                                ctx.stroke();
                                ctx.fillStyle = viz.colors.purple;
                                ctx.font = 'bold 12px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.fillText('-10', midX, oY - 64);
                                pos -= 10;
                            }

                            // Draw one-jumps
                            if (ones > 0) {
                                var fromX = oX + pos * s;
                                var toX = oX + (pos - ones) * s;
                                var midX = (fromX + toX) / 2;
                                ctx.strokeStyle = viz.colors.teal;
                                ctx.lineWidth = 2;
                                ctx.beginPath();
                                ctx.moveTo(fromX, oY - 10);
                                ctx.quadraticCurveTo(midX, oY - 35, toX, oY - 10);
                                ctx.stroke();
                                ctx.fillStyle = viz.colors.teal;
                                ctx.font = 'bold 12px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.fillText('-' + ones, midX, oY - 38);
                            }

                            // Start dot
                            ctx.fillStyle = viz.colors.blue;
                            ctx.beginPath();
                            ctx.arc(oX + startNum * s, oY, 6, 0, Math.PI * 2);
                            ctx.fill();

                            // End dot
                            ctx.fillStyle = viz.colors.green;
                            ctx.beginPath();
                            ctx.arc(oX + result * s, oY, 6, 0, Math.PI * 2);
                            ctx.fill();

                            // Equation
                            ctx.fillStyle = viz.colors.yellow;
                            ctx.font = 'bold 16px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            var desc = startNum + ' - ' + subNum + ' = ' + result;
                            if (tens > 0 && ones > 0) {
                                desc += '   (' + tens + ' jump' + (tens > 1 ? 's' : '') + ' of 10, then ' + ones + ')';
                            } else if (tens > 0) {
                                desc += '   (' + tens + ' jump' + (tens > 1 ? 's' : '') + ' of 10)';
                            }
                            ctx.fillText(desc, viz.width / 2, 20);
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Use a number line to solve \\(13 - 7\\). How many hops backward do you make? Where do you land?',
                    hint: 'Start at 13. Hop back 7 times (to the left). Count each hop carefully!',
                    solution: 'You make <strong>7 hops</strong> backward. Starting at 13: 12, 11, 10, 9, 8, 7, <strong>6</strong>. So \\(13 - 7 = 6\\).'
                },
                {
                    question: 'Solve \\(36 - 14\\) by making jumps of 10 and 1. Write out each jump.',
                    hint: 'Break 14 into 10 + 4. First jump back 10 from 36, then jump back 4.',
                    solution: 'Break it up: \\(36 \\xrightarrow{-10} 26 \\xrightarrow{-4} 22\\). So \\(36 - 14 = 22\\).'
                },
                {
                    question: 'On a number line, you start at some number, hop back 5, and land on 8. What number did you start at?',
                    hint: 'If you hopped back 5 and landed on 8, you can undo the subtraction by adding. What is 8 + 5?',
                    solution: 'You started at \\(8 + 5 = 13\\). Check: \\(13 - 5 = 8\\). Correct!'
                }
            ]
        },

        // ============================================================
        // SECTION 3: Subtraction Strategies
        // ============================================================
        {
            id: 'ch02-sec03',
            title: 'Subtraction Strategies',
            content: `
<h2>Subtraction Strategies</h2>

<p>There are many clever ways to subtract quickly. Good mathematicians know <strong>multiple strategies</strong> and pick the best one for each problem. Let us learn four powerful strategies!</p>

<div class="env-block intuition">
    <div class="env-title">Discovery</div>
    <p>There is no single "right" way to subtract. The best strategy is the one that helps <em>you</em> get the answer quickly and correctly!</p>
</div>

<h3>Strategy 1: Count Back</h3>

<p>For small subtractions (taking away 1, 2, or 3), just count backward in your head!</p>

<p><strong>Example:</strong> \\(8 - 3\\)</p>
<p>Start at 8 and count back three: 7, 6, <strong>5</strong>. Done!</p>

<div class="env-block example">
    <div class="env-title">Example</div>
    <p><strong>Count back to solve:</strong></p>
    <ul>
        <li>\\(11 - 2\\): Start at 11, count back: 10, <strong>9</strong></li>
        <li>\\(15 - 3\\): Start at 15, count back: 14, 13, <strong>12</strong></li>
        <li>\\(7 - 1\\): Start at 7, count back: <strong>6</strong></li>
    </ul>
</div>

<h3>Strategy 2: Use Doubles</h3>

<p>If you know your doubles (like \\(6 + 6 = 12\\)), you can subtract fast!</p>

<p>When the subtrahend is <strong>half</strong> the minuend, the answer is the same as the subtrahend:</p>

<p>\\[ 12 - 6 = 6 \\quad \\text{(because } 6 + 6 = 12\\text{)} \\]</p>
<p>\\[ 16 - 8 = 8 \\quad \\text{(because } 8 + 8 = 16\\text{)} \\]</p>

<div class="viz-placeholder" data-viz="viz-ch02-strategy-picker"></div>

<h3>Strategy 3: Make a Ten</h3>

<p>Subtracting from 10 is easy. So we can break a problem into two steps, first getting to 10!</p>

<div class="env-block example">
    <div class="env-title">Try This!</div>
    <p><strong>Solve \\(15 - 8\\) by making a ten:</strong></p>
    <ol>
        <li>From 15, subtract 5 to reach 10: \\(15 - 5 = 10\\)</li>
        <li>You still need to subtract \\(8 - 5 = 3\\) more.</li>
        <li>Now \\(10 - 3 = 7\\).</li>
    </ol>
    <p>So \\(15 - 8 = 7\\)!</p>
</div>

<h3>Strategy 4: Think Addition</h3>

<p>This is a superpower! Instead of subtracting, ask yourself: <strong>what do I add to get there?</strong></p>

<p>For \\(12 - 7\\), think: <strong>\\(7 + \\,? = 12\\)</strong></p>
<p>Since \\(7 + 5 = 12\\), then \\(12 - 7 = 5\\)!</p>

<div class="viz-placeholder" data-viz="viz-ch02-think-addition"></div>

<div class="env-block remark">
    <div class="env-title">Think About It</div>
    <p>The "think addition" strategy works because addition and subtraction are <strong>opposite operations</strong>. If adding takes you forward, subtracting takes you back the same amount.</p>
</div>

<h3>Which Strategy Should I Use?</h3>

<table style="width:100%; border-collapse:collapse; margin:1rem 0;">
    <tr style="border-bottom:1px solid #30363d;">
        <th style="text-align:left; padding:8px; color:#58a6ff;">When you see...</th>
        <th style="text-align:left; padding:8px; color:#58a6ff;">Try this strategy</th>
    </tr>
    <tr style="border-bottom:1px solid #1a1a40;">
        <td style="padding:8px;">Subtracting 1, 2, or 3</td>
        <td style="padding:8px;"><strong>Count Back</strong></td>
    </tr>
    <tr style="border-bottom:1px solid #1a1a40;">
        <td style="padding:8px;">A double like 14 - 7</td>
        <td style="padding:8px;"><strong>Use Doubles</strong></td>
    </tr>
    <tr style="border-bottom:1px solid #1a1a40;">
        <td style="padding:8px;">Subtracting a big number close to 10</td>
        <td style="padding:8px;"><strong>Make a Ten</strong></td>
    </tr>
    <tr>
        <td style="padding:8px;">Any subtraction</td>
        <td style="padding:8px;"><strong>Think Addition</strong></td>
    </tr>
</table>

<div class="viz-placeholder" data-viz="viz-ch02-strategy-practice"></div>

<div class="env-block warning">
    <div class="env-title">Watch Out!</div>
    <p>When using "make a ten," make sure you keep track of how much you have already subtracted! If you need to subtract 8 and you first subtract 5 to get to 10, you still have \\(8 - 5 = 3\\) more to subtract.</p>
</div>
`,
            visualizations: [
                {
                    id: 'viz-ch02-strategy-picker',
                    title: 'Subtraction Strategy Explorer',
                    description: 'Enter a subtraction problem and see which strategies work best!',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { width: 560, height: 300, scale: 40, originX: 280, originY: 260 });
                        var a = 14;
                        var b = 6;

                        VizEngine.createSlider(controls, 'First number:', 2, 20, a, 1, function(val) {
                            a = Math.round(val);
                            if (b > a) b = a;
                            draw();
                        });
                        VizEngine.createSlider(controls, 'Subtract:', 1, 20, b, 1, function(val) {
                            b = Math.min(Math.round(val), a);
                            draw();
                        });

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;
                            var result = a - b;

                            // Title
                            ctx.fillStyle = viz.colors.yellow;
                            ctx.font = 'bold 20px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText(a + ' - ' + b + ' = ' + result, viz.width / 2, 30);

                            // Recommend strategies
                            var strategies = [];
                            if (b <= 3) strategies.push({ name: 'Count Back', color: viz.colors.blue, desc: 'Start at ' + a + ', count back ' + b + ': ' + result });
                            if (a === b * 2) strategies.push({ name: 'Use Doubles', color: viz.colors.purple, desc: b + ' + ' + b + ' = ' + a + ', so answer is ' + b });
                            if (a > 10 && b > a - 10) {
                                var toTen = a - 10;
                                var rest = b - toTen;
                                strategies.push({ name: 'Make a Ten', color: viz.colors.teal, desc: a + ' - ' + toTen + ' = 10, then 10 - ' + rest + ' = ' + result });
                            }
                            strategies.push({ name: 'Think Addition', color: viz.colors.orange, desc: b + ' + ' + result + ' = ' + a });

                            var y = 70;
                            for (var i = 0; i < strategies.length; i++) {
                                var st = strategies[i];
                                // Strategy box
                                ctx.fillStyle = st.color + '22';
                                ctx.strokeStyle = st.color;
                                ctx.lineWidth = 2;
                                var bx = 40;
                                var bw = viz.width - 80;
                                var bh = 44;
                                ctx.beginPath();
                                ctx.roundRect(bx, y, bw, bh, 8);
                                ctx.fill();
                                ctx.stroke();

                                ctx.fillStyle = st.color;
                                ctx.font = 'bold 14px -apple-system,sans-serif';
                                ctx.textAlign = 'left';
                                ctx.fillText(st.name, bx + 12, y + 18);

                                ctx.fillStyle = viz.colors.white;
                                ctx.font = '13px -apple-system,sans-serif';
                                ctx.fillText(st.desc, bx + 12, y + 35);

                                y += bh + 8;
                            }
                        }

                        draw();
                        return viz;
                    }
                },
                {
                    id: 'viz-ch02-think-addition',
                    title: 'Think Addition!',
                    description: 'See how turning subtraction into addition makes it easier.',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { width: 560, height: 220, scale: 35, originX: 30, originY: 120 });
                        var total = 12;
                        var sub = 7;

                        VizEngine.createSlider(controls, 'Total:', 5, 18, total, 1, function(val) {
                            total = Math.round(val);
                            if (sub >= total) sub = total - 1;
                            draw();
                        });
                        VizEngine.createSlider(controls, 'Subtract:', 1, 17, sub, 1, function(val) {
                            sub = Math.min(Math.round(val), total - 1);
                            draw();
                        });

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;
                            var s = viz.scale;
                            var oX = viz.originX;
                            var oY = viz.originY;
                            var answer = total - sub;

                            // Title
                            ctx.fillStyle = viz.colors.yellow;
                            ctx.font = 'bold 18px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText(total + ' - ' + sub + ' = ?    Think: ' + sub + ' + ? = ' + total, viz.width / 2, 25);

                            // Number line
                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            ctx.moveTo(oX, oY);
                            ctx.lineTo(oX + (total + 2) * s, oY);
                            ctx.stroke();

                            for (var i = 0; i <= total + 1; i++) {
                                var tx = oX + i * s;
                                ctx.strokeStyle = viz.colors.axis;
                                ctx.lineWidth = 1;
                                ctx.beginPath();
                                ctx.moveTo(tx, oY - 5);
                                ctx.lineTo(tx, oY + 5);
                                ctx.stroke();
                                ctx.fillStyle = viz.colors.text;
                                ctx.font = '11px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.textBaseline = 'top';
                                ctx.fillText(String(i), tx, oY + 8);
                            }

                            // The known part: 0 to sub (colored bar)
                            ctx.fillStyle = viz.colors.blue + '55';
                            ctx.fillRect(oX, oY - 20, sub * s, 14);
                            ctx.fillStyle = viz.colors.blue;
                            ctx.font = 'bold 12px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText(sub + ' (known)', oX + sub * s / 2, oY - 28);

                            // The unknown part: sub to total (colored bar)
                            ctx.fillStyle = viz.colors.green + '55';
                            ctx.fillRect(oX + sub * s, oY - 20, answer * s, 14);
                            ctx.fillStyle = viz.colors.green;
                            ctx.fillText('? = ' + answer, oX + sub * s + answer * s / 2, oY - 28);

                            // Total bracket
                            ctx.strokeStyle = viz.colors.orange;
                            ctx.lineWidth = 1.5;
                            ctx.beginPath();
                            ctx.moveTo(oX, oY - 42);
                            ctx.lineTo(oX + total * s, oY - 42);
                            ctx.stroke();
                            ctx.fillStyle = viz.colors.orange;
                            ctx.font = 'bold 12px -apple-system,sans-serif';
                            ctx.fillText('total = ' + total, oX + total * s / 2, oY - 50);

                            // Points
                            ctx.fillStyle = viz.colors.blue;
                            ctx.beginPath(); ctx.arc(oX + sub * s, oY, 6, 0, Math.PI * 2); ctx.fill();

                            ctx.fillStyle = viz.colors.orange;
                            ctx.beginPath(); ctx.arc(oX + total * s, oY, 6, 0, Math.PI * 2); ctx.fill();

                            // Answer
                            ctx.fillStyle = viz.colors.green;
                            ctx.font = 'bold 16px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('Answer: ' + sub + ' + ' + answer + ' = ' + total + ', so ' + total + ' - ' + sub + ' = ' + answer + '!', viz.width / 2, oY + 55);
                        }

                        draw();
                        return viz;
                    }
                },
                {
                    id: 'viz-ch02-strategy-practice',
                    title: 'Strategy Practice Arena',
                    description: 'A random problem appears. Pick any strategy you like!',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { width: 560, height: 250, scale: 40, originX: 280, originY: 200 });
                        var a = 0, b = 0, answer = 0;
                        var showAnswer = false;

                        function newProblem() {
                            a = Math.floor(Math.random() * 15) + 5;
                            b = Math.floor(Math.random() * a) + 1;
                            answer = a - b;
                            showAnswer = false;
                            draw();
                        }

                        VizEngine.createButton(controls, 'New Problem', newProblem);
                        VizEngine.createButton(controls, 'Show Answer', function() { showAnswer = true; draw(); });

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            // Problem
                            ctx.fillStyle = viz.colors.yellow;
                            ctx.font = 'bold 28px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText(a + ' - ' + b + ' = ?', viz.width / 2, 50);

                            // Tip
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = '14px -apple-system,sans-serif';
                            if (b <= 3) {
                                ctx.fillText('Tip: Try counting back!', viz.width / 2, 90);
                            } else if (a === b * 2) {
                                ctx.fillText('Tip: This is a doubles fact!', viz.width / 2, 90);
                            } else if (a > 10 && b > a - 10) {
                                ctx.fillText('Tip: Try making a ten first!', viz.width / 2, 90);
                            } else {
                                ctx.fillText('Tip: Think addition -- ' + b + ' + ? = ' + a, viz.width / 2, 90);
                            }

                            if (showAnswer) {
                                // Draw circles for visual proof
                                for (var i = 0; i < a; i++) {
                                    var cx = 35 + (i % 10) * 52;
                                    var cy = 130 + Math.floor(i / 10) * 40;
                                    if (i < answer) {
                                        ctx.fillStyle = viz.colors.green;
                                    } else {
                                        ctx.fillStyle = viz.colors.red + '55';
                                    }
                                    ctx.beginPath();
                                    ctx.arc(cx, cy, 14, 0, Math.PI * 2);
                                    ctx.fill();

                                    if (i >= answer) {
                                        ctx.strokeStyle = viz.colors.red;
                                        ctx.lineWidth = 2;
                                        ctx.beginPath(); ctx.moveTo(cx - 8, cy - 8); ctx.lineTo(cx + 8, cy + 8); ctx.stroke();
                                        ctx.beginPath(); ctx.moveTo(cx + 8, cy - 8); ctx.lineTo(cx - 8, cy + 8); ctx.stroke();
                                    }
                                }

                                ctx.fillStyle = viz.colors.green;
                                ctx.font = 'bold 22px -apple-system,sans-serif';
                                ctx.fillText(a + ' - ' + b + ' = ' + answer, viz.width / 2, 225);
                            } else {
                                ctx.fillStyle = viz.colors.text;
                                ctx.font = '15px -apple-system,sans-serif';
                                ctx.fillText('Try to solve it in your head, then click "Show Answer"!', viz.width / 2, 170);
                            }
                        }

                        newProblem();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Use the <strong>count back</strong> strategy to solve \\(9 - 2\\). Say the numbers out loud as you count back.',
                    hint: 'Start at 9. Count back 2: nine... eight... seven. Where did you stop?',
                    solution: 'Start at 9, count back: 8, <strong>7</strong>. So \\(9 - 2 = 7\\).'
                },
                {
                    question: 'Use the <strong>make a ten</strong> strategy to solve \\(14 - 6\\). Show the two steps.',
                    hint: 'First subtract enough to get to 10 (that is 4). Then subtract the rest (6 - 4 = 2 more).',
                    solution: 'Step 1: \\(14 - 4 = 10\\) (subtracted 4 so far). Step 2: still need to subtract \\(6 - 4 = 2\\) more, so \\(10 - 2 = 8\\). Answer: \\(14 - 6 = 8\\).'
                },
                {
                    question: 'Use <strong>think addition</strong> to solve \\(15 - 9\\). Write it as an addition question first.',
                    hint: 'Rewrite as: \\(9 + \\,? = 15\\). What number added to 9 gives 15?',
                    solution: 'Think: \\(9 + \\,? = 15\\). Since \\(9 + 6 = 15\\), the answer is \\(15 - 9 = 6\\).'
                }
            ]
        },

        // ============================================================
        // SECTION 4: Borrowing & Multi-Digit Subtraction
        // ============================================================
        {
            id: 'ch02-sec04',
            title: 'Borrowing & Multi-Digit Subtraction',
            content: `
<h2>Borrowing & Multi-Digit Subtraction</h2>

<p>So far we have been subtracting small numbers. But what about bigger problems like \\(52 - 28\\)? For these, we need a powerful technique called <strong>regrouping</strong> (sometimes called "borrowing").</p>

<div class="env-block intuition">
    <div class="env-title">Discovery</div>
    <p>Think of numbers as groups of <strong>tens</strong> and <strong>ones</strong>. The number 52 is really <strong>5 tens and 2 ones</strong>. When the ones column is too small, we can "break open" a ten to get 10 more ones!</p>
</div>

<h3>Step by Step: 52 - 28</h3>

<p>Let us work through \\(52 - 28\\) using place-value blocks.</p>

<p><strong>Set up the problem:</strong></p>

<table style="border-collapse:collapse; margin:1rem auto; text-align:center;">
    <tr>
        <td style="padding:8px;"></td>
        <td style="padding:8px; color:#58a6ff; font-weight:bold;">Tens</td>
        <td style="padding:8px; color:#3fb950; font-weight:bold;">Ones</td>
    </tr>
    <tr style="border-bottom:2px solid #4a4a7a;">
        <td style="padding:8px;"></td>
        <td style="padding:8px;">5</td>
        <td style="padding:8px;">2</td>
    </tr>
    <tr>
        <td style="padding:8px; color:#f85149;">-</td>
        <td style="padding:8px;">2</td>
        <td style="padding:8px;">8</td>
    </tr>
</table>

<p><strong>Step 1: Look at the ones column.</strong> We need to do \\(2 - 8\\), but 2 is smaller than 8! We cannot take 8 from 2.</p>

<p><strong>Step 2: Regroup!</strong> Take 1 ten from the tens column. That ten becomes 10 ones. Now the ones column has \\(2 + 10 = 12\\), and the tens column has \\(5 - 1 = 4\\).</p>

<p><strong>Step 3: Subtract the ones.</strong> \\(12 - 8 = 4\\)</p>

<p><strong>Step 4: Subtract the tens.</strong> \\(4 - 2 = 2\\)</p>

<p><strong>Answer:</strong> \\(52 - 28 = 24\\)</p>

<div class="viz-placeholder" data-viz="viz-ch02-regrouping"></div>

<div class="env-block example">
    <div class="env-title">Example</div>
    <p><strong>Let us try \\(73 - 45\\):</strong></p>
    <ol>
        <li>Ones: \\(3 - 5\\)? Cannot do it! Regroup: borrow 1 ten.</li>
        <li>Now ones = \\(13 - 5 = 8\\), tens = \\(6 - 4 = 2\\).</li>
        <li>Answer: \\(73 - 45 = 28\\)</li>
    </ol>
</div>

<div class="viz-placeholder" data-viz="viz-ch02-place-value-blocks"></div>

<div class="env-block warning">
    <div class="env-title">Watch Out!</div>
    <p>When you regroup (borrow), do not forget to <strong>reduce the tens digit by 1</strong>! A common mistake is borrowing the ten but forgetting to cross out the old tens digit and write the new smaller one.</p>
</div>

<h3>When You Do NOT Need to Regroup</h3>

<p>If the ones digit on top is already bigger, just subtract straight down!</p>

<p>\\(87 - 34\\): Ones: \\(7 - 4 = 3\\). Tens: \\(8 - 3 = 5\\). Answer: <strong>53</strong>. Easy!</p>

<div class="env-block remark">
    <div class="env-title">Think About It</div>
    <p>Regrouping is not "cheating" or "borrowing from a neighbor." You are really just <strong>rearranging</strong> the same number. Fifty-two can be 5 tens + 2 ones, or 4 tens + 12 ones &mdash; it is the same amount either way!</p>
</div>

<div class="viz-placeholder" data-viz="viz-ch02-multi-digit-practice"></div>
`,
            visualizations: [
                {
                    id: 'viz-ch02-regrouping',
                    title: 'Regrouping Step-by-Step: 52 - 28',
                    description: 'Click "Next Step" to see each step of regrouping!',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { width: 560, height: 320, scale: 40, originX: 280, originY: 280 });
                        var step = 0;

                        VizEngine.createButton(controls, 'Next Step', function() {
                            if (step < 4) { step++; draw(); }
                        });
                        VizEngine.createButton(controls, 'Start Over', function() {
                            step = 0; draw();
                        });

                        function drawBlock(ctx, x, y, w, h, color, label) {
                            ctx.fillStyle = color + '44';
                            ctx.strokeStyle = color;
                            ctx.lineWidth = 2;
                            ctx.fillRect(x, y, w, h);
                            ctx.strokeRect(x, y, w, h);
                            if (label) {
                                ctx.fillStyle = color;
                                ctx.font = 'bold 12px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.textBaseline = 'middle';
                                ctx.fillText(label, x + w / 2, y + h / 2);
                            }
                        }

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            var steps = [
                                'Step 0: Set up 52 - 28',
                                'Step 1: Can we do 2 - 8? No! We need to regroup.',
                                'Step 2: Break 1 ten into 10 ones. Now: 4 tens, 12 ones.',
                                'Step 3: Subtract ones: 12 - 8 = 4',
                                'Step 4: Subtract tens: 4 - 2 = 2. Answer: 24!'
                            ];

                            // Title
                            ctx.fillStyle = viz.colors.yellow;
                            ctx.font = 'bold 16px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText(steps[step], viz.width / 2, 25);

                            // TENS label
                            ctx.fillStyle = viz.colors.blue;
                            ctx.font = 'bold 14px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('TENS', 120, 55);

                            // ONES label
                            ctx.fillStyle = viz.colors.green;
                            ctx.fillText('ONES', 400, 55);

                            // Separator
                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 1;
                            ctx.setLineDash([4, 4]);
                            ctx.beginPath();
                            ctx.moveTo(260, 50);
                            ctx.lineTo(260, 300);
                            ctx.stroke();
                            ctx.setLineDash([]);

                            if (step === 0) {
                                // 5 tens
                                for (var t = 0; t < 5; t++) {
                                    drawBlock(ctx, 40 + t * 42, 75, 36, 80, viz.colors.blue, '10');
                                }
                                // 2 ones
                                for (var o = 0; o < 2; o++) {
                                    drawBlock(ctx, 300 + o * 35, 75, 28, 28, viz.colors.green, '1');
                                }
                                ctx.fillStyle = viz.colors.white;
                                ctx.font = '14px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.fillText('52 = 5 tens + 2 ones', viz.width / 2, 200);
                                ctx.fillText('We need to subtract 28 (2 tens + 8 ones)', viz.width / 2, 225);
                            } else if (step === 1) {
                                // Show the problem
                                for (var t = 0; t < 5; t++) {
                                    drawBlock(ctx, 40 + t * 42, 75, 36, 80, viz.colors.blue, '10');
                                }
                                for (var o = 0; o < 2; o++) {
                                    drawBlock(ctx, 300 + o * 35, 75, 28, 28, viz.colors.green, '1');
                                }
                                // Red warning on ones
                                ctx.strokeStyle = viz.colors.red;
                                ctx.lineWidth = 3;
                                ctx.beginPath();
                                ctx.arc(335, 89, 50, 0, Math.PI * 2);
                                ctx.stroke();
                                ctx.fillStyle = viz.colors.red;
                                ctx.font = 'bold 14px -apple-system,sans-serif';
                                ctx.fillText('Only 2 ones!', 400, 150);
                                ctx.fillText('Need to subtract 8!', 400, 170);
                                ctx.fillText('2 < 8 ... not enough!', 400, 195);
                            } else if (step === 2) {
                                // 4 tens (one is breaking apart)
                                for (var t = 0; t < 4; t++) {
                                    drawBlock(ctx, 40 + t * 42, 75, 36, 80, viz.colors.blue, '10');
                                }
                                // The breaking ten - show as explosion
                                ctx.strokeStyle = viz.colors.orange;
                                ctx.lineWidth = 2;
                                ctx.setLineDash([3, 3]);
                                ctx.strokeRect(40 + 4 * 42, 75, 36, 80);
                                ctx.setLineDash([]);
                                ctx.fillStyle = viz.colors.orange;
                                ctx.font = '12px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.fillText('break!', 40 + 4 * 42 + 18, 170);

                                // Arrow
                                ctx.strokeStyle = viz.colors.orange;
                                ctx.lineWidth = 2;
                                ctx.beginPath();
                                ctx.moveTo(230, 115);
                                ctx.lineTo(280, 90);
                                ctx.stroke();
                                ctx.fillStyle = viz.colors.orange;
                                ctx.beginPath();
                                ctx.moveTo(280, 90);
                                ctx.lineTo(272, 90);
                                ctx.lineTo(276, 82);
                                ctx.closePath();
                                ctx.fill();

                                // 12 ones (2 original + 10 from broken ten)
                                for (var o = 0; o < 12; o++) {
                                    var ox = 280 + (o % 6) * 35;
                                    var oy = 75 + Math.floor(o / 6) * 35;
                                    var color = o < 2 ? viz.colors.green : viz.colors.orange;
                                    drawBlock(ctx, ox, oy, 28, 28, color, '1');
                                }
                                ctx.fillStyle = viz.colors.white;
                                ctx.font = '14px -apple-system,sans-serif';
                                ctx.fillText('Now: 4 tens + 12 ones (still = 52!)', viz.width / 2, 210);
                            } else if (step === 3) {
                                // 4 tens
                                for (var t = 0; t < 4; t++) {
                                    drawBlock(ctx, 40 + t * 42, 75, 36, 80, viz.colors.blue, '10');
                                }
                                // 12 ones, last 8 crossed out
                                for (var o = 0; o < 12; o++) {
                                    var ox = 280 + (o % 6) * 35;
                                    var oy = 75 + Math.floor(o / 6) * 35;
                                    if (o >= 4) {
                                        drawBlock(ctx, ox, oy, 28, 28, viz.colors.red, '1');
                                        ctx.strokeStyle = viz.colors.red;
                                        ctx.lineWidth = 2;
                                        ctx.beginPath(); ctx.moveTo(ox, oy); ctx.lineTo(ox + 28, oy + 28); ctx.stroke();
                                        ctx.beginPath(); ctx.moveTo(ox + 28, oy); ctx.lineTo(ox, oy + 28); ctx.stroke();
                                    } else {
                                        drawBlock(ctx, ox, oy, 28, 28, viz.colors.green, '1');
                                    }
                                }
                                ctx.fillStyle = viz.colors.green;
                                ctx.font = 'bold 16px -apple-system,sans-serif';
                                ctx.fillText('12 - 8 = 4 ones remain', viz.width / 2, 210);
                            } else {
                                // 2 tens remain, 2 crossed out
                                for (var t = 0; t < 4; t++) {
                                    if (t < 2) {
                                        drawBlock(ctx, 40 + t * 42, 75, 36, 80, viz.colors.blue, '10');
                                    } else {
                                        drawBlock(ctx, 40 + t * 42, 75, 36, 80, viz.colors.red, '10');
                                        ctx.strokeStyle = viz.colors.red;
                                        ctx.lineWidth = 2;
                                        ctx.beginPath();
                                        ctx.moveTo(40 + t * 42, 75);
                                        ctx.lineTo(40 + t * 42 + 36, 155);
                                        ctx.stroke();
                                        ctx.beginPath();
                                        ctx.moveTo(40 + t * 42 + 36, 75);
                                        ctx.lineTo(40 + t * 42, 155);
                                        ctx.stroke();
                                    }
                                }
                                // 4 ones
                                for (var o = 0; o < 4; o++) {
                                    drawBlock(ctx, 300 + o * 35, 75, 28, 28, viz.colors.green, '1');
                                }

                                ctx.fillStyle = viz.colors.green;
                                ctx.font = 'bold 18px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.fillText('2 tens + 4 ones = 24', viz.width / 2, 200);
                                ctx.fillStyle = viz.colors.yellow;
                                ctx.font = 'bold 20px -apple-system,sans-serif';
                                ctx.fillText('52 - 28 = 24', viz.width / 2, 240);
                            }
                        }

                        draw();
                        return viz;
                    }
                },
                {
                    id: 'viz-ch02-place-value-blocks',
                    title: 'Place Value Blocks Explorer',
                    description: 'Change the numbers and watch the blocks update! See when regrouping is needed.',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { width: 560, height: 260, scale: 40, originX: 280, originY: 230 });
                        var topNum = 63;
                        var botNum = 27;

                        VizEngine.createSlider(controls, 'Top number:', 10, 99, topNum, 1, function(val) {
                            topNum = Math.round(val);
                            if (botNum > topNum) botNum = topNum;
                            draw();
                        });
                        VizEngine.createSlider(controls, 'Subtract:', 1, 99, botNum, 1, function(val) {
                            botNum = Math.min(Math.round(val), topNum);
                            draw();
                        });

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            var topTens = Math.floor(topNum / 10);
                            var topOnes = topNum % 10;
                            var botTens = Math.floor(botNum / 10);
                            var botOnes = botNum % 10;
                            var needRegroup = topOnes < botOnes;
                            var result = topNum - botNum;

                            // Title
                            ctx.fillStyle = viz.colors.yellow;
                            ctx.font = 'bold 18px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText(topNum + ' - ' + botNum + ' = ' + result, viz.width / 2, 25);

                            // Regroup indicator
                            if (needRegroup) {
                                ctx.fillStyle = viz.colors.orange;
                                ctx.font = '14px -apple-system,sans-serif';
                                ctx.fillText('Regrouping needed! (' + topOnes + ' < ' + botOnes + ' in ones place)', viz.width / 2, 50);

                                var newTopTens = topTens - 1;
                                var newTopOnes = topOnes + 10;
                                ctx.fillStyle = viz.colors.teal;
                                ctx.fillText(topNum + ' = ' + newTopTens + ' tens + ' + newTopOnes + ' ones', viz.width / 2, 72);

                                var resTens = newTopTens - botTens;
                                var resOnes = newTopOnes - botOnes;
                                ctx.fillStyle = viz.colors.white;
                                ctx.font = '13px -apple-system,sans-serif';
                                ctx.fillText('Ones: ' + newTopOnes + ' - ' + botOnes + ' = ' + resOnes, 180, 100);
                                ctx.fillText('Tens: ' + newTopTens + ' - ' + botTens + ' = ' + resTens, 400, 100);
                            } else {
                                ctx.fillStyle = viz.colors.green;
                                ctx.font = '14px -apple-system,sans-serif';
                                ctx.fillText('No regrouping needed! (' + topOnes + ' >= ' + botOnes + ')', viz.width / 2, 50);

                                ctx.fillStyle = viz.colors.white;
                                ctx.font = '13px -apple-system,sans-serif';
                                ctx.fillText('Ones: ' + topOnes + ' - ' + botOnes + ' = ' + (topOnes - botOnes), 180, 80);
                                ctx.fillText('Tens: ' + topTens + ' - ' + botTens + ' = ' + (topTens - botTens), 400, 80);
                            }

                            // Draw result blocks
                            var resTens2 = Math.floor(result / 10);
                            var resOnes2 = result % 10;

                            // Tens blocks
                            for (var t = 0; t < resTens2; t++) {
                                ctx.fillStyle = viz.colors.blue + '66';
                                ctx.strokeStyle = viz.colors.blue;
                                ctx.lineWidth = 2;
                                ctx.fillRect(30 + t * 55, 125, 45, 100);
                                ctx.strokeRect(30 + t * 55, 125, 45, 100);
                                ctx.fillStyle = viz.colors.blue;
                                ctx.font = 'bold 14px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.fillText('10', 30 + t * 55 + 22, 178);
                            }

                            // Ones blocks
                            for (var o = 0; o < resOnes2; o++) {
                                ctx.fillStyle = viz.colors.green + '66';
                                ctx.strokeStyle = viz.colors.green;
                                ctx.lineWidth = 2;
                                var ox = 330 + o * 30;
                                ctx.fillRect(ox, 150, 22, 22);
                                ctx.strokeRect(ox, 150, 22, 22);
                                ctx.fillStyle = viz.colors.green;
                                ctx.font = '10px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.fillText('1', ox + 11, 164);
                            }

                            // Result
                            ctx.fillStyle = viz.colors.green;
                            ctx.font = 'bold 16px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('Result: ' + resTens2 + ' tens + ' + resOnes2 + ' ones = ' + result, viz.width / 2, 245);
                        }

                        draw();
                        return viz;
                    }
                },
                {
                    id: 'viz-ch02-multi-digit-practice',
                    title: 'Multi-Digit Subtraction Practice',
                    description: 'Try random two-digit subtraction problems with regrouping!',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { width: 560, height: 220, scale: 40, originX: 280, originY: 180 });
                        var a = 0, b = 0;
                        var showWork = false;

                        function newProblem() {
                            a = Math.floor(Math.random() * 70) + 20;
                            b = Math.floor(Math.random() * (a - 10)) + 10;
                            showWork = false;
                            draw();
                        }

                        VizEngine.createButton(controls, 'New Problem', newProblem);
                        VizEngine.createButton(controls, 'Show Work', function() { showWork = true; draw(); });

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;
                            var result = a - b;
                            var aTens = Math.floor(a / 10), aOnes = a % 10;
                            var bTens = Math.floor(b / 10), bOnes = b % 10;
                            var needRegroup = aOnes < bOnes;

                            // Problem display (vertical format)
                            ctx.font = 'bold 36px monospace';
                            ctx.textAlign = 'right';

                            ctx.fillStyle = viz.colors.white;
                            ctx.fillText(String(a), 200, 60);
                            ctx.fillStyle = viz.colors.red;
                            ctx.fillText('-  ' + String(b), 200, 100);

                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            ctx.moveTo(100, 110);
                            ctx.lineTo(210, 110);
                            ctx.stroke();

                            if (showWork) {
                                ctx.fillStyle = viz.colors.green;
                                ctx.font = 'bold 36px monospace';
                                ctx.fillText(String(result), 200, 150);

                                // Work explanation on the right
                                ctx.font = '14px -apple-system,sans-serif';
                                ctx.textAlign = 'left';
                                var wy = 45;
                                if (needRegroup) {
                                    ctx.fillStyle = viz.colors.orange;
                                    ctx.fillText('Regroup: ' + aOnes + ' < ' + bOnes + ', so borrow 1 ten', 260, wy);
                                    wy += 22;
                                    var newOnes = aOnes + 10;
                                    var newTens = aTens - 1;
                                    ctx.fillStyle = viz.colors.teal;
                                    ctx.fillText('Ones: ' + newOnes + ' - ' + bOnes + ' = ' + (newOnes - bOnes), 260, wy);
                                    wy += 22;
                                    ctx.fillText('Tens: ' + newTens + ' - ' + bTens + ' = ' + (newTens - bTens), 260, wy);
                                } else {
                                    ctx.fillStyle = viz.colors.green;
                                    ctx.fillText('No regrouping needed!', 260, wy);
                                    wy += 22;
                                    ctx.fillStyle = viz.colors.teal;
                                    ctx.fillText('Ones: ' + aOnes + ' - ' + bOnes + ' = ' + (aOnes - bOnes), 260, wy);
                                    wy += 22;
                                    ctx.fillText('Tens: ' + aTens + ' - ' + bTens + ' = ' + (aTens - bTens), 260, wy);
                                }

                                ctx.fillStyle = viz.colors.yellow;
                                ctx.font = 'bold 16px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.fillText(a + ' - ' + b + ' = ' + result, viz.width / 2, 195);
                            } else {
                                ctx.fillStyle = viz.colors.white;
                                ctx.font = 'bold 36px monospace';
                                ctx.textAlign = 'right';
                                ctx.fillText('?', 200, 150);

                                ctx.fillStyle = viz.colors.text;
                                ctx.font = '14px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.fillText('Try solving it on paper first, then click "Show Work"!', viz.width / 2, 195);
                            }
                        }

                        newProblem();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Solve \\(61 - 35\\) using regrouping. Show all the steps.',
                    hint: 'Look at the ones place: 1 - 5. Is 1 big enough? If not, regroup by borrowing 1 ten.',
                    solution: 'Ones: \\(1 < 5\\), so regroup. Borrow 1 ten: tens become \\(6 - 1 = 5\\), ones become \\(1 + 10 = 11\\). Now: ones \\(11 - 5 = 6\\), tens \\(5 - 3 = 2\\). Answer: \\(61 - 35 = 26\\).'
                },
                {
                    question: 'Solve \\(84 - 39\\). Does this problem need regrouping?',
                    hint: 'Check the ones: is 4 bigger than 9? If not, you need to regroup!',
                    solution: 'Yes, it needs regrouping because \\(4 < 9\\). Borrow: tens \\(8 \\to 7\\), ones \\(4 \\to 14\\). Ones: \\(14 - 9 = 5\\). Tens: \\(7 - 3 = 4\\). Answer: \\(84 - 39 = 45\\).'
                },
                {
                    question: 'Solve \\(56 - 23\\). Does this problem need regrouping? Explain why or why not.',
                    hint: 'Compare the ones digits: is 6 bigger than 3?',
                    solution: 'No regrouping needed because \\(6 > 3\\). Ones: \\(6 - 3 = 3\\). Tens: \\(5 - 2 = 3\\). Answer: \\(56 - 23 = 33\\). We only regroup when the top digit is smaller than the bottom digit.'
                }
            ]
        },

        // ============================================================
        // SECTION 5: Subtraction & Addition Are Friends
        // ============================================================
        {
            id: 'ch02-sec05',
            title: 'Subtraction & Addition Are Friends',
            content: `
<h2>Subtraction & Addition Are Friends</h2>

<p>Here is one of the most important ideas in math: <strong>addition and subtraction are inverse operations</strong>. That is a fancy way of saying they are <em>opposites</em> that undo each other!</p>

<div class="env-block intuition">
    <div class="env-title">Discovery</div>
    <p>If you add 5 and then subtract 5, you end up right back where you started! Addition moves you forward, subtraction moves you backward &mdash; by the same amount.</p>
    <p>\\[ 7 + 5 = 12 \\quad \\text{and} \\quad 12 - 5 = 7 \\]</p>
    <p>They undo each other. Like tying and untying your shoes!</p>
</div>

<h3>Fact Families</h3>

<p>A <strong>fact family</strong> is a group of related addition and subtraction facts that all use the same three numbers. Every set of three numbers has a family of <strong>four facts</strong>:</p>

<p>Take the numbers <strong>3, 5, and 8</strong>:</p>

<div style="text-align:center; margin:1rem 0; line-height:2.2;">
    <span style="color:#3fb950;">\\(3 + 5 = 8\\)</span> &nbsp;&nbsp;&nbsp;
    <span style="color:#58a6ff;">\\(5 + 3 = 8\\)</span><br>
    <span style="color:#f0883e;">\\(8 - 3 = 5\\)</span> &nbsp;&nbsp;&nbsp;
    <span style="color:#bc8cff;">\\(8 - 5 = 3\\)</span>
</div>

<p>All four facts use only the numbers 3, 5, and 8. They are a <strong>family</strong>!</p>

<div class="viz-placeholder" data-viz="viz-ch02-fact-family"></div>

<div class="env-block example">
    <div class="env-title">Example</div>
    <p><strong>Find the fact family for 4, 7, and 11:</strong></p>
    <ul>
        <li>\\(4 + 7 = 11\\)</li>
        <li>\\(7 + 4 = 11\\)</li>
        <li>\\(11 - 4 = 7\\)</li>
        <li>\\(11 - 7 = 4\\)</li>
    </ul>
    <p>Four facts, three numbers, one happy family!</p>
</div>

<h3>Checking Your Answers</h3>

<p>Because addition and subtraction undo each other, you can <strong>check your subtraction by adding</strong>!</p>

<p>If you think \\(15 - 9 = 6\\), check it: does \\(6 + 9 = 15\\)? Yes! Your answer is correct.</p>

<div class="env-block example">
    <div class="env-title">Try This!</div>
    <p><strong>Check these answers. Are they right?</strong></p>
    <ul>
        <li>\\(20 - 8 = 12\\) &mdash; Check: \\(12 + 8 = 20\\). Correct!</li>
        <li>\\(14 - 6 = 9\\) &mdash; Check: \\(9 + 6 = 15\\). That is not 14! The answer should be <strong>8</strong>.</li>
    </ul>
</div>

<div class="viz-placeholder" data-viz="viz-ch02-inverse-machine"></div>

<div class="env-block remark">
    <div class="env-title">Think About It</div>
    <p>Whenever you finish a subtraction problem, you can always check it with addition. This is like having a "double-check superpower"! Professional mathematicians do this too.</p>
</div>

<h3>The Big Picture</h3>

<p>Let us put it all together. When you see \\(a - b = c\\), you automatically know:</p>

<p>\\[ a - b = c \\quad \\Longleftrightarrow \\quad b + c = a \\]</p>

<p>This connection between addition and subtraction will be your best friend as you learn more math. It helps with:</p>

<ul>
    <li>Checking your work</li>
    <li>Solving missing-number puzzles</li>
    <li>Understanding algebra (coming in a future chapter!)</li>
    <li>Building mental math speed</li>
</ul>

<div class="viz-placeholder" data-viz="viz-ch02-fact-family-builder"></div>

<div class="env-block intuition">
    <div class="env-title">Cool Fact</div>
    <p>Every subtraction fact is secretly an addition fact in disguise, and every addition fact is secretly two subtraction facts! With just three numbers, you get a whole family of math facts.</p>
</div>
`,
            visualizations: [
                {
                    id: 'viz-ch02-fact-family',
                    title: 'Fact Family House',
                    description: 'Change the numbers and see all four facts in the family!',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { width: 560, height: 320, scale: 40, originX: 280, originY: 280 });
                        var numA = 3;
                        var numB = 5;

                        VizEngine.createSlider(controls, 'First number:', 1, 12, numA, 1, function(val) {
                            numA = Math.round(val);
                            draw();
                        });
                        VizEngine.createSlider(controls, 'Second number:', 1, 12, numB, 1, function(val) {
                            numB = Math.round(val);
                            draw();
                        });

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;
                            var total = numA + numB;
                            var cx = viz.width / 2;

                            // Draw house roof
                            ctx.fillStyle = viz.colors.yellow + '33';
                            ctx.strokeStyle = viz.colors.yellow;
                            ctx.lineWidth = 3;
                            ctx.beginPath();
                            ctx.moveTo(cx, 20);
                            ctx.lineTo(cx - 180, 90);
                            ctx.lineTo(cx + 180, 90);
                            ctx.closePath();
                            ctx.fill();
                            ctx.stroke();

                            // Total number in roof
                            ctx.fillStyle = viz.colors.yellow;
                            ctx.font = 'bold 28px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText(total, cx, 72);

                            // House body
                            ctx.fillStyle = '#1a1a4066';
                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 2;
                            ctx.fillRect(cx - 180, 90, 360, 210);
                            ctx.strokeRect(cx - 180, 90, 360, 210);

                            // Two numbers at bottom of roof
                            ctx.fillStyle = viz.colors.green;
                            ctx.font = 'bold 22px -apple-system,sans-serif';
                            ctx.fillText(numA, cx - 80, 118);
                            ctx.fillStyle = viz.colors.blue;
                            ctx.fillText(numB, cx + 80, 118);

                            // Four facts
                            var facts = [
                                { text: numA + ' + ' + numB + ' = ' + total, color: viz.colors.green },
                                { text: numB + ' + ' + numA + ' = ' + total, color: viz.colors.blue },
                                { text: total + ' - ' + numA + ' = ' + numB, color: viz.colors.orange },
                                { text: total + ' - ' + numB + ' = ' + numA, color: viz.colors.purple }
                            ];

                            for (var i = 0; i < 4; i++) {
                                var fy = 155 + i * 36;
                                ctx.fillStyle = facts[i].color + '22';
                                ctx.strokeStyle = facts[i].color;
                                ctx.lineWidth = 1.5;
                                ctx.beginPath();
                                ctx.roundRect(cx - 130, fy - 14, 260, 30, 6);
                                ctx.fill();
                                ctx.stroke();

                                ctx.fillStyle = facts[i].color;
                                ctx.font = 'bold 16px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.fillText(facts[i].text, cx, fy + 5);
                            }
                        }

                        draw();
                        return viz;
                    }
                },
                {
                    id: 'viz-ch02-inverse-machine',
                    title: 'The Add/Subtract Undo Machine',
                    description: 'Watch addition and subtraction undo each other on the number line!',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { width: 560, height: 230, scale: 30, originX: 30, originY: 140 });
                        var startNum = 7;
                        var amount = 5;
                        var showUndo = false;

                        VizEngine.createSlider(controls, 'Start:', 1, 10, startNum, 1, function(val) {
                            startNum = Math.round(val);
                            showUndo = false;
                            draw();
                        });
                        VizEngine.createSlider(controls, 'Add/Subtract:', 1, 8, amount, 1, function(val) {
                            amount = Math.round(val);
                            showUndo = false;
                            draw();
                        });
                        VizEngine.createButton(controls, 'Undo!', function() {
                            showUndo = !showUndo;
                            draw();
                        });

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;
                            var s = viz.scale;
                            var oX = viz.originX;
                            var oY = viz.originY;
                            var afterAdd = startNum + amount;
                            var maxNum = afterAdd + 2;

                            // Number line
                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            ctx.moveTo(oX, oY);
                            ctx.lineTo(oX + maxNum * s, oY);
                            ctx.stroke();

                            for (var i = 0; i <= maxNum; i++) {
                                var tx = oX + i * s;
                                ctx.strokeStyle = viz.colors.axis;
                                ctx.lineWidth = 1;
                                ctx.beginPath();
                                ctx.moveTo(tx, oY - 5);
                                ctx.lineTo(tx, oY + 5);
                                ctx.stroke();
                                ctx.fillStyle = viz.colors.text;
                                ctx.font = '11px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.textBaseline = 'top';
                                ctx.fillText(String(i), tx, oY + 8);
                            }

                            // Addition arc (green, above)
                            var fromX = oX + startNum * s;
                            var toX = oX + afterAdd * s;
                            var midX = (fromX + toX) / 2;
                            ctx.strokeStyle = viz.colors.green;
                            ctx.lineWidth = 3;
                            ctx.beginPath();
                            ctx.moveTo(fromX, oY - 10);
                            ctx.quadraticCurveTo(midX, oY - 55, toX, oY - 10);
                            ctx.stroke();

                            // Arrow
                            ctx.fillStyle = viz.colors.green;
                            ctx.beginPath();
                            ctx.moveTo(toX, oY - 10);
                            ctx.lineTo(toX - 8, oY - 18);
                            ctx.lineTo(toX - 4, oY - 6);
                            ctx.closePath();
                            ctx.fill();

                            ctx.fillStyle = viz.colors.green;
                            ctx.font = 'bold 13px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('+' + amount, midX, oY - 60);

                            // Subtraction arc (red, below) if undo shown
                            if (showUndo) {
                                ctx.strokeStyle = viz.colors.orange;
                                ctx.lineWidth = 3;
                                ctx.beginPath();
                                ctx.moveTo(toX, oY + 12);
                                ctx.quadraticCurveTo(midX, oY + 55, fromX, oY + 12);
                                ctx.stroke();

                                ctx.fillStyle = viz.colors.orange;
                                ctx.beginPath();
                                ctx.moveTo(fromX, oY + 12);
                                ctx.lineTo(fromX + 8, oY + 20);
                                ctx.lineTo(fromX + 4, oY + 8);
                                ctx.closePath();
                                ctx.fill();

                                ctx.fillStyle = viz.colors.orange;
                                ctx.font = 'bold 13px -apple-system,sans-serif';
                                ctx.fillText('-' + amount, midX, oY + 64);

                                // Back at start label
                                ctx.fillStyle = viz.colors.yellow;
                                ctx.font = 'bold 14px -apple-system,sans-serif';
                                ctx.fillText('Back to ' + startNum + '!', fromX, oY + 85);
                            }

                            // Start point
                            ctx.fillStyle = viz.colors.blue;
                            ctx.beginPath();
                            ctx.arc(fromX, oY, 7, 0, Math.PI * 2);
                            ctx.fill();

                            // After add point
                            ctx.fillStyle = viz.colors.green;
                            ctx.beginPath();
                            ctx.arc(toX, oY, 7, 0, Math.PI * 2);
                            ctx.fill();

                            // Title
                            ctx.fillStyle = viz.colors.yellow;
                            ctx.font = 'bold 16px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            if (showUndo) {
                                ctx.fillText(startNum + ' + ' + amount + ' = ' + afterAdd + '    then    ' + afterAdd + ' - ' + amount + ' = ' + startNum, viz.width / 2, 20);
                            } else {
                                ctx.fillText(startNum + ' + ' + amount + ' = ' + afterAdd + '    (click Undo to subtract it back!)', viz.width / 2, 20);
                            }
                        }

                        draw();
                        return viz;
                    }
                },
                {
                    id: 'viz-ch02-fact-family-builder',
                    title: 'Fact Family Builder Challenge',
                    description: 'Given one fact, can you figure out the other three in the family?',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { width: 560, height: 260, scale: 40, originX: 280, originY: 220 });
                        var a = 0, b = 0, total = 0;
                        var revealed = [true, false, false, false];

                        function newChallenge() {
                            a = Math.floor(Math.random() * 9) + 2;
                            b = Math.floor(Math.random() * 9) + 2;
                            total = a + b;
                            revealed = [true, false, false, false];
                            draw();
                        }

                        VizEngine.createButton(controls, 'New Challenge', newChallenge);
                        VizEngine.createButton(controls, 'Reveal Next', function() {
                            for (var i = 0; i < 4; i++) {
                                if (!revealed[i]) { revealed[i] = true; draw(); return; }
                            }
                        });
                        VizEngine.createButton(controls, 'Reveal All', function() {
                            revealed = [true, true, true, true];
                            draw();
                        });

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;
                            var cx = viz.width / 2;

                            var facts = [
                                a + ' + ' + b + ' = ' + total,
                                b + ' + ' + a + ' = ' + total,
                                total + ' - ' + a + ' = ' + b,
                                total + ' - ' + b + ' = ' + a
                            ];
                            var labels = ['Addition 1', 'Addition 2', 'Subtraction 1', 'Subtraction 2'];
                            var colors = [viz.colors.green, viz.colors.blue, viz.colors.orange, viz.colors.purple];

                            ctx.fillStyle = viz.colors.yellow;
                            ctx.font = 'bold 18px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('Fact Family for ' + a + ', ' + b + ', ' + total, cx, 30);

                            // Three numbers in circles
                            var nums = [a, b, total];
                            var numColors = [viz.colors.green, viz.colors.blue, viz.colors.yellow];
                            for (var n = 0; n < 3; n++) {
                                var nx = cx - 100 + n * 100;
                                ctx.fillStyle = numColors[n] + '33';
                                ctx.strokeStyle = numColors[n];
                                ctx.lineWidth = 2;
                                ctx.beginPath();
                                ctx.arc(nx, 70, 24, 0, Math.PI * 2);
                                ctx.fill();
                                ctx.stroke();
                                ctx.fillStyle = numColors[n];
                                ctx.font = 'bold 18px -apple-system,sans-serif';
                                ctx.fillText(String(nums[n]), nx, 76);
                            }

                            // Four fact slots
                            for (var i = 0; i < 4; i++) {
                                var col = i % 2;
                                var row = Math.floor(i / 2);
                                var bx = col === 0 ? 40 : 300;
                                var by = 110 + row * 60;

                                ctx.fillStyle = colors[i] + '15';
                                ctx.strokeStyle = colors[i];
                                ctx.lineWidth = 1.5;
                                ctx.beginPath();
                                ctx.roundRect(bx, by, 220, 44, 8);
                                ctx.fill();
                                ctx.stroke();

                                ctx.fillStyle = colors[i];
                                ctx.font = '11px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.fillText(labels[i], bx + 110, by + 14);

                                ctx.font = 'bold 18px -apple-system,sans-serif';
                                if (revealed[i]) {
                                    ctx.fillText(facts[i], bx + 110, by + 35);
                                } else {
                                    ctx.fillStyle = viz.colors.text;
                                    ctx.fillText('? + ? = ?', bx + 110, by + 35);
                                }
                            }
                        }

                        newChallenge();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Write the complete fact family for the numbers <strong>6, 9, and 15</strong>.',
                    hint: 'A fact family has 4 facts: two addition facts and two subtraction facts, all using the same three numbers.',
                    solution: 'The fact family is: \\(6 + 9 = 15\\), \\(9 + 6 = 15\\), \\(15 - 6 = 9\\), \\(15 - 9 = 6\\).'
                },
                {
                    question: 'You calculated \\(43 - 17 = 26\\). How can you check your answer using addition?',
                    hint: 'If subtraction and addition are inverses, add the answer to the number you subtracted. Does it give you back the starting number?',
                    solution: 'Check: \\(26 + 17 = 43\\). Since this matches the starting number, the answer \\(43 - 17 = 26\\) is <strong>correct</strong>!'
                },
                {
                    question: 'Someone says \\(50 - 24 = 36\\). Use addition to check. Is this correct? If not, find the right answer.',
                    hint: 'Add the answer to 24. Do you get 50?',
                    solution: 'Check: \\(36 + 24 = 60\\). That is <strong>not</strong> 50, so the answer is wrong! The correct answer: \\(50 - 24 = 26\\). Check: \\(26 + 24 = 50\\). Correct!'
                }
            ]
        }
    ]
});
