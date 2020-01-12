import { Platform } from "react-native";
import { FirebaseService } from "./FirebaseService";
import uuid from "uuid";

export class UploadFileService {
    static async uploadFiles(fileUrls) {
        const blobs = [];
        let databaseUrls;
        try {
            for (let i = 0; i < fileUrls.length; i++) {
                const response = await fetch(fileUrls[i]);
                const newBlob = await response.blob();
                blobs.push({
                    blob: newBlob,
                    uuid: uuid()
                });
            }
            databaseUrls = await FirebaseService.uploadFiles(blobs);
        } catch (error) {
            console.log(error);
            throw new Error("The upload failed, please try again");
        }
        return databaseUrls;
    }
}