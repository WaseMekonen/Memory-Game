import { useState, useEffect } from "react";

function Clock() {
  const [miliSeconds, setMiliSeconds] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds(seconds + 1);
    }, 1000);
  }, []);

  return (
    <div>
      {minutes} : {seconds}
    </div>
  );
}

export default Clock;
