import $ from 'jquery';
import authHelpers from '../../helpers/authHelpers';

const formBuilder = () => {
  const form = `
  <div class="form-group">
    <label for="form-friend-name">Name</label>
    <input type="text" class="form-control" id="form-friend-name" placeholder="John Smith">
  </div>
  <div class="form-group">
  <label for="form-friend-address">Address</label>
  <input type="text" class="form-control" id="form-friend-address" placeholder="500 Interstate">
  </div>
  <div class="form-group">
  <label for="form-friend-email">Relationship</label>
  <input type="text" class="form-control" id="form-friend-email" placeholder="fake@person.com">
</div>
  <div class="form-group">
  <label for="form-friend-phone">Relationship</label>
  <input type="text" class="form-control" id="form-friend-phone" placeholder="555-444-3333">
</div>
  <div class="form-group">
  <label for="form-friend-relationship">Relationship</label>
  <input type="text" class="form-control" id="form-friend-relationship" placeholder="I don't know">
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
  `;

  return form;
};

const gettingFriendFormForm = () => {
  const friend = {
    name: $('#form-friend-name').val(),
    address: $('#form-friend-address').val(),
    email: $('#form-friend-email').val(),
    phone: $('#form-friend-phone').val(),
    relationship: $('#form-friend-relationship').val(),
    isAvoiding: false,
    uid: authHelpers.getCurrentUid(),
  };
  console.log(friend);
};
export default { formBuilder, gettingFriendFormForm };
