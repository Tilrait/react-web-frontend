import { Navigate, useParams } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import { baseURL, TokenContext } from './utility';

export default function TodoDetail() {
  const { id } = useParams();
  const [todo, setTodo] = useState(undefined);
  const token = useContext(TokenContext);

  useEffect(() => {
    if (!token) return;
    (async () => {
      const response = await fetch(`${baseURL}/todos/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) setTodo((await response.json()).item);
      else window.alert(response.status + ': ' + response.statusText);
    })();
  }, [id, token]);

  return (
    <>
      {!token && <Navigate to="/login" />}
      {token && todo && (
        <>
          <h1>{todo.title}</h1>
          {todo.desc && <p>{todo.desc}</p>}
          {todo.addendum && <p className="addendum">
            <img src={`${baseURL}/uploaded/${todo.addendum}`} alt="" />
          </p>}
          <p className="datetime">Создано: {new Date(todo.createdAt).toLocaleString()}</p>
        </>
      )}
    </>
  );
}
