import { Link } from 'react-router-dom';

export default function Card(props) {
  const { id, images, title, price } = props;

  return (
    <div className="card">
      <img
        src={images && images[0]}
        className="card-img-top img-fluid"
        alt={title}
      />
      <div className="card-body">
        <p className="card-text">{title}</p>
        <p className="card-text">{price} руб.</p>
        <Link to={`/catalog/${id}.html`} className="btn btn-outline-primary">
          Заказать
        </Link>
      </div>
    </div>
  );
}
