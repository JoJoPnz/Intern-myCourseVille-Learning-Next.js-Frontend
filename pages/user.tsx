import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { isUserLogin } from "../hooks/useAuth";
import { userService } from "../services/container";
import Loading from "./loading";

const User = () => {
    const router = useRouter();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [id, setID] = useState('');
    const [loadingState, setLoadingState] = useState(true);
    useEffect(() => {
        
      if(!isUserLogin()){
        alert('Please login first');
        router.push('/login');
        return;
      }

      const getUserInfo = async () => {
        const data = await userService.userInfo();
        setID(data.id);
        setName(data.name);
        setEmail(data.email);
        setLoadingState(false);
      }
      
      getUserInfo();
      

    }, [router])

    if(loadingState) return <Loading/>;

    return (
        <div>
            <p>ID : {id}</p>
            <p>Name : {name}</p>
            <p>Email : {email}</p>
        </div>
    );
    
}

export default User;