-- liquibase formatted sql
-- changeset gismap:init_core_gismap.sql
-- preconditions onFail:MARK_RAN onError:WARN
-- precondition-sql-check expectedResult:0 SELECT COUNT(*) FROM core_admin_right WHERE id_right = 'GISMAP_MANAGEMENT'
--
-- Dumping data for table core_admin_right
--
INSERT INTO core_admin_right (id_right,name,level_right,admin_url,description,is_updatable,plugin_name,id_feature_group,icon_url,documentation_url) VALUES
('GISMAP_MANAGEMENT','gismap.adminFeature.gismap_management.name',3,'jsp/admin/plugins/gismap/ManageGismap.jsp','gismap.adminFeature.gismap_management.description',0,'gismap','APPLICATIONS','ti ti-map',NULL);


--
-- Dumping data for table core_user_right
--
INSERT INTO core_user_right (id_right,id_user) VALUES ('GISMAP_MANAGEMENT',1);
INSERT INTO core_user_right (id_right,id_user) VALUES ('GISMAP_MANAGEMENT',2);


-- changeset gismap:init_core_gismap-rev1.sql
-- preconditions onFail:MARK_RAN onError:WARN
UPDATE core_admin_right SET icon_url = 'ti ti-map' WHERE id_right = 'GISMAP_MANAGEMENT' AND ( icon_url IS NULL OR icon_url = '' OR icon_url = 'images/admin/skin/plugins/gismap/gismap.png' );
