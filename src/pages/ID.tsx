import React, { useState, useEffect } from 'react';
import WaitingContent from './../components/WaitingContent';
import { IonCard, IonLoading, IonCardHeader, IonCardContent, IonCardTitle, IonGrid, IonRow, IonCol, IonCardSubtitle, IonItemDivider, IonRefresher } from '@ionic/react';
import { RefresherEventDetail } from '@ionic/core';

const ID: React.FC = () => {
    const rapidApiHost = "coronavirus-monitor.p.rapidapi.com";
    const rapidApiKey = "2ddb35739emshcd2a46143e34353p14d8e1jsn709560cb6c5f";
    const [loading, setLoading] = useState(true);
    const [ID, setID] = useState<any[]>([]);
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
        const urls = [
            "https://coronavirus-monitor.p.rapidapi.com/coronavirus/latest_stat_by_country_name.php?country=indonesia",
            "https://coronavirus-monitor.p.rapidapi.com/coronavirus/cases_by_particular_country.php?country=indonesia"
        ];
        const jsonData: any = [];
        urls.map(async (url: string, index) => {
            await fetch(url, {
                "method": "GET",
                "headers": {
                    "x-rapidapi-host": rapidApiHost,
                    "x-rapidapi-key": rapidApiKey
                }
            }).then(response => {
                return response.json();
            }).then(index === 0 ?
                ({ latest_stat_by_country }) => setID(latest_stat_by_country) :
                ({ stat_by_country }) => jsonData.push(stat_by_country)
            ).then(() => {
                // ## Activate Code Below To Get Data as CSV ##

                // let csvContent = "data:text/csv;charset=utf-8,"+"Tanggal,Perawatan,Sembuh,Meninggal,Total_Kasus\n"
                //     + jsonData[0].map((e: any) => { 
                //         const d = new Date(e.record_date);
                //         return (
                //             ((d.getDate()+"-"+(d.getMonth()+1)+"-"+d.getFullYear())+","
                //             +(e.active_cases.replace(/,/g,""))+","
                //             +(e.total_recovered.replace(/,/g,""))+","
                //             +(e.total_deaths.replace(/,/g,""))+","
                //             +(e.total_cases.replace(/,/g,"")))
                //         ) 
                //     }).join("\n");
                // var encodedUri = encodeURI(csvContent);
                // var link = document.createElement("a");
                // link.setAttribute("href", encodedUri);
                // link.setAttribute("download", "DataCoronaIndonesia.csv");
                // document.body.appendChild(link);
                // link.click();

                setLoading(false);
            }).catch(rejected => {
                console.log(rejected)
            })
        })

        const getStatIndonesia = async () => {
            await fetch('https://api.kawalcorona.com/indonesia/provinsi/')
                .then(response => {
                    return response.json();
                }).then((data) => {
                    setProvince(data)
                }).catch(rejected => {
                    console.log(rejected)
                })

        }

        getStatIndonesia();

    }, [state])

    return (
        <div>
            <IonRefresher slot="fixed" onIonRefresh={doRefresh} />
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
                    </IonCard>
                </div>
            }

        </div>
    )
}

export default ID;