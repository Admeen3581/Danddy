const express = require('express');
const admin = require('firebase-admin');
const cron = require('node-cron');

//Initialize Firebase Admin SDK
const serviceAccount = require('./serviceAccountKey.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.FIREBASE_DATABASE_URL
});

//initialize Firestore and Express
const db = admin.firestore();
const app = express();
const PORT = process.env.PORT || 3000;

//scheduled task to delete unverified users from auth and database
cron.schedule('*/2 * * * *', async () => {
    const now = admin.firestore.Timestamp.now();
    const fifteenMinutesAgo = new Date(now.toDate().getTime() - 15 * 60 * 1000);

    const unverifiedUsersSnapshot = await db.collection('users')
        .where('emailVerified', '==', false)
        .where('first_joined', '<', fifteenMinutesAgo.toISOString())
        .get();
    
    const deletePromises = unverifiedUsersSnapshot.docs.map(async (doc) => {
        const userId = doc.data().uid;
        await admin.auth().deleteUser(userId);
        await doc.ref.delete();
    });

    await Promise.all(deletePromises);
    console.log('Deleted unverified users');
});

//start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});