var fruits = '<select class="fruits" onchange="changeSub(event)" onclick="stopProp(event)"><option value="Rasberry">Rasberry</option><option value="Plum">Plum</option><option value="Orange">Orange</option><option value="Apple">Apple</option><option value="Peach">Peach</option></select>';

var rasberry = '<option value="Black Berry">Black Berry</option><option value="Wine Berry">Wine Berry</option><option value="American Red">American Red</option>';
var plum = '<option value="Cherry">Cherry</option><option value="Blackthron">Blackthorn</option><option value="Beach">Beach</option>';
var orange = '<option value="Blood">Blood</option><option value="Navel">Navel</option><option value="Valencia">Valencia</option>';
var apple = '<option value="Akane">Akane</option><option value="Golden">Golden</option><option value="Red Delicious">Red Delicious</option>';
var strawberry = '<option value="French">French</option><option value="Argentine">Argentine</option>';
var peach = '<option value="Georgia">Georgia</option><option value="Nectarine">Nectarine</option>';

var fileString = '';

//stops event propagation
function stopProp(e){
  e.stopPropagation();
}

function updateIndex(){
  $('.index').each(function(index){
    var i = index + 1;
	if(i<10){
	  var numb = "0" + i;
	  $(this).html('<strong>'+numb+'</strong>');
	}
	else{
	  $(this).html('<strong>'+i+'</strong>');
	}	
  })
}

//updates height
function updateHeight(){
  var height = 0;
  $('.bottomHeight').eq(0).text('00');
  $('.fruitHeight').each(function(index){
    if($(this).is('input')){
	  height = height + parseInt($(this).val());
	}
	else{
	  height = height + parseInt($(this).text());
	}
	var i = index + 1;
	if(height<10 && $('.bottomHeight').eq(i) != 0){
	  var numb = "0" + height;
	  $('.bottomHeight').eq(i).text(numb);
	}
    else if($('.bottomHeight').eq(i) != 0){
	  $('.bottomHeight').eq(i).text(height)
	}	
  });
  
  $('#total').text(height);
  
}

//removes an item in the list;
function removeItem(e){
  stopProp(e);
  
  var handler = e.target;
  
  while($(handler).hasClass('fruitEdge') == false){
    handler = $(handler).parent();
  }
  
  $(handler).remove();
  updateIndex();
  updateHeight();
}

//handles mousing over images
function imgOver(e){
  var handler = e.target;
  var src = $(handler).attr('src');
  src = src.replace('neutral','hover');
  
  $(handler).attr('src',src);
}

//handles mousing out of images
function imgOut(e){
  var handler = e.target;
  var src = $(handler).attr('src');
  src = src.replace('hover','neutral');
  
  $(handler).attr('src',src);
}

//handles change of the lists
function changeSub(e){
  stopProp(e);
  
  var handler = e.target;
  var value = $(handler).val();
  
  if(value == 'Rasberry'){
    $(handler).siblings('.subCats').html(rasberry);
  }
  else if(value == 'Plum'){
    $(handler).siblings('.subCats').html(plum);
  }
  else if(value == 'Peach'){
    $(handler).siblings('.subCats').html(peach);
  }
  else if(value == 'Orange'){
    $(handler).siblings('.subCats').html(orange);
  }
  else if(value == 'Apple'){
    $(handler).siblings('.subCats').html(apple);
  }
  else if(value == 'Strawberry'){
    $(handler).siblings('.subCats').html(strawberry);
  }
  
}

