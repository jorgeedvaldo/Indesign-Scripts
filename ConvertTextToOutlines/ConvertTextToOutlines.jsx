/*
 *
 * Description:
 * This script converts all text frames to outlines (vector paths)
 * across all open InDesign documents, including regular and master pages.
 * It automatically unlocks all page items before converting.
 *
 * Author: Edivaldo Jorge
 * License: MIT
 * Contact: Instagram - @jorgeedvaldo
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

// Check if there are any open documents
if (app.documents.length === 0) {
    alert("No documents are open.");
} else {

    // Function to convert text to outlines
    function converterTextoEmContornos(textFrames) {
        for (var i = textFrames.length - 1; i >= 0; i--) {
            try {
                if (textFrames[i].contents !== "") {
                    textFrames[i].createOutlines();
                }
            } catch (e) {
                // Ignore errors
            }
        }
    }

    // Loop through all open documents
    for (var d = 0; d < app.documents.length; d++) {
        var doc = app.documents[d];

        // (Optional) Unlock all page items in the document
        for (var i = 0; i < doc.pageItems.length; i++) {
            try {
                doc.pageItems[i].locked = false;
            } catch (e) { }
        }

        // 1. Regular pages
        for (var p = 0; p < doc.pages.length; p++) {
            converterTextoEmContornos(doc.pages[p].textFrames);
        }
    }

    alert("All documents have been successfully converted to outlines!");
}
