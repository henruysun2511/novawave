import { useEffect, useState } from "react";

export function usePayOSReady() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      if (window.PayOSCheckout) {
        setReady(true);
        clearInterval(timer);
      }
    }, 200);

    return () => clearInterval(timer);
  }, []);

  return ready;
}