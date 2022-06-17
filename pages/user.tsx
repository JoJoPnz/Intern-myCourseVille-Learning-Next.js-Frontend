import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { isUserLogin } from "../hooks/useAuth";
import Loading from "../components/loading";
import { useContainer } from "../services/containerProvider";

const User = () => {
    const router = useRouter();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [id, setID] = useState('');
    const [loadingState, setLoadingState] = useState(true);
    const {userService} = useContainer();

    useEffect(() => {
      if(!isUserLogin()){
        alert('Please login first');
        router.push('/login');
        return;
      }
      getUserInfo();   
    }, [router])

    const getUserInfo = async () => {
      const data = await userService.userInfo();
      setID(data.id);
      setName(data.name);
      setEmail(data.email);
      setLoadingState(false);
    }
    
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