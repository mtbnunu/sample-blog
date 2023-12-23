import type Post from "@/interfaces/Post";
import type FetchOptions from "@/interfaces/FetchOptions";
import type StorageService from "@/interfaces/StorageService";
import constants from "@/constants";

/*
  apollo-client requires react import.
  for this simple use case, no library is necessary
*/

export default class RemoteStorageService implements StorageService {
  async load(options: FetchOptions): Promise<Post[]> {
    const res = await fetch(constants.endpoint, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        query: `query ($options: PageQueryOptions) {
            posts(options: $options) {
              data {
                id
                title
                body
              }
              meta {
                totalCount
              }
            }
          }`,
        variables: { $options: options },
      }),
    });
    const data = await res.json();
    return data.data.posts.data;
  }

  async save(post: Post): Promise<Post> {
    const { id, ...input } = post;

    const res = await fetch(constants.endpoint, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        query: `mutation CreatePost($input: CreatePostInput!) {
            createPost(input: $input) {
              id
              title
              body
            }
        }`,
        variables: { input },
      }),
    });
    const data = await res.json();
    return data.data.createPost;
  }

  delete(id: number) {
    console.error("Not Implented - Out of scope");
  }
}
