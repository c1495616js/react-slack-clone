import React, { Component } from 'react';
import { Segment, Comment } from 'semantic-ui-react';
import firebase from '../../firebase'

import MessagesHeader from './MessagesHeader'
import MessageForm from './MessageForm'
import Message from './Message'
export default class Messages extends Component {

  state = {
    messagesRef: firebase.database().ref('messages'),
    messages: [],
    messagesLoading: true,
    channel: this.props.currentChannel,
    user: this.props.currentUser,
    progressBar: false
  }

  componentDidMount(){
    const { channel, user } = this.state;

    if( channel && user ){
      this.addListeners(channel.id);
    }
  }

  addListeners = channelId => {
    this.addMessageListener(channelId);
  }

  addMessageListener = channelId => {
    let loadedMessages = [];
    this.state.messagesRef
    .child(channelId)
    .on('child_added', snap => {
      loadedMessages.push(snap.val());
      this.setState({
        messages: loadedMessages,
        messageLoading: false
      });
    })
  }

  displayMessages = messages => (
    messages.length > 0 && messages.map(message => (
      <Message 
        key={message.timestamp}
        message={message}
        user={this.state.user}
      />
    ))
  )

  isProgressBarVisible = percent => {
    if(percent > 0){
      this.setState({progressBar: true});
    }
  }

  render() {

    const { messagesRef, messages, channel, user, progressBar } = this.state;
    
    return (
      <React.Fragment>
        <MessagesHeader />

        <Segment>
          <Comment.Group className={progressBar ? 'message__progress': 'message'}>
            { 
              /* messages */ 
              this.displayMessages(messages)
            }
          </Comment.Group>
        </Segment>

        <MessageForm
          messagesRef={messagesRef}
          currentChannel={channel}
          currentUser={user}
          isProgressBarVisible={this.isProgressBarVisible}
        />
      </React.Fragment>
    )
  }
}
