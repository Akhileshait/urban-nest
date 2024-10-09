import './listPage.scss'

import {listData} from "../../lib/dummy_data.js";
import Filter from '../../components/filter/Filter.jsx';
import Card from '../../components/card/card.jsx';
import Map from '../../components/map/map.jsx';

function ListPage(){
  const data=listData;

  return (
    <div className='listPage'>
      <div className="listContainer">

        <div className="wrapper">
          <Filter/>
          

          {data.map(item=>(
            <Card key={item.id} item={item}></Card>
          )
          )}
        </div>

      </div>

      <div className="mapContainer">
        <Map></Map>
      </div>
    </div>
  )
}

export default ListPage