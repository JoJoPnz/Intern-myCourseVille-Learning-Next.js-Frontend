import { isUserLogin } from './../hooks/useAuth';
import axios from 'axios';

export default class AuthService {
    public async login(email : String, password : String) {
        const res = await axios.post('http://127.0.0.1:8000/api/login',
        {
            email,
            password
        },
        {
            headers:{
                'Authorization': `Bearer ${localStorage.getItem('access token')}`,
                'Accept': 'application/json',
            }
        })
        const data = await res.data;
        localStorage.setItem('access token', data);
        return data;
    }

    public async logout(){
        console.log('aaaa');
        
        if(!isUserLogin()){
            alert('not login yet')
            return;
        }
        const res = await axios.get('http://127.0.0.1:8000/api/logout',{
            headers:{
                'Authorization': `Bearer ${localStorage.getItem('access token')}`,
                'Accept': 'application/json',
            }
        })
        const data = await res.data;
        console.log(data);
        
        localStorage.clear();
        alert(data);
        location.reload();
        return;
    }


}