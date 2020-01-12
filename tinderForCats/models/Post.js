import uuid from "uuid";

export class Post {
    // mapping constructor from db
    constructor(
        tinderForCatsUser, 
        petUUID = uuid(),
        petName = "", 
        shortDescription = "",
        longDescription = "", 
        averageRating = 0,
        totalReviews = 0,
        daysRequested = [],
        photoUrls = [],
        swipedUsers = []) {
            this.ownerName = tinderForCatsUser.name;
            this.ownerUUID = tinderForCatsUser.uuid;
            this.petName = petName;
            this.petUUID = petUUID;
            this.shortDescription = shortDescription;
            this.longDescription = longDescription;
            this.averageRating = averageRating;
            this.totalReviews = totalReviews;
            this.daysRequested = daysRequested;
            this.photoUrls = photoUrls;
            this.swipedUsers = swipedUsers;
        }
}