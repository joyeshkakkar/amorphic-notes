import AmorphicDeserializer from './Deserealizer/AmorphicDeserializer';
import React, {Component} from 'react';
import {
    Grid, Navbar, Jumbotron, Button, ButtonToolbar
} from 'react-bootstrap';
import './App.css';
import Note from "./Components/Note";
import Notes from "./Components/Notes";

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            note: {},
            notesProp: [],
            isNotesLoaded: false,
            isCreateNote: false,
        };
        // this.handleClick = this.handleClick.bind(this);
        this.handleGetAllNotes = this.handleGetAllNotes.bind(this);
        this.handleCreateNote = this.handleCreateNote.bind(this);
    };

    // handleClick() {
    //     fetch('/api/v1/notes/get/5b7c7a02a4d7de21430a4fa1')
    //         .then(res => res.json())
    //         .then(obj => {
    //             const message = AmorphicDeserializer.deserialize(obj, {});
    //             // console.log(message);
    //             this.setState({note: message});
    //         });
    // }

    handleGetAllNotes() {
        this.setState({isNotesLoaded: true, isCreateNote: false});
        // console.log("In handleGetAllNotes");
    }

    handleCreateNote() {
        this.setState({isCreateNote: true, isNotesLoaded: false});
    }

    render() {
        return (
            <div>
                <Navbar inverse fixedTop>
                    <Grid>
                        <Navbar.Header>
                            <Navbar.Brand>
                                <a href="/">Notes App</a>
                            </Navbar.Brand>
                        </Navbar.Header>
                    </Grid>
                </Navbar>
                <Jumbotron>
                    <Grid>
                        <ButtonToolbar>
                            {/*<Button*/}
                                {/*bsStyle="warning"*/}
                                {/*bsSize="small"*/}
                                {/*onClick={this.handleClick}*/}
                            {/*>*/}
                                {/*Get Note*/}
                            {/*</Button>*/}

                            <Button
                                bsStyle="info"
                                bsSize="small"
                                onClick={this.handleGetAllNotes}
                            >
                                See Notes
                            </Button>

                            <Button
                                bsStyle="primary"
                                bsSize="small"
                                onClick={this.handleCreateNote}
                            >
                                Create Note
                            </Button>
                        </ButtonToolbar>
                    </Grid>
                </Jumbotron>
                {
                    this.state.isNotesLoaded
                        ? <Notes/>
                        : null
                }

                {
                    this.state.isCreateNote
                        ? <Note/>
                        : null
                }
            </div>
        );
    }
}
