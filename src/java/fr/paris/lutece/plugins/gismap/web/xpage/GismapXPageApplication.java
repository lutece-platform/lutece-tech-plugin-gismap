package fr.paris.lutece.plugins.gismap.web.xpage;

import javax.servlet.http.HttpServletRequest;

import fr.paris.lutece.plugins.gismap.service.GismapService;
import fr.paris.lutece.portal.service.message.SiteMessageException;
import fr.paris.lutece.portal.service.plugin.Plugin;
import fr.paris.lutece.portal.service.security.UserNotSignedException;
import fr.paris.lutece.portal.service.util.AppPropertiesService;
import fr.paris.lutece.portal.web.xpages.XPage;
import fr.paris.lutece.portal.web.xpages.XPageApplication;

/**
 * 
 * Basic XPageApplication implementation for the Lutece GIS plugin
 *
 */
public class GismapXPageApplication implements XPageApplication{

    /**
     * HTTP-request parameter
     */
    private static final String PARAMETER_GISMAP_CODE 			= "gismap_code";
    
    /**
     * Properties
     */
    private static final String PROPERTY_XPAGE_VIEW 		= "gismap.xpage.view";
    private static final String PROPERTY_XPAGE_TITLE 		= "gismap.xpage.title";
    private static final String PROPERTY_XPAGE_KEYWORD 		= "gismap.xpage.keyword";
    private static final String PROPERTY_XPAGE_PATH_LABEL 	= "gismap.xpage.pathLabel";
    
    
	private static GismapService gisService = null;
	
	/**
	 * Initializes private static members
	 */
	static {
		gisService = GismapService.getInstance(  );
	}
	    
    
	@Override
	/**
	 * {@inheritDoc}
	 */
	public XPage getPage(HttpServletRequest request, int nMode, Plugin plugin)
			throws UserNotSignedException, SiteMessageException {
		  
		String strXpageView = AppPropertiesService.getProperty( PROPERTY_XPAGE_VIEW );
        String strXpageTitle = AppPropertiesService.getProperty( PROPERTY_XPAGE_TITLE );
        String strXpageKeyword = AppPropertiesService.getProperty( PROPERTY_XPAGE_KEYWORD );
        String strXpagePathLabel = AppPropertiesService.getProperty( PROPERTY_XPAGE_PATH_LABEL );
        
        String strContent = gisService.getXPageView( 
        		request.getParameter( PARAMETER_GISMAP_CODE ), strXpageView, request );
                
        return  GismapXPageApplication.buildXPage( strContent, strXpageTitle, strXpageKeyword, strXpagePathLabel );
	}

	/**
	 * Builds an XPage object based on the given parameters.
	 * 
	 * @param content @see fr.paris.lutece.portal.web.xpages#_strContent
	 * @param title @see fr.paris.lutece.portal.web.xpages#_strTitle
	 * @param keyword @see fr.paris.lutece.portal.web.xpages#_strKeyword
	 * @param pathLabel @see fr.paris.lutece.portal.web.xpages#_strPathLabel
	 * @return The XPage 
	 */
	private static final XPage buildXPage(String content, String title, String keyword, String pathLabel)
	{
		XPage xPage = new XPage();
		xPage.setContent(content);
		xPage.setTitle(title);
		xPage.setKeyword(keyword);
		xPage.setPathLabel(pathLabel);
		return xPage ;
	}
}
