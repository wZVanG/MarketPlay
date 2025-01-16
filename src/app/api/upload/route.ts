import { NextRequest, NextResponse } from "next/server";
import { uploadToS3 } from "@/lib/s3";
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return NextResponse.json(
                { error: "Archivo no subido" },
                { status: 400 }
            );
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        const uniqueIdName = uuidv4();
        const fileName = `${uniqueIdName}`;

        const fileUrl = await uploadToS3(buffer, fileName);

        return NextResponse.json({ fileUrl });
    } catch (error) {
        console.error("Error subiendo archivo:", error);
        return NextResponse.json(
            { error: "Error subiendo archivo" },
            { status: 500 }
        );
    }
}