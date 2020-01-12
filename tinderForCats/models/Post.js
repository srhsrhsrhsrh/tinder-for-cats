import uuid from "uuid";

export class Post {
    // mapping constructor from db
    constructor(
        tinderForCatsUser, 
        petName = "", 
        shortDescription = "",
        longDescription = "", 
        averageRating = 0,
        totalReviews = 0,
        daysRequested = [],
        photoUrls = []) {
            this.ownerName = tinderForCatsUser.name;
            this.ownerUUID = tinderForCatsUser.uuid;
            this.petName = petName;
            this.petUUID = uuid();
            this.shortDescription = shortDescription;
            this.longDescription = longDescription;
            this.averageRating = averageRating;
            this.totalReviews = totalReviews;
            this.daysRequested = daysRequested;
            this.photoUrls = photoUrls;
        }
}