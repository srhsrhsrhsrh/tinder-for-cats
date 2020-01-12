import FirebaseApp from "./FirebaseApp";
import 'firebase/firestore';

export class FirebaseService {
    static async createUser(email, password) {
        try {
            const userCredential = await FirebaseApp.auth().createUserWithEmailAndPassword(email, password);
            return userCredential.user.uid;
        } catch (error) {
            console.log(error);
            let errorMessage = "An error occured while creating an account";
            if (error.code) {
                if (error.code === "auth/email-already-in-use") {
                    errorMessage = "A user with the given email already exists";
                } else if (error.code === "auth/invalid-email") {
                    errorMessage = "The supplied email was not valid";
                } else if (error.code === "auth/weak-password") {
                    errorMessage = "The password given is too weak";
                } 
            }
            throw new Error(errorMessage);
        }
    }

    static async insertIntoUsersTable(tinderForCatsUser) {
        const usersCollection = FirebaseApp.firestore().collection("users");
        const newChildDoc = usersCollection.doc(tinderForCatsUser.uid);
        try {
            await newChildDoc.set({
                name: tinderForCatsUser.name,
                uid: tinderForCatsUser.uuid
            });
        } catch (error) {
            console.log(error);
            throw new Error("There was an error while saving the post. Please try again later");
        }
    }
}