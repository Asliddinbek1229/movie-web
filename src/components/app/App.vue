<template>
    <div class="app font-monospace">
        <div class="content">
            <AppInfo :allMoviesCount="movies.length"
                     :favoriteMoviesCount="movies.filter(movie => movie.favorite).length"/>
            <div class="search-panel">
                <SearchPanel :updateTermHandler="updateTermHandler"/>
                <AppFilter :updateFilterHandler="updateFilterHandler" :filterName="filter"/>
            </div>
            <Box v-if="!movies.length && !isLoading">
              <p class="text-center text-danger fs-3">Kinolar mavjud emas</p>
            </Box>
            <Box v-else-if="isLoading">
              <Loader />
            </Box>
            <MovieList
                v-else
                :movies="onFilterHandler(onSearchHandler(movies, term), filter)"
                @onLike="onLikeHandler"
                @onDelete="onDeleteHandler"

            />
            <Box>
              <nav aria-label="Page navigation example">
                <ul class="pagination justify-content-center" >
                  <li class="page-item" :class="{ disabled: page === 1 }">
                    <a class="page-link" href="#" @click.prevent="changePageHandler(page - 1)">Oldinga</a>
                  </li>
                  <li
                      class="page-item"
                      v-for="pageNumber in totalPage"
                      :key="pageNumber"
                      :class="{active: pageNumber === page}"
                      @click="changePageHandler(pageNumber)"
                  >
                    <a class="page-link" href="#">{{ pageNumber }}</a>
                  </li>
                  <li class="page-item" :class="{ disabled: page === totalPage }">
                    <a class="page-link" href="#" @click.prevent="changePageHandler(page + 1)">Keyingi</a>
                  </li>
                </ul>
              </nav>
            </Box>
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
import axios from "axios";
import Loader from "@/components/ui-components/Loader.vue";

export default {
    components: {
      Loader,
        AppInfo,
        SearchPanel,
        AppFilter,
        MovieList,
        MovieAddForm,
    },
    data() {
        return {
          movies: [],
          term: '',
          filter: 'all',
          isLoading: false,
          limit: 10,
          page: 1,
          totalPage: 0,
        };
    },
    methods: {
        async createMovie(item) {
          try {
            const response = await axios.post('https://jsonplaceholder.typicode.com/posts', item)
            this.movies.push(response.data)
          } catch (error) {
            alert(error.message)
          }
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
        onFilterHandler(arr, filter) {
          switch (filter) {
           case 'popular':
             return arr.filter(c => c.favorite === true)
           case 'mostViewers':
             return arr.filter(c => c.view > 500)
           default:
             return arr
          }
        },
        onSearchHandler(arr, term) {
            if(term.length === 0) {
              return arr;
            }
            return arr.filter(item => item.name.toLowerCase().indexOf(term) > -1);
        },
        updateTermHandler(term) {
            this.term = term;
        },
        updateFilterHandler(filter) {
          this.filter = filter;
        },
        async fetchMovie() {
          try {
              this.isLoading = true
              setTimeout(async () => {
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                  params: {
                    _limit: this.limit,
                    _page: this.page,
                  },
                })
                const newArr = response.data.map(item => ({
                    id: item.id,
                    name: item.title,
                    like: false,
                    favorite: false,
                    view: item.id * 10,
                }));
                this.totalPage = Math.ceil(response.headers['x-total-count'] / this.limit)
                this.movies = newArr;
                this.isLoading = false
              }, 3000)
          } catch (error) {
              alert('Ma\'lumotlarni yuklashda xatolik: ' + error.message);
          }
      },
      changePageHandler(pageNumber) {
        if (pageNumber >= 1 && pageNumber <= this.totalPage) {
          this.page = pageNumber;
          this.fetchMovie();
        }
      },
    },
  mounted() {
      this.fetchMovie()
  }
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