FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build-env

WORKDIR /app

## WORKDIR /src
COPY *.csproj  ./
RUN dotnet restore

## WORKDIR "/src/WinService.api"
COPY . ./
RUN dotnet publish --no-restore -c Release -o out

##FROM build AS publish
##RUN dotnet publish "WinService.api.csproj" -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:6.0
## FROM base AS final
WORKDIR /app
COPY --from=build-env /app/out .
##ENTRYPOINT [ "dotnet", "WinService.api.dll" ]

RUN useradd -m myactivebiuser
USER myactivebiuser

CMD ASPNETCORE_URLS="http://*:$PORT" dotnet EbeddedApi.dll