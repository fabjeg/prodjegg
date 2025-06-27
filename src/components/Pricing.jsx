import { useEffect, useState } from 'react';

export default function Pricing() {
  const [plans, setPlans] = useState([]);
  const token = localStorage.getItem('token');
  const isAuthenticated = !!token;

  useEffect(() => {
    fetch('https://prodjegg-dd3ce5daf8c5.herokuapp.com/pricing')
      .then(res => res.json())
      .then(data => setPlans(Array.isArray(data) ? data : []))
      .catch(err => console.error('Erreur chargement plans :', err));
  }, []);

  const handleChange = (id, field, value) => {
    setPlans(prev =>
      prev.map(plan =>
        plan._id === id ? { ...plan, [field]: value } : plan
      )
    );
  };

  const handleFeatureChange = (id, index, value) => {
    setPlans(prev =>
      prev.map(plan =>
        plan._id === id
          ? {
            ...plan,
            features: plan.features.map((f, i) => (i === index ? value : f)),
          }
          : plan
      )
    );
  };

  const savePlan = (id, planData) => {
    fetch(`http://localhost:3000/pricing/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(planData),
    })
      .then(res => res.json())
      .then(data => console.log('Plan mis à jour :', data))
      .catch(err => console.error('Erreur update plan :', err));
  };

  return (
    <section className="py-20 bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold">Tarifs de prestations</h2>
          <p className="mt-4 text-yellow-400 text-lg max-w-2xl mx-auto">
            Des packs flexibles pour vos besoins en vidéo professionnelle.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {plans.map(plan => (
            <div
              key={plan._id}
              className="relative bg-[#1a1a1a] rounded-2xl shadow-xl border-2 border-gray-700 hover:border-yellow-400 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
            >
              <div className="p-8">
                <div className="text-center mb-8">
                  {isAuthenticated ? (
                    <input
                      value={plan.name}
                      onChange={e => handleChange(plan._id, 'name', e.target.value)}
                      onBlur={() => savePlan(plan._id, plan)}
                      className="text-2xl font-bold mb-2 bg-transparent text-white border-b border-yellow-400 outline-none text-center"
                    />
                  ) : (
                    <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  )}

                  <div className="mb-4">
                    {plan.duration && (
                      isAuthenticated ? (
                        <input
                          value={plan.duration}
                          onChange={e => handleChange(plan._id, 'duration', e.target.value)}
                          onBlur={() => savePlan(plan._id, plan)}
                          className="text-sm text-gray-400 bg-transparent border-b border-yellow-400 outline-none text-center"
                        />
                      ) : (
                        <span className="text-sm text-gray-400">{plan.duration}</span>
                      )
                    )}
                    <div className="flex items-baseline justify-center">
                      {isAuthenticated ? (
                        <input
                          value={plan.price}
                          onChange={e => handleChange(plan._id, 'price', e.target.value)}
                          onBlur={() => savePlan(plan._id, plan)}
                          className="text-4xl font-bold text-white bg-transparent border-b border-yellow-400 outline-none text-center"
                        />
                      ) : (
                        <span className="text-4xl font-bold text-white">{plan.price}€</span>
                      )}
                    </div>
                  </div>

                  {isAuthenticated ? (
                    <textarea
                      value={plan.description}
                      onChange={e => handleChange(plan._id, 'description', e.target.value)}
                      onBlur={() => savePlan(plan._id, plan)}
                      className="text-sm text-gray-400 bg-transparent border-b border-yellow-400 outline-none text-center w-full resize-none"
                    />
                  ) : (
                    <p className="text-gray-400 text-sm">{plan.description}</p>
                  )}
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
                      {isAuthenticated ? (
                        <input
                          value={feature}
                          onChange={e => handleFeatureChange(plan._id, idx, e.target.value)}
                          onBlur={() => savePlan(plan._id, plan)}
                          className="bg-transparent border-b border-yellow-400 outline-none w-full"
                        />
                      ) : (
                        feature
                      )}
                    </li>
                  ))}
                </ul>

                {isAuthenticated ? (
                  <input
                    value={plan.buttonText}
                    onChange={e => handleChange(plan._id, 'buttonText', e.target.value)}
                    onBlur={() => savePlan(plan._id, plan)}
                    className="w-full rounded-md py-3 text-black font-semibold bg-yellow-400 text-center"
                  />
                ) : (
                  <button
                    className="w-full rounded-md py-3 text-black font-semibold bg-yellow-400 hover:bg-yellow-500 transition-colors duration-300"
                  >
                    {plan.buttonText}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
