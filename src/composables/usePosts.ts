import { computed, reactive, ref, type Ref } from "vue";
import type Post from "@/interfaces/Post";
import RemoteStorageService from "@/services/RemoteStorageService";
import OfflineStorageService from "@/services/OfflineStorageService";
import type FetchOptions from "@/interfaces/FetchOptions";

const remotePosts : Ref<Array<Post>> = ref([]);
const localPosts : Ref<Array<Post>> = ref([]);
const isLoading  = ref(false);

const remoteStorage = new RemoteStorageService()
const offlineStorage = new OfflineStorageService()

export default ()=>{

    /*
        mock server does not seem to respect pagenation,
        will assume it is out of scope.
    */
    const fetchRemotePosts = async ()=>{
        if(isLoading.value){
            return false;
        }

        isLoading.value = true;
        remotePosts.value = await remoteStorage.load({
            paginate:{
                limit:1,
                page:1
            }
        });
        isLoading.value = false;
    }

    const fetchLocalPosts = ()=>{
        localPosts.value = offlineStorage.load();
    }

    const refreshPosts = async ()=>{
        fetchLocalPosts();
        await fetchRemotePosts();
    }

    const updatePosts = async ()=>{
        if(localPosts.value.length){
            if(isLoading.value){
                return false;
            }
            
            isLoading.value = true;
            const additions = await Promise.all(localPosts.value.map(async (post)=>
                {
                    // res will always have id of "101" because of the mock server. this will throw duplicate key but is fine for the demo 
                    const res = await remoteStorage.save(post)
                    offlineStorage.delete(post.id)
                    return res
                }
            ))
            fetchLocalPosts()

            // because mock remote endpoint does not actually save the data, this only temporarily adds it to screen
            remotePosts.value.unshift(...additions)
            
            isLoading.value = false;
        }
    }

    const savePost = (post: Post)=>{
        offlineStorage.save(post);
        fetchLocalPosts()
    }

    const posts= computed(()=>
        [...localPosts.value.map(x=>({...x,local:true})),...remotePosts.value]
    )

    return{
        remotePosts,
        localPosts,
        posts,
        isLoading,
        refreshPosts,
        savePost,
        updatePosts
    }
}