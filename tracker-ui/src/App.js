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
          {/* Route for the Home Page */}
          <Route path="/" exact component={HomePage} />
          <Route path='/login'>
            <LoginPage />
          </Route>
          <Route path='/contacts'>
            <ContactsPage />
          </Route>
          <Route path='/skills' exact component={SkillsPage}>
            <SkillsPage />
          </Route>
          <Route path='/jobs' component={JobsPage}  /> 
      </Router>
    </div>
  );
}

export default App;
