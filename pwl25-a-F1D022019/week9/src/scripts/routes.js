import NowPlaying from './pages/now-playing';
import Upcoming from './pages/upcoming';
import Detail from './pages/detail';
import Like from './pages/like';

const routes = {
    '/': NowPlaying, // default page
    '/now-playing': NowPlaying,
    '/upcoming': Upcoming,
    '/detail/:id': Detail,
    '/like': Like,
};

export default routes;
