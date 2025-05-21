import { Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import Header from './components/layout/Header';
import Login from './pages/login/Login';

export function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
