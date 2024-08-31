<template>
<h1>
  {{appName}}
</h1>
  </template>
  
  <script>
  
  export default {
    props:['appName'],
    setup(){
    }
  }
  </script>
  
  <style>
  *{
    margin: 0;
    padding: 0;
  }
  h1{
    padding-top: 2vh;
    display: flex;
    justify-content: center; 
  }
  
  </style>
  