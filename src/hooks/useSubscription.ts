import { useState } from "react";

export function useSubscription() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail("");
    }
  };

  const reset = () => {
    setEmail("");
    setIsSubscribed(false);
  };

  return {
    email,
    setEmail,
    isSubscribed,
    handleSubscribe,
    reset,
  };
}
