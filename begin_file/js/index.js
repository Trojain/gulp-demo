function demo(){
    return {"name":"张三","age":21}
}
var {name,age} = demo();

let str = `我叫 ${name}，今年${age}`

$('#box2').html(str);
