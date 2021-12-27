import { useState, useRef, useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import Preloader from '../../common/Preloader';
import SearchBar from './SearchBar';
import Nav from './Nav';
import CardTile from '../../common/CardTile';
import Download from './Download';
import useCustomFetch from '../../../functions/useCustomFetch';
import scrollDown from '../../../functions/scrollDown';
import NotFound from '../NotFound';
import Alert from '../../common/Alert';

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
          scrollDown();
        })
        .catch((error) => setLoadingError(error));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const offset = searchParams.get('offset');

  const catalogBody = (
    <>
      <Nav
        categories={categories}
        searchParams={searchParams}
        onItemClick={handleNavItemClick}
      />
      <CardTile items={items} />
    </>
  );

  const loader = (
    <Download
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
      {location.pathname === '/catalog.html' && (
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
            {loader}
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
