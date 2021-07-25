import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { useEffect, useState, useRef, useCallback } from 'react';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import styles from '../../styles/Maps.module.scss';

import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxOption,
  ComboboxList,
} from '@reach/combobox';

const libraries = ['places'];
const mapContainerStyle = {
  width: '100%',
  height: '100%',
}
const center = {
  lat: -6.175110,
  lng: 106.865036,
}

const options = {
  disableDefaultUI: true,
}


const Maps = () => {

  const [ markers, setMarkers ] = useState([]);

  const onMapClick = useCallback((e) => {
    setMarkers(current => [
      ...current,
      {
        lat:e.latLng.lat(),
        lng:e.latLng.lng(),
        time: new Date(),
      }
    ])
  }, []);

  const mapRef = useRef();

  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, [])

  const panTo = useCallback(({lat, lng}) => {
    mapRef.current.panTo({lat, lng});
    mapRef.current.setZoom(15);
  }, [])
  
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading maps...";

  return (
    <div className="position-relative h-100">
      <Search panTo={panTo}/>
      <GoogleMap 
        mapContainerStyle={mapContainerStyle} 
        zoom={8} 
        center={center}
        options={options}
        onClick={onMapClick}
        onLoad={onMapLoad}
      >
        {
          markers.map(marker => (
            <Marker 
              key={marker.time.toISOString()}
              position={{ lat:  marker.lat, lng: marker.lng}} />
          ))
        }
      </GoogleMap>
    </div>
  )
}

const Search = ({ panTo }) => {
  const { 
    ready, 
    value, 
    suggestions: {status, data}, 
    setValue, 
    clearSuggestions 
  } = usePlacesAutocomplete({
    requestOptions: {
      location: {lat: () => -6.175110, lng: () => 106.865036,},
      radius: 200 * 1000,
    }
  });

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-7 mx-auto">
          <div className="position-relative">
             <Combobox
              onSelect={ async (address) => {
                setValue(address, false);
                clearSuggestions();

                try {
                  const results = await getGeocode({address});
                  const { lat, lng } = await getLatLng(results[0]);
                  console.log(`${lat}, ${lng}`);
                  panTo({lat, lng});
                } catch (e) {
                  console.log('error')
                }
                
                // console.log(address);
              }}
              className={`${styles.searchWrapper} shadow`}
             >
               <ComboboxInput 
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  disabled={!ready}
                  placeholder="Enter an Address" 
                  className={styles.input}
                /> 
                <ComboboxPopover className={styles.option}>
                  {status === 'OK' && 
                    data.map(({id,  description}) => (
                      <ComboboxOption className={`${styles.option_item} p-3`} key={id} value={description} />
                    ))
                  }
                </ComboboxPopover>
             </Combobox>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Maps;