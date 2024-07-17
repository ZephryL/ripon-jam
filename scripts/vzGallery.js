var weightedRand = function(spec) {
    var i, sum=0, r=Math.random();
    for(i in spec) { 
        sum += spec[i];
        if (r <= sum) return i;
    }
}

function vzGallery(aOptions) {
    // Merge Options
    var o = {
        docElement: undefined,
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

    let vHtmlRoot = d3.select(o.docElement);

    function update() {

        vizZoomBars = vHtmlRoot
            .selectAll("div.card")
            .data(d3.range(1, o.count+1))
            .join(
                enter => {
                    enter.append("div")
                        .attr("class", "card")
                        .style("background-image", function(d) {
                            return `url(${o.folder}/${o.prefix}${d}.jpg)`
                        })
                        .style("background-size", "cover")
                        .style("background-position", "50% 50%")
                        .each(function() {d3.select(this)
                            .classed(`span-${Math.floor(Math.random() * 3) + 1}`, true)
                            .classed(`color-${Math.floor(Math.random() * 5) + 1}`, true)}
                        )
                        .on("click", function(d) {
                            if (o.onEvent) {
                                o.onEvent({ event: "click", index: d, image: `${o.folder}/${o.prefix}${d}.jpg`})
                            }
                        })
                    },
                //update => update {}
                exit => exit.remove()
            );
    }
    
    //--------------------------------------------------------------------------
    // Base Type
    //--------------------------------------------------------------------------
    return {
        update: function () { update(); },
    };
}