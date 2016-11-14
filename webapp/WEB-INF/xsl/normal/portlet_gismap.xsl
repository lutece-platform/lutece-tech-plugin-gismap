<?xml version="1.0"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:output method="html" indent="yes"/>
<xsl:template match="portlet">
	<div class="portlet -lutece-border-radius append-bottom">
		<xsl:apply-templates select="form-portlet" />
	</div>
</xsl:template>

<xsl:template match="form-portlet">
	<xsl:apply-templates select="form-portlet-content" />
</xsl:template>

<xsl:template match="form-portlet-content">
	<xsl:value-of disable-output-escaping="yes" select="." />
</xsl:template>

</xsl:stylesheet>