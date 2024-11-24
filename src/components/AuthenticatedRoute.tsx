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
    (store: RootState) => store.user
  );
  const [loading, setLoading] = useState<boolean>(true); // Added loading state

  useEffect(() => {
    const localData = getLocalStorageItem('user');
    if (!localData) {
      setLoading(false); // Update loading state
      return;
    }

    const parsedData = JSON.parse(localData);
    const userToken = parsedData.token;
    if (!userToken) {
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
    setLoading(false); // Update loading state
  }, []);

  useEffect(() => {
    // Only navigate once the loading state is false and user is not authenticated
    if (!loading && !isAuthenticated.authToken) {
      navigate('/login');
    }
  }, [loading, isAuthenticated]);

  // Show loading spinner or null until loading is complete
  if (loading) {
    return null; // You can replace this with a loading spinner or screen
  }

  // Return the children after loading and authentication checks
  return <>{children}</>;
};

export default AuthenticatedRoute;
