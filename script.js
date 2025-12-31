// ===== Code Samples =====
const codeSamples = {
    javascript: [
        `function greet(name) {
    const message = "Hello, " + name + "!";
    console.log(message);
    return message;
}

greet("World");`,
        `const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(num => num * 2);
console.log(doubled);`,
        `async function fetchData(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error:", error);
    }
}`,
        `class Calculator {
    constructor() {
        this.result = 0;
    }

    add(num) {
        this.result += num;
        return this;
    }

    subtract(num) {
        this.result -= num;
        return this;
    }

    getResult() {
        return this.result;
    }
}`
    ],
    python: [
        `def greet(name):
    message = f"Hello, {name}!"
    print(message)
    return message

greet("World")`,
        `numbers = [1, 2, 3, 4, 5]
doubled = [num * 2 for num in numbers]
print(doubled)`,
        `class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def introduce(self):
        return f"I am {self.name}"

person = Person("Alice", 25)`,
        `def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

for i in range(10):
    print(fibonacci(i))`
    ],
    html: [
        `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>My Page</title>
</head>
<body>
    <h1>Hello World</h1>
</body>
</html>`,
        `<nav class="navbar">
    <ul class="nav-list">
        <li><a href="#home">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#contact">Contact</a></li>
    </ul>
</nav>`,
        `<form action="/submit" method="POST">
    <label for="email">Email:</label>
    <input type="email" id="email" name="email" required>
    <label for="password">Password:</label>
    <input type="password" id="password" name="password">
    <button type="submit">Login</button>
</form>`
    ],
    css: [
        `.container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: #1a1a2e;
}`,
        `.button {
    padding: 12px 24px;
    background: linear-gradient(135deg, #667eea, #764ba2);
    border: none;
    border-radius: 8px;
    color: white;
    cursor: pointer;
    transition: transform 0.3s ease;
}

.button:hover {
    transform: translateY(-2px);
}`,
        `@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.animated {
    animation: fadeIn 0.5s ease forwards;
}`
    ]
};

// ===== Hero Typing Texts =====
const heroTexts = [
    "Học code mỗi ngày",
    "Luyện tập gõ code",
    "Nâng cao kỹ năng",
    "Trở thành developer"
];

// ===== Demo Code for Hero =====
const demoCode = `<span class="keyword">const</span> <span class="variable">developer</span> = {
    <span class="attribute">name</span>: <span class="string">"Bạn"</span>,
    <span class="attribute">skills</span>: [<span class="string">"JavaScript"</span>, <span class="string">"Python"</span>],
    <span class="attribute">learning</span>: <span class="keyword">true</span>,

    <span class="function">code</span>() {
        <span class="keyword">while</span> (<span class="keyword">this</span>.learning) {
            <span class="keyword">this</span>.<span class="function">practice</span>();
            <span class="keyword">this</span>.<span class="function">improve</span>();
        }
    }
};

developer.<span class="function">code</span>();`;

// ===== State Variables =====
let currentLanguage = 'javascript';
let currentSampleIndex = 0;
let targetCode = '';
let startTime = null;
let timerInterval = null;
let totalKeystrokes = 0;
let correctKeystrokes = 0;
let isCompleted = false;
let currentTheme = 'dark';
let soundEnabled = true;

// ===== Sound Effects =====
const sounds = {
    keypress: null,
    error: null,
    success: null,
    complete: null
};

// Tạo âm thanh bằng Web Audio API
function createSoundEffects() {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;

    const audioCtx = new AudioContext();

    // Hàm tạo âm thanh gõ phím - mechanical keyboard style
    sounds.keypress = () => {
        if (!soundEnabled) return;

        // Tạo âm chính - âm trầm của switch
        const mainOsc = audioCtx.createOscillator();
        const mainGain = audioCtx.createGain();

        // Tạo âm phụ - tiếng lách tách khi nhả phím
        const clickOsc = audioCtx.createOscillator();
        const clickGain = audioCtx.createGain();

        mainOsc.connect(mainGain);
        mainGain.connect(audioCtx.destination);

        clickOsc.connect(clickGain);
        clickGain.connect(audioCtx.destination);

        // Âm chính: tần số trầm (150-200Hz) với sóng tam giác cho âm mềm
        mainOsc.frequency.value = 150 + Math.random() * 50;
        mainOsc.type = 'triangle';

        // Âm click: tần số cao hơn một chút (300-400Hz) cho tiếng lách tách
        clickOsc.frequency.value = 300 + Math.random() * 100;
        clickOsc.type = 'square';

        // Âm chính: attack nhanh, sustain ngắn, release chậm
        const now = audioCtx.currentTime;
        mainGain.gain.setValueAtTime(0.15, now);
        mainGain.gain.exponentialRampToValueAtTime(0.08, now + 0.01);
        mainGain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

        // Âm click: xuất hiện sau âm chính một chút, rất ngắn
        clickGain.gain.setValueAtTime(0.001, now);
        clickGain.gain.setValueAtTime(0.05, now + 0.015);
        clickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.025);

        mainOsc.start(now);
        mainOsc.stop(now + 0.08);

        clickOsc.start(now + 0.015);
        clickOsc.stop(now + 0.025);
    };

    // Âm thanh khi gõ đúng
    sounds.success = () => {
        if (!soundEnabled) return;
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        oscillator.frequency.value = 1200;
        oscillator.type = 'sine';

        gainNode.gain.setValueAtTime(0.08, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.03);

        oscillator.start(audioCtx.currentTime);
        oscillator.stop(audioCtx.currentTime + 0.03);
    };

    // Âm thanh khi gõ sai
    sounds.error = () => {
        if (!soundEnabled) return;
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        oscillator.frequency.value = 200;
        oscillator.type = 'sawtooth';

        gainNode.gain.setValueAtTime(0.15, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.1);

        oscillator.start(audioCtx.currentTime);
        oscillator.stop(audioCtx.currentTime + 0.1);
    };

    // Âm thanh khi hoàn thành
    sounds.complete = () => {
        if (!soundEnabled) return;
        const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6

        notes.forEach((freq, index) => {
            const oscillator = audioCtx.createOscillator();
            const gainNode = audioCtx.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(audioCtx.destination);

            oscillator.frequency.value = freq;
            oscillator.type = 'sine';

            const startTime = audioCtx.currentTime + index * 0.15;
            gainNode.gain.setValueAtTime(0.15, startTime);
            gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + 0.3);

            oscillator.start(startTime);
            oscillator.stop(startTime + 0.3);
        });
    };

    // Âm thanh Enter/Space
    sounds.enter = () => {
        if (!soundEnabled) return;
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        oscillator.frequency.value = 600;
        oscillator.type = 'triangle';

        gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.08);

        oscillator.start(audioCtx.currentTime);
        oscillator.stop(audioCtx.currentTime + 0.08);
    };

    // Âm thanh Backspace
    sounds.backspace = () => {
        if (!soundEnabled) return;
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        oscillator.frequency.value = 400;
        oscillator.type = 'sine';

        gainNode.gain.setValueAtTime(0.08, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.06);

        oscillator.start(audioCtx.currentTime);
        oscillator.stop(audioCtx.currentTime + 0.06);
    };
}

