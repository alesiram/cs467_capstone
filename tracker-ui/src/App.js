import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomePage from './pages/home/home';
import LoginPage from './pages/login/login';
import ContactsPage from './pages/contacts/contacts';

function App() {
  return (
    <div className="App">
      <Router>
          {/* Route for the Home Page */}
          <Route path="/" exact component={HomePage} />
          <Route path='/login'>
            <LoginPage />
          </Route>
          <Route path='/contacts'>
            <ContactsPage />
          </Route>
      </Router>
    </div>
  );
}

export default App;
