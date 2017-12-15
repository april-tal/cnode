import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './header.css'

class Header extends React.Component {
  state = {
    token : '',
    userInfo : null,
    login:false
  }
  handleChange = (e) => {
    this.setState({
      token : e.target.value
    })
  }
  componentDidMount() {
    if(sessionStorage.token === '7c2bf5e1-5b4d-42fd-b8d5-7a6d846480ae'){
      axios.post('https://cnodejs.org/api/v1/accesstoken',{accesstoken:sessionStorage.token})
      .then( (res) => {
        this.setState({
          login:true,
          userInfo : res.data
        })
      })
      .catch((err) => {
        alert(err)
      })
    }
  }
  handleLogin = () => {
    const { token } = this.state
    axios.post('https://cnodejs.org/api/v1/accesstoken',{accesstoken:token})
    .then( (res) => {
      console.log(res);
      sessionStorage.token= token
      this.setState({
        login:true,
        userInfo : res.data
      })
    })
    .catch((err) => {
      alert(err)
    })
  }
  handleLogout = () => {
    sessionStorage.clear('token')
     this.setState({
       login: false,
       userInfo: null,
       token:''
     })
   }
  render () {
    const { token,login,userInfo } = this.state
    return (
      <header>
        <Link to='/'>
          <img style={{width:'200px'}} src="https://o4j806krb.qnssl.com/public/images/cnodejs_light.svg" alt=""/>
        </Link>
        {
          login ? (<div>
            <Link to='/topic/create'>
              <button>发布话题</button>
            </Link>
            <Link to={`/user/${userInfo.loginname}`}>
              <img src={userInfo.avatar_url} alt="111"/>
            </Link>
            <button onClick={this.handleLogout}>退出</button>
          </div>) : (<div>
            <input type="text" value={token} onChange={this.handleChange}/>
            <button onClick={this.handleLogin}>登录</button>
          </div>)
        }
      </header>
    )
  }
}

export default Header;
