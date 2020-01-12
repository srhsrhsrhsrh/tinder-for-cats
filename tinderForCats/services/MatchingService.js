import { FirebaseService } from "./FirebaseService";
import { UserProvider } from "./UserProvider";
import { MessageModel } from "../models/MessageModel";
import { SystemMessageModel } from "../models/SystemMessageModel";

export class MatchingService {
    static async match(postToUpdate) {
        const currentUserUUID = UserProvider.instance.tinderForCatsUser.uuid;
        const currentUserName = UserProvider.instance.tinderForCatsUser.name;
        // cant match yourself lol
        if (postToUpdate.ownerUUID !== currentUserUUID) {
            if (post.swipedUsers) {
                if (!post.swipedUsers.includes(currentUserUUID)) {
                    post.swipedUsers.push(UserProvider.instance.tinderForCatsUser.uuid);
                }
              } else {
                post.swipedUsers = [UserProvider.instance.tinderForCatsUser.uuid];
              }
              try {
                await FirebaseService.updatePost(post);
                const allMatchedPosts = await FirebaseService.getAllPostsMatchedForUsers(currentUserUUID);
                if (allMatchedPosts.length > 0) {
                    const firstMessageText = 
                        `${currentUserName} and ${postToUpdate.ownerName} are you ready to let the dogs 🐕🐕 (or cats 😼😼) out?\n 
                        We have great news to share, ${postToUpdate.ownerName} swiped on ${allMatchedPosts.map(post => post.petName).join(", ")},\n while
                        ${currentUserName} swiped on ${postToUpdate.petName}`;
                    const firstMessageModel = new SystemMessageModel(
                        firstMessageText, 
                        Date.now,
                        true
                    );
                    const newChat = new ChatModel(
                        [postToUpdate.ownerUUID, currentUserUUID],
                        [firstMessageModel]
                    );
                    return newChat;
                } else {
                    return null;
                }
              } catch (error) {
                console.log(error);
              }
        }
    }
}