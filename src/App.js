import { useState } from 'react';
import TodoList from './TodoList.js';
import Logout from './Logout.js';
import Login from './Login.js';
import Register from './Register.js';
import { TokenContext } from './utility.js';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import TodoDetail from './TodoDetail.js';
import TodoAdd from './TodoAdd.js';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  function updateToken(newToken) {
    if (newToken) localStorage.setItem('token', newToken);
    else localStorage.removeItem('token');
    setToken(newToken);
  }

  return (
    <BrowserRouter>
      <nav>
        <Link to="/" className="brand">
          <span>Главная страница</span>
        </Link>
        <input id="bmenub" type="checkbox" className="show" />
        <label htmlFor="bmenub" className="burger pseudo button">
          &#9776;
        </label>
        <div className="menu">
          {token && (
            <>
              <Link to="/">
                <span>Список дел</span>
              </Link>
              <Link to="/add">
                <span>Добавить дело</span>
              </Link>
            </>
          )}
          {!token && (
            <Link to="/register" className="button">
              <span>Регистрация на мегаласт</span>
            </Link>
          )}
          {!token && (
            <Link to="/login" className="button success">
              <span>Войти</span>
            </Link>
          )}
          {token && <Logout updateToken={updateToken} />}
        </div>
      </nav>

      <TokenContext.Provider value={token}>
        <Routes>
          <Route path="/login" element={<Login updateToken={updateToken} />} />
          <Route path="/register" element={<Register updateToken={updateToken} />} />
          <Route path="/add" element={<TodoAdd />} />
          <Route path="/:id" element={<TodoDetail />} />
          <Route path="/" element={<TodoList />} />
        </Routes>
      </TokenContext.Provider>

      <p className="copyright">Все права на Megalast принадлежат Матвееву Егоровичу Егорефовичу</p>
    </BrowserRouter>
  );
}

export default App;
