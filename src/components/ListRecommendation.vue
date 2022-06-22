<template>
    <div class="block">
        <div v-for="(house, counter) in items" :key="counter" class="column-33 card">
            <div class="card-text">
                <div>
                    <li><img :src="house.image_url" alt="image"></li>
                    <div class="details">
                        <li data-label="Type">{{house.property_type}}</li>
                        <li data-label="Locatie">{{house.locality}}</li>
                        <li data-label="Kamers">{{house.number_of_rooms}} kamers</li>
                        <li data-label="Prijs">€ {{house.price}}</li>
                        <li data-label="Makelaar">{{house.name}}</li>
                        <li><a class="contact" :href="'mailto:'+house.email">Contacteer de makelaar</a></li>
                        <!-- <li><button class="like"><span class="heart">❤</span> Voeg toe aan favorieten</button></li> -->
                        <!-- <li v-else-if="showAdded"><button class="liked"><span class="heart">❤</span> Toegevoegd aan favorieten</button></li> --> 
                    </div>
                </div>       
            </div>
        </div>
    </div>
</template>

<script>
    export default{
        name:"listRecommendation",
        props:[
            "items"
        ]
    }
</script>