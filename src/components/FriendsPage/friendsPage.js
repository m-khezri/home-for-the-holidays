import axios from 'axios';
import $ from 'jquery';
import apiKeys from '../../../db/apiKeys';
import authHelpers from '../../helpers/authHelpers';
import friendsData from '../../helpers/data/friendsData';

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
  friendsData.getSingleFriend(friendId) // from the friendsData.js
    .then((singleFriend) => {
      printStringFriend(singleFriend);
    })
    .catch((error) => {
      console.error('error in getting one friend', error);
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
