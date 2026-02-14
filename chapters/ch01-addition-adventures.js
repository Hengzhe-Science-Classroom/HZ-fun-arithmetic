window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch01',
    number: 1,
    title: 'Addition Adventures',
    subtitle: 'Discover the magic of putting numbers together!',
    sections: [
        // ============================================================
        // SECTION 1: What Is Addition?
        // ============================================================
        {
            id: 'ch01-sec01',
            title: 'What Is Addition?',
            content: `
                <h2>What Is Addition?</h2>

                <p>Have you ever counted your toys, your crayons, or the stars in the sky? When you put groups of things <strong>together</strong>, you are doing something really cool called <strong>addition</strong>!</p>

                <div class="env-block intuition">
                    <div class="env-title">Discovery</div>
                    <div class="env-body">
                        <p>Addition means <strong>combining two or more groups</strong> to find out how many you have <strong>in total</strong>. We use the plus sign <strong>+</strong> to show addition, and the answer is called the <strong>sum</strong>.</p>
                        <p>For example: if you have 3 apples and your friend gives you 2 more apples, how many do you have altogether?</p>
                        <p style="text-align:center; font-size:1.2em;">\\(3 + 2 = 5\\)</p>
                        <p>You have <strong>5 apples</strong> in total!</p>
                    </div>
                </div>

                <p>Let's look at this more carefully. In an addition problem like \\(3 + 2 = 5\\):</p>
                <ul>
                    <li>The numbers being added (\\(3\\) and \\(2\\)) are called <strong>addends</strong>.</li>
                    <li>The answer (\\(5\\)) is called the <strong>sum</strong>.</li>
                    <li>The <strong>+</strong> sign means "put together" or "combine."</li>
                    <li>The <strong>=</strong> sign means "is the same as."</li>
                </ul>

                <div class="env-block example">
                    <div class="env-title">Try This!</div>
                    <div class="env-body">
                        <p>Imagine you have some stars. Count the first group, then count the second group, then put them together!</p>
                        <p style="text-align:center; font-size:1.3em;">\\(4 + 3 = 7\\)</p>
                        <p>Four stars plus three stars equals seven stars. You can check by counting: 1, 2, 3, 4 ... then keep going ... 5, 6, 7!</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="combining-groups-viz"></div>

                <h3>The Order Doesn't Matter!</h3>

                <p>Here's something amazing: when you add two numbers, it doesn't matter which one comes first! This is called the <strong>commutative property</strong> (a fancy word that means you can swap them around).</p>

                <p style="text-align:center; font-size:1.1em;">\\(3 + 5 = 8\\) &nbsp; and &nbsp; \\(5 + 3 = 8\\)</p>

                <p>See? You get the same answer either way!</p>

                <div class="env-block intuition">
                    <div class="env-title">Cool Fact</div>
                    <div class="env-body">
                        <p>You can also add <strong>three or more numbers</strong>. When you do, you can group them however you like. This is called the <strong>associative property</strong>.</p>
                        <p style="text-align:center;">\\((2 + 3) + 4 = 5 + 4 = 9\\)</p>
                        <p style="text-align:center;">\\(2 + (3 + 4) = 2 + 7 = 9\\)</p>
                        <p>Same answer! You can group the numbers any way you want.</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="commutative-swap-viz"></div>

                <h3>Adding Zero</h3>

                <p>What happens when you add <strong>zero</strong> to a number? Nothing changes!</p>
                <p style="text-align:center; font-size:1.1em;">\\(7 + 0 = 7\\) &nbsp;&nbsp;&nbsp; \\(0 + 12 = 12\\)</p>
                <p>Zero is like an invisible friend -- adding it doesn't change anything. We call zero the <strong>identity element</strong> for addition.</p>

                <div class="env-block remark">
                    <div class="env-title">Think About It</div>
                    <div class="env-body">
                        <p>Why does \\(5 + 0 = 5\\)? Because you're starting with 5 things and adding nothing to them. You still have 5 things!</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="add-zero-viz"></div>
            `,
            visualizations: [
                {
                    id: 'combining-groups-viz',
                    title: 'Combine Groups of Objects',
                    description: 'Click "Add More!" to combine the two groups. Drag the slider to change the group sizes.',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, {width: 560, height: 320, scale: 40, originX: 280, originY: 260});
                        var ctx = viz.ctx;

                        var groupA = 3;
                        var groupB = 4;
                        var merged = false;
                        var animProgress = 0;
                        var animating = false;

                        var sliderA = VizEngine.createSlider(controls, 'Group A', 1, 9, groupA, 1, function(v) {
                            groupA = Math.round(v); merged = false; animProgress = 0; animating = false; draw();
                        });
                        var sliderB = VizEngine.createSlider(controls, 'Group B', 1, 9, groupB, 1, function(v) {
                            groupB = Math.round(v); merged = false; animProgress = 0; animating = false; draw();
                        });
                        VizEngine.createButton(controls, 'Combine!', function() {
                            if (!merged && !animating) { animating = true; animProgress = 0; }
                        });
                        VizEngine.createButton(controls, 'Reset', function() {
                            merged = false; animating = false; animProgress = 0; draw();
                        });

                        var circleColors = [viz.colors.blue, viz.colors.teal, viz.colors.purple, viz.colors.pink,
                                             viz.colors.green, viz.colors.yellow, viz.colors.orange, viz.colors.red, viz.colors.white];

                        function drawApple(sx, sy, color, radius) {
                            ctx.fillStyle = color;
                            ctx.beginPath();
                            ctx.arc(sx, sy, radius, 0, Math.PI * 2);
                            ctx.fill();
                            ctx.strokeStyle = '#ffffff33';
                            ctx.lineWidth = 1.5;
                            ctx.stroke();
                            // Highlight
                            ctx.fillStyle = '#ffffff44';
                            ctx.beginPath();
                            ctx.arc(sx - radius * 0.25, sy - radius * 0.25, radius * 0.35, 0, Math.PI * 2);
                            ctx.fill();
                        }

                        function draw() {
                            viz.clear();

                            var total = groupA + groupB;
                            var r = 16;
                            var spacing = 38;

                            if (!merged && !animating) {
                                // Draw Group A on the left
                                var startAx = 280 - (groupA * spacing) / 2 - 60;
                                for (var i = 0; i < groupA; i++) {
                                    var sx = startAx + i * spacing + spacing / 2;
                                    drawApple(sx, 120, viz.colors.blue, r);
                                }
                                // Label
                                ctx.fillStyle = viz.colors.blue;
                                ctx.font = 'bold 16px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.fillText('Group A: ' + groupA, startAx + (groupA * spacing) / 2, 80);

                                // Draw Group B on the right
                                var startBx = 280 + 60;
                                for (var j = 0; j < groupB; j++) {
                                    var sx2 = startBx + j * spacing + spacing / 2;
                                    drawApple(sx2, 120, viz.colors.orange, r);
                                }
                                ctx.fillStyle = viz.colors.orange;
                                ctx.fillText('Group B: ' + groupB, startBx + (groupB * spacing) / 2, 80);

                                // Plus sign
                                ctx.fillStyle = viz.colors.white;
                                ctx.font = 'bold 28px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.fillText('+', 280, 120);

                                // Equation at bottom
                                ctx.fillStyle = viz.colors.yellow;
                                ctx.font = 'bold 22px -apple-system,sans-serif';
                                ctx.fillText(groupA + ' + ' + groupB + ' = ?', 280, 240);
                            } else {
                                // Merged or animating: show all together
                                var startX = 280 - (total * spacing) / 2;
                                for (var k = 0; k < total; k++) {
                                    var targetX = startX + k * spacing + spacing / 2;
                                    var col = k < groupA ? viz.colors.blue : viz.colors.orange;
                                    var currentX, currentY;
                                    if (animating) {
                                        // Calculate starting position
                                        var origX, origY = 120;
                                        if (k < groupA) {
                                            var sAx = 280 - (groupA * spacing) / 2 - 60;
                                            origX = sAx + k * spacing + spacing / 2;
                                        } else {
                                            var sBx = 280 + 60;
                                            origX = sBx + (k - groupA) * spacing + spacing / 2;
                                        }
                                        currentX = origX + (targetX - origX) * animProgress;
                                        currentY = origY + (180 - origY) * animProgress;
                                    } else {
                                        currentX = targetX;
                                        currentY = 180;
                                    }
                                    drawApple(currentX, currentY, col, r);
                                }

                                // Label
                                ctx.fillStyle = viz.colors.green;
                                ctx.font = 'bold 16px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.fillText('Together: ' + total + ' objects!', 280, 140);

                                // Equation
                                ctx.fillStyle = viz.colors.yellow;
                                ctx.font = 'bold 22px -apple-system,sans-serif';
                                ctx.fillText(groupA + ' + ' + groupB + ' = ' + total, 280, 260);
                            }
                        }

                        viz.animate(function() {
                            if (animating) {
                                animProgress += 0.025;
                                if (animProgress >= 1) {
                                    animProgress = 1;
                                    animating = false;
                                    merged = true;
                                }
                            }
                            draw();
                        });

                        return viz;
                    }
                },
                {
                    id: 'commutative-swap-viz',
                    title: 'Swap the Order -- Same Answer!',
                    description: 'See how swapping the two numbers still gives the same sum.',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, {width: 560, height: 260, scale: 40, originX: 280, originY: 200});
                        var ctx = viz.ctx;

                        var a = 4;
                        var b = 5;

                        var sliderA = VizEngine.createSlider(controls, 'First number', 1, 9, a, 1, function(v) { a = Math.round(v); draw(); });
                        var sliderB = VizEngine.createSlider(controls, 'Second number', 1, 9, b, 1, function(v) { b = Math.round(v); draw(); });

                        function drawRow(y, left, right, leftColor, rightColor) {
                            var total = left + right;
                            var bw = 28;
                            var gap = 4;
                            var startX = 280 - (total * (bw + gap)) / 2;
                            for (var i = 0; i < total; i++) {
                                var col = i < left ? leftColor : rightColor;
                                var sx = startX + i * (bw + gap);
                                ctx.fillStyle = col;
                                ctx.beginPath();
                                ctx.roundRect(sx, y, bw, bw, 5);
                                ctx.fill();
                            }
                        }

                        function draw() {
                            viz.clear();
                            var sum = a + b;

                            // Top row: a + b
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 16px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText(a + ' + ' + b + ' = ' + sum, 280, 30);
                            drawRow(45, a, b, viz.colors.blue, viz.colors.orange);

                            // Bottom row: b + a
                            ctx.fillStyle = viz.colors.white;
                            ctx.fillText(b + ' + ' + a + ' = ' + sum, 280, 120);
                            drawRow(135, b, a, viz.colors.orange, viz.colors.blue);

                            // Equals sign
                            ctx.fillStyle = viz.colors.green;
                            ctx.font = 'bold 20px -apple-system,sans-serif';
                            ctx.fillText('Same answer!', 280, 210);
                        }
                        draw();
                        return viz;
                    }
                },
                {
                    id: 'add-zero-viz',
                    title: 'Adding Zero Changes Nothing',
                    description: 'See what happens when you add zero to a number.',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, {width: 560, height: 220, scale: 40, originX: 280, originY: 180});
                        var ctx = viz.ctx;

                        var num = 5;
                        VizEngine.createSlider(controls, 'Number', 1, 9, num, 1, function(v) { num = Math.round(v); draw(); });

                        function draw() {
                            viz.clear();

                            var bw = 32;
                            var gap = 6;

                            // Draw the blocks for the number
                            var startX = 280 - (num * (bw + gap)) / 2;
                            for (var i = 0; i < num; i++) {
                                var sx = startX + i * (bw + gap);
                                ctx.fillStyle = viz.colors.teal;
                                ctx.beginPath();
                                ctx.roundRect(sx, 50, bw, bw, 5);
                                ctx.fill();
                                ctx.fillStyle = viz.colors.white;
                                ctx.font = 'bold 14px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.textBaseline = 'middle';
                                ctx.fillText(String(i + 1), sx + bw / 2, 50 + bw / 2);
                            }

                            // Plus zero
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 18px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'middle';
                            ctx.fillText(num + '  +  0  =  ' + num, 280, 130);

                            // Fun message
                            ctx.fillStyle = viz.colors.yellow;
                            ctx.font = '15px -apple-system,sans-serif';
                            ctx.fillText('Adding zero doesn\'t change anything!', 280, 170);
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'You have 6 red blocks and 3 blue blocks. How many blocks do you have altogether? Write the addition sentence.',
                    hint: 'An addition sentence looks like this: first number + second number = total. Put 6 and 3 together!',
                    solution: '\\(6 + 3 = 9\\). You have <strong>9 blocks</strong> in total.'
                },
                {
                    question: 'Is \\(4 + 7\\) the same as \\(7 + 4\\)? Try counting both ways!',
                    hint: 'Count up from 4 seven times: 5, 6, 7, 8, 9, 10, 11. Now count up from 7 four times: 8, 9, 10, 11.',
                    solution: 'Yes! Both \\(4 + 7\\) and \\(7 + 4\\) equal <strong>11</strong>. The order doesn\'t matter in addition!'
                },
                {
                    question: 'What is \\(15 + 0\\)? What about \\(0 + 23\\)?',
                    hint: 'Remember: adding zero to any number gives you the same number back.',
                    solution: '\\(15 + 0 = 15\\) and \\(0 + 23 = 23\\). Adding zero never changes the number!'
                }
            ]
        },

        // ============================================================
        // SECTION 2: Adding on a Number Line
        // ============================================================
        {
            id: 'ch01-sec02',
            title: 'Adding on a Number Line',
            content: `
                <h2>Adding on a Number Line</h2>

                <p>A <strong>number line</strong> is like a ruler for numbers. It's a straight line with numbers spaced evenly along it. You can use it to <strong>see</strong> addition happening!</p>

                <div class="env-block intuition">
                    <div class="env-title">Discovery</div>
                    <div class="env-body">
                        <p>Here's the big idea: to add on a number line, you <strong>start</strong> at the first number, then <strong>jump forward</strong> by the second number. Where you land is the answer!</p>
                        <p>For example, to find \\(3 + 4\\):</p>
                        <ol>
                            <li>Start at <strong>3</strong> on the number line.</li>
                            <li>Jump forward <strong>4 spaces</strong>.</li>
                            <li>You land on <strong>7</strong>. So \\(3 + 4 = 7\\)!</li>
                        </ol>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="number-line-jump-viz"></div>

                <h3>Bigger Jumps</h3>

                <p>You can use the number line for bigger numbers too! Let's try \\(5 + 6\\):</p>
                <ol>
                    <li>Start at <strong>5</strong>.</li>
                    <li>Jump forward <strong>6</strong>: land on 6, 7, 8, 9, 10, 11.</li>
                    <li>The answer is \\(5 + 6 = 11\\).</li>
                </ol>

                <div class="env-block example">
                    <div class="env-title">Example</div>
                    <div class="env-body">
                        <p>Let's add \\(8 + 5\\) on the number line:</p>
                        <p>Start at 8. Jump forward 5: you pass through 9, 10, 11, 12, 13.</p>
                        <p style="text-align:center; font-size:1.1em;">\\(8 + 5 = 13\\)</p>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Think About It</div>
                    <div class="env-body">
                        <p>Notice that adding on a number line always moves you to the <strong>right</strong> (toward bigger numbers). That makes sense because you're getting <strong>more</strong>!</p>
                        <p>What if you added 0? You wouldn't jump at all -- you'd stay right where you are!</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="number-line-interactive-viz"></div>

                <h3>Adding Two Jumps</h3>

                <p>What about adding three numbers, like \\(2 + 3 + 4\\)? Easy! Just make two jumps:</p>
                <ol>
                    <li>Start at <strong>2</strong>.</li>
                    <li>First jump: go forward <strong>3</strong>, landing on <strong>5</strong>.</li>
                    <li>Second jump: go forward <strong>4</strong>, landing on <strong>9</strong>.</li>
                </ol>
                <p style="text-align:center; font-size:1.1em;">\\(2 + 3 + 4 = 9\\)</p>

                <div class="env-block intuition">
                    <div class="env-title">Cool Fact</div>
                    <div class="env-body">
                        <p>The number line is used by mathematicians all over the world. It helps us <strong>see</strong> numbers and understand how they relate to each other. You'll use number lines all through your math journey!</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="double-jump-viz"></div>
            `,
            visualizations: [
                {
                    id: 'number-line-jump-viz',
                    title: 'Jump on the Number Line!',
                    description: 'Watch the frog jump forward to add numbers. Change the numbers to try different sums!',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, {width: 560, height: 220, scale: 35, originX: 30, originY: 140});
                        var ctx = viz.ctx;

                        var startNum = 3;
                        var jumpSize = 4;
                        var animT = 0;
                        var isAnimating = false;
                        var showResult = false;

                        VizEngine.createSlider(controls, 'Start at', 0, 10, startNum, 1, function(v) {
                            startNum = Math.round(v); animT = 0; isAnimating = false; showResult = false;
                        });
                        VizEngine.createSlider(controls, 'Jump by', 1, 10, jumpSize, 1, function(v) {
                            jumpSize = Math.round(v); animT = 0; isAnimating = false; showResult = false;
                        });
                        VizEngine.createButton(controls, 'Jump!', function() {
                            if (!isAnimating) { isAnimating = true; animT = 0; showResult = false; }
                        });
                        VizEngine.createButton(controls, 'Reset', function() {
                            isAnimating = false; animT = 0; showResult = false;
                        });

                        function drawNumberLine() {
                            var y = 140;
                            // Main line
                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            ctx.moveTo(20, y);
                            ctx.lineTo(540, y);
                            ctx.stroke();

                            // Tick marks and numbers
                            for (var n = 0; n <= 14; n++) {
                                var sx = 30 + n * 35;
                                ctx.strokeStyle = viz.colors.axis;
                                ctx.lineWidth = 1.5;
                                ctx.beginPath();
                                ctx.moveTo(sx, y - 8);
                                ctx.lineTo(sx, y + 8);
                                ctx.stroke();

                                ctx.fillStyle = viz.colors.text;
                                ctx.font = '13px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.textBaseline = 'top';
                                ctx.fillText(String(n), sx, y + 12);
                            }
                        }

                        function drawFrog(sx, sy) {
                            // Body
                            ctx.fillStyle = viz.colors.green;
                            ctx.beginPath();
                            ctx.ellipse(sx, sy - 8, 12, 10, 0, 0, Math.PI * 2);
                            ctx.fill();
                            // Eyes
                            ctx.fillStyle = viz.colors.white;
                            ctx.beginPath();
                            ctx.arc(sx - 5, sy - 16, 5, 0, Math.PI * 2);
                            ctx.arc(sx + 5, sy - 16, 5, 0, Math.PI * 2);
                            ctx.fill();
                            ctx.fillStyle = '#111';
                            ctx.beginPath();
                            ctx.arc(sx - 5, sy - 16, 2.5, 0, Math.PI * 2);
                            ctx.arc(sx + 5, sy - 16, 2.5, 0, Math.PI * 2);
                            ctx.fill();
                        }

                        function draw() {
                            viz.clear();
                            drawNumberLine();
                            var y = 140;
                            var scale = 35;

                            // Starting dot
                            var startSx = 30 + startNum * scale;
                            ctx.fillStyle = viz.colors.blue;
                            ctx.beginPath();
                            ctx.arc(startSx, y, 6, 0, Math.PI * 2);
                            ctx.fill();

                            // Figure out frog position
                            var currentJump = 0;
                            var frogX = startSx;
                            if (isAnimating || showResult) {
                                var totalSteps = jumpSize;
                                currentJump = showResult ? totalSteps : Math.min(Math.floor(animT * totalSteps), totalSteps);
                                var frac = showResult ? 0 : (animT * totalSteps) - currentJump;
                                if (currentJump >= totalSteps) {
                                    currentJump = totalSteps;
                                    frac = 0;
                                }
                                var fromX = startSx + currentJump * scale;
                                var toX = fromX + scale;
                                if (currentJump < totalSteps) {
                                    // Jumping arc
                                    var lerpX = fromX + (toX - fromX) * frac;
                                    var arcY = y - 50 * Math.sin(frac * Math.PI);
                                    frogX = lerpX;

                                    drawFrog(lerpX, arcY);
                                } else {
                                    frogX = startSx + totalSteps * scale;
                                    drawFrog(frogX, y);
                                }

                                // Draw arcs for completed jumps
                                for (var j = 0; j < currentJump; j++) {
                                    var jx1 = startSx + j * scale;
                                    var jx2 = jx1 + scale;
                                    ctx.strokeStyle = viz.colors.orange;
                                    ctx.lineWidth = 2;
                                    ctx.beginPath();
                                    ctx.arc((jx1 + jx2) / 2, y, scale / 2, Math.PI, 0, false);
                                    ctx.stroke();
                                    // Jump number
                                    ctx.fillStyle = viz.colors.orange;
                                    ctx.font = 'bold 11px -apple-system,sans-serif';
                                    ctx.textAlign = 'center';
                                    ctx.textBaseline = 'bottom';
                                    ctx.fillText(String(j + 1), (jx1 + jx2) / 2, y - scale / 2 - 4);
                                }
                            } else {
                                drawFrog(startSx, y);
                            }

                            // Result landing dot
                            if (showResult) {
                                var endSx = startSx + jumpSize * scale;
                                ctx.fillStyle = viz.colors.green;
                                ctx.beginPath();
                                ctx.arc(endSx, y, 6, 0, Math.PI * 2);
                                ctx.fill();
                            }

                            // Equation
                            var result = startNum + jumpSize;
                            ctx.fillStyle = viz.colors.yellow;
                            ctx.font = 'bold 20px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'middle';
                            if (showResult) {
                                ctx.fillText(startNum + ' + ' + jumpSize + ' = ' + result, 280, 30);
                            } else {
                                ctx.fillText(startNum + ' + ' + jumpSize + ' = ?', 280, 30);
                            }
                        }

                        viz.animate(function() {
                            if (isAnimating) {
                                animT += 0.012;
                                if (animT >= 1) {
                                    animT = 1;
                                    isAnimating = false;
                                    showResult = true;
                                }
                            }
                            draw();
                        });

                        return viz;
                    }
                },
                {
                    id: 'number-line-interactive-viz',
                    title: 'Build Your Own Addition',
                    description: 'Drag the blue dot to set your starting number. The orange arrow shows how far you jump!',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, {width: 560, height: 200, scale: 35, originX: 30, originY: 120});
                        var ctx = viz.ctx;

                        var startVal = 2;
                        var addVal = 5;

                        VizEngine.createSlider(controls, 'Add', 1, 10, addVal, 1, function(v) { addVal = Math.round(v); draw(); });

                        var dragger = viz.addDraggable('start', startVal, 0, viz.colors.blue, 8, function(wx) {
                            dragger.x = Math.max(0, Math.min(14, Math.round(wx)));
                            dragger.y = 0;
                            startVal = dragger.x;
                            draw();
                        });

                        function draw() {
                            viz.clear();
                            var y = 120;
                            var scale = 35;

                            // Number line
                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            ctx.moveTo(20, y);
                            ctx.lineTo(540, y);
                            ctx.stroke();

                            for (var n = 0; n <= 14; n++) {
                                var sx = 30 + n * scale;
                                ctx.strokeStyle = viz.colors.axis;
                                ctx.lineWidth = 1.5;
                                ctx.beginPath();
                                ctx.moveTo(sx, y - 6);
                                ctx.lineTo(sx, y + 6);
                                ctx.stroke();
                                ctx.fillStyle = viz.colors.text;
                                ctx.font = '12px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.textBaseline = 'top';
                                ctx.fillText(String(n), sx, y + 10);
                            }

                            // Arc for the jump
                            var startSx = 30 + startVal * scale;
                            var endVal = Math.min(startVal + addVal, 14);
                            var endSx = 30 + endVal * scale;
                            var arcR = (endSx - startSx) / 2;
                            if (arcR > 0) {
                                ctx.strokeStyle = viz.colors.orange;
                                ctx.lineWidth = 2.5;
                                ctx.setLineDash([6, 4]);
                                ctx.beginPath();
                                ctx.arc((startSx + endSx) / 2, y, arcR, Math.PI, 0, false);
                                ctx.stroke();
                                ctx.setLineDash([]);

                                // Arrow head at end
                                ctx.fillStyle = viz.colors.orange;
                                ctx.beginPath();
                                ctx.moveTo(endSx, y);
                                ctx.lineTo(endSx - 8, y - 8);
                                ctx.lineTo(endSx - 8, y + 0);
                                ctx.closePath();
                                ctx.fill();
                            }

                            // Jump label
                            ctx.fillStyle = viz.colors.orange;
                            ctx.font = 'bold 13px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'bottom';
                            ctx.fillText('+' + addVal, (startSx + endSx) / 2, y - arcR - 6);

                            // End dot
                            ctx.fillStyle = viz.colors.green;
                            ctx.beginPath();
                            ctx.arc(endSx, y, 6, 0, Math.PI * 2);
                            ctx.fill();

                            // Equation
                            ctx.fillStyle = viz.colors.yellow;
                            ctx.font = 'bold 18px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'middle';
                            ctx.fillText(startVal + ' + ' + addVal + ' = ' + (startVal + addVal), 280, 30);

                            viz.drawDraggables();
                        }
                        draw();
                        return viz;
                    }
                },
                {
                    id: 'double-jump-viz',
                    title: 'Two Jumps: Adding Three Numbers',
                    description: 'Watch two jumps on the number line to add three numbers together!',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, {width: 560, height: 220, scale: 28, originX: 30, originY: 140});
                        var ctx = viz.ctx;

                        var a = 2, b = 3, c = 4;
                        VizEngine.createSlider(controls, 'First', 0, 6, a, 1, function(v) { a = Math.round(v); draw(); });
                        VizEngine.createSlider(controls, 'Second', 1, 6, b, 1, function(v) { b = Math.round(v); draw(); });
                        VizEngine.createSlider(controls, 'Third', 1, 6, c, 1, function(v) { c = Math.round(v); draw(); });

                        function draw() {
                            viz.clear();
                            var y = 140;
                            var scale = 28;
                            var maxN = 18;

                            // Number line
                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            ctx.moveTo(20, y);
                            ctx.lineTo(540, y);
                            ctx.stroke();

                            for (var n = 0; n <= maxN; n++) {
                                var sx = 30 + n * scale;
                                if (sx > 540) break;
                                ctx.strokeStyle = viz.colors.axis;
                                ctx.lineWidth = 1;
                                ctx.beginPath();
                                ctx.moveTo(sx, y - 5);
                                ctx.lineTo(sx, y + 5);
                                ctx.stroke();
                                ctx.fillStyle = viz.colors.text;
                                ctx.font = '11px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.textBaseline = 'top';
                                ctx.fillText(String(n), sx, y + 8);
                            }

                            // First jump: a to a+b
                            var sx1 = 30 + a * scale;
                            var sx2 = 30 + (a + b) * scale;
                            var arcR1 = (sx2 - sx1) / 2;
                            if (arcR1 > 0) {
                                ctx.strokeStyle = viz.colors.blue;
                                ctx.lineWidth = 2.5;
                                ctx.beginPath();
                                ctx.arc((sx1 + sx2) / 2, y, arcR1, Math.PI, 0, false);
                                ctx.stroke();
                                ctx.fillStyle = viz.colors.blue;
                                ctx.font = 'bold 12px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.fillText('+' + b, (sx1 + sx2) / 2, y - arcR1 - 6);
                            }

                            // Second jump: a+b to a+b+c
                            var sx3 = 30 + (a + b + c) * scale;
                            var arcR2 = (sx3 - sx2) / 2;
                            if (arcR2 > 0) {
                                ctx.strokeStyle = viz.colors.orange;
                                ctx.lineWidth = 2.5;
                                ctx.beginPath();
                                ctx.arc((sx2 + sx3) / 2, y, arcR2, Math.PI, 0, false);
                                ctx.stroke();
                                ctx.fillStyle = viz.colors.orange;
                                ctx.font = 'bold 12px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.fillText('+' + c, (sx2 + sx3) / 2, y - arcR2 - 6);
                            }

                            // Dots
                            ctx.fillStyle = viz.colors.blue;
                            ctx.beginPath();
                            ctx.arc(sx1, y, 6, 0, Math.PI * 2);
                            ctx.fill();

                            ctx.fillStyle = viz.colors.purple;
                            ctx.beginPath();
                            ctx.arc(sx2, y, 5, 0, Math.PI * 2);
                            ctx.fill();

                            ctx.fillStyle = viz.colors.green;
                            ctx.beginPath();
                            ctx.arc(sx3, y, 6, 0, Math.PI * 2);
                            ctx.fill();

                            // Equation
                            var total = a + b + c;
                            ctx.fillStyle = viz.colors.yellow;
                            ctx.font = 'bold 18px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'middle';
                            ctx.fillText(a + ' + ' + b + ' + ' + c + ' = ' + total, 280, 30);

                            // Labels
                            ctx.fillStyle = viz.colors.blue;
                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.fillText('start: ' + a, sx1, y + 28);
                            ctx.fillStyle = viz.colors.green;
                            ctx.fillText('end: ' + total, sx3, y + 28);
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Use a number line to find \\(6 + 5\\). Start at 6 and jump forward 5. Where do you land?',
                    hint: 'Starting at 6, count 5 jumps forward: 7, 8, 9, 10, 11.',
                    solution: 'You land on <strong>11</strong>. So \\(6 + 5 = 11\\).'
                },
                {
                    question: 'If you start at 0 on the number line and jump forward 8, where do you end up? What addition problem does this show?',
                    hint: 'Starting at 0 and jumping forward 8 is like asking: what is \\(0 + 8\\)?',
                    solution: 'You end up at <strong>8</strong>. This shows \\(0 + 8 = 8\\). Starting from 0 and jumping forward just takes you to that number!'
                },
                {
                    question: 'Use the number line to add \\(3 + 4 + 2\\). How many total jumps do you make?',
                    hint: 'Make two sets of jumps: first jump 4 from 3 (landing on 7), then jump 2 from 7.',
                    solution: 'Start at 3, jump 4 to reach 7, then jump 2 to reach <strong>9</strong>. You make \\(4 + 2 = 6\\) individual jumps. So \\(3 + 4 + 2 = 9\\).'
                }
            ]
        },

        // ============================================================
        // SECTION 3: Addition Strategies
        // ============================================================
        {
            id: 'ch01-sec03',
            title: 'Addition Strategies',
            content: `
                <h2>Addition Strategies</h2>

                <p>Good news: you don't always have to count one by one! Smart mathematicians use <strong>strategies</strong> -- clever shortcuts that make addition faster and easier. Let's learn some of the best ones!</p>

                <h3>Strategy 1: Counting On</h3>

                <p><strong>Counting on</strong> means you start with the bigger number and count up by the smaller number. It's much faster than counting everything from the beginning!</p>

                <div class="env-block example">
                    <div class="env-title">Example</div>
                    <div class="env-body">
                        <p>To find \\(8 + 3\\):</p>
                        <p>Start at <strong>8</strong> (the bigger number) and count on 3: <strong>9, 10, 11</strong>.</p>
                        <p style="text-align:center;">\\(8 + 3 = 11\\)</p>
                        <p>Much faster than counting from 1 to 11!</p>
                    </div>
                </div>

                <h3>Strategy 2: Doubles</h3>

                <p><strong>Doubles</strong> are when you add a number to itself. They're easy to remember!</p>

                <div class="env-block intuition">
                    <div class="env-title">Discovery</div>
                    <div class="env-body">
                        <p>Here are the doubles you should know by heart:</p>
                        <p style="text-align:center;">
                            \\(1 + 1 = 2\\) &nbsp;&nbsp; \\(2 + 2 = 4\\) &nbsp;&nbsp; \\(3 + 3 = 6\\) &nbsp;&nbsp; \\(4 + 4 = 8\\)<br>
                            \\(5 + 5 = 10\\) &nbsp;&nbsp; \\(6 + 6 = 12\\) &nbsp;&nbsp; \\(7 + 7 = 14\\) &nbsp;&nbsp; \\(8 + 8 = 16\\)<br>
                            \\(9 + 9 = 18\\) &nbsp;&nbsp; \\(10 + 10 = 20\\)
                        </p>
                        <p>A double is always <strong>twice</strong> the number. If you know your doubles, you can figure out lots of other sums!</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="doubles-viz"></div>

                <h3>Strategy 3: Near Doubles</h3>

                <p>If you know your doubles, you can use them to solve <strong>near doubles</strong> -- problems where one number is just 1 more or 1 less than the other.</p>

                <div class="env-block example">
                    <div class="env-title">Try This!</div>
                    <div class="env-body">
                        <p>To find \\(6 + 7\\), think of it as a near double:</p>
                        <p style="text-align:center;">\\(6 + 7 = 6 + 6 + 1 = 12 + 1 = 13\\)</p>
                        <p>Or you could think: \\(6 + 7 = 7 + 7 - 1 = 14 - 1 = 13\\). Both work!</p>
                    </div>
                </div>

                <h3>Strategy 4: Making Ten</h3>

                <p>This is one of the most powerful strategies! The idea is to <strong>break apart</strong> one number so you can make a group of <strong>10</strong>, because adding to 10 is super easy.</p>

                <div class="env-block intuition">
                    <div class="env-title">Discovery</div>
                    <div class="env-body">
                        <p>To find \\(8 + 5\\):</p>
                        <ol>
                            <li>You need <strong>2 more</strong> to get from 8 to 10. So borrow 2 from the 5.</li>
                            <li>\\(8 + 5 = 8 + 2 + 3 = 10 + 3 = 13\\)</li>
                        </ol>
                        <p>The secret: \\(10 + \\text{anything}\\) is easy -- just put a 1 in front!</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="make-ten-viz"></div>

                <div class="env-block warning">
                    <div class="env-title">Watch Out!</div>
                    <div class="env-body">
                        <p>When you break apart a number to make ten, make sure you don't lose any! If you take 2 away from 5, you have 3 left. Always check: \\(2 + 3 = 5\\). The pieces must add up to the original number.</p>
                    </div>
                </div>

                <h3>Strategy 5: Adding 9</h3>

                <p>Adding 9 has a neat trick: <strong>add 10, then take away 1</strong>!</p>

                <div class="env-block example">
                    <div class="env-title">Example</div>
                    <div class="env-body">
                        <p>To find \\(9 + 7\\):</p>
                        <p style="text-align:center;">\\(9 + 7 = 10 + 7 - 1 = 17 - 1 = 16\\)</p>
                        <p>This works because 9 is just 1 less than 10!</p>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Think About It</div>
                    <div class="env-body">
                        <p>Every strategy is just a different way to get the same answer. You get to pick the one that feels easiest for each problem. The more strategies you know, the more tools you have in your math toolbox!</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="strategy-picker-viz"></div>
            `,
            visualizations: [
                {
                    id: 'doubles-viz',
                    title: 'Doubles Mirror',
                    description: 'See how doubles work -- two equal groups side by side!',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, {width: 560, height: 280, scale: 40, originX: 280, originY: 200});
                        var ctx = viz.ctx;

                        var num = 5;
                        VizEngine.createSlider(controls, 'Number', 1, 10, num, 1, function(v) { num = Math.round(v); draw(); });

                        function draw() {
                            viz.clear();
                            var bw = 26;
                            var gap = 4;
                            var mirrorGap = 20;

                            // Draw left group
                            var cols = Math.min(num, 5);
                            var rows = Math.ceil(num / 5);
                            var leftStartX = 280 - mirrorGap / 2 - cols * (bw + gap);
                            var topY = 60;

                            for (var i = 0; i < num; i++) {
                                var row = Math.floor(i / 5);
                                var col = i % 5;
                                var sx = leftStartX + col * (bw + gap);
                                var sy = topY + row * (bw + gap);
                                ctx.fillStyle = viz.colors.blue;
                                ctx.beginPath();
                                ctx.roundRect(sx, sy, bw, bw, 4);
                                ctx.fill();
                            }

                            // Draw right group (mirror)
                            var rightStartX = 280 + mirrorGap / 2;
                            for (var j = 0; j < num; j++) {
                                var row2 = Math.floor(j / 5);
                                var col2 = j % 5;
                                var sx2 = rightStartX + col2 * (bw + gap);
                                var sy2 = topY + row2 * (bw + gap);
                                ctx.fillStyle = viz.colors.orange;
                                ctx.beginPath();
                                ctx.roundRect(sx2, sy2, bw, bw, 4);
                                ctx.fill();
                            }

                            // Mirror line
                            ctx.strokeStyle = viz.colors.purple + '88';
                            ctx.lineWidth = 2;
                            ctx.setLineDash([6, 4]);
                            ctx.beginPath();
                            ctx.moveTo(280, 40);
                            ctx.lineTo(280, 40 + rows * (bw + gap) + 20);
                            ctx.stroke();
                            ctx.setLineDash([]);

                            // Labels
                            ctx.fillStyle = viz.colors.blue;
                            ctx.font = 'bold 16px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'middle';
                            ctx.fillText(String(num), leftStartX + (cols * (bw + gap)) / 2, topY + rows * (bw + gap) + 20);

                            ctx.fillStyle = viz.colors.orange;
                            ctx.fillText(String(num), rightStartX + (cols * (bw + gap)) / 2, topY + rows * (bw + gap) + 20);

                            // Equation
                            ctx.fillStyle = viz.colors.yellow;
                            ctx.font = 'bold 22px -apple-system,sans-serif';
                            ctx.fillText(num + ' + ' + num + ' = ' + (num * 2), 280, 230);

                            // Fun label
                            ctx.fillStyle = viz.colors.green;
                            ctx.font = '14px -apple-system,sans-serif';
                            ctx.fillText('Double of ' + num + ' is ' + (num * 2) + '!', 280, 260);
                        }
                        draw();
                        return viz;
                    }
                },
                {
                    id: 'make-ten-viz',
                    title: 'Making Ten',
                    description: 'Watch how we break a number apart to make a group of 10, then add the rest!',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, {width: 560, height: 340, scale: 40, originX: 280, originY: 280});
                        var ctx = viz.ctx;

                        var a = 8;
                        var b = 5;
                        var showBreak = false;

                        VizEngine.createSlider(controls, 'First number', 5, 9, a, 1, function(v) { a = Math.round(v); showBreak = false; draw(); });
                        VizEngine.createSlider(controls, 'Second number', 2, 9, b, 1, function(v) { b = Math.round(v); showBreak = false; draw(); });
                        VizEngine.createButton(controls, 'Make Ten!', function() { showBreak = true; draw(); });
                        VizEngine.createButton(controls, 'Reset', function() { showBreak = false; draw(); });

                        function draw() {
                            viz.clear();
                            var bw = 24;
                            var gap = 3;

                            var need = 10 - a; // how many to borrow from b
                            var leftover = b - need;

                            if (!showBreak) {
                                // Show two groups side by side
                                var startAx = 120;
                                for (var i = 0; i < a; i++) {
                                    var row = Math.floor(i / 5);
                                    var col = i % 5;
                                    ctx.fillStyle = viz.colors.blue;
                                    ctx.beginPath();
                                    ctx.roundRect(startAx + col * (bw + gap), 50 + row * (bw + gap), bw, bw, 4);
                                    ctx.fill();
                                }

                                var startBx = 320;
                                for (var j = 0; j < b; j++) {
                                    var row2 = Math.floor(j / 5);
                                    var col2 = j % 5;
                                    ctx.fillStyle = viz.colors.orange;
                                    ctx.beginPath();
                                    ctx.roundRect(startBx + col2 * (bw + gap), 50 + row2 * (bw + gap), bw, bw, 4);
                                    ctx.fill();
                                }

                                ctx.fillStyle = viz.colors.blue;
                                ctx.font = 'bold 16px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.fillText(String(a), 190, 35);

                                ctx.fillStyle = viz.colors.orange;
                                ctx.fillText(String(b), 370, 35);

                                ctx.fillStyle = viz.colors.white;
                                ctx.font = 'bold 24px -apple-system,sans-serif';
                                ctx.fillText('+', 260, 70);

                                ctx.fillStyle = viz.colors.yellow;
                                ctx.font = 'bold 20px -apple-system,sans-serif';
                                ctx.fillText(a + ' + ' + b + ' = ?', 280, 160);
                                ctx.fillStyle = viz.colors.green;
                                ctx.font = '14px -apple-system,sans-serif';
                                ctx.fillText('Press "Make Ten!" to see the strategy', 280, 190);
                            } else {
                                // Show the making-ten breakdown
                                // Ten frame: a blocks + need blocks = 10
                                var frameX = 100;
                                var frameY = 40;
                                ctx.strokeStyle = viz.colors.purple;
                                ctx.lineWidth = 2;
                                var frameW = 5 * (bw + gap) + gap;
                                var frameH = 2 * (bw + gap) + gap;
                                ctx.strokeRect(frameX, frameY, frameW, frameH);

                                // Divider line
                                ctx.beginPath();
                                ctx.moveTo(frameX, frameY + bw + gap + gap / 2);
                                ctx.lineTo(frameX + frameW, frameY + bw + gap + gap / 2);
                                ctx.stroke();

                                // Fill the ten frame with a blocks (blue) + need blocks (orange with glow)
                                for (var k = 0; k < 10; k++) {
                                    var r3 = Math.floor(k / 5);
                                    var c3 = k % 5;
                                    var bx = frameX + gap + c3 * (bw + gap);
                                    var by = frameY + gap + r3 * (bw + gap);
                                    if (k < a) {
                                        ctx.fillStyle = viz.colors.blue;
                                    } else if (k < a + need) {
                                        ctx.fillStyle = viz.colors.orange;
                                        // glow
                                        ctx.shadowColor = viz.colors.orange;
                                        ctx.shadowBlur = 8;
                                    } else {
                                        ctx.fillStyle = viz.colors.grid;
                                    }
                                    ctx.beginPath();
                                    ctx.roundRect(bx, by, bw, bw, 4);
                                    ctx.fill();
                                    ctx.shadowBlur = 0;
                                }

                                // Label the ten frame
                                ctx.fillStyle = viz.colors.purple;
                                ctx.font = 'bold 14px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.fillText('10', frameX + frameW / 2, frameY + frameH + 18);

                                // Leftover blocks
                                var leftX = 360;
                                for (var m = 0; m < leftover; m++) {
                                    ctx.fillStyle = viz.colors.orange;
                                    ctx.beginPath();
                                    ctx.roundRect(leftX + m * (bw + gap), frameY + gap, bw, bw, 4);
                                    ctx.fill();
                                }

                                if (leftover > 0) {
                                    ctx.fillStyle = viz.colors.orange;
                                    ctx.font = 'bold 14px -apple-system,sans-serif';
                                    ctx.textAlign = 'center';
                                    ctx.fillText(String(leftover), leftX + (leftover * (bw + gap)) / 2, frameY + bw + 20);
                                }

                                ctx.fillStyle = viz.colors.white;
                                ctx.font = 'bold 20px -apple-system,sans-serif';
                                ctx.fillText('+', 340, frameY + 20);

                                // Explanation
                                var ey = frameY + frameH + 50;
                                ctx.fillStyle = viz.colors.white;
                                ctx.font = '15px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.fillText(a + ' needs ' + need + ' more to make 10.', 280, ey);
                                ctx.fillText('Take ' + need + ' from ' + b + ', leaving ' + leftover + '.', 280, ey + 22);

                                ctx.fillStyle = viz.colors.yellow;
                                ctx.font = 'bold 20px -apple-system,sans-serif';
                                ctx.fillText(a + ' + ' + b + ' = ' + a + ' + ' + need + ' + ' + leftover + ' = 10 + ' + leftover + ' = ' + (a + b), 280, ey + 58);
                            }
                        }
                        draw();
                        return viz;
                    }
                },
                {
                    id: 'strategy-picker-viz',
                    title: 'Strategy Showdown',
                    description: 'Pick two numbers and see which strategies work best!',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, {width: 560, height: 280, scale: 40, originX: 280, originY: 240});
                        var ctx = viz.ctx;

                        var a = 7, b = 6;
                        VizEngine.createSlider(controls, 'First', 1, 15, a, 1, function(v) { a = Math.round(v); draw(); });
                        VizEngine.createSlider(controls, 'Second', 1, 15, b, 1, function(v) { b = Math.round(v); draw(); });

                        function draw() {
                            viz.clear();
                            var sum = a + b;

                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 22px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText(a + ' + ' + b + ' = ' + sum, 280, 30);

                            var strategies = [];

                            // Check for doubles
                            if (a === b) {
                                strategies.push({name: 'Doubles!', desc: a + ' + ' + a + ' = ' + (a * 2), color: viz.colors.blue});
                            }

                            // Check for near doubles
                            if (Math.abs(a - b) === 1) {
                                var smaller = Math.min(a, b);
                                strategies.push({name: 'Near Doubles', desc: smaller + ' + ' + smaller + ' + 1 = ' + (smaller * 2) + ' + 1 = ' + sum, color: viz.colors.purple});
                            }

                            // Making ten (if one number is between 6-9)
                            var big = Math.max(a, b);
                            var small = Math.min(a, b);
                            if (big >= 6 && big <= 9 && small >= 2) {
                                var need = 10 - big;
                                var rest = small - need;
                                if (rest >= 0) {
                                    strategies.push({name: 'Make Ten', desc: big + ' + ' + need + ' + ' + rest + ' = 10 + ' + rest + ' = ' + sum, color: viz.colors.teal});
                                }
                            }

                            // Adding 9 trick
                            if (a === 9 || b === 9) {
                                var other = a === 9 ? b : a;
                                strategies.push({name: 'Add 9 Trick', desc: '10 + ' + other + ' - 1 = ' + (10 + other) + ' - 1 = ' + sum, color: viz.colors.orange});
                            }

                            // Counting on (always works)
                            strategies.push({name: 'Count On', desc: 'Start at ' + big + ', count ' + small + ' more', color: viz.colors.green});

                            // Display strategies
                            var startY = 60;
                            for (var i = 0; i < strategies.length; i++) {
                                var s = strategies[i];
                                var sy = startY + i * 44;

                                // Strategy badge
                                ctx.fillStyle = s.color + '33';
                                ctx.beginPath();
                                ctx.roundRect(40, sy, 480, 36, 8);
                                ctx.fill();
                                ctx.strokeStyle = s.color;
                                ctx.lineWidth = 1.5;
                                ctx.beginPath();
                                ctx.roundRect(40, sy, 480, 36, 8);
                                ctx.stroke();

                                ctx.fillStyle = s.color;
                                ctx.font = 'bold 14px -apple-system,sans-serif';
                                ctx.textAlign = 'left';
                                ctx.textBaseline = 'middle';
                                ctx.fillText(s.name + ':', 55, sy + 18);

                                ctx.fillStyle = viz.colors.white;
                                ctx.font = '13px -apple-system,sans-serif';
                                ctx.fillText(s.desc, 180, sy + 18);
                            }
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Use the <strong>doubles</strong> strategy to find \\(8 + 8\\). Then use near doubles to find \\(8 + 9\\).',
                    hint: 'First: \\(8 + 8 = ?\\). Then for \\(8 + 9\\), think of it as \\(8 + 8 + 1\\).',
                    solution: '\\(8 + 8 = 16\\). For \\(8 + 9\\): this is a near double! \\(8 + 9 = 8 + 8 + 1 = 16 + 1 = 17\\).'
                },
                {
                    question: 'Use the <strong>making ten</strong> strategy to find \\(7 + 6\\).',
                    hint: 'How many more does 7 need to reach 10? Take that many from 6.',
                    solution: '7 needs 3 more to make 10. Take 3 from 6, leaving 3. So \\(7 + 6 = 7 + 3 + 3 = 10 + 3 = 13\\).'
                },
                {
                    question: 'Find \\(9 + 8\\) using the <strong>add 9 trick</strong> (add 10, subtract 1).',
                    hint: 'Replace 9 with 10, add, then take away 1 because 9 is one less than 10.',
                    solution: '\\(9 + 8 = 10 + 8 - 1 = 18 - 1 = 17\\). Quick and easy!'
                }
            ]
        },

        // ============================================================
        // SECTION 4: Carrying & Multi-Digit Addition
        // ============================================================
        {
            id: 'ch01-sec04',
            title: 'Carrying & Multi-Digit Addition',
            content: `
                <h2>Carrying & Multi-Digit Addition</h2>

                <p>So far we've been adding small numbers. But what about bigger numbers like \\(47 + 36\\) or \\(258 + 175\\)? Don't worry -- the same ideas work, we just need to understand <strong>place value</strong>!</p>

                <h3>Understanding Place Value</h3>

                <p>Every digit in a number has a <strong>place</strong>, and each place has a different value:</p>

                <div class="env-block intuition">
                    <div class="env-title">Discovery</div>
                    <div class="env-body">
                        <p>In the number <strong>352</strong>:</p>
                        <ul>
                            <li>The <strong>3</strong> is in the <strong>hundreds</strong> place. It means 3 hundreds = <strong>300</strong>.</li>
                            <li>The <strong>5</strong> is in the <strong>tens</strong> place. It means 5 tens = <strong>50</strong>.</li>
                            <li>The <strong>2</strong> is in the <strong>ones</strong> place. It means 2 ones = <strong>2</strong>.</li>
                        </ul>
                        <p style="text-align:center;">\\(352 = 300 + 50 + 2\\)</p>
                        <p>We can think of this using <strong>place value blocks</strong>: big flat squares for hundreds, long sticks for tens, and tiny cubes for ones.</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="place-value-viz"></div>

                <h3>Adding Without Carrying</h3>

                <p>When the digits in each column add up to 9 or less, it's easy! Just add each column separately.</p>

                <div class="env-block example">
                    <div class="env-title">Example</div>
                    <div class="env-body">
                        <p>Let's add \\(23 + 45\\):</p>
                        <ul>
                            <li><strong>Ones:</strong> \\(3 + 5 = 8\\)</li>
                            <li><strong>Tens:</strong> \\(2 + 4 = 6\\)</li>
                        </ul>
                        <p style="text-align:center;">\\(23 + 45 = 68\\)</p>
                        <p>Simple! Just add the ones, then add the tens.</p>
                    </div>
                </div>

                <h3>Carrying (Regrouping)</h3>

                <p>But what if the digits in a column add up to <strong>10 or more</strong>? That's when we need to <strong>carry</strong> (also called <strong>regrouping</strong>).</p>

                <div class="env-block intuition">
                    <div class="env-title">Discovery</div>
                    <div class="env-body">
                        <p>Think about it with blocks: if you have 10 ones cubes, you can trade them for 1 tens stick! That's what carrying means -- turning 10 of one place into 1 of the next bigger place.</p>
                        <p>For \\(47 + 36\\):</p>
                        <ol>
                            <li><strong>Ones:</strong> \\(7 + 6 = 13\\). That's 1 ten and 3 ones. Write down <strong>3</strong>, carry the <strong>1</strong>.</li>
                            <li><strong>Tens:</strong> \\(4 + 3 + 1\\text{(carried)} = 8\\). Write down <strong>8</strong>.</li>
                        </ol>
                        <p style="text-align:center; font-size:1.1em;">\\(47 + 36 = 83\\)</p>
                    </div>
                </div>

                <div class="env-block warning">
                    <div class="env-title">Watch Out!</div>
                    <div class="env-body">
                        <p>Don't forget the carried digit! It's the most common mistake in multi-digit addition. Always write the carried number above the next column so you remember to include it.</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="column-addition-viz"></div>

                <h3>Three-Digit Addition</h3>

                <p>The same process works for even bigger numbers! You just have more columns to add.</p>

                <div class="env-block example">
                    <div class="env-title">Example</div>
                    <div class="env-body">
                        <p>Let's try \\(258 + 175\\):</p>
                        <ol>
                            <li><strong>Ones:</strong> \\(8 + 5 = 13\\). Write <strong>3</strong>, carry <strong>1</strong>.</li>
                            <li><strong>Tens:</strong> \\(5 + 7 + 1 = 13\\). Write <strong>3</strong>, carry <strong>1</strong>.</li>
                            <li><strong>Hundreds:</strong> \\(2 + 1 + 1 = 4\\). Write <strong>4</strong>.</li>
                        </ol>
                        <p style="text-align:center; font-size:1.1em;">\\(258 + 175 = 433\\)</p>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Think About It</div>
                    <div class="env-body">
                        <p>Carrying is like a chain reaction! Sometimes you carry from ones to tens, AND from tens to hundreds. Each time, you're trading 10 small blocks for 1 bigger block. It keeps everything organized!</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="regrouping-blocks-viz"></div>
            `,
            visualizations: [
                {
                    id: 'place-value-viz',
                    title: 'Place Value Blocks',
                    description: 'See how a number breaks down into hundreds, tens, and ones using blocks!',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, {width: 560, height: 300, scale: 40, originX: 280, originY: 260});
                        var ctx = viz.ctx;

                        var num = 352;
                        VizEngine.createSlider(controls, 'Number', 1, 999, num, 1, function(v) { num = Math.round(v); draw(); });

                        function draw() {
                            viz.clear();
                            var h = Math.floor(num / 100);
                            var t = Math.floor((num % 100) / 10);
                            var o = num % 10;

                            // Title
                            ctx.fillStyle = viz.colors.yellow;
                            ctx.font = 'bold 24px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText(String(num), 280, 30);

                            // Hundreds (big squares)
                            var startX = 20;
                            for (var i = 0; i < h; i++) {
                                ctx.fillStyle = viz.colors.blue + 'cc';
                                ctx.strokeStyle = viz.colors.blue;
                                ctx.lineWidth = 1.5;
                                var hx = startX + (i % 5) * 48;
                                var hy = 50 + Math.floor(i / 5) * 48;
                                ctx.fillRect(hx, hy, 42, 42);
                                ctx.strokeRect(hx, hy, 42, 42);
                                // Grid inside
                                ctx.strokeStyle = viz.colors.blue + '44';
                                ctx.lineWidth = 0.5;
                                for (var g = 1; g < 4; g++) {
                                    ctx.beginPath(); ctx.moveTo(hx + g * 10.5, hy); ctx.lineTo(hx + g * 10.5, hy + 42); ctx.stroke();
                                    ctx.beginPath(); ctx.moveTo(hx, hy + g * 10.5); ctx.lineTo(hx + 42, hy + g * 10.5); ctx.stroke();
                                }
                            }
                            ctx.fillStyle = viz.colors.blue;
                            ctx.font = 'bold 14px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText(h + ' hundreds = ' + (h * 100), 140, 160);

                            // Tens (sticks)
                            var tensX = 260;
                            for (var j = 0; j < t; j++) {
                                ctx.fillStyle = viz.colors.teal + 'cc';
                                ctx.strokeStyle = viz.colors.teal;
                                ctx.lineWidth = 1;
                                var tx = tensX + j * 14;
                                ctx.fillRect(tx, 50, 10, 90);
                                ctx.strokeRect(tx, 50, 10, 90);
                            }
                            ctx.fillStyle = viz.colors.teal;
                            ctx.font = 'bold 14px -apple-system,sans-serif';
                            ctx.fillText(t + ' tens = ' + (t * 10), tensX + (t * 14) / 2, 160);

                            // Ones (small cubes)
                            var onesX = 430;
                            for (var k = 0; k < o; k++) {
                                ctx.fillStyle = viz.colors.orange + 'cc';
                                ctx.strokeStyle = viz.colors.orange;
                                ctx.lineWidth = 1;
                                var ox = onesX + (k % 5) * 16;
                                var oy = 50 + Math.floor(k / 5) * 16;
                                ctx.fillRect(ox, oy, 12, 12);
                                ctx.strokeRect(ox, oy, 12, 12);
                            }
                            ctx.fillStyle = viz.colors.orange;
                            ctx.font = 'bold 14px -apple-system,sans-serif';
                            ctx.fillText(o + ' ones = ' + o, onesX + 30, 160);

                            // Equation
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = '16px -apple-system,sans-serif';
                            ctx.fillText(num + ' = ' + (h * 100) + ' + ' + (t * 10) + ' + ' + o, 280, 200);
                        }
                        draw();
                        return viz;
                    }
                },
                {
                    id: 'column-addition-viz',
                    title: 'Column Addition with Carrying',
                    description: 'Watch step-by-step column addition. Press "Next Step" to see each part!',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, {width: 560, height: 340, scale: 40, originX: 280, originY: 280});
                        var ctx = viz.ctx;

                        var a = 47, b = 36;
                        var step = 0; // 0=show problem, 1=ones, 2=tens, 3=done

                        VizEngine.createSlider(controls, 'First number', 10, 99, a, 1, function(v) { a = Math.round(v); step = 0; draw(); });
                        VizEngine.createSlider(controls, 'Second number', 10, 99, b, 1, function(v) { b = Math.round(v); step = 0; draw(); });
                        VizEngine.createButton(controls, 'Next Step', function() { if (step < 3) step++; draw(); });
                        VizEngine.createButton(controls, 'Reset', function() { step = 0; draw(); });

                        function draw() {
                            viz.clear();

                            var a1 = a % 10, a10 = Math.floor(a / 10);
                            var b1 = b % 10, b10 = Math.floor(b / 10);
                            var sum1 = a1 + b1;
                            var carry1 = Math.floor(sum1 / 10);
                            var res1 = sum1 % 10;
                            var sum10 = a10 + b10 + carry1;
                            var carry10 = Math.floor(sum10 / 10);
                            var res10 = sum10 % 10;
                            var result = a + b;

                            // Layout positions
                            var cx = 280; // center x
                            var colW = 36; // column width
                            var rowH = 40; // row height
                            var topY = 60;

                            // Helper to draw a digit
                            function drawDigit(x, y, digit, color, size) {
                                ctx.fillStyle = color;
                                ctx.font = 'bold ' + (size || 28) + 'px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.textBaseline = 'middle';
                                ctx.fillText(String(digit), x, y);
                            }

                            // Draw the addition problem
                            // First number
                            drawDigit(cx + colW, topY, a1, viz.colors.white);
                            drawDigit(cx, topY, a10, viz.colors.white);

                            // Plus sign and second number
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 24px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('+', cx - colW - 10, topY + rowH);
                            drawDigit(cx + colW, topY + rowH, b1, viz.colors.white);
                            drawDigit(cx, topY + rowH, b10, viz.colors.white);

                            // Line
                            ctx.strokeStyle = viz.colors.white;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            ctx.moveTo(cx - colW - 30, topY + rowH + 22);
                            ctx.lineTo(cx + colW + 30, topY + rowH + 22);
                            ctx.stroke();

                            // Highlight active column
                            if (step === 1) {
                                ctx.fillStyle = viz.colors.orange + '22';
                                ctx.fillRect(cx + colW - 18, topY - 22, 36, rowH * 2 + 50);
                            }
                            if (step === 2) {
                                ctx.fillStyle = viz.colors.blue + '22';
                                ctx.fillRect(cx - 18, topY - 22, 36, rowH * 2 + 50);
                            }

                            // Step 1: ones column
                            if (step >= 1) {
                                drawDigit(cx + colW, topY + rowH * 2 + 2, res1, viz.colors.green);
                                if (carry1 > 0) {
                                    // Carry digit
                                    drawDigit(cx + 2, topY - 22, carry1, viz.colors.red, 16);
                                    // Carry label
                                    ctx.fillStyle = viz.colors.red;
                                    ctx.font = '11px -apple-system,sans-serif';
                                    ctx.fillText('carry', cx + 2, topY - 36);
                                }
                                // Explanation
                                ctx.fillStyle = viz.colors.orange;
                                ctx.font = '14px -apple-system,sans-serif';
                                ctx.textAlign = 'left';
                                ctx.fillText('Ones: ' + a1 + ' + ' + b1 + ' = ' + sum1 + (carry1 ? ' (write ' + res1 + ', carry ' + carry1 + ')' : ''), 40, topY + rowH * 3);
                            }

                            // Step 2: tens column
                            if (step >= 2) {
                                drawDigit(cx, topY + rowH * 2 + 2, res10, viz.colors.green);
                                if (carry10 > 0) {
                                    drawDigit(cx - colW + 2, topY - 22, carry10, viz.colors.red, 16);
                                }
                                ctx.fillStyle = viz.colors.blue;
                                ctx.font = '14px -apple-system,sans-serif';
                                ctx.textAlign = 'left';
                                ctx.fillText('Tens: ' + a10 + ' + ' + b10 + (carry1 ? ' + ' + carry1 : '') + ' = ' + sum10 + (carry10 ? ' (write ' + res10 + ', carry ' + carry10 + ')' : ''), 40, topY + rowH * 3 + 22);
                            }

                            // Step 3: if there's a carry into hundreds
                            if (step >= 3) {
                                if (carry10 > 0) {
                                    drawDigit(cx - colW, topY + rowH * 2 + 2, carry10, viz.colors.green);
                                }
                                ctx.fillStyle = viz.colors.yellow;
                                ctx.font = 'bold 20px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.fillText('Answer: ' + a + ' + ' + b + ' = ' + result, 280, topY + rowH * 3 + 58);
                            }
                        }
                        draw();
                        return viz;
                    }
                },
                {
                    id: 'regrouping-blocks-viz',
                    title: 'Regrouping with Blocks',
                    description: 'See how 10 ones become 1 ten, and 10 tens become 1 hundred!',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, {width: 560, height: 280, scale: 40, originX: 280, originY: 240});
                        var ctx = viz.ctx;

                        var ones = 13;
                        var animating = false;
                        var animT = 0;

                        VizEngine.createSlider(controls, 'Ones blocks', 1, 19, ones, 1, function(v) {
                            ones = Math.round(v); animating = false; animT = 0;
                        });
                        VizEngine.createButton(controls, 'Regroup!', function() {
                            if (ones >= 10 && !animating) { animating = true; animT = 0; }
                        });
                        VizEngine.createButton(controls, 'Reset', function() {
                            animating = false; animT = 0;
                        });

                        function draw() {
                            viz.clear();
                            var bw = 18;
                            var gap = 3;

                            var tensCount = 0;
                            var onesCount = ones;
                            var showRegrouped = false;

                            if (animating && animT >= 1) {
                                showRegrouped = true;
                            }

                            if (showRegrouped && ones >= 10) {
                                tensCount = Math.floor(ones / 10);
                                onesCount = ones % 10;
                            }

                            // Title
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 18px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText(ones + ' ones', 280, 25);

                            if (!showRegrouped) {
                                // Draw all as ones cubes
                                var startX = 280 - (Math.min(ones, 10) * (bw + gap)) / 2;
                                for (var i = 0; i < ones; i++) {
                                    var col = i % 10;
                                    var row = Math.floor(i / 10);
                                    var cx = startX + col * (bw + gap);
                                    var cy = 50 + row * (bw + gap + 8);

                                    // During animation, first 10 blocks glow and move
                                    if (animating && i < 10) {
                                        var progress = Math.min(animT, 1);
                                        ctx.fillStyle = viz.colors.orange;
                                        ctx.shadowColor = viz.colors.orange;
                                        ctx.shadowBlur = 10 * progress;
                                        var targetX = 100;
                                        var targetY = 50;
                                        var currentX = cx + (targetX - cx) * progress;
                                        var currentY = cy + (targetY - cy) * progress;
                                        var currentW = bw * (1 - progress * 0.5);
                                        ctx.fillRect(currentX, currentY, currentW, currentW);
                                        ctx.shadowBlur = 0;
                                    } else {
                                        ctx.fillStyle = viz.colors.orange + 'cc';
                                        ctx.strokeStyle = viz.colors.orange;
                                        ctx.lineWidth = 1;
                                        ctx.fillRect(cx, cy, bw, bw);
                                        ctx.strokeRect(cx, cy, bw, bw);
                                    }
                                }
                            } else {
                                // Draw regrouped: tens sticks + ones cubes
                                // Tens
                                var tensStartX = 100;
                                for (var t = 0; t < tensCount; t++) {
                                    ctx.fillStyle = viz.colors.teal + 'cc';
                                    ctx.strokeStyle = viz.colors.teal;
                                    ctx.lineWidth = 1.5;
                                    ctx.fillRect(tensStartX + t * 28, 50, 14, 90);
                                    ctx.strokeRect(tensStartX + t * 28, 50, 14, 90);
                                }
                                ctx.fillStyle = viz.colors.teal;
                                ctx.font = 'bold 14px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.fillText(tensCount + ' ten' + (tensCount > 1 ? 's' : ''), tensStartX + (tensCount * 28) / 2, 155);

                                // Ones
                                var onesStartX = 340;
                                for (var o = 0; o < onesCount; o++) {
                                    ctx.fillStyle = viz.colors.orange + 'cc';
                                    ctx.strokeStyle = viz.colors.orange;
                                    ctx.lineWidth = 1;
                                    ctx.fillRect(onesStartX + o * (bw + gap), 70, bw, bw);
                                    ctx.strokeRect(onesStartX + o * (bw + gap), 70, bw, bw);
                                }
                                ctx.fillStyle = viz.colors.orange;
                                ctx.font = 'bold 14px -apple-system,sans-serif';
                                ctx.fillText(onesCount + ' one' + (onesCount !== 1 ? 's' : ''), onesStartX + (onesCount * (bw + gap)) / 2, 105);

                                // Result
                                ctx.fillStyle = viz.colors.yellow;
                                ctx.font = 'bold 18px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.fillText(ones + ' ones = ' + tensCount + ' ten' + (tensCount > 1 ? 's' : '') + ' and ' + onesCount + ' one' + (onesCount !== 1 ? 's' : ''), 280, 190);
                                ctx.fillStyle = viz.colors.green;
                                ctx.font = '15px -apple-system,sans-serif';
                                ctx.fillText('That\'s the number ' + (tensCount * 10 + onesCount) + '!', 280, 220);
                            }
                        }

                        viz.animate(function() {
                            if (animating && animT < 1) {
                                animT += 0.02;
                                if (animT >= 1) animT = 1;
                            }
                            draw();
                        });

                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Add \\(35 + 42\\) using column addition. Do you need to carry?',
                    hint: 'Add the ones first: \\(5 + 2 = ?\\). Then the tens: \\(3 + 4 = ?\\). Is either sum 10 or more?',
                    solution: 'Ones: \\(5 + 2 = 7\\). Tens: \\(3 + 4 = 7\\). No carrying needed! \\(35 + 42 = 77\\).'
                },
                {
                    question: 'Add \\(58 + 27\\) using column addition. Show your carrying work.',
                    hint: 'Ones: \\(8 + 7 = 15\\). That\'s more than 9, so you need to carry! Write the 5, carry the 1.',
                    solution: 'Ones: \\(8 + 7 = 15\\). Write <strong>5</strong>, carry <strong>1</strong>. Tens: \\(5 + 2 + 1 = 8\\). So \\(58 + 27 = 85\\).'
                },
                {
                    question: 'Add \\(367 + 485\\). There will be carrying in more than one column!',
                    hint: 'Start with ones: \\(7 + 5 = 12\\). Then tens: \\(6 + 8 + 1 = 15\\). Then hundreds: \\(3 + 4 + 1 = 8\\).',
                    solution: 'Ones: \\(7 + 5 = 12\\), write 2, carry 1. Tens: \\(6 + 8 + 1 = 15\\), write 5, carry 1. Hundreds: \\(3 + 4 + 1 = 8\\). So \\(367 + 485 = 852\\).'
                }
            ]
        },

        // ============================================================
        // SECTION 5: Addition in the Real World
        // ============================================================
        {
            id: 'ch01-sec05',
            title: 'Addition in the Real World',
            content: `
                <h2>Addition in the Real World</h2>

                <p>Addition isn't just something you do in math class -- it's <strong>everywhere</strong>! Let's explore how addition shows up in real life.</p>

                <h3>Adding Money</h3>

                <p>When you buy things at a store or save up your allowance, you use addition!</p>

                <div class="env-block example">
                    <div class="env-title">Example</div>
                    <div class="env-body">
                        <p>You buy a notebook for <strong>$3</strong> and a pencil for <strong>$2</strong>. How much did you spend?</p>
                        <p style="text-align:center; font-size:1.1em;">\\(\\$3 + \\$2 = \\$5\\)</p>
                        <p>You spent <strong>$5</strong> in total!</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Try This!</div>
                    <div class="env-body">
                        <p>You have <strong>$1.50</strong> in your piggy bank and you find <strong>$0.75</strong> in the couch cushions. How much money do you have now?</p>
                        <p style="text-align:center;">\\(\\$1.50 + \\$0.75 = \\$2.25\\)</p>
                        <p>Add the cents: \\(50 + 75 = 125\\) cents. That's \\(\\$1.25\\). Plus the \\(\\$1.00\\) you already had: \\(\\$2.25\\)!</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="money-counter-viz"></div>

                <h3>Adding Time</h3>

                <p>We add time to figure out when things will finish!</p>

                <div class="env-block example">
                    <div class="env-title">Example</div>
                    <div class="env-body">
                        <p>Your soccer practice starts at <strong>3:00 PM</strong> and lasts <strong>1 hour and 30 minutes</strong>. What time does it end?</p>
                        <p>Add the hours: \\(3 + 1 = 4\\). Add the minutes: \\(0 + 30 = 30\\).</p>
                        <p>Practice ends at <strong>4:30 PM</strong>!</p>
                    </div>
                </div>

                <div class="env-block warning">
                    <div class="env-title">Watch Out!</div>
                    <div class="env-body">
                        <p>Time is tricky because there are <strong>60 minutes</strong> in an hour, not 100! So if you add 45 minutes and 30 minutes, you get 75 minutes. That's <strong>1 hour and 15 minutes</strong> (because \\(75 - 60 = 15\\)).</p>
                    </div>
                </div>

                <h3>Adding Measurements</h3>

                <p>Whether you're measuring how tall you grew, how far you walked, or how much water you drank, addition helps!</p>

                <div class="env-block example">
                    <div class="env-title">Example</div>
                    <div class="env-body">
                        <p>You drink <strong>3 cups</strong> of water in the morning and <strong>4 cups</strong> in the afternoon. How much water did you drink today?</p>
                        <p style="text-align:center;">\\(3 + 4 = 7\\) cups of water</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="word-problem-viz"></div>

                <h3>Fun Word Problems</h3>

                <p>Word problems tell a story with numbers. The key is to figure out what you need to add!</p>

                <div class="env-block intuition">
                    <div class="env-title">Discovery</div>
                    <div class="env-body">
                        <p>Look for these <strong>clue words</strong> that tell you to add:</p>
                        <ul>
                            <li><strong>altogether, in all, total, combined</strong></li>
                            <li><strong>how many in all, how much together</strong></li>
                            <li><strong>more, plus, added to, increased by</strong></li>
                            <li><strong>both, sum, and</strong></li>
                        </ul>
                        <p>When you see these words in a problem, it's a hint that you need to add!</p>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Think About It</div>
                    <div class="env-body">
                        <p>Addition is one of the most useful things you'll ever learn! Every time you count your points in a game, figure out how many stickers you've collected, or add up the score in sports, you're using addition. You're already a math superstar!</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="score-tracker-viz"></div>
            `,
            visualizations: [
                {
                    id: 'money-counter-viz',
                    title: 'Coin Counter',
                    description: 'Add coins together and see the total! Change the number of each type of coin.',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, {width: 560, height: 280, scale: 40, originX: 280, originY: 240});
                        var ctx = viz.ctx;

                        var quarters = 2;
                        var dimes = 3;
                        var nickels = 1;
                        var pennies = 4;

                        VizEngine.createSlider(controls, 'Quarters (25c)', 0, 8, quarters, 1, function(v) { quarters = Math.round(v); draw(); });
                        VizEngine.createSlider(controls, 'Dimes (10c)', 0, 10, dimes, 1, function(v) { dimes = Math.round(v); draw(); });
                        VizEngine.createSlider(controls, 'Nickels (5c)', 0, 10, nickels, 1, function(v) { nickels = Math.round(v); draw(); });
                        VizEngine.createSlider(controls, 'Pennies (1c)', 0, 10, pennies, 1, function(v) { pennies = Math.round(v); draw(); });

                        function drawCoin(x, y, radius, color, borderColor, label) {
                            ctx.fillStyle = color;
                            ctx.beginPath();
                            ctx.arc(x, y, radius, 0, Math.PI * 2);
                            ctx.fill();
                            ctx.strokeStyle = borderColor;
                            ctx.lineWidth = 2;
                            ctx.stroke();
                            // Inner circle
                            ctx.strokeStyle = borderColor + '88';
                            ctx.lineWidth = 1;
                            ctx.beginPath();
                            ctx.arc(x, y, radius * 0.7, 0, Math.PI * 2);
                            ctx.stroke();
                            // Label
                            ctx.fillStyle = '#222';
                            ctx.font = 'bold ' + Math.round(radius * 0.7) + 'px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'middle';
                            ctx.fillText(label, x, y);
                        }

                        function draw() {
                            viz.clear();

                            var total = quarters * 25 + dimes * 10 + nickels * 5 + pennies;
                            var dollars = Math.floor(total / 100);
                            var cents = total % 100;

                            // Draw quarters
                            var y1 = 50;
                            for (var q = 0; q < quarters; q++) {
                                drawCoin(40 + q * 36, y1, 16, '#c0c0c0', '#888888', '25');
                            }
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.textBaseline = 'middle';
                            if (quarters > 0) ctx.fillText('= ' + (quarters * 25) + 'c', 50 + quarters * 36, y1);

                            // Draw dimes
                            var y2 = 95;
                            for (var d = 0; d < dimes; d++) {
                                drawCoin(40 + d * 30, y2, 12, '#c0c0c0', '#999999', '10');
                            }
                            if (dimes > 0) ctx.fillText('= ' + (dimes * 10) + 'c', 50 + dimes * 30, y2);

                            // Draw nickels
                            var y3 = 135;
                            for (var n = 0; n < nickels; n++) {
                                drawCoin(40 + n * 32, y3, 14, '#d4af37', '#a08520', '5');
                            }
                            if (nickels > 0) ctx.fillText('= ' + (nickels * 5) + 'c', 52 + nickels * 32, y3);

                            // Draw pennies
                            var y4 = 175;
                            for (var p = 0; p < pennies; p++) {
                                drawCoin(40 + p * 26, y4, 10, '#b87333', '#8b5a2b', '1');
                            }
                            if (pennies > 0) ctx.fillText('= ' + pennies + 'c', 48 + pennies * 26, y4);

                            // Total
                            ctx.fillStyle = viz.colors.yellow;
                            ctx.font = 'bold 22px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'middle';
                            var totalStr = dollars > 0 ? '$' + dollars + '.' + (cents < 10 ? '0' : '') + cents : cents + ' cents';
                            ctx.fillText('Total: ' + totalStr, 400, 110);

                            // Breakdown
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = '13px -apple-system,sans-serif';
                            ctx.fillText((quarters * 25) + ' + ' + (dimes * 10) + ' + ' + (nickels * 5) + ' + ' + pennies + ' = ' + total + ' cents', 400, 145);
                        }
                        draw();
                        return viz;
                    }
                },
                {
                    id: 'word-problem-viz',
                    title: 'Word Problem Builder',
                    description: 'See a word problem come to life! Change the numbers to create your own story.',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, {width: 560, height: 300, scale: 40, originX: 280, originY: 260});
                        var ctx = viz.ctx;

                        var scenario = 0;
                        var numA = 5;
                        var numB = 3;

                        var scenarios = [
                            {
                                label: 'Apples',
                                story: function(a, b) { return 'You pick ' + a + ' apples in the morning and ' + b + ' in the afternoon.'; },
                                question: 'How many apples did you pick today?',
                                emoji: function(x, y, color) {
                                    ctx.fillStyle = color;
                                    ctx.beginPath();
                                    ctx.arc(x, y, 12, 0, Math.PI * 2);
                                    ctx.fill();
                                    ctx.fillStyle = '#4a2800';
                                    ctx.fillRect(x - 1, y - 16, 2, 6);
                                }
                            },
                            {
                                label: 'Books',
                                story: function(a, b) { return 'The library has ' + a + ' books on one shelf and ' + b + ' on another.'; },
                                question: 'How many books are there in all?',
                                emoji: function(x, y, color) {
                                    ctx.fillStyle = color;
                                    ctx.fillRect(x - 8, y - 12, 16, 24);
                                    ctx.strokeStyle = '#ffffff44';
                                    ctx.lineWidth = 1;
                                    ctx.strokeRect(x - 8, y - 12, 16, 24);
                                }
                            },
                            {
                                label: 'Steps',
                                story: function(a, b) { return 'You walk ' + (a * 100) + ' steps to school and ' + (b * 100) + ' steps to the park.'; },
                                question: 'How many total steps?',
                                emoji: function(x, y, color) {
                                    ctx.fillStyle = color;
                                    ctx.beginPath();
                                    ctx.ellipse(x, y, 8, 12, 0.3, 0, Math.PI * 2);
                                    ctx.fill();
                                }
                            }
                        ];

                        VizEngine.createButton(controls, 'Apples', function() { scenario = 0; draw(); });
                        VizEngine.createButton(controls, 'Books', function() { scenario = 1; draw(); });
                        VizEngine.createButton(controls, 'Steps', function() { scenario = 2; draw(); });
                        VizEngine.createSlider(controls, 'Group 1', 1, 9, numA, 1, function(v) { numA = Math.round(v); draw(); });
                        VizEngine.createSlider(controls, 'Group 2', 1, 9, numB, 1, function(v) { numB = Math.round(v); draw(); });

                        function draw() {
                            viz.clear();
                            var s = scenarios[scenario];
                            var total = numA + numB;

                            // Story text
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = '15px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'middle';
                            ctx.fillText(s.story(numA, numB), 280, 25);
                            ctx.fillStyle = viz.colors.teal;
                            ctx.fillText(s.question, 280, 48);

                            // Group A icons
                            var colorsA = viz.colors.blue;
                            var colorsB = viz.colors.orange;
                            var gapX = 30;
                            var startAx = 140 - (numA * gapX) / 2;
                            for (var i = 0; i < numA; i++) {
                                s.emoji(startAx + i * gapX + gapX / 2, 100, colorsA);
                            }

                            // Plus
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 22px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('+', 280, 100);

                            // Group B icons
                            var startBx = 420 - (numB * gapX) / 2;
                            for (var j = 0; j < numB; j++) {
                                s.emoji(startBx + j * gapX + gapX / 2, 100, colorsB);
                            }

                            // Equals line
                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 1;
                            ctx.beginPath();
                            ctx.moveTo(60, 140);
                            ctx.lineTo(500, 140);
                            ctx.stroke();

                            // Combined icons
                            var startCx = 280 - (total * gapX) / 2;
                            for (var k = 0; k < total; k++) {
                                var col = k < numA ? colorsA : colorsB;
                                s.emoji(startCx + k * gapX + gapX / 2, 175, col);
                            }

                            // Answer
                            var displayA = scenario === 2 ? numA * 100 : numA;
                            var displayB = scenario === 2 ? numB * 100 : numB;
                            var displayTotal = scenario === 2 ? total * 100 : total;
                            ctx.fillStyle = viz.colors.yellow;
                            ctx.font = 'bold 20px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText(displayA + ' + ' + displayB + ' = ' + displayTotal, 280, 230);

                            // Encouragement
                            ctx.fillStyle = viz.colors.green;
                            ctx.font = '14px -apple-system,sans-serif';
                            ctx.fillText('Great job! You solved it!', 280, 260);
                        }
                        draw();
                        return viz;
                    }
                },
                {
                    id: 'score-tracker-viz',
                    title: 'Game Score Tracker',
                    description: 'Keep track of points across rounds! Add points each round and watch your total grow.',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, {width: 560, height: 300, scale: 40, originX: 280, originY: 260});
                        var ctx = viz.ctx;

                        var scores = [0];
                        var roundPoints = 5;

                        VizEngine.createSlider(controls, 'Points this round', 1, 20, roundPoints, 1, function(v) { roundPoints = Math.round(v); draw(); });
                        VizEngine.createButton(controls, 'Add Round!', function() {
                            if (scores.length < 10) {
                                scores.push(roundPoints);
                                draw();
                            }
                        });
                        VizEngine.createButton(controls, 'New Game', function() {
                            scores = [0]; draw();
                        });

                        function draw() {
                            viz.clear();

                            // Calculate running totals
                            var totals = [0];
                            var runningTotal = 0;
                            for (var i = 1; i < scores.length; i++) {
                                runningTotal += scores[i];
                                totals.push(runningTotal);
                            }
                            var maxScore = Math.max(runningTotal, 20);

                            // Title
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 18px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('Game Score Tracker', 280, 20);

                            // Draw bar chart
                            var chartLeft = 60;
                            var chartRight = 520;
                            var chartTop = 45;
                            var chartBottom = 220;
                            var chartH = chartBottom - chartTop;
                            var barCount = scores.length;
                            var barW = Math.min(40, (chartRight - chartLeft) / (barCount + 1));
                            var barGap = 6;

                            // Y axis
                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 1;
                            ctx.beginPath();
                            ctx.moveTo(chartLeft, chartTop);
                            ctx.lineTo(chartLeft, chartBottom);
                            ctx.stroke();

                            // X axis
                            ctx.beginPath();
                            ctx.moveTo(chartLeft, chartBottom);
                            ctx.lineTo(chartRight, chartBottom);
                            ctx.stroke();

                            // Y axis labels
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'right';
                            ctx.textBaseline = 'middle';
                            for (var y = 0; y <= maxScore; y += Math.ceil(maxScore / 5)) {
                                var yy = chartBottom - (y / maxScore) * chartH;
                                ctx.fillText(String(y), chartLeft - 6, yy);
                                ctx.strokeStyle = viz.colors.grid;
                                ctx.beginPath();
                                ctx.moveTo(chartLeft, yy);
                                ctx.lineTo(chartRight, yy);
                                ctx.stroke();
                            }

                            // Bars
                            for (var b = 0; b < barCount; b++) {
                                var barH = (totals[b] / maxScore) * chartH;
                                var bx = chartLeft + 20 + b * (barW + barGap);
                                var by = chartBottom - barH;

                                // Bar gradient effect
                                if (b === 0) {
                                    ctx.fillStyle = viz.colors.grid;
                                } else {
                                    var colors = [viz.colors.blue, viz.colors.teal, viz.colors.green, viz.colors.purple,
                                                  viz.colors.orange, viz.colors.pink, viz.colors.yellow, viz.colors.red, viz.colors.blue];
                                    ctx.fillStyle = colors[(b - 1) % colors.length];
                                }
                                if (barH > 0) {
                                    ctx.beginPath();
                                    ctx.roundRect(bx, by, barW, barH, [4, 4, 0, 0]);
                                    ctx.fill();
                                }

                                // Score label
                                ctx.fillStyle = viz.colors.white;
                                ctx.font = 'bold 11px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.textBaseline = 'bottom';
                                if (totals[b] > 0) ctx.fillText(String(totals[b]), bx + barW / 2, by - 3);

                                // Round label
                                ctx.fillStyle = viz.colors.text;
                                ctx.font = '10px -apple-system,sans-serif';
                                ctx.textBaseline = 'top';
                                ctx.fillText(b === 0 ? 'Start' : 'R' + b, bx + barW / 2, chartBottom + 4);
                            }

                            // Total and addition sentence
                            var addParts = [];
                            for (var s = 1; s < scores.length; s++) {
                                addParts.push(scores[s]);
                            }
                            ctx.fillStyle = viz.colors.yellow;
                            ctx.font = 'bold 16px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'middle';
                            if (addParts.length > 0) {
                                var eq = addParts.join(' + ') + ' = ' + runningTotal;
                                ctx.fillText('Total: ' + eq, 280, 260);
                            } else {
                                ctx.fillText('Press "Add Round!" to start scoring!', 280, 260);
                            }

                            ctx.fillStyle = viz.colors.green;
                            ctx.font = '13px -apple-system,sans-serif';
                            ctx.fillText('Round ' + Math.max(0, scores.length - 1) + ' | Total Points: ' + runningTotal, 280, 285);
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'You buy a sandwich for <strong>$4</strong> and a juice for <strong>$2</strong>. You pay with a <strong>$10</strong> bill. How much did you spend? (Bonus: how much change do you get back?)',
                    hint: 'First add the sandwich and juice: \\(\\$4 + \\$2 = ?\\). For the bonus, subtract from \\$10.',
                    solution: 'You spent \\(\\$4 + \\$2 = \\$6\\). Bonus: Your change is \\(\\$10 - \\$6 = \\$4\\).'
                },
                {
                    question: 'A movie starts at <strong>2:15 PM</strong> and lasts <strong>1 hour and 50 minutes</strong>. What time does it end?',
                    hint: 'Add the hours first: 2 + 1 = 3. Then add the minutes: 15 + 50 = 65 minutes. But 65 minutes is more than 60!',
                    solution: 'Hours: \\(2 + 1 = 3\\). Minutes: \\(15 + 50 = 65\\). Since 65 minutes = 1 hour and 5 minutes, the movie ends at \\(3:00 + 1:05 = \\mathbf{4:05\\text{ PM}}\\).'
                },
                {
                    question: 'In a basketball game, your team scored <strong>12 points</strong> in the first quarter, <strong>18 points</strong> in the second, <strong>15 points</strong> in the third, and <strong>21 points</strong> in the fourth. What was your total score?',
                    hint: 'Add the scores step by step: \\(12 + 18 = ?\\), then add 15, then add 21.',
                    solution: '\\(12 + 18 = 30\\). Then \\(30 + 15 = 45\\). Then \\(45 + 21 = 66\\). Your team scored <strong>66 points</strong>!'
                }
            ]
        }
    ]
});
