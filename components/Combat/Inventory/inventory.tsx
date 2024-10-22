import './inventory.css'

interface Item {
  name: string;
  description: string;
}

const predefinedInventory: Item[] = [
  {name: 'Healing Potion', description: 'Restores 20 HP' },
  {name: 'Iron Sword', description: 'A sturdy iron sword' },
  {name: 'Leather Armor', description: 'Provides basic protection' },
];

const Inventory = () => {
  
  return (
    <div className="inventory-container">
      <h1>Character Inventory</h1>
      <h2>Items</h2>
      <ul>
        {predefinedInventory.map((item, index) => (
          <li key={index}>
            {item.name} - {item.description}
          </li>
        ))}
      </ul>

    </div>
  );
};

export default Inventory;
