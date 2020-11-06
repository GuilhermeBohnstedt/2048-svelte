import App from "./App.svelte";

const app = new App({
	target: document.body,
	props: { dimension: 4, title: '2048' },
});

export default app;
