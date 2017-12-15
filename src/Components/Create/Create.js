import React from 'react'
import axios from 'axios'

class Create extends React.Component {
  state = {
    title:'',
    content:''
  }
  handleTitle = (e) => {
    this.setState({
      title : e.target.value
    })
  }
  handleContent = (e) => {
    this.setState({
      content : e.target.value
    })
  }
  handleSubmit = () => {
    const data = {
      accesstoken : sessionStorage.token,
      title:this.state.title,
      content:this.state.content,
      tab:'dev'
    }
    axios.post('https://cnodejs.org/api/v1/topics',data)
    .then( res => {
      this.setState({
        title:'',
        content:''
      })
      this.props.history.push(`/topic/${res.data.topic_id}`)
    })
    .catch( err => {
      alert(err)
    })
  }
  render () {
    return (
      <div>
        <input type="text" onChange={ this.handleTitle } />
        <textarea value={ this.state.content } onChange={ this.handleContent }></textarea>
        <button onClick={ this.handleSubmit }>提交</button>
      </div>
    )
  }
}

export default Create;
