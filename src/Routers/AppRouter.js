import '../css/App.css';
import React from 'react';
import { Router, Switch, Route} from 'react-router-dom';
import PrivateRoute from '../Routers/PrivateRoute';
import LandingPage from '../components/LandingPage';
import CreateAccountForm from '../components/CreateAccountForm';
import DashboardPage from '../components/DashboardPage';
import SignInForm from '../components/SignInForm';
import ProfilePage from '../components/ProfilePage';
import ChangePasswordPage from '../components/ChangePasswordPage';
import ChangeEmailPage from '../components/ChangeEmailPage';
import EditProfilePage from '../components/EditProfilePage';
import ReauthorizationForm from '../components/ReauthorizationForm';
import DeleteAccountPage from '../components/DeleteAccountPage';
import LoadingPage from '../components/LoadingPage';
import AccountTypeSelectionPage from '../components/AccountTypeSelectionPage';
import CheckoutPage from '../components/CheckoutPage';
import OrderConfirmationPage from '../components/OrderConfirmationPage';

const AppRouter = (props) => (
  <div>
    <Router history={props.history}>
      <Switch>
        <Route path="/" component={LandingPage} exact={true}/>
        <Route path="/create-account" component={CreateAccountForm} />
        <Route path="/sign-in-form" component={SignInForm} />
        <Route path="/loading-page" component={LoadingPage} />
        <PrivateRoute path="/dashboard" component={DashboardPage} />
        <PrivateRoute path="/profile-page" component={ProfilePage} />
        <PrivateRoute path="/change-password-page" component={ChangePasswordPage} />
        <PrivateRoute path="/change-email-page" component={ChangeEmailPage} />
        <PrivateRoute path="/edit-profile-page" component={EditProfilePage} />
        <PrivateRoute path="/reauthorization-form" component={ReauthorizationForm} />
        <PrivateRoute path="/delete-account-page" component={DeleteAccountPage} />
        <PrivateRoute path="/select-account-type" component={AccountTypeSelectionPage} />
        <PrivateRoute path="/checkout" component={CheckoutPage} />
        <PrivateRoute path="/order-confirmation-page" component={OrderConfirmationPage} />
      </Switch>
    </Router>
  </div>
)

export default AppRouter;
