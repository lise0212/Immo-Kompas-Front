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
            <div class="inputform large">
                <div class="row">
                    <div class="column-33">
                        <p class="placeholder">Type woning?</p>
                        <input class="radio" type="radio" id="huis" value="Huis" v-model="pickedType">
                        <label class="radio" for="huis">Huis</label>
                        <br>
                        <input class="radio" type="radio" id="appartement" value="Appartement" v-model="pickedType">
                        <label class="radio" for="appartement">Appartement</label>                        
                    </div>
                    <div class="column-33">
                        <p class="placeholder">Zwembad aanwezig?</p>
                        <input class="radio" type="radio" id="zwembad" value="zwembad" v-model="pickedZwembad">
                        <label class="radio" for="zwembad">Ja</label>
                        <br>
                        <input class="radio" type="radio" id="nietZwembad" value="nietZwembad" v-model="pickedZwembad">
                        <label class="radio" for="nietZwembad">Nee</label>
                    </div>
                    <div class="column-33">
                        <p class="placeholder">Oppervlakte van de woning?</p>
                        <input class="fieldAgent" type="number" min="0">
                    </div>
                </div>
                <div class="row">
                    <div class="column-33">
                        <p class="placeholder">Bemeubeld?</p>
                        <input class="radio" type="radio" id="bemeubeld" value="bemeubeld" v-model="pickedBemeubeld">
                        <label class="radio" for="bemeubeld">Ja</label>
                        <br>
                        <input class="radio" type="radio" id="nietBemeubeld" value="nietBemeubeld" v-model="pickedBemeubeld">
                        <label class="radio" for="nietBemeubeld">Nee</label>
                    </div>
                    <div class="column-33">
                        <p class="placeholder">Subtype van de woning?</p>
                        <select class="fieldAgent" v-model="selectedSubtype" id="subtype">
                            <option disabled value="">Kies een subtype</option>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                        </select>
                    </div>
                    <div class="column-33">
                        <p class="placeholder">Aantal gevels van de woning?</p>
                        <select class="fieldAgent" v-model="selectedGevels" id="gevels">
                            <option disabled value="">Kies het aantal gevels</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                        </select>
                    </div>
                </div>
                <div class="row">
                    <div class="column-33">
                        <p class="placeholder">Keukenapparatuur aanwezig?</p>
                        <input class="radio" type="radio" id="keuken" value="keuken" v-model="pickedKeuken">
                        <label class="radio" for="keuken">Ja</label>
                        <br>
                        <input class="radio" type="radio" id="nietKeuken" value="nietKeuken" v-model="pickedKeuken">
                        <label class="radio" for="nietKeuken">Nee</label>
                    </div>
                    <div class="column-33">
                        <p class="placeholder">Locatie van de woning?</p>
                        <select class="fieldAgent" v-model="selectedLocatie" id="">
                            <option disabled value="">Kies een locatie</option>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                        </select>
                    </div>
                    <div class="column-33">
                        <p class="placeholder">Oppervlakte van de tuin?</p>
                        <input class="fieldAgent" type="number" min="0">
                    </div>
                </div>
                <div class="row">
                    <div class="column-33">
                        <p class="placeholder">Tuin aanwezig?</p>
                        <input class="radio" type="radio" id="tuin" value="tuin" v-model="pickedTuin">
                        <label class="radio" for="tuin">Ja</label>
                        <br>
                        <input class="radio" type="radio" id="nietTuin" value="nietTuin" v-model="pickedTuin">
                        <label class="radio" for="nietTuin">Nee</label>
                    </div>
                    <div class="column-33">
                        <p class="placeholder">Staat van de woning?</p>
                        <select class="fieldAgent" v-model="selectedStaat" id="staat">
                            <option disabled value="">Kies de staat</option>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                        </select>
                    </div>
                    <div class="column-33">
                        <p class="placeholder">Oppervlakte van het terras?</p>
                        <input class="fieldAgent" type="number" min="0">
                    </div>
                </div>
                <div class="row">
                    <div class="column-33">
                        <p class="placeholder">Terras aanwezig?</p>
                        <input class="radio" type="radio" id="terras" value="terras" v-model="pickedTerras">
                        <label class="radio" for="terras">Ja</label>
                        <br>
                        <input class="radio" type="radio" id="nietTerras" value="nietTerras" v-model="pickedTerras">
                        <label class="radio" for="nietTerras">Nee</label>
                    </div>
                    <div class="column-33">
                        <p class="placeholder">Prijs van de woning?</p>
                        <input class="fieldAgent" type="number" min="0">
                    </div>
                    <div class="column-33">
                        <p class="placeholder">Oppervlakte van de bouwgrond?</p>
                        <input class="fieldAgent" type="number" min="0">
                    </div>
                </div>
                <div class="row">
                    <div class="column-33">
                        <p class="placeholder">Haardvuur aanwezig?</p>
                        <input class="radio" type="radio" id="haardvuur" value="haardvuur" v-model="pickedHaardvuur">
                        <label class="radio" for="haardvuur">Ja</label>
                        <br>
                        <input class="radio" type="radio" id="nietHaardvuur" value="nietHaardvuur" v-model="pickedHaardvuur">
                        <label class="radio" for="nietHaardvuur">Nee</label>
                    </div>
                    <div class="column-33">
                        <p class="placeholder">Aantal kamers?</p>
                        <input class="fieldAgent" type="number" min="0">
                    </div>
                    <div class="column-33">
                        <p class="placeholder">Oppervlakte van de landbouwgrond?</p>
                        <input class="fieldAgent" type="number" min="0">
                    </div>
                </div>
                <div class="row">
                    <div class="column-33">
                        
                    </div>
                    <div class="column-33">

                    </div>
                    <div class="column-33">
                        <div id="referral">
                            <button class="buttonAgent">VOEG TOE</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import navigation from "../components/navigation.vue";
    import NavigationBar from "../components/NavigationBar.vue";

    export default {
        name: "login",
        components:{
            NavigationBar
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
                selectedGevels: ''
            }
        },
        methods: {
            goToPage(page){
                this.$emit("change-page", page);
            },
        }
    
}
</script>