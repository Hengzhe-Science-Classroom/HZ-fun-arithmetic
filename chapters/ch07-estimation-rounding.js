// === Chapter 7: Estimation & Rounding ===
// Fun, colorful, interactive chapter for elementary school kids (ages 7-12)

window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch07',
    number: 7,
    title: 'Estimation & Rounding',
    subtitle: 'Become a number detective — learn to make smart guesses and round like a pro!',
    sections: [

        // ============================================================
        // Section 1: What Is Estimation?
        // ============================================================
        {
            id: 'ch07-sec01',
            title: 'What Is Estimation?',
            content: `
<h2>What Is Estimation?</h2>

<p>Have you ever looked at a jar of candy and tried to guess how many pieces were inside?
That is <strong>estimation</strong> — making a <em>smart guess</em> about a number without
counting every single thing!</p>

<div class="env-block intuition">
    <div class="env-title">Discovery</div>
    <div class="env-body">
        <p>Estimation is not about getting the <em>exact</em> answer. It is about getting
        an answer that is <strong>close enough</strong> to be useful. When someone asks
        "about how many?", they want an estimate!</p>
    </div>
</div>

<h3>Why Does Estimation Matter?</h3>

<p>We use estimation every single day without even thinking about it:</p>
<ul>
    <li><strong>Shopping:</strong> "I have $20. Do I have enough to buy these three things?" You do not need to add every penny — just estimate!</li>
    <li><strong>Cooking:</strong> "This recipe needs about 2 cups of flour." A little more or less is totally fine.</li>
    <li><strong>Time:</strong> "The movie starts in about 30 minutes. Do I have time to walk there?" You estimate the walking time.</li>
    <li><strong>Counting:</strong> "About how many students are in the cafeteria?" You do not need to count each person.</li>
</ul>

<div class="viz-placeholder" data-viz="ch07-viz-jar"></div>

<div class="env-block example">
    <div class="env-title">Example</div>
    <div class="env-body">
        <p>You want to buy a toy that costs \\($4.85\\) and a book that costs \\($3.25\\).
        You have \\($10\\).</p>
        <p><strong>Estimate:</strong> \\($4.85 \\approx $5\\) and \\($3.25 \\approx $3\\).
        So you need about \\($5 + $3 = $8\\). Yes, \\($10\\) is enough!</p>
    </div>
</div>

<h3>Estimation Words</h3>
<p>When we estimate, we use special words like:</p>
<ul>
    <li><em>"about"</em> — "There are about 50 apples."</li>
    <li><em>"approximately"</em> — "It takes approximately 15 minutes."</li>
    <li><em>"roughly"</em> — "There are roughly 200 students."</li>
    <li><em>"close to"</em> — "The jar has close to 100 marbles."</li>
</ul>

<div class="viz-placeholder" data-viz="ch07-viz-estimation-meter"></div>

<div class="env-block remark">
    <div class="env-title">Think About It</div>
    <div class="env-body">
        <p>Estimation is a <strong>superpower</strong>! It helps you check whether your
        math answers make sense. If you calculate \\(48 + 31\\) and get \\(709\\), your
        estimate of \\(50 + 30 = 80\\) tells you something went wrong.</p>
    </div>
</div>
`,
            visualizations: [
                {
                    id: 'ch07-viz-jar',
                    title: 'Guess the Dots!',
                    description: 'How many dots are in the box? Make your best estimate, then click "Show Count" to check!',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, {
                            width: 560, height: 360, scale: 1,
                            originX: 0, originY: 0
                        });

                        var dots = [];
                        var dotCount = 0;
                        var showCount = false;

                        function generateDots() {
                            dots = [];
                            dotCount = 20 + Math.floor(Math.random() * 60); // 20-79 dots
                            showCount = false;
                            var colors = ['#58a6ff', '#3fb950', '#f0883e', '#bc8cff', '#f778ba', '#d29922', '#3fb9a0', '#f85149'];
                            for (var i = 0; i < dotCount; i++) {
                                dots.push({
                                    x: 40 + Math.random() * 480,
                                    y: 60 + Math.random() * 240,
                                    r: 5 + Math.random() * 6,
                                    color: colors[Math.floor(Math.random() * colors.length)]
                                });
                            }
                        }

                        generateDots();

                        // New puzzle button
                        var newBtn = document.createElement('button');
                        newBtn.textContent = 'New Puzzle';
                        newBtn.style.cssText = 'padding:6px 14px;border:1px solid #30363d;border-radius:6px;background:#3fb9a0;color:#fff;font-size:0.85rem;font-weight:bold;cursor:pointer;';
                        newBtn.addEventListener('click', function() {
                            generateDots();
                            draw();
                        });
                        controls.appendChild(newBtn);

                        // Show count button
                        var showBtn = document.createElement('button');
                        showBtn.textContent = 'Show Count';
                        showBtn.style.cssText = 'padding:6px 14px;border:1px solid #30363d;border-radius:6px;background:#58a6ff;color:#fff;font-size:0.85rem;font-weight:bold;cursor:pointer;margin-left:6px;';
                        showBtn.addEventListener('click', function() {
                            showCount = !showCount;
                            showBtn.textContent = showCount ? 'Hide Count' : 'Show Count';
                            draw();
                        });
                        controls.appendChild(showBtn);

                        function draw() {
                            var ctx = viz.ctx;
                            ctx.fillStyle = '#0c0c20';
                            ctx.fillRect(0, 0, viz.width, viz.height);

                            // Title
                            ctx.fillStyle = '#f0f6fc';
                            ctx.font = 'bold 18px -apple-system, sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'top';
                            ctx.fillText('How many dots do you see?', viz.width / 2, 10);

                            // Draw jar/box outline
                            ctx.strokeStyle = '#4a4a7a';
                            ctx.lineWidth = 3;
                            ctx.strokeRect(30, 50, 500, 260);

                            // Draw dots
                            for (var i = 0; i < dots.length; i++) {
                                var d = dots[i];
                                ctx.fillStyle = d.color;
                                ctx.beginPath();
                                ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
                                ctx.fill();

                                // Subtle glow
                                ctx.shadowColor = d.color;
                                ctx.shadowBlur = 6;
                                ctx.beginPath();
                                ctx.arc(d.x, d.y, d.r * 0.6, 0, Math.PI * 2);
                                ctx.fill();
                                ctx.shadowBlur = 0;
                            }

                            // Show count area
                            if (showCount) {
                                ctx.fillStyle = 'rgba(12, 12, 32, 0.85)';
                                ctx.fillRect(viz.width / 2 - 100, viz.height / 2 - 40, 200, 80);
                                ctx.strokeStyle = '#3fb950';
                                ctx.lineWidth = 2;
                                ctx.strokeRect(viz.width / 2 - 100, viz.height / 2 - 40, 200, 80);

                                ctx.fillStyle = '#3fb950';
                                ctx.font = 'bold 36px -apple-system, sans-serif';
                                ctx.textAlign = 'center';
                                ctx.textBaseline = 'middle';
                                ctx.fillText(String(dotCount) + ' dots!', viz.width / 2, viz.height / 2);
                            }

                            // Hint text at bottom
                            ctx.fillStyle = '#8b949e';
                            ctx.font = '13px -apple-system, sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'top';
                            ctx.fillText('Try to estimate before clicking "Show Count"!', viz.width / 2, 325);
                        }

                        draw();
                        return viz;
                    }
                },
                {
                    id: 'ch07-viz-estimation-meter',
                    title: 'Estimation Confidence Meter',
                    description: 'Slide to pick your estimate. See how close you are to the secret number!',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, {
                            width: 560, height: 280, scale: 1,
                            originX: 0, originY: 0
                        });

                        var secretNumber = 10 + Math.floor(Math.random() * 90);
                        var estimate = 50;
                        var revealed = false;

                        // Slider for estimate
                        var estGroup = document.createElement('div');
                        estGroup.className = 'viz-slider-group';
                        var estLabel = document.createElement('span');
                        estLabel.className = 'viz-slider-label';
                        estLabel.textContent = 'Your guess: ';
                        var estSlider = document.createElement('input');
                        estSlider.type = 'range';
                        estSlider.className = 'viz-slider';
                        estSlider.min = '1';
                        estSlider.max = '100';
                        estSlider.step = '1';
                        estSlider.value = '50';
                        estSlider.style.width = '180px';
                        var estVal = document.createElement('span');
                        estVal.className = 'viz-slider-value';
                        estVal.textContent = '50';
                        estSlider.addEventListener('input', function() {
                            estimate = parseInt(estSlider.value);
                            estVal.textContent = String(estimate);
                            draw();
                        });
                        estGroup.appendChild(estLabel);
                        estGroup.appendChild(estSlider);
                        estGroup.appendChild(estVal);
                        controls.appendChild(estGroup);

                        // Reveal button
                        var revealBtn = document.createElement('button');
                        revealBtn.textContent = 'Reveal!';
                        revealBtn.style.cssText = 'padding:6px 14px;border:1px solid #30363d;border-radius:6px;background:#f0883e;color:#fff;font-size:0.85rem;font-weight:bold;cursor:pointer;margin-left:6px;';
                        revealBtn.addEventListener('click', function() {
                            revealed = true;
                            draw();
                        });
                        controls.appendChild(revealBtn);

                        // New round button
                        var newBtn = document.createElement('button');
                        newBtn.textContent = 'New Round';
                        newBtn.style.cssText = 'padding:6px 14px;border:1px solid #30363d;border-radius:6px;background:#3fb950;color:#fff;font-size:0.85rem;font-weight:bold;cursor:pointer;margin-left:6px;';
                        newBtn.addEventListener('click', function() {
                            secretNumber = 10 + Math.floor(Math.random() * 90);
                            revealed = false;
                            draw();
                        });
                        controls.appendChild(newBtn);

                        function draw() {
                            var ctx = viz.ctx;
                            ctx.fillStyle = '#0c0c20';
                            ctx.fillRect(0, 0, viz.width, viz.height);

                            // Title
                            ctx.fillStyle = '#f0f6fc';
                            ctx.font = 'bold 18px -apple-system, sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'top';
                            ctx.fillText('Can you guess the secret number? (1-100)', viz.width / 2, 10);

                            // Number line
                            var lineY = 120;
                            var lineLeft = 40;
                            var lineRight = 520;
                            var lineW = lineRight - lineLeft;

                            ctx.strokeStyle = '#4a4a7a';
                            ctx.lineWidth = 4;
                            ctx.beginPath();
                            ctx.moveTo(lineLeft, lineY);
                            ctx.lineTo(lineRight, lineY);
                            ctx.stroke();

                            // Tick marks every 10
                            for (var i = 0; i <= 100; i += 10) {
                                var tx = lineLeft + (i / 100) * lineW;
                                ctx.strokeStyle = '#6a6aaa';
                                ctx.lineWidth = 2;
                                ctx.beginPath();
                                ctx.moveTo(tx, lineY - 10);
                                ctx.lineTo(tx, lineY + 10);
                                ctx.stroke();

                                ctx.fillStyle = '#8b949e';
                                ctx.font = '12px -apple-system, sans-serif';
                                ctx.textAlign = 'center';
                                ctx.textBaseline = 'top';
                                ctx.fillText(String(i), tx, lineY + 14);
                            }

                            // Draw estimate marker
                            var estX = lineLeft + (estimate / 100) * lineW;
                            ctx.fillStyle = '#58a6ff';
                            ctx.beginPath();
                            ctx.moveTo(estX, lineY - 20);
                            ctx.lineTo(estX - 8, lineY - 35);
                            ctx.lineTo(estX + 8, lineY - 35);
                            ctx.closePath();
                            ctx.fill();

                            ctx.fillStyle = '#58a6ff';
                            ctx.font = 'bold 14px -apple-system, sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'bottom';
                            ctx.fillText('Your guess: ' + estimate, estX, lineY - 38);

                            if (revealed) {
                                // Draw secret number marker
                                var secX = lineLeft + (secretNumber / 100) * lineW;
                                ctx.fillStyle = '#3fb950';
                                ctx.beginPath();
                                ctx.moveTo(secX, lineY + 20);
                                ctx.lineTo(secX - 8, lineY + 35);
                                ctx.lineTo(secX + 8, lineY + 35);
                                ctx.closePath();
                                ctx.fill();

                                ctx.fillStyle = '#3fb950';
                                ctx.font = 'bold 14px -apple-system, sans-serif';
                                ctx.textAlign = 'center';
                                ctx.textBaseline = 'top';
                                ctx.fillText('Secret: ' + secretNumber, secX, lineY + 38);

                                // Distance
                                var diff = Math.abs(estimate - secretNumber);
                                var message;
                                var msgColor;
                                if (diff === 0) { message = 'PERFECT! You got it exactly!'; msgColor = '#3fb950'; }
                                else if (diff <= 5) { message = 'Amazing! Only ' + diff + ' away!'; msgColor = '#3fb950'; }
                                else if (diff <= 10) { message = 'Great estimate! ' + diff + ' away.'; msgColor = '#3fb9a0'; }
                                else if (diff <= 20) { message = 'Good try! ' + diff + ' away.'; msgColor = '#d29922'; }
                                else { message = 'Off by ' + diff + '. Keep practicing!'; msgColor = '#f0883e'; }

                                ctx.fillStyle = msgColor;
                                ctx.font = 'bold 22px -apple-system, sans-serif';
                                ctx.textAlign = 'center';
                                ctx.textBaseline = 'top';
                                ctx.fillText(message, viz.width / 2, 190);

                                // Draw distance line
                                var leftX = Math.min(estX, secX);
                                var rightX = Math.max(estX, secX);
                                ctx.strokeStyle = msgColor + '88';
                                ctx.lineWidth = 2;
                                ctx.setLineDash([4, 4]);
                                ctx.beginPath();
                                ctx.moveTo(leftX, lineY);
                                ctx.lineTo(rightX, lineY);
                                ctx.stroke();
                                ctx.setLineDash([]);
                            } else {
                                ctx.fillStyle = '#8b949e';
                                ctx.font = '15px -apple-system, sans-serif';
                                ctx.textAlign = 'center';
                                ctx.textBaseline = 'top';
                                ctx.fillText('Move the slider, then click "Reveal!" to see the secret number.', viz.width / 2, 200);
                            }
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'You see a bookshelf with 4 shelves, and each shelf looks like it holds about 8 books. Estimate the total number of books.',
                    hint: 'Multiply the number of shelves by your estimate of books per shelf.',
                    solution: 'About \\(4 \\times 8 = 32\\) books. If each shelf has "about 8," the total is approximately 32. The real count might be a little more or less — and that is perfectly fine!'
                },
                {
                    question: 'Is the following a good estimate or a bad estimate? "There are about 30 students in our class" (actual count: 28).',
                    hint: 'Think about how close 30 is to 28. Is it within a reasonable range?',
                    solution: 'This is a <strong>great</strong> estimate! \\(30\\) is only \\(2\\) away from \\(28\\). When we say "about 30," that is close enough to be very useful.'
                },
                {
                    question: 'You are at the grocery store with \\($15\\). You want to buy items that cost \\($3.89\\), \\($5.12\\), and \\($4.50\\). Estimate: do you have enough money?',
                    hint: 'Round each price to the nearest dollar first, then add them up.',
                    solution: 'Estimate: \\($3.89 \\approx $4\\), \\($5.12 \\approx $5\\), \\($4.50 \\approx $5\\). Total: about \\($4 + $5 + $5 = $14\\). You have \\($15\\), so yes — you have enough!'
                }
            ]
        },

        // ============================================================
        // Section 2: Rounding to the Nearest Ten
        // ============================================================
        {
            id: 'ch07-sec02',
            title: 'Rounding to the Nearest Ten',
            content: `
<h2>Rounding to the Nearest Ten</h2>

<p><strong>Rounding</strong> is one of the most important estimation tools. When we round a
number, we replace it with a <em>nearby "friendly" number</em> that is easier to work with.</p>

<h3>The Rounding Rule</h3>

<div class="env-block intuition">
    <div class="env-title">Discovery</div>
    <div class="env-body">
        <p>To round to the nearest ten, look at the <strong>ones digit</strong>:</p>
        <ul>
            <li>If the ones digit is <strong>0, 1, 2, 3, or 4</strong> — round <strong>DOWN</strong> (keep the tens digit the same)</li>
            <li>If the ones digit is <strong>5, 6, 7, 8, or 9</strong> — round <strong>UP</strong> (increase the tens digit by 1)</li>
        </ul>
        <p>Easy way to remember: <em>"5 or more? Let it soar! 4 or less? Let it rest!"</em></p>
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example</div>
    <div class="env-body">
        <p>Round these numbers to the nearest ten:</p>
        <ul>
            <li>\\(23\\) — the ones digit is \\(3\\) (4 or less), so round DOWN to \\(\\mathbf{20}\\)</li>
            <li>\\(47\\) — the ones digit is \\(7\\) (5 or more), so round UP to \\(\\mathbf{50}\\)</li>
            <li>\\(65\\) — the ones digit is \\(5\\) (5 or more), so round UP to \\(\\mathbf{70}\\)</li>
            <li>\\(81\\) — the ones digit is \\(1\\) (4 or less), so round DOWN to \\(\\mathbf{80}\\)</li>
        </ul>
    </div>
</div>

<h3>The Number Line Model</h3>

<p>Think of a number sitting on a number line between two multiples of ten. Which
multiple of ten is it <em>closer</em> to? That is the one we round to!</p>

<div class="viz-placeholder" data-viz="ch07-viz-round-ten"></div>

<p>For example, \\(37\\) sits between \\(30\\) and \\(40\\) on the number line. Since \\(37\\)
is closer to \\(40\\) (only 3 away) than to \\(30\\) (7 away), we round up to \\(40\\).</p>

<div class="viz-placeholder" data-viz="ch07-viz-round-ten-practice"></div>

<div class="env-block warning">
    <div class="env-title">Watch Out!</div>
    <div class="env-body">
        <p>What about numbers ending in \\(5\\), like \\(25\\) or \\(35\\)? They are right in
        the middle! By convention (an agreement everyone follows), we always round \\(5\\)
        <strong>up</strong>. So \\(25 \\to 30\\) and \\(35 \\to 40\\).</p>
    </div>
</div>

<div class="env-block remark">
    <div class="env-title">Think About It</div>
    <div class="env-body">
        <p>Numbers that are already multiples of ten (like \\(10, 20, 30, 40, \\ldots\\)) do not
        change when you round to the nearest ten. They are already "rounded"!</p>
    </div>
</div>
`,
            visualizations: [
                {
                    id: 'ch07-viz-round-ten',
                    title: 'Rounding to the Nearest Ten — Number Line',
                    description: 'Drag the number along the line to see which ten it rounds to!',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, {
                            width: 580, height: 300, scale: 5,
                            originX: 40, originY: 180
                        });

                        var pt = viz.addDraggable('num', 37, 0, viz.colors.blue, 12, function() { draw(); });

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            // Clamp to 0-100 and snap to integers
                            pt.x = Math.max(0, Math.min(100, Math.round(pt.x)));
                            pt.y = 0;
                            var val = Math.round(pt.x);

                            var roundedDown = Math.floor(val / 10) * 10;
                            var roundedUp = roundedDown + 10;
                            if (val % 10 === 0) { roundedDown = val; roundedUp = val; }
                            var onesDigit = val % 10;
                            var rounded = onesDigit >= 5 ? roundedUp : roundedDown;

                            // Title
                            ctx.fillStyle = '#f0f6fc';
                            ctx.font = 'bold 18px -apple-system, sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'top';
                            ctx.fillText('Drag the blue circle!', viz.width / 2, 8);

                            // Draw number line from roundedDown-5 to roundedUp+5, but clamp
                            var lineMin = Math.max(0, roundedDown - 5);
                            var lineMax = Math.min(100, roundedUp + 5);
                            if (val % 10 === 0) { lineMin = Math.max(0, val - 10); lineMax = Math.min(100, val + 10); }

                            var nlY = 0;
                            var startPx = viz.toScreen(lineMin, nlY);
                            var endPx = viz.toScreen(lineMax, nlY);

                            ctx.strokeStyle = '#4a4a7a';
                            ctx.lineWidth = 4;
                            ctx.beginPath();
                            ctx.moveTo(startPx[0], startPx[1]);
                            ctx.lineTo(endPx[0], endPx[1]);
                            ctx.stroke();

                            // Tick marks
                            for (var i = lineMin; i <= lineMax; i++) {
                                var tickPx = viz.toScreen(i, nlY);
                                var isTen = (i % 10 === 0);
                                ctx.strokeStyle = isTen ? '#8b949e' : '#3a3a6a';
                                ctx.lineWidth = isTen ? 3 : 1;
                                var tickH = isTen ? 12 : 6;
                                ctx.beginPath();
                                ctx.moveTo(tickPx[0], tickPx[1] - tickH);
                                ctx.lineTo(tickPx[0], tickPx[1] + tickH);
                                ctx.stroke();

                                if (isTen) {
                                    ctx.fillStyle = '#c9d1d9';
                                    ctx.font = 'bold 16px -apple-system, sans-serif';
                                    ctx.textAlign = 'center';
                                    ctx.textBaseline = 'top';
                                    ctx.fillText(String(i), tickPx[0], tickPx[1] + 16);
                                }
                            }

                            // Highlight the rounded-to ten
                            if (val % 10 !== 0) {
                                var roundPx = viz.toScreen(rounded, nlY);
                                ctx.shadowColor = '#3fb950';
                                ctx.shadowBlur = 20;
                                ctx.fillStyle = '#3fb950';
                                ctx.beginPath();
                                ctx.arc(roundPx[0], roundPx[1], 10, 0, Math.PI * 2);
                                ctx.fill();
                                ctx.shadowBlur = 0;

                                ctx.fillStyle = '#ffffff';
                                ctx.font = 'bold 12px -apple-system, sans-serif';
                                ctx.textAlign = 'center';
                                ctx.textBaseline = 'middle';
                                ctx.fillText(String(rounded), roundPx[0], roundPx[1]);
                            }

                            // Draw the dragged number
                            var numPx = viz.toScreen(val, nlY);
                            ctx.shadowColor = '#58a6ff';
                            ctx.shadowBlur = 20;
                            ctx.fillStyle = '#58a6ff';
                            ctx.beginPath();
                            ctx.arc(numPx[0], numPx[1], 14, 0, Math.PI * 2);
                            ctx.fill();
                            ctx.shadowBlur = 0;

                            ctx.fillStyle = '#ffffff';
                            ctx.font = 'bold 14px -apple-system, sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'middle';
                            ctx.fillText(String(val), numPx[0], numPx[1]);

                            // Info box
                            var infoY = 50;
                            ctx.fillStyle = '#f0f6fc';
                            ctx.font = 'bold 24px -apple-system, sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'top';

                            if (val % 10 === 0) {
                                ctx.fillText(val + ' is already a multiple of 10!', viz.width / 2, infoY);
                            } else {
                                var distDown = val - roundedDown;
                                var distUp = roundedUp - val;
                                ctx.fillText(val + ' rounds to ' + rounded, viz.width / 2, infoY);

                                ctx.font = '15px -apple-system, sans-serif';
                                ctx.fillStyle = '#8b949e';
                                var direction = onesDigit >= 5 ? 'UP' : 'DOWN';
                                ctx.fillText('Ones digit is ' + onesDigit + ' → Round ' + direction + '!    (' + distDown + ' from ' + roundedDown + ', ' + distUp + ' from ' + roundedUp + ')', viz.width / 2, infoY + 35);
                            }

                            viz.drawDraggables();
                        }

                        draw();
                        return viz;
                    }
                },
                {
                    id: 'ch07-viz-round-ten-practice',
                    title: 'Quick Rounding Practice',
                    description: 'A random number appears. Can you round it to the nearest ten?',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, {
                            width: 560, height: 280, scale: 1,
                            originX: 0, originY: 0
                        });

                        var num = 0;
                        var correctAnswer = 0;
                        var userAnswer = null;
                        var feedback = '';
                        var feedbackColor = '';
                        var choices = [];

                        function newProblem() {
                            num = 1 + Math.floor(Math.random() * 99);
                            var ones = num % 10;
                            correctAnswer = ones >= 5 ? Math.ceil(num / 10) * 10 : Math.floor(num / 10) * 10;
                            userAnswer = null;
                            feedback = '';

                            // Generate 3 choices: correct answer and 2 wrong ones
                            var wrongAnswers = [];
                            var possibles = [correctAnswer - 10, correctAnswer + 10, correctAnswer - 20, correctAnswer + 20];
                            for (var i = 0; i < possibles.length; i++) {
                                if (possibles[i] >= 0 && possibles[i] <= 100 && possibles[i] !== correctAnswer) {
                                    wrongAnswers.push(possibles[i]);
                                }
                            }
                            // Shuffle and pick 2
                            wrongAnswers.sort(function() { return Math.random() - 0.5; });
                            choices = [correctAnswer, wrongAnswers[0], wrongAnswers[1]];
                            choices.sort(function(a, b) { return a - b; });
                        }

                        newProblem();

                        // New problem button
                        var newBtn = document.createElement('button');
                        newBtn.textContent = 'New Problem';
                        newBtn.style.cssText = 'padding:6px 14px;border:1px solid #30363d;border-radius:6px;background:#bc8cff;color:#fff;font-size:0.85rem;font-weight:bold;cursor:pointer;';
                        newBtn.addEventListener('click', function() {
                            newProblem();
                            draw();
                        });
                        controls.appendChild(newBtn);

                        // Handle clicks on canvas for answer buttons
                        viz.canvas.addEventListener('click', function(e) {
                            if (userAnswer !== null) return;
                            var rect = viz.canvas.getBoundingClientRect();
                            var mx = e.clientX - rect.left;
                            var my = e.clientY - rect.top;

                            for (var i = 0; i < choices.length; i++) {
                                var bx = 100 + i * 150;
                                var by = 160;
                                if (mx >= bx && mx <= bx + 110 && my >= by && my <= by + 50) {
                                    userAnswer = choices[i];
                                    if (userAnswer === correctAnswer) {
                                        feedback = 'Correct! Great job!';
                                        feedbackColor = '#3fb950';
                                    } else {
                                        feedback = 'Not quite! ' + num + ' rounds to ' + correctAnswer;
                                        feedbackColor = '#f0883e';
                                    }
                                    draw();
                                    return;
                                }
                            }
                        });

                        function draw() {
                            var ctx = viz.ctx;
                            ctx.fillStyle = '#0c0c20';
                            ctx.fillRect(0, 0, viz.width, viz.height);

                            // Question
                            ctx.fillStyle = '#f0f6fc';
                            ctx.font = 'bold 18px -apple-system, sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'top';
                            ctx.fillText('Round ' + num + ' to the nearest ten:', viz.width / 2, 20);

                            // Big number display
                            ctx.fillStyle = '#58a6ff';
                            ctx.font = 'bold 52px -apple-system, sans-serif';
                            ctx.fillText(String(num), viz.width / 2, 60);

                            // Choice buttons
                            for (var i = 0; i < choices.length; i++) {
                                var bx = 100 + i * 150;
                                var by = 160;

                                var isSelected = (userAnswer === choices[i]);
                                var isCorrect = (choices[i] === correctAnswer);

                                if (userAnswer !== null && isCorrect) {
                                    ctx.fillStyle = '#3fb95044';
                                    ctx.strokeStyle = '#3fb950';
                                } else if (userAnswer !== null && isSelected && !isCorrect) {
                                    ctx.fillStyle = '#f8514944';
                                    ctx.strokeStyle = '#f85149';
                                } else {
                                    ctx.fillStyle = '#1a1a40';
                                    ctx.strokeStyle = '#4a4a7a';
                                }

                                ctx.lineWidth = 3;
                                ctx.beginPath();
                                ctx.roundRect(bx, by, 110, 50, 8);
                                ctx.fill();
                                ctx.stroke();

                                ctx.fillStyle = '#f0f6fc';
                                ctx.font = 'bold 22px -apple-system, sans-serif';
                                ctx.textAlign = 'center';
                                ctx.textBaseline = 'middle';
                                ctx.fillText(String(choices[i]), bx + 55, by + 25);
                            }

                            // Feedback
                            if (feedback) {
                                ctx.fillStyle = feedbackColor;
                                ctx.font = 'bold 20px -apple-system, sans-serif';
                                ctx.textAlign = 'center';
                                ctx.textBaseline = 'top';
                                ctx.fillText(feedback, viz.width / 2, 230);
                            }
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Round each number to the nearest ten: (a) \\(34\\), (b) \\(56\\), (c) \\(85\\), (d) \\(12\\), (e) \\(99\\).',
                    hint: 'Look at the ones digit for each number. Is it 5 or more (round up) or 4 or less (round down)?',
                    solution: '(a) \\(34 \\to 30\\) (ones digit 4, round down)<br>(b) \\(56 \\to 60\\) (ones digit 6, round up)<br>(c) \\(85 \\to 90\\) (ones digit 5, round up)<br>(d) \\(12 \\to 10\\) (ones digit 2, round down)<br>(e) \\(99 \\to 100\\) (ones digit 9, round up)'
                },
                {
                    question: 'A number rounds to \\(60\\) when rounded to the nearest ten. What are all the possible numbers?',
                    hint: 'Which numbers are closer to 60 than to 50 or 70?',
                    solution: 'The numbers \\(55, 56, 57, 58, 59, 60, 61, 62, 63, 64\\) all round to 60. Numbers 55-59 round up to 60, and 60-64 round down (or stay at) 60.'
                },
                {
                    question: 'Sam says that \\(45\\) rounds to \\(40\\). Is Sam correct? Explain.',
                    hint: 'What is the ones digit of 45? Remember the rule for the digit 5.',
                    solution: 'Sam is <strong>not</strong> correct. The ones digit of \\(45\\) is \\(5\\), and by our rounding rule, \\(5\\) rounds <strong>up</strong>. So \\(45\\) rounds to \\(\\mathbf{50}\\), not \\(40\\).'
                }
            ]
        },

        // ============================================================
        // Section 3: Rounding to Hundreds & Beyond
        // ============================================================
        {
            id: 'ch07-sec03',
            title: 'Rounding to Hundreds & Beyond',
            content: `
<h2>Rounding to Hundreds & Beyond</h2>

<p>Now that you are a rounding-to-tens champion, let us level up! We can round numbers to
the nearest <strong>hundred</strong>, <strong>thousand</strong>, or even bigger.</p>

<h3>Rounding to the Nearest Hundred</h3>

<div class="env-block intuition">
    <div class="env-title">Discovery</div>
    <div class="env-body">
        <p>To round to the nearest hundred, look at the <strong>tens digit</strong>:</p>
        <ul>
            <li>If the tens digit is <strong>0, 1, 2, 3, or 4</strong> → round <strong>DOWN</strong></li>
            <li>If the tens digit is <strong>5, 6, 7, 8, or 9</strong> → round <strong>UP</strong></li>
        </ul>
        <p>Same rule, just look at a different digit!</p>
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example</div>
    <div class="env-body">
        <p>Round \\(347\\) to the nearest ten and to the nearest hundred:</p>
        <ul>
            <li><strong>Nearest ten:</strong> Look at ones digit (\\(7\\)). Since \\(7 \\geq 5\\), round up: \\(347 \\to \\mathbf{350}\\)</li>
            <li><strong>Nearest hundred:</strong> Look at tens digit (\\(4\\)). Since \\(4 < 5\\), round down: \\(347 \\to \\mathbf{300}\\)</li>
        </ul>
        <p>Notice: the same number can round to different values depending on what place you round to!</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="ch07-viz-round-hundred"></div>

<h3>Rounding to Thousands</h3>

<p>For really big numbers, we can round to the nearest thousand. Look at the <strong>hundreds digit</strong>:</p>

<div class="env-block example">
    <div class="env-title">Try This!</div>
    <div class="env-body">
        <p>Round \\(4{,}682\\) to the nearest thousand:</p>
        <p>The hundreds digit is \\(6\\) (5 or more) → Round UP → \\(4{,}682 \\to \\mathbf{5{,}000}\\)</p>
        <p>Round \\(7{,}249\\) to the nearest thousand:</p>
        <p>The hundreds digit is \\(2\\) (4 or less) → Round DOWN → \\(7{,}249 \\to \\mathbf{7{,}000}\\)</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="ch07-viz-round-multi"></div>

<div class="env-block intuition">
    <div class="env-title">Cool Fact</div>
    <div class="env-body">
        <p>The pattern is always the same! To round to any place value, look at the digit
        <em>one place to the right</em> of where you are rounding. If that digit is 5 or more,
        round up. If it is 4 or less, round down. It works for tens, hundreds, thousands, and beyond!</p>
    </div>
</div>

<div class="env-block warning">
    <div class="env-title">Watch Out!</div>
    <div class="env-body">
        <p>Rounding \\(950\\) to the nearest hundred gives \\(1{,}000\\), not \\(900\\)!
        When rounding up goes past a big boundary, you have to carry over to the next place.
        Similarly, \\(998\\) rounds to \\(1{,}000\\) (to the nearest ten).</p>
    </div>
</div>
`,
            visualizations: [
                {
                    id: 'ch07-viz-round-hundred',
                    title: 'Rounding Explorer — Tens & Hundreds',
                    description: 'Use the slider to pick a number and see it rounded to the nearest ten AND the nearest hundred.',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, {
                            width: 580, height: 380, scale: 1,
                            originX: 0, originY: 0
                        });

                        var currentNum = 347;

                        // Slider
                        var numGroup = document.createElement('div');
                        numGroup.className = 'viz-slider-group';
                        var numLabel = document.createElement('span');
                        numLabel.className = 'viz-slider-label';
                        numLabel.textContent = 'Number: ';
                        var numSlider = document.createElement('input');
                        numSlider.type = 'range';
                        numSlider.className = 'viz-slider';
                        numSlider.min = '1';
                        numSlider.max = '999';
                        numSlider.step = '1';
                        numSlider.value = String(currentNum);
                        numSlider.style.width = '200px';
                        var numVal = document.createElement('span');
                        numVal.className = 'viz-slider-value';
                        numVal.textContent = String(currentNum);
                        numSlider.addEventListener('input', function() {
                            currentNum = parseInt(numSlider.value);
                            numVal.textContent = String(currentNum);
                            draw();
                        });
                        numGroup.appendChild(numLabel);
                        numGroup.appendChild(numSlider);
                        numGroup.appendChild(numVal);
                        controls.appendChild(numGroup);

                        function roundToNearest(n, place) {
                            return Math.round(n / place) * place;
                        }

                        function draw() {
                            var ctx = viz.ctx;
                            ctx.fillStyle = '#0c0c20';
                            ctx.fillRect(0, 0, viz.width, viz.height);

                            var roundedTen = roundToNearest(currentNum, 10);
                            var roundedHundred = roundToNearest(currentNum, 100);

                            // Big number display
                            ctx.fillStyle = '#f0f6fc';
                            ctx.font = 'bold 20px -apple-system, sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'top';
                            ctx.fillText('The Number:', viz.width / 2, 10);

                            ctx.fillStyle = '#58a6ff';
                            ctx.font = 'bold 56px -apple-system, sans-serif';
                            ctx.fillText(String(currentNum), viz.width / 2, 35);

                            // Digit breakdown
                            var hundreds = Math.floor(currentNum / 100);
                            var tens = Math.floor((currentNum % 100) / 10);
                            var ones = currentNum % 10;

                            // Draw digit boxes
                            var boxY = 110;
                            var boxW = 70;
                            var boxH = 55;
                            var boxGap = 20;
                            var startX = viz.width / 2 - (3 * boxW + 2 * boxGap) / 2;

                            var digitInfo = [
                                { val: hundreds, label: 'Hundreds', color: '#f0883e' },
                                { val: tens, label: 'Tens', color: '#3fb9a0' },
                                { val: ones, label: 'Ones', color: '#bc8cff' }
                            ];

                            for (var d = 0; d < 3; d++) {
                                var dx = startX + d * (boxW + boxGap);
                                ctx.fillStyle = digitInfo[d].color + '22';
                                ctx.fillRect(dx, boxY, boxW, boxH);
                                ctx.strokeStyle = digitInfo[d].color;
                                ctx.lineWidth = 2;
                                ctx.strokeRect(dx, boxY, boxW, boxH);

                                ctx.fillStyle = digitInfo[d].color;
                                ctx.font = 'bold 28px -apple-system, sans-serif';
                                ctx.textAlign = 'center';
                                ctx.textBaseline = 'middle';
                                ctx.fillText(String(digitInfo[d].val), dx + boxW / 2, boxY + boxH / 2);

                                ctx.font = '12px -apple-system, sans-serif';
                                ctx.textBaseline = 'top';
                                ctx.fillText(digitInfo[d].label, dx + boxW / 2, boxY + boxH + 5);
                            }

                            // Rounding results
                            var resultY = 210;

                            // Round to nearest ten
                            ctx.fillStyle = '#3fb9a0';
                            ctx.font = 'bold 16px -apple-system, sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'top';
                            ctx.fillText('Nearest Ten', viz.width / 2 - 140, resultY);

                            ctx.fillStyle = '#0c0c20';
                            ctx.fillRect(viz.width / 2 - 200, resultY + 25, 120, 50);
                            ctx.strokeStyle = '#3fb9a0';
                            ctx.lineWidth = 3;
                            ctx.strokeRect(viz.width / 2 - 200, resultY + 25, 120, 50);
                            ctx.fillStyle = '#3fb9a0';
                            ctx.font = 'bold 30px -apple-system, sans-serif';
                            ctx.textBaseline = 'middle';
                            ctx.fillText(String(roundedTen), viz.width / 2 - 140, resultY + 50);

                            ctx.fillStyle = '#8b949e';
                            ctx.font = '13px -apple-system, sans-serif';
                            ctx.textBaseline = 'top';
                            var tenReason = ones >= 5 ? 'Ones digit ' + ones + ' >= 5, round UP' : 'Ones digit ' + ones + ' < 5, round DOWN';
                            ctx.fillText(tenReason, viz.width / 2 - 140, resultY + 82);

                            // Round to nearest hundred
                            ctx.fillStyle = '#f0883e';
                            ctx.font = 'bold 16px -apple-system, sans-serif';
                            ctx.textBaseline = 'top';
                            ctx.fillText('Nearest Hundred', viz.width / 2 + 140, resultY);

                            ctx.fillStyle = '#0c0c20';
                            ctx.fillRect(viz.width / 2 + 80, resultY + 25, 120, 50);
                            ctx.strokeStyle = '#f0883e';
                            ctx.lineWidth = 3;
                            ctx.strokeRect(viz.width / 2 + 80, resultY + 25, 120, 50);
                            ctx.fillStyle = '#f0883e';
                            ctx.font = 'bold 30px -apple-system, sans-serif';
                            ctx.textBaseline = 'middle';
                            ctx.fillText(String(roundedHundred), viz.width / 2 + 140, resultY + 50);

                            ctx.fillStyle = '#8b949e';
                            ctx.font = '13px -apple-system, sans-serif';
                            ctx.textBaseline = 'top';
                            var hunReason = tens >= 5 ? 'Tens digit ' + tens + ' >= 5, round UP' : 'Tens digit ' + tens + ' < 5, round DOWN';
                            ctx.fillText(hunReason, viz.width / 2 + 140, resultY + 82);

                            // Arrow between them
                            ctx.fillStyle = '#f0f6fc';
                            ctx.font = 'bold 40px -apple-system, sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'middle';
                            ctx.fillText('→', viz.width / 2 - 20, resultY + 50);
                            ctx.fillText('→', viz.width / 2 + 60, resultY + 50);

                            // Visual comparison bar at bottom
                            var barY = 330;
                            var barLeft = 40;
                            var barRight = 540;
                            var barW = barRight - barLeft;

                            var hundDown = Math.floor(currentNum / 100) * 100;
                            var hundUp = hundDown + 100;
                            if (hundUp > 1000) hundUp = 1000;

                            // Bar background
                            ctx.fillStyle = '#1a1a40';
                            ctx.fillRect(barLeft, barY, barW, 12);

                            // Position of current number within the hundred range
                            var range = hundUp - hundDown;
                            if (range > 0) {
                                var frac = (currentNum - hundDown) / range;
                                var posX = barLeft + frac * barW;

                                // Mark the position
                                ctx.fillStyle = '#58a6ff';
                                ctx.beginPath();
                                ctx.arc(posX, barY + 6, 8, 0, Math.PI * 2);
                                ctx.fill();

                                // Labels at ends
                                ctx.fillStyle = '#8b949e';
                                ctx.font = 'bold 12px -apple-system, sans-serif';
                                ctx.textAlign = 'left';
                                ctx.textBaseline = 'bottom';
                                ctx.fillText(String(hundDown), barLeft, barY - 4);
                                ctx.textAlign = 'right';
                                ctx.fillText(String(hundUp), barRight, barY - 4);

                                // Midpoint
                                ctx.textAlign = 'center';
                                ctx.fillStyle = '#6e7681';
                                ctx.fillText(String(hundDown + 50), barLeft + barW / 2, barY - 4);
                                ctx.setLineDash([3, 3]);
                                ctx.strokeStyle = '#6e7681';
                                ctx.lineWidth = 1;
                                ctx.beginPath();
                                ctx.moveTo(barLeft + barW / 2, barY);
                                ctx.lineTo(barLeft + barW / 2, barY + 12);
                                ctx.stroke();
                                ctx.setLineDash([]);
                            }
                        }

                        draw();
                        return viz;
                    }
                },
                {
                    id: 'ch07-viz-round-multi',
                    title: 'Multi-Level Rounding',
                    description: 'Pick a big number and see it rounded to tens, hundreds, and thousands!',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, {
                            width: 560, height: 320, scale: 1,
                            originX: 0, originY: 0
                        });

                        var currentNum = 4682;

                        // Slider
                        var numGroup = document.createElement('div');
                        numGroup.className = 'viz-slider-group';
                        var numLabel = document.createElement('span');
                        numLabel.className = 'viz-slider-label';
                        numLabel.textContent = 'Number: ';
                        var numSlider = document.createElement('input');
                        numSlider.type = 'range';
                        numSlider.className = 'viz-slider';
                        numSlider.min = '100';
                        numSlider.max = '9999';
                        numSlider.step = '1';
                        numSlider.value = String(currentNum);
                        numSlider.style.width = '200px';
                        var numVal = document.createElement('span');
                        numVal.className = 'viz-slider-value';
                        numVal.textContent = String(currentNum);
                        numSlider.addEventListener('input', function() {
                            currentNum = parseInt(numSlider.value);
                            numVal.textContent = String(currentNum);
                            draw();
                        });
                        numGroup.appendChild(numLabel);
                        numGroup.appendChild(numSlider);
                        numGroup.appendChild(numVal);
                        controls.appendChild(numGroup);

                        // Random button
                        var randBtn = document.createElement('button');
                        randBtn.textContent = 'Random';
                        randBtn.style.cssText = 'padding:6px 14px;border:1px solid #30363d;border-radius:6px;background:#bc8cff;color:#fff;font-size:0.85rem;font-weight:bold;cursor:pointer;margin-left:6px;';
                        randBtn.addEventListener('click', function() {
                            currentNum = 100 + Math.floor(Math.random() * 9900);
                            numSlider.value = String(currentNum);
                            numVal.textContent = String(currentNum);
                            draw();
                        });
                        controls.appendChild(randBtn);

                        function draw() {
                            var ctx = viz.ctx;
                            ctx.fillStyle = '#0c0c20';
                            ctx.fillRect(0, 0, viz.width, viz.height);

                            // Original number
                            ctx.fillStyle = '#f0f6fc';
                            ctx.font = 'bold 16px -apple-system, sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'top';
                            ctx.fillText('Original Number', viz.width / 2, 10);

                            ctx.fillStyle = '#58a6ff';
                            ctx.font = 'bold 44px -apple-system, sans-serif';
                            ctx.fillText(currentNum.toLocaleString(), viz.width / 2, 30);

                            // Three rounding levels
                            var levels = [
                                { place: 10, label: 'Nearest Ten', color: '#3fb9a0' },
                                { place: 100, label: 'Nearest Hundred', color: '#f0883e' },
                                { place: 1000, label: 'Nearest Thousand', color: '#bc8cff' }
                            ];

                            var startY = 100;
                            var rowH = 70;
                            var arrowX = 280;

                            for (var i = 0; i < levels.length; i++) {
                                var lv = levels[i];
                                var rounded = Math.round(currentNum / lv.place) * lv.place;
                                var y = startY + i * rowH;

                                // Arrow
                                ctx.fillStyle = '#4a4a7a';
                                ctx.font = 'bold 28px -apple-system, sans-serif';
                                ctx.textAlign = 'center';
                                ctx.textBaseline = 'middle';
                                ctx.fillText('→', arrowX, y + 22);

                                // Label
                                ctx.fillStyle = lv.color;
                                ctx.font = 'bold 14px -apple-system, sans-serif';
                                ctx.textAlign = 'left';
                                ctx.textBaseline = 'top';
                                ctx.fillText(lv.label, 40, y);

                                // Rounded box
                                ctx.fillStyle = lv.color + '22';
                                ctx.fillRect(320, y, 180, 45);
                                ctx.strokeStyle = lv.color;
                                ctx.lineWidth = 3;
                                ctx.strokeRect(320, y, 180, 45);

                                ctx.fillStyle = lv.color;
                                ctx.font = 'bold 26px -apple-system, sans-serif';
                                ctx.textAlign = 'center';
                                ctx.textBaseline = 'middle';
                                ctx.fillText(rounded.toLocaleString(), 410, y + 22);

                                // Show digit checked
                                var digitNames = ['ones', 'tens', 'hundreds'];
                                var digitChecked;
                                if (lv.place === 10) digitChecked = currentNum % 10;
                                else if (lv.place === 100) digitChecked = Math.floor((currentNum % 100) / 10);
                                else digitChecked = Math.floor((currentNum % 1000) / 100);

                                ctx.fillStyle = '#8b949e';
                                ctx.font = '12px -apple-system, sans-serif';
                                ctx.textAlign = 'left';
                                ctx.textBaseline = 'top';
                                var direction = digitChecked >= 5 ? 'up' : 'down';
                                ctx.fillText('(' + digitNames[Math.log10(lv.place) - 1] + ' digit = ' + digitChecked + ', round ' + direction + ')', 40, y + 22);
                            }
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Round \\(347\\) to (a) the nearest ten, and (b) the nearest hundred.',
                    hint: 'For nearest ten, look at the ones digit (7). For nearest hundred, look at the tens digit (4).',
                    solution: '(a) Ones digit is \\(7 \\geq 5\\), so round up: \\(347 \\to \\mathbf{350}\\)<br>(b) Tens digit is \\(4 < 5\\), so round down: \\(347 \\to \\mathbf{300}\\)'
                },
                {
                    question: 'Round \\(5{,}850\\) to the nearest hundred and to the nearest thousand.',
                    hint: 'For nearest hundred, look at the tens digit. For nearest thousand, look at the hundreds digit.',
                    solution: 'Nearest hundred: tens digit is \\(5 \\geq 5\\), round up: \\(5{,}850 \\to \\mathbf{5{,}900}\\)<br>Nearest thousand: hundreds digit is \\(8 \\geq 5\\), round up: \\(5{,}850 \\to \\mathbf{6{,}000}\\)'
                },
                {
                    question: 'Which of these numbers round to \\(400\\) when rounded to the nearest hundred? \\(349,\\; 350,\\; 420,\\; 451,\\; 399\\)',
                    hint: 'A number rounds to 400 if it is between 350 and 449 (inclusive).',
                    solution: '\\(350\\) rounds to \\(400\\) (tens digit \\(5 \\geq 5\\)). \\(420\\) rounds to \\(400\\) (tens digit \\(2 < 5\\)). \\(399\\) rounds to \\(400\\) (tens digit \\(9 \\geq 5\\)). So the answer is <strong>350, 420, and 399</strong>. (349 rounds to 300, and 451 rounds to 500.)'
                }
            ]
        },

        // ============================================================
        // Section 4: Estimating Sums & Differences
        // ============================================================
        {
            id: 'ch07-sec04',
            title: 'Estimating Sums & Differences',
            content: `
<h2>Estimating Sums & Differences</h2>

<p>Now we combine our rounding skills with addition and subtraction. This is where
estimation becomes really powerful!</p>

<h3>Front-End Estimation</h3>

<div class="env-block intuition">
    <div class="env-title">Discovery</div>
    <div class="env-body">
        <p><strong>Front-end estimation</strong> is a quick trick: just look at the
        <em>leading digits</em> (the digits at the front) and ignore the rest.</p>
        <p>For \\(487 + 312\\), think: "\\(400 + 300 = 700\\)." That is your quick estimate!</p>
        <p>You can make it more accurate by also looking at what is left over:
        \\(87 + 12 \\approx 100\\), so a better estimate is \\(700 + 100 = 800\\).</p>
    </div>
</div>

<h3>Rounding Then Computing</h3>

<p>Another strategy: round each number first, then add or subtract.</p>

<div class="env-block example">
    <div class="env-title">Example</div>
    <div class="env-body">
        <p>Estimate \\(278 + 534\\):</p>
        <ul>
            <li>Round each number: \\(278 \\approx 280\\) (nearest ten), \\(534 \\approx 530\\)</li>
            <li>Add the rounded numbers: \\(280 + 530 = 810\\)</li>
            <li>The actual answer is \\(812\\) — our estimate of \\(810\\) was very close!</li>
        </ul>
        <p>We could also round to hundreds: \\(300 + 500 = 800\\). Still a good estimate!</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="ch07-viz-estimate-sum"></div>

<h3>"Is My Answer Reasonable?"</h3>

<p>One of the best uses of estimation is <strong>checking your work</strong>.
After you solve a problem, use estimation to ask: "Does this answer make sense?"</p>

<div class="env-block example">
    <div class="env-title">Try This!</div>
    <div class="env-body">
        <p>You calculated \\(392 - 148 = 344\\). Is this reasonable?</p>
        <p><strong>Estimate check:</strong> \\(400 - 150 = 250\\). Your answer \\(344\\) is quite far
        from \\(250\\). Something might be wrong! Let us recheck...</p>
        <p>The real answer is \\(392 - 148 = 244\\). The estimate helped you catch an error!</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="ch07-viz-reasonableness"></div>

<div class="env-block remark">
    <div class="env-title">Think About It</div>
    <div class="env-body">
        <p>When you round both numbers <em>up</em> before adding, your estimate will be
        a little too high. When you round both <em>down</em>, it will be a little too low.
        When one rounds up and the other rounds down, the errors tend to cancel out, giving
        a more accurate estimate!</p>
    </div>
</div>

<div class="env-block warning">
    <div class="env-title">Watch Out!</div>
    <div class="env-body">
        <p>When estimating <strong>differences</strong> (subtraction), be extra careful.
        Rounding can sometimes make the difference bigger or smaller than it really is.
        For example: \\(501 - 499 = 2\\), but \\(500 - 500 = 0\\). The estimate missed!</p>
    </div>
</div>
`,
            visualizations: [
                {
                    id: 'ch07-viz-estimate-sum',
                    title: 'Estimate the Sum!',
                    description: 'See how rounding makes addition easier. Compare the estimate to the exact answer!',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, {
                            width: 580, height: 360, scale: 1,
                            originX: 0, originY: 0
                        });

                        var numA = 278;
                        var numB = 534;

                        function generateProblem() {
                            numA = 100 + Math.floor(Math.random() * 900);
                            numB = 100 + Math.floor(Math.random() * 900);
                        }

                        // New problem button
                        var newBtn = document.createElement('button');
                        newBtn.textContent = 'New Problem';
                        newBtn.style.cssText = 'padding:6px 14px;border:1px solid #30363d;border-radius:6px;background:#3fb9a0;color:#fff;font-size:0.85rem;font-weight:bold;cursor:pointer;';
                        newBtn.addEventListener('click', function() {
                            generateProblem();
                            draw();
                        });
                        controls.appendChild(newBtn);

                        function draw() {
                            var ctx = viz.ctx;
                            ctx.fillStyle = '#0c0c20';
                            ctx.fillRect(0, 0, viz.width, viz.height);

                            var exact = numA + numB;
                            var roundedA10 = Math.round(numA / 10) * 10;
                            var roundedB10 = Math.round(numB / 10) * 10;
                            var est10 = roundedA10 + roundedB10;
                            var roundedA100 = Math.round(numA / 100) * 100;
                            var roundedB100 = Math.round(numB / 100) * 100;
                            var est100 = roundedA100 + roundedB100;

                            // Title
                            ctx.fillStyle = '#f0f6fc';
                            ctx.font = 'bold 18px -apple-system, sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'top';
                            ctx.fillText('Estimate the Sum', viz.width / 2, 8);

                            // Problem display
                            ctx.fillStyle = '#58a6ff';
                            ctx.font = 'bold 36px -apple-system, sans-serif';
                            ctx.fillText(numA + ' + ' + numB, viz.width / 2, 36);

                            // Three columns: Round to 10s, Round to 100s, Exact
                            var colW = 170;
                            var colGap = 15;
                            var startX = (viz.width - 3 * colW - 2 * colGap) / 2;
                            var colY = 100;

                            var columns = [
                                { title: 'Round to Tens', color: '#3fb9a0', a: roundedA10, b: roundedB10, sum: est10, diffLabel: 'Off by ' + Math.abs(exact - est10) },
                                { title: 'Round to Hundreds', color: '#f0883e', a: roundedA100, b: roundedB100, sum: est100, diffLabel: 'Off by ' + Math.abs(exact - est100) },
                                { title: 'Exact Answer', color: '#3fb950', a: numA, b: numB, sum: exact, diffLabel: 'Perfect!' }
                            ];

                            for (var c = 0; c < 3; c++) {
                                var col = columns[c];
                                var cx = startX + c * (colW + colGap);

                                // Column header
                                ctx.fillStyle = col.color;
                                ctx.font = 'bold 14px -apple-system, sans-serif';
                                ctx.textAlign = 'center';
                                ctx.textBaseline = 'top';
                                ctx.fillText(col.title, cx + colW / 2, colY);

                                // Box
                                ctx.fillStyle = col.color + '15';
                                ctx.fillRect(cx, colY + 25, colW, 160);
                                ctx.strokeStyle = col.color;
                                ctx.lineWidth = 2;
                                ctx.strokeRect(cx, colY + 25, colW, 160);

                                // Numbers
                                ctx.fillStyle = '#c9d1d9';
                                ctx.font = '22px -apple-system, sans-serif';
                                ctx.textAlign = 'right';
                                ctx.textBaseline = 'top';
                                ctx.fillText(String(col.a), cx + colW - 20, colY + 40);
                                ctx.fillText('+ ' + String(col.b), cx + colW - 20, colY + 70);

                                // Line
                                ctx.strokeStyle = col.color;
                                ctx.lineWidth = 2;
                                ctx.beginPath();
                                ctx.moveTo(cx + 15, colY + 100);
                                ctx.lineTo(cx + colW - 15, colY + 100);
                                ctx.stroke();

                                // Sum
                                ctx.fillStyle = col.color;
                                ctx.font = 'bold 26px -apple-system, sans-serif';
                                ctx.fillText(String(col.sum), cx + colW - 20, colY + 110);

                                // Accuracy label
                                ctx.fillStyle = '#8b949e';
                                ctx.font = '12px -apple-system, sans-serif';
                                ctx.textAlign = 'center';
                                ctx.fillText(col.diffLabel, cx + colW / 2, colY + 155);
                            }

                            // Visual bar comparison at the bottom
                            var barY = 310;
                            var maxVal = Math.max(exact, est10, est100) * 1.1;
                            var barMaxW = 500;
                            var barLeft = 50;
                            var barH = 12;

                            var bars = [
                                { val: est10, label: 'Tens est.', color: '#3fb9a0' },
                                { val: est100, label: 'Hundreds est.', color: '#f0883e' },
                                { val: exact, label: 'Exact', color: '#3fb950' }
                            ];

                            // Just draw comparison label
                            ctx.fillStyle = '#8b949e';
                            ctx.font = '12px -apple-system, sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'top';
                            ctx.fillText('Rounding to tens gives a closer estimate than rounding to hundreds!', viz.width / 2, barY);
                        }

                        draw();
                        return viz;
                    }
                },
                {
                    id: 'ch07-viz-reasonableness',
                    title: 'Is This Answer Reasonable?',
                    description: 'A problem and an answer are shown. Use estimation to decide: right or wrong?',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, {
                            width: 560, height: 300, scale: 1,
                            originX: 0, originY: 0
                        });

                        var numA, numB, op, correctAnswer, givenAnswer, isCorrect;

                        function newProblem() {
                            numA = 100 + Math.floor(Math.random() * 800);
                            numB = 100 + Math.floor(Math.random() * 400);
                            op = Math.random() < 0.5 ? '+' : '-';
                            if (op === '-' && numB > numA) {
                                var temp = numA; numA = numB; numB = temp;
                            }
                            correctAnswer = op === '+' ? numA + numB : numA - numB;

                            // 50% chance of giving wrong answer
                            isCorrect = Math.random() < 0.5;
                            if (isCorrect) {
                                givenAnswer = correctAnswer;
                            } else {
                                // Generate a wrong answer that looks plausible
                                var offsets = [100, -100, 200, -200, 110, -90, 50, -50];
                                givenAnswer = correctAnswer + offsets[Math.floor(Math.random() * offsets.length)];
                                if (givenAnswer < 0) givenAnswer = correctAnswer + 150;
                            }
                        }

                        newProblem();
                        var revealed = false;

                        // New problem button
                        var newBtn = document.createElement('button');
                        newBtn.textContent = 'New Problem';
                        newBtn.style.cssText = 'padding:6px 14px;border:1px solid #30363d;border-radius:6px;background:#3fb9a0;color:#fff;font-size:0.85rem;font-weight:bold;cursor:pointer;';
                        newBtn.addEventListener('click', function() {
                            newProblem();
                            revealed = false;
                            draw();
                        });
                        controls.appendChild(newBtn);

                        // Reveal button
                        var revealBtn = document.createElement('button');
                        revealBtn.textContent = 'Check!';
                        revealBtn.style.cssText = 'padding:6px 14px;border:1px solid #30363d;border-radius:6px;background:#f0883e;color:#fff;font-size:0.85rem;font-weight:bold;cursor:pointer;margin-left:6px;';
                        revealBtn.addEventListener('click', function() {
                            revealed = true;
                            draw();
                        });
                        controls.appendChild(revealBtn);

                        function draw() {
                            var ctx = viz.ctx;
                            ctx.fillStyle = '#0c0c20';
                            ctx.fillRect(0, 0, viz.width, viz.height);

                            // Problem
                            ctx.fillStyle = '#f0f6fc';
                            ctx.font = 'bold 16px -apple-system, sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'top';
                            ctx.fillText('A student says:', viz.width / 2, 15);

                            ctx.fillStyle = '#58a6ff';
                            ctx.font = 'bold 34px -apple-system, sans-serif';
                            ctx.fillText(numA + ' ' + op + ' ' + numB + ' = ' + givenAnswer, viz.width / 2, 45);

                            ctx.fillStyle = '#d29922';
                            ctx.font = 'bold 18px -apple-system, sans-serif';
                            ctx.fillText('Is this reasonable? Use estimation to check!', viz.width / 2, 95);

                            // Estimation hint area
                            var estA = Math.round(numA / 100) * 100;
                            var estB = Math.round(numB / 100) * 100;
                            var estimate = op === '+' ? estA + estB : estA - estB;

                            ctx.fillStyle = '#8b949e';
                            ctx.font = '15px -apple-system, sans-serif';
                            ctx.fillText('Estimate: ' + estA + ' ' + op + ' ' + estB + ' = ' + estimate, viz.width / 2, 135);

                            if (revealed) {
                                var resultY = 175;
                                if (isCorrect) {
                                    ctx.fillStyle = '#3fb950';
                                    ctx.font = 'bold 24px -apple-system, sans-serif';
                                    ctx.fillText('REASONABLE! The answer is correct!', viz.width / 2, resultY);
                                } else {
                                    ctx.fillStyle = '#f85149';
                                    ctx.font = 'bold 24px -apple-system, sans-serif';
                                    ctx.fillText('NOT REASONABLE! Something is wrong.', viz.width / 2, resultY);

                                    ctx.fillStyle = '#3fb950';
                                    ctx.font = 'bold 18px -apple-system, sans-serif';
                                    ctx.fillText('The correct answer is: ' + correctAnswer, viz.width / 2, resultY + 35);
                                }

                                var diff = Math.abs(givenAnswer - estimate);
                                ctx.fillStyle = '#8b949e';
                                ctx.font = '14px -apple-system, sans-serif';
                                ctx.fillText('The given answer (' + givenAnswer + ') is ' + diff + ' away from the estimate (' + estimate + ').', viz.width / 2, resultY + 75);
                            }
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Estimate \\(489 + 312\\) by rounding each number to the nearest hundred. Then find the exact answer. How close was your estimate?',
                    hint: 'Round: \\(489 \\approx 500\\) and \\(312 \\approx 300\\).',
                    solution: 'Estimate: \\(500 + 300 = 800\\).<br>Exact: \\(489 + 312 = 801\\).<br>Our estimate was off by only \\(1\\)! That is amazingly close.'
                },
                {
                    question: 'A student says \\(746 - 289 = 557\\). Use estimation to check if this is reasonable.',
                    hint: 'Estimate: \\(750 - 290 = ?\\) or \\(700 - 300 = ?\\). Is 557 close to your estimate?',
                    solution: 'Estimate: \\(750 - 290 = 460\\) or \\(700 - 300 = 400\\). The student\'s answer of \\(557\\) is much higher than our estimates. Let us check: \\(746 - 289 = 457\\). The student made an error — estimation helped us catch it!'
                },
                {
                    question: 'Use front-end estimation to estimate \\(823 + 195 + 467\\).',
                    hint: 'Look at the hundreds digits: \\(8 + 1 + 4 = ?\\). Then adjust using what is left over.',
                    solution: 'Front-end: \\(800 + 100 + 400 = 1{,}300\\).<br>Adjust: The leftovers are \\(23 + 95 + 67 \\approx 185\\), so a better estimate is \\(1{,}300 + 185 \\approx 1{,}485\\).<br>Exact answer: \\(823 + 195 + 467 = 1{,}485\\). Spot on!'
                }
            ]
        },

        // ============================================================
        // Section 5: Estimation Games
        // ============================================================
        {
            id: 'ch07-sec05',
            title: 'Estimation Games',
            content: `
<h2>Estimation Games</h2>

<p>Ready to become an estimation master? In this section, we play <strong>estimation games</strong>
that build your <em>number sense</em> — your ability to "feel" how big numbers are without counting.</p>

<h3>Fermi Questions</h3>

<div class="env-block intuition">
    <div class="env-title">Discovery</div>
    <div class="env-body">
        <p>A <strong>Fermi question</strong> (named after the famous scientist Enrico Fermi) is
        a question where you have to estimate a big number using clues and reasoning. Nobody
        expects you to get the exact answer — you just try to get in the right <em>ballpark</em>!</p>
        <p>The trick is to break a big question into smaller, easier pieces.</p>
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example</div>
    <div class="env-body">
        <p><strong>Question:</strong> About how many students are in your school?</p>
        <p><strong>Thinking:</strong></p>
        <ul>
            <li>There are about \\(25\\) students in each class.</li>
            <li>Each grade has about \\(3\\) classes.</li>
            <li>There are \\(6\\) grades in the school.</li>
        </ul>
        <p>\\(25 \\times 3 \\times 6 = 450\\) students. That is a great estimate!</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="ch07-viz-fermi-game"></div>

<h3>Estimation by Grouping</h3>

<p>When you see a lot of things scattered around, do not count them one by one. Instead,
<strong>count a small group</strong>, then estimate how many groups there are!</p>

<div class="env-block example">
    <div class="env-title">Try This!</div>
    <div class="env-body">
        <p>You see a parking lot. You count \\(8\\) cars in one row, and there are about \\(12\\) rows.
        Estimate: \\(8 \\times 12 = 96 \\approx \\mathbf{100}\\) cars!</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="ch07-viz-group-estimate"></div>

<h3>More Fermi Fun</h3>

<p>Try thinking about these questions. There is no single "right" answer — the goal
is to practice <em>thinking about numbers</em>!</p>

<ul>
    <li>How many books are in your school library?</li>
    <li>How many steps does it take to walk from your house to school?</li>
    <li>How many words are on this page?</li>
    <li>How many hours have you been alive?</li>
    <li>How many slices of pizza does your school eat in a month?</li>
</ul>

<div class="viz-placeholder" data-viz="ch07-viz-hours-alive"></div>

<div class="env-block remark">
    <div class="env-title">Think About It</div>
    <div class="env-body">
        <p>Estimation gets better with practice! The more you practice guessing quantities
        and then checking your guesses, the better your <em>number sense</em> becomes. Scientists
        and engineers use estimation every single day to check their work and make quick decisions.</p>
    </div>
</div>

<div class="env-block intuition">
    <div class="env-title">Cool Fact</div>
    <div class="env-body">
        <p>Enrico Fermi was so good at estimation that when the first atomic bomb was tested, he
        dropped small pieces of paper and watched how far the blast wave pushed them. From just
        that, he estimated the power of the explosion — and he was remarkably close to the
        measured answer!</p>
    </div>
</div>
`,
            visualizations: [
                {
                    id: 'ch07-viz-fermi-game',
                    title: 'Fermi Question Challenge',
                    description: 'Read the question, pick your best estimate, then see the answer!',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, {
                            width: 560, height: 340, scale: 1,
                            originX: 0, originY: 0
                        });

                        var questions = [
                            {
                                q: 'How many pages are in a thick novel?',
                                choices: [30, 300, 3000],
                                answer: 1,
                                explain: 'A typical thick novel has about 300-400 pages.'
                            },
                            {
                                q: 'How many days are in a year?',
                                choices: [52, 365, 1000],
                                answer: 1,
                                explain: 'There are 365 days in a year (366 in a leap year). 52 is the number of weeks!'
                            },
                            {
                                q: 'How many hours does a kid sleep per year?',
                                choices: [300, 1500, 3300],
                                answer: 2,
                                explain: 'About 9-10 hours/night x 365 days = about 3,300 hours! That is a LOT of sleeping.'
                            },
                            {
                                q: 'How many grains of rice in one cup?',
                                choices: [90, 900, 9000],
                                answer: 2,
                                explain: 'About 9,000 grains of rice fit in one cup! Rice grains are tiny.'
                            },
                            {
                                q: 'How many minutes in one day?',
                                choices: [144, 1440, 14400],
                                answer: 1,
                                explain: '24 hours x 60 minutes = 1,440 minutes in one day.'
                            },
                            {
                                q: 'How many steps to walk 1 mile?',
                                choices: [200, 2000, 20000],
                                answer: 1,
                                explain: 'About 2,000 steps to walk one mile for a kid. That is why people say "10,000 steps = 5 miles"!'
                            },
                            {
                                q: 'How many tennis balls fit in this room?',
                                choices: [500, 50000, 5000000],
                                answer: 1,
                                explain: 'A typical room might hold about 50,000 tennis balls. Rooms are bigger than you think!'
                            }
                        ];

                        var currentQ = 0;
                        var userPick = -1;
                        var showAnswer = false;

                        // Next question button
                        var nextBtn = document.createElement('button');
                        nextBtn.textContent = 'Next Question';
                        nextBtn.style.cssText = 'padding:6px 14px;border:1px solid #30363d;border-radius:6px;background:#bc8cff;color:#fff;font-size:0.85rem;font-weight:bold;cursor:pointer;';
                        nextBtn.addEventListener('click', function() {
                            currentQ = (currentQ + 1) % questions.length;
                            userPick = -1;
                            showAnswer = false;
                            draw();
                        });
                        controls.appendChild(nextBtn);

                        // Click handler for choosing an answer
                        viz.canvas.addEventListener('click', function(e) {
                            if (showAnswer) return;
                            var rect = viz.canvas.getBoundingClientRect();
                            var mx = e.clientX - rect.left;
                            var my = e.clientY - rect.top;

                            for (var i = 0; i < 3; i++) {
                                var bx = 50 + i * 170;
                                var by = 130;
                                if (mx >= bx && mx <= bx + 145 && my >= by && my <= by + 60) {
                                    userPick = i;
                                    showAnswer = true;
                                    draw();
                                    return;
                                }
                            }
                        });

                        function draw() {
                            var ctx = viz.ctx;
                            ctx.fillStyle = '#0c0c20';
                            ctx.fillRect(0, 0, viz.width, viz.height);

                            var q = questions[currentQ];

                            // Question number
                            ctx.fillStyle = '#8b949e';
                            ctx.font = '13px -apple-system, sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'top';
                            ctx.fillText('Question ' + (currentQ + 1) + ' of ' + questions.length, viz.width / 2, 10);

                            // Question text
                            ctx.fillStyle = '#f0f6fc';
                            ctx.font = 'bold 20px -apple-system, sans-serif';
                            ctx.fillText(q.q, viz.width / 2, 35);

                            ctx.fillStyle = '#d29922';
                            ctx.font = '15px -apple-system, sans-serif';
                            ctx.fillText('Pick the best estimate:', viz.width / 2, 70);

                            // Choice buttons
                            var choiceColors = ['#58a6ff', '#3fb9a0', '#f0883e'];
                            for (var i = 0; i < 3; i++) {
                                var bx = 50 + i * 170;
                                var by = 130;

                                var isSelected = (userPick === i);
                                var isCorrect = (q.answer === i);

                                if (showAnswer && isCorrect) {
                                    ctx.fillStyle = '#3fb95044';
                                    ctx.strokeStyle = '#3fb950';
                                } else if (showAnswer && isSelected && !isCorrect) {
                                    ctx.fillStyle = '#f8514933';
                                    ctx.strokeStyle = '#f85149';
                                } else {
                                    ctx.fillStyle = '#1a1a40';
                                    ctx.strokeStyle = choiceColors[i];
                                }

                                ctx.lineWidth = 3;
                                ctx.beginPath();
                                ctx.roundRect(bx, by, 145, 60, 10);
                                ctx.fill();
                                ctx.stroke();

                                ctx.fillStyle = showAnswer && isCorrect ? '#3fb950' : choiceColors[i];
                                ctx.font = 'bold 24px -apple-system, sans-serif';
                                ctx.textAlign = 'center';
                                ctx.textBaseline = 'middle';
                                ctx.fillText(q.choices[i].toLocaleString(), bx + 72, by + 30);
                            }

                            // Show answer explanation
                            if (showAnswer) {
                                var resultY = 215;
                                if (userPick === q.answer) {
                                    ctx.fillStyle = '#3fb950';
                                    ctx.font = 'bold 22px -apple-system, sans-serif';
                                    ctx.textAlign = 'center';
                                    ctx.textBaseline = 'top';
                                    ctx.fillText('Great thinking!', viz.width / 2, resultY);
                                } else {
                                    ctx.fillStyle = '#f0883e';
                                    ctx.font = 'bold 22px -apple-system, sans-serif';
                                    ctx.textAlign = 'center';
                                    ctx.textBaseline = 'top';
                                    ctx.fillText('Nice try! The answer is ' + q.choices[q.answer].toLocaleString() + '.', viz.width / 2, resultY);
                                }

                                ctx.fillStyle = '#c9d1d9';
                                ctx.font = '15px -apple-system, sans-serif';
                                ctx.fillText(q.explain, viz.width / 2, resultY + 35);

                                ctx.fillStyle = '#8b949e';
                                ctx.font = '13px -apple-system, sans-serif';
                                ctx.fillText('Click "Next Question" for another one!', viz.width / 2, resultY + 70);
                            } else {
                                ctx.fillStyle = '#8b949e';
                                ctx.font = '13px -apple-system, sans-serif';
                                ctx.textAlign = 'center';
                                ctx.textBaseline = 'top';
                                ctx.fillText('Click on a box to make your guess!', viz.width / 2, 210);
                            }
                        }

                        draw();
                        return viz;
                    }
                },
                {
                    id: 'ch07-viz-group-estimate',
                    title: 'Estimate by Grouping',
                    description: 'Stars appear in groups. Count one group, then multiply to estimate the total!',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, {
                            width: 560, height: 340, scale: 1,
                            originX: 0, originY: 0
                        });

                        var groups = [];
                        var starsPerGroup = 0;
                        var numGroups = 0;
                        var totalStars = 0;
                        var showFirst = true;
                        var showTotal = false;

                        var groupColors = ['#58a6ff', '#3fb950', '#f0883e', '#bc8cff', '#f778ba', '#d29922', '#3fb9a0', '#f85149'];

                        function generateStars() {
                            groups = [];
                            numGroups = 3 + Math.floor(Math.random() * 5); // 3-7 groups
                            starsPerGroup = 4 + Math.floor(Math.random() * 7); // 4-10 per group
                            totalStars = numGroups * starsPerGroup;
                            showFirst = true;
                            showTotal = false;

                            var cols = Math.min(numGroups, 4);
                            var rows = Math.ceil(numGroups / cols);
                            var cellW = 520 / cols;
                            var cellH = 200 / rows;

                            for (var g = 0; g < numGroups; g++) {
                                var col = g % cols;
                                var row = Math.floor(g / cols);
                                var gx = 30 + col * cellW + cellW / 2;
                                var gy = 80 + row * cellH + cellH / 2;
                                var stars = [];

                                for (var s = 0; s < starsPerGroup; s++) {
                                    var angle = (s / starsPerGroup) * Math.PI * 2 + Math.random() * 0.5;
                                    var dist = 15 + Math.random() * 20;
                                    stars.push({
                                        x: gx + Math.cos(angle) * dist,
                                        y: gy + Math.sin(angle) * dist
                                    });
                                }

                                groups.push({
                                    cx: gx, cy: gy,
                                    stars: stars,
                                    color: groupColors[g % groupColors.length]
                                });
                            }
                        }

                        generateStars();

                        // New button
                        var newBtn = document.createElement('button');
                        newBtn.textContent = 'New Stars';
                        newBtn.style.cssText = 'padding:6px 14px;border:1px solid #30363d;border-radius:6px;background:#3fb9a0;color:#fff;font-size:0.85rem;font-weight:bold;cursor:pointer;';
                        newBtn.addEventListener('click', function() {
                            generateStars();
                            draw();
                        });
                        controls.appendChild(newBtn);

                        // Show total button
                        var totalBtn = document.createElement('button');
                        totalBtn.textContent = 'Show Total';
                        totalBtn.style.cssText = 'padding:6px 14px;border:1px solid #30363d;border-radius:6px;background:#f0883e;color:#fff;font-size:0.85rem;font-weight:bold;cursor:pointer;margin-left:6px;';
                        totalBtn.addEventListener('click', function() {
                            showTotal = !showTotal;
                            totalBtn.textContent = showTotal ? 'Hide Total' : 'Show Total';
                            draw();
                        });
                        controls.appendChild(totalBtn);

                        function drawStar(ctx, cx, cy, r, color) {
                            ctx.fillStyle = color;
                            ctx.beginPath();
                            for (var i = 0; i < 5; i++) {
                                var angle = -Math.PI / 2 + (i * 2 * Math.PI / 5);
                                var x = cx + Math.cos(angle) * r;
                                var y = cy + Math.sin(angle) * r;
                                if (i === 0) ctx.moveTo(x, y);
                                else ctx.lineTo(x, y);

                                angle += Math.PI / 5;
                                x = cx + Math.cos(angle) * (r * 0.4);
                                y = cy + Math.sin(angle) * (r * 0.4);
                                ctx.lineTo(x, y);
                            }
                            ctx.closePath();
                            ctx.fill();
                        }

                        function draw() {
                            var ctx = viz.ctx;
                            ctx.fillStyle = '#0c0c20';
                            ctx.fillRect(0, 0, viz.width, viz.height);

                            // Title
                            ctx.fillStyle = '#f0f6fc';
                            ctx.font = 'bold 18px -apple-system, sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'top';
                            ctx.fillText('Estimate the Stars!', viz.width / 2, 8);

                            // Hint
                            ctx.fillStyle = '#d29922';
                            ctx.font = '14px -apple-system, sans-serif';
                            ctx.fillText('Count one group, then multiply by the number of groups.', viz.width / 2, 32);

                            // Draw groups
                            for (var g = 0; g < groups.length; g++) {
                                var group = groups[g];

                                // Draw circle around group
                                ctx.strokeStyle = group.color + '44';
                                ctx.lineWidth = 1;
                                ctx.setLineDash([4, 4]);
                                ctx.beginPath();
                                ctx.arc(group.cx, group.cy, 42, 0, Math.PI * 2);
                                ctx.stroke();
                                ctx.setLineDash([]);

                                // Draw stars
                                for (var s = 0; s < group.stars.length; s++) {
                                    drawStar(ctx, group.stars[s].x, group.stars[s].y, 6, group.color);
                                }

                                // Show count for first group
                                if (g === 0 && showFirst) {
                                    ctx.strokeStyle = '#d29922';
                                    ctx.lineWidth = 2;
                                    ctx.beginPath();
                                    ctx.arc(group.cx, group.cy, 46, 0, Math.PI * 2);
                                    ctx.stroke();

                                    ctx.fillStyle = '#d29922';
                                    ctx.font = 'bold 14px -apple-system, sans-serif';
                                    ctx.textAlign = 'center';
                                    ctx.textBaseline = 'bottom';
                                    ctx.fillText(starsPerGroup + ' stars', group.cx, group.cy - 45);
                                }
                            }

                            // Info text
                            var infoY = 300;
                            ctx.fillStyle = '#c9d1d9';
                            ctx.font = '15px -apple-system, sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'top';
                            ctx.fillText(numGroups + ' groups x ' + starsPerGroup + ' per group = ?', viz.width / 2, infoY);

                            if (showTotal) {
                                ctx.fillStyle = '#3fb950';
                                ctx.font = 'bold 20px -apple-system, sans-serif';
                                ctx.fillText('Total: ' + totalStars + ' stars!', viz.width / 2, infoY + 20);
                            }
                        }

                        draw();
                        return viz;
                    }
                },
                {
                    id: 'ch07-viz-hours-alive',
                    title: 'How Many Hours Have You Been Alive?',
                    description: 'Enter your age and watch the calculation build up!',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, {
                            width: 560, height: 300, scale: 1,
                            originX: 0, originY: 0
                        });

                        var age = 9;

                        // Age slider
                        var ageGroup = document.createElement('div');
                        ageGroup.className = 'viz-slider-group';
                        var ageLabel = document.createElement('span');
                        ageLabel.className = 'viz-slider-label';
                        ageLabel.textContent = 'Your age: ';
                        var ageSlider = document.createElement('input');
                        ageSlider.type = 'range';
                        ageSlider.className = 'viz-slider';
                        ageSlider.min = '5';
                        ageSlider.max = '15';
                        ageSlider.step = '1';
                        ageSlider.value = '9';
                        ageSlider.style.width = '150px';
                        var ageVal = document.createElement('span');
                        ageVal.className = 'viz-slider-value';
                        ageVal.textContent = '9';
                        ageSlider.addEventListener('input', function() {
                            age = parseInt(ageSlider.value);
                            ageVal.textContent = String(age);
                            draw();
                        });
                        ageGroup.appendChild(ageLabel);
                        ageGroup.appendChild(ageSlider);
                        ageGroup.appendChild(ageVal);
                        controls.appendChild(ageGroup);

                        function draw() {
                            var ctx = viz.ctx;
                            ctx.fillStyle = '#0c0c20';
                            ctx.fillRect(0, 0, viz.width, viz.height);

                            var days = age * 365;
                            var hours = days * 24;
                            var minutes = hours * 60;
                            var heartbeats = minutes * 80; // ~80 bpm

                            // Title
                            ctx.fillStyle = '#f0f6fc';
                            ctx.font = 'bold 20px -apple-system, sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'top';
                            ctx.fillText('If you are ' + age + ' years old...', viz.width / 2, 10);

                            // Calculation steps
                            var steps = [
                                { label: 'Years', value: age, calc: age + ' years', color: '#58a6ff', icon: '' },
                                { label: 'Days', value: days, calc: age + ' x 365 = ' + days.toLocaleString(), color: '#3fb9a0', icon: '' },
                                { label: 'Hours', value: hours, calc: days.toLocaleString() + ' x 24 = ' + hours.toLocaleString(), color: '#f0883e', icon: '' },
                                { label: 'Minutes', value: minutes, calc: hours.toLocaleString() + ' x 60 = ' + minutes.toLocaleString(), color: '#bc8cff', icon: '' },
                                { label: 'Heartbeats', value: heartbeats, calc: '~ ' + heartbeats.toLocaleString(), color: '#f85149', icon: '' }
                            ];

                            var startY = 50;
                            var rowH = 48;

                            for (var i = 0; i < steps.length; i++) {
                                var step = steps[i];
                                var y = startY + i * rowH;

                                // Label
                                ctx.fillStyle = step.color;
                                ctx.font = 'bold 16px -apple-system, sans-serif';
                                ctx.textAlign = 'left';
                                ctx.textBaseline = 'top';
                                ctx.fillText(step.label + ':', 30, y);

                                // Value box
                                ctx.fillStyle = step.color + '22';
                                ctx.fillRect(150, y - 4, 180, 32);
                                ctx.strokeStyle = step.color;
                                ctx.lineWidth = 2;
                                ctx.strokeRect(150, y - 4, 180, 32);

                                ctx.fillStyle = step.color;
                                ctx.font = 'bold 18px -apple-system, sans-serif';
                                ctx.textAlign = 'center';
                                ctx.textBaseline = 'top';
                                ctx.fillText(step.value.toLocaleString(), 240, y);

                                // Calculation
                                ctx.fillStyle = '#8b949e';
                                ctx.font = '13px -apple-system, sans-serif';
                                ctx.textAlign = 'left';
                                ctx.fillText(step.calc, 350, y + 4);

                                // Arrow to next step
                                if (i < steps.length - 1) {
                                    ctx.fillStyle = '#4a4a7a';
                                    ctx.font = '16px -apple-system, sans-serif';
                                    ctx.textAlign = 'center';
                                    ctx.fillText('↓', 240, y + 30);
                                }
                            }

                            // Fun message
                            ctx.fillStyle = '#d29922';
                            ctx.font = 'bold 14px -apple-system, sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'bottom';
                            ctx.fillText('That is a LOT of heartbeats! And you did not have to count them!', viz.width / 2, viz.height - 10);
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: '<strong>Fermi Question:</strong> About how many books are in your school library? Break the problem into smaller pieces to estimate.',
                    hint: 'Think: How many shelves are there? How many books fit on each shelf? Multiply!',
                    solution: 'Example reasoning: A library might have about \\(20\\) bookcases, each with \\(5\\) shelves, and each shelf holding about \\(30\\) books. That gives us \\(20 \\times 5 \\times 30 = 3{,}000\\) books. A typical school library has between 2,000 and 10,000 books, so this is a great estimate!'
                },
                {
                    question: '<strong>Fermi Question:</strong> About how many steps do you take to walk from your classroom to the cafeteria? How would you figure this out?',
                    hint: 'Think about how long the walk takes and how many steps you take per minute. Or estimate the distance and how long each step is.',
                    solution: 'Example: The walk takes about \\(2\\) minutes. You take about \\(100\\) steps per minute. So that is about \\(2 \\times 100 = 200\\) steps. Another way: the distance is about \\(150\\) meters, and each step is about \\(0.6\\) meters, giving \\(150 \\div 0.6 = 250\\) steps. Both estimates are in the same ballpark!'
                },
                {
                    question: 'You see a field of flowers. You count \\(12\\) flowers in a small patch. You estimate there are about \\(15\\) patches of that size in the field. About how many flowers are in the field?',
                    hint: 'Multiply the number of flowers in one patch by the number of patches.',
                    solution: 'Estimate: \\(12 \\times 15 = 180\\) flowers. We can round to say "about \\(200\\) flowers" to make it a nice, friendly number. This grouping strategy is a powerful estimation technique!'
                }
            ]
        }

    ] // end sections
});
