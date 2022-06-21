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
                    <span class="heading-primary-main">Immo Kompas</span><br>
                    <span class="heading-primary-sub">Jouw vastgoedpartner tijdens je zoektocht</span>
                </h1>
                <button @click="goToPage('contact')" class="button-header">CONTACTEER ONS</button>
            </div>
        </header>

        <div class="frameHome ">
            <h2>VOOR WIE IS IMMO KOMPAS?</h2>
            <div class="box-container">
                <div class="box text-center">
                    <h4>Kandidaat-kopers</h4>
                    <ul class="features-list">
                        <li> Immo Kompas zoekt op basis van ons eigen algoritme het ideale pand voor jou. <br>
                        Immo Kompas is er voor jou.</li>
                        <li> Wij zoeken niet alleen de woning die bij jou past maar ook zijn we er gedurende heel het proces.</li>
                    </ul>
                    <button @click="goToPage('buyer')" class="button">ZOEK EEN MATCH</button>
                </div>

                <div class="box text-center">
                    <h4>Vastgoedmakelaars</h4>
                    <ul class="features-list">
                        <li>Ben je een vastgoedmakelaar die op zoek is naar een platform om je zoekertjes te plaatsen? <br>
                        Immo Kompas is er voor jou.</li>
                        <li> Ben je nieuw? Neem <a href="mailto:info@immokompas.be">hier</a> contact met ons op om jouw account in orde te maken.</li>
                    </ul>
                    <button @click="goToPage('agent')" class="button">PLAATS JE ZOEKERTJE</button>
                </div>
            </div>
        </div>
        <div class="banner">
            <div class="column-50-banner">
                <h2>Benieuwd naar onze tips & tricks?</h2>
            </div>
            <div class="column-50-banner">
                <button @click="goToPage('tips')" class="button-banner">bekijk ze hier</button>
            </div>
        </div>

        <div class="frameHome">
            <h2>WAAROM KIEZEN VOOR IMMO KOMPAS?</h2>
            <div class="box-container">
                <div class="box text-center">
                    <h4>Ervaring</h4>
                    <ul class="features-list">
                        <li> Onze ervaren vastgoedmakelaars staan klaar om jou hun pand(en) te tonen. <br></li>
                        <li> Met onze tips & tricks kan je je optimaal voorbereiden voor een bezoek aan je potentiële nieuwe woning.</li>
                    </ul>
                    <button @click="goToPage('tips')" class="button">Onze tips & tricks</button>
                </div>

                <div class="box text-center">
                    <h4>Persoonlijk</h4>
                    <ul class="features-list">
                        <li>Wil je graag persoonlijk advies? Dan ben je bij Immo Kompas aan het goede adres. <br>
                        Contacteer ons vrijblijvend voor een gesprek.</li>
                        <li>Immo Kompas ondersteunt je gedurende de hele periode.</li>
                    </ul>
                    <button @click="goToPage('contact')" class="button">Contacteer ons</button>
                </div>
            </div>
            <div class="box-container">
                <div class="box text-center">
                    <h4>Gedigitaliseerd</h4>
                    <ul class="features-list">
                        <li> Dankzij het gedigitaliseerde platform is het heel eenvoudig om je zoekopdracht in te geven of om een zoekertje te plaatsen.</li>
                    </ul>
                    <button @click="goToPage('buyer')" class="button">ZOEK EEN MATCH</button>
                </div>                
            </div>
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
        name: "home",
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