var createAccordian = function(accordianElem) {
  accordianElem.click(function(event) {
    $(event.target).next().toggle(400);
  });
  accordianElem.next().hide();
};

$(document).ready(function() {
  $.each($('.accordian'), function(i) {
    createAccordian($(this));
  });
});
