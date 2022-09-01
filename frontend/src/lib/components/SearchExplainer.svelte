<script lang="ts" context="module">
	const questions = [
		{
			question: 'Warum werden mir auch nicht-exakte Treffer angezeigt?',
			answer:
				'Gesucht wird <em>fuzzy</em>. Das heißt es wird ein Text gesucht, der möglichst ähnlich zur Eingabe ist.'
		}
	];

	const extendedQuestions = [
		{
			question: 'Wie kann ich exakt suchen?',
			answer: 'Schreibe ein Gleichheitszeichen vor deinen Suchbegriff: <code>=Heiner</code>.'
		},
		{
			question: 'Wird per UND gesucht?',
			answer:
				'Ja, ein Leerzeichen zwischen Suchbegriffen wird als <em>UND</em> verstanden. Du kannst stattdessen mit <em>ODER</em> suchen, indem Du <code> | </code> zwischen die Wörter schreibst, also wenn Du nach Sarah oder Kane suchen willst, gibst Du <code>Sarah | Kane</code> ein.'
		},
		{
			question: `Wie kann ich nach enthaltenen Wörtern suchen?`,
			answer: `Schreibe ein Hochkomma vor deinen Suchbegriff: <code>'ess</code>. Das findet dann z.B. J<strong>ess</strong>ica oder geg<strong>ess</strong>en. Das geht auch umgekehrt: Mit <code>!ess</code> findest Du Ergebnisse, die nicht <em>ess</em> enthalten.`
		},

		{
			question: `Wie kann ich nach mehreren Wörtern mit einem Operator (<code>=</code>, <code>|</code>, <code>'</code>, <code>!</code>) suchen?`,
			answer:
				'Nutze den Operator in Kombination mit Anführungszeichen, also zum Beispiel für eine exakte Suche nach einer Zeichenkette: <code>="Heiner Müller"</code>.'
		}
	];
</script>

<script lang="ts">
	export let hasExtendedSearch = false;
</script>

<dl>
	{#each questions as item}
		<dt>{@html item.question}</dt>
		<dd>{@html item.answer}</dd>
	{/each}

	{#if hasExtendedSearch}
		{#each extendedQuestions as item}
			<dt>{@html item.question}</dt>
			<dd>{@html item.answer}</dd>
		{/each}
	{/if}
</dl>
