import React from 'react';
import { IonCard, IonCardHeader, IonCardTitle, IonGrid, IonRow, IonCol, IonCardContent, IonItemDivider, IonCardSubtitle, IonSpinner } from '@ionic/react';

const WaitingContent2: React.FC = () => {
    return (
        <div>
            <IonCard>
                <IonCardHeader className="ion-text-center">
                    <IonCardTitle >Update Kasus Corona di Dunia</IonCardTitle>
                </IonCardHeader>
            </IonCard>
            <IonGrid>
                <IonRow className="ion-text-center">
                    <IonCol>
                        <IonCard color="danger">
                            <IonCardHeader>
                                <IonCardTitle>Meninggal</IonCardTitle>
                            </IonCardHeader>
                            <IonCardContent>
                                <IonCardTitle style={{ fontSize: "30px" }}>- - -</IonCardTitle>
                            </IonCardContent>
                        </IonCard>
                    </IonCol>
                    <IonCol>
                        <IonCard color="success">
                            <IonCardHeader>
                                <IonCardTitle>Sembuh</IonCardTitle>
                            </IonCardHeader>
                            <IonCardContent>
                                <IonCardTitle style={{ fontSize: "30px" }}>- - -</IonCardTitle>
                            </IonCardContent>
                        </IonCard>
                    </IonCol>
                </IonRow>
            </IonGrid>

            <IonCard>
                <IonCardHeader>
                    <IonCardTitle>Total Kasus Terkonfirmasi</IonCardTitle>
                    <IonCardSubtitle>Tanggal : - - -</IonCardSubtitle>
                </IonCardHeader>
                <IonCardContent>
                    <IonCardTitle style={{ fontSize: "30px" }}>- - -</IonCardTitle>
                    <IonItemDivider />
                    <pre>
                        Temuan Kasus Baru           : - - -<br />
                        Kematian Baru               : - - -<br />
                    </pre>
                </IonCardContent>
            </IonCard>



            <IonCard>
                    <IonCardHeader>
                        <IonCardTitle className="ion-text-center">Data Kasus Corona Tiap Negara</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                        <IonGrid>
                            <IonRow>
                                <IonCol size="2">No.</IonCol>
                                <IonCol size="3">Negara</IonCol>
                                <IonCol>Total Kasus</IonCol>
                                <IonCol >Sembuh</IonCol>
                                <IonCol>Meninggal</IonCol>
                            </IonRow>
                            <IonSpinner className="ion-text-center"/>

                        </IonGrid>
                        
                    </IonCardContent>
                </IonCard>
        </div>
    )
}

export default WaitingContent2;