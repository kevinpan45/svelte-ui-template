<script>
  import { onMount, createEventDispatcher } from "svelte";
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";
  import Typeahead from "svelte-typeahead";

  export let data = [];

  const dispatch = createEventDispatcher();

  const getOS = () => {
    let userAgent = window.navigator.userAgent.toLowerCase(),
      macosPlatforms = /(macintosh|macintel|macppc|mac68k|macos)/i,
      windowsPlatforms = /(win32|win64|windows|wince)/i,
      iosPlatforms = /(iphone|ipad|ipod)/i,
      os = null;

    if (macosPlatforms.test(userAgent)) {
      os = "macos";
    } else if (iosPlatforms.test(userAgent)) {
      os = "ios";
    } else if (windowsPlatforms.test(userAgent)) {
      os = "windows";
    } else if (/android/.test(userAgent)) {
      os = "android";
    } else if (!os && /linux/.test(userAgent)) {
      os = "linux";
    }

    return os;
  };

  function extractPages(obj) {
    const items = [];
    function recursiveExtract(obj) {
      if (obj.link) {
        items.push(obj);
      }
      if (obj.items) {
        obj.items.forEach((item) => {
          recursiveExtract(item);
        });
      }
    }
    obj.forEach((item) => {
      recursiveExtract(item);
    });
    return items;
  }
  let searchIndex = extractPages(data);

  let os;
  onMount(() => {
    os = getOS();
  });

  let seachboxEl;
  function handleKeydown(e) {
    if ((e.keyCode === 75 && e.metaKey) || (e.keyCode === 75 && e.ctrlKey)) {
      e.preventDefault();
      seachboxEl.querySelector("input[type=search]").focus();
      dispatch("focus");
    }
  }

  function onSelect({ detail }) {
    goto(searchIndex[detail.originalIndex].link);
    dispatch("search", detail);
  }

  export let addScrollPaddingToNavbar = undefined;
  export let removeScrollPaddingFromNavbar = undefined;
</script>

<svelte:window on:keydown={handleKeydown} />

<!-- svelte-ignore a11y-label-has-associated-control -->
<label class={`searchbox relative mx-3 w-full`} bind:this={seachboxEl}>
  <svg
    class={`pointer-events-none absolute z-10 my-3.5 ms-4 stroke-current opacity-60 ${
      $page.url.pathname == "/" ? "text-current" : "text-base-content"
    }`}
    width="16"
    height="16"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>
  <Typeahead
    placeholder={"Search..."}
    limit={8}
    label="Search"
    data={searchIndex}
    extract={(item) => (item.tags ? item.tags : item.name)}
    inputAfterSelect="clear"
    on:select={onSelect}
    on:focus={removeScrollPaddingFromNavbar}
    on:blur={addScrollPaddingToNavbar}
    let:result
  >
    <div class="py-1 text-sm font-normal">
      {searchIndex[result.index].name}
    </div>
  </Typeahead>
  <div
    class={`pointer-events-none absolute end-10 top-2.5 gap-1 opacity-50 rtl:flex-row-reverse "hidden lg:flex"`}
  >
    {#if ["macos"].includes(os)}
      <kbd class="kbd kbd-sm">⌘</kbd>
      <kbd class="kbd kbd-sm">K</kbd>
    {:else if ["windows", "linux"].includes(os)}
      <kbd class="kbd kbd-sm">ctrl</kbd>
      <kbd class="kbd kbd-sm">K</kbd>
    {/if}
  </div>
</label>
