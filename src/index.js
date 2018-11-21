import firebase from 'firebase/app';
import 'bootstrap';
import $ from 'jquery';

import apiKeys from '../db/apiKeys.json';

import createNavbar from './components/Navbar/navbar';
import loginButton from './components/Auth/Auth';
import authHelpers from './helpers/authHelpers';
import friendsPage from './components/FriendsPage/friendsPage';
import showAddForm from './components/AddEditFriends/addEditFriends';

import './index.scss';

const initializeApp = () => {
  firebase.initializeApp(apiKeys.firebaseKeys);
  createNavbar();
  authHelpers.checkLoginStatus(friendsPage);
  loginButton();
  $('#show-friend-form').on('click', showAddForm);
};

initializeApp();
