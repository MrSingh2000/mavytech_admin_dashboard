import Logo from '../assets/logo.png';
import React, { useEffect, useState } from 'react';
import Bg from '/src/assets/LoginBg.png';
import { useDispatch, useSelector } from 'react-redux';
import { userLoginAction } from '../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../redux/store';

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const authToken = useSelector((store: RootState) => store.user.authToken);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch({ type: userLoginAction.type, payload: { email, password } });
  };

  useEffect(() => {
    if (authToken) {
      navigate('/');
    }
  }, [authToken]);

  return (
    <div
      style={{
        backgroundImage: `url(${Bg})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
    >
      <div className="flex bg-white bg-opacity-50">
        <div className="flex flex-col items-center justify-center mx-auto md:h-screen lg:py-0">
          <div className="w-screen bg-white rounded-2xl border-2 border-violet-200 shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <div className="flex flex-col justify-center align-middle items-center">
                <img
                  src={Logo}
                  className="h-16 w-fit justify-center align-middle items-center"
                  alt="Logo"
                />
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Welcome Back!
                </h1>
              </div>

              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Your email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
                <div className="flex items-center justify-between"></div>
                <button
                  type="submit"
                  className="w-full text-white bg-violet-500 hover:bg-voilet-700 focus:ring-4 focus:outline-none focus:ring-voilet-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Sign in
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
