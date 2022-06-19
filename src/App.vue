<!-- <script src="https://unpkg.com/vue-router@2"></script>
<script src="http://code.jquery.com/ui/1.12.1/jquery-ui.min.js"></script> -->


<template>
  <div id="app">
    <!-- <router-link to="/">Home</router-link>
    <router-link to="/buyer">Ik ben koper</router-link>

    <router-view></router-view> -->


    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <Homepage 
      v-if="page=='home'"

      @change-page="goToPage"
    />

    <Buyerpage 
      v-if="page=='buyer'"

      @change-page="goToPage"
    />

    <Agentpage 
      v-if="page=='agent'"

      @change-page="goToPage"
    />

    <Loginpage 
      v-if="page=='login'"
      @change-page="goToPage"
    />

    <Logoutpage 
      v-if="page=='logout'"

      @change-page="goToPage"
    />

    <Registerpage 
      v-if="page=='register'"

      @change-page="goToPage"
    />

    <Matchpage 
      v-if="page=='match'"

      @change-page="goToPage"
    />
  </div>
</template>

<script>
import style from "./SCSS/style.scss"
import Homepage from "./pages/Homepage.vue"
import Buyerpage from "./pages/Buyerpage.vue"
import Agentpage from "./pages/Agentpage.vue"
import Loginpage from "./pages/Loginpage.vue"
import Logoutpage from "./pages/Logoutpage.vue"
import Registerpage from "./pages/Registerpage.vue"
export default {
  name: 'App',
  components: {
    Homepage,
    Buyerpage,
    Agentpage,
    Loginpage,
    Logoutpage,
    Registerpage,
},
  data() {
    return {
      page: "home"
      
    }
  },
  methods:{
    goToPage(page){
      this.page = page;
    }
  } 
}
</script>
