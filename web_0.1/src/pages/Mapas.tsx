import React, {useEffect, useState} from 'react';
import '../styles/pages/mapas.css';
import { Link } from 'react-router-dom';
import {FiActivity} from 'react-icons/fi'
import { Map, TileLayer, Marker, Popup} from 'react-leaflet';
import mapIcon from '../utils/mapicon';
import api from '../services/api';


interface Estabelecimentos {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
}

function Mapas() {
    const [estabelecimentos, setEstabelecimentos] = useState<Estabelecimentos[]>([]);

    useEffect(() => {
        api.get('mapas').then(Response =>{
            setEstabelecimentos(Response.data);
        });
    }, []);

    return(
        <div id= "page-map">

            <aside>

                <header>
                    <h1>
                        Prog Oleo
                    </h1>
                </header>
            </aside>

            <Map
            center= {[-27.2092052, -49.6401092]}
            zoom= {16}
            style= {{width: '100%', height: '100%'}}
            >
             {/* <TileLayer url= "https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"/>*/}
            <TileLayer
                url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
            />

            {estabelecimentos.map(estabelecimentos => {
                return(
                    <Marker
                        key={estabelecimentos.id}
                        icon= {mapIcon}
                        position= {[estabelecimentos.latitude, estabelecimentos.longitude]}
                        >
                        
                        <Popup closeButton= {false} minWidth={240} maxWidth={240} className="map-popup">

                            {estabelecimentos.name}

                            <Link to={`/mapas/${estabelecimentos.id}`}>

                                <FiActivity size={20} color="fff"/>

                            </Link>

                        </Popup>

                    </Marker>
                )
            })}
            </Map>

        </div>
    );
}

export default Mapas;