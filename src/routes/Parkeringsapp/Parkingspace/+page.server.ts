import { prisma } from '$lib/+index';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
    const parkingspaces = await prisma.parkingspaces.findMany();
    return { parkingspaces };
};

export const actions: Actions = {
    addParkingSpace: async ({ request }) => {
        const data = await request.formData();
        const location = data.get('location')?.toString() ?? 'Unnamed Location';
        const description = data.get('description')?.toString() ?? 'No description';

        await prisma.parkingspaces.create({
            data: {
                location,
                description,
            }
        });

        return { success: true };
    },
    updateParkingSpace: async ({ request }) => {
        const data = await request.formData();
        const id = data.get('id')?.toString();
        const description = data.get('description')?.toString();

        if (id && description) {
            await prisma.parkingspaces.update({
                where: { id },
                data: { description }
            });
        }

        return { success: true };
    },
    deleteParkingSpace: async ({ request }) => {
        const data = await request.formData();
        const id = data.get('id')?.toString();

        if (id) {
            await prisma.parkingspaces.delete({
                where: { id }
            });
        }

        return { success: true };
    }
};
