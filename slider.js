//---- follow - Zeug
//[Performance]
var menu;
var menu_X_start;
var menu_X_stop;
var pos;
var pos_top;
var follow;
var follow_lis;
//[/Performance]

var timeOutID = 0;
var followZiel = 0;
var followPosition = 0;

//[benutzte Divs]
var slideOver = "blue_menu_list";
var slideBg = "followDiv";
var usedSpace = "index_benutzter_Bereich";
//[benutzte Divs]

function initialisiereSlider(){
	    //---------------------------------------------------------- menu_letztesTop befuellen
    	menu_letztesTop = document.getElementById(slideOver).getElementsByTagName("a")[0].offsetTop;
		//----------------------------------------------------------  followDiv aktivieren / anzeigen
	    document.getElementById(slideBg).style.display = "block";
		window.document.onmousemove = checkMouseArea;
		
		/*
alert(document.getElementById("index_benutzter_Bereich").offsetLeft);
		alert(document.getElementById(slideOver).offsetLeft);
*/
}

function mouse_pos(e) {
        if(!e) e = window.event;
        var body = (window.document.compatMode && window.document.compatMode == "CSS1Compat") ? 
		window.document.documentElement : window.document.body;
        return {
        // Position im Dokument
        top: e.pageY ? e.pageY : e.clientY + body.scrollTop - body.clientTop,
        left: e.pageX ? e.pageX : e.clientX + body.scrollLeft  - body.clientLeft
        };
}
 
//-------------------------------------------------------------------------------------- Slider

function followRaster(startVar, stopVar){
        this.start = startVar;
        this.stop = stopVar;
}

function checkMouseArea(e){                             
        //Daten des menu ermitteln
        if(menu == null){
                menu = document.getElementById(slideOver);
        }

        menu_X_start = document.getElementById(usedSpace).offsetLeft;
		//menu_X_start = document.getElementById(slideOver).offsetLeft;
        menu_X_stop = menu_X_start + menu.offsetWidth;

        //Mausposition zurecht rechnen
        pos = mouse_pos(e);
        pos_top = pos.top - menu.offsetTop;    
                                                        
        //Maus innerhalb menu
        if((menu_X_start <= pos.left) && (pos.left <= menu_X_stop)){                       
                //Daten der Listenpunkte ermitteln      <- nur bei der ersten Mal
                if(follow_lis == null){
                        var menu_lis = menu.getElementsByTagName("li");               
                        follow_lis = new Array();
                        
                        for(var i1=0, l=menu_lis.length; i1<l; i1++){
                                        var start = menu_lis[i1].offsetTop;                        
                                        var stop = menu_lis[i1].offsetTop + menu_lis[i1].offsetHeight;
                                        
                                        var Raster = new followRaster(start, stop);
                                        
                                        follow_lis.push(Raster);        
                        }       
                }                       
                
                //Listenpunkte durchgehen
                for(var i=0, l=follow_lis.length; i<l; i++){               
                        //Maus auf einem Listenpunkt = Link
                        if((follow_lis[i].start < pos_top) && (pos_top < follow_lis[i].stop)){
                                //Maus steht nicht mehr auf dem selben Punkt
                                if(followZiel != follow_lis[i].start){
									    //also das Ziel neuberechnen und überprüfen, der slider mit muss
                                        followZielNeu = follow_lis[i].start;
                                        pruefeMalen(true);      
                                }
                                break;
                        }
                }
        }else{ //Maus ausserhalb des menu      
                //aktuelle Position des FollowDivs ungleich letztesZiel menu_letztesTop;
                if(followPosition != menu_letztesTop){     
                        followZiel = menu_letztesTop;
                        drawFollower();
                }else{
                        //alert("Ziel erreicht: followPosition: " + followPosition);
                }
        }
}

function pruefeMalen(bool){     
        if(bool){
                if(timeOutID == 0){               
                        timeOutID = setTimeout("pruefeMalen(false)", 750);
                        followZiel = followZielNeu;                     
                }
        }else{
                followZiel = followZielNeu;                             
                drawFollower(); 
                timeOutID = 0;                  
        }       
}

function drawFollower(){
        if(followPosition != followZiel){
                var pixelSchritt = 2;
                if(followPosition > followZiel)
                        followPosition -= pixelSchritt;
                else
                        followPosition += pixelSchritt;
                
                if(follow == null){
                        follow = document.getElementById(slideBg);
                }               
                
                follow.style.top = followPosition + "px";       
                
                setTimeout("drawFollower()",10);
        }else{
                //nix tun               
        }
}

//-------------------------------------------------------------------------------------- /Slider
