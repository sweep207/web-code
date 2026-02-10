# SWEEP 🚀 - Học Code với Hiệu Ứng Gõ Chữ

## 📖 Giới thiệu

CodeType là một ứng dụng web giúp bạn luyện tập kỹ năng gõ code một cách hiệu quả và thú vị. Với giao diện đẹp mắt, syntax highlighting, auto-indent thông minh giống VS Code, và hiệu ứng âm thanh khi gõ phím.

**Dev By: sweep**

## ✨ Tính năng

- 🎨 **Syntax Highlighting**: Màu sắc code theo theme VS Code Dark+/Light+
- 🔤 **Auto-Indent**: Tự động thụt lề giống VS Code
- 🎵 **Âm thanh**: Hiệu ứng âm thanh khi gõ phím
- 🌓 **Dark/Light Mode**: Chuyển đổi giao diện sáng/tối
- 📱 **Responsive**: Hoạt động mượt trên mọi thiết bị
- 📊 **Thống kê**: Theo dõi WPM, độ chính xác, thời gian
- 🌐 **Đa ngôn ngữ**: JavaScript, Python, HTML, CSS

## 🚀 Hướng dẫn Sử dụng

### Bước 1: Mở file
```bash
# Mở file index.html trong trình duyệt
# Hoặc chạy server đơn giản:
python -m http.server 8000
# Truy cập: http://localhost:8000
```

### Bước 2: Chọn ngôn ngữ
Click vào các nút: JavaScript, Python, HTML, hoặc CSS

### Bước 3: Bắt đầu gõ
- Gõ theo đoạn code hiển thị
- Chữ xanh = đúng, đỏ = sai
- Nhấn `Tab` để thụt lề
- Nhấn `Shift+Tab` để giảm lề

### Phím tắt
- `Tab`: Thụt lề 4 spaces
- `Shift+Tab`: Giảm lề 4 spaces
- `Enter`: Xuống dòng với auto-indent
- `Backspace`: Xóa thông minh (4 spaces cùng lúc)
- `Ctrl+Enter`: Reset bài tập
- `Esc`: Đóng menu/unfocus

---

## 📚 Giải thích Code Chi tiết

### 1. Cấu trúc Dự án

```
Web-Code/
├── index.html          # Cấu trúc HTML chính
├── styles.css          # CSS và responsive
├── script.js           # Logic JavaScript
└── README.md           # Tài liệu hướng dẫn
```

---

## 🧩 HTML (index.html)

### Cấu trúc Header
```html
<header class="header">
    <div class="logo">
        <span class="logo-icon">&lt;/&gt;</span>
        <span class="logo-text">CodeType</span>
    </div>
    <nav class="nav" id="nav-menu">
        <!-- Các link điều hướng -->
    </nav>
    <div class="header-actions">
        <!-- Nút bật/tắt âm thanh -->
        <!-- Nút chuyển theme -->
        <!-- Nút hamburger menu -->
    </div>
</header>
```

**Giải thích:**
- `header`: Thanh điều hướng sticky ở đầu trang
- `logo`: Logo của website
- `nav`: Menu điều hướng (ẩn trên mobile, hiện hamburger)
- `header-actions`: Các nút toggle (sound, theme, menu)

### Editor Container
```html
<div class="editor-container">
    <!-- Header với thống kê -->
    <div class="editor-header">
        <span class="editor-title">Gõ theo đoạn code bên dưới:</span>
        <div class="editor-stats">
            <span class="stat">WPM: <span id="wpm">0</span></span>
            <span class="stat">Độ chính xác: <span id="accuracy">100</span>%</span>
            <span class="stat">Thời gian: <span id="timer">0:00</span></span>
        </div>
    </div>

    <!-- Code hiển thị để gõ theo -->
    <div class="code-display">
        <div class="line-numbers" id="line-numbers"></div>
        <div class="code-text" id="target-code"></div>
    </div>

    <!-- Textarea để gõ code -->
    <div class="input-container">
        <textarea id="code-input" class="code-input"></textarea>
    </div>

    <!-- Thanh progress -->
    <div class="progress-container">
        <div class="progress-bar" id="progress-bar"></div>
    </div>
</div>
```

