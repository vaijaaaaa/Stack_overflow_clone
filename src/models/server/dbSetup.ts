import { db } from "../name";
import createAnswerCollection from "./anser.collection";
import createCommentCollection from "./comment.collection";
import createVoteCollection from "./vote.collection";
import { createQuestionCollection } from "./question.collection";

import { databases } from "./config";

export default async function getOrCreateDB(){
    try {
        await databases.get(db)
        console.log("Database connected");
        
    } catch (error) {
        try {
            await databases.create(db,db)
            console.log("database created");
            await Promise.all([
                createQuestionCollection(),
                createAnswerCollection(),
                createCommentCollection(),
                createVoteCollection()
            ])
            console.log("Collection created");
            console.log("Database connected");
            
            
        } catch (error) {
            console.log("Error creating databases and collections",error);
            
        }
    }
    return databases;
}