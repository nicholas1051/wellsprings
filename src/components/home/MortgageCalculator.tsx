"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Calculator } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

interface MortgageCalculatorProps {
  price: number;
}

export function MortgageCalculator({ price }: MortgageCalculatorProps) {
  const [downPaymentPct, setDownPaymentPct] = useState(20);
  const [termYears, setTermYears] = useState(5);

  const calculations = useMemo(() => {
    const downPayment = (price * downPaymentPct) / 100;
    const loanAmount = price - downPayment;
    const monthlyRate = 0.18 / 12;
    const months = termYears * 12;
    const monthlyPayment =
      monthlyRate > 0
        ? (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months)) /
          (Math.pow(1 + monthlyRate, months) - 1)
        : loanAmount / months;
    const totalPayment = monthlyPayment * months + downPayment;

    return {
      downPayment,
      loanAmount,
      monthlyPayment: Math.round(monthlyPayment),
      totalPayment: Math.round(totalPayment),
    };
  }, [price, downPaymentPct, termYears]);

  const formatNaira = (n: number) => `\u20A6${n.toLocaleString("en-NG")}`;

  return (
    <Reveal>
      <div className="mt-12 rounded-2xl border border-grey-line bg-white p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-6">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-cream text-brand-blue">
            <Calculator className="h-5 w-5" aria-hidden="true" />
          </span>
          <div>
            <h2 className="text-xl font-bold text-navy">Payment Plan Estimate</h2>
            <p className="text-xs text-text-grey">Illustrative calculation. Contact us for exact terms.</p>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="down-payment" className="text-sm font-semibold text-navy">
              Down Payment: {downPaymentPct}%
            </label>
            <input
              id="down-payment"
              type="range"
              min={10}
              max={80}
              step={5}
              value={downPaymentPct}
              onChange={(e) => setDownPaymentPct(Number(e.target.value))}
              className="mt-2 w-full accent-terracotta"
            />
            <div className="flex justify-between text-xs text-text-grey mt-1">
              <span>10%</span>
              <span className="font-medium text-navy">{formatNaira(calculations.downPayment)}</span>
              <span>80%</span>
            </div>
          </div>

          <div>
            <label htmlFor="term" className="text-sm font-semibold text-navy">
              Payment Term: {termYears} {termYears === 1 ? "year" : "years"}
            </label>
            <input
              id="term"
              type="range"
              min={1}
              max={10}
              step={1}
              value={termYears}
              onChange={(e) => setTermYears(Number(e.target.value))}
              className="mt-2 w-full accent-terracotta"
            />
            <div className="flex justify-between text-xs text-text-grey mt-1">
              <span>1 yr</span>
              <span className="font-medium text-navy">{termYears} {termYears === 1 ? "year" : "years"}</span>
              <span>10 yrs</span>
            </div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { label: "Unit Price", value: formatNaira(price) },
            { label: "Down Payment", value: formatNaira(calculations.downPayment) },
            { label: "Monthly Installment", value: formatNaira(calculations.monthlyPayment) },
            { label: "Total Cost", value: formatNaira(calculations.totalPayment) },
          ].map((item) => (
            <div key={item.label} className="rounded-xl bg-cream p-4">
              <p className="text-xs text-text-grey font-medium">{item.label}</p>
              <p className="mt-1 text-lg font-bold text-navy">{item.value}</p>
            </div>
          ))}
        </div>

        <p className="mt-4 text-xs text-text-grey italic">
          * Estimate based on illustrative 18% annual interest rate. Actual rates vary by lender and credit profile.
          Contact us for current financing options.
        </p>
      </div>
    </Reveal>
  );
}
