// Just run this in the console to extract chapter info. This is here for completeness' sake, but the 
// timeline should already be populated so unless you fall way behind, updating by hand would probably
// be faster.
// Create an empty object
// var chaptersMap = {};

// Select all .chapter-entry elements
var chapters = document.querySelectorAll('.chapter-entry .table-cell a');

temp = ["\n"];
// Iterate over the NodeList
chapters.forEach(function(chapter) {
    // Use the text content as the key and the href as the value
    // chaptersMap[chapter.textContent] = chapter.getAttribute('href');
    temp.push("-\n");
    temp.push("  title: \"" + chapter.textContent + "\"\n");
    temp.push("  url: \"" + chapter.getAttribute("href") + "\"\n");
    temp.push("  prereqs: p\n");
    temp.push("  rank: 1\n");
    temp.push("  povs: null\n");
    temp.push("  guests: null\n")
});

console.log(...temp)