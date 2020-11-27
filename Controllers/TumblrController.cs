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
    public class TumblrController : Controller
    {
        private IBlogService blogService;


        public TumblrController(IBlogService blogService)
        {
            this.blogService = blogService;
        }

        public async Task<ContentResult> Links()
        {
            var b = await this.blogService.GetLinks();
            return new ContentResult { Content = b[0].Data, ContentType = "application/json" };
        }

    }


}