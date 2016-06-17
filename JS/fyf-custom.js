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
		
		InitResHallCourseInfoPanels("ul.residence-hall-courses", "li.course-info-panel", "div.title", ".hidden-info");
	});
	
	function InitResHallCourseInfoPanels(slctrPrntList, slctrChldPanels, slctrTitleAreas, slctrHiddenInfo) {
		var $courseLists = $(slctrPrntList);
		$courseLists.each(function () {
			var $infoPanels = $(this).find(slctrChldPanels);
			$infoPanels.click(function () {
				var $this = $(this);
				var isActive = $this.data("is-active");
				if (isActive == undefined) {
					isActive = "false";
				}
				var isWorking = $this.data("is-working");
				if (isWorking == undefined) {
					isWorking = "false";
				}
				
				if(isWorking == "false" && isActive == "false") {
					$this.data("is-working", "true");
					
					// Before changing anything, compute and store the current CSS style rules we will change
					var leftPosCmptd = $this.css("left");
					var prntWidthCmptd = $this.parent().css("width");
					var leftStyleSttng = (100 * parseFloat(leftPosCmptd) / parseFloat(prntWidthCmptd));
					$this.data("prev-left-setting", leftStyleSttng + "%");

					var widthCmptd = $this.css("width");
					var widthStyleSttng = (100 * parseFloat(widthCmptd) / parseFloat(prntWidthCmptd));
					$this.data("prev-width-setting", widthStyleSttng + "%");
					
					var zIndexStyleSttng = $this.css("z-index");
					$this.data("prev-z-index-setting", zIndexStyleSttng);
					
					// Animate the widening of the box and revelation of previously hidden course info
					if(zIndexStyleSttng == "auto") {
						$this.css("z-index", 10);
					}
					else {
						$this.css("z-index", parseInt(zIndexStyleSttng) + 10);
					}
					$this.animate({
						"width" : "100%",
						"left" : "0%"
					}, 333, function() {
						var $hiddenInfo = $(this).find(slctrHiddenInfo);
						$hiddenInfo.stop().show(333, function() {
							var $parent = $(this).parents(slctrPrntList);
							$parent.masonry("once", "layoutComplete", function() {
								$("html, body").stop().animate({
									scrollTop: $this.offset().top
								}, 333);
							});
							$parent.masonry("layout");
							$this.data("is-active", "true");
							$this.data("is-working", "false");
						});
					});
				}
			});
			
			var $titleAreas = $infoPanels.find(slctrTitleAreas);
			$titleAreas.click(function () {
				var $this = $(this).parents(slctrChldPanels).first();
				
				// We only need to do something if the mouse has left the click-trigggered active panel
				var isActive = $this.data("is-active");
				if (isActive == undefined) {
					isActive = "false";
				}
				var isWorking = $this.data("is-working");
				if (isWorking == undefined) {
					isWorking = "false";
				}
				
				if (isWorking = "false" && isActive == "true") {
					$this.data("is-working", "true");
					
					// Retreive previous CSS style rules
					var leftStyleSttng = $this.data("prev-left-setting");
					var widthStyleSttng = $this.data("prev-width-setting");
					
					// Animate the restoration of the original layout of the panel
					var $hiddenInfo = $this.find(slctrHiddenInfo);
					$hiddenInfo.stop().hide(200);
					$this.animate({
						"width" : widthStyleSttng,
						"left" : leftStyleSttng
					}, 333, function() {
						var zIndexStyleSttng = $this.data("prev-z-index-setting");					
						$this.css("z-index", zIndexStyleSttng);
						$this.parents(slctrPrntList).masonry("layout");
						$this.data("is-active", "false");
						$this.data("is-working", "false");
					});					
				}
			});
		});
	}
})(jQuery);