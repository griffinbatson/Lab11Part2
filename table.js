var tablePromise = d3.json("classData.json");

var getImg = function(img){
    return "imgs/"+img.picture;
}
var quizMean = function(student){
    var allQuizes = student.quizes.map(function(quiz){
        return quiz.grade})
    return d3.mean(allQuizes).toFixed(2);
}
var homeworkMean = function(student){
    var allHomework = student.homework.map(function(homework){
        return homework.grade})
    return d3.mean(allHomework).toFixed(2)
}
var testMean = function(student){
    var allTests = student.test.map(function(test){
        return test.grade})
    return d3.mean(allTests).toFixed(2)
}
var final = function(student){
    var finalGrade = student.final.map(function(final){return final.grade})
    return d3.mean(finalGrade).toFixed(2)
}
var clearTable = function(){
    d3.selectAll("tbody tr")
    .remove();
}
var drawTable = function(students){
       var row = d3.select("tbody") 
        .selectAll("tr")
        .data(students)
        .enter()
        .append("tr");
        
        row.append("td")
            .append("img")
            .attr("class", "pic")
            .attr("src", getImg);
    
        row.append("td")
            .text(quizMean)
            .attr("class", "quiz");
    
        row.append("td")
            .text(homeworkMean)
            .attr("class", "hw");
    
        row.append("td")
            .text(testMean)
            .attr("class", "test");
        
        row.append("td")
            .text(final)
            .attr("class", "finalgrade")

}
var clearTable = function(){
    d3.selectAll("tbody tr")
    .remove();
}
var initHeaders = function(students){
    d3.select("#finalgrade")
    .on("click", function(){
        console.log("clicked quiz");
        students.sort(function(a,b){
            var av1 = final(a);
            var av2 = final(b);
            if(av1 < av2){return 1;}
            else if(av1 > av2) {return -1;}
            else {return 0;}
        });
        clearTable();
        drawTable(students)
        d3.selectAll(".finalgrade")
        .attr("class", "selected");
    });
}
var successFCN = function(students){
    console.log("data", students);
    drawTable(students);
    initHeaders(students)
 
}
var failFCN = function(errorMsg){
    console.log("Something went wrong", errorMsg);
    d3.selectAll("h1")
    .text("Something went wrong");

}

tablePromise.then(successFCN, failFCN);