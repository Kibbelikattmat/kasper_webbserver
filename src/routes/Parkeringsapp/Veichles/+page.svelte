<script lang="ts">
    import { enhance } from '$app/forms';
    export let data;

    let updatedDescriptions: { [key: string]: string } = {};

    async function updateVehicle(vehicleId: string) {
        const description = updatedDescriptions[vehicleId];
        if (!description) return;

        const formData = new FormData();
        formData.append('id', vehicleId);
        formData.append('description', description);

        try {
            const response = await fetch('?/updateVehicle', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error('Failed to update vehicle');
            }

            const vehicle = data.vehicles.find((v: { id: string }) => v.id === vehicleId);
            if (vehicle) vehicle.description = description;
        } catch (error) {
            console.error(error);
            alert('An error occurred while updating the vehicle.');
        }
    }

    async function deleteVehicle(vehicleId: string) {
        const formData = new FormData();
        formData.append('id', vehicleId);

        try {
            const response = await fetch('?/deleteVehicle', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error('Failed to delete vehicle');
            }

            // Update the UI after successful deletion
            data.vehicles = [...data.vehicles.filter((v: { id: string }) => v.id !== vehicleId)];
        } catch (error) {
            console.error(error);
            alert('An error occurred while deleting the vehicle.');
        }
    }
</script>

<div class="container">
    <a href="/Parkeringsapp/Veichles">Vehicles</a>
    <a href="/Parkeringsapp/Parkingspace">Parking Spaces</a>
    <a href="/Parkeringsapp/Parkings">Parkings</a>

    <form method="POST" action="?/addVehicle" use:enhance>
        <label>
            Vehicle Name:
            <input name="name" type="text" required>
        </label>

        <label>
            Description:
            <input name="description" type="text" required>
        </label>

        <label>
            Owner:
            <select name="ownerId" required>
                {#each data.persons as person}
                    <option value={person.id}>{person.name}</option>
                {/each}
            </select>
        </label>

        <button>Add Vehicle</button>
    </form>

    <ul>
        {#each data.vehicles as vehicle}
            <li>
                <strong>{vehicle.name}</strong> <br/>
                Owned by: {vehicle.owner.name} <br/>
                <input 
                    type="text" 
                    bind:value={updatedDescriptions[vehicle.id]} 
                    placeholder={vehicle.description}
                />
                <button on:click={() => updateVehicle(vehicle.id)}>Save</button>
                <button on:click={() => deleteVehicle(vehicle.id)}>Delete</button>
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

    /* Style for the form */
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

    input[type="text"], select {
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

    /* Style for the list of vehicles */
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

    /* General container styling */
    .container {
        max-width: 600px;
        margin: auto;
        padding: 20px;
        font-family: Arial, sans-serif;
    }
</style>