export const getAll=() => {
    fetch('http://templateapiort.azurewebsites.net/api/persona/')
    .then(resp => resp.json())
    .then(respJson => setCont(respJson))
    .catch(err=> console.log("Error:" , err))
}


/*sql

USE [master]
GO
/****** Object:  Database [TuProfesor]    Script Date: 20/5/2022 11:29:31 ******/
/*CREATE DATABASE [TuProfesor]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'Tuprofesor', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL14.MSSQLSERVER\MSSQL\DATA\Tuprofesor.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'Tuprofesor_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL14.MSSQLSERVER\MSSQL\DATA\Tuprofesor_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
GO
ALTER DATABASE [TuProfesor] SET COMPATIBILITY_LEVEL = 140
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [TuProfesor].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [TuProfesor] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [TuProfesor] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [TuProfesor] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [TuProfesor] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [TuProfesor] SET ARITHABORT OFF 
GO
ALTER DATABASE [TuProfesor] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [TuProfesor] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [TuProfesor] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [TuProfesor] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [TuProfesor] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [TuProfesor] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [TuProfesor] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [TuProfesor] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [TuProfesor] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [TuProfesor] SET  DISABLE_BROKER 
GO
ALTER DATABASE [TuProfesor] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [TuProfesor] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [TuProfesor] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [TuProfesor] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [TuProfesor] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [TuProfesor] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [TuProfesor] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [TuProfesor] SET RECOVERY FULL 
GO
ALTER DATABASE [TuProfesor] SET  MULTI_USER 
GO
ALTER DATABASE [TuProfesor] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [TuProfesor] SET DB_CHAINING OFF 
GO
ALTER DATABASE [TuProfesor] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [TuProfesor] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [TuProfesor] SET DELAYED_DURABILITY = DISABLED 
GO
EXEC sys.sp_db_vardecimal_storage_format N'TuProfesor', N'ON'
GO
ALTER DATABASE [TuProfesor] SET QUERY_STORE = OFF
GO
USE [TuProfesor]
GO
/****** Object:  User [alumno]    Script Date: 20/5/2022 11:29:31 ******/
/*CREATE USER [alumno] FOR LOGIN [alumno] WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  Table [dbo].[Alumno]    Script Date: 20/5/2022 11:29:31 ******/
/*SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Alumno](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[email] [varchar](50) NOT NULL,
	[password] [varchar](50) NOT NULL,
	[ubicacion] [varchar](50) NOT NULL,
 CONSTRAINT [PK_Alumno] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Peticion]    Script Date: 20/5/2022 11:29:31 ******/
/*SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Peticion](
	[idPeticion] [int] IDENTITY(1,1) NOT NULL,
	[idProfesor] [int] NOT NULL,
	[idAlumno] [int] NOT NULL,
	[detalles] [varchar](50) NOT NULL,
	[telefonoalumno] [int] NOT NULL,
	[horario] [datetime] NOT NULL,
 CONSTRAINT [PK_Peticion] PRIMARY KEY CLUSTERED 
(
	[idPeticion] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Profesor]    Script Date: 20/5/2022 11:29:31 ******/
/*SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Profesor](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[nombre] [varchar](50) NOT NULL,
	[apellido] [varchar](50) NOT NULL,
	[email] [varchar](50) NOT NULL,
	[password] [varchar](50) NOT NULL,
	[borndate] [date] NOT NULL,
	[ubicacion] [varchar](50) NOT NULL,
	[telefono] [int] NOT NULL,
	[activo] [bit] NOT NULL,
	[disponibilidad] [date] NOT NULL,
	[tipo] [bit] NOT NULL,
	[idmateria] [int] NOT NULL,
 CONSTRAINT [PK_Profesor] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TipoClase]    Script Date: 20/5/2022 11:29:31 ******/
/*SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TipoClase](
	[idTipo] [bit] NOT NULL,
	[nombre] [varchar](50) NOT NULL,
 CONSTRAINT [PK_TipoClase] PRIMARY KEY CLUSTERED 
(
	[idTipo] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
INSERT [dbo].[TipoClase] ([idTipo], [nombre]) VALUES (0, N'Virtual')
INSERT [dbo].[TipoClase] ([idTipo], [nombre]) VALUES (1, N'Presencial')
GO
USE [master]
GO
ALTER DATABASE [TuProfesor] SET  READ_WRITE 
GO*/
