<script>
  import UserIcon from "$component/UserMenu.svelte";
  export let showSearch = true;
  export let username = "";

  export let scrollY;
  $: switchNavbarStyle = scrollY > 40 ? true : false;

  export let data;
  export let addScrollPaddingToNavbar;
  export let removeScrollPaddingFromNavbar;
</script>

<svelte:window bind:scrollY />
<div
  class={`
  bg-base-100 text-base-content sticky top-0 z-30 flex h-16 w-full justify-center bg-opacity-90 backdrop-blur transition-shadow duration-100 [transform:translate3d(0,0,0)] 
  ${switchNavbarStyle ? "shadow-sm" : ""}
  `}
>
  <nav class="navbar w-full">
    <div class="flex flex-1 md:gap-1 lg:gap-2">
      <slot />

      {#if showSearch}
        <div class="hidden w-full max-w-sm lg:flex">
          {#await import("$component/Search.svelte") then Module}
            <Module.default
              on:search
              {data}
              {removeScrollPaddingFromNavbar}
              {addScrollPaddingToNavbar}
            />
          {/await}
        </div>
      {/if}
    </div>
    <div class="flex-0">
      <UserIcon bind:username />
    </div>
  </nav>
</div>
