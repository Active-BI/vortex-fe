﻿// ----------------------------------------------------------------------------
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
// ----------------------------------------------------------------------------

namespace EmbeddedApi.Services
{
    using EmbeddedApi.Models;
    using Microsoft.PowerBI.Api;
    using Microsoft.PowerBI.Api.Models;
    using Microsoft.Rest;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Runtime.InteropServices;
    using System.Threading.Tasks;

    public class PbiEmbedService
    {
        private readonly AadService aadService;
        private readonly string urlPowerBiServiceApiRoot  = "https://api.powerbi.com";

        public PbiEmbedService(AadService aadService)
        {
            this.aadService = aadService;
        }

        /// <summary>
        /// Get Power BI client
        /// </summary>
        /// <returns>Power BI client object</returns>
        public PowerBIClient GetPowerBIClient()
        {
            var tokenCredentials = new TokenCredentials(aadService.GetAccessToken(), "Bearer");
            return new PowerBIClient(new Uri(urlPowerBiServiceApiRoot ), tokenCredentials);
        }

        /// <summary>
        /// Get embed params for a report
        /// </summary>
        /// <returns>Wrapper object containing Embed token, Embed URL, Report Id, and Report name for single report</returns>
        public async Task<EmbedParams> GetEmbedParams(Guid workspaceId, Guid reportId, string userId, [Optional] Guid additionalDatasetId)
        {
            PowerBIClient pbiClient = this.GetPowerBIClient();

            // Get report info
            var pbiReport = pbiClient.Reports.GetReportInGroup(workspaceId, reportId);

            // Create list of datasets
            var datasetIds = new List<Guid>();

            // Add dataset associated to the report
            datasetIds.Add(Guid.Parse(pbiReport.DatasetId));

            // Append additional dataset to the list to achieve dynamic binding later
            if (additionalDatasetId != Guid.Empty)
            {
                datasetIds.Add(additionalDatasetId);
            }

            // Add report data for embedding
            var embedReports = new List<EmbedReport>() {
                new EmbedReport
                {
                    ReportId = pbiReport.Id, ReportName = pbiReport.Name, EmbedUrl = pbiReport.EmbedUrl
                }
            };

            // Get Embed token multiple resources
            var embedToken = await GetEmbedToken(reportId, datasetIds, userId, pbiClient, workspaceId);

            // Capture embed params
            var embedParams = new EmbedParams
            {
                EmbedReport = embedReports,
                Type = "Report",
                EmbedToken = embedToken
            };

            return embedParams;
        }

        /// <summary>
        /// Get embed params for multiple reports for a single workspace
        /// </summary>
        /// <returns>Wrapper object containing Embed token, Embed URL, Report Id, and Report name for multiple reports</returns>
        public EmbedParams GetEmbedParams(Guid workspaceId, IList<Guid> reportIds, [Optional] IList<Guid> additionalDatasetIds)
        {
            // Note: This method is an example and is not consumed in this sample app

            // TODO: Aqui precisa incluir a tabela identidades para funcionar a RLS

            PowerBIClient pbiClient = this.GetPowerBIClient();

            // Create mapping for reports and Embed URLs
            var embedReports = new List<EmbedReport>();

            // Create list of datasets
            var datasetIds = new List<Guid>();

            // Get datasets and Embed URLs for all the reports
            foreach (var reportId in reportIds)
            {
                // Get report info
                var pbiReport = pbiClient.Reports.GetReportInGroup(workspaceId, reportId);

                datasetIds.Add(Guid.Parse(pbiReport.DatasetId));

                // Add report data for embedding
                embedReports.Add(new EmbedReport { ReportId = pbiReport.Id, ReportName = pbiReport.Name, EmbedUrl = pbiReport.EmbedUrl });
            }

            // Append to existing list of datasets to achieve dynamic binding later
            if (additionalDatasetIds != null)
            {
                datasetIds.AddRange(additionalDatasetIds);
            }

            // Get Embed token multiple resources
            var embedToken = GetEmbedToken(reportIds, datasetIds, workspaceId);

            // Capture embed params
            var embedParams = new EmbedParams
            {
                EmbedReport = embedReports,
                Type = "Report",
                EmbedToken = embedToken
            };

            return embedParams;
        }

