export class Profile {
    constructor(
        tinderForCatsUser,
        descriptionOfPets = "",
        seekingDescription = "",
        allPetPosts = []
    ) {
        this.ownerName = tinderForCatsUser.name;
        this.ownerUUID = tinderForCatsUser.uuid;
        this.descriptionOfPets = descriptionOfPets;
        this.seekingDescription = seekingDescription;
        this.allPetPosts = allPetPosts;
    }
}