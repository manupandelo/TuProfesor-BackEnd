USE [master]
GO
CREATE LOGIN [nosotros] WITH PASSWORD=N'nosotros', DEFAULT_DATABASE=[TuProfesor], CHECK_EXPIRATION=OFF, CHECK_POLICY=OFF
GO

USE [TuProfesor]
GO
CREATE USER [nosotros] FOR LOGIN [nosotros]
GO
USE [TP_DAI]
GO
ALTER ROLE [db_owner] ADD MEMBER [nosotros]
GO
