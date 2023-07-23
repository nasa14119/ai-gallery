
const API = `${import.meta.env.VITE_API}/image`

const fetchToUpdate = async (id, body) => {
    try {
        const res = await fetch(`${API}/${id}`, {
            method: "PUT", 
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include", 
            body
        })
        return res.status; 
    } catch (error) {
        throw Error("There was an error while fetching");         
    }
}
export async function updateImage(id, obj){
    const newImage = JSON.stringify({...obj}); 
    return await fetchToUpdate(id , newImage);
}