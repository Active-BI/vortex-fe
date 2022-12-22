using System;
using System.Threading.Tasks;
using EbeddedApi.Context;
using EbeddedApi.Controllers.Dto;
using EbeddedApi.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace EbeddedApi.Services
{
    public class VisionService
    {
         private readonly ILogger<VisionService> _logger;
        private readonly VisionContext visionContext;

        public VisionService(ILogger<VisionService> logger,
                               VisionContext visionContext,
                               IdentityContext identityContext)
        {
            _logger = logger;
            this.visionContext = visionContext;
        }

        public async Task<Vision> GetVisionsById(Guid id)
        {

            var result = await this.visionContext.Visions
                                .AsNoTracking()
                                .FirstOrDefaultAsync(x => x.Id == id);

            return result;
        }

        public async Task<Vision> PutVisions(Vision vision, Guid ItemId)
        {

            var visao = new Vision()
            {
                Id = ItemId,
                Name = vision.Name
            };
            var result = this.visionContext.Visions.Update(visao);
            this.visionContext.SaveChanges();

            return visao;
        }
         public async Task<Vision> AddVisions(VisionReq vision)
        {
            var visao = new Vision()
            {
                Name = vision.Name
            };
            var result = await this.visionContext.Visions.AddAsync(visao);
            this.visionContext.SaveChanges();

            return visao;
        }
         public async Task DelVisions(Guid id)
        {

            var vision = new Vision() {
                Id = id
            };
            this.visionContext.Visions.Remove(vision);
            this.visionContext.SaveChanges();
        }

    }
}