// Toggle sound on/off
function toggleSound() {
    soundEnabled = !soundEnabled;
    localStorage.setItem('soundEnabled', soundEnabled);
    updateSoundButton();

    // Play test sound when enabling
    if (soundEnabled && sounds.keypress) {
        sounds.success();
    }
}

function updateSoundButton() {
    const btn = document.getElementById('sound-toggle');
    if (btn) {
        btn.classList.toggle('muted', !soundEnabled);
        btn.title = soundEnabled ? 'Tắt âm thanh' : 'Bật âm thanh';
    }
}

// ===== Page Loader =====
function createPageLoader() {
    const loader = document.createElement('div');
    loader.className = 'page-loader';
    loader.id = 'page-loader';
    loader.innerHTML = `
        <div class="spinner">
            <div class="spinner-ring"></div>
            <div class="spinner-ring"></div>
            <div class="spinner-ring"></div>
        </div>
        <div class="spinner-text">Đang tải</div>
    `;
    document.body.appendChild(loader);
    return loader;
}

function showPageLoader() {
    let loader = document.getElementById('page-loader');
    if (!loader) {
        loader = createPageLoader();
    }
    // Small delay to ensure DOM is ready
    setTimeout(() => {
        loader.classList.add('active');
    }, 10);
}

function hidePageLoader() {
    const loader = document.getElementById('page-loader');
    if (loader) {
        loader.classList.remove('active');
    }
}

// ===== Page Transition =====
function navigateWithTransition(url) {
    // Show loading spinner
    showPageLoader();

    // Add exit animation class
    document.body.classList.add('page-exit');

    // Wait for animation to finish, then navigate
    setTimeout(() => {
        window.location.href = url;
    }, 300); // Match animation duration
}

// Intercept all internal links
function initPageTransitions() {
    // Get all links
    const links = document.querySelectorAll('a[href]');

    links.forEach(link => {
        const href = link.getAttribute('href');

        // Only handle internal HTML page links
        if (href && (href.endsWith('.html') || href === 'index.html' ||
            href === 'practice.html' || href === 'lessons.html' ||
            href === 'docs.html' || href === 'about.html')) {

            link.addEventListener('click', (e) => {
                e.preventDefault();
                navigateWithTransition(href);
            });
        }
    });

    // Handle button clicks (like "Bắt đầu ngay")
    const buttons = document.querySelectorAll('.btn-primary[href]');
    buttons.forEach(button => {
        if (button.tagName === 'A') {
            const href = button.getAttribute('href');
            button.addEventListener('click', (e) => {
                e.preventDefault();
                navigateWithTransition(href);
            });
        }
    });
}

// ===== Initialize =====
document.addEventListener('DOMContentLoaded', () => {
    // Hide page loader when content is ready
    hidePageLoader();

    initTheme();
    initSound();
    initPageTransitions(); // Add page transition handling

    // Only run hero/demo code on index page
    if (document.getElementById('hero-typing')) {
        initHeroTyping();
    }
    if (document.getElementById('demo-code')) {
        initDemoCode();
    }

    // Only run practice-related code on practice page
    if (document.getElementById('code-input')) {
        initLanguageSelector();
        initCodeInput();

        // Check if there's a saved language selection
        const savedLanguage = localStorage.getItem('selectedLanguage');
        if (savedLanguage) {
            currentLanguage = savedLanguage;
            // Update active language button
            document.querySelectorAll('.lang-btn').forEach(btn => {
                btn.classList.toggle('active', btn.dataset.lang === savedLanguage);
            });
            // Clear saved selection after using it
            localStorage.removeItem('selectedLanguage');
        }

        loadCodeSample();
    }
});

// Also hide loader when page is fully loaded (images, etc.)
window.addEventListener('load', () => {
    hidePageLoader();
});

function initSound() {
    // Load saved preference
    const savedSound = localStorage.getItem('soundEnabled');
    if (savedSound !== null) {
        soundEnabled = savedSound === 'true';
    }
    updateSoundButton();
    createSoundEffects();
}

// ===== Theme Toggle =====
function initTheme() {
    // Kiểm tra localStorage hoặc system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme) {
        currentTheme = savedTheme;
    } else if (!systemPrefersDark) {
        currentTheme = 'light';
    }

    applyTheme(currentTheme);

    // Lắng nghe thay đổi system preference
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            currentTheme = e.matches ? 'dark' : 'light';
            applyTheme(currentTheme);
        }
    });
}

function applyTheme(theme) {
    if (theme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
    } else {
        document.documentElement.removeAttribute('data-theme');
    }
    currentTheme = theme;
}

function toggleTheme() {
    currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(currentTheme);
    localStorage.setItem('theme', currentTheme);

    // Animation cho nút toggle
    const toggleBtn = document.getElementById('theme-toggle');
    toggleBtn.style.transform = 'rotate(360deg)';
    setTimeout(() => {
        toggleBtn.style.transform = 'rotate(0deg)';
    }, 300);
}

