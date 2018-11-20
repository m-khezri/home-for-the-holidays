import axios from 'axios';
import $ from 'jquery';
import apiKeys from '../../../db/apiKeys';
import authHelpers from '../../helpers/authHelpers';


const printStringFriend = (friend) => {
  const friendString = `
  <div class="card w-25 bg-light m-3 shadow">
    <h1 class="card-header display-3">${friend.name}</h1>
    <h3 class="">${friend.relationship}</h3>
    <p class="">${friend.address}</p>
    <p class="">${friend.email}</p>
    <p class="">${friend.phoneNumber}</p>
    <button card-footer class="btn btn-danger delete-btn" data-delete-id=${friend.id}>Close</button>
  </div>`;

  $('#single-container').html(friendString);
};

const getSingleFriend = (e) => {
  // firebase id
  const friendId = e.target.dataset.dropdownId;
  axios.get(`${apiKeys.firebaseKeys.databaseURL}/friends/${friendId}.json`)
    .then((result) => {
      const SingleFriend = result.data;
      SingleFriend.id = friendId;
      printStringFriend(SingleFriend);
    })
    .catch((error) => {
      console.log('error in getting friend', error);
    });
};

const buildDropdown = (friendsArray) => {
  let dropdown = `
  <div class="dropdown m-5">
  <button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    Friends List
  </button>
  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">`;
  if (friendsArray.length) {
    friendsArray.forEach((friend) => {
      dropdown += `<div class="dropdown-item" data-dropdown-id=${friend.id}>${friend.name}</div>`;
    });
  } else {
    dropdown += '<div class="dropdown-item"> You have no friends </div>';
  }

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


const deleteFriend = (e) => {
  // firebase id

  const idToDelete = e.target.dataset.deleteId;
  axios.delete(`${apiKeys.firebaseKeys.databaseURL}/friends/${idToDelete}.json`)
    .then(() => {
      friendsPage();
      $('#single-container').html('');
    })
    .catch((error) => {
      console.log('error in delteing friend', error);
    });
};


const bindEvents = () => {
  $('body').on('click', '.dropdown-item', getSingleFriend);
  $('body').on('click', '.delete-btn', deleteFriend);
};

const initializeFriendsPage = () => {
  friendsPage();
  bindEvents();
};


export default initializeFriendsPage;
