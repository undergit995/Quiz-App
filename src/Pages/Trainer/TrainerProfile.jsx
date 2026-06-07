import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';

export default function TrainerProfile() {

  let trainer = useSelector((state) => state.trainer.trainer);


  useEffect(() => {
  
  }, [])
  
  return (
    <div>TrainerProfile</div>
  )
}
