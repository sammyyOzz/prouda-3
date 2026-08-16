"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth/auth-provider";

const nairaFormatter = new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
  maximumFractionDigits: 0,
});

const INTERVAL_ORDER = ["monthly", "quarterly", "annually"];

const INTERVAL_META = {
  monthly: { name: "Monthly", suffix: "/month", months: 1 },
  quarterly: { name: "Quarterly", suffix: "/3 months", months: 3 },
  annually: { name: "Annual", suffix: "/year", months: 12 },
};

const CORE_FEATURES = [
  "All 16 AI teaching tools",
  "Teacher Tech Toolkit",
  "Resource Library (full)",
  "Events Hub — attend free",
  "Job Board full access",
  "Placement Service eligible",
];

const FOUNDING_PERKS = {
  monthly: [],
  quarterly: [
    "1 free group coaching session",
    "Priority placement review",
    "Early access to new tools",
  ],
  annually: [
    "2 free coaching sessions",
    "20% off all Prouda courses",
    "Founding member badge",
  ],
};

export default function PricingPage() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  const [plansData, setPlansData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [checkoutKey, setCheckoutKey] = useState(null);

  useEffect(() => {
    const loadPlans = async () => {
      try {
        const res = await fetch("/api/billing/plans");
        const data = await res.json();

        if (!data.isSuccess) {
          throw new Error(data.message || "Failed to load pricing");
        }

        setPlansData(data.data);
      } catch (err) {
        console.error("Error loading plans:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadPlans();
  }, []);

  const handleSubscribe = async (tier, interval) => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    const key = `${tier}-${interval}`;
    setError(null);
    setCheckoutKey(key);

    try {
      const res = await fetch("/api/billing/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tier, interval }),
      });

      const data = await res.json();

      if (!data.isSuccess) {
        throw new Error(data.message || "Failed to start checkout");
      }

      window.location.href = data.data.authorization_url;
    } catch (err) {
      console.error("Error starting checkout:", err);
      setError(err.message);
      setCheckoutKey(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F5ED] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#f7dc6f] mx-auto mb-4"></div>
          <p className="text-[#263d4d] text-lg">Loading pricing...</p>
        </div>
      </div>
    );
  }

  if (error && !plansData) {
    return (
      <div className="min-h-screen bg-[#F8F5ED] flex items-center justify-center px-4">
        <div className="text-center text-[#263d4d]">
          <p className="mb-2 font-semibold">Couldn&apos;t load pricing</p>
          <p className="text-sm text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  const founding = plansData.tiers.find((t) => t.tier === "founding");
  const standard = plansData.tiers.find((t) => t.tier === "standard");
  const spotsFilled = 100 - plansData.founding_spots_remaining;

  const isFull = !founding.available;
  const activeTier = isFull ? standard : founding;
  const activeTierName = isFull ? "standard" : "founding";

  const activeMonthly = activeTier.plans.find((p) => p.interval === "monthly");
  const activeAnnual = activeTier.plans.find((p) => p.interval === "annually");
  const fullPriceAnnual = Math.round(activeMonthly.usd_amount * 12);
  const annualSavings = fullPriceAnnual - activeAnnual.usd_amount;

  return (
    <div className="min-h-screen bg-[#F8F5ED]">
      {/* Hero */}
      <section className="bg-[#0d2b4e] px-4 pt-32 pb-12 text-center sm:px-6 lg:px-8 lg:pt-40 lg:pb-16">
        <h1 className="text-3xl font-bold text-white sm:text-4xl">
          Prouda Tutors
        </h1>
        <p className="mt-3 text-lg font-semibold text-[#f7dc6f]">
          {isFull ? "Standard Pricing" : "Founding Member Pricing"}
        </p>
        <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-[#e07a3f]" />
        <p className="mt-4 text-sm text-white/80">
          {isFull
            ? "Simple, transparent pricing for every tutor"
            : "First 100 members only · Lock in your rate forever"}
        </p>
      </section>

      <section className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          {/* Banner */}
          <div className="mb-4 rounded-2xl border border-[#f7dc6f] bg-[#fdf3cf] px-6 py-5 text-center">
            <p className="font-semibold text-[#263d4d]">
              {founding.available
                ? "Founding member offer — limited to first 100 subscribers."
                : "Founding member spots are full."}
            </p>
            <p className="mt-1 text-sm text-[#8a6d1f]">
              {founding.available
                ? "Your price is locked in permanently as long as you stay subscribed."
                : "Standard pricing now applies to all new subscriptions."}
            </p>
          </div>

          {!isFull && (
            <div className="mx-auto mb-10 max-w-sm">
              <div className="mb-1 flex justify-between text-xs font-medium text-[#263d4d]">
                <span>{plansData.founding_spots_remaining} spots left</span>
                <span>{spotsFilled}/100 claimed</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-[#fff9e5]">
                <div
                  className="h-full bg-[#1b5276]"
                  style={{ width: `${Math.min(100, spotsFilled)}%` }}
                />
              </div>
            </div>
          )}

          {error && (
            <p className="mb-6 text-center text-sm font-medium text-red-600">
              {error}
            </p>
          )}

          {/* Active tier — one column per interval */}
          <div className="grid items-stretch gap-6 lg:grid-cols-3">
            {INTERVAL_ORDER.map((interval) => {
              const meta = INTERVAL_META[interval];
              const plan = activeTier.plans.find((p) => p.interval === interval);
              const isBestValue = interval === "quarterly";
              const perks =
                activeTierName === "founding" ? FOUNDING_PERKS[interval] : [];
              const savings =
                meta.months > 1
                  ? Math.round(
                      activeMonthly.usd_amount * meta.months - plan.usd_amount
                    )
                  : null;
              const key = `${activeTierName}-${interval}`;

              return (
                <div
                  key={interval}
                  className={`relative flex h-full flex-col rounded-2xl bg-white p-6 shadow-sm sm:p-8 ${
                    isBestValue
                      ? "border-2 border-[#1b5276]"
                      : "border border-[#f7dc6f]/40"
                  }`}
                >
                  {isBestValue && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#eaf2fb] px-3 py-1 text-xs font-semibold text-[#1b5276]">
                      Best value
                    </span>
                  )}

                  <h3 className="text-lg font-semibold text-gray-500">
                    {meta.name}
                  </h3>

                  <p className="mt-2 mb-1">
                    <span className="text-4xl font-bold text-[#263d4d]">
                      ${plan.usd_amount}
                    </span>
                    <span className="text-base font-medium text-gray-500">
                      {meta.suffix}
                    </span>
                  </p>

                  <p className="mb-1 text-sm text-gray-500">
                    {meta.months === 1
                      ? `≈ ${nairaFormatter.format(plan.ngn_amount)}/month`
                      : `≈ $${(plan.usd_amount / meta.months).toFixed(
                          2
                        )}/month · ≈ ${nairaFormatter.format(plan.ngn_amount)}`}
                  </p>

                  {savings !== null && (
                    <span className="mb-4 inline-flex w-fit rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-700">
                      Save ${savings} vs monthly
                    </span>
                  )}

                  <ul className="mb-6 space-y-2 text-sm text-gray-700">
                    {CORE_FEATURES.map((feature) => (
                      <li key={feature} className="flex gap-2">
                        <span className="text-emerald-600">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {perks.length > 0 && (
                    <ul className="mb-6 space-y-2 border-t border-gray-100 pt-4 text-sm text-gray-700">
                      {perks.map((perk) => (
                        <li key={perk} className="flex gap-2">
                          <span className="text-[#1b5276]">+</span>
                          {perk}
                        </li>
                      ))}
                    </ul>
                  )}

                  <button
                    type="button"
                    disabled={checkoutKey === key}
                    onClick={() => handleSubscribe(activeTierName, interval)}
                    className="mt-auto inline-flex items-center justify-center rounded-lg bg-[#1b5276] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#153f5e] disabled:cursor-not-allowed disabled:bg-gray-300"
                  >
                    {checkoutKey === key
                      ? "Starting checkout..."
                      : activeTierName === "founding"
                        ? "Claim founding pricing"
                        : "Subscribe"}
                  </button>
                </div>
              );
            })}
          </div>

          {/* Why annual explainer */}
          <div className="mt-10 rounded-xl bg-gray-100 p-6 text-sm text-gray-600">
            <p className="mb-1 font-semibold text-[#263d4d]">
              Why annual is ${activeAnnual.usd_amount} and not $
              {fullPriceAnnual}:
            </p>
            <p>
              Annual at full monthly rate would be ${fullPriceAnnual}.
              We&apos;ve brought it down to ${activeAnnual.usd_amount} —
              that&apos;s ${annualSavings} in savings. For a tutor serious
              about their career, paying once is the obvious choice.
            </p>
          </div>

          {/* Standard pricing preview — informational only until founding spots fill up */}
          {!isFull && (
            <div className="mt-10 rounded-xl bg-gray-100 p-6">
              <h3 className="mb-4 text-center font-semibold text-[#263d4d]">
                After the first 100 members — standard pricing
              </h3>
              <div className="grid gap-4 sm:grid-cols-3">
                {INTERVAL_ORDER.map((interval) => {
                  const meta = INTERVAL_META[interval];
                  const plan = standard.plans.find(
                    (p) => p.interval === interval
                  );

                  return (
                    <div
                      key={interval}
                      className="rounded-lg bg-white p-4 text-center shadow-sm"
                    >
                      <p className="text-xs uppercase tracking-wide text-gray-400">
                        {meta.name}
                      </p>
                      <p className="mt-1 text-xl font-bold text-[#263d4d]">
                        ${plan.usd_amount}
                        <span className="text-sm font-medium text-gray-500">
                          {meta.suffix}
                        </span>
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <p className="mt-8 text-center text-xs text-gray-500">
            NGN equivalents are approximate · Live rate applied at checkout
            via Paystack.
            {!isFull && (
              <>
                <br />
                Founding members keep their rate permanently as long as
                subscription is active.
              </>
            )}
          </p>
        </div>
      </section>
    </div>
  );
}
