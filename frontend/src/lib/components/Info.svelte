<script lang="ts" context="module">
	import Title from '$lib/components/basic/Title.svelte';
</script>

<script lang="ts">
	const faq: { question: string; answer: string }[] = [
		{
			question: 'Kann ich was kaputt machen?',
			answer: `<p><strong>Nein!</strong> Klicke ruhig überall drauf. Wenn Du dir nicht sicher bist, was ein Knopf macht,
			kannst Du auch kurz mit dem Mauszeiger darüber verweilen. Dann wird dir ein Hilfstext angezeigt.</p>`
		},
		{
			question: 'Ich komme nicht weiter: Wer hilft mir?',
			answer: `Hier gibt's Unterstützung: <a href='mailto:${
				import.meta.env.VITE_SUPPORT_EMAIL
			}?subject=[minutes][Frage]'>per Email</a> oder <a href="sip:${
				import.meta.env.VITE_SUPPORT_TEAMS
			}" target="new">in Teams</a>.`
		},
		{
			question:
				'Ich bin über einen Bug gestolpert oder ich habe Feedback: Wo kann ich das loswerden?',
			answer: `<a href='mailto:${
				import.meta.env.VITE_SUPPORT_EMAIL
			}?subject=[minutes][Bug] [Feedback]'>Schreib eine Email</a> oder melde dich <a href="sip:${
				import.meta.env.VITE_SUPPORT_TEAMS
			}" target="new">in Teams</a>.`
		},
		{
			question: 'Gibt es eine API? Kommen die Daten auch wieder raus?',
			answer: `Die API findest Du hier <a href='${
				import.meta.env.VITE_API_DOC_URL
			}' target="new">hier</a>.`
		},
		{
			question:
				'Kann ich mein Protokoll auch programmatisch einspielen, weil ich schon eine z. B. Excel-Datei habe?',
			answer: `Das Programm unterstützt das nicht direkt. Melde dich dazu aber gerne <a href='mailto:${
				import.meta.env.VITE_SUPPORT_EMAIL
			}?subject=[minutes][Frage]'>per Mail</a> oder <a href="sip:${
				import.meta.env.VITE_SUPPORT_TEAMS
			}" target="new">in Teams</a>.`
		},

		{
			question: 'Wo finde ich den Quelltext?',
			answer: `<a href=${import.meta.env.VITE_REPO_LINK} target="new">Hier lang!</a>`
		}
	];
</script>

<article>
	<Title title="Häufig gestellte Fragen" />
	<dl class="block">
		{#each faq as item}
			<dt>{item.question}</dt>
			<dd>
				{@html item.answer}
			</dd>
		{/each}
	</dl>
</article>
