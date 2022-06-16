<template>
    <div>
        <nav class="nav">
            <ul class="nav-list">
                <li><button class="nav-list-item" @click="goToPage('home')">Home</button></li>
                <li><button class="nav-list-item" @click="goToPage('buyer')">Ik ben koper</button></li>
                <li><button class="nav-list-item" @click="goToPage('agent')">Ik ben makelaar</button></li>
                <li><button class="nav-list-item push-right" @click="goToPage('login')">Login</button></li>
                <li><button class="nav-list-item" @click="goToPage('register')">Registreer</button></li>
            </ul>
        </nav>
        <div>
            <ListAgent
                :items="agents"
            />
        </div>
    </div>
    
</template>

<script>
    // export
    import List from "../components/List.vue";
    import NavigationBar from "../components/NavigationBar.vue";
    import ListAgent from "../components/ListAgent.vue";

    export default {
        name: "Homepage",
        components:{
            List,
            NavigationBar,
            ListAgent
        },
        data(){
            return{
                agents: null

            }
        },
        methods: {
            goToPage(page){
                this.$emit("change-page", page);
            },
            // data methods
            fetchHouses() {
                // Get all songs
                const url = "http://127.0.0.1:8000/api/agents";
                fetch(url)
                    .then((response) => {
                        console.log(response.json())
                        return response.json();
                    })
            },
            
            
            },

            
        }
</script>