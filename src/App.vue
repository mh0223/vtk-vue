<template>
  <VtkCone />
</template>

<script>
import VtkCone from "./components/VtkView";

export default {
  name: "App",
  components: {
    VtkCone
  }
};
</script>

<style>
* {
  padding: 0;
  margin: 0;
}

html,
body {
  height: 100%;
  width: 100%;
}
</style>
