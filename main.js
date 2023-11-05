let timeline = YAML.load('timeline.yml'); 
let chapters = {};

yamlString = YAML.stringify(timeline);

// addSpacers(0);
let prev = null;
for(i = 0; i < timeline.length; i++) {
    let info = timeline[i];
    chapters[info.title] = info;
    
    let node = createNode(info);

    document.getElementById("rank" + info.rank).appendChild(node);
    addSpacers(info.rank);

    if(info.prereqs) {
        drawArrows(info, prev);
    }
    if(info.type == "jump") {
        addSpacer(info.rank);
        let spacer = addSpacer(info.rank);
        new LeaderLine(
            document.getElementById("c" + info.id),
            spacer,
            {dash: true}
        );
    }
    prev = info.title;
}

function drawArrows(info, prev) {
    // For convenience, I made it so that having a prereq of "p" makes 
    // the immediate preceding node into the parent. 
    // You can still manually specify a title, and you'll have to if
    // there's multiple parents.
    if (info.prereqs == "p") { 
        let start = "c" + chapters[prev].id;
        let end = "c" + info.id;

        new LeaderLine(
            document.getElementById(start),
            document.getElementById(end),
        );
    } else {
        for (j = 0; j < info.prereqs.length; j++) {
            let start = "c" + chapters[info.prereqs[j]].id;
            let end = "c" + info.id;

            new LeaderLine(
                document.getElementById(start),
                document.getElementById(end),
            );
        }
    }
}

function createNode(info) {
    var node = document.createElement("div");
    node.id = "c" + info.id;
    node.className = "node";

    var link = document.createElement("a");
    link.href = info.url;
    link.title = info.title;

    var heading = document.createTextNode(info.title);
    link.append(heading);    
    node.append(link);

    return node;
}

function addSpacers(rank) {
    for (r = 1; r <= 5; r++) {
        if (r != rank) {
            addSpacer(r);
        }
    }
}

function addSpacer(r) {
    let spacer = document.createElement("div");
    spacer.className = "spacer node";
    document.getElementById("rank" + r).appendChild(spacer);
    return spacer;
}

