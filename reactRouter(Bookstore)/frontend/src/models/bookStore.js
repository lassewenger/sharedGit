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
    this._books.push(book);
  }

  @action
  deleteBook(id){
    /*this._books.splice(this._books.findIndex((b) => {return b.id === id}), 1);*/

    fetch(baseUrl+'book/'+id, {
      method: 'DELETE'
    }).then(response => 
      response.json().then(json =>{
        return json;
      })
    );    
}

  @action
  editBook(book){
    this._books[this._books.findIndex((b) => {return b.id === book.id})] = book;
  }
  
  @action
  getBook(id) {
    return this._books.filter((book) => {
      return book.id === Number(id);
    })[0];

   /*var self = this;

    fetch(baseUrl+'book/'+id)
      .then((response) => {
        return response.json();        
      })
      .then((json)=>{
        self.book = json;
        console.log(self.book);
      })

      return self.book;*/
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