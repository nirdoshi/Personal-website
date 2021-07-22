var text = $(".content-modified").text();

var i=0;
var j=0;
var next_substring="";

if(text.indexOf("```")!=-1){
  while(true){

     i=text.indexOf("```",i);
     j=text.indexOf("```",i+3);

    console.log(i + "," + j);

    if(i===-1 || j===-1){
        break;
    }else{
      inext=text.indexOf("```",j+3);
      //jnext=text.indexOf("```",inext+3);
      if(inext===-1){
         next_substring=text.substring(j+3,text.length-1);
      }else{
        next_substring=text.substring(j+3,inext);
      }

      substring = text.substring(i+3,j);
      text=text.replace(text.substring(i,j+3),"").trim();
      //$(".content-modified").text(text);
      $('.content-modified').before('<h1 class= text-dark>' + substring + '</h1>');
      $('.content-modified').before('<p class=wrap>'+ next_substring +'</p>');
      i=j+3;
    }

  }
  $('.content-modified').remove();
}



// var i = text.indexOf("```");
// var j= text.lastIndexOf("```");
// substring = text.substring(i+3,j);
//
// text=text.replace(text.substring(i,j+3),"");
// $(".content-modified").text(text);
// $('.content-modified').prepend('<h1 class= text-dark>' + substring + '</h1>');
//
// console.log(i+","+j+","+ substring);
// console.log(text);
// console.log(text.substring(i,j));
