import './index.less';

import { Space } from 'antd';
import GoogleMapReact from 'google-map-react';
import React, { useEffect, useState } from 'react';

import MarkerMap, { MarkerMapProps } from '@/components/Atom/MarkerMap';
import { HomeOutlined } from '@ant-design/icons';

import geojsonData from '../../../../public/VNM_adm.json';

const initialPosition = {
  lat: 16.0583,
  lng: 105.2772,
};

const ZoomControl = (props: any) => {
  const { zoomIn, zoomOut, resetMap } = props;

  return (
    <Space direction="vertical" className="a-zoom-btn">
      <div className="a-zoom-btn__in" onClick={zoomIn}>
        +
      </div>
      <div className="a-zoom-btn__out" onClick={zoomOut}>
        -
      </div>
      <div className="a-zoom-btn__home" onClick={resetMap}>
        <HomeOutlined style={{ fontSize: 15, fontWeight: 300 }} />
      </div>
    </Space>
  );
};

interface MapProps {
  markers: MarkerMapProps[];
}

const Map: React.FC<MapProps> = ({ markers }) => {
  const [map, setMap] = useState<any>(null);
  const [zoom, setZoom] = useState(6);
  const [position, setPosition] = useState(initialPosition);

  useEffect(() => {
    setPosition(initialPosition);
  }, []);

  const handleApiLoaded = (map: any, maps: any) => {
    const geoJson = new maps.Data();
    geoJson.addGeoJson(geojsonData);
    geoJson.setMap(map);
    geoJson.setStyle({
      fillColor: 'black',
      strokeColor: 'black',
      strokeWeight: 1,
    });
    setMap(map);
  };

  const resetMap = () => {
    if (map) {
      map.panTo(initialPosition);
      setZoom(6);
    }
  };

  const handleZoomIn = () => {
    setZoom(zoom + 1);
  };

  const handleZoomOut = () => {
    setZoom(zoom - 1);
  };

  return (
    <div className="a-map" style={{ height: '800px', width: '500px' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyArOFnF3v0nkL6Xmpmyb2EC7kMTtNKkVyU' }}
        defaultCenter={initialPosition}
        defaultZoom={zoom}
        zoom={zoom}
        center={position}
        yesIWantToUseGoogleMapApiInternals
        options={{
          keyboardShortcuts: false,
          disableDefaultUI: true,
          disableDoubleClickZoom: true,
          styles: [
            {
              elementType: 'labels',
              stylers: [
                {
                  visibility: 'off',
                },
              ],
            },
            {
              featureType: 'all',
              elementType: 'labels.text',
              stylers: [
                {
                  color: '#878787',
                },
              ],
            },
            {
              featureType: 'all',
              elementType: 'labels.text.stroke',
              stylers: [
                {
                  visibility: 'off',
                },
              ],
            },
            {
              featureType: 'landscape',
              elementType: 'all',
              stylers: [
                {
                  color: '#f9f5ed',
                },
              ],
            },
            {
              featureType: 'road.highway',
              elementType: 'all',
              stylers: [
                {
                  color: '#f5f5f5',
                },
              ],
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry.stroke',
              stylers: [
                {
                  color: '#c9c9c9',
                },
              ],
            },
            {
              featureType: 'water',
              elementType: 'all',
              stylers: [
                {
                  color: '#aee0f4',
                },
              ],
            },
          ],
        }}
        onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
      >
        {/* Các thành phần khác có thể được thêm vào bản đồ tại đây */}
        {markers.map((marker) => (
          <MarkerMap key={marker.id} {...marker} />
        ))}
        <MarkerMap id={4} lat={16.103525} lng={108.282446} color="orange" />
      </GoogleMapReact>
      <ZoomControl zoomIn={handleZoomIn} zoomOut={handleZoomOut} resetMap={resetMap} />
    </div>
  );
};

export default Map;
