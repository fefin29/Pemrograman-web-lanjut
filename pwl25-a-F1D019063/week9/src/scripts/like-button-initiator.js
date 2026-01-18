import FavoriteMovieIdb from './idb-favourite';
import {createLikeButtonTemplate, createLikedButtonTemplate} from './template-creator';

const LikeButtonInitiator = {
    async init({likeButtonContainer, movie}) {
        this._likeButtonContainer = likeButtonContainer;
        this._movie = movie;

        await this._renderButton();
    },

    async _renderButton() {
        const {id} = this._movie;

        if (await this._isMovieExist(id)) {
            this._renderLiked();
        } else {
            this._renderLike();
        }
    },

    async _isMovieExist(id) {
        const movie = await FavoriteMovieIdb.get(id);
        return !!movie;
    },

    _renderLike() {
        this._likeButtonContainer.innerHTML = createLikeButtonTemplate();

        const likeButton = document.querySelector('#likeButton');
        likeButton.addEventListener('click', async () => {
            await FavoriteMovieIdb.put(this._movie);
            this._renderButton();
        });
    },

    _renderLiked() {
        this._likeButtonContainer.innerHTML = createLikedButtonTemplate();

        const likeButton = document.querySelector('#likeButton');
        likeButton.addEventListener('click', async () => {
            await FavoriteMovieIdb.delete(this._movie.id);
            this._renderButton();
        });
    },
};

export default LikeButtonInitiator;
