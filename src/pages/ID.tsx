import React, { useState, useEffect } from 'react';
import WaitingContent from './../components/WaitingContent';
import { IonCard, IonLoading, IonCardHeader, IonCardContent, IonCardTitle, IonGrid, IonRow, IonCol, IonCardSubtitle, IonItemDivider, IonRefresher} from '@ionic/react';
import { RefresherEventDetail } from '@ionic/core';

const ID: React.FC = () => {
    let url = "https://coronavirus-monitor.p.rapidapi.com/coronavirus/latest_stat_by_country.php?country=indonesia";
    const rapidApiHost = "coronavirus-monitor.p.rapidapi.com";
    const rapidApiKey = "2ddb35739emshcd2a46143e34353p14d8e1jsn709560cb6c5f";
    const [loading, setLoading] = useState(true);
    const [ID, setID] = useState([]);
    const [province, setProvince] = useState([]);
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
        fetch(url, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": rapidApiHost,
                "x-rapidapi-key": rapidApiKey
            }
        }).then(async response => {
            await response.json().then(({ latest_stat_by_country }) => setID(latest_stat_by_country));
            setLoading(false)
        }).catch(rejected => {
            console.log(rejected)
        })


        const getStatIndonesia = async () => {
            await fetch('https://api.kawalcorona.com/indonesia/provinsi/')
                .then(response2 => {
                    return response2.json();
                }).then((data) => {
                    setProvince(data)
                }).catch(rejected => {
                    console.log(rejected)
                })

        }

        getStatIndonesia();

    }, [url, state])

    return (
        <div>
            <IonRefresher slot="fixed" onIonRefresh={doRefresh}/>
            <IonLoading isOpen={loading} message="Getting Data" />
            {loading ? <WaitingContent /> :
                <div>
                    <IonCard>
                        <IonCardHeader className="ion-text-center">
                            <IonCardTitle >Update Kasus Corona di Indonesia</IonCardTitle>
                        </IonCardHeader>
                    </IonCard>
                    {ID.map((isi: any, index) => {
                        return (
                            <div key={index}>
                                <IonGrid>
                                    <IonRow className="ion-text-center">
                                        <IonCol>
                                            <IonCard color="danger">
                                                <IonCardHeader>
                                                    <IonCardTitle>Meninggal</IonCardTitle>
                                                </IonCardHeader>
                                                <IonCardContent>
                                                    <IonCardTitle style={{ fontSize: "30px" }}>{isi.total_deaths}</IonCardTitle>
                                                </IonCardContent>
                                            </IonCard>
                                        </IonCol>
                                        <IonCol>
                                            <IonCard color="success">
                                                <IonCardHeader>
                                                    <IonCardTitle>Sembuh</IonCardTitle>
                                                </IonCardHeader>
                                                <IonCardContent>
                                                    <IonCardTitle style={{ fontSize: "30px" }}>{isi.total_recovered}</IonCardTitle>
                                                </IonCardContent>
                                            </IonCard>
                                        </IonCol>
                                    </IonRow>
                                    <IonRow className="ion-text-center">
                                        <IonCol>
                                            <IonCard color="warning">
                                                <IonCardHeader>
                                                    <IonCardTitle>Dalam Perawatan</IonCardTitle>
                                                </IonCardHeader>
                                                <IonCardContent>
                                                    <IonCardTitle style={{ fontSize: "30px" }}>{isi.active_cases}</IonCardTitle>
                                                </IonCardContent>
                                            </IonCard>
                                        </IonCol>
                                    </IonRow>
                                </IonGrid>
                                <IonCard>
                                    <IonCardHeader>
                                        <IonCardTitle>Total Kasus Terkonfirmasi</IonCardTitle>
                                        <IonCardSubtitle>Tanggal : {isi.record_date}</IonCardSubtitle>
                                    </IonCardHeader>
                                    <IonCardContent>
                                        <IonCardTitle style={{ fontSize: "30px" }}>{isi.total_cases}</IonCardTitle>

                                        <IonItemDivider />
                                        <pre>
                                            Temuan Kasus Baru           : {isi.new_cases}<br />
                                            Kematian Baru               : {isi.new_deaths}<br />
                                        </pre>
                                    </IonCardContent>
                                </IonCard>
                            </div>
                        )
                    })
                    }
                </div>
            }
            {
                !loading ?
                    <IonCard>
                        <IonCardHeader>
                            <IonCardTitle className="ion-text-center">Data Kasus Corona Tiap Provinsi</IonCardTitle>
                        </IonCardHeader>
                        <IonCardContent>
                            <IonGrid>
                                <IonRow>
                                    <IonCol size="1">No.</IonCol>
                                    <IonCol size="4">Provinsi</IonCol>
                                    <IonCol>Total Kasus</IonCol>
                                    <IonCol >Sembuh</IonCol>
                                    <IonCol>Meninggal</IonCol>
                                </IonRow>
                                <div style={{ height: "200px", overflow: "scroll" }}>
                                    {province.map((iis: any, index) => {
                                        var no = index + 1;
                                        return (
                                            <IonRow key={index}>
                                                <IonCol size="1">{no}</IonCol>
                                                <IonCol size="4">{iis.attributes.Provinsi}</IonCol>
                                                <IonCol>{iis.attributes.Kasus_Posi}</IonCol>
                                                <IonCol>{iis.attributes.Kasus_Semb}</IonCol>
                                                <IonCol>{iis.attributes.Kasus_Meni}</IonCol>
                                            </IonRow>
                                        )
                                    })}
                                </div>

                            </IonGrid>

                        </IonCardContent>
                    </IonCard> : " "
            }
        </div>
    )
}

export default ID;