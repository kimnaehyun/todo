<template>
<ListItem :home="home"/>
</template>
<script>
import ListItem from '@/components/ListItem.vue';
export default {
  name: "HomePage",
  setup(){
    const home = true;
    return{
      home
    }
  },
  components: {
    ListItem
  }
}
</script>
<style>
</style>