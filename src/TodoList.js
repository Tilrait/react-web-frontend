import { useEffect, useState, useContext } from 'react';
import { baseURL } from './utility';
import TodoItem from './TodoItem.js';
import TodoSearch from './TodoSearch.js';
import TodoSort from './TodoSort.js';
import { TokenContext, RefreshListContext } from './utility';
import { Navigate } from 'react-router-dom';

// будет TodoSearch и TodoSort
export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('0');
  const [refresh, setRefresh] = useState(false);

  const token = useContext(TokenContext);

  function refreshList() {
    setRefresh(!refresh);
  }

  useEffect(() => {
    if (!token) return;

    (async () => {
      const params = new URLSearchParams();
      if (search) {
        params.append('search', search);
      }
      params.append('doneAtLast', sort);
      const response = await fetch(baseURL + '/todos?' + params, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const ts = await response.json();
        setTodos(ts.todos);
      } else {
        window.alert(response.status + ': ' + response.statusText);
      }
    })();
  }, [token, search, sort, refresh]);

  return (
    <>
      {!token && <Navigate to="/login" />}
      {token && (
        <>
          <TodoSearch search={search} setSearch={setSearch} />
          <TodoSort sort={sort} setSort={setSort} />
          <h1 className="heading">Запланированные дела</h1>
          <RefreshListContext.Provider value={refreshList}>
            {todos.map((todo) => (
              <TodoItem todo={todo} key={todo._id} />
            ))}
          </RefreshListContext.Provider>
        </>
      )}
    </>
  );
}
