import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'src/app/api/cars/cars.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(fileContents);

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error reading cars data:', error);
    return NextResponse.json({ error: 'Failed to fetch cars data' }, { status: 500 });
  }
}
