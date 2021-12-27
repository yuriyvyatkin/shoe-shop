import { useState, useEffect } from 'react';
import useCustomFetch from '../../functions/useCustomFetch';
import Preloader from '../common/Preloader';
import Catalog from './Catalog/Catalog';
import CardTile from '../common/CardTile';

export default function Home() {
  const [topItems, setTopItems] = useState([]);
  const [loadingError, setLoadingError] = useState(null);
  const { getTopItems } = useCustomFetch();

  useEffect(() => {
    setLoadingError(null);

    getTopItems()
      .then((data) => {
        setTopItems(data);
      })
      .catch((error) => setLoadingError(error));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <section className="top-sales">
        <h2 className="text-center">Хиты продаж!</h2>
        {getTopItems.loading ? (
          <Preloader />
        ) : (
          loadingError || <CardTile items={topItems} />
        )}
      </section>
      <Catalog />
    </>
  );
}
