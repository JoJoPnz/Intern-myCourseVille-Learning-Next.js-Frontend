import axios from "axios";

const LogoutHandler = () => {
    if(localStorage.getItem('access token') == null){
        alert('not login yet')
        return;
    }
    axios.get('http://127.0.0.1:8000/api/logout',{
        headers:{
            'Authorization': `Bearer ${localStorage.getItem('access token')}`,
            'Accept': 'application/json',
        }
    })
    .then(res => {
        const data = res.data;
        console.log(data); 
    })
    .catch(error => {
        alert(error)
    })
    localStorage.clear();
    alert('Logout Successful')
    return;
  }

  export default LogoutHandler;