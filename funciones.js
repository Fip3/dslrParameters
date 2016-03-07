// Clear (Reset) the form 

function clearForm(oForm) {
    
  var elements = oForm.elements; 
    
  oForm.reset();

  for(i=0; i<elements.length; i++) {
      
	field_type = elements[i].type.toLowerCase();
	
	switch(field_type) {
	
		case "text": 
		case "password": 
		case "textarea":
	        case "hidden":	
			
			elements[i].value = ""; 
			break;
        
		case "radio":
		case "checkbox":
  			if (elements[i].checked) {
   				elements[i].checked = false; 
			}
			break;

		case "select-one":
		case "select-multi":
            		elements[i].selectedIndex = -1;
			break;

		default: 
			break;
	}
    }
}

// only numbers in the textfield 
// copyright 1999 Idocs, Inc. http://www.idocs.com
// Distribute this script freely but keep this notice in place
function numbersonly(myfield, e, dec)
{
var key;
var keychar;

if (window.event)
   key = window.event.keyCode;
else if (e)
   key = e.which;
else
   return true;
keychar = String.fromCharCode(key);

// control keys
if ((key==null) || (key==0) || (key==8) || 
    (key==9) || (key==13) || (key==27) )
   return true;

// numbers
else if ((("0123456789.-").indexOf(keychar) > -1))
   return true;

// decimal point jump
else if (dec && (keychar == "."))
   {
   myfield.form.elements[dec].focus();
   return false;
   }
else
   return false;
}

// On click clear text field. Add: onFocus="clearDefault(this)" to the textfield in the html
function clearDefault(a){if(a.defaultValue==a.value){a.value=""}};

//START Flux converter

function applyInputStyles(id) {
  var i = 0;
    for (; i < document.forms.length; i++ ) {
        if ( document.forms[ i ].name == id ) break;
    }

    var el = document.forms[ i ];  
    if ( el == null ) return;
    
    for ( i = 0; i < el.elements.length; i++ ) {
        var input = el.elements[ i ];
        
        if ( input.type == "text" ) {
            if ( !input.readOnly ) {
                input.onmouseover = function() { this.style.border = "1px solid red"; };
                input.onmouseout = function() { this.style.border = "1px solid #666"; };
                
                input.onfocus = function() { this.style.background = "#ee7"; };
                input.onblur = function() { this.style.background = "#fff"; };
                
                //input.onkeydown = function() { return tab(this, event.keyCode, event.which); };
            } else {
                input.style.background = "#ddd";
            }
        }
    }
}

function toDecimalz(m,n){
    n=(isNaN(n))?
        2:
        n;
  
 n1 = n;
    var nT=Math.pow(10,n);
    var s = (isNaN(m))?
        m:
        (new String(
            Math.round(m*nT)/nT
        ));
 
 if ( n > 0 ) {
  var pos = s.indexOf( "." );
  if ( pos == -1 ) {
   s += ".";
   pos = s.length;
  }
  
  for ( i = 0; i <= n - (s.length - pos); i++ ) s += "0";
 }
 
 return s;
}

function formatL(l){
if (l < 1){	
		
		return toDecimalz(l,3)
		} else if (l < 10) {
		return toDecimalz(l,2)
		} else if (l <100) {
		return toDecimalz(l,1)
		} else {
		return Math.round(l)
		}	
}

function sf1(id,n,val){
 var mform = "getinfo1";
 eval("document." + mform + "." + id + n).value = formatL(val);
}

function convertFlux(n) {
 var lmh  = eval("document.getinfo1.lmh" + n + ".value")*1;
 var gfd  = eval("document.getinfo1.gfd" + n + ".value")*1;
 var gal = 0.588;
 var lit = 0.179;

if (lmh>0) {
	sf1("gfd",n,(lmh*gal));
	return;
	}
if (gfd>0) {
	sf1("lmh",n,(gfd/gal));
	lmh  = eval("document.getinfo1.lmh" + n +".value")*1;
	return;
	}
}

function sf2(id,n,val){
 var mform = "getinfo2";
 eval("document." + mform + "." + id + n).value = formatL(val);
}

function convertFluxVol(n) {
 var lmh = eval("document.getinfo2.lmh" + n +".value")*1;
 var fa  = eval("document.getinfo2.fa" + n + ".value")*1;
 var mlm = eval("document.getinfo2.mlm" + n + ".value")*1;


if (lmh>0 && fa>0 && mlm == 0) {
	sf2("mlm",n,((lmh*fa)*1000)/60) ;
	return;
	}
else if (fa>0 && mlm>0 && lmh == 0) {
	sf2("lmh",n,(((mlm/1000)*60)/fa)) ;
	return;
	}
else if (mlm>0 && lmh>0 && fa == 0) {
	sf2("fa",n,(((mlm/1000)*60)/lmh));
	return;
	}
else {
alert("You need to provide any two values, to calculate.");
	}
}
// END Flux converter
