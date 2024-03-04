const customBlocksNameConfig = new Map([['video', 'core embed']]);

customPrintSuccess = () => {
    console.log("Copied to Clipboard - custom code");
}

// Define modified versions of the methods
async function modifyCopyImageAsset(asset) {
    console.log("custom modifyCopyImageAsset");
    let copyResult = {
        success: false,
        error: null,
    };

    const rendition = getLargestCopyRendition(asset, SUPPORTED_RENDITIONS_FORMATS);
    if (!rendition) {
        copyResult.error = `No rendition found to copy for ${asset.name}`;
        console.error(`No rendition found to copy for ${asset.name} (${asset.path})`);
        return copyResult;
    }

    // Try to copy the rendition using the download rel as image HTML element with alt text
    copyResult = await copyImageAssetWithDownloadRel(asset, rendition);

    // If above didn't help, try to copy the rendition using the href from the rendition metadata
    if (!copyResult.success && rendition.href) {
        copyResult = await copyImageToClipboardAsImgElement(rendition.href, rendition, asset);
        // If above didn't help, try to do binary copy of the rendition using the href from the rendition metadata
        if (!copyResult.success) {
            copyResult = await copyToClipboardWithBinary(rendition.href, rendition.type, asset, rendition);
        }
    }

    return copyResult;
}

async function modifyCopyNonImageAsset(asset) {
    console.log("custom modifyCopyNonImageAsset");
    let rendition;
    if (isVideoAsset(asset)) {
        rendition = getRendition(asset, 'text/html', SUPPORTED_RENDITIONS_FORMATS);
        return rendition
            ? copyToClipboardWithBlock(asset.name, rendition.href, 'Core Embed (var1)')
            : { success: false, error: 'No html rendition!' };
    }
    // For other assets, place link to the rendition with same format as the asset in the clipboard

    rendition = getRendition(asset, getAssetFormat(asset), SUPPORTED_RENDITIONS_FORMATS);
    return rendition
        ? copyToClipboardWithLink(asset.name, rendition.href)
        : { success: false, error: 'No same format rendition!' };
}

// Register modified versions of the methods
registerModifiedMethod('copyImageAsset', modifyCopyImageAsset);
registerModifiedMethod('copyNonImageAsset', modifyCopyNonImageAsset);
