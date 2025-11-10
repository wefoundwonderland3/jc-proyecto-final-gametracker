// ===== Mock API Data =====

// Sample Games Data
const sampleGames = [
    {
        id: 1,
        title: 'The Legend of Zelda: Tears of the Kingdom',
        description: 'Una aventura épica en el mundo de Hyrule con nuevas habilidades mecánicas y un mundo abierto sin precedentes.',
        genre: 'Aventura',
        platform: 'Nintendo Switch',
        coverImage: 'https://via.placeholder.com/400x600/4CAF50/000000?text=Zelda+TOTK',
        completed: true,
        rating: 5,
        hoursPlayed: 145.5,
        userId: 'user-1',
        createdAt: '2024-01-15',
        updatedAt: '2024-01-20'
    },
    {
        id: 2,
        title: 'Elden Ring',
        description: 'Un RPG de acción de mundo abierto creado por FromSoftware. Explora un mundo vasto lleno de desafíos.',
        genre: 'RPG',
        platform: 'PlayStation 5',
        coverImage: 'https://via.placeholder.com/400x600/FF9800/000000?text=Elden+Ring',
        completed: false,
        rating: 4,
        hoursPlayed: 78.2,
        userId: 'user-1',
        createdAt: '2024-02-10',
        updatedAt: '2024-02-15'
    },
    {
        id: 3,
        title: 'God of War Ragnarök',
        description: 'La continuación de la saga de God of War en la mitología nórdica. Una experiencia cinematográfica inolvidable.',
        genre: 'Acción',
        platform: 'PlayStation 5',
        coverImage: 'https://via.placeholder.com/400x600/2196F3/000000?text=God+of+War',
        completed: true,
        rating: 5,
        hoursPlayed: 42.8,
        userId: 'user-1',
        createdAt: '2024-03-05',
        updatedAt: '2024-03-10'
    },
    {
        id: 4,
        title: 'Hogwarts Legacy',
        description: 'Explora el mundo mágico de Hogwarts en el siglo XIX. Conviértete en el estudiante que siempre soñaste ser.',
        genre: 'RPG',
        platform: 'PC',
        coverImage: 'https://via.placeholder.com/400x600/9C27B0/000000?text=Hogwarts',
        completed: false,
        rating: 3,
        hoursPlayed: 25.0,
        userId: 'user-1',
        createdAt: '2024-04-20',
        updatedAt: '2024-04-25'
    },
    {
        id: 5,
        title: 'Street Fighter 6',
        description: 'La última entrega de la serie de lucha clásica de Capcom. Nuevos personajes y mecánicas revolucionarias.',
        genre: 'Lucha',
        platform: 'PC',
        coverImage: 'https://via.placeholder.com/400x600/F44336/000000?text=SF6',
        completed: false,
        rating: 4,
        hoursPlayed: 15.3,
        userId: 'user-1',
        createdAt: '2024-05-10',
        updatedAt: '2024-05-15'
    },
    {
        id: 6,
        title: 'Baldur\'s Gate 3',
        description: 'La tercera entrega de la aclamada saga de RPG. Una aventura épica con decisiones que importan.',
        genre: 'RPG',
        platform: 'PC',
        coverImage: 'https://via.placeholder.com/400x600/8B5CF6/000000?text=Baldurs+Gate+3',
        completed: false,
        rating: 5,
        hoursPlayed: 89.7,
        userId: 'user-1',
        createdAt: '2024-06-01',
        updatedAt: '2024-06-05'
    },
    {
        id: 7,
        title: 'Marvel\'s Spider-Man 2',
        description: 'Swing a través de la ciudad de Nueva York como Spider-Man. Más acción, más historia, más Peter.',
        genre: 'Acción',
        platform: 'PlayStation 5',
        coverImage: 'https://via.placeholder.com/400x600/DC2626/000000?text=Spider-Man+2',
        completed: true,
        rating: 4,
        hoursPlayed: 56.2,
        userId: 'user-1',
        createdAt: '2024-07-15',
        updatedAt: '2024-07-20'
    },
    {
        id: 8,
        title: 'Diablo IV',
        description: 'El retorno del señor de la oscuridad. Un RPG de acción con combate visceral y personalización profunda.',
        genre: 'RPG',
        platform: 'PC',
        coverImage: 'https://via.placeholder.com/400x600/991B1B/000000?text=Diablo+IV',
        completed: false,
        rating: 4,
        hoursPlayed: 67.8,
        userId: 'user-1',
        createdAt: '2024-08-10',
        updatedAt: '2024-08-15'
    }
];

