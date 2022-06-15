import { defaultMaxListeners } from 'events';
import { eventNames } from 'process';
import {useState, useEffect} from 'react';
import { useRouter } from 'next/router'
import Link from 'next/link';

const Login = () => {
    const router = useRouter()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if(localStorage.getItem('access token') != null){
          router.push('/');
          return;
        }
      }, [router])

    const submitLogin = async(event : any) => {
        event.preventDefault();
        // console.log({email,password});

        const res = await fetch('http://127.0.0.1:8000/api/login', {
            method: 'POST',
            body: JSON.stringify({email,password}),
            headers: {
                'Content-Type': 'application/json'
            },
        })
        if(res.status == 403) alert('Email,password incorrect')
        else{
            const data = await res.json();
            // console.log(data);

            localStorage.setItem('access token', data);

            router.push('/');
        }
        
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