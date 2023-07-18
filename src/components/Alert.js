export default function Alert({ type, text }) {
  return (
    <div className={`alert text-center alert-${type}`} role="alert">
      {text}
    </div>
  );
}