**Giải thích:**
- `editor-header`: Hiển thị tiêu đề và stats (WPM, accuracy, timer)
- `code-display`: Hiển thị code mẫu để gõ theo
- `line-numbers`: Số thứ tự dòng
- `target-code`: Code được render với syntax highlighting
- `code-input`: Textarea để người dùng gõ
- `progress-bar`: Thanh tiến độ

---

## 🎨 CSS (styles.css)

### CSS Variables
```css
:root {
    --bg-primary: #0d1117;       /* Màu nền chính */
    --text-primary: #e6edf3;     /* Màu chữ chính */
    --accent-primary: #58a6ff;   /* Màu accent (xanh) */
    --syntax-keyword: #c586c0;   /* Màu keyword */
    --syntax-string: #ce9178;    /* Màu string */
    /* ... */
}

[data-theme="light"] {
    --bg-primary: #ffffff;       /* Light mode */
    --text-primary: #1f2328;
    /* ... */
}
```

**Giải thích:**
- CSS Variables cho phép thay đổi màu dễ dàng
- `:root` định nghĩa biến cho dark theme
- `[data-theme="light"]` override cho light theme

### Syntax Highlighting
```css
.char.syntax-keyword {
    color: var(--syntax-keyword);
}

.char.correct {
    color: #4ade80 !important;      /* Màu xanh khi đúng */
}

.char.incorrect {
    color: var(--accent-error);     /* Màu đỏ khi sai */
    background: rgba(248, 81, 73, 0.2);
}

.char.current {
    background: rgba(88, 166, 255, 0.3);
    animation: pulse 0.5s ease infinite alternate;
}
```

**Giải thích:**
- `.char`: Mỗi ký tự là một `<span class="char">`
- `.syntax-keyword`: Áp dụng màu cho keyword (const, let, function...)
- `.correct`: Khi gõ đúng → màu xanh
- `.incorrect`: Khi gõ sai → màu đỏ + background
- `.current`: Ký tự hiện tại → highlight với animation pulse

### Responsive Design
```css
/* Mobile - 900px */
@media (max-width: 900px) {
    .hamburger {
        display: flex;      /* Hiện hamburger */
    }

    .nav {
        position: fixed;    /* Menu slide từ bên phải */
        right: -280px;
        transition: right 0.3s ease;
    }

    .nav.active {
        right: 0;           /* Khi mở menu */
    }
}
```

**Giải thích:**
- `@media`: Media query cho responsive
- Desktop: Nav hiện ngang, hamburger ẩn
- Mobile: Nav ẩn bên phải, hamburger hiện
- Khi click hamburger → add class `.active` → nav slide vào

---

## ⚙️ JavaScript (script.js)

### 1. State Variables (Biến Trạng thái)

```javascript
let currentLanguage = 'javascript';   // Ngôn ngữ hiện tại
let targetCode = '';                  // Code mẫu
let startTime = null;                 // Thời gian bắt đầu
let totalKeystrokes = 0;              // Tổng số phím đã gõ
let correctKeystrokes = 0;            // Số phím gõ đúng
let soundEnabled = true;              // Âm thanh bật/tắt
```

**Giải thích:**
- Các biến `let` lưu trữ trạng thái của ứng dụng
- `targetCode`: Lưu đoạn code cần gõ theo
- `startTime`: Dùng để tính WPM và thời gian
- `correctKeystrokes`: Tính accuracy = correct/total * 100

---

### 2. Khởi tạo (Initialization)

```javascript
document.addEventListener('DOMContentLoaded', () => {
    initTheme();          // Khởi tạo theme
    initSound();          // Khởi tạo âm thanh
    initHeroTyping();     // Typing effect ở hero
    initDemoCode();       // Demo code animation
    initLanguageSelector();// Xử lý chọn ngôn ngữ
    initCodeInput();      // Xử lý input
    loadCodeSample();     // Load code mẫu
});
```

**Giải thích:**
- `DOMContentLoaded`: Chờ DOM load xong mới chạy
- Gọi các hàm `init*()` để thiết lập ban đầu
- Thứ tự quan trọng: theme → sound → UI → data

---

### 3. Theme Toggle (Chuyển đổi Theme)

