import React, { FormEvent, useState } from "react";
import { Map, Marker, TileLayer } from 'react-leaflet';
import {LeafletMouseEvent} from 'leaflet'

import { FiPlus } from "react-icons/fi";

import '../styles/pages/create-mapa.css';
import Sidebar from "../conponentes/Sidebar";
import mapIcon from "../utils/mapicon";




export default function CreateMapa() {
   const [position, setPosition] = useState({latitude: 0, longitude: 0});
   const [name, setName] = useState ('');
   const [about, setAbout] = useState ('');
   const [instructions, setInstructions] = useState ('');
   const [opening_hours, setOpeningHours] = useState ('');
   const [open_on_weekends, setOpenOnWekends] = useState (true);

  function handleMapClick(event: LeafletMouseEvent){
    const {lat, lng} =event.latlng
    setPosition({
      latitude: lat,
      longitude: lng,

    });

  }

  function handleSubmit(event : FormEvent) {
    event.preventDefault();

    const {latitude, longitude} = position;
    console.log({
      name,
      about,
      latitude,
      longitude,
      instructions,
      opening_hours,
      open_on_weekends,

    })

  }

  return ( 
    <div id="page-create-mapa">
        <Sidebar/>
      <main>
        <form onSubmit={handleSubmit} className="create-mapa-form">
          <fieldset>
            <legend>Dados</legend>

            <Map 
              center={[-27.2092052,-49.6401092]} 
              style={{ width: '100%', height: 280 }}
              zoom={15}
              onclick= {handleMapClick}
            >
              <TileLayer 
                url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
              />
              {position.latitude !== 0  && (
                <Marker interactive={false}
                 icon={mapIcon} 
                 position={[
                   position.latitude,
                   position.longitude
                ] }
                   />  
              )}
            </ Map>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input 
              id="name" 
              value={name} 
              onChange={event => setName(event.target.value)}/>
            </div>

            <div className="input-block">
              <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
              <textarea
               id="name" 
               maxLength={300}
               value={about} 
               onChange={event => setAbout(event.target.value)}
               />
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="image-container">
                <button type='button' className="new-image">
                  <FiPlus size={24} color="#15b6d6" />
                </button>

              </div>


            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea 
              id="instructions" 
              value={instructions} 
              onChange={event => setInstructions(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horario de fincionamento</label>
              <input 
              id="opening_hours"
              value={opening_hours} 
              onChange={event => setOpeningHours(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <button 
                type="button" 
                className={open_on_weekends ? 'active' : ''}
                  onClick={( ) => setOpenOnWekends(true)}
                >
                  Sim
                </button>

                <button 
                type="button"
                className={!open_on_weekends ? 'active' : ''}
                onClick={( ) => setOpenOnWekends(false)}
                >
                  Não
                </button>
              </div>
            </div>
          </fieldset>
          
          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;
