import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://dbnaturehug:ITP040103@nature-hug-db.p6jde.mongodb.net/nature-hug').then(()=>console.log("DB Connected"));
}