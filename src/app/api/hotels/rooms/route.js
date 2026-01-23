import { NextResponse } from 'next/server';
import rooms from '../rooms.json';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const hotelId = searchParams.get('hotelId');

  let filteredRooms = rooms;
  if (hotelId) {
    filteredRooms = rooms.filter(room => room.hotelId === parseInt(hotelId));
  }

  // Fallback: If no rooms found for this hotelId, return some default rooms
  if (filteredRooms.length === 0) {
    filteredRooms = rooms.slice(0, 3);
  }

  return NextResponse.json(filteredRooms);
}
