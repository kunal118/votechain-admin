import React, { useState } from "react";
import { SiBlockchaindotcom } from "react-icons/si";
import { SignerContext } from "../context/signerContext";
import { useContext } from "react";
import { ethers } from "ethers";
import toast, { Toaster } from "react-hot-toast";
// import { AiOutlineCLose } from "react-icons/ai";
const NavbarItems = ({ title, path, classProps }) => {
  return (
    <li
      className={`mx-4 cursor-pointer  hover:text-slate-300 ${classProps}`}
      onClick={path}
    >
      <a href={path}>{title}</a>
    </li>
  );
};

const Navbar = () => {
  const [isConnecting, setIsConnecting] = useState(false);
  const { signer, setSigner } = useContext(SignerContext);

  const handleConnect = async () => {
    setIsConnecting(true);
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      setSigner(await provider.getSigner());
    } catch {
      toast.error("Error connecting");
    }
    setIsConnecting(false);
  };

  return (
    <nav className="w-full flex justify-between items-center px-6 py-2 bg-[#222831] text-[#EEEEEE]  border-slate-700 text-l title-krypt drop-shadow-xl ">
      <div className="flex flex-1 justify-around items-center gap-4">
        <span className="font-bold text-[#00ADB5]">
          <SiBlockchaindotcom size="3rem"></SiBlockchaindotcom>VOTECHAIN BHARAT
        </span>
        {/* <img src={logo} alt="logo" className="w-32 cursor-pointer"></img> */}
        <ul className=" flex list-none justify-between items-center flex-row flex-initial gap-2">
          {[
            { name: "Home", path: "/" },
            { name: "Candidate Registration", path: "/registerParty" },
            { name: "Voter Registration", path: "/registerVoter" },
          ].map((item, index) => {
            return (
              <NavbarItems
                key={item.name + index}
                title={item.name}
                path={item.path}
              />
            );
          })}
        </ul>
        <button
          onClick={handleConnect}
          style={isConnecting ? { opacity: 0.2 } : { opacity: 1 }}
          disabled={isConnecting}
          className="rounded  bg-[#00ADB5] py-2 px-5 hover:bg-[#393E46] cursor-pointer"
        >
          Connect
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
