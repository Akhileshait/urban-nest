import './map.scss'
import {MapContainer, Marker, Popup, TileLayer} from 'react-leaflet'
import "leaflet/dist/leaflet.css"
import Pin from '../pin/pin.jsx'

function Map({items}){
  return (
    <div className='map'>
        <MapContainer center={items.length===1 ? [items[0].latitude, items[0].longitude]:[52, -1]} zoom={7} scrollWheelZoom={false} className='map'>
            <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {
              items.map(item=>(
                <Pin item={item} key={item.id}/>
              )
                )
            }
        </MapContainer>
    </div>
  )
}

export default Map