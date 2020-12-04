using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using cieclarke.Lib;
using cieclarke.Models;

namespace cieclarke.Lib
{
    public class TumblrService : IBlogService
    {
        private readonly HttpClient httpClient;
        private readonly string api;
        private readonly Uri baseAddress;

        public TumblrService(HttpClient httpClient, string api)
        {
            this.httpClient = httpClient;
            this.api = api;
            this.baseAddress = httpClient.BaseAddress;
        }

        public async Task<IList<BlogItem>> GetLinks()
        {
            List<BlogItem> blogs = new List<BlogItem>();

            var uri = new UriBuilder(this.baseAddress);
            var query = HttpUtility.ParseQueryString(uri.Query);

            query["api_key"] = this.api;
            query["notes_info"] = "true";
            query["filter"] = "text";

            uri.Query = query.ToString();

            using (var client = await httpClient.GetAsync(uri.Uri))
            {
                if (client.IsSuccessStatusCode)
                {
                    var s = await client.Content.ReadAsStringAsync();
                    blogs.Add(new BlogItem()
                    {
                        Data = s,
                        ID = "N/A",
                        Title = "N/A"

                    });

                    
                }

            }


            return blogs;
        }
    }
}
