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
            const deleteNode = (value, root = this.root) => {
                if(!root){
                    return root;
                } if(root.data > value){
                    root.left = deleteNode(value, root.left);
                } else if(root.data < value){
                    root.right = deleteNode(value, root.right);
                } else {
                    if(!root.left && !root.right){
                        return null;
                    } else if(!root.left){
                        return root.right;
                    } else if(!root.right){
                        return root.left;
                    } else {
                        root.data = (this.min(root.right)).data;
                        deleteNode(root.data, root.right);
                    }
                }
                return root;
            }

            this.root = deleteNode(value);
        },
        min(current = this.root){
            while(current.left){
                current = current.left;
            }
            return current;
        },
        max(current = this.root){
            while(current.right){
                current = current.right;
            }
            return current.data;
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
        height(val = this.root.data){
            const getHeight = node => {
                if(!node){
                    return
                }
                if(!node.left && !node.right){
                    return 1;
                } else {
                    let leftHeight = 1 + getHeight(node.left);
                    let rightHeight = 1 + getHeight(node.right);
                    return (leftHeight > rightHeight ? leftHeight : rightHeight);
                }
            }
            let node = this.find(val);
            return getHeight(node);
        },

        // Breadth First Search
        levelOrder(cb = null){
            let queue = [this.root];
            let arr = [];
            while(queue.length > 0){
                let node = queue[0];
                if(node.left != null){
                    queue.push(queue[0].left);
                } if(node.right != null){
                    queue.push(queue[0].right);
                }
                let remove = queue.shift();
                arr.push(remove.data);
            }
            // if(!cb){
            //     return arr;
            // } else {
            //     arr.forEach(val => {
            //         cb(val);
            //     })
            //     return arr;
            // }
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