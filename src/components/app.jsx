import React, { Component } from 'react';
import Messages from './messages';

const Horizon = require('@horizon/client');
const horizon = Horizon({ secure: false });

const chat = horizon('messages');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      author: false,
      text: false
    }
  }
  handleChangeAuthor(event) {
    this.setState({ author: event.target.value });
  }

  handleChangeText(event) {
    this.setState({ text: event.target.value });
  }

  sendMessage() {
    if(this.state.text === false || this.state.author === false) {
      alert('Invalid Submission');
      return;
    }
    let message = {
      text: this.state.text,
      author: this.state.author
    };
    chat.store(message);
  }

  render() {
    return (
      <div>
        <form className="form-inline">
          <div className='center'>
            <button className="btn btn-default" type="submit" onClick={this.sendMessage.bind(this)}>Nachricht senden</button>
            <input className="form-control" type="text" placeholder="Name" onChange={this.handleChangeAuthor.bind(this)}></input>
            <input className="form-control" type="text" placeholder="Nachricht" onChange={this.handleChangeText.bind(this)}></input>
          </div>
        </form>
        <Messages chat={chat} />
      </div>
    );
  }
}

export default App;
