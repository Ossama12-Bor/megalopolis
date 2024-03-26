enum streetKinds {
    PARC = 1,
    INDUSTRIAL = 2,
    ROAD = 3,
    RESIDENTIAL = 4
};

enum roadDirections {
    N = 0,
    E = 1,
    S = 2,
    W = 3
};

type road_t = {directions : Array<roadDirections>};

type street = {
    kind : streetKinds;
    x : number | undefined ;
    y : number | undefined ;
}

