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
        </ul>
        </nav>

        <div>
            
        </div>
    </div>
    
</template>

<script>
    // export
    export default {
        name: "Homepage",
        data(){
            return{
                isNotIngelogd:true,
                isIngelogd:false
            }
        },
        methods: {
            goToPage(page){
                this.$emit("change-page", page);
            },
        },
    }
</script>