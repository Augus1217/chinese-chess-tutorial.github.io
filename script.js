document.addEventListener('DOMContentLoaded', () => {
    const langSelectorContainer = document.createElement('div');
    langSelectorContainer.classList.add('lang-selector-container');
    document.body.insertBefore(langSelectorContainer, document.body.firstChild);

    const langSelector = document.createElement('div');
    langSelector.classList.add('lang-selector');
    langSelector.innerHTML = `
        <button data-lang-switch="zh">繁體中文</button>
        <button data-lang-switch="en">English</button>
        <button data-lang-switch="vi">Tiếng Việt</button>
    `;
    langSelectorContainer.appendChild(langSelector);

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
                    // Fallback to English if the language file is not found
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

            // Update button states
            document.querySelectorAll('[data-lang-switch]').forEach(btn => {
                btn.classList.toggle('active', btn.getAttribute('data-lang-switch') === lang);
            });

        } catch (error) {
            console.error('Error loading language:', error);
        }
    };

    langSelector.addEventListener('click', (e) => {
        if (e.target.matches('[data-lang-switch]')) {
            const lang = e.target.getAttribute('data-lang-switch');
            loadLanguage(lang);
        }
    });

    // Detect initial language
    const getInitialLang = () => {
        const userLang = navigator.language.split('-')[0];
        const supportedLangs = ['zh', 'en', 'vi'];
        return supportedLangs.includes(userLang) ? userLang : 'en';
    };

    loadLanguage(getInitialLang());
});
