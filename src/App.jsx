import { useState, useEffect, useRef } from "react";
import reactLogo from "./assets/react.svg";
import Navbar from "./components/Navbar";
import Welcome from "./components/PartyRegister";
import toast, { Toaster } from "react-hot-toast";
import detectEthereumProvider from "@metamask/detect-provider";
import { ProviderContext, SignerContext } from "./context/signerContext";
import VoterRegister from "./components/VoterRegister";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PartyRegister from "./components/PartyRegister";

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello world!</div>,
  },
  {
    path: "/registerParty",
    element: <PartyRegister></PartyRegister>,
  },
  {
    path: "/registerVoter",
    element: <VoterRegister></VoterRegister>,
  },
]);

function App() {
  const didMount = useRef(false);
  const [hasProvider, setHasProvider] = useState(false);
  const [signer, setSigner] = useState("");
  const signerObject = { signer, setSigner };
  useEffect(() => {
    const getProvider = async () => {
      const provider = await detectEthereumProvider({ silent: true });

      setHasProvider(Boolean(provider));
    };

    getProvider();
    //sets the hasProvider value to true if metamask is available
  }, []);

  useEffect(() => {
    //dont call render toast first time
    if (didMount.current) renderToast();
    else didMount.current = true;
  }, [hasProvider]);

  useEffect(() => {
    console.log(signer);
  }, [signer]);
  const renderToast = () => {
    if (hasProvider) toast.success("Metamask is available");
    else toast.error("Metamask is not available");
  };

  return (
    <>
      <Toaster />
      <SignerContext.Provider value={signerObject}>
        <ProviderContext.Provider>
          <Navbar />
          {/* <Welcome></Welcome> */}
          {/* <VoterRegister></VoterRegister> */}
          <RouterProvider router={router} />
        </ProviderContext.Provider>
      </SignerContext.Provider>
    </>
  );
}

export default App;
