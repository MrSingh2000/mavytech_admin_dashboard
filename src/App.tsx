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

function App() {
  // const isLoading = useSelector((store: RootState) => store.loading.value);

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
        <Route path="/login" Component={Login} />
        <Route
          path="/"
          Component={() => (
            <AuthenticatedRoute>
              <Layout />
            </AuthenticatedRoute>
          )}
        >
          <Route path="" Component={Home} />
          <Route path="equipment" Component={Equipment} />
          <Route path="advertisement" Component={Advertisement} />
          <Route path="documents" Component={Documents} />
          <Route path="approval" Component={Approval} />
          <Route path="flagged" Component={Flagged} />
          <Route path="allusers" Component={UserList} />
        </Route>
        <Route path="*" Component={Notfound} />
      </Routes>

      {/* {isLoading && <Loader />} */}
    </>
  );
}

export default App;
