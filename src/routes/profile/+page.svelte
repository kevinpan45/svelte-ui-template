<script>
    // get current logged user
    import { onMount } from "svelte";
    import toast from "svelte-french-toast";
    import { user, isAuthenticated } from "$lib/auth.js";

    onMount(() => {
        // Check if the user is authenticated
        if (!isAuthenticated) {
            toast.error("You must be logged in to access this page.");
            // Redirect to login page after 1 second
            setTimeout(() => {
                window.location.href = "/login";
            }, 1000);
        }
    });
</script>

{#if user}
    <div class="hero">
        <div class="hero-content w-2/3 flex-col lg:flex-row-reverse">
            <div class="card bg-base-200 w-full shrink-0 shadow-2xl">
                <!-- svelte-ignore a11y-label-has-associated-control -->
                <form class="card-body">
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">Name</span>
                        </label>
                        <input
                            type="text"
                            class="input input-bordered"
                            required
                            bind:value={user.name}
                        />
                    </div>
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">Email</span>
                        </label>
                        <input
                            type="email"
                            class="input input-bordered"
                            required
                            bind:value={user.email}
                        />
                    </div>
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">Nickname</span>
                        </label>
                        <input
                            type="text"
                            class="input input-bordered"
                            required
                            bind:value={user.nickname}
                        />
                    </div>
                </form>
            </div>
        </div>
    </div>
{/if}