// ===== Mobile Menu (Hamburger) =====
function toggleMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const menuOverlay = document.getElementById('menu-overlay');

    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    menuOverlay.classList.toggle('active');

    // Prevent body scroll when menu is open
    if (navMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}

function closeMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const menuOverlay = document.getElementById('menu-overlay');

    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    menuOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

// Close menu on resize to desktop
window.addEventListener('resize', () => {
    if (window.innerWidth > 900) {
        closeMenu();
    }
});

// Close menu on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeMenu();
    }
});

// ===== Hero Typing Effect =====
function initHeroTyping() {
    const heroTyping = document.getElementById('hero-typing');
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentText = heroTexts[textIndex];

        if (isDeleting) {
            heroTyping.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            heroTyping.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentText.length) {
            typingSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % heroTexts.length;
            typingSpeed = 500;
        }

        setTimeout(type, typingSpeed);
    }

    type();
}

// ===== Demo Code Typing Effect =====
function initDemoCode() {
    const demoCodeEl = document.getElementById('demo-code');
    let index = 0;
    const codeChars = demoCode.split('');
    let htmlBuffer = '';
    let inTag = false;

    function typeCode() {
        if (index < codeChars.length) {
            const char = codeChars[index];

            if (char === '<') {
                inTag = true;
            }

            htmlBuffer += char;

            if (char === '>') {
                inTag = false;
            }

            if (!inTag && char !== '<') {
                demoCodeEl.innerHTML = htmlBuffer;
            }

            index++;

            // Variable speed for natural feel
            const delay = inTag ? 0 : (Math.random() * 30 + 20);
            setTimeout(typeCode, delay);
        }
    }

    setTimeout(typeCode, 1000);
}

// ===== Language Selector =====
function initLanguageSelector() {
    const langBtns = document.querySelectorAll('.lang-btn');

    langBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            langBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentLanguage = btn.dataset.lang;
            currentSampleIndex = 0;
            resetPractice();
            loadCodeSample();
        });
    });
}

// ===== Load Code Sample =====
function loadCodeSample() {
    const samples = codeSamples[currentLanguage];
    targetCode = samples[currentSampleIndex % samples.length];

    renderTargetCode();
}

