<template>
    <div >
        <!-- <NavigationBar></NavigationBar> -->
        <nav class="nav">
            <ul class="nav-list">
                <li><button class="nav-list-item" @click="goToPage('home')">Home</button></li>
                <li><button class="nav-list-item" @click="goToPage('buyer')">Ik ben koper</button></li>
                <li><button class="nav-list-item" @click="goToPage('agent')">Ik ben makelaar</button></li>
                <li><button class="nav-list-item push-right" @click="goToPage('login')">Login</button></li>
                <li><button class="nav-list-item" @click="goToPage('register')">Registreer</button></li>
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
                    <option disabled value="">Kies een locatie</option>
                    <option v-for="(location, counter) in this.locations" :key="counter">{{location.locality}}</option>
                </select>
                <br><br>
                <div class="row">
                    <div class="column-50">
                        <p class="placeholder">Minimum prijs</p> 
                        <input class="price" type="number" min="0" placeholder="Vul de minimum prijs in" v-model="minPrice" required>
                    </div>
                    <div class="column-50">
                        <p class="placeholder">Maximum prijs</p>
                        <input class="price" type="number" min="0" placeholder="Vul de maximum prijs in" v-model="maxPrice" required>

                    </div>
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
                    <h1> Misschien ook interessant voor jou</h1>
                    <ListRecommendation 
                        :items=recommendations
                    />
                </div>
            </div>
            <div>
                <button class="button" v-show="showNewSearch===true" @click="refresh()">NIEUWE ZOEKOPDRACHT</button>
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
                minPrice: 0,
                maxPrice: 0,
                houses: [],
                recommendations: [],
                locations: [],
                errors: [],
                showForm: true,
                showMatch:false,
                showRecommendation:false,
                showNewSearch:false,
                showFail:false
            }
        },
        methods: {
            goToPage(page){
                this.$emit("change-page", page);
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
            newSearch(){
                if(!this.showMatch && !this.showRecommendation){
                    this.showFail = true
                    this.showNewSearch=true
                }
                else{
                    this.showNewSearch = true
                }
            },
            async getLocations() {
                let response = await fetch("http://127.0.0.1:8000/api/housesLocality");
                let resp = await response.json();
                console.log(resp)
                this.locations = resp;
            },
            refresh(){
                this.picked= null,
                this.location= "",
                this.minPrice= 0,
                this.maxPrice= 0,
                this.houses= [],
                this.recommendations= [],
                this.locations= [],
                this.errors= [],
                this.showForm= true,
                this.showMatch=false,
                this.showRecommendation=false,
                this.showNewSearch=false,
                this.showFail=false
            },
        },
        beforeMount() {
            this.getLocations();
        },              
    }
</script>