import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const User = () => {
    const router = useRouter();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [id, setID] = useState('');
    useEffect(() => {
      if(localStorage.getItem('access token') == null){
        alert('Please login first');
        router.push('/login');
        return;
      }
      return () => {
        axios.get('http://127.0.0.1:8000/api/user',{
            headers:{
                'Authorization': `Bearer ${localStorage.getItem('access token')}`,
                'Accept': 'application/json',
            }
        })
        .then(res => {
            const data = res.data;
            setID(data.id);
            setName(data.name);
            setEmail(data.email);
        })
        .catch(error => {
            alert(error);
        })
      }
    }, [])


    return (
        <div>
            <p>ID : {id}</p>
            <p>Name : {name}</p>
            <p>Email : {email}</p>
        </div>
    );
    
}

export default User;