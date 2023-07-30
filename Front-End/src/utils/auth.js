const URL = import.meta.env.VITE_API
export const fetchRegister = async (obj) => {
  const res = await fetch(`${URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
    credentials: "include",
    mode:"cors"
  });
  return { data: await res.json(), status: res.status };
};
export const fetchLogin = async (obj) =>{
    const res = await fetch(`${URL}/login`, {
        method: "POST", 
        headers: {
            "Content-Type": "application/json",
        },
        body:JSON.stringify(obj), 
        credentials: "include",
        mode:"cors"
    })
    return {data: await res.json(), status: res.status}; 
}
export const fetchLogout = async (obj) =>{
    const res = await fetch(`${URL}/logout`, {
        method: "POST", 
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include"
    })
    return res.status; 
}
export const VerifyToken = async (obj) =>{
    const res = await fetch(`${URL}/verify-token`, {
        method: "GET", 
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include"
    })
    return res; 
}