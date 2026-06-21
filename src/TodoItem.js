import TodoSetDone from './TodoSetDone.js';
import TodoDelete from './TodoDelete';
import { Link } from 'react-router-dom';

export default function TodoItem({ todo }) {
  return (
    <article className="card">
      <header>
        {todo.done && (
          <h2>
            <del>
              <Link to={`/${todo._id}`}>{todo.title}</Link>
            </del>
          </h2>
        )}
        {!todo.done && (
          <h2>
            <Link to={`/${todo._id}`}>{todo.title}</Link>
          </h2>
        )}
      </header>
      <footer>
        {todo.desc && <p>{todo.desc}</p>}
        <p className="datetime">{new Date(todo.createdAt).toLocaleDateString()}</p>
        <div className="horizontal">
          {!todo.done && <TodoSetDone todoID={todo._id} />}
          <TodoDelete todoID={todo._id} />
        </div>
      </footer>
    </article>
  );
}
