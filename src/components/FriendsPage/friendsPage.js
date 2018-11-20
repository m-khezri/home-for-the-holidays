import axios from 'axios';
import $ from 'jquery';
import apiKeys from '../../../db/apiKeys';
import authHelpers from '../../helpers/authHelpers';

const buildDropdown = (friendsArray) => {
  let dropdown = `
  <div class="dropdown">
  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    Dropdown button
  </button>
  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">`;
  friendsArray.forEach((friend) => {
    dropdown += `<div class="dropdown-item">${friend.name}</div>`;
  });
  dropdown += '</div></div>';
  $('#dropdown-container').html(dropdown);
};


const friendsPage = () => {
  const uid = authHelpers.getCurrentUid();
  axios.get(`${apiKeys.firebaseKeys.databaseURL}/friends.json?orderBy="uid"&equalTo="${uid}"`)
    .then((results) => {
      const friendObject = results.data;
      const friendsArray = [];
      if (friendObject != null) {
        Object.keys(friendObject).forEach((friendId) => {
          friendObject[friendId].id = friendId;
          friendsArray.push(friendObject[friendId]);
        });
      }
      buildDropdown(friendsArray);
    })
    .catch((error) => {
      console.error('error in getting friends', error);
    });
};

export default friendsPage;
