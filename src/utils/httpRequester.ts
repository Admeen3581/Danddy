// Function to update any given route in the Firebase Realtime Database
export async function updateDatabaseRoute(route: string, data: object): Promise<void> {
    const baseUrl = 'https://danddy-23d02-default-rtdb.firebaseio.com/';
    const url = `${baseUrl}${route}.json`;  // Construct the full URL with the provided route

    try {
        // Use PATCH to update specific fields or PUT to overwrite the data at the given route
        const response = await fetch(url, {
            method: 'PATCH',  // PATCH updates the existing data without overwriting everything
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),  // Convert the data to a JSON string
        });

        if (!response.ok) {
            throw new Error(`Failed to update database. Status: ${response.status}`);
        }

        console.log(`Database at route '${route}' updated successfully`);
    } catch (error) {
        console.error('Error updating database:', error);
    }
}


// Function to generate a random room code (optional if you already have a code)
export function generateRoomCode(): string {
    return Math.random().toString(36).substr(2, 6).toUpperCase();  // Generates a 6-character alphanumeric string
}

// Function to create a new room in the database
export async function createRoom(roomCode: string, roomData: object): Promise<void> {
    const baseUrl = 'https://danddy-23d02-default-rtdb.firebaseio.com/';
    const path = `rooms/${roomCode}.json`;  // Path for the new room
    const url = `${baseUrl}${path}`;

    try {
        // Send a PUT request to create the room with the provided data
        const response = await fetch(url, {
            method: 'PUT',  // Use PUT to create/overwrite the room at the specified path
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(roomData),  // Room data as JSON
        });

        if (!response.ok) {
            throw new Error(`Failed to create room. Status: ${response.status}`);
        }

        console.log(`Room ${roomCode} created successfully`);
    } catch (error) {
        console.error('Error creating room:', error);
    }
}