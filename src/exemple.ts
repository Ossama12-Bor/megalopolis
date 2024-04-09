type graph={
	x:number;
	y:number;
};
function change(A:graph[]){
	const NEW_A:graph[]=structuredClone(A);
	NEW_A[0].x=16;
	return NEW_A;
}
const graphe:graph[]=[{x:1,y:2},{x:5,y:6}];
console.log(change(graphe));
console.log(graphe);
console.log("heel");