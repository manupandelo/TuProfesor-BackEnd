USE [master]
GO
/****** Object:  Database [TuProfesor]    Script Date: 8/6/2022 10:10:22 ******/
CREATE DATABASE [TuProfesor]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'TuProfesor', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL14.MSSQLSERVER\MSSQL\DATA\TuProfesor.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'TuProfesor_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL14.MSSQLSERVER\MSSQL\DATA\TuProfesor_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
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
/****** Object:  User [alumno]    Script Date: 8/6/2022 10:10:22 ******/
CREATE USER [alumno] FOR LOGIN [alumno] WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  Table [dbo].[Alumno]    Script Date: 8/6/2022 10:10:22 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Alumno](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[email] [varchar](50) NOT NULL,
	[password] [varchar](50) NOT NULL,
	[ubicacion] [varchar](50) NOT NULL,
	[nombre] [varchar](50) NOT NULL,
	[apellido] [varchar](50) NOT NULL,
 CONSTRAINT [PK_Alumno] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Materia]    Script Date: 8/6/2022 10:10:22 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Materia](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[Materia] [varchar](50) NOT NULL,
 CONSTRAINT [PK_Materia] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[MateriaXProfesor]    Script Date: 8/6/2022 10:10:22 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[MateriaXProfesor](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[idProfesor] [int] NOT NULL,
	[idMateria] [int] NOT NULL,
 CONSTRAINT [PK_MateriaXProfesor] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Peticion]    Script Date: 8/6/2022 10:10:22 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Peticion](
	[idPeticion] [int] IDENTITY(1,1) NOT NULL,
	[idProfesor] [int] NOT NULL,
	[idAlumno] [int] NOT NULL,
	[detalles] [varchar](50) NOT NULL,
	[horario] [datetime] NOT NULL,
 CONSTRAINT [PK_Peticion] PRIMARY KEY CLUSTERED 
(
	[idPeticion] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Profesor]    Script Date: 8/6/2022 10:10:22 ******/
SET ANSI_NULLS ON
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
 CONSTRAINT [PK_Profesor] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Review]    Script Date: 8/6/2022 10:10:22 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Review](
	[idReview] [int] IDENTITY(1,1) NOT NULL,
	[idProfesor] [int] NOT NULL,
	[idAlumno] [int] NOT NULL,
	[calificacion] [int] NOT NULL,
	[descripcion] [varchar](max) NULL,
	[nombre] [varchar](max) NULL,
 CONSTRAINT [PK_Review] PRIMARY KEY CLUSTERED 
(
	[idReview] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TipoClase]    Script Date: 8/6/2022 10:10:22 ******/
SET ANSI_NULLS ON
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
SET IDENTITY_INSERT [dbo].[Alumno] ON 

INSERT [dbo].[Alumno] ([id], [email], [password], [ubicacion], [nombre], [apellido]) VALUES (1, N'manu@gmail.com', N'Manuuuuuu', N'Buenos Aires', N'Manuel', N'Pandelo')
INSERT [dbo].[Alumno] ([id], [email], [password], [ubicacion], [nombre], [apellido]) VALUES (2, N'valen@gmail.com', N'Valennnn', N'Santiago', N'Valentin', N'D''Eugenio')
INSERT [dbo].[Alumno] ([id], [email], [password], [ubicacion], [nombre], [apellido]) VALUES (3, N'santi@gmail.com', N'Santiiii', N'Cordoba', N'Santiago', N'Cascallar')
SET IDENTITY_INSERT [dbo].[Alumno] OFF
GO
SET IDENTITY_INSERT [dbo].[Materia] ON 

INSERT [dbo].[Materia] ([id], [Materia]) VALUES (1, N'Matematica')
INSERT [dbo].[Materia] ([id], [Materia]) VALUES (2, N'Programacion')
INSERT [dbo].[Materia] ([id], [Materia]) VALUES (3, N'Lengua')
INSERT [dbo].[Materia] ([id], [Materia]) VALUES (4, N'Contabilidad')
INSERT [dbo].[Materia] ([id], [Materia]) VALUES (5, N'Derecho')
INSERT [dbo].[Materia] ([id], [Materia]) VALUES (6, N'Guitarra')
INSERT [dbo].[Materia] ([id], [Materia]) VALUES (7, N'Piano')
INSERT [dbo].[Materia] ([id], [Materia]) VALUES (8, N'Artes')
INSERT [dbo].[Materia] ([id], [Materia]) VALUES (9, N'Estadistica')
INSERT [dbo].[Materia] ([id], [Materia]) VALUES (10, N'Filosofia')
INSERT [dbo].[Materia] ([id], [Materia]) VALUES (11, N'Historia')
INSERT [dbo].[Materia] ([id], [Materia]) VALUES (12, N'Etica')
INSERT [dbo].[Materia] ([id], [Materia]) VALUES (13, N'Geografia')
INSERT [dbo].[Materia] ([id], [Materia]) VALUES (14, N'Ingles')
INSERT [dbo].[Materia] ([id], [Materia]) VALUES (15, N'Hebreo')
INSERT [dbo].[Materia] ([id], [Materia]) VALUES (16, N'Italiano')
INSERT [dbo].[Materia] ([id], [Materia]) VALUES (17, N'Portugues')
INSERT [dbo].[Materia] ([id], [Materia]) VALUES (18, N'Fisica')
INSERT [dbo].[Materia] ([id], [Materia]) VALUES (19, N'Quimica')
INSERT [dbo].[Materia] ([id], [Materia]) VALUES (20, N'Analisis-Matematico')
INSERT [dbo].[Materia] ([id], [Materia]) VALUES (21, N'Aleman')
INSERT [dbo].[Materia] ([id], [Materia]) VALUES (22, N'Japones')
INSERT [dbo].[Materia] ([id], [Materia]) VALUES (23, N'Chino')
INSERT [dbo].[Materia] ([id], [Materia]) VALUES (24, N'Coreano')
SET IDENTITY_INSERT [dbo].[Materia] OFF
GO
SET IDENTITY_INSERT [dbo].[MateriaXProfesor] ON 

INSERT [dbo].[MateriaXProfesor] ([id], [idProfesor], [idMateria]) VALUES (1, 2, 1)
INSERT [dbo].[MateriaXProfesor] ([id], [idProfesor], [idMateria]) VALUES (2, 1, 2)
INSERT [dbo].[MateriaXProfesor] ([id], [idProfesor], [idMateria]) VALUES (3, 1, 14)
INSERT [dbo].[MateriaXProfesor] ([id], [idProfesor], [idMateria]) VALUES (4, 3, 3)
SET IDENTITY_INSERT [dbo].[MateriaXProfesor] OFF
GO
SET IDENTITY_INSERT [dbo].[Profesor] ON 

INSERT [dbo].[Profesor] ([id], [nombre], [apellido], [email], [password], [borndate], [ubicacion], [telefono], [activo], [disponibilidad], [tipo]) VALUES (1, N'Ezequiel ', N'Binker', N'binker@ort.edu.ar', N'binkerrr', CAST(N'2011-11-11' AS Date), N'Buenos Aires', 11111111, 1, CAST(N'2020-12-20' AS Date), 1)
INSERT [dbo].[Profesor] ([id], [nombre], [apellido], [email], [password], [borndate], [ubicacion], [telefono], [activo], [disponibilidad], [tipo]) VALUES (2, N'Martin', N'Torres', N'martintorres@ort.edu.ar', N'martintorres', CAST(N'2020-02-20' AS Date), N'Santiago', 22222222, 0, CAST(N'2020-12-20' AS Date), 0)
INSERT [dbo].[Profesor] ([id], [nombre], [apellido], [email], [password], [borndate], [ubicacion], [telefono], [activo], [disponibilidad], [tipo]) VALUES (3, N'la de lengua', N'no se', N'lengua@ort.edu.ar', N'lenguaaa', CAST(N'1850-10-10' AS Date), N'Cordoba', 33333333, 0, CAST(N'2020-12-20' AS Date), 1)
SET IDENTITY_INSERT [dbo].[Profesor] OFF
GO
INSERT [dbo].[TipoClase] ([idTipo], [nombre]) VALUES (0, N'Virtual')
INSERT [dbo].[TipoClase] ([idTipo], [nombre]) VALUES (1, N'Presencial')
GO
ALTER TABLE [dbo].[MateriaXProfesor]  WITH CHECK ADD  CONSTRAINT [FK_MateriaXProfesor_Materia] FOREIGN KEY([idMateria])
REFERENCES [dbo].[Materia] ([id])
GO
ALTER TABLE [dbo].[MateriaXProfesor] CHECK CONSTRAINT [FK_MateriaXProfesor_Materia]
GO
ALTER TABLE [dbo].[MateriaXProfesor]  WITH CHECK ADD  CONSTRAINT [FK_MateriaXProfesor_Profesor] FOREIGN KEY([idProfesor])
REFERENCES [dbo].[Profesor] ([id])
GO
ALTER TABLE [dbo].[MateriaXProfesor] CHECK CONSTRAINT [FK_MateriaXProfesor_Profesor]
GO
ALTER TABLE [dbo].[Peticion]  WITH CHECK ADD  CONSTRAINT [FK_Peticion_Alumno] FOREIGN KEY([idAlumno])
REFERENCES [dbo].[Alumno] ([id])
GO
ALTER TABLE [dbo].[Peticion] CHECK CONSTRAINT [FK_Peticion_Alumno]
GO
ALTER TABLE [dbo].[Peticion]  WITH CHECK ADD  CONSTRAINT [FK_Peticion_Profesor] FOREIGN KEY([idProfesor])
REFERENCES [dbo].[Profesor] ([id])
GO
ALTER TABLE [dbo].[Peticion] CHECK CONSTRAINT [FK_Peticion_Profesor]
GO
ALTER TABLE [dbo].[Profesor]  WITH CHECK ADD  CONSTRAINT [FK_Profesor_TipoClase] FOREIGN KEY([tipo])
REFERENCES [dbo].[TipoClase] ([idTipo])
GO
ALTER TABLE [dbo].[Profesor] CHECK CONSTRAINT [FK_Profesor_TipoClase]
GO
ALTER TABLE [dbo].[Review]  WITH CHECK ADD  CONSTRAINT [FK_Review_Alumno] FOREIGN KEY([idAlumno])
REFERENCES [dbo].[Alumno] ([id])
GO
ALTER TABLE [dbo].[Review] CHECK CONSTRAINT [FK_Review_Alumno]
GO
ALTER TABLE [dbo].[Review]  WITH CHECK ADD  CONSTRAINT [FK_Review_Profesor] FOREIGN KEY([idProfesor])
REFERENCES [dbo].[Profesor] ([id])
GO
ALTER TABLE [dbo].[Review] CHECK CONSTRAINT [FK_Review_Profesor]
GO
USE [master]
GO
ALTER DATABASE [TuProfesor] SET  READ_WRITE 
GO
