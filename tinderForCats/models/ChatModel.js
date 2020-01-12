import uuid from "uuid";

export class ConversationModel {
    constructor(participants, messageModels) {
        this.uuid = uuid();
        this.participants = participants;
        this.messageModels = messageModels;
    }
}