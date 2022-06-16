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
                <p class="placeholder">Naam</p>
                <input class="field" type="text" placeholder="Typ hier je naam" required>
                <br><br>
                <p class="placeholder">Email</p>
                <input class="field" type="email" placeholder="Typ hier je email" required>
                <br><br>
                <p class="placeholder">Paswoord</p>
                <input class="field" type="password" placeholder="Type hier je paswoord" required>
                <br><br>
                <div id="referral">
                    <button class="link" @click="goToPage('login')">Heb je al een account?</button>
                    <button class="button">REGISTREER</button>
                </div>
            </div>
        </div>
    </div>
    
</template>

<script>
    import NavigationBar from "../components/NavigationBar.vue";

    export default {
        name: "login",
        components:{
            NavigationBar
        },
        methods: {
            goToPage(page){
                this.$emit("change-page", page);
            },
        }
    
}
</script>