import './map.scss'
import {MapContainer, Marker, Popup, TileLayer} from 'react-leaflet'

function Map(){
  return (
    <div className='map'>
        <MapContainer center={[52, -2]} zoom={13} scrollWheelZoom={false} className='map'>
            <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[52, -2]}>
            <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
            </Marker>
        </MapContainer>
    </div>
  )
}

export default Map