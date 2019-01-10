(function ( $ ,tstBase) { 
    /** 
     * @class Ajax
     * @bindings tstBase, jQuery
     * @author Jeremy Heminger <contact@jeremyheminger.com>
     * @version 1.0.0
     * */
    tstBase.Ajax = (function($){

    	var init = function() {
            tstBase.Helpers.log('tstBase.Ajax.init');
    	}
    	/**
         * runs an ajax call and waits form promise finally running a callback
         * @method get
         * @param {String} method
         * @param {Object} data
         * @param {Function} callback
         * */
        var get = function(method,data,callback) {
            tstBase.Helpers.log('get');

            let p = getData(method,data);
            if(p)
                dataResult(p,callback);
        }
        /**
         * gets the data from the server
         * @method getData
         * @param {String} method
         * @param {Object} data 
         * @note this can allow files to be uploaded data.upload: true
         *       there is a filtered version in _ajax.v2.js
         * @returns {Object}
         * */
        var getData = function(method,data) {
        	tstBase.Helpers.log('dataResult');

            // prepare payload
            let post = {
                method :method
            };

            post = buildPostData(post, data);

            // make the request
    	    return $.ajax({
    	        url         :tstBase.ajaxurl,
    	        data        :post,
    	        type        :"post",
    	        cache       :(true == tstBase.DEBUGGING ? false : true),      
    	        dataType:   "json"
    	    });
        };
        /**
         * gets the result from the promise
         * @method dataResult
         * @param {Object} p
         * @param {Function} callback
         * */
        var dataResult = function(p, callback) {
            tstBase.Helpers.log('dataResult');

            p.success( function(data){
                /**
                * Whenever an Ajax event occurs this will check for a request from the server to update.
                * This will allow a remote update to the latest version.
                * */
                if(data.update == 1)
                    $('#updatemessage').addClass('show');
                if(data.update == 2)
                    window.location.reload();
                
                if(data.success == 1) {
                    if (typeof callback === "function") {
                        callback(data.message);
                    }
                } else {
                    if (typeof data.errors !== 'undefined') {
                        tstBase.ISERRORING = true;
                        var errors = "";
                        $.each(data.errors,function(k,v){
                            errors+=v+"\n";
                        });
                        alert("An error occured :: "+errors);
                    }
                } 
            });
            p.error( function(xhr, ajaxOptions, thrownError){
                if(419 == xhr.status) {
                    // this handles when the session has timed out
                    window.location.reload();
                }else if(0 == xhr.status){
                    // do nothing because this is just a user reloading the page before the task(s) are complete
                }else{
                    tstBase.ISERRORING = true;
                    var error_text = 'An Error occurred...';
                    if ( typeof xhr !== 'undefined') {
                        console.log('xhr error :: '+xhr.status);
                    }
                    if ( typeof thrownError !== 'undefined') {
                        console.log('thrownError :: '+thrownError);
                    }
                    alert(error_text); 
                }
            });    
        };
        /** 
         * ASP can't use nested array's in POST data
         * this puts all the data into a single thread
         * */
        var buildPostData = function(post, data) {
        	
        	$.each(data,function(k,v) {
        		post[k] = v;
        	});

        	return post;
        }
    	return {
    		init:init,
            get:get
    	}
    })(jQuery);
}( jQuery, tstBase )); 