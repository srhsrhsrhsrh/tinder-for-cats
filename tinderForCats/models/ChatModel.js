import uuid from "uuid";

export class ChatModel {
    constructor(participants, messageModels, photoUrl = "", chatId = uuid()) {
        this.chatId = chatId;
        this.participants = participants;
        this.messageModels = messageModels;
        this.photoUrl = photoUrl;
    }
}