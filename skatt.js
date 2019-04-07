//glöm inte ändra format på filerna i geany till UTF-8 annars blir de konstiga tecken!
//skattesatser-2019_2.csv
//KommunalaSkattesatser
//var data = new Array();
//KommunSkatt
var komSkattArray = new Array(); //2D array med all data kummunalskatt
var kommun_array = new Array();//array med bara kommuner kommunalskatt
var global_kommun ="";

//Lönesaktt - Sallary Taxes
var salaryTaxArray = new Array();
var salaryTaxArrayTabellNr = [];


function tMain(){
    //console.log("prtovtest");
    getDatan(makeKomTaxArray, "skattesatser-2019_2.csv");
    getDatan(makeSalaryTaxArray, "skattetabellermanad2019.csv");
    showSallaryButton(false);//hide button and textfield on salary page
    //makeKomTaxArray(data);

  }
//js-tutorials.com_sample_file.csv
//http://salongnobless.se/bokforing/KommunalaSkattesatser.csv
//var data = [];



//ISO-8859-1 - iso-8859-1
function getDatan(tfunc, t_url){

    var data = new Array();
    //console.log("getDatan");
    $.ajax({
      type: "GET",
      contentType: 'Content-type: text/plain; charset=UTF-8',
      url: t_url,
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
      //makeKomTaxArray(data);
      tfunc(data);

      }
    });
    //return data;
    //makeKomTaxArray(data);

  }

  //skriver ut htmltable med selected kommun dataset
  function createHtmlTable(t_array_table, t_divTableName){

    var myTableDiv = document.getElementById(t_divTableName);
    var t_tableheadings = new Array();
    t_tableheadings = t_array_table[0];


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

//-----------------------------------------------------------------------------
//KommunalSkatt
//--------------
function makeKomTaxArray(tdata){
//console.log("längd: " + tdata.length)
for (var i=0; i<tdata.length; i++){//tdata.length 1346
    //console.log(tdata[5]);

    //castar raden till String
    var trow = String(tdata[i]);
    //splitar Stringen till array[År;Församlings-kod;Kommun;Församling;Summa, inkl. kyrkoavgift;Summa, exkl. kyrkoavgift;Kommunal-skatt;Landstings-skatt;Begravnings-av]
    var telement = trow.split(";");
    //console.log(telement[2]);
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

  option = document.createElement("option");
  option.value = "Välj kommun";
  option.innerHTML = "Välj Kommun";
  option.selected = "true";
  option.disabled = "disabled";
  tselect.appendChild(option);

  for (var i = 0; i < kommun_array.length; i++) {
        option = document.createElement("option");
        var tkomun = kommun_array[i];
        option.value = tkomun;
        option.innerHTML = decodeURIComponent(unescape(tkomun));//unescape(encodeURIComponent(tkomun)); decodeURIComponent(escape(tkomun));
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

//-----------------------------------------------------------------------------
//MånadsLön
//--------------
function makeSalaryTaxArray(tdata){

    var t_tablenr="";

    tselect = document.getElementById("optionsalarytax");
    //<option selected="true" disabled="disabled">Choose Tagging</option>
    option = document.createElement("option");
    option.value = "Välj skattetabell";
    option.innerHTML = "Välj skattetabell";
    option.selected = "true";
    option.disabled = "disabled";
    tselect.appendChild(option);
    //console.log(tdata);

    for (var i=1; i<tdata.length; i++){//tdata.length 1346

        //komSkattArray.push(tdata[i].split(";"));
        //console.log(tdata[5]);



        //castar raden till String
        var trow = String(tdata[i]);
        //splitar Stringen till array[År;Församlings-kod;Kommun;Församling;Summa, inkl. kyrkoavgift;Summa, exkl. kyrkoavgift;Kommunal-skatt;Landstings-skatt;Begravnings-av]
        var telement = trow.split(",");
        //console.log(telement[2]);
        //skapar en array med bara Kommun
        if (t_tablenr != telement[2] && telement[2] != "3") {
          salaryTaxArrayTabellNr.push(telement[2]);//lägger till kommun
          //console.log(telement[2]);
          option = document.createElement("option");

          option.value = telement[2];
          option.innerHTML = telement[2];
          tselect.appendChild(option);


        }
        salaryTaxArray.push(telement);//lägger till rad med [kommunalskatt data]
        t_tablenr = telement[2];
        //console.log(komSkattArray[i][3]);


      }//end of forloop
      //kommun_array.sort();//sorterar kommuner
      //fillOptionSalaryTax();//fyller select optionkomuner

}

//skriverut skatten för lön för vald kommun i selected elementet
function selectSalaryTaxNr(t_findrow){
  //div id i html-kod
  var div_html_id = "salaryTaxutmatning";
  //Tömmer Div ellement från gammal visning
  document.getElementById(div_html_id).innerHTML = "";

  var t_valdsalarynr_array = new Array();//rader med data för vald kommun
  var tselectedSalNr = document.getElementById("optionsalarytax");//.selectedValue;

  //lägger till headings till html table
  var t_heading = new Array();
  t_heading[0] = "År";//0
  t_heading[1] = "TabellNr";//2
  t_heading[2] = "Inkomst fr.o.m.";//3
  t_heading[3] = "Inkomst t.o.m.";//4
  t_heading[4] = "Skatt under 65år";//5
  t_heading[5] = "Skatt fr.o.m 65år";//7


  t_valdsalarynr_array.push(t_heading);

  var t_tabnr_value =tselectedSalNr.options[tselectedSalNr.selectedIndex].value;

  for (var i=0; i < salaryTaxArray.length; i++){
    var t_row = salaryTaxArray[i];
    var t_newrowarray = new Array();


    if (t_tabnr_value == t_row[2] && t_findrow == false){// om flera rader för vald tabellnr ska visas
      //console.log(t_row);
      t_newrowarray[0] = t_row[0];//år
      t_newrowarray[1] = t_row[2];//tabell nr
      t_newrowarray[2] = t_row[3];// inkomst från och med
      t_newrowarray[3] = t_row[4];// inkomst till och med
      t_newrowarray[4] = t_row[5];//under 65
      t_newrowarray[5] = t_row[7];// från och med 65

      t_valdsalarynr_array.push(t_newrowarray);
      showSallaryButton(true);
    }

    else if (t_tabnr_value == t_row[2] && t_findrow == true){// om endast en rad för löneintervall ska skrivas ut

        var t_inputsalary = parseInt(document.getElementById("thesalary").value);
        //console.log(t_inputsalary);

        var t_salfrom = parseInt(t_row[3]);// inkomst från och med

        var t_salto = parseInt(t_row[4]);// inkomst från och med


       if (t_inputsalary <= t_salto){
          var t_rowBefore = salaryTaxArray[i]
          //console.log(t_salfrom);
          t_newrowarray[0] = t_rowBefore[0];//år
          t_newrowarray[1] = t_rowBefore[2];//tabell nr
          t_newrowarray[2] = t_rowBefore[3];// inkomst från och med
          t_newrowarray[3] = t_rowBefore[4];// inkomst till och med
          t_newrowarray[4] = t_rowBefore[5];//under 65
          t_newrowarray[5] = t_rowBefore[7];// från och med 65
          t_valdsalarynr_array.push(t_newrowarray);
          break;
      }
    }

  }//end of forllop

  createHtmlTable(t_valdsalarynr_array, "salaryTaxutmatning");


}//end selectSalaryTaxNr()

function showSallaryButton(t_status){
  //console.log("t_status: " + t_status);
  var t_button = document.getElementById("salarybutt");
  var t_tfield = document.getElementById("thesalary");

  if (t_status == false){

    divSallaryButton.style.visibility = 'hidden';

  }
  else {
    t_tfield.value = "0";
    divSallaryButton.style.visibility = 'visible';

  }
}// end of showSallaryButton()



//-----------------------------------------------------------------------------
//BokföraLön
//--------------
