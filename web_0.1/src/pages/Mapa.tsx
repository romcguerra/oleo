import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import { FiClock, FiInfo} from "react-icons/fi";
import { Map, Marker, TileLayer } from "react-leaflet";
import {useParams} from 'react-router-dom';

import '../styles/pages/mapa.css';
import Sidebar from "../conponentes/Sidebar";
import mapIcon from "../utils/mapicon";
import { useState } from "react";
import { useEffect } from "react";
import api from "../services/api";

interface Estabelecimentos {
  name: string;
  telefone: string;
  latitude: number;
  longitude: number;
  about: string; // add banco
  istructions: string; // add banco
  opening_hours: string; // add banco
  open_on_weekends: string; // add banco
  images: Array<{
    id: number;
    url: string;
  }>;
}

interface EstabelecimentoParams { 
  id: string;
}

export default function Mapa() {  
  const params = useParams<EstabelecimentoParams>();
  const [estabelecimento, setEstabelecimento] = useState<Estabelecimentos>();
  const [activeImageIdex, setActiveImageIndex] =useState(0);

  useEffect(() => {
      api.get(`mapas/${params.id}`).then(Response =>{
          setEstabelecimento(Response.data); 
      });
  }, [params.id]);

  if (!estabelecimento){
    return <p>Carregando...</p>;
  }

  return (
    <div id="page-mapa">
      <Sidebar />
      <main>
        <div className="mapa-details">
          <img src={estabelecimento.images[activeImageIdex].url} alt={estabelecimento.name} />

          <div className="images">
              {estabelecimento.images.map((image, index) => {
                return(

                  <button 
                    key={image.id} 
                    className={ activeImageIdex === index ? 'active' : ''}
                    type="button"
                    onClick={() => {
                      setActiveImageIndex(index);
                    }}
                    >
                  <img src={image.url} alt={estabelecimento.name} />
                
                </button>
                );
              })}
          </div>
          
          <div className="mapa-details-content">
            <h1>{estabelecimento.name}</h1>
            <p>
              {estabelecimento.about}
            </p>

            <div className="map-container">
              <Map 
                center={[estabelecimento.latitude,estabelecimento.longitude]} 
                zoom={16} 
                style={{ width: '100%', height: 280 }}
                dragging={false}
                touchZoom={false}
                zoomControl={false}
                scrollWheelZoom={false}
                doubleClickZoom={false}
              >
                <TileLayer 
                  url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                />
                <Marker interactive={false} icon={mapIcon} position={[estabelecimento.latitude,estabelecimento.longitude]} />
              </Map>

              <footer>
                <a target="_blank" rel="noopener noreferrer" href={`https://www.google.com/maps/dir/?api=1&destination=${estabelecimento.latitude},${estabelecimento.longitude}`}>Ver rotas no Google Maps</a>
              </footer>
            </div>

            <hr />

            <h2>Instruções para visita</h2>
            <p>{estabelecimento.istructions}</p>

            <div className="open-details">
              <div className="hour">
                <FiClock size={32} color="#15B6D6" />
                Segunda à Sexta <br />
                {estabelecimento.opening_hours}
              </div>
              {estabelecimento.open_on_weekends ? (
                   <div className="open-on-weekends">
                      <FiInfo size={32} color="#39CC83" />
                        Atendemos <br />
                        fim de semana
                 </div>
              ) : (
                <div className="open-on-weekends dont-open">
                  <FiInfo size={32} color="#FF669D" />
                     Nao atendemos <br />
                    fim de semana
              </div>
              )}
            </div>

            <button type="button" className="contact-button">
              <FaWhatsapp size={20} color="#FFF" />
              {estabelecimento.telefone}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}