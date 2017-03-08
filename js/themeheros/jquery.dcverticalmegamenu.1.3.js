/*
 * DC Vertical Mega Menu - jQuery vertical mega menu
 * Copyright (c) 2011 Design Chemical
 *
 * Dual licensed under the MIT and GPL licenses:
 * 	http://www.opensource.org/licenses/mit-license.php
 * 	http://www.gnu.org/licenses/gpl.html
 *
 */
(function($jd){
$jd = jQuery.noConflict();
	//define the new for the plugin ans how to call it	
	$jd.fn.dcVerticalMegaMenu = function(options){
		//set default options  
		var defaults = {
			classParent: 'dc-mega',
			arrow: true,
			classArrow: 'dc-mega-icon',
			classContainer: 'sub-container',
			classSubMenu: 'sub',
			classMega: 'mega',
			classSubParent: 'mega-hdr',
			classSubLink: 'mega-hdr',
			classRow: 'left-nav',
			rowItems: 3,
			speed: 'fast',
			effect: 'show',
			direction: 'right'
		};

		//call in the default otions
		var options = $jd.extend(defaults, options);
		var $jddcVerticalMegaMenuObj = this;

		//act upon the element that is passed into the design    
		return $jddcVerticalMegaMenuObj.each(function(options){

			$jdmega = $jd(this);
			if(defaults.direction == 'left'){
				$jdmega.addClass('left');
			} else {
				$jdmega.addClass('right');
			}
			// Get Menu Width
			var megaWidth = $jdmega.width();
			
			// Set up menu
			$jd('> li',$jdmega).each(function(){
				
				var $jdparent = $jd(this);
				var $jdmegaSub = $jd('> ul',$jdparent);
	
				if($jdmegaSub.length > 0){
					
				$jd('> a',$jdparent).addClass(defaults.classParent).append('<span class="'+defaults.classArrow+'"></span>');
					$jdmegaSub.addClass(defaults.classSubMenu).wrap('<div class="'+defaults.classContainer+'" />');
					var $jdcontainer = $jd('.'+defaults.classContainer,$jdparent);
					
					if($jd('ul',$jdmegaSub).length > 0){
						
						$jdparent.addClass(defaults.classParent+'-li');
						$jdcontainer.addClass(defaults.classMega);
						
						// Set sub headers
						$jd('> li',$jdmegaSub).each(function(){
							$jd(this).addClass('mega-unit');
							if($jd('> ul',this).length){
								$jd(this).addClass(defaults.classSubParent);
								$jd('> a',this).addClass(defaults.classSubParent+'-a');
							} else {
								$jd(this).addClass(defaults.classSubLink);
								$jd('> a',this).addClass(defaults.classSubLink+'-a');
							}
						});
						
						// Create Rows
						var hdrs = $jd('.mega-unit',$jdparent);
						rowSize = parseInt(defaults.rowItems);
						for(var i = 0; i < hdrs.length; i+=rowSize){
							hdrs.slice(i, i+rowSize).wrapAll('<div class="'+defaults.classRow+'" />');
						}

						// Get mega dimensions
						var itemWidth = $jd('.mega-unit',$jdmegaSub).outerWidth(true);
						var rowItems = $jd('.left-nav:eq(0) .mega-unit',$jdmegaSub).length;
						var innerItemWidth = itemWidth * rowItems;
						var totalItemWidth = innerItemWidth + containerPad;

						// Set mega header height
						$jd('.left-nav',this).each(function(){
							$jd('.mega-unit:last',this).addClass('last');
							var maxValue = undefined;
							$jd('.mega-unit > a',this).each(function(){
								var val = parseInt($jd(this).height());
								if (maxValue === undefined || maxValue < val){
									maxValue = val;
								}
							});
							$jd('.mega-unit > a',this).css('height',maxValue+'px');
							$jd(this).css('width',innerItemWidth+'px');
						});
						var subWidth = $jdmegaSub.outerWidth(true);
						var totalWidth = $jdcontainer.outerWidth(true);
						var containerPad = totalWidth - subWidth;
						// Calculate Row Height
						$jd('.left-nav',$jdmegaSub).each(function(){
							var rowHeight = $jd(this).height();
							$jd(this).parent('.left-nav').css('height',rowHeight+'px');
						});
						$jd('.left-nav:last',$jdmegaSub).addClass('last');
						$jd('.left-nav:first',$jdmegaSub).addClass('first');
					} else {
						$jdcontainer.addClass('non-'+defaults.classMega);
					}
				} 
			
				var $jdcontainer = $jd('.'+defaults.classContainer,$jdparent);
				var subWidth = $jdmegaSub.outerWidth(true);
				// Get flyout height
				var subHeight = $jdcontainer.height();
				var itemHeight = $jdparent.outerHeight(true);
				// Set position to top of parent
				$jdcontainer.css({
					//height: subHeight+'px',
					marginTop: -itemHeight+'px',
					zIndex: '1000',
					//width: subWidth+'px'
				}).hide();
			});

			// HoverIntent Configuration
			var config = {
				sensitivity: 2, // number = sensitivity threshold (must be 1 or higher)
				interval: 100, // number = milliseconds for onMouseOver polling interval
				over: megaOver, // function = onMouseOver callback (REQUIRED)
				timeout: 0, // number = milliseconds delay before onMouseOut
				out: megaOut // function = onMouseOut callback (REQUIRED)
			};
			
			$jd('li',$jddcVerticalMegaMenuObj).hoverIntent(config);
				
			function megaOver(){
				$jd(this).addClass('mega-hover');
				var $jdlink = $jd('> a',this);
				var $jdsubNav = $jd('.sub',this);
				var $jdcontainer = $jd('.sub-container',this);
				var width = $jdcontainer.width();
				var outerHeight = $jdcontainer.outerHeight();
				var height = $jdcontainer.height();
				var itemHeight = $jd(this).outerHeight(true);
				var offset = $jdlink.offset();
				var scrollTop = $jd(window).scrollTop();
				var offset = offset.top - scrollTop
				var bodyHeight = $jd(window).height();
				var maxHeight = bodyHeight - offset;
				var xsHeight = maxHeight - outerHeight;
			
				if(xsHeight < 0){
					var containerMargin = xsHeight - itemHeight;
					$jdcontainer.css({marginTop: containerMargin+'px'});
				}
				
				var containerPosition = {right: megaWidth};
				if(defaults.direction == 'right'){
					containerPosition = {left: megaWidth};
				}
				
				if(defaults.effect == 'fade'){
					$jdcontainer.css(containerPosition).fadeIn(defaults.speed);
				}
				if(defaults.effect == 'show'){
					$jdcontainer.css(containerPosition).show();
				}
				if(defaults.effect == 'slide'){
					$jdcontainer.css({
						width: 0,
						height: 0,
						opacity: 0});
					
					if(defaults.direction == 'right'){
				
						$jdcontainer.show().css({
							left: megaWidth
						});
					} else {
					
						$jdcontainer.show().css({
							right: megaWidth
						});
					}
					$jdcontainer.animate({
							width: width,
							height: height,
							opacity: 1
						}, defaults.speed);
				}
			}
			
			function megaOut(){
				$jd(this).removeClass('mega-hover');
				var $jdcontainer = $jd('.sub-container',this);
				$jdcontainer.hide();
			}
		});
	};
})(jQuery);