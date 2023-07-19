import { useEffect, useState } from 'react';
import useCustomFetch from '@/hooks/useCustomFetch';
import CardTile from '@/components/CardTile';
import Preloader from '@/components/Preloader';
import Catalog from './Catalog';

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
  }, []);

  return (
    <>
      <section className="home top-sales">
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
