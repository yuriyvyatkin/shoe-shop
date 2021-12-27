import Card from './Card';

export default function CardTile({ items }) {
  return (
    <div className="row">
      {items &&
        items.map(({ id, images, title, price }) => {
          return (
            <div key={id} className="col-4">
              <Card id={id} images={images} title={title} price={price} />
            </div>
          );
        })}
    </div>
  );
}
