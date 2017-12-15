import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import './userinfo.css'
class UserInfo extends React.Component {
  state = {
    userinfo:null
  }
  getUserInfo = (loginname) => {
    axios.get(`https://cnodejs.org/api/v1/user/${loginname}`)
      .then( res => {
        this.setState({
          userinfo : res.data.data
        })
      })
      .catch( err => {
        alert(err)
      })
  }
  componentDidMount() {
    const { loginname } = this.props.match.params
    this.getUserInfo(loginname)
  }
  componentWillReceiveProps(nextProps) {
    const { loginname } = nextProps.match.params
    this.getUserInfo(loginname)
  }
  render () {
    const { userinfo } = this.state
    console.log(userinfo);
    const intro = userinfo ? (
      <div className='userinfo'>
        <img src={userinfo.avatar_url} alt=""/>
        <span>{userinfo.loginname}</span>
        <h4>最近参与的话题</h4>
        {
          (userinfo.recent_replies.length > 5 ? userinfo.recent_replies.slice(0,5) : userinfo.recent_replies.map( item => {
              return (
                <div className='recent_replies' key={item.id}>
                  <Link to={`/user/${item.author.loginname}`}><img src={item.author.avatar_url} alt="111"/></Link>
                  <p><Link to={`/topic/${item.id}`}>{item.title}</Link></p>
                </div>
              )
            })
          )
        }
        <h4>最近创建的话题</h4>
          {
            userinfo.recent_topics.map( item => {
              return (
                <div className='recent_topics' key={item.id}>
                  <img src={item.author.avatar_url} alt="11"/>
                  <p><Link to={`/topic/${item.id}`}>{item.title}</Link></p>
                </div>
              )
            })
          }
      </div>
    ) :'请稍等'
    return (
      <div>
        { intro }
      </div>
    )
  }
}

export default UserInfo
