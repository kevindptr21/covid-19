import {
  IonContent,
  IonIcon,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonCard,
  IonCardContent,
  IonText,
  IonGrid,
  IonRow,
  IonCol,
  IonImg,
  IonCardHeader,
  IonCardTitle,
} from '@ionic/react';
import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import {
  newspaperOutline,
  newspaper,
  readerOutline,
  nuclearOutline
} from 'ionicons/icons';
import './Menu.css';
import covid from './novel-covid.png';

interface AppPage {
  path: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

const appPages: AppPage[] = [
  { title: 'Apa itu Coronavirus?', path: '/page/NCOVID', iosIcon: nuclearOutline, mdIcon: newspaper },
  { title: 'COVID-19 INDONESIA', path: '/page/ID', iosIcon: newspaperOutline, mdIcon: newspaper },
  { title: 'COVID-19 DUNIA', path: '/page/World', iosIcon: readerOutline, mdIcon: readerOutline },
];

type Props = RouteComponentProps<{}>;


const Menu = ({ history }: Props) => {

  const menuItems = (): JSX.Element[] => {
    return appPages.map((page: AppPage) => (
      <IonMenuToggle key={page.title} autoHide={false}>
        <IonCard button color={page.path === history.location.pathname ? "medium" : ""}
          onClick={() => navigateTo(page)}>
            <IonCardContent>
              <IonIcon slot="start" icon={page.iosIcon} style={{marginRight:'20px',fontSize:"20px"}} color="dark"></IonIcon>
              <IonLabel color="dark">{page.title}</IonLabel>
            </IonCardContent>
        </IonCard>
      </IonMenuToggle>
    ));
  }

  const navigateTo = (page: AppPage) => {
    history.push(page.path);
  }

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent color="dark">
        <IonList id="inbox-list" style={{backgroundColor:"#222428"}}>
          <IonGrid>
            <IonRow>
              <IonCol size="4">
                <IonImg src={covid} />
              </IonCol>
              <IonCol size="7" style={{ marginTop: '18px' }}>
                <IonListHeader>
                  <IonText color="light">Novel Coronavirus</IonText>
                </IonListHeader>
              </IonCol>
            </IonRow>
          </IonGrid>
          {menuItems()}
        </IonList>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Informasi</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonText>
              Dalam pembuatan aplikasi ini, data yang didapat berasar dari :
              <ul>
                <li>Kawal Corona API</li>
                <li>Johns Hopkins University</li>
                <li>RAPID API</li>
                <li>Alo Dokter</li>
              </ul>
              Jika tidak memiliki kepentingan khusus, diam #dirumahaja. Jangan menjadi COVIDIOT ya gaes!<br/>
              #staysafe #WorkFromHome #rebahansantuy #socialdistancing
            </IonText>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonMenu>
  );
};

export default withRouter(Menu);
