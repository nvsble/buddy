export const MAJOR = {
    UP: 1,
    DOWN: -1
}

export const MINOR = {
    LEFT: -1,
    AHEAD: 0,
    RIGHT: 1
}


export class Network {
    constructor(nodes, codes) {
        this.hallways = {};

        //Add information about each node(hallway) to memory.
        nodes.forEach(node => this.hallways[node.id] = new Node(node.id, node.branches, node.horizontal));
    }

    //Generate an optimum path between two nodes.
    genPath(fromID, fromMajor, toID, path = [fromID]) {

        //Base case, will fire once a suitable node is found.
        if (fromID == toID) {
            return {path: path, length: path.length}
        }

        //Get the current from node and start looking for candidate paths.
        const fromNode = this.hallways[fromID];
        let candidates = [];

        //Try to filter out branches in the opposite direction of motion to prevent U turns unless absolutely necessary.
        let filteredBranches = fromNode.branches.filter(b => b.major == fromMajor);
        if (filteredBranches.length == 0) {
            filteredBranches = fromNode.branches;
        }

        //Go through each branch and use it as a root for candidate path.
        for (let i = 0; i < filteredBranches.length; i++) {
            let branch = filteredBranches[i];

            //Prevent backtracking.
            if (!path.includes(branch.id)) {
                const updatedPath = [...path, branch.id];
                //Keep track of relative direction, whether up or down the hallway.
                //Necessary for guidance.
                let newDirection = 0;

                //This was needed to handle all exception cases for relative guidance.
                if (branch.minor == 0) {
                    newDirection = branch.major;
                } else {
                    if (branch.major == branch.minor) {
                        newDirection = MAJOR.UP;
                    } else {
                        newDirection = MAJOR.DOWN;
                    }
                    if (fromNode.horizontal) {
                        newDirection = -newDirection;
                    }
                }

                //Push the candidate.
                candidates.push(this.genPath(branch.id, newDirection, toID, updatedPath));
            }
        }
        //Look for the shortest candidate
        let min = {path: undefined, length: undefined};
        candidates.forEach(candidate => {
            if ((min.length == undefined && candidate.length != undefined || candidate.length < min.length) && candidate.path[candidate.path.length - 1] == toID) {
                min = candidate;
            }
        });
        if (min.path == undefined) {
            return min;
        } else {
            return min;
        }
    }
}

export class Node {
    constructor(id, branches, horizontal) {
        this.id = id;
        this.branches = branches;
        this.horizontal = horizontal;
    }
}
