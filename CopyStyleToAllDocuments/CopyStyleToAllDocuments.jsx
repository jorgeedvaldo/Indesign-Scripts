/*
 *
 * Description:
 * This script copies a selected paragraph style from the active document
 * to all other open InDesign documents. It preserves the full group hierarchy
 * (group > subgroup > style) and creates groups as needed in target documents.
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

//#target "InDesign"

if (app.documents.length < 2) {
    alert("You need at least 2 open documents.");
    exit();
}

// ===============================
// 🔍 Get styles with full path (group > subgroup > style)
// ===============================
function getStylesWithPath(parent, prefix, result) {
    var styles = parent.paragraphStyles;
    var groups = parent.paragraphStyleGroups;

    for (var i = 0; i < styles.length; i++) {
        if (styles[i].name != "[No Paragraph Style]") {
            result.push({
                style: styles[i],
                path: prefix + styles[i].name
            });
        }
    }

    for (var j = 0; j < groups.length; j++) {
        getStylesWithPath(groups[j], prefix + groups[j].name + " > ", result);
    }
}

// ===============================
// 📁 Create group if it doesn't exist
// ===============================
function getOrCreateGroup(doc, groupPath) {
    var parts = groupPath.split(" > ");
    var current = doc;

    for (var i = 0; i < parts.length; i++) {
        var name = parts[i];
        if (!name) continue;

        // Use .isValid instead of forcing an error (avoids "Object is invalid" crash)
        var nextGroup = current.paragraphStyleGroups.itemByName(name);
        if (!nextGroup.isValid) {
            nextGroup = current.paragraphStyleGroups.add({ name: name });
        }
        current = nextGroup;
    }

    return current;
}

// ===============================
// 📋 Copy style properties
// ===============================
function copyStyleProperties(source, target) {
    var props = source.properties;

    for (var key in props) {
        try {
            // Avoid overwriting read-only and structural properties
            if (key !== "name" && key !== "id" && key !== "parent") {
                target[key] = props[key];
            }
        } catch (e) {
            // Ignore non-copyable properties
        }
    }
}

// ===============================
// 📄 Initial setup
// ===============================
var sourceDoc = app.activeDocument;
var stylesList = [];

getStylesWithPath(sourceDoc, "", stylesList);

if (stylesList.length === 0) {
    alert("No paragraph styles found to copy.");
    exit();
}

// ===============================
// 🖥️ User Interface
// ===============================
var dlg = new Window("dialog", "Choose a paragraph style");
dlg.orientation = "column";
dlg.alignChildren = "fill";

var dropdown = dlg.add("dropdownlist", undefined, []);
dropdown.preferredSize.width = 400;

// Populate with full paths
for (var i = 0; i < stylesList.length; i++) {
    dropdown.add("item", stylesList[i].path);
}

dropdown.selection = 0;

// Buttons
var btns = dlg.add("group");
btns.alignment = "center";
btns.add("button", undefined, "OK");
btns.add("button", undefined, "Cancel");

// Show dialog
if (dlg.show() != 1) exit();

var selected = stylesList[dropdown.selection.index];
var selectedStyle = selected.style;
var fullPath = selected.path;

// Separate group and name
var pathParts = fullPath.split(" > ");
var styleName = pathParts.pop();
var groupPath = pathParts.join(" > ");

// ===============================
// 🔁 Apply to all documents
// ===============================
for (var d = 0; d < app.documents.length; d++) {
    var targetDoc = app.documents[d];

    if (targetDoc == sourceDoc) continue;

    try {
        var parentGroup = targetDoc;

        if (groupPath.length > 0) {
            parentGroup = getOrCreateGroup(targetDoc, groupPath);
        }

        // Safe check using .isValid
        var newStyle = parentGroup.paragraphStyles.itemByName(styleName);
        if (!newStyle.isValid) {
            newStyle = parentGroup.paragraphStyles.add({ name: styleName });
        }

        // Copy properties
        copyStyleProperties(selectedStyle, newStyle);

    } catch (err) {
        alert("Error in document: " + targetDoc.name + "\n" + err);
    }
}

alert("Style \"" + styleName + "\" successfully copied to all documents!");
