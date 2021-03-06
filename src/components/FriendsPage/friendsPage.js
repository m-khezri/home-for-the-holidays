import $ from 'jquery';
// import { auth } from 'firebase';
import authHelpers from '../../helpers/authHelpers';
import friendsData from '../../helpers/data/friendsData';
import holidayFriendsData from '../../helpers/data/holidayFriendsData';
import holidaysData from '../../helpers/data/holidaysData';

const holidayStringBuilder = (holidays) => {
  let holidayString = '<h3>Holidays:</h3>';
  holidays.forEach((holiday) => {
    holidayString += `<h5>${holiday.name} ${holiday.Date}</h5>`;
  });
  return holidayString;
};

const printSingleFriend = (friend, holidays) => {
  const friendString = `
  <div>
    <h2>${friend.name}</h2>
    <h3>${friend.relationship}</h3>
    <p>${friend.address}</p>
    <p>${friend.email}</p>
    <p>${friend.phoneNumber}</p>
    <div class="form-check form-check-inline">
      <input class="form-check-input" id="${friend.id}" type="checkbox" id="inlineCheckbox1">
      <label class="form-check-label" for="inlineCheckbox1">Am I avoiding them?</label>
      </div>
    <button class="btn btn-danger delete-btn" data-delete-id=${friend.id}>Delete friend</button>
    <button class="btn btn-secondary edit-btn" data-edit-id=${friend.id}>Edit friend</button>
    <div class="holiday-container">${holidayStringBuilder(holidays)}</div>
  </div>`;
  $('#single-container').html(friendString);
  if (friend.isAvoiding) {
    $('.is-avoiding-checkbox').attr('checked', true);
  }
};

const getSingleFriend = (e) => {
  // need firebase id
  const friendId = e.target.dataset.dropdownId;
  const uid = authHelpers.getCurrentUid();
  friendsData.getSingleFriend(friendId).then((singleFriend) => {
    // below functions are how we get the holidays to display on friend
    holidayFriendsData.getHolidayIdsForFriend(friendId).then((holidayIds) => {
      // console.log('holidayIds', holidayIds);
      // holidayIds is an array of all the holidays that the friend is attending
      holidaysData.getHolidaysByArrayOfIds(uid, holidayIds).then((holidays) => {
        printSingleFriend(singleFriend, holidays);
      });
    });
    // const holidayIds = ['holiday1'];
    // const holidays = ['a', 'b', 'c'];
  })
    .catch((error) => {
      console.error('error in getting one friend', error);
    });
};

const buildDropdown = (friendsArray) => {
  let dropdown = `
  <div class="dropdown">
    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      Select a friend
    </button>
    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">`;
  if (friendsArray.length) {
    friendsArray.forEach((friend) => {
      dropdown += `<div class="dropdown-item get-single" data-dropdown-id=${friend.id}>${friend.name}</div>`;
    });
  } else {
    dropdown += '<div class="dropdown-item">You have no friends.</div>';
  }
  dropdown += '</div></div>';
  $('#dropdown-container').html(dropdown);
};

const friendsPage = () => {
  const uid = authHelpers.getCurrentUid();
  friendsData.getAllFriends(uid)
    .then((friendsArray) => {
      buildDropdown(friendsArray);
    })
    .catch((error) => {
      console.error('error on friendsPage', error);
    });
};

const deleteFriend = (e) => {
  const idToDelete = e.target.dataset.deleteId;
  friendsData.deleteFriend(idToDelete)
    // dont need to pass in result because if delete is successful it, value = null
    .then(() => {
      friendsPage();
      $('#single-container').html('');
    })
    .catch((error) => {
      console.error('error on idToDelete', error);
    });
};

const updateIsAvoising = (e) => {
  const friendId = e.target.id;
  const isAvoiding = e.target.checked;
  friendsData.updateIsAvoiding(friendId, isAvoiding)
    .then(() => {

    })
    .catch((err) => {
      console.log('error in updating', err);
    });
};

const bindEvents = () => {
  $('body').on('click', '.get-single', getSingleFriend);
  $('body').on('click', '.delete-btn', deleteFriend);
  $('body').on('change', '.is-avoiding-checkbox', updateIsAvoising);
};

const initializeFriendsPage = () => {
  friendsPage();
  bindEvents();
};

export default initializeFriendsPage;
