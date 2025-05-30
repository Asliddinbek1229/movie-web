<template>
    <div class="movie-add-form">
        <h3>Yangi kino qo'shish</h3>
        <form class="add-form d-flex" @submit.prevent="addMovie">
            <Input
                class="new-movie-label"
                placeholder="Qanday kino?"
                v-model.name="name"
                @input="name = $event.target.value"
            />
            <Input
                type="number"
                class="new-movie-label"
                placeholder="Nechi marotaba ko'rilgan?"
                v-model.number="viewers"
                required
            />
            <PrimaryButton class="btn-outline-dark" type="submit">Qo'shish</PrimaryButton>
        </form>
    </div>
</template>

<script>
import Input from "@/components/ui-components/Input.vue";

export default {
  components: {Input},
    data() {
        return {
            name: '',
            viewers: '',
        };
    },
    methods: {
        addMovie() {
            const newMovie = {
                name: this.name,
                view: Number(this.viewers), // Number ga aylantirish
                favorite: false,
                like: false,
            };
            this.$emit('createMovie', newMovie);
            this.name = '';
            this.viewers = '';
        },
    },
};
</script>

<style scoped>
.movie-add-form {
    padding: 2rem;
    background: linear-gradient(135deg, #f8f9fa, #e9ecef);
    border-radius: 10px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease-in-out;
}

.movie-add-form:hover {
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.3);
}

h3 {
    font-weight: 700;
    color: #343a40;
}

@media (max-width: 767px) {
    .add-form {
        flex-direction: column;
    }
}
</style>