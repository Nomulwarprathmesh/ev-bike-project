const cities = [
  { name: "Mumbai", demand: 87 },
  { name: "Pune", demand: 74 },
  { name: "Bangalore", demand: 68 },
  { name: "Hyderabad", demand: 55 },
  { name: "Delhi", demand: 42 },
];

export default function CityDemandCard() {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col gap-5">
      <div>
        <h2 className="text-base font-semibold text-gray-800">City Demand</h2>
        <p className="text-xs text-gray-400 mt-0.5">Top demand locations</p>
      </div>
      <div className="flex flex-col gap-4">
        {cities.map((city) => (
          <div key={city.name} className="flex flex-col gap-1.5">
            <div className="flex justify-between text-sm">
              <span className="font-medium text-gray-700">{city.name}</span>
              <span className="text-gray-400">{city.demand}%</span>
            </div>
            <div className="h-2 w-full rounded-full bg-gray-100">
              <div
                className="h-2 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500"
                style={{ width: `${city.demand}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
