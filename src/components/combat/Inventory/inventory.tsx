import { Character } from "@/utils/characterJsonFunctions";
import useLocalStore from "@/utils/store";
import './inventory.css'

const Inventory = () => {
  const { classesJson } = useLocalStore();

  // Check if classesJson is defined and has an inventory property
  const inventory = (classesJson as Character)?.inventory || [];

  return (
    <div className="inventory-container">
      <h1>Character Inventory</h1>
      <h2>Items</h2>
      {inventory.length > 0 ? (
        <ul>
          {inventory.map((item, index) => (
            <li key={index}>
              {item} - {""}  {/* Placeholder for description */}
            </li>
          ))}
        </ul>
      ) : (
        <p>No items in inventory.</p>
      )}
    </div>
  );
};

export default Inventory;
