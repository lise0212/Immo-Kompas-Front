<template>
    <div>
        <div class="row">
            <div v-for="(house) in items" v-bind:key="house.id">
                <div v-if="counter==0">
                    <b>{{counter+1}} - {{house.id}}</b>
                </div>

            </div>

        </div>
    </div>
</template>

<script>
    export default {
        name: "List",
        props: [
            "items"
        ]
    }
</script>