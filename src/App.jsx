import './App.css';
import './styles/utils.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { useEffect, useReducer } from 'react';

import Home from './pages/Home';
import Chat from './pages/Chat/Chat';
import AuthContext from './auth/AuthContext';
import authReducer from './auth/AuthReducer';

const init = () => JSON.parse(localStorage.getItem('userChat')) || { logged: false };

function App() {
  const [user, dispatch] = useReducer.Provider(authReducer, {}, init);

  useEffect(() => {
    localStorage.setItem('userChat', JSON.stringify(user));
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, dispatch }}>
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
    </AuthContext.Provider>
  );
}

export default App;
