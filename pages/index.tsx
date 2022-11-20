import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import Disconnected from "../components/Disconnected";
import Connected from "../components/Connected";
import { useWallet } from "@solana/wallet-adapter-react";
import MainLayout from "../components/MainLayout";

const Home: NextPage = () => {
  const { connected } = useWallet();

  return (
    <MainLayout> {connected ? <Connected /> : <Disconnected />}</MainLayout>
  );
};

export default Home;
