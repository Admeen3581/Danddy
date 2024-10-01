// Define a utility function to update the database
export async function updatePlayerData(playerId: string, data: object): Promise<void> {
    const baseUrl = 'https://danddy-23d02-default-rtdb.firebaseio.com/';
    const path = `rooms/players/${playerId}.json`;  // Construct the full path
    const url = `${baseUrl}${path}`;

    try {
        // Use PATCH to update only the specified fields, or PUT to overwrite the data
        const response = await fetch(url, {
            method: 'PATCH',  // You can change this to 'PUT' if you want to overwrite the data
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),  // Convert the data to JSON format
        });

        if (!response.ok) {
            throw new Error(`Failed to update player data. Status: ${response.status}`);
        }

        console.log('Player data updated successfully');
    } catch (error) {
        console.error('Error updating player data:', error);
    }
}