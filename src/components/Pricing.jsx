import React from "react";

const plans = [
  {
    id: 1,
    name: "Basic",
    price: "0",
    duration: "par mois",
    description: "Plan parfait pour commencer.",
    features: [
      "Accès limité aux fonctionnalités",
      "Support par email",
      "1 projet actif",
    ],
    buttonText: "Commencer gratuitement",
  },
  {
    id: 2,
    name: "Pro",
    price: "29",
    duration: "par mois",
    description: "Pour les utilisateurs réguliers.",
    features: [
      "Fonctionnalités complètes",
      "Support prioritaire",
      "Projets illimités",
      "Accès aux mises à jour",
    ],
    popular: true,
    buttonText: "S'abonner",
  },
  {
    id: 3,
    name: "Entreprise",
    price: "99",
    duration: "par mois",
    description: "Pour les équipes et entreprises.",
    features: [
      "Gestion avancée des utilisateurs",
      "Support dédié",
      "Intégrations personnalisées",
      "Formation et onboarding",
    ],
    buttonText: "Contactez-nous",
  },
];

export default function Pricing() {
  return (
    <section className="py-20 bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold">Tarifs</h2>
          <p className="mt-4 text-yellow-400 text-lg max-w-2xl mx-auto">
            Choisissez le plan qui correspond à vos besoins.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative bg-[#1a1a1a] rounded-2xl shadow-xl border-2 border-gray-700 hover:border-yellow-400 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2`}
            >

              <div className="p-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-sm text-gray-400">{plan.duration}</span>
                    <div className="flex items-baseline justify-center">
                      <span className="text-4xl font-bold text-white">{plan.price}€</span>
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm">{plan.description}</p>
                </div>
                <ul className="mb-8 space-y-4 text-gray-300">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center">
                      <svg
                        className="h-6 w-6 text-yellow-400 mr-2 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full rounded-md py-3 text-black font-semibold bg-yellow-400 hover:bg-yellow-500 transition-colors duration-300`}
                >
                  {plan.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Section Contact */}
        <div className="mt-20 text-center">
          <h3 className="text-3xl font-extrabold mb-4 text-white">
            Besoin d'aide ? Contactez-nous.
          </h3>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            Notre équipe est là pour répondre à toutes vos questions et vous accompagner.
          </p>
          <button className="inline-block px-8 py-4 rounded-md bg-yellow-400 text-black font-bold hover:bg-yellow-500 transition-colors duration-300">
            Contactez le support
          </button>
        </div>
      </div>
    </section>
  );
}
