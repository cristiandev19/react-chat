import './App.css';
import './styles/utils.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import Home from './pages/Home';
import Chat from './pages/Chat/Chat';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/chat/:idChat">
          <Chat />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
