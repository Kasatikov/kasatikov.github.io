//all comments in English :))
function getNumbers(min_lim_a, max_lim_a, min_lim_ab, max_lim_ab) {
    var gen_segment_b, result;
    gen_segment_b = [];
    result = [];
    var gen_a = Math.floor(Math.random() * (max_lim_a - min_lim_a + 1) + min_lim_a);
    gen_segment_b.push(min_lim_ab - gen_a, max_lim_ab - gen_a);
    var gen_b = Math.floor(Math.random() * (gen_segment_b[1] - gen_segment_b[0] + 1) + gen_segment_b[0]);
    result.push(gen_a,gen_b,gen_a + gen_b);
    return result;
  } 
  // getNumbers constructs random a,b numbers with some restrictions that were specified in the task and returns an array [a, b, a + b] 
  

 function animationCurve(canvas_context, x0, y0, x1, y1, x2, y2, duration, id, arrow_position) {

    var start = null;
    
    var step = function animationCurveStep(timestamp) {
        if (start === null)
            start = timestamp;
        
        var delta = timestamp - start,
            progress = Math.min(delta / duration, 1);
        
        
        canvas_context.clearRect(0, 0, canvas_context.canvas.width, canvas_context.canvas.height);
        
        
        splitCurve(canvas_context, x0, y0, x1, y1, x2, y2, 0, progress, id, arrow_position);

        
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    
    window.requestAnimationFrame(step);
}


function splitCurve(canvas_context, x0, y0, x1, y1, x2, y2, t0, t1, id, arrow_position) {


    canvas_context.lineWidth = 2;
    canvas_context.strokeStyle = "#ae578a";     
    canvas_context.beginPath();
    
  if( 0.0 == t0 && t1 == 1.0 ) {

      
    canvas_context.moveTo( x0, y0 );
    canvas_context.quadraticCurveTo( x1, y1, x2, y2 );
    $("#" + id).css({"left": arrow_position + "px","display":"block"});

  } else if( t0 != t1 ) {

        var t00 = t0 * t0,
            t01 = 1.0 - t0,
            t02 = t01 * t01,
            t03 = 2.0 * t0 * t01;
        
        var nx0 = t02 * x0 + t03 * x1 + t00 * x2,
            ny0 = t02 * y0 + t03 * y1 + t00 * y2;
        
        t00 = t1 * t1;
        t01 = 1.0 - t1;
        t02 = t01 * t01;
        t03 = 2.0 * t1 * t01;
        
        var nx2 = t02 * x0 + t03 * x1 + t00 * x2,
            ny2 = t02 * y0 + t03 * y1 + t00 * y2;
        
        var nx1 = lerp ( lerp ( x0 , x1 , t0 ) , lerp ( x1 , x2 , t0 ) , t1 ),
            ny1 = lerp ( lerp ( y0 , y1 , t0 ) , lerp ( y1 , y2 , t0 ) , t1 );
                 
        canvas_context.moveTo( nx0, ny0 );
        canvas_context.quadraticCurveTo( nx1, ny1, nx2, ny2 );
  }
    
    canvas_context.stroke();
    canvas_context.closePath();
}

function lerp(v0, v1, t) { // lin. interpolation
    return ( 1.0 - t ) * v0 + t * v1;
}
 


var numbers = getNumbers(6,9,11,14);
var segment = 40;   // distance between numbers on rule in px
var c = document.getElementById("canvas");
var canvas_context = c.getContext("2d");
var docCanvas2 = document.getElementById('canvas2');
var canvas_context2 = docCanvas2.getContext('2d');
var arrow_position = Math.floor((numbers[0] * segment) + 16);
canvas_context.scale(numbers[0] * 0.13, 1); //step is 0.13 
canvas_context2.scale(numbers[1] * 0.13, 1);
animationCurve(canvas_context, 0, 100, 150, -50, 300, 100, 1300,"arrow",arrow_position);

$(document).ready(function(){

  		var a_input = $("#a");
  		var b_input = $("#b");
  		var a_n_text = $("#a_n");
  		var b_n_text = $("#b_n");
  		var sum_input = $("#sum");      
  		var distance_a = ((parseInt(numbers[0]) * segment) / 2) + 15; //15 is half of input's width
  		var distance_b = (((parseInt(numbers[1]) * segment) / 2)) + (parseInt(numbers[0]) * 41);
  		a_input.css("left", distance_a + "px");
  		b_input.css("left", distance_b + "px");
   		a_n_text.html(numbers[0]);
    	b_n_text.html(numbers[1]);
      a_input.on("input", function() {

       	if(this.value != "" && this.value == a_n_text.text()) {
       		var a_th_num = this.value;
       		a_input.css({'border': 'none',
       			'color': 'black',
       			'pointer-events': 'none',
       			'background-color':'none'
       	  });
       		a_input.attr('readonly', true);
       		a_n_text.css({"background-color": ""});   
          var a_place = (parseInt(a_th_num) * segment) + segment;       		
          var b_place = 439; // (segment * 11) - 1      		                 		
       		$("#cnv2wr").css("margin-left", "-" + (b_place - a_place) + "px");						
			    var arrow_position2 = ((numbers[1] * segment) + arrow_position) - 5.5; // 5.5 is approximation
			    animationCurve(canvas_context2, 0, 100, 150, -50, 300, 100, 1300,"arrow2",arrow_position2);
			    b_input.css("display", "inline");    
        }
        else {
	      a_input.css("color", "red");
	     a_n_text.css({'background-color': 'orange', 'border-radius': '8px', 'padding' : '3px'} );
      }
  });

       a_input.focusout(function() {
        a_n_text.css({'background-color': '', 'border-radius': '', 'padding' : ''} );
       });
       b_input.focusout(function() {
        b_n_text.css({'background-color': '', 'border-radius': '', 'padding' : ''} );
       }) 
 
     	b_input.on("input", function() {

     		if(this.value != "" && this.value == b_n_text.text()) {
     			var b_th_num = this.value;
       		b_input.css({'border': 'none',
       			'color': 'black',
       			'pointer-events': 'none',
       			'background-color':'none'
       			});

       		b_input.attr('readonly', true);
       		b_n_text.css({"background-color": ""});
       		sum_input.css({'pointer-events': 'auto', 'border': '2px solid gray', 'border-radius' : '5px'});
       		sum_input.val("");
       		sum_input.on("input", function() {

       			if (this.value != "" && this.value == numbers[2]) {
       				sum_input.css({'border': 'none',
       			'color': 'black',
       			'pointer-events': 'none',
       			'background-color':'none'
       			});

       			sum_input.attr('readonly', true);
       			}

       			else {
       				sum_input.css("color", "red");
       			}

       		});

     		}

     		else {
     			b_input.css("color", "red");
	        b_n_text.css({'background-color': 'orange', 'border-radius': '8px', 'padding' : '3px'} );
     	  }

     	});  

});
  	
  	
(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] 
                                   || window[vendors[x]+'CancelRequestAnimationFrame'];
    }
 
    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
 
    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());

$(function() {
  $('#stick').on('keydown', '.n_input', function(e){-1!==$.inArray(e.keyCode,[46,8,9,27,13,110,190])||(/65|67|86|88/.test(e.keyCode)&&(e.ctrlKey===true||e.metaKey===true))&&(!0===e.ctrlKey||!0===e.metaKey)||35<=e.keyCode& segment>=e.keyCode||(e.shiftKey||48>e.keyCode||57<e.keyCode)&&(96>e.keyCode||105<e.keyCode)&&e.preventDefault()});
})




      