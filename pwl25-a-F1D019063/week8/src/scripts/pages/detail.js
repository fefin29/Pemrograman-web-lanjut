import UrlParser from "../url-parser";
import TheMovieDb from "../data/themoviedb";
import {createMovieDetailTemplate} from "../template-creator";

const Detail = {
    async render() {
        return `
          <div id="movie" class="movie"></div>
        `;
    },

    async afterRender() {
        const url = UrlParser.parseActiveUrlWithoutCombiner();
        const movie = await TheMovieDb.detailMovie(url.id);
        const movieContainer = document.querySelector('#movie');
        movieContainer.innerHTML = createMovieDetailTemplate(movie);
    },
};

export default Detail;
