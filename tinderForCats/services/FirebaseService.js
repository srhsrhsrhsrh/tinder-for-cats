import FirebaseApp from "./FirebaseApp";
import 'firebase/firestore';
import { Post } from "../models/Post";
import { UserProvider } from "./UserProvider";
import { TinderForCatsUser } from "../models/TinderForCatsUser";
import { SystemMessageModel } from "../models/SystemMessageModel";
import { MessageModel } from "../models/MessageModel";
import { ChatModel } from "../models/ChatModel";

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

    static async signIntoUser(email, password) {
        try {
            const userCredential = await FirebaseApp.auth().signInWithEmailAndPassword(email, password);
            return userCredential.user.uid;
        } catch (error) {
            let errorMessage = "An error occured while authenticating. Please try again";
            if (error.code) {
                if (error.code === 'auth/invalid-email') {
                    errorMessage = "The email doesn't exist, please try again."
                } else if (error.code === 'auth/user-disabled') {
                    errorMessage = "The given user can no longer sign in."
                } else if (error.code === 'auth/user-not-found') {
                    errorMessage = "No user exists, please try again."
                } else {
                    errorMessage = "The password entered was invalid, please try again."
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
            throw new Error("There was an error while creating the user. Please try again later");
        }
    }

    static async insertIntoPostsTable(post) {
        const postsDoc = FirebaseApp.firestore().collection("posts").doc(post.petUUID);
        try {
            // do this as firebase doesn't like non-object literals
            await postsDoc.set(Object.fromEntries(Object.entries(post)));
        } catch (error) {
            console.log(error);
            throw new Error("There was an error while saving the post. Please try again later");
        }
    }

    static async uploadFiles(fileBlobs) {
        const imageRef = FirebaseApp.storage().ref("images");
        const imageUrls = [];
        for (let i = 0; i < fileBlobs.length; i++) {
            try {
                await imageRef.child(fileBlobs[i].uuid).put(fileBlobs[i].blob);
            } catch (error) {
                console.log(error);
                throw new Error("There was an error writing the image to the database");
            }
            imageUrls.push(imageRef.child(fileBlobs.uuid).getDownloadURL);
        }
        return imageUrls;
    }

    static async updatePost(newPost) {
        this.insertIntoPostsTable(newPost);
    }

    static mapQueryToPostObjects(queryResults) {
        return queryResults.docs.map(doc => {
            const rawData = doc.data();
            return new Post(
                new TinderForCatsUser(
                    rawData.ownerName,
                    rawData.ownerUUID
                ),
                rawData.petUUID,
                rawData.petName,
                rawData.shortDescription,
                rawData.longDescription,
                rawData.averageRating,
                rawData.totalReviews,
                rawData.daysRequested,
                rawData.photoUrls,
                rawData.swipedUsers
            )
        })
    }

    static async getAllPostsByUser(userToDisplay) {
        const postsCollection = FirebaseApp.firestore().collection("posts");
        try {
            const query = await postsCollection
                .where("ownerUUID", "==", userToDisplay)
                .get()
            return FirebaseService.mapQueryToPostObjects(query);
        } catch (error) {
            console.log(error);
        }
    }



    static async getAllPostsSwipedByCurrentUser(targetUserUUID) {
        const postsCollection = FirebaseApp.firestore().collection("posts");
        try {
            const matchedQuery = await postsCollection
                .where("ownerUUID", "==", targetUserUUID)
                .where("swipedUsers", "array-contains", UserProvider.instance.tinderForCatsUser.uuid)
                .get();
            return FirebaseService.mapQueryToPostObjects(matchedQuery);
        } catch (error) {
            console.log(error);
        }
    }

    static async getPosts() {
        const collection = await FirebaseApp.firestore().collection("posts").get();
        return this.mapQueryToPostObjects(collection);
    }

    static async getChatsForUser() {
        const chatsCollection = FirebaseApp.firestore().collection("chats");
        try {
            const chatQuery = await chatsCollection
                .where("participants", "array-contains", "josh misses you")
                .get();
            if (chatQuery) {
                return chatQuery.docs.map(doc => {
                    const dataFetched = doc.data();
                    const messageModels = dataFetched.messages.map(message => {
                        if (message.hasOwnProperty("system")) {
                            return new SystemMessageModel(
                                message.text,
                                message.createdAt,
                                message.system,
                                message._id
                            )
                        } else {
                            return new MessageModel(
                                message.text,
                                message.senderName,
                                message.senderUUID,
                                message.createdAt,
                                message.image,
                                message.video,
                                message._id
                            );
                        }
                    })
                    return new ChatModel(
                        dataFetched.participants,
                        messageModels,
                        dataFetched.chatId
                    ); 
                }) 
            } else {
                return [];
            }            
        } catch (error) {
            console.log(error);
        }
    }
}