import React from 'react'
import { Route, Switch } from 'react-router-dom';
import LoginForm from './components/form/LoginForm';
import {AuthContextProvider} from './store/authContext';
import { Container, CssBaseline } from "@material-ui/core";
import UserList from './components/list/UserList';

function App() {
  return (
    <AuthContextProvider>
      <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Switch>
        <Route path='/' exact component={LoginForm} />
        <Route path='/welcome' component={UserList} />
      </Switch>
      </Container>
    </AuthContextProvider>
  );
}

export default App;
