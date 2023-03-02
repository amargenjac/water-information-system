import React from "react";


const SingleResult = ({ name, phLevel, timestamp, temperature,phosphates,totalDissolvedSolids,note,testerAddress }) => {

  // create a new Date object
  const date = new Date(timestamp*1000);
  /*
  // format the date as a string*/
  const formattedDate = date.toString(); 
  return (
  <tr>
    <td>{name}</td>
    <td>{phLevel}</td>
    <td>{temperature}</td>
    <td>{phosphates}</td>
    <td>{totalDissolvedSolids}</td>
    <td>{note}</td>
    <td>{formattedDate}</td>
    <td>{testerAddress}</td>
  </tr>
  );
};

export default SingleResult;