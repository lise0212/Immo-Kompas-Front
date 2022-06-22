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
                <h1>Welkom terug {{this.userName}}</h1>
                <p>Je wordt zo dadelijk doorgestuurd naar de pagina om een match te zoeken.</p>
            </div>
            <div class="succes" v-show="showSuccesMakelaar===true">
                <h1>Welkom terug {{this.userName}}</h1>
                <p>Je wordt zo dadelijk doorgestuurd naar de pagina om een zoekertje te plaatsen.</p>
            </div>
            <div class="inputform" v-if="showForm">
                <h3>Login</h3>
                <p class="placeholder">E-mailadres</p>
                <input class="field" type="email" placeholder="E-mailadres" v-model="email" required >
                <br><br>
                <p class="placeholder">Paswoord</p>
                    <input  class="field" type="password" placeholder="Paswoord" v-model="paswoord" required>
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
                userRole:'',
                userID:'',
                isIngelogd:false,
                isNotIngelogd:true,
                agentID:''
            }
        },
        methods: {
            goToPage(page){
                this.$emit("change-page", page);
                window.scrollTo(0, 0);
            },
            togglePassword(){
                this.showPassword = !this.showPassword;
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
                    this.userID = this.user.id
                    if(this.user=='Fail'){
                        this.errors.push('Controleer of je het juiste emailadres en paswoord gebruikt hebt en probeer het opnieuw')
                    }
                    else{
                        this.showForm=false
                        document.cookie="ingelogd=true"
                        document.cookie="rol="+this.userRole
                        document.cookie="userID="+this.userID
                        const rol = ('; '+document.cookie).split("; rol=").pop().split(';')[0];
                        const ingelogd = ('; '+document.cookie).split("; ingelogd=").pop().split(';')[0];
                        if(rol==='koper'){
                            this.showSuccesKoper=true
                            setTimeout(()=> this.goToPage('buyer'), 4000) 
                        }
                        else{
                            await this.getAgent()
                            this.showSuccesMakelaar=true
                            setTimeout(()=> this.goToPage('agent'), 4000)               
                        }
                        if(ingelogd=='true'){
                            this.isIngelogd=true,
                            this.isNotIngelogd=false
                        }
                    }
                } catch (error) {
                    console.log(error);
                    this.errors.push('Controleer of je het juiste emailadres en paswoord gebruikt hebt en probeer het opnieuw')
                }
            },
            async getAgent(){
                try {
                    let url = "http://127.0.0.1:8000/api/agentByName?name="+this.userName
                    console.log(url)
                    let response = await fetch(url);
                    this.agent = await response.json();
                    console.log(this.agent)
                    this.agentID= this.agent[0].id
                    document.cookie="agentID="+this.agentID
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
        // computed:{
        //     inputType() {
        //         return this.showPassword ? "text" : "password";
        //     },
        //     toggleBtnIcon() {
        //         return this.showPassword ? "🐵" : "🙈";
        //     }
        // }
    
}
</script>