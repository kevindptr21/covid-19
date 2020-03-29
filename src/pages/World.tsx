import React, { useEffect, useState } from 'react';
import { IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonLoading, IonRow, IonCol, IonGrid, IonCardContent, IonItemDivider, IonRefresher } from '@ionic/react';
import WaitingContent2 from '../components/WaitingContent2';
import { RefresherEventDetail } from '@ionic/core';

const World: React.FC = () => {
    const rapidApiHost = "coronavirus-monitor.p.rapidapi.com";
    const rapidApiKey = "2ddb35739emshcd2a46143e34353p14d8e1jsn709560cb6c5f";
    const [world, setWorld] = useState<any>([]);
    const [allCountry, setAllCountry] = useState<any>([]);
    const [loading, setLoading] = useState(true);
    const [state, setState] = useState(0);

    function doRefresh(event: CustomEvent<RefresherEventDetail>) {
        console.log('Begin async operation');
        setState(state + 1);
        setLoading(true);
        setTimeout(() => {
            console.log('Async operation has ended');
            event.detail.complete();
        }, 2000);
    }

    useEffect(() => {
        const urls = [
            "https://coronavirus-monitor.p.rapidapi.com/coronavirus/worldstat.php",
            "https://coronavirus-monitor.p.rapidapi.com/coronavirus/cases_by_country.php"
        ];
        urls.map(async (url: string, index) => {
            await fetch(url, {
                "method": "GET",
                "headers": {
                    "x-rapidapi-host": rapidApiHost,
                    "x-rapidapi-key": rapidApiKey
                }
            })
                .then(response => {
                    return response.json()
                })
                .then(index === 0 ?
                    data => setWorld(data) :
                    ({ countries_stat }) => setAllCountry(countries_stat)
                ).then(() => {
                    setLoading(false);
                }).catch(rejected => {
                    console.log(rejected)
                })
        })

    }, [state])



    return (
        <div>
            <IonRefresher slot="fixed" onIonRefresh={doRefresh} />
            <IonLoading isOpen={loading} message="Getting Data" />
            {
                loading ? <WaitingContent2 /> :
                    !loading ?
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
                                                <IonCardTitle style={{ fontSize: "30px" }}>{world.total_deaths}</IonCardTitle>
                                            </IonCardContent>
                                        </IonCard>
                                    </IonCol>
                                    <IonCol>
                                        <IonCard color="success">
                                            <IonCardHeader>
                                                <IonCardTitle>Sembuh</IonCardTitle>
                                            </IonCardHeader>
                                            <IonCardContent>
                                                <IonCardTitle style={{ fontSize: "30px" }}>{world.total_recovered}</IonCardTitle>
                                            </IonCardContent>
                                        </IonCard>
                                    </IonCol>
                                </IonRow>
                            </IonGrid>

                            <IonCard>
                                <IonCardHeader>
                                    <IonCardTitle>Total Kasus Terkonfirmasi</IonCardTitle>
                                    <IonCardSubtitle>Tanggal : {world.statistic_taken_at}</IonCardSubtitle>
                                </IonCardHeader>
                                <IonCardContent>
                                    <IonCardTitle style={{ fontSize: "30px" }}>{world.total_cases}</IonCardTitle>
                                    <IonItemDivider />
                                    <pre>
                                        Temuan Kasus Baru           : {world.new_cases}<br />
                                    Kematian Baru               : {world.new_deaths}<br />
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
                                        <div style={{ height: "200px", overflow: "scroll" }}>
                                            {allCountry.map((ac: any, index: number) => {
                                                var no = index + 1;
                                                return (
                                                    <IonRow key={index}>
                                                        <IonCol size="2">{no}</IonCol>
                                                        <IonCol size="3">{ac.country_name}</IonCol>
                                                        <IonCol>{ac.cases}</IonCol>
                                                        <IonCol>{ac.total_recovered}</IonCol>
                                                        <IonCol>{ac.deaths}</IonCol>
                                                    </IonRow>
                                                )
                                            })}
                                        </div>
                                    </IonGrid>
                                </IonCardContent>
                            </IonCard>
                        </div>
                        : " "
            }
        </div>
    )
}

export default World;