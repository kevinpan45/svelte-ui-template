<script>
  import SidebarMenuItem from "$component/SidebarMenuItem.svelte";
  import logo from "$lib/images/svelte-logo.svg";

  let serverVersion = "0.0.1";
  let contextMenuEl;

  export let closeDrawer;
  // export let openDrawer;

  export let pages;
  export let drawerSidebarScrollY;
  export let collapsed;
  $: switchNavbarStyle = drawerSidebarScrollY > 40 ? true : false;

  $: innerWidth = undefined;
</script>

<svelte:window bind:innerWidth />

<div
  data-sveltekit-preload-data
  class={`bg-base-100 sticky top-0 z-20 items-center gap-2 bg-opacity-90 px-4 py-2 backdrop-blur lg:flex ${switchNavbarStyle ? "shadow-sm" : ""}`}
>
  <a
    href="/"
    aria-current="page"
    aria-label="Homepage"
    class="flex-0 btn btn-ghost px-2"
    on:contextmenu|preventDefault={(e) => contextMenuEl.openContextMenu(e)}
  >
    <img width="32" height="32" src={logo} alt="logo" />
    <div
      class={`font-title inline-flex text-lg md:text-2xl ${collapsed ? "!hidden" : ""}`}
      style={`background-image: ${logo}`}
    >
      Pipeline Cloud
    </div>
    <div
      tabindex="0"
      role="button"
      class={`link link-hover inline-block font-mono text-xs ${collapsed ? "!hidden" : ""}`}
    >
      {serverVersion}
    </div>
  </a>
</div>

<div class="h-4" />

<ul class="menu px-4 py-0">
  {#each pages as { name, href, icon, badge, badgeclass, highlightAnotherItem, deprecated, items, target, highlight, link, enabled, alias }}
    {#if enabled}
      <SidebarMenuItem
        {closeDrawer}
        name={alias}
        href={href || link}
        {icon}
        {badge}
        {badgeclass}
        {highlightAnotherItem}
        {deprecated}
        {items}
        {highlight}
        {target}
        {collapsed}
      />
    {/if}
  {/each}
</ul>
