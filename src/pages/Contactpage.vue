<template>
<div class="main">
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
        <form class="inputform">
            <h3>Contacteer ons</h3>
            <p class="placeholder">E-mailadres</p>
            <input class="field" type="email" placeholder="E-mailadres" v-model="email" required >
            <br><br>
            <p class="placeholder">Onderwerp</p>
            <input class="field" type="text" placeholder="Onderwerp" v-model="onderwerp" required>
            <br><br>
            <p class="placeholder">Bericht</p>
            <textarea class="field" type="message" placeholder="Bericht" v-model="bericht" required></textarea>
            <br><br><br>
            <div class="errorhandler" v-if="errors.length > 0">
                <span v-for="error in errors" :key="error">
                    {{error}} <br>
                </span>
            </div>
            <br>
            <div id="referral">
                <button class="button" @click="submit()">Verstuur</button>

            </div>
        </form>
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
        name: "contact",
        data(){
            return{
                isNotIngelogd:false,
                isIngelogd:false,
                email:'',
                onderwerp:'',
                bericht:'',
                errors:[]
            }
        },
        methods: {
            goToPage(page){
                this.$emit("change-page", page);
                window.scrollTo(0, 0);
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
                if(!this.onderwerp){
                    this.errors.push('Vul een onderwerp in')
                }
                if(!this.bericht){
                    this.errors.push('Vul een bericht in')
                }
                if(this.errors.length==0){
                    var url = "mailto:lise.printemps@hotmail.com?subject="+ this.onderwerp+"&body="+this.bericht
                    window = window.open(url, 'emailWindow')
                    if (window && window.open && !window.closed){
                        window.close()
                    }      
                    //this.postEmail()
                }
            },
            // async postEmail(){
            //     try{
            //         let requestOptions={
            //             method: "POST",
            //             headers: { "Content-Type": "application/json" },
            //             body: JSON.stringify({
            //                 to: "lise.printemps@hotmail.com",
            //                 subject: this.onderwerp,
            //                 text: this.bericht,
            //                 form: this.email
            //             })
            //         }
            //         let response = await fetch("https://api.sendgrid.com/api/mail.send.json", requestOptions)
            //         let resp = await response.text();
            //         this.postSpecification(resp)
            //     } catch(error){
            //         console.log(error)
            //     }
            // },
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
                document.cookie = "agentID=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                this.isIngelogd=false
                this.isNotIngelogd=true
            }
        },
        beforeMount() {
            this.isLoggedIN();
        }
    }
</script>