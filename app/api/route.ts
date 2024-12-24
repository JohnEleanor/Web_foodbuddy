import connectToDatabase from "@/app/db/database";

export async function GET() {
    try {
        const connection = await connectToDatabase();
        const [results, fields] = await connection.execute("SELECT * FROM users");
    } catch (error) {
        console.error(error);
        return Response.json({ message: error });
        
    }
    return Response.json({ message: "GET" });
}  