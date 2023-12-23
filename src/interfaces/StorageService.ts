import type Post from "@/interfaces/Post";
import type FetchOptions from "./FetchOptions";

export default interface AbstractStorageService {
  save: (post: Post) => Promise<Post> | Post;
  load: (options: FetchOptions) => Promise<Post[]> | Post[];
  delete: (id: number) => Promise<void> | void;
}
