function NodeFactory(data, left = null, right = null){
    return {
        data,
        left,
        right
    }
}

function BSTFactory(arr){
    return {
        // root: createBalancedTree([...new Set(arr.sort(function(a, b){return (a-b)}))]),
        root: createBalancedTree(arr),
        count: arr.length,

        display(){
            prettyPrint(this.root);
        },
        insert(){
            //
        },
        delete(){
            //
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
        }
    }
}

function createBalancedTree(arr, start = 0, end = arr.length-1){
    if(start > end) return null
    let mid = parseInt((start+end)/2);
    return NodeFactory(arr[mid], createBalancedTree(arr, start, mid-1), createBalancedTree(arr, mid+1, end));
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

let arr = [1,2,3,4,5,6,7,8];
let myTree = BSTFactory(arr);

console.log(myTree.max());
myTree.display();