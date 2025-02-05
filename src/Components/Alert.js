import React from 'react'
export default function Alert(props) {
    const capitalise =(word)=>{
      if (word === "danger"){
        word = "error"
      }
    const lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase()+ word.slice(1);
    }
  return (
  <div style={{height:'50px'}} >
  {props.alert &&
   <div className={`alert alert-${props.alert.type} alert-dissmissible fade show`} role="alert">
  {capitalise(props.alert.type)} : {props.alert.msg}
</div>}
</div>
  )
};
