(function ( $ ,tstBase) { 
    /** 
     * @class EDItemplate
     * @bindings tstBase, jQuery
     * @author Jeremy Heminger <contact@jeremyheminger.com>
     * @version 1.0.0
     * */
    tstBase.EDItemplate = (function($){

    	var init = function() {
            tstBase.Helpers.log('tstBase.EDItemplate.init');
    	}
        /** 
         * this functions sole purpose is to send data to asp and get a response
         * */
        var ajaxtest = function() {
            tstBase.Ajax.get('AjaxTest',{
                a:'this is a',
                b:'this is b',
                c:'this is c'
            },function(data){
                console.log(data);
            });
        }
    	return {
    		init:init,
            ajaxtest:ajaxtest
    	}
    })(jQuery);
}( jQuery, tstBase )); 
