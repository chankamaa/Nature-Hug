import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://dbnaturehug:ITP040103@nature-hug-db.p6jde.mongodb.net/nature-hug').then(()=>console.log("DB Connected"));
}

// import mongoose from "mongoose";

// export const connectDB = async () => {
//     try {
//         const conn = await mongoose.connect(process.env.MONGO_URL, {
//             useUnifiedTopology: true,
//             useNewUrlParser: true,
//         });

//         console.log(`mongodb connected:: ${conn.connect.host}`);

//     } catch(error) {
//         console.error(`Error: ${error.message}`);
//         process.exit();

//     }
// }
