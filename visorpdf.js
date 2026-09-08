pdfjsLib.GlobalWorkerOptions.workerSrc =

"https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js";

const url = "pdf/Inventario.pdf";

let pdfDoc = null;

let pageNum = 1;

let scale = 1.5;

let pageRendering = false;

let pageNumPending = null;

const canvas = document.getElementById("pdf-render");

const ctx = canvas.getContext("2d");

function renderPage(num) {

    pageRendering = true;

    pdfDoc.getPage(num).then(function(page) {

        const viewport = page.getViewport({ scale: scale });

        const outputScale = window.devicePixelRatio || 1;

        canvas.width = Math.floor(viewport.width * outputScale);

        canvas.height = Math.floor(viewport.height * outputScale);

        canvas.style.width = Math.floor(viewport.width) + "px";

        canvas.style.height = Math.floor(viewport.height) + "px";

        ctx.setTransform(outputScale, 0, 0, outputScale, 0, 0);

        const renderContext = {

            canvasContext: ctx,

            viewport: viewport

        };

        return page.render(renderContext).promise;

    }).then(function() {

        pageRendering = false;

        if (pageNumPending !== null) {

            renderPage(pageNumPending);

            pageNumPending = null;

        }

        document.getElementById("page-num").textContent = pageNum;

    });

}

function queueRenderPage(num) {

    if (pageRendering) {

        pageNumPending = num;

    } else {

        renderPage(num);

    }

}

function previousPage() {

    if (pageNum <= 1) return;

    pageNum--;

    queueRenderPage(pageNum);

}

function nextPage() {

    if (pageNum >= pdfDoc.numPages) return;

    pageNum++;

    queueRenderPage(pageNum);

}

document.getElementById("prev-page").addEventListener("click", previousPage);

document.getElementById("next-page").addEventListener("click", nextPage);

document.getElementById("zoom-in").addEventListener("click", function() {

    scale += 0.2;

    document.getElementById("zoom-level").textContent =

        Math.round(scale / 1.5 * 100) + "%";

    queueRenderPage(pageNum);

});

document.getElementById("zoom-out").addEventListener("click", function() {

    if (scale <= 0.6) return;

    scale -= 0.2;

    document.getElementById("zoom-level").textContent =

        Math.round(scale / 1.5 * 100) + "%";

    queueRenderPage(pageNum);

});

document.getElementById("print-btn").addEventListener("click", function() {

    window.open(url);

});

pdfjsLib.getDocument(url).promise.then(function(pdf) {

    pdfDoc = pdf;

    document.getElementById("page-count").textContent = pdf.numPages;

    renderPage(pageNum);

}).catch(function(error) {

    console.error(error);

    alert("No se pudo abrir el PDF.\n\n" + error.message);

});
 