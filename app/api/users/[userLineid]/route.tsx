import connectToDatabase from "@/app/db/database";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: any) {
  if (!params.userLineid) {
    return NextResponse.json({ message: "Missing userLineId parameter", status: 400 });
  }

  let connection;

  try {
    // Connect to the database
    connection = await connectToDatabase();

    
   


    // SQL query to fetch user data
    const query = `SELECT * FROM users WHERE user_lineId = ?`;
    const [results]: any = await connection.execute(query, [params.userLineid]);

    if (results.length === 0) {
      return NextResponse.json({ message: "User not found" }, {status: 404});
    }

    // User found
    return NextResponse.json({ message: "User found", status: 200, data: results });
  } catch (error) {
    console.error("Error fetching user data:", error);
    return NextResponse.json({ message: "Internal server error"}, {status: 500});
  } finally {
    // Always close the database connection
    if (connection) {
      await connection.end();
    }
  }
}
