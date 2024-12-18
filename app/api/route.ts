import connection from "@/app/db/database";

export async function GET() {
    try {
        const [results, fields] = await connection.execute("SELECT * FROM users");
        console.log(results);
    } catch (error) {
        console.error(error);
        return Response.json({ message: error });
        
    }
    return Response.json({ message: "GET" });
}  