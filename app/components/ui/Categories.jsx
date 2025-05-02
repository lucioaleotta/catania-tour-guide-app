const Categories = ({ onCategorySelect }) => {
  const categories = [
    { id: 'restaurants', name: 'Ristoranti', icon: '/icons/restaurant.png' },
    { id: 'hotels', name: 'Hotel', icon: '/icons/hotel.png' },
    { id: 'attractions', name: 'Attrazioni', icon: '/icons/attraction.png' },
    { id: 'museums', name: 'Musei', icon: '/icons/museum.png' },
    { id: 'parks', name: 'Parchi', icon: '/icons/park.png' },
    { id: 'shopping', name: 'Shopping', icon: '/icons/shopping.png' },
  ];

  return (
    <div className="categories-container">
      {categories.map((category) => (
        <button
          key={category.id}
          className="category-button"
          onClick={() => onCategorySelect(category.id)}
        >
          <img src={category.icon} alt={category.name} />
          <span>{category.name}</span>
        </button>
      ))}
    </div>
  );
};

export default Categories;