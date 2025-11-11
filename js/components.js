// ===== UI Component System =====

const Components = (() => {
  // ========== Game Card ==========
  const GameCard = (game, options = {}) => {
    const card = Utils.createElement('div', 'game-card hover-lift fade-in');

    const img = Utils.createElement('img');
    img.src = game.coverImage || 'assets/images/placeholder.jpg';
    img.alt = game.title;
    card.appendChild(img);

    const info = Utils.createElement('div', 'game-card-info');
    const title = Utils.createElement('h3', 'game-card-title', game.title);
    const meta = Utils.createElement('div', 'game-card-meta');

    if (game.genre) meta.appendChild(Utils.createElement('span', 'game-card-genre', game.genre));
    if (game.platform) meta.appendChild(Utils.createElement('span', 'game-card-platform', game.platform));
    if (game.rating)
      meta.appendChild(Utils.createElement('span', 'game-card-rating', `⭐ ${Utils.formatRating(game.rating)}`));

    info.appendChild(title);
    info.appendChild(meta);
    card.appendChild(info);

    card.onclick = () => options.onClick?.(game);
    return card;
  };

  // ========== Carousel ==========
  const Carousel = (games, options = {}) => {
    const container = Utils.createElement('div', 'carousel');
    games.forEach((g) => container.appendChild(GameCard(g, options)));
    return container;
  };

  // ========== Modal ==========
  const Modal = (content, options = {}) => {
    const modal = Utils.createElement('div', 'game-modal show');
    const contentBox = Utils.createElement('div', 'modal-content modal-fade-in');
    const closeBtn = Utils.createElement('button', 'modal-close', '<i class="fas fa-times"></i>');

    closeBtn.onclick = () => {
      modal.remove();
      options.onClose?.();
    };

    contentBox.innerHTML = content;
    contentBox.appendChild(closeBtn);
    modal.appendChild(contentBox);
    modal.onclick = (e) => {
      if (e.target === modal) modal.remove();
    };

    document.body.appendChild(modal);
    return modal;
  };

  // ========== Notification ==========
  const Notification = (message, type = 'info') => {
    const n = Utils.createElement('div', `notification notification-${type} notification-slide`);
    n.innerHTML = `
      <i class="fas fa-${type === 'error' ? 'exclamation-circle' : type === 'success' ? 'check-circle' : 'info-circle'}"></i>
      <span>${message}</span>
    `;
    document.body.appendChild(n);
    setTimeout(() => n.remove(), 3000);
  };

  return { GameCard, Carousel, Modal, Notification };
})();

window.Components = Components;

