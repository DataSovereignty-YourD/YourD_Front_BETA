import CheckDBAccount from "./CheckDBAccount";

export async function Connect() {
    const provider = getProvider();
    if (provider.isConnected) {
      provider.disconnect();
      console.log("disconnect");
      return "";
    } else {
      try {
        const Connection = await provider.connect();
        const acc = Connection.publicKey.toString();
        CheckDBAccount(acc);
        return acc;

      } catch (error) {
        console.log("Error Connecting");
      }
    }
  }


export function getProvider() {
  if ("phantom" in window) {
    const provider = window.phantom.solana;
    if (provider?.isPhantom) {
      return provider;
    }
  } else {
    window.open("https://phantom.app/", "_blank");
  }
  return undefined;
}

