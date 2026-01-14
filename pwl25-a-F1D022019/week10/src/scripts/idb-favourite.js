import {openDB} from 'idb';
import config from '../config';

const objectKey = config.idb.objects.movie.key;
const objectName = config.idb.objects.movie.name;

const dbPromise = openDB(config.idb.name, config.idb.version, {
    upgrade(database) {
        database.createObjectStore(objectName, {keyPath: objectKey});
    },
});

const MovieFavoriteIdb = {
    async get(id) {
        if (!id) {
            return;
        }
        return (await dbPromise).get(objectName, id);
    },
    async getAll() {
        return (await dbPromise).getAll(objectName);
    },
    async put(item) {
        if (!item.hasOwnProperty('id')) {
            return;
        }
        return (await dbPromise).put(objectName, item);
    },
    async delete(id) {
        return (await dbPromise).delete(objectName, id);
    },
};

export default MovieFavoriteIdb;
