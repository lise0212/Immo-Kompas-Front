<template>
    <div >
        <!-- <NavigationBar></NavigationBar> -->
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
        <div class="frame">
            <img class="logo" src="../assets/LogoImmoKompas.png" alt="Logo Kleur">
            <br>
            <div class="succes" v-show="showSucces===true">
                <h1>Huis is toegevoegd!</h1>
            </div>
            <div v-show="showNewHouse===true">
                <br><br>
                <button class="button" @click="refresh()" >NIEUW HUIS TOEVOEGEN</button>
            </div>
            <div class="inputform large" v-if="showForm">
                <div class="row">
                    <div class="column-33">
                        <p class="placeholder">Type woning?</p>
                        <input class="radio" type="radio" id="appartement" value="Appartement" v-model="pickedType">
                        <label class="radio" for="appartement">Appartement</label>
                        <br>
                        <input class="radio" type="radio" id="huis" value="Huis" v-model="pickedType">
                        <label class="radio" for="huis">Huis</label>                        
                    </div>
                    <div class="column-33">
                        <p class="placeholder">Zwembad aanwezig?</p>
                        <input class="radio" type="radio" id="zwembad" value="Ja" v-model="pickedZwembad">
                        <label class="radio" for="zwembad">Ja</label>
                        <br>
                        <input class="radio" type="radio" id="nietZwembad" value="Nee" v-model="pickedZwembad">
                        <label class="radio" for="nietZwembad">Nee</label>
                    </div>
                    <div class="column-33">
                        <p class="placeholder">Oppervlakte woning?</p>
                        <input class="fieldAgent" placeholder="Oppervlakte woning" type="number" min="0" v-model="woningOpp">
                    </div>
                </div>
                <div class="row">
                    <div class="column-33">
                        <p class="placeholder">Bemeubeld?</p>
                        <input class="radio" type="radio" id="bemeubeld" value="Ja" v-model="pickedBemeubeld">
                        <label class="radio" for="bemeubeld">Ja</label>
                        <br>
                        <input class="radio" type="radio" id="nietBemeubeld" value="Nee" v-model="pickedBemeubeld">
                        <label class="radio" for="nietBemeubeld">Nee</label>
                    </div>
                    <div class="column-33">
                        <p class="placeholder">Subtype van de woning?</p>
                        <select class="fieldAgent left" v-model="selectedSubtype" id="subtype">
                            <option disabled value="">Subtype</option>
                            <option v-for="(subtype, counter) in this.subtypes" :key="counter">{{subtype.subtype_of_property}}</option>
                        </select>
                    </div>
                    <div class="column-33">
                        <p class="placeholder">Oppervlakte landbouwgrond?</p>
                        <input class="fieldAgent" placeholder="Oppervlakte landbouwgrond" type="number" min="0" v-model="landbouwOpp">
                    </div>
                </div>
                <div class="row">
                    <div class="column-33">
                        <p class="placeholder">Keukenapparatuur aanwezig?</p>
                        <input class="radio" type="radio" id="keuken" value="Ja" v-model="pickedKeuken">
                        <label class="radio" for="keuken">Ja</label>
                        <br>
                        <input class="radio" type="radio" id="nietKeuken" value="Nee" v-model="pickedKeuken">
                        <label class="radio" for="nietKeuken">Nee</label>
                    </div>
                    <div class="column-33">
                        <p class="placeholder">Locatie van de woning?</p>
                        <select class="fieldAgent left" v-model="selectedLocatie" id="locatie">
                            <option disabled value="">Locatie</option>
                            <option v-for="(locationsBelgium, counter) in this.locationsBelgium" :key="counter">{{locationsBelgium.location}}</option>
                        </select>
                    </div>
                    <div class="column-33">
                        <p class="placeholder">Oppervlakte bouwgrond?</p>
                        <input class="fieldAgent" placeholder="Oppervlakte bouwgrond" type="number" min="0" v-model="bouwgrondOpp">
                    </div>                    
                </div>
                <div class="row">
                    <div class="column-33">
                        <p class="placeholder">Terras aanwezig?</p>
                        <input class="radio" type="radio" id="terras" value="Ja" v-model="showTerras">
                        <label class="radio" for="terras">Ja</label>
                        <br>
                        <input class="radio" type="radio" id="nietTerras" value="Nee" v-model="showTerras">
                        <label class="radio" for="nietTerras">Nee</label>
                    </div>
                    <div class="column-33">
                        <p class="placeholder">Staat van de woning?</p>
                        <select class="fieldAgent left" v-model="selectedStaat" id="staat">
                            <option disabled value="">Staat</option>
                            <option v-for="(state, counter) in this.states" :key="counter">{{state.building_state}}</option>
                        </select>
                    </div>
                    <div class="column-33" v-show="pickedType==='Huis'">
                        <p class="placeholder">Aantal gevels van de woning?</p>
                        <select class="fieldAgent" v-model="selectedGevels" id="gevels">
                            <option disabled value="">Aantal gevels</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                        </select>
                    </div>
                </div>
                <div class="row">
                    <div class="column-33">
                        <p class="placeholder">Tuin aanwezig?</p>
                        <input class="radio" type="radio" id="tuin" value='Ja' v-model="showTuin">
                        <label class="radio" for="tuin">Ja</label>
                        <br>
                        <input class="radio" type="radio" id="nietTuin" value='Nee' v-model="showTuin">
                        <label class="radio" for="nietTuin">Nee</label>
                    </div>
                    <div class="column-33">
                        <p class="placeholder">Prijs van de woning?</p>
                        <input class="fieldAgent left" type="number" min="0" placeholder="Prijs" v-model="prijs">
                    </div>
                    <div class="column-33" v-show="showTerras==='Ja'">
                        <p class="placeholder">Oppervlakte terras?</p>
                        <input class="fieldAgent" placeholder="Oppervlakte terras" type="number" min="0" v-model="terrasOpp">
                    </div>
                </div>
                <div class="row">
                    <div class="column-33">
                        <p class="placeholder">Haardvuur aanwezig?</p>
                        <input class="radio" type="radio" id="haardvuur" value="Ja" v-model="pickedHaardvuur">
                        <label class="radio" for="haardvuur">Ja</label>
                        <br>
                        <input class="radio" type="radio" id="nietHaardvuur" value="Nee" v-model="pickedHaardvuur">
                        <label class="radio" for="nietHaardvuur">Nee</label>
                    </div>
                    <div class="column-33">
                        <p class="placeholder">Aantal kamers?</p>
                        <input class="fieldAgent left" type="number" placeholder="Aantal kamers" min="0" v-model="kamers">
                    </div>
                    <div class="column-33" v-show="showTuin==='Ja'">
                        <p class="placeholder">Oppervlakte tuin?</p>
                        <input class="fieldAgent" placeholder="Oppervlakte tuin" type="number" min="0" v-model="tuinOpp">
                    </div>
                </div>
                <br><br>
                <div class="errorhandler" v-if="errors.length > 0">
                    <span v-for="error in errors" :key="error">
                        {{error}} <br>
                    </span>
                </div>
                <div id="referral">
                    <button class="button" @click="submit()" >VOEG TOE</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        name: "agent",
        components:{
        },
        data(){
            return{
                pickedType: null,
                pickedBemeubeld: null,
                pickedKeuken: null,
                pickedTuin: null,
                pickedTerras: null,
                pickedHaardvuur: null,
                pickedZwembad: null,
                selectedSubtype: '',
                selectedLocatie: '',
                selectedStaat: '',
                selectedGevels: '',
                prijs:'',
                kamers:'',
                woningOpp:'',
                tuinOpp:'',
                terrasOpp:'',
                bouwgrondOpp:'',
                landbouwOpp:'',
                errors:[],
                showTuin:false,
                showTerras:false,
                showForm:true,
                showSucces:false,
                showNewHouse:false,
                houseID:0,
                isIngelogd:false,
                isNotIngelogd:false,
                states:[],
                subtypes:[],
                locationsBelgium:[]
            }
        },
        
        methods: {
            goToPage(page){
                this.$emit("change-page", page);
            },
            async getSubtypes() {
                let response = await fetch("http://127.0.0.1:8000/api/housesSubtype");
                let resp = await response.json();
                console.log(resp)
                this.subtypes = resp;
            },
            async getStates() {
                let response = await fetch("http://127.0.0.1:8000/api/housesState");
                let resp = await response.json();
                console.log(resp)
                this.states = resp;
            },
            async getLocationsBelgium() {
                let response = await fetch("http://127.0.0.1:8000/api/locationsBelgium");
                let resp = await response.json();
                console.log(resp)
                this.locationsBelgium = resp;
            },
            submit(){
                //check alles
                this.errors=[];
                if(!this.pickedType){
                    this.errors.push('Kies het type woning');
                }
                if(!this.pickedBemeubeld){
                    this.errors.push('Duid aan of de woning bemeubeld is');
                }
                if(!this.pickedKeuken){
                    this.errors.push('Duid aan of er keukenapparatuur aanwezig is');
                }
                if(!this.showTuin){
                    this.errors.push('Duid aan of de woning een tuin heeft');
                }
                if(!this.showTerras){
                    this.errors.push('Duid aan of de woning een terras heeft');
                }
                if(!this.pickedHaardvuur){
                    this.errors.push('Duid aan of de woning een haardvuur heeft');
                }
                if(!this.pickedZwembad){
                    this.errors.push('Duid aan of de woning een zwembad heeft');
                }
                if(!this.selectedSubtype){
                    this.errors.push('Kies het subtype');
                }
                if(!this.selectedLocatie){
                    this.errors.push('Kies de locatie');
                }
                if(!this.selectedStaat){
                    this.errors.push('Kies de staat');
                }
                if(!this.prijs){
                    this.errors.push('Geef de prijs in');
                }
                if(!this.kamers){
                    this.errors.push('Geef het aantal kamers in');
                }
                if(!this.woningOpp){
                    this.errors.push('Geef de oppervlakte van de woning in');
                }
                if(!this.bouwgrondOpp){
                    this.errors.push('Geef de oppervlakte van de bouwgrond in');
                }
                if(!this.landbouwOpp){
                    this.errors.push('Geef de oppervlakte van de landbouwgrond in');
                }
                if(this.showTuin==='Ja'){
                    if(!this.tuinOpp){
                        this.errors.push('Geef de oppervlakte van de tuin in')
                    }
                }
                if(this.showTerras==='Ja'){
                    if(!this.terrasOpp){
                        this.errors.push('Geef de oppervlakte van het terras in')
                    }
                }
                if(this.pickedType==='Huis'){
                    if(!this.selectedGevels){
                        this.errors.push('Geef het aantal gevels van de woning in')
                    }
                }
                if(this.errors.length==0){
                    this.postHouse()
                    // this.postSpecification()
                    this.newHouse()
                    this.showForm=false
                }
            },
            async postHouse(){
                if(this.pickedType==="Appartement"){
                    this.pickedType=1
                }
                else{
                    this.pickedType=2
                }
                if(this.selectedStaat==="Nieuw"){
                    this.selectedStaat=1
                }
                else if(this.selectedStaat==="Oud"){
                    this.selectedStaat = 2
                }
                else{
                    this.selectedStaat=3
                }
                try{
                    let requestOptions={
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            property_id: this.pickedType,
                            state_id: this.selectedStaat,
                            locality: this.selectedLocatie,
                            subtype_of_property: this.selectedSubtype,
                            price: this.prijs,
                            number_of_rooms: this.kamers,
                            area: this.woningOpp
                        })
                    }
                    let response = await fetch("http://127.0.0.1:8000/api/addHouse?estate_agent_id=5", requestOptions)
                    let houseID = await response.json();
                    this.postSpecification(houseID)
                } catch(error){
                    console.log(error)
                }
            },     
            async postSpecification(houseID){
                if(this.pickedKeuken==="Nee"){
                    this.pickedKeuken=0
                }
                else{
                    this.pickedKeuken=1
                }
                if(this.pickedBemeubeld==="Nee"){
                    this.pickedBemeubeld=0
                }
                else{
                    this.pickedBemeubeld=1
                }
                if(this.pickedHaardvuur==='Nee'){
                    this.pickedHaardvuur=0
                }
                else{
                    this.pickedHaardvuur=1
                }
                if(this.pickedTerras==='Nee'){
                    this.pickedTerras=0
                }
                else{
                    this.pickedTerras=1
                }
                if(this.pickedTuin==='Nee'){
                    this.pickedTuin=0
                }
                else{
                    this.pickedTuin=1
                }
                if(this.pickedZwembad==='Nee'){
                    this.pickedZwembad=0
                }
                else{
                    this.pickedZwembad=1
                }
                try{
                    let requestOptions={
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            house_id: houseID,
                            kitchen_equipment: this.pickedKeuken,
                            furnished: this.pickedBemeubeld,
                            open_fire: this.pickedHaardvuur,
                            terrace: this.pickedTerras,
                            terrace_area: this.terrasOpp,
                            garden: this.pickedTuin,
                            garden_area: this.tuinOpp,
                            surface_land: this.bouwgrondOpp,
                            surface_plot_land: this.landbouwOpp,
                            number_of_facades: this.selectedGevels,
                            swimming_pool: this.pickedZwembad
                        })
                    }
                    let response = await fetch("http://127.0.0.1:8000/api/addSpecification", requestOptions)
                    let resp = await response.json();
                    console.log(resp)
                } catch(error){
                    console.log(error)
                }
            },
            newHouse(){
                if(this.errors.length==0){
                    this.showSucces=true
                    this.showNewHouse=true
                    this.showForm=false
                }

            },
            refresh(){
                this.pickedType= null,
                this.pickedBemeubeld= null,
                this.pickedKeuken= null,
                this.pickedTuin= null,
                this.pickedTerras= null,
                this.pickedHaardvuur= null,
                this.pickedZwembad= null,
                this.selectedSubtype= '',
                this.selectedLocatie= '',
                this.selectedStaat= '',
                this.selectedGevels= '',
                this.prijs='',
                this.kamers='',
                this.woningOpp='',
                this.tuinOpp='',
                this.terrasOpp='',
                this.bouwgrondOpp='',
                this.landbouwOpp='',
                this.states=[],
                this.subtypes=[],
                this.errors=[],
                this.locationsBelgium=[],
                this.showTuin=false,
                this.showTerras=false,
                this.showForm=true,
                this.showSucces=false,
                this.showNewHouse=false,
                this.showSuccesKoper=false,
                this.showSuccesMakelaar=false
            },
            isLoggedIN(){
                const ingelogd = ('; '+document.cookie).split("; ingelogd=").pop().split(';')[0];
                const rol = ('; '+document.cookie).split("; rol=").pop().split(';')[0];
                console.log(ingelogd +' '+ rol)
                if(ingelogd=='true'){
                    this.isIngelogd=true
                    this.isNotIngelogd=false
                }
                else{
                    this.isIngelogd=false
                    this.isNotIngelogd=true
                }
                if(ingelogd!='true' && rol!="makelaar"){
                    alert('Je bent niet geauthoriseerd om deze pagina te bekijken.\nMeld je aan of neem contact op met info@immokompas.be')
                    this.goToPage('login')
                }

            },
            removeCookie(){
                document.cookie = "ingelogd=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                document.cookie = "rol=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                document.cookie = "userID=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                this.isIngelogd=false
                this.isNotIngelogd=true
                if(ingelogd!='true' && rol!="makelaar"){
                    alert('Je bent niet geauthoriseerd om deze pagina te bekijken.\nMeld je aan of neem contact op met info@immokompas.be')
                    this.goToPage('login')
                }
            }
        },
        beforeMount() {
            this.isLoggedIN();
            this.getSubtypes();
            this.getStates();
            this.getLocationsBelgium();
        },  
    
}
</script>