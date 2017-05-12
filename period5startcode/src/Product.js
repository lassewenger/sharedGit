import React from "react"
import { Link } from "react-router"
import {observer} from "mobx-react"
import bookStore from "./models/bookStore";

@observer
export default class Product extends React.Component {
  constructor(props) {
    super(props);
    //this.props.route.bookStore.subscribe(this);
    //This will read books from the server each time user navigates to
    //The product page (a simple way to ensure "updated data")
    //this.props.route.bookStore.fetchBooks();
    this.nextID = 4;
    this.state = {
      addTitle: ''
    };
      
     this.handleChange = this.handleChange.bind(this);
  }
 
  /*dataReady = () =>{
    this.forceUpdate();
  }*/
  handleClick(id) {
    bookStore.deleteBook(id);
  }

  handleAdd() {
    bookStore.addBook({ "id": this.nextID++, "title": this.state.addTitle, "info": this.state.info, "moreInfo": this.state.moreInfo });
  }
  //editHandler(id){
    //bookStore.editBook(id);
  //} 

  handleChange(event) {
    this.setState({ addTitle: event.target.value });
  }

  render() {
    const books = this.props.route.bookStore.books;
    return (
      <div>
        <h3>All our great books </h3>
        <ul>
          {books.map((book) => <li key={book.id}>
            {book.title + " " + book.id} <Link to={`products/details/${book.id}`}>(details)</Link> 
            <button onClick={() => this.handleClick(book.id)} name="delete">Delete</button></li>)}
        </ul>
        <h3>Add a book</h3>
        Title:<input type="text" name="title" placeholder="Enter title here..." value={this.state.addTitle} onChange={this.handleChange} />
        <button onClick={() => this.handleAdd()}>Add</button>
        </div>
    )
  }
}
