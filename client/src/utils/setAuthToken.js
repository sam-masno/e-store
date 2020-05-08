import axios from 'axios';

//set axios headers for private routes if token present,if not delete auth header
const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    // console.log(axios.defaults.headers.common['Authorization'])
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
  // console.log(`set token ${token}`)
}

export default setAuthToken;