// Sample Reviews Data
const sampleReviews = [
    {
        id: 1,
        title: 'Una obra maestra absoluta',
        content: 'Tears of the Kingdom es simplemente increíble. La libertad que te dan las nuevas habilidades de Ultramano es sin precedentes. Cada puzzle tiene múltiples soluciones y el mundo está lleno de secretos. Gráficos impresionantes y una banda sonora memorable.',
        rating: 5,
        gameId: 1,
        userId: 'user-1',
        user: {
            id: 'user-1',
            name: 'Gamer Demo',
            email: 'user@example.com'
        },
        createdAt: '2024-01-20',
        updatedAt: '2024-01-20'
    },
    {
        id: 2,
        title: 'Desafío y recompensa',
        content: 'Elden Ring es difícil pero justo. Cada victoria se siente ganada. El mundo abierto es espectacular y lleno de enemigos épicos. La historia es un poco críptica pero eso es parte del encanto de FromSoftware.',
        rating: 4,
        gameId: 2,
        userId: 'user-1',
        user: {
            id: 'user-1',
            name: 'Gamer Demo',
            email: 'user@example.com'
        },
        createdAt: '2024-02-15',
        updatedAt: '2024-02-15'
    },
    {
        id: 3,
        title: 'Un final épico para la saga nórdica',
        content: 'God of War Ragnarök mejora en todo a su predecesor. Los gráficos son los mejores que he visto en PS5, el combate es fluido y la historia emocionante. Kratos y Atreus tienen un desarrollo increíble.',
        rating: 5,
        gameId: 3,
        userId: 'user-1',
        user: {
            id: 'user-1',
            name: 'Gamer Demo',
            email: 'user@example.com'
        },
        createdAt: '2024-03-10',
        updatedAt: '2024-03-10'
    }
];

