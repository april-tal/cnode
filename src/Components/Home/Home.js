import React from 'react'
import axios from 'axios'
import ShowTopics from '../ShowTopics/ShowTopics'
import './home.css'

class Home extends React.Component {
  //默认初始化20条数据
  getInitData = () => {
    var data =[];
    for(var i = 0; i < 20; i++){
      data.push({});
    }
    return data;
  }

  state = {
    data: this.getInitData()
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

  componentWillMount() {

  }

  componentDidMount() {
    this.getData('all')
  }

  handleClick = (tab) => {
    this.getData(tab)
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

    const data = this.state.data

    return (
      <div className='content'>
        <div className="tabs">
          {tabs.map( (item,index)=>(
            <span key={ index } onClick={() => { this.handleClick(item.tab) }}>{ item.text }</span>
          ))}
        </div>
        <ShowTopics data={ data }/>
      </div>
    )
  }
}

export default Home;
