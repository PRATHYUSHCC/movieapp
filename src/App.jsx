import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './home'; // you'll create this
import MovieDetail from './components/moviedetail'; // you'll create this

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
