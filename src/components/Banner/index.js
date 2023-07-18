import './banner.css';

export default function Banner(props) {
  const { src, alt, link, children } = props;

  return (
    <div className="banner">
      <a href={link}>
        <img className="banner__img img-fluid" src={src} alt={alt} />
        {children}
      </a>
    </div>
  );
}
