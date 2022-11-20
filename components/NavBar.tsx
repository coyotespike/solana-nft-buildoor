import { useEffect, useState } from "react";
import { HStack, Spacer } from "@chakra-ui/react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { FC } from "react";
import styles from "../styles/Home.module.css";

const NavBar: FC = () => {
  // this is an extraordinarily hacky fix
  // Next.js finds that this will get updated in a client render
  // this delays the component creation until after the first render
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    // This forces a rerender
    // the second time but not the first
    setHydrated(true);
  }, []);

  if (!hydrated) {
    // Returns null on first render, so the client and server match
    return null;
  }

  return (
    <HStack width="full" padding={4}>
      <Spacer />
      <WalletMultiButton />
    </HStack>
  );
};

export default NavBar;
