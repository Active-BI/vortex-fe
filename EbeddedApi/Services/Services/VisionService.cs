using System.Collections;
using EbeddedApi.Context;
using EbeddedApi.Models;
using Repository.Interfaces;

namespace EbeddedApi.Services
{
    public class VisionService
    {
        private readonly IVisionRepository _visionRepository;
        public VisionService(
                                IVisionRepository visionRepository)
        {
            this._visionRepository= visionRepository;
        }

        public async Task<IEnumerable> GetVisions()
        {

            var result = this._visionRepository.Get();
                               
            return result;
        }
       public async Task<Vision> GetVisionsById(Guid id)
        {
            var result = this._visionRepository.Get()
                                .FirstOrDefault(x => x.Id == id);

            return result;
        }

    }
}