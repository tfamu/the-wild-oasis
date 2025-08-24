import { useEffect, useRef } from "react";

export const useOutsideClick = (handler: () => void, listenCapturing = true) => {
    const styledModalref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const handleClick = (event: MouseEvent) => {
          // if click the modal but there is no event.target -> clicking outside the modal
          if (
            styledModalref.current &&
            event.target instanceof Node &&
            !styledModalref.current.contains(event.target)
          ) {
            console.log("click outside");
            handler();
          }
        };
        // passing true to capture event at capture phase
        // when event when down to DOM tree
        document.addEventListener("click", handleClick, listenCapturing);
    
        return () => document.removeEventListener("click", handleClick);
      }, [handler, listenCapturing]);

      return { styledModalref }
}