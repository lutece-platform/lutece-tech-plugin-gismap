--
-- Dumping data for table core_admin_right
--
INSERT INTO core_admin_right (id_right,name,level_right,admin_url,description,is_updatable,plugin_name,id_feature_group,icon_url,documentation_url) VALUES
('GISMAP_MANAGEMENT','gismap.adminFeature.gismap_management.name',3,'jsp/admin/plugins/gismap/ManageGismap.jsp','gismap.adminFeature.gismap_management.description',0,'gismap','APPLICATIONS','images/admin/skin/plugins/gismap/gismap.png',NULL);


--
-- Dumping data for table core_user_right
--
INSERT INTO core_user_right (id_right,id_user) VALUES ('GISMAP_MANAGEMENT',1);
INSERT INTO core_user_right (id_right,id_user) VALUES ('GISMAP_MANAGEMENT',2);

