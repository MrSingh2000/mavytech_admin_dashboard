import '../styles/notfound.css';
import { useNavigate } from 'react-router-dom';

function Notfound() {
  const navigate = useNavigate();

  return (
    <div
    className='container'
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100vw',
        height: '100vh',
      }}
    >
      <header>
        <h4>404 not found</h4>
      </header>

      <main>
        <section className="section--image">
          <img
            src="https://rvs-404-not-found.onrender.com/Scarecrow.png"
            alt=""
          />
        </section>
        <section className="section--content">
          <h5>I have bad news for you</h5>
          <p>
            The page you are looking for might be removed or is temporarily
            unavailable
          </p>
          <button onClick={() => navigate('/')}>back to homepage</button>
        </section>
      </main>
    </div>
  );
}

export default Notfound;
