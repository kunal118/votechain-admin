import React from "react";
import { ethers } from "ethers";
import { useState, useEffect, useContext } from "react";
import detectEthereumProvider from "@metamask/detect-provider";
import { SignerContext } from "../context/signerContext";
import { toast } from "react-hot-toast";

const VoterRegister = () => {
  const { signer, setSigner } = useContext(SignerContext);
  const [amount, setAmount] = useState(0);
  const [receiver, setReceiver] = useState("");
  const [units, setUnits] = useState("gwei");
  async function handleAccountsChanged(accounts) {
    // console.log(accounts);
    const provider = signer.provider;
    console.log(provider);
    // await provider.send("eth_requestAccounts", []);
    // setSigner(await provider.getSigner());
    console.log(signer);
  }
  useEffect(() => {
    window.ethereum.on("accountsChanged", handleAccountsChanged);
  }, []);
  //   const transact = async () => {
  //     const _amount = ethers.parseUnits(amount.toString(), units);
  //     console.log(receiver, _amount, units);
  //     // console.log(toString(amount));
  //     // console.log(ethers.parseEther("0.01"));
  //     try {
  //       const tx = await signer.sendTransaction({
  //         to: receiver,
  //         value: _amount,
  //       });
  //       toast.success("Transaction Successful");
  //     } catch (e) {
  //       toast.error("Transaction failed");
  //       console.log(e);
  //     }
  //     // // Often you may wish to wait until the transaction is mined
  //     // const receipt = await tx.wait();
  //     // console.log(receipt);
  //     // updateWallet(accounts); /* New */
  //   };

  return (
    <>
      <div className=" m-3 text-center font-semibold">{signer.address}</div>
      <div className="py-20  flex  flex-1 justify-center items-center">
        <ul className="m-2 w-2/5 flex flex-col gap-4 ">
          <li>
            <input
              className="rounded-lg text-md p-4 focus:outline-none  w-full"
              placeholder="Voter Name"
              // value={receiver}
              // onChange={(e) => setReceiver(e.target.value)}
            ></input>
          </li>
          <li>
            <input
              className="rounded-lg text-md p-4 focus:outline-none  w-full"
              placeholder="Aadhar Number"
              // value={receiver}
              // onChange={(e) => setReceiver(e.target.value)}
            ></input>
          </li>
          <li className="flex gap-2 items-center">
            <input
              className="rounded-lg text-md p-4 focus:outline-none  w-full"
              placeholder="Fingerprint Data"
              // value={receiver}
              // onChange={(e) => setReceiver(e.target.value)}
            ></input>
            <button
              // onClick={transact}
              className="rounded  text-md p-1 bg-[#00ADB5]  hover:bg-[#393E46] cursor-pointer  hover:text-white font-bold"
            >
              <img src="src\assets\fingerprint.png"></img>
            </button>
          </li>

          {/* <li className="flex gap-2">
            <input
              className="rounded-lg text-md p-4 focus:outline-none  w-4/5"
              placeholder="amount"
              type="number"
              step="0.0001"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            ></input>
            <select
              className="rounded-lg text-md p-4 focus:outline-none min-w-fit w-1/5"
              value={units}
              onChange={(e) => {
                setUnits(e.target.value);
              }}
            >
              <option value="wei">wei</option>
              <option value="gwei">gwei</option>
              <option value="ether">ETH</option>
            </select>
          </li> */}
          <li>
            <button
              // onClick={transact}
              className="rounded  text-md p-4 bg-[#00ADB5]  hover:bg-[#393E46] cursor-pointer w-full hover:text-white font-bold"
            >
              Register
            </button>
          </li>
        </ul>
      </div>
    </>
  );
};

export default VoterRegister;
