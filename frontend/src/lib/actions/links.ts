export const listURLs: (text: string | null, allowedProtocols?: string[]) => string[] = (
	text,
	allowedProtocols = ['http', 'https']
) => {
	if (text === null || text.length === 0) return [];
	console.log(text);
	const pattern =
		// eslint-disable-next-line no-useless-escape
		/href="[^"]*"/gi;
	const regex = new RegExp(pattern);
	let urls = text.match(regex);
	if (urls === null) return [];
	urls = urls
		.map((match) => match.slice(6, -1))
		.filter((match) => allowedProtocols.some((protocol) => match.startsWith(`${protocol}://`)));
	if (urls === null) return [];
	return [...new Set(urls)];
};
