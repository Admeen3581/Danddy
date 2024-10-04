export const fetchClasses = async () => {
  try {
    const response = await fetch('https://www.dnd5eapi.co/api/classes');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching classes:', error);
    throw error;
  }
};
