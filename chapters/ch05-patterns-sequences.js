// === Chapter 5: Patterns & Sequences ===
// Fun, colorful content for elementary school kids (ages 7-12)

window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch05',
    number: 5,
    title: 'Patterns & Sequences',
    subtitle: 'Discover the hidden rules that make numbers dance!',
    sections: [
        // ============================================================
        // Section 1: Patterns Are Everywhere
        // ============================================================
        {
            id: 'ch05-sec01',
            title: 'Patterns Are Everywhere',
            content: `
                <h2>Patterns Are Everywhere</h2>

                <p>Look around you right now. Do you see a pattern? Maybe the tiles on the floor, stripes on a shirt, or even the beat of your favorite song. <strong>Patterns</strong> are things that repeat in a predictable way, and once you learn to spot them, you will see them <em>everywhere</em>!</p>

                <div class="env-block intuition">
                    <div class="env-title">Discovery</div>
                    <div class="env-body">
                        <p>A <strong>pattern</strong> is a rule that tells you what comes next. If you know the rule, you can predict the future! Well, at least the future of the pattern.</p>
                    </div>
                </div>

                <h3>Repeating Patterns</h3>

                <p>The simplest kind of pattern is a <strong>repeating pattern</strong>. Something happens over and over in the same order.</p>

                <div class="env-block example">
                    <div class="env-title">Example: AB Patterns</div>
                    <div class="env-body">
                        <p>An <strong>AB pattern</strong> alternates between two things:</p>
                        <ul>
                            <li>Red, Blue, Red, Blue, Red, Blue, ...</li>
                            <li>Clap, Snap, Clap, Snap, Clap, Snap, ...</li>
                            <li>1, 2, 1, 2, 1, 2, ...</li>
                        </ul>
                        <p>The "core" of this pattern is just <strong>AB</strong> &mdash; two items that keep repeating.</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example: ABC and AABB Patterns</div>
                    <div class="env-body">
                        <p>Patterns can have longer cores too!</p>
                        <ul>
                            <li><strong>ABC:</strong> Triangle, Circle, Star, Triangle, Circle, Star, ...</li>
                            <li><strong>AABB:</strong> Red, Red, Blue, Blue, Red, Red, Blue, Blue, ...</li>
                            <li><strong>ABB:</strong> Clap, Snap, Snap, Clap, Snap, Snap, ...</li>
                        </ul>
                        <p>The trick is to find the <em>core</em> &mdash; the piece that repeats &mdash; and then you know what comes next!</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="ch05-viz-repeat-pattern"></div>

                <h3>Growing Patterns</h3>

                <p>Not all patterns just repeat the same thing. Some patterns <strong>grow</strong>! Each step gets a little bigger or changes in a regular way.</p>

                <div class="env-block example">
                    <div class="env-title">Try This!</div>
                    <div class="env-body">
                        <p>Look at these growing patterns. Can you spot the rule?</p>
                        <ul>
                            <li>1, 2, 3, 4, 5, ... (add 1 each time)</li>
                            <li>2, 4, 6, 8, 10, ... (add 2 each time)</li>
                            <li>1, 2, 4, 8, 16, ... (double each time!)</li>
                        </ul>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="ch05-viz-growing-pattern"></div>

                <div class="env-block remark">
                    <div class="env-title">Think About It</div>
                    <div class="env-body">
                        <p>Nature is full of patterns! Sunflower seeds spiral in a pattern. Honeycombs are hexagons repeating over and over. Zebra stripes follow a pattern too. Mathematicians study patterns to understand the world around us.</p>
                    </div>
                </div>

                <div class="env-block warning">
                    <div class="env-title">Watch Out!</div>
                    <div class="env-body">
                        <p>Sometimes a pattern might trick you! Make sure you look at <em>enough</em> items before you decide what the rule is. For example: 1, 2, 4 ... is this adding (1, 2, 4, 7, 11)? Or doubling (1, 2, 4, 8, 16)? You might need more clues!</p>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'ch05-viz-repeat-pattern',
                    title: 'Repeating Pattern Builder',
                    description: 'Watch different repeating patterns scroll by! Switch between AB, ABC, and AABB patterns.',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, {
                            width: 600, height: 260, scale: 1,
                            originX: 0, originY: 0
                        });

                        var patternType = 'AB';
                        var animOffset = 0;
                        var lastTime = null;

                        var patterns = {
                            'AB':   ['#58a6ff', '#f0883e'],
                            'ABC':  ['#58a6ff', '#f0883e', '#3fb950'],
                            'AABB': ['#58a6ff', '#58a6ff', '#f0883e', '#f0883e'],
                            'ABB':  ['#58a6ff', '#f0883e', '#f0883e'],
                            'ABCD': ['#58a6ff', '#f0883e', '#3fb950', '#bc8cff']
                        };

                        var shapes = {
                            'AB':   ['circle', 'square'],
                            'ABC':  ['circle', 'square', 'triangle'],
                            'AABB': ['circle', 'circle', 'square', 'square'],
                            'ABB':  ['circle', 'square', 'square'],
                            'ABCD': ['circle', 'square', 'triangle', 'diamond']
                        };

                        var patternNames = ['AB', 'ABC', 'AABB', 'ABB', 'ABCD'];
                        var buttons = {};

                        var btnGroup = document.createElement('div');
                        btnGroup.style.cssText = 'display:flex;gap:6px;flex-wrap:wrap;';
                        patternNames.forEach(function(name) {
                            var btn = document.createElement('button');
                            btn.textContent = name;
                            btn.style.cssText = 'padding:5px 12px;border:2px solid ' + (name === patternType ? '#58a6ff' : '#30363d') + ';border-radius:6px;background:' + (name === patternType ? '#58a6ff' : '#1a1a40') + ';color:#f0f6fc;font-size:0.82rem;font-weight:bold;cursor:pointer;';
                            btn.addEventListener('click', function() {
                                patternType = name;
                                patternNames.forEach(function(n) {
                                    buttons[n].style.background = n === name ? '#58a6ff' : '#1a1a40';
                                    buttons[n].style.borderColor = n === name ? '#58a6ff' : '#30363d';
                                });
                            });
                            buttons[name] = btn;
                            btnGroup.appendChild(btn);
                        });
                        controls.appendChild(btnGroup);

                        function drawShape(ctx, shape, cx, cy, r, color) {
                            ctx.fillStyle = color;
                            ctx.beginPath();
                            if (shape === 'circle') {
                                ctx.arc(cx, cy, r, 0, Math.PI * 2);
                                ctx.fill();
                            } else if (shape === 'square') {
                                ctx.fillRect(cx - r, cy - r, r * 2, r * 2);
                            } else if (shape === 'triangle') {
                                ctx.moveTo(cx, cy - r);
                                ctx.lineTo(cx + r, cy + r * 0.8);
                                ctx.lineTo(cx - r, cy + r * 0.8);
                                ctx.closePath();
                                ctx.fill();
                            } else if (shape === 'diamond') {
                                ctx.moveTo(cx, cy - r);
                                ctx.lineTo(cx + r, cy);
                                ctx.lineTo(cx, cy + r);
                                ctx.lineTo(cx - r, cy);
                                ctx.closePath();
                                ctx.fill();
                            }
                        }

                        function draw(t) {
                            if (lastTime === null) lastTime = t;
                            var dt = (t - lastTime) / 1000;
                            lastTime = t;
                            animOffset += dt * 40;

                            var ctx = viz.ctx;
                            ctx.fillStyle = '#0c0c20';
                            ctx.fillRect(0, 0, viz.width, viz.height);

                            // Title
                            ctx.fillStyle = '#f0f6fc';
                            ctx.font = 'bold 18px -apple-system, sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'top';
                            ctx.fillText('Repeating Pattern: ' + patternType, viz.width / 2, 12);

                            var pat = patterns[patternType];
                            var sh = shapes[patternType];
                            var coreLen = pat.length;

                            // Draw core label
                            ctx.fillStyle = '#8b949e';
                            ctx.font = '13px -apple-system, sans-serif';
                            ctx.fillText('Core: ' + patternType + '  (repeats ' + coreLen + ' items)', viz.width / 2, 38);

                            // Draw scrolling shapes
                            var shapeSize = 22;
                            var spacing = 60;
                            var rowY = 120;
                            var startX = -(animOffset % (spacing * coreLen));

                            for (var i = -2; i < 20; i++) {
                                var x = startX + i * spacing;
                                if (x < -spacing || x > viz.width + spacing) continue;
                                var idx = ((i % coreLen) + coreLen) % coreLen;
                                drawShape(ctx, sh[idx], x, rowY, shapeSize, pat[idx]);

                                // Draw label letter
                                var letter = patternType.length <= idx ? '?' : patternType[idx];
                                ctx.fillStyle = '#8b949e';
                                ctx.font = '12px -apple-system, sans-serif';
                                ctx.textAlign = 'center';
                                ctx.textBaseline = 'top';
                                ctx.fillText(letter, x, rowY + shapeSize + 8);
                            }

                            // Draw the core highlighted at the bottom
                            ctx.fillStyle = '#f0f6fc';
                            ctx.font = 'bold 14px -apple-system, sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'top';
                            ctx.fillText('The Core:', viz.width / 2, 190);

                            var coreStartX = viz.width / 2 - (coreLen * spacing) / 2 + spacing / 2;
                            // Highlight box behind core
                            ctx.fillStyle = 'rgba(88, 166, 255, 0.08)';
                            ctx.strokeStyle = '#58a6ff44';
                            ctx.lineWidth = 2;
                            var boxX = coreStartX - spacing / 2 + 5;
                            var boxW = coreLen * spacing - 10;
                            ctx.beginPath();
                            ctx.roundRect(boxX, 208, boxW, 46, 8);
                            ctx.fill();
                            ctx.stroke();

                            for (var c = 0; c < coreLen; c++) {
                                drawShape(ctx, sh[c], coreStartX + c * spacing, 231, 16, pat[c]);
                            }
                        }

                        viz.animate(draw);
                        return viz;
                    }
                },
                {
                    id: 'ch05-viz-growing-pattern',
                    title: 'Growing Pattern Explorer',
                    description: 'See how a growing pattern gets bigger step by step! Each bar shows the next number in the pattern.',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, {
                            width: 600, height: 280, scale: 1,
                            originX: 0, originY: 0
                        });

                        var rule = 'add2';
                        var rules = {
                            'add1': { label: '+1', fn: function(n) { return n; }, color: '#3fb950' },
                            'add2': { label: '+2', fn: function(n) { return n * 2; }, color: '#58a6ff' },
                            'add3': { label: '+3', fn: function(n) { return n * 3; }, color: '#f0883e' },
                            'double': { label: 'x2', fn: function(n) { return Math.pow(2, n - 1); }, color: '#bc8cff' }
                        };
                        var ruleNames = ['add1', 'add2', 'add3', 'double'];
                        var ruleButtons = {};

                        var btnGroup = document.createElement('div');
                        btnGroup.style.cssText = 'display:flex;gap:6px;flex-wrap:wrap;';
                        ruleNames.forEach(function(name) {
                            var r = rules[name];
                            var btn = document.createElement('button');
                            btn.textContent = r.label;
                            btn.style.cssText = 'padding:5px 12px;border:2px solid ' + (name === rule ? r.color : '#30363d') + ';border-radius:6px;background:' + (name === rule ? r.color : '#1a1a40') + ';color:#f0f6fc;font-size:0.82rem;font-weight:bold;cursor:pointer;';
                            btn.addEventListener('click', function() {
                                rule = name;
                                ruleNames.forEach(function(n) {
                                    ruleButtons[n].style.background = n === name ? rules[n].color : '#1a1a40';
                                    ruleButtons[n].style.borderColor = n === name ? rules[n].color : '#30363d';
                                });
                                draw();
                            });
                            ruleButtons[name] = btn;
                            btnGroup.appendChild(btn);
                        });
                        controls.appendChild(btnGroup);

                        function draw() {
                            var ctx = viz.ctx;
                            ctx.fillStyle = '#0c0c20';
                            ctx.fillRect(0, 0, viz.width, viz.height);

                            var r = rules[rule];
                            var count = 10;
                            var values = [];
                            for (var i = 1; i <= count; i++) {
                                values.push(r.fn(i));
                            }
                            var maxVal = Math.max.apply(null, values);

                            // Title
                            ctx.fillStyle = '#f0f6fc';
                            ctx.font = 'bold 16px -apple-system, sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'top';
                            ctx.fillText('Growing Pattern: ' + r.label + ' each step', viz.width / 2, 10);

                            // Draw bars
                            var barW = 40;
                            var gap = 14;
                            var totalW = count * barW + (count - 1) * gap;
                            var startX = (viz.width - totalW) / 2;
                            var barBottom = 240;
                            var maxBarH = 170;

                            for (var j = 0; j < count; j++) {
                                var barH = (values[j] / maxVal) * maxBarH;
                                if (barH < 4) barH = 4;
                                var bx = startX + j * (barW + gap);
                                var by = barBottom - barH;

                                // Bar with gradient feel
                                ctx.fillStyle = r.color;
                                ctx.beginPath();
                                ctx.roundRect(bx, by, barW, barH, [4, 4, 0, 0]);
                                ctx.fill();

                                // Glow on top
                                ctx.fillStyle = r.color + '44';
                                ctx.fillRect(bx, by, barW, 3);

                                // Value label on top of bar
                                ctx.fillStyle = '#f0f6fc';
                                ctx.font = 'bold 13px -apple-system, sans-serif';
                                ctx.textAlign = 'center';
                                ctx.textBaseline = 'bottom';
                                ctx.fillText(String(values[j]), bx + barW / 2, by - 4);

                                // Step number below
                                ctx.fillStyle = '#8b949e';
                                ctx.font = '11px -apple-system, sans-serif';
                                ctx.textBaseline = 'top';
                                ctx.fillText('Step ' + (j + 1), bx + barW / 2, barBottom + 4);
                            }
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'What is the core of this repeating pattern? <br><strong>Star, Heart, Heart, Star, Heart, Heart, Star, Heart, Heart, ...</strong>',
                    hint: 'Look for the smallest group of items that repeats over and over.',
                    solution: 'The core is <strong>ABB</strong> or <strong>Star, Heart, Heart</strong>. This group of 3 items repeats again and again!'
                },
                {
                    question: 'Fill in the blanks: 3, 6, 9, ___, ___, ___ <br>What is the rule?',
                    hint: 'Find the difference between each pair of neighboring numbers.',
                    solution: 'The next three numbers are <strong>12, 15, 18</strong>. The rule is <strong>add 3</strong> each time. This is also the same as skip counting by 3s!'
                },
                {
                    question: 'Is this a repeating pattern or a growing pattern? <br><strong>1, 4, 9, 16, 25, ...</strong>',
                    hint: 'Are the differences between the numbers always the same, or do they change?',
                    solution: 'This is a <strong>growing pattern</strong>! The differences are 3, 5, 7, 9, ... (they get bigger). These are actually the <em>perfect square numbers</em>: \\(1^2, 2^2, 3^2, 4^2, 5^2\\), ...'
                }
            ]
        },

        // ============================================================
        // Section 2: Number Sequences
        // ============================================================
        {
            id: 'ch05-sec02',
            title: 'Number Sequences',
            content: `
                <h2>Number Sequences</h2>

                <p>A <strong>number sequence</strong> is a list of numbers that follows a rule. If you figure out the rule, you can find any number in the sequence, no matter how far along it goes!</p>

                <div class="env-block intuition">
                    <div class="env-title">Discovery</div>
                    <div class="env-body">
                        <p>Think of a number sequence like a secret code. Once you crack the code (the rule), you can predict every number that comes next. You are basically a number detective!</p>
                    </div>
                </div>

                <h3>Skip Counting</h3>

                <p>The easiest number sequences come from <strong>skip counting</strong>. Instead of counting 1, 2, 3, 4, ... you skip ahead by a certain amount each time.</p>

                <div class="env-block example">
                    <div class="env-title">Example: Skip Counting</div>
                    <div class="env-body">
                        <p><strong>By 2s:</strong> 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, ...</p>
                        <p><strong>By 5s:</strong> 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, ...</p>
                        <p><strong>By 10s:</strong> 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, ...</p>
                        <p><strong>By 3s:</strong> 3, 6, 9, 12, 15, 18, 21, 24, 27, 30, ...</p>
                        <p>Each of these uses a simple rule: <em>add the same number each time</em>.</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="ch05-viz-skip-count"></div>

                <h3>Arithmetic Sequences</h3>

                <p>When you add the <em>same number</em> to get from one term to the next, mathematicians call it an <strong>arithmetic sequence</strong> (pronounced "air-ith-MET-ik"). The number you add each time is called the <strong>common difference</strong>.</p>

                <div class="env-block example">
                    <div class="env-title">Example</div>
                    <div class="env-body">
                        <p>Sequence: 4, 7, 10, 13, 16, 19, ...</p>
                        <p>The common difference is <strong>3</strong>, because \\(7 - 4 = 3\\), \\(10 - 7 = 3\\), \\(13 - 10 = 3\\), and so on.</p>
                        <p>So the rule is: <em>start at 4 and add 3 each time</em>.</p>
                    </div>
                </div>

                <h3>What Comes Next?</h3>

                <p>The big question with any sequence is: <strong>What comes next?</strong> Here is a strategy to figure it out:</p>

                <ol>
                    <li><strong>Look at the differences.</strong> Subtract each number from the next one.</li>
                    <li><strong>Are the differences the same?</strong> Then you have an arithmetic sequence &mdash; just keep adding!</li>
                    <li><strong>Are the differences changing?</strong> Then look at the differences of the differences. It might be a growing pattern!</li>
                </ol>

                <div class="viz-placeholder" data-viz="ch05-viz-find-rule"></div>

                <div class="env-block intuition">
                    <div class="env-title">Cool Fact</div>
                    <div class="env-body">
                        <p>A famous story says that young Carl Friedrich Gauss, who grew up to be one of the greatest mathematicians ever, was asked by his teacher to add up all numbers from 1 to 100. While other students started adding one by one, Gauss noticed a pattern: \\(1 + 100 = 101\\), \\(2 + 99 = 101\\), \\(3 + 98 = 101\\), ... That gives 50 pairs of 101, so the answer is \\(50 \\times 101 = 5050\\). Done in seconds!</p>
                    </div>
                </div>

                <div class="env-block warning">
                    <div class="env-title">Watch Out!</div>
                    <div class="env-body">
                        <p>Not every list of numbers is an arithmetic sequence! The sequence 1, 2, 4, 8, 16 ... is NOT arithmetic because the differences are 1, 2, 4, 8 (they keep changing). This is a <strong>geometric</strong> sequence &mdash; each number is <em>multiplied</em> by 2.</p>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'ch05-viz-skip-count',
                    title: 'Skip Counting Number Line',
                    description: 'Watch the frog hop along the number line! Change the skip size to see different counting patterns.',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, {
                            width: 600, height: 240, scale: 1,
                            originX: 0, originY: 0
                        });

                        var skipBy = 2;
                        var animPos = 0;
                        var lastTime = null;
                        var paused = false;

                        var skipValues = [2, 3, 5, 10];
                        var skipColors = { 2: '#3fb950', 3: '#58a6ff', 5: '#f0883e', 10: '#bc8cff' };
                        var skipBtns = {};

                        var btnGroup = document.createElement('div');
                        btnGroup.style.cssText = 'display:flex;gap:6px;flex-wrap:wrap;';
                        skipValues.forEach(function(sv) {
                            var btn = document.createElement('button');
                            btn.textContent = 'Skip by ' + sv;
                            var c = skipColors[sv];
                            btn.style.cssText = 'padding:5px 12px;border:2px solid ' + (sv === skipBy ? c : '#30363d') + ';border-radius:6px;background:' + (sv === skipBy ? c : '#1a1a40') + ';color:#f0f6fc;font-size:0.82rem;font-weight:bold;cursor:pointer;';
                            btn.addEventListener('click', function() {
                                skipBy = sv;
                                animPos = 0;
                                lastTime = null;
                                skipValues.forEach(function(v) {
                                    skipBtns[v].style.background = v === sv ? skipColors[v] : '#1a1a40';
                                    skipBtns[v].style.borderColor = v === sv ? skipColors[v] : '#30363d';
                                });
                            });
                            skipBtns[sv] = btn;
                            btnGroup.appendChild(btn);
                        });
                        controls.appendChild(btnGroup);

                        var pauseBtn = document.createElement('button');
                        pauseBtn.textContent = 'Pause';
                        pauseBtn.style.cssText = 'padding:5px 12px;border:1px solid #30363d;border-radius:6px;background:#1a1a40;color:#c9d1d9;font-size:0.82rem;cursor:pointer;margin-left:6px;';
                        pauseBtn.addEventListener('click', function() {
                            paused = !paused;
                            pauseBtn.textContent = paused ? 'Play' : 'Pause';
                        });
                        controls.appendChild(pauseBtn);

                        function draw(t) {
                            if (lastTime === null) lastTime = t;
                            var dt = (t - lastTime) / 1000;
                            lastTime = t;

                            if (!paused) {
                                animPos += dt * 0.7;
                            }

                            var totalHops = Math.floor(50 / skipBy);
                            var currentHop = animPos % (totalHops + 2);
                            var hopIndex = Math.floor(currentHop);
                            var hopFrac = currentHop - hopIndex;

                            var ctx = viz.ctx;
                            ctx.fillStyle = '#0c0c20';
                            ctx.fillRect(0, 0, viz.width, viz.height);

                            var color = skipColors[skipBy];

                            // Title
                            ctx.fillStyle = '#f0f6fc';
                            ctx.font = 'bold 16px -apple-system, sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'top';
                            ctx.fillText('Skip Counting by ' + skipBy + 's', viz.width / 2, 8);

                            // Number line
                            var nlY = 150;
                            var nlLeft = 30;
                            var nlRight = viz.width - 30;
                            var maxNum = 50;
                            var pxPerUnit = (nlRight - nlLeft) / maxNum;

                            ctx.strokeStyle = '#4a4a7a';
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            ctx.moveTo(nlLeft, nlY);
                            ctx.lineTo(nlRight, nlY);
                            ctx.stroke();

                            // Tick marks
                            for (var i = 0; i <= maxNum; i += skipBy) {
                                var tx = nlLeft + i * pxPerUnit;
                                var isLanded = (i / skipBy) <= hopIndex;
                                ctx.strokeStyle = isLanded ? color : '#4a4a7a';
                                ctx.lineWidth = isLanded ? 3 : 1;
                                ctx.beginPath();
                                ctx.moveTo(tx, nlY - 8);
                                ctx.lineTo(tx, nlY + 8);
                                ctx.stroke();

                                // Number label
                                ctx.fillStyle = isLanded ? color : '#6a6a8a';
                                ctx.font = (isLanded ? 'bold ' : '') + '12px -apple-system, sans-serif';
                                ctx.textAlign = 'center';
                                ctx.textBaseline = 'top';
                                ctx.fillText(String(i), tx, nlY + 12);

                                // Dot on landed positions
                                if (isLanded && i > 0) {
                                    ctx.fillStyle = color;
                                    ctx.beginPath();
                                    ctx.arc(tx, nlY, 5, 0, Math.PI * 2);
                                    ctx.fill();
                                }
                            }

                            // Draw hop arcs for completed hops
                            for (var h = 0; h < Math.min(hopIndex, totalHops); h++) {
                                var fromX = nlLeft + h * skipBy * pxPerUnit;
                                var toX = nlLeft + (h + 1) * skipBy * pxPerUnit;
                                var midX = (fromX + toX) / 2;
                                var arcH = 30;

                                ctx.strokeStyle = color + '44';
                                ctx.lineWidth = 2;
                                ctx.beginPath();
                                ctx.moveTo(fromX, nlY);
                                ctx.quadraticCurveTo(midX, nlY - arcH, toX, nlY);
                                ctx.stroke();
                            }

                            // Draw frog (a simple circle with eyes)
                            if (hopIndex <= totalHops) {
                                var frogFrom = hopIndex * skipBy;
                                var frogTo = Math.min((hopIndex + 1) * skipBy, maxNum);
                                var frogNum = frogFrom + (frogTo - frogFrom) * Math.min(hopFrac, 1);
                                var frogX = nlLeft + frogNum * pxPerUnit;
                                var bounceH = Math.sin(Math.min(hopFrac, 1) * Math.PI) * 35;
                                var frogY = nlY - bounceH - 15;

                                // Shadow
                                ctx.fillStyle = 'rgba(0,0,0,0.2)';
                                ctx.beginPath();
                                ctx.ellipse(frogX, nlY - 2, 10, 3, 0, 0, Math.PI * 2);
                                ctx.fill();

                                // Frog body
                                ctx.shadowColor = color;
                                ctx.shadowBlur = 12;
                                ctx.fillStyle = color;
                                ctx.beginPath();
                                ctx.arc(frogX, frogY, 12, 0, Math.PI * 2);
                                ctx.fill();
                                ctx.shadowBlur = 0;

                                // Eyes
                                ctx.fillStyle = '#ffffff';
                                ctx.beginPath();
                                ctx.arc(frogX - 5, frogY - 4, 4, 0, Math.PI * 2);
                                ctx.fill();
                                ctx.beginPath();
                                ctx.arc(frogX + 5, frogY - 4, 4, 0, Math.PI * 2);
                                ctx.fill();
                                ctx.fillStyle = '#0c0c20';
                                ctx.beginPath();
                                ctx.arc(frogX - 5, frogY - 4, 2, 0, Math.PI * 2);
                                ctx.fill();
                                ctx.beginPath();
                                ctx.arc(frogX + 5, frogY - 4, 2, 0, Math.PI * 2);
                                ctx.fill();
                            }

                            // Sequence text at bottom
                            var seq = [];
                            for (var s = skipBy; s <= Math.min(hopIndex * skipBy, maxNum); s += skipBy) {
                                seq.push(s);
                            }
                            ctx.fillStyle = color;
                            ctx.font = 'bold 14px -apple-system, sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'top';
                            var seqStr = seq.join(', ');
                            if (seqStr.length > 60) seqStr = seqStr.substring(0, 57) + '...';
                            ctx.fillText(seqStr || '...', viz.width / 2, 195);

                            // Rule label
                            ctx.fillStyle = '#8b949e';
                            ctx.font = '12px -apple-system, sans-serif';
                            ctx.fillText('Rule: add ' + skipBy + ' each time', viz.width / 2, 218);
                        }

                        viz.animate(draw);
                        return viz;
                    }
                },
                {
                    id: 'ch05-viz-find-rule',
                    title: 'Find the Rule!',
                    description: 'Look at each sequence and figure out the rule. Click "Show Rule" to check your answer!',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, {
                            width: 600, height: 300, scale: 1,
                            originX: 0, originY: 0
                        });

                        var sequences = [
                            { nums: [2, 5, 8, 11, 14, 17, 20], rule: 'Add 3 each time', diff: 3, color: '#58a6ff' },
                            { nums: [10, 20, 30, 40, 50, 60, 70], rule: 'Add 10 each time', diff: 10, color: '#3fb950' },
                            { nums: [7, 12, 17, 22, 27, 32, 37], rule: 'Add 5 each time', diff: 5, color: '#f0883e' },
                            { nums: [100, 96, 92, 88, 84, 80, 76], rule: 'Subtract 4 each time', diff: -4, color: '#bc8cff' },
                            { nums: [1, 3, 6, 10, 15, 21, 28], rule: 'Add 2, then 3, then 4, ... (triangular!)', diff: 'varies', color: '#f778ba' }
                        ];

                        var currentSeq = 0;
                        var showRule = false;

                        var nextBtn = document.createElement('button');
                        nextBtn.textContent = 'Next Sequence';
                        nextBtn.style.cssText = 'padding:5px 12px;border:2px solid #58a6ff;border-radius:6px;background:#1a1a40;color:#f0f6fc;font-size:0.82rem;font-weight:bold;cursor:pointer;';
                        nextBtn.addEventListener('click', function() {
                            currentSeq = (currentSeq + 1) % sequences.length;
                            showRule = false;
                            ruleBtn.textContent = 'Show Rule';
                            draw();
                        });
                        controls.appendChild(nextBtn);

                        var ruleBtn = document.createElement('button');
                        ruleBtn.textContent = 'Show Rule';
                        ruleBtn.style.cssText = 'padding:5px 12px;border:2px solid #3fb950;border-radius:6px;background:#1a1a40;color:#f0f6fc;font-size:0.82rem;font-weight:bold;cursor:pointer;margin-left:6px;';
                        ruleBtn.addEventListener('click', function() {
                            showRule = !showRule;
                            ruleBtn.textContent = showRule ? 'Hide Rule' : 'Show Rule';
                            draw();
                        });
                        controls.appendChild(ruleBtn);

                        function draw() {
                            var ctx = viz.ctx;
                            ctx.fillStyle = '#0c0c20';
                            ctx.fillRect(0, 0, viz.width, viz.height);

                            var seq = sequences[currentSeq];
                            var nums = seq.nums;

                            // Title
                            ctx.fillStyle = '#f0f6fc';
                            ctx.font = 'bold 16px -apple-system, sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'top';
                            ctx.fillText('What is the rule? (Puzzle ' + (currentSeq + 1) + '/' + sequences.length + ')', viz.width / 2, 12);

                            // Draw numbers in circles
                            var spacing = 70;
                            var totalW = (nums.length - 1) * spacing;
                            var startX = (viz.width - totalW) / 2;
                            var numY = 90;

                            for (var i = 0; i < nums.length; i++) {
                                var cx = startX + i * spacing;

                                // Circle
                                ctx.fillStyle = seq.color + '22';
                                ctx.strokeStyle = seq.color;
                                ctx.lineWidth = 2;
                                ctx.beginPath();
                                ctx.arc(cx, numY, 24, 0, Math.PI * 2);
                                ctx.fill();
                                ctx.stroke();

                                // Number
                                ctx.fillStyle = seq.color;
                                ctx.font = 'bold 18px -apple-system, sans-serif';
                                ctx.textAlign = 'center';
                                ctx.textBaseline = 'middle';
                                ctx.fillText(String(nums[i]), cx, numY);

                                // Arrow and difference between numbers
                                if (i < nums.length - 1 && showRule) {
                                    var nx = startX + (i + 1) * spacing;
                                    var diff = nums[i + 1] - nums[i];
                                    var diffLabel = diff >= 0 ? '+' + diff : String(diff);

                                    // Arrow
                                    ctx.strokeStyle = '#8b949e';
                                    ctx.lineWidth = 1;
                                    ctx.beginPath();
                                    ctx.moveTo(cx + 26, numY - 30);
                                    ctx.quadraticCurveTo((cx + nx) / 2, numY - 55, nx - 26, numY - 30);
                                    ctx.stroke();

                                    // Arrow head
                                    ctx.fillStyle = '#8b949e';
                                    ctx.beginPath();
                                    ctx.moveTo(nx - 26, numY - 30);
                                    ctx.lineTo(nx - 32, numY - 38);
                                    ctx.lineTo(nx - 22, numY - 36);
                                    ctx.closePath();
                                    ctx.fill();

                                    // Difference label
                                    ctx.fillStyle = '#d29922';
                                    ctx.font = 'bold 13px -apple-system, sans-serif';
                                    ctx.fillText(diffLabel, (cx + nx) / 2, numY - 55);
                                }
                            }

                            // Question mark for next number
                            var qx = startX + nums.length * spacing;
                            if (qx < viz.width - 30) {
                                ctx.fillStyle = '#6e768133';
                                ctx.strokeStyle = '#6e7681';
                                ctx.lineWidth = 2;
                                ctx.setLineDash([4, 4]);
                                ctx.beginPath();
                                ctx.arc(qx, numY, 24, 0, Math.PI * 2);
                                ctx.fill();
                                ctx.stroke();
                                ctx.setLineDash([]);

                                ctx.fillStyle = '#6e7681';
                                ctx.font = 'bold 20px -apple-system, sans-serif';
                                ctx.textAlign = 'center';
                                ctx.textBaseline = 'middle';
                                ctx.fillText('?', qx, numY);
                            }

                            // Rule display
                            if (showRule) {
                                ctx.fillStyle = seq.color + '18';
                                ctx.strokeStyle = seq.color + '44';
                                ctx.lineWidth = 2;
                                ctx.beginPath();
                                ctx.roundRect(viz.width / 2 - 180, 160, 360, 50, 8);
                                ctx.fill();
                                ctx.stroke();

                                ctx.fillStyle = '#f0f6fc';
                                ctx.font = 'bold 14px -apple-system, sans-serif';
                                ctx.textAlign = 'center';
                                ctx.textBaseline = 'top';
                                ctx.fillText('Rule: ' + seq.rule, viz.width / 2, 170);

                                // Show the next number
                                if (seq.diff !== 'varies') {
                                    var nextNum = nums[nums.length - 1] + seq.diff;
                                    ctx.fillStyle = '#d29922';
                                    ctx.fillText('Next number: ' + nextNum, viz.width / 2, 192);
                                } else {
                                    var lastDiff = nums[nums.length - 1] - nums[nums.length - 2];
                                    ctx.fillStyle = '#d29922';
                                    ctx.fillText('Next number: ' + (nums[nums.length - 1] + lastDiff + 1), viz.width / 2, 192);
                                }
                            } else {
                                ctx.fillStyle = '#8b949e';
                                ctx.font = '14px -apple-system, sans-serif';
                                ctx.textAlign = 'center';
                                ctx.textBaseline = 'top';
                                ctx.fillText('Can you figure out the rule? Click "Show Rule" to check!', viz.width / 2, 170);
                            }

                            // Sequence number
                            ctx.fillStyle = '#6e7681';
                            ctx.font = '12px -apple-system, sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'bottom';
                            ctx.fillText('Sequence ' + (currentSeq + 1) + ' of ' + sequences.length, viz.width / 2, viz.height - 8);
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Count by 3s starting from 3. Write the first 8 numbers in the sequence.',
                    hint: 'Start with 3. To get the next number, add 3. Keep going!',
                    solution: '<strong>3, 6, 9, 12, 15, 18, 21, 24</strong>. Each number is 3 more than the one before.'
                },
                {
                    question: 'What is the common difference in this sequence? <br>5, 13, 21, 29, 37, ...',
                    hint: 'Subtract the first number from the second: \\(13 - 5 = ?\\)',
                    solution: 'The common difference is <strong>8</strong>. Check: \\(13 - 5 = 8\\), \\(21 - 13 = 8\\), \\(29 - 21 = 8\\), \\(37 - 29 = 8\\). The next number would be \\(37 + 8 = 45\\).'
                },
                {
                    question: 'Find the next two numbers: 50, 45, 40, 35, ___, ___',
                    hint: 'This sequence is going down! What number are you subtracting each time?',
                    solution: 'The next two numbers are <strong>30, 25</strong>. The rule is <em>subtract 5 each time</em>. This is like counting backward by 5s!'
                }
            ]
        },

        // ============================================================
        // Section 3: The Hundred Chart
        // ============================================================
        {
            id: 'ch05-sec03',
            title: 'The Hundred Chart',
            content: `
                <h2>The Hundred Chart</h2>

                <p>One of the coolest tools for finding patterns is the <strong>Hundred Chart</strong> &mdash; a grid that shows all the numbers from 1 to 100 arranged in 10 rows of 10. When you color in multiples of different numbers, amazing patterns appear!</p>

                <div class="env-block intuition">
                    <div class="env-title">Discovery</div>
                    <div class="env-body">
                        <p>The hundred chart is like a treasure map for number patterns. Color in the multiples of 2 and you see stripes. Color in the multiples of 3 and you see diagonal lines. Each number has its own unique pattern!</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="ch05-viz-hundred-chart"></div>

                <h3>What Patterns Can You See?</h3>

                <div class="env-block example">
                    <div class="env-title">Try This!</div>
                    <div class="env-body">
                        <p>Use the visualization above to try these explorations:</p>
                        <ul>
                            <li><strong>Multiples of 2:</strong> They make vertical stripes! Every other column is colored.</li>
                            <li><strong>Multiples of 5:</strong> Two vertical columns light up (the 5s and 10s columns).</li>
                            <li><strong>Multiples of 3:</strong> Look for the diagonal stripes going from top-right to bottom-left!</li>
                            <li><strong>Multiples of 9:</strong> A beautiful diagonal pattern appears.</li>
                        </ul>
                    </div>
                </div>

                <h3>Diagonal Patterns</h3>

                <p>Some of the most surprising patterns on the hundred chart are the <strong>diagonals</strong>. When you move diagonally down-right on the chart, you add 11 (one row down plus one column right: \\(10 + 1 = 11\\)). When you move diagonally down-left, you add 9 (one row down minus one column: \\(10 - 1 = 9\\)).</p>

                <div class="env-block example">
                    <div class="env-title">Example: Diagonal Down-Right</div>
                    <div class="env-body">
                        <p>Start at 1 and go diagonally down-right:</p>
                        <p><strong>1, 12, 23, 34, 45, 56, 67, 78, 89, 100</strong></p>
                        <p>The difference is always 11!</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="ch05-viz-hundred-diagonal"></div>

                <div class="env-block remark">
                    <div class="env-title">Think About It</div>
                    <div class="env-body">
                        <p>Why do multiples of 5 always end in 0 or 5? Why do multiples of 10 always end in 0? These patterns connect to place value &mdash; the ideas from Chapter 0! Numbers are all connected.</p>
                    </div>
                </div>

                <div class="env-block warning">
                    <div class="env-title">Watch Out!</div>
                    <div class="env-body">
                        <p>The hundred chart starts at 1, not 0. So the first row is 1-10, the second is 11-20, and so on. Some charts start at 0 &mdash; that changes where the patterns appear! Always check which kind of chart you are using.</p>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'ch05-viz-hundred-chart',
                    title: 'Interactive Hundred Chart',
                    description: 'Choose a number to highlight its multiples on the hundred chart. Watch the patterns appear!',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, {
                            width: 560, height: 560, scale: 1,
                            originX: 0, originY: 0
                        });

                        var highlightNum = 2;
                        var multiColors = {
                            2: '#3fb950', 3: '#58a6ff', 4: '#f0883e', 5: '#bc8cff',
                            6: '#f778ba', 7: '#d29922', 8: '#3fb9a0', 9: '#f85149', 10: '#58a6ff'
                        };

                        var btnGroup = document.createElement('div');
                        btnGroup.style.cssText = 'display:flex;gap:4px;flex-wrap:wrap;';
                        var mBtns = {};
                        for (var m = 2; m <= 10; m++) {
                            (function(num) {
                                var btn = document.createElement('button');
                                btn.textContent = 'x' + num;
                                var c = multiColors[num];
                                btn.style.cssText = 'padding:4px 10px;border:2px solid ' + (num === highlightNum ? c : '#30363d') + ';border-radius:5px;background:' + (num === highlightNum ? c : '#1a1a40') + ';color:#f0f6fc;font-size:0.78rem;font-weight:bold;cursor:pointer;min-width:36px;';
                                btn.addEventListener('click', function() {
                                    highlightNum = num;
                                    for (var k = 2; k <= 10; k++) {
                                        mBtns[k].style.background = k === num ? multiColors[k] : '#1a1a40';
                                        mBtns[k].style.borderColor = k === num ? multiColors[k] : '#30363d';
                                    }
                                    draw();
                                });
                                mBtns[num] = btn;
                                btnGroup.appendChild(btn);
                            })(m);
                        }
                        controls.appendChild(btnGroup);

                        function draw() {
                            var ctx = viz.ctx;
                            ctx.fillStyle = '#0c0c20';
                            ctx.fillRect(0, 0, viz.width, viz.height);

                            var color = multiColors[highlightNum];
                            var cellSize = 48;
                            var gap = 3;
                            var gridLeft = (viz.width - 10 * (cellSize + gap)) / 2;
                            var gridTop = 40;

                            // Title
                            ctx.fillStyle = '#f0f6fc';
                            ctx.font = 'bold 16px -apple-system, sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'top';
                            ctx.fillText('Multiples of ' + highlightNum + ' on the Hundred Chart', viz.width / 2, 10);

                            var multiCount = 0;
                            for (var row = 0; row < 10; row++) {
                                for (var col = 0; col < 10; col++) {
                                    var num = row * 10 + col + 1;
                                    var cx = gridLeft + col * (cellSize + gap);
                                    var cy = gridTop + row * (cellSize + gap);
                                    var isMultiple = (num % highlightNum === 0);

                                    if (isMultiple) {
                                        multiCount++;
                                        ctx.fillStyle = color;
                                        ctx.shadowColor = color;
                                        ctx.shadowBlur = 6;
                                    } else {
                                        ctx.fillStyle = '#1a1a40';
                                        ctx.shadowBlur = 0;
                                    }
                                    ctx.beginPath();
                                    ctx.roundRect(cx, cy, cellSize, cellSize, 4);
                                    ctx.fill();
                                    ctx.shadowBlur = 0;

                                    // Border
                                    ctx.strokeStyle = isMultiple ? color : '#2a2a50';
                                    ctx.lineWidth = isMultiple ? 2 : 0.5;
                                    ctx.beginPath();
                                    ctx.roundRect(cx, cy, cellSize, cellSize, 4);
                                    ctx.stroke();

                                    // Number
                                    ctx.fillStyle = isMultiple ? '#ffffff' : '#6a6a8a';
                                    ctx.font = (isMultiple ? 'bold ' : '') + '14px -apple-system, sans-serif';
                                    ctx.textAlign = 'center';
                                    ctx.textBaseline = 'middle';
                                    ctx.fillText(String(num), cx + cellSize / 2, cy + cellSize / 2);
                                }
                            }

                            // Count at bottom
                            ctx.fillStyle = color;
                            ctx.font = 'bold 14px -apple-system, sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'top';
                            ctx.fillText('There are ' + multiCount + ' multiples of ' + highlightNum + ' from 1 to 100', viz.width / 2, gridTop + 10 * (cellSize + gap) + 8);
                        }

                        draw();
                        return viz;
                    }
                },
                {
                    id: 'ch05-viz-hundred-diagonal',
                    title: 'Diagonal Patterns on the Hundred Chart',
                    description: 'Click a cell to see the diagonals that pass through it! Blue goes down-right (+11), orange goes down-left (+9).',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, {
                            width: 560, height: 560, scale: 1,
                            originX: 0, originY: 0
                        });

                        var selectedCell = 1;
                        var showMode = 'both'; // 'right', 'left', 'both'

                        var modeNames = ['Down-Right (+11)', 'Down-Left (+9)', 'Both Diagonals'];
                        var modeKeys = ['right', 'left', 'both'];
                        var modeBtns = {};

                        var btnGroup = document.createElement('div');
                        btnGroup.style.cssText = 'display:flex;gap:6px;flex-wrap:wrap;';
                        modeKeys.forEach(function(key, idx) {
                            var btn = document.createElement('button');
                            btn.textContent = modeNames[idx];
                            btn.style.cssText = 'padding:4px 10px;border:2px solid ' + (key === showMode ? '#58a6ff' : '#30363d') + ';border-radius:5px;background:' + (key === showMode ? '#58a6ff' : '#1a1a40') + ';color:#f0f6fc;font-size:0.78rem;font-weight:bold;cursor:pointer;';
                            btn.addEventListener('click', function() {
                                showMode = key;
                                modeKeys.forEach(function(k) {
                                    modeBtns[k].style.background = k === key ? '#58a6ff' : '#1a1a40';
                                    modeBtns[k].style.borderColor = k === key ? '#58a6ff' : '#30363d';
                                });
                                draw();
                            });
                            modeBtns[key] = btn;
                            btnGroup.appendChild(btn);
                        });
                        controls.appendChild(btnGroup);

                        // Click handler on canvas
                        viz.canvas.addEventListener('click', function(e) {
                            var rect = viz.canvas.getBoundingClientRect();
                            var mx = e.clientX - rect.left;
                            var my = e.clientY - rect.top;

                            var cellSize = 48;
                            var gap = 3;
                            var gridLeft = (viz.width - 10 * (cellSize + gap)) / 2;
                            var gridTop = 40;

                            var col = Math.floor((mx - gridLeft) / (cellSize + gap));
                            var row = Math.floor((my - gridTop) / (cellSize + gap));

                            if (col >= 0 && col < 10 && row >= 0 && row < 10) {
                                selectedCell = row * 10 + col + 1;
                                draw();
                            }
                        });

                        function getDiagonal(start, step) {
                            var result = [];
                            var n = start;
                            // Go backward first
                            while (n - step >= 1) {
                                var prevN = n - step;
                                // Check it stays on the expected diagonal
                                var prevRow = Math.floor((prevN - 1) / 10);
                                var prevCol = (prevN - 1) % 10;
                                var curRow = Math.floor((n - 1) / 10);
                                var curCol = (n - 1) % 10;
                                if (step === 11 && (curCol - prevCol !== 1)) break;
                                if (step === 9 && (prevCol - curCol !== 1)) break;
                                n = prevN;
                            }
                            // Go forward
                            while (n >= 1 && n <= 100) {
                                result.push(n);
                                var nextN = n + step;
                                if (nextN > 100) break;
                                var nRow = Math.floor((n - 1) / 10);
                                var nCol = (n - 1) % 10;
                                var nnRow = Math.floor((nextN - 1) / 10);
                                var nnCol = (nextN - 1) % 10;
                                if (step === 11 && (nnCol - nCol !== 1)) break;
                                if (step === 9 && (nCol - nnCol !== 1)) break;
                                n = nextN;
                            }
                            return result;
                        }

                        function draw() {
                            var ctx = viz.ctx;
                            ctx.fillStyle = '#0c0c20';
                            ctx.fillRect(0, 0, viz.width, viz.height);

                            var cellSize = 48;
                            var gap = 3;
                            var gridLeft = (viz.width - 10 * (cellSize + gap)) / 2;
                            var gridTop = 40;

                            // Title
                            ctx.fillStyle = '#f0f6fc';
                            ctx.font = 'bold 16px -apple-system, sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'top';
                            ctx.fillText('Diagonal Patterns (click a cell!)', viz.width / 2, 10);

                            // Compute diagonals
                            var rightDiag = (showMode === 'right' || showMode === 'both') ? getDiagonal(selectedCell, 11) : [];
                            var leftDiag = (showMode === 'left' || showMode === 'both') ? getDiagonal(selectedCell, 9) : [];

                            for (var row = 0; row < 10; row++) {
                                for (var col = 0; col < 10; col++) {
                                    var num = row * 10 + col + 1;
                                    var cx = gridLeft + col * (cellSize + gap);
                                    var cy = gridTop + row * (cellSize + gap);

                                    var inRight = rightDiag.indexOf(num) !== -1;
                                    var inLeft = leftDiag.indexOf(num) !== -1;
                                    var isSelected = (num === selectedCell);

                                    if (isSelected) {
                                        ctx.fillStyle = '#d29922';
                                        ctx.shadowColor = '#d29922';
                                        ctx.shadowBlur = 10;
                                    } else if (inRight && inLeft) {
                                        ctx.fillStyle = '#bc8cff';
                                        ctx.shadowBlur = 0;
                                    } else if (inRight) {
                                        ctx.fillStyle = '#58a6ff';
                                        ctx.shadowBlur = 0;
                                    } else if (inLeft) {
                                        ctx.fillStyle = '#f0883e';
                                        ctx.shadowBlur = 0;
                                    } else {
                                        ctx.fillStyle = '#1a1a40';
                                        ctx.shadowBlur = 0;
                                    }
                                    ctx.beginPath();
                                    ctx.roundRect(cx, cy, cellSize, cellSize, 4);
                                    ctx.fill();
                                    ctx.shadowBlur = 0;

                                    ctx.strokeStyle = (inRight || inLeft || isSelected) ? '#ffffff33' : '#2a2a50';
                                    ctx.lineWidth = 0.5;
                                    ctx.beginPath();
                                    ctx.roundRect(cx, cy, cellSize, cellSize, 4);
                                    ctx.stroke();

                                    ctx.fillStyle = (inRight || inLeft || isSelected) ? '#ffffff' : '#6a6a8a';
                                    ctx.font = ((inRight || inLeft || isSelected) ? 'bold ' : '') + '14px -apple-system, sans-serif';
                                    ctx.textAlign = 'center';
                                    ctx.textBaseline = 'middle';
                                    ctx.fillText(String(num), cx + cellSize / 2, cy + cellSize / 2);
                                }
                            }

                            // Legend at bottom
                            var legY = gridTop + 10 * (cellSize + gap) + 8;
                            ctx.font = '12px -apple-system, sans-serif';
                            ctx.textAlign = 'left';
                            ctx.textBaseline = 'top';

                            ctx.fillStyle = '#d29922';
                            ctx.fillRect(gridLeft, legY, 12, 12);
                            ctx.fillStyle = '#c9d1d9';
                            ctx.fillText('Selected: ' + selectedCell, gridLeft + 18, legY);

                            if (showMode === 'right' || showMode === 'both') {
                                ctx.fillStyle = '#58a6ff';
                                ctx.fillRect(gridLeft + 130, legY, 12, 12);
                                ctx.fillStyle = '#c9d1d9';
                                ctx.fillText('Down-Right (+11): ' + rightDiag.join(', '), gridLeft + 148, legY);
                            }

                            if (showMode === 'left' || showMode === 'both') {
                                ctx.fillStyle = '#f0883e';
                                ctx.fillRect(gridLeft, legY + 18, 12, 12);
                                ctx.fillStyle = '#c9d1d9';
                                ctx.fillText('Down-Left (+9): ' + leftDiag.join(', '), gridLeft + 18, legY + 18);
                            }
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'On the hundred chart, how many multiples of 4 are there from 1 to 100?',
                    hint: 'What is \\(100 \\div 4\\)?',
                    solution: 'There are <strong>25</strong> multiples of 4 from 1 to 100. They are: 4, 8, 12, 16, ..., 96, 100. Since \\(100 \\div 4 = 25\\), there are exactly 25 of them.'
                },
                {
                    question: 'On the hundred chart, start at 3 and keep going diagonally down-right. Write the first 5 numbers. What do you add each time?',
                    hint: 'Moving down one row adds 10. Moving right one column adds 1. So moving diagonally down-right adds...',
                    solution: 'The numbers are <strong>3, 14, 25, 36, 47</strong>. You add <strong>11</strong> each time (10 for going down + 1 for going right).'
                },
                {
                    question: 'Which numbers from 1 to 100 are multiples of BOTH 3 and 5?',
                    hint: 'If a number is a multiple of both 3 and 5, what must it be a multiple of?',
                    solution: 'A number that is a multiple of both 3 and 5 must be a multiple of <strong>15</strong>. The multiples of 15 from 1 to 100 are: <strong>15, 30, 45, 60, 75, 90</strong>. That is 6 numbers!'
                }
            ]
        },

        // ============================================================
        // Section 4: Growing Patterns & Figurate Numbers
        // ============================================================
        {
            id: 'ch05-sec04',
            title: 'Growing Patterns & Figurate Numbers',
            content: `
                <h2>Growing Patterns & Figurate Numbers</h2>

                <p>Some of the most beautiful patterns in mathematics come from arranging dots into shapes. Ancient Greek mathematicians discovered these thousands of years ago, and they are still fascinating today!</p>

                <div class="env-block intuition">
                    <div class="env-title">Discovery</div>
                    <div class="env-body">
                        <p><strong>Figurate numbers</strong> are numbers that can be shown as a pattern of dots arranged in a shape, like a triangle or a square. By building these shapes step by step, you can discover amazing rules!</p>
                    </div>
                </div>

                <h3>Triangular Numbers</h3>

                <p>Stack rows of dots where each row has one more dot than the row above it. The total number of dots at each step gives you the <strong>triangular numbers</strong>:</p>

                <p style="text-align:center; font-size:1.2rem;"><strong>1, 3, 6, 10, 15, 21, 28, 36, 45, 55, ...</strong></p>

                <div class="env-block example">
                    <div class="env-title">Example: Building Triangular Numbers</div>
                    <div class="env-body">
                        <p>Step 1: 1 dot (just 1)</p>
                        <p>Step 2: 1 + 2 = <strong>3</strong> dots</p>
                        <p>Step 3: 1 + 2 + 3 = <strong>6</strong> dots</p>
                        <p>Step 4: 1 + 2 + 3 + 4 = <strong>10</strong> dots</p>
                        <p>The \\(n\\)-th triangular number is: \\(T_n = 1 + 2 + 3 + \\cdots + n = \\dfrac{n(n+1)}{2}\\)</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="ch05-viz-triangular"></div>

                <h3>Square Numbers</h3>

                <p>Arrange dots in a perfect square grid. The total number of dots gives you the <strong>square numbers</strong>:</p>

                <p style="text-align:center; font-size:1.2rem;"><strong>1, 4, 9, 16, 25, 36, 49, 64, 81, 100, ...</strong></p>

                <div class="env-block example">
                    <div class="env-title">Example: Building Square Numbers</div>
                    <div class="env-body">
                        <p>Step 1: \\(1 \\times 1 = 1\\) dot</p>
                        <p>Step 2: \\(2 \\times 2 = 4\\) dots</p>
                        <p>Step 3: \\(3 \\times 3 = 9\\) dots</p>
                        <p>Step 4: \\(4 \\times 4 = 16\\) dots</p>
                        <p>The \\(n\\)-th square number is: \\(S_n = n^2 = n \\times n\\)</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="ch05-viz-square-nums"></div>

                <div class="env-block intuition">
                    <div class="env-title">Cool Fact</div>
                    <div class="env-body">
                        <p>Here is a mind-blowing connection: every square number is the sum of two consecutive triangular numbers!</p>
                        <p>\\(1 + 3 = 4 = 2^2\\)</p>
                        <p>\\(3 + 6 = 9 = 3^2\\)</p>
                        <p>\\(6 + 10 = 16 = 4^2\\)</p>
                        <p>Why? Because if you flip a triangle and fit it next to another triangle, you get a square! Try visualizing it with dots.</p>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Think About It</div>
                    <div class="env-body">
                        <p>Notice how much each square number grows: from 1 to 4 is +3, from 4 to 9 is +5, from 9 to 16 is +7, from 16 to 25 is +9. The differences are odd numbers: 3, 5, 7, 9, 11, ... Why? Because adding a new "L-shape" border around a square always uses an odd number of dots!</p>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'ch05-viz-triangular',
                    title: 'Triangular Numbers Builder',
                    description: 'Use the slider to see triangular numbers grow step by step. Watch the dots stack up into a triangle!',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, {
                            width: 600, height: 360, scale: 1,
                            originX: 0, originY: 0
                        });

                        var step = 5;

                        var slider = VizEngine.createSlider(controls, 'Step: ', 1, 10, 5, 1, function(val) {
                            step = Math.round(val);
                            draw();
                        });

                        var rainbow = ['#f85149', '#f0883e', '#d29922', '#3fb950', '#3fb9a0', '#58a6ff', '#bc8cff', '#f778ba', '#f85149', '#f0883e'];

                        function draw() {
                            var ctx = viz.ctx;
                            ctx.fillStyle = '#0c0c20';
                            ctx.fillRect(0, 0, viz.width, viz.height);

                            // Title
                            ctx.fillStyle = '#f0f6fc';
                            ctx.font = 'bold 16px -apple-system, sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'top';
                            var total = step * (step + 1) / 2;
                            ctx.fillText('Triangular Number T(' + step + ') = ' + total, viz.width / 2, 10);

                            // Draw triangle of dots
                            var dotR = Math.max(5, Math.min(16, 120 / step));
                            var spacing = dotR * 2.5;
                            var triHeight = (step - 1) * spacing;
                            var startY = 60 + (240 - triHeight) / 2;

                            for (var row = 1; row <= step; row++) {
                                var dotsInRow = row;
                                var rowWidth = (dotsInRow - 1) * spacing;
                                var rowStartX = viz.width / 2 - rowWidth / 2;
                                var ry = startY + (row - 1) * spacing;

                                for (var col = 0; col < dotsInRow; col++) {
                                    var dx = rowStartX + col * spacing;
                                    var color = rainbow[(row - 1) % rainbow.length];

                                    // Glow
                                    ctx.fillStyle = color + '33';
                                    ctx.beginPath();
                                    ctx.arc(dx, ry, dotR + 3, 0, Math.PI * 2);
                                    ctx.fill();

                                    // Dot
                                    ctx.fillStyle = color;
                                    ctx.beginPath();
                                    ctx.arc(dx, ry, dotR, 0, Math.PI * 2);
                                    ctx.fill();

                                    // Highlight
                                    ctx.fillStyle = 'rgba(255,255,255,0.25)';
                                    ctx.beginPath();
                                    ctx.arc(dx - dotR * 0.25, ry - dotR * 0.25, dotR * 0.3, 0, Math.PI * 2);
                                    ctx.fill();
                                }

                                // Row count label
                                ctx.fillStyle = rainbow[(row - 1) % rainbow.length];
                                ctx.font = 'bold 12px -apple-system, sans-serif';
                                ctx.textAlign = 'left';
                                ctx.textBaseline = 'middle';
                                var labelX = viz.width / 2 + (dotsInRow - 1) * spacing / 2 + dotR + 12;
                                ctx.fillText('+' + row, labelX, ry);
                            }

                            // Sum formula at bottom
                            var parts = [];
                            for (var k = 1; k <= step; k++) parts.push(k);
                            ctx.fillStyle = '#8b949e';
                            ctx.font = '14px -apple-system, sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'top';
                            ctx.fillText(parts.join(' + ') + ' = ' + total, viz.width / 2, startY + triHeight + dotR + 20);

                            // Formula
                            ctx.fillStyle = '#58a6ff';
                            ctx.font = 'bold 13px -apple-system, sans-serif';
                            ctx.fillText('T(' + step + ') = ' + step + ' x ' + (step + 1) + ' / 2 = ' + total, viz.width / 2, startY + triHeight + dotR + 44);
                        }

                        draw();
                        return viz;
                    }
                },
                {
                    id: 'ch05-viz-square-nums',
                    title: 'Square Numbers Builder',
                    description: 'Use the slider to build square numbers. The newest L-shaped border is highlighted in a different color!',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, {
                            width: 600, height: 380, scale: 1,
                            originX: 0, originY: 0
                        });

                        var step = 5;

                        var slider = VizEngine.createSlider(controls, 'Step: ', 1, 10, 5, 1, function(val) {
                            step = Math.round(val);
                            draw();
                        });

                        function draw() {
                            var ctx = viz.ctx;
                            ctx.fillStyle = '#0c0c20';
                            ctx.fillRect(0, 0, viz.width, viz.height);

                            var total = step * step;

                            // Title
                            ctx.fillStyle = '#f0f6fc';
                            ctx.font = 'bold 16px -apple-system, sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'top';
                            ctx.fillText('Square Number S(' + step + ') = ' + step + ' x ' + step + ' = ' + total, viz.width / 2, 10);

                            // Draw square grid of dots
                            var dotR = Math.max(5, Math.min(16, 120 / step));
                            var spacing = dotR * 2.5;
                            var gridSize = (step - 1) * spacing;
                            var startX = viz.width / 2 - gridSize / 2;
                            var startY = 60 + (250 - gridSize) / 2;

                            var innerColor = '#58a6ff';
                            var borderColor = '#f0883e';

                            for (var row = 0; row < step; row++) {
                                for (var col = 0; col < step; col++) {
                                    var dx = startX + col * spacing;
                                    var dy = startY + row * spacing;

                                    // Is this dot part of the newest L-shaped border?
                                    var isNewBorder = (row === step - 1 || col === step - 1);
                                    var color = isNewBorder ? borderColor : innerColor;

                                    // Glow
                                    ctx.fillStyle = color + '33';
                                    ctx.beginPath();
                                    ctx.arc(dx, dy, dotR + 2, 0, Math.PI * 2);
                                    ctx.fill();

                                    // Dot
                                    ctx.fillStyle = color;
                                    ctx.beginPath();
                                    ctx.arc(dx, dy, dotR, 0, Math.PI * 2);
                                    ctx.fill();

                                    // Highlight
                                    ctx.fillStyle = 'rgba(255,255,255,0.2)';
                                    ctx.beginPath();
                                    ctx.arc(dx - dotR * 0.2, dy - dotR * 0.2, dotR * 0.3, 0, Math.PI * 2);
                                    ctx.fill();
                                }
                            }

                            // L-shape count
                            var lCount = step > 1 ? 2 * step - 1 : 1;
                            var prevTotal = step > 1 ? (step - 1) * (step - 1) : 0;

                            // Info at bottom
                            ctx.font = '14px -apple-system, sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'top';
                            var infoY = startY + gridSize + dotR + 20;

                            if (step > 1) {
                                ctx.fillStyle = innerColor;
                                ctx.fillText('Inner square: ' + (step - 1) + ' x ' + (step - 1) + ' = ' + prevTotal + ' dots', viz.width / 2, infoY);
                                ctx.fillStyle = borderColor;
                                ctx.fillText('New L-border: +' + lCount + ' dots (an odd number!)', viz.width / 2, infoY + 22);
                                ctx.fillStyle = '#f0f6fc';
                                ctx.font = 'bold 14px -apple-system, sans-serif';
                                ctx.fillText(prevTotal + ' + ' + lCount + ' = ' + total, viz.width / 2, infoY + 46);
                            } else {
                                ctx.fillStyle = '#f0f6fc';
                                ctx.fillText('Just 1 dot to start!', viz.width / 2, infoY);
                            }
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'What is the 7th triangular number?',
                    hint: 'The 7th triangular number is \\(T_7 = 1 + 2 + 3 + 4 + 5 + 6 + 7\\). Or use the formula: \\(T_n = \\frac{n(n+1)}{2}\\).',
                    solution: '\\(T_7 = 1 + 2 + 3 + 4 + 5 + 6 + 7 = 28\\). Using the formula: \\(\\frac{7 \\times 8}{2} = \\frac{56}{2} = 28\\).'
                },
                {
                    question: 'Is the number 36 both a triangular number AND a square number?',
                    hint: 'Check: Is 36 a perfect square? Is it in the list of triangular numbers (1, 3, 6, 10, 15, 21, 28, 36, ...)?',
                    solution: 'Yes! \\(36 = 6 \\times 6 = 6^2\\), so it is a square number. Also, \\(36 = 1 + 2 + 3 + 4 + 5 + 6 + 7 + 8 = T_8\\), so it is the 8th triangular number. Numbers that are both triangular and square are very special and rare!'
                },
                {
                    question: 'When you go from the 5th square number to the 6th square number, how many new dots are added (the L-shaped border)?',
                    hint: 'The 5th square is \\(5^2 = 25\\). The 6th square is \\(6^2 = 36\\). How many more dots is that? Or use the pattern: the L-border at step \\(n\\) has \\(2n - 1\\) dots.',
                    solution: 'The L-border at step 6 has \\(2 \\times 6 - 1 = 11\\) new dots. Check: \\(36 - 25 = 11\\). The L-borders give the odd numbers: 1, 3, 5, 7, 9, 11, ...'
                }
            ]
        },

        // ============================================================
        // Section 5: Create Your Own Pattern
        // ============================================================
        {
            id: 'ch05-sec05',
            title: 'Create Your Own Pattern',
            content: `
                <h2>Create Your Own Pattern</h2>

                <p>Now it is YOUR turn to be a pattern creator! In this section, you will practice making your own patterns, extending sequences, and solving pattern puzzles.</p>

                <div class="env-block intuition">
                    <div class="env-title">Discovery</div>
                    <div class="env-body">
                        <p>Every pattern starts with a <strong>rule</strong>. Once you decide on a rule, you can build an infinitely long pattern! Being able to create patterns is one of the most important skills in all of mathematics.</p>
                    </div>
                </div>

                <h3>Pattern Rules</h3>

                <p>A <strong>pattern rule</strong> is a clear instruction that tells you how to create each new item in your pattern. Good rules are:</p>
                <ul>
                    <li><strong>Clear:</strong> Anyone can follow them.</li>
                    <li><strong>Consistent:</strong> They work the same way every time.</li>
                    <li><strong>Predictable:</strong> Given the rule, you can find any item in the pattern.</li>
                </ul>

                <div class="env-block example">
                    <div class="env-title">Example: Writing Pattern Rules</div>
                    <div class="env-body">
                        <p>Here are some patterns with their rules:</p>
                        <ul>
                            <li><strong>Pattern:</strong> 5, 10, 15, 20, ... &mdash; <strong>Rule:</strong> Start at 5, add 5 each time.</li>
                            <li><strong>Pattern:</strong> 100, 90, 80, 70, ... &mdash; <strong>Rule:</strong> Start at 100, subtract 10 each time.</li>
                            <li><strong>Pattern:</strong> 2, 6, 18, 54, ... &mdash; <strong>Rule:</strong> Start at 2, multiply by 3 each time.</li>
                            <li><strong>Pattern:</strong> 1, 1, 2, 3, 5, 8, 13, ... &mdash; <strong>Rule:</strong> Add the two previous numbers to get the next one! (This famous pattern is called the <em>Fibonacci sequence</em>.)</li>
                        </ul>
                    </div>
                </div>

                <h3>Extending Patterns</h3>

                <p>One of the best ways to test your pattern skills is to figure out what comes next. Here are some pattern puzzles for you to try!</p>

                <div class="viz-placeholder" data-viz="ch05-viz-pattern-puzzle"></div>

                <h3>Pattern Challenges</h3>

                <div class="env-block example">
                    <div class="env-title">Try This!</div>
                    <div class="env-body">
                        <p>Can you decode these tricky patterns?</p>
                        <ul>
                            <li><strong>1, 4, 9, 16, 25, ?</strong> &mdash; (Hint: these are perfect squares!)</li>
                            <li><strong>1, 1, 2, 3, 5, 8, ?</strong> &mdash; (Hint: add the two previous numbers)</li>
                            <li><strong>2, 3, 5, 7, 11, 13, ?</strong> &mdash; (Hint: these are prime numbers!)</li>
                        </ul>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="ch05-viz-fibonacci"></div>

                <div class="env-block intuition">
                    <div class="env-title">Cool Fact</div>
                    <div class="env-body">
                        <p>The Fibonacci sequence (1, 1, 2, 3, 5, 8, 13, 21, ...) appears everywhere in nature! Sunflowers have 34 or 55 petals (Fibonacci numbers). Pine cones have spirals in Fibonacci numbers. Even the way branches grow on trees follows this pattern. Nature is a mathematician!</p>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Think About It</div>
                    <div class="env-body">
                        <p>You have learned about repeating patterns, arithmetic sequences, the hundred chart, triangular numbers, square numbers, and the Fibonacci sequence. All of these are different kinds of patterns, but they share something in common: they all follow a <em>rule</em>. Mathematics is really the science of patterns!</p>
                    </div>
                </div>

                <div class="env-block warning">
                    <div class="env-title">Watch Out!</div>
                    <div class="env-body">
                        <p>When someone says "what comes next in 1, 2, 4, ...?" there could be more than one correct answer! It could be 8 (doubling), or 7 (add 1, add 2, add 3...), or even something else. A pattern is not fully defined until you know the <em>rule</em>. Always state your rule clearly!</p>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'ch05-viz-pattern-puzzle',
                    title: 'Pattern Puzzle Challenge',
                    description: 'Figure out the next number in each pattern! Type your guess and press Check to see if you are right.',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, {
                            width: 600, height: 300, scale: 1,
                            originX: 0, originY: 0
                        });

                        var puzzles = [
                            { shown: [4, 8, 12, 16, 20], answer: 24, rule: 'Add 4 each time', color: '#3fb950' },
                            { shown: [3, 6, 12, 24, 48], answer: 96, rule: 'Double each time', color: '#58a6ff' },
                            { shown: [50, 43, 36, 29, 22], answer: 15, rule: 'Subtract 7 each time', color: '#f0883e' },
                            { shown: [1, 4, 9, 16, 25], answer: 36, rule: 'Square numbers (n x n)', color: '#bc8cff' },
                            { shown: [2, 3, 5, 8, 13], answer: 21, rule: 'Add the two previous numbers', color: '#f778ba' },
                            { shown: [1, 3, 7, 15, 31], answer: 63, rule: 'Double and add 1', color: '#d29922' }
                        ];

                        var currentPuzzle = 0;
                        var userGuess = '';
                        var feedback = '';
                        var feedbackColor = '';

                        // Next button
                        var nextBtn = document.createElement('button');
                        nextBtn.textContent = 'Next Puzzle';
                        nextBtn.style.cssText = 'padding:5px 12px;border:2px solid #58a6ff;border-radius:6px;background:#1a1a40;color:#f0f6fc;font-size:0.82rem;font-weight:bold;cursor:pointer;';
                        nextBtn.addEventListener('click', function() {
                            currentPuzzle = (currentPuzzle + 1) % puzzles.length;
                            userGuess = '';
                            feedback = '';
                            inputEl.value = '';
                            draw();
                        });
                        controls.appendChild(nextBtn);

                        // Input
                        var inputEl = document.createElement('input');
                        inputEl.type = 'number';
                        inputEl.placeholder = 'Your guess';
                        inputEl.style.cssText = 'width:80px;padding:5px 8px;border:1px solid #30363d;border-radius:6px;background:#1a1a40;color:#f0f6fc;font-size:0.82rem;margin-left:8px;outline:none;';
                        inputEl.addEventListener('input', function() {
                            userGuess = inputEl.value;
                        });
                        controls.appendChild(inputEl);

                        // Check button
                        var checkBtn = document.createElement('button');
                        checkBtn.textContent = 'Check';
                        checkBtn.style.cssText = 'padding:5px 12px;border:2px solid #3fb950;border-radius:6px;background:#3fb950;color:#f0f6fc;font-size:0.82rem;font-weight:bold;cursor:pointer;margin-left:4px;';
                        checkBtn.addEventListener('click', function() {
                            var puzzle = puzzles[currentPuzzle];
                            if (parseInt(userGuess) === puzzle.answer) {
                                feedback = 'Correct! Great job!';
                                feedbackColor = '#3fb950';
                            } else if (userGuess === '') {
                                feedback = 'Type a number first!';
                                feedbackColor = '#d29922';
                            } else {
                                feedback = 'Not quite! Try again, or go to the next puzzle.';
                                feedbackColor = '#f85149';
                            }
                            draw();
                        });
                        controls.appendChild(checkBtn);

                        function draw() {
                            var ctx = viz.ctx;
                            ctx.fillStyle = '#0c0c20';
                            ctx.fillRect(0, 0, viz.width, viz.height);

                            var puzzle = puzzles[currentPuzzle];

                            // Title
                            ctx.fillStyle = '#f0f6fc';
                            ctx.font = 'bold 16px -apple-system, sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'top';
                            ctx.fillText('Pattern Puzzle ' + (currentPuzzle + 1) + '/' + puzzles.length + ': What comes next?', viz.width / 2, 12);

                            // Draw numbers
                            var nums = puzzle.shown;
                            var spacing = 80;
                            var totalW = nums.length * spacing;
                            var startX = (viz.width - totalW) / 2 - 20;
                            var numY = 90;

                            for (var i = 0; i < nums.length; i++) {
                                var cx = startX + i * spacing + spacing / 2;

                                // Circle
                                ctx.fillStyle = puzzle.color + '22';
                                ctx.strokeStyle = puzzle.color;
                                ctx.lineWidth = 2;
                                ctx.beginPath();
                                ctx.arc(cx, numY, 28, 0, Math.PI * 2);
                                ctx.fill();
                                ctx.stroke();

                                // Number
                                ctx.fillStyle = puzzle.color;
                                ctx.font = 'bold 20px -apple-system, sans-serif';
                                ctx.textAlign = 'center';
                                ctx.textBaseline = 'middle';
                                ctx.fillText(String(nums[i]), cx, numY);
                            }

                            // Question mark circle
                            var qx = startX + nums.length * spacing + spacing / 2;
                            ctx.fillStyle = '#d2992233';
                            ctx.strokeStyle = '#d29922';
                            ctx.lineWidth = 2;
                            ctx.setLineDash([5, 5]);
                            ctx.beginPath();
                            ctx.arc(qx, numY, 28, 0, Math.PI * 2);
                            ctx.fill();
                            ctx.stroke();
                            ctx.setLineDash([]);

                            ctx.fillStyle = '#d29922';
                            ctx.font = 'bold 24px -apple-system, sans-serif';
                            ctx.fillText('?', qx, numY);

                            // Feedback
                            if (feedback) {
                                ctx.fillStyle = feedbackColor;
                                ctx.font = 'bold 16px -apple-system, sans-serif';
                                ctx.textAlign = 'center';
                                ctx.textBaseline = 'top';
                                ctx.fillText(feedback, viz.width / 2, 150);

                                if (feedback.indexOf('Correct') !== -1) {
                                    // Show rule
                                    ctx.fillStyle = '#8b949e';
                                    ctx.font = '14px -apple-system, sans-serif';
                                    ctx.fillText('Rule: ' + puzzle.rule, viz.width / 2, 178);

                                    // Show answer in the ? circle
                                    ctx.fillStyle = '#3fb950';
                                    ctx.font = 'bold 20px -apple-system, sans-serif';
                                    ctx.textBaseline = 'middle';
                                    ctx.fillText(String(puzzle.answer), qx, numY);
                                }
                            } else {
                                ctx.fillStyle = '#8b949e';
                                ctx.font = '14px -apple-system, sans-serif';
                                ctx.textAlign = 'center';
                                ctx.textBaseline = 'top';
                                ctx.fillText('Type your guess in the box above and click Check!', viz.width / 2, 155);
                            }

                            // Progress dots
                            var dotY = viz.height - 20;
                            for (var p = 0; p < puzzles.length; p++) {
                                var px = viz.width / 2 + (p - puzzles.length / 2 + 0.5) * 18;
                                ctx.fillStyle = p === currentPuzzle ? '#58a6ff' : '#4a4a7a';
                                ctx.beginPath();
                                ctx.arc(px, dotY, 4, 0, Math.PI * 2);
                                ctx.fill();
                            }
                        }

                        draw();
                        return viz;
                    }
                },
                {
                    id: 'ch05-viz-fibonacci',
                    title: 'The Fibonacci Spiral',
                    description: 'Watch the Fibonacci sequence grow! Each square is the sum of the two before it, creating a beautiful spiral.',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, {
                            width: 600, height: 360, scale: 1,
                            originX: 0, originY: 0
                        });

                        var maxTerms = 10;
                        var animProgress = 0;
                        var lastTime = null;
                        var paused = false;

                        var pauseBtn = document.createElement('button');
                        pauseBtn.textContent = 'Pause';
                        pauseBtn.style.cssText = 'padding:5px 12px;border:1px solid #30363d;border-radius:6px;background:#1a1a40;color:#c9d1d9;font-size:0.82rem;cursor:pointer;';
                        pauseBtn.addEventListener('click', function() {
                            paused = !paused;
                            pauseBtn.textContent = paused ? 'Play' : 'Pause';
                        });
                        controls.appendChild(pauseBtn);

                        var restartBtn = document.createElement('button');
                        restartBtn.textContent = 'Restart';
                        restartBtn.style.cssText = 'padding:5px 12px;border:1px solid #30363d;border-radius:6px;background:#1a1a40;color:#c9d1d9;font-size:0.82rem;cursor:pointer;margin-left:6px;';
                        restartBtn.addEventListener('click', function() {
                            animProgress = 0;
                            lastTime = null;
                        });
                        controls.appendChild(restartBtn);

                        var fibs = [1, 1];
                        for (var fi = 2; fi < maxTerms; fi++) {
                            fibs.push(fibs[fi - 1] + fibs[fi - 2]);
                        }

                        var fibColors = ['#f85149', '#f0883e', '#d29922', '#3fb950', '#3fb9a0', '#58a6ff', '#bc8cff', '#f778ba', '#58a6ff', '#3fb950'];

                        function draw(t) {
                            if (lastTime === null) lastTime = t;
                            var dt = (t - lastTime) / 1000;
                            lastTime = t;

                            if (!paused) {
                                animProgress += dt * 0.8;
                            }
                            var showCount = Math.min(Math.floor(animProgress) + 1, maxTerms);

                            var ctx = viz.ctx;
                            ctx.fillStyle = '#0c0c20';
                            ctx.fillRect(0, 0, viz.width, viz.height);

                            // Title
                            ctx.fillStyle = '#f0f6fc';
                            ctx.font = 'bold 16px -apple-system, sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'top';
                            ctx.fillText('The Fibonacci Sequence', viz.width / 2, 10);

                            // Draw Fibonacci numbers as growing bars
                            var barBottom = 260;
                            var barMaxH = 180;
                            var maxFib = fibs[showCount - 1] || 1;
                            var barW = Math.max(20, Math.min(50, (viz.width - 80) / showCount - 4));
                            var totalBarW = showCount * (barW + 4);
                            var barStartX = (viz.width - totalBarW) / 2;

                            for (var i = 0; i < showCount; i++) {
                                var bh = (fibs[i] / maxFib) * barMaxH;
                                if (bh < 6) bh = 6;
                                var bx = barStartX + i * (barW + 4);
                                var by = barBottom - bh;
                                var color = fibColors[i % fibColors.length];

                                // Bar
                                ctx.fillStyle = color;
                                ctx.beginPath();
                                ctx.roundRect(bx, by, barW, bh, [3, 3, 0, 0]);
                                ctx.fill();

                                // Glow on top
                                ctx.fillStyle = color + '66';
                                ctx.fillRect(bx + 1, by, barW - 2, 2);

                                // Value
                                ctx.fillStyle = '#f0f6fc';
                                ctx.font = 'bold 12px -apple-system, sans-serif';
                                ctx.textAlign = 'center';
                                ctx.textBaseline = 'bottom';
                                ctx.fillText(String(fibs[i]), bx + barW / 2, by - 4);

                                // Index label
                                ctx.fillStyle = '#6a6a8a';
                                ctx.font = '10px -apple-system, sans-serif';
                                ctx.textBaseline = 'top';
                                ctx.fillText('F' + (i + 1), bx + barW / 2, barBottom + 4);
                            }

                            // Show the addition rule
                            if (showCount >= 3) {
                                var lastIdx = showCount - 1;
                                ctx.fillStyle = '#d29922';
                                ctx.font = 'bold 13px -apple-system, sans-serif';
                                ctx.textAlign = 'center';
                                ctx.textBaseline = 'top';
                                ctx.fillText(fibs[lastIdx - 2] + ' + ' + fibs[lastIdx - 1] + ' = ' + fibs[lastIdx], viz.width / 2, barBottom + 22);
                            }

                            // Sequence text
                            var seqText = fibs.slice(0, showCount).join(', ');
                            if (showCount < maxTerms) seqText += ', ...';
                            ctx.fillStyle = '#8b949e';
                            ctx.font = '13px -apple-system, sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'top';
                            ctx.fillText(seqText, viz.width / 2, barBottom + 44);

                            // Rule reminder
                            ctx.fillStyle = '#58a6ff';
                            ctx.font = '12px -apple-system, sans-serif';
                            ctx.fillText('Rule: each number = sum of the two before it', viz.width / 2, viz.height - 16);
                        }

                        viz.animate(draw);
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Write the first 10 Fibonacci numbers.',
                    hint: 'Start with 1, 1. Then add the two previous numbers: \\(1+1=2\\), \\(1+2=3\\), \\(2+3=5\\), ...',
                    solution: 'The first 10 Fibonacci numbers are: <strong>1, 1, 2, 3, 5, 8, 13, 21, 34, 55</strong>.'
                },
                {
                    question: 'Create your own arithmetic sequence that starts at 7 and has a common difference of 6. Write the first 6 terms.',
                    hint: 'Start at 7 and keep adding 6.',
                    solution: '<strong>7, 13, 19, 25, 31, 37</strong>. The rule is: start at 7, add 6 each time.'
                },
                {
                    question: 'Here is a tricky pattern: 1, 2, 4, 7, 11, 16, ___. What comes next? What is the rule?',
                    hint: 'Look at the differences between consecutive numbers: \\(2-1=1\\), \\(4-2=2\\), \\(7-4=3\\), \\(11-7=4\\), \\(16-11=5\\). Do you see a pattern in the differences?',
                    solution: 'The next number is <strong>22</strong>. The differences are 1, 2, 3, 4, 5, 6, ... (increasing by 1 each time). So the next difference is 6, and \\(16 + 6 = 22\\). This is actually the sequence of triangular numbers shifted by 1!'
                }
            ]
        }
    ]
});
