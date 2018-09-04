import axios from "axios/index";
import {
    Button, ButtonToolbar, FormGroup, FormControl, DropdownButton,
    MenuItem, Col
} from 'react-bootstrap';
import React from 'react';

export default class Note extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            type: '',
            message: '',
        };
        this.handleStateChange = this.handleStateChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    handleSubmit(event) {
        event.preventDefault();
        axios.post('/api/v1/notes/create', {
            message: this.state.message,
            title: this.state.title
        })
            .then(function (response) {
                // console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    handleStateChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    render() {
        return (
            <div>
                <form>
                    <FormGroup
                        controlId="formBasicText"
                    >
                        <Col sm={10}>
                            <FormControl
                                type="text"
                                placeholder="Title"
                                bsSize="sm"
                                name="title"
                                value={this.state.title}
                                onChange={this.handleStateChange}
                            />
                            {/*<ButtonToolbar>*/}
                                {/*<DropdownButton*/}
                                    {/*bsSize="small"*/}
                                    {/*bsStyle="info"*/}
                                    {/*name="type"*/}
                                    {/*title="Type"*/}
                                    {/*id="noteType"*/}
                                    {/*value={this.state.type}*/}
                                    {/*onChange={this.handleStateChange}*/}
                                {/*>*/}
                                    {/*<MenuItem eventKey="1">To Do</MenuItem>*/}
                                    {/*<MenuItem eventKey="2">Reminder</MenuItem>*/}
                                    {/*<MenuItem divider/>*/}
                                    {/*<MenuItem eventKey="3">Article</MenuItem>*/}
                                    {/*<MenuItem eventKey="4">Other</MenuItem>*/}
                                {/*</DropdownButton>*/}
                            {/*</ButtonToolbar>*/}
                            <FormControl
                                type="text"
                                name="message"
                                bsSize="sm"
                                placeholder="Note"
                                value={this.state.message}
                                onChange={this.handleStateChange}
                            />
                            <Button bsSize="sm" type="submit" onClick={this.handleSubmit}>Submit</Button>
                        </Col>
                    </FormGroup>
                </form>
            </div>
        );
    }
}