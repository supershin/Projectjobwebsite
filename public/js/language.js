/**
 * Language Manager for Multi-language Support (Thai-English)
 */

class LanguageManager {
    constructor() {
        this.currentLang = this.getStoredLanguage() || 'th';
        this.init();
    }

    /**
     * Initialize language system
     */
    init() {
        this.updatePageLanguage();
        this.setupLanguageSwitcher();
        this.updateHtmlLang();
    }

    /**
     * Get stored language from localStorage
     */
    getStoredLanguage() {
        return localStorage.getItem('jobhub_lang');
    }

    /**
     * Store language preference
     */
    storeLanguage(lang) {
        localStorage.setItem('jobhub_lang', lang);
    }

    /**
     * Get current language
     */
    getCurrentLanguage() {
        return this.currentLang;
    }

    /**
     * Switch language
     */
    switchLanguage(lang) {
        if (lang === this.currentLang) return;
        
        this.currentLang = lang;
        this.storeLanguage(lang);
        this.updatePageLanguage();
        this.updateHtmlLang();
        this.updateLanguageSwitcher();
        
        // Trigger custom event for language change
        const event = new CustomEvent('languageChanged', { 
            detail: { language: lang } 
        });
        document.dispatchEvent(event);
    }

    /**
     * Update HTML lang attribute
     */
    updateHtmlLang() {
        document.documentElement.lang = this.currentLang;
    }

    /**
     * Update all text elements on page
     */
    updatePageLanguage() {
        const elements = document.querySelectorAll('[data-i18n]');
        
        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.translate(key);
            
            // Check if element has data-i18n-attr for attribute translation
            const attrName = element.getAttribute('data-i18n-attr');
            if (attrName) {
                element.setAttribute(attrName, translation);
            } else {
                // Default: update text content
                element.textContent = translation;
            }
        });
        
        // Update placeholders
        const placeholderElements = document.querySelectorAll('[data-i18n-placeholder]');
        placeholderElements.forEach(element => {
            const key = element.getAttribute('data-i18n-placeholder');
            element.placeholder = this.translate(key);
        });
        
        // Update titles
        const titleElements = document.querySelectorAll('[data-i18n-title]');
        titleElements.forEach(element => {
            const key = element.getAttribute('data-i18n-title');
            element.title = this.translate(key);
        });
    }

    /**
     * Translate a key
     */
    translate(key) {
        if (!translations[this.currentLang]) {
            console.warn(`Language '${this.currentLang}' not found`);
            return key;
        }
        
        return translations[this.currentLang][key] || key;
    }

    /**
     * Get translation (alias for translate)
     */
    t(key) {
        return this.translate(key);
    }

    /**
     * Setup language switcher buttons
     */
    setupLanguageSwitcher() {
        // Create language switcher if not exists
        this.createLanguageSwitcher();
        
        // Add click event listeners
        document.querySelectorAll('.lang-switcher').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const lang = btn.getAttribute('data-lang');
                this.switchLanguage(lang);
            });
        });
    }

    /**
     * Create language switcher element
     */
    createLanguageSwitcher() {
        const navbar = document.querySelector('.navbar-nav');
        if (!navbar) return;
        
        // Check if already exists
        if (document.querySelector('.language-switcher')) return;
        
        const switcherHtml = `
            <li class="nav-item dropdown language-switcher">
                <a class="nav-link dropdown-toggle" href="#" id="languageDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <i class="bi bi-globe"></i>
                    <span class="current-lang-text">${this.currentLang === 'th' ? 'ไทย' : 'EN'}</span>
                </a>
                <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="languageDropdown">
                    <li>
                        <a class="dropdown-item lang-switcher ${this.currentLang === 'th' ? 'active' : ''}" 
                           href="#" data-lang="th">
                            <i class="bi bi-check-circle-fill me-2"></i>
                            <span>ไทย (Thai)</span>
                        </a>
                    </li>
                    <li>
                        <a class="dropdown-item lang-switcher ${this.currentLang === 'en' ? 'active' : ''}" 
                           href="#" data-lang="en">
                            <i class="bi bi-check-circle-fill me-2"></i>
                            <span>English</span>
                        </a>
                    </li>
                </ul>
            </li>
        `;
        
        // Insert before login button
        const loginItem = navbar.querySelector('li:nth-last-child(2)');
        if (loginItem) {
            loginItem.insertAdjacentHTML('beforebegin', switcherHtml);
            this.setupLanguageSwitcher();
        }
    }

    /**
     * Update language switcher UI
     */
    updateLanguageSwitcher() {
        const currentLangText = document.querySelector('.current-lang-text');
        if (currentLangText) {
            currentLangText.textContent = this.currentLang === 'th' ? 'ไทย' : 'EN';
        }
        
        // Update active state
        document.querySelectorAll('.lang-switcher').forEach(btn => {
            const lang = btn.getAttribute('data-lang');
            if (lang === this.currentLang) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }

    /**
     * Translate dynamic content
     */
    translateElement(element, key) {
        const translation = this.translate(key);
        element.textContent = translation;
        return translation;
    }

    /**
     * Format number based on locale
     */
    formatNumber(number) {
        const locale = this.currentLang === 'th' ? 'th-TH' : 'en-US';
        return new Intl.NumberFormat(locale).format(number);
    }

    /**
     * Format currency based on locale
     */
    formatCurrency(amount, currency = 'THB') {
        const locale = this.currentLang === 'th' ? 'th-TH' : 'en-US';
        return new Intl.NumberFormat(locale, {
            style: 'currency',
            currency: currency
        }).format(amount);
    }

    /**
     * Format date based on locale
     */
    formatDate(date, options = {}) {
        const locale = this.currentLang === 'th' ? 'th-TH' : 'en-US';
        return new Intl.DateTimeFormat(locale, options).format(date);
    }
}

// Initialize language manager when DOM is ready
let langManager;

document.addEventListener('DOMContentLoaded', function() {
    langManager = new LanguageManager();
    
    // Make it globally accessible
    window.langManager = langManager;
    window.t = (key) => langManager.translate(key);
});

// Export for use in modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LanguageManager;
}
