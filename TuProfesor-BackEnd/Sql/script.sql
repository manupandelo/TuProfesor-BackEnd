USE [master]
GO
/****** Object:  Database [TuProfesor]    Script Date: 6/7/2022 10:38:28 ******/
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
/****** Object:  User [TuProfesor]    Script Date: 6/7/2022 10:38:28 ******/
CREATE USER [TuProfesor] FOR LOGIN [TuProfesor] WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  User [alumno]    Script Date: 6/7/2022 10:38:28 ******/
CREATE USER [alumno] FOR LOGIN [alumno] WITH DEFAULT_SCHEMA=[dbo]
GO
ALTER ROLE [db_owner] ADD MEMBER [TuProfesor]
GO
/****** Object:  Table [dbo].[Alumno]    Script Date: 6/7/2022 10:38:29 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Alumno](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[ubicacion] [varchar](50) NOT NULL,
	[nombre] [varchar](50) NOT NULL,
	[apellido] [varchar](50) NOT NULL,
	[idUser] [int] NULL,
 CONSTRAINT [PK_Alumno] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Materia]    Script Date: 6/7/2022 10:38:29 ******/
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
/****** Object:  Table [dbo].[MateriaXProfesor]    Script Date: 6/7/2022 10:38:29 ******/
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
/****** Object:  Table [dbo].[Peticion]    Script Date: 6/7/2022 10:38:29 ******/
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
/****** Object:  Table [dbo].[Profesor]    Script Date: 6/7/2022 10:38:29 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Profesor](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[nombre] [varchar](50) NOT NULL,
	[apellido] [varchar](50) NOT NULL,
	[borndate] [date] NOT NULL,
	[ubicacion] [varchar](50) NOT NULL,
	[telefono] [int] NOT NULL,
	[activo] [bit] NOT NULL,
	[disponibilidad] [date] NOT NULL,
	[tipo] [bit] NOT NULL,
	[idUser] [int] NULL,
 CONSTRAINT [PK_Profesor] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Review]    Script Date: 6/7/2022 10:38:29 ******/
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
/****** Object:  Table [dbo].[TipoClase]    Script Date: 6/7/2022 10:38:29 ******/
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
/****** Object:  Table [dbo].[TipoUsuario]    Script Date: 6/7/2022 10:38:29 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TipoUsuario](
	[id] [bit] NOT NULL,
	[nombre] [varchar](50) NOT NULL,
 CONSTRAINT [PK_TipoUsuario] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Usuario]    Script Date: 6/7/2022 10:38:29 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Usuario](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[email] [varchar](50) NOT NULL,
	[password] [varchar](255) NOT NULL,
	[tipo] [bit] NOT NULL,
 CONSTRAINT [PK_Usuario] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[Alumno] ON 

INSERT [dbo].[Alumno] ([id], [ubicacion], [nombre], [apellido], [idUser]) VALUES (1, N'Buenos Aires', N'Manuel', N'Pandelo', 6)
INSERT [dbo].[Alumno] ([id], [ubicacion], [nombre], [apellido], [idUser]) VALUES (2, N'Santiago', N'Valentin', N'D''Eugenio', 7)
INSERT [dbo].[Alumno] ([id], [ubicacion], [nombre], [apellido], [idUser]) VALUES (3, N'Cordoba', N'Santiago', N'Cascallar', NULL)
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
SET IDENTITY_INSERT [dbo].[Peticion] ON 

INSERT [dbo].[Peticion] ([idPeticion], [idProfesor], [idAlumno], [detalles], [horario]) VALUES (1, 1, 1, N'aaaa', CAST(N'2020-12-12T15:24:00.000' AS DateTime))
INSERT [dbo].[Peticion] ([idPeticion], [idProfesor], [idAlumno], [detalles], [horario]) VALUES (3, 2, 1, N'bbbb', CAST(N'2020-12-13T16:00:00.000' AS DateTime))
SET IDENTITY_INSERT [dbo].[Peticion] OFF
GO
SET IDENTITY_INSERT [dbo].[Profesor] ON 

INSERT [dbo].[Profesor] ([id], [nombre], [apellido], [borndate], [ubicacion], [telefono], [activo], [disponibilidad], [tipo], [idUser]) VALUES (1, N'Ezequiel ', N'Binker', CAST(N'2011-11-11' AS Date), N'Buenos Aires', 11111111, 1, CAST(N'2020-12-20' AS Date), 1, 1)
INSERT [dbo].[Profesor] ([id], [nombre], [apellido], [borndate], [ubicacion], [telefono], [activo], [disponibilidad], [tipo], [idUser]) VALUES (2, N'Martin', N'Torres', CAST(N'2020-02-20' AS Date), N'Santiago', 22222222, 0, CAST(N'2020-12-20' AS Date), 0, 4)
INSERT [dbo].[Profesor] ([id], [nombre], [apellido], [borndate], [ubicacion], [telefono], [activo], [disponibilidad], [tipo], [idUser]) VALUES (3, N'la de lengua', N'no se', CAST(N'1850-10-10' AS Date), N'Cordoba', 33333333, 0, CAST(N'2020-12-20' AS Date), 1, 5)
SET IDENTITY_INSERT [dbo].[Profesor] OFF
GO
SET IDENTITY_INSERT [dbo].[Review] ON 

INSERT [dbo].[Review] ([idReview], [idProfesor], [idAlumno], [calificacion], [descripcion], [nombre]) VALUES (1, 1, 2, 4, N'Muy buena clase!', N'Valentin')
INSERT [dbo].[Review] ([idReview], [idProfesor], [idAlumno], [calificacion], [descripcion], [nombre]) VALUES (2, 3, 3, 5, N'Nunca entendi tan bien', N'Santiago')
INSERT [dbo].[Review] ([idReview], [idProfesor], [idAlumno], [calificacion], [descripcion], [nombre]) VALUES (3, 1, 3, 1, N'Me decepciono', N'Santiago')
SET IDENTITY_INSERT [dbo].[Review] OFF
GO
INSERT [dbo].[TipoClase] ([idTipo], [nombre]) VALUES (0, N'Virtual')
INSERT [dbo].[TipoClase] ([idTipo], [nombre]) VALUES (1, N'Presencial')
GO
INSERT [dbo].[TipoUsuario] ([id], [nombre]) VALUES (0, N'Alumno')
INSERT [dbo].[TipoUsuario] ([id], [nombre]) VALUES (1, N'Profesor')
GO
SET IDENTITY_INSERT [dbo].[Usuario] ON 

INSERT [dbo].[Usuario] ([id], [email], [password], [tipo]) VALUES (1, N'binker@ort.edu.ar', N'$2a$10$0ioO/H1c3IxY7x5jZo8v5eV8AkmFo44OhGn.2CpAfqDTwLSKr2o3i', 1)
INSERT [dbo].[Usuario] ([id], [email], [password], [tipo]) VALUES (4, N'martintorres@ort.edu.ar', N'$2a$10$LsweSc8B99rFOY.faZGq3..QOZzBvXkjrQY04P2GpfivDdxYhJWP2', 1)
INSERT [dbo].[Usuario] ([id], [email], [password], [tipo]) VALUES (5, N'lengua@ort.edu.ar', N'$2a$10$HSAKKIB0pZzY.E/5C7eE9uboCrLR.y.S00UXB2vNrd5TWpVYxGYCS', 1)
INSERT [dbo].[Usuario] ([id], [email], [password], [tipo]) VALUES (6, N'manu@gmail.com', N'$2a$10$mGpHvCfhFGGbp31/WERY2.9n.qLWBwXzVPftyPL5qiljmucKpHIg6', 0)
INSERT [dbo].[Usuario] ([id], [email], [password], [tipo]) VALUES (7, N'valen@gmail.com', N'$2a$10$rU9X3BrWT7tdqQE91.o1Q.FmvuZbuo1cHFnENON/1BgEN3yIC.Xcm', 0)
INSERT [dbo].[Usuario] ([id], [email], [password], [tipo]) VALUES (8, N'santi@gmail.com', N'$2a$10$uRF/6byJC.FhB4hy/EkjmuJKqVmWI/Wvby/w6XV0xNolAlGYccjhC', 0)
INSERT [dbo].[Usuario] ([id], [email], [password], [tipo]) VALUES (9, N'aaa', N'$2a$10$M2bijo1GLDciyPDPTbmeue1ZS7V3gllJADVh13mHYTIGYQ6ihsIri', 1)
SET IDENTITY_INSERT [dbo].[Usuario] OFF
GO
ALTER TABLE [dbo].[Alumno]  WITH CHECK ADD  CONSTRAINT [FK_Alumno_Usuario] FOREIGN KEY([idUser])
REFERENCES [dbo].[Usuario] ([id])
GO
ALTER TABLE [dbo].[Alumno] CHECK CONSTRAINT [FK_Alumno_Usuario]
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
ALTER TABLE [dbo].[Profesor]  WITH CHECK ADD  CONSTRAINT [FK_Profesor_Usuario] FOREIGN KEY([idUser])
REFERENCES [dbo].[Usuario] ([id])
GO
ALTER TABLE [dbo].[Profesor] CHECK CONSTRAINT [FK_Profesor_Usuario]
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
ALTER TABLE [dbo].[Usuario]  WITH CHECK ADD  CONSTRAINT [FK_Usuario_TipoUsuario] FOREIGN KEY([tipo])
REFERENCES [dbo].[TipoUsuario] ([id])
GO
ALTER TABLE [dbo].[Usuario] CHECK CONSTRAINT [FK_Usuario_TipoUsuario]
GO
USE [master]
GO
ALTER DATABASE [TuProfesor] SET  READ_WRITE 
GO
