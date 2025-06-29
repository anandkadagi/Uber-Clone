import React, { useEffect, useState, useRef } from 'react'
import { LoadScript, GoogleMap, Marker } from '@react-google-maps/api'

const containerStyle = {
  width: '100%',
  height: '65vh'
}

const LiveTracking = () => {
  const [position, setPosition] = useState(null)
  const intervalRef = useRef(null)

  useEffect(() => {
    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            setPosition({
              lat: pos.coords.latitude,
              lng: pos.coords.longitude
            })
          },
          (err) => {
            console.error('Geolocation error:', err)
          },
          { enableHighAccuracy: true }
        )
      }
    }
    updateLocation()
    intervalRef.current = setInterval(updateLocation, 1000)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

  return (
    <div>
      <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={position || { lat: 20, lng: 77 }} 
          zoom={position ? 15 : 4}
        >
         
          {position && (
            <Marker
              key={position.lat + ',' + position.lng}
              position={position}
            />
          )}
        </GoogleMap>
      
      </LoadScript>
    </div>
  )
}

export default LiveTracking