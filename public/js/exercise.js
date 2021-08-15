$(document).ready(function () {
  $('#exercise-list li a').on('click', function () {
    var txt = $(this).text();
    $('#dropdownMenuButton').text($(this).text());
    // alert(txt);
  });
});
