/**
* Copies a block of HTML to the clipboard.
*
* @param {string} name - The name to be displayed in the block.
* @param {string} link - The link to be embedded in the block.
* @param {string} blockName - The name of the block.
* @returns {Promise<Object>} - A promise that resolves to an object with a success property indicating whether the operation was successful, and an error property that will be null if the operation was successful.
*/
async function copyBlockToClipboard(name, link, blockName) {
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

const AssetSelectorExtensionMethods = new Map([
    ['image', function(options = {}) {
        const { asset, rendition } = options;
        // Your logic for handling image assets
        console.log(`Handling image asset with options: asset=${asset}, rendition=${rendition}`);
        copyBlockToClipboard(asset.name, rendition.href, 'Image');
    }],
    ['video', function(options = {}) {
        const { asset, rendition } = options;
        // Your logic for handling video assets
        console.log(`Handling video asset with options: asset=${asset}, rendition=${rendition}`);
        copyBlockToClipboard(asset.name, rendition.href, 'Video');
    }],
    ['other', function(options = {}) {
        const { asset, rendition } = options;
        // Your logic for handling PDF assets
        console.log(`Handling PDF asset with options: asset=${asset}, rendition=${rendition}`);
        copyBlockToClipboard(asset.name, rendition.href, 'Pdf');
    }]
]);
