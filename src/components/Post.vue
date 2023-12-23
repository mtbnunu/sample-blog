<script setup lang="ts">
import type Post from "../interfaces/Post";
const props = defineProps<{ post: Post }>();
const post = props.post;
</script>

<template>
  <div class="post">
    <h3>
      {{ post.title }}
      <span v-if="post.local" class="localbadge"> Unpublished </span>
    </h3>
    <p>
      {{ post.body }}
    </p>
  </div>
</template>

<style scoped>
.post {
  border: solid 1px #bbb;
  padding: 10px;
  margin: 10px;
  border-radius: 20px;
}
.localbadge {
  background-color: #ff8181;
  color: white;
  padding: 0.3em 1em;
  font-size: 0.7em;
  border-radius: 1em;
  float: right;
}
</style>
