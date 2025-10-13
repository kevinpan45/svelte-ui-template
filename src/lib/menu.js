let menus = null;

export async function getMenus() {
    if (menus === null) {
        const response = await fetch('/data/menus.json');
        menus = await response.json();
    }
    return menus;
}