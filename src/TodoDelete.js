import { useContext } from 'react';
import { RefreshListContext, TokenContext, baseURL } from './utility';

export default function TodoDelete({ todoID }) {
  const token = useContext(TokenContext);
  const refreshList = useContext(RefreshListContext);

  async function handleFormSubmit(event) {
    event.preventDefault();
    const response = await fetch(`${baseURL}/todos/${todoID}`, {
      method: 'delete',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) refreshList();
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <input type="submit" className="warning" value="Удалить" />
    </form>
  );
}
