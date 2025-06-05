/**
 * MultiWordImporter.jsx
 *
 * Description:
 * This InDesign script allows users to import multiple Microsoft Word documents
 * into the current text frame at the cursor's position. Each document is inserted
 * sequentially, with a paragraph break added between them.
 *
 * Author: Edivaldo Jorge
 * License: MIT
 * Contact: Instagram - @jorgeedvaldo
 *           Github -  @jorgeedvaldo
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

if (app.documents.length === 0 || app.selection.length === 0 || !(app.selection[0].hasOwnProperty("insertionPoints"))) {
    alert("Por favor, coloque o cursor dentro de uma caixa de texto.");
} else {
    var cursor = app.selection[0];

    // Seleciona múltiplos documentos Word
    var wordFiles = File.openDialog("Seleciona documentos Word", "*.doc;*.docx", true);

    if (wordFiles !== null && wordFiles.length > 0) {
        var story = cursor.parentStory;
        var insertionPoint = cursor.insertionPoints[0];

        for (var i = 0; i < wordFiles.length; i++) {
            var file = wordFiles[i];

            try {
                // Importa o conteúdo no ponto de inserção atual
                var placed = insertionPoint.place(file);

                // Move o ponto de inserção para o fim do conteúdo recém inserido
                insertionPoint = story.insertionPoints[-1];

                // Insere uma quebra de parágrafo após cada documento
                insertionPoint.contents = "\r";

                // Avança o cursor para depois da quebra
                insertionPoint = story.insertionPoints[-1];

            } catch (e) {
                alert("Erro ao importar o arquivo: " + file.name + "\n" + e.message);
                break;
            }
        }

        alert("Importação concluída com sucesso!");
    } else {
        alert("Nenhum arquivo selecionado.");
    }
}
