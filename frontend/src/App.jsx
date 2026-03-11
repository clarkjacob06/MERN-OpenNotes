import {Routes, Route} from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import CreatePage from './pages/CreatePage.jsx';
import ContentPage from './pages/ContentPage.jsx';
import {SkeletonTheme} from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function App() {
  return(
    <>
      <SkeletonTheme baseColor='#d8d2d2' highlightColor='#dfdddd'>
        <Routes>
          <Route path={'/'} element={<HomePage/>}></Route>
          <Route path={'/create'} element={<CreatePage/>}></Route>
          <Route path={'/content/:id'} element={<ContentPage/>}></Route>
        </Routes>
      </SkeletonTheme>
    </>
  )
}

export default App