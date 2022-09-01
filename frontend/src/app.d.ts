/// <reference types="@sveltejs/kit" />

declare namespace App {
	// interface Platform {}
	// interface Session {}
	// interface Stuff {}
}

declare namespace svelte.JSX {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	interface HTMLAttributes<T> {
		onclickedOutside?: (e: CustomEvent) => void;
	}
}

declare module 'quill?client' {
	import all from 'quill';
	export = all;
}

declare module 'quill-magic-url?client' {
	import all from 'quill-magic-url';
	export = all;
}

declare module 'quill-paste-smart?client' {
	import all from 'quill-paste-smart';
	export = all;
}

declare module 'apexcharts?client' {
	import all from 'apexcharts';
	export = all;
}
