<script setup lang="ts">
    import type Post from "../interfaces/Post"
    const props = defineProps<{post:Post}>()
    const post = props.post;
</script>

<template>
    
    <div>
        <h3>
            {{post.local? "(local)":""}}
            {{post.title}}
        </h3>
        <p>
            {{post.body}}
        </p>
    </div>
</template>

<style scoped>

</style>
