<template>
    <div class="app-info">
        <p class="fs-3 text-uppercase">Barcha kinolar soni: {{ allMoviesCount }}</p>
        <p class="fs-4 text-uppercase">Ko'rilgan kinolar soni: {{ favoriteMoviesCount }}</p>
    </div>
</template>
<script>
export default {
    props: {
      allMoviesCount: {
        type: Number,
        required: true,
      },
      favoriteMoviesCount: {
        type: Number,
        required: true,
      }
    }
}
</script>
<style>
    .app-info {
        padding: 1.5rem;
        border-radius: 4px;
        background-color: #fcfaf5;
        box-shadow: 15px 15px 15px rgba(0, 0, 0, .15);
    }
</style>