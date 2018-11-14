import './Auth.scss';
import $ from 'jquery';
import firebase from 'firebase/app';
import 'firebase/auth';

const loginbutton = () => {
  const domString = `
  <button id="google-auth" class="btn btn-secondary">Login</button>
  `;
  $('#auth').html(domString);
  $('#google-auth').on('click', () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  });
};

export default loginbutton;
