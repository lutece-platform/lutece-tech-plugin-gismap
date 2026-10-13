-- liquibase formatted sql
-- changeset gismap:update_db_gismap-2.9.9-3.0.0.sql
-- preconditions onFail:MARK_RAN onError:WARN
UPDATE core_admin_right SET icon_url = 'ti ti-map' WHERE id_right = 'GISMAP_MANAGEMENT' AND ( icon_url IS NULL OR icon_url = '' OR icon_url = 'images/admin/skin/plugins/gismap/gismap.png' );
