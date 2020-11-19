import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import LandingLogin from './pages/LandingLogin'
import Mapas from './pages/Mapas';
import Mapa from './pages/Mapa';
import CreateMapa from './pages/CreateMapa';



function Routes() {
    return(
        <BrowserRouter>
            <Switch>
                <Route path= "/" exact component= {Landing} />
                <Route path= "/login" exact component= {LandingLogin} />
                <Route path= "/mapas" component= {Mapas} />
              
                <Route path= "/mapas/create" component= {CreateMapa} />
                <Route path= "/mapas/:id" component= {Mapa} />
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;