        /// <summary>
        /// Get Embed token for single report, multiple datasets, and an optional target workspace
        /// </summary>
        /// <returns>Embed token</returns>
        public async Task<EmbedToken> GetEmbedToken(Guid reportId, IList<Guid> datasetIds, string userId, PowerBIClient pbiClient, [Optional] Guid targetWorkspaceId)
        {
            //PowerBIClient pbiClient = this.GetPowerBIClient();
            
            // #####################################
            // Reports com RLS - Cadastrar aqui todos os guids com RLS configurados no Power BI
            // #####################################

            var listReportsRLS = new List<Guid>(){
                new Guid("bd72d692-02c4-418f-98da-92207fbd2898"), // Gestão de Vulnerabildiades - OK
                new Guid("ef1438a9-6827-4989-b250-f930a4bb0585"), // Resposta aos Incidentes  - OK
                new Guid("4ae21ee6-022a-4758-9492-268e377c7d99"), // Operações e Requisições - Ok
                new Guid("e31fb684-7a59-424a-93d3-e1a161995278"), // Mapeamento de Dados Sensíveis - Ok
                new Guid("b427451f-5f62-4e4a-8bac-ef2887ed3307"), // Gestão de Consentimento e Cockies - OK
                new Guid("e6e13286-2cc3-484e-8b6f-081e1588a5f3"), // Distribuição de Aplicações Web - OK
                new Guid("71e611bd-b48d-4957-8778-599a3f7ecabc"), // Detecção Resposta Em EndPoints Sentinel - OK
                new Guid("72cb58e2-7b6b-470f-a9c6-4fabd1036a3b"), // Detecção Resposta Em EndPoints Trend - OK
                new Guid("527b41cb-7f74-40e8-9eb8-5125bd93273c"), // Correlacionamento de Logs - OK
                new Guid("9cdf20da-9034-4092-904b-91fb375d0842") // Prevenção Contra Vazamento de Dados (DLP) - OK


            };

            EmbedToken embedToken;

            List<EffectiveIdentity> listaRls = new List<EffectiveIdentity>();
          
            // Create a request for getting Embed token 
            // This method works only with new Power BI V2 workspace experience

            if(userId == null){
                var tokenRequest2 = new GenerateTokenRequestV2(
                
                reports: new List<GenerateTokenRequestV2Report>() { new GenerateTokenRequestV2Report(reportId) },

                datasets: datasetIds.Select(datasetId => new GenerateTokenRequestV2Dataset(datasetId.ToString())).ToList(),

                targetWorkspaces: targetWorkspaceId != Guid.Empty ? new List<GenerateTokenRequestV2TargetWorkspace>() { new GenerateTokenRequestV2TargetWorkspace(targetWorkspaceId) } : null

            );


                // Generate Embed token
            embedToken = await pbiClient.EmbedToken.GenerateTokenAsync(tokenRequest2);

            return embedToken;

            }

            Dictionary<string, string> UserRole = new Dictionary<string, string>();
            UserRole.Add("thiago.caldas@activebi.com.br","OPERADOR");
            UserRole.Add("luiz@activebi.com.br","OPERADOR");
            UserRole.Add("francis.santos@ish.com.br","OPERADOR");
            UserRole.Add("irapua@ish.com.br","OPERADOR");

            var user_rsl = UserRole.TryGetValue(userId.ToString(), out string us) ? us : "";

            EffectiveIdentity rls = new EffectiveIdentity(
                username: userId,
                roles: new List<string>(){"User"},
                reports: new List<string>(){ reportId.ToString() },
                datasets: new List<string>(){ datasetIds[0].ToString() }
            );

            listaRls.Add(rls);

            var tokenRequest = new GenerateTokenRequestV2(
            reports: new List<GenerateTokenRequestV2Report>() { new GenerateTokenRequestV2Report(reportId) },
            datasets: datasetIds.Select(datasetId => new GenerateTokenRequestV2Dataset(datasetId.ToString())).ToList(),
            targetWorkspaces: targetWorkspaceId != Guid.Empty ? new List<GenerateTokenRequestV2TargetWorkspace>() { new GenerateTokenRequestV2TargetWorkspace(targetWorkspaceId) } : null,
            identities: listaRls
        );

            if ( listReportsRLS.Contains(reportId))
            {
                /// TODO: Incluir rls no método abaixo quando estiver configurado no PBI
                embedToken = pbiClient.Reports.GenerateTokenInGroup(targetWorkspaceId, reportId, new GenerateTokenRequest(accessLevel: "View", datasetId: datasetIds.ToString(), false, rls));
                // embedToken = pbiClient.EmbedToken.GenerateToken(tokenRequest);
                return embedToken;
            }
            else
                {
                    embedToken = pbiClient.Reports.GenerateTokenInGroup(targetWorkspaceId, reportId, new GenerateTokenRequest(accessLevel: "View", datasetId: datasetIds.ToString()));
                    return embedToken;

                }


        }

