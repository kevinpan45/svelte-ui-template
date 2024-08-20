<script>
  import "../app.css";
  import Icon from "$component/icon/Icon.svelte";
  import axios from "axios";
  import { onMount } from "svelte";
  import toast, { Toaster } from "svelte-french-toast";
  import Navbar from "$component/Navbar.svelte";
  import Sidebar from "$component/Sidebar.svelte";

  let menus = [{ name: "profile", link: "/profile", alias: "Profile", enabled: true }, { name: "setting", link: "/setting", alias: "Settings", enabled: true }];

  let username = "KP45";

  let layoutMounted = false;

  const sideBarCollapsedWidth = 1024;

  let lockSiderbar = {
    isLocked: false,
    isCollapsed: false,
  };

  $: collapsed = innerWidth < sideBarCollapsedWidth;

  onMount(async () => {
    // 菜单与svg的映射关系
    const iconMap = {
      profile: "profile",
      setting: "setting",
    };
    menus = menus.map((menu) => {
      return { ...menu, icon: iconMap[menu.name] };
    });

    layoutMounted = true;
    collapsed = sessionStorage.getItem("sidebar-collapsed") === "true";
  });

  $: innerWidth = undefined;

  const onClickSideBarCollapse = () => {
    sessionStorage.setItem("sidebar-collapsed", !collapsed);
    collapsed = !collapsed;
    lockSiderbar = {
      isLocked: true,
      isCollapsed: collapsed,
    };
  };

  $: {
    const { isLocked, isCollapsed } = lockSiderbar;
    if (isLocked) {
      // case: 窗口size足够大，手动收起菜单
      if (isCollapsed) {
        if (innerWidth < sideBarCollapsedWidth) {
          lockSiderbar = {
            isLocked: false,
            isCollapsed,
          };
        } else {
          collapsed = true;
        }
      }
      // case: 窗口size小于sideBarCollapsedWidth，手动展开菜单
      else {
        if (innerWidth >= sideBarCollapsedWidth) {
          lockSiderbar = {
            isLocked: false,
            isCollapsed,
          };
        } else {
          collapsed = false;
        }
      }
    } else {
    }
  }
</script>

<svelte:window bind:innerWidth />

<Toaster />

<div class="md:h-screen">
  <div class="bg-base-100 drawer lg:drawer-open h-full overflow-hidden">
    <div class={`${collapsed ? "ml-20" : ""} drawer-content overflow-auto`}>
      {#if layoutMounted}
        <Navbar {collapsed} {username} showSearch={false} />
      {/if}

      <div class={"max-w-[100vw] px-6 pb-16 xl:pr-2"}>
        {#if layoutMounted}
          <slot />
        {/if}
      </div>
    </div>
    <!-- 暂时无法优雅的解决菜单收起时展示的menu tooltip被遮挡的问题 -->
    {#if layoutMounted}
      <div
        class={`${collapsed ? "!w-20 pr-60 -mr-60 isCollapse" : "shadow-2xl"} z-40 sider-bar overflow-hidden h-screen !pointer-events-none`}
        style="scroll-behavior: smooth;"
      >
        <label for="drawer" class="drawer-overlay" aria-label="Close menu" />
        <aside
          class={`${collapsed ? "!w-20 shadow-2xl" : "w-80"} transition-width duration-75 ease-in-out bg-base-100 min-h-screen pointer-events-auto`}
        >
          <svelte:component this={Sidebar} pages={menus} {collapsed} />
          <div
            class="bg-base-100 pointer-events-none sticky bottom-0 flex h-40 [mask-image:linear-gradient(transparent,#000000)]"
          />
        </aside>
        <button
          class={`${collapsed ? "w-20" : "w-80"} btn btn-neutral pointer-events-auto fixed bottom-0`}
          on:click={onClickSideBarCollapse}
        >
          <Icon
            icon={`${collapsed ? "hugeicons:arrow-right-01" : "hugeicons:arrow-left-01"}`}
            class="size-6"
          />
        </button>
      </div>
    {/if}
  </div>
</div>

<style>
  .sider-bar {
    pointer-events: auto;
    visibility: visible;
    position: sticky;
    display: block;
    width: auto;
    overscroll-behavior: auto;
    overflow-y: auto;
  }

  .sider-bar > aside {
    transform: translateX(0%) !important;
  }

  .drawer-side > *:not(.drawer-overlay) {
    transform: none !important;
  }

  .sider-bar.isCollapse {
    scrollbar-width: none;
  }

  .sider-bar.isCollapse::-webkit-scrollbar {
    display: none;
  }
</style>
