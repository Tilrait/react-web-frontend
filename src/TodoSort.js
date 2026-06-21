export default function TodoSort({ sort, setSort }) {
  function handleFormSubmit(event) {
    event.preventDefault();
    setSort(sort == '1' ? '0' : '1');
  }
  return (
    <form className="horizontal" onSubmit={handleFormSubmit}>
      {sort === '1' && <input type="submit" value="Вывести все дела" />}
      {sort === '0' && <input type="submit" value="Вывести выполненные дела в конце" />}
    </form>
  );
}
