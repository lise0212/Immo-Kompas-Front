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
            <div class="container">
                
                
            </div>
        </div>
    </div>
    
</template>

<script>
    // export

    export default {
        name: "Homepage",
        methods: {
            goToPage(page){
                this.$emit("change-page", page);
            },
        },
    }
</script>