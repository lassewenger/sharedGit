//DataStore for this Demo
import {observable, useStrict, action} from "mobx"
useStrict(true);

class BookStore {

@observable _books = [];
  constructor() {
    //this._books = [];
    this.fetchBooks();
    //this._observer = null;
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
    this._books.splice(this._books.findIndex((b) => {return b.id === id}), 1);
  }
  /*subscribe(observer) {
    this._observer = observer;
  }*/

  getBook(id) {
    return this._books.filter((book) => {
      return book.id === Number(id);
    })[0];
  }

  fetchBooks = ()=> {
    fetch("http://localhost:7777/books")
      .then((response) => {
        return response.json()
      })
      .then((response) => {
          this.changeBooks(response);
        //this._books = response;
        console.log("Got books from server");
        /*if (this._observer) {
          this._observer.dataReady();
        }*/
      })
  }
}

let store = new BookStore();

window.store = store;

export default store;
//export default new BookStore();