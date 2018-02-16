$(function(){
	
	var dropbox = $('#dropbox'),
		message = $('.message', dropbox);
	 $("#phpfileInput").change(function (){
		$("#phpfileInputStatus").val($(this).val());
       var fileName = $(this).val();
	   var form_data = new FormData();  
	var file_data = $("#phpfileInput").prop("files")[0];  
	form_data.append("pic", file_data);
		$.ajax({
			type: "POST",
			url: 'processFPhp_up.php',
			data:  form_data,
			enctype: 'multipart/form-data',
			processData: false,  // tell jQuery not to process the data
			contentType: false,   // tell jQuery not to set contentType
			success: function(response)
			{
				Autodownload("uploads/"+fileName.split("\\").pop());
			},
			beforeSend: function()
			{
				// some code before request send if required like LOADING....
			}
		});
     });
	 
	 	 $("#image_upload").change(function (){
		$("#image_url").val($(this).val());
       var fileName = $(this).val();
	   var form_data = new FormData();  
	var file_data = $("#image_upload").prop("files")[0];  
	form_data.append("pic", file_data);
		$.ajax({
			type: "POST",
			url: 'processImg.php',
			data:  form_data,
			enctype: 'multipart/form-data',
			processData: false,
			contentType: false,
			dataType: "json",
			success: function(response)
			{
				console.log(response);
				$("#imgUrlResult").val(response.message);
			},
			beforeSend: function()
			{
			}
		});
     });
	dropbox.filedrop({
		// The name of the $_FILES entry:
		paramname:'pic',
		
		maxfiles: 5,
    	maxfilesize: 2,
		url: 'processFPhp_up.php',		
		uploadFinished:function(i,file,response){
		},
		
    	error: function(err, file) {
			showMessage(err);
			switch(err) {
				case 'BrowserNotSupported':
					showMessage('Your browser does not support HTML5 file uploads!');
					break;
				case 'TooManyFiles':
					alert('Too many files! Please select 5 at most! (configurable)');
					break;
				case 'FileTooLarge':
					alert(file.name+' is too large! Please upload files up to 2mb (configurable).');
					break;
				default:
					break;
			}
		},
		uploadStarted:function(i, file, len){
			//createImage(file);
			showMessage("<br><a href=uploads/"+file.name+">"+file.name+"</a><br>");
			Autodownload("uploads/"+file.name);			
		},
		
		progressUpdated: function(i, file, progress) {
			//$.data(file).find('.progress').width(progress);
		}
    	 
	});
	
	var template = '<div class="preview">'+
						'<span class="imageHolder">'+
							'<img />'+
							'<span class="uploaded"></span>'+
						'</span>'+
						'<div class="progressHolder">'+
							'<div class="progress"></div>'+
						'</div>'+
					'</div>'; 
	
	
	function createImage(file){

		var preview = $(template), 
			image = $('img', preview);
			
		var reader = new FileReader();
		
		image.width = 100;
		image.height = 100;
		
		reader.onload = function(e){
			
			// e.target.result holds the DataURL which
			// can be used as a source of the image:
			
			image.attr('src',e.target.result);
		};
		
		// Reading the file as a DataURL. When finished,
		// this will trigger the onload function above:
		reader.readAsDataURL(file);
		
		message.hide();
		preview.appendTo(dropbox);
		
		// Associating a preview container
		// with the file, using jQuery's $.data():
		
		$.data(file,preview);
	}

	function showMessage(msg){
		message.append(msg);
	}
	function Autodownload(file){
		var iframe = document.createElement('iframe');
		iframe.name="myFrame";
		document.body.appendChild(iframe);
		window.frames["myFrame"].location = "processFPhp_dn.php?fileSource="+file;
		$('iframe').html('');
		$('iframe').hide();
		$('iframe').empty();
		setTimeout(function(){ $('iframe').remove();Autodelete(file); }, 100);
	}
	function Autodelete(file)
	{
		$.ajax({type: 'POST',url: "processFPhp_dl.php",data: { 'action' : 'delete','fileSource':file}});
	}

});