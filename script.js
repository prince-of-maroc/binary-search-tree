function NodeFactory(data, left = null, right = null){
    return {
        data,
        left,
        right
    }
}

function BSTFactory(arr){
    return {
        root: buildTree([...new Set(arr.sort((x,y)=>x-y))]),
        count: arr.length,

        display(){
            prettyPrint(this.root);
        },
        insert(value, current = this.root){
            let newNode = NodeFactory(value);
            if(value == current.data){
                return null;
            } else if(value < current.data){
                if(!current.left){
                    current.left = newNode;
                } else {
                    this.insert(value, current.left);
                }
            } else if(value > current.data){
                if(!current.right){
                    current.right = newNode;
                } else {
                    this.insert(value, current.right);
                }
            }
        },
        delete(value){
            let node = this.find(value);
            if(node){ // If node exists
                let parent = this.getParent(node);
                if(!node.left && !node.right){ // Leaf Node Case
                    if(parent.leftBranch){
                        parent.node.left = null;
                    } else {
                        parent.node.right = null;
                    }
                } else if(node.left && node.right){ // Parent Node with two children branch case
                    //
                } else if(node.left || node.right){ // Parent node with one child branch case
                    //
                }
            }
        },
        getParent(node){
            let current = this.root;
            if(node == this.root){
                console.log("Root has no parents");
                return null
            } else {
                while(current.left || current.right){
                    if(current.left == node){
                        return {
                            node: current,
                            leftBranch: true
                        }
                    } else if(current.right == node){
                        return {
                            node: current,
                            leftBranch: false
                        }
                    } else {
                        if(current.data > node.data){
                            current = current.left;
                        } else {
                            current = current.right;
                        }
                    }
                }
                return null;
            }
        },
        min(){
            let current = this.root;
            while(current.left){
                current = current.left;
            }
            return current.data;
        },
        max(){
            let current = this.root;
            while(current.right){
                current = current.right;
            }
            return current.data;
        },
        size(){
            return this.count;
        },
        find(val){
            let current = this.root;
            while(current){
                if(current.data == val){
                    return current;
                } else if(current.data > val){
                    current = current.left;
                } else {
                    current = current.right;
                }
            }
            return null;
        },
        depth(val){
            let current = this.root;
            let depth = 0;
            while(current){
                if(current.data == val){
                    break;
                } else if(current.data > val){
                    depth++
                    current = current.left;
                } else {
                    depth++
                    current = current.right;
                }
            }
            return depth;
        },
        height(val){
            //
        },

        // Breadth First Search
        levelOrder(cb = null){
            if(!cb){
                // return levelOrder array
            } else {
                // apply callback function to nodes in levelorder
            }
        },
        
        // Depth First Search
        inOrder(cb = null){
            if(!cb){
                // return inOrder array
            } else {
                // apply callback function to nodes
            }
        },
        preOrder(cb = null){
            if(!cb){
                // return preOrder array
            } else {
                // apply callback function to nodes
            }
        },
        postOrder(cb = null){
            if(!cb){
                // return postOrder array
            } else {
                // apply callback function to nodes
            }
        },

        isBalanced(){
            //
        },
        rebalance(){
            //
        }
    }
}

function buildTree(arr, start = 0, end = arr.length-1){
    if(start > end) return null
    let mid = parseInt((start+end)/2);
    return NodeFactory(arr[mid], buildTree(arr, start, mid-1), buildTree(arr, mid+1, end));
}


const prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
}