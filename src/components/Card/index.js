import { Link } from 'react-router-dom';
import './card.css';

export default function Card(props) {
  const { id, images, title, price } = props;

  return (
    <div className="card">
      <img
        src={images && images[0]}
        className="card__img img-fluid"
        alt={title}
      />
      <div className="card__body card-body">
        <p className="card__title">{title}</p>
        <p className="card__price">{price} руб.</p>
        <Link to={`/catalog/${id}`} className="btn btn-outline-primary">
          Заказать
        </Link>
      </div>
    </div>
  );
}
