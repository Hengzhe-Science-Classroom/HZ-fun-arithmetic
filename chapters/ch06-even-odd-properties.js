// === Chapter 6: Even, Odd & Number Properties ===
// Fun, colorful, interactive content for elementary school kids (ages 7-12)

window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch06',
    number: 6,
    title: 'Even, Odd & Number Properties',
    subtitle: 'Discover the hidden secrets that every number carries!',
    sections: [

// ============================================================
// Section 1: Even & Odd Numbers
// ============================================================
{
    id: 'ch06-sec01',
    title: 'Even & Odd Numbers',
    content: `
<h2>Even & Odd Numbers</h2>

<p>Have you ever tried to share things equally with a friend? Sometimes it works out perfectly, and sometimes one item is left over. That difference is the secret behind <strong>even</strong> and <strong>odd</strong> numbers!</p>

<div class="env-block intuition">
    <div class="env-title">Discovery: The Pairing Test</div>
    <div class="env-body">
        <p>Imagine you have a pile of socks and you want to make pairs. If every sock gets a partner with none left over, the number of socks is <strong>even</strong>. If one lonely sock is left without a partner, the number is <strong>odd</strong>.</p>
    </div>
</div>

<p>Let's try it:</p>
<ul>
    <li><strong>4 socks:</strong> pair 1 + pair 2 = all matched! \\(4\\) is <em>even</em>.</li>
    <li><strong>7 socks:</strong> pair 1 + pair 2 + pair 3 = 6 matched, but 1 is left over! \\(7\\) is <em>odd</em>.</li>
</ul>

<div class="viz-placeholder" data-viz="ch06-viz-pairing"></div>

<div class="env-block example">
    <div class="env-title">Example: Shoes in a Row</div>
    <div class="env-body">
        <p>You have 10 shoes. Can you pair them all up?</p>
        <p>Yes! \\(10 \\div 2 = 5\\) pairs with nothing left over. So \\(10\\) is <strong>even</strong>.</p>
        <p>What about 11 shoes? \\(11 \\div 2 = 5\\) pairs with <strong>1 left over</strong>. So \\(11\\) is <strong>odd</strong>.</p>
    </div>
</div>

<h3>A Quick Trick</h3>

<p>You don't need to pair anything up every time! Just look at the <strong>last digit</strong> of a number:</p>
<ul>
    <li>Ends in <strong>0, 2, 4, 6, or 8</strong> &rarr; <strong>Even</strong></li>
    <li>Ends in <strong>1, 3, 5, 7, or 9</strong> &rarr; <strong>Odd</strong></li>
</ul>

<div class="viz-placeholder" data-viz="ch06-viz-even-odd-line"></div>

<div class="env-block remark">
    <div class="env-title">Think About It</div>
    <div class="env-body">
        <p>Is \\(0\\) even or odd? Try to pair zero objects. There are no objects left over, so \\(0\\) is <strong>even</strong>! It might feel strange, but it follows the rule perfectly.</p>
    </div>
</div>

<p>Even numbers can be written as \\(2 \\times n\\) for some whole number \\(n\\). Odd numbers can be written as \\(2 \\times n + 1\\). For example, \\(8 = 2 \\times 4\\) (even) and \\(9 = 2 \\times 4 + 1\\) (odd).</p>
    `,
    visualizations: [
        {
            id: 'ch06-viz-pairing',
            title: 'Sock Pairing Machine',
            description: 'Change the number of socks and watch them pair up! Is the number even or odd?',
            setup: function(container, controls) {
                var viz = new VizEngine(container, {
                    width: 560, height: 340, scale: 1,
                    originX: 0, originY: 0
                });

                var count = 6;

                var numGroup = document.createElement('div');
                numGroup.className = 'viz-slider-group';
                var numLabel = document.createElement('span');
                numLabel.className = 'viz-slider-label';
                numLabel.textContent = 'Socks: ';
                var numSlider = document.createElement('input');
                numSlider.type = 'range';
                numSlider.className = 'viz-slider';
                numSlider.min = '1';
                numSlider.max = '16';
                numSlider.step = '1';
                numSlider.value = String(count);
                var numVal = document.createElement('span');
                numVal.className = 'viz-slider-value';
                numVal.textContent = String(count);
                numSlider.addEventListener('input', function() {
                    count = parseInt(numSlider.value);
                    numVal.textContent = String(count);
                    draw();
                });
                numGroup.appendChild(numLabel);
                numGroup.appendChild(numSlider);
                numGroup.appendChild(numVal);
                controls.appendChild(numGroup);

                var sockColors = [
                    '#FF6B6B', '#4ECDC4', '#FFE66D', '#58A6FF',
                    '#BC8CFF', '#F0883E', '#3FB950', '#F778BA',
                    '#FF6B6B', '#4ECDC4', '#FFE66D', '#58A6FF',
                    '#BC8CFF', '#F0883E', '#3FB950', '#F778BA'
                ];

                function drawSock(ctx, x, y, color, size) {
                    ctx.fillStyle = color;
                    ctx.beginPath();
                    ctx.ellipse(x, y - size * 0.3, size * 0.3, size * 0.6, 0, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.beginPath();
                    ctx.ellipse(x + size * 0.15, y + size * 0.25, size * 0.35, size * 0.2, 0.3, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.strokeStyle = color;
                    ctx.lineWidth = 2;
                    ctx.beginPath();
                    ctx.arc(x + size * 0.05, y + size * 0.05, size * 0.15, 0, Math.PI);
                    ctx.stroke();
                }

                function draw() {
                    var ctx = viz.ctx;
                    ctx.fillStyle = '#0c0c20';
                    ctx.fillRect(0, 0, viz.width, viz.height);

                    var pairs = Math.floor(count / 2);
                    var leftover = count % 2;
                    var isEven = leftover === 0;

                    // Title
                    ctx.fillStyle = '#f0f6fc';
                    ctx.font = 'bold 20px -apple-system, sans-serif';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'top';
                    ctx.fillText(count + ' Socks', viz.width / 2, 12);

                    // Result label
                    ctx.font = 'bold 16px -apple-system, sans-serif';
                    ctx.fillStyle = isEven ? '#3FB950' : '#F0883E';
                    ctx.fillText(isEven ? 'EVEN - All paired up!' : 'ODD - One sock left over!', viz.width / 2, 38);

                    // Draw paired socks
                    var startY = 80;
                    var pairSpacing = 50;
                    var sockSize = 28;
                    var colWidth = 130;
                    var cols = Math.min(pairs, 4);
                    var startX = (viz.width - cols * colWidth) / 2 + colWidth / 2;

                    for (var p = 0; p < pairs; p++) {
                        var col = p % 4;
                        var row = Math.floor(p / 4);
                        var px = startX + col * colWidth;
                        var py = startY + row * (pairSpacing + 30) + 20;

                        // Bracket showing a pair
                        ctx.strokeStyle = '#4a4a7a';
                        ctx.lineWidth = 1.5;
                        ctx.beginPath();
                        ctx.moveTo(px - 30, py + sockSize + 10);
                        ctx.lineTo(px - 30, py + sockSize + 18);
                        ctx.lineTo(px + 30, py + sockSize + 18);
                        ctx.lineTo(px + 30, py + sockSize + 10);
                        ctx.stroke();

                        ctx.fillStyle = '#8b949e';
                        ctx.font = '11px -apple-system, sans-serif';
                        ctx.textAlign = 'center';
                        ctx.textBaseline = 'top';
                        ctx.fillText('pair ' + (p + 1), px, py + sockSize + 21);

                        // Left sock
                        drawSock(ctx, px - 18, py, sockColors[p * 2 % sockColors.length], sockSize);
                        // Right sock
                        drawSock(ctx, px + 18, py, sockColors[p * 2 % sockColors.length], sockSize);
                    }

                    // Draw leftover sock
                    if (leftover > 0) {
                        var loX = viz.width / 2;
                        var loY = startY + (Math.floor((pairs - 1) / 4) + 1) * (pairSpacing + 30) + 30;
                        if (pairs === 0) loY = startY + 20;

                        // Lonely glow
                        ctx.shadowColor = '#F0883E';
                        ctx.shadowBlur = 20;
                        drawSock(ctx, loX, loY, '#F0883E', sockSize + 4);
                        ctx.shadowBlur = 0;

                        ctx.fillStyle = '#F0883E';
                        ctx.font = 'bold 13px -apple-system, sans-serif';
                        ctx.textAlign = 'center';
                        ctx.textBaseline = 'top';
                        ctx.fillText('Left over!', loX, loY + sockSize + 8);
                    }

                    // Formula
                    ctx.fillStyle = '#8b949e';
                    ctx.font = '14px -apple-system, sans-serif';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'bottom';
                    var formula = count + ' = ' + pairs + ' pairs';
                    if (leftover > 0) formula += ' + 1 left over';
                    ctx.fillText(formula, viz.width / 2, viz.height - 10);
                }

                draw();
                return viz;
            }
        },
        {
            id: 'ch06-viz-even-odd-line',
            title: 'Even & Odd Number Line',
            description: 'See the pattern of even (green) and odd (orange) numbers on the number line!',
            setup: function(container, controls) {
                var viz = new VizEngine(container, {
                    width: 560, height: 200, scale: 25,
                    originX: 30, originY: 120
                });

                function draw() {
                    viz.clear();
                    var ctx = viz.ctx;

                    ctx.fillStyle = '#f0f6fc';
                    ctx.font = 'bold 16px -apple-system, sans-serif';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'top';
                    ctx.fillText('Even & Odd Pattern', viz.width / 2, 8);

                    // Number line
                    var lineY = 0;
                    var startPx = viz.toScreen(0, lineY);
                    var endPx = viz.toScreen(20, lineY);
                    ctx.strokeStyle = '#4a4a7a';
                    ctx.lineWidth = 2;
                    ctx.beginPath();
                    ctx.moveTo(startPx[0], startPx[1]);
                    ctx.lineTo(endPx[0], endPx[1]);
                    ctx.stroke();

                    for (var i = 0; i <= 20; i++) {
                        var px = viz.toScreen(i, lineY);
                        var isEven = i % 2 === 0;
                        var color = isEven ? '#3FB950' : '#F0883E';

                        // Circle
                        ctx.shadowColor = color;
                        ctx.shadowBlur = 8;
                        ctx.fillStyle = color;
                        ctx.beginPath();
                        ctx.arc(px[0], px[1], 10, 0, Math.PI * 2);
                        ctx.fill();
                        ctx.shadowBlur = 0;

                        // Number
                        ctx.fillStyle = '#ffffff';
                        ctx.font = 'bold 10px -apple-system, sans-serif';
                        ctx.textAlign = 'center';
                        ctx.textBaseline = 'middle';
                        ctx.fillText(String(i), px[0], px[1]);

                        // Label below
                        ctx.fillStyle = color;
                        ctx.font = '9px -apple-system, sans-serif';
                        ctx.textBaseline = 'top';
                        ctx.fillText(isEven ? 'E' : 'O', px[0], px[1] + 14);
                    }

                    // Legend
                    ctx.font = 'bold 13px -apple-system, sans-serif';
                    ctx.textBaseline = 'bottom';
                    ctx.textAlign = 'left';
                    ctx.fillStyle = '#3FB950';
                    ctx.fillText('E = Even', 30, viz.height - 8);
                    ctx.fillStyle = '#F0883E';
                    ctx.fillText('O = Odd', 140, viz.height - 8);
                }

                draw();
                return viz;
            }
        }
    ],
    exercises: [
        {
            question: 'Is \\(47\\) even or odd? How do you know?',
            hint: 'Look at the last digit of the number. What is it?',
            solution: '\\(47\\) is <strong>odd</strong> because its last digit is \\(7\\), which is odd. You can also check: \\(47 \\div 2 = 23\\) remainder \\(1\\), so one object would be left over.'
        },
        {
            question: 'Write down all the even numbers from \\(20\\) to \\(36\\).',
            hint: 'Start at \\(20\\) and count by \\(2\\)s.',
            solution: '\\(20, 22, 24, 26, 28, 30, 32, 34, 36\\). There are \\(9\\) even numbers in this range.'
        },
        {
            question: 'A farmer has \\(15\\) apples and wants to share them equally with a friend. Can they do it without cutting any apples? Why or why not?',
            hint: 'Is \\(15\\) even or odd?',
            solution: 'No, they cannot. \\(15\\) is <strong>odd</strong>, so when split into \\(2\\) groups you get \\(7\\) each with \\(1\\) left over. The farmer would need to cut the last apple in half!'
        }
    ]
},

// ============================================================
// Section 2: Even + Odd Rules
// ============================================================
{
    id: 'ch06-sec02',
    title: 'Even + Odd Rules',
    content: `
<h2>Even + Odd Rules</h2>

<p>When you add two numbers together, can you predict whether the answer will be even or odd? <strong>Yes, you can!</strong> There are simple rules, and once you see <em>why</em> they work, you'll never forget them.</p>

<div class="env-block intuition">
    <div class="env-title">Discovery: The Three Rules of Addition</div>
    <div class="env-body">
        <p><strong>Rule 1:</strong> Even + Even = <strong>Even</strong></p>
        <p><strong>Rule 2:</strong> Odd + Odd = <strong>Even</strong></p>
        <p><strong>Rule 3:</strong> Even + Odd = <strong>Odd</strong></p>
    </div>
</div>

<h3>Why Do These Rules Work?</h3>

<p>Think about pairing again! An <strong>even</strong> number is one where all items are perfectly paired. An <strong>odd</strong> number has all items paired except for one lonely leftover.</p>

<div class="env-block example">
    <div class="env-title">Try This! Visual Proof</div>
    <div class="env-body">
        <p><strong>Even + Even (4 + 6):</strong> All paired + all paired = still all paired. Result: \\(10\\) (even).</p>
        <p><strong>Odd + Odd (3 + 5):</strong> Each has one leftover. The two leftovers pair with each other! Result: \\(8\\) (even).</p>
        <p><strong>Even + Odd (4 + 3):</strong> Even is all paired, but odd has a leftover. That leftover stays lonely. Result: \\(7\\) (odd).</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="ch06-viz-add-rules"></div>

<h3>What About Subtraction?</h3>

<p>The same rules apply to subtraction too!</p>
<ul>
    <li>Even \\(-\\) Even = <strong>Even</strong> (e.g., \\(8 - 4 = 4\\))</li>
    <li>Odd \\(-\\) Odd = <strong>Even</strong> (e.g., \\(9 - 5 = 4\\))</li>
    <li>Even \\(-\\) Odd = <strong>Odd</strong> (e.g., \\(10 - 3 = 7\\))</li>
    <li>Odd \\(-\\) Even = <strong>Odd</strong> (e.g., \\(7 - 2 = 5\\))</li>
</ul>

<div class="viz-placeholder" data-viz="ch06-viz-multiply-rules"></div>

<h3>What About Multiplication?</h3>

<div class="env-block intuition">
    <div class="env-title">Cool Fact: Multiplication Rules</div>
    <div class="env-body">
        <p><strong>Even \\(\\times\\) anything = Even.</strong> If either number is even, the product is even!</p>
        <p><strong>Odd \\(\\times\\) Odd = Odd.</strong> The <em>only</em> way to get an odd product is if <em>both</em> numbers are odd.</p>
    </div>
</div>

<div class="env-block warning">
    <div class="env-title">Watch Out!</div>
    <div class="env-body">
        <p>Don't mix up the rules! Odd + Odd = <strong>Even</strong> (the leftovers pair up), but Odd \\(\\times\\) Odd = <strong>Odd</strong>. Addition and multiplication have different rules.</p>
    </div>
</div>
    `,
    visualizations: [
        {
            id: 'ch06-viz-add-rules',
            title: 'Even + Odd Addition Explorer',
            description: 'Pick two numbers and watch how pairing reveals the addition rule!',
            setup: function(container, controls) {
                var viz = new VizEngine(container, {
                    width: 560, height: 320, scale: 1,
                    originX: 0, originY: 0
                });

                var numA = 4;
                var numB = 3;

                var sliderA = document.createElement('div');
                sliderA.className = 'viz-slider-group';
                var labelA = document.createElement('span');
                labelA.className = 'viz-slider-label';
                labelA.textContent = 'A: ';
                var inputA = document.createElement('input');
                inputA.type = 'range'; inputA.className = 'viz-slider';
                inputA.min = '1'; inputA.max = '10'; inputA.value = String(numA);
                var valA = document.createElement('span');
                valA.className = 'viz-slider-value'; valA.textContent = String(numA);
                inputA.addEventListener('input', function() {
                    numA = parseInt(inputA.value); valA.textContent = String(numA); draw();
                });
                sliderA.appendChild(labelA); sliderA.appendChild(inputA); sliderA.appendChild(valA);
                controls.appendChild(sliderA);

                var sliderB = document.createElement('div');
                sliderB.className = 'viz-slider-group';
                var labelB = document.createElement('span');
                labelB.className = 'viz-slider-label';
                labelB.textContent = 'B: ';
                var inputB = document.createElement('input');
                inputB.type = 'range'; inputB.className = 'viz-slider';
                inputB.min = '1'; inputB.max = '10'; inputB.value = String(numB);
                var valB = document.createElement('span');
                valB.className = 'viz-slider-value'; valB.textContent = String(numB);
                inputB.addEventListener('input', function() {
                    numB = parseInt(inputB.value); valB.textContent = String(numB); draw();
                });
                sliderB.appendChild(labelB); sliderB.appendChild(inputB); sliderB.appendChild(valB);
                controls.appendChild(sliderB);

                function draw() {
                    var ctx = viz.ctx;
                    ctx.fillStyle = '#0c0c20';
                    ctx.fillRect(0, 0, viz.width, viz.height);

                    var aEven = numA % 2 === 0;
                    var bEven = numB % 2 === 0;
                    var sum = numA + numB;
                    var sumEven = sum % 2 === 0;

                    var aColor = aEven ? '#3FB950' : '#F0883E';
                    var bColor = bEven ? '#3FB950' : '#F0883E';
                    var sumColor = sumEven ? '#3FB950' : '#F0883E';

                    // Title
                    ctx.fillStyle = '#f0f6fc';
                    ctx.font = 'bold 18px -apple-system, sans-serif';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'top';
                    var typeA = aEven ? 'Even' : 'Odd';
                    var typeB = bEven ? 'Even' : 'Odd';
                    var typeSum = sumEven ? 'Even' : 'Odd';
                    ctx.fillText(typeA + ' + ' + typeB + ' = ' + typeSum, viz.width / 2, 10);

                    // Numbers
                    ctx.font = 'bold 22px -apple-system, sans-serif';
                    ctx.fillStyle = aColor;
                    ctx.fillText(String(numA), viz.width / 2 - 80, 40);
                    ctx.fillStyle = '#f0f6fc';
                    ctx.fillText('+', viz.width / 2, 40);
                    ctx.fillStyle = bColor;
                    ctx.fillText(String(numB), viz.width / 2 + 40, 40);
                    ctx.fillStyle = '#f0f6fc';
                    ctx.fillText('=', viz.width / 2 + 80, 40);
                    ctx.fillStyle = sumColor;
                    ctx.fillText(String(sum), viz.width / 2 + 120, 40);

                    // Draw dots for A
                    var dotR = 10;
                    var dotGap = 26;
                    var rowY = 90;
                    var aPairs = Math.floor(numA / 2);
                    var aLeft = numA % 2;

                    ctx.fillStyle = '#8b949e';
                    ctx.font = '12px -apple-system, sans-serif';
                    ctx.textAlign = 'center';
                    ctx.fillText('A = ' + numA + ' (' + typeA + ')', 140, rowY - 5);

                    for (var i = 0; i < aPairs; i++) {
                        var x1 = 80 + i * (dotGap * 2 + 10);
                        var y1 = rowY + 20;
                        // Pair bracket
                        ctx.strokeStyle = '#4a4a7a';
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(x1, y1 + dotR + 4);
                        ctx.lineTo(x1, y1 + dotR + 10);
                        ctx.lineTo(x1 + dotGap, y1 + dotR + 10);
                        ctx.lineTo(x1 + dotGap, y1 + dotR + 4);
                        ctx.stroke();
                        // Dots
                        ctx.fillStyle = '#58A6FF';
                        ctx.beginPath(); ctx.arc(x1, y1, dotR, 0, Math.PI * 2); ctx.fill();
                        ctx.beginPath(); ctx.arc(x1 + dotGap, y1, dotR, 0, Math.PI * 2); ctx.fill();
                    }
                    if (aLeft > 0) {
                        var lx = 80 + aPairs * (dotGap * 2 + 10);
                        ctx.fillStyle = '#F0883E';
                        ctx.shadowColor = '#F0883E';
                        ctx.shadowBlur = 10;
                        ctx.beginPath(); ctx.arc(lx, rowY + 20, dotR, 0, Math.PI * 2); ctx.fill();
                        ctx.shadowBlur = 0;
                    }

                    // Draw dots for B
                    var rowY2 = 150;
                    var bPairs = Math.floor(numB / 2);
                    var bLeft = numB % 2;

                    ctx.fillStyle = '#8b949e';
                    ctx.font = '12px -apple-system, sans-serif';
                    ctx.fillText('B = ' + numB + ' (' + typeB + ')', 140, rowY2 - 5);

                    for (var j = 0; j < bPairs; j++) {
                        var x2 = 80 + j * (dotGap * 2 + 10);
                        var y2 = rowY2 + 20;
                        ctx.strokeStyle = '#4a4a7a';
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(x2, y2 + dotR + 4);
                        ctx.lineTo(x2, y2 + dotR + 10);
                        ctx.lineTo(x2 + dotGap, y2 + dotR + 10);
                        ctx.lineTo(x2 + dotGap, y2 + dotR + 4);
                        ctx.stroke();
                        ctx.fillStyle = '#4ECDC4';
                        ctx.beginPath(); ctx.arc(x2, y2, dotR, 0, Math.PI * 2); ctx.fill();
                        ctx.beginPath(); ctx.arc(x2 + dotGap, y2, dotR, 0, Math.PI * 2); ctx.fill();
                    }
                    if (bLeft > 0) {
                        var lx2 = 80 + bPairs * (dotGap * 2 + 10);
                        ctx.fillStyle = '#F0883E';
                        ctx.shadowColor = '#F0883E';
                        ctx.shadowBlur = 10;
                        ctx.beginPath(); ctx.arc(lx2, rowY2 + 20, dotR, 0, Math.PI * 2); ctx.fill();
                        ctx.shadowBlur = 0;
                    }

                    // Combined result
                    var rowY3 = 230;
                    ctx.strokeStyle = sumColor;
                    ctx.lineWidth = 2;
                    ctx.setLineDash([4, 4]);
                    ctx.strokeRect(20, rowY3 - 15, viz.width - 40, 70);
                    ctx.setLineDash([]);

                    ctx.fillStyle = sumColor;
                    ctx.font = 'bold 14px -apple-system, sans-serif';
                    ctx.textAlign = 'center';
                    ctx.fillText('Combined: ' + sum + ' dots = ' + Math.floor(sum / 2) + ' pairs' +
                        (sum % 2 === 1 ? ' + 1 leftover' : '') +
                        ' = ' + typeSum + '!', viz.width / 2, rowY3);

                    // Explanation
                    ctx.fillStyle = '#8b949e';
                    ctx.font = '13px -apple-system, sans-serif';
                    if (aLeft > 0 && bLeft > 0) {
                        ctx.fillText('Both leftovers pair together, making the sum even!', viz.width / 2, rowY3 + 28);
                    } else if (aLeft > 0 || bLeft > 0) {
                        ctx.fillText('One leftover stays alone, making the sum odd!', viz.width / 2, rowY3 + 28);
                    } else {
                        ctx.fillText('No leftovers at all, the sum stays even!', viz.width / 2, rowY3 + 28);
                    }
                }

                draw();
                return viz;
            }
        },
        {
            id: 'ch06-viz-multiply-rules',
            title: 'Multiplication Parity Table',
            description: 'See what happens when you multiply even and odd numbers!',
            setup: function(container, controls) {
                var viz = new VizEngine(container, {
                    width: 560, height: 260, scale: 1,
                    originX: 0, originY: 0
                });

                function draw() {
                    var ctx = viz.ctx;
                    ctx.fillStyle = '#0c0c20';
                    ctx.fillRect(0, 0, viz.width, viz.height);

                    ctx.fillStyle = '#f0f6fc';
                    ctx.font = 'bold 16px -apple-system, sans-serif';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'top';
                    ctx.fillText('Multiplication Rules', viz.width / 2, 10);

                    var tableX = viz.width / 2 - 140;
                    var tableY = 50;
                    var cellW = 120;
                    var cellH = 50;

                    // Header row
                    ctx.fillStyle = '#4a4a7a';
                    ctx.fillRect(tableX + cellW, tableY, cellW, cellH);
                    ctx.fillRect(tableX + cellW * 2, tableY, cellW, cellH);
                    ctx.fillRect(tableX, tableY + cellH, cellW, cellH);
                    ctx.fillRect(tableX, tableY + cellH * 2, cellW, cellH);

                    // Corner
                    ctx.fillStyle = '#1a1a40';
                    ctx.fillRect(tableX, tableY, cellW, cellH);
                    ctx.fillStyle = '#8b949e';
                    ctx.font = 'bold 13px -apple-system, sans-serif';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.fillText('x', tableX + cellW / 2, tableY + cellH / 2);

                    // Header labels
                    ctx.fillStyle = '#3FB950';
                    ctx.fillText('Even', tableX + cellW + cellW / 2, tableY + cellH / 2);
                    ctx.fillStyle = '#F0883E';
                    ctx.fillText('Odd', tableX + cellW * 2 + cellW / 2, tableY + cellH / 2);
                    ctx.fillStyle = '#3FB950';
                    ctx.fillText('Even', tableX + cellW / 2, tableY + cellH + cellH / 2);
                    ctx.fillStyle = '#F0883E';
                    ctx.fillText('Odd', tableX + cellW / 2, tableY + cellH * 2 + cellH / 2);

                    // Results
                    var results = [
                        [{ text: 'Even', color: '#3FB950', ex: '2x4=8' }, { text: 'Even', color: '#3FB950', ex: '2x3=6' }],
                        [{ text: 'Even', color: '#3FB950', ex: '3x4=12' }, { text: 'Odd', color: '#F0883E', ex: '3x5=15' }]
                    ];

                    for (var r = 0; r < 2; r++) {
                        for (var c = 0; c < 2; c++) {
                            var cx = tableX + (c + 1) * cellW;
                            var cy = tableY + (r + 1) * cellH;
                            var res = results[r][c];

                            ctx.fillStyle = res.color + '22';
                            ctx.fillRect(cx, cy, cellW, cellH);

                            ctx.strokeStyle = '#30363d';
                            ctx.lineWidth = 1;
                            ctx.strokeRect(cx, cy, cellW, cellH);

                            ctx.fillStyle = res.color;
                            ctx.font = 'bold 14px -apple-system, sans-serif';
                            ctx.fillText(res.text, cx + cellW / 2, cy + cellH / 2 - 8);
                            ctx.fillStyle = '#8b949e';
                            ctx.font = '11px -apple-system, sans-serif';
                            ctx.fillText(res.ex, cx + cellW / 2, cy + cellH / 2 + 10);
                        }
                    }

                    // Key insight
                    ctx.fillStyle = '#BC8CFF';
                    ctx.font = 'bold 13px -apple-system, sans-serif';
                    ctx.textAlign = 'center';
                    ctx.fillText('Only Odd x Odd = Odd. Everything else is Even!', viz.width / 2, tableY + cellH * 3 + 20);
                }

                draw();
                return viz;
            }
        }
    ],
    exercises: [
        {
            question: 'Without adding, tell whether \\(13 + 27\\) is even or odd.',
            hint: 'What type is \\(13\\)? What type is \\(27\\)? Use the addition rules.',
            solution: '\\(13\\) is odd and \\(27\\) is odd. Odd + Odd = <strong>Even</strong>. We can check: \\(13 + 27 = 40\\), which is indeed even!'
        },
        {
            question: 'Is \\(6 \\times 7\\) even or odd? What about \\(5 \\times 9\\)?',
            hint: 'For multiplication, if either number is even, the product is even.',
            solution: '\\(6 \\times 7\\): \\(6\\) is even, so the product is <strong>even</strong> (\\(42\\)). \\(5 \\times 9\\): both are odd, so the product is <strong>odd</strong> (\\(45\\)).'
        },
        {
            question: 'If you add three odd numbers together, is the result even or odd? Can you explain why?',
            hint: 'Try it step by step: first add two odd numbers, then add the third.',
            solution: 'Odd + Odd = Even. Then Even + Odd = <strong>Odd</strong>. So three odd numbers added together always give an odd result. Example: \\(3 + 5 + 7 = 15\\) (odd).'
        }
    ]
},

// ============================================================
// Section 3: Factors & Multiples
// ============================================================
{
    id: 'ch06-sec03',
    title: 'Factors & Multiples',
    content: `
<h2>Factors & Multiples</h2>

<p>Every number has special friends called <strong>factors</strong> and a whole family of numbers called <strong>multiples</strong>. Let's meet them!</p>

<div class="env-block intuition">
    <div class="env-title">Discovery: What Are Factors?</div>
    <div class="env-body">
        <p>A <strong>factor</strong> of a number is any whole number that divides into it evenly (with no remainder). Think of it like this: if you can arrange \\(12\\) objects into equal rows, the number of rows and the number in each row are both <em>factors</em> of \\(12\\).</p>
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example: Factors of 12</div>
    <div class="env-body">
        <p>\\(12 = 1 \\times 12\\) &rarr; factors: \\(1\\) and \\(12\\)</p>
        <p>\\(12 = 2 \\times 6\\) &rarr; factors: \\(2\\) and \\(6\\)</p>
        <p>\\(12 = 3 \\times 4\\) &rarr; factors: \\(3\\) and \\(4\\)</p>
        <p>So the factors of \\(12\\) are: <strong>1, 2, 3, 4, 6, 12</strong>.</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="ch06-viz-factor-rect"></div>

<h3>What Are Multiples?</h3>

<p><strong>Multiples</strong> are what you get when you skip-count by a number. They are the results of multiplying that number by \\(1, 2, 3, 4, \\ldots\\)</p>

<div class="env-block example">
    <div class="env-title">Example: Multiples of 3</div>
    <div class="env-body">
        <p>\\(3 \\times 1 = 3\\), \\(3 \\times 2 = 6\\), \\(3 \\times 3 = 9\\), \\(3 \\times 4 = 12\\), \\ldots</p>
        <p>Multiples of \\(3\\): <strong>3, 6, 9, 12, 15, 18, 21, ...</strong> (they go on forever!)</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="ch06-viz-multiples-hop"></div>

<div class="env-block remark">
    <div class="env-title">Think About It</div>
    <div class="env-body">
        <p>Factors and multiples are like opposites!</p>
        <p>If \\(3\\) is a <em>factor</em> of \\(12\\), then \\(12\\) is a <em>multiple</em> of \\(3\\).</p>
        <p>Factors are the small friends that fit inside a number. Multiples are the big results you get from skip-counting.</p>
    </div>
</div>

<h3>Factor Pairs</h3>

<p>Factors always come in <strong>pairs</strong>. When you find one factor, you automatically find another! For \\(12\\):</p>
<p>\\(1 \\times 12\\), \\(2 \\times 6\\), \\(3 \\times 4\\). That gives us three factor pairs.</p>

<div class="env-block warning">
    <div class="env-title">Watch Out!</div>
    <div class="env-body">
        <p>Sometimes both factors in a pair are the <em>same</em> number! For example, \\(9 = 3 \\times 3\\). The number \\(3\\) appears twice, but we only list it once as a factor. The factors of \\(9\\) are: \\(1, 3, 9\\). Numbers where a factor pairs with itself are called <strong>perfect squares</strong>!</p>
    </div>
</div>
    `,
    visualizations: [
        {
            id: 'ch06-viz-factor-rect',
            title: 'Factor Rectangles',
            description: 'Choose a number and see all the ways to arrange it as a rectangle! Each rectangle shows a factor pair.',
            setup: function(container, controls) {
                var viz = new VizEngine(container, {
                    width: 560, height: 360, scale: 1,
                    originX: 0, originY: 0
                });

                var num = 12;

                var numGroup = document.createElement('div');
                numGroup.className = 'viz-slider-group';
                var numLabel = document.createElement('span');
                numLabel.className = 'viz-slider-label';
                numLabel.textContent = 'Number: ';
                var numSlider = document.createElement('input');
                numSlider.type = 'range'; numSlider.className = 'viz-slider';
                numSlider.min = '2'; numSlider.max = '36'; numSlider.step = '1';
                numSlider.value = String(num);
                var numVal = document.createElement('span');
                numVal.className = 'viz-slider-value'; numVal.textContent = String(num);
                numSlider.addEventListener('input', function() {
                    num = parseInt(numSlider.value); numVal.textContent = String(num); draw();
                });
                numGroup.appendChild(numLabel); numGroup.appendChild(numSlider); numGroup.appendChild(numVal);
                controls.appendChild(numGroup);

                var rectColors = ['#58A6FF', '#3FB950', '#F0883E', '#BC8CFF', '#F778BA', '#4ECDC4', '#FFE66D', '#f85149'];

                function getFactorPairs(n) {
                    var pairs = [];
                    for (var i = 1; i <= Math.sqrt(n); i++) {
                        if (n % i === 0) pairs.push([i, n / i]);
                    }
                    return pairs;
                }

                function draw() {
                    var ctx = viz.ctx;
                    ctx.fillStyle = '#0c0c20';
                    ctx.fillRect(0, 0, viz.width, viz.height);

                    var pairs = getFactorPairs(num);

                    ctx.fillStyle = '#f0f6fc';
                    ctx.font = 'bold 18px -apple-system, sans-serif';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'top';
                    ctx.fillText('Factor Pairs of ' + num, viz.width / 2, 8);

                    // List factors
                    var allFactors = [];
                    for (var p = 0; p < pairs.length; p++) {
                        if (allFactors.indexOf(pairs[p][0]) === -1) allFactors.push(pairs[p][0]);
                        if (allFactors.indexOf(pairs[p][1]) === -1) allFactors.push(pairs[p][1]);
                    }
                    allFactors.sort(function(a, b) { return a - b; });
                    ctx.fillStyle = '#8b949e';
                    ctx.font = '13px -apple-system, sans-serif';
                    ctx.fillText('Factors: ' + allFactors.join(', '), viz.width / 2, 32);

                    // Draw rectangles
                    var maxCols = Math.min(pairs.length, 4);
                    var spacing = viz.width / (maxCols + 1);
                    var maxBlockSize = 14;
                    var startY = 65;

                    for (var pi = 0; pi < pairs.length; pi++) {
                        var rows = pairs[pi][0];
                        var cols = pairs[pi][1];
                        var color = rectColors[pi % rectColors.length];

                        var row = Math.floor(pi / 4);
                        var col = pi % 4;
                        var cx = spacing * (col + 1) - (maxCols === pairs.length ? 0 : spacing * (maxCols - pairs.length) / 2);
                        if (pairs.length <= 4) {
                            cx = (viz.width / (pairs.length + 1)) * (pi + 1);
                        }
                        var cy = startY + row * 160;

                        // Label
                        ctx.fillStyle = color;
                        ctx.font = 'bold 13px -apple-system, sans-serif';
                        ctx.textAlign = 'center';
                        ctx.textBaseline = 'top';
                        ctx.fillText(rows + ' x ' + cols, cx, cy);

                        // Draw grid of squares
                        var blockSize = Math.min(maxBlockSize, 100 / Math.max(rows, cols));
                        var gridW = cols * blockSize;
                        var gridH = rows * blockSize;
                        var gx = cx - gridW / 2;
                        var gy = cy + 20;

                        for (var r = 0; r < rows; r++) {
                            for (var c = 0; c < cols; c++) {
                                ctx.fillStyle = color + '66';
                                ctx.fillRect(gx + c * blockSize, gy + r * blockSize, blockSize - 1, blockSize - 1);
                                ctx.strokeStyle = color;
                                ctx.lineWidth = 0.5;
                                ctx.strokeRect(gx + c * blockSize, gy + r * blockSize, blockSize - 1, blockSize - 1);
                            }
                        }
                    }
                }

                draw();
                return viz;
            }
        },
        {
            id: 'ch06-viz-multiples-hop',
            title: 'Multiples Hopper',
            description: 'Pick a number and watch its multiples hop along the number line!',
            setup: function(container, controls) {
                var viz = new VizEngine(container, {
                    width: 560, height: 220, scale: 1,
                    originX: 0, originY: 0
                });

                var skipBy = 3;

                var btnGroup = document.createElement('div');
                btnGroup.style.cssText = 'display:flex;gap:4px;flex-wrap:wrap;';
                var skipValues = [2, 3, 4, 5, 6, 7];
                var btns = {};
                var btnColors = { 2: '#58A6FF', 3: '#3FB950', 4: '#F0883E', 5: '#BC8CFF', 6: '#4ECDC4', 7: '#F778BA' };

                skipValues.forEach(function(sv) {
                    var btn = document.createElement('button');
                    btn.textContent = 'x' + sv;
                    btn.style.cssText = 'padding:4px 10px;border:2px solid ' + btnColors[sv] + ';border-radius:4px;background:' + (sv === skipBy ? btnColors[sv] : '#1a1a40') + ';color:#f0f6fc;font-size:0.8rem;font-weight:bold;cursor:pointer;';
                    btn.addEventListener('click', function() {
                        skipBy = sv;
                        skipValues.forEach(function(v) {
                            btns[v].style.background = v === sv ? btnColors[v] : '#1a1a40';
                        });
                        draw();
                    });
                    btns[sv] = btn;
                    btnGroup.appendChild(btn);
                });
                controls.appendChild(btnGroup);

                function draw() {
                    var ctx = viz.ctx;
                    ctx.fillStyle = '#0c0c20';
                    ctx.fillRect(0, 0, viz.width, viz.height);

                    var color = btnColors[skipBy];
                    var maxNum = 30;
                    var lineY = 120;
                    var lineX1 = 30;
                    var lineX2 = viz.width - 20;
                    var lineLen = lineX2 - lineX1;

                    ctx.fillStyle = '#f0f6fc';
                    ctx.font = 'bold 16px -apple-system, sans-serif';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'top';
                    ctx.fillText('Multiples of ' + skipBy, viz.width / 2, 8);

                    // Number line
                    ctx.strokeStyle = '#4a4a7a';
                    ctx.lineWidth = 2;
                    ctx.beginPath();
                    ctx.moveTo(lineX1, lineY);
                    ctx.lineTo(lineX2, lineY);
                    ctx.stroke();

                    // Draw numbers and highlight multiples
                    for (var i = 0; i <= maxNum; i++) {
                        var x = lineX1 + (i / maxNum) * lineLen;
                        var isMultiple = i > 0 && i % skipBy === 0;

                        // Tick
                        ctx.strokeStyle = isMultiple ? color : '#3a3a5a';
                        ctx.lineWidth = isMultiple ? 2 : 1;
                        ctx.beginPath();
                        ctx.moveTo(x, lineY - (isMultiple ? 8 : 4));
                        ctx.lineTo(x, lineY + (isMultiple ? 8 : 4));
                        ctx.stroke();

                        if (isMultiple) {
                            // Glow circle
                            ctx.shadowColor = color;
                            ctx.shadowBlur = 12;
                            ctx.fillStyle = color;
                            ctx.beginPath();
                            ctx.arc(x, lineY, 10, 0, Math.PI * 2);
                            ctx.fill();
                            ctx.shadowBlur = 0;

                            ctx.fillStyle = '#ffffff';
                            ctx.font = 'bold 9px -apple-system, sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'middle';
                            ctx.fillText(String(i), x, lineY);

                            // Draw hop arc from previous multiple
                            if (i >= skipBy * 2) {
                                var prevX = lineX1 + ((i - skipBy) / maxNum) * lineLen;
                                var midX = (prevX + x) / 2;
                                var arcH = 35;
                                ctx.strokeStyle = color + '88';
                                ctx.lineWidth = 1.5;
                                ctx.setLineDash([3, 3]);
                                ctx.beginPath();
                                ctx.moveTo(prevX, lineY - 10);
                                ctx.quadraticCurveTo(midX, lineY - arcH, x, lineY - 10);
                                ctx.stroke();
                                ctx.setLineDash([]);

                                ctx.fillStyle = color + '88';
                                ctx.font = '9px -apple-system, sans-serif';
                                ctx.textBaseline = 'bottom';
                                ctx.fillText('+' + skipBy, midX, lineY - arcH + 8);
                            }
                        } else if (i % 5 === 0) {
                            ctx.fillStyle = '#6a6a8a';
                            ctx.font = '10px -apple-system, sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'top';
                            ctx.fillText(String(i), x, lineY + 12);
                        }
                    }

                    // List multiples
                    var multiples = [];
                    for (var m = 1; m * skipBy <= maxNum; m++) {
                        multiples.push(m * skipBy);
                    }
                    ctx.fillStyle = color;
                    ctx.font = '13px -apple-system, sans-serif';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'top';
                    ctx.fillText(multiples.join(', ') + ', ...', viz.width / 2, lineY + 40);
                }

                draw();
                return viz;
            }
        }
    ],
    exercises: [
        {
            question: 'Find all the factors of \\(24\\).',
            hint: 'Start with \\(1 \\times 24\\), then try \\(2 \\times ?\\), then \\(3 \\times ?\\), and so on until the pairs repeat.',
            solution: '\\(24 = 1 \\times 24 = 2 \\times 12 = 3 \\times 8 = 4 \\times 6\\). So the factors of \\(24\\) are: <strong>1, 2, 3, 4, 6, 8, 12, 24</strong>. That is \\(8\\) factors!'
        },
        {
            question: 'Write the first 6 multiples of \\(7\\).',
            hint: 'Skip-count by \\(7\\): \\(7, 14, ...\\)',
            solution: '\\(7, 14, 21, 28, 35, 42\\). These are \\(7 \\times 1\\) through \\(7 \\times 6\\).'
        },
        {
            question: 'Is \\(5\\) a factor of \\(35\\)? Is \\(35\\) a multiple of \\(5\\)?',
            hint: 'Does \\(35 \\div 5\\) give a whole number?',
            solution: 'Yes to both! \\(35 \\div 5 = 7\\), which is a whole number. So \\(5\\) is a factor of \\(35\\), and \\(35\\) is a multiple of \\(5\\).'
        }
    ]
},

// ============================================================
// Section 4: Prime Numbers — The Building Blocks
// ============================================================
{
    id: 'ch06-sec04',
    title: 'Prime Numbers',
    content: `
<h2>Prime Numbers &mdash; The Building Blocks</h2>

<p>Some numbers are extra special. They can only be divided evenly by \\(1\\) and themselves. We call these <strong>prime numbers</strong>, and they are the building blocks of all other numbers!</p>

<div class="env-block intuition">
    <div class="env-title">Discovery: What Makes a Number Prime?</div>
    <div class="env-body">
        <p>A <strong>prime number</strong> is a number greater than \\(1\\) that has exactly <strong>two factors</strong>: \\(1\\) and itself.</p>
        <p>A number with <em>more than two</em> factors is called <strong>composite</strong> (it can be broken into smaller pieces).</p>
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example: Is It Prime?</div>
    <div class="env-body">
        <p><strong>7</strong> &rarr; Can only be divided by \\(1\\) and \\(7\\). It's <strong>prime</strong>!</p>
        <p><strong>12</strong> &rarr; Can be divided by \\(1, 2, 3, 4, 6, 12\\). It's <strong>composite</strong>.</p>
        <p><strong>2</strong> &rarr; Can only be divided by \\(1\\) and \\(2\\). It's <strong>prime</strong>! (And it's the only even prime.)</p>
    </div>
</div>

<h3>The First Few Primes</h3>

<p>\\(2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, \\ldots\\)</p>

<p>Notice that primes become more spread out as numbers get bigger, but mathematicians have proven they go on forever!</p>

<div class="viz-placeholder" data-viz="ch06-viz-prime-check"></div>

<h3>The Sieve of Eratosthenes</h3>

<p>Over 2,000 years ago, a Greek mathematician named <strong>Eratosthenes</strong> invented a clever way to find all the primes. Here's how it works:</p>

<ol>
    <li>Write all numbers from \\(2\\) to \\(100\\) in a grid.</li>
    <li>Circle \\(2\\) (it's prime!). Cross out all multiples of \\(2\\).</li>
    <li>Circle \\(3\\) (it's prime!). Cross out all multiples of \\(3\\).</li>
    <li>Circle \\(5\\) (it's prime!). Cross out all multiples of \\(5\\).</li>
    <li>Circle \\(7\\) (it's prime!). Cross out all multiples of \\(7\\).</li>
    <li>Everything left that isn't crossed out is <strong>prime</strong>!</li>
</ol>

<div class="viz-placeholder" data-viz="ch06-viz-sieve"></div>

<div class="env-block remark">
    <div class="env-title">Think About It</div>
    <div class="env-body">
        <p>Why is \\(1\\) not prime? Because it only has <em>one</em> factor (just \\(1\\) itself). To be prime you need <em>exactly two</em> factors. The number \\(1\\) is special &mdash; it's neither prime nor composite!</p>
    </div>
</div>

<div class="env-block intuition">
    <div class="env-title">Cool Fact</div>
    <div class="env-body">
        <p>Every whole number greater than \\(1\\) can be written as a product of prime numbers. For example: \\(12 = 2 \\times 2 \\times 3\\) and \\(30 = 2 \\times 3 \\times 5\\). This is called <strong>prime factorization</strong>, and it's unique for every number!</p>
    </div>
</div>
    `,
    visualizations: [
        {
            id: 'ch06-viz-prime-check',
            title: 'Prime or Composite?',
            description: 'Pick a number and see whether it is prime or composite by checking its factors!',
            setup: function(container, controls) {
                var viz = new VizEngine(container, {
                    width: 560, height: 280, scale: 1,
                    originX: 0, originY: 0
                });

                var num = 7;

                var numGroup = document.createElement('div');
                numGroup.className = 'viz-slider-group';
                var numLabel = document.createElement('span');
                numLabel.className = 'viz-slider-label';
                numLabel.textContent = 'Number: ';
                var numSlider = document.createElement('input');
                numSlider.type = 'range'; numSlider.className = 'viz-slider';
                numSlider.min = '2'; numSlider.max = '50'; numSlider.step = '1';
                numSlider.value = String(num);
                var numVal = document.createElement('span');
                numVal.className = 'viz-slider-value'; numVal.textContent = String(num);
                numSlider.addEventListener('input', function() {
                    num = parseInt(numSlider.value); numVal.textContent = String(num); draw();
                });
                numGroup.appendChild(numLabel); numGroup.appendChild(numSlider); numGroup.appendChild(numVal);
                controls.appendChild(numGroup);

                function isPrime(n) {
                    if (n < 2) return false;
                    for (var i = 2; i <= Math.sqrt(n); i++) {
                        if (n % i === 0) return false;
                    }
                    return true;
                }

                function getFactors(n) {
                    var f = [];
                    for (var i = 1; i <= n; i++) {
                        if (n % i === 0) f.push(i);
                    }
                    return f;
                }

                function draw() {
                    var ctx = viz.ctx;
                    ctx.fillStyle = '#0c0c20';
                    ctx.fillRect(0, 0, viz.width, viz.height);

                    var prime = isPrime(num);
                    var factors = getFactors(num);
                    var color = prime ? '#3FB950' : '#F0883E';

                    // Big number
                    ctx.shadowColor = color;
                    ctx.shadowBlur = 30;
                    ctx.fillStyle = color;
                    ctx.font = 'bold 60px -apple-system, sans-serif';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'top';
                    ctx.fillText(String(num), viz.width / 2, 15);
                    ctx.shadowBlur = 0;

                    // Label
                    ctx.font = 'bold 20px -apple-system, sans-serif';
                    ctx.fillText(prime ? 'PRIME!' : 'Composite', viz.width / 2, 85);

                    // Factors
                    ctx.fillStyle = '#8b949e';
                    ctx.font = '14px -apple-system, sans-serif';
                    ctx.fillText('Factors: ' + factors.join(', '), viz.width / 2, 120);
                    ctx.fillText(factors.length + ' factor' + (factors.length !== 1 ? 's' : ''), viz.width / 2, 140);

                    // Visual: draw dots for each factor as a circle
                    var dotY = 185;
                    var dotSpacing = Math.min(40, (viz.width - 80) / factors.length);
                    var dotStartX = viz.width / 2 - (factors.length - 1) * dotSpacing / 2;

                    for (var i = 0; i < factors.length; i++) {
                        var dx = dotStartX + i * dotSpacing;
                        var fColor = (factors[i] === 1 || factors[i] === num) ? '#3FB950' : '#F0883E';

                        ctx.fillStyle = fColor;
                        ctx.beginPath();
                        ctx.arc(dx, dotY, 16, 0, Math.PI * 2);
                        ctx.fill();

                        ctx.fillStyle = '#ffffff';
                        ctx.font = 'bold 11px -apple-system, sans-serif';
                        ctx.textAlign = 'center';
                        ctx.textBaseline = 'middle';
                        ctx.fillText(String(factors[i]), dx, dotY);
                    }

                    // Explanation
                    ctx.fillStyle = '#8b949e';
                    ctx.font = '12px -apple-system, sans-serif';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'top';
                    if (prime) {
                        ctx.fillStyle = '#3FB950';
                        ctx.fillText('Only 1 and ' + num + ' divide evenly into ' + num + '. That\'s prime!', viz.width / 2, dotY + 30);
                    } else {
                        ctx.fillStyle = '#F0883E';
                        var extraFactors = factors.filter(function(f) { return f !== 1 && f !== num; });
                        ctx.fillText(extraFactors.join(', ') + ' also divide' + (extraFactors.length === 1 ? 's' : '') + ' into ' + num + '. Not prime!', viz.width / 2, dotY + 30);
                    }
                }

                draw();
                return viz;
            }
        },
        {
            id: 'ch06-viz-sieve',
            title: 'Sieve of Eratosthenes',
            description: 'Watch the sieve in action! Click "Next Step" to cross out multiples one prime at a time.',
            setup: function(container, controls) {
                var viz = new VizEngine(container, {
                    width: 560, height: 420, scale: 1,
                    originX: 0, originY: 0
                });

                var sieveStep = 0; // 0=show all, 1=cross 2s, 2=cross 3s, 3=cross 5s, 4=cross 7s, 5=done
                var primesToSieve = [2, 3, 5, 7];
                var crossed = {};
                var stepColors = { 2: '#58A6FF', 3: '#3FB950', 5: '#F0883E', 7: '#BC8CFF' };

                var nextBtn = document.createElement('button');
                nextBtn.textContent = 'Next Step';
                nextBtn.style.cssText = 'padding:4px 14px;border:1px solid #30363d;border-radius:4px;background:#3FB950;color:#ffffff;font-size:0.85rem;font-weight:bold;cursor:pointer;';
                nextBtn.addEventListener('click', function() {
                    if (sieveStep < primesToSieve.length) {
                        var p = primesToSieve[sieveStep];
                        for (var m = p * 2; m <= 100; m += p) {
                            if (!crossed[m]) crossed[m] = p;
                        }
                        sieveStep++;
                        draw();
                    }
                    if (sieveStep >= primesToSieve.length) {
                        nextBtn.textContent = 'Done!';
                        nextBtn.disabled = true;
                    }
                });
                controls.appendChild(nextBtn);

                var resetBtn = document.createElement('button');
                resetBtn.textContent = 'Reset';
                resetBtn.style.cssText = 'padding:4px 14px;border:1px solid #30363d;border-radius:4px;background:#1a1a40;color:#c9d1d9;font-size:0.85rem;cursor:pointer;margin-left:4px;';
                resetBtn.addEventListener('click', function() {
                    sieveStep = 0;
                    crossed = {};
                    nextBtn.textContent = 'Next Step';
                    nextBtn.disabled = false;
                    draw();
                });
                controls.appendChild(resetBtn);

                function isPrime(n) {
                    if (n < 2) return false;
                    for (var i = 2; i <= Math.sqrt(n); i++) {
                        if (n % i === 0) return false;
                    }
                    return true;
                }

                function draw() {
                    var ctx = viz.ctx;
                    ctx.fillStyle = '#0c0c20';
                    ctx.fillRect(0, 0, viz.width, viz.height);

                    ctx.fillStyle = '#f0f6fc';
                    ctx.font = 'bold 16px -apple-system, sans-serif';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'top';
                    var stepLabel = sieveStep === 0 ? 'Start: all numbers 2-100' :
                        sieveStep <= primesToSieve.length ? 'Crossed out multiples of ' + primesToSieve.slice(0, sieveStep).join(', ') :
                        'All primes found!';
                    ctx.fillText('Sieve of Eratosthenes', viz.width / 2, 6);
                    ctx.fillStyle = '#8b949e';
                    ctx.font = '12px -apple-system, sans-serif';
                    ctx.fillText(stepLabel, viz.width / 2, 26);

                    var gridLeft = 15;
                    var gridTop = 48;
                    var cellSize = 50;
                    var gap = 2;
                    var cols = 10;

                    for (var i = 1; i <= 100; i++) {
                        var row = Math.floor((i - 1) / cols);
                        var col = (i - 1) % cols;
                        var cx = gridLeft + col * (cellSize + gap);
                        var cy = gridTop + row * (cellSize * 0.35 + gap);

                        var isCrossed = crossed[i] !== undefined;
                        var prime = isPrime(i) && i >= 2;
                        var isSievedPrime = prime && sieveStep > 0 && primesToSieve.indexOf(i) < sieveStep;

                        if (i === 1) {
                            // 1 is special
                            ctx.fillStyle = '#1a1a40';
                            ctx.fillRect(cx, cy, cellSize, cellSize * 0.35);
                            ctx.fillStyle = '#4a4a6a';
                            ctx.font = '12px -apple-system, sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'middle';
                            ctx.fillText('1', cx + cellSize / 2, cy + cellSize * 0.175);
                        } else if (isCrossed) {
                            var crossColor = stepColors[crossed[i]] || '#f85149';
                            ctx.fillStyle = crossColor + '15';
                            ctx.fillRect(cx, cy, cellSize, cellSize * 0.35);
                            ctx.fillStyle = crossColor + '55';
                            ctx.font = '12px -apple-system, sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'middle';
                            ctx.fillText(String(i), cx + cellSize / 2, cy + cellSize * 0.175);
                            // Cross-out line
                            ctx.strokeStyle = crossColor + '88';
                            ctx.lineWidth = 1.5;
                            ctx.beginPath();
                            ctx.moveTo(cx + 4, cy + 2);
                            ctx.lineTo(cx + cellSize - 4, cy + cellSize * 0.35 - 2);
                            ctx.stroke();
                        } else if (isSievedPrime || (sieveStep >= primesToSieve.length && prime)) {
                            // Highlighted prime
                            ctx.fillStyle = '#3FB950' + '44';
                            ctx.fillRect(cx, cy, cellSize, cellSize * 0.35);
                            ctx.strokeStyle = '#3FB950';
                            ctx.lineWidth = 2;
                            ctx.strokeRect(cx, cy, cellSize, cellSize * 0.35);
                            ctx.fillStyle = '#3FB950';
                            ctx.font = 'bold 13px -apple-system, sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'middle';
                            ctx.fillText(String(i), cx + cellSize / 2, cy + cellSize * 0.175);
                        } else {
                            // Normal number
                            ctx.fillStyle = '#14142e';
                            ctx.fillRect(cx, cy, cellSize, cellSize * 0.35);
                            ctx.strokeStyle = '#2a2a50';
                            ctx.lineWidth = 0.5;
                            ctx.strokeRect(cx, cy, cellSize, cellSize * 0.35);
                            ctx.fillStyle = '#c9d1d9';
                            ctx.font = '12px -apple-system, sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'middle';
                            ctx.fillText(String(i), cx + cellSize / 2, cy + cellSize * 0.175);
                        }
                    }

                    // Legend
                    var ly = gridTop + 10 * (cellSize * 0.35 + gap) + 8;
                    ctx.font = '11px -apple-system, sans-serif';
                    ctx.textAlign = 'left';
                    ctx.textBaseline = 'top';
                    ctx.fillStyle = '#3FB950';
                    ctx.fillRect(20, ly, 10, 10);
                    ctx.fillText(' = Prime', 34, ly);

                    if (sieveStep > 0) {
                        var lx = 100;
                        for (var si = 0; si < sieveStep && si < primesToSieve.length; si++) {
                            var sp = primesToSieve[si];
                            ctx.fillStyle = stepColors[sp];
                            ctx.fillRect(lx, ly, 10, 10);
                            ctx.fillText(' = x' + sp + ' crossed', lx + 14, ly);
                            lx += 100;
                        }
                    }
                }

                draw();
                return viz;
            }
        }
    ],
    exercises: [
        {
            question: 'Is \\(29\\) prime or composite? How can you check?',
            hint: 'Try dividing \\(29\\) by \\(2, 3, 4, 5\\). Do any divide evenly? (You only need to check up to \\(\\sqrt{29} \\approx 5.4\\).)',
            solution: '\\(29 \\div 2 = 14.5\\) (no), \\(29 \\div 3 = 9.67...\\) (no), \\(29 \\div 4 = 7.25\\) (no), \\(29 \\div 5 = 5.8\\) (no). None divide evenly, so \\(29\\) is <strong>prime</strong>!'
        },
        {
            question: 'Write \\(30\\) as a product of prime numbers (prime factorization).',
            hint: 'Start by dividing by the smallest prime (\\(2\\)), then keep going.',
            solution: '\\(30 = 2 \\times 15 = 2 \\times 3 \\times 5\\). So the prime factorization of \\(30\\) is \\(2 \\times 3 \\times 5\\).'
        },
        {
            question: 'How many prime numbers are there between \\(10\\) and \\(20\\)?',
            hint: 'Check each number: \\(11, 12, 13, 14, 15, 16, 17, 18, 19\\).',
            solution: 'The primes between \\(10\\) and \\(20\\) are: \\(11, 13, 17, 19\\). That is <strong>4</strong> prime numbers.'
        }
    ]
},

// ============================================================
// Section 5: Divisibility Tricks
// ============================================================
{
    id: 'ch06-sec05',
    title: 'Divisibility Tricks',
    content: `
<h2>Divisibility Tricks</h2>

<p>Wouldn't it be cool if you could tell whether a big number is divisible by \\(2\\), \\(3\\), \\(5\\), or \\(9\\) without actually doing the division? Good news &mdash; you can! These <strong>divisibility tricks</strong> are like secret shortcuts.</p>

<div class="env-block intuition">
    <div class="env-title">Discovery: Divisible by 2, 5, and 10</div>
    <div class="env-body">
        <p><strong>Divisible by 2:</strong> The last digit is even (\\(0, 2, 4, 6, 8\\)).</p>
        <p><strong>Divisible by 5:</strong> The last digit is \\(0\\) or \\(5\\).</p>
        <p><strong>Divisible by 10:</strong> The last digit is \\(0\\).</p>
        <p>These are the easiest tricks &mdash; just look at the last digit!</p>
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Try This!</div>
    <div class="env-body">
        <p>Is \\(4{,}736\\) divisible by \\(2\\)? Last digit is \\(6\\) (even). <strong>Yes!</strong></p>
        <p>Is \\(4{,}736\\) divisible by \\(5\\)? Last digit is \\(6\\) (not \\(0\\) or \\(5\\)). <strong>No!</strong></p>
        <p>Is \\(8{,}350\\) divisible by \\(10\\)? Last digit is \\(0\\). <strong>Yes!</strong></p>
    </div>
</div>

<div class="viz-placeholder" data-viz="ch06-viz-div-last-digit"></div>

<h3>The Digit Sum Tricks</h3>

<p>These are the really magical ones! To check divisibility by \\(3\\) or \\(9\\), you add up all the digits.</p>

<div class="env-block intuition">
    <div class="env-title">Discovery: Divisible by 3 and 9</div>
    <div class="env-body">
        <p><strong>Divisible by 3:</strong> Add up all the digits. If the sum is divisible by \\(3\\), so is the original number!</p>
        <p><strong>Divisible by 9:</strong> Add up all the digits. If the sum is divisible by \\(9\\), so is the original number!</p>
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example: Digit Sum Magic</div>
    <div class="env-body">
        <p>Is \\(738\\) divisible by \\(3\\)?</p>
        <p>Digit sum: \\(7 + 3 + 8 = 18\\). Is \\(18\\) divisible by \\(3\\)? \\(18 \\div 3 = 6\\). <strong>Yes!</strong></p>
        <p>Is \\(738\\) divisible by \\(9\\)?</p>
        <p>Digit sum is \\(18\\). Is \\(18\\) divisible by \\(9\\)? \\(18 \\div 9 = 2\\). <strong>Yes!</strong></p>
        <p>So \\(738 \\div 9 = 82\\). It checks out!</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="ch06-viz-digit-sum"></div>

<div class="env-block warning">
    <div class="env-title">Watch Out!</div>
    <div class="env-body">
        <p>The digit sum trick works for \\(3\\) and \\(9\\), but <strong>not</strong> for most other numbers. Don't try it for \\(7\\) or \\(4\\) &mdash; those need different methods!</p>
    </div>
</div>

<h3>Quick Reference Card</h3>

<table style="width:100%;border-collapse:collapse;margin:16px 0;">
    <tr style="background:rgba(88,166,255,0.1);">
        <th style="padding:8px 12px;text-align:left;border:1px solid #30363d;color:#58A6FF;">Divisor</th>
        <th style="padding:8px 12px;text-align:left;border:1px solid #30363d;color:#58A6FF;">Trick</th>
        <th style="padding:8px 12px;text-align:left;border:1px solid #30363d;color:#58A6FF;">Example</th>
    </tr>
    <tr><td style="padding:8px 12px;border:1px solid #30363d;"><strong>2</strong></td><td style="padding:8px 12px;border:1px solid #30363d;">Last digit is even</td><td style="padding:8px 12px;border:1px solid #30363d;">\\(48\\): last digit \\(8\\) &rarr; Yes</td></tr>
    <tr><td style="padding:8px 12px;border:1px solid #30363d;"><strong>3</strong></td><td style="padding:8px 12px;border:1px solid #30363d;">Digit sum divisible by 3</td><td style="padding:8px 12px;border:1px solid #30363d;">\\(123\\): \\(1+2+3=6\\) &rarr; Yes</td></tr>
    <tr><td style="padding:8px 12px;border:1px solid #30363d;"><strong>5</strong></td><td style="padding:8px 12px;border:1px solid #30363d;">Last digit is 0 or 5</td><td style="padding:8px 12px;border:1px solid #30363d;">\\(85\\): last digit \\(5\\) &rarr; Yes</td></tr>
    <tr><td style="padding:8px 12px;border:1px solid #30363d;"><strong>9</strong></td><td style="padding:8px 12px;border:1px solid #30363d;">Digit sum divisible by 9</td><td style="padding:8px 12px;border:1px solid #30363d;">\\(819\\): \\(8+1+9=18\\) &rarr; Yes</td></tr>
    <tr><td style="padding:8px 12px;border:1px solid #30363d;"><strong>10</strong></td><td style="padding:8px 12px;border:1px solid #30363d;">Last digit is 0</td><td style="padding:8px 12px;border:1px solid #30363d;">\\(230\\): last digit \\(0\\) &rarr; Yes</td></tr>
</table>

<div class="env-block remark">
    <div class="env-title">Think About It</div>
    <div class="env-body">
        <p>If a number is divisible by both \\(2\\) and \\(3\\), it's also divisible by \\(6\\)! And if it's divisible by both \\(2\\) and \\(5\\), it's divisible by \\(10\\). You can combine tricks!</p>
    </div>
</div>
    `,
    visualizations: [
        {
            id: 'ch06-viz-div-last-digit',
            title: 'Last Digit Divisibility Checker',
            description: 'Type a number and instantly see if it is divisible by 2, 5, or 10!',
            setup: function(container, controls) {
                var viz = new VizEngine(container, {
                    width: 560, height: 250, scale: 1,
                    originX: 0, originY: 0
                });

                var num = 4736;

                var numGroup = document.createElement('div');
                numGroup.className = 'viz-slider-group';
                var numLabel = document.createElement('span');
                numLabel.className = 'viz-slider-label';
                numLabel.textContent = 'Number: ';
                var numInput = document.createElement('input');
                numInput.type = 'number';
                numInput.value = String(num);
                numInput.min = '1'; numInput.max = '99999';
                numInput.style.cssText = 'width:80px;padding:4px 8px;background:#1a1a40;border:1px solid #30363d;border-radius:4px;color:#f0f6fc;font-size:0.85rem;font-family:monospace;';
                numInput.addEventListener('input', function() {
                    var v = parseInt(numInput.value);
                    if (!isNaN(v) && v >= 1) { num = v; draw(); }
                });
                numGroup.appendChild(numLabel);
                numGroup.appendChild(numInput);
                controls.appendChild(numGroup);

                function draw() {
                    var ctx = viz.ctx;
                    ctx.fillStyle = '#0c0c20';
                    ctx.fillRect(0, 0, viz.width, viz.height);

                    var digits = String(num).split('');
                    var lastDigit = parseInt(digits[digits.length - 1]);

                    // Draw the number with last digit highlighted
                    ctx.font = 'bold 40px -apple-system, sans-serif';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'top';

                    var totalW = digits.length * 30;
                    var startX = viz.width / 2 - totalW / 2 + 15;

                    for (var i = 0; i < digits.length; i++) {
                        var dx = startX + i * 30;
                        if (i === digits.length - 1) {
                            // Highlight last digit
                            ctx.fillStyle = '#FFE66D';
                            ctx.shadowColor = '#FFE66D';
                            ctx.shadowBlur = 15;
                            ctx.fillText(digits[i], dx, 15);
                            ctx.shadowBlur = 0;
                        } else {
                            ctx.fillStyle = '#f0f6fc';
                            ctx.fillText(digits[i], dx, 15);
                        }
                    }

                    ctx.fillStyle = '#FFE66D';
                    ctx.font = '13px -apple-system, sans-serif';
                    ctx.fillText('Last digit: ' + lastDigit, viz.width / 2, 65);

                    // Check divisibility
                    var checks = [
                        { div: 2, test: lastDigit % 2 === 0, rule: 'Last digit even?', color: '#58A6FF' },
                        { div: 5, test: lastDigit === 0 || lastDigit === 5, rule: 'Last digit 0 or 5?', color: '#BC8CFF' },
                        { div: 10, test: lastDigit === 0, rule: 'Last digit 0?', color: '#4ECDC4' }
                    ];

                    var boxW = 160;
                    var boxH = 80;
                    var boxY = 100;
                    var boxSpacing = 20;
                    var totalBoxW = 3 * boxW + 2 * boxSpacing;
                    var boxStartX = (viz.width - totalBoxW) / 2;

                    for (var c = 0; c < checks.length; c++) {
                        var ch = checks[c];
                        var bx = boxStartX + c * (boxW + boxSpacing);

                        ctx.fillStyle = ch.test ? ch.color + '22' : '#1a1a40';
                        ctx.fillRect(bx, boxY, boxW, boxH);
                        ctx.strokeStyle = ch.test ? ch.color : '#30363d';
                        ctx.lineWidth = 2;
                        ctx.strokeRect(bx, boxY, boxW, boxH);

                        ctx.fillStyle = ch.color;
                        ctx.font = 'bold 16px -apple-system, sans-serif';
                        ctx.textAlign = 'center';
                        ctx.textBaseline = 'top';
                        ctx.fillText('Div by ' + ch.div, bx + boxW / 2, boxY + 8);

                        ctx.fillStyle = ch.test ? '#3FB950' : '#f85149';
                        ctx.font = 'bold 20px -apple-system, sans-serif';
                        ctx.fillText(ch.test ? 'YES' : 'NO', bx + boxW / 2, boxY + 30);

                        ctx.fillStyle = '#8b949e';
                        ctx.font = '11px -apple-system, sans-serif';
                        ctx.fillText(ch.rule, bx + boxW / 2, boxY + 58);
                    }

                    // Verification
                    ctx.fillStyle = '#8b949e';
                    ctx.font = '12px -apple-system, sans-serif';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'top';
                    var verifications = [];
                    for (var v = 0; v < checks.length; v++) {
                        if (checks[v].test) {
                            verifications.push(num + ' / ' + checks[v].div + ' = ' + (num / checks[v].div));
                        }
                    }
                    if (verifications.length > 0) {
                        ctx.fillText('Check: ' + verifications.join('  |  '), viz.width / 2, boxY + boxH + 16);
                    }
                }

                draw();
                return viz;
            }
        },
        {
            id: 'ch06-viz-digit-sum',
            title: 'Digit Sum Divisibility Tester',
            description: 'Enter a number and see the digit sum trick for divisibility by 3 and 9!',
            setup: function(container, controls) {
                var viz = new VizEngine(container, {
                    width: 560, height: 300, scale: 1,
                    originX: 0, originY: 0
                });

                var num = 738;

                var numGroup = document.createElement('div');
                numGroup.className = 'viz-slider-group';
                var numLabel = document.createElement('span');
                numLabel.className = 'viz-slider-label';
                numLabel.textContent = 'Number: ';
                var numInput = document.createElement('input');
                numInput.type = 'number';
                numInput.value = String(num);
                numInput.min = '1'; numInput.max = '99999';
                numInput.style.cssText = 'width:80px;padding:4px 8px;background:#1a1a40;border:1px solid #30363d;border-radius:4px;color:#f0f6fc;font-size:0.85rem;font-family:monospace;';
                numInput.addEventListener('input', function() {
                    var v = parseInt(numInput.value);
                    if (!isNaN(v) && v >= 1) { num = v; draw(); }
                });
                numGroup.appendChild(numLabel);
                numGroup.appendChild(numInput);
                controls.appendChild(numGroup);

                var digitColors = ['#FF6B6B', '#4ECDC4', '#FFE66D', '#58A6FF', '#BC8CFF'];

                function draw() {
                    var ctx = viz.ctx;
                    ctx.fillStyle = '#0c0c20';
                    ctx.fillRect(0, 0, viz.width, viz.height);

                    var digits = String(num).split('').map(Number);
                    var digitSum = digits.reduce(function(a, b) { return a + b; }, 0);

                    // Title
                    ctx.fillStyle = '#f0f6fc';
                    ctx.font = 'bold 18px -apple-system, sans-serif';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'top';
                    ctx.fillText('Digit Sum Magic', viz.width / 2, 8);

                    // Draw digits in colorful boxes
                    var boxSize = 50;
                    var boxGap = 12;
                    var totalW = digits.length * boxSize + (digits.length - 1) * boxGap;
                    var startX = (viz.width - totalW) / 2;
                    var boxY = 45;

                    for (var i = 0; i < digits.length; i++) {
                        var bx = startX + i * (boxSize + boxGap);
                        var dColor = digitColors[i % digitColors.length];

                        ctx.fillStyle = dColor + '33';
                        ctx.fillRect(bx, boxY, boxSize, boxSize);
                        ctx.strokeStyle = dColor;
                        ctx.lineWidth = 2;
                        ctx.strokeRect(bx, boxY, boxSize, boxSize);

                        ctx.fillStyle = dColor;
                        ctx.font = 'bold 28px -apple-system, sans-serif';
                        ctx.textAlign = 'center';
                        ctx.textBaseline = 'middle';
                        ctx.fillText(String(digits[i]), bx + boxSize / 2, boxY + boxSize / 2);
                    }

                    // Plus signs and equals
                    ctx.fillStyle = '#8b949e';
                    ctx.font = 'bold 20px -apple-system, sans-serif';
                    for (var j = 0; j < digits.length - 1; j++) {
                        var px = startX + j * (boxSize + boxGap) + boxSize + boxGap / 2;
                        ctx.fillText('+', px, boxY + boxSize / 2);
                    }

                    // Digit sum
                    var sumX = startX + digits.length * (boxSize + boxGap) + 10;
                    ctx.fillStyle = '#f0f6fc';
                    ctx.font = 'bold 20px -apple-system, sans-serif';
                    ctx.textAlign = 'left';
                    ctx.fillText('= ' + digitSum, sumX, boxY + boxSize / 2);

                    // Divisibility results
                    var resultY = boxY + boxSize + 30;

                    var divBy3 = digitSum % 3 === 0;
                    var divBy9 = digitSum % 9 === 0;

                    // Box for div by 3
                    var rBoxW = 220;
                    var rBoxH = 70;

                    ctx.fillStyle = divBy3 ? '#3FB95022' : '#1a1a40';
                    ctx.fillRect(viz.width / 2 - rBoxW - 15, resultY, rBoxW, rBoxH);
                    ctx.strokeStyle = divBy3 ? '#3FB950' : '#f85149';
                    ctx.lineWidth = 2;
                    ctx.strokeRect(viz.width / 2 - rBoxW - 15, resultY, rBoxW, rBoxH);

                    ctx.font = 'bold 14px -apple-system, sans-serif';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'top';
                    ctx.fillStyle = '#58A6FF';
                    ctx.fillText('Divisible by 3?', viz.width / 2 - rBoxW / 2 - 15, resultY + 8);
                    ctx.fillStyle = divBy3 ? '#3FB950' : '#f85149';
                    ctx.font = 'bold 18px -apple-system, sans-serif';
                    ctx.fillText(divBy3 ? 'YES' : 'NO', viz.width / 2 - rBoxW / 2 - 15, resultY + 28);
                    ctx.fillStyle = '#8b949e';
                    ctx.font = '11px -apple-system, sans-serif';
                    ctx.fillText(digitSum + ' / 3 = ' + (digitSum / 3).toFixed(digitSum % 3 === 0 ? 0 : 1), viz.width / 2 - rBoxW / 2 - 15, resultY + 50);

                    // Box for div by 9
                    ctx.fillStyle = divBy9 ? '#3FB95022' : '#1a1a40';
                    ctx.fillRect(viz.width / 2 + 15, resultY, rBoxW, rBoxH);
                    ctx.strokeStyle = divBy9 ? '#3FB950' : '#f85149';
                    ctx.lineWidth = 2;
                    ctx.strokeRect(viz.width / 2 + 15, resultY, rBoxW, rBoxH);

                    ctx.fillStyle = '#BC8CFF';
                    ctx.font = 'bold 14px -apple-system, sans-serif';
                    ctx.fillText('Divisible by 9?', viz.width / 2 + rBoxW / 2 + 15, resultY + 8);
                    ctx.fillStyle = divBy9 ? '#3FB950' : '#f85149';
                    ctx.font = 'bold 18px -apple-system, sans-serif';
                    ctx.fillText(divBy9 ? 'YES' : 'NO', viz.width / 2 + rBoxW / 2 + 15, resultY + 28);
                    ctx.fillStyle = '#8b949e';
                    ctx.font = '11px -apple-system, sans-serif';
                    ctx.fillText(digitSum + ' / 9 = ' + (digitSum / 9).toFixed(digitSum % 9 === 0 ? 0 : 1), viz.width / 2 + rBoxW / 2 + 15, resultY + 50);

                    // Full verification
                    ctx.fillStyle = '#8b949e';
                    ctx.font = '12px -apple-system, sans-serif';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'top';
                    var verStr = '';
                    if (divBy9) verStr = num + ' / 9 = ' + (num / 9);
                    else if (divBy3) verStr = num + ' / 3 = ' + (num / 3);
                    else verStr = num + ' is not divisible by 3 or 9';
                    ctx.fillText('Verification: ' + verStr, viz.width / 2, resultY + rBoxH + 16);
                }

                draw();
                return viz;
            }
        }
    ],
    exercises: [
        {
            question: 'Without dividing, is \\(2{,}835\\) divisible by \\(3\\)? By \\(5\\)? By \\(9\\)?',
            hint: 'For \\(3\\) and \\(9\\), find the digit sum: \\(2 + 8 + 3 + 5 = ?\\). For \\(5\\), check the last digit.',
            solution: 'Digit sum: \\(2 + 8 + 3 + 5 = 18\\). \\(18 \\div 3 = 6\\), so divisible by <strong>3</strong>. \\(18 \\div 9 = 2\\), so divisible by <strong>9</strong>. Last digit is \\(5\\), so divisible by <strong>5</strong>. All three: yes!'
        },
        {
            question: 'Is \\(7{,}412\\) divisible by \\(2\\)? By \\(3\\)? By \\(6\\)?',
            hint: 'Check last digit for \\(2\\). Find digit sum for \\(3\\). For \\(6\\), it must be divisible by both \\(2\\) and \\(3\\).',
            solution: 'Last digit is \\(2\\) (even), so divisible by <strong>2</strong>. Digit sum: \\(7 + 4 + 1 + 2 = 14\\). \\(14 \\div 3 = 4.67\\), so NOT divisible by \\(3\\). Since it fails the \\(3\\) test, it is also NOT divisible by \\(6\\).'
        },
        {
            question: 'Find a 3-digit number that is divisible by both \\(9\\) and \\(5\\).',
            hint: 'It must end in \\(0\\) or \\(5\\) (for \\(5\\)), and its digit sum must be divisible by \\(9\\).',
            solution: 'One answer: \\(\\mathbf{180}\\). Digit sum: \\(1 + 8 + 0 = 9\\), divisible by \\(9\\). Last digit \\(0\\), divisible by \\(5\\). Another answer: \\(\\mathbf{225}\\). Digit sum: \\(2 + 2 + 5 = 9\\). Last digit \\(5\\). Many answers work!'
        }
    ]
}

    ] // end sections
});
