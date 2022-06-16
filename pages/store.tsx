import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router"
import { useEffect,useState } from "react"
import Loading from "./loading";

const Store = () => {
    const [stores, setStores] = useState<any[]>([]);
    const [loadingState, setLoadingState] = useState(true);
    const [newStoreName, setNewStoreName] = useState('');
    const router = useRouter();
    useEffect(() => {
        console.log("USE EFFECT");
        
      if(localStorage.getItem('access token') == null){
        router.push('/login');
        return;
      }
      else{
          return () => {
            axios.get('http://127.0.0.1:8000/api/stores',{
                headers:{
                    'Authorization': `Bearer ${localStorage.getItem('access token')}`,
                    'Accept': 'application/json',
                }
            })
            .then(res => {
                const data = res.data;
                // console.log(data); 
                setStores(data.AllStores);
                setLoadingState(false);
            })
            .catch(error => {
                alert(error.message);
                router.push('/login')
            })
          }

      }
    }, [router])

    const editStoreName = (e : any) => {
        e.preventDefault();
        const name = e.target.previousSibling.value;
        const id = e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.innerHTML;
        const i = e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.innerHTML;
        axios.patch(`http://127.0.0.1:8000/api/stores/${id}`, 
        {
            name
        },
        {
            headers:{
                'Authorization': `Bearer ${localStorage.getItem('access token')}`,
                'Accept': 'application/json',
            }
        })
        .then(res => {
            // location.reload();
            let newStores = [...stores];
            newStores[i].name = name;
            setStores(newStores);
        })
        .catch(error =>{
            alert(error);
        })
        

    }

    const addStore = async (e : any) => {
        e.preventDefault();
        e.target.reset();
        console.log(newStoreName);
        
        await axios.post(`http://127.0.0.1:8000/api/stores`, 
        {
            name : newStoreName
        },
        {
            headers:{
                'Authorization': `Bearer ${localStorage.getItem('access token')}`,
                'Accept': 'application/json',
            }
        })
        const res = await axios.get('http://127.0.0.1:8000/api/stores',{
            headers:{
                'Authorization': `Bearer ${localStorage.getItem('access token')}`,
                'Accept': 'application/json',
            }
        })
        setStores(res.data.AllStores);
    }

    const deleteStore = async (e : any) => {
        const id = e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.innerHTML;
        await axios.delete(`http://127.0.0.1:8000/api/stores/${id}`, 
        {
            headers:{
                'Authorization': `Bearer ${localStorage.getItem('access token')}`,
                'Accept': 'application/json',
            }
        }
        )
        const res = await axios.get('http://127.0.0.1:8000/api/stores',{
            headers:{
                'Authorization': `Bearer ${localStorage.getItem('access token')}`,
                'Accept': 'application/json',
            }
        })
        setStores(res.data.AllStores);
    }


    if(loadingState){
        return <Loading/>
    }
    else{

        return(
            
            <div>
            <table className="table table-striped">
        <thead>
            <tr>
            <th scope="col">#</th>
            <th scope="col">StoreID</th>
            <th scope="col">StoreName</th>
            <th scope="col">ViewBook</th>
            <th scope="col">EditStoreName</th>
            <th scope="col">DELETE store</th>
            </tr>
        </thead>
        <tbody>
        {stores.map((store : any, i) => {
            return (
                <tr key={store.id}>
                            <th scope="row">{i}</th>
                            <td>{store.id}</td>
                            <td>{store.name}</td>
                            <td><button>view</button></td>
                            <td>
                                <input type='text'></input>
                                <button onClick={editStoreName}>Submit</button>
                            </td>
                            <td><button onClick={deleteStore}>delete</button></td>
                        </tr>)
                })}
        </tbody>
        </table>

        <form onSubmit={addStore}>
            <label>Create Store name:</label>
            <input type="text" onChange={(e)=>setNewStoreName(e.target.value)}/><br/>
            <input type="submit" value="Submit"/>
        </form>


        </div>
    )
}
    
}

export default Store;