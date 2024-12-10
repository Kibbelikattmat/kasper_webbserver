<script lang="ts">
    // Define the structure of `data` and `battleResult`
    export let data: { characters: { id: string; name: string }[] };

    let selectedCharacter1: string | null = null;
    let selectedCharacter2: string | null = null;
    let battleResult: { name: string } | null = null;

    // Handle form submission without page reload using fetch
    async function handleBattle(event: Event) {
        event.preventDefault(); // Prevent default form submission behavior

        const form = event.target as HTMLFormElement;
        const formData = new FormData(form);

        const response = await fetch(form.action, {
            method: 'POST',
            body: formData
        });

        const result = await response.json();
        battleResult = result.winner ? { name: result.winner.name } : null;
    }
</script>

<h1>Select Characters for Battle</h1>

<form method="POST" action="?/battle" on:submit={handleBattle}>
    <label for="character1">Character 1:</label>
    <select name="character1" bind:value={selectedCharacter1} id="character1" required>
        <option value="" disabled selected>Select a character</option>
        {#each data.characters as character}
            <option value={character.id}>{character.name}</option>
        {/each}
    </select>

    <br/>

    <label for="character2">Character 2:</label>
    <select name="character2" bind:value={selectedCharacter2} id="character2" required>
        <option value="" disabled selected>Select a character</option>
        {#each data.characters as character}
            <option value={character.id}>{character.name}</option>
        {/each}
    </select>

    <br/>

    <button type="submit">Battle!</button>
</form>

{#if battleResult}
    <h2>Battle Result:</h2>
    <p>The winner is: {battleResult.name}</p>
{/if}

<style>
    form {
        margin-bottom: 20px;
    }
    button {
        padding: 10px;
        background-color: #4CAF50;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }
</style>
