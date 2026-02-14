window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch08',
    number: 8,
    title: 'Word Problems & Thinking',
    subtitle: 'Learn to read, understand, and solve word problems like a math detective!',
    sections: [
        // ============================================================
        // SECTION 1: Reading a Word Problem
        // ============================================================
        {
            id: 'ch08-sec01',
            title: 'Reading a Word Problem',
            content: `
                <h2>Reading a Word Problem</h2>

                <p>Word problems are like little puzzles written in sentences. The trick is learning how to pull the math out of the words! Many students feel nervous about word problems, but once you learn a simple strategy, they become fun to solve.</p>

                <p>Let's learn the <strong>CUBES</strong> strategy — five steps that turn any word problem into something you can solve:</p>

                <ol>
                    <li><strong style="color:var(--accent-blue);">C</strong> — <strong>Circle</strong> the numbers</li>
                    <li><strong style="color:var(--accent-green);">U</strong> — <strong>Underline</strong> the question</li>
                    <li><strong style="color:var(--accent-orange);">B</strong> — <strong>Box</strong> the key words</li>
                    <li><strong style="color:var(--accent-purple);">E</strong> — <strong>Evaluate</strong> — plan your steps</li>
                    <li><strong style="color:var(--accent-teal);">S</strong> — <strong>Solve</strong> and check!</li>
                </ol>

                <div class="viz-placeholder" data-viz="cubes-strategy"></div>

                <div class="env-block intuition">
                    <div class="env-title">Discovery</div>
                    <div class="env-body">
                        <p>Think of yourself as a <strong>math detective</strong>. The word problem is your mystery, the numbers are your clues, and the question is what you need to figure out. CUBES is your detective toolkit!</p>
                    </div>
                </div>

                <h3>Translating Words to Math</h3>

                <p>Certain words in a problem tell you which operation to use. Here are some common ones:</p>

                <ul>
                    <li><strong style="color:var(--accent-green);">Addition (+):</strong> <em>in all, altogether, total, combined, sum, plus, more, joined</em></li>
                    <li><strong style="color:var(--accent-red);">Subtraction (-):</strong> <em>left, remaining, difference, fewer, less than, take away, how many more</em></li>
                    <li><strong style="color:var(--accent-orange);">Multiplication (x):</strong> <em>times, each, every, groups of, rows of, twice, triple</em></li>
                    <li><strong style="color:var(--accent-purple);">Division (/):</strong> <em>split, shared equally, divided, per, each got, how many groups</em></li>
                </ul>

                <div class="viz-placeholder" data-viz="keyword-matcher"></div>

                <div class="env-block warning">
                    <div class="env-title">Watch Out!</div>
                    <div class="env-body">
                        <p>Key words are helpful hints, but they are not magic rules! The phrase "how many more" usually means subtraction, but always read the <strong>whole problem</strong> to be sure. Think about what is actually happening in the story.</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example</div>
                    <div class="env-body">
                        <p><em>"Mia has 12 stickers. Her friend gives her 8 more. How many stickers does Mia have in all?"</em></p>
                        <ul>
                            <li><strong>C</strong> — Circle: <strong>12</strong> and <strong>8</strong></li>
                            <li><strong>U</strong> — Underline: "How many stickers does Mia have in all?"</li>
                            <li><strong>B</strong> — Box: "gives her more" and "in all"</li>
                            <li><strong>E</strong> — Evaluate: She starts with some and gets more, so we add.</li>
                            <li><strong>S</strong> — Solve: \\(12 + 8 = 20\\) stickers. Check: does 20 make sense? Yes!</li>
                        </ul>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'cubes-strategy',
                    title: 'The CUBES Strategy',
                    description: 'Click each step to see how CUBES works on a sample word problem.',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { width: 700, height: 380, scale: 1, originX: 0, originY: 0 });
                        var ctx = viz.ctx;
                        var activeStep = -1;

                        var steps = [
                            { letter: 'C', label: 'Circle numbers', color: viz.colors.blue },
                            { letter: 'U', label: 'Underline question', color: viz.colors.green },
                            { letter: 'B', label: 'Box key words', color: viz.colors.orange },
                            { letter: 'E', label: 'Evaluate steps', color: viz.colors.purple },
                            { letter: 'S', label: 'Solve & check', color: viz.colors.teal }
                        ];

                        for (var b = 0; b < steps.length; b++) {
                            (function(idx) {
                                VizEngine.createButton(controls, steps[idx].letter + ' - ' + steps[idx].label, function() {
                                    activeStep = idx;
                                    draw();
                                });
                            })(b);
                        }

                        function draw() {
                            viz.clear();

                            // Problem text
                            var problem = 'Sam picked 15 apples. He gave 6 to his sister.';
                            var question = 'How many apples does Sam have left?';

                            ctx.fillStyle = viz.colors.white;
                            ctx.font = '18px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'middle';
                            ctx.fillText(problem, 350, 40);
                            ctx.fillText(question, 350, 70);

                            // Step C: circle numbers
                            if (activeStep >= 0) {
                                ctx.strokeStyle = viz.colors.blue;
                                ctx.lineWidth = 3;
                                // Circle "15"
                                ctx.beginPath();
                                ctx.ellipse(248, 40, 22, 16, 0, 0, Math.PI * 2);
                                ctx.stroke();
                                // Circle "6"
                                ctx.beginPath();
                                ctx.ellipse(369, 40, 14, 16, 0, 0, Math.PI * 2);
                                ctx.stroke();
                                ctx.fillStyle = viz.colors.blue;
                                ctx.font = 'bold 13px -apple-system,sans-serif';
                                ctx.textAlign = 'left';
                                ctx.fillText('C: Circle the numbers!', 30, 110);
                            }

                            // Step U: underline question
                            if (activeStep >= 1) {
                                ctx.strokeStyle = viz.colors.green;
                                ctx.lineWidth = 3;
                                ctx.beginPath();
                                ctx.moveTo(160, 82);
                                ctx.lineTo(540, 82);
                                ctx.stroke();
                                ctx.fillStyle = viz.colors.green;
                                ctx.font = 'bold 13px -apple-system,sans-serif';
                                ctx.textAlign = 'left';
                                ctx.fillText('U: Underline the question!', 30, 130);
                            }

                            // Step B: box key words
                            if (activeStep >= 2) {
                                ctx.strokeStyle = viz.colors.orange;
                                ctx.lineWidth = 2.5;
                                // Box "gave"
                                ctx.strokeRect(291, 26, 46, 28);
                                // Box "left"
                                ctx.strokeRect(487, 56, 40, 28);
                                ctx.fillStyle = viz.colors.orange;
                                ctx.font = 'bold 13px -apple-system,sans-serif';
                                ctx.textAlign = 'left';
                                ctx.fillText('B: Box key words: "gave" and "left"', 30, 150);
                            }

                            // Step E: evaluate
                            if (activeStep >= 3) {
                                ctx.fillStyle = viz.colors.purple;
                                ctx.font = 'bold 13px -apple-system,sans-serif';
                                ctx.textAlign = 'left';
                                ctx.fillText('E: "gave" means he lost some. "left" means we subtract.', 30, 170);
                                ctx.fillText('   Plan: 15 - 6 = ?', 30, 190);
                            }

                            // Step S: solve
                            if (activeStep >= 4) {
                                ctx.fillStyle = viz.colors.teal;
                                ctx.font = 'bold 13px -apple-system,sans-serif';
                                ctx.textAlign = 'left';
                                ctx.fillText('S: 15 - 6 = 9 apples!', 30, 210);
                                ctx.fillText('   Check: 9 + 6 = 15. Correct!', 30, 230);

                                // Big answer
                                ctx.fillStyle = viz.colors.teal;
                                ctx.font = 'bold 42px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.fillText('9 apples', 350, 310);
                            }

                            // CUBES letters at the bottom
                            var boxY = 340;
                            for (var i = 0; i < steps.length; i++) {
                                var bx = 140 + i * 95;
                                var isActive = (i <= activeStep);
                                ctx.fillStyle = isActive ? steps[i].color + '44' : '#1a1a40';
                                ctx.fillRect(bx - 30, boxY, 60, 32);
                                ctx.strokeStyle = isActive ? steps[i].color : '#30363d';
                                ctx.lineWidth = 2;
                                ctx.strokeRect(bx - 30, boxY, 60, 32);
                                ctx.fillStyle = isActive ? steps[i].color : viz.colors.text;
                                ctx.font = 'bold 18px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.textBaseline = 'middle';
                                ctx.fillText(steps[i].letter, bx, boxY + 16);
                            }
                        }

                        draw();
                    }
                },
                {
                    id: 'keyword-matcher',
                    title: 'Key Word Spotter',
                    description: 'Click an operation to see which key words signal it.',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { width: 700, height: 300, scale: 1, originX: 0, originY: 0 });
                        var ctx = viz.ctx;
                        var selected = 0;

                        var ops = [
                            { name: 'Addition (+)', color: viz.colors.green, words: ['in all', 'altogether', 'total', 'combined', 'sum', 'plus', 'more', 'joined', 'increased'] },
                            { name: 'Subtraction (-)', color: viz.colors.red, words: ['left', 'remaining', 'difference', 'fewer', 'less than', 'take away', 'how many more'] },
                            { name: 'Multiplication (x)', color: viz.colors.orange, words: ['times', 'each', 'every', 'groups of', 'rows of', 'twice', 'triple', 'double'] },
                            { name: 'Division (\u00f7)', color: viz.colors.purple, words: ['split', 'shared equally', 'divided', 'per', 'each got', 'how many groups'] }
                        ];

                        for (var b = 0; b < ops.length; b++) {
                            (function(idx) {
                                VizEngine.createButton(controls, ops[idx].name, function() {
                                    selected = idx;
                                    draw();
                                });
                            })(b);
                        }

                        function draw() {
                            viz.clear();
                            var op = ops[selected];

                            // Title
                            ctx.fillStyle = op.color;
                            ctx.font = 'bold 22px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'middle';
                            ctx.fillText(op.name, 350, 35);

                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '14px -apple-system,sans-serif';
                            ctx.fillText('Key words that often signal this operation:', 350, 65);

                            // Draw words in bubbles
                            var words = op.words;
                            var startY = 100;
                            var col = 0;
                            var row = 0;
                            var maxCols = 3;
                            var colW = 210;
                            var rowH = 48;
                            var baseX = 350 - (Math.min(words.length, maxCols) * colW) / 2 + colW / 2;

                            for (var w = 0; w < words.length; w++) {
                                col = w % maxCols;
                                row = Math.floor(w / maxCols);
                                var wx = baseX + col * colW;
                                var wy = startY + row * rowH;

                                // Bubble
                                var tw = ctx.measureText(words[w]).width;
                                var bw = Math.max(tw + 30, 80);
                                ctx.fillStyle = op.color + '22';
                                ctx.beginPath();
                                ctx.roundRect(wx - bw / 2, wy - 15, bw, 32, 16);
                                ctx.fill();
                                ctx.strokeStyle = op.color;
                                ctx.lineWidth = 2;
                                ctx.beginPath();
                                ctx.roundRect(wx - bw / 2, wy - 15, bw, 32, 16);
                                ctx.stroke();

                                ctx.fillStyle = op.color;
                                ctx.font = 'bold 15px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.textBaseline = 'middle';
                                ctx.fillText(words[w], wx, wy + 1);
                            }
                        }

                        draw();
                    }
                }
            ],
            exercises: [
                {
                    question: 'Use CUBES on this problem: "A store had 24 toy cars. They sold 9. How many toy cars are left?"',
                    hint: 'C: Circle 24 and 9. U: Underline "How many toy cars are left?" B: Box "sold" and "left."',
                    solution: 'C: 24 and 9. U: "How many toy cars are left?" B: "sold" and "left." E: Selling means losing some, so subtract. S: \\(24 - 9 = 15\\) toy cars are left. Check: \\(15 + 9 = 24\\). Correct!'
                },
                {
                    question: 'What operation do these key words suggest? (a) "altogether"  (b) "shared equally"  (c) "how many more"',
                    hint: '"Altogether" means combining. "Shared equally" means splitting up. "How many more" means finding a difference.',
                    solution: '(a) <strong>Addition</strong> — "altogether" means combining groups. (b) <strong>Division</strong> — "shared equally" means splitting into equal parts. (c) <strong>Subtraction</strong> — "how many more" means finding the difference between two amounts.'
                },
                {
                    question: 'Write a number sentence for: "There are 5 rows of chairs with 8 chairs in each row. How many chairs are there in all?"',
                    hint: '"Rows of" and "each" are multiplication key words.',
                    solution: 'The number sentence is \\(5 \\times 8 = 40\\). There are 40 chairs in all. The words "rows of" and "each" tell us to multiply.'
                }
            ]
        },

        // ============================================================
        // SECTION 2: Addition & Subtraction Problems
        // ============================================================
        {
            id: 'ch08-sec02',
            title: 'Addition & Subtraction Problems',
            content: `
                <h2>Addition & Subtraction Problems</h2>

                <p>Addition and subtraction word problems come in four main types. Knowing which type you're looking at makes it much easier to set up the math!</p>

                <h3>The Four Types</h3>

                <ol>
                    <li><strong style="color:var(--accent-green);">Joining</strong> — starting with some, then adding more. <em>"Ava had 14 marbles. She found 9 more."</em></li>
                    <li><strong style="color:var(--accent-red);">Separating</strong> — starting with some, then taking away. <em>"Ben had 20 crayons. He gave 7 away."</em></li>
                    <li><strong style="color:var(--accent-blue);">Comparing</strong> — finding the difference between two amounts. <em>"Emma has 15 books. Jake has 8. How many more does Emma have?"</em></li>
                    <li><strong style="color:var(--accent-orange);">Part-Part-Whole</strong> — two parts make up a whole. <em>"There are 6 red apples and 11 green apples. How many apples in all?"</em></li>
                </ol>

                <div class="viz-placeholder" data-viz="problem-type-sorter"></div>

                <div class="env-block intuition">
                    <div class="env-title">Discovery</div>
                    <div class="env-body">
                        <p>A <strong>bar model</strong> (also called a <strong>tape diagram</strong>) is a rectangle that represents a number. You can split it into parts or compare two bars side by side. It is one of the most powerful tools for understanding word problems!</p>
                    </div>
                </div>

                <h3>Bar Models in Action</h3>

                <p>Let's see how bar models help us picture each type of problem:</p>

                <div class="env-block example">
                    <div class="env-title">Example</div>
                    <div class="env-body">
                        <p><strong>Joining:</strong> "Maria had 18 stickers. Her mom gave her 7 more. How many does she have now?"</p>
                        <p>Bar model: \\([\\;18\\;]\\;[\\;7\\;]\\) = \\(?\\) total</p>
                        <p>\\(18 + 7 = 25\\) stickers.</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="bar-model-builder"></div>

                <div class="env-block example">
                    <div class="env-title">Try This!</div>
                    <div class="env-body">
                        <p><strong>Comparing:</strong> "Lily scored 23 points. Tom scored 15 points. How many more points did Lily score than Tom?"</p>
                        <p>Draw two bars, one for Lily (23) and one for Tom (15). The gap between them is the answer: \\(23 - 15 = 8\\) more points.</p>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Think About It</div>
                    <div class="env-body">
                        <p>In a <strong>comparison</strong> problem, you always subtract to find the difference, even though the problem might say "how many more" or "how many fewer." The bigger number minus the smaller number gives you the answer.</p>
                    </div>
                </div>

                <div class="env-block warning">
                    <div class="env-title">Watch Out!</div>
                    <div class="env-body">
                        <p>Sometimes a problem looks like subtraction but is really addition! For example: "Leo had some cards. He got 5 more and now has 17. How many did he start with?" Even though we know the total, we need to work backward: \\(17 - 5 = 12\\).</p>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'problem-type-sorter',
                    title: 'Four Types of Addition & Subtraction Problems',
                    description: 'Click each type to see an example and its bar model.',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { width: 700, height: 350, scale: 1, originX: 0, originY: 0 });
                        var ctx = viz.ctx;
                        var selected = 0;

                        var types = [
                            {
                                name: 'Joining', color: viz.colors.green,
                                problem: 'Ava had 14 marbles. She found 9 more. How many now?',
                                partA: 14, partB: 9, op: '+', answer: 23,
                                barLabel: ['Start: 14', 'Added: 9', 'Total: 23']
                            },
                            {
                                name: 'Separating', color: viz.colors.red,
                                problem: 'Ben had 20 crayons. He gave 7 away. How many left?',
                                partA: 20, partB: 7, op: '-', answer: 13,
                                barLabel: ['Had: 20', 'Gave away: 7', 'Left: 13']
                            },
                            {
                                name: 'Comparing', color: viz.colors.blue,
                                problem: 'Emma has 15 books. Jake has 8. How many more does Emma have?',
                                partA: 15, partB: 8, op: '-', answer: 7,
                                barLabel: ['Emma: 15', 'Jake: 8', 'Difference: 7']
                            },
                            {
                                name: 'Part-Part-Whole', color: viz.colors.orange,
                                problem: '6 red apples and 11 green apples. How many in all?',
                                partA: 6, partB: 11, op: '+', answer: 17,
                                barLabel: ['Part: 6', 'Part: 11', 'Whole: 17']
                            }
                        ];

                        for (var b = 0; b < types.length; b++) {
                            (function(idx) {
                                VizEngine.createButton(controls, types[idx].name, function() {
                                    selected = idx;
                                    draw();
                                });
                            })(b);
                        }

                        function draw() {
                            viz.clear();
                            var t = types[selected];

                            // Title
                            ctx.fillStyle = t.color;
                            ctx.font = 'bold 22px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'middle';
                            ctx.fillText(t.name + ' Problem', 350, 30);

                            // Problem text
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = '15px -apple-system,sans-serif';
                            ctx.fillText('"' + t.problem + '"', 350, 65);

                            // Bar model
                            var barY = 120;
                            var barH = 50;
                            var maxVal = Math.max(t.partA, t.partB, t.answer);
                            var barScale = 400 / maxVal;
                            var barLeft = 150;

                            if (selected === 2) {
                                // Comparing: two bars side by side
                                var barA = t.partA * barScale;
                                var barB = t.partB * barScale;

                                // Bar A (bigger)
                                ctx.fillStyle = t.color + '44';
                                ctx.fillRect(barLeft, barY, barA, barH);
                                ctx.strokeStyle = t.color;
                                ctx.lineWidth = 2;
                                ctx.strokeRect(barLeft, barY, barA, barH);

                                ctx.fillStyle = viz.colors.white;
                                ctx.font = 'bold 16px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.fillText(t.barLabel[0], barLeft + barA / 2, barY + barH / 2);

                                // Bar B (smaller)
                                ctx.fillStyle = viz.colors.teal + '44';
                                ctx.fillRect(barLeft, barY + barH + 20, barB, barH);
                                ctx.strokeStyle = viz.colors.teal;
                                ctx.lineWidth = 2;
                                ctx.strokeRect(barLeft, barY + barH + 20, barB, barH);

                                ctx.fillStyle = viz.colors.white;
                                ctx.fillText(t.barLabel[1], barLeft + barB / 2, barY + barH + 20 + barH / 2);

                                // Difference bracket
                                var diffLeft = barLeft + barB;
                                var diffWidth = barA - barB;
                                ctx.strokeStyle = viz.colors.yellow;
                                ctx.lineWidth = 2;
                                ctx.setLineDash([4, 4]);
                                ctx.strokeRect(diffLeft, barY, diffWidth, barH);
                                ctx.setLineDash([]);
                                ctx.fillStyle = viz.colors.yellow;
                                ctx.font = 'bold 14px -apple-system,sans-serif';
                                ctx.fillText('? = ' + t.answer, diffLeft + diffWidth / 2, barY + barH + 15);
                            } else if (selected === 1) {
                                // Separating: whole bar with part removed
                                var wholeW = t.partA * barScale;
                                var removeW = t.partB * barScale;
                                var keepW = wholeW - removeW;

                                // Whole bar
                                ctx.fillStyle = t.color + '22';
                                ctx.fillRect(barLeft, barY, wholeW, barH);
                                ctx.strokeStyle = t.color;
                                ctx.lineWidth = 2;
                                ctx.strokeRect(barLeft, barY, wholeW, barH);

                                // Kept part
                                ctx.fillStyle = viz.colors.green + '44';
                                ctx.fillRect(barLeft, barY, keepW, barH);
                                ctx.strokeStyle = viz.colors.green;
                                ctx.strokeRect(barLeft, barY, keepW, barH);

                                // Removed part
                                ctx.fillStyle = viz.colors.red + '33';
                                ctx.fillRect(barLeft + keepW, barY, removeW, barH);

                                // Labels
                                ctx.fillStyle = viz.colors.white;
                                ctx.font = 'bold 14px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.fillText('Left: ' + t.answer, barLeft + keepW / 2, barY + barH / 2);
                                ctx.fillStyle = viz.colors.red;
                                ctx.fillText('Gave: ' + t.partB, barLeft + keepW + removeW / 2, barY + barH / 2);

                                // Total label
                                ctx.fillStyle = viz.colors.white;
                                ctx.font = '14px -apple-system,sans-serif';
                                ctx.fillText('Total: ' + t.partA, barLeft + wholeW / 2, barY - 14);
                            } else {
                                // Joining / Part-Part-Whole: two parts side by side
                                var wA = t.partA * barScale;
                                var wB = t.partB * barScale;

                                ctx.fillStyle = t.color + '44';
                                ctx.fillRect(barLeft, barY, wA, barH);
                                ctx.strokeStyle = t.color;
                                ctx.lineWidth = 2;
                                ctx.strokeRect(barLeft, barY, wA, barH);

                                ctx.fillStyle = viz.colors.teal + '44';
                                ctx.fillRect(barLeft + wA, barY, wB, barH);
                                ctx.strokeStyle = viz.colors.teal;
                                ctx.strokeRect(barLeft + wA, barY, wB, barH);

                                // Labels
                                ctx.fillStyle = viz.colors.white;
                                ctx.font = 'bold 14px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.fillText(t.partA, barLeft + wA / 2, barY + barH / 2);
                                ctx.fillText(t.partB, barLeft + wA + wB / 2, barY + barH / 2);

                                // Total brace
                                ctx.strokeStyle = viz.colors.yellow;
                                ctx.lineWidth = 2;
                                ctx.beginPath();
                                ctx.moveTo(barLeft, barY + barH + 10);
                                ctx.lineTo(barLeft, barY + barH + 20);
                                ctx.lineTo(barLeft + wA + wB, barY + barH + 20);
                                ctx.lineTo(barLeft + wA + wB, barY + barH + 10);
                                ctx.stroke();

                                ctx.fillStyle = viz.colors.yellow;
                                ctx.font = 'bold 16px -apple-system,sans-serif';
                                ctx.fillText('Total = ' + t.answer, barLeft + (wA + wB) / 2, barY + barH + 40);
                            }

                            // Number sentence
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 24px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            if (selected === 1) {
                                ctx.fillText(t.partA + ' ' + t.op + ' ' + t.partB + ' = ' + t.answer, 350, 300);
                            } else if (selected === 2) {
                                ctx.fillText(t.partA + ' ' + t.op + ' ' + t.partB + ' = ' + t.answer, 350, 300);
                            } else {
                                ctx.fillText(t.partA + ' ' + t.op + ' ' + t.partB + ' = ' + t.answer, 350, 300);
                            }
                        }

                        draw();
                    }
                },
                {
                    id: 'bar-model-builder',
                    title: 'Build Your Own Bar Model',
                    description: 'Set two numbers and choose an operation. Watch the bar model update!',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { width: 700, height: 300, scale: 1, originX: 0, originY: 0 });
                        var ctx = viz.ctx;
                        var numA = 18;
                        var numB = 7;
                        var mode = 'add';

                        VizEngine.createSlider(controls, 'Part A', 1, 50, 18, 1, function(v) { numA = Math.round(v); draw(); });
                        VizEngine.createSlider(controls, 'Part B', 1, 50, 7, 1, function(v) { numB = Math.round(v); draw(); });
                        VizEngine.createButton(controls, 'Add', function() { mode = 'add'; draw(); });
                        VizEngine.createButton(controls, 'Subtract', function() { mode = 'sub'; draw(); });
                        VizEngine.createButton(controls, 'Compare', function() { mode = 'cmp'; draw(); });

                        function draw() {
                            viz.clear();
                            var maxVal = Math.max(numA, numB, numA + numB);
                            var barScale = 450 / maxVal;
                            var barLeft = 100;
                            var barH = 50;

                            if (mode === 'add') {
                                var barY = 60;
                                var wA = numA * barScale;
                                var wB = numB * barScale;

                                ctx.fillStyle = viz.colors.green + '44';
                                ctx.fillRect(barLeft, barY, wA, barH);
                                ctx.strokeStyle = viz.colors.green;
                                ctx.lineWidth = 2;
                                ctx.strokeRect(barLeft, barY, wA, barH);

                                ctx.fillStyle = viz.colors.blue + '44';
                                ctx.fillRect(barLeft + wA, barY, wB, barH);
                                ctx.strokeStyle = viz.colors.blue;
                                ctx.strokeRect(barLeft + wA, barY, wB, barH);

                                ctx.fillStyle = viz.colors.white;
                                ctx.font = 'bold 18px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.textBaseline = 'middle';
                                ctx.fillText(numA, barLeft + wA / 2, barY + barH / 2);
                                ctx.fillText(numB, barLeft + wA + wB / 2, barY + barH / 2);

                                // Total
                                var total = numA + numB;
                                ctx.fillStyle = viz.colors.yellow;
                                ctx.font = 'bold 14px -apple-system,sans-serif';
                                ctx.fillText('Total = ' + total, barLeft + (wA + wB) / 2, barY + barH + 25);

                                ctx.fillStyle = viz.colors.white;
                                ctx.font = 'bold 28px -apple-system,sans-serif';
                                ctx.fillText(numA + ' + ' + numB + ' = ' + total, 350, 220);

                                ctx.fillStyle = viz.colors.green;
                                ctx.font = 'bold 16px -apple-system,sans-serif';
                                ctx.fillText('Joining / Part-Part-Whole', 350, 25);
                            } else if (mode === 'sub') {
                                var big = Math.max(numA, numB);
                                var small = Math.min(numA, numB);
                                var barY = 60;
                                var wBig = big * barScale;
                                var wSmall = small * barScale;
                                var wKeep = (big - small) * barScale;

                                ctx.fillStyle = viz.colors.teal + '44';
                                ctx.fillRect(barLeft, barY, wKeep, barH);
                                ctx.strokeStyle = viz.colors.teal;
                                ctx.lineWidth = 2;
                                ctx.strokeRect(barLeft, barY, wKeep, barH);

                                ctx.fillStyle = viz.colors.red + '33';
                                ctx.fillRect(barLeft + wKeep, barY, wSmall, barH);
                                ctx.strokeStyle = viz.colors.red;
                                ctx.strokeRect(barLeft + wKeep, barY, wSmall, barH);

                                ctx.fillStyle = viz.colors.white;
                                ctx.font = 'bold 16px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.textBaseline = 'middle';
                                ctx.fillText(big - small, barLeft + wKeep / 2, barY + barH / 2);
                                ctx.fillStyle = viz.colors.red;
                                ctx.fillText(small, barLeft + wKeep + wSmall / 2, barY + barH / 2);

                                ctx.fillStyle = viz.colors.white;
                                ctx.font = '14px -apple-system,sans-serif';
                                ctx.fillText('Started with: ' + big, barLeft + wBig / 2, barY - 14);

                                ctx.fillStyle = viz.colors.white;
                                ctx.font = 'bold 28px -apple-system,sans-serif';
                                ctx.fillText(big + ' - ' + small + ' = ' + (big - small), 350, 220);

                                ctx.fillStyle = viz.colors.red;
                                ctx.font = 'bold 16px -apple-system,sans-serif';
                                ctx.fillText('Separating', 350, 25);
                            } else {
                                var barY = 50;
                                var wA = numA * barScale;
                                var wB = numB * barScale;

                                ctx.fillStyle = viz.colors.blue + '44';
                                ctx.fillRect(barLeft, barY, wA, barH);
                                ctx.strokeStyle = viz.colors.blue;
                                ctx.lineWidth = 2;
                                ctx.strokeRect(barLeft, barY, wA, barH);

                                ctx.fillStyle = viz.colors.orange + '44';
                                ctx.fillRect(barLeft, barY + barH + 15, wB, barH);
                                ctx.strokeStyle = viz.colors.orange;
                                ctx.strokeRect(barLeft, barY + barH + 15, wB, barH);

                                ctx.fillStyle = viz.colors.white;
                                ctx.font = 'bold 16px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.textBaseline = 'middle';
                                ctx.fillText('A = ' + numA, barLeft + wA / 2, barY + barH / 2);
                                ctx.fillText('B = ' + numB, barLeft + wB / 2, barY + barH + 15 + barH / 2);

                                // Difference
                                var diff = Math.abs(numA - numB);
                                var shorter = Math.min(wA, wB);
                                var longer = Math.max(wA, wB);
                                ctx.strokeStyle = viz.colors.yellow;
                                ctx.setLineDash([4, 4]);
                                ctx.beginPath();
                                ctx.moveTo(barLeft + shorter, barY);
                                ctx.lineTo(barLeft + shorter, barY + barH + 15 + barH);
                                ctx.stroke();
                                ctx.setLineDash([]);

                                ctx.fillStyle = viz.colors.yellow;
                                ctx.font = 'bold 14px -apple-system,sans-serif';
                                ctx.fillText('Difference = ' + diff, barLeft + (shorter + longer) / 2, barY + barH + 15 + barH + 20);

                                ctx.fillStyle = viz.colors.white;
                                ctx.font = 'bold 28px -apple-system,sans-serif';
                                ctx.fillText(Math.max(numA, numB) + ' - ' + Math.min(numA, numB) + ' = ' + diff, 350, 250);

                                ctx.fillStyle = viz.colors.blue;
                                ctx.font = 'bold 16px -apple-system,sans-serif';
                                ctx.fillText('Comparing', 350, 25);
                            }
                        }

                        draw();
                    }
                }
            ],
            exercises: [
                {
                    question: '"There are 27 students on the bus. At the next stop, 12 more get on. How many students are on the bus now?" What type of problem is this? Solve it.',
                    hint: 'Students are getting ON the bus, so the total is growing. Which type is that?',
                    solution: 'This is a <strong>Joining</strong> problem. We start with 27 and add 12 more. \\(27 + 12 = 39\\) students are on the bus now.'
                },
                {
                    question: '"Kai has 32 toy cars. His brother has 19 toy cars. How many more toy cars does Kai have?" Draw a bar model and solve.',
                    hint: 'This is a comparing problem. Draw two bars — one for Kai (32) and one for his brother (19). The difference is the answer.',
                    solution: 'This is a <strong>Comparing</strong> problem. Bar model: Kai\'s bar is longer (32) and his brother\'s is shorter (19). The difference: \\(32 - 19 = 13\\). Kai has 13 more toy cars.'
                },
                {
                    question: '"A class has 14 boys and 16 girls. How many students are in the class?" What type is this?',
                    hint: 'We know the two parts (boys and girls) and need the whole.',
                    solution: 'This is a <strong>Part-Part-Whole</strong> problem. Part 1 = 14 boys, Part 2 = 16 girls. Whole = \\(14 + 16 = 30\\) students.'
                }
            ]
        },

        // ============================================================
        // SECTION 3: Multiplication & Division Problems
        // ============================================================
        {
            id: 'ch08-sec03',
            title: 'Multiplication & Division Problems',
            content: `
                <h2>Multiplication & Division Problems</h2>

                <p>Just like addition and subtraction problems have types, multiplication and division word problems also follow patterns. Let's learn the main ones!</p>

                <h3>Types of Multiplication Problems</h3>

                <ul>
                    <li><strong style="color:var(--accent-green);">Equal Groups:</strong> <em>"There are 4 bags with 6 oranges in each bag."</em> \\(4 \\times 6 = 24\\)</li>
                    <li><strong style="color:var(--accent-blue);">Arrays:</strong> <em>"There are 3 rows with 5 chairs in each row."</em> \\(3 \\times 5 = 15\\)</li>
                    <li><strong style="color:var(--accent-orange);">Area:</strong> <em>"A garden is 7 meters long and 4 meters wide."</em> \\(7 \\times 4 = 28\\) square meters</li>
                    <li><strong style="color:var(--accent-purple);">Comparison:</strong> <em>"Sam has 3 times as many stickers as Mia."</em> If Mia has 8, Sam has \\(3 \\times 8 = 24\\)</li>
                </ul>

                <div class="viz-placeholder" data-viz="mult-types-viz"></div>

                <h3>Types of Division Problems</h3>

                <p>Division is the reverse of multiplication. There are two main types:</p>

                <ul>
                    <li><strong style="color:var(--accent-teal);">How many in each group?</strong> <em>"24 cookies shared equally among 6 friends."</em> \\(24 \\div 6 = 4\\) each.</li>
                    <li><strong style="color:var(--accent-orange);">How many groups?</strong> <em>"24 cookies, 4 in each bag. How many bags?"</em> \\(24 \\div 4 = 6\\) bags.</li>
                </ul>

                <div class="env-block intuition">
                    <div class="env-title">Cool Fact</div>
                    <div class="env-body">
                        <p>Multiplication and division are <strong>opposites</strong> (we call them inverse operations). If \\(5 \\times 8 = 40\\), then \\(40 \\div 8 = 5\\) and \\(40 \\div 5 = 8\\). You can always check a division by multiplying!</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="equal-groups-viz"></div>

                <h3>Key Phrases</h3>

                <div class="env-block example">
                    <div class="env-title">Example</div>
                    <div class="env-body">
                        <p>Here are phrases that signal multiplication or division:</p>
                        <ul>
                            <li><strong>Multiplication:</strong> "times as many," "each," "per," "every," "groups of," "rows of"</li>
                            <li><strong>Division:</strong> "shared equally," "split into," "divided among," "how many groups," "how many in each"</li>
                        </ul>
                        <p>Example: <em>"Zoe earns $5 per chore. She did 7 chores."</em> The word "per" means for each one, so multiply: \\(5 \\times 7 = 35\\).</p>
                    </div>
                </div>

                <div class="env-block warning">
                    <div class="env-title">Watch Out!</div>
                    <div class="env-body">
                        <p>"3 times as many" does NOT mean \\(+ 3\\). It means \\(\\times 3\\)! If Jake has 4 cards and Emma has 3 times as many, Emma has \\(3 \\times 4 = 12\\) cards, not \\(4 + 3 = 7\\).</p>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'mult-types-viz',
                    title: 'Multiplication Problem Types',
                    description: 'Click a type to see a visual representation.',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { width: 700, height: 360, scale: 1, originX: 0, originY: 0 });
                        var ctx = viz.ctx;
                        var selected = 0;

                        var types = ['Equal Groups', 'Array', 'Area', 'Comparison'];
                        var colors = [viz.colors.green, viz.colors.blue, viz.colors.orange, viz.colors.purple];

                        for (var b = 0; b < types.length; b++) {
                            (function(idx) {
                                VizEngine.createButton(controls, types[idx], function() {
                                    selected = idx;
                                    draw();
                                });
                            })(b);
                        }

                        function draw() {
                            viz.clear();
                            var color = colors[selected];

                            ctx.fillStyle = color;
                            ctx.font = 'bold 20px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'middle';
                            ctx.fillText(types[selected], 350, 28);

                            if (selected === 0) {
                                // Equal groups: 4 bags of 6
                                ctx.fillStyle = viz.colors.text;
                                ctx.font = '14px -apple-system,sans-serif';
                                ctx.fillText('4 bags with 6 oranges each', 350, 55);

                                for (var g = 0; g < 4; g++) {
                                    var gx = 100 + g * 145;
                                    var gy = 90;
                                    // Bag outline
                                    ctx.strokeStyle = color;
                                    ctx.lineWidth = 2;
                                    ctx.beginPath();
                                    ctx.roundRect(gx, gy, 120, 100, 10);
                                    ctx.stroke();
                                    ctx.fillStyle = color + '15';
                                    ctx.beginPath();
                                    ctx.roundRect(gx, gy, 120, 100, 10);
                                    ctx.fill();

                                    // 6 circles (oranges)
                                    for (var o = 0; o < 6; o++) {
                                        var ox = gx + 22 + (o % 3) * 35;
                                        var oy = gy + 30 + Math.floor(o / 3) * 35;
                                        ctx.fillStyle = viz.colors.orange;
                                        ctx.beginPath();
                                        ctx.arc(ox, oy, 12, 0, Math.PI * 2);
                                        ctx.fill();
                                    }
                                    ctx.fillStyle = color;
                                    ctx.font = 'bold 12px -apple-system,sans-serif';
                                    ctx.fillText('Bag ' + (g + 1), gx + 60, gy + 95);
                                }

                                ctx.fillStyle = viz.colors.white;
                                ctx.font = 'bold 24px -apple-system,sans-serif';
                                ctx.fillText('4 x 6 = 24 oranges', 350, 280);
                            } else if (selected === 1) {
                                // Array: 3 rows x 5 columns
                                ctx.fillStyle = viz.colors.text;
                                ctx.font = '14px -apple-system,sans-serif';
                                ctx.fillText('3 rows with 5 chairs in each row', 350, 55);

                                for (var r = 0; r < 3; r++) {
                                    for (var c = 0; c < 5; c++) {
                                        var cx2 = 200 + c * 65;
                                        var cy = 100 + r * 65;
                                        ctx.fillStyle = color + '44';
                                        ctx.fillRect(cx2, cy, 50, 50);
                                        ctx.strokeStyle = color;
                                        ctx.lineWidth = 2;
                                        ctx.strokeRect(cx2, cy, 50, 50);
                                        ctx.fillStyle = viz.colors.white;
                                        ctx.font = 'bold 20px -apple-system,sans-serif';
                                        ctx.fillText('\u25a1', cx2 + 25, cy + 27);
                                    }
                                }

                                // Row/col labels
                                ctx.fillStyle = color;
                                ctx.font = 'bold 13px -apple-system,sans-serif';
                                ctx.textAlign = 'right';
                                for (var lr = 0; lr < 3; lr++) {
                                    ctx.fillText('Row ' + (lr + 1), 190, 125 + lr * 65);
                                }
                                ctx.textAlign = 'center';
                                ctx.fillStyle = viz.colors.white;
                                ctx.font = 'bold 24px -apple-system,sans-serif';
                                ctx.fillText('3 x 5 = 15 chairs', 350, 310);
                            } else if (selected === 2) {
                                // Area: 7 x 4 rectangle
                                ctx.fillStyle = viz.colors.text;
                                ctx.font = '14px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.fillText('A garden 7 m long and 4 m wide', 350, 55);

                                var rx = 160;
                                var ry = 80;
                                var rw = 350;
                                var rh = 180;

                                ctx.fillStyle = color + '33';
                                ctx.fillRect(rx, ry, rw, rh);
                                ctx.strokeStyle = color;
                                ctx.lineWidth = 3;
                                ctx.strokeRect(rx, ry, rw, rh);

                                // Grid lines
                                ctx.strokeStyle = color + '44';
                                ctx.lineWidth = 1;
                                for (var gx2 = 1; gx2 < 7; gx2++) {
                                    ctx.beginPath();
                                    ctx.moveTo(rx + gx2 * (rw / 7), ry);
                                    ctx.lineTo(rx + gx2 * (rw / 7), ry + rh);
                                    ctx.stroke();
                                }
                                for (var gy2 = 1; gy2 < 4; gy2++) {
                                    ctx.beginPath();
                                    ctx.moveTo(rx, ry + gy2 * (rh / 4));
                                    ctx.lineTo(rx + rw, ry + gy2 * (rh / 4));
                                    ctx.stroke();
                                }

                                // Dimension labels
                                ctx.fillStyle = color;
                                ctx.font = 'bold 16px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.fillText('7 m', rx + rw / 2, ry + rh + 22);
                                ctx.save();
                                ctx.translate(rx - 18, ry + rh / 2);
                                ctx.rotate(-Math.PI / 2);
                                ctx.fillText('4 m', 0, 0);
                                ctx.restore();

                                // Area label
                                ctx.fillStyle = viz.colors.white;
                                ctx.font = 'bold 20px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.fillText('Area = 28 sq m', rx + rw / 2, ry + rh / 2);

                                ctx.fillStyle = viz.colors.white;
                                ctx.font = 'bold 24px -apple-system,sans-serif';
                                ctx.fillText('7 x 4 = 28', 350, 330);
                            } else {
                                // Comparison: 3 times as many
                                ctx.fillStyle = viz.colors.text;
                                ctx.font = '14px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.fillText('Sam has 3 times as many stickers as Mia (Mia has 8)', 350, 55);

                                var bLeft = 100;
                                var bh = 50;

                                // Mia's bar
                                var miaW = 130;
                                ctx.fillStyle = viz.colors.pink + '44';
                                ctx.fillRect(bLeft, 90, miaW, bh);
                                ctx.strokeStyle = viz.colors.pink;
                                ctx.lineWidth = 2;
                                ctx.strokeRect(bLeft, 90, miaW, bh);
                                ctx.fillStyle = viz.colors.white;
                                ctx.font = 'bold 16px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.fillText('Mia: 8', bLeft + miaW / 2, 115);

                                // Sam's bar (3x)
                                for (var s = 0; s < 3; s++) {
                                    ctx.fillStyle = color + '33';
                                    ctx.fillRect(bLeft + s * miaW, 170, miaW, bh);
                                    ctx.strokeStyle = color;
                                    ctx.lineWidth = 2;
                                    ctx.strokeRect(bLeft + s * miaW, 170, miaW, bh);
                                    ctx.fillStyle = viz.colors.white;
                                    ctx.font = 'bold 14px -apple-system,sans-serif';
                                    ctx.fillText('8', bLeft + s * miaW + miaW / 2, 195);
                                }

                                ctx.fillStyle = color;
                                ctx.font = 'bold 14px -apple-system,sans-serif';
                                ctx.textAlign = 'left';
                                ctx.fillText('Sam: 3 times as many', bLeft + 3 * miaW + 15, 195);

                                // Brace label
                                ctx.fillStyle = viz.colors.yellow;
                                ctx.font = 'bold 14px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.fillText('3 x 8 = 24', bLeft + 1.5 * miaW, 245);

                                ctx.fillStyle = viz.colors.white;
                                ctx.font = 'bold 24px -apple-system,sans-serif';
                                ctx.fillText('3 x 8 = 24 stickers', 350, 310);
                            }
                        }

                        draw();
                    }
                },
                {
                    id: 'equal-groups-viz',
                    title: 'Equal Groups & Division',
                    description: 'Set a total and group size. See how division splits things into equal groups!',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { width: 700, height: 320, scale: 1, originX: 0, originY: 0 });
                        var ctx = viz.ctx;
                        var total = 24;
                        var groupSize = 4;

                        VizEngine.createSlider(controls, 'Total', 4, 48, 24, 1, function(v) { total = Math.round(v); draw(); });
                        VizEngine.createSlider(controls, 'Per group', 1, 12, 4, 1, function(v) { groupSize = Math.round(v); draw(); });

                        function draw() {
                            viz.clear();
                            var numGroups = Math.floor(total / groupSize);
                            var remainder = total % groupSize;

                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 18px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'middle';

                            if (remainder === 0) {
                                ctx.fillText(total + ' \u00f7 ' + groupSize + ' = ' + numGroups + ' groups', 350, 25);
                            } else {
                                ctx.fillText(total + ' \u00f7 ' + groupSize + ' = ' + numGroups + ' groups, remainder ' + remainder, 350, 25);
                            }

                            // Draw groups
                            var maxCols = Math.min(numGroups + (remainder > 0 ? 1 : 0), 8);
                            var gw = Math.min(80, (660) / maxCols);
                            var startX = 350 - (maxCols * gw) / 2;

                            var groupColors = [viz.colors.blue, viz.colors.green, viz.colors.orange, viz.colors.purple, viz.colors.teal, viz.colors.pink, viz.colors.yellow, viz.colors.red];

                            for (var g = 0; g < Math.min(numGroups, 8); g++) {
                                var gx = startX + g * gw;
                                var gy = 50;
                                var gc = groupColors[g % groupColors.length];

                                ctx.strokeStyle = gc;
                                ctx.lineWidth = 2;
                                ctx.beginPath();
                                ctx.roundRect(gx + 4, gy, gw - 8, 210, 8);
                                ctx.stroke();
                                ctx.fillStyle = gc + '11';
                                ctx.beginPath();
                                ctx.roundRect(gx + 4, gy, gw - 8, 210, 8);
                                ctx.fill();

                                // Dots for items
                                var dotR = Math.min(8, (gw - 24) / 4);
                                var dotsPerRow = Math.max(1, Math.floor((gw - 16) / (dotR * 2 + 4)));
                                for (var d = 0; d < groupSize; d++) {
                                    var dr = Math.floor(d / dotsPerRow);
                                    var dc = d % dotsPerRow;
                                    var dx = gx + 12 + dc * (dotR * 2 + 4) + dotR;
                                    var dy = gy + 20 + dr * (dotR * 2 + 6) + dotR;
                                    if (dy < gy + 200) {
                                        ctx.fillStyle = gc;
                                        ctx.beginPath();
                                        ctx.arc(dx, dy, dotR, 0, Math.PI * 2);
                                        ctx.fill();
                                    }
                                }

                                ctx.fillStyle = gc;
                                ctx.font = 'bold 11px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.fillText(groupSize, gx + gw / 2, gy + 205);
                            }

                            if (numGroups > 8) {
                                ctx.fillStyle = viz.colors.text;
                                ctx.font = '14px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.fillText('(showing first 8 of ' + numGroups + ' groups)', 350, 280);
                            }

                            if (remainder > 0) {
                                ctx.fillStyle = viz.colors.red;
                                ctx.font = 'bold 14px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.fillText('Remainder: ' + remainder + ' left over', 350, 300);
                            }
                        }

                        draw();
                    }
                }
            ],
            exercises: [
                {
                    question: '"Each shelf holds 8 books. There are 6 shelves. How many books are there in all?" What type of multiplication problem is this?',
                    hint: 'We have equal groups (shelves) each holding the same number of books.',
                    solution: 'This is an <strong>Equal Groups</strong> problem. \\(6 \\times 8 = 48\\) books in all. Each shelf is a "group" with 8 books.'
                },
                {
                    question: '"36 markers are shared equally among 9 students. How many markers does each student get?"',
                    hint: 'We know the total (36) and the number of groups (9 students). We need to find how many in each group.',
                    solution: 'This is division: \\(36 \\div 9 = 4\\). Each student gets 4 markers. Check: \\(9 \\times 4 = 36\\). Correct!'
                },
                {
                    question: '"Mia reads 5 pages a day. How many pages does she read in 2 weeks?" (Hint: how many days in 2 weeks?)',
                    hint: '2 weeks = 14 days. Then multiply pages per day by the number of days.',
                    solution: '2 weeks = 14 days. \\(5 \\times 14 = 70\\) pages. Mia reads 70 pages in 2 weeks. The key phrase "per day" signals multiplication.'
                }
            ]
        },

        // ============================================================
        // SECTION 4: Two-Step Problems
        // ============================================================
        {
            id: 'ch08-sec04',
            title: 'Two-Step Problems',
            content: `
                <h2>Two-Step Problems</h2>

                <p>Sometimes a word problem needs <strong>two operations</strong> to solve. These are called <strong>two-step problems</strong>. The key is figuring out the right <strong>order</strong> and doing one step at a time.</p>

                <div class="env-block example">
                    <div class="env-title">Example</div>
                    <div class="env-body">
                        <p><em>"Ben buys 3 packs of pencils. Each pack has 8 pencils. He gives 5 pencils to his friend. How many pencils does Ben have now?"</em></p>
                        <p><strong>Step 1:</strong> Find the total pencils: \\(3 \\times 8 = 24\\)</p>
                        <p><strong>Step 2:</strong> Subtract the ones he gave away: \\(24 - 5 = 19\\)</p>
                        <p>Ben has <strong>19 pencils</strong>.</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="two-step-solver"></div>

                <h3>How to Spot Two-Step Problems</h3>

                <p>Look for these clues:</p>
                <ul>
                    <li>The problem has <strong>more than two numbers</strong>.</li>
                    <li>There are <strong>two different actions</strong> happening in the story.</li>
                    <li>You can't get to the answer with just one operation.</li>
                </ul>

                <div class="env-block remark">
                    <div class="env-title">Think About It</div>
                    <div class="env-body">
                        <p>The order of steps matters! In the pencil problem above, you MUST multiply first (to find the total) before you can subtract. Always ask yourself: <em>"What do I need to figure out before I can answer the final question?"</em></p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Try This!</div>
                    <div class="env-body">
                        <p><em>"Emma has $20. She buys a book for $7 and a pen for $3. How much money does she have left?"</em></p>
                        <p><strong>Way 1:</strong> Add first, then subtract. \\(7 + 3 = 10\\), then \\(20 - 10 = 10\\).</p>
                        <p><strong>Way 2:</strong> Subtract each time. \\(20 - 7 = 13\\), then \\(13 - 3 = 10\\).</p>
                        <p>Both ways give the same answer: <strong>$10</strong>.</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="step-by-step-tracker"></div>

                <div class="env-block warning">
                    <div class="env-title">Watch Out!</div>
                    <div class="env-body">
                        <p>Don't try to do everything at once! Write down your <strong>Step 1</strong> answer before moving to <strong>Step 2</strong>. This helps you avoid mistakes and makes it easier to check your work.</p>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'two-step-solver',
                    title: 'Two-Step Problem Walkthrough',
                    description: 'Click through the steps to see how a two-step problem is solved.',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { width: 700, height: 340, scale: 1, originX: 0, originY: 0 });
                        var ctx = viz.ctx;
                        var step = 0;

                        VizEngine.createButton(controls, 'Start Over', function() { step = 0; draw(); });
                        VizEngine.createButton(controls, 'Next Step', function() { step = Math.min(step + 1, 3); draw(); });

                        function draw() {
                            viz.clear();

                            // Problem
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = '15px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'middle';
                            ctx.fillText('"Ben buys 3 packs of pencils. Each pack has 8 pencils.', 350, 25);
                            ctx.fillText('He gives 5 pencils to his friend. How many pencils does he have now?"', 350, 48);

                            // Step indicators
                            var stepLabels = ['Read & Plan', 'Step 1: Multiply', 'Step 2: Subtract', 'Answer!'];
                            var stepColors = [viz.colors.text, viz.colors.blue, viz.colors.orange, viz.colors.green];
                            var stepY = 85;

                            for (var i = 0; i < 4; i++) {
                                var sx = 90 + i * 150;
                                var isActive = (i <= step);
                                var isCurrent = (i === step);

                                // Circle
                                ctx.fillStyle = isActive ? stepColors[i] : '#1a1a40';
                                ctx.beginPath();
                                ctx.arc(sx, stepY, 16, 0, Math.PI * 2);
                                ctx.fill();
                                ctx.strokeStyle = isCurrent ? stepColors[i] : '#30363d';
                                ctx.lineWidth = isCurrent ? 3 : 1;
                                ctx.beginPath();
                                ctx.arc(sx, stepY, 16, 0, Math.PI * 2);
                                ctx.stroke();

                                ctx.fillStyle = isActive ? '#ffffff' : viz.colors.text;
                                ctx.font = 'bold 14px -apple-system,sans-serif';
                                ctx.fillText(String(i + 1), sx, stepY);

                                ctx.fillStyle = isCurrent ? stepColors[i] : viz.colors.text;
                                ctx.font = '11px -apple-system,sans-serif';
                                ctx.fillText(stepLabels[i], sx, stepY + 30);

                                // Connector line
                                if (i < 3) {
                                    ctx.strokeStyle = (i < step) ? stepColors[i] : '#30363d';
                                    ctx.lineWidth = 2;
                                    ctx.beginPath();
                                    ctx.moveTo(sx + 20, stepY);
                                    ctx.lineTo(sx + 130, stepY);
                                    ctx.stroke();
                                }
                            }

                            // Content area
                            var contentY = 145;

                            if (step >= 0) {
                                ctx.fillStyle = viz.colors.text;
                                ctx.font = '14px -apple-system,sans-serif';
                                ctx.textAlign = 'left';
                                ctx.fillText('Numbers: 3, 8, and 5', 60, contentY);
                                ctx.fillText('Plan: First find total pencils, then remove the ones given away.', 60, contentY + 22);
                            }

                            if (step >= 1) {
                                // Step 1 visual: 3 groups of 8
                                ctx.fillStyle = viz.colors.blue;
                                ctx.font = 'bold 14px -apple-system,sans-serif';
                                ctx.textAlign = 'left';
                                ctx.fillText('Step 1:  3 packs x 8 pencils = ?', 60, contentY + 60);

                                for (var p = 0; p < 3; p++) {
                                    var px = 80 + p * 110;
                                    var py = contentY + 80;
                                    ctx.strokeStyle = viz.colors.blue;
                                    ctx.lineWidth = 2;
                                    ctx.beginPath();
                                    ctx.roundRect(px, py, 95, 40, 6);
                                    ctx.stroke();
                                    // 8 dots
                                    for (var d = 0; d < 8; d++) {
                                        ctx.fillStyle = viz.colors.blue;
                                        ctx.beginPath();
                                        ctx.arc(px + 10 + d * 11, py + 20, 4, 0, Math.PI * 2);
                                        ctx.fill();
                                    }
                                }

                                ctx.fillStyle = viz.colors.blue;
                                ctx.font = 'bold 18px -apple-system,sans-serif';
                                ctx.textAlign = 'left';
                                ctx.fillText('= 24 pencils', 420, contentY + 100);
                            }

                            if (step >= 2) {
                                ctx.fillStyle = viz.colors.orange;
                                ctx.font = 'bold 14px -apple-system,sans-serif';
                                ctx.textAlign = 'left';
                                ctx.fillText('Step 2:  24 pencils - 5 given away = ?', 60, contentY + 140);

                                // Bar showing 24 with 5 removed
                                var barLeft = 80;
                                var barW = 400;
                                var barH = 35;
                                var barTop = contentY + 155;
                                var keepW = barW * (19 / 24);
                                var removeW = barW * (5 / 24);

                                ctx.fillStyle = viz.colors.green + '44';
                                ctx.fillRect(barLeft, barTop, keepW, barH);
                                ctx.strokeStyle = viz.colors.green;
                                ctx.lineWidth = 2;
                                ctx.strokeRect(barLeft, barTop, keepW, barH);

                                ctx.fillStyle = viz.colors.red + '33';
                                ctx.fillRect(barLeft + keepW, barTop, removeW, barH);
                                ctx.strokeStyle = viz.colors.red;
                                ctx.strokeRect(barLeft + keepW, barTop, removeW, barH);

                                ctx.fillStyle = viz.colors.white;
                                ctx.font = 'bold 14px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.fillText('19 kept', barLeft + keepW / 2, barTop + barH / 2);
                                ctx.fillStyle = viz.colors.red;
                                ctx.fillText('5', barLeft + keepW + removeW / 2, barTop + barH / 2);
                            }

                            if (step >= 3) {
                                ctx.fillStyle = viz.colors.green;
                                ctx.font = 'bold 36px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.fillText('Answer: 19 pencils!', 350, 310);
                            }
                        }

                        draw();
                    }
                },
                {
                    id: 'step-by-step-tracker',
                    title: 'Build a Two-Step Problem',
                    description: 'Set the numbers and see the two steps unfold.',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { width: 700, height: 280, scale: 1, originX: 0, originY: 0 });
                        var ctx = viz.ctx;
                        var groups = 4;
                        var perGroup = 6;
                        var subtract = 5;

                        VizEngine.createSlider(controls, 'Groups', 1, 8, 4, 1, function(v) { groups = Math.round(v); draw(); });
                        VizEngine.createSlider(controls, 'Per group', 1, 10, 6, 1, function(v) { perGroup = Math.round(v); draw(); });
                        VizEngine.createSlider(controls, 'Give away', 0, 30, 5, 1, function(v) { subtract = Math.round(v); draw(); });

                        function draw() {
                            viz.clear();
                            var total = groups * perGroup;
                            var final2 = Math.max(0, total - subtract);

                            // Step 1 box
                            ctx.fillStyle = viz.colors.blue + '22';
                            ctx.fillRect(30, 20, 300, 100);
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 2;
                            ctx.strokeRect(30, 20, 300, 100);

                            ctx.fillStyle = viz.colors.blue;
                            ctx.font = 'bold 16px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'middle';
                            ctx.fillText('Step 1: Multiply', 180, 40);
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = '15px -apple-system,sans-serif';
                            ctx.fillText(groups + ' groups x ' + perGroup + ' each', 180, 65);
                            ctx.fillStyle = viz.colors.blue;
                            ctx.font = 'bold 22px -apple-system,sans-serif';
                            ctx.fillText('= ' + total, 180, 95);

                            // Arrow
                            ctx.strokeStyle = viz.colors.yellow;
                            ctx.lineWidth = 3;
                            ctx.beginPath();
                            ctx.moveTo(340, 70);
                            ctx.lineTo(380, 70);
                            ctx.stroke();
                            ctx.fillStyle = viz.colors.yellow;
                            ctx.beginPath();
                            ctx.moveTo(385, 70);
                            ctx.lineTo(375, 63);
                            ctx.lineTo(375, 77);
                            ctx.closePath();
                            ctx.fill();

                            // Step 2 box
                            ctx.fillStyle = viz.colors.orange + '22';
                            ctx.fillRect(395, 20, 280, 100);
                            ctx.strokeStyle = viz.colors.orange;
                            ctx.lineWidth = 2;
                            ctx.strokeRect(395, 20, 280, 100);

                            ctx.fillStyle = viz.colors.orange;
                            ctx.font = 'bold 16px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('Step 2: Subtract', 535, 40);
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = '15px -apple-system,sans-serif';
                            ctx.fillText(total + ' - ' + subtract + ' given away', 535, 65);
                            ctx.fillStyle = viz.colors.orange;
                            ctx.font = 'bold 22px -apple-system,sans-serif';
                            ctx.fillText('= ' + final2, 535, 95);

                            // Final answer
                            ctx.fillStyle = viz.colors.green;
                            ctx.font = 'bold 28px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('Final Answer: ' + final2, 350, 165);

                            // Number sentence
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '16px -apple-system,sans-serif';
                            ctx.fillText('(' + groups + ' x ' + perGroup + ') - ' + subtract + ' = ' + total + ' - ' + subtract + ' = ' + final2, 350, 200);

                            if (subtract > total) {
                                ctx.fillStyle = viz.colors.red;
                                ctx.font = 'bold 14px -apple-system,sans-serif';
                                ctx.fillText('Oops! You can\'t give away more than you have!', 350, 240);
                            }
                        }

                        draw();
                    }
                }
            ],
            exercises: [
                {
                    question: '"A baker made 5 trays of cookies with 12 cookies per tray. She sold 18 cookies. How many cookies does she have left?"',
                    hint: 'Step 1: Find the total cookies (multiply). Step 2: Subtract the ones she sold.',
                    solution: 'Step 1: \\(5 \\times 12 = 60\\) cookies total. Step 2: \\(60 - 18 = 42\\) cookies left. Check: \\(42 + 18 = 60\\). Correct!'
                },
                {
                    question: '"Tom has 45 trading cards. He gives 10 to his sister and then buys 8 more. How many cards does he have now?"',
                    hint: 'Two operations: first subtract (gives away), then add (buys more).',
                    solution: 'Step 1: \\(45 - 10 = 35\\) cards after giving some away. Step 2: \\(35 + 8 = 43\\) cards after buying more. Tom has 43 cards.'
                },
                {
                    question: '"There are 30 students in a class. 4 groups of 5 students leave for a field trip. How many students are still in class?"',
                    hint: 'First find how many students left (multiply), then subtract from 30.',
                    solution: 'Step 1: \\(4 \\times 5 = 20\\) students left for the trip. Step 2: \\(30 - 20 = 10\\) students remain. The order matters: multiply first, then subtract.'
                }
            ]
        },

        // ============================================================
        // SECTION 5: Problem-Solving Toolbox
        // ============================================================
        {
            id: 'ch08-sec05',
            title: 'Problem-Solving Toolbox',
            content: `
                <h2>Problem-Solving Toolbox</h2>

                <p>Every good problem solver has a <strong>toolbox</strong> full of strategies. When you get stuck, try picking a different tool! Here are five powerful strategies:</p>

                <h3>1. Draw a Picture</h3>

                <p>Sketching the problem makes it easier to "see" what's happening. You don't need to be an artist — stick figures and simple shapes work great!</p>

                <div class="env-block example">
                    <div class="env-title">Example</div>
                    <div class="env-body">
                        <p><em>"A fence has 4 sections. Each section is 3 meters long. There is a post at each end and between each section. How many posts are there?"</em></p>
                        <p>Draw it: \\(\\textbf{| --- | --- | --- | --- |}\\)</p>
                        <p>Count the posts: <strong>5 posts</strong>! (Always one more post than sections.)</p>
                    </div>
                </div>

                <h3>2. Make a Table</h3>

                <p>Tables help you organize information and spot patterns.</p>

                <div class="env-block example">
                    <div class="env-title">Try This!</div>
                    <div class="env-body">
                        <p><em>"You save $3 each week. How much will you have after 6 weeks?"</em></p>
                        <p>Make a table:</p>
                        <p>Week 1: $3 &nbsp;|&nbsp; Week 2: $6 &nbsp;|&nbsp; Week 3: $9 &nbsp;|&nbsp; Week 4: $12 &nbsp;|&nbsp; Week 5: $15 &nbsp;|&nbsp; Week 6: <strong>$18</strong></p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="strategy-picker"></div>

                <h3>3. Guess and Check</h3>

                <p>Make a smart guess, check if it works, and adjust. This works well when you need to find a missing number.</p>

                <div class="env-block remark">
                    <div class="env-title">Think About It</div>
                    <div class="env-body">
                        <p><em>"Two numbers add up to 20 and one is 4 more than the other. What are they?"</em></p>
                        <p>Guess: 8 and 12. Check: \\(8 + 12 = 20\\) and \\(12 - 8 = 4\\). Both conditions work! The numbers are 8 and 12.</p>
                    </div>
                </div>

                <h3>4. Work Backward</h3>

                <p>If you know the end result and want to find the start, work backward by doing the <strong>opposite</strong> operation.</p>

                <div class="env-block example">
                    <div class="env-title">Example</div>
                    <div class="env-body">
                        <p><em>"After spending $7, Rosa has $15 left. How much did she start with?"</em></p>
                        <p>She spent money (subtraction), so work backward with addition: \\(15 + 7 = 22\\). Rosa started with $22.</p>
                    </div>
                </div>

                <h3>5. Find a Pattern</h3>

                <p>Look for repeating patterns or rules. Patterns help you predict answers without doing every calculation!</p>

                <div class="viz-placeholder" data-viz="work-backward-viz"></div>

                <div class="env-block intuition">
                    <div class="env-title">Discovery</div>
                    <div class="env-body">
                        <p>The best problem solvers aren't the ones who are fastest — they're the ones who <strong>don't give up</strong>! If one strategy doesn't work, try another. Being stuck is perfectly normal. Every time you work through a tough problem, your brain gets stronger!</p>
                    </div>
                </div>

                <div class="env-block warning">
                    <div class="env-title">Watch Out!</div>
                    <div class="env-body">
                        <p>Always go back and <strong>check your answer</strong>. Ask yourself: "Does this answer make sense?" If a problem says you shared cookies and your answer is more cookies than you started with, something went wrong!</p>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'strategy-picker',
                    title: 'Problem-Solving Strategies',
                    description: 'Click a strategy to learn when to use it!',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { width: 700, height: 350, scale: 1, originX: 0, originY: 0 });
                        var ctx = viz.ctx;
                        var selected = 0;

                        var strategies = [
                            {
                                name: 'Draw a Picture',
                                color: viz.colors.blue,
                                when: 'When you need to see the problem',
                                example: 'How many posts for a fence with 4 sections?',
                                tip: 'Sketch shapes, stick figures, or diagrams!'
                            },
                            {
                                name: 'Make a Table',
                                color: viz.colors.green,
                                when: 'When numbers change in a pattern',
                                example: 'Save $3/week. How much after 6 weeks?',
                                tip: 'Organize data in rows to spot the pattern.'
                            },
                            {
                                name: 'Guess & Check',
                                color: viz.colors.orange,
                                when: 'When you need to find a mystery number',
                                example: 'Two numbers add to 20, differ by 4.',
                                tip: 'Make a guess, check it, then adjust up or down!'
                            },
                            {
                                name: 'Work Backward',
                                color: viz.colors.purple,
                                when: 'When you know the end but not the start',
                                example: 'After spending $7, Rosa has $15 left.',
                                tip: 'Undo each step using the opposite operation.'
                            },
                            {
                                name: 'Find a Pattern',
                                color: viz.colors.teal,
                                when: 'When you see things repeating',
                                example: '2, 4, 6, 8 ... What comes next?',
                                tip: 'Look at what stays the same and what changes.'
                            }
                        ];

                        for (var b = 0; b < strategies.length; b++) {
                            (function(idx) {
                                VizEngine.createButton(controls, strategies[idx].name, function() {
                                    selected = idx;
                                    draw();
                                });
                            })(b);
                        }

                        function draw() {
                            viz.clear();
                            var s = strategies[selected];

                            // Big title
                            ctx.fillStyle = s.color;
                            ctx.font = 'bold 28px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'middle';
                            ctx.fillText(s.name, 350, 40);

                            // Tool icon (number in circle)
                            ctx.fillStyle = s.color + '33';
                            ctx.beginPath();
                            ctx.arc(350, 110, 40, 0, Math.PI * 2);
                            ctx.fill();
                            ctx.strokeStyle = s.color;
                            ctx.lineWidth = 3;
                            ctx.beginPath();
                            ctx.arc(350, 110, 40, 0, Math.PI * 2);
                            ctx.stroke();
                            ctx.fillStyle = s.color;
                            ctx.font = 'bold 32px -apple-system,sans-serif';
                            ctx.fillText(String(selected + 1), 350, 112);

                            // When to use
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 16px -apple-system,sans-serif';
                            ctx.fillText('When to use it:', 350, 175);
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '15px -apple-system,sans-serif';
                            ctx.fillText(s.when, 350, 200);

                            // Example
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 16px -apple-system,sans-serif';
                            ctx.fillText('Example problem:', 350, 240);
                            ctx.fillStyle = s.color;
                            ctx.font = 'italic 15px -apple-system,sans-serif';
                            ctx.fillText('"' + s.example + '"', 350, 265);

                            // Tip
                            ctx.fillStyle = viz.colors.yellow;
                            ctx.font = 'bold 14px -apple-system,sans-serif';
                            ctx.fillText('Tip: ' + s.tip, 350, 310);
                        }

                        draw();
                    }
                },
                {
                    id: 'work-backward-viz',
                    title: 'Work Backward Machine',
                    description: 'Set the final amount and what was spent. The machine finds the start!',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { width: 700, height: 300, scale: 1, originX: 0, originY: 0 });
                        var ctx = viz.ctx;
                        var endAmount = 15;
                        var spent = 7;

                        VizEngine.createSlider(controls, 'Left over ($)', 1, 50, 15, 1, function(v) { endAmount = Math.round(v); draw(); });
                        VizEngine.createSlider(controls, 'Spent ($)', 1, 50, 7, 1, function(v) { spent = Math.round(v); draw(); });

                        function draw() {
                            viz.clear();
                            var startAmount = endAmount + spent;

                            // Title
                            ctx.fillStyle = viz.colors.purple;
                            ctx.font = 'bold 18px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'middle';
                            ctx.fillText('Working Backward', 350, 25);

                            // Forward story (faded)
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '14px -apple-system,sans-serif';
                            ctx.fillText('Forward: Started with ??? , spent $' + spent + ', ended with $' + endAmount, 350, 55);

                            // Three boxes with arrows
                            var boxW = 140;
                            var boxH = 80;
                            var y = 100;

                            // Start box (answer)
                            ctx.fillStyle = viz.colors.green + '33';
                            ctx.fillRect(60, y, boxW, boxH);
                            ctx.strokeStyle = viz.colors.green;
                            ctx.lineWidth = 3;
                            ctx.strokeRect(60, y, boxW, boxH);
                            ctx.fillStyle = viz.colors.green;
                            ctx.font = 'bold 14px -apple-system,sans-serif';
                            ctx.fillText('Started with', 60 + boxW / 2, y + 20);
                            ctx.font = 'bold 32px -apple-system,sans-serif';
                            ctx.fillText('$' + startAmount, 60 + boxW / 2, y + 55);

                            // Arrow 1 (spent)
                            ctx.strokeStyle = viz.colors.red;
                            ctx.lineWidth = 3;
                            ctx.beginPath();
                            ctx.moveTo(60 + boxW + 10, y + boxH / 2);
                            ctx.lineTo(280 - 10, y + boxH / 2);
                            ctx.stroke();
                            ctx.fillStyle = viz.colors.red;
                            ctx.beginPath();
                            ctx.moveTo(280 - 5, y + boxH / 2);
                            ctx.lineTo(280 - 15, y + boxH / 2 - 7);
                            ctx.lineTo(280 - 15, y + boxH / 2 + 7);
                            ctx.closePath();
                            ctx.fill();
                            ctx.font = 'bold 13px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('- $' + spent, 210, y + boxH / 2 - 14);

                            // End box
                            ctx.fillStyle = viz.colors.orange + '33';
                            ctx.fillRect(280, y, boxW, boxH);
                            ctx.strokeStyle = viz.colors.orange;
                            ctx.lineWidth = 3;
                            ctx.strokeRect(280, y, boxW, boxH);
                            ctx.fillStyle = viz.colors.orange;
                            ctx.font = 'bold 14px -apple-system,sans-serif';
                            ctx.fillText('Left over', 280 + boxW / 2, y + 20);
                            ctx.font = 'bold 32px -apple-system,sans-serif';
                            ctx.fillText('$' + endAmount, 280 + boxW / 2, y + 55);

                            // Backward arrow
                            var bwY = y + boxH + 35;
                            ctx.strokeStyle = viz.colors.purple;
                            ctx.lineWidth = 3;
                            ctx.setLineDash([6, 4]);
                            ctx.beginPath();
                            ctx.moveTo(350, bwY);
                            ctx.lineTo(130, bwY);
                            ctx.stroke();
                            ctx.setLineDash([]);
                            ctx.fillStyle = viz.colors.purple;
                            ctx.beginPath();
                            ctx.moveTo(125, bwY);
                            ctx.lineTo(135, bwY - 7);
                            ctx.lineTo(135, bwY + 7);
                            ctx.closePath();
                            ctx.fill();

                            ctx.fillStyle = viz.colors.purple;
                            ctx.font = 'bold 14px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('Work backward: $' + endAmount + ' + $' + spent + ' = $' + startAmount, 350, bwY - 15);

                            // Explanation
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '14px -apple-system,sans-serif';
                            ctx.fillText('Spending is subtraction, so we UNDO it with addition!', 350, bwY + 30);

                            // Toolbox box
                            ctx.fillStyle = viz.colors.purple + '22';
                            ctx.fillRect(480, y, 190, boxH);
                            ctx.strokeStyle = viz.colors.purple;
                            ctx.lineWidth = 2;
                            ctx.strokeRect(480, y, 190, boxH);
                            ctx.fillStyle = viz.colors.purple;
                            ctx.font = 'bold 13px -apple-system,sans-serif';
                            ctx.fillText('Undo Guide:', 575, y + 18);
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.fillText('Undo + with -', 575, y + 38);
                            ctx.fillText('Undo - with +', 575, y + 55);
                            ctx.fillText('Undo x with \u00f7', 575, y + 72);
                        }

                        draw();
                    }
                }
            ],
            exercises: [
                {
                    question: '"A frog jumps forward 3 steps, then back 1 step, then forward 3, then back 1, and keeps going. After doing this pattern 5 times, how far is the frog from the start?" Use the "Find a Pattern" strategy.',
                    hint: 'Each cycle (forward 3, back 1) moves the frog a net of 2 steps forward. After 5 cycles...',
                    solution: 'Each cycle: \\(3 - 1 = 2\\) steps forward. After 5 cycles: \\(5 \\times 2 = 10\\) steps from the start. The pattern strategy made this easy!'
                },
                {
                    question: '"After doubling his money and then spending $6, Alex has $14. How much money did he start with?" Use the "Work Backward" strategy.',
                    hint: 'Work backward from $14. Undo the spending first (add $6), then undo the doubling (divide by 2).',
                    solution: 'Start at $14. Undo spending $6: \\(14 + 6 = 20\\). Undo doubling: \\(20 \\div 2 = 10\\). Alex started with <strong>$10</strong>. Check: \\(10 \\times 2 = 20\\), \\(20 - 6 = 14\\). Correct!'
                },
                {
                    question: '"Two numbers add up to 30. One number is twice the other. What are the two numbers?" Use the "Guess and Check" strategy.',
                    hint: 'Try guessing the smaller number. If it is 8, the bigger is 16, total is 24 (too small). Adjust up!',
                    solution: 'Guess: smaller = 10, bigger = 20. Check: \\(10 + 20 = 30\\) and \\(20 = 2 \\times 10\\). Both conditions are satisfied! The numbers are <strong>10 and 20</strong>.'
                }
            ]
        }
    ]
});
