/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function(){
    var items = $('#gallery li'),
        itemsByTags = {};
    
    //Loop through tags
    items.each(function(i){
        var element = $(this),
        tags = element.data('tags').split(',');
        
        //Add data attribute for quicksand
        element.attr('data-id', i);
        
        $.each(tags, function(key, value) {
            //Remove whitespace
            value = $.trim(value);
            
            if(!(value in itemsByTags)) {
                //Add empty value
                itemsByTags[value] = [];
            }
            
            //Add image to array
            itemsByTags[value].push(element);
        });
    });
    
    //Create "All Items" option
    createList("All Items", items);
    
    $.each(itemsByTags, function(key, value) {
        createList(key, value);
    });
    
    //Click Handler
    $('#navbar a').live('click', function(event) {
        var link = $(this);
        
        //Add active class
        link.addClass('active').siblings().removeClass('active');
        
        $('#gallery').quicksand(link.data('list').find('li'));
        event.preventDefault();
    });
    
    $('#navbar a:first').click();
    
    //Create the lists
    function createList(text, items) {
        //Create empty ul
        var ul = $('<ul>', {'class':'hidden'});
        
        $.each(items, function() {
            $(this).clone().appendTo(ul);    
        });
        
        //Add gallery div
        ul.appendTo('#gallery');
        
        //Create menu item
        var a = $('<a>', {
            html:text,
            href:"#",
            data:{list:ul}
        }).appendTo('#navbar');
    }
});


