import axios from 'axios';
import apiKeys from '../../../db/apiKeys.json';

const firebaseUrl = apiKeys.firebaseKeys.databaseURL;

const getAllFriends = (uid) => new Promise((resolve, reject) => {
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
      resolve(friendsArray);
    })
    .catch((error) => {
      console.error('error in getting friends', error);
    });
};

const getSingleFriend = friendId => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/friends/${friendId}.json`)
    .then((result) => {
      const SingleFriend = result.data;
      SingleFriend.id = friendId;
      resolve(SingleFriend);
    })
    .catch((error) => {
      reject(error);
    });
});

const deleteFriend = (friendId) => {
  console.log(friendId);
};


export default {
  getAllFriends,
  getSingleFriend,
  deleteFriend,
};
