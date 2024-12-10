import type { Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { prisma } from '$lib/+index';

export const load = ( async ({ request,params }) => {

    let forums = await prisma.forum.findMany()

    return {
        forums: forums
    }

    }) satisfies PageServerLoad


export const actions = {
    New: async ({request}) => {

        const data = await request.formData();
        const form = data.get("forum_name")?.toString()??"lul"

        await prisma.forum.create({ data: { name: form }})

    }
} satisfies Actions