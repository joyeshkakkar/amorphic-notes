import {
    Table, Glyphicon
} from 'react-bootstrap';
import axios from "axios/index";
import React from 'react';

export default class Notes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            notes: [],
        };
        this.deleteNote = this.deleteNote.bind(this);
        this.getAllNotes = this.getAllNotes.bind(this);
    };


    getAllNotes() {
        fetch('/api/v1/notes/getAll')
            .then(res => res.json())
            .then(notesArr => {
                this.setState({notes: notesArr});
            });
    }

    componentDidMount() {
        this.getAllNotes();
    }


    deleteNote(key, event) {
        event.preventDefault();
        const getAllNotes = this.getAllNotes;
        axios.delete('/api/v1/notes/delete/'+key)
            .then(function (response) {
                // console.log(response);
                getAllNotes();
            })
            .catch(function (error) {
                console.log(error);
            });
    }


    render(){
        const deleteNote = this.deleteNote;
        return (
            <div>
                <Table striped bordered condensed hover responsive>
                    <thead>
                    <tr>
                        <th>Title</th>
                        <th>Message</th>
                        <th>Author</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.notes.map(function (item, key) {
                        return (
                            <tr key={key}>
                                <td>{item.title}</td>
                                <td>{item.message}</td>
                                <td>author</td>
                                <td>
                                    <Glyphicon glyph="trash" onClick={(event) => deleteNote(item._id, event)}/>
                                </td>
                            </tr>
                        )
                    })}
                    </tbody>
                </Table>
            </div>
        );
    }
}
