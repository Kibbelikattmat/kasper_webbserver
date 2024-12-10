import { prisma } from '$lib/+index';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
    const activeParkings = await prisma.parkings.findMany({
        where: { endTime: null },
        include: { vehicle: true, parkingSpace: true }
    });
    const completedParkings = await prisma.parkings.findMany({
        where: { endTime: { not: null } },
        include: { vehicle: true, parkingSpace: true }
    });
    const vehicles = await prisma.vehicles.findMany();
    const parkingSpaces = await prisma.parkingspaces.findMany();

    return { activeParkings, completedParkings, vehicles, parkingSpaces };
};

export const actions: Actions = {
    startParking: async ({ request }) => {
        const data = await request.formData();
        const vehicleId = data.get('vehicleId')?.toString();
        const parkingSpaceId = data.get('parkingSpaceId')?.toString();
        const hourlyRate = parseFloat(data.get('hourlyRate')?.toString() || '0');

        if (vehicleId && parkingSpaceId) {
            await prisma.parkings.create({
                data: {
                    vehicleId,
                    parkingSpaceId,
                    startTime: new Date(),
                    hourlyRate
                }
            });
        }

        return { success: true };
    },
    endParking: async ({ request }) => {
        const data = await request.formData();
        const id = data.get('id')?.toString();

        if (id) {
            const parking = await prisma.parkings.findUnique({ where: { id } });

            if (parking && !parking.endTime) {
                const endTime = new Date();
                const parkedHours = (endTime.getTime() - parking.startTime.getTime()) / (1000 * 60 * 60);
                const totalCost = parkedHours * parking.hourlyRate;

                await prisma.parkings.update({
                    where: { id },
                    data: {
                        endTime,
                        totalCost
                    }
                });
            }
        }

        return { success: true };
    }
};
