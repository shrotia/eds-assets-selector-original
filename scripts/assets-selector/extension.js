const customBlocksNameConfig = new Map([['video', 'core embed']]);

customPrintSuccess = () => {
    console.log("Copied to Clipboard - custom cod ssse");
}

function modifiedCreateVideoBlock (asset, rendition) {
   copyToClipboardWithBlock(asset.name, rendition.href, 'Core Embed (V2)');
}

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
