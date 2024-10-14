const BASE_URL = process.env.NEXT_PUBLIC_DATABASE_URL;

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


//Dnd Calling
export async function getDnDAPI(route: String) {
    const url = "https://www.dnd5eapi.co/api/"+route;
    
    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data : JSON = await response.json();
        console.log(data)
        return data;
    } catch (error) {
        console.error('An error occurred:', error);
        return {}
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