import React, { useEffect} from 'react'

export const FollowMouse = () => {
    useEffect(() => {
      const handleAnimation = (e) => {
        const blob = document.querySelector("#btn-follow"); 
        const x = e.clientX - blob.offsetWidth / 2, y = e.clientY - blob.offsetHeight / 2;
        blob.style.top = `${y}px`;
        blob.style.left = `${x}px`;
        blob.animate({
            top :`${y}px`, 
            left: `${x}px`
        }, {duration:8000, fill: "forwards"})
      }
      window.addEventListener("mousemove", handleAnimation);
      return () => window.removeEventListener("mousemove", handleAnimation); 
    }, []);
      
  return (
    <>
    <div
      className="w-[30vw] aspect-square bg-purple-500 fixed -z-10 pointer-events-none opacity-0 trailer rounded-full"
      style={{animationTimingFunction:"ease"}}
      id="btn-follow"
    ></div>
    <div className='fixed -inset-10 -z-10' style={{backdropFilter: "blur(130px)"}}></div>
    </>
  );
}
