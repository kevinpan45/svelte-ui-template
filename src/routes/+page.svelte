<script>
    import { onMount } from "svelte";
    onMount(() => {});
</script>

<div class="hero">
    <div class="flex-col hero-content lg:flex-row-reverse">
        <img
            alt="hero"
            src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
            class="max-w-sm rounded-lg shadow-2xl"
        />
        <div>
            <h1 class="text-5xl font-bold">Svelte Web UI Template</h1>
            <p class="py-6">
                A modern web template based on <a
                    href="https://svelte.dev"
                    target="_blank"
                    class="link">Svelte</a
                >
                and
                <a href="https://daisyui.com" target="_blank" class="link"
                    >DaisyUI</a
                >, authentication with
                <a href="https://auth0.com" target="_blank" class="link"
                    >Auth0</a
                >.
            </p>
            <button
                class="btn btn-primary"
                on:click={() =>
                    (window.location.href = "mailto:kevinpan45@163.com")}
                >Contact</button
            >
        </div>
    </div>
</div>