// ===== Syntax Highlighting Rules =====
const syntaxRules = {
    javascript: {
        keywords: /\b(const|let|var|function|return|if|else|for|while|do|switch|case|break|continue|try|catch|finally|throw|new|class|extends|constructor|this|super|import|export|default|from|async|await|yield|typeof|instanceof|in|of|delete|void|null|undefined|true|false|NaN|Infinity)\b/g,
        strings: /(["'`])(?:(?!\1)[^\\]|\\.)*?\1/g,
        comments: /(\/\/.*$|\/\*[\s\S]*?\*\/)/gm,
        numbers: /\b(\d+\.?\d*)\b/g,
        functions: /\b([a-zA-Z_$][\w$]*)\s*(?=\()/g,
        operators: /([+\-*/%=<>!&|^~?:]+)/g,
        brackets: /([{}()[\]])/g,
        properties: /\.([a-zA-Z_$][\w$]*)/g,
    },
    python: {
        keywords: /\b(def|class|return|if|elif|else|for|while|try|except|finally|raise|import|from|as|with|pass|break|continue|yield|lambda|and|or|not|in|is|None|True|False|self|global|nonlocal|assert|del|async|await)\b/g,
        strings: /("""[\s\S]*?"""|'''[\s\S]*?'''|"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|f"(?:[^"\\]|\\.)*"|f'(?:[^'\\]|\\.)*')/g,
        comments: /(#.*$)/gm,
        numbers: /\b(\d+\.?\d*)\b/g,
        functions: /\b([a-zA-Z_][\w]*)\s*(?=\()/g,
        decorators: /(@\w+)/g,
        operators: /([+\-*/%=<>!&|^~:]+)/g,
        brackets: /([{}()[\]])/g,
    },
    html: {
        tags: /(<\/?[a-zA-Z][a-zA-Z0-9]*)/g,
        attributes: /\s([a-zA-Z\-]+)(?==)/g,
        strings: /(["'])(?:(?!\1)[^\\]|\\.)*?\1/g,
        comments: /(<!--[\s\S]*?-->)/g,
        doctype: /(<!DOCTYPE\s+\w+>)/gi,
        brackets: /([<>\/])/g,
    },
    css: {
        selectors: /([.#]?[a-zA-Z_\-][\w\-]*)\s*(?={)/g,
        properties: /([a-zA-Z\-]+)\s*(?=:)/g,
        values: /:\s*([^;{}]+)/g,
        strings: /(["'])(?:(?!\1)[^\\]|\\.)*?\1/g,
        comments: /(\/\*[\s\S]*?\*\/)/g,
        numbers: /\b(\d+\.?\d*(px|em|rem|%|vh|vw|s|ms|deg)?)\b/g,
        colors: /(#[0-9a-fA-F]{3,8}|\b(rgb|rgba|hsl|hsla)\([^)]+\))/g,
        atRules: /(@[a-zA-Z\-]+)/g,
        brackets: /([{}()[\]:;])/g,
    }
};

// ===== Tokenize Code for Syntax Highlighting =====
function tokenizeCode(code, language) {
    const tokens = [];
    const rules = syntaxRules[language] || syntaxRules.javascript;

    // Tạo mảng các ký tự với thông tin syntax
    for (let i = 0; i < code.length; i++) {
        tokens.push({
            char: code[i],
            type: 'plain',
            index: i
        });
    }

    // Áp dụng highlighting rules theo thứ tự ưu tiên
    const applyRule = (regex, type) => {
        let match;
        const regexCopy = new RegExp(regex.source, regex.flags);
        while ((match = regexCopy.exec(code)) !== null) {
            const start = match.index;
            const end = start + match[0].length;
            for (let i = start; i < end && i < tokens.length; i++) {
                // Chỉ ghi đè nếu chưa có type quan trọng hơn
                if (tokens[i].type === 'plain' ||
                    (type === 'string' && tokens[i].type !== 'comment') ||
                    (type === 'comment')) {
                    tokens[i].type = type;
                }
            }
        }
    };

    // Áp dụng rules theo thứ tự ưu tiên (comment > string > khác)
    if (rules.comments) applyRule(rules.comments, 'comment');
    if (rules.strings) applyRule(rules.strings, 'string');
    if (rules.doctype) applyRule(rules.doctype, 'doctype');
    if (rules.keywords) applyRule(rules.keywords, 'keyword');
    if (rules.functions) applyRule(rules.functions, 'function');
    if (rules.decorators) applyRule(rules.decorators, 'decorator');
    if (rules.numbers) applyRule(rules.numbers, 'number');
    if (rules.colors) applyRule(rules.colors, 'color');
    if (rules.atRules) applyRule(rules.atRules, 'at-rule');
    if (rules.tags) applyRule(rules.tags, 'tag');
    if (rules.attributes) applyRule(rules.attributes, 'attribute');
    if (rules.properties && language === 'css') applyRule(rules.properties, 'property');
    if (rules.selectors) applyRule(rules.selectors, 'selector');
    if (rules.operators) applyRule(rules.operators, 'operator');
    if (rules.brackets) applyRule(rules.brackets, 'bracket');

    return tokens;
}

// ===== Render Target Code with Syntax Highlighting =====
function renderTargetCode() {
    const codeDisplay = document.getElementById('target-code');
    const lineNumbers = document.getElementById('line-numbers');

    const lines = targetCode.split('\n');

    // Line numbers
    lineNumbers.innerHTML = lines.map((_, i) => `<span>${i + 1}</span>`).join('');

    // Tokenize code với syntax highlighting
    const tokens = tokenizeCode(targetCode, currentLanguage);

    // Render code với character spans có màu syntax
    let html = '';

    for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i];
        const char = token.char;
        const syntaxClass = token.type !== 'plain' ? ` syntax-${token.type}` : '';

        if (char === '\n') {
            html += `<span class="char pending${syntaxClass}" data-index="${i}">\n</span>`;
        } else if (char === ' ') {
            html += `<span class="char pending${syntaxClass}" data-index="${i}"> </span>`;
        } else if (char === '\t') {
            html += `<span class="char pending${syntaxClass}" data-index="${i}">    </span>`;
        } else {
            html += `<span class="char pending${syntaxClass}" data-index="${i}">${escapeHtml(char)}</span>`;
        }
    }

    codeDisplay.innerHTML = html;

    // Highlight first character
    const firstChar = codeDisplay.querySelector('.char');
    if (firstChar) {
        firstChar.classList.add('current');
        firstChar.classList.remove('pending');
    }
}

// ===== Code Input Handler =====
function initCodeInput() {
    const codeInput = document.getElementById('code-input');

    codeInput.addEventListener('input', handleInput);
    codeInput.addEventListener('keydown', handleKeydown);
    codeInput.addEventListener('focus', () => {
        codeInput.classList.add('typing');
    });
    codeInput.addEventListener('blur', () => {
        codeInput.classList.remove('typing');
    });
}

// ===== Handle Input =====
let lastInputLength = 0;
let lastInputValue = '';

function handleInput(e) {
    if (isCompleted) return;

    const input = e.target.value;
    const codeDisplay = document.getElementById('target-code');
    const chars = codeDisplay.querySelectorAll('.char');

    // Detect what kind of input happened
    const inputLength = input.length;
    const lengthDiff = inputLength - lastInputLength;

    // Play appropriate sound
    if (lengthDiff > 0) {
        // Character(s) added
        const newCharIndex = inputLength - 1;
        const newChar = input[newCharIndex];
        const targetChar = targetCode[newCharIndex];

        if (newChar === targetChar) {
            // Correct character
            if (newChar === '\n' || newChar === ' ') {
                if (sounds.enter) sounds.enter();
            } else {
                if (sounds.success) sounds.success();
            }
        } else {
            // Wrong character
            if (sounds.error) sounds.error();
        }
    } else if (lengthDiff < 0) {
        // Character(s) deleted (backspace)
        if (sounds.backspace) sounds.backspace();
    }

    lastInputLength = inputLength;
    lastInputValue = input;

    // Start timer on first input
    if (!startTime && input.length > 0) {
        startTime = Date.now();
        startTimer();
    }

    // Track keystrokes
    totalKeystrokes = input.length;
    correctKeystrokes = 0;

    // Update character states
    chars.forEach((charEl, index) => {
        charEl.classList.remove('correct', 'incorrect', 'current', 'pending');

        if (index < input.length) {
            const targetChar = targetCode[index];
            const inputChar = input[index];

            if (inputChar === targetChar) {
                charEl.classList.add('correct');
                correctKeystrokes++;
            } else {
                charEl.classList.add('incorrect');
            }
        } else if (index === input.length) {
            charEl.classList.add('current');
        } else {
            charEl.classList.add('pending');
        }
    });

    // Update stats
    updateStats();

    // Update progress
    const progress = (input.length / targetCode.length) * 100;
    document.getElementById('progress-bar').style.width = `${Math.min(progress, 100)}%`;

    // Check completion
    if (input === targetCode) {
        completeChallenge();
    }
}

// ===== Auto-Indent Configuration (VS Code style) =====
const indentRules = {
    javascript: {
        // Ký tự mở block - tăng indent
        increaseIndent: /[{(\[]\s*$/,
        // Ký tự đóng block - giảm indent
        decreaseIndent: /^\s*[})\]]/,
        // Sau các keyword này cần indent
        indentKeywords: /^\s*(if|else|for|while|do|switch|try|catch|finally|function|class|=>)\b.*[^;{]\s*$/,
    },
    python: {
        increaseIndent: /:\s*(#.*)?$/,
        decreaseIndent: /^\s*(return|break|continue|pass|raise)\b/,
        indentKeywords: /^\s*(if|elif|else|for|while|try|except|finally|with|def|class|async)\b.*:\s*(#.*)?$/,
    },
    html: {
        increaseIndent: /<[a-zA-Z][^>]*[^/]>\s*$/,
        decreaseIndent: /^\s*<\//,
        indentKeywords: null,
    },
    css: {
        increaseIndent: /{\s*$/,
        decreaseIndent: /^\s*}/,
        indentKeywords: null,
    }
};

// ===== Get Current Line Info =====
function getLineInfo(text, cursorPos) {
    const beforeCursor = text.substring(0, cursorPos);
    const lines = beforeCursor.split('\n');
    const currentLine = lines[lines.length - 1];
    const lineNumber = lines.length - 1;

    // Tính indent của dòng hiện tại
    const indentMatch = currentLine.match(/^(\s*)/);
    const currentIndent = indentMatch ? indentMatch[1] : '';
    const indentLevel = currentIndent.length;

    return {
        currentLine,
        lineNumber,
        currentIndent,
        indentLevel,
        beforeCursor,
        afterCursor: text.substring(cursorPos)
    };
}

// ===== Calculate New Indent =====
function calculateIndent(lineInfo, language) {
    const rules = indentRules[language] || indentRules.javascript;
    const { currentLine, currentIndent } = lineInfo;
    const INDENT_SIZE = 4;
    const INDENT_CHAR = ' ';

    let newIndentLevel = currentIndent.length;

    // Kiểm tra nếu dòng hiện tại kết thúc với ký tự mở block
    if (rules.increaseIndent && rules.increaseIndent.test(currentLine)) {
        newIndentLevel += INDENT_SIZE;
    }
    // Kiểm tra indent keywords (như if, for, function không có {)
    else if (rules.indentKeywords && rules.indentKeywords.test(currentLine)) {
        newIndentLevel += INDENT_SIZE;
    }

    return INDENT_CHAR.repeat(newIndentLevel);
}

// ===== Check if should decrease indent =====
function shouldDecreaseIndent(text, language) {
    const rules = indentRules[language] || indentRules.javascript;
    if (rules.decreaseIndent && rules.decreaseIndent.test(text)) {
        return true;
    }
    return false;
}

// ===== Smart Bracket Completion =====
const bracketPairs = {
    '{': '}',
    '(': ')',
    '[': ']',
    '"': '"',
    "'": "'",
    '`': '`'
};

// ===== Handle Special Keys =====
function handleKeydown(e) {
    const textarea = e.target;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const value = textarea.value;

    // ===== Handle Enter Key - Auto Indent =====
    if (e.key === 'Enter') {
        e.preventDefault();

        const lineInfo = getLineInfo(value, start);
        const newIndent = calculateIndent(lineInfo, currentLanguage);

        // Kiểm tra nếu cursor đang ở giữa cặp brackets {} () []
        const charBefore = value[start - 1];
        const charAfter = value[start];
        const isInBrackets = (charBefore === '{' && charAfter === '}') ||
            (charBefore === '(' && charAfter === ')') ||
            (charBefore === '[' && charAfter === ']');

        let insertText;
        let cursorOffset;

        if (isInBrackets) {
            // Nếu đang ở giữa {}, thêm dòng mới với indent và đóng bracket
            const closingIndent = lineInfo.currentIndent;
            insertText = '\n' + newIndent + '\n' + closingIndent;
            cursorOffset = newIndent.length + 1; // Đặt cursor ở dòng giữa
        } else {
            insertText = '\n' + newIndent;
            cursorOffset = insertText.length;
        }

        // Chèn text mới
        textarea.value = value.substring(0, start) + insertText + value.substring(end);
        textarea.selectionStart = textarea.selectionEnd = start + cursorOffset;

        // Trigger input event
        textarea.dispatchEvent(new Event('input'));
        return;
    }

    // ===== Handle Tab Key =====
    if (e.key === 'Tab') {
        e.preventDefault();

        if (e.shiftKey) {
            // Shift+Tab: Giảm indent
            const lineInfo = getLineInfo(value, start);
            const lineStart = start - lineInfo.currentLine.length;

            // Xóa 4 spaces hoặc 1 tab ở đầu dòng
            if (lineInfo.currentLine.startsWith('    ')) {
                textarea.value = value.substring(0, lineStart) +
                    lineInfo.currentLine.substring(4) +
                    value.substring(start - lineInfo.currentLine.length + lineInfo.currentLine.length);
                textarea.selectionStart = textarea.selectionEnd = Math.max(lineStart, start - 4);
            } else if (lineInfo.currentLine.startsWith('\t')) {
                textarea.value = value.substring(0, lineStart) +
                    lineInfo.currentLine.substring(1) +
                    value.substring(start);
                textarea.selectionStart = textarea.selectionEnd = Math.max(lineStart, start - 1);
            }
        } else {
            // Tab: Thêm indent
            textarea.value = value.substring(0, start) + '    ' + value.substring(end);
            textarea.selectionStart = textarea.selectionEnd = start + 4;
        }

        textarea.dispatchEvent(new Event('input'));
        return;
    }

    // ===== Handle Backspace - Smart Dedent =====
    if (e.key === 'Backspace' && start === end) {
        const lineInfo = getLineInfo(value, start);

        // Nếu cursor ở đầu indent (chỉ có spaces trước cursor trên dòng này)
        if (lineInfo.currentLine.length > 0 &&
            lineInfo.currentLine.trim() === '' &&
            lineInfo.currentLine.length >= 4) {
            e.preventDefault();

            // Xóa 4 spaces cùng lúc
            const spacesToRemove = lineInfo.currentLine.length % 4 || 4;
            const lineStart = start - lineInfo.currentLine.length;

            textarea.value = value.substring(0, lineStart) +
                lineInfo.currentLine.substring(spacesToRemove) +
                value.substring(start);
            textarea.selectionStart = textarea.selectionEnd = start - spacesToRemove;

            textarea.dispatchEvent(new Event('input'));
            return;
        }

        // Xóa cặp brackets nếu đang ở giữa
        const charBefore = value[start - 1];
        const charAfter = value[start];
        if (bracketPairs[charBefore] === charAfter) {
            e.preventDefault();
            textarea.value = value.substring(0, start - 1) + value.substring(start + 1);
            textarea.selectionStart = textarea.selectionEnd = start - 1;
            textarea.dispatchEvent(new Event('input'));
            return;
        }
    }

    // ===== Auto Close Brackets =====
    if (bracketPairs[e.key] && !e.ctrlKey && !e.metaKey) {
        const closingChar = bracketPairs[e.key];

        // Không auto-close quotes nếu đang trong word
        if ((e.key === '"' || e.key === "'" || e.key === '`')) {
            const charBefore = value[start - 1];
            if (charBefore && /\w/.test(charBefore)) {
                return; // Không auto-close
            }
        }

        // Nếu ký tự tiếp theo giống closing char, skip qua nó
        if (value[start] === closingChar && (e.key === '"' || e.key === "'" || e.key === '`' ||
            e.key === ')' || e.key === ']' || e.key === '}')) {
            if (e.key === value[start]) {
                e.preventDefault();
                textarea.selectionStart = textarea.selectionEnd = start + 1;
                return;
            }
        }

        e.preventDefault();

        // Nếu có text được select, wrap nó
        if (start !== end) {
            const selectedText = value.substring(start, end);
            textarea.value = value.substring(0, start) + e.key + selectedText + closingChar + value.substring(end);
            textarea.selectionStart = start + 1;
            textarea.selectionEnd = end + 1;
        } else {
            textarea.value = value.substring(0, start) + e.key + closingChar + value.substring(end);
            textarea.selectionStart = textarea.selectionEnd = start + 1;
        }

        textarea.dispatchEvent(new Event('input'));
        return;
    }

    // ===== Skip closing bracket if typing it =====
    if ((e.key === ')' || e.key === ']' || e.key === '}') && value[start] === e.key) {
        e.preventDefault();
        textarea.selectionStart = textarea.selectionEnd = start + 1;
        return;
    }
}

// ===== Timer =====
function startTimer() {
    timerInterval = setInterval(() => {
        const elapsed = Math.floor((Date.now() - startTime) / 1000);
        const minutes = Math.floor(elapsed / 60);
        const seconds = elapsed % 60;
        document.getElementById('timer').textContent =
            `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }, 1000);
}

function stopTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
}

// ===== Update Stats =====
function updateStats() {
    // Accuracy
    const accuracy = totalKeystrokes > 0
        ? Math.round((correctKeystrokes / totalKeystrokes) * 100)
        : 100;
    document.getElementById('accuracy').textContent = accuracy;

    // WPM (Words Per Minute) - assuming 5 characters = 1 word
    if (startTime) {
        const timeElapsed = (Date.now() - startTime) / 1000 / 60; // in minutes
        const words = correctKeystrokes / 5;
        const wpm = timeElapsed > 0 ? Math.round(words / timeElapsed) : 0;
        document.getElementById('wpm').textContent = wpm;
    }
}

// ===== Complete Challenge =====
function completeChallenge() {
    isCompleted = true;
    stopTimer();

    // Play completion sound
    if (sounds.complete) sounds.complete();

    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    const minutes = Math.floor(elapsed / 60);
    const seconds = elapsed % 60;
    const accuracy = Math.round((correctKeystrokes / totalKeystrokes) * 100);
    const wpm = document.getElementById('wpm').textContent;
    const errors = totalKeystrokes - correctKeystrokes;

    // Show results
    document.getElementById('final-wpm').textContent = wpm;
    document.getElementById('final-accuracy').textContent = accuracy + '%';
    document.getElementById('final-time').textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    document.getElementById('final-errors').textContent = errors;

    document.getElementById('results').style.display = 'block';

    // Disable input
    document.getElementById('code-input').disabled = true;
}

// ===== Reset Practice =====
function resetPractice() {
    isCompleted = false;
    startTime = null;
    totalKeystrokes = 0;
    correctKeystrokes = 0;
    lastInputLength = 0;
    lastInputValue = '';

    stopTimer();

    document.getElementById('code-input').value = '';
    document.getElementById('code-input').disabled = false;
    document.getElementById('wpm').textContent = '0';
    document.getElementById('accuracy').textContent = '100';
    document.getElementById('timer').textContent = '0:00';
    document.getElementById('progress-bar').style.width = '0%';
    document.getElementById('results').style.display = 'none';

    loadCodeSample();
    document.getElementById('code-input').focus();
}

// ===== Next Challenge =====
function nextChallenge() {
    currentSampleIndex++;
    resetPractice();
}

// ===== Select Lesson =====
function selectLesson(lessonId) {
    // Map lessons to languages
    const lessonMap = {
        'js-basics': 'javascript',
        'js-advanced': 'javascript',
        'python-basics': 'python',
        'html-css': 'html',
        'react': 'javascript',
        'algorithms': 'javascript'
    };

    const language = lessonMap[lessonId] || 'javascript';

    // Save selected language to localStorage
    localStorage.setItem('selectedLanguage', language);

    // Redirect to practice page with transition
    navigateWithTransition('practice.html');
}

// ===== Scroll to Section =====
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// ===== Docs Tab Switching =====
function showDocsTab(tabId) {
    // Ẩn tất cả docs content
    const allContents = document.querySelectorAll('.docs-content');
    allContents.forEach(content => {
        content.classList.remove('active');
    });

    // Bỏ active từ tất cả tabs
    const allTabs = document.querySelectorAll('.docs-tab');
    allTabs.forEach(tab => {
        tab.classList.remove('active');
    });

    // Hiện content được chọn
    const selectedContent = document.getElementById(`docs-${tabId}`);
    if (selectedContent) {
        selectedContent.classList.add('active');
    }

    // Active tab được click
    const clickedTab = event.target;
    if (clickedTab) {
        clickedTab.classList.add('active');
    }

    // Scroll to docs section
    scrollToSection('docs');
}

// ===== Utility Functions =====
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ===== Keyboard Shortcuts =====
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + Enter to reset
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        resetPractice();
    }

    // Escape to unfocus
    if (e.key === 'Escape') {
        document.activeElement.blur();
    }
});

// ===== Smooth Character Typing Effect =====
// This creates a smooth visual feedback when typing
const originalInput = document.getElementById('code-input');
if (originalInput) {
    let lastValue = '';

    originalInput.addEventListener('input', (e) => {
        const newValue = e.target.value;

        // Add smooth transition class
        if (newValue.length > lastValue.length) {
            // Character added - animate
            const codeDisplay = document.getElementById('target-code');
            const currentChar = codeDisplay.querySelector(`.char[data-index="${newValue.length - 1}"]`);
            if (currentChar) {
                currentChar.style.transition = 'all 0.1s ease';
            }
        }

        lastValue = newValue;
    });
}

// ===== Run Code Functionality =====
let consoleOutput = [];
let pyodide = null;
let pyodideLoading = false;

// Store original console methods
const originalConsole = {
    log: console.log,
    info: console.info,
    warn: console.warn,
    error: console.error
};

// Create console interceptor
function captureConsole() {
    console.log = (...args) => {
        consoleOutput.push({ type: 'log', message: args.map(formatOutput).join(' ') });
        originalConsole.log.apply(console, args);
    };

    console.info = (...args) => {
        consoleOutput.push({ type: 'info', message: args.map(formatOutput).join(' ') });
        originalConsole.info.apply(console, args);
    };

    console.warn = (...args) => {
        consoleOutput.push({ type: 'warn', message: args.map(formatOutput).join(' ') });
        originalConsole.warn.apply(console, args);
    };

    console.error = (...args) => {
        consoleOutput.push({ type: 'error', message: args.map(formatOutput).join(' ') });
        originalConsole.error.apply(console, args);
    };
}

// Restore original console
function restoreConsole() {
    console.log = originalConsole.log;
    console.info = originalConsole.info;
    console.warn = originalConsole.warn;
    console.error = originalConsole.error;
}

// Format output for display
function formatOutput(obj) {
    if (obj === null) return 'null';
    if (obj === undefined) return 'undefined';
    if (typeof obj === 'string') return obj;
    if (typeof obj === 'number' || typeof obj === 'boolean') return String(obj);
    if (typeof obj === 'function') return `[Function: ${obj.name || 'anonymous'}]`;

    try {
        // Handle circular references
        const seen = new WeakSet();
        return JSON.stringify(obj, (key, value) => {
            if (typeof value === 'object' && value !== null) {
                if (seen.has(value)) {
                    return '[Circular]';
                }
                seen.add(value);
            }
            return value;
        }, 2);
    } catch (e) {
        return String(obj);
    }
}

// Main run code function
async function runCode() {
    const codeInput = document.getElementById('code-input');
    const outputContainer = document.getElementById('output-container');
    const outputContent = document.getElementById('output-content');
    const previewFrame = document.getElementById('preview-frame');
    const runButton = document.querySelector('.btn-run');

    if (!codeInput || !outputContainer || !outputContent) return;

    const code = codeInput.value.trim();

    if (!code) {
        showOutput('Vui lòng nhập code để chạy!', 'warn');
        return;
    }

    // Clear previous output
    consoleOutput = [];
    outputContent.innerHTML = '';
    previewFrame.style.display = 'none';
    outputContent.style.display = 'block';

    // Show output container
    outputContainer.style.display = 'block';

    // Add loading state
    runButton.classList.add('loading');

    // Small delay to show loading state
    setTimeout(async () => {
        try {
            if (currentLanguage === 'javascript') {
                runJavaScript(code);
            } else if (currentLanguage === 'html' || currentLanguage === 'css') {
                runHTMLCSS(code);
                runButton.classList.remove('loading');
            } else if (currentLanguage === 'python') {
                await runPython(code);
            } else {
                showOutput(`Ngôn ngữ "${currentLanguage}" chưa được hỗ trợ!`, 'warn');
                runButton.classList.remove('loading');
            }
        } catch (error) {
            showOutput(`Lỗi: ${error.message}`, 'error');
            runButton.classList.remove('loading');
        }
    }, 100);
}

// Run JavaScript code
function runJavaScript(code) {
    const outputContent = document.getElementById('output-content');

    // Clear output
    consoleOutput = [];

    // Capture console
    captureConsole();

    try {
        // Create a safe execution context
        const AsyncFunction = Object.getPrototypeOf(async function () { }).constructor;
        const wrappedCode = `
            try {
                ${code}
            } catch (err) {
                console.error(err.message);
            }
        `;

        // Execute code
        const result = new Function(wrappedCode)();

        // Wait a bit for async operations
        setTimeout(() => {
            restoreConsole();

            // Display output
            if (consoleOutput.length > 0) {
                outputContent.innerHTML = '';
                consoleOutput.forEach(output => {
                    const line = document.createElement('div');
                    line.className = `output-line ${output.type}`;
                    line.textContent = output.message;
                    outputContent.appendChild(line);
                });
            } else {
                // If no console output, show success message
                showOutput('Code chạy thành công! (Không có output)', 'success');
            }
        }, 100);

    } catch (error) {
        restoreConsole();

        // Parse error for better display
        let errorMessage = error.message;
        if (error.stack) {
            const stackLines = error.stack.split('\n');
            errorMessage = stackLines[0];
        }

        showOutput(`Lỗi: ${errorMessage}`, 'error');
    }
}

// Run HTML/CSS code
function runHTMLCSS(code) {
    const outputContent = document.getElementById('output-content');
    const previewFrame = document.getElementById('preview-frame');
    const outputContainer = document.getElementById('output-container');
    const runButton = document.querySelector('.btn-run');

    // Show output container
    if (outputContainer) {
        outputContainer.style.display = 'block';
    }

    // Hide text output, show iframe
    outputContent.style.display = 'none';
    previewFrame.style.display = 'block';

    try {
        let htmlContent = code;

        // If it's CSS, wrap it in HTML
        if (currentLanguage === 'css') {
            htmlContent = `
                <!DOCTYPE html>
                <html>
                <head>
                    <style>
                        body {
                            margin: 20px;
                            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
                        }
                        ${code}
                    </style>
                </head>
                <body>
                    <div class="container">
                        <h1>CSS Preview</h1>
                        <p>Đây là preview của CSS code bạn vừa viết.</p>
                        <button class="button">Sample Button</button>
                        <div class="animated">Animated Element</div>
                    </div>
                </body>
                </html>
            `;
        } else if (!code.includes('<html') && !code.includes('<!DOCTYPE')) {
            // If it's HTML snippet without full structure, wrap it
            htmlContent = `
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="UTF-8">
                    <style>
                        body {
                            margin: 20px;
                            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
                        }
                    </style>
                </head>
                <body>
                    ${code}
                </body>
                </html>
            `;
        }

        // Create blob URL for iframe
        const blob = new Blob([htmlContent], { type: 'text/html' });
        const url = URL.createObjectURL(blob);

        previewFrame.src = url;

        // Clean up blob URL after loading
        previewFrame.onload = () => {
            URL.revokeObjectURL(url);
            // Remove loading state
            if (runButton) {
                runButton.classList.remove('loading');
            }
        };

    } catch (error) {
        outputContent.style.display = 'block';
        previewFrame.style.display = 'none';
        showOutput(`Lỗi: ${error.message}`, 'error');
        // Remove loading state on error
        if (runButton) {
            runButton.classList.remove('loading');
        }
    }
}

// Load Pyodide (lazy loading)
async function initPyodide() {
    if (pyodide) return pyodide;
    if (pyodideLoading) {
        // Wait for existing load to complete
        while (pyodideLoading) {
            await new Promise(resolve => setTimeout(resolve, 100));
        }
        return pyodide;
    }

    try {
        pyodideLoading = true;
        showOutput('Đang tải Python interpreter (Pyodide)... Vui lòng đợi...', 'info');

        // Check if loadPyodide is available
        if (typeof loadPyodide === 'undefined') {
            throw new Error('Pyodide chưa được tải. Vui lòng thử lại sau.');
        }

        // Load Pyodide from CDN
        pyodide = await loadPyodide({
            indexURL: "https://cdn.jsdelivr.net/pyodide/v0.24.1/full/"
        });

        // Setup stdout/stderr capture
        pyodide.setStdout({
            batched: (msg) => {
                consoleOutput.push({ type: 'log', message: msg });
            }
        });

        pyodide.setStderr({
            batched: (msg) => {
                consoleOutput.push({ type: 'error', message: msg });
            }
        });

        pyodideLoading = false;
        return pyodide;

    } catch (error) {
        pyodideLoading = false;
        throw new Error(`Không thể tải Pyodide: ${error.message}`);
    }
}

// Run Python code with Pyodide
async function runPython(code) {
    const outputContent = document.getElementById('output-content');
    const runButton = document.querySelector('.btn-run');

    try {
        // Clear output
        consoleOutput = [];
        outputContent.innerHTML = '';

        // Show loading message
        showOutput('Đang khởi tạo Python interpreter...', 'info');

        // Load Pyodide if not already loaded
        const py = await initPyodide();

        // Clear loading message
        outputContent.innerHTML = '';
        consoleOutput = [];

        // Wrap code to capture print statements
        const wrappedCode = `
import sys
from io import StringIO

# Capture stdout
old_stdout = sys.stdout
sys.stdout = StringIO()

try:
${code.split('\n').map(line => '    ' + line).join('\n')}
finally:
    # Get output and restore stdout BEFORE printing
    output = sys.stdout.getvalue()
    sys.stdout = old_stdout
    if output:
        print(output, end='')
`;

        // Run the Python code
        try {
            await py.runPythonAsync(wrappedCode);

            // Display output
            if (consoleOutput.length > 0) {
                outputContent.innerHTML = '';
                consoleOutput.forEach(output => {
                    const line = document.createElement('div');
                    line.className = `output-line ${output.type}`;
                    line.textContent = output.message;
                    outputContent.appendChild(line);
                });
            } else {
                showOutput('Code chạy thành công! (Không có output)', 'success');
            }
        } catch (err) {
            // Parse Python error
            let errorMessage = err.message;

            // Extract relevant error info
            if (errorMessage.includes('Traceback')) {
                const lines = errorMessage.split('\n');
                // Get the error type and message (last line)
                const errorLine = lines[lines.length - 1] || lines[lines.length - 2];
                errorMessage = errorLine || errorMessage;
            }

            showOutput(`Lỗi Python: ${errorMessage}`, 'error');
        }

    } catch (error) {
        showOutput(`Lỗi: ${error.message}`, 'error');
    } finally {
        runButton.classList.remove('loading');
    }
}

// Helper function to show single output message
function showOutput(message, type = 'log') {
    const outputContent = document.getElementById('output-content');
    const outputContainer = document.getElementById('output-container');
    const previewFrame = document.getElementById('preview-frame');

    outputContainer.style.display = 'block';
    previewFrame.style.display = 'none';
    outputContent.style.display = 'block';

    outputContent.innerHTML = '';
    const line = document.createElement('div');
    line.className = `output-line ${type}`;
    line.textContent = message;
    outputContent.appendChild(line);
}

// Clear output
function clearOutput() {
    const outputContainer = document.getElementById('output-container');
    const outputContent = document.getElementById('output-content');
    const previewFrame = document.getElementById('preview-frame');

    if (outputContent) {
        outputContent.innerHTML = '';
    }
    if (previewFrame) {
        previewFrame.src = 'about:blank';
    }
    if (outputContainer) {
        outputContainer.style.display = 'none';
    }

    consoleOutput = [];
}

// Keyboard shortcut: Ctrl/Cmd + Enter to run code
document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        const codeInput = document.getElementById('code-input');
        if (codeInput && document.activeElement === codeInput) {
            e.preventDefault();
            runCode();
        }
    }
});