import { listData } from '../../lib/dummy_data'
import Card from '../card/card'
import './list.scss'

function List(){
  return (
    <div className='list'>
        {listData.map(item=>(
            <Card key={item.id} item={item}/>
        ))}
    </div>
  )
}

export default List