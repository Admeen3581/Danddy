import { Character } from "@/utils/characterJsonFunctions";
import useLocalStore from "@/utils/store";
import './inventory.css'

const Inventory = () => {
  const { classesJson, setClassesJson } = useLocalStore();

  // Extract the inventory field from classesJson and map it to displayable items
  const inventory = (classesJson as Character).inventory.map((item: string) => {
    return {
      name: item,
      description: ""  // Placeholder, adjust as needed
    };
  });

  return (
    <div className="inventory-container">
      <h1>Character Inventory</h1>
      <h2>Items</h2>
      <ul>
        {inventory.map((item, index) => (
          <li key={index}>
            {item.name} - {item.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Inventory;