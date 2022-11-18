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