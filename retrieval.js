var retrievalPromise = d3.json("classData.json");

var successFCN = function(allStudents){
    console.log(allStudents);
    d3.selectAll("body")
    .text("students");
}

var failFCN = function(errorMsg) {
    console.log("Something went wrong",errorMsg);
    d3.selectAll("body")
    .text("Something went wrong");
}

retrievalPromise.then(successFCN,failFCN);
