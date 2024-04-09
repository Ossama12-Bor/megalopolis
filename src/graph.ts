/* Graph module */

/* type for graph node (manipulated after with label)*/
type graphNode<T> = {
    label : T,
    neighbors : graphNode<T>[]
};

/* type representing a generic graph */
type graph<T> = graphNode<T>[];

/* empty graph constructor*/
function cons_empty_graph<T>() : graph<T> {
    let g : graph<T> = [];
    return g;
}

/* empty node constructor */
function cons_empty_node<T>(label : T){
    let n : graphNode<T> = {label : label, neighbors : []};
    return n;
}

/* calculates graph s number of nodes */
function graph_length<T>(g : graph<T>) : number {
    return g.length;
}

/* adds a new node to graph*/
function add_node<T>(g : graph<T>, label : T) : graph<T> {
    return [...g, cons_empty_node(label)];
}


/* given the label , finds index of corresponding node (-1 if not)*/
function find_node_index<T>(g : graph<T>, label : T) : number {
    return g.findIndex(node => node.label === label);
}

/* given label, returns the structure itself */
function find_node_with_label<T>(g : graph<T>,label : T) : graphNode<T> {
    return g[find_node_index(g,label)];
}

/* adds an edge to the graph */
function add_edge<T>(g : graph<T>, l1 : T, l2 : T) : graph<T> {
    const n1 = find_node_with_label<T>(g,l1);
    const n2 = find_node_with_label<T>(g,l2);
    const updated_n1 : graphNode<T> = {label : n1.label, neighbors : [...n1.neighbors, n2]};
    const updated_n2 : graphNode<T> = {label : n2.label, neighbors : [...n2.neighbors, n1]};
    const index1 = find_node_index(g,l1);
    const index2 = find_node_index(g,l2);
    return g.map((node,index) => index === index1 ? updated_n1 : index === index2 ? updated_n2 : node);
}


/* function to display the graph (to be improved)*/
function display_graph<T>(g : graph<T>){
    g.forEach((node) =>
	{
	    console.log(node.label ," : ");
	    node.neighbors.forEach((neighbor)=> {
		console.log(neighbor.label)
	    });
			});
}

/* DFS search ,returns component of starting node */
function dfs<T>(
  graph: graph<T>,
    visitedNodes: Set<number>,
    currentNodeLabel : T,
  component: T[]
): T[] {
    const currentNodeIndex = find_node_index(graph,currentNodeLabel);
    visitedNodes.add(currentNodeIndex);
  component.push(currentNodeLabel);

    for (const neighbor of graph[currentNodeIndex].neighbors) {
	const neighborLabel = neighbor.label;
      const neighborIndex = find_node_index(graph,neighborLabel);
    if (!visitedNodes.has(neighborIndex)) {
      dfs(graph, visitedNodes, neighborLabel, component);
    }
  }
  return component;
}

/* Returns the CC of a graph */
function getConnectedComponents<T>(graph: graph<T>): T[][] {
  const visitedNodes = new Set<number>();
  const connectedComponents: T[][] = [];

  for (let i = 0; i < graph.length; i++) {
    if (!visitedNodes.has(i)) {
      const component: T[] = [];
      connectedComponents.push(dfs(graph, visitedNodes, graph[i].label, component));
    }
  }
  return connectedComponents;
}

// let g : graph<number> = cons_empty_graph();
// let n0 : graphNode<number> = cons_empty_node(0);
// let n1 : graphNode<number> = cons_empty_node(1);
// let n2 : graphNode<number> = cons_empty_node(2);
// g = add_node(g,0);
// g = add_node(g,1);
// g = add_node(g,2);
// display_graph(g);
// g = add_edge(g,0,1);
// display_graph(g);
// g = add_edge(g,0,2);
// display_graph(g);



export
{
    graphNode,
    graph,
    cons_empty_graph,
    cons_empty_node,
    graph_length,
    add_node,
    add_edge,
    display_graph,
    find_node_index,
    find_node_with_label,
    dfs,
    getConnectedComponents
}
