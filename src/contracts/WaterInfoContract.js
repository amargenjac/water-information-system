import { useState, useEffect } from "react";
import { ethers } from "ethers";


const WaterInfoContract = (
  contractAddress,
  web3ChatAbi,
  account
) => {
  const [signer, setSigner] = useState();
  const [webThreeProvider, setWebThreeProvider] = useState(null);
  const { ethereum } = window;

  useEffect(() => {
    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      setWebThreeProvider(provider);
    }
  }, [ethereum]);

  useEffect(() => {
    if (webThreeProvider && account) {
      setSigner(webThreeProvider.getSigner());
    }
  }, [account, webThreeProvider]);

  if (!contractAddress || !web3ChatAbi || !ethereum || !webThreeProvider)
    return;

  return new ethers.Contract(
    contractAddress,
    web3ChatAbi,
    signer || webThreeProvider
  );
};

export default WaterInfoContract;