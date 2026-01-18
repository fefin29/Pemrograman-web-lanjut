import TheMovieDb from "../data/themoviedb";
import {createMovieItemTemplate} from "../template-creator";

const NowPlaying = {
    async render() {
        return `
          <div class="content">
            <h2 class="content__heading">Now Playing in Cinema</h2>
            <div id="movies" class="movies">
     
            </div>
          </div>
        `;
    },

    async afterRender() {
        const movies = await TheMovieDb.nowPlayingMovies();
        const moviesContainer = document.querySelector('#movies');
        movies.forEach((movie) => {
            moviesContainer.innerHTML += createMovieItemTemplate(movie);
        });
    },
};

export default NowPlaying;
