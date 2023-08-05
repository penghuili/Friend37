import { Spinner } from 'grommet';
import React from 'react';
import { Redirect, Route, Switch } from 'wouter';

import HorizontalCenter from '../shared/react-pure/HorizontalCenter';
import ChangePassword from '../shared/react/ChangePassword';
import Security from '../shared/react/Security';
import Setup2FA from '../shared/react/Setup2FA';
import SignIn from '../shared/react/SignIn';
import SignUp from '../shared/react/SignUp';
import Verify2FA from '../shared/react/Verify2FA';
import Account from '../views/Account';
import ActivityAdd from '../views/ActivityAdd';
import ActivityUpdate from '../views/ActivityUpdate';
import Encryption from '../views/Encryption';
import FriendAdd from '../views/FriendAdd';
import FriendDetails from '../views/FriendDetails';
import Friends from '../views/Friends';
import FriendsReorder from '../views/FriendsReorder';
import FriendUpdate from '../views/FriendUpdate';
import Privacy from '../views/Privacy';
import TodoAdd from '../views/TodoAdd';
import TodoUpdate from '../views/TodoUpdate';
import Welcome from '../views/Welcome';

function Router({ isCheckingRefreshToken, isLoggedIn }) {
  if (isCheckingRefreshToken) {
    return (
      <HorizontalCenter justify="center" margin="3rem 0 0">
        <Spinner size="large" />
      </HorizontalCenter>
    );
  }

  if (isLoggedIn) {
    return (
      <Switch>
        <Route path="/friends/add" component={FriendAdd} />
        <Route path="/friends/reorder" component={FriendsReorder} />
        <Route path="/friends/:friendId" component={FriendDetails} />
        <Route path="/friends/:friendId/update" component={FriendUpdate} />
        <Route path="/friends/:friendId/todos/add" component={TodoAdd} />
        <Route path="/friends/:friendId/todos/:todoId/update" component={TodoUpdate} />
        <Route path="/friends/:friendId/activities/add" component={ActivityAdd} />
        <Route path="/friends/:friendId/activities/:activityId/update" component={ActivityUpdate} />
        <Route path="/friends" component={Friends} />

        <Route path="/account" component={Account} />
        <Route path="/security" component={Security} />
        <Route path="/security/2fa" component={Setup2FA} />
        <Route path="/security/password" component={ChangePassword} />

        <Route path="/encryption" component={Encryption} />
        <Route path="/privacy" component={Privacy} />

        <Route path="/" component={Friends} />
        <Route>{() => <Redirect to="/" />}</Route>
      </Switch>
    );
  }

  return (
    <Switch>
      <Route path="/sign-up" component={SignUp} />
      <Route path="/sign-in" component={SignIn} />
      <Route path="/sign-in/2fa" component={Verify2FA} />

      <Route path="/encryption" component={Encryption} />
      <Route path="/privacy" component={Privacy} />

      <Route path="/" component={Welcome} />
      <Route>{() => <Redirect to="/" />}</Route>
    </Switch>
  );
}

export default Router;
