var announceNS = announceNS || {};
var lgbUseful = lgbUseful || {};
'use strict';

lgbUseful.loadCSS = function(filename) {

       var file = document.createElement("link")
       file.setAttribute("rel", "stylesheet")
       file.setAttribute("type", "text/css")
       file.setAttribute("href", filename)

       if (typeof file !== "undefined")
          document.getElementsByTagName("head")[0].appendChild(file)
    
};

announceNS.announceItem = {
	customItemHtml: function(ctx) {
		var html = "";
		html += "<li>";
		html += ctx.CurrentItem.Title;
		html += "</li>"

		return html;
	}
	
};

(function() {
	
	lgbUseful.loadCSS("announce.css")
	var ctxAnnounce = {};
	ctxAnnounce.Templates = {};
	
	ctxAnnounce.Templates.Header = "<ul>";
	ctxAnnounce.Templates.Item = announceNS.announceItem.customItemHtml;
	ctxAnnounce.Templates.Footer = "</ul>";
	ctxAnnounce.BaseViewID = 99;
	
	ExecuteOrDelayUntilScriptLoaded(function(){
		
		//Take a copy of the existing Microsoft Definition of RenderListView
		var oldRenderListView = RenderListView;
		
		//Now redefine RenderListView with our override
		RenderListView = function(ctx,webPartID)
		{
			//Check the context of the currently rendering List view
			if (ctx.ListTitle == "Announcements")
			{
				//Override the BaseViewID if it's the one we want.
				ctx.BaseViewID = 99;
				} else {
				ctx.BaseViewID = 1;
			}
			
			//now call the original RenderListView
			oldRenderListView(ctx,webPartID);
		}
		
	},"ClientTemplates.js");
	SPClientTemplates.TemplateManager.RegisterTemplateOverrides(ctxAnnounce);
})();

