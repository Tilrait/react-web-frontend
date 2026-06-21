import { useNavigate } from 'react-router-dom';

export default function Logout({ updateToken }) {
  const redirect = useNavigate();

  function handleFormSubmit(event) {
    event.preventDefault();
    updateToken(undefined);
    redirect('/login');
  }
  return (
    <form className="horizontal" onSubmit={handleFormSubmit}>
      <input type="submit" className="warning" value="Выйти" />
    </form>
  );
}
