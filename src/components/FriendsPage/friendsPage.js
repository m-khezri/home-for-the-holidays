import axios from 'axios';
import apiKeys from '../../../db/apiKeys';
import authHelpers from '../../helpers/authHelpers';

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
      console.log(friendsArray);
    })
    .catch((error) => {
      console.error('error in getting friends', error);
    });
};

export default friendsPage;
