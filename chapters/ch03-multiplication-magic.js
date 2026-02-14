window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch03',
    number: 3,
    title: 'Multiplication Magic',
    subtitle: 'Discover the power of groups, arrays, and amazing number patterns',
    sections: [
        // ========================================================
        // SECTION 1: What Is Multiplication?
        // ========================================================
        {
            id: 'ch03-sec01',
            title: 'What Is Multiplication?',
            content: `
                <h2>What Is Multiplication?</h2>

                <p>You already know how to add numbers together. But what happens when you need to add the <strong>same number</strong> over and over again? That is where <strong>multiplication</strong> comes in -- it is a super-powered shortcut for repeated addition!</p>

                <div class="env-block intuition">
                    <div class="env-title">Discovery</div>
                    <div class="env-body">
                        <p>Imagine you have <strong>3 bags</strong>, and each bag has <strong>4 apples</strong>. How many apples do you have in total?</p>
                        <p>You could add: \\(4 + 4 + 4 = 12\\)</p>
                        <p>Or you could <em>multiply</em>: \\(3 \\times 4 = 12\\)</p>
                        <p>Multiplication tells us: "I have <strong>3 groups</strong> of <strong>4</strong>." It is just a faster way to write repeated addition!</p>
                    </div>
                </div>

                <h3>The Multiplication Symbol</h3>

                <p>The symbol \\(\\times\\) means "groups of." When we write \\(3 \\times 4\\), we mean <strong>3 groups of 4</strong>. Let's see a few examples:</p>

                <ul>
                    <li>\\(2 \\times 5 = 5 + 5 = 10\\) &mdash; 2 groups of 5</li>
                    <li>\\(4 \\times 3 = 3 + 3 + 3 + 3 = 12\\) &mdash; 4 groups of 3</li>
                    <li>\\(5 \\times 2 = 2 + 2 + 2 + 2 + 2 = 10\\) &mdash; 5 groups of 2</li>
                </ul>

                <div class="env-block example">
                    <div class="env-title">Example</div>
                    <div class="env-body">
                        <p><strong>Problem:</strong> What is \\(3 \\times 4\\)?</p>
                        <p><strong>Step 1:</strong> Think "3 groups of 4"</p>
                        <p><strong>Step 2:</strong> Write as addition: \\(4 + 4 + 4\\)</p>
                        <p><strong>Step 3:</strong> Add them up: \\(4 + 4 = 8\\), then \\(8 + 4 = 12\\)</p>
                        <p><strong>Answer:</strong> \\(3 \\times 4 = 12\\)</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="ch03-groups-viz"></div>

                <h3>The Order Doesn't Matter!</h3>

                <p>Here is something really cool. Look at these two problems:</p>
                <ul>
                    <li>\\(3 \\times 4 = 12\\) &mdash; 3 groups of 4</li>
                    <li>\\(4 \\times 3 = 12\\) &mdash; 4 groups of 3</li>
                </ul>
                <p>Both give the same answer! This is called the <strong>commutative property</strong> -- a fancy name that just means <em>you can swap the numbers around and the answer stays the same</em>.</p>

                <div class="viz-placeholder" data-viz="ch03-commutative-viz"></div>

                <div class="env-block remark">
                    <div class="env-title">Think About It</div>
                    <div class="env-body">
                        <p>Why does \\(3 \\times 4\\) give the same answer as \\(4 \\times 3\\)? Picture 3 rows of 4 objects. Now tilt your head and look at it sideways -- you see 4 rows of 3! The total number of objects hasn't changed.</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Try This!</div>
                    <div class="env-body">
                        <p>Use repeated addition to check these multiplications:</p>
                        <ul>
                            <li>\\(6 \\times 3 = ?\\) (Think: \\(3 + 3 + 3 + 3 + 3 + 3\\))</li>
                            <li>\\(2 \\times 8 = ?\\) (Think: \\(8 + 8\\))</li>
                            <li>\\(5 \\times 5 = ?\\) (Think: \\(5 + 5 + 5 + 5 + 5\\))</li>
                        </ul>
                    </div>
                </div>

                <div class="env-block warning">
                    <div class="env-title">Watch Out!</div>
                    <div class="env-body">
                        <p>Multiplying by <strong>0</strong> always gives 0. Zero groups of anything is nothing! \\(0 \\times 7 = 0\\) and \\(7 \\times 0 = 0\\).</p>
                        <p>Multiplying by <strong>1</strong> keeps the number the same. One group of 7 is just 7! \\(1 \\times 7 = 7\\).</p>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'ch03-groups-viz',
                    title: 'Groups of Objects: See Multiplication as Repeated Addition',
                    description: 'Use the sliders to change the number of groups and the size of each group. Watch the objects appear!',
                    setup: function(container, controls) {
                        const viz = new VizEngine(container, { width: 560, height: 380, scale: 40, originX: 40, originY: 350 });
                        let numGroups = 3, groupSize = 4;

                        const gs = VizEngine.createSlider(controls, 'Groups', 1, 6, 3, 1, v => { numGroups = Math.round(v); draw(); });
                        const ss = VizEngine.createSlider(controls, 'Per group', 1, 8, 4, 1, v => { groupSize = Math.round(v); draw(); });

                        function draw() {
                            viz.clear();
                            const ctx = viz.ctx;
                            const total = numGroups * groupSize;
                            const circleR = 16;
                            const gapX = 90;
                            const gapY = 36;
                            const startX = 30;
                            const startY = 30;

                            // Draw each group
                            for (let g = 0; g < numGroups; g++) {
                                const gx = startX + g * gapX;
                                // Group label
                                ctx.fillStyle = viz.colors.teal;
                                ctx.font = 'bold 13px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.fillText('Group ' + (g + 1), gx + circleR, startY - 10);

                                // Draw bracket / box around group
                                ctx.strokeStyle = viz.colors.teal + '55';
                                ctx.lineWidth = 1.5;
                                ctx.setLineDash([4, 3]);
                                const boxW = circleR * 2 + 12;
                                const boxH = groupSize * gapY + 10;
                                ctx.strokeRect(gx - 4, startY, boxW, boxH);
                                ctx.setLineDash([]);

                                // Draw circles for items in this group
                                var colors = [viz.colors.blue, viz.colors.orange, viz.colors.green, viz.colors.purple, viz.colors.pink, viz.colors.yellow];
                                var groupColor = colors[g % colors.length];
                                for (let i = 0; i < groupSize; i++) {
                                    const cx = gx + circleR;
                                    const cy = startY + 18 + i * gapY;
                                    // Filled circle
                                    ctx.fillStyle = groupColor + '44';
                                    ctx.beginPath(); ctx.arc(cx, cy, circleR, 0, Math.PI * 2); ctx.fill();
                                    ctx.strokeStyle = groupColor;
                                    ctx.lineWidth = 2;
                                    ctx.beginPath(); ctx.arc(cx, cy, circleR, 0, Math.PI * 2); ctx.stroke();
                                    // Star inside
                                    ctx.fillStyle = groupColor;
                                    ctx.font = '14px sans-serif';
                                    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
                                    ctx.fillText('\u2605', cx, cy);
                                }
                            }

                            // Draw equation at the bottom
                            const eqY = startY + groupSize * gapY + 45;
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 18px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.textBaseline = 'middle';

                            // Build repeated addition string
                            let addStr = '';
                            for (let g = 0; g < numGroups; g++) {
                                if (g > 0) addStr += ' + ';
                                addStr += groupSize;
                            }

                            ctx.fillText(numGroups + ' \u00d7 ' + groupSize + ' = ' + addStr + ' = ' + total, 20, eqY);
                        }

                        draw();
                        return viz;
                    }
                },
                {
                    id: 'ch03-commutative-viz',
                    title: 'Commutative Property: Swapping the Order',
                    description: 'See how 3 groups of 4 and 4 groups of 3 both make 12. Drag the slider to flip between views!',
                    setup: function(container, controls) {
                        const viz = new VizEngine(container, { width: 560, height: 340, scale: 40, originX: 40, originY: 310 });
                        let blendVal = 0; // 0 = "a x b", 1 = "b x a"

                        VizEngine.createSlider(controls, 'Flip', 0, 1, 0, 1, v => { blendVal = Math.round(v); draw(); });

                        function draw() {
                            viz.clear();
                            const ctx = viz.ctx;

                            const a = 3, b = 4;
                            var rows, cols;
                            if (blendVal === 0) { rows = a; cols = b; }
                            else { rows = b; cols = a; }

                            const dotR = 14;
                            const spacingX = 50;
                            const spacingY = 50;
                            const startX = 60;
                            const startY = 40;

                            // Title
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 16px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText(rows + ' \u00d7 ' + cols + ' = ' + (rows * cols), viz.width / 2, startY - 10);

                            // Draw dots
                            var colorA = viz.colors.blue, colorB = viz.colors.orange;
                            for (let r = 0; r < rows; r++) {
                                for (let c = 0; c < cols; c++) {
                                    const cx = startX + c * spacingX;
                                    const cy = startY + 20 + r * spacingY;
                                    var dotColor = (blendVal === 0) ? colorA : colorB;
                                    ctx.fillStyle = dotColor + '33';
                                    ctx.beginPath(); ctx.arc(cx, cy, dotR, 0, Math.PI * 2); ctx.fill();
                                    ctx.fillStyle = dotColor;
                                    ctx.beginPath(); ctx.arc(cx, cy, dotR - 3, 0, Math.PI * 2); ctx.fill();
                                }
                                // Row label
                                ctx.fillStyle = viz.colors.text;
                                ctx.font = '12px -apple-system,sans-serif';
                                ctx.textAlign = 'left';
                                ctx.fillText(cols + ' in row ' + (r + 1), startX + cols * spacingX + 10, startY + 20 + r * spacingY);
                            }

                            // Equation
                            var eqY = startY + rows * spacingY + 50;
                            ctx.fillStyle = viz.colors.teal;
                            ctx.font = 'bold 16px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText(a + ' \u00d7 ' + b + ' = ' + b + ' \u00d7 ' + a + ' = ' + (a * b), viz.width / 2, eqY);
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '13px -apple-system,sans-serif';
                            ctx.fillText('The order does not matter -- same total either way!', viz.width / 2, eqY + 24);
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Write \\(5 \\times 3\\) as a repeated addition, and find the answer.',
                    hint: '\\(5 \\times 3\\) means "5 groups of 3." Write 3 five times with plus signs between them.',
                    solution: '\\(5 \\times 3 = 3 + 3 + 3 + 3 + 3 = 15\\).'
                },
                {
                    question: 'If you have 4 pockets and each pocket has 6 coins, how many coins do you have? Write a multiplication to show your answer.',
                    hint: 'You have 4 groups of 6. Write it as \\(4 \\times 6\\).',
                    solution: '\\(4 \\times 6 = 6 + 6 + 6 + 6 = 24\\) coins.'
                },
                {
                    question: 'Is \\(7 \\times 1\\) equal to 7 or 1? What about \\(7 \\times 0\\)?',
                    hint: 'Think about what "1 group of 7" means and what "0 groups of 7" means.',
                    solution: '\\(7 \\times 1 = 7\\) (one group of 7 is just 7). \\(7 \\times 0 = 0\\) (zero groups of anything is nothing!).'
                }
            ]
        },

        // ========================================================
        // SECTION 2: Arrays & Area
        // ========================================================
        {
            id: 'ch03-sec02',
            title: 'Arrays & Area',
            content: `
                <h2>Arrays & Area</h2>

                <p>One of the best ways to <em>see</em> multiplication is to arrange objects in <strong>rows and columns</strong>. This arrangement is called an <strong>array</strong>. Think of egg cartons, chocolate boxes, or seats in a movie theater!</p>

                <div class="env-block intuition">
                    <div class="env-title">Discovery</div>
                    <div class="env-body">
                        <p>An array with <strong>3 rows</strong> and <strong>5 columns</strong> looks like a rectangle of dots. We call it a <strong>3-by-5 array</strong> and write:</p>
                        \\[3 \\times 5 = 15\\]
                        <p>Count the dots: each row has 5, and there are 3 rows, so \\(5 + 5 + 5 = 15\\). The array makes it easy to see!</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="ch03-array-viz"></div>

                <h3>From Arrays to Area</h3>

                <p>If you color in all the squares of a rectangular grid, you get a <strong>rectangle</strong>. The number of little squares inside is called the <strong>area</strong>.</p>

                <div class="env-block example">
                    <div class="env-title">Example</div>
                    <div class="env-body">
                        <p>A rectangle that is <strong>4 units wide</strong> and <strong>3 units tall</strong> contains:</p>
                        \\[4 \\times 3 = 12 \\text{ square units}\\]
                        <p>This is the <strong>area model</strong> of multiplication. The area of a rectangle = width \\(\\times\\) height!</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="ch03-area-viz"></div>

                <div class="env-block remark">
                    <div class="env-title">Think About It</div>
                    <div class="env-body">
                        <p>The array model and the area model are really the same idea! An array of dots becomes an area when you fill in the squares. Both show that multiplication counts things arranged in rows and columns.</p>
                    </div>
                </div>

                <h3>Reading Arrays</h3>

                <p>When we describe an array, we say <strong>"rows by columns."</strong> So a 2-by-6 array has 2 rows and 6 columns, which gives \\(2 \\times 6 = 12\\) total objects.</p>

                <div class="env-block example">
                    <div class="env-title">Try This!</div>
                    <div class="env-body">
                        <p>Draw arrays for these multiplications on a piece of paper:</p>
                        <ul>
                            <li>\\(2 \\times 7\\) &mdash; 2 rows, 7 columns</li>
                            <li>\\(4 \\times 4\\) &mdash; 4 rows, 4 columns (a square!)</li>
                            <li>\\(1 \\times 9\\) &mdash; 1 row, 9 columns</li>
                        </ul>
                        <p>What do you notice about the \\(4 \\times 4\\) array? It makes a perfect square shape!</p>
                    </div>
                </div>

                <div class="env-block warning">
                    <div class="env-title">Watch Out!</div>
                    <div class="env-body">
                        <p>Don't mix up "rows" and "columns." <strong>Rows</strong> go across (left to right, like rows of seats). <strong>Columns</strong> go up and down (like columns holding up a building).</p>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'ch03-array-viz',
                    title: 'Build Your Own Array',
                    description: 'Adjust the rows and columns to build different arrays. Count the dots!',
                    setup: function(container, controls) {
                        const viz = new VizEngine(container, { width: 560, height: 400, scale: 40, originX: 50, originY: 370 });
                        let rows = 3, cols = 5;

                        VizEngine.createSlider(controls, 'Rows', 1, 8, 3, 1, v => { rows = Math.round(v); draw(); });
                        VizEngine.createSlider(controls, 'Columns', 1, 8, 5, 1, v => { cols = Math.round(v); draw(); });

                        function draw() {
                            viz.clear();
                            const ctx = viz.ctx;
                            const total = rows * cols;
                            const dotR = 14;
                            const spacing = 42;
                            const startX = 70;
                            const startY = 55;

                            // Title
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 16px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText(rows + ' \u00d7 ' + cols + ' Array', viz.width / 2, 25);

                            var dotColors = [viz.colors.blue, viz.colors.orange, viz.colors.green, viz.colors.purple, viz.colors.teal, viz.colors.pink, viz.colors.yellow, viz.colors.red];
                            var count = 0;

                            for (let r = 0; r < rows; r++) {
                                for (let c = 0; c < cols; c++) {
                                    var cx = startX + c * spacing;
                                    var cy = startY + r * spacing;
                                    var clr = dotColors[r % dotColors.length];

                                    ctx.fillStyle = clr + '33';
                                    ctx.beginPath(); ctx.arc(cx, cy, dotR, 0, Math.PI * 2); ctx.fill();
                                    ctx.fillStyle = clr;
                                    ctx.beginPath(); ctx.arc(cx, cy, dotR - 4, 0, Math.PI * 2); ctx.fill();

                                    // Number inside
                                    count++;
                                    ctx.fillStyle = viz.colors.white;
                                    ctx.font = '10px -apple-system,sans-serif';
                                    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
                                    ctx.fillText(count, cx, cy);
                                }

                                // Row count label
                                ctx.fillStyle = viz.colors.text;
                                ctx.font = '12px -apple-system,sans-serif';
                                ctx.textAlign = 'left';
                                ctx.textBaseline = 'middle';
                                ctx.fillText('\u2190 ' + cols, startX + cols * spacing + 5, startY + r * spacing);
                            }

                            // Bottom label
                            var eqY = startY + rows * spacing + 20;
                            ctx.fillStyle = viz.colors.teal;
                            ctx.font = 'bold 18px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText(rows + ' rows \u00d7 ' + cols + ' columns = ' + total + ' total', viz.width / 2, eqY);
                        }

                        draw();
                        return viz;
                    }
                },
                {
                    id: 'ch03-area-viz',
                    title: 'Area Model: Multiplication as a Rectangle',
                    description: 'Drag the sliders to resize the rectangle. Each small square counts as 1 unit of area.',
                    setup: function(container, controls) {
                        const viz = new VizEngine(container, { width: 560, height: 400, scale: 40, originX: 60, originY: 360 });
                        let w = 4, h = 3;

                        VizEngine.createSlider(controls, 'Width', 1, 10, 4, 1, v => { w = Math.round(v); draw(); });
                        VizEngine.createSlider(controls, 'Height', 1, 8, 3, 1, v => { h = Math.round(v); draw(); });

                        function draw() {
                            viz.clear();
                            const ctx = viz.ctx;
                            const total = w * h;
                            var cellSize = Math.min(40, Math.min((viz.width - 120) / w, (viz.height - 120) / h));
                            var startX = 60;
                            var startY = 50;

                            // Title
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 16px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('Area = ' + w + ' \u00d7 ' + h + ' = ' + total + ' square units', viz.width / 2, 25);

                            // Draw filled squares
                            var count = 0;
                            for (let r = 0; r < h; r++) {
                                for (let c = 0; c < w; c++) {
                                    var x = startX + c * cellSize;
                                    var y = startY + r * cellSize;
                                    // Alternate coloring for checkerboard
                                    var shade = ((r + c) % 2 === 0) ? viz.colors.blue + '44' : viz.colors.teal + '44';
                                    ctx.fillStyle = shade;
                                    ctx.fillRect(x, y, cellSize, cellSize);

                                    // Border
                                    ctx.strokeStyle = viz.colors.blue + '88';
                                    ctx.lineWidth = 1;
                                    ctx.strokeRect(x, y, cellSize, cellSize);

                                    // Number
                                    count++;
                                    ctx.fillStyle = viz.colors.white;
                                    ctx.font = (cellSize > 30 ? '12' : '9') + 'px -apple-system,sans-serif';
                                    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
                                    ctx.fillText(count, x + cellSize / 2, y + cellSize / 2);
                                }
                            }

                            // Width label
                            ctx.fillStyle = viz.colors.orange;
                            ctx.font = 'bold 14px -apple-system,sans-serif';
                            ctx.textAlign = 'center'; ctx.textBaseline = 'top';
                            ctx.fillText(w + ' units wide', startX + w * cellSize / 2, startY + h * cellSize + 8);

                            // Height label
                            ctx.save();
                            ctx.translate(startX - 12, startY + h * cellSize / 2);
                            ctx.rotate(-Math.PI / 2);
                            ctx.fillStyle = viz.colors.green;
                            ctx.font = 'bold 14px -apple-system,sans-serif';
                            ctx.textAlign = 'center'; ctx.textBaseline = 'bottom';
                            ctx.fillText(h + ' units tall', 0, 0);
                            ctx.restore();
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'You see a rectangular arrangement of chairs with 5 rows and 6 chairs in each row. How many chairs are there? Write it as a multiplication.',
                    hint: 'Count the rows and columns. Rows \\(\\times\\) columns = total.',
                    solution: '\\(5 \\times 6 = 30\\) chairs. The array has 5 rows and 6 columns.'
                },
                {
                    question: 'A rectangle is 7 units wide and 3 units tall. What is its area?',
                    hint: 'Area = width \\(\\times\\) height. Plug in the numbers!',
                    solution: 'Area = \\(7 \\times 3 = 21\\) square units.'
                },
                {
                    question: 'If an array has 24 dots total and 4 rows, how many columns does it have?',
                    hint: 'If \\(4 \\times ? = 24\\), what number goes in the blank? Think: what number do you multiply 4 by to get 24?',
                    solution: '\\(4 \\times 6 = 24\\), so there are <strong>6 columns</strong>. You can also think of it as \\(24 \\div 4 = 6\\).'
                }
            ]
        },

        // ========================================================
        // SECTION 3: Times Tables Patterns
        // ========================================================
        {
            id: 'ch03-sec03',
            title: 'Times Tables Patterns',
            content: `
                <h2>Times Tables Patterns</h2>

                <p>The multiplication table is full of <strong>amazing patterns</strong> and shortcuts! Once you spot them, memorizing times tables becomes much easier. Let's explore some of the coolest ones.</p>

                <div class="viz-placeholder" data-viz="ch03-times-table-viz"></div>

                <h3>The 9s Trick: Digits Add to 9</h3>

                <div class="env-block intuition">
                    <div class="env-title">Cool Fact</div>
                    <div class="env-body">
                        <p>Look at the 9 times table:</p>
                        <p>\\(9 \\times 1 = 9\\) &rarr; digits: \\(0 + 9 = 9\\)</p>
                        <p>\\(9 \\times 2 = 18\\) &rarr; digits: \\(1 + 8 = 9\\)</p>
                        <p>\\(9 \\times 3 = 27\\) &rarr; digits: \\(2 + 7 = 9\\)</p>
                        <p>\\(9 \\times 4 = 36\\) &rarr; digits: \\(3 + 6 = 9\\)</p>
                        <p>\\(9 \\times 5 = 45\\) &rarr; digits: \\(4 + 5 = 9\\)</p>
                        <p>The digits of every answer <strong>always add up to 9</strong>! (For \\(9 \\times 1\\) through \\(9 \\times 10\\))</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example</div>
                    <div class="env-body">
                        <p><strong>The Finger Trick for 9s!</strong></p>
                        <p>Hold up all 10 fingers. To find \\(9 \\times 4\\):</p>
                        <ol>
                            <li>Put down your 4th finger (counting from the left).</li>
                            <li>Count fingers to the LEFT of the gap: <strong>3</strong></li>
                            <li>Count fingers to the RIGHT of the gap: <strong>6</strong></li>
                            <li>The answer is <strong>36</strong>!</li>
                        </ol>
                        <p>This works for \\(9 \\times 1\\) through \\(9 \\times 10\\).</p>
                    </div>
                </div>

                <h3>The 5s Pattern: Always 0 or 5</h3>

                <div class="env-block intuition">
                    <div class="env-title">Cool Fact</div>
                    <div class="env-body">
                        <p>Every multiple of 5 ends in either <strong>0</strong> or <strong>5</strong>:</p>
                        <p>\\(5, 10, 15, 20, 25, 30, 35, 40, 45, 50, \\ldots\\)</p>
                        <p>If you multiply 5 by an <strong>even</strong> number, the answer ends in <strong>0</strong>. If you multiply 5 by an <strong>odd</strong> number, the answer ends in <strong>5</strong>. Every time!</p>
                    </div>
                </div>

                <h3>Square Numbers: The Diagonal Stars</h3>

                <div class="env-block intuition">
                    <div class="env-title">Discovery</div>
                    <div class="env-body">
                        <p>Look at the <strong>diagonal</strong> of the multiplication table -- where a number is multiplied by itself:</p>
                        <p>\\(1 \\times 1 = 1, \\quad 2 \\times 2 = 4, \\quad 3 \\times 3 = 9, \\quad 4 \\times 4 = 16, \\quad 5 \\times 5 = 25, \\ldots\\)</p>
                        <p>These are called <strong>square numbers</strong> (or perfect squares) because they form perfect square shapes as arrays! A 3-by-3 grid has \\(9\\) dots -- a square number.</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="ch03-nines-trick-viz"></div>

                <h3>More Patterns to Explore</h3>

                <ul>
                    <li><strong>2s:</strong> Always even numbers (\\(2, 4, 6, 8, 10, 12, \\ldots\\))</li>
                    <li><strong>10s:</strong> Just add a zero! \\(10 \\times 7 = 70\\)</li>
                    <li><strong>Doubles:</strong> \\(4 \\times n\\) is double \\(2 \\times n\\). So if you know \\(2 \\times 6 = 12\\), then \\(4 \\times 6 = 24\\)!</li>
                </ul>

                <div class="viz-placeholder" data-viz="ch03-square-numbers-viz"></div>

                <div class="env-block remark">
                    <div class="env-title">Think About It</div>
                    <div class="env-body">
                        <p>The multiplication table is <strong>symmetric</strong> -- it looks the same if you flip it along the diagonal! That is because \\(a \\times b = b \\times a\\). So you really only need to learn about half the table. How many facts is that?</p>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'ch03-times-table-viz',
                    title: 'Interactive Multiplication Table',
                    description: 'Click a number to highlight its row and column. Look for patterns!',
                    setup: function(container, controls) {
                        const viz = new VizEngine(container, { width: 560, height: 480, scale: 40, originX: 0, originY: 0 });
                        let highlightN = 0;

                        VizEngine.createSlider(controls, 'Highlight', 0, 10, 0, 1, v => { highlightN = Math.round(v); draw(); });

                        function draw() {
                            viz.clear();
                            const ctx = viz.ctx;
                            const cellSize = 44;
                            var offsetX = 35;
                            var offsetY = 30;

                            // Header: multiplication symbol
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 14px -apple-system,sans-serif';
                            ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
                            ctx.fillText('\u00d7', offsetX + cellSize / 2, offsetY + cellSize / 2);

                            // Column headers
                            for (let c = 1; c <= 10; c++) {
                                var cx = offsetX + c * cellSize + cellSize / 2;
                                var isH = (c === highlightN);
                                ctx.fillStyle = isH ? viz.colors.orange : viz.colors.teal;
                                ctx.font = (isH ? 'bold ' : '') + '13px -apple-system,sans-serif';
                                ctx.fillText(c, cx, offsetY + cellSize / 2);
                            }

                            // Row headers
                            for (let r = 1; r <= 10; r++) {
                                var cy = offsetY + r * cellSize + cellSize / 2;
                                var isH = (r === highlightN);
                                ctx.fillStyle = isH ? viz.colors.orange : viz.colors.teal;
                                ctx.font = (isH ? 'bold ' : '') + '13px -apple-system,sans-serif';
                                ctx.fillText(r, offsetX + cellSize / 2, cy);
                            }

                            // Grid cells
                            for (let r = 1; r <= 10; r++) {
                                for (let c = 1; c <= 10; c++) {
                                    var x = offsetX + c * cellSize;
                                    var y = offsetY + r * cellSize;
                                    var product = r * c;
                                    var isHighlighted = (r === highlightN || c === highlightN);
                                    var isDiag = (r === c);

                                    // Cell background
                                    if (isHighlighted && highlightN > 0) {
                                        ctx.fillStyle = viz.colors.orange + '33';
                                    } else if (isDiag) {
                                        ctx.fillStyle = viz.colors.purple + '22';
                                    } else {
                                        ctx.fillStyle = viz.colors.bg;
                                    }
                                    ctx.fillRect(x + 1, y + 1, cellSize - 2, cellSize - 2);

                                    // Cell border
                                    ctx.strokeStyle = viz.colors.grid;
                                    ctx.lineWidth = 0.5;
                                    ctx.strokeRect(x, y, cellSize, cellSize);

                                    // Product text
                                    if (isHighlighted && highlightN > 0) {
                                        ctx.fillStyle = viz.colors.orange;
                                        ctx.font = 'bold 13px -apple-system,sans-serif';
                                    } else if (isDiag) {
                                        ctx.fillStyle = viz.colors.purple;
                                        ctx.font = 'bold 12px -apple-system,sans-serif';
                                    } else {
                                        ctx.fillStyle = viz.colors.text;
                                        ctx.font = '12px -apple-system,sans-serif';
                                    }
                                    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
                                    ctx.fillText(product, x + cellSize / 2, y + cellSize / 2);
                                }
                            }

                            // Legend
                            var legendY = offsetY + 11 * cellSize + 10;
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.fillStyle = viz.colors.purple;
                            ctx.fillText('\u25a0 Diagonal = Square numbers', offsetX + cellSize, legendY);
                            if (highlightN > 0) {
                                ctx.fillStyle = viz.colors.orange;
                                ctx.fillText('\u25a0 Highlighted: ' + highlightN + 's times table', offsetX + cellSize + 220, legendY);
                            }
                        }

                        draw();
                        return viz;
                    }
                },
                {
                    id: 'ch03-nines-trick-viz',
                    title: 'The 9s Finger Trick',
                    description: 'Use the slider to pick which 9s fact to show. Watch the finger go down!',
                    setup: function(container, controls) {
                        const viz = new VizEngine(container, { width: 560, height: 280, scale: 40, originX: 0, originY: 0 });
                        let nFactor = 4;

                        VizEngine.createSlider(controls, '9 \u00d7 ?', 1, 10, 4, 1, v => { nFactor = Math.round(v); draw(); });

                        function draw() {
                            viz.clear();
                            const ctx = viz.ctx;
                            var product = 9 * nFactor;
                            var tens = Math.floor(product / 10);
                            var ones = product % 10;

                            // Title
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 18px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('9 \u00d7 ' + nFactor + ' = ' + product, viz.width / 2, 30);

                            // Draw 10 fingers
                            var fingerW = 24;
                            var fingerH = 60;
                            var gap = 8;
                            var totalW = 10 * fingerW + 9 * gap;
                            var sx = (viz.width - totalW) / 2;
                            var sy = 65;

                            for (let i = 1; i <= 10; i++) {
                                var fx = sx + (i - 1) * (fingerW + gap);
                                var fy = sy;
                                var isDown = (i === nFactor);

                                if (isDown) {
                                    // Folded finger -- shorter, gray
                                    ctx.fillStyle = viz.colors.text + '44';
                                    ctx.beginPath();
                                    ctx.roundRect(fx, fy + fingerH - 20, fingerW, 20, 6);
                                    ctx.fill();
                                    ctx.strokeStyle = viz.colors.red;
                                    ctx.lineWidth = 2;
                                    ctx.beginPath();
                                    ctx.roundRect(fx, fy + fingerH - 20, fingerW, 20, 6);
                                    ctx.stroke();
                                } else {
                                    // Standing finger
                                    var clr = (i < nFactor) ? viz.colors.blue : viz.colors.orange;
                                    ctx.fillStyle = clr + '55';
                                    ctx.beginPath();
                                    ctx.roundRect(fx, fy, fingerW, fingerH, [8, 8, 4, 4]);
                                    ctx.fill();
                                    ctx.strokeStyle = clr;
                                    ctx.lineWidth = 2;
                                    ctx.beginPath();
                                    ctx.roundRect(fx, fy, fingerW, fingerH, [8, 8, 4, 4]);
                                    ctx.stroke();

                                    // Number on finger
                                    ctx.fillStyle = viz.colors.white;
                                    ctx.font = '12px -apple-system,sans-serif';
                                    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
                                    ctx.fillText(i, fx + fingerW / 2, fy + fingerH / 2);
                                }
                            }

                            // Left count
                            var leftCount = nFactor - 1;
                            var rightCount = 10 - nFactor;

                            ctx.fillStyle = viz.colors.blue;
                            ctx.font = 'bold 16px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            var leftMidX = sx + (leftCount / 2) * (fingerW + gap);
                            if (leftCount > 0) {
                                ctx.fillText(leftCount + ' left', leftMidX, sy + fingerH + 30);
                            }

                            ctx.fillStyle = viz.colors.orange;
                            var rightStartX = sx + nFactor * (fingerW + gap);
                            var rightMidX = rightStartX + (rightCount / 2) * (fingerW + gap);
                            if (rightCount > 0) {
                                ctx.fillText(rightCount + ' right', rightMidX, sy + fingerH + 30);
                            }

                            // Answer
                            ctx.fillStyle = viz.colors.teal;
                            ctx.font = 'bold 20px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('Answer: ' + leftCount + '' + rightCount + ' = ' + product, viz.width / 2, sy + fingerH + 65);

                            // Digit sum
                            ctx.fillStyle = viz.colors.purple;
                            ctx.font = '14px -apple-system,sans-serif';
                            ctx.fillText('Digit sum: ' + tens + ' + ' + ones + ' = ' + (tens + ones), viz.width / 2, sy + fingerH + 90);
                        }

                        draw();
                        return viz;
                    }
                },
                {
                    id: 'ch03-square-numbers-viz',
                    title: 'Square Numbers: Building Perfect Squares',
                    description: 'Watch how square numbers form actual squares! Drag the slider to pick a number.',
                    setup: function(container, controls) {
                        const viz = new VizEngine(container, { width: 560, height: 380, scale: 40, originX: 50, originY: 350 });
                        let n = 4;

                        VizEngine.createSlider(controls, 'n', 1, 8, 4, 1, v => { n = Math.round(v); draw(); });

                        function draw() {
                            viz.clear();
                            const ctx = viz.ctx;
                            var sq = n * n;
                            var dotR = Math.min(16, Math.floor(260 / n / 2));
                            var spacing = dotR * 2 + 6;
                            var startX = 80;
                            var startY = 60;

                            // Title
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 18px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText(n + ' \u00d7 ' + n + ' = ' + sq, viz.width / 2, 30);
                            ctx.fillStyle = viz.colors.purple;
                            ctx.font = '14px -apple-system,sans-serif';
                            ctx.fillText(n + '\u00b2 is a square number!', viz.width / 2, 50);

                            // Draw n x n grid of dots
                            for (let r = 0; r < n; r++) {
                                for (let c = 0; c < n; c++) {
                                    var cx = startX + c * spacing;
                                    var cy = startY + r * spacing;
                                    // Rainbow-ish coloring by row
                                    var hue = (r * 40 + c * 15) % 360;
                                    ctx.fillStyle = viz.colors.purple + '55';
                                    ctx.beginPath(); ctx.arc(cx, cy, dotR, 0, Math.PI * 2); ctx.fill();
                                    ctx.fillStyle = viz.colors.purple;
                                    ctx.beginPath(); ctx.arc(cx, cy, dotR - 3, 0, Math.PI * 2); ctx.fill();
                                }
                            }

                            // Draw border around the square
                            ctx.strokeStyle = viz.colors.yellow;
                            ctx.lineWidth = 2;
                            ctx.setLineDash([6, 4]);
                            ctx.strokeRect(startX - dotR - 4, startY - dotR - 4, n * spacing - spacing + dotR * 2 + 8, n * spacing - spacing + dotR * 2 + 8);
                            ctx.setLineDash([]);

                            // Side length labels
                            ctx.fillStyle = viz.colors.yellow;
                            ctx.font = 'bold 14px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText(n + ' dots', startX + (n - 1) * spacing / 2, startY + n * spacing + 10);
                            ctx.save();
                            ctx.translate(startX - dotR - 20, startY + (n - 1) * spacing / 2);
                            ctx.rotate(-Math.PI / 2);
                            ctx.fillText(n + ' dots', 0, 0);
                            ctx.restore();

                            // List of square numbers
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            var listX = startX + n * spacing + 40;
                            ctx.fillStyle = viz.colors.teal;
                            ctx.font = 'bold 13px -apple-system,sans-serif';
                            ctx.fillText('Square numbers:', listX, startY);
                            ctx.font = '12px -apple-system,sans-serif';
                            for (let i = 1; i <= 8; i++) {
                                ctx.fillStyle = (i === n) ? viz.colors.yellow : viz.colors.text;
                                ctx.fillText(i + '\u00b2 = ' + (i * i), listX, startY + 22 + (i - 1) * 20);
                            }
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Using the 9s digit trick, find \\(9 \\times 7\\). Check that the digits of your answer add up to 9.',
                    hint: 'Put down finger number 7. Count the fingers on each side.',
                    solution: '\\(9 \\times 7 = 63\\). Check: \\(6 + 3 = 9\\). It works!'
                },
                {
                    question: 'List all the multiples of 5 from 5 to 60. What pattern do you notice in the last digit?',
                    hint: 'The multiples of 5 are: \\(5, 10, 15, 20, 25, \\ldots\\) Keep going to 60.',
                    solution: '\\(5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60\\). The last digit alternates between <strong>5</strong> and <strong>0</strong>. Odd multipliers give 5, even multipliers give 0.'
                },
                {
                    question: 'The first four square numbers are \\(1, 4, 9, 16\\). What is the 6th square number? What is the 10th?',
                    hint: 'The \\(n\\)th square number is \\(n \\times n\\). So the 6th is \\(6 \\times 6\\).',
                    solution: 'The 6th square number is \\(6 \\times 6 = 36\\). The 10th square number is \\(10 \\times 10 = 100\\).'
                }
            ]
        },

        // ========================================================
        // SECTION 4: Multiplying Bigger Numbers
        // ========================================================
        {
            id: 'ch03-sec04',
            title: 'Multiplying Bigger Numbers',
            content: `
                <h2>Multiplying Bigger Numbers</h2>

                <p>What if you need to multiply a bigger number, like \\(13 \\times 4\\)? You don't have to memorize every possible multiplication. There is a clever trick: <strong>break the big number into friendly pieces!</strong></p>

                <h3>The Break-Apart Strategy</h3>

                <div class="env-block intuition">
                    <div class="env-title">Discovery</div>
                    <div class="env-body">
                        <p>To find \\(13 \\times 4\\), break 13 into parts you already know:</p>
                        \\[13 = 10 + 3\\]
                        <p>Now multiply each part by 4 separately:</p>
                        \\[13 \\times 4 = (10 + 3) \\times 4 = (10 \\times 4) + (3 \\times 4) = 40 + 12 = 52\\]
                        <p>This is called the <strong>distributive property</strong>. It lets you distribute (spread out) the multiplication over addition. It's like delivering mail to two houses instead of one big mansion!</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="ch03-distributive-viz"></div>

                <div class="env-block example">
                    <div class="env-title">Example</div>
                    <div class="env-body">
                        <p><strong>Find \\(16 \\times 5\\):</strong></p>
                        <p>Break 16 into \\(10 + 6\\):</p>
                        \\[16 \\times 5 = (10 \\times 5) + (6 \\times 5) = 50 + 30 = 80\\]
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example</div>
                    <div class="env-body">
                        <p><strong>Find \\(24 \\times 3\\):</strong></p>
                        <p>Break 24 into \\(20 + 4\\):</p>
                        \\[24 \\times 3 = (20 \\times 3) + (4 \\times 3) = 60 + 12 = 72\\]
                    </div>
                </div>

                <h3>The Area Model for Bigger Numbers</h3>

                <p>We can draw this break-apart strategy as a rectangle split into two pieces. This is the <strong>area model</strong> for multiplying bigger numbers.</p>

                <div class="viz-placeholder" data-viz="ch03-area-model-big-viz"></div>

                <div class="env-block remark">
                    <div class="env-title">Think About It</div>
                    <div class="env-body">
                        <p>You can break numbers apart in different ways! For \\(15 \\times 4\\), you could do:</p>
                        <ul>
                            <li>\\((10 + 5) \\times 4 = 40 + 20 = 60\\)</li>
                            <li>\\((8 + 7) \\times 4 = 32 + 28 = 60\\)</li>
                            <li>\\((15) \\times (2 + 2) = 30 + 30 = 60\\)</li>
                        </ul>
                        <p>All roads lead to the same answer! But breaking into <strong>tens and ones</strong> is usually the easiest.</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Try This!</div>
                    <div class="env-body">
                        <p>Use the break-apart strategy to solve these:</p>
                        <ul>
                            <li>\\(12 \\times 6 = (10 \\times 6) + (2 \\times 6) = ?\\)</li>
                            <li>\\(23 \\times 4 = (20 \\times 4) + (3 \\times 4) = ?\\)</li>
                            <li>\\(35 \\times 3 = (30 \\times 3) + (5 \\times 3) = ?\\)</li>
                        </ul>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="ch03-step-by-step-viz"></div>

                <div class="env-block warning">
                    <div class="env-title">Watch Out!</div>
                    <div class="env-body">
                        <p>When you break a number apart, make sure the pieces <strong>add back to the original number</strong>. For example, if you break 14 into 10 and 4, check: \\(10 + 4 = 14\\). If you accidentally use 10 and 5, you would be solving \\(15 \\times \\text{something}\\) instead!</p>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'ch03-distributive-viz',
                    title: 'Break-Apart Strategy: See the Distributive Property',
                    description: 'Adjust the big number and the multiplier. Watch how the rectangle splits into two friendly pieces!',
                    setup: function(container, controls) {
                        const viz = new VizEngine(container, { width: 560, height: 340, scale: 40, originX: 0, originY: 0 });
                        let bigNum = 13, multiplier = 4;

                        VizEngine.createSlider(controls, 'Number', 10, 29, 13, 1, v => { bigNum = Math.round(v); draw(); });
                        VizEngine.createSlider(controls, '\u00d7', 2, 9, 4, 1, v => { multiplier = Math.round(v); draw(); });

                        function draw() {
                            viz.clear();
                            const ctx = viz.ctx;
                            var tens = Math.floor(bigNum / 10) * 10;
                            var ones = bigNum - tens;
                            var product1 = tens * multiplier;
                            var product2 = ones * multiplier;
                            var total = bigNum * multiplier;

                            // Scale rectangles to fit
                            var maxW = 440;
                            var maxH = 200;
                            var unitW = Math.min(maxW / bigNum, 30);
                            var unitH = Math.min(maxH / multiplier, 40);
                            var sx = 60;
                            var sy = 60;

                            // Tens rectangle
                            ctx.fillStyle = viz.colors.blue + '44';
                            ctx.fillRect(sx, sy, tens * unitW, multiplier * unitH);
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 2;
                            ctx.strokeRect(sx, sy, tens * unitW, multiplier * unitH);

                            // Tens label
                            ctx.fillStyle = viz.colors.blue;
                            ctx.font = 'bold 16px -apple-system,sans-serif';
                            ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
                            ctx.fillText(tens + ' \u00d7 ' + multiplier, sx + tens * unitW / 2, sy + multiplier * unitH / 2 - 10);
                            ctx.fillText('= ' + product1, sx + tens * unitW / 2, sy + multiplier * unitH / 2 + 12);

                            // Ones rectangle
                            var ox = sx + tens * unitW;
                            ctx.fillStyle = viz.colors.orange + '44';
                            ctx.fillRect(ox, sy, ones * unitW, multiplier * unitH);
                            ctx.strokeStyle = viz.colors.orange;
                            ctx.lineWidth = 2;
                            ctx.strokeRect(ox, sy, ones * unitW, multiplier * unitH);

                            // Ones label
                            if (ones > 0) {
                                ctx.fillStyle = viz.colors.orange;
                                ctx.font = 'bold 14px -apple-system,sans-serif';
                                ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
                                ctx.fillText(ones + ' \u00d7 ' + multiplier, ox + ones * unitW / 2, sy + multiplier * unitH / 2 - 10);
                                ctx.fillText('= ' + product2, ox + ones * unitW / 2, sy + multiplier * unitH / 2 + 12);
                            }

                            // Width labels
                            ctx.fillStyle = viz.colors.blue;
                            ctx.font = 'bold 13px -apple-system,sans-serif';
                            ctx.textAlign = 'center'; ctx.textBaseline = 'bottom';
                            ctx.fillText(tens, sx + tens * unitW / 2, sy - 6);
                            if (ones > 0) {
                                ctx.fillStyle = viz.colors.orange;
                                ctx.fillText(ones, ox + ones * unitW / 2, sy - 6);
                            }

                            // Height label
                            ctx.save();
                            ctx.translate(sx - 14, sy + multiplier * unitH / 2);
                            ctx.rotate(-Math.PI / 2);
                            ctx.fillStyle = viz.colors.green;
                            ctx.font = 'bold 14px -apple-system,sans-serif';
                            ctx.textAlign = 'center'; ctx.textBaseline = 'bottom';
                            ctx.fillText(multiplier, 0, 0);
                            ctx.restore();

                            // Equation at bottom
                            var eqY = sy + multiplier * unitH + 35;
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 16px -apple-system,sans-serif';
                            ctx.textAlign = 'center'; ctx.textBaseline = 'top';
                            ctx.fillText(bigNum + ' \u00d7 ' + multiplier + ' = ' + product1 + ' + ' + product2 + ' = ' + total, viz.width / 2, eqY);

                            // Breakdown line
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '13px -apple-system,sans-serif';
                            ctx.fillText('(' + tens + ' + ' + ones + ') \u00d7 ' + multiplier + ' = (' + tens + ' \u00d7 ' + multiplier + ') + (' + ones + ' \u00d7 ' + multiplier + ')', viz.width / 2, eqY + 24);
                        }

                        draw();
                        return viz;
                    }
                },
                {
                    id: 'ch03-area-model-big-viz',
                    title: 'Area Model for 2-Digit Times 1-Digit',
                    description: 'Watch how the area model splits a big multiplication into smaller, easier ones.',
                    setup: function(container, controls) {
                        const viz = new VizEngine(container, { width: 560, height: 380, scale: 40, originX: 0, originY: 0 });
                        let bigNum = 24, small = 3;

                        VizEngine.createSlider(controls, 'Number', 11, 30, 24, 1, v => { bigNum = Math.round(v); draw(); });
                        VizEngine.createSlider(controls, '\u00d7', 2, 9, 3, 1, v => { small = Math.round(v); draw(); });

                        function draw() {
                            viz.clear();
                            const ctx = viz.ctx;
                            var tens = Math.floor(bigNum / 10) * 10;
                            var ones = bigNum - tens;

                            // Compute cell size to fit
                            var cellW = Math.min(16, Math.floor(420 / bigNum));
                            var cellH = Math.min(30, Math.floor(220 / small));
                            var sx = 70;
                            var sy = 50;

                            // Title
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 16px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText(bigNum + ' \u00d7 ' + small + ' = ?', viz.width / 2, 25);

                            // Draw grid with color-coded regions
                            for (let r = 0; r < small; r++) {
                                for (let c = 0; c < bigNum; c++) {
                                    var x = sx + c * cellW;
                                    var y = sy + r * cellH;
                                    var isTens = (c < tens);
                                    ctx.fillStyle = isTens ? (viz.colors.blue + '44') : (viz.colors.orange + '44');
                                    ctx.fillRect(x, y, cellW, cellH);
                                    ctx.strokeStyle = isTens ? (viz.colors.blue + '66') : (viz.colors.orange + '66');
                                    ctx.lineWidth = 0.5;
                                    ctx.strokeRect(x, y, cellW, cellH);
                                }
                            }

                            // Draw dividing line
                            ctx.strokeStyle = viz.colors.yellow;
                            ctx.lineWidth = 2;
                            ctx.setLineDash([5, 3]);
                            ctx.beginPath();
                            ctx.moveTo(sx + tens * cellW, sy);
                            ctx.lineTo(sx + tens * cellW, sy + small * cellH);
                            ctx.stroke();
                            ctx.setLineDash([]);

                            // Outer border
                            ctx.strokeStyle = viz.colors.white;
                            ctx.lineWidth = 2;
                            ctx.strokeRect(sx, sy, bigNum * cellW, small * cellH);

                            // Region labels
                            ctx.font = 'bold 14px -apple-system,sans-serif';
                            ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
                            ctx.fillStyle = viz.colors.blue;
                            ctx.fillText(tens + ' \u00d7 ' + small + ' = ' + (tens * small), sx + tens * cellW / 2, sy + small * cellH / 2);
                            if (ones > 0) {
                                ctx.fillStyle = viz.colors.orange;
                                ctx.fillText(ones + ' \u00d7 ' + small + ' = ' + (ones * small), sx + tens * cellW + ones * cellW / 2, sy + small * cellH / 2);
                            }

                            // Bottom width labels
                            var bottomY = sy + small * cellH + 12;
                            ctx.fillStyle = viz.colors.blue;
                            ctx.font = 'bold 13px -apple-system,sans-serif';
                            ctx.fillText(tens, sx + tens * cellW / 2, bottomY);
                            if (ones > 0) {
                                ctx.fillStyle = viz.colors.orange;
                                ctx.fillText(ones, sx + tens * cellW + ones * cellW / 2, bottomY);
                            }

                            // Height label
                            ctx.save();
                            ctx.translate(sx - 12, sy + small * cellH / 2);
                            ctx.rotate(-Math.PI / 2);
                            ctx.fillStyle = viz.colors.green;
                            ctx.font = 'bold 13px -apple-system,sans-serif';
                            ctx.textAlign = 'center'; ctx.textBaseline = 'bottom';
                            ctx.fillText(small, 0, 0);
                            ctx.restore();

                            // Answer
                            var total = bigNum * small;
                            var eqY = bottomY + 30;
                            ctx.fillStyle = viz.colors.teal;
                            ctx.font = 'bold 18px -apple-system,sans-serif';
                            ctx.textAlign = 'center'; ctx.textBaseline = 'top';
                            ctx.fillText((tens * small) + ' + ' + (ones * small) + ' = ' + total, viz.width / 2, eqY);
                        }

                        draw();
                        return viz;
                    }
                },
                {
                    id: 'ch03-step-by-step-viz',
                    title: 'Step-by-Step: Watch the Calculation Unfold',
                    description: 'See each step of breaking apart a multiplication problem.',
                    setup: function(container, controls) {
                        const viz = new VizEngine(container, { width: 560, height: 260, scale: 40, originX: 0, originY: 0 });
                        let bigNum = 17, small = 5, step = 0;

                        VizEngine.createSlider(controls, 'Number', 10, 29, 17, 1, v => { bigNum = Math.round(v); step = 0; draw(); });
                        VizEngine.createSlider(controls, '\u00d7', 2, 9, 5, 1, v => { small = Math.round(v); step = 0; draw(); });
                        VizEngine.createButton(controls, 'Next Step', () => { step = Math.min(step + 1, 4); draw(); });
                        VizEngine.createButton(controls, 'Reset', () => { step = 0; draw(); });

                        function draw() {
                            viz.clear();
                            const ctx = viz.ctx;
                            var tens = Math.floor(bigNum / 10) * 10;
                            var ones = bigNum - tens;
                            var p1 = tens * small;
                            var p2 = ones * small;
                            var total = bigNum * small;

                            var cx = viz.width / 2;
                            var y = 35;
                            var lineH = 40;

                            ctx.textAlign = 'center'; ctx.textBaseline = 'middle';

                            // Step 0: Show the problem
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 22px -apple-system,sans-serif';
                            ctx.fillText(bigNum + ' \u00d7 ' + small + ' = ?', cx, y);

                            if (step >= 1) {
                                y += lineH;
                                ctx.fillStyle = viz.colors.teal;
                                ctx.font = '16px -apple-system,sans-serif';
                                ctx.fillText('Step 1: Break ' + bigNum + ' into ' + tens + ' + ' + ones, cx, y);
                            }

                            if (step >= 2) {
                                y += lineH;
                                ctx.fillStyle = viz.colors.blue;
                                ctx.font = '16px -apple-system,sans-serif';
                                ctx.fillText('Step 2: ' + tens + ' \u00d7 ' + small + ' = ' + p1, cx, y);
                            }

                            if (step >= 3) {
                                y += lineH;
                                ctx.fillStyle = viz.colors.orange;
                                ctx.font = '16px -apple-system,sans-serif';
                                ctx.fillText('Step 3: ' + ones + ' \u00d7 ' + small + ' = ' + p2, cx, y);
                            }

                            if (step >= 4) {
                                y += lineH;
                                ctx.fillStyle = viz.colors.green;
                                ctx.font = 'bold 20px -apple-system,sans-serif';
                                ctx.fillText('Step 4: ' + p1 + ' + ' + p2 + ' = ' + total + '  \u2713', cx, y);
                            }

                            // Step indicator
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.textAlign = 'right';
                            ctx.fillText('Step ' + step + ' of 4', viz.width - 20, viz.height - 15);
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Use the break-apart strategy to solve \\(14 \\times 6\\). Show your steps.',
                    hint: 'Break 14 into 10 + 4. Multiply each piece by 6, then add the results.',
                    solution: '\\(14 \\times 6 = (10 \\times 6) + (4 \\times 6) = 60 + 24 = 84\\).'
                },
                {
                    question: 'Find \\(27 \\times 3\\) using the area model (break 27 into 20 + 7).',
                    hint: 'Draw a rectangle that is 27 units wide and 3 units tall. Split it into two parts: 20-wide and 7-wide.',
                    solution: '\\(27 \\times 3 = (20 \\times 3) + (7 \\times 3) = 60 + 21 = 81\\).'
                },
                {
                    question: 'Challenge: Can you use the break-apart strategy to solve \\(19 \\times 8\\)? Hint: \\(19 = 20 - 1\\). So \\(19 \\times 8 = (20 \\times 8) - (1 \\times 8)\\).',
                    hint: 'Instead of breaking 19 into 10 + 9, try thinking of it as 20 - 1. Then: \\(20 \\times 8 = 160\\) and \\(1 \\times 8 = 8\\). Subtract!',
                    solution: '\\(19 \\times 8 = (20 - 1) \\times 8 = (20 \\times 8) - (1 \\times 8) = 160 - 8 = 152\\). This trick works whenever a number is close to a round number!'
                }
            ]
        },

        // ========================================================
        // SECTION 5: Multiplication Everywhere
        // ========================================================
        {
            id: 'ch03-sec05',
            title: 'Multiplication Everywhere',
            content: `
                <h2>Multiplication Everywhere</h2>

                <p>Multiplication isn't just something you do in math class. It is <strong>everywhere</strong> in the real world! Once you start looking, you will see multiplication in all kinds of places.</p>

                <div class="env-block intuition">
                    <div class="env-title">Discovery</div>
                    <div class="env-body">
                        <p>Wherever things come in <strong>equal groups</strong>, multiplication is hiding! Think about:</p>
                        <ul>
                            <li>Rows of seats in a theater or airplane</li>
                            <li>Tiles on a floor or wall</li>
                            <li>Eggs in cartons (6 or 12 per carton)</li>
                            <li>Wheels on cars (4 per car)</li>
                            <li>Pages in identical notebooks</li>
                            <li>Coins in stacks or rolls</li>
                        </ul>
                    </div>
                </div>

                <h3>Real-World Problems</h3>

                <div class="env-block example">
                    <div class="env-title">Example</div>
                    <div class="env-body">
                        <p><strong>Problem:</strong> A movie theater has 8 rows of seats, with 12 seats in each row. How many seats are there in total?</p>
                        <p><strong>Solution:</strong> This is 8 groups of 12:</p>
                        \\[8 \\times 12 = 8 \\times (10 + 2) = 80 + 16 = 96 \\text{ seats}\\]
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example</div>
                    <div class="env-body">
                        <p><strong>Problem:</strong> A kitchen floor uses square tiles arranged in a 9-by-7 pattern. How many tiles cover the floor?</p>
                        <p><strong>Solution:</strong> Use the area model:</p>
                        \\[9 \\times 7 = 63 \\text{ tiles}\\]
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="ch03-real-world-viz"></div>

                <h3>Money and Multiplication</h3>

                <div class="env-block example">
                    <div class="env-title">Example</div>
                    <div class="env-body">
                        <p><strong>Problem:</strong> Pencils cost 3 dollars each. If you buy 7 pencils, how much do you spend?</p>
                        <p><strong>Solution:</strong> \\(7 \\times 3 = 21\\) dollars.</p>
                        <p><strong>Problem:</strong> A pack of stickers has 5 stickers. You buy 6 packs. How many stickers do you get?</p>
                        <p><strong>Solution:</strong> \\(6 \\times 5 = 30\\) stickers.</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="ch03-packing-viz"></div>

                <div class="env-block remark">
                    <div class="env-title">Think About It</div>
                    <div class="env-body">
                        <p>How do you know when a problem needs multiplication? Look for clue words like:</p>
                        <ul>
                            <li>"<em>each</em>" &mdash; "5 apples in <em>each</em> bag"</li>
                            <li>"<em>per</em>" &mdash; "3 stickers <em>per</em> page"</li>
                            <li>"<em>every</em>" &mdash; "4 legs on <em>every</em> chair"</li>
                            <li>"<em>groups of</em>" or "<em>sets of</em>"</li>
                            <li>"<em>rows</em>" and "<em>columns</em>"</li>
                        </ul>
                        <p>When you see equal groups, think multiplication!</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="ch03-word-problem-viz"></div>

                <div class="env-block warning">
                    <div class="env-title">Watch Out!</div>
                    <div class="env-body">
                        <p>Not every word problem is multiplication! If the groups are <strong>different sizes</strong>, you need addition instead. For example: "Emma has 3 red marbles and 5 blue marbles" is addition (\\(3 + 5\\)), not multiplication, because the groups are different colors with different counts.</p>
                        <p>Multiplication only works when the groups are all the <strong>same size</strong>.</p>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Cool Fact</div>
                    <div class="env-body">
                        <p>Did you know that computers use multiplication millions of times per second? Every image on your screen is a grid of tiny colored dots (pixels). A screen that is 1920 dots wide and 1080 dots tall has \\(1920 \\times 1080 = 2{,}073{,}600\\) pixels -- over 2 million! Multiplication helps us understand huge numbers.</p>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'ch03-real-world-viz',
                    title: 'Seats in a Theater',
                    description: 'Build a seating chart! Adjust the number of rows and seats per row.',
                    setup: function(container, controls) {
                        const viz = new VizEngine(container, { width: 560, height: 380, scale: 40, originX: 0, originY: 0 });
                        let rows = 6, seats = 8;

                        VizEngine.createSlider(controls, 'Rows', 2, 10, 6, 1, v => { rows = Math.round(v); draw(); });
                        VizEngine.createSlider(controls, 'Seats/row', 3, 12, 8, 1, v => { seats = Math.round(v); draw(); });

                        function draw() {
                            viz.clear();
                            const ctx = viz.ctx;
                            var total = rows * seats;

                            // Sizing
                            var seatW = Math.min(28, Math.floor((viz.width - 80) / seats));
                            var seatH = Math.min(24, Math.floor((viz.height - 120) / rows));
                            var sx = (viz.width - seats * seatW) / 2;
                            var sy = 55;

                            // Title - stage
                            ctx.fillStyle = viz.colors.yellow + '44';
                            ctx.fillRect(sx, sy - 30, seats * seatW, 20);
                            ctx.strokeStyle = viz.colors.yellow;
                            ctx.lineWidth = 1;
                            ctx.strokeRect(sx, sy - 30, seats * seatW, 20);
                            ctx.fillStyle = viz.colors.yellow;
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
                            ctx.fillText('SCREEN', sx + seats * seatW / 2, sy - 20);

                            // Draw seats
                            var seatColors = [viz.colors.blue, viz.colors.teal, viz.colors.green, viz.colors.purple, viz.colors.orange, viz.colors.pink, viz.colors.yellow, viz.colors.red, viz.colors.blue, viz.colors.teal];
                            for (let r = 0; r < rows; r++) {
                                var rowColor = seatColors[r % seatColors.length];
                                for (let c = 0; c < seats; c++) {
                                    var x = sx + c * seatW;
                                    var y = sy + r * seatH;

                                    // Seat shape (rounded rectangle)
                                    ctx.fillStyle = rowColor + '44';
                                    ctx.beginPath();
                                    ctx.roundRect(x + 2, y + 2, seatW - 4, seatH - 4, 4);
                                    ctx.fill();
                                    ctx.strokeStyle = rowColor;
                                    ctx.lineWidth = 1;
                                    ctx.beginPath();
                                    ctx.roundRect(x + 2, y + 2, seatW - 4, seatH - 4, 4);
                                    ctx.stroke();
                                }
                                // Row label
                                ctx.fillStyle = viz.colors.text;
                                ctx.font = '10px -apple-system,sans-serif';
                                ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
                                ctx.fillText('R' + (r + 1), sx + seats * seatW + 6, sy + r * seatH + seatH / 2);
                            }

                            // Bottom info
                            var infoY = sy + rows * seatH + 20;
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 16px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText(rows + ' rows \u00d7 ' + seats + ' seats = ' + total + ' total seats', viz.width / 2, infoY);

                            // Fun emoji-like text
                            ctx.fillStyle = viz.colors.teal;
                            ctx.font = '13px -apple-system,sans-serif';
                            ctx.fillText('That is a lot of people watching a movie!', viz.width / 2, infoY + 25);
                        }

                        draw();
                        return viz;
                    }
                },
                {
                    id: 'ch03-packing-viz',
                    title: 'Packing Items: Groups of Equal Size',
                    description: 'How many items in total? Adjust the number of packs and items per pack.',
                    setup: function(container, controls) {
                        const viz = new VizEngine(container, { width: 560, height: 320, scale: 40, originX: 0, originY: 0 });
                        let packs = 4, perPack = 6;

                        VizEngine.createSlider(controls, 'Packs', 1, 6, 4, 1, v => { packs = Math.round(v); draw(); });
                        VizEngine.createSlider(controls, 'Per pack', 2, 10, 6, 1, v => { perPack = Math.round(v); draw(); });

                        function draw() {
                            viz.clear();
                            const ctx = viz.ctx;
                            var total = packs * perPack;

                            var packW = Math.min(110, Math.floor((viz.width - 40) / packs));
                            var sx = (viz.width - packs * packW) / 2;
                            var sy = 40;

                            // Title
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 16px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText(packs + ' packs, ' + perPack + ' items each', viz.width / 2, 22);

                            var packColors = [viz.colors.blue, viz.colors.orange, viz.colors.green, viz.colors.purple, viz.colors.teal, viz.colors.pink];

                            for (let p = 0; p < packs; p++) {
                                var px = sx + p * packW;
                                var clr = packColors[p % packColors.length];

                                // Pack box
                                ctx.strokeStyle = clr;
                                ctx.lineWidth = 2;
                                ctx.setLineDash([5, 3]);
                                var boxH = Math.min(180, perPack * 22 + 30);
                                ctx.strokeRect(px + 4, sy, packW - 8, boxH);
                                ctx.setLineDash([]);

                                // Pack label
                                ctx.fillStyle = clr;
                                ctx.font = 'bold 11px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.fillText('Pack ' + (p + 1), px + packW / 2, sy + 14);

                                // Items inside pack
                                var itemR = Math.min(8, Math.floor((boxH - 40) / perPack / 2));
                                for (let i = 0; i < perPack; i++) {
                                    var ix = px + packW / 2;
                                    var iy = sy + 28 + i * (itemR * 2 + 4);
                                    ctx.fillStyle = clr + '55';
                                    ctx.beginPath(); ctx.arc(ix, iy, itemR, 0, Math.PI * 2); ctx.fill();
                                    ctx.fillStyle = clr;
                                    ctx.beginPath(); ctx.arc(ix, iy, itemR - 2, 0, Math.PI * 2); ctx.fill();
                                }
                            }

                            // Equation
                            var eqY = sy + Math.min(180, perPack * 22 + 30) + 25;
                            ctx.fillStyle = viz.colors.teal;
                            ctx.font = 'bold 18px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText(packs + ' \u00d7 ' + perPack + ' = ' + total + ' items!', viz.width / 2, eqY);
                        }

                        draw();
                        return viz;
                    }
                },
                {
                    id: 'ch03-word-problem-viz',
                    title: 'Spot the Multiplication!',
                    description: 'Read each scenario and see the multiplication it represents.',
                    setup: function(container, controls) {
                        const viz = new VizEngine(container, { width: 560, height: 280, scale: 40, originX: 0, originY: 0 });
                        let scenario = 0;

                        var scenarios = [
                            { text: 'A spider has 8 legs.\n3 spiders have how many legs?', a: 3, b: 8, unit: 'legs' },
                            { text: 'Each week has 7 days.\nHow many days in 4 weeks?', a: 4, b: 7, unit: 'days' },
                            { text: 'A car has 4 wheels.\nHow many wheels on 5 cars?', a: 5, b: 4, unit: 'wheels' },
                            { text: 'A hand has 5 fingers.\n6 people have how many fingers?', a: 6, b: 5, unit: 'fingers' },
                            { text: 'A box holds 12 crayons.\nHow many crayons in 3 boxes?', a: 3, b: 12, unit: 'crayons' }
                        ];

                        VizEngine.createButton(controls, 'Next Problem', () => { scenario = (scenario + 1) % scenarios.length; draw(); });

                        function draw() {
                            viz.clear();
                            const ctx = viz.ctx;
                            var s = scenarios[scenario];

                            // Problem text
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = '16px -apple-system,sans-serif';
                            ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
                            var lines = s.text.split('\n');
                            for (let i = 0; i < lines.length; i++) {
                                ctx.fillText(lines[i], viz.width / 2, 40 + i * 28);
                            }

                            // Visual representation: draw groups
                            var dotR = 8;
                            var groupW = Math.min(100, Math.floor((viz.width - 40) / s.a));
                            var startX = (viz.width - s.a * groupW) / 2;
                            var startY = 110;

                            var groupColors = [viz.colors.blue, viz.colors.orange, viz.colors.green, viz.colors.purple, viz.colors.teal, viz.colors.pink];
                            for (let g = 0; g < s.a; g++) {
                                var gx = startX + g * groupW + groupW / 2;
                                var clr = groupColors[g % groupColors.length];

                                // Draw small circles for each item in group
                                var cols = Math.min(s.b, 4);
                                var itemRows = Math.ceil(s.b / cols);
                                for (let i = 0; i < s.b; i++) {
                                    var col = i % cols;
                                    var row = Math.floor(i / cols);
                                    var ix = gx - (cols - 1) * (dotR + 3) / 2 + col * (dotR * 2 + 3);
                                    var iy = startY + row * (dotR * 2 + 3);
                                    ctx.fillStyle = clr;
                                    ctx.beginPath(); ctx.arc(ix, iy, dotR - 1, 0, Math.PI * 2); ctx.fill();
                                }

                                // Group label
                                ctx.fillStyle = viz.colors.text;
                                ctx.font = '10px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.fillText(s.b, gx, startY + itemRows * (dotR * 2 + 3) + 5);
                            }

                            // Equation
                            var eqY = 220;
                            ctx.fillStyle = viz.colors.teal;
                            ctx.font = 'bold 20px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText(s.a + ' \u00d7 ' + s.b + ' = ' + (s.a * s.b) + ' ' + s.unit, viz.width / 2, eqY);

                            // Problem counter
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'right';
                            ctx.fillText('Problem ' + (scenario + 1) + ' of ' + scenarios.length, viz.width - 15, viz.height - 10);
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'A parking lot has 5 rows of cars, with 9 cars in each row. How many cars are in the parking lot?',
                    hint: 'This is a real-world array! Rows \\(\\times\\) cars per row = total.',
                    solution: '\\(5 \\times 9 = 45\\) cars. You can use the break-apart method: \\(5 \\times 9 = 5 \\times (10 - 1) = 50 - 5 = 45\\).'
                },
                {
                    question: 'You want to buy 8 notebooks that cost 4 dollars each. How much money do you need?',
                    hint: 'Each notebook costs the same amount. So it is 8 groups of 4 dollars.',
                    solution: '\\(8 \\times 4 = 32\\) dollars.'
                },
                {
                    question: 'Challenge: A farmer plants apple trees in a rectangular orchard with 6 rows and 7 trees per row. Then he plants 3 more rows with 7 trees each. How many trees are there now?',
                    hint: 'First find the original number of trees (\\(6 \\times 7\\)), then find how many new trees he planted (\\(3 \\times 7\\)), and add them together. Can you also write this as a single multiplication?',
                    solution: 'Original: \\(6 \\times 7 = 42\\) trees. New: \\(3 \\times 7 = 21\\) trees. Total: \\(42 + 21 = 63\\) trees. Notice: \\((6 + 3) \\times 7 = 9 \\times 7 = 63\\). The distributive property works both ways!'
                }
            ]
        }
    ]
});
