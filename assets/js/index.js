var xhr;var timer;
function myAjaxReq(url,data,loading,flag) {if(xhr && xhr.readyState != 4){xhr.abort();$("#ajax-loader").remove();}xhr=$.ajax({url: url,type: "POST",data: {"data" : JSON.stringify(data)},beforeSend: function() {$("#"+loading).append('<img id="ajax-loader" src="assets/img/ajax-loader.gif">');},success: function(data){$("#ajax-loader").remove();data=JSON.parse(data);myAjaxSuccess(data,flag);}});}
function myAjaxSuccess(data,flag)
{
	if(flag == "status")
	{
		if($(".progress-row").length)
		{
			$(".progress-row").remove();
			$("#start_crawler").after('<div class="progress progress-row"> <div class="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="'+data.percent+'" aria-valuemin="0" aria-valuemax="100" style="width:'+data.percent+'%"> '+data.percent+'% </div> </div>');
			if(data.percent >= 100)
			{
				$("#start_crawler").attr('class','btn btn-block btn-success');
				clearcrawler();
			}
		}else{
			$("#start_crawler").after('<div class="progress progress-row"> <div class="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="'+data.percent+'" aria-valuemin="0" aria-valuemax="100" style="width:'+data.percent+'%"> '+data.percent+'% </div> </div>');
			if(data.percent >= 100)
			{
				$("#start_crawler").attr('class','btn btn-block btn-success');
				clearcrawler();
			}
		}
	}else if(flag == "start_all"){
		if(data.error == 0){
		$("#start_crawler").after('<div class="alert alert-danger"><strong>Error!</strong> '+data.message+'</div>');
		clearcrawler();
		}else{
		console.log(data);	
		}
	}else if(flag == "check_emails"){
		if(data.error == 0){
			if($('.emails-row').length){
				if($('#emails_count').val() != data.emails_count){
					$('.emails-row').remove();
					$(".container").append(data.message);
				}
			}else{
				$(".container").append(data.message);
			}
		}
	}else{
		console.log(data);
	}
}
function refresh()
{
	myAjaxReq("crud.php",[{"action":"refresh"}],"loading","refresh");
}
function emails_delete(text,parent)
{
	var emails=$("#"+text).val();
	$("#"+parent).append('<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12"><div class="row"><div class="col-lg-4 col-md-4 col-sm-4 col-xs-12"></div><div class="col-lg-4 col-md-4 col-sm-4 col-xs-12"><div class="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width:100%;">Please Wait</div></div></div></div>');
	timer=setTimeout(function() {
		queue(emails);
		$("#"+parent).remove();
	}, 9000);
}
function clearqueue()
{
	clearTimeout(timer);
}
function queue(emails)
{
	myAjaxReq("crud.php",[{"action":"reset","emails":emails}],"loading","reset");
}
function clearcrawler()
{
	clearInterval(timer);
}
function start_crawler()
{
	timer=setInterval(function() {
		myAjaxReq("status.php",[{"action":"status"}],"loading","status");
	}, 3000);
}
function check_emails()
{
	setInterval(function() {
		myAjaxReq("crud.php",[{"action":"check_emails"}],"loading","check_emails");
	}, 3000);
}
$("#start_crawler").click(function(){
	myAjaxReq("crud.php",[{"action":"start_all"}],"loading","start_all");
	start_crawler();
});
check_emails();