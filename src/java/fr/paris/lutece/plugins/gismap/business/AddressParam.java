/*
 * Copyright (c) 2002-2015, Mairie de Paris
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

import java.util.List;


public class AddressParam
{
    private String _strUrl;
    private String _strDelay;
    private String _strMinLength;
    private String _strListType;
    private String _strNbResult;
    private String _strClientId;

    /**
     * @return the _strUrl
     */
    public String getUrl(  )
    {
        return _strUrl;
    }

    /**
     * @param strUrl the strUrl to set
     */
    public void setUrl( String strUrl )
    {
        this._strUrl = strUrl;
    }

    /**
     * @return the _strDelay
     */
    public String getDelay(  )
    {
        return _strDelay;
    }

    /**
     * @param strDelay the strDelay to set
     */
    public void setDelay( String strDelay )
    {
        this._strDelay = strDelay;
    }

    /**
     * @return the _strMinLength
     */
    public String getMinLength(  )
    {
        return _strMinLength;
    }

    /**
     * @param strMinLength the strMinLength to set
     */
    public void setMinLength( String strMinLength )
    {
        this._strMinLength = strMinLength;
    }

    /**
     * @return the _listType
     */
    public String getListType(  )
    {
        return _strListType;
    }

    /**
     * @param strListType the strListType to set
     */
    public void setListType( String strListType )
    {
        this._strListType = strListType;
    }

    /**
     * @return the _strNbResult
     */
    public String getNbResult(  )
    {
        return _strNbResult;
    }

    /**
     * @param strNbResult the strNbResult to set
     */
    public void setNbResult( String strNbResult )
    {
        this._strNbResult = strNbResult;
    }

    /**
     * @return the _strClientId
     */
    public String getClientId(  )
    {
        return _strClientId;
    }

    /**
     * @param strClientId the strClientId to set
     */
    public void setClientId( String strClientId )
    {
        this._strClientId = strClientId;
    }
}
