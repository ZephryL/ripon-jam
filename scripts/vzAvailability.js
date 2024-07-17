function vzAvailability(aOptions) {
    // Merge Options
    var o = {
        docElement: undefined,
        width: 800,
        margin: { left: 0, right: 0, top: 0, bottom: 0 },
        bookeddata: undefined,
        onEvent: undefined

    }

    for (var vProperty in aOptions) {
        if (aOptions.hasOwnProperty(vProperty)) {
            if (vProperty in o) {
                o[vProperty] = aOptions[vProperty];
            }
        }
    }

    
    // X and Y domains
    var xHeight = 100;
    var xWidth = o.width - o.margin.left - o.margin.right;

    // X Scales
    var xScaleTime = d3.scaleTime().range([0, xWidth]);
    
    
    var svg = d3.select(o.docElement)
        .append("svg")
        .attr("class", "availability")
        .attr("width", xWidth)
        .attr("height", xHeight);
    
    var vChart = svg.append("g")
        .attr("transform", `translate(${0},${0})`);


    //--------------------------------------------------------------------------
    // Base Type
    //--------------------------------------------------------------------------
    return {
        update: function (aData) { update(aData); }
    };
}

