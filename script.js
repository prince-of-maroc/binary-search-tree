function NodeFactory(data, left = null, right = null){
    return {
        data,
        left,
        right
    }
}

function createBalancedTree(arr){
    if(arr.length > 0){
        let mid = Math.floor(arr.length/2);
        return NodeFactory(arr[mid], createBalancedTree(arr.slice(0,mid)), createBalancedTree(arr.slice(mid, arr.length-1)));
    }
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
