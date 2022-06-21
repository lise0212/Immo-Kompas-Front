<template>
    <div class="main">
        <nav class="nav">
            <ul class="nav-list">
                <li><img class="logo-nav nav-list-item-logo" src="../assets/LogoImmoKompasWit.png" alt="Logo Kleur" @click="goToPage('home')"></li>
                <!-- <li><button class="nav-list-item" @click="goToPage('home')">Home</button></li> -->
                <li><button class="nav-list-item" @click="goToPage('buyer')"><b>Zoeken</b></button></li>
                <li><button class="nav-list-item" @click="goToPage('agent')"><b>Zoekertje plaatsen</b></button></li>
                <li v-show="isNotIngelogd"><button class="nav-list-item" @click="goToPage('login')"><b>Login</b></button></li>
                <li v-show="isIngelogd"><button class="nav-list-item" @click="removeCookie()"><b>Logout</b></button></li>
                <li><button class="nav-list-item" @click="goToPage('contact')"><b>Contact</b></button></li>
            </ul>
        </nav>

        <header class="header">
            <div class="text-box">
                <h1 class="heading-primary">
                    <span class="heading-primary-main">Tips & tricks</span><br>
                    <span class="heading-primary-sub">vind hier alle tips & tricks voor het kopen van je toekomstige woning.</span>
                </h1>
            </div>
        </header>
        <div class="frameTips">
            <h2>Hoe begin je aan je zoektocht?</h2>
            <p>Ga allereerst langs de bank voor een eerste advies om te bepalen wat je budget gaat zijn voor je woning. Je zult natuurlijk ook een hypothecaire 
                lening moeten aangaan vooraleer je een woning kan kopen. Ook hiervoor moet je bij je bank zijn.</p>
            <p>Vooraleer je blindelings op zoek gaat naar de perfecte woning kan je best ook al eens nagedacht hebben over volgende zaken. 
                Op welke locatie wil je dat je woning gelegen is? Dit is één van de belangrijkste punten aan een woning aangezien je
            deze eigenschap niet kan veranderen. Het beïnvloedt al je verplaatsingen. Wil je ergens nabij een stad of op het platteland gaan wonen? 
            Moet je regelmatig met het openbaar vervoer ergens heen? Wil je dat de locatie dichtbij werk, familie of vrienden is? Dicht bij
            een school? Vergeet niet dat een behoefte eventueel kan veranderen op termijn.</p>
            <p>Eens de locatie vast ligt kan je verder gaan nadenken. Wil je een huis of een appartement? In wat voor buurt wil je graag wonen? Wil je nog renoveren, wil je een
            instapklare woning of wil je een nieuwbouwwoning? Heb je graag een tuin of een terras? Heb je huisdieren en wat zijn hier de behoeften? Hoeveel kamers wil je ter beschikking? 
            Een eventuele kinderwens kan hier een verandering teweeg brengen.</p>
            <p>
                <b>Tip: </b> Denk na over wat je 'must-haves' & 'nice-to-haves' zijn. <br><br>
                Je kan zo bijvoorbeeld een lijstje opstellen waarbij elke eis/wens verbonden is aan een bepaald aantal punten. Hieronder enkele voorbeelden 
                (bepaal dus zelf wat voor jou belangrijk is en de waarde ervan) voor een puntensysteem:
                <ul>
                    <li>Locatie binnen een straal 2 km van punt X: 200 punten</li>
                    <li>Locatie binnen een straal van 5 km van punt X: 150 punten</li>
                    <li>Extra kamer (bijvoorbeeld wasruimte): 50 punten</li>
                    <li>Extra bureauruimte: 50 punten</li>
                    <li>Goede lichtinval: 50 punten</li>
                    <li>Energieprestatiecertificaat (EPC) met label D of hoger: 50 punten per graad hoger</li>
                    <li>Gemakkelijke parkeerplaats in de buurt: 35 punten</li>
                    <li>Visvijver: -30 punten (waarom niet negatief gaan?)</li>
                </ul>
            </p>
            <p><b>Tip: </b> Overloop je lijsttje met meerdere mensen.</p>
            <br>
            <h2>Waarop moet je letten bij een bezoek?</h2>
            <p>Bingo, je hebt een woning gevonden! <br><br>
            <b>Tip: </b>Bezoek een woning die je aanspreekt nog een tweede keer. <br><br>
            Je krijgt zoveel te zien dat je vaak niet de tijd hebt om ook alle details te overlopen. Hou je lijstje, dat je vooraf hebt gemaakt, bij je zodat je zaken kunt afvinken
            en hou ook steeds je budget in het oog.</p>
            
            <h4>Let bij een eerste bezoek op:</h4>
            <p>
                <ul>
                    <li>Ligging</li>
                    <li>Staat van de woning (instapklaar, verbouwingen nodig?)</li>
                    <li>Hoe is de omgeving?</li>
                    <li>Bereikbaarheid? (Openbaar vervoer en dergelijke)</li>
                    <li>Voorzieningen in de buurt? (Supermarkten, scholen, dokters, tankstations, bakkers,…)</li>
                    <li>...</li>
                </ul>
            </p>  
            <h4>Let bij een tweede bezoek op:</h4>
            <p>
                <ul>
                    <li>Afwerking (elektriciteit, verwarming, isolatie, vochtproblemen,...)</li>
                    <li>Opbergruimte aanwezig?</li>
                    <li>Hoe is de omgeving?</li>
                    <li>Kelder en/of zolder aanwezig?</li>
                    <li>...</li>
                </ul>
                <b>Tip: </b> Bezoek een woning wanneer het licht is, zo zie je meteen ook hoe de lichtinval is.
            </p>  

            <h4>Attesten</h4>
            <p> Er zijn heel wat attesten die je moet kunnen voorleggen als verkoper van een pand. Vraag deze ook zeker op zodat je weet wat je koopt.
                <ul>
                    <li>Asbestattest</li>
                    <li>Bodemattes</li>
                    <li>Stedenbouwkundig uittreksel</li>
                    <li>Postinterventiedossier</li>
                    <li>Keuring elektrische installatie</li>
                    <li>Energieprestatiecertificaat</li>
                    <li>Notariële aankoopakte</li>
                    <li>Uittreksel van het kadaster</li>
                    <li>Kadastraal plan</li>
                    <li>Overstromingsgevoeligheid</li>
                    <li>Certificaat van eventuele stookolietank</li>
                </ul>
                <b>Tip: </b> Inludeer altijd opschortende voorwaarden in je compromis.
            </p>  
            <br>
            <h2>Wat als je wil verbouwen?</h2>
            <p>Wanneer je eventuele verbouwingen wil doorvoeren hou dan zeker rekening met volgende zaken:
                <ul>
                    <li>Bouwovertredingen</li>
                    <li>Ligt de woning in een zonevreemd gebied</li>
                    <li>Bodemvervuiling</li>
                    <li>Erfdienstbaarheden</li>
                    <li>Huurovereenkomst</li>
                    <li>Mogelijkheid tot onteigening</li>
                </ul>
                Deze bezwarende omstandigheden kan je laten onderzoeken door je notaris. Zorg ervoor dat je hiervan weet voor het ondertekenen van de notariële akte.
                <br><br>
                <b>Tip: </b>laat je niet opjagen, zorg ervoor dat je alles goed bekeken hebt.
            </p>
        </div>

        
        <div class="footer">
            <div class="column-50-footer">
                <button class="button-footer" @click="goToPage('buyer')"><b>Zoeken</b></button>
                <button class="button-footer" @click="goToPage('agent')"><b>Zoekertje plaatsen</b></button>
                <button v-show="isNotIngelogd" class="button-footer" @click="goToPage('login')"><b>Login</b></button>
                <button v-show="isIngelogd" class="button-footer" @click="removeCookie()"><b>Logout</b></button>
            </div>
            <div class="column-50-footer logo-footer">
                <img @click="goToPage('home')" class="logoVolledig" src="../assets/LogoGroot.png" alt="LogoGroot">
            </div>
        </div>
    </div>
    
</template>

<script>
    // export
    export default {
        name: "tips",
        data(){
            return{
                isNotIngelogd:false,
                isIngelogd:false
            }
        },
        methods: {
            goToPage(page){
                this.$emit("change-page", page);
            },
            isLoggedIN(){
                const ingelogd = ('; '+document.cookie).split("; ingelogd=").pop().split(';')[0];
                // const rol = ('; '+document.cookie).split("; rol=").pop().split(';')[0];
                // console.log(ingelogd +' '+ rol)
                if(ingelogd=='true'){
                    this.isIngelogd=true
                    this.isNotIngelogd=false
                }
                else{
                    this.isIngelogd=false
                    this.isNotIngelogd=true
                }
            },
            removeCookie(){
                document.cookie = "ingelogd=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                document.cookie = "rol=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                document.cookie = "userID=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                document.cookie = "agentID=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                this.isIngelogd=false
                this.isNotIngelogd=true
            }
        },
        beforeMount(){
            this.isLoggedIN()
        }
    }
</script>