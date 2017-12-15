import React from 'react'
import './showtopics.css'
import { Link } from 'react-router-dom'

class ShowTopics extends React.Component {
  render () {
    const { data } = this.props
    const ShowTopics = data.map( (item, index) => {

      if(item.id){
        return (
          <div key={item.id} className='showtopic'>
            <Link to={`/user/${item.author.loginname}`}>
              <img src={item.author.avatar_url} alt="11"/>
            </Link>
            <span>{item.reply_count}/{item.visit_count}</span>
            <span>{item.top ? <span className="active">置顶</span>  : item.good ? <span className='active'>精华</span> : item.tab === 'share' ? <span className='active1'>分享</span> :<span className='active1'>问答</span>}</span>
            <span className='topic-title'><Link to={`/topic/${item.id}`}>{item.title}</Link></span>
          </div>
        )
      }else{
        return (
          <div key={index} className='showtopic'>
            <div className="avatar empty"></div>
            <span className="replay-count empty">0/0</span>
            <span class="put-top empty"></span>
            <span className='topic-title empty'></span>
          </div>
        )
      }
    })
    return (
      <div>{ ShowTopics }</div>
    )
  }
}

export default ShowTopics;
