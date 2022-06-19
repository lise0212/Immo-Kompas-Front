<template>
    <div>
        <div v-for="(house, counter) in items" :key="counter" class="column-33 card">
            <div class="card-text">
                <li>
                    <div><img :src="house.image_url" alt="image"></div><br>
                    <div data-label="Locatie">Locatie: {{house.locality}}</div><br>
                    <div data-label="Kamers">Aantal kamers: {{house.number_of_rooms}}</div><br>
                    <div data-label="Prijs">Prijs: {{house.price}}</div><br>
                    <div data-label="Type">Type woning: {{house.property_type}}</div><br>
                    <div data-label="Makelaar">Makelaar: {{house.name}}</div>
                </li>                
                <br><br>
            </div>
        </div>
    </div>
</template>


<script>
    export default{
        name:"ListHouse",
        props:[
            "items"
        ]
    }
</script>