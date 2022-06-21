<template>
<div>
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
        <div class="inputform">
            <h3>Contacteer ons</h3>
            <p class="placeholder">Naam</p>
            <input class="field" type="text" placeholder="Naam" v-model="naam" required>
            <br><br>
            <p class="placeholder">E-mailadres</p>
            <input class="field" type="email" placeholder="E-mailadres" v-model="email" required >
            <br><br>
            <p class="placeholder">Bericht</p>
            <textarea class="field" type="message" placeholder="Bericht" v-model="naam" required></textarea>
            <br><br>

            <div id="referral">
                    <button class="button" @click="submit()">Verstuur</button>
                </div>
        </div>
    </div>
</div>
</template>

<script>
    export default {
        name: "contact",
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
                this.isIngelogd=false
                this.isNotIngelogd=true
            }
        },
        beforeMount() {
            this.isLoggedIN();
        }
    }
</script>