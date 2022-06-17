import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import Loading from '../../components/loading';
import { isUserLogin } from '../../hooks/useAuth';
import { useContainer } from '../../services/containerProvider';

const ShowBooks = () => {
    const router = useRouter();
    const { store_id } = router.query;
    
    const [books, setBooks] = useState([]);
    const [bookName, setBookName] = useState('');
    const [bookType, setBookType] = useState('');
    const [bookPrice, setBookPrice] = useState(0);
    const [loadingState, setLoadingState] = useState(true);
    const {bookService} = useContainer();

    useEffect(() => {
        if(!isUserLogin()){
            router.push('/login');
            return;
        }
        getAllBooks();
    }, [router])

    const getAllBooks = async() => {
        setLoadingState(true);
        const allBooks = await bookService.allBooks(store_id);
        setBooks(allBooks);
        setLoadingState(false);
    }

    const editBookName = async(e : any) => {
        e.preventDefault();
        const name = e.target.previousSibling.value;
        const id = e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.innerHTML;
        await bookService.editBookName(name,id);
        getAllBooks();
    }
    
    const deleteBook = async(e : any) => {
        e.preventDefault();
        const id = e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.innerHTML;
        await bookService.deleteBook(id);
        getAllBooks();
    }

    const addBook = async(e: any) => {  
        e.preventDefault();
        e.target.reset();
        await bookService.addBook(bookName, bookType, store_id, bookPrice);
        getAllBooks();
    }

    if(loadingState) return <Loading/>;

    return (
        <div>
        <table className="table table-striped">
    <thead>
        <tr>
        <th scope="col">#</th>
        <th scope="col">BookID</th>
        <th scope="col">BookName</th>
        <th scope="col">BookType</th>
        <th scope="col">Price</th>
        <th scope="col">EditBookName</th>
        <th scope="col">DELETE book</th>
        </tr>
    </thead>
    <tbody>
    {books.map((book : any, i) => {
        return (
            <tr key={book.id}>
                        <th scope="row">{i}</th>
                        <td>{book.id}</td>
                        <td>{book.name}</td>
                        <td>{book.book_type_id}</td>
                        <td>{book.price}</td>
                        <td>
                            <input type='text'></input>
                            <button onClick={editBookName}>Submit</button>
                        </td>
                        <td><button onClick={deleteBook}>delete</button></td>
                    </tr>)
            })}
    </tbody>
    </table>

    <form onSubmit={addBook}>
        <label>Create Book name:</label>
        <input type="text" onChange={(e)=>setBookName(e.target.value)}/><br/>
        <label>book_type :</label>
        <input type="text" placeholder='fantasy / drama' onChange={(e)=>setBookType(e.target.value)}/><br/>
        <label>book price</label>
        <input type="number" onChange={(e)=>setBookPrice(Number(e.target.value))}/><br/>
        <input type="submit" value="Submit"/>
    </form>


    </div>
    );
}

export default ShowBooks;