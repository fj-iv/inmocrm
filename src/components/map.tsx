import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

// Fix for default marker icon issue in Leaflet
// ********************************************************************************
// When using Leaflet with modern JavaScript bundlers, the default paths to the marker
// icons can break because the bundler may change the directory structure or the way assets
// are served. By explicitly setting the URLs for the marker icons, you ensure that Leaflet
// can always find the icons, avoiding broken images on the map
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
})

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
