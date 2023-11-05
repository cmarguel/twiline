YAML.load('timeline.yml', function(result)
{
    timeline = result;
});
for(i = 0; i < timeline.length; i++) {
    var node = document.createElement("div");
    node.className = "node";
    var heading = document.createTextNode(timeline[i].title);
    node.append(heading);
    document.getElementById("div1").appendChild(node);
}


var cols = document.getElementsByClassName('column');
for(i = 0; i < cols.length; i++) {
    cols[i].style.width = 15 + "%";
}


// Add new leader line from `start` to `end` (HTML/SVG element, basically).
new LeaderLine(
    document.getElementById('start'),
    document.getElementById('mid1'),
    // { path: "grid" }
  );
  new LeaderLine(
    document.getElementById('mid1'),
    document.getElementById('end'),
    // { path: "grid" }
  );
  new LeaderLine(
    document.getElementById('mid2'),
    document.getElementById('end'),
    // { path: "grid" }
  );
  new LeaderLine(
    document.getElementById('mid1'),
    document.getElementById('mid2'),
    // { path: "grid" }
  );
  new LeaderLine(
    document.getElementById('mid3'),
    document.getElementById('end'),
    // { path: "grid" }
  );