```javascript
function toggleTheme() {
    // Đổi theme: dark ↔ light
    currentTheme = currentTheme === 'dark' ? 'light' : 'dark';

    // Áp dụng theme mới
    applyTheme(currentTheme);

    // Lưu vào localStorage
    localStorage.setItem('theme', currentTheme);

    // Animation xoay nút 360°
    const toggleBtn = document.getElementById('theme-toggle');
    toggleBtn.style.transform = 'rotate(360deg)';
    setTimeout(() => {
        toggleBtn.style.transform = 'rotate(0deg)';
    }, 300);
}

function applyTheme(theme) {
    if (theme === 'light') {
        // Thêm attribute data-theme="light"
        document.documentElement.setAttribute('data-theme', 'light');
    } else {
        // Xóa attribute → về dark mode
        document.documentElement.removeAttribute('data-theme');
    }
}
```

**Giải thích:**
- `toggleTheme()`: Chuyển đổi giữa dark/light
- `localStorage`: Lưu preference của user
- `data-theme="light"`: CSS sẽ apply light mode variables
- Animation: Xoay nút 360° khi chuyển theme

---

### 4. Sound Effects (Hiệu ứng Âm thanh)

```javascript
function createSoundEffects() {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const audioCtx = new AudioContext();

    // Âm thanh gõ đúng
    sounds.success = () => {
        const oscillator = audioCtx.createOscillator();  // Tạo sóng âm
        const gainNode = audioCtx.createGain();          // Điều chỉnh âm lượng

        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        oscillator.frequency.value = 1200;     // Tần số 1200Hz (cao)
        oscillator.type = 'sine';              // Dạng sóng sine (mượt)

        gainNode.gain.setValueAtTime(0.08, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.03);

        oscillator.start(audioCtx.currentTime);
        oscillator.stop(audioCtx.currentTime + 0.03);  // Dừng sau 0.03s
    };
}
```

**Giải thích:**
- `AudioContext`: Web Audio API để tạo âm thanh
- `createOscillator()`: Tạo sóng âm thanh
- `frequency`: Tần số (Hz) - cao hơn = âm cao hơn
- `gain`: Âm lượng (0-1)
- `exponentialRampToValueAtTime`: Giảm âm lượng dần (fade out)

---

### 5. Syntax Highlighting (Tô màu Code)

```javascript
const syntaxRules = {
    javascript: {
        keywords: /\b(const|let|var|function|return|if|else)\b/g,
        strings: /(["'`])(?:(?!\1)[^\\]|\\.)*?\1/g,
        numbers: /\b(\d+\.?\d*)\b/g,
        functions: /\b([a-zA-Z_$][\w$]*)\s*(?=\()/g,
    },
    // ... python, html, css
};

function tokenizeCode(code, language) {
    const tokens = [];
    const rules = syntaxRules[language];

    // 1. Tạo array các ký tự
    for (let i = 0; i < code.length; i++) {
        tokens.push({ char: code[i], type: 'plain', index: i });
    }

    // 2. Áp dụng regex để detect keywords, strings, etc
    const applyRule = (regex, type) => {
        let match;
        while ((match = regex.exec(code)) !== null) {
            const start = match.index;
            const end = start + match[0].length;
            for (let i = start; i < end; i++) {
                tokens[i].type = type;  // Gán type cho token
            }
        }
    };

    // 3. Áp dụng rules theo thứ tự ưu tiên
    applyRule(rules.keywords, 'keyword');
    applyRule(rules.strings, 'string');
    applyRule(rules.numbers, 'number');

    return tokens;
}
```

**Giải thích:**
- `syntaxRules`: Regex patterns cho từng loại token
- `tokenizeCode()`: Phân tích code thành các token
- Mỗi ký tự có `type` (keyword, string, number...)
- Áp dụng CSS class `.syntax-keyword`, `.syntax-string`...

---

### 6. Auto-Indent (Tự động Thụt lề)

```javascript
const indentRules = {
    javascript: {
        increaseIndent: /[{(\[]\s*$/,        // Sau {, (, [
        decreaseIndent: /^\s*[})\]]/,        // Trước }, ), ]
    }
};

