import { useEffect, useRef, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import Alert from '@/components/Alert';
import CardTile from '@/components/CardTile';
import Preloader from '@/components/Preloader';
import useCustomFetch from '@/hooks/useCustomFetch';
import NotFound from '@/pages/NotFound';
import DownloadBtn from './DownloadBtn';
import Categories from './Categories';
import SearchBar from './SearchBar';

export default function Catalog() {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loadingError, setLoadingError] = useState(null);
  const { getItems, getCategories } = useCustomFetch();
  const downloadButtonRef = useRef();
  const cardsSet = 6;

  function handleSearchFormSubmit(event) {
    event.preventDefault();

    const q = event.target.elements.query.value;
    const prevSearchParams = Object.fromEntries(searchParams.entries());
    delete prevSearchParams.offset;

    if (q) {
      setSearchParams({ ...prevSearchParams, q });
    } else {
      const { q, ...rest } = prevSearchParams;
      setSearchParams(rest);
    }
  }

  function handleNavItemClick(event) {
    event.preventDefault();

    const categoryId = event.target.id;
    const prevSearchParams = Object.fromEntries(searchParams.entries());
    delete prevSearchParams.offset;

    if (categoryId) {
      setSearchParams({ ...prevSearchParams, categoryId });
    } else {
      const { categoryId, ...rest } = prevSearchParams;
      setSearchParams(rest);
    }
  }

  function handleDownloadButtonClick() {
    const prevSearchParams = Object.fromEntries(searchParams.entries());
    const currentOffset = searchParams.get('offset');
    const offset = currentOffset ? Number(currentOffset) + cardsSet : cardsSet;

    setSearchParams({ ...prevSearchParams, offset });
  }

  useEffect(() => {
    setLoadingError(null);
    const offset = searchParams.get('offset');

    if (offset && (offset - items.length > 0 || offset <= 0)) {
      setLoadingError(<NotFound />);
      return;
    }

    if (!offset) {
      Promise.all([getCategories(), getItems(searchParams)])
        .then((data) => {
          const [categories, items] = data;

          setCategories(categories);

          setItems(items);
        })
        .catch((error) => setLoadingError(error));
    } else {
      getItems(searchParams)
        .then((data) => {
          if (data.length < cardsSet) {
            setTimeout(() => {
              downloadButtonRef.current.style.display = 'none';
            }, 100);
          }

          setItems((prevState) => [...prevState, ...data]);
        })
        .catch((error) => setLoadingError(error));
    }
  }, [searchParams]);

  const offset = searchParams.get('offset');

  let itemsComponent;

  if (items === 'Нет данных для просмотра') {
    itemsComponent = <Alert type="warning" text={items} />
  } else {
    itemsComponent = <CardTile items={items} />
  }

  const catalogBody = (
    <>
      <Categories
        categories={categories}
        searchParams={searchParams}
        onItemClick={handleNavItemClick}
      />
      {itemsComponent}
    </>
  );

  const loader = (
    <DownloadBtn
      itemsLength={items.length}
      cardsSet={cardsSet}
      onButtonClick={handleDownloadButtonClick}
      downloadButtonRef={downloadButtonRef}
    />
  );

  const error = loadingError && <Alert type="danger" text={loadingError} />;

  const catalog = (
    <section className="catalog">
      <h2 className="text-center">Каталог</h2>
      {location.pathname === '/catalog' && (
        <SearchBar
          initialValue={searchParams.get('q')}
          style={{
            display:
              loadingError || getCategories.loading || getItems.loading
                ? 'none'
                : 'block',
          }}
          onFormSubmit={handleSearchFormSubmit}
        />
      )}
      {getCategories.loading || getItems.loading ? (
        !offset ? (
          <Preloader />
        ) : (
          <>
            {catalogBody}
            <Preloader />
          </>
        )
      ) : !offset ? (
        error || (
          <>
            {catalogBody}
            {itemsComponent.type.name !== 'Alert' && loader}
          </>
        )
      ) : (
        <>
          {catalogBody}
          {error || loader}
        </>
      )}
    </section>
  );

  const isNotFound = loadingError && typeof loadingError === 'object';

  return isNotFound ? <NotFound /> : catalog;
}
