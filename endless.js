<script type="text/javascript">
	 
    // Main Search data structure
    var _searchDS = {pageStart:0,pageLimit:20,inProgress:false,params:{},init:false}   
	
    // function to show loader during ajax call
    _searchDS.showWait = function(){
        jQuery("#paggingOffset").css({visibility:'visible'});
    }
    
    // append pagging information during each ajax search call
    _searchDS.bindPageOffset = function(){
        _searchDS.params.pageStart = _searchDS.pageStart;
        _searchDS.params.pageLimit = _searchDS.pageLimit;
    }
    
    // function to hide loader during ajax call.
    _searchDS.hideWait = function(){
        jQuery("#paggingOffset").css({visibility:'hidden'});
    }
	
    // reset pagging information when clicking on search
    _searchDS.resetPagging = function(){
        _searchDS.pageStart=0;
    }
	
    // increment pagging offset 
    _searchDS.incrementPagging = function(){
        _searchDS.pageStart=_searchDS.pageStart + _searchDS.pageLimit;
    }
    
	
    // Bind scroll event to trigger endless search
    _searchDS.bindPagging = function(){
        jQuery(window).bind("scroll",function(){
            var windowOffset = jQuery(window).scrollTop() + jQuery(window).height(); 
            var elementOffset = jQuery("#paggingOffset").offset();
            if(windowOffset >= elementOffset.top && !_searchDS.inProgress ){ 
                _searchDS.inProgress = true;
                _searchDS.incrementPagging();
                if(_searchDS.init){
                    doSearch();
                }else{
                    doInitSearch();
                }
                
            }
        });
    }
    
    
     
    function prepareSearch() {
        _searchDS.init = true;
        var gender = document.getElementById('gender').value;
        var eye = document.getElementById('eye').value;
        var hair = document.getElementById('hair').value;
        var ethnicity = document.getElementById('ethnicity').value;
        var age_start = document.getElementById('age_start').value;
        var age_finish = document.getElementById('age_finish').value;
        var height_start = document.getElementById('height').value;
        var height_finish = document.getElementById('height_fin').value;
      
        var chest_start = document.getElementById('chest').value;
        var chest_finish = document.getElementById('chest_fin').value;
      
        var hips_start = document.getElementById('hips').value;
        var hips_finish = document.getElementById('hips_fin').value;
      
        var dress_start = document.getElementById('dress').value;
        var dress_finish = document.getElementById('dress_fin').value;
      
        var waist_start = document.getElementById('waist').value;
        var waist_finish = document.getElementById('waist_fin').value;
	  
        var division = document.getElementById('division').value;
      
        // this is main search, so remove all existing results
        jQuery("#grid").html('');	
        jQuery("#error").html("");

        window.scrollTo(0, 0);
        
        // prepare params
        _searchDS.params = {						
            gender:gender,
            eye:eye,
            hair:hair,
            ethnicity:ethnicity,
            age_start:age_start,
            age_finish:age_finish,
            height_start:height_start,
            height_finish:height_finish,
            chest:chest_start,
            chest_fin:chest_finish,
            hips:hips_start,
            hips_fin:hips_finish,
            dress:dress_start,
            dress_fin:dress_finish,
            waist:waist_start,
            waist_fin:waist_finish,
            division:division
        }
        
        // reset pagging.
        _searchDS.resetPagging();
        doSearch();
    }
    
	
    // on document load, bind scroll event
    jQuery("document").ready(function(){
        _searchDS.bindPagging(); 
        doInitSearch();
    });
    
    function doInitSearch(){
        _searchDS.showWait();
        _searchDS.bindPageOffset();
        jQuery.post("./searchDefault.php", _searchDS.params, function(data){
            _searchDS.hideWait();
            _searchDS.inProgress = false;
            jQuery("#grid").append(data);
        });
    }
	
    // Trigger search
    function doSearch(){
        // inject pagging information
        _searchDS.bindPageOffset();
        // show loader
        _searchDS.showWait();   
		
        jQuery.post("./search.php", _searchDS.params, function(data){
            // hide loader
            _searchDS.hideWait();
			
            // keep track of ajax call. if user tries to scroll so fast.
            _searchDS.inProgress = false;
			
            // append the result
            jQuery("#grid").append(data);
        });
    }
    
    
    
	
    function addCouch(uid) {
        jQuery.post("./list.php", {						
            uid:uid 	          		
        }, function(data){
            if(data){
                jQuery("#main_img_"+uid).html("<img id='radd_"+uid+"' name='radd_"+uid+"' name src='./sites/images/added.png' align='absmiddle' title='Remove from Casting Couch' style='width:12px;height:12px;cursor:pointer;' onClick=\"removeCouch("+uid+");\" />");			
            }
        });
    }
  
    function removeCouch(rid) {
        jQuery.post("./list.php", {						
            rid:rid 	          		
        }, function(data){
            if(data){
                jQuery("#main_img_"+rid).html("<img id='add_"+rid+"' name='add_"+rid+"' name src='./sites/images/plus.png' style='width:12px;height:12px;' align='absmiddle' title='Add to Casting Couch' style='width:12px;height:12px;cursor:pointer;' onClick=\"addCouch("+rid+");\" />");			
            }
        });
    }
		
    function addCouchE(uid) {
        jQuery.post("./list.php", {						
            uid:uid 	          		
        }, function(data){
            if(data){
                jQuery("#main_img_"+uid).html("<img id='radd_"+uid+"' name='radd_"+uid+"' name src='./sites/images/remove_casting.png' align='absmiddle' title='Remove from Casting Couch' style='width:12px;height:12px; cursor:pointer;' onClick=\"removeCouchE("+uid+");\" />");			
            }
        });
    }
  
    function removeCouchE(rid) {
        jQuery.post("./list.php", {						
            rid:rid 	          		
        }, function(data){
            if(data){
                jQuery("#main_img_"+rid).html("<img id='add_"+rid+"' name='add_"+rid+"' name src='./sites/images/add_casting.png' align='absmiddle' title='Add to Casting Couch' style='width:12px;height:12px; cursor:pointer;' onClick=\"addCouchE("+rid+");\" />");			
            }
        });
    }
</script>