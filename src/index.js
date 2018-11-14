// import $ from 'jquery';
import firebase from 'firebase/app';
import apiKeys from '../db/apiKeys.json';
import 'bootstrap';
import './index.scss';
import createNavbar from './components/Navbar/navbar';
import loginButton from './components/Auth/Auth';
import checkLoginStatus from './helpers/authHelpers';

const initilizerApp = () => {
  firebase.initializeApp(apiKeys.firebaseKeys);
  createNavbar();
  checkLoginStatus();
  loginButton();
};

initilizerApp();
