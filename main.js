let timeline = YAML.load('timeline.yml'); 
let chapters = {};
let existingSprites = ["erin", "ryoka", "horns"];

yamlString = YAML.stringify(timeline);

// prepopulate the timeline with empty cells
for(let r = 0; r < timeline.length; r++) {
    timeline[r].id = r;

    if(timeline[r].heading) {
        createHeading(timeline[r].title);
    } else {
        fillRowWithEmptyCells(r);
    }
}

let prev = null;
for(let i = 0; i < timeline.length; i++) {
    if (timeline[i].heading) {
        continue;
    }
    let info = timeline[i];
    chapters[info.title] = info;
    
    let node = createNode(info);

    // document.getElementById("rank" + info.rank).appendChild(node);
    // rank is a node's importance, but it doesn't correspond to a left to right
    // indexing. The rank of each column is actually: 4 2 1 3 5 (6 goes here if ever we need it)
    let place = placeFor(info.rank);
    cell(i, place).append(node);

    // info.art also contains an attribute called "layer". This is not currently in use
    // but my hope is to eventually put these little bits of art on separate parallax layers.
    if (info.art) {
        let art = document.createElement("img");
        art.className = "ingredient";
        art.src = "bg/" + info.art.name + ".png"
        cell(i, info.art.pos).append(art);
        cell(i, info.art.pos).append(document.createTextNode(info.art.name));
    }

    if(info.prereqs) {
        drawArrows(info, prev);
    }

    // This part should create a dashed arrow coming from above, for threads continued from very far above.
    if(info.from) {
        let portal = document.createElement("div");
        portal.className = "portal";

        let predecessor = chapters[info.from];
        let link = document.createElement("a");
        link.href = predecessor.url;
        link.title = predecessor.title;
    
        let heading = document.createTextNode(predecessor.title);
        link.append(heading);
        portal.append(link);

        cell(i-1, place).append(portal);
        
        new LeaderLine(
            portal,
            tile(info.id),
            {dash: true}
        );
    }

    // This section adds a dummy node for dashed lines to extend outwards to.
    // Use dashed lines if a node simply has too many children, or if 
    // the solid arrow it would otherwise draw is unreasonably long.
    if(info.type == "jump") {
        let portal = document.createElement("div");
        portal.className = "portal";
        cell(i+1, place).append(portal);

        new LeaderLine(
            tile(info.id), 
            portal,
            {dash: true}
        );
    }
    prev = info;
}

// LeaderLine doesn't draw arrows quite right at the start, but resizing the window
// corrects it--this leads me to think it's drawing arrows using an outdated DOM,
// but I can't figure out where that's happening. So I cheat and just trigger the 
// resize event... which might be costly later on but should be okay for now.
window.dispatchEvent(new Event('resize'));

/*** END ONLOAD CODE ***/

/*** FUNCTIONS ***/
function createHeading(title) {
    let heading = document.createElement("div");
    heading.className = "heading";
    let titleText = document.createTextNode(title);
    heading.append(titleText);
    document.getElementById("timeline-nodes").append(heading);
}

function fillRowWithEmptyCells(r) {
    for (let c = 0; c < 5; c++) {
        let gridItem = document.createElement("div");
        gridItem.className = "nodeContainer";
        gridItem.id = "cell-" + r + "-" + c;

        //let textNode = document.createTextNode("cell-" +  r + "-" + c);
        //gridItem.append(textNode);
        document.getElementById("timeline-nodes").append(gridItem);
    }
}

function placeFor(rank) {
    switch(rank) {
        case 1: return 2; 
        case 2: return 1; 
        case 3: return 3; 
        case 4: return 0; 
        case 5: return 4; 
        case 6: return 5; 
        default: return -1; // this should never happen
    }
}

function cell(r, c) {
    return document.getElementById("cell-" + r + "-" + c);
}

function tile(id) {
    return document.getElementById("c" + id);
}

function drawArrows(info, prev) {
    // For convenience, I made it so that having a prereq of "p" makes 
    // the immediate preceding node into the parent. 
    // You can still manually specify a title, and you'll have to if
    // there's multiple parents.
    if (info.prereqs == "p") { 
        info.prereqs = [prev.title];
    }
    for (let j = 0; j < info.prereqs.length; j++) {
        let start = chapters[info.prereqs[j]].id;
        let end = info.id;

        let sCol = placeFor(chapters[info.prereqs[j]].rank);
        let eCol = placeFor(info.rank);

        let socketStart = "bottom";
        let socketEnd  = "top";
        
        if (sCol < eCol && eCol <= 2) {
            socketEnd = "left";
        } else if (sCol < eCol && sCol >= 2) {
            socketStart = "right";
        } else if (sCol > eCol && sCol <= 2) {
            socketStart = "left";
        } else if (sCol > eCol && eCol >= 2) {
            socketEnd = "right";
        } else if (sCol != 2 && eCol != 2) {
            socketStart = "auto";
            socketEnd = "auto";
        }

        new LeaderLine(
            tile(start),
            tile(end),
            {startSocket: socketStart,
             endSocket: socketEnd,
            dropShadow: {dx:-3, dy:-3}}
        );
    }
}

function createNode(info) {
    var node = document.createElement("div");
    node.id = "c" + info.id;
    node.className = "node";
    if (info.catchup) {
        node.className += " dataNode";

        var dataPanel = document.createElement("div");
        dataPanel.className = "dataPanel";
        var catchupText = document.createTextNode(info.catchup);
        dataPanel.append(catchupText);
        node.append(dataPanel);
    }

    var linkContainer = document.createElement("div");
    var link = document.createElement("a");
    link.href = info.url;
    link.title = info.title;

    var heading = document.createTextNode(info.title);
    link.append(heading);    
    linkContainer.append(link);
    node.append(linkContainer);

    var spriteContainer = document.createElement("div");
    spriteContainer.className = "spriteContainer";
    addSprites(spriteContainer, info);
    node.append(spriteContainer);

    return node;
}

function addSprites(node, info) {
    if(info.povs) {
        for(let i = 0; i < info.povs.length; i++) {
            let char = info.povs[i];

            let span = document.createElement("span");
            span.className = "povSprite";

            span.title = char;
            if (!existingSprites.includes(char)) {
                char = "unknown";
            }

            // span.src = "sprites/" + char + "-sprite.png";
            span.style = "background-image: url(sprites/" + char + "-sprite.png);";
            node.append(span);
        }
    }

    if(info.guests) {
        for(let i = 0; i < info.guests.length; i++) {
            let char = info.guests[i];

            let span = document.createElement("span");
            span.className = "guestSprite";

            span.title = char;
            if (!existingSprites.includes(char)) {
                char = "unknown";
            }

            span.style = "background-image: url(sprites/" + char + "-sprite.png);";
            node.append(span);
        }
    }
}


