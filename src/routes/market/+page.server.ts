import type { Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { prisma } from '$lib/+index';


export const load = ( async ({ request,params }) => {

    let items = await prisma.items.findMany()

    return {
        items: items
    }

    }) satisfies PageServerLoad


export const actions = {
    Add_item: async ({request}) => {

        const data = await request.formData();

        const name = data.get("Add item")?.toString()??"lul"
        const description = data.get("Description")?.toString()??"lul"
        const price = data.get("Price")?.toString()??"lul"

        await prisma.items.create({ data: { name: name, description:description, price:price }})

    }
} satisfies Actions