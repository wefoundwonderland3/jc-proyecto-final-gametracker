// ===== Main Application Logic =====
document.addEventListener('DOMContentLoaded', async () => {
  const state = {
    trending: [],
    recommended: [],
    newGames: [],
    byGenre: {},
  };

  // ===== Inicialización =====
  async function initializeApp() {
    try {
      const [trending, recommended, newGames, action, rpg] = await Promise.all([
        RecommendationEngine.getTrendingGames(),
        RecommendationEngine.getRecommendedGames(),
        RecommendationEngine.getNewGames(),
        RecommendationEngine.getByGenre('Acción'),
        RecommendationEngine.getByGenre('RPG'),
      ]);

      state.trending = trending;
      state.recommended = recommended;
      state.newGames = newGames;
      state.byGenre = { action, rpg };

      renderAll();
      setupHeaderScrollEffect();
      setupSearchModal();
    } catch (error) {
      handleError(error, 'Error al inicializar la aplicación');
    }
  }

  // ===== Render dinámico =====
  function renderAll() {
    renderCarousel('trendingCarousel', state.trending);
    renderCarousel('recommendedCarousel', state.recommended);
    renderCarousel('newCarousel', state.newGames);
    renderCarousel('actionCarousel', state.byGenre.action);
    renderCarousel('rpgCarousel', state.byGenre.rpg);
  }

  function renderCarousel(id, games) {
    const container = document.getElementById(id);
    container.innerHTML = '';
    container.appendChild(Components.Carousel(games, { onClick: openGameModal }));
  }

  // ===== Modal de juego =====
  function openGameModal(game) {
    const content = `
      <div class="modal-header">
        <img src="${game.coverImage}" alt="${game.title}" class="modal-game-image"/>
      </div>
      <div class="modal-body">
        <h2>${game.title}</h2>
        <p>${game.description}</p>
        <p><strong>Género:</strong> ${game.genre} | <strong>Plataforma:</strong> ${game.platform}</p>
        <p><strong>Rating:</strong> ⭐ ${Utils.formatRating(game.rating)}</p>
        <div class="modal-actions">
          <button class="btn btn-play">Jugar</button>
          <button class="btn btn-add-list">Agregar a lista</button>
        </div>
      </div>
    `;
    Components.Modal(content);
  }

  // ===== Header Scroll =====
  function setupHeaderScrollEffect() {
    const header = document.getElementById('header');
    window.addEventListener('scroll', Utils.throttle(() => {
      if (window.scrollY > 50) header.classList.add('scrolled');
      else header.classList.remove('scrolled');
    }, 100));
  }

  // ===== Search =====
  function setupSearchModal() {
    const searchBtn = Utils.$('#searchBtn');
    const searchModal = Utils.$('#searchModal');
    const closeBtn = Utils.$('#closeSearch');

    searchBtn.onclick = () => searchModal.classList.add('show');
    closeBtn.onclick = () => searchModal.classList.remove('show');
  }

  // ===== Error Handler =====
  function handleError(error, message) {
    console.error(message, error);
    Components.Notification(message, 'error');
  }

  // Inicializa la app
  await initializeApp();
});
