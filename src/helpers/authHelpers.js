import firebase from 'firebase/app';
import 'firebase/auth';
import $ from 'jquery';

const checkLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      $('#friends').hide();
      $('#holidays').show();
      $('#auths').hide();
      $('#navbar-button-auth').hide();
      $('#navbar-button-holidays').show();
      $('#navbar-button-friends').show();
      $('#navbar-button-logout').show();
    } else {
      $('#friends').hide();
      $('#holidays').hide();
      $('#auths').show();
      $('#navbar-button-auth').show();
      $('#navbar-button-holidays').hide();
      $('#navbar-button-friends').hide();
      $('#navbar-button-logout').hide();
    }
  });
};

export default checkLoginStatus;
