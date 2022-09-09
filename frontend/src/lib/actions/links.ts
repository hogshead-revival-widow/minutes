export const listURLs = (text: string | null) => {
	if (text === null || text.length === 0) return [];
	const parser = new DOMParser();
	const html = parser.parseFromString(text, 'text/html');
	const links = html.querySelectorAll('a');
	return Array.from(links)
		.filter((link) => link?.href && link.href.length > 0 && link.innerText.length > 0)
		.map((link) => ({ href: link.href, label: link.innerText }));
};
