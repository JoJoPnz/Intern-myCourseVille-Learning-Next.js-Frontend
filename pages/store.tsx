import axios from "axios";
import { useRouter } from "next/router"
import { useEffect,useState } from "react"
import { isUserLogin } from "../hooks/useAuth";
import { storeService } from "../services/container";
import Loading from "../components/loading";

const Store = () => {
    const [stores, setStores] = useState<any[]>([]);
    const [loadingState, setLoadingState] = useState(true);
    const [newStoreName, setNewStoreName] = useState('');
    const router = useRouter();
    useEffect(() => {
        if(!isUserLogin()){
            router.push('/login');
            return;
        }
        getAllStores();
    }, [router])

    const getAllStores = async() => {
        setLoadingState(true);
        const allStores = await storeService.allStores();
        setStores(allStores);
        setLoadingState(false);
    }
    
    const editStoreName = async(e : any) => {
        e.preventDefault();
        const name = e.target.previousSibling.value;
        const id = e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.innerHTML;
        // const i = e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.innerHTML;
        await storeService.editStoreName(name,id);
        getAllStores();
    }

    const addStore = async (e : any) => {
        e.preventDefault();
        e.target.reset();
        await storeService.addStore(newStoreName);
        getAllStores();
    }

    const deleteStore = async (e : any) => {
        const id = e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.innerHTML;
        storeService.deleteStore(id);
        getAllStores();
    }


    if(loadingState){
        return <Loading/>
    }
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

export default Store;