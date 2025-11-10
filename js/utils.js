// ===== Utility Functions =====

// DOM Utilities
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

const createElement = (tag, className = '', content = '') => {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (content) element.textContent = content;
    return element;
};

// Array Utilities
const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
};

const groupBy = (array, key) => {
    return array.reduce((groups, item) => {
        const group = groups[item[key]] || [];
        group.push(item);
        groups[item[key]] = group;
        return groups;
    }, {});
};

const sortBy = (array, key, direction = 'asc') => {
    return [...array].sort((a, b) => {
        if (direction === 'asc') {
            return a[key] > b[key] ? 1 : -1;
        } else {
            return a[key] < b[key] ? 1 : -1;
        }
    });
};

// String Utilities
const truncate = (str, maxLength) => {
    if (str.length <= maxLength) return str;
    return str.slice(0, maxLength) + '...';
};

const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

const slugify = (str) => {
    return str
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
};

// Number Utilities
const formatHours = (hours) => {
    return hours.toFixed(1);
};

const formatRating = (rating) => {
    return rating ? rating.toFixed(1) : 'N/A';
};

const getPercentage = (part, total) => {
    return total > 0 ? Math.round((part / total) * 100) : 0;
};

// Date Utilities
const formatDate = (date) => {
    return new Date(date).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};

const getRelativeTime = (date) => {
    const now = new Date();
    const past = new Date(date);
    const diffMs = now - past;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Hoy';
    if (diffDays === 1) return 'Ayer';
    if (diffDays < 7) return `Hace ${diffDays} días`;
    if (diffDays < 30) return `Hace ${Math.floor(diffDays / 7)} semanas`;
    return `Hace ${Math.floor(diffDays / 30)} meses`;
};

// Color Utilities
const getRatingColor = (rating) => {
    if (!rating) return '#666666';
    if (rating >= 4.5) return '#22c55e';
    if (rating >= 3.5) return '#facc15';
    if (rating >= 2.5) return '#f59e0b';
    return '#ef4444';
};

const getGenreColor = (genre) => {
    const colors = {
        'Acción': '#ef4444',
        'RPG': '#3b82f6',
        'Aventura': '#22c55e',
        'Deportes': '#f97316',
        'Estrategia': '#8b5cf6',
        'Simulación': '#ec4899'
    };
    return colors[genre] || '#666666';
};

// Storage Utilities
const storage = {
    get: (key) => {
        try {
            return JSON.parse(localStorage.getItem(key));
        } catch {
            return null;
        }
    },
    set: (key, value) => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error('Error saving to localStorage:', error);
        }
    },
    remove: (key) => {
        try {
            localStorage.removeItem(key);
        } catch (error) {
            console.error('Error removing from localStorage:', error);
        }
    }
};

// Event Utilities
const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

const throttle = (func, limit) => {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
};

// Validation Utilities
const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};

const validateRating = (rating) => {
    return rating >= 1 && rating <= 5;
};

const validateHours = (hours) => {
    return hours >= 0 && hours <= 10000;
};

// Device Detection
const isMobile = () => {
    return window.innerWidth <= 768;
};

const isTablet = () => {
    return window.innerWidth > 768 && window.innerWidth <= 1024;
};

const isDesktop = () => {
    return window.innerWidth > 1024;
};

// Scroll Utilities
const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

const scrollToElement = (element) => {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

// Export all utilities
window.Utils = {
    $, $$,
    createElement,
    shuffleArray,
    groupBy,
    sortBy,
    truncate,
    capitalize,
    slugify,
    formatHours,
    formatRating,
    getPercentage,
    formatDate,
    getRelativeTime,
    getRatingColor,
    getGenreColor,
    storage,
    debounce,
    throttle,
    validateEmail,
    validateRating,
    validateHours,
    isMobile,
    isTablet,
    isDesktop,
    scrollToTop,
    scrollToElement
};