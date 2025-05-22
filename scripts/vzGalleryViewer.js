"use strict"

function vzGalleryViewer(aOptions) {
    // Merge Options
    var o = {
        docPopup: undefined,
        docOverlay: undefined,
        folder: undefined,
        prefix: undefined,
        count: undefined,
        onEvent: undefined
    }

    for (var vProperty in aOptions) {
        if (aOptions.hasOwnProperty(vProperty)) {
            if (vProperty in o) {
                o[vProperty] = aOptions[vProperty];
            }
        }
    }

    function open(aIndex) {
        if (o.docOverlay !== undefined) {
            o.docOverlay.style.display = "";
        }
        o.docPopup.style.display = "";
        o.docPopup.innerHTML = "";

        // popup-title
        var vizTitleDiv = document.createElement('div');
        vizTitleDiv.classList.add("title");
        // vizTitleDiv.insertAdjacentHTML("beforeend", `<span class="popup">Viewing Image #${aIndex}</span>`);

        var vizClose = document.createElement("button");
        vizClose.classList.add("button","close");
        vizClose.setAttribute("type", "submit");
        vizClose.id = "close-button";
        vizClose.insertAdjacentHTML("beforeend", `<span class="fa-solid fa-xmark"></span>`);
        vizTitleDiv.insertAdjacentElement("beforeend", vizClose);
        vizClose.addEventListener("click", () => { if (o.onEvent) { o.onEvent("close") } })

        o.docPopup.insertAdjacentElement("beforeend", vizTitleDiv);
        // popup-image
        
        var vizImageSlider = document.createElement('div');
        vizImageSlider.classList.add("imageslider");

        // prev button
        var vizPrev = document.createElement("button");
        vizPrev.classList.add("button","prev");
        vizPrev.setAttribute("type", "button");
        vizPrev.insertAdjacentHTML("beforeend", `<span class="fa-solid fa-angle-left"></span>`);
        vizImageSlider.insertAdjacentElement("beforeend", vizPrev);
        vizPrev.addEventListener("click", () => {
            if (aIndex <= 1) {
                aIndex = o.count
            } else {
                aIndex--
            }
            vizImageDiv.innerHTML = "";
            vizImageDiv.insertAdjacentHTML("beforeend", `<img src=${o.folder}/${o.prefix}${aIndex}.jpg />`);
        })

        var vizImageDiv = document.createElement('div');
        vizImageDiv.classList.add("image");
        vizImageDiv.insertAdjacentHTML("beforeend", `<img src=${o.folder}/${o.prefix}${aIndex}.jpg />`);
        vizImageSlider.insertAdjacentElement("beforeend", vizImageDiv);

        // next button
        var vizNext = document.createElement("button");
        vizNext.classList.add("button","next");
        vizNext.setAttribute("type", "button");
        vizNext.insertAdjacentHTML("beforeend", `<span class="fa-solid fa-angle-right"></span>`);
        vizImageSlider.insertAdjacentElement("beforeend", vizNext);
        vizNext.addEventListener("click", () => {
            if (aIndex >= o.count) {
                aIndex = 1
            } else {
                aIndex++
            }
            vizImageDiv.innerHTML = "";
            vizImageDiv.insertAdjacentHTML("beforeend", `<img src=${o.folder}/${o.prefix}${aIndex}.jpg />`);
        })
        
        o.docPopup.insertAdjacentElement("beforeend", vizImageSlider);
    }

    function close() {
        document.querySelector("#close-button").removeEventListener("click", o.onEvent);
        if (o.docOverlay !== undefined) {
            o.docOverlay.style.display = "none";
        }
        o.docPopup.style.display = "none";
        o.docPopup.innerHTML = "";
    }
    //--------------------------------------------------------------------------
    // The base type of vzLoader, returned to a reference
    //--------------------------------------------------------------------------
    return {
        open: function (aIndex) { open(aIndex); },
        close: function () { close(); }
    };
}