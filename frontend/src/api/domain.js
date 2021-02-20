const CURRENT_SERVER = window.location.hostname === 'localhost'
  ? 'http://localhost:3000/api/v1/'
  : `${window.location.protocol}//${window.location.hostname}/api/v1/`;

export default CURRENT_SERVER;
