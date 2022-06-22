<template>
    <div class="main">
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
            <div class="fail" v-show="showFail===true">
                <h1>Helaas, we hebben geen matches gevonden...</h1>
            </div>
            <div class="inputform" v-if="showForm">
                <h3>Voer je specificaties in</h3>
                <br>
                <div>
                    <p class="placeholder">Naar welk type woning ben je op zoek?</p>
                    <input class="radio" type="radio" id="Appartement" value="Appartement" v-model="picked">
                    <label class="radio" for="Appartement">Appartement</label>
                    <br>
                    <input class="radio" type="radio" id="Huis" value="Huis" v-model="picked">
                    <label class="radio" for="Huis">Huis</label>
                </div>
                <br><br>
                <p class="placeholder">Op welke locatie wil je zoeken?</p>
                <select class="field" v-model="location">
                    <option disabled value="">Locatie</option>
                    <option v-for="(location, counter) in this.locations" :key="counter">{{location.locality}}</option>
                </select>
                <br><br>
                <div class="column-50">
                    <p class="placeholder">Minimum prijs</p> 
                    <input class="priceInput left" type="number" placeholder="Minimum prijs" min="0" v-model="minPrice" required>
                </div>
                <div class="column-50">
                    <p class="placeholder">Maximum prijs</p>
                    <input class="priceInput" type="number" placeholder="Maximum prijs" min="0" v-model="maxPrice" required>

                </div>
                <br>
                <div class="errorhandler" v-if="errors.length > 0">
                    <span v-for="error in errors" :key="error">
                        {{error}} <br>
                    </span>
                </div>
                <div id="referral">
                    <button class="button" @click="submit()" >ZOEK MATCH</button>
                </div>
            </div>
            <div class="resultaten">
                <div class="container" v-if="showMatch">
                    <h1>Aanbevolen voor jou</h1>
                    <ListHouse
                        :items=houses
                    />
                </div>
                <div class="container" v-if="showRecommendation">
                    <h1> Misschien vind je dit ook interessant</h1>
                    <ListRecommendation 
                        :items=recommendations
                    />
                </div>
            </div>
            <div>
                <button class="button" v-show="showNewSearch===true" @click="refresh()">NIEUWE ZOEKOPDRACHT</button>
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
    import ListHouse from "../components/ListHouse.vue";
    import ListRecommendation from "../components/ListRecommendation.vue";

    export default {
        name: "buyer",
        components:{
            ListHouse,
            ListRecommendation
        },
        data(){
            return{
                picked: null,
                location: "",
                minPrice: '',
                maxPrice: '',
                houses: [],
                recommendations: [],
                locations: [],
                errors: [],
                showForm: true,
                showMatch:false,
                showRecommendation:false,
                showNewSearch:false,
                showFail:false,
                showSuccesKoper:false,
                showSuccesMakelaar:false,
                isIngelogd:false,
                isNotIngelogd:false
            }
        },
        methods: {
            goToPage(page){
                this.$emit("change-page", page);
                window.scrollTo(0, 0);

            },
            async getLocations() {
                let response = await fetch("http://127.0.0.1:8000/api/housesLocality");
                let resp = await response.json();
                console.log(resp)
                this.locations = resp;
            },
            submit(){
                //check errors
                this.errors=[];
                if(!this.picked){
                    this.errors.push('Kies een optie');
                }
                if(!this.location){
                    this.errors.push('Kies een locatie');
                }
                if(!this.minPrice){
                    this.errors.push('Geef een minimum bedrag in')
                    
                }
                if(!this.maxPrice){
                    this.errors.push('Geef een maximum bedrag in')
                }
                // if(this.minPrice>=this.maxPrice){
                //     this.errors.push('Het maximum bedrag moet hoger zijn dan het minimum bedrag')
                // }
                //wanneeer alles juist is
                if(this.minPrice>=this.maxPrice){
                    this.errors.push('Het maximum bedrag moet hoger zijn dan het minimum bedrag')
                }
            
                if(this.errors.length==0){
                    
                    this.showForm = false
                    this.searchMatch()
                    this.searchRecommended()
                    const ingelogd = ('; '+document.cookie).split("; ingelogd=").pop().split(';')[0];
                    const userID = ('; '+document.cookie).split("; userID=").pop().split(';')[0];
                    if(ingelogd=='true'){
                        this.addSearch(userID)
                    }
                }
            },
            async searchMatch() {
                try {
                    this.houses = []
                    let url = "http://127.0.0.1:8000/api/housesBySearch?property_type="+this.picked+"&locality="+this.location+"&min_price="+this.minPrice+"&max_price="+this.maxPrice
                    console.log(url)
                    let response = await fetch(url);
                    let resp = await response.json();
                    console.log(resp)
                    if(resp.length>0){
                        this.showMatch=true
                    }
                    this.houses = resp;
                    this.newSearch()

                } catch (error) {
                    console.log(error);
                }
            },
            async searchRecommended() {
                try {
                    this.recommendations = []
                    let url = "http://127.0.0.1:8000/api/housesByRecommendation?property_type="+this.picked+"&locality="+this.location+"&min_price="+this.minPrice+"&max_price="+this.maxPrice
                    console.log(url)
                    let response = await fetch(url);
                    let resp = await response.json();
                    console.log(resp)
                    if(resp.length>0){
                        this.showRecommendation=true
                    }
                    this.recommendations = resp;
                    this.newSearch()
                } catch (error) {
                    console.log(error);
                }
            },
            async addSearch(userID){
                //const userID = ('; '+document.cookie).split("; userID=").pop().split(';')[0];
                try{
                    let requestOptions={
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            property_type: this.picked,
                            locality: this.location,
                            min_price: this.minPrice,
                            max_price: this.maxPrice,
                            user_id: userID
                        })
                    }
                    let response = await fetch("http://127.0.0.1:8000/api/addSearch?", requestOptions)
                    let resp = await response.json();
                    console.log(resp)
                } catch(error){
                    console.log(error)
                }
            },
            newSearch(){
                if(!this.showMatch && !this.showRecommendation){
                    this.showFail = true
                    this.showNewSearch=true
                }
                else{
                    this.showNewSearch = true
                }
            },
            refresh(){
                this.picked= null,
                this.location= "",
                this.minPrice= '',
                this.maxPrice= '',
                this.houses= [],
                this.recommendations= [],
                this.errors= [],
                this.showForm= true,
                this.showMatch=false,
                this.showRecommendation=false,
                this.showNewSearch=false,
                this.showFail=false,
                this.showSuccesKoper=false,
                this.showSuccesMakelaar=false
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
        beforeMount() {
            this.isLoggedIN();
            this.getLocations();
        },              
    }
</script>