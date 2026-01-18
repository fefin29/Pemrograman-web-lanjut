import NowPlaying from './pages/now-playing';
import Upcoming from './pages/upcoming';
import Detail from './pages/detail';

const routes = {
    '/': NowPlaying, // default page
    '/now-playing': NowPlaying,
    '/upcoming': Upcoming,
    '/detail/:id': Detail,
};

export default routes;
