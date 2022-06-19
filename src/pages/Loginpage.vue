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
            <div class="succes" v-show="showSucces===true">
                <h1>Welkom terug {{this.userName}}</h1>
            </div>
            <div class="inputform" v-if="showForm">
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
                showSucces:false,
                userName:'',
                user:[]
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
                    let resp = await response.json();
                    console.log(resp)
                    this.user=resp[0]
                    console.log(this.user)
                    this.userName= this.user.name
                    console.log(this.userName)
                    if(resp='Fail'){
                        this.errors.push('Controleer of je het juiste emailadres en paswoord gebruikt hebt en probeer het opnieuw')
                    }
                    this.showForm=false
                    this.showSucces=true
                } catch (error) {
                    console.log(error);
                }
            }
        }
    
}
</script>