<template>
  <div id="app">
      <ul>
        <li>
          <router-link to="/A">router A</router-link>
        </li>
        <li>
          <router-link to="/B">router B</router-link>
        </li>
      </ul>

      <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
