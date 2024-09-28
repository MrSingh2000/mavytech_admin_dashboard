import '../styles/notfound.css';

function Notfound() {
  return (
    <>
      <div className="glitch-wrapper">
        <div className="glitch-text">ERROR 404: Not found</div>
      </div>

      <button type="button">Homepage</button>
      <button type="button">Send error</button>
    </>
  );
}

export default Notfound;
