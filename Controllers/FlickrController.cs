using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using cieclarke.Models;
using System.Net.Http;
using cieclarke.Lib;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.ViewEngines;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace cieclarke
{
    public class FlickrController : Controller
    {
        private IPhotoService photoService;


        public FlickrController(IPhotoService photoService)
        {
            this.photoService = photoService;
        }

        public async Task<JsonResult> Albums()
        {
            return new JsonResult(await this.photoService.GetAlbums());
        }

        public async Task<ContentResult> Photos(string albumId)
        {
            var album = new Album { ID = albumId };
            var photos = await this.photoService.GetPhotos(album);

            var options = new JsonSerializerOptions
            {
                WriteIndented = true
            };

            options.Converters.Add(new PhotoConverter());

            var s = JsonSerializer.Serialize(photos, options);

            return new ContentResult { Content = s, ContentType = "application/json" };
        }

        public async Task<ContentResult> RecentPhotos(int id)
        {
            var photos = await this.photoService.GetRecentPhotos(id);

            var options = new JsonSerializerOptions
            {
                WriteIndented = true
            };

            options.Converters.Add(new PhotoConverter());

            var s = JsonSerializer.Serialize(photos, options);

            return new ContentResult { Content = s, ContentType = "application/json" };
        }

        public async Task<JsonResult> Tags()
        {
            return new JsonResult(await this.photoService.GetTags());
        }



    }


}