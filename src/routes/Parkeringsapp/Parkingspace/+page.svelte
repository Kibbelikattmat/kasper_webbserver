<script lang="ts">
    import { enhance } from '$app/forms';
    export let data;

    let updatedDescriptions: { [key: string]: string } = {};

    async function updateParkingSpace(parkingSpaceId: string) {
        const description = updatedDescriptions[parkingSpaceId];
        if (!description) return;

        const formData = new FormData();
        formData.append('id', parkingSpaceId);
        formData.append('description', description);

        try {
            const response = await fetch('?/updateParkingSpace', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error('Failed to update parking space');
            }

            const parkingSpace = data.parkingspaces.find((p: { id: string }) => p.id === parkingSpaceId);
            if (parkingSpace) parkingSpace.description = description;
        } catch (error) {
            console.error(error);
            alert('An error occurred while updating the parking space.');
        }
    }

    async function deleteParkingSpace(parkingSpaceId: string) {
        const formData = new FormData();
        formData.append('id', parkingSpaceId);

        try {
            const response = await fetch('?/deleteParkingSpace', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error('Failed to delete parking space');
            }

            // Update the UI after successful deletion
            data.parkingspaces = [...data.parkingspaces.filter((p: { id: string }) => p.id !== parkingSpaceId)];
        } catch (error) {
            console.error(error);
            alert('An error occurred while deleting the parking space.');
        }
    }
</script>

<div class="container">
    <a href="/Parkeringsapp/Veichles">Vehicles</a>
    <a href="/Parkeringsapp/Parkingspace">Parking Spaces</a>
    <a href="/Parkeringsapp/Parkings">Parkings</a>

    <form method="POST" action="?/addParkingSpace" use:enhance>
        <label>
            Parking Space Location:
            <input name="location" type="text" required>
        </label>

        <label>
            Description:
            <input name="description" type="text" required>
        </label>

        <button>Add Parking Space</button>
    </form>

    <ul>
        {#each data.parkingspaces as parkingSpace}
            <li>
                <strong>{parkingSpace.location}</strong> <br/>
                <input 
                    type="text" 
                    bind:value={updatedDescriptions[parkingSpace.id]} 
                    placeholder={parkingSpace.description}
                />
                <button on:click={() => updateParkingSpace(parkingSpace.id)}>Save</button>
                <button on:click={() => deleteParkingSpace(parkingSpace.id)}>Delete</button>
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
