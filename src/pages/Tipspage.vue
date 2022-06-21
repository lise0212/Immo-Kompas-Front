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

        <header class="header">
            <div class="text-box">
                <h1 class="heading-primary">
                    <span class="heading-primary-main">Immo Kompas</span><br>
                    <span class="heading-primary-sub">Jouw vastgoedpartner tijdens je zoektocht</span>
                </h1>
                <button @click="goToPage('contact')" class="button-header">CONTACTEER ONS</button>
            </div>
        </header>

        

        
        <div class="footer">
            <div class="column-50-footer">
                <button class="button-footer" @click="goToPage('buyer')"><b>Zoeken</b></button>
                <button class="button-footer" @click="goToPage('agent')"><b>Zoekertje plaatsen</b></button>
                <button v-show="isNotIngelogd" class="button-footer" @click="goToPage('login')"><b>Login</b></button>
                <button v-show="isIngelogd" class="button-footer" @click="removeCookie()"><b>Logout</b></button>
            </div>
            <div class="column-50-footer logo-footer">
                <img class="logoVolledig" src="../assets/LogoGroot.png" alt="LogoGroot">
            </div>
        </div>
    </div>
    
</template>

<script>
    // export
    export default {
        name: "tips",
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
        beforeMount(){
            this.isLoggedIN()
        }
    }
</script>