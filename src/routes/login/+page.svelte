<script>
  import {
    createClient,
    loginWithRedirect,
    isAuthenticated,
  } from "$lib/auth.js";
  import { onMount } from "svelte";
  import toast from "svelte-french-toast";
  let loading = true;
  onMount(async () => {
    if (isAuthenticated) {
      toast.success("You are already logged in.");
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    } else {
      await createClient();
      loading = false;
    }
  });
  async function login() {
    await loginWithRedirect();
  }
</script>

<div class="hero min-h-screen">
  <div class="hero-content flex-col lg:flex-row-reverse">
    <div class="text-center lg:text-left">
      <h1 class="text-5xl font-bold">Login now!</h1>
      <p class="py-6">
        Auth0 as authentication provider for secure login.
        <br />
      </p>
    </div>
    <div class="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <!-- svelte-ignore a11y-label-has-associated-control -->
      <div class="card-body">
        <div class="form-control mt-6">
          <button
            class="btn btn-primary w-full"
            on:click|preventDefault={login}
            disabled={loading}
          >
            {#if loading}
              Loading...
            {:else}
              Login with Auth0
            {/if}
          </button>
        </div>
      </div>
    </div>
  </div>
</div>
