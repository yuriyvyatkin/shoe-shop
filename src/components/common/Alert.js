export default function Alert({ type, text }) {
  return (
    <div className={`text-center alert alert-${type}`} role="alert">
      {text}
    </div>
  );
}
