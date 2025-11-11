// ===== Utility Functions =====
const Utils = (() => {
  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => document.querySelectorAll(selector);

  const createElement = (tag, className = '', content = '') => {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (content) el.innerHTML = content;
    return el;
  };

  const shuffleArray = (array) => [...array].sort(() => Math.random() - 0.5);

  const truncate = (str, len = 100) =>
    str.length > len ? str.slice(0, len) + '…' : str;

  const formatRating = (rating) => (rating ? rating.toFixed(1) : 'N/A');

  const formatDate = (date) =>
    new Date(date).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });

  const throttle = (func, limit = 200) => {
    let inThrottle;
    return function (...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  };

  const debounce = (func, delay = 300) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  };

  return {
    $, $$, createElement, shuffleArray, truncate,
    formatRating, formatDate, throttle, debounce,
  };
})();

window.Utils = Utils;
