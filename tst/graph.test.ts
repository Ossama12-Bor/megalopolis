import * as Graph from "../dist/graph.js";


describe('General graph test suite',() =>{
    test('empty graph has 0 length',() => {
	expect(Graph.graph_length(Graph.cons_empty_graph())).toBe(0);
    });

    test('testing find_node_index',() => {
	let g : Graph.graph<number> = Graph.cons_empty_graph();
	g = Graph.add_node(g,0);
	g = Graph.add_node(g,1);
	g = Graph.add_node(g,2);
	g = Graph.add_edge(g,0,1);
	g = Graph.add_edge(g,1,2);
	expect(Graph.find_node_index(g,0)).toBe(0);
	expect(Graph.find_node_index(g,1)).toBe(1);
	expect(Graph.find_node_index(g,2)).toBe(2);
    });
  
});
describe('Connected components suite',() => {
    test('TEST1',()=>{
	let g : Graph.graph<number> = Graph.cons_empty_graph();
	g = Graph.add_node(g,1);
	g = Graph.add_node(g,2);
	g = Graph.add_node(g,3);
	g = Graph.add_edge(g,1,2);
	const CC = Graph.getConnectedComponents(g);
	expect(CC.length).toBe(2);
	g = Graph.add_edge(g,2,3);
	const newCC = Graph.getConnectedComponents(g);
	expect(newCC.length).toBe(1);
    });
    test('TEST2',()=>{
	return undefined;
    });
    test('TEST2',()=>{
	return undefined;
    });
    test('TEST3',()=>{
	return undefined;
    });
    // more test to be added
});




