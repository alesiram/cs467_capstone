import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import LoginPage from './pages/login/login';

function App() {
  return (
    <div className="App">
      <Router>
          <Route path='/login'>
            <LoginPage />
          </Route>
      </Router>
    </div>
  );
}

export default App;
