<template>
    <nav class="nav">
        <!-- <span>
            {{companyname}}
        </span> -->
      <ul class="nav-list">
        <li><router-link class="nav-list-item" :to="{name: 'Homepage'}">Home</router-link></li>
        <li> class="nav-list-item" @click="goToPage('buyer')"
          Ik ben koper
        </li>
        <li> class="nav-list-item" @click="goToPage('agent')"
          Ik ben makelaar
        </li>
        <li> class="nav-list-item" @click="goToPage('login')"
          Login
        </li>
        <li> class="nav-list-item" @click="goToPage('register')"
          Registreer
        </li>
      </ul>
    </nav>
</template>

<script>
    export default {
    name: "Navigation",
    data(){
        return{
            showNavigation: true,
            links: {
                "home": "home",
                "Loginpage": "login"
            
                
            }

        }
    }
}
</script>
