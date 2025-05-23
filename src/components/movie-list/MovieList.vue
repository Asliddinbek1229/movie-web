<template>
    <ul class="movie-list list-group">
        <MovieListItem
            v-for="movie in movies"
            :key="movie.id"
            :movie="movie"
            @onLike="onLike"
            @onDelete="onDelete"
        />
    </ul>
</template>

<script>
import MovieListItem from '@/components/movie-list-item/MovieListItem.vue';

export default {
    components: { MovieListItem },
    props: {
        movies: {
            type: Array,
            required: true,
        },
    },
    methods: {
        onLike(id) {
            this.$emit('onLike', id);
        },
        onDelete(movie) {
            this.$emit('onDelete', movie); // Delete hodisasini App.vue ga yuborish
        },
    },
};
</script>

<style scoped>
.movie-list {
    margin-bottom: 1rem;
    padding: 1.5rem;
    background-color: #fcfaf5;
    border-radius: 4px;
    box-shadow: 15px 15px 15px rgba(0, 0, 0, 0.15);
}
</style>