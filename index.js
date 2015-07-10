var postcss = require('postcss');

module.exports = postcss.plugin('postcss-sass-extend', function (opts) {
	opts = opts || {};

	var placeholderClass = /^%[A-z][\w-]*$/;

	function each(parent) {
		var index = -1;
		var node;

		while (node = parent.nodes[++index]) {
			if (node.type === 'rule') index = eachRule(node, parent, index);
			else if (node.type === 'atrule') index = eachAtRule(node, parent, index);

			if (node.nodes) each(node);
		}

		index = removeUnusedPlaceholders(parent, index);
	}

	function eachRule(node, parent, index) {
		if (placeholderClass.test(node.selector)) {
			addPlaceholder(parent, node);
		}

		return index;
	}

	function eachAtRule(node, parent, index) {
		if (node.name === 'extend') {
			var placeholder = getPlaceholder(parent, node.params);

			if (placeholder && parent.type === 'rule') addPlaceholderSelector(placeholder, parent.selector);

			node.removeSelf();

			--index;
		}

		return index;
	}

	function addPlaceholder(node, placeholder) {
		node.placeholders = node.placeholders || {};

		node.placeholders[placeholder.selector] = placeholder;

		placeholder.selector = '';
	}

	function removeUnusedPlaceholders(node, index) {
		if (node.placeholders) {
			Object.keys(node.placeholders).forEach(function (selector) {
				var placeholder = node.placeholders[selector];

				if (!placeholder.selector) {
					--index;

					placeholder.removeSelf();
				}
			});
		}

		return index;
	}

	function getPlaceholder(node, name) {
		while (node) {
			if (node.placeholders && node.placeholders[name]) return node.placeholders[name];

			node = node.parent;
		}
	}

	function addPlaceholderSelector(placeholder, selector) {
		if (placeholder.selector) placeholder.selector += ', ' + selector;
		else placeholder.selector = selector;
	}

	return each;
});
