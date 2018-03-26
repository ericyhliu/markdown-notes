const map = {
    "bold": "****",
    "italic": "__",
    "strikethrough": "~~~~",
    "list-ul": "- ",
    "list-ol": "1. ",
    "align-center": "\n&lt;center&gt;&lt;/center&gt;",
    "quote": "> ",
    "code": "\n```\n```",
    "link": "[]()",
    "latex": "\n$$\n$$"
};

/**
 * Returns the corresponding markdown snippet to the menuItem.
 * 
 * @param {string} menuItem 
 */
const mapMenuItemToSnippet = (menuItem) => {
    return map[menuItem];
};

export default mapMenuItemToSnippet;
