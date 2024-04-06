import './App.css';
import { useEffect } from 'react';
import Activate from './pages/Activate/Activate';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home/Home';
import Navigation from './components/shared/Navigation/Navigation';
import Authenticate from './pages/Authenticate/Authenticate';
import { Children } from 'react';
import Rooms from './pages/Rooms/Rooms';
import Room from './pages/Room/Room';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useLoadingWithRefresh } from './hooks/useLoadingWithRefresh';
import { Loader } from './components/shared/Loader/Loader';



function App() {
    //call refresh end point to get the user data
    const { loading } = useLoadingWithRefresh();

    return loading ? (
        <Loader message = "Loading Please wait!"/>
    ) : (
      <BrowserRouter>
          <Navigation />
          <Routes>
              <Route path="/" element={<GuestRoute><Home /></GuestRoute>} />
              <Route path="/authenticate" element={<GuestRoute><Authenticate /></GuestRoute>} />
              <Route path="/activate" element={<SemiProtectedRoute><Activate /></SemiProtectedRoute>} />
              <Route path="/rooms" element={<ProtectedRoute><Rooms /></ProtectedRoute>} />
              <Route path="/room/:id" element={<ProtectedRoute><Room /></ProtectedRoute>} />
          </Routes>
      </BrowserRouter>
  );
}

const GuestRoute = ({ children }) => {
  const { isAuth } = useSelector((state) => state.auth);
  const location = useLocation();

  return isAuth ? <Navigate to="/rooms" state={{ from: location }} replace /> : children;
};

const SemiProtectedRoute = ({ children }) => {
  const { user, isAuth } = useSelector((state) => state.auth);
  const location = useLocation();

  if (!isAuth) {
      return <Navigate to="/" state={{ from: location }} replace />;
  } else if (isAuth && !user.activated) {
      return children;
  } else {
      return <Navigate to="/rooms" state={{ from: location }} replace />;
  }
};

const ProtectedRoute = ({ children }) => {
  const { user, isAuth } = useSelector((state) => state.auth);
  const location = useLocation();

  if (!isAuth) {
      return <Navigate to="/" state={{ from: location }} replace />;
  } else if (isAuth && !user.activated) {
      return <Navigate to="/activate" state={{ from: location }} replace />;
  } else {
      return children;
  }
};


export default App;
