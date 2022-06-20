<template>
    <div >
        <!-- <NavigationBar></NavigationBar> -->
        <nav class="nav">
            <ul class="nav-list">
                <li><img class="logo-nav nav-list-item-logo" src="../assets/LogoImmoKompasWit.png" alt="Logo Kleur" @click="goToPage('home')"></li>
                <!-- <li><button class="nav-list-item" @click="goToPage('home')">Home</button></li> -->
                <li><button class="nav-list-item" @click="goToPage('buyer')"><b>Zoeken</b></button></li>
                <li><button class="nav-list-item" @click="goToPage('agent')"><b>Zoekertje plaatsen</b></button></li>
                <li><button class="nav-list-item" @click="goToPage('login')"><b>Login</b></button></li>
            </ul>
        </nav>
        <div class="frame">
            <img class="logo" src="../assets/LogoImmoKompas.png" alt="Logo Kleur">
            <br>
            <div class="succes" v-show="showSuccesKoper===true">
                <h1>Welkom terug {{this.userName}}</h1>
                <p>Je wordt zo dadelijk doorgestuurd naar de pagin om een match te zoekn.</p>
            </div>
            <div class="succes" v-show="showSuccesMakelaar===true">
                <h1>Welkom terug {{this.userName}}</h1>
                <p>Je wordt zo dadelijk doorgestuurd naar de pagina om een zoekertje te plaatsen.</p>
            </div>
            <div class="inputform" v-if="showForm">
                <p class="placeholder">E-mailadres</p>
                <input class="field" type="email" placeholder="E-mailadres" v-model="email" required >
                <br><br>
                <p class="placeholder">Paswoord</p>
                <input  class="field" type="password" placeholder="Paswoord" v-model="paswoord" required>
                <!-- <input v-else class="field" type="password" placeholder="Paswoord" v-model="password" required //v-if="showPassword"> -->
                <!--<div class="control">
                    <button class="button" @click="toggleShow">
                        <span class="icon is-small is-right">
                            <i class="fas" :class="{ 'fa-eye-slash': showPassword, 'fa-eye': !showPassword }"></i>
                        </span>
                    </button>
                </div> -->
                <br><br><br>
                <div class="errorhandler" v-if="errors.length > 0">
                    <span v-for="error in errors" :key="error">
                        {{error}} <br>
                    </span>
                </div>
                <div id="referral">
                    <button class="link" @click="goToPage('register')">Nog geen account?</button>
                    <button class="button" @click="submit()">LOGIN</button>
                </div>
            </div>
        </div>
    </div>
    
</template>

<script>
    export default {
        name: "login",
        data(){
            return{
                email:'',
                paswoord:'',
                errors:[],
                showForm:true,
                showSuccesKoper:false,
                showSuccesMakelaar:false,
                userName:'',
                user:[],
                userRole:''
            }
        },
        methods: {
            goToPage(page){
                this.$emit("change-page", page);
            },
            submit(){
                this.errors=[];
                if(!this.email){
                    this.errors.push('Vul een emailadres in')
                }
                if(this.email){
                    if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.email))){
                        this.errors.push('Vul een correct emailadres in')
                    }
                }
                if(!this.paswoord){
                    this.errors.push('Vul een paswoord in')
                }
                if(this.errors.length==0){
                    this.validateUser()
                }
            },
            async validateUser(){
                try {
                    let url = "http://127.0.0.1:8000/api/login?email="+this.email+"&password="+this.paswoord
                    console.log(url)
                    let response = await fetch(url);
                    this.user = await response.json();
                    console.log(this.user)
                    this.userName= this.user.name
                    this.userRole = this.user.role
                    if(this.user==='Fail'){
                        this.errors.push('Controleer of je het juiste emailadres en paswoord gebruikt hebt en probeer het opnieuw')
                    }
                    else{
                        this.showForm=false
                        document.cookie="ingelogd=true"
                        document.cookie="rol="+this.userRole
                        const rol = ('; '+document.cookie).split("; rol=").pop().split(';')[0];
                        if(rol==='koper'){
                            this.showSuccesKoper=true
                            setTimeout(()=> this.goToPage('buyer'), 4000) 
                        }
                        else{
                            this.showSuccesMakelaar=true
                            setTimeout(()=> this.goToPage('agent'), 4000)               
                        }
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        }
    
}
</script>