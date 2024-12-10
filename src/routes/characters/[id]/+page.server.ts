import { prisma } from '$lib/+index';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
    const characterId = params.id; // Get the `id` parameter from the URL

    if (!characterId) {
        throw new Error('Character ID not found in URL');
    }

    const character = await prisma.character.findUnique({
        where: { id: characterId }
    });

    if (!character) {
        return {
            status: 404,
            error: new Error('Character not found')
        };
    }

    return { character };
};
