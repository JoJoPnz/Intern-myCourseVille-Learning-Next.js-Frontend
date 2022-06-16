import axios from 'axios';
import AuthService from './authService';
import useSWR from 'swr'

// const fetcher = (...args) => fetch(...args).then((res) => res.json())

export default class UserService {
    private authService : AuthService;

    constructor(authService : AuthService){
        this.authService = authService;
    }
    public get userInfo() {
        // const {data, error} = useSWR('http://127.0.0.1:8000/api/user')
        return async () => {
            const res = await axios.get('http://127.0.0.1:8000/api/user',{
                headers:{
                    'Authorization': `Bearer ${localStorage.getItem('access token')}`,
                    'Accept': 'application/json',
                }
            })
            const data = await res.data;
            return data;
        }
    }
}