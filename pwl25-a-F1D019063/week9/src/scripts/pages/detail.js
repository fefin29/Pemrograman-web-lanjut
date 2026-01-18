import UrlParser from "../url-parser";
import TheMovieDb from "../data/themoviedb";
import {createMovieDetailTemplate, createLikeButtonTemplate} from "../template-creator";
import LikeButtonInitiator from '../like-button-initiator';

const Detail = {
    async render() {
        return `
          <div id="movie" class="movie"></div>
          <div id="likeButtonContainer"></div>
        `;
    },

    async afterRender() {
        const url = UrlParser.parseActiveUrlWithoutCombiner();
        const movie = await TheMovieDb.detailMovie(url.id);
        const movieContainer = document.querySelector('#movie');
        movieContainer.innerHTML = createMovieDetailTemplate(movie);

        LikeButtonInitiator.init({
            likeButtonContainer: document.querySelector('#likeButtonContainer'),
            movie: {
                id: movie.id,
                title: movie.title,
                overview: movie.overview,
                backdrop_path: movie.backdrop_path,
                vote_average: movie.vote_average,
            },
        });
    },
};

export default Detail;
