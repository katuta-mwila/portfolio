import { useState } from "react";

export default function useForceUpdate(caller?: string)
{
  const reloadState = useState(() =>{
    if (caller){
      //console.log("Declaring forcereload obj from: " + caller)
    }
    return {}
  })

  return function(){
    reloadState[1]({})
  }
}