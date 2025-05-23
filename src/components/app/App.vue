<template>
    <div class="app font-monospace">
        <div class="content">
            <AppInfo :allMoviesCount="movies.length"
                     :favoriteMoviesCount="movies.filter(movie => movie.favorite).length"/>
            <div class="search-panel">
                <SearchPanel />
                <AppFilter />
            </div>
            <MovieList :movies="movies" @onLike="onLikeHandler" @onDelete="onDeleteHandler"/>
            <MovieAddForm @createMovie="createMovie"/>
        </div>
    </div>
</template>

<script>
import AppInfo from '@/components/app-info/AppInfo.vue';
import SearchPanel from '@/components/search-panel/SearchPanel.vue';
import AppFilter from '@/components/app-filter/AppFilter.vue';
import MovieList from '@/components/movie-list/MovieList.vue';
import MovieAddForm from '@/components/movie-add-form/MovieAddForm.vue';

export default {
    components: {
        AppInfo,
        SearchPanel,
        AppFilter,
        MovieList,
        MovieAddForm,
    },
    data() {
        return {
            movies: [
                {
                    id: 1,
                    name: 'Omar',
                    view: 811,
                    favorite: false,
                    like: true,
                },
                {
                    id: 2,
                    name: 'Empire of Osman',
                    view: 711,
                    favorite: false,
                    like: true,
                },
                {
                    id: 3,
                    name: 'Sky Fall',
                    view: 611,
                    favorite: true,
                    like: true,
                },
            ],
        };
    },
    methods: {
        createMovie(item) {
            // Unikal ID generatsiya qilish
            const maxId = this.movies.length > 0 ? Math.max(...this.movies.map(movie => movie.id)) : 0;
            const newMovie = {
                ...item,
                id: maxId + 1, // Yangi unikal ID
                favorite: item.favorite || false, // Agar favorite berilmagan bo'lsa, false
                like: item.like || false, // Agar like berilmagan bo'lsa, false
                view: item.view || 0, // Agar view berilmagan bo'lsa, 0
            };
            this.movies.push(newMovie);
            console.log('Added movie:', newMovie);
            console.log('Updated movies:', this.movies);
        },
        onLikeHandler(id) {
            console.log('Like toggled for movie ID:', id);
            this.movies = this.movies.map(item => {
                if (item.id === id) {
                    return { ...item, like: !item.like };
                }
                return item;
            });
            console.log('Updated movies:', this.movies);
        },
        onDeleteHandler(movie) {
            this.movies = this.movies.filter(item => item.id !== movie.id);
            console.log('Deleted movie:', movie);
            console.log('Updated movies:', this.movies);
        },
    },
};
</script>

<style scoped>
.app {
    min-height: 100vh;
    color: #1e293b;
    background-color: #f1f5f9;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'Inter', monospace, sans-serif;
}

.content {
    width: 100%;
    max-width: 1000px;
    min-height: 700px;
    background-color: #ffffff;
    margin: 2rem auto;
    padding: 3rem 2rem;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
}

.content:hover {
    transform: translateY(-4px);
}

.search-panel {
    margin-top: 2rem;
    padding: 1.5rem;
    background-color: #f8fafc;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    transition: box-shadow 0.3s ease, background-color 0.3s ease;
}

.search-panel:hover {
    background-color: #fefefe;
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
}

@media (max-width: 1024px) {
    .content {
        max-width: 90%;
        padding: 2rem 1.5rem;
        margin: 1.5rem auto;
    }

    .search-panel {
        padding: 1rem;
        margin-top: 1.5rem;
    }
}

@media (max-width: 768px) {
    .content {
        padding: 1.5rem 1rem;
        min-height: auto;
    }

    .search-panel {
        padding: 0.75rem;
        margin-top: 1rem;
    }
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.content {
    animation: fadeIn 0.5s ease-in-out;
}

.search-panel {
    animation: fadeIn 0.6s ease-in-out 0.2s;
}
</style>