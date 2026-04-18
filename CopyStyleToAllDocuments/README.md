# 🎨 CopyStyleToAllDocuments

This Adobe InDesign script copies a selected paragraph style from the active document to all other open documents. It preserves the full group hierarchy (group > subgroup > style) and creates any missing groups in the target documents automatically.

Este script para o Adobe InDesign copia um estilo de parágrafo selecionado do documento ativo para todos os outros documentos abertos. Ele preserva toda a hierarquia de grupos (grupo > subgrupo > estilo) e cria automaticamente os grupos em falta nos documentos de destino.

---

## 📦 Features · Funcionalidades

- 🎯 Select any paragraph style via a dropdown dialog (with full group path)
- 📂 Automatically creates group/subgroup hierarchy in target documents
- 📋 Copies all style properties from source to target
- 📄 Applies the style to all other open documents at once
- ⚠️ Handles errors gracefully and reports issues per document

---

## 🖥️ How to Use · Como Usar

1. Open at least **2 documents** in Adobe InDesign.
2. Make the **source document** (the one with the style you want to copy) the active document.
3. Install the script:
   - Open InDesign and go to `Window > Utilities > Scripts`.
   - In the Scripts panel, right-click on "User" and select `Reveal in Finder` (macOS) or `Reveal in Explorer` (Windows).
   - Copy the file `CopyStyleToAllDocuments.jsx` into the revealed folder.
4. Back in InDesign, double-click the script to execute it.
5. Select the desired paragraph style from the dropdown and click **OK**.
6. The style will be copied to all other open documents.

---

## 📃 Requirements · Requisitos

- Adobe InDesign (CC 2018 or later recommended)
- At least **2 documents** must be open

---

## ⚠️ Important Notes · Notas Importantes

- If a style with the same name already exists in a target document, its properties will be **overwritten** with the source style's properties.
- Se um estilo com o mesmo nome já existir num documento de destino, as suas propriedades serão **substituídas** pelas propriedades do estilo de origem.

---

## 👨‍💻 Author · Autor

**Edivaldo Jorge**  
📸 Instagram: [@jorgeedvaldo](https://instagram.com/jorgeedvaldo)

---

## 🧾 License · Licença

MIT License.  
You are free to use, modify, and share the script with attribution.  
Você é livre para usar, modificar e compartilhar o script com atribuição.
