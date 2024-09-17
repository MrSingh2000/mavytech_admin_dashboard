import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Layout from './components/layout/Layout';
import Equipment from './pages/Equipment';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Advertisement from './pages/Advertisement';
import Documents from './pages/Documents';
import Approval from './pages/Approval';
import Flagged from './pages/Flagged';

function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Routes>
        <Route path="/" Component={Layout}>
          <Route path="" Component={Home} />
          <Route path="equipment" Component={Equipment} />
          <Route path="advertisement" Component={Advertisement} />
          <Route path="documents" Component={Documents} />
          <Route path="approval" Component={Approval} />
          <Route path="flagged" Component={Flagged}/>
        </Route>
      </Routes>


    </>
  );
}

export default App;
