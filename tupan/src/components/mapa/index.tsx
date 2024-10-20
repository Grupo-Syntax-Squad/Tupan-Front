'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect } from 'react';

interface MapaProps {
  lat: number;
  lng: number;
  zoom: number;
}

const Mapa = ({ lat, lng, zoom }: MapaProps) => {
  useEffect(() => {
    // Isso corrige o problema do ícone padrão não ser exibido corretamente
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
      iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    });
  }, []);

  return (
    <MapContainer center={[lat, lng]} zoom={zoom} className='rounded' style={{ height: '250px', width: '100%', margin: '15px'}}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={[lat, lng]}>
        <Popup>Você está aqui!</Popup>
      </Marker>
    </MapContainer>
  );
};

export default Mapa;
