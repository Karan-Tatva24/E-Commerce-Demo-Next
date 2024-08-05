import { NextResponse } from "next/server";
import { promises as fs } from "fs";

// Correct the file path
const filePath = "D:\\NextJsFolder\\e-commerce-users.json";

const readFile = async (): Promise<any> => {
  const data = await fs.readFile(filePath, "utf-8");
  return JSON.parse(data);
};

const writeFile = async (data: any) => {
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
};

export async function GET() {
  try {
    const data = await readFile();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error while reading the file", error },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { users } = await req.json();
    await writeFile({ users });
    return NextResponse.json(
      { message: "Data written successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Error while writing to the file" },
      { status: 500 }
    );
  }
}
