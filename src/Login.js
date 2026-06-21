import { useState, useContext } from 'react';
import { baseURL, TokenContext } from './utility';
import { Navigate, useNavigate } from 'react-router-dom';

export default function Login({ updateToken }) {
  const [un, setUn] = useState('');
  const [p, setP] = useState('');
  const [errors, setErrors] = useState({});
  const token = useContext(TokenContext);
  const redirect = useNavigate();

  async function handleFormSubmit(event) {
    event.preventDefault();
    const body = new URLSearchParams();
    body.append('username', un);
    body.append('password', p);
    const response = await fetch(`${baseURL}/login`, {
      method: 'POST',
      body: body,
    });
    if (response.ok) {
      updateToken((await response.json()).token);
      redirect('/');
    } else if (response.status == 406) setErrors((await response.json()).errors);
    else window.alert(response.status + ': ' + response.statusText);
  }
  return (
    <>
      {token && <Navigate to="/" />}
      {!token && (
        <>
          <h1>Вход</h1>
          <form onSubmit={handleFormSubmit}>
            <label>Имя пользователя</label>
            <input
              value={un}
              onChange={(event) => {
                setUn(event.target.value);
              }}
            />
            {errors.username && (
              <div>
                <span className="label error">{errors.username.msg}</span>
              </div>
            )}

            <label>Пароль</label>
            <input
              type="password"
              value={p}
              onChange={(event) => {
                setP(event.target.value);
              }}
            />
            {errors.password && (
              <div>
                <span className="label error">{errors.password.msg}</span>
              </div>
            )}
            <div className="horizontal">
              <input type="submit" value="Войти"></input>
            </div>
          </form>
        </>
      )}
    </>
  );
}
