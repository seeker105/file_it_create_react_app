import '../css/App.css';
import React from 'react';
import { Router, Switch, Route} from 'react-router-dom';
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
import FileUploadPage from '../components/FileUploadPage';
import LoadingPage from '../components/LoadingPage';

const AppRouter = (props) => (
  <div>
    <Router history={props.history}>
      <Switch>
        <Route path="/" component={LandingPage} exact={true}/>
        <Route path="/create-account" component={CreateAccountForm} />
        <Route path="/dashboard" component={DashboardPage} />
        <Route path="/sign-in-form" component={SignInForm} />
        <Route path="/profile-page" component={ProfilePage} />
        <Route path="/change-password-page" component={ChangePasswordPage} />
        <Route path="/change-email-page" component={ChangeEmailPage} />
        <Route path="/edit-profile-page" component={EditProfilePage} />
        <Route path="/reauthorization-form" component={ReauthorizationForm} />
        <Route path="/delete-account-page" component={DeleteAccountPage} />
        <Route path="/file-upload-page" component={FileUploadPage} />
        <Route path="/loading-page" component={LoadingPage} />
      </Switch>
    </Router>
  </div>
)

export default AppRouter;
