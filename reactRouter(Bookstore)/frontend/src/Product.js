import React from "react"
import { Link } from "react-router"
import {observer} from "mobx-react"
import bookStore from "./models/bookStore";
import NewBook from "./NewBook";

@observer
export default class Product extends React.Component {
  constructor(props) {
    super(props);
  }
 
  handleClick(id) {
    bookStore.deleteBook(id);
  }

 

  render() {
    const books = this.props.route.bookStore.books;

   var bookID = () =>{
    if(books.length === 0){
      return 1;
     }else{
       return books[books.length-1].id;
     }
    }
    return (
      <div>
        <h3>All our great books </h3>
        <ul>
          {books.map((book) => 
            <li key={book.id}>{book.title + " " + book.id} 
            <Link to={`products/details/${book.id}`}>(details)</Link> 
            <button onClick={() => this.handleClick(book.id)} name="delete">Delete</button>
            </li>)}
        </ul>    
        <NewBook bookStore={bookStore}  bookID={bookID} />
      </div>        
    )
  }
}
