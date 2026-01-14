const CONFIG = {
    KEY: 'e4b59837af69eb12ed808913a7e0782c',
    BASE_URL: 'https://api.themoviedb.org/3/',
    BASE_IMAGE_URL: 'https://image.tmdb.org/t/p/w500/',
    DEFAULT_LANGUAGE: 'en-us',
    CACHE: {
        NAME: 'MovieCatalogue-V1'
    },
    idb: {
        name: 'MovieCatalogue-DB',
        version: 1,
        objects: {
            movie: {
                key: 'id',
                name: 'movie',
            },
        },
    },
    WEB_SOCKET_SERVER: 'ws://localhost:8081'
};

export default CONFIG;
