import { useEffect, useState } from 'react';
import { readDatabaseRoute } from '@/utils/httpRequester';
import './dmactive.css';
import useLocalStore from '@/utils/store';
import { useRouter } from 'next/navigation';

const DMActive = () => {
  const { roomId, setClassesJson } = useLocalStore();
  const [activePlayers, setActivePlayers] = useState<{ uid: String; playerName: String }[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Function to load active players
  const loadActivePlayers = async (roomId: String) => {
    setLoading(true); // Set loading to true while the data is being fetched
    const ret: { uid: String; playerName: String }[] = [];
    await readDatabaseRoute('users').then(
      async (users) => {
        await readDatabaseRoute(`rooms/${roomId}/participants`).then(
          async (participants) => {
            for (const part in participants) {
              const selectedUser = { uid: "", playerName: "" };
              for (const user in users) {
                if (users[user]['uid'] === participants[part]) {
                  selectedUser.uid = users[user]['uid'];
                  selectedUser.playerName = users[user]['username'];
                }
              }
              if (selectedUser.uid !== '') {
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
  const handlePlayerClick = (playerName: String) => {
    readDatabaseRoute(`users/${playerName}/characters/${roomId}`).then(
      result => {
        if(result != null){
          readDatabaseRoute(`characters/${result}`).then(
            charResult => {
              if(charResult != null){
                setClassesJson(result)
                router.push("/combat")
              }
            }
          )

        }
      })
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
            <button onClick={() => handlePlayerClick(player.uid)}>
              {index + 1}. {player.playerName}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DMActive;
