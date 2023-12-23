import type Post from "@/interfaces/Post";
import type FetchOptions from "@/interfaces/FetchOptions";
import type StorageService from "@/interfaces/StorageService";
import constants from "@/constants";

const KEY_POSTS = "posts";

/*
    websql/indexedDB might be considered for large dataset
*/

const storage =
  constants.offlineStorage === "localStorage"
    ? window.localStorage
    : window.sessionStorage;

export default class OfflineStorageService implements StorageService {
  load(): Post[] {
    const posts = storage.getItem(KEY_POSTS);
    if (posts) {
      return JSON.parse(posts);
    }
    return [];
  }

  save(post: Post) {
    post.id = +new Date();
    const posts = this.load();
    posts.unshift(post);
    const postsString = JSON.stringify(posts);
    storage.setItem(KEY_POSTS, postsString);
    return post;
  }

  delete(id: number) {
    const posts = this.load();
    const i = posts.findIndex((x) => x.id === id);
    posts.splice(i, 1);
    const postsString = JSON.stringify(posts);
    storage.setItem(KEY_POSTS, postsString);
  }
}
