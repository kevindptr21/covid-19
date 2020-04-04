import React, { useState, useEffect } from 'react';
import { IonCard, IonCardHeader, IonCardContent, IonCardTitle, IonGrid, IonRow, IonCol, IonCardSubtitle, IonItemDivider, IonRefresher, IonContent, IonPage, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonSpinner, IonSkeletonText } from '@ionic/react';
import { RefresherEventDetail } from '@ionic/core';

const ID: React.FC = () => {
    const rapidApiHost = "covid-193.p.rapidapi.com";
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
            "https://covid-193.p.rapidapi.com/statistics?country=Indonesia",
            "https://covid-193.p.rapidapi.com/history?country=Indonesia"
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
                getStats => setID(getStats.response) :
                getHistory => jsonData.push(getHistory.response)
            ).then(() => {
                console.log(jsonData)

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

    const data = {
        tanggal: loading ? <IonSkeletonText animated /> : ID.map(isi => isi.time.replace(/T/i," ")),
        total_kasus: loading ? <IonSpinner /> : ID.map(isi => isi.cases.total),
        meninggal: loading ? <IonSpinner /> : ID.map(isi => isi.deaths.total),
        sembuh: loading ? <IonSpinner /> : ID.map(isi => isi.cases.recovered),
        perawatan: loading ? <IonSpinner /> : ID.map(isi => isi.cases.active),
        kasus_baru: loading ? <IonSkeletonText animated /> : ID.map(isi => isi.cases.new),
        kematian_baru: loading ? <IonSkeletonText animated /> : ID.map(isi => isi.deaths.new)
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color="danger">
                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle>COVID-19 INDONESIA</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent color="dark">
                <IonRefresher slot="fixed" onIonRefresh={doRefresh} />
                <IonCard>
                    <IonCardHeader className="ion-text-center">
                        <IonCardTitle >Update Kasus Corona di Indonesia</IonCardTitle>
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
                                    <IonCardTitle style={{ fontSize: "30px" }}>{data.meninggal}</IonCardTitle>
                                </IonCardContent>
                            </IonCard>
                        </IonCol>
                        <IonCol>
                            <IonCard color="success">
                                <IonCardHeader>
                                    <IonCardTitle>Sembuh</IonCardTitle>
                                </IonCardHeader>
                                <IonCardContent>
                                    <IonCardTitle style={{ fontSize: "30px" }}>{data.sembuh}</IonCardTitle>
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
                                    <IonCardTitle style={{ fontSize: "30px" }}>{data.perawatan}</IonCardTitle>
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
                                <IonCol size="3">Tanggal :</IonCol>
                                <IonCol>{data.tanggal}</IonCol>
                            </IonRow>
                        </IonCardSubtitle>
                    </IonCardHeader>
                    <IonCardContent>
                        <IonCardTitle style={{ fontSize: "30px",color:'red' }}>
                            <IonRow>
                                <IonCol>{data.total_kasus}</IonCol>
                            </IonRow>
                        </IonCardTitle>
                        <IonItemDivider />
                        <IonRow>
                            <IonCol>Temuan Kasus Baru</IonCol>
                            <IonCol size="1">:</IonCol>
                            <IonCol>{data.kasus_baru}</IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>Kematian Baru</IonCol>
                            <IonCol size="1">:</IonCol>
                            <IonCol>{data.kematian_baru}</IonCol>
                        </IonRow>
                    </IonCardContent>
                </IonCard>
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
                            {loading ? <IonSpinner /> :
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
                            }
                        </IonGrid>
                    </IonCardContent>
                </IonCard>
            </IonContent>
        </IonPage >
    )
}

export default ID;