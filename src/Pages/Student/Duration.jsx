import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import Typography from "@mui/material/Typography";

export default function Duration({ submit,duration }) {
  const [isStarted, setisStarted] = useState(false);
  const [colors, setcolors] = useState(false);
  const [min, setMin] = useState( duration);
  const time = useRef(null);

  const startTimer = () => {
    time.current = setInterval(() => {
      setMin(prev => {
        if (prev <= 1) {
          clearInterval(time.current);
          submit?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    setMin(duration);

    if (time.current) {
      clearInterval(time.current);
    }

    startTimer();

    return () => clearInterval(time.current);
  }, [duration]);

  return (
    <div>
      <Typography
        variant="h6"
        color="initial"
        sx={{ color: `${colors ? "red" : "black"}` }}
      >
        {`${String(Math.floor(min / 60)).padStart(2, "0")}:${String(min % 60).padStart(2, "0")}`}
      </Typography>
    </div>
  );
}
