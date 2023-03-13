FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src

COPY ["Api/Api.csproj", "Api/"]
COPY ["ClassLibrary1/Infra.csproj", "ClassLibrary1/"]
COPY ["Models/Models.csproj", "Models/"]
COPY ["Repository/Repository.csproj", "Repository/"]
COPY ["Services/Services.csproj", "Services/"]
RUN dotnet restore "Api/Api.csproj"
COPY ./Api .
COPY . .

WORKDIR "/src/Api"
RUN dotnet build "Api.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Api.csproj"  -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .

RUN useradd -m myactivebiuser
USER myactivebiuser

CMD ASPNETCORE_URLS="http://*:$PORT" dotnet Api.dll