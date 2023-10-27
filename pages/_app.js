import "../styles/globals.css";
import { useState, useRef } from "react";
import { createWeb3Modal, defaultWagmiConfig } from "@web3modal/wagmi/react";
import { WagmiConfig } from "wagmi";
import { arbitrum, mainnet, polygonMumbai } from "wagmi/chains";

function MyApp({ Component, pageProps }) {
  // 1. Get projectId
  const projectId = "dd0d6065610301cf7f8d51557cbbffc3";

  // 2. Create wagmiConfig
  const metadata = {
    name: "Web3Modal",
    description: "Web3Modal Example",
    url: "https://web3modal.com",
    icons: ["https://avatars.githubusercontent.com/u/37784886"],
  };

  const chains = [polygonMumbai];
  const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata });

  // 3. Create modal
  createWeb3Modal({ wagmiConfig, projectId, chains });
  return (
    <>
      <WagmiConfig config={wagmiConfig}>
        <Component {...pageProps} />
      </WagmiConfig>
    </>
  );
}

export default MyApp;
