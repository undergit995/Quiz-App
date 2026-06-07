import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import Typography from "@mui/material/Typography";

export default function Duration({ Submit }) {
  let duration = useSelector((state) => state.sliceOnes.duration);
  const [isStarted, setisStarted] = useState(false);
  const [colors, setcolors] = useState(false);
  const [min, setmin] = useState(duration*60);
  const time = useRef("");
  function quizTime() {
    // if(isStarted){
    time.current = setInterval(() => {
      setmin((p) => {
        if (p <= 10) {
          setcolors(true);
        }
        if (p <= 0) {
          Submit();
        }
        return p - 1;
      });
    }, 1000);
    // }
  }
  useEffect(() => {
    setisStarted(true);
    quizTime();

    return () => {
      setisStarted(false);
      clearInterval(time.current);
    };
  }, []);

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
