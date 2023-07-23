
async function makeDelete(url){
    const res = await fetch(url, {
        method: "DELETE", 
        credentials: "include"
    })
    return res.status; 
}

export function useDelete(id){
    const base_url = import.meta.env.VITE_API 
    return makeDelete(`${base_url}/image/${id}`);
}
