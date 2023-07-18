import { useLocation } from 'react-router-dom';
import './categories.css';

export default function Categories(props) {
  const location = useLocation();
  const { categories, searchParams, onItemClick: handleClick } = props;
  let categoriesList = null;

  if (categories.length) {
    categoriesList = categories.map(({ id, title }) => {
      const isActive = searchParams.get('categoryId') === String(id);

      return (
        <li key={id} className="nav-item">
          <a
            className={`nav-link ${isActive && 'nav-link_active'}`}
            id={id}
            href={location.pathname + `?categoryId=${id}`}
            onClick={handleClick}
          >
            {title}
          </a>
        </li>
      );
    });

    const key = Number(categories[0].id) - 1;

    categoriesList.unshift(
      <li key={key} className="nav-item">
        <a
          className={`nav-link ${!searchParams.get('categoryId') && 'nav-link_active'}`}
          href={location.pathname}
          onClick={handleClick}
        >
          Все
        </a>
      </li>,
    );
  }

  return (
    <ul className="catalog__categories nav justify-content-center">
      {categoriesList}
    </ul>
  );
}
