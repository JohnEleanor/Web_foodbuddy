import connection from "@/app/db/database";


export async function GET(request: Request, { params }: any) {
    

   try {
    const query = `SELECT * FROM users WHERE user_lineId = ?`;

    const [results]: any = await connection.execute(query, [params.userLineid]);
    if (results.length === 0) {
        return Response.json({ message: "User not found", status: 404 });
    }else {
        return Response.json({ message: "User found", status: 200, data: results });
    }
   } catch (error) {
     console.error("Error fetching user data:", error);
     return Response.json({message: error, status: 500 });
    
   }
   
}