//handles the selection of an item
function selectList(e){ 

  var handler = e.target;

  $('.fruitEdge').each(function(){
    if($(this).hasClass('selected')){
	  $(this).trigger('click');
	}
  })
  
  while($(handler).hasClass('fruitEdge') == false){
    handler = $(handler).parent();
  }

  $(handler).addClass('selected');
  $(handler).attr('onclick','unselectList(event)');
  
  var fruit = $(handler).find('.name').text();
  var cat = $(handler).find('.catagory').text();
  var height = $(handler).find('.fruitHeight').text();
  var clone = $(handler).find('.bottomHeight').clone();

  $(handler).find('.fruitInner').html('');

  $(handler).find('.fruitInner').append(clone);
  $(handler).find('.fruitInner').append('<span class="fruitElements">'+fruits+'<br/><select class="subCats" onclick="stopProp(event)"></select>'
                                        +'Height <input type="text" value="'+height+'" onkeypress="validateHeight(event)" class="fruitHeight" onclick="stopProp(event)"> in');
		
  $(handler).find('.fruitInner').find('.fruits').val(fruit);
  $(handler).find('.fruitInner').find('.fruits').trigger('change');
  $(handler).find('.fruitInner').find('.subCats').val(cat);
  
  $(handler).find('.fruitInner').append('<span class="buttons"><img src="Graphics/RoundCancel.png" onclick="removeItem(event)">'
                                       +'<img src="Graphics/ArrowUp_neutral.png" onmouseover="imgOver(event)" onmouseout="imgOut(event)" onclick="moveUp(event)">'
									   +'<br/><img src="Graphics/ArrowDwn_neutral.png" class="rightImg" onmouseover="imgOver(event)" onmouseout="imgOut(event)" onclick="moveDown(event)">'
									   +'</span>');
}

//handles the unselection of an item
function unselectList(e){

  var handler = e.target;

  while($(handler).hasClass('fruitEdge') == false){
    handler = $(handler).parent();
  }
  
  $(handler).removeClass('selected');
  $(handler).attr('onclick','selectList(event)');
  
  var fruit = $(handler).find('.fruits').val();
  var cat = $(handler).find('.subCats').val();
  var height = $(handler).find('.fruitHeight').val();
  var clone = $(handler).find('.bottomHeight').clone();
  
  $(handler).find('.fruitInner').html('');
  $(handler).find('.fruitInner').append(clone);
  $(handler).find('.fruitInner').append('<span class="fruit" class="auto"><span class="name"><strong>'+fruit+'</strong></span><br/>'
			                           +'<div class="catagory">'+cat+'</div><span class="fruitHeight">'+height+'</span> in.</span>');
									   
  updateHeight();
}

//handles the add new functionality
function newItem(){
  $('#innerBody').append('<div class="fruitEdge" onclick="selectList(event)"><span class="textLg index"><strong>01</strong></span><div class="fruitInner">'
	                    +'<span class="bottomHeight textLg">00</span><span class="fruit" class="auto"><span class="name"><strong>Apple</strong></span><br/>'
			            +'<div class="catagory">Red Delicious</div><span class="fruitHeight">0</span> in.</span></div></div>');
  updateIndex();
  $('.fruitEdge').last().trigger('click');
}

//handles Item duplication
function duplicateItem(){
  var handler = '';
  
  $('.fruitEdge').each(function(){
    if($(this).hasClass('selected')){
	  handler = $(this);
	  return;
	}
  });
  
  if(handler == ''){return;}
  
  var clone = $(handler).clone();
  var fruit = $(handler).find('.fruits').val();
  var cat =   $(handler).find('.subCats').val();
  
  $('#innerBody').append(clone);
  $(handler).trigger('click');
  
  updateIndex();
  updateHeight();
}

//moves a list item up
function moveUp(e){
  stopProp(e);
  
  var handler = e.target;
  
  while($(handler).hasClass('fruitEdge') == false){
    handler = $(handler).parent();
  }
  
  var index = $(handler).index() - 1;
  var fruit = $(handler).find('.fruits').val();
  var cat = $(handler).find('.subCats').val();
  
  if(index == 0){return;}
  
  var clone = $(handler).clone();
  
  $('.fruitEdge').eq(index-1).before(clone);
  $(handler).remove();
  
  $('.fruitEdge').eq(index-1).find('.fruits').val(fruit);
  $('.fruitEdge').eq(index-1).find('.subCats').val(cat);
  
  updateHeight();
  updateIndex();

}

