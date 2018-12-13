class mainPlotECG {
    var NewestID =  0.0 ;
	var LastNewestID = 0.0;
	var requestCount = 0;
	var startCount = 7 ;
	var shiftLength = 256*1;
	var obj0_count = 0 ;
	var obj1_count = 0 ;
	var obj2_count = 0 ;
	var startTime = 0 ;
	var xTimeStart = 0;
	var xTimeEnd = 0;
	var TimeOut = 100;
	var emptyRequestCount = 0;
	var data0 = new Array();
	var data1 = new Array();
	var data2 = new Array();
	var count_Array0 = new Array();
	var count_Array1 = new Array();
	var count_Array2 = new Array();
	var delayTimeFromNow = 5000;
	var username = "" ;
    var userId = "" ;
        
	var skinfoArray = new Array();

	var afDetector = 0;
	var afButton = false;
        
    var dataset0 = [{label: "ECG_0",data: data0}];
	var dataset1 = [{label: "ECG_1",data: data1}];
	var dataset2 = [{label: "ECG_2",data: data2}];
	
	const Baseline_filter = [-0.00611779802346922,-0.00625504233834900,-0.00639124756152272,-0.00652632292468917,-0.00666017805064469,-0.00679272303124695,-0.00692386850516743,-0.00705352573535570,-0.00718160668613947,-0.00730802409988414,-0.00743269157313628,-0.00755552363217547,-0.00767643580789987,-0.00779534470997097,-0.00791216810014414,-0.00802682496471177,-0.00813923558598708,-0.00824932161275723,-0.00835700612963550,-0.00846221372524318,-0.00856487055915309,-0.00866490442752768,-0.00876224482738604,-0.00885682301943527,-0.00894857208940331,-0.00903742700781158,-0.00912332468812740,-0.00920620404323762,-0.00928600604018690,-0.00936267375312517,-0.00943615241441123,-0.00950638946382088,-0.00957333459580983,-0.00963693980478395,-0.00969715942833094,-0.00975395018836987,-0.00980727123017687,-0.00985708415924788,-0.00990335307596067,-0.00994604460800137,-0.00998512794052290,-0.0100205748440041,-0.0100523596997823,-0.0100804595232325,-0.0101048539845701,-0.0101255254272568,-0.0101424588839894,-0.0101556420902573,-0.0101650654954525,-0.0101707222715238,0.989827391680836,-0.0101707222715238,-0.0101650654954525,-0.0101556420902573,-0.0101424588839894,-0.0101255254272568,-0.0101048539845701,-0.0100804595232325,-0.0100523596997823,-0.0100205748440041,-0.00998512794052290,-0.00994604460800137,-0.00990335307596067,-0.00985708415924788,-0.00980727123017687,-0.00975395018836987,-0.00969715942833094,-0.00963693980478395,-0.00957333459580983,-0.00950638946382088,-0.00943615241441123,-0.00936267375312517,-0.00928600604018690,-0.00920620404323762,-0.00912332468812740,-0.00903742700781158,-0.00894857208940331,-0.00885682301943527,-0.00876224482738604,-0.00866490442752768,-0.00856487055915309,-0.00846221372524318,-0.00835700612963550,-0.00824932161275723,-0.00813923558598708,-0.00802682496471177,-0.00791216810014414,-0.00779534470997097,-0.00767643580789987,-0.00755552363217547,-0.00743269157313628,-0.00730802409988414,-0.00718160668613947,-0.00705352573535570,-0.00692386850516743,-0.00679272303124695,-0.00666017805064469,-0.00652632292468917,-0.00639124756152272,-0.00625504233834900,-0.00611779802346922];
	const EMG_filter = [-0.000217244399268074,-0.00227268755266697,-0.00556192781130237,-0.00768182716974894,-0.00594427251433773,-0.000218544510481882,0.00589479189737367,0.00746075207558138,0.00268295980250158,-0.00471307278403146,-0.00813146163412527,-0.00407025676714511,0.00410095497645106,0.00871702380077503,0.00499560667306845,-0.00391448363116554,-0.00940759624830857,-0.00568839115556869,0.00407668978961913,0.0102756009823772,0.00624846753487270,-0.00456225151905075,-0.0113700258649080,-0.00672302654049656,0.00538606017829096,0.0127479315654145,0.00713505755671852,-0.00660399965693981,-0.0144954371370519,-0.00749549401843271,0.00832798039523301,0.0167564067541130,0.00780896735040049,-0.0107652980436381,-0.0197887881772295,-0.00807676835368048,0.0143140929416751,0.0240970469465565,0.00829847898373536,-0.0198189097679077,-0.0308021265994088,-0.00847292319064690,0.0294043337434289,0.0429622960869577,0.00859874441754916,-0.0503125790625605,-0.0728374844324769,-0.00867476322769235,0.133283544857603,0.279910866771456,0.342033527555155,0.279910866771456,0.133283544857603,-0.00867476322769235,-0.0728374844324769,-0.0503125790625605,0.00859874441754916,0.0429622960869577,0.0294043337434289,-0.00847292319064690,-0.0308021265994088,-0.0198189097679077,0.00829847898373536,0.0240970469465565,0.0143140929416751,-0.00807676835368048,-0.0197887881772295,-0.0107652980436381,0.00780896735040049,0.0167564067541130,0.00832798039523301,-0.00749549401843271,-0.0144954371370519,-0.00660399965693981,0.00713505755671852,0.0127479315654145,0.00538606017829096,-0.00672302654049656,-0.0113700258649080,-0.00456225151905075,0.00624846753487270,0.0102756009823772,0.00407668978961913,-0.00568839115556869,-0.00940759624830857,-0.00391448363116554,0.00499560667306845,0.00871702380077503,0.00410095497645106,-0.00407025676714511,-0.00813146163412527,-0.00471307278403146,0.00268295980250158,0.00746075207558138,0.00589479189737367,-0.000218544510481882,-0.00594427251433773,-0.00768182716974894,-0.00556192781130237,-0.00227268755266697,-0.000217244399268074];
	
    function mean(signal)
	{
		var sum = 0 ;
		for (n = 0; n < signal.length; n++)
		{
				sum = sum + signal[n];
		}
		var average = sum/signal.length;
		return average
	}
	
	function minus(signal,value)
	{
		for (n = 0; n < signal.length; n++)
		{
			signal[n] = signal[n] - value;
		}
		
		return signal
		
	}

	
	function convolution(signal, kernel){
		
		var result = new Array(signal.length + kernel.length - 1);
		for (n = 0; n < signal.length + kernel.length - 1; n++)
		{
		    result[n] = 0;
		    kmin = (n >= kernel.length - 1) ? n - (kernel.length - 1) : 0;
		    kmax = (n < signal.length - 1) ? n : signal.length - 1;
		    var tmp;
		  for (k = kmin; k <= kmax; k++)
		    {
		        result[n] = result[n] +  signal[k] * kernel[n - k];
		    }
		}
		deleteLen = (kernel.length-1)/2 ;
		//result1 = result.slice(0,signal.length);
		//result2 = result.slice(signal.length, result.length);

		result2 = result.slice(deleteLen, result.length-deleteLen);
	    return result2;
	}
	
	function ECGPlot(jsonObj){
		
		//要是request沒有東西 就過XXX後再request一次
		if(jsonObj == "")
		{
			console.log("empty");
			console.log("NewestID =",NewestID);
			emptyRequestCount = emptyRequestCount +1 ;
			if ( emptyRequestCount  > 10 ){
				NewestID = NewestID + 1000;
			}
			setTimeout(request,TimeOut);
		}
		else if ( LastNewestID == 0 && NewestID ==0 )
		{
			LastNewestID = NewestID;
			NewestID = jsonObj[0].time ;
			startTime = jsonObj[0].time ;
			console.log("NewestID =",NewestID);
			console.log("FirstStartTime=",NewestID)
			setTimeout(request,TimeOut);
		}
		else
		{
			emptyRequestCount = 0;
			//把資料接起來
			afDetector = 0;
			obj0_count = 0;
			obj1_count = 0;
			obj2_count = 0;
			var tmpdata0 = new Array();
			var tmpdata1 = new Array();
			var tmpdata2 = new Array();
			for(var i=0 ; i<jsonObj.length ; i++)
			{
				switch(jsonObj[i].deviceID)
				{
					case 0:
						tmpdata0.push(jsonObj[i].data);
						break;
					case 1:
						tmpdata1.push(jsonObj[i].data);
						break;
					case 2:
						tmpdata2.push(jsonObj[i].data);
						break;
				}
			}
			tmpdata0_f = filtering(tmpdata0);
			tmpdata1_f = filtering(tmpdata1);
			tmpdata2_f = filtering(tmpdata2);
				
			for(var i=0 ; i<jsonObj.length ; i++)
			{
				console.log(jsonObj[i].afstat)
				if(jsonObj[i].afstat == 1) {
					afDetector = 1
					console.log("AF!!!!!!!!!!!!!!!!!")
				}

				switch(jsonObj[i].deviceID)
				{
					case 0:
						data0.push([jsonObj[i].time,tmpdata0_f[0]]);
						obj0_count = obj0_count +1 ;
						tmpdata0_f.shift();
						break;
					case 1:
						data1.push([jsonObj[i].time,tmpdata1_f[0]]);
						obj1_count = obj1_count +1 ;
						tmpdata1_f.shift();
						break;
					case 2:
						data2.push([jsonObj[i].time,tmpdata2_f[0]]);
						obj2_count = obj2_count +1 ;
						tmpdata2_f.shift();
						break;
				}
				count_Array0.push(obj0_count);
				count_Array1.push(obj1_count);
				count_Array2.push(obj2_count);
				
			}

			LastNewestID = NewestID;
			NewestID = NewestID + 1000;
			requestCount = requestCount + 1 ;
			
			console.log("requestCount = ",requestCount);
			console.log("LastNewestID =",LastNewestID);
			console.log("NewestID =",NewestID);
			console.log("jsonObjLeng = ",jsonObj.length);
		
			if (requestCount > startCount){
		
				if (requestCount == startCount+1 ){
					console.log("xStart = ",xTimeStart);
					console.log("xTimeEnd = ",xTimeEnd);
					xTimeStart = startTime;
					xTimeEnd = NewestID;
				}
				else
				{
					for(var i=0;i<count_Array0[0];i++){
						data0.shift();
					}
					for(var i=0;i<count_Array1[0];i++){
						data1.shift();
					}
					for(var i=0;i<count_Array2[0];i++){
						data2.shift();
					}
					count_Array0.shift();
					count_Array1.shift();
					count_Array2.shift();
				
					xTimeStart = xTimeStart + 1000;
					xTimeEnd = xTimeEnd + 1000;
					console.log("xStart = ",xTimeStart);
					console.log("xTimeEnd = ",xTimeEnd);		
				}
			}
			else{
				xTimeStart = startTime;
				xTimeEnd = startTime + 6000;
				
			}
			plotECG(xTimeStart,xTimeEnd);
			setTimeout(request,TimeOut);
			}
		}
	
	function filtering(rawData){
		
		var m0 = mean(rawData);
		var rawData2 = minus(rawData,m0);
		
		result00 = convolution(rawData2,Baseline_filter);
		//result_0 = convolution(result00,EMG_filter);
		return result00
		
	}
	
	function plotECG(xTimeStart,xTimeEnd)
	{
// 		var dataset0 = [{label: "ECG_0",data: data0}];
// 		var dataset1 = [{label: "ECG_1",data: data1}];
// 		var dataset2 = [{label: "ECG_2",data: data2}];
		var options = 
		{
			 
				grid: {                
					borderWidth:5,
					borderColor : "#ff8080",
					backgroundColor: "#ffffff",
					tickColor: "#ff8080",
					//axisMargin: 3
				},	
				series: 
				{
					lines: { show: true },
					points: 
					{
						radius: 0,
						show: true
					}
				},
				yaxis:	
				{
					tickSize: 0.1,
					max:2,
					min:-2,
					//max: data0[0][1],
					//min: data0[data0.length-1][1],
					axisLabel: "mV",
					axisLabelUseCanvas: true,
					axisLabelFontSizePixels: 12,
					axisLabelFontFamily: 'Verdana, Arial',
				    axisLabelPadding: 10
				},
				
				xaxis:
				{
					//mode: "time",
					//tickSize : 1000,
					tickSize:40,	
					//minTickSize: [0.04,"second"],
					min: xTimeStart,
					max: xTimeEnd,
					
					tickFormatter: function (v, axis) { /////// formatter code do not work
				        var date = new Date(v);
				        //console.log("date","date =",date);
				        if (date.getSeconds() % 1 + date.getMilliseconds() % 500 == 0) {
				        	showFlag = true;
				        	
				        	//console.log("date","date =",date);
				            var hours = date.getHours();
				            hours = hours < 10 ? "0" + hours : hours;
				            var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
				            var seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
				            var milliseconds = date.getMilliseconds() < 10 ? "0" + date.getMilliseconds() : date.getMilliseconds();
				            var aa = hours + ":" + minutes + ":" + seconds + ":" + milliseconds;
				            //console.log(aa);
				            return  aa
				            //return val.toFixed(axis.tickDecimals);
				            
				        } else {
				            return "";
				        }
				    },
				    font:{  ///// set label text to white
						//size: 1,
					  //  style: "italic",
					   // family: "sans-serif",
					    color: "#000000"
					},
					axisLabel: "Time",
					axisLabelUseCanvas: true,
					axisLabelFontSizePixels: 12,
					axisLabelFontFamily: 'Verdana, Arial',
				    axisLabelPadding: 10
				},
				legend: {
					show: false
				},
				colors:["#000000"],
				
			};
			$.plot($("#flot-placeholder0"), dataset0, options);
			$.plot($("#flot-placeholder1"), dataset1, options);
			$.plot($("#flot-placeholder2"), dataset2, options);
			showAF();
	}
	
	function showAF()
	{
		if (afButton ==true && afDetector==1)
		{
			console.log("AF !!!! red") 
			$("#aftext").css("color", "red");
		}
		else if (afButton == true && afDetector==0)
		{
			console.log("No AF white") 
			$("#aftext").css("color", "white");
		}
		else if (afButton == false && afDetector==1 )
		{
			console.log("AF !!!! white")
			$("#aftext").css("color", "white");
		}
		else
		{
			console.log("white")
			$("#aftext").css("color", "white");
		}
	}
	
	
	function requestInfo(){
		$.ajax
		({
			type: 'GET',
			url: "https://node-server-dot-ecgproject-1069.appspot.com/users",
			dataType: "json",
			success:function(data){
				console.log("success");
				console.log(data)
				showInfo(data);
                username=skinfoArray[0][1];
                userId = skinfoArray[0][0];
                console.log("username is "+username );
		        console.log("userId is "+userId );
	         },
	         error: function(msg){
	        	 console.log("Fail")
	        	 console.log(msg);
	         }
		});
		
	}
	

	
	function showInfo(jsonObj){
		//for(var i=0 ; i<jsonObj.length ; i++)
		for(var i=jsonObj.length-1 ; i>-1 ; i--)
		{			
	    skinfoArray.push([jsonObj[i]._id,
	                      jsonObj[i].username,
	                      ]);

		}
		$(addOption);
	}
	
	function addOption(){
		if(skinfoArray!=null)
		{
			for (i = 0; i < skinfoArray.length; i++)
			{ 
			     
                //$("#sqlNameSelect").append($("<option></option>").attr("value",skinfoArray[i][0]).text(skinfoArray[i][1]));
                
                $("#sqlNameSelect").append($('<option>',
			     {
			        value: skinfoArray[i][0],
                    text : skinfoArray[i][1],
			    }));
			
            }
		
		}
	}
	
	function requestMinTime()
    {
        // HTTP GET /ecgdata/:id?from=1512131231&limit=1024
// https://node-server-dot-ecgproject-1069.appspot.com/ecgdata/5bf29f1a7ee18712ee005806?from=1542641809030&limit=1024

    
        console.log("request","NewestID =",NewestID);
        $.ajaxSetup({ cache: false });
		$.ajax
		({
            url: "https://node-server-dot-ecgproject-1069.appspot.com/ecgdata/" + userId + "?from=" +startTime + "&limit=1024",
            dataType: 'json',
			success: ECGPlot
		});
        url = "https://node-server-dot-ecgproject-1069.appspot.com/ecgdata/" + userId + "?from=" +startTime + "&limit=1024";
        console.log(url)
        
    }
    
	function request()
	{
		console.log("request","NewestID =",NewestID);
		$.ajaxSetup({ cache: false });
		$.ajax
		({
            url: "https://node-server-dot-ecgproject-1069.appspot.com/ecgdata/" + userId + "?from=" +startTime +"&to=" +(startTime+1000).toString ,
            dataType: 'json',
			success: ECGPlot
		});
	}
        
    function initialize()
	{
		 NewestID =  0.0 ;
		 LastNewestID = 0.0;
		 requestCount = 0;
		 obj0_count = 0 ;
		 obj1_count = 0 ;
		 obj2_count = 0 ;
		 startTime = 0 ;
		 xTimeStart = 0;
		 xTimeEnd = 0;
		 emptyRequestCount = 0;
		 data0.length = 0;
		 data1.length = 0;
		 data2.length = 0;
		 count_Array0.length = 0;
		 count_Array1.length = 0;
		 count_Array2.length = 0;
		 afDetector = 0;
		 afButton = false;
		 
	}
	
    
  
}



    
	
	//發請求
	
	 
	       
        
        
    $("#showTable").click(function(event){
	        	   if(skinfoArray!=null){
	            	   $("#skinfotable").find("tr:gt(0)").remove();
	            	   var table1 = $("#skinfotable");
		               $.each(skinfoArray, function(key,value) { 
		               		   var rowNew = $("<tr><td></td><td></td></tr>");
		                       rowNew.children().eq(0).text(value[0]); 
		                       rowNew.children().eq(1).text(value[1]); 
		                       rowNew.appendTo(table1);
		               });
	                }
	        	   //$("#tablediv").show();
	        	   $("#tablediv").slideToggle('slow');
	            });
        
	$('input[type=checkbox]').change(function(){
		  clicked = $(this).data('index');
		  $('input[type=checkbox]').each(function(){
		    if($(this)[0].checked){
		    	afButton = true;
		    	console.log(afButton)
		    }
		    else
		    {
		    	afButton = false;
		    	console.log(afButton)
		    	$("aftext").css("color", "white");
		    }
		  });
		  
		});
	
	$("#sqlNameSelect").change(function(){
//        username=$(this).val();
        username = $("#sqlNameSelect").find(":selected").text();
        userId = $("#sqlNameSelect").find(":selected").val();
		console.log("username is "+username );
        console.log("userId is "+userId );
        alert("Select : " +userId );
	});
        

    $("#ShowWirelessData").click(function(event){
		 initialize();
		 $(requestMinTime);
		 
		 });
	 
    $("#ShowWirelessData_Now").click(function(event){
		 initialize();
		 var timeInMs = Date.now();
		 console.log(timeInMs);
		 startTime = timeInMs-delayTimeFromNow ;
		 NewestID = timeInMs-delayTimeFromNow ;
		 $(request);
		 });
