import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismaDb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(
    req: Request,
){
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.redirect("/login");
    }

    const body = await req.json();

    const {
        listingId,
        startDate,
        endDate,
        totalPrice,
    } = body;

    if (!listingId || !startDate || !endDate || !totalPrice) {
        return NextResponse.error();
    }

    const listingAndReservations = await prisma.listing.update({
        where: {
            id: listingId,
        },
        data: {
            reservations: {
                create: {
                    userId: currentUser.id,
                    startDate,
                    endDate,
                    totalPrice,    
                }
            },
        },
    });

    return NextResponse.json(listingAndReservations);
}