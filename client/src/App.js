import AmorphicDeserializer from './AmorphicDeserializer';
import React, {Component} from 'react';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            note: {},
        };
    };

    componentDidMount() {
        fetch('/api/v1/notes/get/5b58d77dc945c881e45fe0a7')
            .then(res => res.json())
            .then(obj => {
                const note = AmorphicDeserializer.deserialize(obj, {});
                this.setState({note});
                console.log(note);
                console.log(note.message);
            });
    }

    render() {
        return (
            <div className="App">
                <h1>Note</h1>
                {
                    <div>{this.state.note.message}</div>
                }
            </div>
        );
    }
}

export default App;