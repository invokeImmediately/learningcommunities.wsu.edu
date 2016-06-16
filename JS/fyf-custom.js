// See [https://github.com/invokeImmediately/learningcommunities.wsu.edu] for repository of source code
/**********************************************************************************************************************
 CUSTOM JQUERY-BASED DYNAMIC CONTENT
 *********************************************************************************************************************/
(function ($) {
    "use strict";
    
    var $oueActiveInfoPanel;
    
	$(document).ready(function () {
        /**********************************************************************************************
         * Tweak HTML source to work around some quirks of WordPress setup                            *
         **********************************************************************************************/
        var siteURL = window.location.pathname;
        switch(siteURL) {
                // REMOVED FOR NOW: Removal of "home" link when on home page.
				/* case '/':
                $('#menu-item-35').remove();
                $('#spine-sitenav ul li').first().css('border-top', 'none');
                $('#spine-sitenav').addClass('homeless');
                break; */
            case '/news/':
                $('div.column.one').first().parent('section').before('<section class="row single gutter pad-top"><div class="column one"><section class="article-header header-newsEvents"><div class="header-content"><h2>News</h2><h3>What We and Our Students Have Accomplished</h3></div></section></div></section>');
                break;
        }
        
        InitResHallCourseInfoPanels("ul.residence-hall-courses", "li.course-info-panel", ".hidden-info");
	});
    
    function InitResHallCourseInfoPanels(slctrPrntList, slctrChldPanels, slctrHiddenInfo) {
        var $courseLists = $(slctrPrntList);
		$courseLists.each(function () {
			var $infoPanels = $(this).find(slctrChldPanels);
			$infoPanels.click(function () {
				var $this = $(this);
				
				// Start by noting this as the active panel
				$this.data("is-active", "1");
				
				// Before changing anything, compute and store the current CSS style rules we will change
				var leftPosCmptd = $this.css("left");
				var widthCmptd = $this.css("width");
				var prntWidthCmptd = $this.parent().css("width");
				var leftStyleSttng = (100 * parseFloat(leftPosCmptd) / parseFloat(prntWidthCmptd));
				$this.data("prev-left-setting", leftStyleSttng + "%");
				var widthStyleSttng = (100 * parseFloat(widthCmptd) / parseFloat(prntWidthCmptd));
				$this.data("prev-width-setting", widthStyleSttng + "%");
				
				// Animate the widening of the box and revelation of previously hidden course info
				var $hiddenInfo = $this.find(slctrHiddenInfo).first();
				$this.animate({
					"width" : "100%",
					"left" : "0%"
				}, 333);
				$hiddenInfo.stop().show(200);
			}).mouseleave(function () {
				var $this = $(this);
				
				// We only need to do something if the mouse has left the click-trigggered active panel
				var isActive = $this.data("is-active");
				if (isActive) {
					$this.data("is-active", "0");
					
					// Retreive previous CSS style rules
					var leftStyleSttng = $this.data("prev-left-setting");
					var widthStyleSttng = $this.data("prev-width-setting");
					
					// Animate the restoration of the original layout of the panel
					var $hiddenInfo = $this.find(slctrHiddenInfo).first();
					$hiddenInfo.stop().hide(200);
					$this.animate({
						"width" : widthStyleSttng,
						"left" : leftStyleSttng
					}, 333);
				}
			});
		});
    }
})(jQuery);