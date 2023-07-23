
const API = `${import.meta.env.VITE_API}/image`
//https://images.unsplash.com/photo-1689704059186-2c5d7874de75?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80
const fetchToAdd = async (body) => {
    try {
        const res = await fetch(API, {
            method: "POST", 
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include", 
            body
        })
        return res.status; 
    } catch (error) {
        throw Error("The image couldent be added"); 
    }
}
export async function setNewImage(obj){
    const newImage = JSON.stringify(obj); 
    return await fetchToAdd(newImage);
}