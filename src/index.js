function eval() {
    // Do not use eval!!!
    return;
}

    function expressionCalculator(expr) {
    expr = expr.trim()
    let arr= expr.split(' ');
    if (arr[0]=="") arr.splice(0, 1);
    if (arr[0]=="") arr.splice(-1, 1);
    let preresult=0;
    for(let i=0; i<arr.length; i++) {
        if(arr[i].search(/\d/)==!-1) arr[i]=Number(arr[i])
    }
    let i=0;
    while(i<arr.length) {
        if(arr[i]=="*") {
            preresult=arr[i-1]*arr[i+1];
            arr.splice(i-1,3,preresult);
            i--;
        } else if(arr[i]=="/") {
            if(arr[i+1]==0) throw  new  Error("TypeError: Division by zero.");
            preresult=arr[i-1]/arr[i+1];
            arr.splice(i-1,3,preresult);
            i--;
        } else i++;
    }
    let j=0;
    while(j<arr.length) {
        if(arr[j]=="+") {
            preresult=arr[j-1]+arr[j+1];
            arr.splice(j-1,3,preresult);
            j--;
        } else if(arr[j]=="-") {
            if(arr[j+1]==0) throw  new  Error("TypeError: Division by zero.");
            preresult=arr[j-1]-arr[j+1];
            arr.splice(j-1,3,preresult);
            j--;
        } else j++;
    }
    return Number(arr.join());
}

module.exports = {
    expressionCalculator
}