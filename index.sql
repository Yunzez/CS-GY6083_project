create nonclustered index AFZ_Activity_ST_index
	on AFZ_Activity (Source_Type)
go

create nonclustered index AFZ_Facility_ST_Index
    on AFZ_Facility (Source_Type)
GO

create nonclustered index AFZ_Facility_LS_Index
    on AFZ_Facility (Location_Section_ID)
GO

create unique index AFZ_Visitors_Email_uindex
	on AFZ_Visitors (Email)
go

create nonclustered index AFZ_Activity_VI_Index
    on AFZ_Visitors (Visitor_ID)
Go