import NowPlaying from './pages/now-playing';
import Upcoming from './pages/upcoming';
import Detail from './pages/detail';
import About from './pages/about';

const routes = {
    '/': NowPlaying, // default page
    '/now-playing': NowPlaying,
    '/upcoming': Upcoming,
    '/detail/:id': Detail,
    '/about': About
};

export default routes;
