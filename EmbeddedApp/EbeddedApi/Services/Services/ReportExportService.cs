using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.PowerBI.Api.Models;

namespace EmbeddedApi.Services
{
    public class ReportExportService
    {
         private readonly PbiEmbedService pbiEmbedService;

        public ReportExportService(PbiEmbedService pbiEmbedService)
        {
            this.pbiEmbedService = pbiEmbedService;
        }

        public async Task<string> PostExportRequest(
                Guid reportId,
                Guid groupId,
                FileFormat format,
                IList<string> pageNames = null, /* Get the page names from the GetPages REST API */
                string urlFilter = null)
        {
            var powerBIReportExportConfiguration = new PowerBIReportExportConfiguration
            {
                Settings = new ExportReportSettings
                {
                    Locale = "pt-br",
                },
                // Note that page names differ from the page display names
                // To get the page names use the GetPages REST API
                Pages = pageNames?.Select(pn => new ExportReportPage(pageName: pn)).ToList(),
                // ReportLevelFilters collection needs to be instantiated explicitly
                ReportLevelFilters = !string.IsNullOrEmpty(urlFilter) ? new List<ExportFilter>() { new ExportFilter(urlFilter) } : null,

            };

            var exportRequest = new ExportReportRequest
            {
                Format = format,
                PowerBIReportConfiguration = powerBIReportExportConfiguration,
            };

            var Client = this.pbiEmbedService.GetPowerBIClient();

            // The 'Client' object is an instance of the Power BI .NET SDK
            var export = await Client.Reports.ExportToFileInGroupWithHttpMessagesAsync(groupId, reportId, exportRequest);

            // Save the export ID, you'll need it for polling and getting the exported file
            return export.Body.Id;
        }
    }
}