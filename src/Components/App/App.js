import React from 'react'
import axios from 'axios'
import { BrowserRouter as Router,Route,Link,Switch } from 'react-router-dom'
import './app.css'
import Home from '../Home/Home'
import ShowTopic from '../ShowTopic/ShowTopic'
import UserInfo from '../UserInfo/UserInfo'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import Create from '../Create/Create'

class App extends React.Component {
  render () {
    return (
      <Router>
        <div>
          <Header />
          <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/topic/create' component={Create} />
          <Route path='/topic/:id' component={ShowTopic} />
          <Route path='/user/:loginname' component={UserInfo} />
          </Switch>
          <Footer />
        </div>
      </Router>
    )
  }
}

export default App;
