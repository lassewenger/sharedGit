import React, {Component} from 'react';

export default class EditBook extends Component{
    constructor(props){
        super(props);
    }

    handleSubmit = (evt) => {
        evt.preventDefault();
        const target = evt.target
        var book = {}
        book.id = this.props.book.id
        book.title = target.title.value
        book.info = target.info.value
        book.moreInfo = target.moreInfo.value
        this.props.bookStore.editBook(book)
    }

    render(){
        return (
        <div>
            <h3>Edit book</h3>
            <form style={{ marginTop: 50 }} onSubmit={this.handleSubmit} >
            <div className="row">
                <div className="col-sm-2" >
                Title:
                </div>
                <div className="col-sm-4">
                <input type="text" id="title" />
                </div>
            </div>
            <div className="row">
                <div className="col-sm-2">
                Info:
                </div>
                <div className="col-sm-4">
                <input type="text" id="info" />
                </div>
                <div className="row">
                <div className="col-sm-2">
                MoreInfo:
                </div>
                <div className="col-sm-4">
                <input type="text" id="moreInfo" />
                </div>
                </div>
            </div>            
            <button className="btn">Save</button>
            </form>
        </div>
        );
    }
}