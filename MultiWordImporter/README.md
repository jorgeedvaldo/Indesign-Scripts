# MultiWordImporter for Adobe InDesign

**MultiWordImporter** is a simple Adobe InDesign script that allows you to import multiple Microsoft Word documents (`.doc` or `.docx`) into a selected text frame, appending each file's content in sequence with a paragraph break in between.

## ✨ Features

- Supports importing multiple `.doc` or `.docx` files
- Inserts content at the current cursor (insertion point)
- Automatically adds a paragraph break after each document
- Provides clear alerts and error messages for a smooth user experience

## 🖥️ Requirements

- Adobe InDesign (recommended: CC 2018 or later)
- Script panel enabled
- A document must be open
- A text frame must be selected with the **cursor active inside**

## 🚀 How to Use

1. Open your InDesign document.
2. Click inside a **text frame** where you want to insert the content.
3. Run the script:
   - Go to `Window > Utilities > Scripts`.
   - In the Scripts panel, right-click on “User” and select `Reveal in Finder` (macOS) or `Reveal in Explorer` (Windows).
   - Copy the `MultiWordImporter.jsx` file into the revealed folder.
   - Back in InDesign, double-click the script to run it.

4. A dialog will appear asking you to select one or more `.doc` or `.docx` files.
5. The contents of the selected files will be imported into the text frame, with paragraph breaks separating them.
6. A confirmation message will appear when the process is complete.

## ⚠️ Notes

- If no document is open, or if the cursor is not inside a valid text frame, the script will alert you to correct that before proceeding.
- File import may fail if the document format is unsupported or if there are permission issues. In such cases, an error message will be displayed.

## 📧 Author

Edivaldo Jorge  
🌐 [My Instagram](https://www.instagram.com/jorgeedvaldo)

---

**License:** MIT — Free to use, modify, and distribute with attribution.
