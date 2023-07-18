import Card from '../Card';
import './card-tile.css';

export default function CardTile({ items }) {
  return (
    <div className="card-tile row">
      {items &&
        items.map(({ id, images, title, price }) => {
          return (
            <div key={id} className="card-tile col-4">
              <Card id={id} images={images} title={title} price={price} />
            </div>
          );
        })}
    </div>
  );
}
