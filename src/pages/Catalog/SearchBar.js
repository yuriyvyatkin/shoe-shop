import { useState, useEffect } from 'react';
import './search-bar.css';

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
      className="search-bar"
      onSubmit={handleSubmit}
    >
      <input
        className="search-bar__input"
        type="text"
        name="query"
        value={form.query}
        placeholder="Введите часть названия или цвет обуви"
        onInput={handleInputChange}
      />
    </form>
  );
}
