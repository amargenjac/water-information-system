import React, { useState,useEffect } from "react";
import "./App.css";
import WaterInfo_abi from "./contracts/WaterInfo_abi.json";
import WaterInfoContract from "./contracts/WaterInfoContract.js";
import Login from "./components/Login";
import TestResult from "./components/TestResult";
import LabRegistration from "./components/LabRegistration";

function App() {
  const contractAddress = "0x4930541e764876DC83d14c357D45d4f8d3BCa934";
  const [account, setAccount] = useState(''); 

  const waterInfoContract = WaterInfoContract(
    contractAddress,
    WaterInfo_abi.abi,
    account
  );

  const getTestInformation = async () => {
    if (!waterInfoContract) return;

    const data = await waterInfoContract.getInformation();
      console.log(data);
  };
  useEffect(() => {
    getTestInformation();
  },[]);
  return (
    <div className="App">
      <TestResult account={account} waterInfoContract={waterInfoContract} />
      <LabRegistration waterInfoContract = {waterInfoContract} account = {account}/>
      <Login account = {account} setAccount = {setAccount}/>
      </div>
  );
}

export default App;