//handles the code to move a list item down
function moveDown(e){
  stopProp(e);
  
  var handler = e.target;
  
  while($(handler).hasClass('fruitEdge') == false){
    handler = $(handler).parent();
  }
  
  var index = $(handler).index() - 1;
  var fruit = $(handler).find('.fruits').val();
  var cat = $(handler).find('.subCats').val();
  
  if($('.fruitEdge').eq(index+1).length == 0){return;}
  
  var clone = $(handler).clone();
  
  $('.fruitEdge').eq(index+1).after(clone);
  $(handler).remove();
  
  $('.fruitEdge').eq(index+1).find('.fruits').val(fruit);
  $('.fruitEdge').eq(index+1).find('.subCats').val(cat);
  
  updateHeight();
  updateIndex();
}

//makes new list
function newList(){
  $('.fruitEdge').remove();
}

//gets the file at the selected path
function openFile(){
  var filePath = $('#openFile').val();
  openList(filePath);
}

//opens and updates list accordingly
function openList(filePath){
  var text = '';
  
  $.ajax({
    url:filePath,
	async:false,
	dataType:'text',
    success:function(data){
	 text = data;
	 console.log(text);
	 newList();
	},
	error:function(){
	  alert('Error: Could not read file');
	}
  });
  
  if(text == ''){return false};
  
  var lists = text.split('\n');
  
  for(var i = 0;i<lists.length;i++){
    var attrs = lists[i].split(',');
    
    $('#innerBody').append('<div class="fruitEdge" onclick="selectList(event)"><span class="textLg index"><strong>00</strong></span>'
			              +'<div class="fruitInner"><span class="bottomHeight textLg">00</span><span class="fruit" class="auto">'
			              +'<span class="name"><strong>'+attrs[0]+'</strong></span><br/><div class="catagory">'+attrs[1]+'</div>'
						  +'<span class="fruitHeight">'+attrs[2]+'</span> in.</span></div></div>');	
  }
  updateIndex();
  updateHeight();
  
  $('#files').hide();
}

//shows the file dialog
function showFilePaths(){
  $('#files').show();
}

//creates fileString for writting file
function createFileString(){
  var fruit = new Array();
  var cats = new Array();
  var heights = new Array();
  
  var i = 0;
  
  $('.fruitEdge').each(function(){
    if($(this).hasClass('selected')){
	  fruit[i] = $(this).find('.fruits').val();
	  cats[i] = $(this).find('.subCats').val();
	  heights[i] = $(this).find('.fruitHeight').val();
	}
	else{
	  fruit[i] = $(this).find('.name').text();
	  cats[i] = $(this).find('.catagory').text();
	  heights[i] = $(this).find('.fruitHeight').text();
	}
	i = i + 1;
  });
  
  i = 0;
  
  for(i = 0;i<fruit.length;i++){
     fileString = fileString + fruit[i] +','+cats[i]+','+heights[i]+"\n";
  }
}

//writes and downloads the text file
function downloadFile(){
  createFileString();
  
  var file = [fileString];
  var myBlob = new Blob(file,{"type" : "text"})
  var url = URL.createObjectURL(myBlob);
  
  $('#hiddenA').attr('href',url);
  $('#hiddenA').attr('download',$('#saveFile').val());
  $('#hiddenA').simulateClick();
  
  $('#files').hide();
}

//allows javascript to simulate a click on a tags
$.fn.simulateClick = function() {
    return this.each(function() {
        if('createEvent' in document) {
            var doc = this.ownerDocument,
                evt = doc.createEvent('MouseEvents');
            evt.initMouseEvent('click', true, true, doc.defaultView, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
            this.dispatchEvent(evt);
        } else {
            this.click(); // IE
        }
    });
}