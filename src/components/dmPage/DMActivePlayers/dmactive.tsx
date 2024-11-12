import { readDatabaseRoute } from '@/utils/httpRequester';
import './dmactive.css';
import useLocalStore from '@/utils/store';

const DMActive = () => {

  const {roomId, setRoomId} = useLocalStore()

  const loadActivePlayers = (roomId: String) => {
    readDatabaseRoute(`rooms/${roomId}/participants`).then(
      (result) => {
        console.log(result)
      }
    )
  }

  loadActivePlayers(roomId)

  return (
    <div className="PlayerBox">
        <h1>Active Players:</h1>
    </div>
  );
};

export default DMActive;
