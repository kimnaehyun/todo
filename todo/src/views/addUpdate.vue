<template>
<ListItem :addUpdate="addUpdate" />
</template>
<script>
import ListItem from '@/components/ListItem.vue';
export default {
  name: 'addUpdatePage',
  setup(){
const addUpdate = true; 
    return { addUpdate }
  },
  components:{
    ListItem,
  }
}
</script>
<style>
</style>