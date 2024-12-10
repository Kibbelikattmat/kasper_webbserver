import { prisma } from '$lib/+index';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
    const persons = await prisma.persons.findMany();
    return { persons };
};

export const actions: Actions = {
    addPerson: async ({ request }) => {
        const data = await request.formData();

        const name = data.get('name')?.toString() ?? 'Unnamed';
        const description = data.get('description')?.toString() ?? 'No description';

        await prisma.persons.create({
            data: {
                name: name,
                description: description,
            }
        });

        return { success: true };
    },
    updateDescription: async ({ request }) => {
        const data = await request.formData();
        const id = data.get('id')?.toString();
        const description = data.get('description')?.toString();

        if (id && description) {
            await prisma.persons.update({
                where: { id: id },
                data: { description },
            });
        }

        return { success: true };
    },
    deletePerson: async ({ request }) => {
        const data = await request.formData();
        const id = data.get('id')?.toString();

        if (id) {
            await prisma.persons.delete({
                where: { id: id },
            });
        }

        return { success: true };
    }
};
