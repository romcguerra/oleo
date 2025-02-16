import React from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';
import marcacaoImg from '../images/marcacao.png'
import '../styles/conponents/sidebar.css'


export default function Sidebar(){
    const { goBack} = useHistory();
        return(
            <aside className = "app-sidebar">
                <img src={marcacaoImg} alt="Happy" />

                    <footer>
                        <button type="button" onClick={goBack}>
                            <FiArrowLeft size={24} color="#FFF" />
                        </button>
                    </footer>
            </aside>
        );

}