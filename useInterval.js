import { useRef, useEffect } from "react";
//const [isRunning, setRunning] = useState(true);
// useInterval(()=>{
//     console.log('hele');
// }, isRunning ? 1000 : null);
//커스텀 훅
function useInterval(callback, delay) {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  });
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }

    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);

  return savedCallback.current;
}

export default useInterval;
