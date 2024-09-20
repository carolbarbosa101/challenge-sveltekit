<script lang="ts">
    import { page } from '$app/stores';
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';
    import '../../app.css';

    let name = '';
    let phone = '';
    let email = '';

    onMount(() => {
    name = localStorage.getItem('name') || '';
    phone = localStorage.getItem('phone') ||'';
    email = localStorage.getItem('email') ||'';
    });

    const backToChallenge = () => {
        goto('/');
    };

    const startChallenge = () => {
        localStorage.setItem('name', name);
        localStorage.setItem('phone', phone);
        localStorage.setItem('email', email);
    
        goto('/candidate');
    };
</script>

<div class="max-w-xl mx-auto p-4 bg-white shadow-md rounded-lg mt-10">
    <h1 class="text-2xl font-bold mb-4 text-center text-blue-600">Candidate Information</h1>
    <div class="space-y-4">
    <p class="text-gray-800"><strong>Name:</strong>{name}</p>
    <p class="text-gray-800"><strong>Phone:</strong>{phone}</p>
    <p class="text-gray-800"><strong>Email:</strong>{email}</p>

    <button class="bg-blue-600 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full" on:click={backToChallenge}>
        Back
    </button>
    </div>
</div>