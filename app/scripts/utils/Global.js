/**
 * Global is used to define constants and Enums which are used at globally
 * application level
 * 
 * @Class Global
 * @constructor
 */
'use strict';

/* exported Global */

var Global = (function() {
	/**
	 * RestServiceUrl is used to store all Rest Web URL's
	 * 
	 * @property RestServiceUrl
	 * @type String
	 */
	var RestServiceUrl = {
		NECollection : 'https://chiana.ems.adtran.com:8443/aoe/RetrieveNEs.action?view=json&classesToQuery=Adtran.AdtranSystem,Adtran.AdtranShelf,RedCell.Config.DiscoveredEntities&locations=All%20Locations&pageNumber=1&pageSize=25&username=admin&password=password'
	// NECollection :'http://graph.facebook.com/pivotalsoftware'
	};

	/**
	 * config is used for configuration data
	 * 
	 * @property config
	 * @type Object
	 */
	var config = {
		THRESHOLD_SEARCH_PAUSE_TIME : 2000
	};

	/**
	 * nodeSearchType is used for supported search type control panel
	 * 
	 * @property nodeSearchType
	 * @type Json
	 */
	var nodeSearchType = {
		ALL : 'all',
		CUSTOMER : 'custmer',
		DEVICE : 'device',
		NETWORK : 'network',
		SERVICE : 'service',
		TEMPLATE : 'template'
	};
	return {
		RestServiceUrl : RestServiceUrl,
		config : config,
		nodeSearchType : nodeSearchType
	};
})();
