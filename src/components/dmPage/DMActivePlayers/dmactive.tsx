import { useEffect, useState } from 'react';
import { readDatabaseRoute } from '@/utils/httpRequester';
import './dmactive.css';
import useLocalStore from '@/utils/store';

const DMActive = () => {
  const { roomId, setRoomId, classesJson, setClassesJson } = useLocalStore();
  const [activePlayers, setActivePlayers] = useState<any[]>([]); // Use appropriate type here
  const [loading, setLoading] = useState(false);

  // Function to load active players
  const loadActivePlayers = async (roomId: String) => {
    setLoading(true); // Set loading to true while the data is being fetched
    var ret: string[] = [];
    await readDatabaseRoute('users').then(
      async (users) => {
        await readDatabaseRoute(`rooms/${roomId}/participants`).then(
          async (participants) => {
            for (var part in participants) {
              var selectedUser = '';
              for (var user in users) {
                if (users[user]['uid'] === participants[part]) {
                  selectedUser = users[user]['username'];
                }
              }
              if (selectedUser !== '') {
                ret.push(selectedUser);
              }
            }
          }
        );
        setActivePlayers(ret); // Update the activePlayers state
      }
    );
    setLoading(false); // Set loading to false once data is loaded
  };

  // Initial load of active players when component mounts
  useEffect(() => {
    if (roomId) {
      loadActivePlayers(roomId);
    }
  }, [roomId]);

  // Handle click on a player's name (button)
  const handlePlayerClick = (playerName: string) => {
    console.log(`Player clicked: ${playerName}`);
    //readDatabaseRoute(`users/${playerName}`).then(result => console.log(result))
  };

  return (
    <div className="PlayerBox">
      <h1>Active Players:</h1>
      <button onClick={async () => await loadActivePlayers(roomId)} disabled={loading}>
        {loading ? 'Refreshing...' : 'Refresh List'}
      </button>
      <ul>
        {activePlayers.map((player, index) => (
          <li key={index}>
            <button onClick={() => handlePlayerClick(player)}>
              {index + 1}. {player}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DMActive;
