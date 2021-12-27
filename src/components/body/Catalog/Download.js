export default function Download(props) {
  const {
    itemsLength,
    cardsSet,
    onButtonClick: handleButtonClick,
    downloadButtonRef,
  } = props;

  return (
    <div
      className="text-center"
      style={{ display: itemsLength >= cardsSet ? 'block' : 'none' }}
    >
      <button
        className="btn btn-outline-primary"
        onClick={handleButtonClick}
        ref={downloadButtonRef}
      >
        Загрузить ещё
      </button>
    </div>
  );
}
