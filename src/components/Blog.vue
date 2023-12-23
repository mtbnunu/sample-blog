<script setup lang="ts">
import { onMounted, type Ref, ref } from "vue";
import usePosts from "../composables/usePosts";
import type PostType from "../interfaces/Post";
import CreatePanel from "./CreatePanel.vue";
import Post from "./Post.vue";

const {
  posts,
  localPosts,
  remotePosts,
  savePost,
  updatePosts,
  refreshPosts,
  isLoading,
} = usePosts();
onMounted(async () => {
  await refreshPosts();
});

const createPanelOpen = ref(false);
const openNewPanel = () => {
  createPanelOpen.value = true;
};
</script>

<template>
  <div class="actions">
    <button @click="openNewPanel" :disabled="createPanelOpen">
      Create New Post
    </button>
    <button @click="updatePosts" :disabled="!localPosts.length">
      Push {{ localPosts.length }} items to Server
    </button>
  </div>
  <Transition name="slidedown">
    <div v-if="createPanelOpen" class="createPanel">
      <CreatePanel @exit="createPanelOpen = false" />
    </div>
  </Transition>
  <div>
    <Post v-for="post in posts" :key="post.id" :post="post" />
  </div>
  <div v-if="isLoading">LOADING...</div>
</template>

<style scoped></style>
