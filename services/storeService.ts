import axios from 'axios';

export default class StoreService {
    public get allStores() {
        return async () => {
            const res = await axios.get('http://127.0.0.1:8000/api/stores',{
                headers:{
                    'Authorization': `Bearer ${localStorage.getItem('access token')}`,
                    'Accept': 'application/json',
                }
            })
            const stores = await res.data.AllStores;
            return stores;
        }
    }

    public async editStoreName(name: String, id: String) {
        await axios.patch(`http://127.0.0.1:8000/api/stores/${id}`, 
        {
            name
        },
        {
            headers:{
                'Authorization': `Bearer ${localStorage.getItem('access token')}`,
                'Accept': 'application/json',
            }
        })
    }

    public async addStore(name: String) {
        await axios.post(`http://127.0.0.1:8000/api/stores`, 
        {
            name
        },
        {
            headers:{
                'Authorization': `Bearer ${localStorage.getItem('access token')}`,
                'Accept': 'application/json',
            }
        })
    }

    public async deleteStore(id: String) {
        await axios.delete(`http://127.0.0.1:8000/api/stores/${id}`, 
        {
            headers:{
                'Authorization': `Bearer ${localStorage.getItem('access token')}`,
                'Accept': 'application/json',
            }
        }
        )
    }


}