import { useState } from "react";
import { ethers } from "ethers";
import ErrorMessage from "./ErrorMessage";
import TxList from "./TxList";



let wallets;
const startPayment = async ({ setError, setTxs, ether, addr }) => {
  try {
    if (!window.ethereum)
      throw new Error("No crypto wallet found. Please install it.");

     await window.ethereum.send("eth_requestAccounts");
    const provider = wallets= new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    ethers.utils.getAddress(addr);
    const tx = await signer.sendTransaction({
      to: addr,
      value: ethers.utils.parseEther(ether)
    });
    console.log({ ether, addr });
    console.log("tx", tx);
    setTxs([tx]);
  } catch (err) {
    setError(err.message);
  }
};

export default function App() {
  const [error, setError] = useState();
  const [txs, setTxs] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    setError();
    await startPayment({
      setError,
      setTxs,
      ether: data.get("ether"),
      addr: data.get("addr")
    });
  };

  const connectWallet = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    setError();
    await startPayment({
            setTxs,
      ether: data.get("ether"),
      addr: data.get("addr")
    });
  };

  return (
    <>
    <div className="page ">
      
    <form className="Form align-middle" onSubmit={handleSubmit}>
        <main className="">
        
          <h1 className="Headline text-center text-white">
            CRYPT IT
          </h1>
          <div className="">
              <input
                type="text"
                name="addr"
                className="Textfield align-middle appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                placeholder="Recipient Address"
              />
              <input
                name="ether"
                type="text"
                className="Textfield align-middle appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                placeholder="Amount in ETH"
              />
            </div>
        </main>
        <footer className="">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold  rounded-full w-full Button align-middle mr-200"
          >
            Connect & Pay now
          </button>
          <ErrorMessage message={error} />
          <TxList txs={txs} />
        </footer>
     
    </form>

    </div>
    </>
  );
}
