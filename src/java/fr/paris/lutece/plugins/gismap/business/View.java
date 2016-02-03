/*
 * Copyright (c) 2002-2014, Mairie de Paris
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions
 * are met:
 *
 *  1. Redistributions of source code must retain the above copyright notice
 *     and the following disclaimer.
 *
 *  2. Redistributions in binary form must reproduce the above copyright notice
 *     and the following disclaimer in the documentation and/or other materials
 *     provided with the distribution.
 *
 *  3. Neither the name of 'Mairie de Paris' nor 'Lutece' nor the names of its
 *     contributors may be used to endorse or promote products derived from
 *     this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDERS OR CONTRIBUTORS BE
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 *
 * License 1.0
 */
package fr.paris.lutece.plugins.gismap.business;

import java.util.HashMap;
import java.util.Map;


public class View
{
    private int _nId;
    private String _strServerName;
    private String _strFeatureNS;
    private String _strTemplateFile;
    private String _strAvailableParameters;
    private String _strAvailableParametersLayers;
    private String _strAvailableParametersStyles;
    private String _strAvailableParametersStyleRules;
    private String _strJsFile;
    private Map<String, String> _mapParameters = new HashMap<String, String>(  );

    /**
     * Returns the Id
     * @return The Id
     */
    public int getId(  )
    {
        return _nId;
    }

    /**
     * Sets the Id
     * @param nId The Id
     */
    public void setId( int nId )
    {
        _nId = nId;
    }

    public String getTemplateFile(  )
    {
        return _strTemplateFile;
    }

    public void setTemplateFile( String templateFile )
    {
        this._strTemplateFile = templateFile;
    }

    public void setJsFile( String _strJsFile )
    {
        this._strJsFile = _strJsFile;
    }

    public String getJsFile(  )
    {
        return _strJsFile;
    }

    public void setServerName( String _strServerName )
    {
        this._strServerName = _strServerName;
    }

    public String getServerName(  )
    {
        return _strServerName;
    }

    public Map<String, String> getParameters(  )
    {
        return _mapParameters;
    }

    public void setParameters( Map<String, String> mapParameters )
    {
        this._mapParameters = mapParameters;
    }

    public void putParameter( String strKey, String strValue )
    {
        _mapParameters.put( strKey, strValue );
    }

    public String getParameter( String strKey )
    {
        return _mapParameters.get( strKey );
    }

    public void setFeatureNS( String _strFeatureNS )
    {
        this._strFeatureNS = _strFeatureNS;
    }

    public String getFeatureNS(  )
    {
        return _strFeatureNS;
    }

    public void setAvailableParameters( String _strAvailableParameters )
    {
        this._strAvailableParameters = _strAvailableParameters;
    }

    public String getAvailableParameters(  )
    {
        return _strAvailableParameters;
    }

    public void setAvailableParametersLayers( String _strAvailableParametersLayers )
    {
        this._strAvailableParametersLayers = _strAvailableParametersLayers;
    }

    public String getAvailableParametersLayers(  )
    {
        return _strAvailableParametersLayers;
    }

    public void setAvailableParametersStyles( String _strAvailableParametersStyles )
    {
        this._strAvailableParametersStyles = _strAvailableParametersStyles;
    }

    public String getAvailableParametersStyles(  )
    {
        return _strAvailableParametersStyles;
    }

    public void setAvailableParametersStyleRules( String _strAvailableParametersStyleRules )
    {
        this._strAvailableParametersStyleRules = _strAvailableParametersStyleRules;
    }

    public String getAvailableParametersStyleRules(  )
    {
        return _strAvailableParametersStyleRules;
    }
}
