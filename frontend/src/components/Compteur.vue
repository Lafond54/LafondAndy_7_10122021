<template>
    <div>

        <h1>Mon super compteur</h1>
        <p @click="increment">Vous avez cliqué {{ total }} fois.</p>
    </div>
</template>

<script>
export default {
    name: 'Compteur',
    data(){
        return {
            total: 0
        }
    },
    methods:{ increment(){
        this.total += 1;
    }
    }
}

</script>


<style scoped>
h1 {
    font-size: 5rem;
}
</style>