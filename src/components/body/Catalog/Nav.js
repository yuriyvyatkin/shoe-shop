import { useLocation } from 'react-router-dom';

export default function Nav(props) {
  const location = useLocation();
  const { categories, searchParams, onItemClick: handleClick } = props;
  let categoriesList = null;

  if (categories.length) {
    categoriesList = categories.map(({ id, title }) => {
      const isActive = searchParams.get('categoryId') === String(id);

      return (
        <li key={id} className="nav-item">
          <a
            className={`nav-link ${isActive && 'active'}`}
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
          className={`nav-link ${!searchParams.get('categoryId') && 'active'}`}
          href={location.pathname}
          onClick={handleClick}
        >
          Все
        </a>
      </li>,
    );
  }

  return (
    <ul className="catalog-categories nav justify-content-center">
      {categoriesList}
    </ul>
  );
}
