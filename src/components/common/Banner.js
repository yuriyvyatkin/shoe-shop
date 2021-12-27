export default function Banner(props) {
  const { src, alt } = props;

  return (
    <div className="banner">
      <img className="img-fluid" src={src} alt={alt} />
    </div>
  );
}
