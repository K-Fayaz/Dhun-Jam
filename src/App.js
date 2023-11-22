import './CSS/App.css';
import Login from './pages/login';
import Admin from './pages/admin';

import { BrowserRouter as Router , Route , Routes } from 'react-router-dom';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/dashboard" element={<Admin/>}/>
      </Routes>
    </Router>
  );
}

export default App;
