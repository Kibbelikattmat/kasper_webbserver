<script lang="ts">
    import { enhance } from '$app/forms';
    export let data;

    let isFormValid = false;
    let updatedDescriptions: { [key: string]: string } = {}; 

    function validateForm() {
        const form = document.querySelector<HTMLFormElement>('form');
        if (!form) return;

        const inputs = form.querySelectorAll<HTMLInputElement>('input[type="text"]');
        isFormValid = true;

        inputs.forEach(input => {
            if (input.value.trim() === '') {
                isFormValid = false;
            }
        });

        const button = form.querySelector<HTMLButtonElement>('button');
        if (button) {
            button.disabled = !isFormValid;
        }
    }

    async function updateDescription(personId: string) {
        const description = updatedDescriptions[personId];
        if (!description) return;

        const formData = new FormData();
        formData.append('id', personId);
        formData.append('description', description);

        try {
            const response = await fetch('?/updateDescription', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error('Failed to update description');
            }

            const person = data.persons.find((p: { id: string }) => p.id === personId);
            if (person) person.description = description;
        } catch (error) {
            console.error(error);
            alert('An error occurred while updating the description.');
        }
    }

    async function deletePerson(personId: string) {
        const formData = new FormData();
        formData.append('id', personId);

        try {
            const response = await fetch('?/deletePerson', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error('Failed to delete person');
            }

            data.persons = [...data.persons.filter((p: { id: string }) => p.id !== personId)];
        } catch (error) {
            console.error(error);
            alert('An error occurred while deleting the person.');
        }
    }
</script>

<div class="container">
    <a href="/Parkeringsapp/Veichles">Veichles</a>
    <a href="/Parkeringsapp/Parkingspace">Parking Spaces</a>
    <a href="/Parkeringsapp/Parkings">Parkings</a>

    <form method="POST" action="?/addPerson" use:enhance on:input={validateForm}>
        <label>
            Add new person:
            <input name="name" type="text" on:input={validateForm} required>
        </label>

        <label>
            Description of person (not optional):
            <input name="description" type="text" on:input={validateForm} required>
        </label>

        <button disabled>Add Character</button> 
    </form>

    <ul>
        {#each data.persons as person}
            <li>
                <strong>{person.name}</strong> <br/>
                <input 
                    type="text" 
                    bind:value={updatedDescriptions[person.id]} 
                    placeholder={person.description}
                />
                <button on:click={() => updateDescription(person.id)}>Save</button>
                <button on:click={() => deletePerson(person.id)}>Delete</button>
            </li>
        {/each}
    </ul>
</div>

<style>
    a {
        margin-right: 10px;
        text-decoration: none;
        color: #007bff;
        font-weight: bold;
    }
    a:hover {
        text-decoration: underline;
    }

    form {
        margin: 20px 0;
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 5px;
        max-width: 400px;
        background-color: #f9f9f9;
    }

    label {
        display: block;
        margin-bottom: 10px;
    }

    input[type="text"] {
        width: calc(100% - 10px);
        padding: 5px;
        margin-top: 5px;
        border: 1px solid #ccc;
        border-radius: 4px;
    }

    button {
        margin: 5px 0;
        padding: 6px 12px;
        border: none;
        border-radius: 4px;
        background-color: #007bff;
        color: white;
        cursor: pointer;
        font-size: 14px;
    }

    button:disabled {
        background-color: #6c757d;
        cursor: not-allowed;
    }

    button:hover:not(:disabled) {
        background-color: #0056b3;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        margin: 10px 0;
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 5px;
        background-color: #fff;
        max-width: 400px;
    }

    li input[type="text"] {
        width: calc(100% - 20px);
        margin: 5px 0;
    }

    li button {
        margin-right: 5px;
    }

    .container {
        max-width: 600px;
        margin: auto;
        padding: 20px;
        font-family: Arial, sans-serif;
    }
</style>

