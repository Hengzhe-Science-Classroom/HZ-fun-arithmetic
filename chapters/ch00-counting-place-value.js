window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch00',
    number: 0,
    title: 'Counting & Place Value',
    subtitle: 'Learn to count, discover what digits really mean, and explore how big numbers can get!',
    sections: [
        // ============================================================
        // SECTION 1: Counting to 100 and Beyond
        // ============================================================
        {
            id: 'ch00-sec01',
            title: 'Counting to 100 and Beyond',
            content: `
                <h2>Counting to 100 and Beyond</h2>

                <p>Numbers are everywhere! When you count your toys, the steps you climb, or the stars you see at night, you're using one of the most powerful ideas humans ever invented: <strong>counting</strong>.</p>

                <p>Let's start at the very beginning. When we count, we go in order:</p>
                <p style="text-align:center; font-size:1.2em; color:var(--accent-teal);">
                    \\(1, \\; 2, \\; 3, \\; 4, \\; 5, \\; 6, \\; 7, \\; 8, \\; 9, \\; 10, \\; 11, \\; 12, \\ldots\\)
                </p>

                <p>Every number has a <strong>spot on the number line</strong> — an imaginary line that stretches on forever in both directions. Numbers get bigger as you move to the right, and smaller as you move to the left.</p>

                <div class="viz-placeholder" data-viz="number-line-explore"></div>

                <div class="env-block intuition">
                    <div class="env-title">Discovery</div>
                    <div class="env-body">
                        <p>Did you notice? Every time you count <strong>one more</strong>, you take one step to the right on the number line. The number line never ends — no matter how far you go, there's always a next number!</p>
                    </div>
                </div>

                <h3>Counting by 2s, 5s, and 10s</h3>

                <p>Counting by ones works great, but sometimes we want to go faster! We can <strong>skip count</strong> — that means jumping ahead by the same amount each time.</p>

                <p><strong>Counting by 2s:</strong></p>
                <p style="text-align:center; color:var(--accent-blue);">
                    \\(2, \\; 4, \\; 6, \\; 8, \\; 10, \\; 12, \\; 14, \\; 16, \\; 18, \\; 20\\)
                </p>

                <p><strong>Counting by 5s:</strong></p>
                <p style="text-align:center; color:var(--accent-orange);">
                    \\(5, \\; 10, \\; 15, \\; 20, \\; 25, \\; 30, \\; 35, \\; 40, \\; 45, \\; 50\\)
                </p>

                <p><strong>Counting by 10s:</strong></p>
                <p style="text-align:center; color:var(--accent-green);">
                    \\(10, \\; 20, \\; 30, \\; 40, \\; 50, \\; 60, \\; 70, \\; 80, \\; 90, \\; 100\\)
                </p>

                <div class="viz-placeholder" data-viz="skip-count-number-line"></div>

                <div class="env-block example">
                    <div class="env-title">Try This!</div>
                    <div class="env-body">
                        <p>Use the visualization above to switch between counting by 2s, 5s, and 10s. Watch how the jumps get bigger! Which way is fastest to reach 100?</p>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Think About It</div>
                    <div class="env-body">
                        <p>When you count by 10s, you only need <strong>10 jumps</strong> to reach 100. When you count by 1s, you need <strong>100 steps</strong>. Skip counting is like taking bigger steps — you get there faster!</p>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Cool Fact</div>
                    <div class="env-body">
                        <p>When you count by 2s, you land on all the <strong>even numbers</strong>: \\(2, 4, 6, 8, 10, \\ldots\\) The numbers you skip are called <strong>odd numbers</strong>: \\(1, 3, 5, 7, 9, \\ldots\\) Every whole number is either even or odd — never both!</p>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'number-line-explore',
                    title: 'Explore the Number Line',
                    description: 'Drag the pointer to explore different numbers on the number line. Each mark is one number!',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { width: 700, height: 200, scale: 30, originX: 50, originY: 100 });
                        var pointer = viz.addDraggable('ptr', 5, 0, viz.colors.orange, 10, function() {
                            pointer.x = Math.round(Math.max(0, Math.min(20, pointer.x)));
                            pointer.y = 0;
                        });

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            // Draw the number line
                            var startScreen = viz.toScreen(0, 0);
                            var endScreen = viz.toScreen(20, 0);
                            ctx.strokeStyle = viz.colors.white;
                            ctx.lineWidth = 3;
                            ctx.beginPath();
                            ctx.moveTo(startScreen[0], startScreen[1]);
                            ctx.lineTo(endScreen[0], endScreen[1]);
                            ctx.stroke();

                            // Arrow at right end
                            ctx.fillStyle = viz.colors.white;
                            ctx.beginPath();
                            ctx.moveTo(endScreen[0] + 15, endScreen[1]);
                            ctx.lineTo(endScreen[0], endScreen[1] - 8);
                            ctx.lineTo(endScreen[0], endScreen[1] + 8);
                            ctx.closePath();
                            ctx.fill();

                            // Draw tick marks and numbers
                            for (var i = 0; i <= 20; i++) {
                                var pos = viz.toScreen(i, 0);
                                ctx.strokeStyle = (i === Math.round(pointer.x)) ? viz.colors.orange : viz.colors.white;
                                ctx.lineWidth = (i % 5 === 0) ? 3 : 1.5;
                                ctx.beginPath();
                                ctx.moveTo(pos[0], pos[1] - 12);
                                ctx.lineTo(pos[0], pos[1] + 12);
                                ctx.stroke();

                                ctx.fillStyle = (i === Math.round(pointer.x)) ? viz.colors.orange : viz.colors.text;
                                ctx.font = (i === Math.round(pointer.x)) ? 'bold 16px -apple-system,sans-serif' : '12px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.textBaseline = 'top';
                                ctx.fillText(i, pos[0], pos[1] + 18);
                            }

                            // Display current number big
                            var val = Math.round(pointer.x);
                            ctx.fillStyle = viz.colors.orange;
                            ctx.font = 'bold 36px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'middle';
                            ctx.fillText(val, viz.width / 2, 30);

                            // Draw the draggable pointer
                            viz.drawDraggables();
                        }

                        viz.animate(draw);
                    }
                },
                {
                    id: 'skip-count-number-line',
                    title: 'Skip Counting on the Number Line',
                    description: 'Choose how to count — by 2s, 5s, or 10s — and watch the jumps!',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { width: 700, height: 220, scale: 6.5, originX: 20, originY: 120 });
                        var skipBy = 2;

                        VizEngine.createButton(controls, 'By 2s', function() { skipBy = 2; draw(); });
                        VizEngine.createButton(controls, 'By 5s', function() { skipBy = 5; draw(); });
                        VizEngine.createButton(controls, 'By 10s', function() { skipBy = 10; draw(); });

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            var colors = {};
                            colors[2] = viz.colors.blue;
                            colors[5] = viz.colors.orange;
                            colors[10] = viz.colors.green;
                            var color = colors[skipBy] || viz.colors.blue;

                            // Draw number line
                            var lineStart = viz.toScreen(0, 0);
                            var lineEnd = viz.toScreen(100, 0);
                            ctx.strokeStyle = '#4a4a7a';
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            ctx.moveTo(lineStart[0], lineStart[1]);
                            ctx.lineTo(lineEnd[0], lineEnd[1]);
                            ctx.stroke();

                            // Tick marks every 10
                            for (var i = 0; i <= 100; i += 10) {
                                var pos = viz.toScreen(i, 0);
                                ctx.strokeStyle = viz.colors.white;
                                ctx.lineWidth = 2;
                                ctx.beginPath();
                                ctx.moveTo(pos[0], pos[1] - 10);
                                ctx.lineTo(pos[0], pos[1] + 10);
                                ctx.stroke();

                                ctx.fillStyle = viz.colors.text;
                                ctx.font = '11px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.textBaseline = 'top';
                                ctx.fillText(i, pos[0], pos[1] + 14);
                            }

                            // Draw skip-count jumps as arcs
                            var count = 0;
                            for (var n = 0; n < 100; n += skipBy) {
                                var fromPos = viz.toScreen(n, 0);
                                var toPos = viz.toScreen(n + skipBy, 0);
                                var midX = (fromPos[0] + toPos[0]) / 2;
                                var arcHeight = 20 + skipBy * 2;

                                // Draw arc
                                ctx.strokeStyle = color;
                                ctx.lineWidth = 2.5;
                                ctx.beginPath();
                                ctx.moveTo(fromPos[0], fromPos[1] - 12);
                                ctx.quadraticCurveTo(midX, fromPos[1] - 12 - arcHeight, toPos[0], toPos[1] - 12);
                                ctx.stroke();

                                // Arrow head
                                ctx.fillStyle = color;
                                ctx.beginPath();
                                ctx.moveTo(toPos[0], toPos[1] - 12);
                                ctx.lineTo(toPos[0] - 5, toPos[1] - 18);
                                ctx.lineTo(toPos[0] + 3, toPos[1] - 18);
                                ctx.closePath();
                                ctx.fill();

                                // Dot at landing
                                ctx.fillStyle = color;
                                ctx.beginPath();
                                ctx.arc(toPos[0], toPos[1], 5, 0, Math.PI * 2);
                                ctx.fill();

                                count++;
                            }

                            // Starting dot
                            var startDot = viz.toScreen(0, 0);
                            ctx.fillStyle = color;
                            ctx.beginPath();
                            ctx.arc(startDot[0], startDot[1], 5, 0, Math.PI * 2);
                            ctx.fill();

                            // Title
                            ctx.fillStyle = color;
                            ctx.font = 'bold 18px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'middle';
                            ctx.fillText('Counting by ' + skipBy + 's  (' + count + ' jumps to reach 100)', viz.width / 2, 25);
                        }

                        draw();
                    }
                }
            ],
            exercises: [
                {
                    question: 'If you start at 0 and count by 5s, what is the 7th number you land on?',
                    hint: 'Count: 5, 10, 15, ... Keep going until you say the 7th number.',
                    solution: 'The 7th number is \\(35\\). Counting by 5s: \\(5, 10, 15, 20, 25, 30, 35\\). You can also calculate: \\(7 \\times 5 = 35\\).'
                },
                {
                    question: 'How many jumps do you need to count from 0 to 50 by 2s?',
                    hint: 'Each jump adds 2. How many times does 2 fit into 50?',
                    solution: 'You need \\(25\\) jumps. Since \\(50 \\div 2 = 25\\), it takes 25 jumps of size 2 to reach 50.'
                },
                {
                    question: 'Is the number 37 even or odd? How do you know?',
                    hint: 'Even numbers end in 0, 2, 4, 6, or 8. Odd numbers end in 1, 3, 5, 7, or 9.',
                    solution: '37 is <strong>odd</strong> because it ends in 7. Odd numbers are the ones you skip when counting by 2s: \\(1, 3, 5, 7, 9, 11, \\ldots\\)'
                }
            ]
        },

        // ============================================================
        // SECTION 2: Place Value: Ones, Tens, Hundreds
        // ============================================================
        {
            id: 'ch00-sec02',
            title: 'Place Value: Ones, Tens, Hundreds',
            content: `
                <h2>Place Value: Ones, Tens, Hundreds</h2>

                <p>Here's a really cool secret about numbers: <strong>where a digit sits matters just as much as what the digit is!</strong></p>

                <p>Think about the number <strong>352</strong>. It has three digits, but they don't all mean the same thing:</p>

                <ul>
                    <li>The <strong>3</strong> is in the <em>hundreds</em> place — it means \\(3 \\times 100 = 300\\)</li>
                    <li>The <strong>5</strong> is in the <em>tens</em> place — it means \\(5 \\times 10 = 50\\)</li>
                    <li>The <strong>2</strong> is in the <em>ones</em> place — it means \\(2 \\times 1 = 2\\)</li>
                </ul>

                <p>Put it all together: \\(300 + 50 + 2 = 352\\). That's <strong>place value</strong> — each position in a number has a different value!</p>

                <div class="env-block intuition">
                    <div class="env-title">Discovery</div>
                    <div class="env-body">
                        <p>We use only <strong>10 digits</strong> (0, 1, 2, 3, 4, 5, 6, 7, 8, 9) to write every number ever! The trick is that each position is worth <strong>10 times more</strong> than the position to its right. This is called the <strong>base-10 system</strong> (or decimal system).</p>
                    </div>
                </div>

                <h3>Visualizing Place Value with Blocks</h3>

                <p>Imagine you have three kinds of blocks:</p>
                <ul>
                    <li>A tiny <strong style="color:var(--accent-blue);">unit cube</strong> = 1 (ones)</li>
                    <li>A long <strong style="color:var(--accent-green);">rod</strong> = 10 (it's like 10 cubes glued together)</li>
                    <li>A big <strong style="color:var(--accent-orange);">flat</strong> = 100 (it's like 10 rods side by side)</li>
                </ul>

                <div class="viz-placeholder" data-viz="place-value-blocks"></div>

                <div class="env-block example">
                    <div class="env-title">Example</div>
                    <div class="env-body">
                        <p>The number <strong>247</strong> is made of:</p>
                        <ul>
                            <li>2 hundreds flats = \\(200\\)</li>
                            <li>4 tens rods = \\(40\\)</li>
                            <li>7 ones cubes = \\(7\\)</li>
                        </ul>
                        <p>So \\(247 = 200 + 40 + 7\\). This way of writing a number is called <strong>expanded form</strong>.</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="build-a-number"></div>

                <div class="env-block remark">
                    <div class="env-title">Think About It</div>
                    <div class="env-body">
                        <p>What happens when you have 10 ones cubes? You can trade them for 1 tens rod! And 10 tens rods? Those become 1 hundreds flat! This "trading up" by tens is the whole idea behind our number system.</p>
                    </div>
                </div>

                <div class="env-block warning">
                    <div class="env-title">Watch Out!</div>
                    <div class="env-body">
                        <p>The digit <strong>0</strong> is super important as a placeholder! The numbers 52, 502, and 520 all have a 5 and a 2, but they mean very different things because of where the 0 appears (or doesn't).</p>
                        <ul>
                            <li>\\(52 = 50 + 2\\)</li>
                            <li>\\(502 = 500 + 0 + 2\\)</li>
                            <li>\\(520 = 500 + 20 + 0\\)</li>
                        </ul>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'place-value-blocks',
                    title: 'Place Value Blocks',
                    description: 'See how numbers are built from hundreds flats, tens rods, and ones cubes.',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { width: 700, height: 360, scale: 1, originX: 0, originY: 0 });
                        var ctx = viz.ctx;
                        var currentNumber = 352;

                        var slider = VizEngine.createSlider(controls, 'Number', 0, 999, 352, 1, function(val) {
                            currentNumber = Math.round(val);
                            draw();
                        });

                        function draw() {
                            viz.clear();
                            var h = Math.floor(currentNumber / 100);
                            var t = Math.floor((currentNumber % 100) / 10);
                            var o = currentNumber % 10;

                            // Title
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 28px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'middle';
                            ctx.fillText(currentNumber, 350, 28);

                            // Expanded form
                            ctx.font = '16px -apple-system,sans-serif';
                            ctx.fillStyle = viz.colors.text;
                            ctx.fillText(h + ' hundreds + ' + t + ' tens + ' + o + ' ones', 350, 55);

                            // Draw hundreds flats (big squares)
                            var startX = 20;
                            var startY = 80;
                            ctx.fillStyle = viz.colors.orange;
                            ctx.font = 'bold 12px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            if (h > 0) {
                                ctx.fillText('HUNDREDS', startX + (h * 55) / 2, startY - 8);
                            }
                            for (var i = 0; i < h; i++) {
                                // Draw a flat (square)
                                ctx.fillStyle = viz.colors.orange + '44';
                                ctx.fillRect(startX + i * 55, startY, 50, 50);
                                ctx.strokeStyle = viz.colors.orange;
                                ctx.lineWidth = 2;
                                ctx.strokeRect(startX + i * 55, startY, 50, 50);
                                // Grid lines inside
                                ctx.strokeStyle = viz.colors.orange + '55';
                                ctx.lineWidth = 0.5;
                                for (var g = 1; g < 10; g++) {
                                    ctx.beginPath();
                                    ctx.moveTo(startX + i * 55 + g * 5, startY);
                                    ctx.lineTo(startX + i * 55 + g * 5, startY + 50);
                                    ctx.stroke();
                                    ctx.beginPath();
                                    ctx.moveTo(startX + i * 55, startY + g * 5);
                                    ctx.lineTo(startX + i * 55 + 50, startY + g * 5);
                                    ctx.stroke();
                                }
                                // Label
                                ctx.fillStyle = viz.colors.orange;
                                ctx.font = 'bold 14px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.fillText('100', startX + i * 55 + 25, startY + 65);
                            }

                            // Draw tens rods
                            var tensX = 20;
                            var tensY = 170;
                            ctx.fillStyle = viz.colors.green;
                            ctx.font = 'bold 12px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            if (t > 0) {
                                ctx.fillText('TENS', tensX + (t * 22) / 2, tensY - 8);
                            }
                            for (var j = 0; j < t; j++) {
                                ctx.fillStyle = viz.colors.green + '44';
                                ctx.fillRect(tensX + j * 22, tensY, 16, 80);
                                ctx.strokeStyle = viz.colors.green;
                                ctx.lineWidth = 2;
                                ctx.strokeRect(tensX + j * 22, tensY, 16, 80);
                                // Segments
                                ctx.strokeStyle = viz.colors.green + '55';
                                ctx.lineWidth = 0.5;
                                for (var s = 1; s < 10; s++) {
                                    ctx.beginPath();
                                    ctx.moveTo(tensX + j * 22, tensY + s * 8);
                                    ctx.lineTo(tensX + j * 22 + 16, tensY + s * 8);
                                    ctx.stroke();
                                }
                                // Label
                                ctx.fillStyle = viz.colors.green;
                                ctx.font = '11px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.fillText('10', tensX + j * 22 + 8, tensY + 92);
                            }

                            // Draw ones cubes
                            var onesX = 20;
                            var onesY = 290;
                            ctx.fillStyle = viz.colors.blue;
                            ctx.font = 'bold 12px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            if (o > 0) {
                                ctx.fillText('ONES', onesX + (o * 22) / 2, onesY - 8);
                            }
                            for (var k = 0; k < o; k++) {
                                ctx.fillStyle = viz.colors.blue + '44';
                                ctx.fillRect(onesX + k * 22, onesY, 16, 16);
                                ctx.strokeStyle = viz.colors.blue;
                                ctx.lineWidth = 2;
                                ctx.strokeRect(onesX + k * 22, onesY, 16, 16);
                                // Label
                                ctx.fillStyle = viz.colors.blue;
                                ctx.font = '11px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.fillText('1', onesX + k * 22 + 8, onesY + 28);
                            }

                            // Summary on the right side
                            var sumX = 450;
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 20px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.fillText('Place Value Breakdown', sumX, 100);

                            ctx.font = '18px -apple-system,sans-serif';
                            ctx.fillStyle = viz.colors.orange;
                            ctx.fillText(h + ' x 100 = ' + (h * 100), sumX, 140);
                            ctx.fillStyle = viz.colors.green;
                            ctx.fillText(t + ' x  10 = ' + (t * 10), sumX, 170);
                            ctx.fillStyle = viz.colors.blue;
                            ctx.fillText(o + ' x   1 = ' + o, sumX, 200);

                            // Divider line
                            ctx.strokeStyle = viz.colors.white;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            ctx.moveTo(sumX, 215);
                            ctx.lineTo(sumX + 180, 215);
                            ctx.stroke();

                            // Total
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 22px -apple-system,sans-serif';
                            ctx.fillText('Total = ' + currentNumber, sumX, 245);

                            // Draw the digit positions at bottom right
                            ctx.font = '14px -apple-system,sans-serif';
                            ctx.fillStyle = viz.colors.text;
                            ctx.textAlign = 'center';
                            ctx.fillText('Each digit has a position:', sumX + 90, 290);

                            var digitStr = String(currentNumber).padStart(3, ' ');
                            var labels = ['Hundreds', 'Tens', 'Ones'];
                            var digitColors = [viz.colors.orange, viz.colors.green, viz.colors.blue];
                            for (var d = 0; d < 3; d++) {
                                var dx = sumX + 30 + d * 60;
                                // Box
                                ctx.fillStyle = digitColors[d] + '33';
                                ctx.fillRect(dx - 18, 305, 36, 36);
                                ctx.strokeStyle = digitColors[d];
                                ctx.lineWidth = 2;
                                ctx.strokeRect(dx - 18, 305, 36, 36);
                                // Digit
                                ctx.fillStyle = digitColors[d];
                                ctx.font = 'bold 22px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.textBaseline = 'middle';
                                ctx.fillText(digitStr[d] === ' ' ? '0' : digitStr[d], dx, 323);
                                // Label
                                ctx.font = '10px -apple-system,sans-serif';
                                ctx.fillText(labels[d], dx, 352);
                            }
                            ctx.textBaseline = 'alphabetic';
                        }

                        draw();
                    }
                },
                {
                    id: 'build-a-number',
                    title: 'Build a Number!',
                    description: 'Use the sliders to set the hundreds, tens, and ones digits and see the number you build.',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { width: 700, height: 250, scale: 1, originX: 0, originY: 0 });
                        var ctx = viz.ctx;
                        var hundreds = 2;
                        var tens = 4;
                        var ones = 7;

                        VizEngine.createSlider(controls, 'Hundreds', 0, 9, 2, 1, function(v) { hundreds = Math.round(v); draw(); });
                        VizEngine.createSlider(controls, 'Tens', 0, 9, 4, 1, function(v) { tens = Math.round(v); draw(); });
                        VizEngine.createSlider(controls, 'Ones', 0, 9, 7, 1, function(v) { ones = Math.round(v); draw(); });

                        function draw() {
                            viz.clear();
                            var num = hundreds * 100 + tens * 10 + ones;

                            // Big number display
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'middle';

                            // Hundreds digit
                            ctx.fillStyle = viz.colors.orange;
                            ctx.font = 'bold 72px -apple-system,sans-serif';
                            ctx.fillText(hundreds, 260, 80);

                            // Tens digit
                            ctx.fillStyle = viz.colors.green;
                            ctx.fillText(tens, 350, 80);

                            // Ones digit
                            ctx.fillStyle = viz.colors.blue;
                            ctx.fillText(ones, 440, 80);

                            // Labels
                            ctx.font = '14px -apple-system,sans-serif';
                            ctx.fillStyle = viz.colors.orange;
                            ctx.fillText('Hundreds', 260, 130);
                            ctx.fillStyle = viz.colors.green;
                            ctx.fillText('Tens', 350, 130);
                            ctx.fillStyle = viz.colors.blue;
                            ctx.fillText('Ones', 440, 130);

                            // Expanded form
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '18px -apple-system,sans-serif';
                            ctx.fillText(hundreds + ' x 100  +  ' + tens + ' x 10  +  ' + ones + ' x 1', 350, 175);

                            // Equals
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 16px -apple-system,sans-serif';
                            ctx.fillText('=  ' + (hundreds * 100) + '  +  ' + (tens * 10) + '  +  ' + ones + '  =', 350, 205);

                            // Final number
                            ctx.fillStyle = viz.colors.teal;
                            ctx.font = 'bold 36px -apple-system,sans-serif';
                            ctx.fillText(num, 350, 240);

                            ctx.textBaseline = 'alphabetic';
                        }

                        draw();
                    }
                }
            ],
            exercises: [
                {
                    question: 'What is the value of the digit 6 in the number 648?',
                    hint: 'The 6 is the first digit (the leftmost one). What place is that?',
                    solution: 'The 6 is in the <strong>hundreds</strong> place, so it has a value of \\(6 \\times 100 = 600\\).'
                },
                {
                    question: 'Write 905 in expanded form.',
                    hint: 'Break it down: how many hundreds, tens, and ones?',
                    solution: '\\(905 = 900 + 0 + 5\\), or \\(9 \\times 100 + 0 \\times 10 + 5 \\times 1\\). Notice the 0 in the tens place — there are no tens!'
                },
                {
                    question: 'A number has 4 hundreds, 0 tens, and 8 ones. What is the number?',
                    hint: 'Compute \\(4 \\times 100 + 0 \\times 10 + 8 \\times 1\\).',
                    solution: 'The number is \\(408\\). Even though there are 0 tens, we write the 0 to hold the tens place!'
                }
            ]
        },

        // ============================================================
        // SECTION 3: Comparing Numbers
        // ============================================================
        {
            id: 'ch00-sec03',
            title: 'Comparing Numbers',
            content: `
                <h2>Comparing Numbers</h2>

                <p>Now that you know how numbers are built, let's learn how to compare them! When we compare two numbers, we figure out which one is <strong>bigger</strong>, which one is <strong>smaller</strong>, or if they're the <strong>same</strong>.</p>

                <p>We use three special symbols:</p>
                <ul>
                    <li><strong style="color:var(--accent-green); font-size:1.3em;">></strong> means <em>greater than</em> (the number on the left is bigger)</li>
                    <li><strong style="color:var(--accent-red); font-size:1.3em;"><</strong> means <em>less than</em> (the number on the left is smaller)</li>
                    <li><strong style="color:var(--accent-blue); font-size:1.3em;">=</strong> means <em>equal to</em> (both numbers are the same)</li>
                </ul>

                <div class="env-block intuition">
                    <div class="env-title">Discovery</div>
                    <div class="env-body">
                        <p>Here's a fun trick to remember: the symbols <strong>></strong> and <strong><</strong> look like a little mouth. <strong>The mouth always opens toward the bigger number!</strong> Think of it as a hungry alligator that always wants to eat the bigger meal.</p>
                        <p style="text-align:center; font-size:1.3em;">\\(5 \\; > \\; 3\\) (5 is greater) &nbsp;&nbsp;&nbsp; \\(2 \\; < \\; 7\\) (2 is less)</p>
                    </div>
                </div>

                <h3>How to Compare Numbers Step by Step</h3>

                <p>When comparing two numbers:</p>
                <ol>
                    <li><strong>Count the digits.</strong> A number with more digits is always bigger. (Example: 342 > 85 because 342 has 3 digits and 85 has only 2.)</li>
                    <li><strong>If they have the same number of digits</strong>, compare from left to right. Start with the biggest place value!</li>
                    <li><strong>The first digit that's different tells you the answer!</strong></li>
                </ol>

                <div class="env-block example">
                    <div class="env-title">Example</div>
                    <div class="env-body">
                        <p>Compare <strong>472</strong> and <strong>468</strong>:</p>
                        <ul>
                            <li>Both have 3 digits, so we compare from left to right.</li>
                            <li>Hundreds: \\(4 = 4\\) — same so far!</li>
                            <li>Tens: \\(7 > 6\\) — the first difference!</li>
                        </ul>
                        <p>Since 7 tens is more than 6 tens, we know \\(472 > 468\\).</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="compare-numbers-line"></div>

                <h3>Using the Number Line to Compare</h3>

                <p>On a number line, the number further to the <strong>right</strong> is always <strong>bigger</strong>. This makes it easy to see which number is greater!</p>

                <div class="viz-placeholder" data-viz="compare-interactive"></div>

                <div class="env-block remark">
                    <div class="env-title">Think About It</div>
                    <div class="env-body">
                        <p>Is \\(099\\) the same as \\(99\\)? Yes! Leading zeros (zeros at the very front) don't change a number's value. But zeros in the middle or end DO matter: \\(109 \\neq 19\\) and \\(190 \\neq 19\\).</p>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'compare-numbers-line',
                    title: 'Compare Two Numbers',
                    description: 'See two numbers placed on a number line. The one further right is bigger!',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { width: 700, height: 250, scale: 1, originX: 0, originY: 0 });
                        var ctx = viz.ctx;
                        var numA = 47;
                        var numB = 63;

                        VizEngine.createSlider(controls, 'Number A', 0, 100, 47, 1, function(v) { numA = Math.round(v); draw(); });
                        VizEngine.createSlider(controls, 'Number B', 0, 100, 63, 1, function(v) { numB = Math.round(v); draw(); });

                        function draw() {
                            viz.clear();

                            var lineY = 150;
                            var lineLeft = 50;
                            var lineRight = 650;
                            var lineLen = lineRight - lineLeft;

                            // Number line
                            ctx.strokeStyle = viz.colors.white;
                            ctx.lineWidth = 3;
                            ctx.beginPath();
                            ctx.moveTo(lineLeft, lineY);
                            ctx.lineTo(lineRight, lineY);
                            ctx.stroke();

                            // Tick marks every 10
                            for (var i = 0; i <= 100; i += 10) {
                                var tx = lineLeft + (i / 100) * lineLen;
                                ctx.strokeStyle = viz.colors.text;
                                ctx.lineWidth = 2;
                                ctx.beginPath();
                                ctx.moveTo(tx, lineY - 8);
                                ctx.lineTo(tx, lineY + 8);
                                ctx.stroke();

                                ctx.fillStyle = viz.colors.text;
                                ctx.font = '12px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.textBaseline = 'top';
                                ctx.fillText(i, tx, lineY + 14);
                            }

                            // Position A
                            var posA = lineLeft + (numA / 100) * lineLen;
                            ctx.fillStyle = viz.colors.blue;
                            ctx.beginPath();
                            ctx.arc(posA, lineY, 10, 0, Math.PI * 2);
                            ctx.fill();
                            ctx.font = 'bold 18px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'bottom';
                            ctx.fillText('A = ' + numA, posA, lineY - 18);

                            // Position B
                            var posB = lineLeft + (numB / 100) * lineLen;
                            ctx.fillStyle = viz.colors.orange;
                            ctx.beginPath();
                            ctx.arc(posB, lineY, 10, 0, Math.PI * 2);
                            ctx.fill();
                            ctx.font = 'bold 18px -apple-system,sans-serif';
                            ctx.textBaseline = 'bottom';
                            ctx.fillText('B = ' + numB, posB, lineY - 18);

                            // Comparison result
                            var symbol, color;
                            if (numA > numB) { symbol = '>'; color = viz.colors.green; }
                            else if (numA < numB) { symbol = '<'; color = viz.colors.red; }
                            else { symbol = '='; color = viz.colors.teal; }

                            ctx.fillStyle = color;
                            ctx.font = 'bold 36px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'middle';
                            ctx.fillText(numA + '  ' + symbol + '  ' + numB, 350, 45);

                            // Explanation
                            ctx.font = '16px -apple-system,sans-serif';
                            ctx.fillStyle = viz.colors.text;
                            if (numA > numB) {
                                ctx.fillText(numA + ' is to the right of ' + numB + ', so ' + numA + ' is greater!', 350, 80);
                            } else if (numA < numB) {
                                ctx.fillText(numA + ' is to the left of ' + numB + ', so ' + numA + ' is less!', 350, 80);
                            } else {
                                ctx.fillText('They are at the same spot — they are equal!', 350, 80);
                            }
                        }

                        draw();
                    }
                },
                {
                    id: 'compare-interactive',
                    title: 'Drag & Compare',
                    description: 'Drag the two points on the number line. The comparison updates as you move them!',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { width: 700, height: 200, scale: 6, originX: 40, originY: 120 });
                        var ctx = viz.ctx;

                        var pA = viz.addDraggable('a', 30, 0, viz.colors.blue, 12, function() {
                            pA.x = Math.round(Math.max(0, Math.min(100, pA.x)));
                            pA.y = 0;
                        });
                        var pB = viz.addDraggable('b', 70, 0, viz.colors.orange, 12, function() {
                            pB.x = Math.round(Math.max(0, Math.min(100, pB.x)));
                            pB.y = 0;
                        });

                        function draw() {
                            viz.clear();

                            // Number line
                            var s0 = viz.toScreen(0, 0);
                            var s100 = viz.toScreen(100, 0);
                            ctx.strokeStyle = viz.colors.white;
                            ctx.lineWidth = 3;
                            ctx.beginPath();
                            ctx.moveTo(s0[0], s0[1]);
                            ctx.lineTo(s100[0], s100[1]);
                            ctx.stroke();

                            // Tick marks
                            for (var i = 0; i <= 100; i += 10) {
                                var pos = viz.toScreen(i, 0);
                                ctx.strokeStyle = viz.colors.text;
                                ctx.lineWidth = 1.5;
                                ctx.beginPath();
                                ctx.moveTo(pos[0], pos[1] - 6);
                                ctx.lineTo(pos[0], pos[1] + 6);
                                ctx.stroke();
                                ctx.fillStyle = viz.colors.text;
                                ctx.font = '10px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.textBaseline = 'top';
                                ctx.fillText(i, pos[0], pos[1] + 10);
                            }

                            // Labels for draggables
                            var posA = viz.toScreen(pA.x, 0);
                            var posB = viz.toScreen(pB.x, 0);
                            ctx.font = 'bold 14px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'bottom';
                            ctx.fillStyle = viz.colors.blue;
                            ctx.fillText(Math.round(pA.x), posA[0], posA[1] - 20);
                            ctx.fillStyle = viz.colors.orange;
                            ctx.fillText(Math.round(pB.x), posB[0], posB[1] - 20);

                            // Comparison at top
                            var a = Math.round(pA.x);
                            var b = Math.round(pB.x);
                            var symbol, color;
                            if (a > b) { symbol = '>'; color = viz.colors.green; }
                            else if (a < b) { symbol = '<'; color = viz.colors.red; }
                            else { symbol = '='; color = viz.colors.teal; }

                            ctx.fillStyle = color;
                            ctx.font = 'bold 28px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'middle';
                            ctx.fillText(a + '  ' + symbol + '  ' + b, viz.width / 2, 30);

                            viz.drawDraggables();
                        }

                        viz.animate(draw);
                    }
                }
            ],
            exercises: [
                {
                    question: 'Put the correct symbol (>, <, or =) between these numbers: 385 ___ 358',
                    hint: 'Both have 3 hundreds. Compare the tens place: 8 tens vs 5 tens.',
                    solution: '\\(385 > 358\\). Both have 3 hundreds, but 385 has 8 tens while 358 has only 5 tens. Since \\(8 > 5\\), we know \\(385 > 358\\).'
                },
                {
                    question: 'Order these numbers from smallest to biggest: 92, 209, 29, 920',
                    hint: 'First sort by number of digits. Then compare the hundreds, tens, and ones.',
                    solution: 'From smallest to biggest: \\(29, \\; 92, \\; 209, \\; 920\\). The two 2-digit numbers: \\(29 < 92\\). The two 3-digit numbers: \\(209 < 920\\). And any 3-digit number is bigger than any 2-digit number.'
                },
                {
                    question: 'True or false: 450 > 449.',
                    hint: 'Both have 4 hundreds and 4 tens... look at the last digit.',
                    solution: '<strong>True!</strong> Both have 4 hundreds and both have 4 tens. But 450 has 0 ones while we can also see that at the tens position, \\(5 > 4\\). Wait — let us re-examine: 450 has 5 tens and 449 has 4 tens. Since \\(5 > 4\\) in the tens place, \\(450 > 449\\).'
                }
            ]
        },

        // ============================================================
        // SECTION 4: Skip Counting Patterns
        // ============================================================
        {
            id: 'ch00-sec04',
            title: 'Skip Counting Patterns',
            content: `
                <h2>Skip Counting Patterns</h2>

                <p>Skip counting isn't just a way to count fast — it creates beautiful <strong>patterns</strong>! Let's put numbers on a <strong>100-chart</strong> (a grid with numbers 1 to 100) and see what patterns appear when we skip count.</p>

                <div class="viz-placeholder" data-viz="hundred-chart"></div>

                <div class="env-block intuition">
                    <div class="env-title">Discovery</div>
                    <div class="env-body">
                        <p>Try highlighting multiples of different numbers on the chart above! Here's what you'll see:</p>
                        <ul>
                            <li><strong>By 2s:</strong> Every other number lights up — they form a checkerboard-like pattern!</li>
                            <li><strong>By 5s:</strong> Only the numbers ending in 0 or 5 light up — two neat columns!</li>
                            <li><strong>By 10s:</strong> Only the last column (10, 20, 30, ...) lights up!</li>
                            <li><strong>By 3s:</strong> A diagonal stripe pattern appears — very cool!</li>
                        </ul>
                    </div>
                </div>

                <h3>Looking for Digit Patterns</h3>

                <p>When you skip count, look at what the <strong>last digit (ones digit)</strong> does:</p>

                <div class="env-block example">
                    <div class="env-title">Try This!</div>
                    <div class="env-body">
                        <p><strong>Counting by 5s:</strong> \\(5, 10, 15, 20, 25, 30, 35, 40, \\ldots\\)</p>
                        <p>The ones digit goes: \\(5, 0, 5, 0, 5, 0, \\ldots\\) It just bounces between 5 and 0! So every number that ends in 0 or 5 can be reached by counting by 5s.</p>
                        <p><strong>Counting by 4s:</strong> \\(4, 8, 12, 16, 20, 24, 28, 32, 36, 40, \\ldots\\)</p>
                        <p>The ones digit goes: \\(4, 8, 2, 6, 0, 4, 8, 2, 6, 0, \\ldots\\) The pattern repeats every 5 numbers!</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="skip-pattern-circle"></div>

                <div class="env-block remark">
                    <div class="env-title">Think About It</div>
                    <div class="env-body">
                        <p>When you count by 9s, something magical happens: \\(9, 18, 27, 36, 45, 54, 63, 72, 81, 90\\). Add the digits of each number together: \\(9 \\to 9\\), \\(18 \\to 1+8=9\\), \\(27 \\to 2+7=9\\), \\(36 \\to 3+6=9\\). The digit sum is always 9! How cool is that?</p>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Cool Fact</div>
                    <div class="env-body">
                        <p>Skip counting is actually the beginning of <strong>multiplication</strong>! When you count by 3s and reach the 4th number (\\(3, 6, 9, 12\\)), you've just found \\(3 \\times 4 = 12\\). Every skip count is multiplication in disguise!</p>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'hundred-chart',
                    title: '100-Chart: Find the Patterns!',
                    description: 'Choose a skip-count number and watch the pattern appear on the hundred chart.',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { width: 700, height: 420, scale: 1, originX: 0, originY: 0 });
                        var ctx = viz.ctx;
                        var skipBy = 2;

                        VizEngine.createButton(controls, 'By 2s', function() { skipBy = 2; draw(); });
                        VizEngine.createButton(controls, 'By 3s', function() { skipBy = 3; draw(); });
                        VizEngine.createButton(controls, 'By 4s', function() { skipBy = 4; draw(); });
                        VizEngine.createButton(controls, 'By 5s', function() { skipBy = 5; draw(); });
                        VizEngine.createButton(controls, 'By 9s', function() { skipBy = 9; draw(); });
                        VizEngine.createButton(controls, 'By 10s', function() { skipBy = 10; draw(); });

                        function draw() {
                            viz.clear();

                            var cellSize = 38;
                            var startX = (700 - 10 * cellSize) / 2;
                            var startY = 45;

                            // Title
                            var colorMap = {};
                            colorMap[2] = viz.colors.blue;
                            colorMap[3] = viz.colors.purple;
                            colorMap[4] = viz.colors.pink;
                            colorMap[5] = viz.colors.orange;
                            colorMap[9] = viz.colors.teal;
                            colorMap[10] = viz.colors.green;
                            var color = colorMap[skipBy] || viz.colors.blue;

                            ctx.fillStyle = color;
                            ctx.font = 'bold 18px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'middle';
                            ctx.fillText('Counting by ' + skipBy + 's on the Hundred Chart', 350, 22);

                            // Build set of highlighted numbers
                            var highlighted = {};
                            for (var m = skipBy; m <= 100; m += skipBy) {
                                highlighted[m] = true;
                            }

                            // Draw grid
                            for (var num = 1; num <= 100; num++) {
                                var col = (num - 1) % 10;
                                var row = Math.floor((num - 1) / 10);
                                var cx = startX + col * cellSize;
                                var cy = startY + row * cellSize;

                                // Background
                                if (highlighted[num]) {
                                    ctx.fillStyle = color + '55';
                                    ctx.fillRect(cx, cy, cellSize - 1, cellSize - 1);
                                    ctx.strokeStyle = color;
                                    ctx.lineWidth = 2;
                                    ctx.strokeRect(cx, cy, cellSize - 1, cellSize - 1);
                                } else {
                                    ctx.fillStyle = '#1a1a40';
                                    ctx.fillRect(cx, cy, cellSize - 1, cellSize - 1);
                                    ctx.strokeStyle = '#30363d';
                                    ctx.lineWidth = 1;
                                    ctx.strokeRect(cx, cy, cellSize - 1, cellSize - 1);
                                }

                                // Number text
                                ctx.fillStyle = highlighted[num] ? viz.colors.white : viz.colors.text;
                                ctx.font = highlighted[num] ? 'bold 13px -apple-system,sans-serif' : '12px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.textBaseline = 'middle';
                                ctx.fillText(num, cx + cellSize / 2 - 0.5, cy + cellSize / 2 - 0.5);
                            }

                            // Count how many are highlighted
                            var count = Math.floor(100 / skipBy);
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '14px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText(count + ' numbers highlighted out of 100', 350, startY + 10 * cellSize + 16);
                        }

                        draw();
                    }
                },
                {
                    id: 'skip-pattern-circle',
                    title: 'Ones-Digit Circle Pattern',
                    description: 'Watch the ones digit trace a pattern around a circle as you skip count!',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { width: 500, height: 420, scale: 1, originX: 0, originY: 0 });
                        var ctx = viz.ctx;
                        var skipBy = 3;

                        VizEngine.createButton(controls, 'By 2s', function() { skipBy = 2; draw(); });
                        VizEngine.createButton(controls, 'By 3s', function() { skipBy = 3; draw(); });
                        VizEngine.createButton(controls, 'By 4s', function() { skipBy = 4; draw(); });
                        VizEngine.createButton(controls, 'By 7s', function() { skipBy = 7; draw(); });
                        VizEngine.createButton(controls, 'By 9s', function() { skipBy = 9; draw(); });

                        function draw() {
                            viz.clear();

                            var centerX = 250;
                            var centerY = 220;
                            var radius = 140;

                            var colorMap = {};
                            colorMap[2] = viz.colors.blue;
                            colorMap[3] = viz.colors.purple;
                            colorMap[4] = viz.colors.pink;
                            colorMap[7] = viz.colors.orange;
                            colorMap[9] = viz.colors.teal;
                            var color = colorMap[skipBy] || viz.colors.blue;

                            // Title
                            ctx.fillStyle = color;
                            ctx.font = 'bold 16px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'middle';
                            ctx.fillText('Ones digit pattern when counting by ' + skipBy + 's', centerX, 25);

                            // Draw circle with digits 0-9
                            for (var d = 0; d < 10; d++) {
                                var angle = -Math.PI / 2 + (d / 10) * 2 * Math.PI;
                                var dx = centerX + radius * Math.cos(angle);
                                var dy = centerY + radius * Math.sin(angle);

                                // Circle for digit
                                ctx.fillStyle = '#1a1a40';
                                ctx.beginPath();
                                ctx.arc(dx, dy, 22, 0, Math.PI * 2);
                                ctx.fill();
                                ctx.strokeStyle = viz.colors.text;
                                ctx.lineWidth = 2;
                                ctx.beginPath();
                                ctx.arc(dx, dy, 22, 0, Math.PI * 2);
                                ctx.stroke();

                                // Digit
                                ctx.fillStyle = viz.colors.white;
                                ctx.font = 'bold 18px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.textBaseline = 'middle';
                                ctx.fillText(d, dx, dy);
                            }

                            // Draw connections: trace the ones digit sequence
                            var sequence = [];
                            var visited = {};
                            var current = skipBy % 10;
                            while (!visited[current]) {
                                sequence.push(current);
                                visited[current] = true;
                                current = (current + skipBy) % 10;
                            }

                            // Draw arrows between consecutive ones-digits
                            for (var i = 0; i < sequence.length; i++) {
                                var fromD = sequence[i];
                                var toD = sequence[(i + 1) % sequence.length];
                                var fromAngle = -Math.PI / 2 + (fromD / 10) * 2 * Math.PI;
                                var toAngle = -Math.PI / 2 + (toD / 10) * 2 * Math.PI;
                                var fx = centerX + radius * Math.cos(fromAngle);
                                var fy = centerY + radius * Math.sin(fromAngle);
                                var tx = centerX + radius * Math.cos(toAngle);
                                var ty = centerY + radius * Math.sin(toAngle);

                                // Shorten line to not overlap circles
                                var ddx = tx - fx;
                                var ddy = ty - fy;
                                var len = Math.sqrt(ddx * ddx + ddy * ddy);
                                if (len > 0) {
                                    var ux = ddx / len;
                                    var uy = ddy / len;
                                    var sx = fx + ux * 26;
                                    var sy = fy + uy * 26;
                                    var ex = tx - ux * 26;
                                    var ey = ty - uy * 26;

                                    ctx.strokeStyle = color;
                                    ctx.lineWidth = 2.5;
                                    ctx.beginPath();
                                    ctx.moveTo(sx, sy);
                                    ctx.lineTo(ex, ey);
                                    ctx.stroke();

                                    // Arrowhead
                                    var aAngle = Math.atan2(ey - sy, ex - sx);
                                    ctx.fillStyle = color;
                                    ctx.beginPath();
                                    ctx.moveTo(ex, ey);
                                    ctx.lineTo(ex - 10 * Math.cos(aAngle - 0.4), ey - 10 * Math.sin(aAngle - 0.4));
                                    ctx.lineTo(ex - 10 * Math.cos(aAngle + 0.4), ey - 10 * Math.sin(aAngle + 0.4));
                                    ctx.closePath();
                                    ctx.fill();
                                }

                                // Highlight visited digits
                                var hAngle = -Math.PI / 2 + (fromD / 10) * 2 * Math.PI;
                                var hx = centerX + radius * Math.cos(hAngle);
                                var hy = centerY + radius * Math.sin(hAngle);
                                ctx.fillStyle = color + '44';
                                ctx.beginPath();
                                ctx.arc(hx, hy, 22, 0, Math.PI * 2);
                                ctx.fill();
                                ctx.strokeStyle = color;
                                ctx.lineWidth = 3;
                                ctx.beginPath();
                                ctx.arc(hx, hy, 22, 0, Math.PI * 2);
                                ctx.stroke();
                            }

                            // Show the sequence as text
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '14px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            var seqText = 'Ones digits: ' + sequence.join(' \u2192 ') + ' \u2192 ' + sequence[0] + ' (repeats!)';
                            ctx.fillText(seqText, centerX, centerY + radius + 45);

                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '13px -apple-system,sans-serif';
                            ctx.fillText('Pattern length: ' + sequence.length + ' digits before repeating', centerX, centerY + radius + 65);
                        }

                        draw();
                    }
                }
            ],
            exercises: [
                {
                    question: 'On the 100-chart, when you count by 5s, which two columns get highlighted?',
                    hint: 'Numbers ending in 5 are in one column. Numbers ending in 0 are in another.',
                    solution: 'The <strong>5th column</strong> (5, 15, 25, 35, ...) and the <strong>10th column</strong> (10, 20, 30, 40, ...) get highlighted. These are all the numbers whose ones digit is 5 or 0.'
                },
                {
                    question: 'When counting by 4s, what are the first 5 numbers you land on? What pattern do the ones digits make?',
                    hint: 'Start at 4 and keep adding 4: 4, 8, ...',
                    solution: 'The first 5 numbers are \\(4, 8, 12, 16, 20\\). The ones digits are \\(4, 8, 2, 6, 0\\). This pattern repeats forever!'
                },
                {
                    question: 'When you count by 9s, the digit sum is always 9 (for the first ten multiples). Can you verify this for \\(9 \\times 7 = 63\\)?',
                    hint: 'Add the digits of 63 together.',
                    solution: '\\(6 + 3 = 9\\). Yes! The digits of 63 add up to 9. This works for all multiples of 9 up to \\(9 \\times 10 = 90\\) (and even beyond with a little extra work).'
                }
            ]
        },

        // ============================================================
        // SECTION 5: Big Numbers & Beyond
        // ============================================================
        {
            id: 'ch00-sec05',
            title: 'Big Numbers & Beyond',
            content: `
                <h2>Big Numbers & Beyond</h2>

                <p>So far we've been working with numbers up to the hundreds. But numbers can get much, MUCH bigger! Let's explore <strong>thousands</strong> and beyond.</p>

                <h3>Thousands</h3>

                <p>When you have 10 hundreds, you get a new place value: <strong>one thousand</strong> (written 1,000). Our place value chart grows to the left:</p>

                <p style="text-align:center; font-size:1.1em;">
                    <strong style="color:var(--accent-purple);">Thousands</strong> &nbsp;
                    <strong style="color:var(--accent-orange);">Hundreds</strong> &nbsp;
                    <strong style="color:var(--accent-green);">Tens</strong> &nbsp;
                    <strong style="color:var(--accent-blue);">Ones</strong>
                </p>

                <p>The number <strong>3,527</strong> means:</p>
                <p style="text-align:center;">
                    \\(3 \\times 1{,}000 + 5 \\times 100 + 2 \\times 10 + 7 \\times 1 = 3{,}527\\)
                </p>

                <div class="env-block example">
                    <div class="env-title">Example</div>
                    <div class="env-body">
                        <p>How many days have you been alive? If you're 8 years old:</p>
                        <p>\\(8 \\times 365 = 2{,}920\\) days!</p>
                        <p>That's almost <strong>3 thousand</strong> days. That's a lot of days! If you're 10 years old: \\(10 \\times 365 = 3{,}650\\) days.</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="big-number-explorer"></div>

                <h3>Even Bigger: Ten-Thousands and Beyond</h3>

                <p>The pattern keeps going! Each new place is worth 10 times more:</p>
                <ul>
                    <li><strong>Ones:</strong> 1</li>
                    <li><strong>Tens:</strong> 10 (ten ones)</li>
                    <li><strong>Hundreds:</strong> 100 (ten tens)</li>
                    <li><strong>Thousands:</strong> 1,000 (ten hundreds)</li>
                    <li><strong>Ten-Thousands:</strong> 10,000 (ten thousands)</li>
                    <li><strong>Hundred-Thousands:</strong> 100,000 (ten ten-thousands)</li>
                    <li><strong>Millions:</strong> 1,000,000 (a thousand thousands!)</li>
                </ul>

                <div class="env-block intuition">
                    <div class="env-title">Cool Fact</div>
                    <div class="env-body">
                        <p>How long would it take to count to a million? If you counted one number every second without stopping:</p>
                        <ul>
                            <li>Counting to <strong>100</strong>: about 1.5 minutes</li>
                            <li>Counting to <strong>1,000</strong>: about 17 minutes</li>
                            <li>Counting to <strong>10,000</strong>: almost 3 hours</li>
                            <li>Counting to <strong>1,000,000</strong>: about <strong>11.5 days</strong> nonstop!</li>
                        </ul>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="powers-of-ten-viz"></div>

                <div class="env-block example">
                    <div class="env-title">Try This!</div>
                    <div class="env-body">
                        <p>Here are some fun big numbers from real life:</p>
                        <ul>
                            <li>There are about <strong>206 bones</strong> in your body</li>
                            <li>Your heart beats about <strong>100,000 times</strong> per day</li>
                            <li>There are about <strong>8,000 grains</strong> of rice in a cup</li>
                            <li>The Earth is about <strong>150,000,000 km</strong> from the Sun</li>
                        </ul>
                        <p>Can you figure out which place value the leading digit falls in for each number?</p>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Think About It</div>
                    <div class="env-body">
                        <p>We use <strong>commas</strong> (or sometimes spaces) to make big numbers easier to read. We put a comma every 3 digits from the right: 1,000 or 25,000 or 1,000,000. Without commas, a number like 3527891 is really hard to read! With commas: 3,527,891 — much better!</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="real-world-numbers"></div>
            `,
            visualizations: [
                {
                    id: 'big-number-explorer',
                    title: 'Explore Big Numbers',
                    description: 'Build a number up to 9,999 and see its place value breakdown.',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { width: 700, height: 280, scale: 1, originX: 0, originY: 0 });
                        var ctx = viz.ctx;
                        var th = 3;
                        var hu = 5;
                        var te = 2;
                        var on = 7;

                        VizEngine.createSlider(controls, 'Thousands', 0, 9, 3, 1, function(v) { th = Math.round(v); draw(); });
                        VizEngine.createSlider(controls, 'Hundreds', 0, 9, 5, 1, function(v) { hu = Math.round(v); draw(); });
                        VizEngine.createSlider(controls, 'Tens', 0, 9, 2, 1, function(v) { te = Math.round(v); draw(); });
                        VizEngine.createSlider(controls, 'Ones', 0, 9, 7, 1, function(v) { on = Math.round(v); draw(); });

                        function formatNum(n) {
                            return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                        }

                        function draw() {
                            viz.clear();
                            var num = th * 1000 + hu * 100 + te * 10 + on;

                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'middle';

                            // Big digit display
                            var digitColors = [viz.colors.purple, viz.colors.orange, viz.colors.green, viz.colors.blue];
                            var digits = [th, hu, te, on];
                            var labels = ['Thousands', 'Hundreds', 'Tens', 'Ones'];
                            var values = [1000, 100, 10, 1];

                            for (var i = 0; i < 4; i++) {
                                var dx = 170 + i * 100;

                                // Box
                                ctx.fillStyle = digitColors[i] + '22';
                                ctx.fillRect(dx - 30, 20, 60, 60);
                                ctx.strokeStyle = digitColors[i];
                                ctx.lineWidth = 3;
                                ctx.strokeRect(dx - 30, 20, 60, 60);

                                // Digit
                                ctx.fillStyle = digitColors[i];
                                ctx.font = 'bold 36px -apple-system,sans-serif';
                                ctx.fillText(digits[i], dx, 50);

                                // Label
                                ctx.font = '12px -apple-system,sans-serif';
                                ctx.fillText(labels[i], dx, 95);

                                // Value
                                ctx.font = '14px -apple-system,sans-serif';
                                ctx.fillText(digits[i] + ' x ' + formatNum(values[i]), dx, 115);
                                ctx.fillText('= ' + formatNum(digits[i] * values[i]), dx, 135);
                            }

                            // Add comma between thousands and hundreds
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 36px -apple-system,sans-serif';
                            ctx.fillText(',', 235, 50);

                            // Expanded form
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '16px -apple-system,sans-serif';
                            ctx.fillText(
                                formatNum(th * 1000) + ' + ' + formatNum(hu * 100) + ' + ' + (te * 10) + ' + ' + on,
                                350, 170
                            );

                            // Total
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 40px -apple-system,sans-serif';
                            ctx.fillText('= ' + formatNum(num), 350, 215);

                            // Fun fact about the number
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '13px -apple-system,sans-serif';
                            if (num > 0) {
                                var days = (num / 365).toFixed(1);
                                ctx.fillText(formatNum(num) + ' days is about ' + days + ' years!', 350, 260);
                            }
                        }

                        draw();
                    }
                },
                {
                    id: 'powers-of-ten-viz',
                    title: 'Powers of 10: How Fast Numbers Grow',
                    description: 'See how each place value is 10 times bigger than the one before!',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { width: 700, height: 340, scale: 1, originX: 0, originY: 0 });
                        var ctx = viz.ctx;

                        function draw() {
                            viz.clear();

                            var levels = [
                                { name: 'One', value: 1, color: viz.colors.blue, dots: 1 },
                                { name: 'Ten', value: 10, color: viz.colors.green, dots: 10 },
                                { name: 'Hundred', value: 100, color: viz.colors.orange, dots: 100 },
                                { name: 'Thousand', value: 1000, color: viz.colors.purple, dots: 1000 },
                                { name: 'Ten Thousand', value: 10000, color: viz.colors.pink, dots: 10000 },
                                { name: 'Hundred Thousand', value: 100000, color: viz.colors.red, dots: null },
                                { name: 'Million', value: 1000000, color: viz.colors.yellow, dots: null }
                            ];

                            var startX = 30;
                            var rowHeight = 44;

                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 16px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'middle';
                            ctx.fillText('Each step is 10 times bigger!', 350, 18);

                            for (var i = 0; i < levels.length; i++) {
                                var y = 45 + i * rowHeight;
                                var level = levels[i];

                                // Label
                                ctx.fillStyle = level.color;
                                ctx.font = 'bold 14px -apple-system,sans-serif';
                                ctx.textAlign = 'left';
                                ctx.textBaseline = 'middle';
                                ctx.fillText(level.name, startX, y + 10);

                                // Value
                                ctx.font = '13px -apple-system,sans-serif';
                                ctx.fillStyle = viz.colors.text;
                                var formatted = level.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                                ctx.fillText('= ' + formatted, startX + 130, y + 10);

                                // Bar to represent relative size (logarithmic)
                                var barWidth = Math.log10(level.value) * 70 + 10;
                                ctx.fillStyle = level.color + '55';
                                ctx.fillRect(startX + 240, y, barWidth, 20);
                                ctx.strokeStyle = level.color;
                                ctx.lineWidth = 1.5;
                                ctx.strokeRect(startX + 240, y, barWidth, 20);

                                // Dots representation for small values
                                if (level.dots !== null && level.dots <= 100) {
                                    var dotStartX = startX + 250;
                                    for (var d = 0; d < level.dots; d++) {
                                        var dotRow = Math.floor(d / 50);
                                        var dotCol = d % 50;
                                        ctx.fillStyle = level.color;
                                        ctx.beginPath();
                                        ctx.arc(dotStartX + dotCol * 5, y + 5 + dotRow * 8, 1.5, 0, Math.PI * 2);
                                        ctx.fill();
                                    }
                                } else if (level.dots !== null && level.dots <= 10000) {
                                    // Tiny dots
                                    ctx.fillStyle = level.color;
                                    ctx.font = '11px -apple-system,sans-serif';
                                    ctx.textAlign = 'left';
                                    ctx.fillText(formatted + ' tiny dots (too many to show!)', startX + 250, y + 10);
                                } else {
                                    ctx.fillStyle = level.color;
                                    ctx.font = '11px -apple-system,sans-serif';
                                    ctx.textAlign = 'left';
                                    ctx.fillText(formatted + ' — way too many to draw!', startX + 250, y + 10);
                                }

                                // Arrow "x10" between levels
                                if (i < levels.length - 1) {
                                    ctx.fillStyle = viz.colors.teal;
                                    ctx.font = 'bold 11px -apple-system,sans-serif';
                                    ctx.textAlign = 'center';
                                    ctx.fillText('x10', startX + 80, y + rowHeight / 2 + 10);
                                    // Small arrow
                                    ctx.strokeStyle = viz.colors.teal;
                                    ctx.lineWidth = 1;
                                    ctx.beginPath();
                                    ctx.moveTo(startX + 95, y + 24);
                                    ctx.lineTo(startX + 95, y + rowHeight - 2);
                                    ctx.stroke();
                                    ctx.beginPath();
                                    ctx.moveTo(startX + 95, y + rowHeight - 2);
                                    ctx.lineTo(startX + 91, y + rowHeight - 8);
                                    ctx.moveTo(startX + 95, y + rowHeight - 2);
                                    ctx.lineTo(startX + 99, y + rowHeight - 8);
                                    ctx.stroke();
                                }
                            }
                        }

                        draw();
                    }
                },
                {
                    id: 'real-world-numbers',
                    title: 'Real-World Big Numbers',
                    description: 'See how big numbers show up in everyday life!',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { width: 700, height: 300, scale: 1, originX: 0, originY: 0 });
                        var ctx = viz.ctx;

                        var facts = [
                            { label: 'Bones in your body', value: 206, color: viz.colors.blue },
                            { label: 'Days in a year', value: 365, color: viz.colors.green },
                            { label: 'Hours in a year', value: 8760, color: viz.colors.orange },
                            { label: 'Grains of rice in a cup', value: 8000, color: viz.colors.purple },
                            { label: 'Heartbeats per day', value: 100000, color: viz.colors.red },
                            { label: 'Stars visible to the eye', value: 5000, color: viz.colors.yellow }
                        ];

                        // Find max for scaling
                        var maxVal = 100000;

                        function formatNum(n) {
                            return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                        }

                        function draw() {
                            viz.clear();

                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 18px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'middle';
                            ctx.fillText('Numbers in the Real World', 350, 25);

                            var barStartX = 220;
                            var barMaxWidth = 400;
                            var rowH = 42;
                            var startY = 55;

                            for (var i = 0; i < facts.length; i++) {
                                var f = facts[i];
                                var y = startY + i * rowH;
                                var barW = Math.log10(f.value + 1) / Math.log10(maxVal + 1) * barMaxWidth;

                                // Label
                                ctx.fillStyle = f.color;
                                ctx.font = '13px -apple-system,sans-serif';
                                ctx.textAlign = 'right';
                                ctx.textBaseline = 'middle';
                                ctx.fillText(f.label, barStartX - 12, y + 15);

                                // Bar
                                ctx.fillStyle = f.color + '44';
                                ctx.fillRect(barStartX, y + 2, barW, 26);
                                ctx.strokeStyle = f.color;
                                ctx.lineWidth = 2;
                                ctx.strokeRect(barStartX, y + 2, barW, 26);

                                // Value
                                ctx.fillStyle = viz.colors.white;
                                ctx.font = 'bold 14px -apple-system,sans-serif';
                                ctx.textAlign = 'left';
                                ctx.fillText(formatNum(f.value), barStartX + barW + 8, y + 15);
                            }

                            // Note
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('Bar lengths use a logarithmic scale (each equal-width step = 10x bigger)', 350, startY + facts.length * rowH + 15);
                        }

                        draw();
                    }
                }
            ],
            exercises: [
                {
                    question: 'Write 4,083 in expanded form using place values.',
                    hint: 'Break it into thousands, hundreds, tens, and ones.',
                    solution: '\\(4{,}083 = 4 \\times 1{,}000 + 0 \\times 100 + 8 \\times 10 + 3 \\times 1 = 4{,}000 + 0 + 80 + 3\\).'
                },
                {
                    question: 'If you are 9 years old, approximately how many hours have you been alive? (Hint: there are about 8,760 hours in a year.)',
                    hint: 'Multiply 8,760 by 9. You can break it up: \\(9 \\times 8{,}000 = 72{,}000\\) and \\(9 \\times 760 = 6{,}840\\).',
                    solution: '\\(9 \\times 8{,}760 = 78{,}840\\) hours. That is almost 79 thousand hours! To calculate: \\(9 \\times 8{,}000 = 72{,}000\\) and \\(9 \\times 760 = 6{,}840\\), so \\(72{,}000 + 6{,}840 = 78{,}840\\).'
                },
                {
                    question: 'Which is bigger: 9,999 or 10,000? How can you tell without comparing every digit?',
                    hint: 'How many digits does each number have?',
                    solution: '\\(10{,}000 > 9{,}999\\). The quickest way to tell: 10,000 has <strong>5 digits</strong> while 9,999 has only <strong>4 digits</strong>. A number with more digits is always bigger! (Also, 10,000 is just 1 more than 9,999.)'
                }
            ]
        }
    ]
});
