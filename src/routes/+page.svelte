<script lang="ts">
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';

    let name = '';
    let phone = '';
    let email = '';
    let timeLeft = 15; 
    let timer: NodeJS.Timeout | null = null;
    let challengeStarted = false;
    let modalOpen = false;
    let modalMessage = '';
    let showCandidateInfo = false;

    onMount(() => {
        name = localStorage.getItem('name') || '';
        phone = localStorage.getItem('phone') || '';
        email = localStorage.getItem('email') || '';
    });

    const startChallenge = () => {

        localStorage.setItem('name', name);
        localStorage.setItem('phone', phone);
        localStorage.setItem('email', email);

        challengeStarted = true;
        timer = setInterval(() =>{
            if (timeLeft > 0){
                timeLeft --;
            } else {
                clearInterval(timer!);
                showModal('Challenge failed!');
            }
        }, 1000);
    };

    const submitChallenge = () => {
        if (timeLeft > 0) {
            showModal('Challenge completed!');
            clearInterval(timer!);
        } else {

            showModal('Challenge failed!');
        }
    };

    const closedModal = () => {
        modalOpen = false;
    };

    const showModal = (message: string) => {
        modalMessage = message;
        modalOpen = true;
    };


    $: formattedTime = `${Math.floor(timeLeft / 60)
    .toString()
    .padStart(2, '0')}:${(timeLeft % 60).toString().padStart(2, '0')}`;
</script>


<div class="container mx-auto">
    {#if !challengeStarted}
    <form class="space-y-4 max-w-md mx-auto">
        <h1 class="text-2xl font-bold mb-4 text-center py-2 px-4">Enter your information</h1>
        <div class="flex items-center justify-center space-x-2">
            <label class="block text-sm font-medium text-white-700 "><strong> Name:</strong> </label>
            <input type="text" bind:value={name} class="border p-2 rounded text-center "/>
        </div>
        <div class="flex items-center justify-center space-x-2">
            <label class="block text-sm font-medium text-white-700"><strong> Phone:</strong></label>
            <input type="tel" bind:value={phone} class="border p-2 rounded text-center"/>
        </div>
        <div class="flex items-center justify-center space-x-2">
            <label class="block text-sm font-medium text-white-700"><strong> Email:</strong></label>
            <input type="email" bind:value={email} class="border p-2 rounded text-center"/>
        </div>

        <div class="mt-8 text-center max-w-md mx-auto">
            <button type="button" class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded w-full" on:click={startChallenge}>
                Start challenge
            </button>
        </div>
        
    </form>

    {/if}
    
    {#if challengeStarted}
        <div class="mt-8 text-center">
            <h2 class="text-2xl mb-4 font-bold text-white p-2 "> Time left: {formattedTime}</h2>

            <p class="text-white-700"><strong>Name: </strong>{name}</p>
            <p class="text-white-700"><strong>Phone: </strong>{phone}</p>
            <p class="text-white-700"><strong>Email: </strong>{email}</p>

            <div class="mt-8 text-center">
                <button class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"  on:click={submitChallenge}>
                    Submit
                </button>
            </div>

        </div>
    {/if}
</div>

{#if modalOpen}
    <div class="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center">
        <div class="bg-white p-4 rounded-lg shadow-lg relative">
            <button class="absolute top-2 right-2 text-gray-700" on:click={closedModal}>
                X
            </button>
            <h3 class="text-lg font-bold mb-2">{modalMessage}</h3>
            <div class="flex justify-between">

            <div class="flex space-x-2">
                <button class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" on:click={closedModal}>
                    Close
                </button>
  
                <button class="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded" on:click={() => goto('/candidate')}>
                    Back to your information
                </button>
    
              </div>
            </div>
        </div>
        <div class="modal-backdrop" on:click={closedModal}></div>
    </div>
{/if}