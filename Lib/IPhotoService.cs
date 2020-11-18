using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using cieclarke.Models;
using Microsoft.AspNetCore.Mvc;

namespace cieclarke.Lib
{
    public interface IPhotoService
    {
        Task<IList<Photo>> GetPhotos(Album album);
        Task<IList<Photo>> GetRecentPhotos(int count);
        Task<IList<Album>> GetAlbums();
        Task<IList<Tag>> GetTags();



    }

}