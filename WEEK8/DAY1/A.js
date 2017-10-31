let sum = (...ag) => {
    return eval(ag.join("+"))
};

let product = (...ag) => {
    return eval(ag.join("*"))
};

// module.exports.sum=sum;
// module.exports.product=product;
//批量化导出
module.exports = {
    sum: sum,
    product: product
};
