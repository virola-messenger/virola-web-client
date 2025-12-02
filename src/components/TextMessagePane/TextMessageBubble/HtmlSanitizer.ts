import sanitizeHtml from 'sanitize-html';

export default class HtmlSanitizer {

	static allowedTags =  [
		...sanitizeHtml.defaults.allowedTags
		, 'font'
	];

	static allowedAttributes = {
		...sanitizeHtml.defaults.allowedAttributes,
		'font': ['color'],
		'span': ['style']
	};


	static sanitize(html: string): string {
		const allowedTags = HtmlSanitizer.allowedTags;
		const allowedAttributes = HtmlSanitizer.allowedAttributes;

		return sanitizeHtml(html, { allowedTags, allowedAttributes });
	}
}