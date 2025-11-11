// ===== Mock Game Data API =====

// Datos base (mock)
const sampleGames = Object.freeze([
  {
    id: 1,
    title: 'CyberRacer 2077',
    genre: 'Acción',
    platform: 'PC',
    rating: 4.6,
    completed: false,
    hoursPlayed: 22.4,
    description: 'Una experiencia futurista de carreras cibernéticas.',
    coverImage: 'assets/images/cyberracer.jpg',
    createdAt: '2025-08-15',
  },
  {
    id: 2,
    title: 'Fantasy Quest',
    genre: 'RPG',
    platform: 'PS5',
    rating: 4.9,
    completed: true,
    hoursPlayed: 54.2,
    description: 'Explora reinos místicos y derrota dragones legendarios.',
    coverImage: 'assets/images/fantasyquest.jpg',
    createdAt: '2025-07-28',
  },
  {
    id: 3,
    title: 'Zombie Blast',
    genre: 'Acción',
    platform: 'Xbox',
    rating: 3.9,
    completed: false,
    hoursPlayed: 8.5,
    description: 'Sobrevive a hordas de zombis en una ciudad devastada.',
    coverImage: 'assets/images/zombieblast.jpg',
    createdAt: '2025-09-10',
  },
]);

// Simula retardo de red
const simulateDelay = (ms = 400) =>
  new Promise((resolve) => setTimeout(resolve, ms));

// ===== MockAPI =====
const MockAPI = {
  async getGames(filters = {}) {
    await simulateDelay();
    let games = [...sampleGames];

    if (filters.genre)
      games = games.filter((g) => g.genre === filters.genre);
    if (filters.platform)
      games = games.filter((g) => g.platform === filters.platform);
    if (filters.completed !== undefined)
      games = games.filter((g) => g.completed === filters.completed);
    if (filters.minRating)
      games = games.filter((g) => g.rating >= filters.minRating);

    if (filters.search) {
      const term = filters.search.toLowerCase();
      games = games.filter((g) => g.title.toLowerCase().includes(term));
    }

    return games;
  },

  async getGameById(id) {
    await simulateDelay(200);
    return sampleGames.find((g) => g.id === id) || null;
  },

  async getReviewsForGame(id) {
    await simulateDelay(300);
    return [
      {
        id: 1,
        user: { name: 'Ana' },
        rating: 5,
        title: 'Excelente experiencia',
        content: 'La historia y los gráficos son impresionantes.',
        createdAt: '2025-10-02',
      },
    ];
  },
};

// ===== Recommendation Engine =====
const RecommendationEngine = {
  async getTrendingGames() {
    const games = await MockAPI.getGames();
    return games.filter((g) => g.rating >= 4).slice(0, 5);
  },

  async getRecommendedGames() {
    const games = await MockAPI.getGames();
    return Utils.shuffleArray(games).slice(0, 5);
  },

  async getNewGames() {
    const games = await MockAPI.getGames();
    return games
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 5);
  },

  async getByGenre(genre) {
    return await MockAPI.getGames({ genre });
  },
};

// Export global
window.MockAPI = MockAPI;
window.RecommendationEngine = RecommendationEngine;