function handleKeydown(e) {
    const textarea = e.target;
    const value = textarea.value;
    const start = textarea.selectionStart;

    // Xử lý Enter - Auto indent
    if (e.key === 'Enter') {
        e.preventDefault();

        const lineInfo = getLineInfo(value, start);
        const newIndent = calculateIndent(lineInfo, currentLanguage);

        // Kiểm tra nếu đang ở giữa {}
        const charBefore = value[start - 1];
        const charAfter = value[start];
        const isInBrackets = (charBefore === '{' && charAfter === '}');

        if (isInBrackets) {
            // Thêm 2 dòng: 1 có indent, 1 đóng bracket
            const closingIndent = lineInfo.currentIndent;
            const insertText = '\n' + newIndent + '\n' + closingIndent;
            textarea.value = value.substring(0, start) + insertText + value.substring(start);
            textarea.selectionStart = start + newIndent.length + 1;
        } else {
            // Thêm 1 dòng với indent
            const insertText = '\n' + newIndent;
            textarea.value = value.substring(0, start) + insertText + value.substring(start);
            textarea.selectionStart = start + insertText.length;
        }
    }
}

function calculateIndent(lineInfo, language) {
    const rules = indentRules[language];
    const { currentLine, currentIndent } = lineInfo;
    let newIndentLevel = currentIndent.length;

    // Nếu dòng hiện tại kết thúc với {, tăng indent
    if (rules.increaseIndent.test(currentLine)) {
        newIndentLevel += 4;  // Thêm 4 spaces
    }

    return ' '.repeat(newIndentLevel);
}
```

**Giải thích:**
- `indentRules`: Quy tắc tăng/giảm indent cho từng ngôn ngữ
- `handleKeydown()`: Xử lý khi nhấn phím
- `Enter` sau `{` → tăng indent 4 spaces
- `Enter` giữa `{}` → thêm 2 dòng, cursor ở giữa
- `getLineInfo()`: Lấy thông tin dòng hiện tại và indent
- `calculateIndent()`: Tính indent cho dòng mới

---

### 7. Handle Input (Xử lý Gõ phím)

```javascript
function handleInput(e) {
    const input = e.target.value;
    const inputLength = input.length;
    const lengthDiff = inputLength - lastInputLength;

    // 1. Phát âm thanh
    if (lengthDiff > 0) {
        // Thêm ký tự
        const newChar = input[inputLength - 1];
        const targetChar = targetCode[inputLength - 1];

        if (newChar === targetChar) {
            sounds.success();  // Gõ đúng
        } else {
            sounds.error();    // Gõ sai
        }
    } else if (lengthDiff < 0) {
        sounds.backspace();    // Xóa ký tự
    }

    // 2. Bắt đầu đếm thời gian
    if (!startTime && input.length > 0) {
        startTime = Date.now();
        startTimer();
    }

    // 3. Cập nhật trạng thái từng ký tự
    const chars = document.querySelectorAll('.char');
    chars.forEach((charEl, index) => {
        if (index < input.length) {
            if (input[index] === targetCode[index]) {
                charEl.classList.add('correct');     // Xanh
                correctKeystrokes++;
            } else {
                charEl.classList.add('incorrect');   // Đỏ
            }
        } else if (index === input.length) {
            charEl.classList.add('current');         // Đang gõ
        } else {
            charEl.classList.add('pending');         // Chưa gõ
        }
    });

    // 4. Cập nhật stats
    updateStats();

    // 5. Kiểm tra hoàn thành
    if (input === targetCode) {
        completeChallenge();
    }
}
```

**Giải thích:**
- `handleInput()`: Hàm chính xử lý khi gõ
- So sánh `input` với `targetCode` để kiểm tra đúng/sai
- Phát âm thanh tương ứng
- Cập nhật CSS class cho từng ký tự
- Tính toán stats (WPM, accuracy)
- Kiểm tra hoàn thành khi `input === targetCode`

---

### 8. Calculate WPM (Tính Words Per Minute)

```javascript
function updateStats() {
    // 1. Tính Accuracy (Độ chính xác)
    const accuracy = totalKeystrokes > 0
        ? Math.round((correctKeystrokes / totalKeystrokes) * 100)
        : 100;

    // 2. Tính WPM (Words Per Minute)
    if (startTime) {
        const timeElapsed = (Date.now() - startTime) / 1000 / 60;  // phút
        const words = correctKeystrokes / 5;  // 5 ký tự = 1 từ
        const wpm = timeElapsed > 0 ? Math.round(words / timeElapsed) : 0;

        document.getElementById('wpm').textContent = wpm;
    }

    document.getElementById('accuracy').textContent = accuracy;
}
```

**Giải thích:**
- `accuracy = (correct / total) * 100`
- WPM: Words Per Minute
  - 1 word = 5 characters (tiêu chuẩn)
  - words = correctKeystrokes / 5
  - wpm = words / (thời gian tính bằng phút)
- `Date.now() - startTime`: Thời gian đã trôi qua (ms)

---

### 9. Mobile Menu (Hamburger)

```javascript
function toggleMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const menuOverlay = document.getElementById('menu-overlay');

    // Toggle class 'active'
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    menuOverlay.classList.toggle('active');

    // Ngăn scroll khi menu mở
    if (navMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}

function closeMenu() {
    // Remove tất cả class 'active'
    document.getElementById('hamburger').classList.remove('active');
    document.getElementById('nav-menu').classList.remove('active');
    document.getElementById('menu-overlay').classList.remove('active');
    document.body.style.overflow = '';
}
```

**Giải thích:**
- `toggleMenu()`: Mở/đóng menu
- `.classList.toggle('active')`: Thêm/xóa class
- Hamburger: 3 thanh → X khi active (CSS animation)
- Menu: Slide từ phải vào khi active
- Overlay: Hiện nền mờ khi active
- `overflow: hidden`: Không cho scroll body khi menu mở

---

## 🎯 Các Khái niệm Quan trọng

### 1. Event Listener
```javascript
element.addEventListener('event', callback);
```
- Lắng nghe sự kiện (click, input, keydown...)
- Khi sự kiện xảy ra → gọi function callback

### 2. DOM Manipulation
```javascript
document.getElementById('id');          // Lấy element theo ID
element.classList.add('class');         // Thêm class
element.classList.remove('class');      // Xóa class
element.classList.toggle('class');      // Thêm/xóa class
element.textContent = 'text';           // Đổi text
element.style.color = 'red';            // Đổi style
```

### 3. localStorage
```javascript
localStorage.setItem('key', 'value');   // Lưu data
localStorage.getItem('key');            // Lấy data
```
- Lưu trữ data vĩnh viễn trên trình duyệt
- Không mất khi tắt browser

### 4. Regular Expression (Regex)
```javascript
/\b(const|let|var)\b/g
```
- Pattern matching cho text
- Dùng để detect keywords, strings, numbers...

### 5. Array Methods
```javascript
array.forEach((item, index) => { });    // Lặp qua từng phần tử
array.map(item => { });                 // Transform array
array.filter(item => { });              // Lọc array
```

---

## 🐛 Debugging Tips

### 1. Console.log
```javascript
console.log('value:', value);
console.log('Length:', input.length);
```

### 2. Debugger
```javascript
debugger;  // Dừng code tại đây (mở DevTools)
```

### 3. Chrome DevTools
- `F12`: Mở DevTools
- `Console`: Xem logs và errors
- `Elements`: Xem HTML/CSS
- `Sources`: Debug JavaScript
- `Network`: Xem requests

---

## 📝 Bài tập Thực hành

### Bài 1: Thêm Ngôn ngữ Mới
Thêm ngôn ngữ TypeScript vào ứng dụng:

```javascript
// 1. Thêm vào codeSamples
const codeSamples = {
    // ...
    typescript: [
        `interface User {
    name: string;
    age: number;
}

const user: User = {
    name: "Alice",
    age: 25
};`
    ]
};

// 2. Thêm syntax rules
const syntaxRules = {
    // ...
    typescript: {
        keywords: /\b(interface|type|enum|const|let)\b/g,
        // ...
    }
};

// 3. Thêm nút trong HTML
<button class="lang-btn" data-lang="typescript">TypeScript</button>
```

### Bài 2: Thêm Difficulty Levels
Thêm 3 mức độ: Easy, Medium, Hard với code ngắn/dài khác nhau.

### Bài 3: Leaderboard
Lưu top scores vào localStorage và hiển thị bảng xếp hạng.

---

## 🤝 Đóng góp

Nếu bạn muốn đóng góp:
1. Fork repository
2. Tạo branch mới: `git checkout -b feature/ten-tinh-nang`
3. Commit changes: `git commit -m 'Thêm tính năng X'`
4. Push: `git push origin feature/ten-tinh-nang`
5. Tạo Pull Request

---

## 📞 Liên hệ

- **Developer**: SWEEP
- **Email**: dangtoanvu07@gmail.com
- **Website**: https://sweep.id.vn/

---

## 📄 License

MIT License - Free to use and modify

---

**Happy Coding! 🚀**
