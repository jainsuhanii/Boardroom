import './App.css';
import { useEffect } from 'react';
import Activate from './pages/activate/activate';
import { BrowserRouter, Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import Home from './pages/Home/Home';
import Navigation from './components/shared/Navigation/Navigation';
import Authenticate from './pages/Authenticate/Authenticate';
import { Children } from 'react';
import Rooms from './pages/Rooms/Rooms';
const isAuth = false;
const user = {
  activated: false,
};

function App() {
  return (
    <BrowserRouter>
      <Navigation/>
      <Routes>
        <Route path = "/" element={
         <GuestRoute>
            <Home/>
          </GuestRoute>
        }/>
        
        <Route path = "/authenticate" element={
          <GuestRoute>
            <Authenticate/>
          </GuestRoute>
        }/>

        <Route path = "/activate" element={
          <SemiProtectedRoute>
            <Activate/>
          </SemiProtectedRoute>}/>
        
        <Route path = "/rooms" element={
          <ProtectedRoute>
            <Rooms/>
          </ProtectedRoute>
        
        }/>
      </Routes>
    </BrowserRouter>
  );
}


const GuestRoute  = ({children}) => {
    if(isAuth){
      return (
        <Navigate to="/rooms"/>
      )
    }
    else{
      return children
    }
}

const SemiProtectedRoute  = ({children}) => {
    if(!isAuth){
      return (
        <Navigate to="/"/>
      )
    }
    else{
      if(!user.activated){
        return children
      }else{
        return(
          <Navigate to="/rooms"/>
        )
      }
    }
}

const ProtectedRoute  = ({children}) => {
    if(!isAuth){
      return (
        <Navigate to="/"/>
      )
    }
    else{
      if(!user.activated){
        return(
          <Navigate to="/activate"/>
        )
      }else{
        return children
      }
    }
}

export default App;
