//glöm inte ändra format på filerna i geany till UTF-8 annars blir de konstiga tecken!
//skattesatser-2019_2.csv
//KommunalaSkattesatser
function tTest(){
    console.log("prtovtest");
  }
//js-tutorials.com_sample_file.csv
//http://salongnobless.se/bokforing/KommunalaSkattesatser.csv
var data = [];
var komSkattArray = new Array(); //2D array med all data kummunalskatt
var kommun_array = new Array();//array med bara kommuner kommunalskatt
var global_kommun ="";
//ISO-8859-1 - iso-8859-1
function getDatan(){
console.log("getDatan");
    $.ajax({
      type: "GET",
      contentType: 'Content-type: text/plain; charset=UTF-8',
      url: "skattesatser-2019_2.csv",
      dataType: "text",
      // This is the imporant part!!!
      //beforeSend: function(jqXHR) {
        //jqXHR.overrideMimeType('text/html;charset=iso-8859-1');
      //}
      success: function(response)
      {
      data = $.csv.toArrays(response);
      //console.log(data[10]);
      //generateHtmlTable(data);
      makeKomTaxArray(data);
      }
    });

    //makeKomTaxArray(data);
  }

function makeKomTaxArray(tdata){
console.log("längd: " + tdata.length)
for (var i=0; i<tdata.length; i++){//tdata.length 1346

    //komSkattArray.push(tdata[i].split(";"));
    //console.log(tdata[5]);

    //castar raden till String
    var trow = String(tdata[i]);
    //splitar Stringen till array[År;Församlings-kod;Kommun;Församling;Summa, inkl. kyrkoavgift;Summa, exkl. kyrkoavgift;Kommunal-skatt;Landstings-skatt;Begravnings-av]
    var telement = trow.split(";");
    console.log(telement[2]);
    //skapar en array med bara Kommun
    if (global_kommun != telement[2]){
      kommun_array.push(telement[2]);//lägger till kommun
      //console.log(telement[2]);

    }
    komSkattArray.push(telement);//lägger till rad med [kommunalskatt data]
    global_kommun = telement[2];
    //console.log(komSkattArray[i][3]);


  }//end of forloop
  kommun_array.sort();//sorterar kommuner
  fillOptionkomuner();//fyller select optionkomuner
}//end of makeKomTaxArray()

function fillOptionkomuner(){
  tselect = document.getElementById("optionkomuner");

  for (var i = 0; i < kommun_array.length; i++) {
        option = document.createElement("option");
        var tkomun = kommun_array[i];
        option.value = tkomun;
        option.innerHTML = decodeURIComponent(unescape(tkomun));//unescape(encodeURIComponent(tkomun)); decodeURIComponent(escape(tkomun))
        tselect.appendChild(option);
    }
}
