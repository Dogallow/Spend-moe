import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import RequestForm from './components/RequestForm';
import UserTransactions from './components/Transactions/UserTransactions';
import Incomplete from './components/Incomplete';
import Posts from './components/Posts';
import './app.css'
import {Deposit, Withdraw} from './components/Transfer';
import SinglePost from './components/Posts/SinglePost'


function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <Route path='/form' exact={true} >
          <RequestForm />
        </Route>
        <Route path='/' exact={true} >
          <Posts />
        </Route>
        <Route path='/user-transactions' exact={true} >
          <UserTransactions />
        </Route>
        <Route path='/incomplete' exact={true} >
          <Incomplete />
        </Route>
        <Route path='/transfer/deposit' exact={true} >
          <Deposit />
        </Route>
        <Route path='/transfer/withdraw' exact={true} >
          <Withdraw />
        </Route>
        
      </Switch>
    </BrowserRouter>
  );
}

export default App;
