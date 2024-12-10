<script lang="ts">
    import { enhance } from '$app/forms';

    export let data;

    let isFormValid = false;

    // Check form validity
    function validateForm() {
        const form = document.querySelector<HTMLFormElement>('form');
        if (!form) return;

        const inputs = form.querySelectorAll<HTMLInputElement>('input[type="text"]');
        const fileInput = form.querySelector<HTMLInputElement>('input[type="file"]');
        isFormValid = true;

        inputs.forEach(input => {
            if (input.value.trim() === '') {
                isFormValid = false;
            }
        });

        if (!fileInput?.files?.length) {
            isFormValid = false;
        }

        const button = form.querySelector<HTMLButtonElement>('button');
        if (button) { 
            button.disabled = !isFormValid;
        }
    }
</script>

<style>
    /* Center the form */
    form {
        display: flex;
        flex-direction: column;
        width: 300px;
        margin: 20px auto;
        padding: 20px;
        border: 1px solid #ccc;
        border-radius: 10px;
        background-color: #f9f9f9;
    }

    label {
        margin-bottom: 10px;
        font-size: 16px;
        font-weight: bold;
    }

    input {
        padding: 8px;
        margin-bottom: 10px;
        border-radius: 5px;
        border: 1px solid #ccc;
        font-size: 14px;
    }

    button {
        padding: 10px;
        font-size: 16px;
        background-color: #4CAF50;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }

    button:disabled {
        background-color: #ccc;
        cursor: not-allowed;
    }

    /* Style for the character list */
    ul {
        list-style-type: none;
        padding: 0;
        width: 80%;
        margin: 20px auto;
    }

    li {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        padding: 15px;
        border-bottom: 1px solid #ccc;
        margin-bottom: 15px;
    }

    img {
        width: 150px;
        height: 150px;
        border-radius: 10px;
        margin-right: 20px;
    }

    a {
        font-size: 16px;
        font-weight: normal;
        text-decoration: none;
        color: #333;
    }

    a:hover {
        text-decoration: underline;
        color: #4CAF50;
    }
</style>

<a href="/addCharacter/games">Go to game</a>

<form method="POST" action="?/addCharacter" use:enhance enctype="multipart/form-data" on:input={validateForm}>
    <label>
        Add videogame character name:
        <input name="name" type="text" on:input={validateForm} required>
    </label>

    <label>
        Description of character:
        <input name="description" type="text" on:input={validateForm} required>
    </label>

    <label>
        Insert picture:
        <input name="picture" type="file" accept="image/*" on:input={validateForm} required>
    </label>

    <button disabled>Add Character</button> 
</form>


<ul>
    {#each data.characters as character}
        <li>
            <img src="{character.picture}" alt="{character.name}" />
            <a href="/characters/{character.id}">
                <strong>{character.name}</strong> <br/>
                {character.description}
            </a>
        </li>
    {/each}
</ul>