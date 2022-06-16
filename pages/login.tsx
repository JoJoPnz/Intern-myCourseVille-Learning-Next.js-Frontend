import {useState, useEffect} from 'react';
import { useRouter } from 'next/router'
import { isUserLogin } from '../hooks/useAuth';
import { authService } from '../services/container';

const Login = () => {
    const router = useRouter()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if(isUserLogin()){
          router.push('/');
          return;
        }
      }, [router])

    const submitLogin = async(event : any) => {
        event.preventDefault();
        authService.login(email,password);
        router.push('/');
    }

    return (
        <div>
            <h1>LOGIN</h1>
            <form onSubmit={submitLogin}>
                <label>Email:</label>
                <input type="email" onChange={(e)=>setEmail(e.target.value)}/><br/>
                <label>Password:</label>
                <input type="password" onChange={(e)=>setPassword(e.target.value)}/><br/>
                <input type="submit" value="Submit"/>
            </form>
            <br/>
            <br/>
        </div>
    );
}

export default Login;