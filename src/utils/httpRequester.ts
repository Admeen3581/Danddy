const BASE_URL = process.env.REACT_APP_DATABASE_URL;

//Centralized function to GET, POST, PUT, PATCH, or DELETE data from the Firebase Realtime Database
//string route: the path to the data in the database, method: request wanted, data: data to be sent
async function fetchFromDatabase(route: string, method: string, data?: object): Promise<any> {
    const url = `${BASE_URL}${route}.json`;  // Construct the full URL with the provided route
    try {
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: data ? JSON.stringify(data) : null,
        });

        if (!response.ok) {
            throw new Error(`Failed to ${method} data. Status: ${response.status}`);
        }

        if (method !== 'DELETE') {
            return await response.json();
        }
        return null;
    } catch (error) {
        console.error(`Error with ${method} request:`, error);
        throw error;
    }
}

//Functions to interact with the Firebase Realtime Database using the centralized fetchFromDatabase function
export async function updateDatabaseRoute(route: string, data: object): Promise<void> {
    return await fetchFromDatabase(route, 'PUT', data);
}

export async function patchDatabaseRoute(route: string, data: object): Promise<void> {
    return await fetchFromDatabase(route, 'PATCH', data);
}

export async function readDatabaseRoute(route: string): Promise<any> {
    return await fetchFromDatabase(route, 'GET');
}

export async function postDatabaseRoute(route: string, data: object): Promise<void> {
    return await fetchFromDatabase(route, 'POST', data);
}

export async function deleteDatabaseRoute(route: string): Promise<void> {
    return await fetchFromDatabase(route, 'DELETE');
}



// Function to update any given route in the Firebase Realtime Database using PUT, which overwrites the data at the given route
/*export async function updateDatabaseRoute(route: string, data: object): Promise<void> {
    const url = `${BASE_URL}${route}.json`;  // Construct the full URL with the provided route
    try {
        const response = await fetch(url, {
            method: 'PUT',  
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

// Function to update any given route in the Firebase Realtime Database using PATCH, which only updates the provided fields
export async function patchDatabaseRoute(route: string, data: object): Promise<void> {
    const url = `${BASE_URL}${route}.json`;
    try {
        const response = await fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new Error(`Failed to patch database. Status: ${response.status}`);
        }
        console.log(`Database at route '${route}' patched successfully`);
    } catch (error) {
        console.error('Error patching database:', error);
    }
}

// Function to read data from any given route in the Firebase Realtime Database
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function readDatabaseRoute(route: string): Promise<any> {
    const url = `${BASE_URL}${route}.json`;  // Construct the full URL with the provided route
    try {
        // Send a GET request to retrieve data from the specified route
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch data. Status: ${response.status}`);
        }

        // Parse and return the JSON data from the response
        const data = await response.json();
        console.log(`Data from route '${route}':`, data);
        return data;

    } catch (error) {
        console.error('Error reading from database:', error);
    }
}

// Function to delete data from a given route in the Firebase Realtime Database
export async function deleteDatabaseRoute(route: string): Promise<void> {
    const url = `${BASE_URL}${route}.json`;  // Construct the full URL with the provided route

    try {
        // Send a DELETE request to remove the data at the specified route
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to delete data. Status: ${response.status}`);
        }

        console.log(`Data at route '${route}' deleted successfully`);
    } catch (error) {
        console.error('Error deleting data:', error);
    }
}*/

// Function to generate a random room code (optional if you already have a code)
export function generateRoomCode(): string {
    return Math.random().toString(36).substr(2, 6).toUpperCase();  // Generates a 6-character alphanumeric string
}

// Function to create a new room in the database
export async function createRoom(roomCode: string, roomData: object): Promise<void> {
    const path = `rooms/${roomCode}.json`;  // Path for the new room
    const url = `${BASE_URL}${path}`;
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

  // Example calling of functions:
  // const roomCode = generateRoomCode();  // Generate a random room code
  // const roomData = {
  //     host: "John Doe",
  //     players: {},
  //     settings: {
  //         maxPlayers: 4,
  //         isPrivate: true
  //     }
  // };

  // await createRoom(roomCode, roomData);

  // await updateDatabaseRoute("rooms/AAAAAA/players", roomData)
  // await updateDatabaseRoute("rooms/BBB/players", roomData)

  // console.log(readDatabaseRoute("rooms/AAAAAA/players/host"))

  // await deleteDatabaseRoute("rooms/4QFY8Z")