<template>
<div>
<AppBar :appName="appName"/>
<div class="nav">
  <router-link class="router" to="/">home</router-link> | 
  <router-link to="/addUpdate">add&update</router-link> |
  <router-link to="/delete">delete</router-link>
</div>
<router-view/>
</div>
</template>

<script>
import AppBar from "./components/AppBar"

export default {
  
  name: 'App',
  setup(){
    const appName = "ToDo"
    return { appName }
  },
  components: {
    AppBar,
  }
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
}

.nav{
  font-size: 20px;
  padding: 2vh;
  display: flex;
  justify-content: space-around;
  border-bottom: 1px solid black;
}
.nav .router-link-exact-active {
    color: red;
    text-decoration-line: none;
  }
  /* 활성화가 안 된 링크 */
  .nav a {
    color: black;
    text-decoration-line: none;
  }

</style>
