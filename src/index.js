function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    let openBrackets=0;
    let closeBrackets=0;
    let inBrackets=[];
    for (let i=0; i<expr.length; i++) {
        if(expr[i].search(/\)/)==!-1) openBrackets++;
        if(expr[i].search(/\(/)==!-1) closeBrackets++;
    } //считаю скобки
    if(openBrackets!=closeBrackets) {
        throw new Error('ExpressionError: Brackets must be paired');
    } //непарные скобки
    expr = expr.trim()
    let arr= expr.split(' ');
    let preresult=0;
    let k=0;
    while(k<arr.length) {
        if(arr[k]=='') {
            arr.splice(k,1);
        } else k++;
    } //убираю пустые элементы массива
    for(let i=0; i<arr.length; i++) {
        if(arr[i].search(/\d/)==!-1) arr[i]=Number(arr[i]) //перевод операндов в числа
    }
    let openBracket=arr.indexOf('(')
    let closeBracket=arr.indexOf(')')//ищу индекс открытой и закрытой скобки
    inBrackets=arr.slice(openBracket,closeBracket+1)//извлекаю массив элементов которые были в скобках (если есть)
    if (inBrackets.length){ //работа с массивом InBrackets
        arr.splice(openBracket,closeBracket-openBracket+1)//извлекаю из главного массива элементы которые будут считаться в скобках
        inBrackets.splice(0,1);
        inBrackets.splice(-1,1);//убираю скобки из массива
        let q=0;
        while(q<inBrackets.length) { //считаю скобки
            if(inBrackets[q]=="*") {
                preresult=inBrackets[q-1]*inBrackets[q+1];
                inBrackets.splice(q-1,3,preresult);
                q=0;
            } else if(inBrackets[q]=="/") {
                if(inBrackets[q+1]==0) throw  new  Error("TypeError: Division by zero.");//деление на 0
                preresult=inBrackets[q-1]/inBrackets[q+1];
                inBrackets.splice(q-1,3,preresult);
                q=0;
            } else q++;
        }
        let w=0;
        while(w<inBrackets.length) {
            if(inBrackets[w]=="+") {
                preresult=inBrackets[w-1]+inBrackets[w+1];
                inBrackets.splice(w-1,3,preresult);
                w=0;
            } else if(inBrackets[w]=="-") {
                preresult=inBrackets[w-1]-inBrackets[w+1];
                inBrackets.splice(w-1,3,preresult);
                w=0;
            }   else w++;
        }   
        arr.splice(openBracket,0,preresult)    //вставляю результат из скобок в общий массив 
    }
    
    let i=0;
    while(i<arr.length) {//считаю главный массив
        if(arr[i]=="*") {
            preresult=arr[i-1]*arr[i+1];
            arr.splice(i-1,3,preresult);
            i--;
        } else if(arr[i]=="/") {
            if(arr[i+1]==0) throw  new  Error("TypeError: Division by zero.");//деление на 0
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
            if(arr[j+1]==0);
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