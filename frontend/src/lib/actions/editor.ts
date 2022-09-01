import Quill from 'quill?client';
import MagicUrl from 'quill-magic-url?client';
import 'quill-paste-smart?client';

export const editor = (
	node: HTMLElement,
	{ initialValue = '', disabled = false, autoFormatLinks = true, spellcheck = false }
) => {
	const options = {
		theme: 'snow',
		modules: {
			// keep "tab" navigational function
			keyboard: {
				bindings: {
					tab: {
						key: 9,
						handler: () => true
					}
				}
			},
			toolbar: disabled ? false : ['link'],
			magicUrl: false
		},
		bounds: node
	};

	if (autoFormatLinks) {
		options.modules.magicUrl = true;
		Quill.register({ 'modules/magicUrl': MagicUrl }, true);
	}

	const quill = new Quill(node, options);

	const container = node.getElementsByClassName('ql-editor')[0];
	container.innerHTML = initialValue;
	container.setAttribute('spellcheck', spellcheck.toString());
	// allow tabbing to editor
	container.setAttribute('tabindex', '0');

	if (disabled) {
		quill.disable();
		container.setAttribute('disabled', 'true');
	}

	// change placeholder link
	const quillInput = node.querySelector('input[data-link]');
	if (quillInput !== null) quillInput.setAttribute('data-link', 'http://beispiel.de');

	quill.on('text-change', () => {
		node.dispatchEvent(
			new CustomEvent('textChange', {
				detail: {
					html: container.innerHTML,
					text: quill.getText()
				}
			})
		);
	});
};
