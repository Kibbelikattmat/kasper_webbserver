import { prisma } from '$lib/+index';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
    const vehicles = await prisma.vehicles.findMany({ include: { owner: true } });
    const persons = await prisma.persons.findMany();
    return { vehicles, persons };
};

export const actions: Actions = {
    addVehicle: async ({ request }) => {
        const data = await request.formData();
        const name = data.get('name')?.toString() ?? 'Unnamed Vehicle';
        const description = data.get('description')?.toString() ?? 'No description';
        const ownerId = data.get('ownerId')?.toString() ?? '';

        await prisma.vehicles.create({
            data: {
                name,
                description,
                ownerId
            }
        });

        return { success: true };
    },
    updateVehicle: async ({ request }) => {
        const data = await request.formData();
        const id = data.get('id')?.toString();
        const description = data.get('description')?.toString();

        if (id && description) {
            await prisma.vehicles.update({
                where: { id },
                data: { description }
            });
        }

        return { success: true };
    },
    deleteVehicle: async ({ request }) => {
        const data = await request.formData();
        const id = data.get('id')?.toString();

        if (id) {
            await prisma.vehicles.delete({
                where: { id }
            });
        }

        return { success: true };
    }
};
