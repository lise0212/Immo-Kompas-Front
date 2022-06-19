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
                <input class="field" type="text" placeholder="Typ hier je naam" v-model="naam" required>
                <br><br>
                <p class="placeholder">Email</p>
                <input class="field" type="email" placeholder="Typ hier je email" v-model="email" required>
                <br><br>
                <p class="placeholder">Paswoord</p>
                <input class="field" type="password" placeholder="Type hier je paswoord" v-model="paswoord" required>
                <br><br><br>
                <div class="errorhandler" v-if="errors.length > 0">
                    <span v-for="error in errors" :key="error">
                        {{error}} <br>
                    </span>
                </div>
                <div id="referral">
                    <button class="link" @click="goToPage('login')">Heb je al een account?</button>
                    <button class="button" @click="[submit()]">REGISTREER</button>
                </div>
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
                emails:[]
            }
        },
        methods: {
            goToPage(page){
                this.$emit("change-page", page);
            },
            submit(){
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
                if(this.errors.length==0){
                    this.postUser()
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
                    let resp = await response.json();
                    console.log(resp)
                } catch(error){
                    console.log(error)
                }
                this.goToPage('buyer')
            },     
            ifExists(){
                for(var i=0; i<this.emails.length; i++){
                    if(this.emails[i].email == this.email){
                        this.errors.push('Er bestaat al een account met dit emailadres')
                    }
                }
            }
        },
        beforeMount() {
            this.getEmails();
        },  
    
}
</script>