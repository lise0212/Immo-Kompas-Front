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
            <div class="succes" v-show="showSuccesKoper===true">
                <h1>Welkom {{this.userName}}</h1>
                <p>Je wordt zo dadelijk doorgestuurd naar de pagina om een match te zoeken.</p>
            </div>
            <div class="inputform" v-show="showForm===true">
                <h3>Registreer</h3>
                <p class="placeholder">Naam</p>
                <input class="field" type="text" placeholder="Naam" v-model="naam" required>
                <br><br>
                <p class="placeholder">E-mail</p>
                <input class="field" type="email" placeholder="E-mailadres" v-model="email" required>
                <br><br>
                <p class="placeholder">Paswoord</p>
                <input class="field" type="password" placeholder="Paswoord" v-model="paswoord" required>
                <br><br>
                <p class="placeholder">Bevestig paswoord</p>
                <input class="field" type="password" placeholder="Bevestig paswoord" v-model="bevestigPaswoord" required>
                <br><br><br>
                <div class="errorhandler" v-if="errors.length > 0">
                    <span v-for="error in errors" :key="error">
                        {{error}} <br>
                    </span>
                </div>
                <div id="referral">
                    <button class="link" @click="goToPage('login')">Heb je al een account?</button>
                    <button class="button" @click="submit()">REGISTREER</button>
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

    export default {
        name: "register",
        components:{
        },
        data(){
            return{
                naam:'',
                email:'',
                paswoord:'',
                errors:[],
                emails:[],
                showSuccesKoper:false,
                user:[],
                userName:'',
                userRole:'',
                bevestigPaswoord:'',
                showForm:true,
                userID:'',
                isIngelogd:false,
                isNotIngelogd:false,
            }
        },
        methods: {
            goToPage(page){
                this.$emit("change-page", page);
                window.scrollTo(0, 0);
            },
            async submit(){
                this.errors=[];
                if(!this.naam){
                    this.errors.push('Vul een naam in')
                }
                if(!this.email){
                    this.errors.push('Vul een emailadres in')
                }
                if(this.email){
                    if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.email))){
                        this.errors.push('Vul een correct emailadres in')
                    }
                    if(this.emails.length>0){
                        this.ifExists()
                    }
                }
                if(!this.paswoord){
                    this.errors.push('Vul een paswoord in')
                }
                if(this.paswoord){
                    if(this.paswoord.length<8){
                        this.errors.push('Het paswoord moet minstens 8 karakters bevatten')
                    }
                    if(!(/\d/.test(this.paswoord))){
                        this.errors.push('Het paswoord moet minstens 1 getal bevatten')
                    }
                    if(!(/[a-z]/.test(this.paswoord))){
                        this.errors.push('Het paswoord moet minstens 1 kleine letter bevatten')
                    }
                    if(!(/[A-Z]/.test(this.paswoord))){
                        this.errors.push('Het paswoord moet minstens 1 hoofdletter bevatten')
                    }
                    if(!(/[!@#\$%\^\&*\)\(+=._-]/.test(this.paswoord))){
                        this.errors.push('Het paswoord moet minstens 1 speciaal karakter bevatten')
                    }
                }
                if(!this.bevestigPaswoord){
                    this.errors.push('Bevestig je paswoord')
                }
                if(this.bevestigPaswoord){
                    if(this.bevestigPaswoord != this.paswoord){
                        this.errors.push('Paswoorden komen niet overeen')
                    }
                }
                if(this.errors.length==0){
                    await this.postUser()
                    await this.getUser()
                }
            },
            async getEmails() {
                let response = await fetch("http://127.0.0.1:8000/api/emails");
                let resp = await response.json();
                console.log(resp)
                this.emails = resp;
            },
            async postUser(){
                try{
                    let requestOptions={
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            name: this.naam,
                            email: this.email,
                            password: this.paswoord
                        })
                    }
                    let response = await fetch("http://127.0.0.1:8000/api/register", requestOptions)
                    this.resp = await response.json();
                    console.log(this.resp)
                } catch(error){
                    console.log(error)
                }
            },     
            ifExists(){
                for(var i=0; i<this.emails.length; i++){
                    if(this.emails[i].email == this.email){
                        this.errors.push('Er bestaat al een account met dit emailadres')
                    }
                }
            },
            async getUser(){
                try {
                    let url = "http://127.0.0.1:8000/api/getUser?email="+this.email
                    console.log(url)
                    let response = await fetch(url);
                    let resp = await response.json();
                    console.log(resp)
                    this.user=resp[0]
                    this.userName= this.user.name
                    this.userRole = this.user.role
                    this.userID=this.user.id
                    document.cookie="ingelogd=true"
                    document.cookie="rol="+this.userRole
                    document.cookie="userID="+this.userID
                    const ingelogd = ('; '+document.cookie).split("; ingelogd=").pop().split(';')[0];
                    if(ingelogd=='true'){
                        this.showForm=false
                        this.showSuccesKoper=true
                        this.isIngelogd=true,
                        this.isNotIngelogd=false,
                        setTimeout(()=> this.goToPage('buyer'), 4000) 
                    }
                    
                } catch (error) {
                    console.log(error);
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
            this.getEmails();
        },  
    
}
</script>