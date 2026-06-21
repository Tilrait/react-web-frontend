import { useContext } from 'react';

import { baseURL, TokenContext, RefreshListContext } from './utility';

export default function TodoSetDone({ todoID }) {
  const token = useContext(TokenContext);
  const refreshList = useContext(RefreshListContext);

  async function handleFormSubmit(event) {
    event.preventDefault();
    const response = await fetch(`${baseURL}/todos/${todoID}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) refreshList();
    else window.alert(response.status + ': ' + response.statusText);
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <input type="submit" className="success" value="Сделано" />
    </form>
  );
}