        /// <summary>
        /// Get Embed token for multiple reports, datasets, and an optional target workspace
        /// </summary>
        /// <returns>Embed token</returns>
        public EmbedToken GetEmbedToken(IList<Guid> reportIds, IList<Guid> datasetIds, [Optional] Guid targetWorkspaceId)
        {
            // Note: This method is an example and is not consumed in this sample app

            PowerBIClient pbiClient = this.GetPowerBIClient();

            // Convert report Ids to required types
            var reports = reportIds.Select(reportId => new GenerateTokenRequestV2Report(reportId)).ToList();

            // Convert dataset Ids to required types
            var datasets = datasetIds.Select(datasetId => new GenerateTokenRequestV2Dataset(datasetId.ToString())).ToList();

            // Create a request for getting Embed token 
            // This method works only with new Power BI V2 workspace experience
            var tokenRequest = new GenerateTokenRequestV2(

                datasets: datasets,

                reports: reports,

                targetWorkspaces: targetWorkspaceId != Guid.Empty ? new List<GenerateTokenRequestV2TargetWorkspace>() { new GenerateTokenRequestV2TargetWorkspace(targetWorkspaceId) } : null
            );

            // Generate Embed token
            var embedToken = pbiClient.EmbedToken.GenerateToken(tokenRequest);

            return embedToken;
        }

        /// <summary>
        /// Get Embed token for multiple reports, datasets, and optional target workspaces
        /// </summary>
        /// <returns>Embed token</returns>
        public EmbedToken GetEmbedToken(IList<Guid> reportIds, IList<Guid> datasetIds, [Optional] IList<Guid> targetWorkspaceIds)
        {
            // Note: This method is an example and is not consumed in this sample app

            PowerBIClient pbiClient = this.GetPowerBIClient();

            // Convert report Ids to required types
            var reports = reportIds.Select(reportId => new GenerateTokenRequestV2Report(reportId)).ToList();

            // Convert dataset Ids to required types
            var datasets = datasetIds.Select(datasetId => new GenerateTokenRequestV2Dataset(datasetId.ToString())).ToList();

            // Convert target workspace Ids to required types
            IList<GenerateTokenRequestV2TargetWorkspace> targetWorkspaces = null;
            if (targetWorkspaceIds != null)
            {
                targetWorkspaces = targetWorkspaceIds.Select(targetWorkspaceId => new GenerateTokenRequestV2TargetWorkspace(targetWorkspaceId)).ToList();
            }

            // Create a request for getting Embed token 
            // This method works only with new Power BI V2 workspace experience
            var tokenRequest = new GenerateTokenRequestV2(

                datasets: datasets,

                reports: reports,

                targetWorkspaces: targetWorkspaceIds != null ? targetWorkspaces : null
            );

            // Generate Embed token
            var embedToken = pbiClient.EmbedToken.GenerateToken(tokenRequest);

            return embedToken;
        }
    }
}
