import React from "react";
import styles from "./index.module.css";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useAccount, useWalletClient } from "wagmi";
import { createPublicClient, http } from "viem";
import gpa_abi from "../../abis/gpa.json";

const AddGPA = () => {
  const { open, close } = useWeb3Modal();
  const { address, isConnecting, isDisconnected } = useAccount();
  const nameRef = React.useRef<HTMLInputElement>(null);
  const rollRef = React.useRef<HTMLInputElement>(null);
  const gpaRef = React.useRef<HTMLInputElement>(null);
  const { data: walletClient } = useWalletClient();

  const publicClient = createPublicClient({
    chain: walletClient.chain,
    transport: http(),
  });

  const handleSubmitToChain = async () => {
    try {
      const { request: r2 } = await publicClient!.simulateContract({
        address: "0x9604094e7F8c82806f7D191f4cBc03226fB64B78",
        abi: gpa_abi,
        functionName: "uploadGPA",
        args: [
          nameRef.current.value,
          rollRef.current.value,
          gpaRef.current.value,
        ],
        account: address,
      });
      const hash2 = await walletClient.writeContract(r2.txn);

      console.log("hash2", hash2);
      return {
        status: 200,
      };

      // setTimeout(() => {}, 30000);
    } catch (e) {
      console.log("error", e);
      return {
        status: 500,
        error: "contract-error",
      };
    }
  };

  return (
    <>
      <button
        onClick={() => {
          if (window.ethereum) {
            open();
          }
        }}
      >
        {address
          ? address
          : isConnecting
          ? "Connecting..."
          : isDisconnected
          ? "Connect"
          : address}
      </button>
      <h1>Enter student name, roll number and GPA</h1>
      <div className={styles.inputContainer}>
        <input type="text" name="name" placeholder="Name" />
        <input type="text" name="roll" placeholder="Roll Number" />
        <input type="text" name="gpa" placeholder="GPA" />
        <button type="submit">Submit</button>
      </div>
    </>
  );
};

export default AddGPA;
