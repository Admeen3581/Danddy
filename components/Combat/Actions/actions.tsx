import useLocalStore from "@/utils/store";
import './actions.css'

const Actions = () => {
  const { classesJson, setClassesJson } = useLocalStore();

  // Check if classesJson is defined and has spells
  const spells = classesJson?.spells?.map((spell: string) => {
    return {
      name: spell,
      description: "" // Placeholder, adjust as needed
    };
  }) || []; 

  return (
    <div className="actions-container">
      <h2>Available Spells</h2>
      <ul>
        {spells.map((spell, index) => (
          <li key={index}>
            {spell.name} - {spell.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Actions;
