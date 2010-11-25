jQuery(document).ready( function() {
	var j = jQuery;
		
	// topic follow/mute
	j(".ass-topic-subscribe > a").click( function() {
		it = j(this);
		var theid = j(this).attr('id');
		var stheid = theid.split('-');
		
		//j('.pagination .ajax-loader').toggle();
			
		var data = {
			action: 'ass_ajax',
			a: stheid[0],
			topic_id: stheid[1]
			//,_ajax_nonce: stheid[2]
		};
				
		// TODO: add ajax code to give status feedback that will fade out
				
		j.post( ajaxurl, data, function( response ) {
			if ( response == 'follow' ) {
				var m = 'Mute';
				theid = theid.replace( 'follow', 'mute' );
			} else if ( response == 'mute' ) {
				var m = 'Follow';
				theid = theid.replace( 'mute', 'follow' );
			} else {
				var m = 'Error';
			}
					
			j(it).html(m);
			j(it).attr('id', theid);
			j(it).attr('title', '');
			
			//j('.pagination .ajax-loader').toggle();
			
		});
	});


	// group subscription options
	j(".group-sub").live("click", function() {
		it = j(this);
		var theid = j(this).attr('id');
		var stheid = theid.split('-');
		group_id = stheid[1];
		current = j( '#gsubstat-'+group_id ).html();
		j('#gsubajaxload-'+group_id).toggle();
		
		var data = {
			action: 'ass_group_ajax',
			a: stheid[0],
			group_id: stheid[1]
			//,_ajax_nonce: stheid[2]
		};
		
		j.post( ajaxurl, data, function( response ) {
			status = j(it).html();
			if ( !current || current == 'No Email' ) {
				j( '#gsublink-'+group_id ).html('change');
				//status = status + ' / ';
			}
			j( '#gsubstat-'+group_id ).html( status ); //add .animate({opacity: 1.0}, 2000) to slow things down for testing
			j( '#gsubstat-'+group_id ).addClass( 'gemail_icon' );
			j( '#gsubopt-'+group_id ).slideToggle('fast');
			j( '#gsubajaxload-'+group_id ).toggle();
		});		
		
	});
		
	j('.group-subscription-options-link').live("click", function() {
		stheid = j(this).attr('id').split('-');
		group_id = stheid[1];
		j( '#gsubopt-'+group_id ).slideToggle('fast');
	});
	
	j('.group-subscription-close').live("click", function() {
		stheid = j(this).attr('id').split('-');
		group_id = stheid[1];
		j( '#gsubopt-'+group_id ).slideToggle('fast');
	});
	
	//j('.ass-settings-advanced-link').click( function() {
	//	j( '.ass-settings-advanced' ).slideToggle('fast');
	//});
	
	j('.group-subscription-options').hide();
	
});