<template>
    <div class="block">
        <div v-for="house in items" :key="houseID=house.id" class="column-33 card">
            <div class="card-text">
                <div>
                    <li><img :src="house.image_url" alt="image"></li>
                    <div class="details">
                        <li data-label="Type">{{house.property_type}}</li>
                        <li data-label="Locatie">{{house.locality}}</li>
                        <li data-label="Kamers">{{house.number_of_rooms}} kamers</li>
                        <li data-label="Prijs">€ {{house.price}}</li>
                        <li data-label="Makelaar">{{house.name}}</li>                        
                        <!-- <li data-label="Makelaar">{{house.id}}</li> -->
                        <li><a class="contact" :href="'mailto:'+house.email">Contacteer de makelaar</a></li>
                        <li v-if="showAddFavorite"><button class="like" @click="addFavorite()"><span class="heart">❤</span> Voeg toe aan favorieten</button></li>
                        <li v-else-if="showAdded"><button class="liked"><span class="heart">❤</span> Toegevoegd aan favorieten</button></li>
                    </div>
                </div>     
            </div>
        </div>
    </div>
</template>

<script>
    export default{
        name:"ListHouse",
        props:[
            "items"
        ],
        data(){
            return{
                houseID: '0',
                showAddFavorite:true,
                showAdded:false
            }
        },
        methods:{
            async addFavorite(){
                try{
                    let requestOptions={
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            house_id: this.houseID
                        })
                    }
                    console.log(this.houseID)
                    console.log(house_id)
                    let response = await fetch("http://127.0.0.1:8000/api/addFavorite?user_id=17", requestOptions)
                    let resp = await response.text();
                    console.log(resp)
                    this.showAddFavorite=false
                    this.showAdded=true
                } catch(error){
                    console.log(error)
                }
            }
        }
    }
</script>