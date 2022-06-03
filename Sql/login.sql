USE [master]
GO
CREATE LOGIN [TuProfesor] WITH PASSWORD=N'TuProfesor', DEFAULT_DATABASE=[TuProfesor], CHECK_EXPIRATION=OFF, CHECK_POLICY=OFF
GO

USE [TuProfesor]
GO
CREATE USER [TuProfesor] FOR LOGIN [TuProfesor]
GO
USE [TuProfesor]
GO
ALTER ROLE [db_owner] ADD MEMBER [TuProfesor]
GO
