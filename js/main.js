// ===== Main Application Logic =====

// Global State
const AppState = {
    currentSection: 'home',
    searchQuery: '',
    selectedGame: null,
    userGames: [],
    myList: [],
    isLoading: false
};

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
    setupEventListeners();
    loadInitialData();
});

// Initialize App
function initializeApp() {
    // Load user preferences
    const userPreferences = Utils.storage.get('userPreferences') || {
        genres: ['RPG', 'Aventura'],
        platforms: ['PC', 'PlayStation 5']
    };
    Utils.storage.set('userPreferences', userPreferences);
    
    // Load user list
    AppState.myList = Utils.storage.get('myList') || [];
    
    console.log('GameTracker inicializado');
}

// Setup Event Listeners
function setupEventListeners() {
    // Navigation
    setupNavigationListeners();
    
    // Search
    setupSearchListeners();
    
    // Header scroll effect
    setupHeaderScrollEffect();
    
    // Keyboard shortcuts
    setupKeyboardShortcuts();
    
    // Responsive handling
    setupResponsiveHandling();
}

// Navigation Listeners
function setupNavigationListeners() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const section = link.dataset.section;
            navigateToSection(section);
        });
    });
}

function navigateToSection(section) {
    AppState.currentSection = section;
    
    // Update active nav link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    document.querySelector(`[data-section="${section}"]`).classList.add('active');
    
    // Load section content
    loadSectionContent(section);
    
    // Scroll to top
    Utils.scrollToTop();
}

// Search Listeners
function setupSearchListeners() {
    const searchBtn = document.getElementById('searchBtn');
    const searchModal = document.getElementById('searchModal');
    const closeSearch = document.getElementById('closeSearch');
    const searchInput = document.getElementById('searchInput');
    
    // Open search
    searchBtn.addEventListener('click', () => {
        searchModal.classList.add('show');
        searchInput.focus();
    });
    
    // Close search
    closeSearch.addEventListener('click', () => {
        searchModal.classList.remove('show');
        AppState.searchQuery = '';
        searchInput.value = '';
    });
    
    // Search input
    const debouncedSearch = Utils.debounce((query) => {
        AppState.searchQuery = query;
        performSearch(query);
    }, 300);
    
    searchInput.addEventListener('input', (e) => {
        debouncedSearch(e.target.value);
    });
    
    // Search filters
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.dataset.filter;
            updateSearchFilter(filter);
        });
    });
    
    // Search tabs
    const searchTabs = document.querySelectorAll('.search-tab');
    searchTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabType = tab.dataset.tab;
            updateSearchTab(tabType);
        });
    });
}

// Search Functions
async function performSearch(query) {
    if (query.length < 2) {
        updateSearchResults([]);
        return;
    }
    
    AppState.isLoading = true;
    showLoadingState();
    
    try {
        const games = await MockAPI.getGames({ search: query });
        const reviews = await MockAPI.getReviews({ search: query });
        
        updateSearchResults(games, reviews);
    } catch (error) {
        console.error('Search error:', error);
        Components.Notification('Error al buscar', 'error');
    } finally {
        AppState.isLoading = false;
        hideLoadingState();
    }
}

function updateSearchResults(games = [], reviews = []) {
    const resultsContainer = document.getElementById('searchResultsContent');
    const activeTab = document.querySelector('.search-tab.active').dataset.tab;
    
    if (activeTab === 'games') {
        resultsContainer.innerHTML = '';
        games.forEach(game => {
            const result = Components.SearchGameResult(game);
            resultsContainer.appendChild(result);
        });
    } else {
        resultsContainer.innerHTML = '';
        reviews.forEach(review => {
            const result = Components.SearchReviewResult(review);
            resultsContainer.appendChild(result);
        });
    }
    
    // Update tab counts
    document.querySelector('[data-tab="games"]').textContent = `Juegos (${games.length})`;
    document.querySelector('[data-tab="reviews"]').textContent = `Reseñas (${reviews.length})`;
}

