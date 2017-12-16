import React from 'react'
import axios from 'axios'
import ShowTopics from '../ShowTopics/ShowTopics'
import './home.css'

class Home extends React.Component {
  state = {
    data :[],
    tab:'all'
  }

  getData = (tab) => {
    axios.get(`https://cnodejs.org/api/v1/topics?tab=${tab !== 'all' ? tab : ''}`)
    .then((res)=>{
      this.setState({
        data:res.data.data
      })
    })
    .catch((err)=>{
      alert(err)
    })
  }

  componentDidMount() {
    this.getData('all')
  }

  handleClick = (tab) => {
    this.getData(tab)
    this.setState({
      tab : tab
    })
  }

  render () {
    let tabs = [
      {
        tab:'all',
        text:'全部'
      },
      {
        tab:'good',
        text:'精华'
      },
      {
        tab:'share',
        text:'分享'
      },
      {
        tab:'ask',
        text:'问答'
      },
      {
        tab:'job',
        text:'招聘'
      }
    ]

    const {data,tab} = this.state
    return (
      <div className='content'>
        <div className="tabs">
          {tabs.map( (item,index)=>(
            <span key={ index } className={`${tab===item.tab&&'active'}`} onClick={() => { this.handleClick(item.tab) }}>{ item.text }</span>
          ))}
        </div>
        <ShowTopics data={ data }/>
      </div>
    )
  }
}

export default Home;
