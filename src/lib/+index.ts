import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

let forums = await prisma.forum.findMany();

let items = await prisma.items.findMany();

let characters = await prisma.character.findMany();

let persons = await prisma.persons.findMany();

let veichles = await prisma.vehicles.findMany();

let parkingspaces = await prisma.parkingspaces.findMany();

let parkings = await prisma.parkings.findMany();