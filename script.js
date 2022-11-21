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
        height(node = this.root){
            const getHeight = node => {
                if(!node){
                    return 0;
                } else if(!node.left && !node.right){
                    return 1;
                } else {
                    let leftHeight = 1 + getHeight(node.left);
                    let rightHeight = 1 + getHeight(node.right);
                    return (leftHeight > rightHeight ? leftHeight : rightHeight);
                }
            }
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
            if(!cb){
                console.log(arr);
                return arr
            } else {
                return cb(arr);
            }
        },
        
        // Depth First Search
        inOrder(cb = null){
            let arr = [];
            const traverse = root => {
                if(root.left) traverse(root.left);
                arr.push(root.data);
                if(root.right) traverse(root.right);
            }
            traverse(this.root)
            if(!cb){
                console.log(arr);
                return arr;
            } else {
                return cb(arr);
            }
        },
        preOrder(cb = null){
            let arr = [];
            const traverse = root => {
                arr.push(root.data)
                if(root.left) traverse(root.left);
                if(root.right) traverse(root.right);
            }
            traverse(this.root);
            if(!cb){
                console.log(arr);
                return arr
            } else {
                return cb(arr);
            }
        },
        postOrder(cb = null){
            let arr = [];
            const traverse = root => {
                if(root.left) traverse(root.left);
                if(root.right) traverse(root.right);
                arr.push(root.data)
            }
            traverse(this.root);
            if(!cb){
                console.log(arr);
                return arr
            } else {
                return cb(arr);
            }
        },

        isBalanced(root = this.root){
            if (!root) return;
            let leftHeight = this.height(root.left);
            let rightHeight = this.height(root.right);
            let diff = Math.abs(leftHeight - rightHeight);
            return diff < 1;
        },
        rebalance(){
            let arr = this.inOrder();
            console.log(arr)
            this.root = buildTree(arr)
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

let randomArr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
let binaryTree = BSTFactory(randomArr);
console.log(`Binary tree is balanced: ${binaryTree.isBalanced()}`);
binaryTree.display();
binaryTree.preOrder();

binaryTree.insert(24);
binaryTree.insert(25);
binaryTree.insert(26);
binaryTree.insert(27);
binaryTree.display();
console.log(`Binary tree is balanced: ${binaryTree.isBalanced()}`);

binaryTree.rebalance();
binaryTree.display();
console.log(`Binary tree is balanced: ${binaryTree.isBalanced()}`);
binaryTree.preOrder();
binaryTree.inOrder();
