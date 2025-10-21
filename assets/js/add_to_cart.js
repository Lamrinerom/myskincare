$(function() {
    var stop = $('svg .move-stop');
  
    var button = $('.prizes-page__wishlist-button');
  
    var active = false;
    
    var velocity = .2;
  
    var animate = function() {    
      if (active) {
        
        TweenMax.to(stop, velocity, {
          attr: {
            offset: '100%'
          }
        });
        
        $('.add').show();
        $('.remove').hide();
        active = false;
        
      } else {
        
        TweenMax.to(stop, velocity, {
          attr: {
            offset: '0%'
          }
        });
        active = true;
        $('.add').hide();
        $('.remove').show();
      }
    };
  
    button.click(animate);
  
  });