import { useEffect, useState } from "react"

export const useConfirmDialog = (fuctionIfConfirm) =>{
    const [isVisible, setVisivility] = useState(false); 
    const [confirmation, setConfirmation ] = useState(false);
    const showDialog = () => {
        setConfirmation(false); 
        setVisivility(true);
    } 
    const Dialog = () =>{
        if(isVisible){
            return (
              <div className="fixed flex inset-0 bg-black/40 justify-center items-center">
                <main className="bg-slate-800 rounded-3xl p-5  text-white md:p-10 w-[min(80%,_500px)] aspect-square flex flex-col justify-evenly">
                  <div className="text-center">
                    <h1 className="text-3xl">¿Do you whant to continue?</h1>
                  </div>
                  <div className="flex justify-around">
                    <button
                      onClick={() => setVisivility(false)}
                      className="bg-neutral-400 rounded-3xl w-40 py-2"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => setConfirmation(true)}
                      className="bg-red-800 rounded-3xl w-40 py-2"
                    >
                      Confirm
                    </button>
                  </div>
                </main>
              </div>
            );
        }
    }
    useEffect(()=>{
        if(confirmation){
            fuctionIfConfirm(); 
            setVisivility(false); 
        }
    }, [confirmation])
    return {Dialog, showDialog}
}