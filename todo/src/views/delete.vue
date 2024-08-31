<template>
<ListItem :eliminate="eliminate" />
</template>
<script>
import ListItem from '@/components/ListItem.vue';
export default {
  name: 'DeletePage',
  setup(){
const eliminate = true;
    return {eliminate} 
  },
  components: { ListItem }
}
</script>
<style >
</style>