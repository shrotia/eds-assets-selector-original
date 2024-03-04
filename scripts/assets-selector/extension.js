/**
 * Creates a video block and copies it to the clipboard.
 *
 * @param {Object} asset - The asset object.
 * @param {Object} rendition - The rendition object.
 * @returns {undefined} - The function does not return anything.
 */
function modifiedCreateVideoBlock (asset, rendition) {
   return copyToClipboardWithBlock(asset.name, rendition.href, 'Core Embed (V2)');
}

/**
 * Copies a block of HTML to the clipboard.
 *
 * @param {string} name - The name to be displayed in the block.
 * @param {string} link - The link to be embedded in the block.
 * @param {string} blockName - The name of the block.
 * @returns {Promise<Object>} - A promise that resolves to an object with a success property indicating whether the operation was successful, and an error property that will be null if the operation was successful.
 */
async function copyToClipboardWithBlock(name, link, blockName) {
    const block = `
    <table border='1'>
      <tr>
        <td>${blockName}</td>
      </tr>
      <tr>
        <td><a href=${link}>${name}</a></td>
      </tr>
    </table>
    `;
    const data = [new ClipboardItem({ 'text/html': new Blob([block], { type: 'text/html' }) })];
    await navigator.clipboard.write(data);
    return {
        success: true,
        error: null,
    };
}
