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
  tselect = document.getElementById("optionkommuner");

  for (var i = 0; i < kommun_array.length; i++) {
        option = document.createElement("option");
        var tkomun = kommun_array[i];
        option.value = tkomun;
        option.innerHTML = decodeURIComponent(unescape(tkomun));//unescape(encodeURIComponent(tkomun)); decodeURIComponent(escape(tkomun))
        tselect.appendChild(option);
    }
}//end of fillOptionkomuner


//skriverut skattestsen för vald kommun i selected elementet
function selectedKommun(){
  //div id i html-kod
  var div_html_id = "KomSkattutmatning";
  //Tömmer Div ellement från gammal visning
  document.getElementById(div_html_id).innerHTML = "";

  var t_valdkommun_array = new Array();//rader med data för vald kommun
  var tselectedkommun = document.getElementById("optionkommuner");//.selectedValue;

  //lägger till headings till html table
  var t_heading = new Array();
  t_heading[0] = "År";
  t_heading[1] = "FörsamlingsKod";
  t_heading[2] = "Kommun";
  t_heading[3] = "Församling";
  t_heading[4] = "SummaInkKyrkAvgift";
  t_heading[5] = "SummaExkKyrkAvgift";
  t_heading[6] = "KommunalSkatt";
  t_heading[7] = "LandstingsSkatt";
  t_heading[8] = "BegravningsAvg";
  t_heading[9] = "KyrkoAvg";

  t_valdkommun_array.push(t_heading);

  //if (tselectedkommun.selectedIndex == -1)
    //    return null;

  var tkommun_value =tselectedkommun.options[tselectedkommun.selectedIndex].value;

  for (var i=0; i < komSkattArray.length; i++){
    var t_row = komSkattArray[i];

    if (tkommun_value == t_row[2]){
      //console.log(t_row[2]);
      t_valdkommun_array.push(t_row);
    }

  }//end of forllop

  createHtmlTable(t_valdkommun_array, div_html_id);


}//end selectedkommun()


//skriver ut htmltable med selected kommun dataset
function createHtmlTable(t_array_table, t_divTableName){

  var myTableDiv = document.getElementById(t_divTableName);
  var t_tableheadings = new Array();
  t_tableheadings = t_array_table[0];

/*  for (var i=0; i<t_array_table.length; i++){
    var t_row = t_valdkommun_array[i];
    console.log(t_row[3]);
  }*/

  try{

    var table = document.createElement('TABLE')
    var tableJhaed = document.createElement('THEAD')
    var tableBody = document.createElement('TBODY')

    //TABLE COLUMNS
    table.border = '1';
    table.align = 'center';
    

    table.appendChild(tableJhaed);
    var tr = document.createElement('TR');
    tableJhaed.appendChild(tr);

    for (i = 0; i < t_tableheadings.length; i++) {
        var th = document.createElement('TH')

        th.appendChild(document.createTextNode(t_tableheadings[i]));
        tr.appendChild(th);
    }

    table.appendChild(tableBody);
    //TABLE ROWS

    for (i = 1; i < t_array_table.length; i++) {
        var tr = document.createElement('TR');
        tableBody.appendChild(tr);

        //console.log(i +": ");
        for (j = 0; j < t_array_table[i].length; j++) {

            var td = document.createElement('TD')

            if (j==1)
              td.align = 'left';

            td.appendChild(document.createTextNode(t_array_table[i][j]));
            tr.appendChild(td);
        }
        //table.appendChild(tr);
    }

  myTableDiv.appendChild(table)
}//end try
catch(err){
alert("Fel: " + err);
}

}//end of function createHtmlKommunTable()
