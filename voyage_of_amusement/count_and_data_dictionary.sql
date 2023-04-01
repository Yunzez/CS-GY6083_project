-- Table Count
SELECT
    t.name AS table_name,
    SUM(p.rows) AS row_count
FROM
    sys.tables AS t
INNER JOIN
    sys.partitions AS p ON t.object_id = p.object_id
WHERE
    t.is_ms_shipped = 0
    AND p.index_id IN (0,1)
GROUP BY
    t.name
ORDER BY
    row_count DESC;

-- Select All tables from the schema
select table_schema, table_name
from information_schema.tables
where table_name like 'AFZ%' and table_schema='dbo';

-- Select all columns name, datatype, size, comment
SELECT
    c.TABLE_SCHEMA as database_schema,
    c.TABLE_NAME as table_name,
    c.COLUMN_NAME as column_name,
    c.ORDINAL_POSITION as column_id,
    c.DATA_TYPE as data_type,
    c.CHARACTER_MAXIMUM_LENGTH as data_size,
    c.IS_NULLABLE as is_optional,
    ep.value AS COLUMN_COMMENT
FROM
    INFORMATION_SCHEMA.COLUMNS c
    LEFT JOIN sys.extended_properties ep ON
        ep.major_id = OBJECT_ID(c.TABLE_SCHEMA + '.' + c.TABLE_NAME) AND
        ep.minor_id = c.ORDINAL_POSITION AND
        ep.class = 1
WHERE
    c.TABLE_NAME like 'AFZ%' AND
    c.TABLE_SCHEMA = 'dbo'

-- Column Constraints
select
    CONSTRAINT_SCHEMA as database_schema,
    CONSTRAINT_NAME as constraint_name,
    TABLE_NAME as table_name,
    CONSTRAINT_TYPE
from information_schema.table_constraints
where table_name like 'AFZ%' and table_schema='dbo'
order by table_name;
