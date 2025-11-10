// ===== Component System =====

// Game Card Component
const GameCard = (game, options = {}) => {
    const card = Utils.createElement('div', 'game-card');
    
    const imageContainer = Utils.createElement('div', 'game-card-image');
    if (game.coverImage) {
        const img = Utils.createElement('img');
        img.src = game.coverImage;
        img.alt = game.title;
        img.className = 'game-card-image';
        imageContainer.appendChild(img);
    } else {
        const placeholder = Utils.createElement('div', 'game-card-placeholder');
        placeholder.innerHTML = `<i class="fas fa-gamepad"></i><br>${game.title}`;
        imageContainer.appendChild(placeholder);
    }
    
    const info = Utils.createElement('div', 'game-card-info');
    
    const title = Utils.createElement('h3', 'game-card-title', game.title);
    info.appendChild(title);
    
    const meta = Utils.createElement('div', 'game-card-meta');
    
    if (game.genre) {
        const genreBadge = Utils.createElement('span', 'game-card-genre', game.genre);
        meta.appendChild(genreBadge);
    }
    
    if (game.platform) {
        const platformBadge = Utils.createElement('span', 'game-card-platform', game.platform);
        meta.appendChild(platformBadge);
    }
    
    if (game.rating) {
        const rating = Utils.createElement('div', 'game-card-rating');
        rating.innerHTML = `<i class="fas fa-star"></i> ${Utils.formatRating(game.rating)}`;
        meta.appendChild(rating);
    }
    
    if (game.completed) {
        const completedBadge = Utils.createElement('span', 'game-card-completed', '✓ Completado');
        meta.appendChild(completedBadge);
    }
    
    info.appendChild(meta);
    
    const actions = Utils.createElement('div', 'game-card-actions');
    
    const playBtn = Utils.createElement('button', 'game-card-action-btn', '<i class="fas fa-play"></i> Reproducir');
    playBtn.onclick = () => {
        if (options.onPlay) options.onPlay(game);
    };
    
    const addBtn = Utils.createElement('button', 'game-card-action-btn', '<i class="fas fa-plus"></i> Mi Lista');
    addBtn.onclick = () => {
        if (options.onAddToList) options.onAddToList(game);
    };
    
    actions.appendChild(playBtn);
    actions.appendChild(addBtn);
    
    card.appendChild(imageContainer);
    card.appendChild(info);
    card.appendChild(actions);
    
    card.onclick = () => {
        if (options.onClick) options.onClick(game);
    };
    
    return card;
};

// Carousel Component
const Carousel = (games, options = {}) => {
    const container = Utils.createElement('div', 'carousel');
    
    games.forEach(game => {
        const card = GameCard(game, options);
        container.appendChild(card);
    });
    
    return container;
};

// Search Results Component
const SearchResults = (results, type = 'games') => {
    const container = Utils.createElement('div', 'search-results-content');
    
    if (results.length === 0) {
        const emptyState = Utils.createElement('div', 'empty-state');
        emptyState.innerHTML = `
            <i class="fas fa-search"></i>
            <h3>No se encontraron ${type === 'games' ? 'juegos' : 'reseñas'}</h3>
            <p>Intenta con otros términos de búsqueda</p>
        `;
        container.appendChild(emptyState);
    } else {
        results.forEach(item => {
            const element = type === 'games' ? 
                SearchGameResult(item) : 
                SearchReviewResult(item);
            container.appendChild(element);
        });
    }
    
    return container;
};

const SearchGameResult = (game) => {
    const result = Utils.createElement('div', 'search-result-item');
    
    const image = Utils.createElement('img', 'search-result-image');
    image.src = game.coverImage || `https://via.placeholder.com/100x150/4CAF50/000000?text=${game.title}`;
    image.alt = game.title;
    
    const info = Utils.createElement('div', 'search-result-info');
    
    const title = Utils.createElement('h4', 'search-result-title', game.title);
    const description = Utils.createElement('p', 'search-result-description', 
        Utils.truncate(game.description || 'Sin descripción', 100)
    );
    
    const meta = Utils.createElement('div', 'search-result-meta');
    
    if (game.genre) {
        const genre = Utils.createElement('span', 'search-result-genre', game.genre);
        meta.appendChild(genre);
    }
    
    if (game.rating) {
        const rating = Utils.createElement('span', 'search-result-rating', 
            `<i class="fas fa-star"></i> ${Utils.formatRating(game.rating)}`
        );
        meta.appendChild(rating);
    }
    
    info.appendChild(title);
    info.appendChild(description);
    info.appendChild(meta);
    
    const actions = Utils.createElement('div', 'search-result-actions');
    
    const playBtn = Utils.createElement('button', 'search-result-btn', '<i class="fas fa-play"></i>');
    const addBtn = Utils.createElement('button', 'search-result-btn', '<i class="fas fa-plus"></i>');
    
    actions.appendChild(playBtn);
    actions.appendChild(addBtn);
    
    result.appendChild(image);
    result.appendChild(info);
    result.appendChild(actions);
    
    return result;
};

const SearchReviewResult = (review) => {
    const result = Utils.createElement('div', 'search-result-item');
    
    const avatar = Utils.createElement('div', 'search-result-avatar');
    avatar.textContent = Utils.capitalize(review.user?.name || review.user?.email || 'User');
    
    const info = Utils.createElement('div', 'search-result-info');
    
    const title = Utils.createElement('h4', 'search-result-title', review.title);
    const content = Utils.createElement('p', 'search-result-description', 
        Utils.truncate(review.content, 150)
    );
    
    const meta = Utils.createElement('div', 'search-result-meta');
    
    const rating = Utils.createElement('span', 'search-result-rating', 
        `<i class="fas fa-star"></i> ${review.rating}`
    );
    const author = Utils.createElement('span', 'search-result-author', review.user?.name || review.user?.email);
    const date = Utils.createElement('span', 'search-result-date', Utils.formatDate(review.createdAt));
    
    meta.appendChild(rating);
    meta.appendChild(author);
    meta.appendChild(date);
    
    info.appendChild(title);
    info.appendChild(content);
    info.appendChild(meta);
    
    result.appendChild(avatar);
    result.appendChild(info);
    
    return result;
};

// Loading Component
const LoadingSpinner = (text = 'Cargando...') => {
    const container = Utils.createElement('div', 'loading-container');
    
    const spinner = Utils.createElement('div', 'loading-spinner');
    const text = Utils.createElement('div', 'loading-text', text);
    
    container.appendChild(spinner);
    container.appendChild(text);
    
    return container;
};

// Notification Component
const Notification = (message, type = 'info') => {
    const notification = Utils.createElement('div', `notification notification-${type}`);
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
};

// Modal Component
const Modal = (content, options = {}) => {
    const modal = Utils.createElement('div', 'game-modal show');
    
    const modalContent = Utils.createElement('div', 'modal-content');
    modalContent.appendChild(content);
    
    const closeBtn = Utils.createElement('button', 'modal-close', '<i class="fas fa-times"></i>');
    closeBtn.onclick = () => {
        modal.remove();
        if (options.onClose) options.onClose();
    };
    
    modalContent.appendChild(closeBtn);
    modal.appendChild(modalContent);
    
    // Close on background click
    modal.onclick = (e) => {
        if (e.target === modal) {
            modal.remove();
            if (options.onClose) options.onClose();
        }
    };
    
    document.body.appendChild(modal);
    
    return modal;
};

// Export components
window.Components = {
    GameCard,
    Carousel,
    SearchResults,
    SearchGameResult,
    SearchReviewResult,
    LoadingSpinner,
    Notification,
    Modal
};