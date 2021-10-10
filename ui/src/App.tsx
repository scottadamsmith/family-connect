import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import TicTacToe from "./TicTacToe";
import './App.css';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/tictactoe">Tic Tac Toe</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path="/tictactoe">
            <TicTacToe />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
