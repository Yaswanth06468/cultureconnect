import { Link } from 'react-router-dom';

const DestinationFood = ({ foods = [], destinationName = 'Bangalore' }) => {
  if (!foods || foods.length === 0) {
    return (
      <div className="text-center py-12 text-[var(--theme-text-muted)]">
        No food data available for {destinationName}.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-[var(--theme-border)]">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--theme-accent-primary)] bg-[var(--theme-bg-accent)] px-3 py-1 rounded-full">
            Authentic Culinary Heritage
          </span>
          <h3 className="text-2xl md:text-3xl font-serif font-black text-[var(--theme-text-primary)] mt-2">
            Famous Foods & Flavors of {destinationName}
          </h3>
          <p className="text-sm text-[var(--theme-text-secondary)] mt-1">
            Centuries-old breakfast recipes, aromatic spices, filter brews, and royal desserts.
          </p>
        </div>

        <Link
          to="/city-food"
          className="text-xs font-bold text-[var(--theme-accent-primary)] hover:underline inline-flex items-center gap-1 self-start md:self-auto"
        >
          <span>Open Full City Food Explorer</span>
          <span>→</span>
        </Link>
      </div>

      {/* Foods Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {foods.map((food) => (
          <div
            key={food.id}
            className="flat-card overflow-hidden flex flex-col justify-between group hover:border-[var(--theme-accent-primary)] transition-all duration-300"
          >
            {/* Food Image with Meal Type Badge */}
            <div className="relative h-48 w-full overflow-hidden bg-[var(--theme-bg-accent)]">
              <img
                src={food.imageUrl}
                alt={food.name}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=800&auto=format&fit=crop&q=80';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              {food.mealType && (
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-black/60 text-white backdrop-blur-md">
                  {food.mealType}
                </span>
              )}
              {food.approxPrice && (
                <span className="absolute bottom-3 right-3 px-2.5 py-0.5 rounded-lg text-xs font-bold bg-white/90 text-stone-900 backdrop-blur-md">
                  {food.approxPrice}
                </span>
              )}
            </div>

            {/* Food Details */}
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <h4 className="font-serif font-black text-xl text-[var(--theme-text-primary)] group-hover:text-[var(--theme-accent-primary)] transition-colors">
                  {food.name}
                </h4>
                <p className="text-xs text-[var(--theme-text-secondary)] mt-2 leading-relaxed">
                  {food.description}
                </p>
              </div>

              {/* Recommended Places & Approx Price Card */}
              <div className="mt-5 pt-3 border-t border-[var(--theme-border)] space-y-2">
                <div className="p-3 rounded-2xl bg-[var(--theme-bg-accent)]/60 border border-[var(--theme-border)]">
                  <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[var(--theme-accent-primary)] mb-1">
                    <span>🍴</span>
                    <span>Recommended Iconic Spots:</span>
                  </div>
                  <p className="text-xs font-semibold text-[var(--theme-text-primary)] leading-snug">
                    {food.recommendedPlaces}
                  </p>
                </div>

                <div className="flex items-center justify-between text-xs px-1 text-[var(--theme-text-muted)]">
                  <span>Approx. Price:</span>
                  <span className="font-mono font-bold text-[var(--theme-text-primary)]">
                    {food.approxPrice}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DestinationFood;
