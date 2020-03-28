import React, { useState } from 'react';
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonText, IonIcon, IonItem } from '@ionic/react';
import { chevronUpCircleOutline, chevronDownCircleOutline } from 'ionicons/icons';

const NCOVID: React.FC = () => {
    const [covid, setCovid] = useState(false);
    const [gejala, setGejala] = useState(true);
    const [penularan, setPenularan] = useState(true);
    const [pencegahan, setPencegahan] = useState(true);
    return (
        <div>
            <IonCard button>
                <IonCardHeader >
                    <IonItem onClick={covid ? () => setCovid(false) : () => setCovid(true)}>
                        <IonCardTitle>Apa Itu Coronavirus?</IonCardTitle>
                        <IonIcon src={covid ? chevronUpCircleOutline : chevronDownCircleOutline} style={{ fontSize: "30px" }} />
                    </IonItem>
                </IonCardHeader>
                <IonCardContent hidden={covid}>
                    <IonText>
                        Severe acute respiratory syndrome coronavirus 2 <b>(SARS-CoV-2)</b> yang lebih dikenal dengan nama virus Corona adalah
                        jenis baru dari coronavirus yang menular ke manusia. Virus ini bisa menyerang siapa saja,
                        baik bayi, anak-anak, orang dewasa, lansia, ibu hamil, maupun ibu menyusui.<br />
                        Infeksi virus ini disebut <b>COVID-19</b> dan pertama kali ditemukan di kota Wuhan, Cina, pada akhir
                        Desember 2019. Virus ini menular dengan cepat dan telah menyebar ke wilayah lain di Cina dan ke
                        beberapa negara, termasuk Indonesia.<br />
                        Coronavirus adalah kumpulan virus yang bisa menginfeksi sistem pernapasan. Pada banyak kasus,
                        virus ini hanya menyebabkan infeksi pernapasan ringan, seperti flu.
                        Namun, virus ini juga bisa menyebabkan infeksi pernapasan berat, seperti infeksi paru-paru (pneumonia),
                        Middle-East Respiratory Syndrome (MERS), dan Severe Acute Respiratory Syndrome (SARS).
                    </IonText>
                </IonCardContent>
            </IonCard>

            <IonCard button>
                <IonCardHeader >
                    <IonItem onClick={gejala ? () => setGejala(false) : () => setGejala(true)}>
                        <IonCardTitle>Apa saja gejala dari Coronavirus?</IonCardTitle>
                        <IonIcon src={gejala ? chevronUpCircleOutline : chevronDownCircleOutline} style={{ fontSize: "30px" }} />
                    </IonItem>
                </IonCardHeader>
                <IonCardContent hidden={gejala}>
                    <IonText>
                        Infeksi virus Corona atau COVID-19 bisa menyebabkan penderitanya mengalami gejala flu, 
                        seperti demam, pilek, batuk, sakit tenggorokan, dan sakit kepala; atau gejala penyakit infeksi pernapasan berat, 
                        seperti demam tinggi, batuk berdahak bahkan berdarah, sesak napas, dan nyeri dada.<br/>
                        Namun, secara umum ada 3 gejala umum yang bisa menandakan seseorang terinfeksi virus Corona, yaitu:
                        <ul>
                            <li>Demam (suhu tubuh di atas 38 derajat Celcius)</li>
                            <li>Batuk</li>
                            <li>Sesak napas</li>
                        </ul>
                        Menurut penelitian, gejala COVID-19 muncul dalam waktu 2 hari sampai 2 minggu setelah terpapar virus Corona.
                    </IonText>
                </IonCardContent>
            </IonCard>

            <IonCard button>
                <IonCardHeader >
                    <IonItem onClick={penularan ? () => setPenularan(false) : () => setPenularan(true)}>
                        <IonCardTitle>Bagaimana Cara Penularannya?</IonCardTitle>
                        <IonIcon src={penularan ? chevronUpCircleOutline : chevronDownCircleOutline} style={{ fontSize: "30px" }} />
                    </IonItem>
                </IonCardHeader>
                <IonCardContent hidden={penularan}>
                    <IonText>
                        Infeksi virus Corona atau COVID-19 disebabkan oleh coronavirus, yaitu kelompok virus yang 
                        menginfeksi sistem pernapasan. Pada sebagian besar kasus, coronavirus hanya menyebabkan infeksi 
                        pernapasan ringan sampai sedang, seperti flu. Akan tetapi, virus ini juga bisa menyebabkan infeksi 
                        pernapasan berat, seperti pneumonia, Middle-East Respiratory Syndrome (MERS), dan 
                        Severe Acute Respiratory Syndrome (SARS).<br/>
                        Ada dugaan bahwa virus Corona awalnya ditularkan dari hewan ke manusia. Namun, kemudian 
                        diketahui bahwa virus Corona juga menular dari manusia ke manusia.<br/>
                        Seseorang dapat tertular COVID-19 melalui berbagai cara, yaitu:
                        <ul>
                            <li>Tidak sengaja menghirup percikan ludah dari bersin atau batuk penderita COVID-19</li>
                            <li>
                                Memegang mulut atau hidung tanpa mencuci tangan terlebih dulu setelah menyentuh 
                                benda yang terkena cipratan air liur penderita COVID-19
                            </li>
                            <li>Kontak jarak dekat dengan penderita COVID-19, misalnya bersentuhan atau berjabat tangan</li>
                        </ul>
                        Virus Corona dapat menginfeksi siapa saja, tetapi efeknya akan lebih berbahaya atau 
                        bahkan fatal bila terjadi pada orang lanjut usia, ibu hamil, orang yang sedang sakit, atau 
                        orang yang daya tahan tubuhnya lemah.
                    </IonText>
                </IonCardContent>
            </IonCard>

            <IonCard button>
                <IonCardHeader >
                    <IonItem onClick={pencegahan ? () => setPencegahan(false) : () => setPencegahan(true)}>
                        <IonCardTitle>Bagaimana Cara Pencegahannya?</IonCardTitle>
                        <IonIcon src={pencegahan ? chevronUpCircleOutline : chevronDownCircleOutline} style={{ fontSize: "30px" }} />
                    </IonItem>
                </IonCardHeader>
                <IonCardContent hidden={pencegahan}>
                    <IonText>
                        Sampai saat ini, belum ada vaksin untuk mencegah infeksi virus Corona atau COVID-19. 
                        Oleh sebab itu, cara pencegahan yang terbaik adalah dengan menghindari faktor-faktor 
                        yang bisa menyebabkan Anda terinfeksi virus ini, yaitu:
                        <ul>
                            <li>Hindari bepergian ke tempat-tempat umum yang ramai pengunjung (social distancing).</li>
                            <li>Gunakan masker saat beraktivitas di tempat umum atau keramaian.</li>
                            <li>
                                Rutin mencuci tangan dengan air dan sabun atau hand sanitizer yang mengandung 
                                alkohol minimal 60% setelah beraktivitas di luar rumah atau di tempat umum.
                            </li>
                            <li>Jangan menyentuh mata, mulut, dan hidung sebelum mencuci tangan.</li>
                            <li>Hindari kontak dengan hewan, terutama hewan liar. Bila terjadi kontak 
                                dengan hewan, cuci tangan setelahnya.
                            </li>
                            <li>Masak daging sampai benar-benar matang sebelum dikonsumsi.</li>
                            <li>
                                Tutup mulut dan hidung dengan tisu saat batuk atau bersin, 
                                kemudian buang tisu ke tempat sampah.
                            </li>
                            <li>Hindari berdekatan dengan orang yang sedang sakit demam, batuk, atau pilek.</li>
                            <li>Jaga kebersihan benda yang sering disentuh dan kebersihan lingkungan.</li>
                        </ul>
                        Untuk orang yang diduga terkena COVID-19 atau termasuk kategori ODP (orang dalam pemantauan), 
                        ada beberapa langkah yang bisa dilakukan agar virus Corona tidak menular ke orang lain, yaitu:
                        <ul>
                            <li>Jangan keluar rumah, kecuali untuk mendapatkan pengobatan.</li>
                            <li>
                                Periksakan diri ke dokter hanya bila Anda mengalami gejala gangguan pernapasan yang 
                                disertai demam atau memenuhi kriteria PDP (pasien dalam pengawasan).
                            </li>
                            <li>
                                Usahakan untuk tinggal terpisah dari orang lain untuk sementara waktu. Bila tidak memungkinkan, 
                                gunakan kamar tidur dan kamar mandi yang berbeda dengan yang digunakan orang lain.
                            </li>
                            <li>
                                Larang dan cegah orang lain untuk mengunjungi atau menjenguk Anda 
                                sampai Anda benar-benar sembuh.
                            </li>
                            <li>Sebisa mungkin jangan melakukan pertemuan dengan orang yang sedang sedang sakit.</li>
                            <li>
                                Hindari berbagi penggunaan alat makan dan minum, alat mandi, serta perlengkapan 
                                tidur dengan orang lain.
                            </li>
                            <li>
                                Pakai masker dan sarung tangan bila sedang berada di tempat umum 
                                atau sedang bersama orang lain.
                            </li>
                            <li>
                                Gunakan tisu untuk menutup mulut dan hidung bila batuk atau bersin, 
                                lalu segera buang tisu ke tempat sampah.
                            </li>
                        </ul>
                    </IonText>
                </IonCardContent>
            </IonCard>

        </div >
    )
}

export default NCOVID;