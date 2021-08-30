<template>
  <div id="app">
    <header>Take a screenshoot</header>
    <main>
      <form @submit.prevent="requestScreenshot">
        <input type="url" class="url" id="url" v-model="url" />
        <input type="submit" value="Take a screenshot" />
      </form>
      <a
        v-if="screenshootUrl != ''"
        v-bind:href="screenshootUrl"
        target="_blank"
        download
      >
        <img :src="screenshootUrl" style="width:400px;height:400px" />
      </a>
    </main>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "App",
  setup() {
    const url = ref("http://");

    const screenshootUrl = ref("");

    const requestScreenshot = async () => {
      const res = await fetch("http://localhost:5000/screenshot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: url.value,
        }),
      }).then((data) => data.json());
      screenshootUrl.value = `http://localhost:5000/static/screenshots/${res.ID}.png`;
      console.log(screenshootUrl);
    };
    return {
      url,
      screenshootUrl,
      requestScreenshot,
    };
  },
};
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
