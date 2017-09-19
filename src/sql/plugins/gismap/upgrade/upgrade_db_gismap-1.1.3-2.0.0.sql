-- Delete gismap portlet tables
-- WARNING!!!! DON'T RUN THIS SCRIPT if some gismap portlets have been created with plusgin-gismap version 1.1.* .
-- instead use module-directory-gismap db_upgrade script to update gismap portlet definition and instances


-- Remove Table structure for table gismap_portlet
-- DROP TABLE IF EXISTS gismap_portlet;

-- Remove data for table core_portlet_type
-- DELETE from core_portlet_type WHERE id_portlet_type = 'GISMAP_PORTLET';

-- Remove data for table `core_style`
-- DELETE FROM core_style WHERE id_style = 1501 AND id_portlet_type = 'GISMAP_PORTLET';

-- DELETE FROM core_stylesheet WHERE id_stylesheet = 9000 AND description = 'Rubrique gismap - Défaut';
-- DELETE FROM core_style_mode_stylesheet WHERE id_style = 1501 AND id_stylesheet = 9000;