// Mock API Functions
const MockAPI = {
    // Games API
    getGames: async (filters = {}) => {
        await new Promise(resolve => setTimeout(resolve, 300));
        
        let filteredGames = [...sampleGames];
        
        if (filters.genre) {
            filteredGames = filteredGames.filter(game => 
                game.genre.toLowerCase().includes(filters.genre.toLowerCase())
            );
        }
        
        if (filters.platform) {
            filteredGames = filteredGames.filter(game => 
                game.platform.toLowerCase().includes(filters.platform.toLowerCase())
            );
        }
        
        if (filters.completed !== undefined) {
            filteredGames = filteredGames.filter(game => game.completed === filters.completed);
        }
        
        if (filters.rating) {
            filteredGames = filteredGames.filter(game => 
                game.rating >= filters.rating
            );
        }
        
        if (filters.search) {
            const search = filters.search.toLowerCase();
            filteredGames = filteredGames.filter(game => 
                game.title.toLowerCase().includes(search) ||
                game.description.toLowerCase().includes(search) ||
                game.genre.toLowerCase().includes(search)
            );
        }
        
        return filteredGames;
    },
    
    getGameById: async (id) => {
        await new Promise(resolve => setTimeout(resolve, 200));
        return sampleGames.find(game => game.id === parseInt(id));
    },
    
    createGame: async (gameData) => {
        await new Promise(resolve => setTimeout(resolve, 500));
        const newGame = {
            id: sampleGames.length + 1,
            ...gameData,
            userId: 'user-1',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        sampleGames.push(newGame);
        return newGame;
    },
    
    updateGame: async (id, gameData) => {
        await new Promise(resolve => setTimeout(resolve, 400));
        const gameIndex = sampleGames.findIndex(game => game.id === parseInt(id));
        if (gameIndex !== -1) {
            sampleGames[gameIndex] = { ...sampleGames[gameIndex], ...gameData, updatedAt: new Date().toISOString() };
            return sampleGames[gameIndex];
        }
        return null;
    },
    
    deleteGame: async (id) => {
        await new Promise(resolve => setTimeout(resolve, 300));
        const gameIndex = sampleGames.findIndex(game => game.id === parseInt(id));
        if (gameIndex !== -1) {
            const deletedGame = sampleGames[gameIndex];
            sampleGames.splice(gameIndex, 1);
            return deletedGame;
        }
        return null;
    },
    
    // Reviews API
    getReviews: async (filters = {}) => {
        await new Promise(resolve => setTimeout(resolve, 300));
        
        let filteredReviews = [...sampleReviews];
        
        if (filters.gameId) {
            filteredReviews = filteredReviews.filter(review => 
                review.gameId === parseInt(filters.gameId)
            );
        }
        
        if (filters.userId) {
            filteredReviews = filteredReviews.filter(review => 
                review.userId === filters.userId
            );
        }
        
        if (filters.search) {
            const search = filters.search.toLowerCase();
            filteredReviews = filteredReviews.filter(review => 
                review.title.toLowerCase().includes(search) ||
                review.content.toLowerCase().includes(search)
            );
        }
        
        return filteredReviews;
    },
    
    createReview: async (reviewData) => {
        await new Promise(resolve => setTimeout(resolve, 400));
        const newReview = {
            id: sampleReviews.length + 1,
            ...reviewData,
            user: {
                id: 'user-1',
                name: 'Gamer Demo',
                email: 'user@example.com'
            },
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        sampleReviews.push(newReview);
        return newReview;
    },
    
    updateReview: async (id, reviewData) => {
        await new Promise(resolve => setTimeout(resolve, 300));
        const reviewIndex = sampleReviews.findIndex(review => review.id === parseInt(id));
        if (reviewIndex !== -1) {
            sampleReviews[reviewIndex] = { ...sampleReviews[reviewIndex], ...reviewData, updatedAt: new Date().toISOString() };
            return sampleReviews[reviewIndex];
        }
        return null;
    },
    
    deleteReview: async (id) => {
        await new Promise(resolve => setTimeout(resolve, 250));
        const reviewIndex = sampleReviews.findIndex(review => review.id === parseInt(id));
        if (reviewIndex !== -1) {
            const deletedReview = sampleReviews[reviewIndex];
            sampleReviews.splice(reviewIndex, 1);
            return deletedReview;
        }
        return null;
    }
};

// Recommendation Engine
const RecommendationEngine = {
    getTrendingGames: () => {
        return MockAPI.getGames()
            .filter(game => game.rating >= 4.0)
            .sort((a, b) => b.rating - a.rating)
            .slice(0, 6);
    },
    
    getRecommendedGames: () => {
        // Simple recommendation based on user preferences
        const userPreferences = Utils.storage.get('userPreferences') || { genres: ['RPG', 'Aventura'] };
        
        return MockAPI.getGames()
            .filter(game => userPreferences.genres.includes(game.genre))
            .sort((a, b) => b.rating - a.rating)
            .slice(0, 8);
    },
    
    getNewGames: () => {
        return MockAPI.getGames()
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .slice(0, 6);
    },
    
    getGamesByGenre: (genre) => {
        return MockAPI.getGames({ genre });
    },
    
    getCompletedGames: () => {
        return MockAPI.getGames({ completed: true });
    },
    
    getActionGames: () => {
        return MockAPI.getGames({ genre: 'Acción' });
    },
    
    getRPGGames: () => {
        return MockAPI.getGames({ genre: 'RPG' });
    }
};

// Export API
window.MockAPI = MockAPI;
window.RecommendationEngine = RecommendationEngine;