// the data structures we want to compare performance with:
var test_structures = [];

// the sequence of operations to carry out:
var ops = [];

// measures is a dictionary of dictionaries
// example entry: "BST" : {"insert 1": (50ms, 80ms), "delete 1": (20ms, 30ms)}
var measures = {};

function runTests() {
    for (var i = 0; i < test_structures.length ; i++) {
        test(test_structures[i]);
    }
}
function test(structure) {
    var workingSet = new WorkingSetStructure();
    // run each op
    for (var i = 0; i < ops.length ; i++) {
        var t0 = performance.now();
        workingSet.insert(1);
        var t1 = performance.now();
        var wsTime = t1 - t0
        t0 = performance.now();
        structure.insert(1);
        t1 = performance.now();
        var strucTime = t1 - t0
        // times are in ms
        measures[structure[ops[i]]] = (wsTime, strucTime)
    }
}