import Menu from './components/Menu';
import ID from './pages/ID';
import NCOVID from './pages/NCOVID';
import World from './pages/World';
import React from 'react';
import { IonApp, IonRouterOutlet, IonSplitPane, IonPage, IonContent, IonHeader, IonToolbar, IonTitle, IonButtons, IonMenuButton } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route} from 'react-router-dom';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <IonSplitPane contentId="main">
          <Menu />
          <IonRouterOutlet id="main">
            <IonPage>
              <IonHeader>
                <IonToolbar color="danger">
                  <IonButtons slot="start">
                    <IonMenuButton />
                  </IonButtons>
                  <IonTitle>COVID-19 INFORMATION</IonTitle>
                </IonToolbar>
              </IonHeader>
              <IonContent color="dark">
                <Route path="/page/NCOVID" component={NCOVID} exact={true} />
                <Route path="/page/ID" component={ID} exact={true} />
                <Route path="/page/World" component={World} exact={true} />
                <Route path="/" render={() => <Redirect to="/page/NCOVID" />} exact={true} />
              </IonContent>
            </IonPage>
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>

    </IonApp>
  );
};

export default App;