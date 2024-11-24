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
import UserList from './pages/UserList';
import Login from './pages/LogIn';
import AuthenticatedRoute from './components/AuthenticatedRoute';
import Notfound from './pages/Notfound';
import Loader from './components/common/Loader';
import ReferalRefund from './pages/ReferalRefund';
import Configuration from './pages/Configuration';
import 'primereact/resources/themes/saga-green/theme.css'; 
import 'primereact/resources/primereact.min.css';

function App() {

  return (
    // <><Routes>
    //     <Route
    //     path="/"
    //      Component={() => (
    //       <Layout />
    //   )}  >
    //     <Route path="allusers" Component={UserList} />
    //     </Route>
    //     </Routes>
    
    // </>
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
         <Route path="/login" Component={Login} />
        <Route
          path="/"
          Component={() => (
            <AuthenticatedRoute><Layout /></AuthenticatedRoute>
              
          )}
        >
          <Route path="" Component={Home} />
          <Route path="equipment" Component={Equipment} />
          <Route path="advertisement" Component={Advertisement} />
          <Route path="documents" Component={Documents} />
          <Route path="approval" Component={Approval} />
          <Route path="flagged" Component={Flagged} />
          <Route path="allusers" Component={UserList} />
          <Route path="referrals" Component={ReferalRefund} />
          <Route path="config" Component={Configuration} />
        </Route>
        <Route path="*" Component={Notfound} />
      </Routes>

      <Loader />
    </>
  );
}

export default App;
