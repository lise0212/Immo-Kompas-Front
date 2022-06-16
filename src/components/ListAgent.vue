<template>
    <div>
        <div v-for="(agent, counter) in items" :key="counter">
            <div v-if="counter==0">
                <p>{{agent.email}}</p>

            </div>
        </div>
    </div>
</template>

<script>
    export default{
        name:"ListAgent",
        props:[
            "items"
        ]
    }
</script>