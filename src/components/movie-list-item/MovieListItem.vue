<template>
    <li class="list-group-item d-flex justify-content-between align-items-center" :class="{ 'show-star': isStarVisible, 'favorite': movie.favorite }">
        <span class="list-group-item-label" @click="onLike">{{ movie.name }}</span>
        <div class="input-and-actions d-flex align-items-center gap-3">
            <input type="number" class="list-group-item-input" v-model="localViewCount" @change="updateViewCount" />
            <div class="action-buttons d-flex justify-content-center align-items-center gap-2">
                <button type="button" class="btn-cookie btn-cm" @click="toggleStar">
                    <i class="fas fa-cookie"></i>
                </button>
                <button type="button" class="btn-trash btn-cm" @click="onDelete">
                    <i class="fas fa-trash"></i>
                </button>
                <i class="fas fa-star"></i>
            </div>
        </div>
    </li>
</template>

<script>
export default {
    props: {
        movie: {
            type: Object,
            required: true,
            validator(movie) {
                return (
                    typeof movie === 'object' &&
                    typeof movie.name === 'string' &&
                    typeof movie.view === 'number' &&
                    typeof movie.favorite === 'boolean'
                );
            },
        },
    },
    data() {
        return {
            isStarVisible: false,
            localViewCount: this.movie.view,
        };
    },
    methods: {
        onLike() {
            this.$emit('onLike', this.movie.id);
        },
        onDelete() {
            this.$emit('onDelete', this.movie); // Delete hodisasini chiqarish
        },
        toggleStar() {
            this.isStarVisible = !this.isStarVisible; // Faqat yulduz ko'rinishini o'zgartirish
        },
        updateViewCount() {
            this.$emit('update-view', { ...this.movie, view: Number(this.localViewCount) });
        },
    },
};
</script>

<style scoped>
.list-group-item {
    padding: 12px 16px;
    border-bottom: 1px solid #e2e8f0;
    background-color: #ffffff;
    transition: background-color 0.3s ease, transform 0.2s ease;
    border-radius: 8px;
    margin-bottom: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.list-group-item:last-child {
    border-bottom: none;
    margin-bottom: 0;
}

.list-group-item:hover {
    background-color: #f8fafc;
    transform: translateY(-2px);
}

.list-group-item-label {
    font-size: 18px;
    font-weight: 500;
    color: #1e293b;
    line-height: 36px;
    flex: 1;
    cursor: pointer;
    transition: color 0.3s ease;
    font-family: 'Inter', sans-serif;
}

.list-group-item-input {
    width: 100px;
    font-size: 16px;
    text-align: center;
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    padding: 8px 10px;
    outline: none;
    background-color: #f8fafc;
    transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.list-group-item-input:focus {
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
}

.list-group-item button {
    width: 40px;
    height: 40px;
    font-size: 16px;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.3s ease, transform 0.2s ease;
}

.list-group-item .btn-cookie {
    color: #ffffff;
    background-color: #f59e0b;
}

.list-group-item .btn-trash {
    color: #ffffff;
    background-color: #ef4444;
}

.list-group-item button:hover {
    transform: scale(1.1);
}

.list-group-item .fa-star {
    width: 40px;
    height: 40px;
    line-height: 40px;
    font-size: 18px;
    color: #facc15;
    text-align: center;
    transition: opacity 0.3s ease, transform 0.3s ease;
    transform: translateX(30px);
    opacity: 0;
}

.list-group-item.show-star .fa-star {
    opacity: 1;
    transform: translateX(0);
}

.list-group-item.favorite .list-group-item-label {
    color: #3b82f6;
    font-weight: 600;
}

.input-and-actions {
    gap: 20px;
}

.action-buttons {
    gap: 14px;
}

@media (max-width: 768px) {
    .list-group-item {
        flex-direction: column;
        align-items: flex-start;
        padding: 12px 14px;
    }

    .list-group-item-label {
        font-size: 16px;
        line-height: 28px;
        width: 100%;
    }

    .list-group-item-input {
        width: 100%;
        margin: 10px 0;
    }

    .input-and-actions {
        width: 100%;
        justify-content: space-between;
        flex-wrap: wrap;
    }

    .action-buttons {
        justify-content: flex-end;
    }
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.list-group-item {
    animation: fadeIn 0.3s ease-in-out;
}
</style>