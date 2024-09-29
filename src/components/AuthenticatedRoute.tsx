import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { getLocalStorageItem } from '../helper/functions';
import { setUser } from '../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';

interface AuthenticatedRouteProps {
  children: React.ReactNode;
}

const AuthenticatedRoute: React.FC<AuthenticatedRouteProps> = ({
  children,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector(
    (store: RootState) => store.user.authToken
  );
  const [isLocalStorageAuth, setIsLocalStorageAuth] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true); // Added loading state

  useEffect(() => {
    const localData = getLocalStorageItem('user');
    if (!localData) {
      setIsLocalStorageAuth(false);
      setLoading(false); // Update loading state
      return;
    }

    const parsedData = JSON.parse(localData);
    const userToken = parsedData.token;
    if (!userToken) {
      setIsLocalStorageAuth(false);
      setLoading(false); // Update loading state
      return;
    }

    dispatch(
      setUser({
        authToken: parsedData.token,
        userType: parsedData.userType,
        details: parsedData.details,
      })
    );
    setIsLocalStorageAuth(true);
    setLoading(false); // Update loading state
  }, [dispatch]);

  useEffect(() => {
    // Only navigate once the loading state is false and user is not authenticated
    if (!loading && !isAuthenticated && !isLocalStorageAuth) {
      navigate('/login');
    }
  }, [loading, isAuthenticated, isLocalStorageAuth, navigate]);

  // Show loading spinner or null until loading is complete
  if (loading) {
    return null; // You can replace this with a loading spinner or screen
  }

  // Return the children after loading and authentication checks
  return <>{children}</>;
};

export default AuthenticatedRoute;
