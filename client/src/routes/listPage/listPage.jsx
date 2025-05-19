import './listPage.scss'

import {listData} from "../../lib/dummy_data.js";
import Filter from '../../components/filter/Filter.jsx';
import Card from '../../components/card/card.jsx';
import Map from '../../components/map/map.jsx';

import { useLoaderData } from 'react-router-dom';

function ListPage(){
  const posts=useLoaderData();

  return (
    <div className='listPage'>
      <div className="listContainer">

        <div className="wrapper">
          <Filter/>
          

          {posts.map(item=>(
            <Card key={item.id} item={item}></Card>
          )
          )}
        </div>

      </div>

      <div className="mapContainer">
        <Map items={posts}/>
      </div>
    </div>
  )
}

export default ListPage