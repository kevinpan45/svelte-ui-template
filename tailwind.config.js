module.exports = {
    content: ['./src/routes/**/*.{svelte,js,ts}'],
    plugins: [require('daisyui')],
    daisyui: {
        // first theme in this list is the default theme
        themes: ["dark"],
    },
};
