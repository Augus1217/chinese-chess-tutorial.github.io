document.addEventListener('DOMContentLoaded', () => {
    const dropdownContainer = document.querySelector('.lang-dropdown-container');
    if (!dropdownContainer) {
        console.error('Language dropdown container not found!');
        return;
    }

    const langSelect = document.createElement('select');
    langSelect.classList.add('lang-select');
    langSelect.innerHTML = `
        <option value="zh">繁體中文</option>
        <option value="zh-cn">简体中文</option>
        <option value="en">English</option>
        <option value="vi">Tiếng Việt</option>
    `;
    dropdownContainer.appendChild(langSelect);

    const translationsCache = {};

    const loadLanguage = async (lang) => {
        try {
            let translations;
            if (translationsCache[lang]) {
                translations = translationsCache[lang];
            } else {
                const response = await fetch(`lang/${lang}.json`);
                if (!response.ok) {
                    console.error(`Could not load ${lang}.json`);
                    if (lang !== 'en') loadLanguage('en');
                    return;
                }
                translations = await response.json();
                translationsCache[lang] = translations;
            }

            document.querySelectorAll('[data-lang]').forEach(element => {
                const key = element.getAttribute('data-lang');
                if (translations[key]) {
                    element.innerHTML = translations[key];
                }
            });
            document.title = translations.pageTitle || 'Chinese Chess Tutorial';
            document.documentElement.lang = lang;

            // Update dropdown selection
            langSelect.value = lang;

        } catch (error) {
            console.error('Error loading language:', error);
        }
    };

    langSelect.addEventListener('change', (e) => {
        loadLanguage(e.target.value);
    });

    // Detect initial language
    const getInitialLang = () => {
        const urlParams = new URLSearchParams(window.location.search);
        const langFromUrl = urlParams.get('lang');
        const supportedLangs = ['zh', 'en', 'vi', 'zh-cn'];

        if (langFromUrl && supportedLangs.includes(langFromUrl)) {
            return langFromUrl;
        }

        const userLangFull = navigator.language.toLowerCase();
        if (supportedLangs.includes(userLangFull)) {
            return userLangFull;
        }

        const userLang = navigator.language.split('-')[0];
        if (supportedLangs.includes(userLang)) {
            return userLang;
        }
        
        return 'en'; // Default fallback
    };

    loadLanguage(getInitialLang());
});