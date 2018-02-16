var keywords_rowCount = 1;
	var keywords_rand_id = 3;
	var locations_rowCount = 1;
	var locations_rand_id = 3;
$(document).on("click", "#keywords-addMoreRows", function () {
	keywords_rowCount++;
	var recRow = '<tr id="keywords-rowCountAdd' + keywords_rowCount + '">\n\
<td> <input type="text" name="keywords[]" class="form-control"> </td>\n\
<td><button type="button" class="btn btn-primary" id="keywords-addMoreRows"><span class="glyphicon glyphicon-plus"></span></button>\n\
<button type="button" class="btn btn-danger" id="keywords-removeThisRow" onclick="keywords_removeRow('+keywords_rowCount+',$(this));"><span class="glyphicon glyphicon-minus"></span></button></td>\n\
</tr>';
	keywords_rand_id = keywords_rand_id + 1;
	$(this).hide();
	$('#keywords-table tbody').append(recRow);
});
function keywords_removeRow(removeNum, removeThisRow) {
	$(removeThisRow).parent().parent().prev().find('#keywords-addMoreRows').show();
	$('#keywords-rowCountAdd' + removeNum).remove();
}
$(document).on("click", "#locations-addMoreRows", function () {
	locations_rowCount++;
	var recRow = '<tr id="locations-rowCountAdd' + locations_rowCount + '">\n\
<td> <input type="text" name="locations[]" class="form-control"> </td>\n\
<td><button type="button" class="btn btn-primary" id="locations-addMoreRows"><span class="glyphicon glyphicon-plus"></span></button>\n\
<button type="button" class="btn btn-danger" id="locations-removeThisRow" onclick="locations_removeRow('+locations_rowCount+',$(this));"><span class="glyphicon glyphicon-minus"></span></button></td>\n\
</tr>';
	locations_rand_id = locations_rand_id + 1;
	$(this).hide();
	$('#locations-table tbody').append(recRow);
});
function locations_removeRow(removeNum, removeThisRow) {
	$(removeThisRow).parent().parent().prev().find('#locations-addMoreRows').show();
	$('#locations-rowCountAdd' + removeNum).remove();
}
function auto_install()
{
	$("#update").html('<div class="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width:100%;">Please Wait</div>')
	$.ajax({
	   type: "POST",
	   data: $("#update-form").serialize(),
	   dataType: 'json',
	   url: "auto-install.php",
	   success: function(data){
		if(data.error == 0){
		 $(".container").append('<div class="row"><div class="col-md-12"><div class="alert alert-success"><strong>Success!</strong>Job portal links updated successfully.</div></div></div>');
		}else{
			$(".container").append('<div class="alert alert-danger"><strong>Error!</strong>An error occured while updating list.Please try again.</div>');
		}
		$("#update").html('Update Links');
	   }
	});
}