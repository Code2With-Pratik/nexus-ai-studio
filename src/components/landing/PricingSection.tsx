import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const plans = [
  {
    name: "Starter",
    price: "Free",
    description: "Free with limited credits.",
    features: [
      "500 Credits/month",
      "Access to all tools",
      "Basic support",
      "Community access",
    ],
    popular: false,
  },
  {
    name: "Pro",
    price: "$1.99",
    period: "/month",
    description: "Monthly fee with more credits.",
    features: [
      "5000 Credits/month",
      "Access to all tools",
      "Priority support",
      "API access",
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "Plans offer custom pricing.",
    features: [
      "Unlimited Credits",
      "Access to all tools",
      "Dedicated support",
      "Custom integrations",
    ],
    popular: false,
  },
];

export function PricingSection() {
  const navigate = useNavigate();

  return (
    <section id="pricing" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl">
            Flexible Pricing Plans
          </h2>
          <p className="text-lg text-muted-foreground">
            Choose a plan that fits your needs.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-xl border bg-card p-8 transition-all duration-300 hover:border-primary/50 ${
                plan.popular
                  ? "border-primary/50 glow-primary"
                  : "border-border"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 right-6">
                  <span className="rounded-full gradient-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                    Most Popular
                  </span>
                </div>
              )}

              <h3 className="mb-2 text-xl font-bold text-foreground">
                {plan.name}
              </h3>
              <div className="mb-2">
                <span className="text-3xl font-bold text-foreground">
                  {plan.price}
                </span>
                {plan.period && (
                  <span className="text-muted-foreground">{plan.period}</span>
                )}
              </div>
              <p className="mb-6 text-sm text-muted-foreground">
                {plan.description}
              </p>

              <div className="mb-8 border-t border-border pt-6">
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-accent" />
                      <span className="text-sm text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Button
                variant="gradient"
                className="w-full"
                onClick={() => navigate("/auth")}
              >
                Choose Plan
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
