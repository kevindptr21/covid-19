import React, { useEffect, useState } from 'react';
import { IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonRow, IonCol, IonGrid, IonCardContent, IonItemDivider, IonRefresher, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, IonPage, IonSpinner, IonSkeletonText } from '@ionic/react';
import { RefresherEventDetail } from '@ionic/core';

const World: React.FC = () => {
    const rapidApiHost = "coronavirus-monitor.p.rapidapi.com";
    const rapidApiKey = "2ddb35739emshcd2a46143e34353p14d8e1jsn709560cb6c5f";
    const [data, setData] = useState<any>([]);
    const [allCountry, setAllCountry] = useState<any[]>([]);
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
                    data => setData(data) :
                    ({ countries_stat }) => setAllCountry(countries_stat)
                ).then(() => {
                    setLoading(false);
                }).catch(rejected => {
                    console.log(rejected)
                })
        })

    }, [state]);

    const secondWorld = {
        tanggal: loading ? <IonSkeletonText animated /> : data.statistic_taken_at,
        sembuh: loading ? <IonSpinner /> : data.total_recovered,
        meninggal: loading ? <IonSpinner /> : data.total_deaths,
        total_kasus: loading ? <IonSpinner /> : data.total_cases,
        kasus_baru: loading ? <IonSkeletonText animated /> : data.new_cases,
        kematian_baru: loading ? <IonSkeletonText animated /> : data.new_deaths
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color="danger">
                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle>COVID-19 DUNIA</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent color="dark">
                <IonRefresher slot="fixed" onIonRefresh={doRefresh} />
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
                                    <IonCardTitle style={{ fontSize: "30px" }}>{secondWorld.meninggal}</IonCardTitle>
                                </IonCardContent>
                            </IonCard>
                        </IonCol>
                        <IonCol>
                            <IonCard color="success">
                                <IonCardHeader>
                                    <IonCardTitle>Sembuh</IonCardTitle>
                                </IonCardHeader>
                                <IonCardContent>
                                    <IonCardTitle style={{ fontSize: "30px" }}>{secondWorld.sembuh}</IonCardTitle>
                                </IonCardContent>
                            </IonCard>
                        </IonCol>
                    </IonRow>
                </IonGrid>

                <IonCard>
                    <IonCardHeader>
                        <IonCardTitle>
                            <IonRow>
                                <IonCol>Total Kasus Terkonfirmasi</IonCol>
                            </IonRow>
                        </IonCardTitle>
                        <IonCardSubtitle>
                            <IonRow>
                                <IonCol size="3">
                                    Tanggal :
                                    </IonCol>
                                <IonCol>
                                    {secondWorld.tanggal}
                                </IonCol>
                            </IonRow>
                        </IonCardSubtitle>
                    </IonCardHeader>
                    <IonCardContent>
                        <IonCardTitle style={{ fontSize: "30px",color:"red" }}>
                            <IonRow>
                                <IonCol>{secondWorld.total_kasus}</IonCol>
                            </IonRow>
                        </IonCardTitle>
                        <IonItemDivider/>
                        <IonRow>
                            <IonCol>Temuan Kasus Baru</IonCol>
                            <IonCol size="1">:</IonCol>
                            <IonCol>{secondWorld.kasus_baru}</IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>Kematian Baru</IonCol>
                            <IonCol size="1">:</IonCol>
                            <IonCol>{secondWorld.kematian_baru}</IonCol>
                        </IonRow>
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
                            {loading ? <IonSpinner /> :
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
                            }
                        </IonGrid>
                    </IonCardContent>
                </IonCard>
            </IonContent>
        </IonPage>
    )
}

export default World;