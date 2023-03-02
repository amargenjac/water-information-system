import React from "react";
import { ethers } from "ethers";
import useIsMetaMaskInstalled from "../contracts/UseMetaMaskInstalled";

const Login = ({ setAccount, account }) => {
  const isMetaMaskInstalled = useIsMetaMaskInstalled();

  const handleOnConnect = () => {
    window.ethereum
      .request({ method: "eth_requestAccounts" })
      .then((accounts) => {
        setAccount(ethers.utils.getAddress(accounts[0]));
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="login-wrapper">
      {account && (
        <><div className="login-data"> <b>You are connected using following address: </b>
        <br />
        <small>{account}</small>
        </div>
          
        </>
      )}  
      {(!account && isMetaMaskInstalled) && (
        <button onClick={handleOnConnect} className="post-info" disabled={!isMetaMaskInstalled}>
          Login using 🦊
        </button>
      )}
      {!isMetaMaskInstalled && <h1 className="error-log">Please install MetaMask</h1>}
    </div>
  );
};

export default Login;