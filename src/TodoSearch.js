import { useState } from 'react';

export default function TodoSearch({ search, setSearch }) {
  const [s, setS] = useState(search);

  function handleOnSubmit(event) {
    event.preventDefault();
    setSearch(s);
  }

  return (
    <form className="horizontal" onSubmit={handleOnSubmit}>
      <input
        name="search"
        value={s}
        onChange={(event) => {
          setS(event.target.value);
        }}
      />
      <input type="submit" value="Найти" />
    </form>
  );
}
