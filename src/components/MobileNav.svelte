<script lang="ts">
  import { Menu, X } from '@lucide/svelte';

  interface NavLink {
    href: string;
    label: string;
  }

  interface Props {
    links: NavLink[];
    currentPath: string;
    /** Optional external entry shown after the main links. */
    action?: NavLink;
  }

  let { links, currentPath, action }: Props = $props();

  let open = $state(false);
  let buttonEl: HTMLButtonElement | undefined = $state();
  let panelEl: HTMLDivElement | undefined = $state();

  function normalizePath(path: string): string {
    if (path === '/') return '/';
    return path.endsWith('/') ? path.slice(0, -1) : path;
  }

  function isCurrent(href: string): boolean {
    return normalizePath(currentPath) === normalizePath(href);
  }

  function isExternal(href: string): boolean {
    return /^https?:\/\//i.test(href);
  }

  function close() {
    open = false;
  }

  function onWindowClick(event: MouseEvent) {
    if (!open) return;
    // Use the path captured when the event was dispatched. The toggle swaps
    // the icon (Menu <-> X), which detaches the clicked SVG node; a later
    // `buttonEl.contains(target)` would then be false and wrongly close us.
    const path = event.composedPath();
    if (buttonEl && path.includes(buttonEl)) return;
    if (panelEl && path.includes(panelEl)) return;
    close();
  }

  function onWindowKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') close();
  }
</script>

<svelte:window onclick={onWindowClick} onkeydown={onWindowKeydown} />

<button
  bind:this={buttonEl}
  type="button"
  class="inline-flex size-11 items-center justify-center rounded-[var(--button-radius)] border border-border text-text transition-colors hover:border-border-secondary hover:bg-bg-secondary lg:hidden"
  aria-label={open ? 'Chiudi il menu' : 'Apri il menu'}
  aria-expanded={open}
  aria-controls="mobile-nav-menu"
  onclick={() => (open = !open)}
>
  {#if open}
    <X size={20} />
  {:else}
    <Menu size={20} />
  {/if}
</button>

{#if open}
  <div
    bind:this={panelEl}
    id="mobile-nav-menu"
    class="absolute inset-x-0 top-full border-b border-border bg-bg px-[var(--space-lg)] py-[var(--space-sm)] shadow-(--shadow-lg) lg:hidden"
  >
    <ul class="flex list-none flex-col gap-1 p-0" role="list">
      {#each links as link}
        <li>
          <a
            href={link.href}
            class="block rounded-[var(--radius-lg)] px-3 py-2 text-sm font-medium no-underline transition-colors {isCurrent(
              link.href,
            )
              ? 'bg-bg-secondary text-text'
              : 'text-text-secondary hover:bg-bg-secondary hover:text-text'}"
            aria-current={isCurrent(link.href) ? 'page' : undefined}
            onclick={close}
          >
            {link.label}
          </a>
        </li>
      {/each}
      {#if action}
        <li class="mt-1 border-t border-border pt-1">
          <a
            href={action.href}
            target={isExternal(action.href) ? '_blank' : undefined}
            rel={isExternal(action.href) ? 'noopener noreferrer' : undefined}
            data-astro-reload={isExternal(action.href) || undefined}
            class="flex items-center justify-between gap-2 rounded-[var(--radius-lg)] px-3 py-2 text-sm font-semibold text-accent no-underline transition-colors hover:bg-accent/10 hover:text-accent-hover"
            onclick={close}
          >
            {action.label}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="h-4 w-4 shrink-0"
              aria-hidden="true"
            >
              <path d="M7 17 17 7"></path>
              <path d="M7 7h10v10"></path>
            </svg>
          </a>
        </li>
      {/if}
    </ul>
  </div>
{/if}
