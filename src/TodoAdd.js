import { useState, useContext } from 'react';
import { baseURL, TokenContext } from './utility';
import { Navigate, useNavigate } from 'react-router-dom';

export default function TodoAdd() {
  const [t, setT] = useState('');
  const [d, setD] = useState('');
  const [a, setA] = useState(undefined);
  const [errors, setErrors] = useState({});
  const token = useContext(TokenContext);
  const redirect = useNavigate();

  async function handleFormSubmit(event) {
    event.preventDefault();
    const body = new FormData();
    body.append('title', t);
    body.append('desc', d);
    if (a) body.append('addendum', a);
    const response = await fetch(`${baseURL}/todos`, {
      method: 'POST',
      body: body,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) redirect('/');
    else if (response.status == 406) setErrors((await response.json()).errors);
    else window.alert(response.status + ': ' + response.statusText);
  }

  return (
    <>
      {!token && <Navigate to="/login" />}
      {token && (
        <>
          <h1>Добавление дела</h1>
          <form onSubmit={handleFormSubmit}>
            <label>Заголовок</label>
            <input
              onChange={(event) => {
                setT(event.target.value);
              }}
            />
            {errors.title && (
              <div>
                <span className="label error">{errors.title.msg}</span>
              </div>
            )}
            <label>Описание</label>
            <textarea
              onChange={(event) => {
                setD(event.target.value);
              }}>
              {d}
            </textarea>

            <label>Изображение</label>
            <input
              type="file"
              accept="image/*"
              onChange={(event) => {
                setA(event.target.files[0]);
              }}
            />
            {errors.addendum && (
              <div>
                <span className="label error">{errors.addendum.msg}</span>
              </div>
            )}
            <div className="horizontal">
              <input type="submit" value="Добавить" />
            </div>
          </form>
        </>
      )}
    </>
  );
}
