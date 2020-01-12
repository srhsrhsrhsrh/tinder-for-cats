import uuid from "uuid";

export class Post {
    // mapping constructor from db
    constructor(
        tinderForCatsUser, 
        petName, 
        shortDescription,
        longDescription, 
        averageRating,
        totalReviews,
        daysRequested,
        photoUrls) {
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
    
    // default constructor
    constructor(tinderForCatsUser) {
        this.ownerName = tinderForCatsUser.name;
        this.ownerUID = tinderForCatsUser.uid;
        this.petName = "";
        this.petUID = uuid();
        this.shortDescription = "";
        this.longDescription = "";
        this.averageRating = 0;
        this.totalReviews = 0;
        this.daysRequested = [];
        this.photoUrls = [];
    }
}