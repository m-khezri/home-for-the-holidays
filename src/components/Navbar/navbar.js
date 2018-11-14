import './navbar.scss';
import $ from 'jquery';

const createNavbar = () => {
  const domString = `<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <a class="navbar-brand" href="#">Home for the Holidays</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav ml-auto">
      <li class="nav-item">
        <a id="navbar-button-auth" class="nav-link" href="#">Authentication</a>
      </li>
      <li class="nav-item">
      <a id="navbr-button-hollidays" class="nav-link" href="#">Hollidays</a>
    </li>
    <li class="nav-item">
    <a id="navbar-button-friends" class="nav-link" href="#">Friends</a>
  </li>
  <li class="nav-item">
  <a id="navbar-button-logout" class="nav-link" href="#">Logout</a>
</li>
    </ul>
  </div>
</nav>`;
  $('#navbar').html(domString);
};

export default createNavbar;