function updateSearchFilter(filter) {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-filter="${filter}"]`).classList.add('active');
    
    // Re-perform search with filter
    if (AppState.searchQuery) {
        performFilteredSearch(filter);
    }
}

function updateSearchTab(tabType) {
    document.querySelectorAll('.search-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelector(`[data-tab="${tabType}"]`).classList.add('active');
}

async function performFilteredSearch(filter) {
    AppState.isLoading = true;
    showLoadingState();
    
    try {
        let searchOptions = { search: AppState.searchQuery };
        
        if (filter === 'completed') {
            searchOptions.completed = true;
        } else if (filter === 'rating') {
            searchOptions.rating = 4.0;
        } else if (filter === 'recent') {
            // Get games from last 30 days
            const thirtyDaysAgo = new Date();
            thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
            searchOptions.recent = true;
        } else if (filter !== 'all') {
            searchOptions.genre = filter;
        }
        
        const games = await MockAPI.getGames(searchOptions);
        updateSearchResults(games, []);
    } catch (error) {
        console.error('Filtered search error:', error);
        Components.Notification('Error al buscar', 'error');
    } finally {
        AppState.isLoading = false;
        hideLoadingState();
    }
}

// Header Scroll Effect
function setupHeaderScrollEffect() {
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const header = document.getElementById('header');
        
        if (scrollTop > lastScrollTop && scrollTop > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScrollTop = scrollTop;
    });
}

// Keyboard Shortcuts
function setupKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        // Escape to close modals
        if (e.key === 'Escape') {
            closeAllModals();
        }
        
        // Ctrl/Cmd + K for search
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            document.getElementById('searchBtn').click();
        }
        
        // Ctrl/Cmd + / for search
        if ((e.ctrlKey || e.metaKey) && e.key === '/') {
            e.preventDefault();
            document.getElementById('searchBtn').click();
        }
    });
}

// Section Content Loading
async function loadSectionContent(section) {
    AppState.isLoading = true;
    showLoadingState();
    
    try {
        let games = [];
        
        switch (section) {
            case 'home':
                // Load trending games for hero
                const trendingGames = RecommendationEngine.getTrendingGames();
                updateHeroSection(trendingGames[0]);
                
                // Load all sections
                games = await MockAPI.getGames();
                break;
                
            case 'trending':
                games = RecommendationEngine.getTrendingGames();
                break;
                
            case 'my-games':
                games = await MockAPI.getGames();
                break;
                
            case 'explore':
                games = await MockAPI.getGames();
                break;
                
            default:
                games = await MockAPI.getGames();
        }
        
        updateCarousels(games);
    } catch (error) {
        console.error('Error loading section:', error);
        Components.Notification('Error al cargar contenido', 'error');
    } finally {
        AppState.isLoading = false;
        hideLoadingState();
    }
}

// Update Hero Section
function updateHeroSection(game) {
    if (!game) return;
    
    const heroSection = document.getElementById('heroSection');
    const heroImage = heroSection.querySelector('.hero-image');
    const heroTitle = heroSection.querySelector('.hero-title');
    const heroDescription = heroSection.querySelector('.hero-description');
    const heroMeta = heroSection.querySelector('.hero-meta');
    
    if (heroImage) heroImage.src = game.coverImage;
    if (heroTitle) heroTitle.textContent = game.title;
    if (heroDescription) heroDescription.textContent = game.description;
    
    if (heroMeta) {
        heroMeta.innerHTML = `
            <span class="rating-badge excellent">${Utils.formatRating(game.rating)}</span>
            <span class="genre-badge">${game.genre}</span>
            <span class="platform-badge">${game.platform}</span>
            ${game.completed ? '<span class="completed-badge">Completado</span>' : ''}
        `;
    }
}

// Update Carousels
function updateCarousels(games) {
    const carousels = {
        trending: RecommendationEngine.getTrendingGames(),
        recommended: RecommendationEngine.getRecommendedGames(),
        new: RecommendationEngine.getNewGames(),
        action: RecommendationEngine.getActionGames(),
        rpg: RecommendationEngine.getRPGGames()
    };
    
    Object.keys(carousels).forEach(carouselId => {
        const carousel = document.getElementById(`${carouselId}Carousel`);
        if (carousel) {
            carousel.innerHTML = '';
            carousels[carouselId].forEach(game => {
                const card = Components.GameCard(game, {
                    onPlay: (game) => handlePlayGame(game),
                    onAddToList: (game) => handleAddToList(game),
                    onClick: (game) => handleGameClick(game)
                });
                carousel.appendChild(card);
            });
        }
    });
}

// Game Actions
function handlePlayGame(game) {
    Components.Notification(`Iniciando ${game.title}...`, 'success');
    // Here you would implement actual game launching
}

function handleAddToList(game) {
    const index = AppState.myList.findIndex(g => g.id === game.id);
    
    if (index === -1) {
        AppState.myList.push(game);
        Components.Notification(`${game.title} agregado a Mi Lista`, 'success');
    } else {
        AppState.myList.splice(index, 1);
        Components.Notification(`${game.title} eliminado de Mi Lista`, 'info');
    }
    
    Utils.storage.set('myList', AppState.myList);
}

function handleGameClick(game) {
    AppState.selectedGame = game;
    showGameModal(game);
}

// Modal Functions
function showGameModal(game) {
    const modalContent = createGameModalContent(game);
    Components.Modal(modalContent, {
        onClose: () => {
            AppState.selectedGame = null;
        }
    });
}

function createGameModalContent(game) {
    const content = Utils.createElement('div');
    
    const header = Utils.createElement('div', 'modal-header');
    const image = Utils.createElement('img', 'modal-game-image');
    image.src = game.coverImage || `https://via.placeholder.com/400x300/4CAF50/000000?text=${game.title}`;
    image.alt = game.title;
    header.appendChild(image);
    
    const body = Utils.createElement('div', 'modal-body');
    
    const info = Utils.createElement('div', 'modal-info');
    const title = Utils.createElement('h2', 'modal-title', game.title);
    const description = Utils.createElement('p', 'modal-description', game.description);
    
    const meta = Utils.createElement('div', 'modal-meta');
    meta.innerHTML = `
        <span class="rating-badge">${Utils.formatRating(game.rating)}</span>
        <span class="genre-badge">${game.genre}</span>
        <span class="platform-badge">${game.platform}</span>
    `;
    
    info.appendChild(title);
    info.appendChild(description);
    info.appendChild(meta);
    
    const actions = Utils.createElement('div', 'modal-actions');
    const playBtn = Utils.createElement('button', 'btn-play', '<i class="fas fa-play"></i> Reproducir');
    const addBtn = Utils.createElement('button', 'btn-add-list', '<i class="fas fa-plus"></i> Mi Lista');
    
    playBtn.onclick = () => handlePlayGame(game);
    addBtn.onclick = () => handleAddToList(game);
    
    actions.appendChild(playBtn);
    actions.appendChild(addBtn);
    
    const stats = Utils.createElement('div', 'modal-stats');
    stats.innerHTML = `
        <div class="stat-item">
            <i class="fas fa-clock"></i>
            <span>${Utils.formatHours(game.hoursPlayed)} horas jugadas</span>
        </div>
        <div class="stat-item">
            <i class="fas fa-star"></i>
            <span>${Utils.formatRating(game.rating)}</span>
        </div>
        <div class="stat-item">
            <i class="fas fa-gamepad"></i>
            <span>${game.genre}</span>
        </div>
        <div class="stat-item">
            <i class="fas fa-desktop"></i>
            <span>${game.platform}</span>
        </div>
    `;
    
    body.appendChild(info);
    body.appendChild(actions);
    body.appendChild(stats);
    
    content.appendChild(header);
    content.appendChild(body);
    
    return content;
}

