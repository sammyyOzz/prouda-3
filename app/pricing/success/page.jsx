"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const STATE = {
  VERIFYING: "verifying",
  ACTIVE: "active",
  FAILED: "failed",
  ERROR: "error",
};

function SuccessContent() {
  const searchParams = useSearchParams();
  const reference = searchParams.get("reference") || searchParams.get("trxref");

  const [state, setState] = useState(STATE.VERIFYING);
  const [subscription, setSubscription] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (!reference) {
      setState(STATE.ERROR);
      setMessage("No payment reference found.");
      return;
    }

    const verify = async () => {
      try {
        const res = await fetch(`/api/billing/verify/${reference}`, {
          method: "POST",
        });
        const data = await res.json();

        if (!data.isSuccess) {
          throw new Error(data.message || "Failed to verify payment");
        }

        setSubscription(data.data);
        setState(data.data.status === "active" ? STATE.ACTIVE : STATE.FAILED);
      } catch (err) {
        console.error("Error verifying payment:", err);
        setState(STATE.ERROR);
        setMessage(err.message);
      }
    };

    verify();
  }, [reference]);

  return (
    <div className="min-h-screen bg-[#F8F5ED] flex items-center justify-center px-4">
      <div className="mx-auto max-w-md rounded-2xl border border-[#f7dc6f]/40 bg-white p-8 text-center shadow-sm">
        {state === STATE.VERIFYING && (
          <>
            <h1 className="mb-2 text-2xl font-bold text-[#263d4d]">
              Confirming your payment...
            </h1>
            <p className="text-sm text-gray-600">This will just take a moment.</p>
          </>
        )}

        {state === STATE.ACTIVE && subscription && (
          <>
            <div className="mb-3 inline-flex w-fit rounded-full bg-[#f7dc6f] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#263d4d]">
              {subscription.tier === "founding" ? "Founding Member" : "Standard"}
            </div>
            <h1 className="mb-2 text-2xl font-bold text-[#263d4d]">
              You&apos;re subscribed!
            </h1>
            <p className="mb-6 text-sm text-gray-600">
              ${subscription.usd_amount} / {subscription.interval.replace("ly", "")}
              , billed as {subscription.ngn_amount.toLocaleString()} NGN.
            </p>
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-lg bg-[#1b5276] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#153f5e]"
            >
              Go to homepage
            </Link>
          </>
        )}

        {state === STATE.FAILED && (
          <>
            <h1 className="mb-2 text-2xl font-bold text-[#263d4d]">
              Payment not completed
            </h1>
            <p className="mb-6 text-sm text-gray-600">
              We couldn&apos;t confirm this payment. No charge was completed.
            </p>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center rounded-lg bg-[#1b5276] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#153f5e]"
            >
              Back to pricing
            </Link>
          </>
        )}

        {state === STATE.ERROR && (
          <>
            <h1 className="mb-2 text-2xl font-bold text-[#263d4d]">
              Something went wrong
            </h1>
            <p className="mb-6 text-sm text-gray-600">{message}</p>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center rounded-lg bg-[#1b5276] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#153f5e]"
            >
              Back to pricing
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default function PricingSuccessPage() {
  return (
    <Suspense fallback={null}>
      <SuccessContent />
    </Suspense>
  );
}
