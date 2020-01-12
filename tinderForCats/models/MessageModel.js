import uuid from "uuid";

export class MessageModel {
    constructor(text, senderName, senderUUID, createdAt = Date.now(), image = null, video = null, id = uuid()) {
        this._id = id;
        this.text = text;
        this.createdAt = createdAt;
        this.user = new UserMessageModel(
            senderName,
            senderUUID
        );
        this.image = image;
        this.video = video;
    }
}

class UserMessageModel {
    constructor(userName, userUUID, userAvatar = "") {
        this.name = userName;
        this._id = userUUID;
        this.avatar = userAvatar;
    }
}