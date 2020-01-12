import uuid from "uuid";

export class SystemMessageModel {
    constructor(text, createdAt,system,id = uuid()) {
        this._id = id;
        this.text = text;
        this.createdAt = createdAt;
        this.system = system;
    }
}