import React, { Component } from 'react'
import { render } from 'react-dom'


let data1 = [
  {id: 1, author: "Pete Hunt", text: "This is one comment"},
  {id: 2, author: "Jordan Walke", text: "This is another comment"}
]

class Comment extends React.Component{
  render() {
    return (
      <div className="comment">
        <h2 className="commentAuthor">
          {this.props.author}
        </h2>
        {this.props.children}
      </div>
    ) 
  }
}

class CommentList extends React.Component {
  render() {
    console.log(this.props)
    let commentNodes = this.props.data.map(comment => {
      return (
        <Comment author={comment.author} key={comment.id}>
          {comment.text}
        </Comment>
      )
    })
    return (
     <div className="commentList">
       {commentNodes}
     </div>
    )
  }
}

class CommentForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {author:'', text:''}
  }

  handleAuthorChange(e) {
    this.setState({author: e.target.value})
  }

  handleTextChange(e) {
    this.setState({text: e.target.value})
  }

  handleSumbit(e) {
    e.preventDefault()
    let author = this.state.author.trim()
    let text = this.state.text.trim()
    if(!text || !author) return 
    this.props.onCommentSubmit({author: author, text: text});
    this.setState({author:'' ,text:''})
  }

  render() {
    return (
     <form className="commentForm" onSubmit={this.handleSumbit.bind(this)}>
       <p>
         <input 
            type="text" 
            placeholder="Your Name" 
            value={this.state.author}
            onChange={this.handleAuthorChange.bind(this)}
          />
        </p>
       <p>
         <input
            type="text" 
            placeholder="Say something..."
            value={this.state.text}
            onChange={this.handleTextChange.bind(this)}
         />
        </p>
       <input type="submit" value="POST" />
     </form>
    )
  }
}

class CommentBox extends React.Component {
  constructor(props){
    super(props)
    this.state = {data:[]}
  }

  loadCommentsFromServer() {
    // $.ajax({
    //   url: this.props.url,
    //   dataType: 'json',
    //   cache: false,
    //   success: function(data) {
    //     this.setState({data: data});
    //   }.bind(this),
    //   error: function(xhr, status, err) {
    //     console.error(this.props.url, status, err.toString());
    //   }.bind(this)
    // });

    setTimeout(() => {
      this.setState({data: data1})
    }, 1000)
  }

  componentDidMount() {
    this.loadCommentsFromServer();
    // setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  }

  handleCommentSubmit(comment) {
    var comments = this.state.data;
    // Optimistically set an id on the new comment. It will be replaced by an
    // id generated by the server. In a production application you would likely
    // not use Date.now() for this and would have a more robust system in place.
    comment.id = Date.now();
    var newComments = comments.concat([comment]);
    this.setState({data: newComments});
  }

  render() {
    return (
      <div className="commentBox">
        <h1>Coments</h1>
        <CommentList data={this.state.data} />
        <CommentForm onCommentSubmit={this.handleCommentSubmit.bind(this)} />
      </div>
    )
  }
}

render(
  <CommentBox />,
  document.getElementById('app')
)