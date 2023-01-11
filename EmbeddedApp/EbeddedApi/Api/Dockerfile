#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.
# FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
# WORKDIR /app


# FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
# WORKDIR /src
# COPY ["Api/Api.csproj", "Api/"]
# COPY ["ClassLibrary1/Infra.csproj", "ClassLibrary1/"]
# COPY ["Models/Models.csproj", "Models/"]
# COPY ["Repository/Repository.csproj", "Repository/"]
# COPY ["Services/Services.csproj", "Services/"]
# RUN dotnet restore "Api/Api.csproj"
# COPY . .
# WORKDIR "/src/Api"
# RUN dotnet build "Api.csproj" -c Release -o /app/build

# FROM build AS publish
# RUN dotnet publish "Api.csproj" -c Release -o /app/publish

# FROM base AS final
# WORKDIR /app
# COPY --from=publish /app/publish .


# RUN useradd -m myactivebiuser
# USER myactivebiuser

# EXPOSE 5001
# CMD ASPNETCORE_URLS="http://localhost:5001" dotnet Api.dll
FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build-env
WORKDIR /App

# Copy everything
COPY .. ./
# Restore as distinct layers

RUN cd .. dotnet restore
RUN dotnet restore
# Build and publish a release
RUN cd .. dotnet publish -c Release -o Api/out

# Build runtime image
FROM mcr.microsoft.com/dotnet/aspnet:6.0
WORKDIR /App


COPY --from=build-env  /Api .
ENTRYPOINT ["dotnet", "Api.dll"]