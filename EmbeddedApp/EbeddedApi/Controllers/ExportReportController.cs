using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EmbeddedApi.Services;
using EmbeddedApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.AspNetCore.Http;
using System.DirectoryServices.AccountManagement;

namespace EbeddedApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ExportReportController : ControllerBase
    {
        private readonly ReportExportService reportExportService;

        /// <summary>
        /// Basic Controller constructor
        /// </summary>
        public ExportReportController(ReportExportService reportExportService)
        {
            this.reportExportService = reportExportService;
        }

         /// <summary>
        /// Returns a report on a specfic format
        /// </summary>
        /// <returns>A report as filestream with a specific format</returns>
        [HttpGet]
        public async Task<ActionResult> GetExportReport([FromQuery] string reportId, string groupId, string userId){

            try
            {
                 var result = await this.reportExportService.PostExportRequest(new Guid(reportId),new Guid(groupId), Microsoft.PowerBI.Api.Models.FileFormat.PDF);
                 return Ok(result);

               
            }
            catch (System.Exception ex)
            {
                 return StatusCode(StatusCodes.Status409Conflict, ex.Message);
            }
            
        }

    }
}