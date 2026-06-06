import { useState } from "react";
import { z } from "zod";

const emailSchema = z.string().email("Invalid email address");

export function useSubscription() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const result = emailSchema.safeParse(email);
    if (!result.success) {
      setError(result.error.issues[0]?.message ?? "Invalid email");
      return;
    }

    setIsSubscribed(true);
    setEmail("");
  };

  const reset = () => {
    setEmail("");
    setIsSubscribed(false);
    setError(null);
  };

  return {
    email,
    setEmail,
    isSubscribed,
    error,
    handleSubscribe,
    reset,
  };
}
