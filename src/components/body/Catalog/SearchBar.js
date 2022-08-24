import { useState, useEffect } from 'react';

export default function SearchBar(props) {
  const { initialValue, style, onFormSubmit: handleSubmit } = props;
  const [form, setForm] = useState({ query: initialValue || '' });

  useEffect(() => {
    setForm({ query: initialValue || '' });
  }, [initialValue]);

  function handleInputChange({ target }) {
    const { name, value } = target;

    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  }

  return (
    <form
      style={style}
      className="catalog-search-form form-inline"
      onSubmit={handleSubmit}
    >
      <input
        className="form-control"
        type="text"
        name="query"
        value={form.query}
        placeholder="Введите часть названия или цвет обуви"
        onInput={handleInputChange}
      />
    </form>
  );
}
