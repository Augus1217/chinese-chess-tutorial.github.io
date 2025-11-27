# Chinese Chess Tutorial - AI Agent Instructions

## Project Overview
This is a static web project providing a tutorial for Chinese Chess (Xiangqi). It uses vanilla HTML, CSS, and JavaScript with a custom client-side internationalization (i18n) system.

## Architecture & Key Components
- **Frontend**: Pure HTML/CSS/JS. No build step or framework.
- **Internationalization (i18n)**:
  - **Logic**: `script.js` handles language detection, fetching JSON translation files, and updating the DOM.
  - **Data**: Translations are stored in `lang/*.json` (e.g., `zh.json`, `en.json`, `vi.json`).
  - **Binding**: HTML elements use the `data-lang` attribute to bind to translation keys.

## Development Workflows
- **Running**: Open `index.html` directly in a browser or use a simple local server (e.g., Live Server).
- **Testing Languages**:
  - The app detects language from the URL parameter `lang` (e.g., `index.html?lang=vi`) or the browser's default.
  - Use the dropdown in the top bar to switch languages dynamically.

## Coding Conventions & Patterns

### Internationalization (i18n)
When adding new text content:
1.  **HTML**: Create the element with a unique `data-lang` attribute. Leave the inner HTML empty.
    ```html
    <!-- Example -->
    <h2 data-lang="newSectionTitle"></h2>
    ```
2.  **JSON**: Add the key-value pair to **ALL** files in `lang/` (`en.json`, `zh.json`, `vi.json`).
    ```json
    // lang/en.json
    {
      "newSectionTitle": "New Section"
    }
    ```
3.  **Dynamic Content**: If content needs to be set dynamically via JS, ensure it goes through the translation logic or uses the `translationsCache` if accessible.

### Adding a New Language
1.  Create a new JSON file in `lang/` (e.g., `ja.json`).
2.  Update `script.js` to include the new option in the `langSelect` creation block.
    ```javascript
    // script.js
    langSelect.innerHTML = `
        <option value="zh">繁體中文</option>
        <option value="en">English</option>
        <option value="vi">Tiếng Việt</option>
        <option value="ja">日本語</option> <!-- Add this -->
    `;
    ```
3.  Update `getInitialLang` in `script.js` to include the new language code in `supportedLangs`.

### Asset Management
- **Images**: Store general assets in `images/` and move-specific diagrams in `images/move/`.
- **Naming**: Use consistent naming (e.g., `r_k.png` for Red King, `b_k.png` for Black King).

## Common Tasks
- **Fixing Typos**: Update the relevant `lang/*.json` files, not the HTML.
- **Styling**: Edit `style.css`. The layout is responsive and uses a container-based approach.
