<template>
  <div id="app">
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
import Matchpage from "./pages/Matchpage.vue"
import NavigationBar from './components/NavigationBar.vue';
export default {
  name: 'App',
  components: {
    Homepage,
    Buyerpage,
    Agentpage,
    Loginpage,
    Logoutpage,
    Registerpage,
    Matchpage,
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
