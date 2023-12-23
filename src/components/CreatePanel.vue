<script setup lang="ts">
import { computed, Ref, ref } from "vue";
import usePosts from "../composables/usePosts";
import type Post from "../interfaces/Post";

const emit = defineEmits(["exit"]);

const { savePost, isLoading } = usePosts();

const createPanelOpen = ref(false);
const openNewPanel = () => {
  createPanelOpen.value = true;
};

const creatingPost: Ref<Partial<Post>> = ref({});

const createPost = async () => {
  await savePost(creatingPost.value);
  emit("exit", { success: true });
};

const cancel = () => {
  emit("exit", { success: false });
};

const isValid = computed(
  () =>
    creatingPost.value.title?.trim().length &&
    creatingPost.value.body?.trim().length
);
</script>

<template>
  <div class="createSection">
    <h2>Create new Post</h2>
    <div>
      <input type="text" placeholder="Title" v-model="creatingPost.title" />
    </div>
    <div>
      <textarea placeholder="body" v-model="creatingPost.body" />
    </div>
    <div>
      <button @click="createPost" :disabled="!isValid">Save</button>
      <button @click="cancel">Cancel</button>
    </div>
  </div>
</template>

<style scoped>
.createSection {
    padding: 20px 0;
    border-bottom: 2px solid #eee;
}
</style>
