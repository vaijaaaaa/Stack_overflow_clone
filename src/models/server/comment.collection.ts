import { Permission } from "node-appwrite";
import { CommentCollection, db } from "../name";
import { databases } from "./config";

export default async function createCommentCollection() {
    // Creating Collection
    await databases.createCollection(db, CommentCollection, CommentCollection, [
        Permission.create("users"),
        Permission.read("any"),
        Permission.read("users"),
        Permission.update("users"),
        Permission.delete("users"),
    ]);
    console.log("Comment Collection Created");

    // Creating Attributes
    await Promise.all([
        databases.createStringAttribute(db, CommentCollection, "content", 10000, true),
        databases.createEnumAttribute(db, CommentCollection, "type", ["answer", "question"], true),
        databases.createStringAttribute(db, CommentCollection, "typeId", 50, true),
        databases.createStringAttribute(db, CommentCollection, "authorId", 50, true),
    ]);
    console.log("Comment Attributes Created");
}