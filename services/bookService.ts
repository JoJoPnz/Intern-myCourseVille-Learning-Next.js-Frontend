import axios from 'axios';

export default class BookService {
    public async allBooks(id: String | undefined | String[]) {
        const res = await axios.get(`http://127.0.0.1:8000/api/stores/${id}`,{
            headers:{
                'Authorization': `Bearer ${localStorage.getItem('access token')}`,
                'Accept': 'application/json',
            }
        })
        const arrayBooks = await res.data.books;
        return arrayBooks;
    }

    public async editBookName(name: String, id: String) {
        await axios.patch(`http://127.0.0.1:8000/api/books/${id}`, 
        {
            name
        },
        {
            headers:{
                'Authorization': `Bearer ${localStorage.getItem('access token')}`,
                'Accept': 'application/json',
            }
        })
        .catch(error => {
            alert(error.response.data.message);
        })
    }

    public async addBook(name: String, book_type: String, store_id: String | undefined | String[], price: Number) {
        await axios.post(`http://127.0.0.1:8000/api/books`, 
        {
            name, book_type, store_id, price
        },
        {
            headers:{
                'Authorization': `Bearer ${localStorage.getItem('access token')}`,
                'Accept': 'application/json',
            }
        })
        .catch(error => {
            alert(error.response.data.message);
        })
    }

    public async deleteBook(id: String) {
        await axios.delete(`http://127.0.0.1:8000/api/books/${id}`, 
        {
            headers:{
                'Authorization': `Bearer ${localStorage.getItem('access token')}`,
                'Accept': 'application/json',
            }
        }
        )
        .catch(error => {
            alert(error.response.data.message);
        })
    }




}