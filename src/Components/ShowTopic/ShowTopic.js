import React from 'react'
import axios from 'axios'
import './showtopic.css'
import { Link } from 'react-router-dom'

class ShowTopic extends React.Component {
  state = {
    data:null
  }
  componentDidMount() {
    const { id } = this.props.match.params
    axios.get(`https://cnodejs.org/api/v1/topic/${id}`)
      .then(res => {
        this.setState({
          data:res.data.data
        })
      })
      .catch( err => {
        alert(err)
      })
  }
  render () {
    const { data } = this.state

    const article = data ? (
      <div className='article'>
        <h2 className='article-title'>{data.title}</h2>
        <p className='article-info'> 作者:{data.author.loginname}
          <span> 浏览量:{data.visit_count} </span>
          <span> 发布于{data.create_at} </span>
        </p>
        <div className="topic-content">
          <div dangerouslySetInnerHTML={ {__html: data.content} } />
        </div>
        <h2>全部回复</h2>
        <div className="replies">
          {
            data.replies.map( item => {
              return (
                <div key={item.id} className='reply'>
                  <Link to={`/user/${item.author.loginname}`}>
                    <img src={item.author.avatar_url} alt="11"/>
                  </Link>
                  <span className='reply-author'>{item.author.loginname}</span>
                  <div dangerouslySetInnerHTML={ {__html: item.content} } />
                </div>
              )
            })
          }
        </div>
      </div>
    ) : '请稍等'
    return (
      <div>
        {article}
      </div>
    )
  }

}

export default ShowTopic;
