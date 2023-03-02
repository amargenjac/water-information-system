import React from 'react'
import { useState } from "react";
import { ethers } from "ethers";


const LabRegistration = ({waterInfoContract, account }) => {
    const [labName, setLabName] = useState("");
    const [labCity, setLabCity] = useState("");
    const postLabData = async () => {
        if (!waterInfoContract) return;
        try {
          const postTxn = await waterInfoContract.createLaboratory(labName, labCity);
          await postTxn.wait();
        } catch (e) {
          console.warn("Transaction failed with error", e);
        } finally {
        setLabCity("");
        setLabName("");
          window.location.reload();
        }
      };
  return (
    <> 
    {account &&
         <div className='lab-info'>
    <input placeholder="Lab Name" value={labName} onChange={(e)=>{setLabName(e.target.value)}}></input>
    <input placeholder="Lab City Name" value={labCity} onChange={(e)=>{setLabCity(e.target.value)}}></input>
    <button className="button post-lab" onClick={postLabData}>Register Lab</button>
</div>
}
</>
    
  )
}

export default LabRegistration