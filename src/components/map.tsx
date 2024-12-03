import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

interface MapProps {
    longitude: number
    latitude: number
    height?: string
    width?: string
    zoom?: number
    scrollWheelZoom?: boolean
    popupText?: string
    onLocationSelection?: (latitude: number, longitude: number) => void
}

const Map: React.FC<MapProps> = ({
    longitude,
    latitude,
    height = '100%',
    width = '100%',
    zoom = 13,
    scrollWheelZoom = true,
    popupText,
    onLocationSelection,
}) => {
    const LocationMarker = () => {
        useMapEvents({
            click(e) {
                if (onLocationSelection) {
                    onLocationSelection(e.latlng.lat, e.latlng.lng)
                }
            },
        })
        return null
    }

    return (
        <MapContainer
            center={[latitude, longitude]}
            zoom={zoom}
            scrollWheelZoom={scrollWheelZoom}
            style={{ height, width }}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            />
            <Marker position={[latitude, longitude]}>
                {popupText && <Popup>{popupText}</Popup>}
            </Marker>
            <LocationMarker />
        </MapContainer>
    )
}

export default Map
