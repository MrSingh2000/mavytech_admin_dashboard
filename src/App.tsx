import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
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
import Learning from './pages/Learning';
import ResetPassword from './pages/ResetPassword';
import Redirection from './pages/Redirection';
import PrivacyPolicy from './pages/PrivacyPolicy';
import ContactUs from './pages/Contactus';
import AppHomepage from './pages/AppHomepage';

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
        <Route path="/" Component={AppHomepage} />
        <Route path="/login" Component={Login} />
        <Route path="/" element={<AuthenticatedRoute />}>
          <Route path="home" Component={Home} />
          <Route path="equipment" Component={Equipment} />
          <Route path="advertisement" Component={Advertisement} />
          <Route path="documents" element={<Documents />} />
          <Route path="approval" Component={Approval} />
          <Route path="flagged" Component={Flagged} />
          <Route path="allusers" Component={UserList} />
          <Route path="referrals" Component={ReferalRefund} />
          <Route path="config" Component={Configuration} />
          <Route path="learning" Component={Learning} />
        </Route>
        <Route path="/reset-password" Component={ResetPassword} />
        <Route path="/redirect" Component={Redirection} />
        <Route path="/privacy-policy" Component={PrivacyPolicy} />
        <Route path="/contact" Component={ContactUs} />
        <Route path="*" Component={Notfound} />
      </Routes>

      <Loader />
    </>
  );
}

export default App;
