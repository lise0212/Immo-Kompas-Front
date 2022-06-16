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
            <div class="inputform">
                <p class="placeholder">Naar welk type woning ben je op zoek?</p>
                <input class="radio" type="radio" id="huis" value="Huis" v-model="picked">
                <label class="radio" for="huis">Huis</label>
                <br>
                <input class="radio" type="radio" id="appartement" value="Appartement" v-model="picked">
                <label class="radio" for="appartement">Appartement</label>
                <br><br>
                <p class="placeholder">Op welke locatie wil je zoeken?</p>
                <select class="field" v-model="selected">
                    <option disabled value="">Kies een locatie</option>
                    <option>Aalst</option>
                    <option>Grobbendonk</option>
                    <option>Wilrijk</option>
                </select>
                <br><br>
                <div class="column-50">
                    <p class="placeholder">Minimum prijs</p> 
                    <input class="price" type="number" min="0" placeholder="Vul de minimum prijs in" required>
                </div>
                <div class="column-50">
                    <p class="placeholder">Maximum prijs</p>
                    <input class="price" type="number" min="0" placeholder="Vul de maximum prijs in" required>
                </div>
                
                <div id="referral">
                    <button class="button">ZOEK MATCH</button>
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
                picked: null,
                selected: ''
            }
        },
        methods: {
            goToPage(page){
                this.$emit("change-page", page);
            },
        }
    
}
</script>