import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomePage from './pages/home/home';
import LoginPage from './pages/login/login';
import ContactsPage from './pages/contacts/contacts';
import SkillsPage from './pages/skills/skills';
import JobsPage from './pages/jobs/jobs';

function App() {
  return (
    <div className="App">
      <Router>
        {/* Component prop for all routes */}
        <Route path="/" exact component={HomePage} />
        <Route path="/login" exact component={LoginPage} />
        <Route path="/contacts" exact component={ContactsPage} />
        <Route path="/skills" exact component={SkillsPage} />
        <Route path="/jobs" exact component={JobsPage} />
      </Router>
    </div>
  );
}

export default App;
