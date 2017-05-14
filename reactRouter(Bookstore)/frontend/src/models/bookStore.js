//DataStore for this Demo
import {observable, useStrict, action} from "mobx"
useStrict(true);

const baseUrl = 'http://localhost:4000/api/';

class BookStore {

@observable _books = [];
  constructor() {
    this.fetchBooks();
  }
  get books() {
    return this._books;
  }

  @action
  changeBooks(books){
    this._books.replace(books);
  }

  @action
  addBook(book){
   // this._books.push(book);
   console.log(book)
    fetch(baseUrl+'book', {
      method: 'POST',
      headers: {
        'Accept': 'aplication/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "id": book.id,
        "title": book.title,
        "info": book.info,
        "moreInfo": book.moreInfo
      })
    }).then(() => {
      this.fetchBooks();
    })
    
  }

  @action
  deleteBook(id){
    /*this._books.splice(this._books.findIndex((b) => {return b.id === id}), 1);*/
    fetch(baseUrl+'book/'+id, {
      method: 'DELETE'
    }).then(() => {
      this.fetchBooks();
    })
      
    
}

  @action
  editBook(book){
    /*this._books[this._books.findIndex((b) => {return b.id === book.id})] = book;*/
    fetch(baseUrl+'book/'+book.id, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
       },
      body: JSON.stringify({
        "id": book.id,
        "title": book.title,
        "info": book.info,
        "moreInfo": book.moreInfo
      }),
     }).then(() => {
       this.fetchBooks();
     }).then(() => {
       this.getBook(book.id);
     })     
  }
  
  @action
  getBook(id) {    
    return this._books.filter((book) => {
      return book.id === Number(id);
    })[0];      
  }
  
  fetchBooks = ()=> {
    fetch(baseUrl+'books')
      .then((response) => {
        return response.json()
      })
      .then((response) => {
          this.changeBooks(response);
        console.log("Got books from server");
      })
  }
}

let store = new BookStore();

window.store = store;

export default store;
//export default new BookStore();