// Loading States
function showLoadingState() {
    const loadingIndicator = Utils.createElement('div', 'loading-indicator');
    loadingIndicator.innerHTML = '<div class="loading-spinner"></div>';
    document.body.appendChild(loadingIndicator);
}

function hideLoadingState() {
    const loadingIndicator = document.querySelector('.loading-indicator');
    if (loadingIndicator) {
        loadingIndicator.remove();
    }
}

// Utility Functions
function closeAllModals() {
    document.querySelectorAll('.game-modal, .search-modal').forEach(modal => {
        modal.classList.remove('show');
    });
}

// Load Initial Data
async function loadInitialData() {
    try {
        // Load user games
        AppState.userGames = await MockAPI.getGames();
        
        // Load initial content
        loadSectionContent('home');
        
        console.log('Datos iniciales cargados');
    } catch (error) {
        console.error('Error loading initial data:', error);
    }
}

// Carousel Controls
function setupCarouselControls() {
    document.querySelectorAll('.carousel-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const carouselId = e.target.dataset.carousel;
            const carousel = document.getElementById(`${carouselId}Carousel`);
            const isPrev = e.target.classList.contains('prev-btn');
            
            if (isPrev) {
                carousel.scrollLeft -= 300;
            } else {
                carousel.scrollLeft += 300;
            }
        });
    });
}

// Responsive Handling
function setupResponsiveHandling() {
    // Add responsive classes based on screen size
    function updateResponsiveClasses() {
        const isMobile = Utils.isMobile();
        const isTablet = Utils.isTablet();
        
        document.body.classList.toggle('mobile', isMobile);
        document.body.classList.toggle('tablet', isTablet);
        document.body.classList.toggle('desktop', Utils.isDesktop());
    }
    
    updateResponsiveClasses();
    window.addEventListener('resize', Utils.throttle(updateResponsiveClasses, 250));
}

// Initialize carousel controls after DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(setupCarouselControls, 100);
});

console.log('GameTracker Netflix Style - Ready! 🎬🎮');