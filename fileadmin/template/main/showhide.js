// Showhide.js
var check = false; 
var layerRef,styleSwitch;

function initsh() { 
check = true; 
if(document.getElementById) { 
layerRef="document.getElementByID"; 
styleSwitch=".style"; 
what="dom1"; }
else if (document.layers) { 
layerRef="document.layers"; 
styleSwitch=""; 
what ="ns4"; 
} 
else if(document.all) { 
layerRef="document.all"; 
styleSwitch=".style"; 
what ="ie4"; 
} 
else  
  check=false;
} 

// Toggles the layer visibility off 
function hideLayer(layerName) { 
if (!check) return;
if (what == "dom1")  
  document.getElementById(layerName).style.display="none"; 
else  
  eval(layerRef+'["'+layerName+'"]'+styleSwitch+'.display="none"'); 
} 

function layerWidth(layerName,wi) { 
if (!check) return;
if (what == "dom1") 
{
  if (!wi) wi="auto"; else wi=wi+"px";
  document.getElementById(layerName).style.width=wi; 
}
else  {
  if (!wi) wi="auto";
  eval(layerRef+'["'+layerName+'"]'+styleSwitch+'.width='+wi); 
}
} 

function MIOnLoad() {
  var Trudel= document.getElementById("textTrudel");
  var Dieter =document.getElementById("textDieter");
  if (Dieter || Trudel) {
    var IsTrudel=!(Trudel && Trudel.innerHTML=="");
    var IsDieter=!(Dieter && Dieter.innerHTML=="");
    if (!IsTrudel) hideLayer("textColTrudel");
    if (!IsDieter) hideLayer("textColDieter");
    var im = document.getElementById("mainImage");
    var colTrudel= document.getElementById("textColTrudel");
    var colDieter =document.getElementById("textColDieter");
    if (im) {
      var wi=630-im.width;
      var wipx=wi+"px";
      var ShortText= ((IsTrudel ? Trudel.innerHTML.length:0) +
                 (IsDieter ? Dieter.innerHTML.length:0)) < 5*wi;
      if (wi > 180 && ShortText) {
        if (IsTrudel) { colTrudel.style.width=wipx; colTrudel.style.marginLeft="5px";}
        if (IsDieter) {colDieter.style.width=wipx;  colDieter.style.marginLeft="5px";}
      }
      else {
        var tLength=Trudel.innerHTML.length;
        var dLength=Dieter.innerHTML.length;
        var TwoCol= (IsTrudel && IsDieter &&  Math.abs(tLength-dLength) <250);
        var HasImage = (IsDieter && Dieter.getElementsByTagName('img').length) ||
                       (IsTrudel && Trudel.getElementsByTagName('img').length) 
        var OneShort = !HasImage &&
                       (IsTrudel != IsDieter) && (
                       (IsTrudel && tLength < 550) ||
                       (IsDieter && dLength < 550)); 
        if (IsTrudel) 
          colTrudel.style.width=OneShort?"400px":(IsDieter && TwoCol)?"290px":"600px";
        if (IsDieter)
          colDieter.style.width=OneShort?"400px":(IsTrudel && TwoCol)? "290px":"600px";
      }
    }
  }
}

